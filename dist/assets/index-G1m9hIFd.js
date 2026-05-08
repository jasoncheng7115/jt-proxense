(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Xf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Jp={exports:{}},Yo={},Zp={exports:{}},Re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ys=Symbol.for("react.element"),qf=Symbol.for("react.portal"),Qf=Symbol.for("react.fragment"),Jf=Symbol.for("react.strict_mode"),Zf=Symbol.for("react.profiler"),e0=Symbol.for("react.provider"),t0=Symbol.for("react.context"),r0=Symbol.for("react.forward_ref"),n0=Symbol.for("react.suspense"),a0=Symbol.for("react.memo"),s0=Symbol.for("react.lazy"),nd=Symbol.iterator;function o0(e){return e===null||typeof e!="object"?null:(e=nd&&e[nd]||e["@@iterator"],typeof e=="function"?e:null)}var eu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},tu=Object.assign,ru={};function ka(e,t,n){this.props=e,this.context=t,this.refs=ru,this.updater=n||eu}ka.prototype.isReactComponent={};ka.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ka.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function nu(){}nu.prototype=ka.prototype;function Zl(e,t,n){this.props=e,this.context=t,this.refs=ru,this.updater=n||eu}var ec=Zl.prototype=new nu;ec.constructor=Zl;tu(ec,ka.prototype);ec.isPureReactComponent=!0;var ad=Array.isArray,au=Object.prototype.hasOwnProperty,tc={current:null},su={key:!0,ref:!0,__self:!0,__source:!0};function ou(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)au.call(t,a)&&!su.hasOwnProperty(a)&&(s[a]=t[a]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)s[a]===void 0&&(s[a]=c[a]);return{$$typeof:ys,type:e,key:o,ref:i,props:s,_owner:tc.current}}function i0(e,t){return{$$typeof:ys,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function rc(e){return typeof e=="object"&&e!==null&&e.$$typeof===ys}function l0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var sd=/\/+/g;function mi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?l0(""+e.key):t.toString(36)}function Js(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case ys:case qf:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+mi(i,0):a,ad(s)?(n="",e!=null&&(n=e.replace(sd,"$&/")+"/"),Js(s,t,n,"",function(d){return d})):s!=null&&(rc(s)&&(s=i0(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(sd,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",ad(e))for(var c=0;c<e.length;c++){o=e[c];var l=a+mi(o,c);i+=Js(o,t,n,l,s)}else if(l=o0(e),typeof l=="function")for(e=l.call(e),c=0;!(o=e.next()).done;)o=o.value,l=a+mi(o,c++),i+=Js(o,t,n,l,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Ms(e,t,n){if(e==null)return e;var a=[],s=0;return Js(e,a,"","",function(o){return t.call(n,o,s++)}),a}function c0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Dt={current:null},Zs={transition:null},d0={ReactCurrentDispatcher:Dt,ReactCurrentBatchConfig:Zs,ReactCurrentOwner:tc};function iu(){throw Error("act(...) is not supported in production builds of React.")}Re.Children={map:Ms,forEach:function(e,t,n){Ms(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ms(e,function(){t++}),t},toArray:function(e){return Ms(e,function(t){return t})||[]},only:function(e){if(!rc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Re.Component=ka;Re.Fragment=Qf;Re.Profiler=Zf;Re.PureComponent=Zl;Re.StrictMode=Jf;Re.Suspense=n0;Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=d0;Re.act=iu;Re.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=tu({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=tc.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)au.call(t,l)&&!su.hasOwnProperty(l)&&(a[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}return{$$typeof:ys,type:e.type,key:s,ref:o,props:a,_owner:i}};Re.createContext=function(e){return e={$$typeof:t0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:e0,_context:e},e.Consumer=e};Re.createElement=ou;Re.createFactory=function(e){var t=ou.bind(null,e);return t.type=e,t};Re.createRef=function(){return{current:null}};Re.forwardRef=function(e){return{$$typeof:r0,render:e}};Re.isValidElement=rc;Re.lazy=function(e){return{$$typeof:s0,_payload:{_status:-1,_result:e},_init:c0}};Re.memo=function(e,t){return{$$typeof:a0,type:e,compare:t===void 0?null:t}};Re.startTransition=function(e){var t=Zs.transition;Zs.transition={};try{e()}finally{Zs.transition=t}};Re.unstable_act=iu;Re.useCallback=function(e,t){return Dt.current.useCallback(e,t)};Re.useContext=function(e){return Dt.current.useContext(e)};Re.useDebugValue=function(){};Re.useDeferredValue=function(e){return Dt.current.useDeferredValue(e)};Re.useEffect=function(e,t){return Dt.current.useEffect(e,t)};Re.useId=function(){return Dt.current.useId()};Re.useImperativeHandle=function(e,t,n){return Dt.current.useImperativeHandle(e,t,n)};Re.useInsertionEffect=function(e,t){return Dt.current.useInsertionEffect(e,t)};Re.useLayoutEffect=function(e,t){return Dt.current.useLayoutEffect(e,t)};Re.useMemo=function(e,t){return Dt.current.useMemo(e,t)};Re.useReducer=function(e,t,n){return Dt.current.useReducer(e,t,n)};Re.useRef=function(e){return Dt.current.useRef(e)};Re.useState=function(e){return Dt.current.useState(e)};Re.useSyncExternalStore=function(e,t,n){return Dt.current.useSyncExternalStore(e,t,n)};Re.useTransition=function(){return Dt.current.useTransition()};Re.version="18.3.1";Zp.exports=Re;var p=Zp.exports;const Go=Xf(p);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p0=p,u0=Symbol.for("react.element"),m0=Symbol.for("react.fragment"),f0=Object.prototype.hasOwnProperty,h0=p0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g0={key:!0,ref:!0,__self:!0,__source:!0};function lu(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)f0.call(t,a)&&!g0.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:u0,type:e,key:o,ref:i,props:s,_owner:h0.current}}Yo.Fragment=m0;Yo.jsx=lu;Yo.jsxs=lu;Jp.exports=Yo;var r=Jp.exports,Qi={},cu={exports:{}},nr={},du={exports:{}},pu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(U,V){var Q=U.length;U.push(V);e:for(;0<Q;){var K=Q-1>>>1,C=U[K];if(0<s(C,V))U[K]=V,U[Q]=C,Q=K;else break e}}function n(U){return U.length===0?null:U[0]}function a(U){if(U.length===0)return null;var V=U[0],Q=U.pop();if(Q!==V){U[0]=Q;e:for(var K=0,C=U.length,Ne=C>>>1;K<Ne;){var _e=2*(K+1)-1,Ke=U[_e],G=_e+1,de=U[G];if(0>s(Ke,Q))G<C&&0>s(de,Ke)?(U[K]=de,U[G]=Q,K=G):(U[K]=Ke,U[_e]=Q,K=_e);else if(G<C&&0>s(de,Q))U[K]=de,U[G]=Q,K=G;else break e}}return V}function s(U,V){var Q=U.sortIndex-V.sortIndex;return Q!==0?Q:U.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var l=[],d=[],h=1,g=null,u=3,x=!1,b=!1,j=!1,y=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(U){for(var V=n(d);V!==null;){if(V.callback===null)a(d);else if(V.startTime<=U)a(d),V.sortIndex=V.expirationTime,t(l,V);else break;V=n(d)}}function k(U){if(j=!1,v(U),!b)if(n(l)!==null)b=!0,q(w);else{var V=n(d);V!==null&&I(k,V.startTime-U)}}function w(U,V){b=!1,j&&(j=!1,m(z),z=-1),x=!0;var Q=u;try{for(v(V),g=n(l);g!==null&&(!(g.expirationTime>V)||U&&!T());){var K=g.callback;if(typeof K=="function"){g.callback=null,u=g.priorityLevel;var C=K(g.expirationTime<=V);V=e.unstable_now(),typeof C=="function"?g.callback=C:g===n(l)&&a(l),v(V)}else a(l);g=n(l)}if(g!==null)var Ne=!0;else{var _e=n(d);_e!==null&&I(k,_e.startTime-V),Ne=!1}return Ne}finally{g=null,u=Q,x=!1}}var _=!1,M=null,z=-1,O=5,P=-1;function T(){return!(e.unstable_now()-P<O)}function R(){if(M!==null){var U=e.unstable_now();P=U;var V=!0;try{V=M(!0,U)}finally{V?te():(_=!1,M=null)}}else _=!1}var te;if(typeof f=="function")te=function(){f(R)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,L=W.port2;W.port1.onmessage=R,te=function(){L.postMessage(null)}}else te=function(){y(R,0)};function q(U){M=U,_||(_=!0,te())}function I(U,V){z=y(function(){U(e.unstable_now())},V)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(U){U.callback=null},e.unstable_continueExecution=function(){b||x||(b=!0,q(w))},e.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<U?Math.floor(1e3/U):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(U){switch(u){case 1:case 2:case 3:var V=3;break;default:V=u}var Q=u;u=V;try{return U()}finally{u=Q}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(U,V){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var Q=u;u=U;try{return V()}finally{u=Q}},e.unstable_scheduleCallback=function(U,V,Q){var K=e.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?K+Q:K):Q=K,U){case 1:var C=-1;break;case 2:C=250;break;case 5:C=1073741823;break;case 4:C=1e4;break;default:C=5e3}return C=Q+C,U={id:h++,callback:V,priorityLevel:U,startTime:Q,expirationTime:C,sortIndex:-1},Q>K?(U.sortIndex=Q,t(d,U),n(l)===null&&U===n(d)&&(j?(m(z),z=-1):j=!0,I(k,Q-K))):(U.sortIndex=C,t(l,U),b||x||(b=!0,q(w))),U},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(U){var V=u;return function(){var Q=u;u=V;try{return U.apply(this,arguments)}finally{u=Q}}}})(pu);du.exports=pu;var x0=du.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v0=p,rr=x0;function ee(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var uu=new Set,Za={};function Fn(e,t){ma(e,t),ma(e+"Capture",t)}function ma(e,t){for(Za[e]=t,e=0;e<t.length;e++)uu.add(t[e])}var Wr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ji=Object.prototype.hasOwnProperty,b0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,od={},id={};function y0(e){return Ji.call(id,e)?!0:Ji.call(od,e)?!1:b0.test(e)?id[e]=!0:(od[e]=!0,!1)}function w0(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function k0(e,t,n,a){if(t===null||typeof t>"u"||w0(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Bt(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$t[e]=new Bt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$t[t]=new Bt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$t[e]=new Bt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$t[e]=new Bt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$t[e]=new Bt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$t[e]=new Bt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$t[e]=new Bt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$t[e]=new Bt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$t[e]=new Bt(e,5,!1,e.toLowerCase(),null,!1,!1)});var nc=/[\-:]([a-z])/g;function ac(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(nc,ac);$t[t]=new Bt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(nc,ac);$t[t]=new Bt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(nc,ac);$t[t]=new Bt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$t[e]=new Bt(e,1,!1,e.toLowerCase(),null,!1,!1)});$t.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$t[e]=new Bt(e,1,!1,e.toLowerCase(),null,!0,!0)});function sc(e,t,n,a){var s=$t.hasOwnProperty(t)?$t[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(k0(t,n,s,a)&&(n=null),a||s===null?y0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var Gr=v0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zs=Symbol.for("react.element"),Kn=Symbol.for("react.portal"),Xn=Symbol.for("react.fragment"),oc=Symbol.for("react.strict_mode"),Zi=Symbol.for("react.profiler"),mu=Symbol.for("react.provider"),fu=Symbol.for("react.context"),ic=Symbol.for("react.forward_ref"),el=Symbol.for("react.suspense"),tl=Symbol.for("react.suspense_list"),lc=Symbol.for("react.memo"),en=Symbol.for("react.lazy"),hu=Symbol.for("react.offscreen"),ld=Symbol.iterator;function _a(e){return e===null||typeof e!="object"?null:(e=ld&&e[ld]||e["@@iterator"],typeof e=="function"?e:null)}var ft=Object.assign,fi;function La(e){if(fi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);fi=t&&t[1]||""}return`
`+fi+e}var hi=!1;function gi(e,t){if(!e||hi)return"";hi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,c=o.length-1;1<=i&&0<=c&&s[i]!==o[c];)c--;for(;1<=i&&0<=c;i--,c--)if(s[i]!==o[c]){if(i!==1||c!==1)do if(i--,c--,0>c||s[i]!==o[c]){var l=`
`+s[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=c);break}}}finally{hi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?La(e):""}function j0(e){switch(e.tag){case 5:return La(e.type);case 16:return La("Lazy");case 13:return La("Suspense");case 19:return La("SuspenseList");case 0:case 2:case 15:return e=gi(e.type,!1),e;case 11:return e=gi(e.type.render,!1),e;case 1:return e=gi(e.type,!0),e;default:return""}}function rl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xn:return"Fragment";case Kn:return"Portal";case Zi:return"Profiler";case oc:return"StrictMode";case el:return"Suspense";case tl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case fu:return(e.displayName||"Context")+".Consumer";case mu:return(e._context.displayName||"Context")+".Provider";case ic:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case lc:return t=e.displayName||null,t!==null?t:rl(e.type)||"Memo";case en:t=e._payload,e=e._init;try{return rl(e(t))}catch{}}return null}function N0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rl(t);case 8:return t===oc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function gn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function _0(e){var t=gu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $s(e){e._valueTracker||(e._valueTracker=_0(e))}function xu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=gu(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function fo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function nl(e,t){var n=t.checked;return ft({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function cd(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=gn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function vu(e,t){t=t.checked,t!=null&&sc(e,"checked",t,!1)}function al(e,t){vu(e,t);var n=gn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?sl(e,t.type,n):t.hasOwnProperty("defaultValue")&&sl(e,t.type,gn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function dd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function sl(e,t,n){(t!=="number"||fo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Aa=Array.isArray;function oa(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+gn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function ol(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(ee(91));return ft({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function pd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(ee(92));if(Aa(n)){if(1<n.length)throw Error(ee(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:gn(n)}}function bu(e,t){var n=gn(t.value),a=gn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function ud(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function yu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function il(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?yu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Es,wu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Es=Es||document.createElement("div"),Es.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Es.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function es(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Va={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},S0=["Webkit","ms","Moz","O"];Object.keys(Va).forEach(function(e){S0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Va[t]=Va[e]})});function ku(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Va.hasOwnProperty(e)&&Va[e]?(""+t).trim():t+"px"}function ju(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=ku(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var C0=ft({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ll(e,t){if(t){if(C0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(ee(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(ee(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(ee(61))}if(t.style!=null&&typeof t.style!="object")throw Error(ee(62))}}function cl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dl=null;function cc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pl=null,ia=null,la=null;function md(e){if(e=js(e)){if(typeof pl!="function")throw Error(ee(280));var t=e.stateNode;t&&(t=Jo(t),pl(e.stateNode,e.type,t))}}function Nu(e){ia?la?la.push(e):la=[e]:ia=e}function _u(){if(ia){var e=ia,t=la;if(la=ia=null,md(e),t)for(e=0;e<t.length;e++)md(t[e])}}function Su(e,t){return e(t)}function Cu(){}var xi=!1;function Mu(e,t,n){if(xi)return e(t,n);xi=!0;try{return Su(e,t,n)}finally{xi=!1,(ia!==null||la!==null)&&(Cu(),_u())}}function ts(e,t){var n=e.stateNode;if(n===null)return null;var a=Jo(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(ee(231,t,typeof n));return n}var ul=!1;if(Wr)try{var Sa={};Object.defineProperty(Sa,"passive",{get:function(){ul=!0}}),window.addEventListener("test",Sa,Sa),window.removeEventListener("test",Sa,Sa)}catch{ul=!1}function M0(e,t,n,a,s,o,i,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(h){this.onError(h)}}var Ha=!1,ho=null,go=!1,ml=null,z0={onError:function(e){Ha=!0,ho=e}};function $0(e,t,n,a,s,o,i,c,l){Ha=!1,ho=null,M0.apply(z0,arguments)}function E0(e,t,n,a,s,o,i,c,l){if($0.apply(this,arguments),Ha){if(Ha){var d=ho;Ha=!1,ho=null}else throw Error(ee(198));go||(go=!0,ml=d)}}function Dn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function zu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function fd(e){if(Dn(e)!==e)throw Error(ee(188))}function T0(e){var t=e.alternate;if(!t){if(t=Dn(e),t===null)throw Error(ee(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return fd(s),e;if(o===a)return fd(s),t;o=o.sibling}throw Error(ee(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,c=s.child;c;){if(c===n){i=!0,n=s,a=o;break}if(c===a){i=!0,a=s,n=o;break}c=c.sibling}if(!i){for(c=o.child;c;){if(c===n){i=!0,n=o,a=s;break}if(c===a){i=!0,a=o,n=s;break}c=c.sibling}if(!i)throw Error(ee(189))}}if(n.alternate!==a)throw Error(ee(190))}if(n.tag!==3)throw Error(ee(188));return n.stateNode.current===n?e:t}function $u(e){return e=T0(e),e!==null?Eu(e):null}function Eu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Eu(e);if(t!==null)return t;e=e.sibling}return null}var Tu=rr.unstable_scheduleCallback,hd=rr.unstable_cancelCallback,P0=rr.unstable_shouldYield,R0=rr.unstable_requestPaint,bt=rr.unstable_now,I0=rr.unstable_getCurrentPriorityLevel,dc=rr.unstable_ImmediatePriority,Pu=rr.unstable_UserBlockingPriority,xo=rr.unstable_NormalPriority,L0=rr.unstable_LowPriority,Ru=rr.unstable_IdlePriority,Ko=null,Mr=null;function A0(e){if(Mr&&typeof Mr.onCommitFiberRoot=="function")try{Mr.onCommitFiberRoot(Ko,e,void 0,(e.current.flags&128)===128)}catch{}}var vr=Math.clz32?Math.clz32:D0,O0=Math.log,F0=Math.LN2;function D0(e){return e>>>=0,e===0?32:31-(O0(e)/F0|0)|0}var Ts=64,Ps=4194304;function Oa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function vo(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var c=i&~s;c!==0?a=Oa(c):(o&=i,o!==0&&(a=Oa(o)))}else i=n&~s,i!==0?a=Oa(i):o!==0&&(a=Oa(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-vr(t),s=1<<n,a|=e[n],t&=~s;return a}function B0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function W0(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-vr(o),c=1<<i,l=s[i];l===-1?(!(c&n)||c&a)&&(s[i]=B0(c,t)):l<=t&&(e.expiredLanes|=c),o&=~c}}function fl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Iu(){var e=Ts;return Ts<<=1,!(Ts&4194240)&&(Ts=64),e}function vi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ws(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-vr(t),e[t]=n}function U0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-vr(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function pc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-vr(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var qe=0;function Lu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Au,uc,Ou,Fu,Du,hl=!1,Rs=[],ln=null,cn=null,dn=null,rs=new Map,ns=new Map,nn=[],V0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gd(e,t){switch(e){case"focusin":case"focusout":ln=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":rs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ns.delete(t.pointerId)}}function Ca(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=js(t),t!==null&&uc(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function H0(e,t,n,a,s){switch(t){case"focusin":return ln=Ca(ln,e,t,n,a,s),!0;case"dragenter":return cn=Ca(cn,e,t,n,a,s),!0;case"mouseover":return dn=Ca(dn,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return rs.set(o,Ca(rs.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,ns.set(o,Ca(ns.get(o)||null,e,t,n,a,s)),!0}return!1}function Bu(e){var t=Sn(e.target);if(t!==null){var n=Dn(t);if(n!==null){if(t=n.tag,t===13){if(t=zu(n),t!==null){e.blockedOn=t,Du(e.priority,function(){Ou(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function eo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=gl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);dl=a,n.target.dispatchEvent(a),dl=null}else return t=js(n),t!==null&&uc(t),e.blockedOn=n,!1;t.shift()}return!0}function xd(e,t,n){eo(e)&&n.delete(t)}function Y0(){hl=!1,ln!==null&&eo(ln)&&(ln=null),cn!==null&&eo(cn)&&(cn=null),dn!==null&&eo(dn)&&(dn=null),rs.forEach(xd),ns.forEach(xd)}function Ma(e,t){e.blockedOn===t&&(e.blockedOn=null,hl||(hl=!0,rr.unstable_scheduleCallback(rr.unstable_NormalPriority,Y0)))}function as(e){function t(s){return Ma(s,e)}if(0<Rs.length){Ma(Rs[0],e);for(var n=1;n<Rs.length;n++){var a=Rs[n];a.blockedOn===e&&(a.blockedOn=null)}}for(ln!==null&&Ma(ln,e),cn!==null&&Ma(cn,e),dn!==null&&Ma(dn,e),rs.forEach(t),ns.forEach(t),n=0;n<nn.length;n++)a=nn[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<nn.length&&(n=nn[0],n.blockedOn===null);)Bu(n),n.blockedOn===null&&nn.shift()}var ca=Gr.ReactCurrentBatchConfig,bo=!0;function G0(e,t,n,a){var s=qe,o=ca.transition;ca.transition=null;try{qe=1,mc(e,t,n,a)}finally{qe=s,ca.transition=o}}function K0(e,t,n,a){var s=qe,o=ca.transition;ca.transition=null;try{qe=4,mc(e,t,n,a)}finally{qe=s,ca.transition=o}}function mc(e,t,n,a){if(bo){var s=gl(e,t,n,a);if(s===null)Mi(e,t,a,yo,n),gd(e,a);else if(H0(s,e,t,n,a))a.stopPropagation();else if(gd(e,a),t&4&&-1<V0.indexOf(e)){for(;s!==null;){var o=js(s);if(o!==null&&Au(o),o=gl(e,t,n,a),o===null&&Mi(e,t,a,yo,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else Mi(e,t,a,null,n)}}var yo=null;function gl(e,t,n,a){if(yo=null,e=cc(a),e=Sn(e),e!==null)if(t=Dn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=zu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return yo=e,null}function Wu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(I0()){case dc:return 1;case Pu:return 4;case xo:case L0:return 16;case Ru:return 536870912;default:return 16}default:return 16}}var sn=null,fc=null,to=null;function Uu(){if(to)return to;var e,t=fc,n=t.length,a,s="value"in sn?sn.value:sn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return to=s.slice(e,1<a?1-a:void 0)}function ro(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Is(){return!0}function vd(){return!1}function ar(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Is:vd,this.isPropagationStopped=vd,this}return ft(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Is)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Is)},persist:function(){},isPersistent:Is}),t}var ja={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hc=ar(ja),ks=ft({},ja,{view:0,detail:0}),X0=ar(ks),bi,yi,za,Xo=ft({},ks,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==za&&(za&&e.type==="mousemove"?(bi=e.screenX-za.screenX,yi=e.screenY-za.screenY):yi=bi=0,za=e),bi)},movementY:function(e){return"movementY"in e?e.movementY:yi}}),bd=ar(Xo),q0=ft({},Xo,{dataTransfer:0}),Q0=ar(q0),J0=ft({},ks,{relatedTarget:0}),wi=ar(J0),Z0=ft({},ja,{animationName:0,elapsedTime:0,pseudoElement:0}),eh=ar(Z0),th=ft({},ja,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),rh=ar(th),nh=ft({},ja,{data:0}),yd=ar(nh),ah={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},oh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ih(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=oh[e])?!!t[e]:!1}function gc(){return ih}var lh=ft({},ks,{key:function(e){if(e.key){var t=ah[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ro(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gc,charCode:function(e){return e.type==="keypress"?ro(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ro(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ch=ar(lh),dh=ft({},Xo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wd=ar(dh),ph=ft({},ks,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gc}),uh=ar(ph),mh=ft({},ja,{propertyName:0,elapsedTime:0,pseudoElement:0}),fh=ar(mh),hh=ft({},Xo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gh=ar(hh),xh=[9,13,27,32],xc=Wr&&"CompositionEvent"in window,Ya=null;Wr&&"documentMode"in document&&(Ya=document.documentMode);var vh=Wr&&"TextEvent"in window&&!Ya,Vu=Wr&&(!xc||Ya&&8<Ya&&11>=Ya),kd=" ",jd=!1;function Hu(e,t){switch(e){case"keyup":return xh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qn=!1;function bh(e,t){switch(e){case"compositionend":return Yu(t);case"keypress":return t.which!==32?null:(jd=!0,kd);case"textInput":return e=t.data,e===kd&&jd?null:e;default:return null}}function yh(e,t){if(qn)return e==="compositionend"||!xc&&Hu(e,t)?(e=Uu(),to=fc=sn=null,qn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vu&&t.locale!=="ko"?null:t.data;default:return null}}var wh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!wh[e.type]:t==="textarea"}function Gu(e,t,n,a){Nu(a),t=wo(t,"onChange"),0<t.length&&(n=new hc("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Ga=null,ss=null;function kh(e){am(e,0)}function qo(e){var t=Zn(e);if(xu(t))return e}function jh(e,t){if(e==="change")return t}var Ku=!1;if(Wr){var ki;if(Wr){var ji="oninput"in document;if(!ji){var _d=document.createElement("div");_d.setAttribute("oninput","return;"),ji=typeof _d.oninput=="function"}ki=ji}else ki=!1;Ku=ki&&(!document.documentMode||9<document.documentMode)}function Sd(){Ga&&(Ga.detachEvent("onpropertychange",Xu),ss=Ga=null)}function Xu(e){if(e.propertyName==="value"&&qo(ss)){var t=[];Gu(t,ss,e,cc(e)),Mu(kh,t)}}function Nh(e,t,n){e==="focusin"?(Sd(),Ga=t,ss=n,Ga.attachEvent("onpropertychange",Xu)):e==="focusout"&&Sd()}function _h(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qo(ss)}function Sh(e,t){if(e==="click")return qo(t)}function Ch(e,t){if(e==="input"||e==="change")return qo(t)}function Mh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var yr=typeof Object.is=="function"?Object.is:Mh;function os(e,t){if(yr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!Ji.call(t,s)||!yr(e[s],t[s]))return!1}return!0}function Cd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Md(e,t){var n=Cd(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Cd(n)}}function qu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qu(){for(var e=window,t=fo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=fo(e.document)}return t}function vc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function zh(e){var t=Qu(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&qu(n.ownerDocument.documentElement,n)){if(a!==null&&vc(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=Md(n,o);var i=Md(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var $h=Wr&&"documentMode"in document&&11>=document.documentMode,Qn=null,xl=null,Ka=null,vl=!1;function zd(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vl||Qn==null||Qn!==fo(a)||(a=Qn,"selectionStart"in a&&vc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ka&&os(Ka,a)||(Ka=a,a=wo(xl,"onSelect"),0<a.length&&(t=new hc("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Qn)))}function Ls(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Jn={animationend:Ls("Animation","AnimationEnd"),animationiteration:Ls("Animation","AnimationIteration"),animationstart:Ls("Animation","AnimationStart"),transitionend:Ls("Transition","TransitionEnd")},Ni={},Ju={};Wr&&(Ju=document.createElement("div").style,"AnimationEvent"in window||(delete Jn.animationend.animation,delete Jn.animationiteration.animation,delete Jn.animationstart.animation),"TransitionEvent"in window||delete Jn.transitionend.transition);function Qo(e){if(Ni[e])return Ni[e];if(!Jn[e])return e;var t=Jn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ju)return Ni[e]=t[n];return e}var Zu=Qo("animationend"),em=Qo("animationiteration"),tm=Qo("animationstart"),rm=Qo("transitionend"),nm=new Map,$d="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,t){nm.set(e,t),Fn(t,[e])}for(var _i=0;_i<$d.length;_i++){var Si=$d[_i],Eh=Si.toLowerCase(),Th=Si[0].toUpperCase()+Si.slice(1);vn(Eh,"on"+Th)}vn(Zu,"onAnimationEnd");vn(em,"onAnimationIteration");vn(tm,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(rm,"onTransitionEnd");ma("onMouseEnter",["mouseout","mouseover"]);ma("onMouseLeave",["mouseout","mouseover"]);ma("onPointerEnter",["pointerout","pointerover"]);ma("onPointerLeave",["pointerout","pointerover"]);Fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ph=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fa));function Ed(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,E0(a,t,void 0,e),e.currentTarget=null}function am(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var c=a[i],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==o&&s.isPropagationStopped())break e;Ed(s,c,d),o=l}else for(i=0;i<a.length;i++){if(c=a[i],l=c.instance,d=c.currentTarget,c=c.listener,l!==o&&s.isPropagationStopped())break e;Ed(s,c,d),o=l}}}if(go)throw e=ml,go=!1,ml=null,e}function rt(e,t){var n=t[jl];n===void 0&&(n=t[jl]=new Set);var a=e+"__bubble";n.has(a)||(sm(t,e,2,!1),n.add(a))}function Ci(e,t,n){var a=0;t&&(a|=4),sm(n,e,a,t)}var As="_reactListening"+Math.random().toString(36).slice(2);function is(e){if(!e[As]){e[As]=!0,uu.forEach(function(n){n!=="selectionchange"&&(Ph.has(n)||Ci(n,!1,e),Ci(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[As]||(t[As]=!0,Ci("selectionchange",!1,t))}}function sm(e,t,n,a){switch(Wu(t)){case 1:var s=G0;break;case 4:s=K0;break;default:s=mc}n=s.bind(null,t,n,e),s=void 0,!ul||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Mi(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var c=a.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;i=i.return}for(;c!==null;){if(i=Sn(c),i===null)return;if(l=i.tag,l===5||l===6){a=o=i;continue e}c=c.parentNode}}a=a.return}Mu(function(){var d=o,h=cc(n),g=[];e:{var u=nm.get(e);if(u!==void 0){var x=hc,b=e;switch(e){case"keypress":if(ro(n)===0)break e;case"keydown":case"keyup":x=ch;break;case"focusin":b="focus",x=wi;break;case"focusout":b="blur",x=wi;break;case"beforeblur":case"afterblur":x=wi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=bd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Q0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=uh;break;case Zu:case em:case tm:x=eh;break;case rm:x=fh;break;case"scroll":x=X0;break;case"wheel":x=gh;break;case"copy":case"cut":case"paste":x=rh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=wd}var j=(t&4)!==0,y=!j&&e==="scroll",m=j?u!==null?u+"Capture":null:u;j=[];for(var f=d,v;f!==null;){v=f;var k=v.stateNode;if(v.tag===5&&k!==null&&(v=k,m!==null&&(k=ts(f,m),k!=null&&j.push(ls(f,k,v)))),y)break;f=f.return}0<j.length&&(u=new x(u,b,null,n,h),g.push({event:u,listeners:j}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",u&&n!==dl&&(b=n.relatedTarget||n.fromElement)&&(Sn(b)||b[Ur]))break e;if((x||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,x?(b=n.relatedTarget||n.toElement,x=d,b=b?Sn(b):null,b!==null&&(y=Dn(b),b!==y||b.tag!==5&&b.tag!==6)&&(b=null)):(x=null,b=d),x!==b)){if(j=bd,k="onMouseLeave",m="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(j=wd,k="onPointerLeave",m="onPointerEnter",f="pointer"),y=x==null?u:Zn(x),v=b==null?u:Zn(b),u=new j(k,f+"leave",x,n,h),u.target=y,u.relatedTarget=v,k=null,Sn(h)===d&&(j=new j(m,f+"enter",b,n,h),j.target=v,j.relatedTarget=y,k=j),y=k,x&&b)t:{for(j=x,m=b,f=0,v=j;v;v=Hn(v))f++;for(v=0,k=m;k;k=Hn(k))v++;for(;0<f-v;)j=Hn(j),f--;for(;0<v-f;)m=Hn(m),v--;for(;f--;){if(j===m||m!==null&&j===m.alternate)break t;j=Hn(j),m=Hn(m)}j=null}else j=null;x!==null&&Td(g,u,x,j,!1),b!==null&&y!==null&&Td(g,y,b,j,!0)}}e:{if(u=d?Zn(d):window,x=u.nodeName&&u.nodeName.toLowerCase(),x==="select"||x==="input"&&u.type==="file")var w=jh;else if(Nd(u))if(Ku)w=Ch;else{w=_h;var _=Nh}else(x=u.nodeName)&&x.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(w=Sh);if(w&&(w=w(e,d))){Gu(g,w,n,h);break e}_&&_(e,u,d),e==="focusout"&&(_=u._wrapperState)&&_.controlled&&u.type==="number"&&sl(u,"number",u.value)}switch(_=d?Zn(d):window,e){case"focusin":(Nd(_)||_.contentEditable==="true")&&(Qn=_,xl=d,Ka=null);break;case"focusout":Ka=xl=Qn=null;break;case"mousedown":vl=!0;break;case"contextmenu":case"mouseup":case"dragend":vl=!1,zd(g,n,h);break;case"selectionchange":if($h)break;case"keydown":case"keyup":zd(g,n,h)}var M;if(xc)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else qn?Hu(e,n)&&(z="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&(Vu&&n.locale!=="ko"&&(qn||z!=="onCompositionStart"?z==="onCompositionEnd"&&qn&&(M=Uu()):(sn=h,fc="value"in sn?sn.value:sn.textContent,qn=!0)),_=wo(d,z),0<_.length&&(z=new yd(z,e,null,n,h),g.push({event:z,listeners:_}),M?z.data=M:(M=Yu(n),M!==null&&(z.data=M)))),(M=vh?bh(e,n):yh(e,n))&&(d=wo(d,"onBeforeInput"),0<d.length&&(h=new yd("onBeforeInput","beforeinput",null,n,h),g.push({event:h,listeners:d}),h.data=M))}am(g,t)})}function ls(e,t,n){return{instance:e,listener:t,currentTarget:n}}function wo(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=ts(e,n),o!=null&&a.unshift(ls(e,o,s)),o=ts(e,t),o!=null&&a.push(ls(e,o,s))),e=e.return}return a}function Hn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Td(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var c=n,l=c.alternate,d=c.stateNode;if(l!==null&&l===a)break;c.tag===5&&d!==null&&(c=d,s?(l=ts(n,o),l!=null&&i.unshift(ls(n,l,c))):s||(l=ts(n,o),l!=null&&i.push(ls(n,l,c)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var Rh=/\r\n?/g,Ih=/\u0000|\uFFFD/g;function Pd(e){return(typeof e=="string"?e:""+e).replace(Rh,`
`).replace(Ih,"")}function Os(e,t,n){if(t=Pd(t),Pd(e)!==t&&n)throw Error(ee(425))}function ko(){}var bl=null,yl=null;function wl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var kl=typeof setTimeout=="function"?setTimeout:void 0,Lh=typeof clearTimeout=="function"?clearTimeout:void 0,Rd=typeof Promise=="function"?Promise:void 0,Ah=typeof queueMicrotask=="function"?queueMicrotask:typeof Rd<"u"?function(e){return Rd.resolve(null).then(e).catch(Oh)}:kl;function Oh(e){setTimeout(function(){throw e})}function zi(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),as(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);as(t)}function pn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Id(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Na=Math.random().toString(36).slice(2),Cr="__reactFiber$"+Na,cs="__reactProps$"+Na,Ur="__reactContainer$"+Na,jl="__reactEvents$"+Na,Fh="__reactListeners$"+Na,Dh="__reactHandles$"+Na;function Sn(e){var t=e[Cr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ur]||n[Cr]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Id(e);e!==null;){if(n=e[Cr])return n;e=Id(e)}return t}e=n,n=e.parentNode}return null}function js(e){return e=e[Cr]||e[Ur],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(ee(33))}function Jo(e){return e[cs]||null}var Nl=[],ea=-1;function bn(e){return{current:e}}function nt(e){0>ea||(e.current=Nl[ea],Nl[ea]=null,ea--)}function et(e,t){ea++,Nl[ea]=e.current,e.current=t}var xn={},Rt=bn(xn),Xt=bn(!1),Pn=xn;function fa(e,t){var n=e.type.contextTypes;if(!n)return xn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function qt(e){return e=e.childContextTypes,e!=null}function jo(){nt(Xt),nt(Rt)}function Ld(e,t,n){if(Rt.current!==xn)throw Error(ee(168));et(Rt,t),et(Xt,n)}function om(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(ee(108,N0(e)||"Unknown",s));return ft({},n,a)}function No(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||xn,Pn=Rt.current,et(Rt,e),et(Xt,Xt.current),!0}function Ad(e,t,n){var a=e.stateNode;if(!a)throw Error(ee(169));n?(e=om(e,t,Pn),a.__reactInternalMemoizedMergedChildContext=e,nt(Xt),nt(Rt),et(Rt,e)):nt(Xt),et(Xt,n)}var Or=null,Zo=!1,$i=!1;function im(e){Or===null?Or=[e]:Or.push(e)}function Bh(e){Zo=!0,im(e)}function yn(){if(!$i&&Or!==null){$i=!0;var e=0,t=qe;try{var n=Or;for(qe=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Or=null,Zo=!1}catch(s){throw Or!==null&&(Or=Or.slice(e+1)),Tu(dc,yn),s}finally{qe=t,$i=!1}}return null}var ta=[],ra=0,_o=null,So=0,or=[],ir=0,Rn=null,Fr=1,Dr="";function Nn(e,t){ta[ra++]=So,ta[ra++]=_o,_o=e,So=t}function lm(e,t,n){or[ir++]=Fr,or[ir++]=Dr,or[ir++]=Rn,Rn=e;var a=Fr;e=Dr;var s=32-vr(a)-1;a&=~(1<<s),n+=1;var o=32-vr(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,Fr=1<<32-vr(t)+s|n<<s|a,Dr=o+e}else Fr=1<<o|n<<s|a,Dr=e}function bc(e){e.return!==null&&(Nn(e,1),lm(e,1,0))}function yc(e){for(;e===_o;)_o=ta[--ra],ta[ra]=null,So=ta[--ra],ta[ra]=null;for(;e===Rn;)Rn=or[--ir],or[ir]=null,Dr=or[--ir],or[ir]=null,Fr=or[--ir],or[ir]=null}var tr=null,er=null,it=!1,gr=null;function cm(e,t){var n=lr(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Od(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,tr=e,er=pn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,tr=e,er=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Rn!==null?{id:Fr,overflow:Dr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=lr(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,tr=e,er=null,!0):!1;default:return!1}}function _l(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Sl(e){if(it){var t=er;if(t){var n=t;if(!Od(e,t)){if(_l(e))throw Error(ee(418));t=pn(n.nextSibling);var a=tr;t&&Od(e,t)?cm(a,n):(e.flags=e.flags&-4097|2,it=!1,tr=e)}}else{if(_l(e))throw Error(ee(418));e.flags=e.flags&-4097|2,it=!1,tr=e}}}function Fd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;tr=e}function Fs(e){if(e!==tr)return!1;if(!it)return Fd(e),it=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wl(e.type,e.memoizedProps)),t&&(t=er)){if(_l(e))throw dm(),Error(ee(418));for(;t;)cm(e,t),t=pn(t.nextSibling)}if(Fd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(ee(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){er=pn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}er=null}}else er=tr?pn(e.stateNode.nextSibling):null;return!0}function dm(){for(var e=er;e;)e=pn(e.nextSibling)}function ha(){er=tr=null,it=!1}function wc(e){gr===null?gr=[e]:gr.push(e)}var Wh=Gr.ReactCurrentBatchConfig;function $a(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ee(309));var a=n.stateNode}if(!a)throw Error(ee(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var c=s.refs;i===null?delete c[o]:c[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(ee(284));if(!n._owner)throw Error(ee(290,e))}return e}function Ds(e,t){throw e=Object.prototype.toString.call(t),Error(ee(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Dd(e){var t=e._init;return t(e._payload)}function pm(e){function t(m,f){if(e){var v=m.deletions;v===null?(m.deletions=[f],m.flags|=16):v.push(f)}}function n(m,f){if(!e)return null;for(;f!==null;)t(m,f),f=f.sibling;return null}function a(m,f){for(m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function s(m,f){return m=hn(m,f),m.index=0,m.sibling=null,m}function o(m,f,v){return m.index=v,e?(v=m.alternate,v!==null?(v=v.index,v<f?(m.flags|=2,f):v):(m.flags|=2,f)):(m.flags|=1048576,f)}function i(m){return e&&m.alternate===null&&(m.flags|=2),m}function c(m,f,v,k){return f===null||f.tag!==6?(f=Ai(v,m.mode,k),f.return=m,f):(f=s(f,v),f.return=m,f)}function l(m,f,v,k){var w=v.type;return w===Xn?h(m,f,v.props.children,k,v.key):f!==null&&(f.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===en&&Dd(w)===f.type)?(k=s(f,v.props),k.ref=$a(m,f,v),k.return=m,k):(k=co(v.type,v.key,v.props,null,m.mode,k),k.ref=$a(m,f,v),k.return=m,k)}function d(m,f,v,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==v.containerInfo||f.stateNode.implementation!==v.implementation?(f=Oi(v,m.mode,k),f.return=m,f):(f=s(f,v.children||[]),f.return=m,f)}function h(m,f,v,k,w){return f===null||f.tag!==7?(f=En(v,m.mode,k,w),f.return=m,f):(f=s(f,v),f.return=m,f)}function g(m,f,v){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ai(""+f,m.mode,v),f.return=m,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case zs:return v=co(f.type,f.key,f.props,null,m.mode,v),v.ref=$a(m,null,f),v.return=m,v;case Kn:return f=Oi(f,m.mode,v),f.return=m,f;case en:var k=f._init;return g(m,k(f._payload),v)}if(Aa(f)||_a(f))return f=En(f,m.mode,v,null),f.return=m,f;Ds(m,f)}return null}function u(m,f,v,k){var w=f!==null?f.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return w!==null?null:c(m,f,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case zs:return v.key===w?l(m,f,v,k):null;case Kn:return v.key===w?d(m,f,v,k):null;case en:return w=v._init,u(m,f,w(v._payload),k)}if(Aa(v)||_a(v))return w!==null?null:h(m,f,v,k,null);Ds(m,v)}return null}function x(m,f,v,k,w){if(typeof k=="string"&&k!==""||typeof k=="number")return m=m.get(v)||null,c(f,m,""+k,w);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case zs:return m=m.get(k.key===null?v:k.key)||null,l(f,m,k,w);case Kn:return m=m.get(k.key===null?v:k.key)||null,d(f,m,k,w);case en:var _=k._init;return x(m,f,v,_(k._payload),w)}if(Aa(k)||_a(k))return m=m.get(v)||null,h(f,m,k,w,null);Ds(f,k)}return null}function b(m,f,v,k){for(var w=null,_=null,M=f,z=f=0,O=null;M!==null&&z<v.length;z++){M.index>z?(O=M,M=null):O=M.sibling;var P=u(m,M,v[z],k);if(P===null){M===null&&(M=O);break}e&&M&&P.alternate===null&&t(m,M),f=o(P,f,z),_===null?w=P:_.sibling=P,_=P,M=O}if(z===v.length)return n(m,M),it&&Nn(m,z),w;if(M===null){for(;z<v.length;z++)M=g(m,v[z],k),M!==null&&(f=o(M,f,z),_===null?w=M:_.sibling=M,_=M);return it&&Nn(m,z),w}for(M=a(m,M);z<v.length;z++)O=x(M,m,z,v[z],k),O!==null&&(e&&O.alternate!==null&&M.delete(O.key===null?z:O.key),f=o(O,f,z),_===null?w=O:_.sibling=O,_=O);return e&&M.forEach(function(T){return t(m,T)}),it&&Nn(m,z),w}function j(m,f,v,k){var w=_a(v);if(typeof w!="function")throw Error(ee(150));if(v=w.call(v),v==null)throw Error(ee(151));for(var _=w=null,M=f,z=f=0,O=null,P=v.next();M!==null&&!P.done;z++,P=v.next()){M.index>z?(O=M,M=null):O=M.sibling;var T=u(m,M,P.value,k);if(T===null){M===null&&(M=O);break}e&&M&&T.alternate===null&&t(m,M),f=o(T,f,z),_===null?w=T:_.sibling=T,_=T,M=O}if(P.done)return n(m,M),it&&Nn(m,z),w;if(M===null){for(;!P.done;z++,P=v.next())P=g(m,P.value,k),P!==null&&(f=o(P,f,z),_===null?w=P:_.sibling=P,_=P);return it&&Nn(m,z),w}for(M=a(m,M);!P.done;z++,P=v.next())P=x(M,m,z,P.value,k),P!==null&&(e&&P.alternate!==null&&M.delete(P.key===null?z:P.key),f=o(P,f,z),_===null?w=P:_.sibling=P,_=P);return e&&M.forEach(function(R){return t(m,R)}),it&&Nn(m,z),w}function y(m,f,v,k){if(typeof v=="object"&&v!==null&&v.type===Xn&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case zs:e:{for(var w=v.key,_=f;_!==null;){if(_.key===w){if(w=v.type,w===Xn){if(_.tag===7){n(m,_.sibling),f=s(_,v.props.children),f.return=m,m=f;break e}}else if(_.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===en&&Dd(w)===_.type){n(m,_.sibling),f=s(_,v.props),f.ref=$a(m,_,v),f.return=m,m=f;break e}n(m,_);break}else t(m,_);_=_.sibling}v.type===Xn?(f=En(v.props.children,m.mode,k,v.key),f.return=m,m=f):(k=co(v.type,v.key,v.props,null,m.mode,k),k.ref=$a(m,f,v),k.return=m,m=k)}return i(m);case Kn:e:{for(_=v.key;f!==null;){if(f.key===_)if(f.tag===4&&f.stateNode.containerInfo===v.containerInfo&&f.stateNode.implementation===v.implementation){n(m,f.sibling),f=s(f,v.children||[]),f.return=m,m=f;break e}else{n(m,f);break}else t(m,f);f=f.sibling}f=Oi(v,m.mode,k),f.return=m,m=f}return i(m);case en:return _=v._init,y(m,f,_(v._payload),k)}if(Aa(v))return b(m,f,v,k);if(_a(v))return j(m,f,v,k);Ds(m,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,f!==null&&f.tag===6?(n(m,f.sibling),f=s(f,v),f.return=m,m=f):(n(m,f),f=Ai(v,m.mode,k),f.return=m,m=f),i(m)):n(m,f)}return y}var ga=pm(!0),um=pm(!1),Co=bn(null),Mo=null,na=null,kc=null;function jc(){kc=na=Mo=null}function Nc(e){var t=Co.current;nt(Co),e._currentValue=t}function Cl(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function da(e,t){Mo=e,kc=na=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Gt=!0),e.firstContext=null)}function dr(e){var t=e._currentValue;if(kc!==e)if(e={context:e,memoizedValue:t,next:null},na===null){if(Mo===null)throw Error(ee(308));na=e,Mo.dependencies={lanes:0,firstContext:e}}else na=na.next=e;return t}var Cn=null;function _c(e){Cn===null?Cn=[e]:Cn.push(e)}function mm(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,_c(t)):(n.next=s.next,s.next=n),t.interleaved=n,Vr(e,a)}function Vr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var tn=!1;function Sc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Br(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function un(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,Ue&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Vr(e,n)}return s=a.interleaved,s===null?(t.next=t,_c(a)):(t.next=s.next,s.next=t),a.interleaved=t,Vr(e,n)}function no(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,pc(e,n)}}function Bd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function zo(e,t,n,a){var s=e.updateQueue;tn=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var l=c,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var h=e.alternate;h!==null&&(h=h.updateQueue,c=h.lastBaseUpdate,c!==i&&(c===null?h.firstBaseUpdate=d:c.next=d,h.lastBaseUpdate=l))}if(o!==null){var g=s.baseState;i=0,h=d=l=null,c=o;do{var u=c.lane,x=c.eventTime;if((a&u)===u){h!==null&&(h=h.next={eventTime:x,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var b=e,j=c;switch(u=t,x=n,j.tag){case 1:if(b=j.payload,typeof b=="function"){g=b.call(x,g,u);break e}g=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=j.payload,u=typeof b=="function"?b.call(x,g,u):b,u==null)break e;g=ft({},g,u);break e;case 2:tn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[c]:u.push(c))}else x={eventTime:x,lane:u,tag:c.tag,payload:c.payload,callback:c.callback,next:null},h===null?(d=h=x,l=g):h=h.next=x,i|=u;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;u=c,c=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(h===null&&(l=g),s.baseState=l,s.firstBaseUpdate=d,s.lastBaseUpdate=h,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Ln|=i,e.lanes=i,e.memoizedState=g}}function Wd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(ee(191,s));s.call(a)}}}var Ns={},zr=bn(Ns),ds=bn(Ns),ps=bn(Ns);function Mn(e){if(e===Ns)throw Error(ee(174));return e}function Cc(e,t){switch(et(ps,t),et(ds,e),et(zr,Ns),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:il(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=il(t,e)}nt(zr),et(zr,t)}function xa(){nt(zr),nt(ds),nt(ps)}function hm(e){Mn(ps.current);var t=Mn(zr.current),n=il(t,e.type);t!==n&&(et(ds,e),et(zr,n))}function Mc(e){ds.current===e&&(nt(zr),nt(ds))}var ut=bn(0);function $o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ei=[];function zc(){for(var e=0;e<Ei.length;e++)Ei[e]._workInProgressVersionPrimary=null;Ei.length=0}var ao=Gr.ReactCurrentDispatcher,Ti=Gr.ReactCurrentBatchConfig,In=0,mt=null,jt=null,_t=null,Eo=!1,Xa=!1,us=0,Uh=0;function Et(){throw Error(ee(321))}function $c(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!yr(e[n],t[n]))return!1;return!0}function Ec(e,t,n,a,s,o){if(In=o,mt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ao.current=e===null||e.memoizedState===null?Gh:Kh,e=n(a,s),Xa){o=0;do{if(Xa=!1,us=0,25<=o)throw Error(ee(301));o+=1,_t=jt=null,t.updateQueue=null,ao.current=Xh,e=n(a,s)}while(Xa)}if(ao.current=To,t=jt!==null&&jt.next!==null,In=0,_t=jt=mt=null,Eo=!1,t)throw Error(ee(300));return e}function Tc(){var e=us!==0;return us=0,e}function Sr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?mt.memoizedState=_t=e:_t=_t.next=e,_t}function pr(){if(jt===null){var e=mt.alternate;e=e!==null?e.memoizedState:null}else e=jt.next;var t=_t===null?mt.memoizedState:_t.next;if(t!==null)_t=t,jt=e;else{if(e===null)throw Error(ee(310));jt=e,e={memoizedState:jt.memoizedState,baseState:jt.baseState,baseQueue:jt.baseQueue,queue:jt.queue,next:null},_t===null?mt.memoizedState=_t=e:_t=_t.next=e}return _t}function ms(e,t){return typeof t=="function"?t(e):t}function Pi(e){var t=pr(),n=t.queue;if(n===null)throw Error(ee(311));n.lastRenderedReducer=e;var a=jt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var c=i=null,l=null,d=o;do{var h=d.lane;if((In&h)===h)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=g,i=a):l=l.next=g,mt.lanes|=h,Ln|=h}d=d.next}while(d!==null&&d!==o);l===null?i=a:l.next=c,yr(a,t.memoizedState)||(Gt=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=l,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,mt.lanes|=o,Ln|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ri(e){var t=pr(),n=t.queue;if(n===null)throw Error(ee(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);yr(o,t.memoizedState)||(Gt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function gm(){}function xm(e,t){var n=mt,a=pr(),s=t(),o=!yr(a.memoizedState,s);if(o&&(a.memoizedState=s,Gt=!0),a=a.queue,Pc(ym.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||_t!==null&&_t.memoizedState.tag&1){if(n.flags|=2048,fs(9,bm.bind(null,n,a,s,t),void 0,null),St===null)throw Error(ee(349));In&30||vm(n,t,s)}return s}function vm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=mt.updateQueue,t===null?(t={lastEffect:null,stores:null},mt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bm(e,t,n,a){t.value=n,t.getSnapshot=a,wm(t)&&km(e)}function ym(e,t,n){return n(function(){wm(t)&&km(e)})}function wm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!yr(e,n)}catch{return!0}}function km(e){var t=Vr(e,1);t!==null&&br(t,e,1,-1)}function Ud(e){var t=Sr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t.queue=e,e=e.dispatch=Yh.bind(null,mt,e),[t.memoizedState,e]}function fs(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=mt.updateQueue,t===null?(t={lastEffect:null,stores:null},mt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function jm(){return pr().memoizedState}function so(e,t,n,a){var s=Sr();mt.flags|=e,s.memoizedState=fs(1|t,n,void 0,a===void 0?null:a)}function ei(e,t,n,a){var s=pr();a=a===void 0?null:a;var o=void 0;if(jt!==null){var i=jt.memoizedState;if(o=i.destroy,a!==null&&$c(a,i.deps)){s.memoizedState=fs(t,n,o,a);return}}mt.flags|=e,s.memoizedState=fs(1|t,n,o,a)}function Vd(e,t){return so(8390656,8,e,t)}function Pc(e,t){return ei(2048,8,e,t)}function Nm(e,t){return ei(4,2,e,t)}function _m(e,t){return ei(4,4,e,t)}function Sm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Cm(e,t,n){return n=n!=null?n.concat([e]):null,ei(4,4,Sm.bind(null,t,e),n)}function Rc(){}function Mm(e,t){var n=pr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&$c(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function zm(e,t){var n=pr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&$c(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function $m(e,t,n){return In&21?(yr(n,t)||(n=Iu(),mt.lanes|=n,Ln|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Gt=!0),e.memoizedState=n)}function Vh(e,t){var n=qe;qe=n!==0&&4>n?n:4,e(!0);var a=Ti.transition;Ti.transition={};try{e(!1),t()}finally{qe=n,Ti.transition=a}}function Em(){return pr().memoizedState}function Hh(e,t,n){var a=fn(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Tm(e))Pm(t,n);else if(n=mm(e,t,n,a),n!==null){var s=Ft();br(n,e,a,s),Rm(n,t,a)}}function Yh(e,t,n){var a=fn(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Tm(e))Pm(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,c=o(i,n);if(s.hasEagerState=!0,s.eagerState=c,yr(c,i)){var l=t.interleaved;l===null?(s.next=s,_c(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=mm(e,t,s,a),n!==null&&(s=Ft(),br(n,e,a,s),Rm(n,t,a))}}function Tm(e){var t=e.alternate;return e===mt||t!==null&&t===mt}function Pm(e,t){Xa=Eo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rm(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,pc(e,n)}}var To={readContext:dr,useCallback:Et,useContext:Et,useEffect:Et,useImperativeHandle:Et,useInsertionEffect:Et,useLayoutEffect:Et,useMemo:Et,useReducer:Et,useRef:Et,useState:Et,useDebugValue:Et,useDeferredValue:Et,useTransition:Et,useMutableSource:Et,useSyncExternalStore:Et,useId:Et,unstable_isNewReconciler:!1},Gh={readContext:dr,useCallback:function(e,t){return Sr().memoizedState=[e,t===void 0?null:t],e},useContext:dr,useEffect:Vd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,so(4194308,4,Sm.bind(null,t,e),n)},useLayoutEffect:function(e,t){return so(4194308,4,e,t)},useInsertionEffect:function(e,t){return so(4,2,e,t)},useMemo:function(e,t){var n=Sr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Sr();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=Hh.bind(null,mt,e),[a.memoizedState,e]},useRef:function(e){var t=Sr();return e={current:e},t.memoizedState=e},useState:Ud,useDebugValue:Rc,useDeferredValue:function(e){return Sr().memoizedState=e},useTransition:function(){var e=Ud(!1),t=e[0];return e=Vh.bind(null,e[1]),Sr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=mt,s=Sr();if(it){if(n===void 0)throw Error(ee(407));n=n()}else{if(n=t(),St===null)throw Error(ee(349));In&30||vm(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,Vd(ym.bind(null,a,o,e),[e]),a.flags|=2048,fs(9,bm.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=Sr(),t=St.identifierPrefix;if(it){var n=Dr,a=Fr;n=(a&~(1<<32-vr(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=us++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Uh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Kh={readContext:dr,useCallback:Mm,useContext:dr,useEffect:Pc,useImperativeHandle:Cm,useInsertionEffect:Nm,useLayoutEffect:_m,useMemo:zm,useReducer:Pi,useRef:jm,useState:function(){return Pi(ms)},useDebugValue:Rc,useDeferredValue:function(e){var t=pr();return $m(t,jt.memoizedState,e)},useTransition:function(){var e=Pi(ms)[0],t=pr().memoizedState;return[e,t]},useMutableSource:gm,useSyncExternalStore:xm,useId:Em,unstable_isNewReconciler:!1},Xh={readContext:dr,useCallback:Mm,useContext:dr,useEffect:Pc,useImperativeHandle:Cm,useInsertionEffect:Nm,useLayoutEffect:_m,useMemo:zm,useReducer:Ri,useRef:jm,useState:function(){return Ri(ms)},useDebugValue:Rc,useDeferredValue:function(e){var t=pr();return jt===null?t.memoizedState=e:$m(t,jt.memoizedState,e)},useTransition:function(){var e=Ri(ms)[0],t=pr().memoizedState;return[e,t]},useMutableSource:gm,useSyncExternalStore:xm,useId:Em,unstable_isNewReconciler:!1};function fr(e,t){if(e&&e.defaultProps){t=ft({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ml(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:ft({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ti={isMounted:function(e){return(e=e._reactInternals)?Dn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Ft(),s=fn(e),o=Br(a,s);o.payload=t,n!=null&&(o.callback=n),t=un(e,o,s),t!==null&&(br(t,e,s,a),no(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Ft(),s=fn(e),o=Br(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=un(e,o,s),t!==null&&(br(t,e,s,a),no(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ft(),a=fn(e),s=Br(n,a);s.tag=2,t!=null&&(s.callback=t),t=un(e,s,a),t!==null&&(br(t,e,a,n),no(t,e,a))}};function Hd(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!os(n,a)||!os(s,o):!0}function Im(e,t,n){var a=!1,s=xn,o=t.contextType;return typeof o=="object"&&o!==null?o=dr(o):(s=qt(t)?Pn:Rt.current,a=t.contextTypes,o=(a=a!=null)?fa(e,s):xn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ti,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function Yd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&ti.enqueueReplaceState(t,t.state,null)}function zl(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Sc(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=dr(o):(o=qt(t)?Pn:Rt.current,s.context=fa(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Ml(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ti.enqueueReplaceState(s,s.state,null),zo(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function va(e,t){try{var n="",a=t;do n+=j0(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function Ii(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function $l(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var qh=typeof WeakMap=="function"?WeakMap:Map;function Lm(e,t,n){n=Br(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Ro||(Ro=!0,Dl=a),$l(e,t)},n}function Am(e,t,n){n=Br(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){$l(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){$l(e,t),typeof a!="function"&&(mn===null?mn=new Set([this]):mn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Gd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new qh;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=dg.bind(null,e,t,n),t.then(e,e))}function Kd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Xd(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Br(-1,1),t.tag=2,un(n,t,1))),n.lanes|=1),e)}var Qh=Gr.ReactCurrentOwner,Gt=!1;function Ot(e,t,n,a){t.child=e===null?um(t,null,n,a):ga(t,e.child,n,a)}function qd(e,t,n,a,s){n=n.render;var o=t.ref;return da(t,s),a=Ec(e,t,n,a,o,s),n=Tc(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Hr(e,t,s)):(it&&n&&bc(t),t.flags|=1,Ot(e,t,a,s),t.child)}function Qd(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!Wc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Om(e,t,o,a,s)):(e=co(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:os,n(i,a)&&e.ref===t.ref)return Hr(e,t,s)}return t.flags|=1,e=hn(o,a),e.ref=t.ref,e.return=t,t.child=e}function Om(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(os(o,a)&&e.ref===t.ref)if(Gt=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Gt=!0);else return t.lanes=e.lanes,Hr(e,t,s)}return El(e,t,n,a,s)}function Fm(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},et(sa,Zt),Zt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,et(sa,Zt),Zt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,et(sa,Zt),Zt|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,et(sa,Zt),Zt|=a;return Ot(e,t,s,n),t.child}function Dm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function El(e,t,n,a,s){var o=qt(n)?Pn:Rt.current;return o=fa(t,o),da(t,s),n=Ec(e,t,n,a,o,s),a=Tc(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Hr(e,t,s)):(it&&a&&bc(t),t.flags|=1,Ot(e,t,n,s),t.child)}function Jd(e,t,n,a,s){if(qt(n)){var o=!0;No(t)}else o=!1;if(da(t,s),t.stateNode===null)oo(e,t),Im(t,n,a),zl(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var l=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=dr(d):(d=qt(n)?Pn:Rt.current,d=fa(t,d));var h=n.getDerivedStateFromProps,g=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==a||l!==d)&&Yd(t,i,a,d),tn=!1;var u=t.memoizedState;i.state=u,zo(t,a,i,s),l=t.memoizedState,c!==a||u!==l||Xt.current||tn?(typeof h=="function"&&(Ml(t,n,h,a),l=t.memoizedState),(c=tn||Hd(t,n,c,a,u,l,d))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=l),i.props=a,i.state=l,i.context=d,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,fm(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:fr(t.type,c),i.props=d,g=t.pendingProps,u=i.context,l=n.contextType,typeof l=="object"&&l!==null?l=dr(l):(l=qt(n)?Pn:Rt.current,l=fa(t,l));var x=n.getDerivedStateFromProps;(h=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==g||u!==l)&&Yd(t,i,a,l),tn=!1,u=t.memoizedState,i.state=u,zo(t,a,i,s);var b=t.memoizedState;c!==g||u!==b||Xt.current||tn?(typeof x=="function"&&(Ml(t,n,x,a),b=t.memoizedState),(d=tn||Hd(t,n,d,a,u,b,l)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,b,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,b,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=b),i.props=a,i.state=b,i.context=l,a=d):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),a=!1)}return Tl(e,t,n,a,o,s)}function Tl(e,t,n,a,s,o){Dm(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&Ad(t,n,!1),Hr(e,t,o);a=t.stateNode,Qh.current=t;var c=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=ga(t,e.child,null,o),t.child=ga(t,null,c,o)):Ot(e,t,c,o),t.memoizedState=a.state,s&&Ad(t,n,!0),t.child}function Bm(e){var t=e.stateNode;t.pendingContext?Ld(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ld(e,t.context,!1),Cc(e,t.containerInfo)}function Zd(e,t,n,a,s){return ha(),wc(s),t.flags|=256,Ot(e,t,n,a),t.child}var Pl={dehydrated:null,treeContext:null,retryLane:0};function Rl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Wm(e,t,n){var a=t.pendingProps,s=ut.current,o=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),et(ut,s&1),e===null)return Sl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=ai(i,a,0,null),e=En(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Rl(n),t.memoizedState=Pl,e):Ic(t,i));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Jh(e,t,i,a,c,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,c=s.sibling;var l={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=l,t.deletions=null):(a=hn(s,l),a.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=hn(c,o):(o=En(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?Rl(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=Pl,a}return o=e.child,e=o.sibling,a=hn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Ic(e,t){return t=ai({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Bs(e,t,n,a){return a!==null&&wc(a),ga(t,e.child,null,n),e=Ic(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Jh(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=Ii(Error(ee(422))),Bs(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=ai({mode:"visible",children:a.children},s,0,null),o=En(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&ga(t,e.child,null,i),t.child.memoizedState=Rl(i),t.memoizedState=Pl,o);if(!(t.mode&1))return Bs(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var c=a.dgst;return a=c,o=Error(ee(419)),a=Ii(o,a,void 0),Bs(e,t,i,a)}if(c=(i&e.childLanes)!==0,Gt||c){if(a=St,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Vr(e,s),br(a,e,s,-1))}return Bc(),a=Ii(Error(ee(421))),Bs(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=pg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,er=pn(s.nextSibling),tr=t,it=!0,gr=null,e!==null&&(or[ir++]=Fr,or[ir++]=Dr,or[ir++]=Rn,Fr=e.id,Dr=e.overflow,Rn=t),t=Ic(t,a.children),t.flags|=4096,t)}function ep(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Cl(e.return,t,n)}function Li(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function Um(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(Ot(e,t,a.children,n),a=ut.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ep(e,n,t);else if(e.tag===19)ep(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(et(ut,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&$o(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Li(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&$o(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Li(t,!0,n,null,o);break;case"together":Li(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function oo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ln|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(ee(153));if(t.child!==null){for(e=t.child,n=hn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Zh(e,t,n){switch(t.tag){case 3:Bm(t),ha();break;case 5:hm(t);break;case 1:qt(t.type)&&No(t);break;case 4:Cc(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;et(Co,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(et(ut,ut.current&1),t.flags|=128,null):n&t.child.childLanes?Wm(e,t,n):(et(ut,ut.current&1),e=Hr(e,t,n),e!==null?e.sibling:null);et(ut,ut.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return Um(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),et(ut,ut.current),a)break;return null;case 22:case 23:return t.lanes=0,Fm(e,t,n)}return Hr(e,t,n)}var Vm,Il,Hm,Ym;Vm=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Il=function(){};Hm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,Mn(zr.current);var o=null;switch(n){case"input":s=nl(e,s),a=nl(e,a),o=[];break;case"select":s=ft({},s,{value:void 0}),a=ft({},a,{value:void 0}),o=[];break;case"textarea":s=ol(e,s),a=ol(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=ko)}ll(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var c=s[d];for(i in c)c.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Za.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var l=a[d];if(c=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(i in c)!c.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in l)l.hasOwnProperty(i)&&c[i]!==l[i]&&(n||(n={}),n[i]=l[i])}else n||(o||(o=[]),o.push(d,n)),n=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Za.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&rt("scroll",e),o||c===l||(o=[])):(o=o||[]).push(d,l))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};Ym=function(e,t,n,a){n!==a&&(t.flags|=4)};function Ea(e,t){if(!it)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function eg(e,t,n){var a=t.pendingProps;switch(yc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Tt(t),null;case 1:return qt(t.type)&&jo(),Tt(t),null;case 3:return a=t.stateNode,xa(),nt(Xt),nt(Rt),zc(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Fs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,gr!==null&&(Ul(gr),gr=null))),Il(e,t),Tt(t),null;case 5:Mc(t);var s=Mn(ps.current);if(n=t.type,e!==null&&t.stateNode!=null)Hm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(ee(166));return Tt(t),null}if(e=Mn(zr.current),Fs(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[Cr]=t,a[cs]=o,e=(t.mode&1)!==0,n){case"dialog":rt("cancel",a),rt("close",a);break;case"iframe":case"object":case"embed":rt("load",a);break;case"video":case"audio":for(s=0;s<Fa.length;s++)rt(Fa[s],a);break;case"source":rt("error",a);break;case"img":case"image":case"link":rt("error",a),rt("load",a);break;case"details":rt("toggle",a);break;case"input":cd(a,o),rt("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},rt("invalid",a);break;case"textarea":pd(a,o),rt("invalid",a)}ll(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="children"?typeof c=="string"?a.textContent!==c&&(o.suppressHydrationWarning!==!0&&Os(a.textContent,c,e),s=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Os(a.textContent,c,e),s=["children",""+c]):Za.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&rt("scroll",a)}switch(n){case"input":$s(a),dd(a,o,!0);break;case"textarea":$s(a),ud(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=ko)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=yu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[Cr]=t,e[cs]=a,Vm(e,t,!1,!1),t.stateNode=e;e:{switch(i=cl(n,a),n){case"dialog":rt("cancel",e),rt("close",e),s=a;break;case"iframe":case"object":case"embed":rt("load",e),s=a;break;case"video":case"audio":for(s=0;s<Fa.length;s++)rt(Fa[s],e);s=a;break;case"source":rt("error",e),s=a;break;case"img":case"image":case"link":rt("error",e),rt("load",e),s=a;break;case"details":rt("toggle",e),s=a;break;case"input":cd(e,a),s=nl(e,a),rt("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=ft({},a,{value:void 0}),rt("invalid",e);break;case"textarea":pd(e,a),s=ol(e,a),rt("invalid",e);break;default:s=a}ll(n,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var l=c[o];o==="style"?ju(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&wu(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&es(e,l):typeof l=="number"&&es(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Za.hasOwnProperty(o)?l!=null&&o==="onScroll"&&rt("scroll",e):l!=null&&sc(e,o,l,i))}switch(n){case"input":$s(e),dd(e,a,!1);break;case"textarea":$s(e),ud(e);break;case"option":a.value!=null&&e.setAttribute("value",""+gn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?oa(e,!!a.multiple,o,!1):a.defaultValue!=null&&oa(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ko)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Tt(t),null;case 6:if(e&&t.stateNode!=null)Ym(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(ee(166));if(n=Mn(ps.current),Mn(zr.current),Fs(t)){if(a=t.stateNode,n=t.memoizedProps,a[Cr]=t,(o=a.nodeValue!==n)&&(e=tr,e!==null))switch(e.tag){case 3:Os(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Os(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Cr]=t,t.stateNode=a}return Tt(t),null;case 13:if(nt(ut),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(it&&er!==null&&t.mode&1&&!(t.flags&128))dm(),ha(),t.flags|=98560,o=!1;else if(o=Fs(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(ee(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(ee(317));o[Cr]=t}else ha(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Tt(t),o=!1}else gr!==null&&(Ul(gr),gr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||ut.current&1?Nt===0&&(Nt=3):Bc())),t.updateQueue!==null&&(t.flags|=4),Tt(t),null);case 4:return xa(),Il(e,t),e===null&&is(t.stateNode.containerInfo),Tt(t),null;case 10:return Nc(t.type._context),Tt(t),null;case 17:return qt(t.type)&&jo(),Tt(t),null;case 19:if(nt(ut),o=t.memoizedState,o===null)return Tt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)Ea(o,!1);else{if(Nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=$o(e),i!==null){for(t.flags|=128,Ea(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return et(ut,ut.current&1|2),t.child}e=e.sibling}o.tail!==null&&bt()>ba&&(t.flags|=128,a=!0,Ea(o,!1),t.lanes=4194304)}else{if(!a)if(e=$o(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ea(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!it)return Tt(t),null}else 2*bt()-o.renderingStartTime>ba&&n!==1073741824&&(t.flags|=128,a=!0,Ea(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=bt(),t.sibling=null,n=ut.current,et(ut,a?n&1|2:n&1),t):(Tt(t),null);case 22:case 23:return Dc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Zt&1073741824&&(Tt(t),t.subtreeFlags&6&&(t.flags|=8192)):Tt(t),null;case 24:return null;case 25:return null}throw Error(ee(156,t.tag))}function tg(e,t){switch(yc(t),t.tag){case 1:return qt(t.type)&&jo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xa(),nt(Xt),nt(Rt),zc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Mc(t),null;case 13:if(nt(ut),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(ee(340));ha()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return nt(ut),null;case 4:return xa(),null;case 10:return Nc(t.type._context),null;case 22:case 23:return Dc(),null;case 24:return null;default:return null}}var Ws=!1,Pt=!1,rg=typeof WeakSet=="function"?WeakSet:Set,fe=null;function aa(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){xt(e,t,a)}else n.current=null}function Ll(e,t,n){try{n()}catch(a){xt(e,t,a)}}var tp=!1;function ng(e,t){if(bl=bo,e=Qu(),vc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,c=-1,l=-1,d=0,h=0,g=e,u=null;t:for(;;){for(var x;g!==n||s!==0&&g.nodeType!==3||(c=i+s),g!==o||a!==0&&g.nodeType!==3||(l=i+a),g.nodeType===3&&(i+=g.nodeValue.length),(x=g.firstChild)!==null;)u=g,g=x;for(;;){if(g===e)break t;if(u===n&&++d===s&&(c=i),u===o&&++h===a&&(l=i),(x=g.nextSibling)!==null)break;g=u,u=g.parentNode}g=x}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(yl={focusedElem:e,selectionRange:n},bo=!1,fe=t;fe!==null;)if(t=fe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,fe=e;else for(;fe!==null;){t=fe;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var j=b.memoizedProps,y=b.memoizedState,m=t.stateNode,f=m.getSnapshotBeforeUpdate(t.elementType===t.type?j:fr(t.type,j),y);m.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ee(163))}}catch(k){xt(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,fe=e;break}fe=t.return}return b=tp,tp=!1,b}function qa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Ll(t,n,o)}s=s.next}while(s!==a)}}function ri(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function Al(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Gm(e){var t=e.alternate;t!==null&&(e.alternate=null,Gm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Cr],delete t[cs],delete t[jl],delete t[Fh],delete t[Dh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Km(e){return e.tag===5||e.tag===3||e.tag===4}function rp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Km(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ol(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ko));else if(a!==4&&(e=e.child,e!==null))for(Ol(e,t,n),e=e.sibling;e!==null;)Ol(e,t,n),e=e.sibling}function Fl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Fl(e,t,n),e=e.sibling;e!==null;)Fl(e,t,n),e=e.sibling}var Mt=null,hr=!1;function Zr(e,t,n){for(n=n.child;n!==null;)Xm(e,t,n),n=n.sibling}function Xm(e,t,n){if(Mr&&typeof Mr.onCommitFiberUnmount=="function")try{Mr.onCommitFiberUnmount(Ko,n)}catch{}switch(n.tag){case 5:Pt||aa(n,t);case 6:var a=Mt,s=hr;Mt=null,Zr(e,t,n),Mt=a,hr=s,Mt!==null&&(hr?(e=Mt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Mt.removeChild(n.stateNode));break;case 18:Mt!==null&&(hr?(e=Mt,n=n.stateNode,e.nodeType===8?zi(e.parentNode,n):e.nodeType===1&&zi(e,n),as(e)):zi(Mt,n.stateNode));break;case 4:a=Mt,s=hr,Mt=n.stateNode.containerInfo,hr=!0,Zr(e,t,n),Mt=a,hr=s;break;case 0:case 11:case 14:case 15:if(!Pt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Ll(n,t,i),s=s.next}while(s!==a)}Zr(e,t,n);break;case 1:if(!Pt&&(aa(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(c){xt(n,t,c)}Zr(e,t,n);break;case 21:Zr(e,t,n);break;case 22:n.mode&1?(Pt=(a=Pt)||n.memoizedState!==null,Zr(e,t,n),Pt=a):Zr(e,t,n);break;default:Zr(e,t,n)}}function np(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new rg),t.forEach(function(a){var s=ug.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function mr(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:Mt=c.stateNode,hr=!1;break e;case 3:Mt=c.stateNode.containerInfo,hr=!0;break e;case 4:Mt=c.stateNode.containerInfo,hr=!0;break e}c=c.return}if(Mt===null)throw Error(ee(160));Xm(o,i,s),Mt=null,hr=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(d){xt(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)qm(t,e),t=t.sibling}function qm(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(mr(t,e),_r(e),a&4){try{qa(3,e,e.return),ri(3,e)}catch(j){xt(e,e.return,j)}try{qa(5,e,e.return)}catch(j){xt(e,e.return,j)}}break;case 1:mr(t,e),_r(e),a&512&&n!==null&&aa(n,n.return);break;case 5:if(mr(t,e),_r(e),a&512&&n!==null&&aa(n,n.return),e.flags&32){var s=e.stateNode;try{es(s,"")}catch(j){xt(e,e.return,j)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&vu(s,o),cl(c,i);var d=cl(c,o);for(i=0;i<l.length;i+=2){var h=l[i],g=l[i+1];h==="style"?ju(s,g):h==="dangerouslySetInnerHTML"?wu(s,g):h==="children"?es(s,g):sc(s,h,g,d)}switch(c){case"input":al(s,o);break;case"textarea":bu(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var x=o.value;x!=null?oa(s,!!o.multiple,x,!1):u!==!!o.multiple&&(o.defaultValue!=null?oa(s,!!o.multiple,o.defaultValue,!0):oa(s,!!o.multiple,o.multiple?[]:"",!1))}s[cs]=o}catch(j){xt(e,e.return,j)}}break;case 6:if(mr(t,e),_r(e),a&4){if(e.stateNode===null)throw Error(ee(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(j){xt(e,e.return,j)}}break;case 3:if(mr(t,e),_r(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{as(t.containerInfo)}catch(j){xt(e,e.return,j)}break;case 4:mr(t,e),_r(e);break;case 13:mr(t,e),_r(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(Oc=bt())),a&4&&np(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(Pt=(d=Pt)||h,mr(t,e),Pt=d):mr(t,e),_r(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(fe=e,h=e.child;h!==null;){for(g=fe=h;fe!==null;){switch(u=fe,x=u.child,u.tag){case 0:case 11:case 14:case 15:qa(4,u,u.return);break;case 1:aa(u,u.return);var b=u.stateNode;if(typeof b.componentWillUnmount=="function"){a=u,n=u.return;try{t=a,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(j){xt(a,n,j)}}break;case 5:aa(u,u.return);break;case 22:if(u.memoizedState!==null){sp(g);continue}}x!==null?(x.return=u,fe=x):sp(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{s=g.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=g.stateNode,l=g.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=ku("display",i))}catch(j){xt(e,e.return,j)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(j){xt(e,e.return,j)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:mr(t,e),_r(e),a&4&&np(e);break;case 21:break;default:mr(t,e),_r(e)}}function _r(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Km(n)){var a=n;break e}n=n.return}throw Error(ee(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(es(s,""),a.flags&=-33);var o=rp(e);Fl(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,c=rp(e);Ol(e,c,i);break;default:throw Error(ee(161))}}catch(l){xt(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ag(e,t,n){fe=e,Qm(e)}function Qm(e,t,n){for(var a=(e.mode&1)!==0;fe!==null;){var s=fe,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||Ws;if(!i){var c=s.alternate,l=c!==null&&c.memoizedState!==null||Pt;c=Ws;var d=Pt;if(Ws=i,(Pt=l)&&!d)for(fe=s;fe!==null;)i=fe,l=i.child,i.tag===22&&i.memoizedState!==null?op(s):l!==null?(l.return=i,fe=l):op(s);for(;o!==null;)fe=o,Qm(o),o=o.sibling;fe=s,Ws=c,Pt=d}ap(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,fe=o):ap(e)}}function ap(e){for(;fe!==null;){var t=fe;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Pt||ri(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!Pt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:fr(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Wd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Wd(t,i,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&as(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ee(163))}Pt||t.flags&512&&Al(t)}catch(u){xt(t,t.return,u)}}if(t===e){fe=null;break}if(n=t.sibling,n!==null){n.return=t.return,fe=n;break}fe=t.return}}function sp(e){for(;fe!==null;){var t=fe;if(t===e){fe=null;break}var n=t.sibling;if(n!==null){n.return=t.return,fe=n;break}fe=t.return}}function op(e){for(;fe!==null;){var t=fe;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ri(4,t)}catch(l){xt(t,n,l)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(l){xt(t,s,l)}}var o=t.return;try{Al(t)}catch(l){xt(t,o,l)}break;case 5:var i=t.return;try{Al(t)}catch(l){xt(t,i,l)}}}catch(l){xt(t,t.return,l)}if(t===e){fe=null;break}var c=t.sibling;if(c!==null){c.return=t.return,fe=c;break}fe=t.return}}var sg=Math.ceil,Po=Gr.ReactCurrentDispatcher,Lc=Gr.ReactCurrentOwner,cr=Gr.ReactCurrentBatchConfig,Ue=0,St=null,wt=null,zt=0,Zt=0,sa=bn(0),Nt=0,hs=null,Ln=0,ni=0,Ac=0,Qa=null,Yt=null,Oc=0,ba=1/0,Ar=null,Ro=!1,Dl=null,mn=null,Us=!1,on=null,Io=0,Ja=0,Bl=null,io=-1,lo=0;function Ft(){return Ue&6?bt():io!==-1?io:io=bt()}function fn(e){return e.mode&1?Ue&2&&zt!==0?zt&-zt:Wh.transition!==null?(lo===0&&(lo=Iu()),lo):(e=qe,e!==0||(e=window.event,e=e===void 0?16:Wu(e.type)),e):1}function br(e,t,n,a){if(50<Ja)throw Ja=0,Bl=null,Error(ee(185));ws(e,n,a),(!(Ue&2)||e!==St)&&(e===St&&(!(Ue&2)&&(ni|=n),Nt===4&&an(e,zt)),Qt(e,a),n===1&&Ue===0&&!(t.mode&1)&&(ba=bt()+500,Zo&&yn()))}function Qt(e,t){var n=e.callbackNode;W0(e,t);var a=vo(e,e===St?zt:0);if(a===0)n!==null&&hd(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&hd(n),t===1)e.tag===0?Bh(ip.bind(null,e)):im(ip.bind(null,e)),Ah(function(){!(Ue&6)&&yn()}),n=null;else{switch(Lu(a)){case 1:n=dc;break;case 4:n=Pu;break;case 16:n=xo;break;case 536870912:n=Ru;break;default:n=xo}n=sf(n,Jm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Jm(e,t){if(io=-1,lo=0,Ue&6)throw Error(ee(327));var n=e.callbackNode;if(pa()&&e.callbackNode!==n)return null;var a=vo(e,e===St?zt:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Lo(e,a);else{t=a;var s=Ue;Ue|=2;var o=ef();(St!==e||zt!==t)&&(Ar=null,ba=bt()+500,$n(e,t));do try{lg();break}catch(c){Zm(e,c)}while(!0);jc(),Po.current=o,Ue=s,wt!==null?t=0:(St=null,zt=0,t=Nt)}if(t!==0){if(t===2&&(s=fl(e),s!==0&&(a=s,t=Wl(e,s))),t===1)throw n=hs,$n(e,0),an(e,a),Qt(e,bt()),n;if(t===6)an(e,a);else{if(s=e.current.alternate,!(a&30)&&!og(s)&&(t=Lo(e,a),t===2&&(o=fl(e),o!==0&&(a=o,t=Wl(e,o))),t===1))throw n=hs,$n(e,0),an(e,a),Qt(e,bt()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(ee(345));case 2:_n(e,Yt,Ar);break;case 3:if(an(e,a),(a&130023424)===a&&(t=Oc+500-bt(),10<t)){if(vo(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){Ft(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=kl(_n.bind(null,e,Yt,Ar),t);break}_n(e,Yt,Ar);break;case 4:if(an(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-vr(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=bt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*sg(a/1960))-a,10<a){e.timeoutHandle=kl(_n.bind(null,e,Yt,Ar),a);break}_n(e,Yt,Ar);break;case 5:_n(e,Yt,Ar);break;default:throw Error(ee(329))}}}return Qt(e,bt()),e.callbackNode===n?Jm.bind(null,e):null}function Wl(e,t){var n=Qa;return e.current.memoizedState.isDehydrated&&($n(e,t).flags|=256),e=Lo(e,t),e!==2&&(t=Yt,Yt=n,t!==null&&Ul(t)),e}function Ul(e){Yt===null?Yt=e:Yt.push.apply(Yt,e)}function og(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!yr(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function an(e,t){for(t&=~Ac,t&=~ni,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-vr(t),a=1<<n;e[n]=-1,t&=~a}}function ip(e){if(Ue&6)throw Error(ee(327));pa();var t=vo(e,0);if(!(t&1))return Qt(e,bt()),null;var n=Lo(e,t);if(e.tag!==0&&n===2){var a=fl(e);a!==0&&(t=a,n=Wl(e,a))}if(n===1)throw n=hs,$n(e,0),an(e,t),Qt(e,bt()),n;if(n===6)throw Error(ee(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,_n(e,Yt,Ar),Qt(e,bt()),null}function Fc(e,t){var n=Ue;Ue|=1;try{return e(t)}finally{Ue=n,Ue===0&&(ba=bt()+500,Zo&&yn())}}function An(e){on!==null&&on.tag===0&&!(Ue&6)&&pa();var t=Ue;Ue|=1;var n=cr.transition,a=qe;try{if(cr.transition=null,qe=1,e)return e()}finally{qe=a,cr.transition=n,Ue=t,!(Ue&6)&&yn()}}function Dc(){Zt=sa.current,nt(sa)}function $n(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lh(n)),wt!==null)for(n=wt.return;n!==null;){var a=n;switch(yc(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&jo();break;case 3:xa(),nt(Xt),nt(Rt),zc();break;case 5:Mc(a);break;case 4:xa();break;case 13:nt(ut);break;case 19:nt(ut);break;case 10:Nc(a.type._context);break;case 22:case 23:Dc()}n=n.return}if(St=e,wt=e=hn(e.current,null),zt=Zt=t,Nt=0,hs=null,Ac=ni=Ln=0,Yt=Qa=null,Cn!==null){for(t=0;t<Cn.length;t++)if(n=Cn[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}Cn=null}return e}function Zm(e,t){do{var n=wt;try{if(jc(),ao.current=To,Eo){for(var a=mt.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}Eo=!1}if(In=0,_t=jt=mt=null,Xa=!1,us=0,Lc.current=null,n===null||n.return===null){Nt=1,hs=t,wt=null;break}e:{var o=e,i=n.return,c=n,l=t;if(t=zt,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,h=c,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var u=h.alternate;u?(h.updateQueue=u.updateQueue,h.memoizedState=u.memoizedState,h.lanes=u.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=Kd(i);if(x!==null){x.flags&=-257,Xd(x,i,c,o,t),x.mode&1&&Gd(o,d,t),t=x,l=d;var b=t.updateQueue;if(b===null){var j=new Set;j.add(l),t.updateQueue=j}else b.add(l);break e}else{if(!(t&1)){Gd(o,d,t),Bc();break e}l=Error(ee(426))}}else if(it&&c.mode&1){var y=Kd(i);if(y!==null){!(y.flags&65536)&&(y.flags|=256),Xd(y,i,c,o,t),wc(va(l,c));break e}}o=l=va(l,c),Nt!==4&&(Nt=2),Qa===null?Qa=[o]:Qa.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=Lm(o,l,t);Bd(o,m);break e;case 1:c=l;var f=o.type,v=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(mn===null||!mn.has(v)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=Am(o,c,t);Bd(o,k);break e}}o=o.return}while(o!==null)}rf(n)}catch(w){t=w,wt===n&&n!==null&&(wt=n=n.return);continue}break}while(!0)}function ef(){var e=Po.current;return Po.current=To,e===null?To:e}function Bc(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),St===null||!(Ln&268435455)&&!(ni&268435455)||an(St,zt)}function Lo(e,t){var n=Ue;Ue|=2;var a=ef();(St!==e||zt!==t)&&(Ar=null,$n(e,t));do try{ig();break}catch(s){Zm(e,s)}while(!0);if(jc(),Ue=n,Po.current=a,wt!==null)throw Error(ee(261));return St=null,zt=0,Nt}function ig(){for(;wt!==null;)tf(wt)}function lg(){for(;wt!==null&&!P0();)tf(wt)}function tf(e){var t=af(e.alternate,e,Zt);e.memoizedProps=e.pendingProps,t===null?rf(e):wt=t,Lc.current=null}function rf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=tg(n,t),n!==null){n.flags&=32767,wt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Nt=6,wt=null;return}}else if(n=eg(n,t,Zt),n!==null){wt=n;return}if(t=t.sibling,t!==null){wt=t;return}wt=t=e}while(t!==null);Nt===0&&(Nt=5)}function _n(e,t,n){var a=qe,s=cr.transition;try{cr.transition=null,qe=1,cg(e,t,n,a)}finally{cr.transition=s,qe=a}return null}function cg(e,t,n,a){do pa();while(on!==null);if(Ue&6)throw Error(ee(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(ee(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(U0(e,o),e===St&&(wt=St=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Us||(Us=!0,sf(xo,function(){return pa(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=cr.transition,cr.transition=null;var i=qe;qe=1;var c=Ue;Ue|=4,Lc.current=null,ng(e,n),qm(n,e),zh(yl),bo=!!bl,yl=bl=null,e.current=n,ag(n),R0(),Ue=c,qe=i,cr.transition=o}else e.current=n;if(Us&&(Us=!1,on=e,Io=s),o=e.pendingLanes,o===0&&(mn=null),A0(n.stateNode),Qt(e,bt()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(Ro)throw Ro=!1,e=Dl,Dl=null,e;return Io&1&&e.tag!==0&&pa(),o=e.pendingLanes,o&1?e===Bl?Ja++:(Ja=0,Bl=e):Ja=0,yn(),null}function pa(){if(on!==null){var e=Lu(Io),t=cr.transition,n=qe;try{if(cr.transition=null,qe=16>e?16:e,on===null)var a=!1;else{if(e=on,on=null,Io=0,Ue&6)throw Error(ee(331));var s=Ue;for(Ue|=4,fe=e.current;fe!==null;){var o=fe,i=o.child;if(fe.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(fe=d;fe!==null;){var h=fe;switch(h.tag){case 0:case 11:case 15:qa(8,h,o)}var g=h.child;if(g!==null)g.return=h,fe=g;else for(;fe!==null;){h=fe;var u=h.sibling,x=h.return;if(Gm(h),h===d){fe=null;break}if(u!==null){u.return=x,fe=u;break}fe=x}}}var b=o.alternate;if(b!==null){var j=b.child;if(j!==null){b.child=null;do{var y=j.sibling;j.sibling=null,j=y}while(j!==null)}}fe=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,fe=i;else e:for(;fe!==null;){if(o=fe,o.flags&2048)switch(o.tag){case 0:case 11:case 15:qa(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,fe=m;break e}fe=o.return}}var f=e.current;for(fe=f;fe!==null;){i=fe;var v=i.child;if(i.subtreeFlags&2064&&v!==null)v.return=i,fe=v;else e:for(i=f;fe!==null;){if(c=fe,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:ri(9,c)}}catch(w){xt(c,c.return,w)}if(c===i){fe=null;break e}var k=c.sibling;if(k!==null){k.return=c.return,fe=k;break e}fe=c.return}}if(Ue=s,yn(),Mr&&typeof Mr.onPostCommitFiberRoot=="function")try{Mr.onPostCommitFiberRoot(Ko,e)}catch{}a=!0}return a}finally{qe=n,cr.transition=t}}return!1}function lp(e,t,n){t=va(n,t),t=Lm(e,t,1),e=un(e,t,1),t=Ft(),e!==null&&(ws(e,1,t),Qt(e,t))}function xt(e,t,n){if(e.tag===3)lp(e,e,n);else for(;t!==null;){if(t.tag===3){lp(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(mn===null||!mn.has(a))){e=va(n,e),e=Am(t,e,1),t=un(t,e,1),e=Ft(),t!==null&&(ws(t,1,e),Qt(t,e));break}}t=t.return}}function dg(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=Ft(),e.pingedLanes|=e.suspendedLanes&n,St===e&&(zt&n)===n&&(Nt===4||Nt===3&&(zt&130023424)===zt&&500>bt()-Oc?$n(e,0):Ac|=n),Qt(e,t)}function nf(e,t){t===0&&(e.mode&1?(t=Ps,Ps<<=1,!(Ps&130023424)&&(Ps=4194304)):t=1);var n=Ft();e=Vr(e,t),e!==null&&(ws(e,t,n),Qt(e,n))}function pg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nf(e,n)}function ug(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(ee(314))}a!==null&&a.delete(t),nf(e,n)}var af;af=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Xt.current)Gt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Gt=!1,Zh(e,t,n);Gt=!!(e.flags&131072)}else Gt=!1,it&&t.flags&1048576&&lm(t,So,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;oo(e,t),e=t.pendingProps;var s=fa(t,Rt.current);da(t,n),s=Ec(null,t,a,e,s,n);var o=Tc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,qt(a)?(o=!0,No(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Sc(t),s.updater=ti,t.stateNode=s,s._reactInternals=t,zl(t,a,e,n),t=Tl(null,t,a,!0,o,n)):(t.tag=0,it&&o&&bc(t),Ot(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch(oo(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=fg(a),e=fr(a,e),s){case 0:t=El(null,t,a,e,n);break e;case 1:t=Jd(null,t,a,e,n);break e;case 11:t=qd(null,t,a,e,n);break e;case 14:t=Qd(null,t,a,fr(a.type,e),n);break e}throw Error(ee(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:fr(a,s),El(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:fr(a,s),Jd(e,t,a,s,n);case 3:e:{if(Bm(t),e===null)throw Error(ee(387));a=t.pendingProps,o=t.memoizedState,s=o.element,fm(e,t),zo(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=va(Error(ee(423)),t),t=Zd(e,t,a,n,s);break e}else if(a!==s){s=va(Error(ee(424)),t),t=Zd(e,t,a,n,s);break e}else for(er=pn(t.stateNode.containerInfo.firstChild),tr=t,it=!0,gr=null,n=um(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ha(),a===s){t=Hr(e,t,n);break e}Ot(e,t,a,n)}t=t.child}return t;case 5:return hm(t),e===null&&Sl(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,wl(a,s)?i=null:o!==null&&wl(a,o)&&(t.flags|=32),Dm(e,t),Ot(e,t,i,n),t.child;case 6:return e===null&&Sl(t),null;case 13:return Wm(e,t,n);case 4:return Cc(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=ga(t,null,a,n):Ot(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:fr(a,s),qd(e,t,a,s,n);case 7:return Ot(e,t,t.pendingProps,n),t.child;case 8:return Ot(e,t,t.pendingProps.children,n),t.child;case 12:return Ot(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,et(Co,a._currentValue),a._currentValue=i,o!==null)if(yr(o.value,i)){if(o.children===s.children&&!Xt.current){t=Hr(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){i=o.child;for(var l=c.firstContext;l!==null;){if(l.context===a){if(o.tag===1){l=Br(-1,n&-n),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?l.next=l:(l.next=h.next,h.next=l),d.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Cl(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(ee(341));i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Cl(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}Ot(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,da(t,n),s=dr(s),a=a(s),t.flags|=1,Ot(e,t,a,n),t.child;case 14:return a=t.type,s=fr(a,t.pendingProps),s=fr(a.type,s),Qd(e,t,a,s,n);case 15:return Om(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:fr(a,s),oo(e,t),t.tag=1,qt(a)?(e=!0,No(t)):e=!1,da(t,n),Im(t,a,s),zl(t,a,s,n),Tl(null,t,a,!0,e,n);case 19:return Um(e,t,n);case 22:return Fm(e,t,n)}throw Error(ee(156,t.tag))};function sf(e,t){return Tu(e,t)}function mg(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function lr(e,t,n,a){return new mg(e,t,n,a)}function Wc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fg(e){if(typeof e=="function")return Wc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ic)return 11;if(e===lc)return 14}return 2}function hn(e,t){var n=e.alternate;return n===null?(n=lr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function co(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")Wc(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Xn:return En(n.children,s,o,t);case oc:i=8,s|=8;break;case Zi:return e=lr(12,n,t,s|2),e.elementType=Zi,e.lanes=o,e;case el:return e=lr(13,n,t,s),e.elementType=el,e.lanes=o,e;case tl:return e=lr(19,n,t,s),e.elementType=tl,e.lanes=o,e;case hu:return ai(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case mu:i=10;break e;case fu:i=9;break e;case ic:i=11;break e;case lc:i=14;break e;case en:i=16,a=null;break e}throw Error(ee(130,e==null?e:typeof e,""))}return t=lr(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function En(e,t,n,a){return e=lr(7,e,a,t),e.lanes=n,e}function ai(e,t,n,a){return e=lr(22,e,a,t),e.elementType=hu,e.lanes=n,e.stateNode={isHidden:!1},e}function Ai(e,t,n){return e=lr(6,e,null,t),e.lanes=n,e}function Oi(e,t,n){return t=lr(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function hg(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vi(0),this.expirationTimes=vi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vi(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Uc(e,t,n,a,s,o,i,c,l){return e=new hg(e,t,n,c,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=lr(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Sc(o),e}function gg(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function of(e){if(!e)return xn;e=e._reactInternals;e:{if(Dn(e)!==e||e.tag!==1)throw Error(ee(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(qt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(ee(171))}if(e.tag===1){var n=e.type;if(qt(n))return om(e,n,t)}return t}function lf(e,t,n,a,s,o,i,c,l){return e=Uc(n,a,!0,e,s,o,i,c,l),e.context=of(null),n=e.current,a=Ft(),s=fn(n),o=Br(a,s),o.callback=t??null,un(n,o,s),e.current.lanes=s,ws(e,s,a),Qt(e,a),e}function si(e,t,n,a){var s=t.current,o=Ft(),i=fn(s);return n=of(n),t.context===null?t.context=n:t.pendingContext=n,t=Br(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=un(s,t,i),e!==null&&(br(e,s,i,o),no(e,s,i)),i}function Ao(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function cp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vc(e,t){cp(e,t),(e=e.alternate)&&cp(e,t)}function xg(){return null}var cf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hc(e){this._internalRoot=e}oi.prototype.render=Hc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(ee(409));si(e,t,null,null)};oi.prototype.unmount=Hc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;An(function(){si(null,e,null,null)}),t[Ur]=null}};function oi(e){this._internalRoot=e}oi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Fu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<nn.length&&t!==0&&t<nn[n].priority;n++);nn.splice(n,0,e),n===0&&Bu(e)}};function Yc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ii(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function dp(){}function vg(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=Ao(i);o.call(d)}}var i=lf(t,a,e,0,null,!1,!1,"",dp);return e._reactRootContainer=i,e[Ur]=i.current,is(e.nodeType===8?e.parentNode:e),An(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var c=a;a=function(){var d=Ao(l);c.call(d)}}var l=Uc(e,0,!1,null,null,!1,!1,"",dp);return e._reactRootContainer=l,e[Ur]=l.current,is(e.nodeType===8?e.parentNode:e),An(function(){si(t,l,n,a)}),l}function li(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var c=s;s=function(){var l=Ao(i);c.call(l)}}si(t,i,e,s)}else i=vg(n,t,e,s,a);return Ao(i)}Au=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Oa(t.pendingLanes);n!==0&&(pc(t,n|1),Qt(t,bt()),!(Ue&6)&&(ba=bt()+500,yn()))}break;case 13:An(function(){var a=Vr(e,1);if(a!==null){var s=Ft();br(a,e,1,s)}}),Vc(e,1)}};uc=function(e){if(e.tag===13){var t=Vr(e,134217728);if(t!==null){var n=Ft();br(t,e,134217728,n)}Vc(e,134217728)}};Ou=function(e){if(e.tag===13){var t=fn(e),n=Vr(e,t);if(n!==null){var a=Ft();br(n,e,t,a)}Vc(e,t)}};Fu=function(){return qe};Du=function(e,t){var n=qe;try{return qe=e,t()}finally{qe=n}};pl=function(e,t,n){switch(t){case"input":if(al(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=Jo(a);if(!s)throw Error(ee(90));xu(a),al(a,s)}}}break;case"textarea":bu(e,n);break;case"select":t=n.value,t!=null&&oa(e,!!n.multiple,t,!1)}};Su=Fc;Cu=An;var bg={usingClientEntryPoint:!1,Events:[js,Zn,Jo,Nu,_u,Fc]},Ta={findFiberByHostInstance:Sn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},yg={bundleType:Ta.bundleType,version:Ta.version,rendererPackageName:Ta.rendererPackageName,rendererConfig:Ta.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=$u(e),e===null?null:e.stateNode},findFiberByHostInstance:Ta.findFiberByHostInstance||xg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vs.isDisabled&&Vs.supportsFiber)try{Ko=Vs.inject(yg),Mr=Vs}catch{}}nr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bg;nr.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Yc(t))throw Error(ee(200));return gg(e,t,null,n)};nr.createRoot=function(e,t){if(!Yc(e))throw Error(ee(299));var n=!1,a="",s=cf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Uc(e,1,!1,null,null,n,!1,a,s),e[Ur]=t.current,is(e.nodeType===8?e.parentNode:e),new Hc(t)};nr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(ee(188)):(e=Object.keys(e).join(","),Error(ee(268,e)));return e=$u(t),e=e===null?null:e.stateNode,e};nr.flushSync=function(e){return An(e)};nr.hydrate=function(e,t,n){if(!ii(t))throw Error(ee(200));return li(null,e,t,!0,n)};nr.hydrateRoot=function(e,t,n){if(!Yc(e))throw Error(ee(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=cf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=lf(t,null,e,1,n??null,s,!1,o,i),e[Ur]=t.current,is(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new oi(t)};nr.render=function(e,t,n){if(!ii(t))throw Error(ee(200));return li(null,e,t,!1,n)};nr.unmountComponentAtNode=function(e){if(!ii(e))throw Error(ee(40));return e._reactRootContainer?(An(function(){li(null,null,e,!1,function(){e._reactRootContainer=null,e[Ur]=null})}),!0):!1};nr.unstable_batchedUpdates=Fc;nr.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!ii(n))throw Error(ee(200));if(e==null||e._reactInternals===void 0)throw Error(ee(38));return li(e,t,n,!1,a)};nr.version="18.3.1-next-f1338f8080-20240426";function df(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(df)}catch(e){console.error(e)}}df(),cu.exports=nr;var Gc=cu.exports,pp=Gc;Qi.createRoot=pp.createRoot,Qi.hydrateRoot=pp.hydrateRoot;const Fi={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.tasks":"Tasks","nav.health":"Health","nav.backups":"Backups","nav.settings":"Settings","nav.more":"More","bjobs.title":"Backup schedules","bjobs.subtitle":"Cluster-level vzdump cron jobs","bjobs.filter.enabled":"State","bjobs.col.id":"Job ID","bjobs.col.schedule":"Schedule","bjobs.col.next_run":"Next run","bjobs.col.storage":"Storage","bjobs.col.scope":"Scope","bjobs.col.mode":"Mode","bjobs.col.enabled":"Enabled","bjobs.col.comment":"Comment","bjobs.scope_all":"All VMs/CTs","bjobs.enabled_yes":"On","bjobs.enabled_no":"Off","bjobs.empty":"No scheduled backup jobs","health.title":"Health monitor","health.subtitle":"Aggregated proactive checks across every cluster","health.updated":"updated","health.sev.critical":"Critical","health.sev.warning":"Warning","health.sev.info":"Info","health.cat.node_down":"Node offline","health.cat.high_cpu":"High CPU","health.cat.high_mem":"High memory","health.cat.storage_full":"Storage almost full","health.cat.storage_high":"Storage high usage","health.cat.ceph_err":"Ceph HEALTH_ERR","health.cat.ceph_warn":"Ceph HEALTH_WARN","health.cat.task_failures":"Recent task failures","health.cat.cert_expired":"Certificate expired","health.cat.cert_expiring":"Certificate expiring","health.cat.updates":"Pending updates","health.stat.nodes":"Nodes online","health.stat.vms":"VMs running","health.stat.cts":"CTs running","health.stat.storages":"Storages","health.empty.title":"All systems nominal","health.empty.sub":"No critical or warning conditions detected.","tasks.title":"PVE task / VM operation history","tasks.subtitle":"Real PVE-side actions (qmstart / shutdown / snapshot / migrate / backup / etc.)","tasks.filter.cluster":"Cluster","tasks.filter.type":"Type","tasks.filter.status":"Status","tasks.filter.user":"User","tasks.filter.vmid":"VMID","tasks.filter.all":"All","tasks.filter.running":"Running","tasks.filter.ok":"Success","tasks.filter.error":"Error","tasks.col.starttime":"Started","tasks.col.duration":"Duration","tasks.col.type":"Type","tasks.col.target":"Target","tasks.col.user":"User","tasks.col.node":"Node","tasks.col.status":"Status","tasks.refresh":"Refresh","tasks.auto_refresh":"Auto","tasks.empty":"No tasks match the filters","tasks.loading":"Loading…","tasks.log_title":"Task log","tasks.log_loading":"Loading log…","tasks.log_empty":"No log output","tasks.copy_upid":"Copy UPID","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.subscription":"Subscription","node.no_sub":"None","node.updates_pending":"Updates pending","node.cert_expires":"Cert expires","node.host_shell":"Host shell","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.task_history":"Task history","vm.perf_charts":"Performance charts","vm.backup_history":"Backup history","bh.title":"Backup history","bh.count":"Backups","bh.total_size":"Total","bh.newest":"Newest","bh.col.ctime":"Created","bh.col.age":"Age","bh.col.storage":"Storage","bh.col.node":"Node","bh.col.size":"Size","bh.col.flags":"Flags","bh.col.notes":"Notes","bh.protected":"PROTECTED","bh.verified":"VERIFIED","bh.verify_failed":"VERIFY FAIL","bh.loading":"Scanning every backup-capable storage…","bh.empty":"No backups found for this VM/CT.","rrd.title":"Performance","rrd.tf.hour":"1H","rrd.tf.day":"24H","rrd.tf.week":"7D","rrd.tf.month":"30D","rrd.tf.year":"1Y","rrd.chart.cpu":"CPU","rrd.chart.mem":"Memory","rrd.chart.net":"Network I/O","rrd.chart.disk":"Disk I/O","rrd.loading":"Loading time-series…","rrd.empty":"No RRD data — VM may have just been created.","clog.title":"Cluster syslog","clog.button":"Cluster log","clog.filter_ph":"filter (msg / node / user / tag)","clog.empty":"No syslog lines available","clog.no_match":"No lines match the filter","cmdk.placeholder":"Search VMs / CTs / nodes / storages…","cmdk.empty":"No matches.","cmdk.tip":"Start typing — match by id, name, node, or cluster.","cmdk.toggle":"toggle palette","vm.start":"Start","vm.shutdown_acpi":"Shutdown","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.user_admin":"User management","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","matrix.bulk.select_all":"Select all","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.manage":"Manage","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.saving":"Saving…","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.tasks":"作業","nav.health":"健康","nav.backups":"備份","nav.settings":"設定","nav.more":"更多","bjobs.title":"備份排程","bjobs.subtitle":"叢集層級的 vzdump 排程作業","bjobs.filter.enabled":"狀態","bjobs.col.id":"排程 ID","bjobs.col.schedule":"排程時間","bjobs.col.next_run":"下次執行","bjobs.col.storage":"儲存","bjobs.col.scope":"對象","bjobs.col.mode":"模式","bjobs.col.enabled":"啟用","bjobs.col.comment":"備註","bjobs.scope_all":"全部 VM/CT","bjobs.enabled_yes":"開","bjobs.enabled_no":"關","bjobs.empty":"尚未設定備份排程","health.title":"健康監測","health.subtitle":"跨叢集的即時健康狀況彙總","health.updated":"更新於","health.sev.critical":"嚴重","health.sev.warning":"警告","health.sev.info":"資訊","health.cat.node_down":"節點離線","health.cat.high_cpu":"CPU 過高","health.cat.high_mem":"記憶體過高","health.cat.storage_full":"儲存接近滿載","health.cat.storage_high":"儲存使用率偏高","health.cat.ceph_err":"Ceph 嚴重錯誤","health.cat.ceph_warn":"Ceph 警告","health.cat.task_failures":"近期作業失敗","health.cat.cert_expired":"憑證已過期","health.cat.cert_expiring":"憑證即將到期","health.cat.updates":"套件待更新","health.stat.nodes":"節點在線","health.stat.vms":"VM 執行中","health.stat.cts":"CT 執行中","health.stat.storages":"儲存","health.empty.title":"一切正常","health.empty.sub":"目前沒有嚴重或警告等級的問題。","tasks.title":"PVE 作業 / VM 操作紀錄","tasks.subtitle":"PVE 端真實作業（qmstart / shutdown / 快照 / 遷移 / 備份 等）","tasks.filter.cluster":"叢集","tasks.filter.type":"類型","tasks.filter.status":"狀態","tasks.filter.user":"使用者","tasks.filter.vmid":"VMID","tasks.filter.all":"全部","tasks.filter.running":"進行中","tasks.filter.ok":"成功","tasks.filter.error":"錯誤","tasks.col.starttime":"開始時間","tasks.col.duration":"耗時","tasks.col.type":"類型","tasks.col.target":"對象","tasks.col.user":"使用者","tasks.col.node":"節點","tasks.col.status":"狀態","tasks.refresh":"重新整理","tasks.auto_refresh":"自動","tasks.empty":"沒有符合條件的作業","tasks.loading":"載入中…","tasks.log_title":"作業紀錄","tasks.log_loading":"載入紀錄中…","tasks.log_empty":"沒有日誌輸出","tasks.copy_upid":"複製 UPID","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.subscription":"訂閱","node.no_sub":"未訂閱","node.updates_pending":"待更新套件","node.cert_expires":"憑證到期","node.host_shell":"主機 Shell","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.task_history":"作業紀錄","vm.perf_charts":"效能圖表","vm.backup_history":"備份歷史","bh.title":"備份歷史","bh.count":"備份檔數","bh.total_size":"總容量","bh.newest":"最新一次","bh.col.ctime":"建立時間","bh.col.age":"時間距","bh.col.storage":"儲存","bh.col.node":"節點","bh.col.size":"大小","bh.col.flags":"標記","bh.col.notes":"備註","bh.protected":"保護","bh.verified":"已驗證","bh.verify_failed":"驗證失敗","bh.loading":"掃描所有備份儲存…","bh.empty":"此 VM/CT 尚無備份。","rrd.title":"效能歷史","rrd.tf.hour":"1 小時","rrd.tf.day":"24 小時","rrd.tf.week":"7 天","rrd.tf.month":"30 天","rrd.tf.year":"1 年","rrd.chart.cpu":"CPU","rrd.chart.mem":"記憶體","rrd.chart.net":"網路 I/O","rrd.chart.disk":"磁碟 I/O","rrd.loading":"載入時序資料…","rrd.empty":"沒有 RRD 資料 — VM 可能剛建立。","clog.title":"叢集系統日誌","clog.button":"叢集日誌","clog.filter_ph":"篩選（訊息 / 節點 / 使用者 / tag）","clog.empty":"沒有日誌","clog.no_match":"沒有符合的日誌","cmdk.placeholder":"搜尋 VM / CT / 節點 / 儲存…","cmdk.empty":"沒有符合項目。","cmdk.tip":"直接打字 — 可用 id / 名稱 / 節點 / 叢集 比對。","cmdk.toggle":"切換命令搜尋","vm.start":"啟動","vm.shutdown_acpi":"關機","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.user_admin":"使用者管理","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","matrix.bulk.select_all":"全選","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.manage":"管理","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.saving":"儲存中…","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},pf=p.createContext(null);function wg({children:e}){const[t,n]=p.useState(()=>{const o=localStorage.getItem("language");return o&&Fi[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=p.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=p.useCallback((o,i)=>{let c=Fi[t][o]||Fi.en[o]||o;return i&&Object.entries(i).forEach(([l,d])=>{c=c.replace(`{${l}}`,String(d))}),c},[t]);return r.jsx(pf.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function $e(){const e=p.useContext(pf);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const uf=p.createContext(null);function Kr(){const e=p.useContext(uf);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,n)=>Promise.resolve(window.prompt(t,(n==null?void 0:n.defaultValue)??""))})}function kg({children:e}){const{t}=$e(),[n,a]=p.useState(null),[s,o]=p.useState(""),i=p.useRef(null),c=p.useCallback(g=>{n&&(n.resolve(g),a(null),o(""))},[n]),l=p.useCallback((g,u={})=>new Promise(x=>{a({kind:"alert",title:u.title||t("dialog.notice"),body:g,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:()=>x()})}),[t]),d=p.useCallback((g,u={})=>new Promise(x=>{a({kind:"confirm",title:u.title||t("dialog.confirm"),body:g,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:b=>x(!!b)})}),[t]),h=p.useCallback((g,u={})=>new Promise(x=>{o(u.defaultValue||""),a({kind:"prompt",title:u.title||t("dialog.input"),body:g,destructive:!!u.destructive,inputType:u.inputType||"text",placeholder:u.placeholder||"",resolve:b=>x(b===null?null:String(b))})}),[t]);return p.useEffect(()=>{if(!n)return;const g=u=>{u.key==="Escape"?c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):u.key==="Enter"&&n.kind!=="alert"?(u.preventDefault(),c(n.kind==="prompt"?s:!0)):u.key==="Enter"&&n.kind==="alert"&&c(void 0)};return document.addEventListener("keydown",g),n.kind==="prompt"&&setTimeout(()=>{var u;return(u=i.current)==null?void 0:u.focus()},50),()=>document.removeEventListener("keydown",g)},[n,s,c]),r.jsxs(uf.Provider,{value:{alert:l,confirm:d,prompt:h},children:[e,n&&r.jsxs("div",{onClick:()=>c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:jg,children:[r.jsx("style",{children:Ng}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:g=>g.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:g=>o(g.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>c(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>c(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const jg={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},Ng=`
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
`;function _g(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,c=p.useRef(null),l=p.useRef(null),d=p.useRef(null),h=p.useRef(t),[g,u]=p.useState({connected:!1,connecting:!1,lastMessageTime:0});h.current=t;const x=p.useCallback(()=>{const m=window.location.protocol==="https:"?"wss:":"ws:",f=window.location.host;return`${m}//${f}/ws`},[]),b=p.useCallback(()=>{var f;if(((f=c.current)==null?void 0:f.readyState)===WebSocket.OPEN)return;u(v=>({...v,connecting:!0}));const m=new WebSocket(x());c.current=m,m.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{m.readyState===WebSocket.OPEN&&m.send(JSON.stringify({type:"ping"}))},i)},m.onmessage=v=>{var k;try{const w=JSON.parse(v.data);u(_=>({..._,lastMessageTime:Date.now()})),(w.type==="initial"||w.type==="update")&&(k=w.data)!=null&&k.clusters&&h.current&&h.current(w.data.clusters)}catch(w){console.error("[WS] Failed to parse message:",w)}},m.onerror=v=>{console.error("[WS] Error:",v),s==null||s(v)},m.onclose=()=>{u(v=>({...v,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{b()},o)}},[x,n,a,s,o,i]),j=p.useCallback(()=>{l.current&&(clearTimeout(l.current),l.current=null),d.current&&(clearInterval(d.current),d.current=null),c.current&&(c.current.close(),c.current=null)},[]),y=p.useCallback(m=>{var f;((f=c.current)==null?void 0:f.readyState)===WebSocket.OPEN&&c.current.send(JSON.stringify(m))},[]);return p.useEffect(()=>(b(),()=>{j()}),[b,j]),p.useEffect(()=>{const m=setInterval(()=>{const v=Date.now()-g.lastMessageTime;g.connected&&v>15e3&&(j(),b())},5e3);return()=>clearInterval(m)},[g.connected,g.lastMessageTime,b,j]),{connected:g.connected,connecting:g.connecting,lastMessageTime:g.lastMessageTime,send:y,reconnect:b,disconnect:j}}const Sg="/api";async function Ee(e,t){const n=await fetch(`${Sg}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const Be={authMe:()=>Ee("/auth/me"),authLogin:(e,t)=>Ee("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Ee("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Ee("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Ee("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Ee("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Ee("/config"),updateConfig:e=>Ee("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Ee("/clusters"),getCluster:e=>Ee(`/clusters/${e}`),getSummary:()=>Ee("/summary"),getNodes:e=>Ee(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Ee(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Ee(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Ee(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Ee("/health"),vmAction:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?Be.ctAction(e,t,n,s):Be.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>Ee(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>Ee(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>Ee(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>Ee(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>Ee("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Pe(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function lt(e,t=1){return`${e.toFixed(t)}%`}function ci(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function Se(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function Vl(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function Cg({value:e,suffix:t="",className:n=""}){const a=x=>{if(typeof x=="number")return{left:x,isRatio:!1};const b=String(x).match(/^(\d+)\/(\d+)$/);if(b)return{left:parseInt(b[1]),right:parseInt(b[2]),isRatio:!0};const j=parseFloat(String(x));return isNaN(j)?{left:0,isRatio:!1}:{left:j,isRatio:!1}},s=a(e),[o,i]=p.useState(0),[c,l]=p.useState(s.right||0),d=p.useRef(null),h=p.useRef(0),g=p.useRef(!0);p.useEffect(()=>{const x=a(e);if(!g.current){i(x.left),x.right!==void 0&&l(x.right);return}const b=800,j=0,y=0;g.current=!1,d.current=null;const m=f=>{d.current||(d.current=f);const v=f-d.current,k=Math.min(v/b,1),w=1-Math.pow(1-k,3),_=j+(x.left-j)*w;if(i(Math.round(_)),x.isRatio&&x.right!==void 0){const M=y+(x.right-y)*w;l(Math.round(M))}k<1?h.current=requestAnimationFrame(m):(i(x.left),x.right!==void 0&&l(x.right))};return h.current=requestAnimationFrame(m),()=>{h.current&&cancelAnimationFrame(h.current)}},[e]);const u=s.isRatio?`${o}/${c}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function up({value:e,decimals:t=0,className:n=""}){const[a,s]=p.useState(0),o=p.useRef(null),i=p.useRef(0),c=p.useRef(!0);return p.useEffect(()=>{if(!c.current){s(e);return}const l=800,d=0;c.current=!1,o.current=null;const h=g=>{o.current||(o.current=g);const u=g-o.current,x=Math.min(u/l,1),b=1-Math.pow(1-x,3),j=d+(e-d)*b;s(j),x<1?i.current=requestAnimationFrame(h):s(e)};return i.current=requestAnimationFrame(h),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function Di({left:e,right:t,className:n=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{if(!d.current){s(e),i(t);return}const h=800,g=0,u=0;d.current=!1,c.current=null;const x=b=>{c.current||(c.current=b);const j=b-c.current,y=Math.min(j/h,1),m=1-Math.pow(1-y,3);s(Math.round(g+(e-g)*m)),i(Math.round(u+(t-u)*m)),y<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Hs({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(Cg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function Bi({value:e,label:t,color:n,size:a=100}){const[s,o]=p.useState(0),i=p.useRef(null),c=p.useRef(0),l=p.useRef(!0);p.useEffect(()=>{if(!l.current){o(e);return}const y=1e3,m=0;l.current=!1,i.current=null;const f=v=>{i.current||(i.current=v);const k=v-i.current,w=Math.min(k/y,1),_=1-Math.pow(1-w,3),M=m+(e-m)*_;o(M),w<1?c.current=requestAnimationFrame(f):o(e)};return c.current=requestAnimationFrame(f),()=>{c.current&&cancelAnimationFrame(c.current)}},[e]);const d=5,h=(a-d*4)/2-8,g=(a-d)/2,u=h+(g-h)/2,x=2*Math.PI*u,b=x-s/100*x,j=Array.from({length:36},(y,m)=>{const f=(m*10-90)*(Math.PI/180),v=m%3===0,k=v?6:3,w=g-2,_=w-k;return{x1:a/2+Math.cos(f)*w,y1:a/2+Math.sin(f)*w,x2:a/2+Math.cos(f)*_,y2:a/2+Math.sin(f)*_,isMajor:v}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:g,strokeWidth:1}),j.map((y,m)=>r.jsx("line",{x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,className:`ring-tick ${y.isMajor?"major":""}`},m)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:u,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:h,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:u,strokeWidth:d,strokeDasharray:x,strokeDashoffset:b,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-u-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function Mg({cluster:e,onClick:t}){var l,d;const{t:n}=$e(),a=e.summary;if(!a)return null;const s=Se(a.total_cpu_usage),o=Se(a.total_memory_usage),i=a.alerts_warning>0,c=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${c?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(up,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(up,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(Di,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Di,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Di,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((l=a.ceph_health)==null?void 0:l.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function mp({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=$e(),o=p.useMemo(()=>Object.entries(e),[e]),i=p.useMemo(()=>{let c=0,l=0,d=0,h=0;return Object.values(e).forEach(g=>{g.summary&&(c+=g.summary.total_cpu_usage||0,l+=g.summary.total_memory_usage||0,d+=g.summary.total_storage_usage||0,h++)}),{avgCpu:h>0?c/h:0,avgMem:h>0?l/h:0,avgStorage:h>0?d/h:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(Bi,{value:i.avgCpu,label:s("metric.cpu"),color:Se(i.avgCpu),size:110}),r.jsx(Bi,{value:i.avgMem,label:s("metric.memory"),color:Se(i.avgMem),size:110}),r.jsx(Bi,{value:i.avgStorage,label:s("metric.disk"),color:Se(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(Hs,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(Hs,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(Hs,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(Hs,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([c,l])=>r.jsx(Mg,{cluster:l,onClick:()=>n(c)},c))})})]})]}),r.jsx("style",{children:`
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
      `})]})}function zg(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const c=(o-.08)/.14;i+=s*.2*Math.sin(c*Math.PI)}if(o>.24&&o<.4){const c=(o-.24)/.16;if(c<.2)i-=s*.15*Math.sin(c*5*Math.PI);else if(c<.5){const l=(c-.2)/.3;i+=s*(1+a*.5)*Math.sin(l*Math.PI)}else if(c<.7){const l=(c-.5)/.2;i-=s*.25*Math.sin(l*Math.PI)}}if(o>.48&&o<.72){const c=(o-.48)/.24;i+=s*.35*Math.sin(c*Math.PI)}return i*n}function Wi({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const c=p.useRef(null),l=p.useRef(null),d=p.useRef([]),h=p.useRef(0),g=p.useRef(0),u=p.useRef(0),x=p.useRef(0),b=p.useRef(!i),j=p.useRef(!1),m=6e4/(50+e/100*50),f=12;p.useEffect(()=>{b.current=!i},[i]);const v=p.useCallback(()=>{const w=l.current;if(!w)return;w.fillStyle="rgba(5, 8, 15, 0.95)",w.fillRect(0,0,s,o),w.strokeStyle="rgba(0, 240, 255, 0.08)",w.lineWidth=.5;for(let R=0;R<o;R+=10)w.beginPath(),w.moveTo(0,R),w.lineTo(s,R),w.stroke();for(let R=0;R<s;R+=10)w.beginPath(),w.moveTo(R,0),w.lineTo(R,o),w.stroke();const _=o/2,M=o*.45,O=!a||e>90?"#ff0040":e>70?"#ff6b00":n;w.shadowColor=O,w.shadowBlur=6,w.strokeStyle=O,w.lineWidth=1.5,w.lineCap="round",w.lineJoin="round",w.beginPath();let P=!1;for(let R=0;R<s;R++){const te=(R-h.current+s)%s;if(te<8&&te>0)continue;const W=_-d.current[R]*M;P?w.lineTo(R,W):(w.moveTo(R,W),P=!0)}w.stroke(),w.shadowBlur=0,w.strokeStyle=`${O}60`,w.lineWidth=2,w.beginPath(),w.moveTo(h.current,0),w.lineTo(h.current,o),w.stroke();const T=w.createLinearGradient(h.current-15,0,h.current,0);T.addColorStop(0,"transparent"),T.addColorStop(1,`${O}30`),w.fillStyle=T,w.fillRect(h.current-15,0,15,o)},[s,o,e,a,n]);p.useEffect(()=>{const w=c.current;if(!w)return;const _=w.getContext("2d");if(!_)return;const M=window.devicePixelRatio||1;w.width=s*M,w.height=o*M,_.scale(M,M),l.current=_,d.current.length!==s&&(d.current=new Array(s).fill(0)),j.current=!0,v()},[s,o,v]),p.useEffect(()=>{if(!j.current||!l.current)return;const _=M=>{x.current||(x.current=M);const z=M-x.current;x.current=M;const O=z/1e3*f;g.current+=z/m,g.current>=1&&(g.current-=1);const P=Math.ceil(O);for(let T=0;T<P;T++){const te=(g.current+T/P*(z/m))%1;let W;a?W=zg(e,te,1):W=(Math.random()-.5)*.01,h.current=(h.current+1)%s,d.current[h.current]=W;const L=(h.current+1)%s;for(let q=0;q<8;q++){const I=(L+q)%s;d.current[I]=0}}v(),b.current&&(u.current=requestAnimationFrame(_))};return i||(x.current=0,u.current=requestAnimationFrame(_)),()=>{cancelAnimationFrame(u.current)}},[s,o,e,a,m,f,i,v]);const k=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:k()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:k()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:c,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function $g({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=p.useRef(null),[i,c]=p.useState(180);return p.useEffect(()=>{const l=o.current;if(!l)return;const d=()=>{const g=l.clientWidth-6;g>0&&c(g)};d();const h=new ResizeObserver(d);return h.observe(l),()=>h.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(Wi,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Wi,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Wi,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}const Eg=["hour","day","week","month","year"],Hl=e=>{if(!isFinite(e)||e===0)return"0";const t=["B","K","M","G","T"];let n=0,a=e;for(;a>=1024&&n<t.length-1;)a/=1024,n++;return`${a.toFixed(a>=10?0:1)}${t[n]}`},Yn=e=>Hl(e)+"/s",fp=e=>`${(e*100).toFixed(0)}%`;function mf({open:e,onClose:t,clusterId:n,node:a,vmid:s,kind:o,title:i}){const{t:c,language:l}=$e(),[d,h]=p.useState("hour"),[g,u]=p.useState([]),[x,b]=p.useState(!1),[j,y]=p.useState(null);return p.useEffect(()=>{if(!e)return;let m=!0;return(async()=>{b(!0),y(null);try{const f=encodeURIComponent(n),v=encodeURIComponent(a),k=o==="node"?`/api/clusters/${f}/nodes/${v}/rrddata`:o==="qemu"?`/api/clusters/${f}/nodes/${v}/qemu/${s}/rrddata`:`/api/clusters/${f}/nodes/${v}/lxc/${s}/rrddata`,w=await fetch(`${k}?timeframe=${d}`,{credentials:"same-origin"});if(!w.ok){const M=await w.json().catch(()=>({}));throw new Error(M.error||`HTTP ${w.status}`)}const _=await w.json();if(!m)return;u((_.samples||[]).filter(M=>M&&M.time))}catch(f){m&&y(f.message||String(f))}finally{m&&b(!1)}})(),()=>{m=!1}},[e,n,a,s,o,d]),e?r.jsx("div",{className:"rrd-back",onClick:t,children:r.jsxs("div",{className:"rrd-modal",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"rrd-head",children:[r.jsxs("div",{className:"rrd-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:c("rrd.title")}),i&&r.jsx("span",{className:"rrd-target",children:i})]}),r.jsxs("div",{className:"rrd-tfs",children:[Eg.map(m=>r.jsx("button",{className:`rrd-tf ${m===d?"on":""}`,onClick:()=>h(m),children:c(`rrd.tf.${m}`)},m)),r.jsx("button",{className:"rrd-close",onClick:t,"aria-label":"close",children:"×"})]})]}),r.jsxs("div",{className:"rrd-body",children:[j&&r.jsx("div",{className:"rrd-error",children:j}),x&&g.length===0&&r.jsx("div",{className:"rrd-loading",children:c("rrd.loading")}),!x&&g.length===0&&!j&&r.jsx("div",{className:"rrd-loading",children:c("rrd.empty")}),g.length>0&&r.jsxs("div",{className:"rrd-grid",children:[r.jsx(Ys,{title:c("rrd.chart.cpu"),samples:g,color:"#00f0ff",series:[{key:"cpu",label:"CPU",fmt:fp,scale:m=>m.cpu??null}],yMax:1,yFmt:fp}),r.jsx(Ys,{title:c("rrd.chart.mem"),samples:g,color:"#00ff88",series:[{key:"mem",label:"Mem",fmt:m=>Hl(m),scale:m=>m.mem??null}],yFmt:Hl,fillTop:m=>m.maxmem}),r.jsx(Ys,{title:c("rrd.chart.net"),samples:g,color:"#ff8a3c",series:[{key:"netin",label:"In",fmt:Yn,scale:m=>m.netin??null,color:"#ff8a3c"},{key:"netout",label:"Out",fmt:Yn,scale:m=>m.netout??null,color:"#bf00ff"}],yFmt:Yn}),r.jsx(Ys,{title:c("rrd.chart.disk"),samples:g,color:"#bf00ff",series:[{key:"diskread",label:"Read",fmt:Yn,scale:m=>m.diskread??null,color:"#00f0ff"},{key:"diskwrite",label:"Write",fmt:Yn,scale:m=>m.diskwrite??null,color:"#bf00ff"}],yFmt:Yn})]})]}),r.jsx("style",{children:`
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
        `})]})}):null}function Ys({title:e,samples:t,series:n,yMax:a,yFmt:s,fillTop:o}){var k,w;const{width:i,height:c}={width:460,height:160},l=48,d=8,h=10,g=22,u=p.useMemo(()=>{if(typeof a=="number")return a;let _=1;for(const M of t){const z=o==null?void 0:o(M);z&&z>_&&(_=z);for(const O of n){const P=O.scale(M);P!=null&&P>_&&(_=P)}}return _*1.1},[t,n,o,a]),x=((k=t[0])==null?void 0:k.time)||0,b=((w=t[t.length-1])==null?void 0:w.time)||x+1,j=Math.max(1,b-x),y=_=>l+(_-x)/j*(i-l-d),m=_=>h+(1-_/u)*(c-h-g),f=_=>{let M="",z=!1;for(const O of t){const P=_.scale(O);if(P==null||!isFinite(P)){z=!1;continue}const T=y(O.time),R=m(P);M+=(z?" L ":" M ")+T.toFixed(1)+","+R.toFixed(1),z=!0}return M},v=[0,.25,.5,.75,1].map(_=>u*(1-_));return r.jsxs("div",{className:"rrd-card",children:[r.jsxs("div",{className:"rrd-card-head",children:[r.jsx("div",{className:"rrd-card-title",children:e}),r.jsx("div",{className:"rrd-card-legend",children:n.map(_=>r.jsxs("span",{children:[r.jsx("span",{className:"dot",style:{background:_.color||"#00f0ff"}}),_.label]},_.key))})]}),r.jsxs("svg",{viewBox:`0 0 ${i} ${c}`,className:"rrd-svg",children:[v.map((_,M)=>{const z=h+M/4*(c-h-g);return r.jsxs("g",{children:[r.jsx("line",{x1:l,y1:z,x2:i-d,y2:z,stroke:"rgba(0,240,255,.08)"}),r.jsx("text",{x:l-4,y:z+3,textAnchor:"end",fontSize:"9",fill:"rgba(160,180,200,.6)",fontFamily:"Share Tech Mono, monospace",children:s(_)})]},M)}),n.map(_=>r.jsx("path",{d:f(_),fill:"none",stroke:_.color||"#00f0ff",strokeWidth:"1.3",opacity:"0.95"},_.key))]}),r.jsx("style",{children:`
        .rrd-card { background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 4px; padding: 10px 12px; }
        .rrd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .rrd-card-title { font-family: var(--font-display); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-primary); }
        .rrd-card-legend { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); }
        .rrd-card-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 6px currentColor; vertical-align: 1px; }
        .rrd-svg { width: 100%; height: 160px; display: block; }
      `})]})}function hp(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function gp({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const h=d.current?0:o;d.current=!1,c.current=null;const g=u=>{c.current||(c.current=u);const x=u-c.current,b=Math.min(x/a,1),j=1-Math.pow(1-b,3),y=h+(e-h)*j;i(y),b<1?l.current=requestAnimationFrame(g):i(e)};return l.current=requestAnimationFrame(g),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function xp({left:e,right:t,className:n=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const g=d.current?0:a,u=d.current?0:o;d.current=!1,c.current=null;const x=b=>{c.current||(c.current=b);const j=b-c.current,y=Math.min(j/800,1),m=1-Math.pow(1-y,3);s(Math.round(g+(e-g)*m)),i(Math.round(u+(t-u)*m)),y<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Tg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Pg(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Rg({state:e,onClose:t,onShowDetails:n,onShowPerf:a,onOpenShell:s,getNodeHealth:o}){const{t:i}=$e();if(p.useEffect(()=>{const x=()=>t(),b=()=>t(),j=y=>{y.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",x),document.addEventListener("scroll",b,!0),document.addEventListener("keydown",j)),()=>{document.removeEventListener("click",x),document.removeEventListener("scroll",b,!0),document.removeEventListener("keydown",j)}},[e.visible,t]),!e.visible||!e.node)return null;const c=e.node,l=c.status==="online",d=o(e.clusterId,c.node),h=d?`https://${d.host}:${d.port}/#v1:0:=node/${c.node}`:null,g=x=>{x.stopPropagation(),h&&window.open(h,"_blank","noopener,noreferrer"),t()},u=x=>{x.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${l?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:c.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:u,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:i("vm.details")})]}),r.jsxs("button",{className:"context-menu-item",onClick:x=>{x.stopPropagation(),a(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:i("vm.perf_charts")})]}),r.jsxs("button",{className:"context-menu-item",onClick:x=>{x.stopPropagation(),s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"4 17 10 11 4 5"}),r.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),r.jsx("span",{children:i("node.host_shell")})]}),h&&r.jsxs("button",{className:"context-menu-item",onClick:g,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:i("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("node.status"),":"]}),r.jsx("span",{className:l?"text-success":"text-danger",children:l?i("node.online").toUpperCase():i("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("metric.cpu"),":"]}),r.jsxs("span",{children:[c.cpu.cores," ",i("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("metric.memory"),":"]}),r.jsx("span",{children:Pe(c.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("cluster.vms_short"),":"]}),r.jsx("span",{children:c.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("cluster.cts_short"),":"]}),r.jsx("span",{children:c.ct_count})]})]})]})}function Ig({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=Se(s),i=.3+s/100*.7,[c,l]=p.useState(0),d=p.useRef(null),h=p.useRef(0),g=p.useRef(!0);return p.useEffect(()=>{const x=g.current?0:c;g.current=!1,d.current=null;const b=j=>{d.current||(d.current=j);const y=j-d.current,m=Math.min(y/1e3,1),f=1-Math.pow(1-m,3),v=x+(s-x)*f;l(v),m<1?h.current=requestAnimationFrame(b):l(s)};return h.current=requestAnimationFrame(b),()=>{h.current&&cancelAnimationFrame(h.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[c.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function Lg({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){Se(e.cpu.usage_percent),Se(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx($g,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:ci(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Ag({node:e,storages:t,onClose:n}){const{t:a,language:s}=$e(),o=e.status==="online",i=e.cpu.usage_percent,c=e.memory.used_bytes/e.memory.total_bytes*100,l=e.disk.used_bytes/e.disk.total_bytes*100,d=e.cluster_id||"",[h,g]=p.useState(null),[u,x]=p.useState(null),[b,j]=p.useState(null);return p.useEffect(()=>{if(!d)return;let y=!0;const m=encodeURIComponent(d),f=encodeURIComponent(e.node);return(async()=>{try{const v=await fetch(`/api/clusters/${m}/nodes/${f}/updates`,{credentials:"same-origin"});v.ok&&y&&g((await v.json()).count??0)}catch{}})(),(async()=>{try{const v=await fetch(`/api/clusters/${m}/nodes/${f}/subscription`,{credentials:"same-origin"});v.ok&&y&&x((await v.json()).subscription||{})}catch{}})(),(async()=>{try{const v=await fetch(`/api/clusters/${m}/nodes/${f}/certificates`,{credentials:"same-origin"});if(v.ok&&y){const k=(await v.json()).certificates||[];let w=null;for(const _ of k){const M=_.notafter||_["notafter-formatted"];if(!M)continue;const z=typeof M=="number"?M:Date.parse(String(M))/1e3;!z||isNaN(z)||(!w||z<w.ts)&&(w={ts:z,subj:_.subject||_.filename||"cert"})}if(w){const _=Math.floor((w.ts-Date.now()/1e3)/86400);j({days:_,subj:w.subj})}}}catch{}})(),()=>{y=!1}},[d,e.node]),r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${o?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:o?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:Pg(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:Tg(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:ci(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.subscription")}),r.jsx("span",{className:"info-value",children:u===null?"…":u.status==="active"?r.jsx("span",{className:"ndp-badge ok",children:u.level||"Active"}):u.status?r.jsx("span",{className:"ndp-badge warn",children:u.status}):r.jsx("span",{className:"ndp-badge muted",children:a("node.no_sub")})})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.updates_pending")}),r.jsx("span",{className:"info-value",children:h===null?"…":h===0?r.jsx("span",{className:"ndp-badge ok",children:"0"}):r.jsx("span",{className:`ndp-badge ${h>=50?"warn":"info"}`,children:h})})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.cert_expires")}),r.jsx("span",{className:"info-value",children:b===null?"…":b.days<0?r.jsx("span",{className:"ndp-badge crit",title:b.subj,children:s==="zh-TW"?`已過期 ${Math.abs(b.days)} 天`:`expired ${Math.abs(b.days)}d ago`}):b.days<30?r.jsx("span",{className:"ndp-badge warn",title:b.subj,children:s==="zh-TW"?`${b.days} 天`:`${b.days}d`}):r.jsx("span",{className:"ndp-badge ok",title:b.subj,children:s==="zh-TW"?`${b.days} 天`:`${b.days}d`})})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${Se(i)}`,children:lt(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Se(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${hp(e.cpu.iowait)}`,children:lt(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${hp(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${Se(c)}`,children:lt(c,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Se(c)}`,style:{width:`${c}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Pe(e.memory.used_bytes)," / ",Pe(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${Se(l)}`,children:lt(l,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Se(l)}`,style:{width:`${l}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Pe(e.disk.used_bytes)," / ",Pe(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Pe(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Pe(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(y=>{const m=y.disk.used_bytes/y.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${y.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:y.storage}),r.jsx("span",{className:"storage-type",children:y.type}),y.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${Se(m)}`,style:{width:`${m}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Pe(y.disk.used_bytes)," / ",Pe(y.disk.total_bytes)]}),r.jsx("span",{className:`text-${Se(m)}`,children:lt(m,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...y.content].sort().map(f=>r.jsx("span",{className:"content-label",children:f},f))})]},y.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Og({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=$e(),[i,c]=p.useState(null),[l,d]=p.useState(null),[h,g]=p.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),u=!e&&t&&Object.keys(t).length>0,x=p.useCallback((w,_)=>{var M;return e&&e.client_health?e.client_health[_]||null:t&&((M=t[w])!=null&&M.client_health)&&t[w].client_health[_]||null},[e,t]),b=p.useCallback((w,_,M)=>{w.preventDefault(),w.stopPropagation();const z=Math.min(w.clientX,window.innerWidth-250),O=Math.min(w.clientY,window.innerHeight-280);g({visible:!0,x:z,y:O,node:_,clusterId:M})},[]),j=p.useCallback(()=>{g(w=>({...w,visible:!1}))},[]),y=p.useMemo(()=>{var _,M,z,O,P;const w=[];if(u)Object.entries(t).forEach(([T,R])=>{var W,L,q,I,U;const te=Object.values(R.nodes);if(te.length>0){const V=te.reduce((K,C)=>K+C.cpu.usage_percent,0)/te.length,Q=te.reduce((K,C)=>C.memory.total_bytes===0?K:K+C.memory.used_bytes/C.memory.total_bytes*100,0)/te.length;w.push({clusterId:T,clusterName:R.name||T,clusterNodes:te,isStandalone:((W=R.summary)==null?void 0:W.is_standalone)||!1,avgCpu:V,avgMem:Q,vmsRunning:((L=R.summary)==null?void 0:L.vms_running)||0,ctsRunning:((q=R.summary)==null?void 0:q.cts_running)||0,vmCount:((I=R.summary)==null?void 0:I.vm_count)||0,ctCount:((U=R.summary)==null?void 0:U.ct_count)||0})}});else if(e){const T=Object.values(e.nodes),R=T.length>0?T.reduce((W,L)=>W+L.cpu.usage_percent,0)/T.length:0,te=T.length>0?T.reduce((W,L)=>L.memory.total_bytes===0?W:W+L.memory.used_bytes/L.memory.total_bytes*100,0)/T.length:0;w.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:T,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:R,avgMem:te,vmsRunning:((M=e.summary)==null?void 0:M.vms_running)||0,ctsRunning:((z=e.summary)==null?void 0:z.cts_running)||0,vmCount:((O=e.summary)==null?void 0:O.vm_count)||0,ctCount:((P=e.summary)==null?void 0:P.ct_count)||0})}return w},[e,t,u]),m=y.flatMap(w=>w.clusterNodes);p.useMemo(()=>m.length===0?0:m.reduce((w,_)=>w+_.cpu.usage_percent,0)/m.length,[m]),p.useMemo(()=>m.length===0?0:m.reduce((w,_)=>_.memory.total_bytes===0?w:w+_.memory.used_bytes/_.memory.total_bytes*100,0)/m.length,[m]);let f=null,v=[];if(i){const[w,_]=i.split("/");if(u&&t){const M=t[w];M&&(f=M.nodes[_]||null,v=Object.values(M.storages).filter(z=>z.node===_))}else e&&(f=e.nodes[_]||null,v=Object.values(e.storages).filter(M=>M.node===_))}if(!e&&!u)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const k=u?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),k]})}),r.jsx("div",{className:"cluster-sections",children:y.map(w=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(w.clusterId),title:a?o("cluster.view_vms_in",{name:w.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:w.clusterName}),w.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[w.clusterNodes.filter(_=>_.status==="online").length,"/",w.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(Ig,{cpuUsage:w.avgCpu,memUsage:w.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:w.clusterNodes.map(_=>r.jsx(Lg,{node:_,onClick:()=>c(`${w.clusterId}/${_.node}`),onContextMenu:M=>b(M,_,w.clusterId),isPaused:s},`${w.clusterId}-${_.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${Se(w.avgCpu)}`,style:{width:`${w.avgCpu}%`}})}),r.jsx(gp,{value:w.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${Se(w.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${Se(w.avgMem)}`,style:{width:`${w.avgMem}%`}})}),r.jsx(gp,{value:w.avgMem,decimals:0,suffix:"%",className:`mini-value text-${Se(w.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(xp,{left:w.vmsRunning,right:w.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(xp,{left:w.ctsRunning,right:w.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},w.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),f&&r.jsx(Ag,{node:f,storages:v,onClose:()=>c(null)}),r.jsx(Rg,{state:h,onClose:j,onShowDetails:()=>{h.node&&c(`${h.clusterId}/${h.node.node}`)},onShowPerf:()=>{h.node&&d({clusterId:h.clusterId,node:h.node.node})},onOpenShell:async()=>{if(!h.node)return;const w=h.clusterId,_=h.node.node;try{const M=await fetch("/api/console/host/prepare",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:w,node:_})}),z=await M.json().catch(()=>({}));if(!M.ok){alert(z.message||z.error||"HTTP "+M.status);return}const O=`/console-host/${encodeURIComponent(w)}/${encodeURIComponent(_)}?ct=${encodeURIComponent(z.console_token)}&lang=zh-TW`;window.open(O,"_blank","noopener,noreferrer")}catch(M){alert((M==null?void 0:M.message)||String(M))}},getNodeHealth:x}),r.jsx(mf,{open:l!==null,clusterId:(l==null?void 0:l.clusterId)||"",node:(l==null?void 0:l.node)||"",kind:"node",title:l?l.node:"",onClose:()=>d(null)}),r.jsx("style",{children:`
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

        .ndp-badge {
          display: inline-block;
          padding: 1px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .ndp-badge.ok    { color: var(--success); }
        .ndp-badge.info  { color: var(--primary); }
        .ndp-badge.warn  { color: var(--warning); }
        .ndp-badge.crit  { color: var(--danger); }
        .ndp-badge.muted { color: var(--text-muted); }

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
      `})]})}function ff({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:c,onShowPerf:l,onShowBackupHistory:d,getNodeHealth:h,userRole:g,consoleMode:u,consolePasswordSet:x,hideSnapshots:b,hideBackup:j,hideRemoteMigrate:y,hideConsole:m}){const{t:f}=$e(),v=Kr();if(p.useEffect(()=>{const P=()=>t(),T=()=>t(),R=te=>{te.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",P),document.addEventListener("scroll",T,!0),document.addEventListener("keydown",R)),()=>{document.removeEventListener("click",P),document.removeEventListener("scroll",T,!0),document.removeEventListener("keydown",R)}},[e.visible,t]),!e.visible||!e.vm)return null;const k=e.vm,w=h(e.clusterId,k.node),_=w?`https://${w.host}:${w.port}/#v1:0:=${k.type}/${k.vmid}`:null,M=P=>{P.stopPropagation(),_&&window.open(_,"_blank","noopener,noreferrer"),t()},z=P=>{P.stopPropagation(),n(),t()},O=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:P=>P.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:k.name}),r.jsxs("span",{className:"context-menu-id",children:["#",k.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:z,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:f("vm.details")})]}),_&&r.jsxs("button",{className:"context-menu-item",onClick:M,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:f("vm.open_pve")})]}),!m&&(g==="operator"||g==="admin")&&(()=>{const P=u==="disabled"?"console.disabled":k.status!=="running"?"console.vm_not_running":null,T=!!P;return r.jsxs("button",{className:`context-menu-item ${T?"is-disabled":""}`,title:T?f(P):void 0,onClick:R=>{if(R.stopPropagation(),T){t(),v.alert(f(P));return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:f("vm.console")})]})})(),!b&&(g==="operator"||g==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:f("vm.snapshots")})]}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation();const T=`/tasks?vmid=${encodeURIComponent(String(k.vmid))}&cluster=${encodeURIComponent(e.clusterId)}`;window.history.pushState(null,"",T),window.dispatchEvent(new PopStateEvent("popstate")),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"})]}),r.jsx("span",{children:f("vm.task_history")})]}),l&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),l(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:f("vm.perf_charts")})]}),d&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),d(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:f("vm.backup_history")})]}),!j&&(g==="operator"||g==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:f("vm.backup_now")})]}),(g==="operator"||g==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),k.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:k,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:f("vm.start")})]}),k.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:k,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:f("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:k,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:f("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:P=>{P.stopPropagation(),a({vm:k,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:f("vm.stop_hard")})]})]})]}),!y&&g==="admin"&&k.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),c(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:f("vm.migrate_remote")})]})]}),r.jsx("style",{children:`
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
      `})]});return Gc.createPortal(O,document.body)}const Fg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Dg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Bg({task:e}){const t=Fg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Dg(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:Wg})]})}const Wg=`
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
`;function Ug({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:c,onCancel:l}){const[d,h]=Go.useState(""),g=p.useRef(null),u=p.useRef(null);if(p.useEffect(()=>{e&&(h(""),setTimeout(()=>{var b,j;a?(b=u.current)==null||b.focus():(j=g.current)==null||j.focus()},50))},[e,a]),p.useEffect(()=>{if(!e)return;const b=j=>{j.key==="Escape"&&(j.preventDefault(),l()),j.key==="Enter"&&(!a||d===a)&&(j.preventDefault(),c())};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,d,a,c,l]),!e)return null;const x=!a||d===a;return r.jsxs("div",{onClick:l,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:b=>b.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:b=>h(b.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:l,children:i}),r.jsx("button",{ref:g,className:`cm-btn confirm ${s?"danger":""}`,disabled:!x,onClick:c,children:o})]})]})]})}function Da({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,c]=p.useState(!1),[l,d]=p.useState(-1),h=p.useRef(null),g=p.useRef(null),u=p.useId(),x=t.find(m=>m.value===e);p.useEffect(()=>{if(!i)return;const m=v=>{var M,z;const k=v.target,w=(M=h.current)==null?void 0:M.contains(k),_=(z=g.current)==null?void 0:z.contains(k);!w&&!_&&c(!1)},f=v=>{if(v.key==="Escape"){c(!1);return}if(v.key==="ArrowDown")v.preventDefault(),d(k=>Math.min(t.length-1,k<0?0:k+1));else if(v.key==="ArrowUp")v.preventDefault(),d(k=>Math.max(0,k-1));else if(v.key==="Enter"){v.preventDefault();const k=t[l];k&&!k.disabled&&(n(k.value),c(!1))}};return document.addEventListener("mousedown",m),document.addEventListener("keydown",f),()=>{document.removeEventListener("mousedown",m),document.removeEventListener("keydown",f)}},[i,l,t,n]);const b=()=>{o||(c(m=>!m),d(t.findIndex(m=>m.value===e)))},[j,y]=p.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return p.useLayoutEffect(()=>{if(!i)return;const m=()=>{var O;const f=(O=h.current)==null?void 0:O.getBoundingClientRect();if(!f)return;const v=6,k=320,w=window.innerHeight-f.bottom-v-8,_=f.top-v-8,M=w<160&&_>w+40,z=Math.max(120,Math.min(k,M?_:w));y({left:f.left,top:M?f.top-v:f.bottom+v,width:f.width,flipUp:M,maxH:z})};return m(),window.addEventListener("resize",m),window.addEventListener("scroll",m,!0),()=>{window.removeEventListener("resize",m),window.removeEventListener("scroll",m,!0)}},[i]),r.jsxs("div",{ref:h,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:Vg}),r.jsxs("button",{type:"button",id:u,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:b,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:x?x.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&Gc.createPortal(r.jsx("div",{ref:g,className:"cyber-select-list",role:"listbox",style:{left:j.left,width:j.width,...j.flipUp?{bottom:window.innerHeight-j.top,top:"auto"}:{top:j.top},maxHeight:j.maxH},children:t.map((m,f)=>r.jsxs("div",{role:"option","aria-selected":m.value===e,"aria-disabled":m.disabled||void 0,className:`cyber-select-opt ${m.value===e?"selected":""} ${f===l?"hover":""} ${m.disabled?"disabled":""}`,onMouseEnter:()=>d(f),onClick:()=>{m.disabled||(n(m.value),c(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:m.label}),m.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:m.hint}),m.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},m.value))}),document.body)]})}const Vg=`
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
`,Hg=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function hf({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=$e(),[i,c]=p.useState("endpoint"),[l,d]=p.useState([]),[h,g]=p.useState(""),[u,x]=p.useState(""),[b,j]=p.useState(!1),[y,m]=p.useState(null),[f,v]=p.useState(null),[k,w]=p.useState(!1),[_,M]=p.useState({}),[z,O]=p.useState({}),[P,T]=p.useState(""),[R,te]=p.useState(""),[W,L]=p.useState(!0),[q,I]=p.useState(!1),[U,V]=p.useState(""),[Q,K]=p.useState(""),[C,Ne]=p.useState(""),[_e,Ke]=p.useState(null),[G,de]=p.useState(!1),me=async()=>{if(!(!n||!Z)){de(!0),Ke(null),K("");try{const B=await Be.migrationPrecheck(t,n.vmid,Z.cluster_id,Z.node_name||Z.node_host);Ke({ok:B.ok,blockers:B.blockers,warnings:B.warnings})}catch(B){const ie=B instanceof Error?B.message:String(B);K(`pre-flight check failed: ${ie}`)}finally{de(!1)}}};p.useEffect(()=>{e&&(c("endpoint"),d([]),g(""),x(""),m(null),v(null),M({}),O({}),T(""),te(n?String(n.vmid):""),V(""),K(""),Ne(""),Ke(null),Be.listRemoteEndpoints(t).then(B=>d(B.endpoints)).catch(B=>K(`could not list target clusters: ${B.message||B}`)),n&&Be.getMigrationSource(t,n.vmid).then(m).catch(B=>K(`could not introspect source VM: ${B.message||B}`)))},[e,t,n]),p.useEffect(()=>{if(!e)return;const B=ie=>{ie.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",B),()=>document.removeEventListener("keydown",B)},[e,i,a]);const Z=l.find(B=>Ui(B)===h),se=async B=>{var he;g(B);const ie=l.find(pe=>Ui(pe)===B);if(ie){j(!0),w(!0),K(""),v(null),T("");try{const pe=await Be.fetchRemoteFingerprint(ie.node_host,ie.node_port);x(pe.fingerprint)}catch(pe){const we=pe instanceof Error?pe.message:String(pe);K(`could not auto-fetch fingerprint (${we}); paste manually`),x("")}finally{j(!1)}try{const pe=ie.node_name||ie.node_host,we=await Be.getMigrationTargets(ie.cluster_id,pe);v(we);const Ie=we.ips.find(tt=>tt.address===ie.node_host);T(Ie?Ie.address:((he=we.ips[0])==null?void 0:he.address)||ie.node_host)}catch(pe){const we=pe instanceof Error?pe.message:String(pe);K(`could not enumerate target node resources: ${we}`)}finally{w(!1)}}};p.useEffect(()=>{!y||!f||(M(B=>{const ie={...B};return y.disks.forEach(he=>{var pe;if(!ie[he.key]){const we=f.storages.find(Ie=>Ie.storage===he.storage);ie[he.key]=((pe=we||f.storages[0])==null?void 0:pe.storage)||""}}),ie}),O(B=>{const ie={...B};return y.nics.forEach(he=>{var pe;if(!ie[he.key]){const we=f.bridges.find(Ie=>Ie.iface===he.bridge);ie[he.key]=((pe=we||f.bridges[0])==null?void 0:pe.iface)||""}}),ie}))},[y,f]);const F=p.useMemo(()=>{if(!y)return"";const B=new Set,ie=new Map;return y.disks.forEach(he=>{const pe=_[he.key];he.storage&&pe&&(ie.set(he.storage,pe),B.add(pe))}),B.size===1?Array.from(B)[0]:Array.from(ie.entries()).map(([he,pe])=>`${he}=${pe}`).join(",")},[y,_]),S=p.useMemo(()=>{if(!y)return"";const B=new Set,ie=new Map;return y.nics.forEach(he=>{const pe=z[he.key];he.bridge&&pe&&(ie.set(he.bridge,pe),B.add(pe))}),B.size===1?Array.from(B)[0]:Array.from(ie.entries()).map(([he,pe])=>`${he}=${pe}`).join(",")},[y,z]),H=async()=>{if(!(!n||!Z)){c("submitting"),K("");try{const B=await Be.remoteMigrate(t,n.vmid,{target_cluster_id:Z.cluster_id,target_endpoint_host:P||Z.node_host,target_endpoint_port:Z.node_port,target_endpoint_fingerprint:u||void 0,target_vmid:parseInt(R,10),target_bridge_map:S,target_storage_map:F,online:W,delete_source:q,bwlimit:U?parseInt(U,10):void 0});Ne(B.upid),c("done"),s==null||s(B.upid)}catch(B){const ie=B instanceof Error?B.message:String(B);K(ie),c("error")}}};if(!e||!n)return null;const oe=!!R&&/^\d+$/.test(R)&&!!y&&!!f&&y.disks.every(B=>!!_[B.key])&&y.nics.every(B=>!!z[B.key]),ye=i==="endpoint"?!!Z&&!!f&&!!P:i==="mappings"?oe:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:Gg,children:[r.jsx("style",{children:Kg}),r.jsxs("div",{className:"rmm",onClick:B=>B.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsx(Da,{value:h,placeholder:o("rmm.endpoint.select"),options:l.map(B=>({value:Ui(B),label:`${B.cluster_name} @ ${B.node_host}:${B.node_port}`})),onChange:B=>se(B)}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:u,onChange:B=>x(B.target.value),placeholder:b?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),Z&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsx(Da,{value:P,disabled:k||!f,placeholder:k?o("rmm.endpoint.datapath_loading"):"",options:k?[]:!f||f.ips.length===0?[{value:Z.node_host,label:`${Z.node_host} (mgmt)`}]:f.ips.map(B=>({value:B.address,label:`${B.address} · ${B.iface} (${B.type})`})),onChange:B=>T(B)}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),Q&&r.jsx("div",{className:"rmm-err",children:Q}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!ye,onClick:()=>c("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&Z&&y&&f&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:R,onChange:B=>te(B.target.value)}),y.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),y.disks.map(B=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:B.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[B.storage," ",r.jsx("em",{children:B.size})]}),r.jsx(Da,{value:_[B.key]||"",options:f.storages.map(ie=>({value:ie.storage,label:`${ie.storage} (${ie.type}, ${Hg(ie.avail)} free)`})),onChange:ie=>M({..._,[B.key]:ie})})]},B.key))]})]}),y.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),y.nics.map(B=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:B.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[B.bridge," ",r.jsx("em",{children:B.model})]}),r.jsx(Da,{value:z[B.key]||"",options:f.bridges.map(ie=>({value:ie.iface,label:`${ie.iface}${ie.address?` (${ie.address})`:""}`})),onChange:ie=>O({...z,[B.key]:ie})})]},B.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:W,onChange:B=>L(B.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:q,onChange:B=>I(B.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:U,onChange:B=>V(B.target.value),placeholder:"0"}),Q&&r.jsx("div",{className:"rmm-err",children:Q}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!ye,onClick:()=>c("review"),children:o("rmm.action.review")})]})]}),i==="review"&&Z&&r.jsxs(r.Fragment,{children:[r.jsx(Yg,{vm:n,selected:Z,clusterId:t,precheck:_e,precheckLoading:G,onRun:me,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[Z.cluster_id,"/",Z.node_host,":",Z.node_port," → vmid ",R]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:P})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:u||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:F||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:S||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(W?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(q?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:U?`${U} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:G||_e!==null&&!_e.ok,onClick:H,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:C})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:Q}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function Ui(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function Yg({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(Go.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const c=a.blockers.length>0,l=a.warnings.length>0,d=c?"blockers":l?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((h,g)=>r.jsx("li",{children:h},g))})]}),l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((h,g)=>r.jsx("li",{children:h},g))})]}),!c&&!l&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const Gg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},Kg=`
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
`;function Xg(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function gf({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=$e(),o=Kr(),[i,c]=p.useState([]),[l,d]=p.useState(!1),[h,g]=p.useState(!1),[u,x]=p.useState(""),[b,j]=p.useState(""),[y,m]=p.useState(!1),[f,v]=p.useState(""),k=async()=>{if(n){d(!0),v("");try{const z=await Be.listSnapshots(t,n.vmid);c((z.snapshots||[]).filter(O=>O.name!=="current"))}catch(z){v(z instanceof Error?z.message:String(z))}finally{d(!1)}}};if(p.useEffect(()=>{e&&(x(""),j(""),m(!1),v(""),k())},[e,t,n==null?void 0:n.vmid]),p.useEffect(()=>{if(!e)return;const z=O=>{O.key==="Escape"&&a()};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[e,a]),!e||!n)return null;const w=async()=>{if(u){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(u)){v("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}g(!0),v("");try{await Be.createSnapshot(t,n.vmid,{snapname:u,description:b,vmstate:y}),x(""),j(""),m(!1),await k()}catch(z){v(z instanceof Error?z.message:String(z))}finally{g(!1)}}},_=async z=>{if(await o.confirm(s("snap.confirm_delete",{name:z.name}),{destructive:!0})){v("");try{await Be.deleteSnapshot(t,n.vmid,z.name),await k()}catch(O){v(O instanceof Error?O.message:String(O))}}},M=async z=>{if(await o.confirm(s("snap.confirm_rollback",{name:z.name}),{destructive:!0})){v("");try{await Be.rollbackSnapshot(t,n.vmid,z.name),await k()}catch(O){v(O instanceof Error?O.message:String(O))}}};return r.jsxs("div",{onClick:a,style:qg,children:[r.jsx("style",{children:Qg}),r.jsxs("div",{className:"sm-modal",onClick:z=>z.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:u,onChange:z=>x(z.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:b,onChange:z=>j(z.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:y,onChange:z=>m(z.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:h||!u,onClick:w,children:h?"…":s("snap.create")})]})]}),f&&r.jsx("div",{className:"sm-err",children:f}),r.jsxs("div",{className:"sm-list",children:[l&&r.jsx("div",{className:"sm-empty",children:"…"}),!l&&i.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&i.map(z=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:z.name}),z.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:z.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",Xg(z.snaptime)]}),z.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),z.description&&r.jsx("div",{className:"sm-desc",children:z.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>M(z),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>_(z),children:s("snap.delete")})]})]},z.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const qg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},Qg=`
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
`;function xf({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=$e(),[o,i]=p.useState([]),[c,l]=p.useState(!1),[d,h]=p.useState(""),[g,u]=p.useState("snapshot"),[x,b]=p.useState("zstd"),[j,y]=p.useState(""),[m,f]=p.useState(""),[v,k]=p.useState(!1);if(p.useEffect(()=>{!e||!n||(y(""),f(""),h(""),l(!0),Be.getCluster(t).then(M=>{const O=Object.values(M.storages||{}).filter(P=>{var R;if(!((R=P.content)!=null&&R.includes("backup")))return!1;const T=P.allowed_nodes||[];return T.length>0&&!T.includes(n.node)||!P.shared&&P.node!==n.node?!1:P.enabled!==!1});i(O),O.length>0&&h(O[0].storage)}).catch(M=>y(M.message||String(M))).finally(()=>l(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),p.useEffect(()=>{if(!e)return;const M=z=>{z.key==="Escape"&&!v&&a()};return document.addEventListener("keydown",M),()=>document.removeEventListener("keydown",M)},[e,v,a]),!e||!n)return null;const w=o.length>0,_=async()=>{if(d){k(!0),y("");try{const M=await Be.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:g,compress:x});f(M.upid)}catch(M){y(M instanceof Error?M.message:String(M))}finally{k(!1)}}};return r.jsxs("div",{onClick:()=>!v&&a(),style:Jg,children:[r.jsx("style",{children:Zg}),r.jsxs("div",{className:"bm-modal",onClick:M=>M.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!m&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),c?r.jsx("div",{className:"bm-empty",children:"…"}):w?r.jsx("select",{value:d,onChange:M=>h(M.target.value),children:o.map(M=>r.jsxs("option",{value:M.storage,children:[M.storage," (",M.type,M.shared?", shared":"",")"]},M.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:g,onChange:M=>u(M.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:x,onChange:M=>b(M.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),j&&r.jsx("div",{className:"bm-err",children:j}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:v,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:v||!d,onClick:_,children:v?"…":s("backup.start")})]})]}),m&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:m})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const Jg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},Zg=`
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
`,vp=e=>{if(!e||!isFinite(e))return"—";const t=["B","KB","MB","GB","TB"];let n=0,a=e;for(;a>=1024&&n<t.length-1;)a/=1024,n++;return`${a.toFixed(a>=100?0:a>=10?1:2)} ${t[n]}`},bp=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`},yp=(e,t)=>{if(!e)return"—";const n=Math.floor(Date.now()/1e3)-e,a=Math.floor(n/86400);if(a===0)return t==="zh-TW"?"今天":"today";if(a===1)return t==="zh-TW"?"昨天":"yesterday";if(a<30)return t==="zh-TW"?`${a} 天前`:`${a}d ago`;const s=Math.floor(a/30);return t==="zh-TW"?`${s} 個月前`:`${s}mo ago`},wp=e=>{if(!e)return"unknown";const t=(Date.now()/1e3-e)/86400;return t>30?"stale":t>7?"aging":"fresh"};function ex({open:e,onClose:t,clusterId:n,vmid:a,vmName:s}){var j;const{t:o,language:i}=$e(),[c,l]=p.useState([]),[d,h]=p.useState(!1),[g,u]=p.useState(null);if(p.useEffect(()=>{if(!e)return;let y=!0;return(async()=>{h(!0),u(null);try{const m=await fetch(`/api/clusters/${encodeURIComponent(n)}/vms/${a}/backups`,{credentials:"same-origin"});if(!m.ok){const v=await m.json().catch(()=>({}));throw new Error(v.error||`HTTP ${m.status}`)}const f=await m.json();y&&l(f.backups||[])}catch(m){y&&u(m.message||String(m))}finally{y&&h(!1)}})(),()=>{y=!1}},[e,n,a]),!e)return null;const x=c.reduce((y,m)=>y+(m.size||0),0),b=(j=c[0])==null?void 0:j.ctime;return r.jsx("div",{className:"bh-back",onClick:t,children:r.jsxs("div",{className:"bh-modal",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"bh-head",children:[r.jsxs("div",{className:"bh-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:o("bh.title")}),s&&r.jsxs("span",{className:"bh-target",children:[a," — ",s]})]}),r.jsx("button",{className:"bh-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"bh-stats",children:[r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.count")})," ",c.length]}),r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.total_size")})," ",vp(x)]}),r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.newest")})," ",b?bp(b):"—",b&&r.jsx("span",{className:`bh-age bh-age-${wp(b)}`,children:yp(b,i)})]})]}),r.jsxs("div",{className:"bh-body",children:[g&&r.jsx("div",{className:"bh-error",children:g}),d&&c.length===0&&r.jsx("div",{className:"bh-loading",children:o("bh.loading")}),!d&&c.length===0&&!g&&r.jsxs("div",{className:"bh-empty",children:[r.jsx("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"})}),r.jsx("div",{children:o("bh.empty")})]}),c.length>0&&r.jsxs("table",{className:"bh-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:o("bh.col.ctime")}),r.jsx("th",{children:o("bh.col.age")}),r.jsx("th",{children:o("bh.col.storage")}),r.jsx("th",{children:o("bh.col.node")}),r.jsx("th",{className:"num",children:o("bh.col.size")}),r.jsx("th",{children:o("bh.col.flags")}),r.jsx("th",{children:o("bh.col.notes")})]})}),r.jsx("tbody",{children:c.map(y=>{var m,f;return r.jsxs("tr",{children:[r.jsx("td",{children:bp(y.ctime)}),r.jsx("td",{children:r.jsx("span",{className:`bh-age bh-age-${wp(y.ctime)}`,children:yp(y.ctime,i)})}),r.jsx("td",{children:y.storage||"—"}),r.jsx("td",{children:y.node||"—"}),r.jsx("td",{className:"num",children:vp(y.size)}),r.jsxs("td",{children:[y.protected&&r.jsx("span",{className:"bh-flag protected",children:o("bh.protected")}),((m=y.verification)==null?void 0:m.state)==="ok"&&r.jsx("span",{className:"bh-flag verified",children:o("bh.verified")}),((f=y.verification)==null?void 0:f.state)==="failed"&&r.jsx("span",{className:"bh-flag failed",children:o("bh.verify_failed")})]}),r.jsx("td",{className:"bh-notes",title:y.notes,children:y.notes||""})]},y.volid)})})]})]}),r.jsx("style",{children:`
          .bh-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .bh-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: bh-in .18s ease-out; overflow: hidden; }
          @keyframes bh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .bh-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .bh-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .bh-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 12px; letter-spacing: .04em; text-transform: none; }
          .bh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .bh-close:hover { color: var(--primary); }
          .bh-stats { display: flex; gap: 32px; padding: 10px 20px; font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); border-bottom: 1px solid rgba(0,240,255,.08); flex-wrap: wrap; align-items: center; }
          .bh-stats .lbl { font-family: var(--font-display); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-right: 6px; }
          .bh-body { flex: 1; overflow: auto; padding: 6px 0; }
          .bh-loading, .bh-empty { padding: 40px 20px; text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px; }
          .bh-empty svg { stroke: var(--text-muted); opacity: .6; }
          .bh-error { padding: 8px 14px; margin: 0 18px 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; }
          .bh-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; }
          .bh-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .bh-table th { padding: 8px 14px; text-align: left; font-family: var(--font-display); font-weight: 600; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .bh-table th.num, .bh-table td.num { text-align: right; }
          .bh-table td { padding: 6px 14px; border-bottom: 1px solid rgba(0,240,255,.06); white-space: nowrap; color: var(--text-primary); }
          .bh-table tbody tr:nth-child(odd) { background: rgba(0, 240, 255, 0.025); }
          .bh-table tbody tr:hover { background: rgba(0, 240, 255, 0.08); }
          .bh-notes { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }

          .bh-age { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 999px; font-size: 11px; font-family: var(--font-mono); border: 1px solid currentColor; margin-left: 8px; }
          .bh-age::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .bh-age-fresh    { color: var(--success); }
          .bh-age-aging    { color: var(--warning); }
          .bh-age-stale    { color: var(--danger, #ff4d6d); }
          .bh-age-unknown  { color: var(--text-muted); }

          .bh-flag { display: inline-block; padding: 1px 6px; margin-right: 4px; font-size: 10px; font-family: var(--font-display); letter-spacing: .04em; border-radius: 2px; }
          .bh-flag.protected { color: var(--accent); border: 1px solid rgba(224,102,255,.5); }
          .bh-flag.verified { color: var(--success); border: 1px solid rgba(0,255,136,.5); }
          .bh-flag.failed { color: var(--danger, #ff4d6d); border: 1px solid rgba(255,77,109,.5); }
        `})]})})}function vf({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=$e(),[i,c]=p.useState(""),[l,d]=p.useState(!1),[h,g]=p.useState(""),u=p.useRef(null);if(p.useEffect(()=>{e&&(c(""),g(""),d(!1),setTimeout(()=>{var b;return(b=u.current)==null?void 0:b.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const b=j=>{j.key==="Escape"&&!l&&a()};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,l,a]),!e)return null;const x=async()=>{if(i){d(!0),g("");try{await s(i)}catch(b){const j=b instanceof Error?b.message:String(b);g(o("console.prepare_failed",{err:j})),d(!1)}}};return r.jsxs("div",{onClick:()=>!l&&a(),style:tx,children:[r.jsx("style",{children:rx}),r.jsxs("div",{className:"cpw-modal",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:u,type:"password",value:i,onChange:b=>c(b.target.value),onKeyDown:b=>{b.key==="Enter"&&x()},autoComplete:"current-password",spellCheck:!1}),h&&r.jsx("div",{className:"cpw-err",children:h}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:l,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:x,disabled:l||!i,children:l?"…":o("console.prompt_open")})]})]})]})}const tx={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},rx=`
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
`;function _s(){const[e,t]=p.useState(!0),[n,a]=p.useState(null),[s,o]=p.useState(!1),i=async()=>{try{const l=await Be.authMe();l.authenticated&&l.user?(a(l.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},c=async()=>{try{await Be.authLogout()}catch{}window.location.replace("/login")};return p.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:c}}function Vi(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function nx(e){return e==="stop"||e==="shutdown"||e==="reboot"}function Gs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}const kp=Go.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:c=!1,isCompleting:l=!1},d){var _,M,z;const h=t.status==="running",g=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,x=Math.max(t.cpu.usage_percent,g,u),b=h?Se(x):"muted",j=!!i,y=(_=i==null?void 0:i.task_type)==null?void 0:_.includes("migrate"),m=((M=i==null?void 0:i.task_type)==null?void 0:M.includes("backup"))||((z=i==null?void 0:i.task_type)==null?void 0:z.includes("vzdump")),f=t.name.length>12?t.name.substring(0,11)+"…":t.name,k=i?(O=>{const P=O.toLowerCase();return P.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:P.includes("backup")||P.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:P.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:P.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:P.includes("clone")?{label:"CLONE",color:"#10b981"}:P.includes("start")||P.includes("qmstart")?{label:"START",color:"#00ff88"}:P.includes("stop")||P.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:P.includes("reboot")||P.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,w=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${j?"has-task":""} ${y?"migrating":""} ${m?"backup":""} ${c?"ghost":""} ${l?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${b}`,children:[r.jsx("span",{className:"vm-name",children:f}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!y&&!m&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),m&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),y&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),k&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:k.color,color:k.color},children:[k.label,y&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),j&&!y&&!m&&r.jsx("div",{className:"vm-task-ring"}),m&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),y&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(w==null?void 0:w.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",w.target]})]}),c&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function ax({vm:e,onClose:t}){const{t:n}=$e(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${Vl(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${Vl(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:ci(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${Se(e.cpu.usage_percent)}`,children:lt(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${Se(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Pe(e.memory.used_bytes)," / ",Pe(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${Se(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Pe(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Pe(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function sx({cluster:e,clusters:t}){var jn;const{t:n,language:a}=$e(),s=Kr(),[o,i]=p.useState(null),c=_s(),[l,d]=p.useState(null),[h,g]=p.useState(null),[u,x]=p.useState(null),[b,j]=p.useState(null),[y,m]=p.useState(null),[f,v]=p.useState(null),[k,w]=p.useState("disabled"),[_,M]=p.useState({});p.useEffect(()=>{Be.getConfig().then(N=>{var E;w(((E=N.console)==null?void 0:E.mode)||"disabled");const A={};(N.clusters||[]).forEach($=>{A[$.id]=!!($.auth&&$.auth.password&&$.auth.password.length>0)}),M(A)}).catch(()=>w("disabled"))},[]);const[z,O]=p.useState(null),P=p.useCallback((N,A,E,$)=>{const D=typeof localStorage<"u"&&localStorage.getItem("language")||"",re=A.type==="lxc",ae=`${re?"/console-term":"/console"}/${encodeURIComponent(N)}/${encodeURIComponent(A.node)}/${A.vmid}?ct=${encodeURIComponent(E)}`+(A.name?`&name=${encodeURIComponent(A.name)}`:"")+(D?`&lang=${encodeURIComponent(D)}`:"")+(!re&&$?`#vp=${encodeURIComponent($)}`:"");window.open(ae,"_blank","noopener,noreferrer")},[]),[T,R]=p.useState([]),te=p.useRef(new Map),W=p.useCallback(N=>{N.action==="start"||N.action==="resume"?L(N):d(N)},[]),L=p.useCallback(async N=>{d(null);try{const A=N.vm.type==="lxc",E=A?await Be.ctAction(N.clusterId,N.vm.node,N.vm.vmid,N.action):await Be.vmAction(N.clusterId,N.vm.node,N.vm.vmid,N.action);console.info(`[vm_control] ${N.action} ${A?"ct":"vm"}/${N.vm.vmid} → upid=${E.upid}`)}catch(A){const E=A instanceof Error?A.message:String(A);E.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${N.action} failed: ${E.slice(0,200)}`)}},[]),q=p.useCallback(()=>{l&&L(l)},[l,L]),[I,U]=p.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[V,Q]=p.useState(""),[K,C]=p.useState(new Set),[Ne,_e]=p.useState(!1),Ke=p.useCallback(N=>{C(A=>{const E=new Set(A);return E.has(N)?E.delete(N):E.add(N),E})},[]),G=p.useCallback(()=>C(new Set),[]),de=p.useCallback(async N=>{if(K.size!==0){_e(!0);try{const A=new Map;for(const J of K){const[ae,,ce]=J.split("/"),xe=parseInt(ce,10);if(!ae||!Number.isFinite(xe))continue;const be=A.get(ae)||[];be.push(xe),A.set(ae,be)}const E=[];for(const[J,ae]of A)try{const ce=await Be.bulkAction(J,{action:N,vmids:ae}),xe=ce.results.filter(De=>De.ok).length,be=ce.results.length-xe,Ge=ce.results.filter(De=>!De.ok).map(De=>`#${De.vmid}: ${De.error||"unknown"}`);E.push({cluster:J,ok:xe,fail:be,errs:Ge})}catch(ce){const xe=ce instanceof Error?ce.message:String(ce);E.push({cluster:J,ok:0,fail:ae.length,errs:[xe]})}const $=E.reduce((J,ae)=>J+ae.ok,0),D=E.reduce((J,ae)=>J+ae.fail,0),re=[];E.forEach(J=>{re.push(`${J.cluster}: ${J.ok} ok / ${J.fail} fail`),J.errs.slice(0,5).forEach(ae=>re.push(`  • ${ae}`)),J.errs.length>5&&re.push(`  • … +${J.errs.length-5}`)}),await s.alert(`${N.toUpperCase()}: ${$} ok, ${D} fail

${re.join(`
`)}`,{title:"Bulk action result"}),D===0&&G()}finally{_e(!1)}}},[K,G]),[me,Z]=p.useState(()=>{const N=(()=>{if(typeof window>"u")return null;const E=window.location.pathname.split("/").filter(Boolean)[1];return E==="grid"||E==="table"||E==="thumb"?E:null})();if(N)return N;const A=localStorage.getItem("vm_matrix_view_mode");return A==="table"||A==="thumb"||A==="grid"?A:"grid"});p.useEffect(()=>{if(typeof window>"u"||window.location.pathname.split("/").filter(Boolean)[0]!=="matrix")return;const A=`/matrix/${me}`;window.location.pathname!==A&&window.history.replaceState(null,"",A)},[me]),p.useEffect(()=>{const N=()=>{const A=window.location.pathname.split("/").filter(Boolean)[1];(A==="grid"||A==="table"||A==="thumb")&&Z(A)};return window.addEventListener("popstate",N),()=>window.removeEventListener("popstate",N)},[]);const[se,F]=p.useState(()=>{const N=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(N)?Math.max(160,Math.min(640,N)):320}),[S,H]=p.useState(null);p.useEffect(()=>{if(!S)return;const N=A=>{A.key==="Escape"&&H(null)};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[S]);const[oe,ye]=p.useState(()=>Math.floor(Date.now()/3e4));p.useEffect(()=>{if(me!=="thumb")return;const N=window.setInterval(()=>ye(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(N)},[me]);const[B,ie]=p.useState(()=>{const N=localStorage.getItem("vm_matrix_thumb_type");return N==="qemu"||N==="lxc"?N:"all"});p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",B)},[B]);const[he,pe]=p.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",he?"1":"0")},[he]);const[we,Ie]=p.useState({}),tt=p.useRef({});tt.current=we,p.useEffect(()=>()=>{Object.values(tt.current).forEach(N=>{try{URL.revokeObjectURL(N.url)}catch{}})},[]);const Ve=p.useRef(new Map),He=p.useRef(!1);p.useEffect(()=>{me==="thumb"&&(He.current=!1)},[me]),p.useLayoutEffect(()=>{if(me!=="thumb"){Ve.current.clear();return}const N=$=>{let D=0,re=0,J=$;for(;J;)D+=J.offsetLeft,re+=J.offsetTop,J=J.offsetParent;return{left:D,top:re}},A=document.querySelectorAll(".vm-thumb-card[data-card-key]"),E=new Map;A.forEach($=>{const D=$.dataset.cardKey;D&&E.set(D,N($))}),He.current&&A.forEach($=>{const D=$.dataset.cardKey;if(!D)return;const re=Ve.current.get(D),J=E.get(D);if(!re||!J)return;const ae=re.left-J.left,ce=re.top-J.top;Math.abs(ae)<1&&Math.abs(ce)<1||($.style.transition="none",$.style.transform=`translate(${ae}px, ${ce}px)`,requestAnimationFrame(()=>{$.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",$.style.transform=""}))}),Ve.current=E}),p.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",me)},[me]),p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(se))},[se]);const ge=p.useRef(null),[ve,Oe]=p.useState("vmid"),[Y,ne]=p.useState("asc"),[le,ke]=p.useState(!1),[Me,Le]=p.useState(()=>{const N=localStorage.getItem("matrix_card_width");return N?parseInt(N,10):85}),[Fe,kt]=p.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[ue,We]=p.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[Ye,Je]=p.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[at,sr]=p.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[Te,Wt]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[It,jr]=p.useState([]),[X,Ze]=p.useState([]),[Xe,ct]=p.useState(new Map),yt=p.useRef(new Set),[ht,vt]=p.useState(!1),[Bn,Wn]=p.useState(0),[Tr,Xr]=p.useState(!0);p.useEffect(()=>{vt(!1),Wn(E=>E+1),Xr(!0);const N=setTimeout(()=>{vt(!0)},100),A=setTimeout(()=>{Xr(!1)},8e3);return()=>{clearTimeout(N),clearTimeout(A)}},[ue]);const Jt=p.useRef(new Map),qr=p.useRef(new Map),Qr=p.useRef(null),ur=p.useRef(!1),Un=p.useMemo(()=>{if(Fe!=="load")return"";const N=[],A=E=>{Object.values(E.vms).forEach($=>{if($.template||I==="running"&&$.status!=="running"||I==="stopped"&&$.status!=="stopped")return;const D=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,re=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,J=Math.max($.cpu.usage_percent,D,re);N.push({key:`${$.node}/${$.vmid}`,load:Math.round(J)})})};return t?Object.values(t).forEach(A):e&&A(e),N.sort((E,$)=>$.load-E.load),N.map(E=>`${E.key}:${E.load}`).join("|")},[e,t,Fe,I]);p.useLayoutEffect(()=>{if(Fe!=="load"||ur.current)return;const N=new Map;Jt.current.forEach((A,E)=>{A&&N.set(E,A.getBoundingClientRect())}),qr.current=N},[Un,Fe]),p.useEffect(()=>{Fe==="load"&&qr.current.size!==0&&requestAnimationFrame(()=>{const N=[];Jt.current.forEach((A,E)=>{if(!A)return;const $=qr.current.get(E);if(!$)return;const D=A.getBoundingClientRect(),re=$.left-D.left,J=$.top-D.top;if(Math.abs(re)>2||Math.abs(J)>2){ur.current=!0;const ae=A.animate([{transform:`translate(${re}px, ${J}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});N.push(ae)}}),N.length>0?Promise.all(N.map(A=>A.finished)).then(()=>{ur.current=!1}).catch(()=>{ur.current=!1}):ur.current=!1})},[Un,Fe]);const[dt,Jr]=p.useState(!1);p.useEffect(()=>{dt||Be.getConfig().then(N=>{var E;const A=(E=N==null?void 0:N.ui)==null?void 0:E.vm_matrix_default_filter;A&&(U(A),localStorage.setItem("vm_matrix_default_filter",A)),Jr(!0)}).catch(()=>{const N=localStorage.getItem("vm_matrix_default_filter");N&&U(N),Jr(!0)})},[dt]),p.useEffect(()=>{const N=()=>{const E=localStorage.getItem("matrix_card_width");E&&Le(parseInt(E,10));const $=localStorage.getItem("matrix_sort_by");$&&$!==Fe&&kt($);const D=localStorage.getItem("matrix_group_sort_by");D&&D!==Ye&&Je(D);const re=localStorage.getItem("matrix_group_sort_order");re&&re!==at&&sr(re)};window.addEventListener("storage",N);const A=setInterval(N,1e3);return()=>{window.removeEventListener("storage",N),clearInterval(A)}},[Fe,Ye,at]);const wn=p.useCallback((N,A)=>{var E;return e&&e.client_health?e.client_health[A]||null:t&&((E=t[N])!=null&&E.client_health)&&t[N].client_health[A]||null},[e,t]),Pr=p.useCallback((N,A,E)=>{N.preventDefault(),N.stopPropagation();const $=Math.min(N.clientX,window.innerWidth-250),D=Math.min(N.clientY,window.innerHeight-300);Wt({visible:!0,x:$,y:D,vm:A,clusterId:E})},[]),ze=p.useCallback(()=>{Wt(N=>({...N,visible:!1}))},[]),je=!e&&t&&Object.keys(t).length>0,Ae=p.useMemo(()=>{const N=[],A=(E,$,D)=>{if(!E.tasks)return;Object.values(E.tasks).forEach(J=>{var De;const ae=((De=J.task_type)==null?void 0:De.toLowerCase())||"",ce=ae.includes("migrate"),xe=J.status==="running",be=!!J.target_node,Ge=ae.startsWith("ha");if(ae.startsWith("qm")||ae.startsWith("vz"),xe&&ce&&be&&!Ge){const Qe=Object.keys(E.vms).find(Vt=>{const Nr=E.vms[Vt];return Nr.vmid===J.vmid&&Nr.node===J.node});Qe&&N.push({vm:E.vms[Qe],task:J,targetNode:J.target_node||"",clusterId:$,clusterLabel:D})}})};return je&&t?Object.entries(t).forEach(([E,$])=>{A($,E,$.name||E)}):e&&A(e,e.id,e.name||e.id),N},[e,t,je]);p.useEffect(()=>{const N=new Set(Ae.map($=>`${$.clusterId}:${$.vm.vmid}`)),A=yt.current,E=te.current;A.forEach($=>{if(!N.has($)&&!Xe.has($)){const D=E.get($);D&&D.upid&&(async()=>{var re,J,ae;try{const ce=await Be.taskStatus(D.clusterId,D.node,D.upid),xe=(ce==null?void 0:ce.exitstatus)||"";if((ce==null?void 0:ce.status)==="running")return;if(xe&&xe!=="OK"){const Ge=((re=e==null?void 0:e.vms)==null?void 0:re[`${D.node}/${D.vmid}`])||((ae=(J=t==null?void 0:t[D.clusterId])==null?void 0:J.vms)==null?void 0:ae[`${D.node}/${D.vmid}`]),De=Ge&&Ge.lock||"migrate";R(Qe=>Qe.some(Vt=>Vt.id===$)?Qe:[...Qe,{id:$,vmid:D.vmid,sourceNode:D.node,targetNode:D.targetNode,clusterLabel:D.clusterLabel,lock:De,copied:!1}])}}catch{}})(),E.delete($)}}),Ae.forEach(({vm:$,task:D,clusterId:re,clusterLabel:J,targetNode:ae})=>{const ce=`${re}:${$.vmid}`;E.set(ce,{upid:D.upid,node:D.node,vmid:$.vmid,clusterId:re,clusterLabel:J,targetNode:ae})}),yt.current=N},[Ae,Xe,e,t]);const gt=p.useRef(new Map);p.useEffect(()=>{Ae.forEach(({vm:N,targetNode:A,clusterId:E})=>{const $=`${E}:${N.vmid}`;gt.current.set($,{targetNode:A,sourceNode:N.node,clusterId:E,vmid:N.vmid})})},[Ae]);const pt=p.useRef(new Map);p.useEffect(()=>{It.forEach(N=>{const A=`${N.clusterId}:${N.vmid}`;pt.current.set(A,{x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2})})},[It]),p.useEffect(()=>{const N=new Set(Ae.map(A=>`${A.clusterId}:${A.vm.vmid}`));gt.current.forEach((A,E)=>{if(!N.has(E)&&!Xe.has(E)){const $=pt.current.get(E);if($){const D=Date.now(),re=800,J=()=>{const ae=Date.now()-D,ce=Math.min(ae/re,1),xe=$.x1+($.x2-$.x1)*ce,be=$.y1+($.y2-$.y1)*ce;Ze([{x1:xe,y1:be,x2:$.x2,y2:$.y2,vmid:A.vmid,progress:ce}]),ce<1?requestAnimationFrame(J):Ze([])};requestAnimationFrame(J)}ct(D=>{const re=new Map(D);return re.set(E,{...A,startTime:Date.now()}),re}),gt.current.delete(E),pt.current.delete(E),setTimeout(()=>{ct(D=>{const re=new Map(D);return re.delete(E),re})},1e4)}})},[Ae,Xe]),p.useEffect(()=>{if(Xe.size===0)return;const N=(A,E)=>{const $=D=>{for(const re of Object.values(D.vms))if(re.vmid===A)return re.node;return null};if(t&&E){const D=t[E];if(D)return $(D)}else if(e)return $(e);return null};Xe.forEach((A,E)=>{const $=N(A.vmid,A.clusterId);$&&$===A.targetNode&&$!==A.sourceNode&&ct(D=>{const re=new Map(D);return re.delete(E),re})})},[e,t,Xe]);const Ut=p.useCallback((N,A)=>{const E=je?`${A} / `:"";switch(ue){case"none":return je?A:"all";case"type":return`${E}${N.type==="qemu"?"VM":"CT"}`;case"tag":return N.tags&&N.tags.length>0?`${E}${N.tags[0]}`:`${E}(no tag)`;case"node":default:return`${E}${N.node}`}},[ue,je]),st=p.useMemo(()=>{const N={},A=(E,$,D)=>{Object.entries(E.vms).forEach(([re,J])=>{if(I==="running"&&J.status!=="running"||I==="stopped"&&J.status!=="stopped"||V&&!J.name.toLowerCase().includes(V.toLowerCase())&&!String(J.vmid).includes(V)||J.template)return;const ae=Ut(J,$);N[ae]||(N[ae]={vms:[],clusterId:D}),N[ae].vms.push(J)})};return je?Object.entries(t).forEach(([E,$])=>{const D=$.name||E;A($,D,E)}):e&&A(e,"",e.id),Object.values(N).forEach(E=>{E.vms.sort(($,D)=>{switch(Fe){case"name":return $.name.localeCompare(D.name);case"load":{const re=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,J=D.memory.total_bytes>0?D.memory.used_bytes/D.memory.total_bytes*100:0,ae=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,ce=D.disk.total_bytes>0?D.disk.used_bytes/D.disk.total_bytes*100:0,xe=Math.max($.cpu.usage_percent,re,ae),be=Math.max(D.cpu.usage_percent,J,ce);if($.status!=="running"&&D.status==="running")return 1;if($.status==="running"&&D.status!=="running")return-1;if($.status!=="running"&&D.status!=="running")return $.vmid-D.vmid;const Ge=Vt=>Vt>=95?0:Vt>=80?1:2,De=Ge(xe),Qe=Ge(be);return De!==Qe?De-Qe:be-xe}case"vmid":default:return $.vmid-D.vmid}})}),N},[e,t,je,I,V,Fe,Ut]),ot=p.useMemo(()=>{const N=[],A=(E,$)=>{Object.values(E.vms).forEach(D=>{D.template||D.status==="running"&&I!=="stopped"&&(B==="qemu"&&D.type!=="qemu"||B==="lxc"&&D.type!=="lxc"||V&&!D.name.toLowerCase().includes(V.toLowerCase())&&!String(D.vmid).includes(V)||N.push({...D,clusterId:$}))})};return je&&t?Object.entries(t).forEach(([E,$])=>A($,E)):e&&A(e,e.id),N.sort((E,$)=>{switch(Fe){case"name":return E.name.localeCompare($.name);case"load":{const D=E.memory.total_bytes>0?E.memory.used_bytes/E.memory.total_bytes*100:0,re=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,J=E.disk.total_bytes>0?E.disk.used_bytes/E.disk.total_bytes*100:0,ae=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,ce=Math.max(E.cpu.usage_percent,D,J),xe=Math.max($.cpu.usage_percent,re,ae),be=ce>=95?0:ce>=80?1:2,Ge=xe>=95?0:xe>=80?1:2;return be!==Ge?be-Ge:xe-ce}case"vmid":default:return E.vmid-$.vmid}}),N},[e,t,je,I,V,Fe,B]),Rr=p.useMemo(()=>{const N=new Map,A=E=>t&&t[E]?t[E].name||E:e&&e.id===E&&e.name||E;return ot.forEach(E=>{const $=A(E.clusterId),D=Ut(E,$),re=N.get(D)||[];re.push(E),N.set(D,re)}),Array.from(N.entries()).sort(([E],[$])=>{const D=E.localeCompare($);return at==="desc"?-D:D})},[ot,Ut,t,e,at]);p.useEffect(()=>{if(me!=="thumb")return;let N=!1;const A=640,E=He.current,$={},D=async ae=>{const ce=ae.clusterId||(e==null?void 0:e.id)||"",xe=`${ce}/${ae.node}/${ae.vmid}`,be=`/api/console/screenshot/${encodeURIComponent(ce)}/${encodeURIComponent(ae.node)}/${ae.vmid}?max=${A}&t=${oe}`;try{const Ge=await fetch(be,{credentials:"same-origin"});if(!Ge.ok||N)return;const De=await Ge.blob();if(N)return;const Qe=URL.createObjectURL(De),Vt=Ge.headers.get("X-Thumb-Empty")==="1";E?$[xe]={url:Qe,isBlank:Vt}:Ie(Nr=>{const rd=Nr[xe];if(rd)try{URL.revokeObjectURL(rd.url)}catch{}return{...Nr,[xe]:{url:Qe,isBlank:Vt}}})}catch{}},re=6;return(async ae=>{const ce=new Set;for(const xe of ae){const be=D(xe).finally(()=>{ce.delete(be)});ce.add(be),ce.size>=re&&await Promise.race(ce)}await Promise.all(ce)})(ot).finally(()=>{if(N){Object.values($).forEach(ce=>{try{URL.revokeObjectURL(ce.url)}catch{}});return}const ae=new Set(ot.map(ce=>`${ce.clusterId||(e==null?void 0:e.id)||""}/${ce.node}/${ce.vmid}`));Ie(ce=>{let xe=!1;const be={};return Object.entries(ce).forEach(([Ge,De])=>{if(ae.has(Ge))be[Ge]=De;else{try{URL.revokeObjectURL(De.url)}catch{}xe=!0}}),E&&Object.entries($).forEach(([Ge,De])=>{const Qe=be[Ge];if(Qe)try{URL.revokeObjectURL(Qe.url)}catch{}be[Ge]=De,xe=!0}),xe?be:ce}),He.current||setTimeout(()=>{N||(He.current=!0)},300)}),()=>{N=!0}},[me,ot,oe,e==null?void 0:e.id]);const Lt=p.useMemo(()=>{const N=[],A=new Map;return je&&t&&Object.entries(t).forEach(([E,$])=>{const D=$.name||E;Object.values($.nodes||{}).forEach(re=>{re&&re.node&&A.set(re.node,{id:E,label:D})})}),Ae.forEach(({vm:E,targetNode:$,clusterId:D,clusterLabel:re})=>{const J=A.get($),ae=J&&J.id!==D?J:{id:D,label:re},ce=je?`${ae.label} / ${$}`:$,xe=je?`${re} / ${E.node}`:E.node;N.push({vm:E,targetGroupKey:ce,sourceGroupKey:xe,clusterId:D,targetClusterId:ae.id})}),N},[Ae,je,t]);p.useEffect(()=>{if(me!=="grid"||Lt.length===0){jr([]);return}const N=()=>{const D=Qr.current;if(!D)return;const re=D.getBoundingClientRect(),J=D.scrollLeft,ae=D.scrollTop,ce=[];Lt.forEach(({vm:xe})=>{const be=`${xe.cluster_id}/${xe.node}/${xe.vmid}`,Ge=`ghost-${xe.cluster_id}-${xe.vmid}`,De=Jt.current.get(be),Qe=Jt.current.get(Ge);if(De&&Qe){const Vt=De.getBoundingClientRect(),Nr=Qe.getBoundingClientRect();ce.push({x1:Vt.left+Vt.width/2-re.left+J,y1:Vt.top+Vt.height/2-re.top+ae,x2:Nr.left+Nr.width/2-re.left+J,y2:Nr.top+Nr.height/2-re.top+ae,vmid:xe.vmid,clusterId:xe.cluster_id})}}),jr(ce)},A=setTimeout(N,100),E=setInterval(N,500),$=Qr.current;return $&&$.addEventListener("scroll",N),()=>{clearTimeout(A),clearInterval(E),$&&$.removeEventListener("scroll",N)}},[Lt,me]);const At=p.useMemo(()=>{const N=[],A=(E,$,D)=>{Object.values(E.vms).forEach(re=>{I==="running"&&re.status!=="running"||I==="stopped"&&re.status!=="stopped"||V&&!re.name.toLowerCase().includes(V.toLowerCase())&&!String(re.vmid).includes(V)||re.template||N.push({...re,clusterName:$,clusterId:D})})};return je?Object.entries(t).forEach(([E,$])=>{const D=$.name||E;A($,D,E)}):e&&A(e,e.name||"Cluster",e.id),N.sort((E,$)=>{var re,J,ae,ce;let D=0;switch(ve){case"name":D=E.name.localeCompare($.name);break;case"vmid":D=E.vmid-$.vmid;break;case"type":D=E.type.localeCompare($.type);break;case"node":D=E.node.localeCompare($.node);break;case"status":D=E.status.localeCompare($.status);break;case"cpu":D=E.cpu.usage_percent-$.cpu.usage_percent;break;case"memory":D=E.memory.used_bytes/E.memory.total_bytes-$.memory.used_bytes/$.memory.total_bytes;break;case"uptime":D=E.uptime-$.uptime;break;case"rx":D=(((re=E.network)==null?void 0:re.rx_bytes_sec)||0)-(((J=$.network)==null?void 0:J.rx_bytes_sec)||0);break;case"tx":D=(((ae=E.network)==null?void 0:ae.tx_bytes_sec)||0)-(((ce=$.network)==null?void 0:ce.tx_bytes_sec)||0);break;case"task":{const xe=Gs(E.vmid,E.node,E.cluster_id,e,t),be=Gs($.vmid,$.node,$.cluster_id,e,t);xe&&!be?D=-1:!xe&&be?D=1:xe&&be?D=xe.task_type.localeCompare(be.task_type):D=0;break}}return Y==="asc"?D:-D}),N},[e,t,je,I,V,ve,Y]),kn=Math.round(se*9/16),Ct=N=>{ke(!0),setTimeout(()=>ke(!1),300),ve===N?ne(Y==="asc"?"desc":"asc"):(Oe(N),ne("asc"))},Ir=p.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const N of Object.values(t))if(N.vms[o])return N.vms[o]}return null},[o,e,t]),{totalVMs:Vn,runningVMs:Ce}=p.useMemo(()=>{let N=0,A=0;const E=$=>{Object.values($.vms).forEach(D=>{D.template||(N++,D.status==="running"&&A++)})};return je?t&&Object.values(t).forEach(E):e&&E(e),{totalVMs:N,runningVMs:A}},[e,t,je]);return!e&&!je?r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})}):r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[Ce," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[Vn," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:V,onChange:N=>Q(N.target.value)})]}),r.jsxs("div",{className:`filter-tabs ${me==="thumb"?"is-disabled":""}`,children:[r.jsxs("button",{className:`filter-tab ${I==="all"?"active":""}`,onClick:()=>U("all"),disabled:me==="thumb",title:me==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),n("matrix.filter_all")]}),r.jsxs("button",{className:`filter-tab ${I==="running"?"active":""}`,onClick:()=>U("running"),disabled:me==="thumb",title:me==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),n("matrix.filter_running")]}),r.jsxs("button",{className:`filter-tab ${I==="stopped"?"active":""}`,onClick:()=>U("stopped"),disabled:me==="thumb",title:me==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),n("matrix.filter_stopped")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),n("settings.sort_by"),":"]}),r.jsxs("button",{className:`sort-btn ${Fe==="vmid"?"active":""}`,onClick:()=>{kt("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),"ID"]}),r.jsxs("button",{className:`sort-btn ${Fe==="name"?"active":""}`,onClick:()=>{kt("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),n("settings.sort_name")]}),r.jsxs("button",{className:`sort-btn ${Fe==="load"?"active":""}`,onClick:()=>{kt("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),n("settings.sort_load")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),n("matrix.group_by"),":"]}),r.jsxs("button",{className:`sort-btn ${ue==="none"?"active":""}`,onClick:()=>{We("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),n("matrix.group_none")]}),r.jsxs("button",{className:`sort-btn ${ue==="node"?"active":""}`,onClick:()=>{We("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),n("matrix.group_node")]}),r.jsxs("button",{className:`sort-btn ${ue==="type"?"active":""}`,onClick:()=>{We("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),r.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),n("matrix.group_type")]}),r.jsxs("button",{className:`sort-btn ${ue==="tag"?"active":""}`,onClick:()=>{We("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),r.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),n("matrix.group_tag")]})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${me==="grid"?"active":""}`,onClick:()=>Z("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${me==="table"?"active":""}`,onClick:()=>Z("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),r.jsx("button",{className:`view-btn ${me==="thumb"?"active":""}`,onClick:()=>Z("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),r.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),r.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]})]})]}),me==="thumb"&&r.jsxs("div",{className:"thumb-size-row",children:[r.jsxs("div",{className:"thumb-size",children:[r.jsxs("span",{className:"thumb-size-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"15 3 21 3 21 9"}),r.jsx("polyline",{points:"9 21 3 21 3 15"}),r.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),r.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),a==="zh-TW"?"尺寸":"Size"]}),r.jsx("input",{type:"range",min:160,max:640,step:20,value:se,onChange:N=>F(parseInt(N.target.value,10)),className:"thumb-size-slider"}),r.jsxs("span",{className:"thumb-size-val",children:[se,"px"]}),r.jsx("span",{className:"thumb-build-stamp",title:"build 2026-05-08T18:15:37.033Z",children:(()=>{try{return`b${new Date("2026-05-08T18:15:37.033Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),r.jsxs("div",{className:"thumb-type-filter",role:"group",children:[r.jsxs("button",{className:`thumb-type-btn ${B==="all"?"active":""}`,onClick:()=>ie("all"),title:a==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a==="zh-TW"?"全部":"ALL"]}),r.jsxs("button",{className:`thumb-type-btn ${B==="qemu"?"active":""}`,onClick:()=>ie("qemu"),title:a==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),r.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),"VM"]}),r.jsxs("button",{className:`thumb-type-btn ${B==="lxc"?"active":""}`,onClick:()=>ie("lxc"),title:a==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),r.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),r.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),"CT"]})]}),r.jsxs("button",{className:`thumb-prefer-btn ${he?"active":""}`,onClick:()=>pe(N=>!N),title:a==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),a==="zh-TW"?"優先有內容":"Prefer content"]})]}),r.jsxs("div",{className:"matrix-content",children:[me==="grid"?r.jsxs("div",{className:"matrix-grid",ref:Qr,children:[It.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),It.map((N,A)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})})]},`line-${N.vmid}-${A}`))]}),X.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),X.map((N,A)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-N.progress)+1,filter:"url(#completingGlow)",opacity:1-N.progress*.5}),N.progress>.8&&r.jsx("circle",{cx:N.x2,cy:N.y2,r:20*(N.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(N.progress-.8)*5})]},`completing-${N.vmid}-${A}`))]}),(()=>{const N=new Map;Object.entries(st).forEach(([$,D])=>{N.set($,D)}),Lt.forEach($=>{N.has($.targetGroupKey)||N.set($.targetGroupKey,{vms:[],clusterId:$.clusterId})});const A=Array.from(N.entries()).sort(($,D)=>{const[re]=$,[J]=D,ae=Ge=>{if(Ge.includes(" / ")){const[De,Qe]=Ge.split(" / ");return{cluster:De,node:Qe}}return{cluster:"",node:Ge}},ce=ae(re),xe=ae(J);let be=0;return Ye==="cluster"?(be=ce.cluster.localeCompare(xe.cluster),be===0&&(be=ce.node.localeCompare(xe.node))):(be=ce.node.localeCompare(xe.node),be===0&&(be=ce.cluster.localeCompare(xe.cluster))),at==="desc"?-be:be});let E=0;return A.map(([$,D])=>{const re=Lt.filter(J=>J.targetGroupKey===$);return r.jsxs("div",{className:`node-section ${D.vms.length===0&&re.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:$}),r.jsxs("span",{className:"node-section-count",children:[D.vms.length,re.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",re.length]})]})]}),r.jsxs("div",{className:`vm-grid ${Fe==="load"&&!Tr?"sort-by-load":""} ${Tr?"initial-load":""}`,children:[ht&&D.vms.map(J=>{const ae=`${J.cluster_id}/${J.node}/${J.vmid}`,ce=Gs(J.vmid,J.node,J.cluster_id,e,t),xe=`${J.cluster_id}:${J.vmid}`,be=Xe.get(xe);if(be&&be.sourceNode===J.node||Lt.find(Qe=>Qe.targetClusterId===J.cluster_id&&Qe.vm.vmid===J.vmid))return null;const De=E++;return r.jsx(kp,{ref:Qe=>{Qe?Jt.current.set(ae,Qe):Jt.current.delete(ae)},vm:J,isSelected:o===ae,onClick:()=>i(o===ae?null:ae),onContextMenu:Qe=>Pr(Qe,J,D.clusterId),animationDelay:Tr?De*50:0,task:ce,isCompleting:!!be},ae)}).filter(Boolean),ht&&re.map(J=>{var xe;const ae=`ghost-${J.vm.cluster_id}-${J.vm.vmid}`,ce=(xe=Ae.find(be=>be.vm.vmid===J.vm.vmid&&be.clusterId===J.vm.cluster_id))==null?void 0:xe.task;return r.jsx(kp,{ref:be=>{be?Jt.current.set(ae,be):Jt.current.delete(ae)},vm:J.vm,isSelected:!1,onClick:()=>{},onContextMenu:be=>be.preventDefault(),animationDelay:0,task:ce,isGhost:!0},ae)})]},`grid-${I}-${V}-${Fe}-${Bn}`)]},$)})})(),Object.keys(st).length===0&&Lt.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):me==="thumb"?r.jsxs("div",{ref:ge,className:"matrix-thumb-grid",children:[r.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:r.jsx("defs",{children:r.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[r.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:r.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),r.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),ot.length===0?r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})}):Rr.map(([N,A])=>{const E=he?[...A].sort(($,D)=>{var xe,be;const re=`${$.clusterId||(e==null?void 0:e.id)||""}/${$.node}/${$.vmid}`,J=`${D.clusterId||(e==null?void 0:e.id)||""}/${D.node}/${D.vmid}`,ae=(xe=we[re])!=null&&xe.isBlank?1:0,ce=(be=we[J])!=null&&be.isBlank?1:0;return ae-ce}):A;return r.jsxs("div",{className:"thumb-group",children:[ue!=="none"&&r.jsxs("div",{className:"thumb-group-header",children:[r.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-name",children:N}),r.jsx("span",{className:"thumb-group-count",children:E.length}),r.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),r.jsx("div",{className:"thumb-group-cards",children:E.map($=>{var Ge;const D=$.type==="lxc",re=$.status==="running",J=((Ge=$.cpu)==null?void 0:Ge.usage_percent)??0,ae=$.memory&&$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,ce=$.clusterId||(e==null?void 0:e.id)||"",xe=`${ce}/${$.node}/${$.vmid}`,be=we[xe];return r.jsxs("div",{"data-card-key":xe,className:`vm-thumb-card status-${$.status}${be!=null&&be.isBlank?" is-blank":""}`,style:{width:`${se}px`,flex:"0 0 auto"},onClick:()=>H({vm:$,clusterId:ce}),onContextMenu:De=>Pr(De,$,ce),children:[r.jsxs("div",{className:"vm-thumb-image",style:{height:`${kn}px`},children:[r.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[r.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),r.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),r.jsx("div",{className:"vtl-scanlines"}),r.jsx("div",{className:"vtl-vignette"}),r.jsx("span",{className:"vtl-text",children:a==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),be&&r.jsx("img",{src:be.url,alt:`VM ${$.vmid} screenshot`,loading:"lazy",onLoad:De=>{De.currentTarget.parentElement.dataset.loaded="1"},onError:De=>{De.currentTarget.parentElement.dataset.error="1"}})]}),r.jsxs("div",{className:"vm-thumb-meta",children:[r.jsxs("div",{className:"vm-thumb-title",children:[r.jsx("span",{className:`type-badge ${$.type}`,children:D?"CT":"VM"}),r.jsxs("code",{className:"vm-thumb-id",children:["#",$.vmid]}),r.jsx("span",{className:"vm-thumb-name",children:$.name})]}),re&&r.jsxs("div",{className:"vm-thumb-bars",children:[r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Se(J)}`,style:{width:`${Math.min(J,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${Se(J)}`,children:lt(J,1)})]}),r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Se(ae)}`,style:{width:`${Math.min(ae,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${Se(ae)}`,children:lt(ae,0)})]})]})]})]},xe)})})]},N)})]}):r.jsxs("div",{className:"matrix-table-container",children:[K.size>0&&r.jsxs("div",{className:"bulk-toolbar",children:[r.jsx("span",{className:"bulk-count",children:a==="zh-TW"?`已選 ${K.size}`:`${K.size} selected`}),r.jsxs("button",{className:"bulk-btn",disabled:Ne,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${K.size} 台 VM/CT 執行開機？`:`Start ${K.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次開機":"Bulk start"})&&await de("start")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:n("vm.start")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Ne,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${K.size} 台 VM/CT 執行關機（ACPI）？`:`Shutdown (ACPI) ${K.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次關機":"Bulk shutdown",destructive:!0})&&await de("shutdown")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:n("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Ne,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${K.size} 台 VM/CT 重新啟動？`:`Reboot ${K.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次重啟":"Bulk reboot",destructive:!0})&&await de("reboot")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:n("vm.reboot")})]}),r.jsxs("button",{className:"bulk-btn danger",disabled:Ne,onClick:async()=>{await s.confirm(a==="zh-TW"?`強制停止 ${K.size} 台 VM/CT？此動作不會通知 guest OS。`:`Hard-stop ${K.size} selected VM/CTs? Guest OS will not be notified.`,{title:a==="zh-TW"?"批次強制停止":"Bulk hard stop",destructive:!0})&&await de("stop")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:n("vm.stop_hard")})]}),r.jsx("button",{className:"bulk-btn ghost",onClick:G,disabled:Ne,children:a==="zh-TW"?"取消選取":"Clear"})]}),r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:"select-col",children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:K.size>0&&At.every(N=>K.has(`${N.cluster_id}/${N.node}/${N.vmid}`)),ref:N=>{if(!N)return;const A=At.some($=>K.has(`${$.cluster_id}/${$.node}/${$.vmid}`)),E=At.length>0&&At.every($=>K.has(`${$.cluster_id}/${$.node}/${$.vmid}`));N.indeterminate=A&&!E},onChange:N=>{N.target.checked?C(new Set(At.map(A=>`${A.cluster_id}/${A.node}/${A.vmid}`))):G()},title:n("matrix.bulk.select_all")})}),r.jsxs("th",{className:`sortable ${ve==="status"?"sorted":""}`,onClick:()=>Ct("status"),children:[r.jsx("span",{children:n("node.status")}),ve==="status"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="vmid"?"sorted":""}`,onClick:()=>Ct("vmid"),children:[r.jsx("span",{children:"VMID"}),ve==="vmid"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="type"?"sorted":""}`,onClick:()=>Ct("type"),children:[r.jsx("span",{children:n("table.type")}),ve==="type"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="name"?"sorted":""}`,onClick:()=>Ct("name"),children:[r.jsx("span",{children:n("table.name")}),ve==="name"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${ve==="node"?"sorted":""}`,onClick:()=>Ct("node"),children:[r.jsx("span",{children:n("table.node")}),ve==="node"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="cpu"?"sorted":""}`,onClick:()=>Ct("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),ve==="cpu"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="memory"?"sorted":""}`,onClick:()=>Ct("memory"),children:[r.jsx("span",{children:n("metric.memory")}),ve==="memory"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${ve==="rx"?"sorted":""}`,onClick:()=>Ct("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),ve==="rx"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${ve==="tx"?"sorted":""}`,onClick:()=>Ct("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),ve==="tx"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${ve==="uptime"?"sorted":""}`,onClick:()=>Ct("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),ve==="uptime"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${ve==="task"?"sorted":""}`,onClick:()=>Ct("task"),children:[r.jsx("span",{children:n("table.task")}),ve==="task"&&r.jsx("span",{className:"sort-indicator",children:Y==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:At.map(N=>{const A=`${N.cluster_id}/${N.node}/${N.vmid}`,E=N.status==="running",$=N.cpu.usage_percent,D=N.memory.used_bytes/N.memory.total_bytes*100,re=Gs(N.vmid,N.node,N.cluster_id,e,t),J=K.has(A);return r.jsxs("tr",{className:`${o===A?"selected":""} ${J?"multi-selected":""} ${N.status} ${le?"sort-animating":""}`,onClick:()=>i(o===A?null:A),onContextMenu:ae=>Pr(ae,N,N.clusterId),children:[r.jsx("td",{className:"select-col",onClick:ae=>ae.stopPropagation(),children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:J,onChange:()=>Ke(A)})}),r.jsx("td",{children:r.jsx("span",{className:`status-badge ${Vl(N.status)}`,children:N.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:N.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${N.type}`,children:N.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:N.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const ae=(N.tags||[]).map(ce=>(ce||"").trim()).filter(Boolean);return ae.length>0?r.jsx("div",{className:"vm-tags",children:ae.map((ce,xe)=>r.jsx("span",{className:"vm-tag",children:ce},xe))}):null})()}),r.jsx("td",{className:"node-cell",children:N.node}),r.jsx("td",{children:E?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Se($)}`,style:{width:`${$}%`}})}),r.jsx("span",{className:`text-${Se($)}`,children:lt($,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:E?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Se(D)}`,style:{width:`${D}%`}})}),r.jsx("span",{children:lt(D,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:E?r.jsxs("span",{className:"net-rx",children:[Pe(N.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:E?r.jsxs("span",{className:"net-tx",children:[Pe(N.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:E?r.jsx("span",{className:"uptime-cell",children:ci(N.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:re&&r.jsx(Bg,{task:re})})]},A)})})]}),At.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),Ir&&r.jsx(ax,{vm:Ir,onClose:()=>i(null)},`${Ir.node}/${Ir.vmid}`)]}),S&&r.jsx("div",{className:"thumb-preview-overlay",onClick:()=>H(null),children:r.jsxs("div",{className:"thumb-preview-frame",onClick:N=>N.stopPropagation(),children:[r.jsxs("div",{className:"thumb-preview-titlebar",children:[r.jsxs("span",{className:"thumb-preview-name",children:[r.jsx("span",{className:`type-badge ${S.vm.type}`,children:S.vm.type==="lxc"?"CT":"VM"}),r.jsxs("code",{className:"thumb-preview-id",children:["#",S.vm.vmid]}),r.jsx("span",{children:S.vm.name}),r.jsx("span",{className:"thumb-preview-node",children:S.vm.node})]}),r.jsx("button",{className:"thumb-preview-close",onClick:()=>H(null),children:"×"})]}),r.jsxs("div",{className:"thumb-preview-body",children:[r.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[r.jsx("div",{className:"tpl-grid"}),r.jsx("div",{className:"tpl-scan"}),r.jsx("div",{className:"tpl-ring"}),r.jsx("div",{className:"tpl-corner tl"}),r.jsx("div",{className:"tpl-corner tr"}),r.jsx("div",{className:"tpl-corner bl"}),r.jsx("div",{className:"tpl-corner br"}),r.jsxs("div",{className:"tpl-status",children:[r.jsxs("span",{className:"tpl-dots",children:[r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{})]}),r.jsx("span",{className:"tpl-text",children:a==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),r.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(S.clusterId)}/${encodeURIComponent(S.vm.node)}/${S.vm.vmid}?max=1600&t=${oe}`,alt:`VM ${S.vm.vmid} full screenshot`,onLoad:N=>{N.currentTarget.parentElement.dataset.loaded="1"},onError:N=>{N.currentTarget.parentElement.dataset.error="1"}})]})]})}),r.jsx(ff,{state:Te,onClose:ze,onShowDetails:()=>{Te.vm&&i(`${Te.vm.node}/${Te.vm.vmid}`)},onPowerAction:W,onOpenConsole:async()=>{if(!Te.vm)return;const N=Te.vm,A=Te.clusterId;if(k==="disabled"){await s.alert(n("console.disabled"));return}if(k==="prompt"){O({vm:N,clusterId:A});return}try{const E=await Be.consolePrepare({cluster_id:A,node:N.node,vmid:N.vmid});P(A,N,E.console_token,E.vnc_password)}catch(E){const $=E instanceof Error?E.message:String(E);await s.alert(n("console.prepare_failed",{err:$}))}},onRemoteMigrate:()=>{Te.vm&&g({vm:Te.vm,clusterId:Te.clusterId})},onOpenSnapshots:()=>{Te.vm&&x({vm:Te.vm,clusterId:Te.clusterId})},onBackupNow:()=>{Te.vm&&j({vm:Te.vm,clusterId:Te.clusterId})},onShowPerf:()=>{Te.vm&&m({vm:Te.vm,clusterId:Te.clusterId})},onShowBackupHistory:()=>{Te.vm&&v({vm:Te.vm,clusterId:Te.clusterId})},getNodeHealth:wn,userRole:((jn=c.user)==null?void 0:jn.role_global)??null,consoleMode:k,consolePasswordSet:!!_[Te.clusterId]}),r.jsx(Ug,{open:l!==null,title:l?Vi(l.action,n):"",destructive:l?nx(l.action):!1,details:l?r.jsxs(r.Fragment,{children:[n(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:Vi(l.action,n),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?Vi(l.action,n):n("action.cancel"),onConfirm:q,onCancel:()=>d(null)}),r.jsx(hf,{open:h!==null,cluster_id:(h==null?void 0:h.clusterId)||"",vm:h?{vmid:h.vm.vmid,name:h.vm.name,node:h.vm.node,type:h.vm.type}:null,onClose:()=>g(null)}),r.jsx(gf,{open:u!==null,cluster_id:(u==null?void 0:u.clusterId)||"",vm:u?{vmid:u.vm.vmid,name:u.vm.name,node:u.vm.node,type:u.vm.type}:null,onClose:()=>x(null)}),r.jsx(xf,{open:b!==null,cluster_id:(b==null?void 0:b.clusterId)||"",vm:b?{vmid:b.vm.vmid,name:b.vm.name,node:b.vm.node,type:b.vm.type}:null,onClose:()=>j(null)}),r.jsx(mf,{open:y!==null,clusterId:(y==null?void 0:y.clusterId)||"",node:(y==null?void 0:y.vm.node)||"",vmid:y==null?void 0:y.vm.vmid,kind:(y==null?void 0:y.vm.type)==="lxc"?"lxc":"qemu",title:y?`${y.vm.type==="lxc"?"CT":"VM"} ${y.vm.vmid} — ${y.vm.name}`:"",onClose:()=>m(null)}),r.jsx(ex,{open:f!==null,clusterId:(f==null?void 0:f.clusterId)||"",vmid:(f==null?void 0:f.vm.vmid)||0,vmName:(f==null?void 0:f.vm.name)||"",onClose:()=>v(null)}),r.jsx(vf,{open:z!==null,cluster_id:(z==null?void 0:z.clusterId)||"",pveUser:(()=>{const N=z==null?void 0:z.clusterId;if(!N)return"root@pam";const A=t&&t[N]||((e==null?void 0:e.id)===N?e:null);return"root@pam"})(),onCancel:()=>O(null),onSubmit:async N=>{if(!z)return;const{vm:A,clusterId:E}=z,$=await Be.consolePrepare({cluster_id:E,node:A.node,vmid:A.vmid,password:N});P(E,A,$.console_token,$.vnc_password),O(null)}}),T.length>0&&r.jsx("div",{className:"mig-fail-stack",children:T.map(N=>{const A=`qm unlock ${N.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:N.vmid,target:N.targetNode||"?",lock:N.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:N.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:A}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var E;(E=navigator.clipboard)==null||E.writeText(A).then(()=>{R($=>$.map(D=>D.id===N.id?{...D,copied:!0}:D))})},children:N.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>R(E=>E.filter($=>$.id!==N.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},N.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),me==="thumb"&&r.jsxs("span",{className:"legend-thumb-refresh",title:a==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),a==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),r.jsx("style",{children:`
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
          grid-template-columns: repeat(auto-fill, minmax(${Me}px, 1fr));
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
      `})]})}function Ks(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function bf(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function ox({vm:e,index:t,previousIndex:n,onClick:a,onContextMenu:s,isSelected:o,task:i}){var v;const c=e.memory.used_bytes/e.memory.total_bytes*100,l=((v=e.disk)==null?void 0:v.usage_percent)||0,d=Se(e.cpu.usage_percent),h=Se(c),g=Se(l),u=p.useRef(null),[x,b]=p.useState(n===void 0),j=bf(i||null);p.useEffect(()=>{if(x){const k=setTimeout(()=>b(!1),50);return()=>clearTimeout(k)}},[x]);const y=e.name.length>10?e.name.substring(0,9)+"…":e.name,f=Math.max(e.cpu.usage_percent,c,l)>95?"critical":"warning";return r.jsxs("div",{ref:u,className:`anomaly-item ${f} ${x?"entering":""} ${o?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${lt(e.cpu.usage_percent,1)}
MEM: ${lt(c,1)}
DISK: ${lt(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:a,onContextMenu:k=>s==null?void 0:s(k,e),children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${d}`}),r.jsx("span",{className:"anomaly-name",children:y}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),j&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${j.color}30`,borderColor:j.color,color:j.color},children:j.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${h}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(c)})]}),r.jsxs("div",{className:`metric-gauge ${g}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Kc(e){return e?{vmid:e.vm.vmid,name:e.vm.name,node:e.vm.node,type:e.vm.type}:null}function ix({sel:e,onClose:t}){const n=p.useMemo(()=>Kc(e),[e]);return r.jsx(gf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function lx({sel:e,onClose:t}){const n=p.useMemo(()=>Kc(e),[e]);return r.jsx(xf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function cx({sel:e,onClose:t}){const n=p.useMemo(()=>Kc(e),[e]);return r.jsx(hf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function dx({cluster:e,clusters:t,isPaused:n=!1}){var se;const{t:a}=$e(),s=p.useRef(null),o=p.useRef(null),[i,c]=p.useState(0),[l,d]=p.useState(null),[h,g]=p.useState(new Map),[u,x]=p.useState(new Map),[b,j]=p.useState("grid"),[y,m]=p.useState(0);p.useEffect(()=>{const F=setTimeout(()=>j("line"),600),S=setTimeout(()=>j("flip"),1100),H=setTimeout(()=>j("done"),3300);return()=>{clearTimeout(F),clearTimeout(S),clearTimeout(H)}},[]),p.useEffect(()=>{if(b==="grid"){m(0);return}const F=b==="line"?1500:1200;let S,H=null;const oe=y,ye=B=>{H===null&&(H=B);const ie=B-H,he=Math.min(ie/F,1),pe=1-Math.pow(1-he,3),we=oe+(1-oe)*pe;m(we),he<1&&(S=requestAnimationFrame(ye))};return S=requestAnimationFrame(ye),()=>cancelAnimationFrame(S)},[b]);const f=!e&&t&&Object.keys(t).length>0,v=p.useMemo(()=>{if(!e&&!f)return[];const F=[];return f?Object.values(t).forEach(S=>{Object.values(S.vms).forEach(H=>{H.status==="running"&&!H.template&&F.push(H)})}):e&&Object.values(e.vms).forEach(S=>{S.status==="running"&&!S.template&&F.push(S)}),F},[e,t,f]),k=p.useMemo(()=>v.map((F,S)=>{var Ie;const H=S/v.length*Math.PI*2,oe=F.cpu.usage_percent,ye=F.memory.total_bytes>0?F.memory.used_bytes/F.memory.total_bytes*100:0,B=((Ie=F.disk)==null?void 0:Ie.usage_percent)||0,ie=Math.max(oe,ye,B),he=.2+ie/100*.6,pe=Se(ie),we=Ks(F.vmid,F.node,F.cluster_id,e,t);return{vm:F,angle:H,distance:he,color:pe,task:we}}),[v,e,t]),w=p.useMemo(()=>{if(!e&&!f)return[];const F=[];return f?Object.values(t).forEach(H=>{Object.values(H.vms).forEach(oe=>F.push(oe))}):e&&Object.values(e.vms).forEach(H=>F.push(H)),F.filter(H=>{if(H.status!=="running"||H.template)return!1;const oe=H.memory.used_bytes/H.memory.total_bytes*100,ye=H.disk.total_bytes>0?H.disk.used_bytes/H.disk.total_bytes*100:0;return H.cpu.usage_percent>80||oe>85||ye>85}).sort((H,oe)=>{const ye=H.memory.used_bytes/H.memory.total_bytes*100,B=oe.memory.used_bytes/oe.memory.total_bytes*100,ie=H.disk.total_bytes>0?H.disk.used_bytes/H.disk.total_bytes*100:0,he=oe.disk.total_bytes>0?oe.disk.used_bytes/oe.disk.total_bytes*100:0,pe=Math.max(H.cpu.usage_percent,ye,ie);return Math.max(oe.cpu.usage_percent,B,he)-pe})},[e,t,f]);p.useEffect(()=>{const F=new Map;w.forEach((S,H)=>{F.set(`${S.cluster_id}/${S.node}/${S.vmid}`,H)}),g(F)},[w]);const _=p.useCallback(F=>{const S=s.current;if(!S)return;const H=S.getBoundingClientRect(),oe=S.width/H.width,ye=S.height/H.height,B=(F.clientX-H.left)*oe,ie=(F.clientY-H.top)*ye,he=Math.min(S.width,S.height),pe=S.width/2,we=S.height/2,Ie=he*.4;let tt=null;for(const Ve of k){const He=pe+Math.cos(Ve.angle)*Ie*Ve.distance,ge=we+Math.sin(Ve.angle)*Ie*Ve.distance,ve=Math.sqrt((B-He)**2+(ie-ge)**2),Oe=15*Math.max(oe,ye);if(ve<Oe){tt={vm:Ve.vm,x:F.clientX,y:F.clientY,pointX:He,pointY:ge};break}}d(tt)},[k]),M=p.useCallback(()=>{d(null)},[]),z=p.useCallback(F=>{const S=s.current;if(!S)return;const H=k.find(we=>we.vm.node===F.node&&we.vm.vmid===F.vmid);if(!H)return;const oe=Math.min(S.width,S.height),ye=S.width/2,B=S.height/2,ie=oe*.4,he=ye+Math.cos(H.angle)*ie*H.distance,pe=B+Math.sin(H.angle)*ie*H.distance;d({vm:H.vm,x:he,y:pe,pointX:he,pointY:pe})},[k]),O=Kr(),T=((se=_s().user)==null?void 0:se.role_global)??null,[R,te]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),W=p.useCallback(()=>te(F=>({...F,visible:!1})),[]),L=p.useCallback((F,S)=>{F.preventDefault(),F.stopPropagation();const H=S.cluster_id||(e==null?void 0:e.id)||"";te({visible:!0,x:F.clientX,y:F.clientY,vm:S,clusterId:H})},[e]),q=p.useCallback((F,S)=>{var oe;const H=(t==null?void 0:t[F])||((e==null?void 0:e.id)===F?e:null);return((oe=H==null?void 0:H.client_health)==null?void 0:oe[S])||null},[e,t]),I=p.useCallback(async F=>{const{vm:S,action:H,clusterId:oe}=F,ye=S.type==="lxc";if(!((H==="stop"||H==="shutdown"||H==="reboot")&&!await O.confirm(`${H.toUpperCase()} ${S.name} (#${S.vmid})?`,{title:"Confirm",destructive:!0})))try{const ie=ye?await Be.ctAction(oe,S.node,S.vmid,H):await Be.vmAction(oe,S.node,S.vmid,H);console.info(`[radar] ${H} ${ye?"ct":"vm"}/${S.vmid} → upid=${ie.upid}`)}catch(ie){const he=ie instanceof Error?ie.message:String(ie);he.includes("vm_control_disabled")?await O.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await O.alert(`${H} failed: ${he.slice(0,200)}`)}},[O]),[U,V]=p.useState(null),[Q,K]=p.useState(null),[C,Ne]=p.useState(null),[_e,Ke]=p.useState(null),[G,de]=p.useState("disabled");p.useEffect(()=>{Be.getConfig().then(F=>{var S;return de(((S=F.console)==null?void 0:S.mode)||"disabled")}).catch(()=>de("disabled"))},[]);const me=p.useCallback((F,S,H,oe)=>{const ye=typeof localStorage<"u"&&localStorage.getItem("language")||"",B=S.type==="lxc",he=`${B?"/console-term":"/console"}/${encodeURIComponent(F)}/${encodeURIComponent(S.node)}/${S.vmid}?ct=${encodeURIComponent(H)}`+(S.name?`&name=${encodeURIComponent(S.name)}`:"")+(ye?`&lang=${encodeURIComponent(ye)}`:"")+(!B&&oe?`#vp=${encodeURIComponent(oe)}`:"");window.open(he,"_blank","noopener,noreferrer")},[]),Z=p.useCallback(async()=>{if(!R.vm)return;const F=R.vm,S=R.clusterId;if(G==="disabled"){await O.alert(a("console.disabled"));return}if(G==="prompt"){Ke({vm:F,clusterId:S});return}try{const H=await Be.consolePrepare({cluster_id:S,node:F.node,vmid:F.vmid});me(S,F,H.console_token,H.vnc_password)}catch(H){const oe=H instanceof Error?H.message:String(H);await O.alert(a("console.prepare_failed",{err:oe}))}},[R,G,O,a,me]);return p.useEffect(()=>{if(n||b!=="done")return;const F=setInterval(()=>{c(S=>(S+2)%360)},50);return()=>clearInterval(F)},[n,b]),p.useEffect(()=>{const F=s.current;if(!F)return;const S=F.getContext("2d");if(!S)return;const H=Math.min(F.width,F.height),oe=F.width/2,ye=F.height/2,B=H*.4;S.clearRect(0,0,F.width,F.height),S.strokeStyle="rgba(0, 240, 255, 0.12)",S.lineWidth=.8;const ie=20;for(let ge=oe%ie;ge<F.width;ge+=ie)S.beginPath(),S.moveTo(ge,0),S.lineTo(ge,F.height),S.stroke();for(let ge=ye%ie;ge<F.height;ge+=ie)S.beginPath(),S.moveTo(0,ge),S.lineTo(F.width,ge),S.stroke();if(b!=="flip"&&b!=="done")return;S.globalAlpha=y,S.strokeStyle="rgba(0, 240, 255, 0.25)",S.lineWidth=1.5,S.font='13px "Share Tech Mono", monospace',S.fillStyle="rgba(0, 240, 255, 0.6)",S.textAlign="left";const he=["25%","50%","75%","100%"];for(let ge=1;ge<=4;ge++){const ve=B*(ge/4);S.beginPath(),S.arc(oe,ye,ve,0,Math.PI*2),S.stroke();const Oe=oe+ve+4,Y=ye+4;S.fillText(he[ge-1],Oe,Y)}S.fillStyle="rgba(0, 255, 136, 0.8)",S.textAlign="center",S.font='14px "Share Tech Mono", monospace',S.fillText("0%",oe,ye-8),S.font='11px "Share Tech Mono", monospace',S.fillText("LOW",oe,ye+8),S.fillStyle="rgba(0, 240, 255, 0.5)",S.textAlign="left",S.font='10px "Share Tech Mono", monospace',S.beginPath(),S.moveTo(oe-B,ye),S.lineTo(oe+B,ye),S.moveTo(oe,ye-B),S.lineTo(oe,ye+B),S.stroke();const pe=i*Math.PI/180;for(let ge=0;ge<8;ge++){const ve=.12*(ge+1),Oe=.15-ge*.015;S.fillStyle=`rgba(0, 240, 255, ${Oe})`,S.beginPath(),S.moveTo(oe,ye),S.arc(oe,ye,B,pe-ve,pe-ve+.12),S.closePath(),S.fill()}S.save(),S.shadowBlur=20,S.shadowColor="#00f0ff";const we=S.createLinearGradient(oe,ye,oe+Math.cos(pe)*B,ye+Math.sin(pe)*B);we.addColorStop(0,"rgba(0, 255, 200, 1)"),we.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),we.addColorStop(1,"rgba(0, 240, 255, 0)"),S.strokeStyle=we,S.lineWidth=3,S.beginPath(),S.moveTo(oe,ye),S.lineTo(oe+Math.cos(pe)*B,ye+Math.sin(pe)*B),S.stroke(),S.lineWidth=1.5,we.addColorStop(0,"rgba(255, 255, 255, 1)"),S.stroke(),S.restore();const Ie=oe+Math.cos(pe)*B*.95,tt=ye+Math.sin(pe)*B*.95,Ve=S.createRadialGradient(Ie,tt,0,Ie,tt,15);Ve.addColorStop(0,"rgba(0, 255, 200, 0.8)"),Ve.addColorStop(1,"rgba(0, 240, 255, 0)"),S.fillStyle=Ve,S.beginPath(),S.arc(Ie,tt,15,0,Math.PI*2),S.fill();const He=[];k.forEach(ge=>{const ve=`${ge.vm.cluster_id}/${ge.vm.node}/${ge.vm.vmid}`,Oe=(ge.angle*180/Math.PI+360)%360;(i-Oe+360)%360<=5&&He.push({key:ve,point:{vm:ge.vm,angle:ge.angle,distance:ge.distance,color:ge.color,lastScanAngle:i}})}),He.length>0&&x(ge=>{const ve=new Map(ge);He.forEach(({key:Y,point:ne})=>{ve.set(Y,ne)});const Oe=new Set(k.map(Y=>`${Y.vm.cluster_id}/${Y.vm.node}/${Y.vm.vmid}`));for(const Y of ve.keys())Oe.has(Y)||ve.delete(Y);return ve}),k.forEach(ge=>{var Fe,kt;const ve=oe+Math.cos(ge.angle)*B*ge.distance,Oe=ye+Math.sin(ge.angle)*B*ge.distance,Y=(ge.angle*180/Math.PI+360)%360,ne=(i-Y+360)%360;let le;ne<20?le=1:ne<60?le=1-(ne-20)/40*.4:le=.6-(ne-60)/300*.45;let ke="#00ff88";ge.color==="warning"&&(ke="#ff6b00"),ge.color==="danger"&&(ke="#ff0040");const Me=!!ge.task,Le=(kt=(Fe=ge.task)==null?void 0:Fe.task_type)==null?void 0:kt.includes("migrate");if(Me){const ue=Le?"#00f0ff":"#a855f7",We=Date.now()/500%1;if(S.beginPath(),S.arc(ve,Oe,12+We*8,0,Math.PI*2),S.strokeStyle=ue,S.lineWidth=1.5,S.globalAlpha=(1-We)*.6*y,S.stroke(),S.beginPath(),S.arc(ve,Oe,10,0,Math.PI*2),S.strokeStyle=ue,S.lineWidth=1,S.globalAlpha=.8*y,S.stroke(),Le){const Ye=Date.now()/200%(Math.PI*2);S.beginPath(),S.arc(ve,Oe,15,Ye,Ye+Math.PI/2),S.strokeStyle=ue,S.lineWidth=2,S.globalAlpha=.9*y,S.stroke();for(let Je=0;Je<3;Je++){const at=Ye+Je*Math.PI*2/3,sr=8+(Date.now()/100+Je*50)%100/100*10,Te=ve+Math.cos(at)*sr,Wt=Oe+Math.sin(at)*sr;S.beginPath(),S.arc(Te,Wt,1.5,0,Math.PI*2),S.fillStyle=ue,S.globalAlpha=(.8-(Date.now()/100+Je*50)%100/100*.6)*y,S.fill()}}S.globalAlpha=y}S.beginPath(),S.arc(ve,Oe,4+ge.vm.cpu.usage_percent/100*4,0,Math.PI*2),S.fillStyle=ke,S.globalAlpha=le*y,S.fill(),S.shadowBlur=10,S.shadowColor=ke,S.fill(),S.shadowBlur=0,S.globalAlpha=y}),S.beginPath(),S.arc(oe,ye,6,0,Math.PI*2),S.fillStyle="#00f0ff",S.fill()},[i,k,b,y]),p.useEffect(()=>{const F=s.current;if(!F)return;const S=()=>{const H=F.parentElement;H&&(F.width=H.clientWidth,F.height=H.clientHeight)};return S(),window.addEventListener("resize",S),()=>window.removeEventListener("resize",S)},[]),!e&&!f?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${b!=="done"?"entering":""} ${b==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(b==="line"||b==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${b}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:_,onMouseLeave:M,style:{position:"absolute",top:0,left:0,cursor:l?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:y},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),l&&(()=>{var Jr,wn,Pr;const F=s.current;if(!F)return null;const S=F.width,H=F.height,oe=F.getBoundingClientRect(),ye=oe.width,B=oe.height,ie=ye/S,he=B/H,pe=l.pointX*ie,we=l.pointY*he,Ie=ye,tt=B,Ve=180,ge=Ks(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t)?175:145,ve=Ve/2,Oe=ge/2,Y=50,ne=120,le=Ie/2,ke=tt/2,Me=pe-le,Le=we-ke,Fe=Math.sqrt(Me*Me+Le*Le)||1,kt=Me/Fe,ue=Le/Fe,We=(ze,je)=>{const Ae=ze-ve,gt=ze+ve,pt=je-Oe,Ut=je+Oe;if(pe>=Ae&&pe<=gt&&we>=pt&&we<=Ut)return-1;const st=Math.max(Ae,Math.min(gt,pe)),ot=Math.max(pt,Math.min(Ut,we));return Math.sqrt((pe-st)**2+(we-ot)**2)},Ye=20,Je=(ze,je)=>({x:Math.max(ve+Ye,Math.min(Ie-ve-Ye,ze)),y:Math.max(Oe+Ye,Math.min(tt-Oe-Ye,je))}),sr=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((ze,je)=>{const Ae=ze.dx*kt+ze.dy*ue;return je.dx*kt+je.dy*ue-Ae});let Te={x:pe+kt*ne,y:we+ue*ne},Wt=!1;for(const ze of sr){const je={x:pe+ze.dx*ne,y:we+ze.dy*ne},Ae=Je(je.x,je.y),gt=Ae.x-pe,pt=Ae.y-we,st=Math.sqrt(gt*gt+pt*pt)>30&&Math.abs(Math.abs(gt)-Math.abs(pt))<20,ot=We(Ae.x,Ae.y);if(st&&ot>=Y){Te=Ae,Wt=!0;break}}if(!Wt)for(const ze of sr){const je={x:pe+ze.dx*(ne+60),y:we+ze.dy*(ne+60)},Ae=Je(je.x,je.y),gt=Ae.x-pe,pt=Ae.y-we,st=Math.sqrt(gt*gt+pt*pt)>30&&Math.abs(Math.abs(gt)-Math.abs(pt))<20,ot=We(Ae.x,Ae.y);if(st&&ot>=Y){Te=Ae,Wt=!0;break}}if(!Wt){const ze=sr[0],je=ze.dx>0?(Ie-ve-10-pe)/ze.dx:(ve+10-pe)/ze.dx,Ae=ze.dy>0?(tt-Oe-10-we)/ze.dy:(Oe+10-we)/ze.dy,gt=Math.min(Math.abs(je),Math.abs(Ae),ne),pt=Math.max(Y+20,gt);Te={x:pe+ze.dx*pt,y:we+ze.dy*pt}}const It=20,jr=Math.max(ve+It,Math.min(Ie-ve-It,Te.x)),X=Math.max(Oe+It,Math.min(tt-Oe-It,Te.y)),Ze=pe,Xe=we,ct=20,yt=28,ht=5,vt=-Math.PI/2,Bn=jr-ve,Wn=X-Oe,Tr=jr,Xr=X,Jt=l.vm.memory.total_bytes>0?l.vm.memory.used_bytes/l.vm.memory.total_bytes*100:0,qr=((Jr=l.vm.disk)==null?void 0:Jr.usage_percent)||0,Qr=Math.max(l.vm.cpu.usage_percent,Jt,qr),ur=Se(Qr),dt={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[ur]||"#00f0ff";return Ie<=0||tt<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const ze=Math.sqrt((Tr-Ze)**2+(Xr-Xe)**2),je=Math.atan2(Xr-Xe,Tr-Ze)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Ze,top:Xe,width:ze,height:2,background:`linear-gradient(90deg, ${dt}, ${dt}80)`,transformOrigin:"0 50%",transform:`rotate(${je}deg)`,boxShadow:`0 0 8px ${dt}, 0 0 16px ${dt}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Ze-yt-5,top:Xe-yt-5,width:(yt+5)*2,height:(yt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const ze=yt+5,je=yt+5,Ae=[];for(let st=0;st<ht;st++){const ot=vt+st*2*Math.PI/ht;Ae.push(`${ze+ct*Math.cos(ot)},${je+ct*Math.sin(ot)}`)}const gt=Ae.join(" "),pt=[];for(let st=0;st<ht;st++){const ot=vt+st*2*Math.PI/ht;pt.push(`${ze+yt*Math.cos(ot)},${je+yt*Math.sin(ot)}`)}const Ut=pt.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:Ut,fill:"none",stroke:dt,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${ze}px ${je}px`}}),r.jsx("polygon",{points:gt,fill:"none",stroke:dt,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(st=>{const ot=vt+st*2*Math.PI/ht,Rr=ze+ct*Math.cos(ot),Lt=je+ct*Math.sin(ot),At=6,kn=vt+(st-1+ht)%ht*2*Math.PI/ht,Ct=vt+(st+1)%ht*2*Math.PI/ht,Ir=Rr+At*Math.cos(kn+Math.PI),Vn=Lt+At*Math.sin(kn+Math.PI),Ce=Rr+At*Math.cos(Ct+Math.PI),jn=Lt+At*Math.sin(Ct+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:Rr,y1:Lt,x2:Ir,y2:Vn,stroke:dt,strokeWidth:"2"}),r.jsx("line",{x1:Rr,y1:Lt,x2:Ce,y2:jn,stroke:dt,strokeWidth:"2"})]},st)}),r.jsx("line",{x1:ze-5,y1:je,x2:ze+5,y2:je,stroke:dt,strokeWidth:"1"}),r.jsx("line",{x1:ze,y1:je-5,x2:ze,y2:je+5,stroke:dt,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${ur}`,style:{position:"absolute",left:Bn,top:Wn,width:Ve,height:ge,borderColor:dt,boxShadow:`0 0 15px ${dt}40, 0 0 30px ${dt}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:dt}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:dt}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:dt}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:dt}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:l.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",l.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:l.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${Se(l.vm.cpu.usage_percent)}`,children:lt(l.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${Se(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100)}`,children:lt(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${Se(((wn=l.vm.disk)==null?void 0:wn.usage_percent)||0)}`,children:lt(((Pr=l.vm.disk)==null?void 0:Pr.usage_percent)||0,1)})]}),(()=>{const ze=Ks(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t),je=bf(ze);return je?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${je.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:je.color},children:je.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:y},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:w.length})]}),r.jsx("div",{className:"anomaly-list",children:w.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):w.map((F,S)=>{const H=`${F.cluster_id}/${F.node}/${F.vmid}`,oe=h.get(H),ye=(l==null?void 0:l.vm.node)===F.node&&(l==null?void 0:l.vm.vmid)===F.vmid&&(l==null?void 0:l.vm.cluster_id)===F.cluster_id,B=Ks(F.vmid,F.node,F.cluster_id,e,t);return r.jsx(ox,{vm:F,index:S,previousIndex:oe,onClick:()=>z(F),onContextMenu:L,isSelected:ye,task:B},H)})})]})]}),r.jsx(ff,{state:R,onClose:W,onShowDetails:()=>{R.vm&&z(R.vm)},onPowerAction:I,onOpenConsole:Z,onOpenSnapshots:()=>{R.vm&&V({vm:R.vm,clusterId:R.clusterId})},onBackupNow:()=>{R.vm&&K({vm:R.vm,clusterId:R.clusterId})},onRemoteMigrate:()=>{R.vm&&Ne({vm:R.vm,clusterId:R.clusterId})},getNodeHealth:q,userRole:T,consoleMode:G,consolePasswordSet:!1}),r.jsx(ix,{sel:U,onClose:()=>V(null)}),r.jsx(lx,{sel:Q,onClose:()=>K(null)}),r.jsx(cx,{sel:C,onClose:()=>Ne(null)}),r.jsx(vf,{open:_e!==null,cluster_id:(_e==null?void 0:_e.clusterId)||"",pveUser:"root@pam",onCancel:()=>Ke(null),onSubmit:async F=>{if(!_e)return;const{vm:S,clusterId:H}=_e,oe=await Be.consolePrepare({cluster_id:H,node:S.node,vmid:S.vmid,password:F});me(H,S,oe.console_token,oe.vnc_password),Ke(null)}}),r.jsx("style",{children:`
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

      `})]})}function px({value:e,duration:t=800,suffix:n=""}){const[a,s]=p.useState(0),o=p.useRef(0),i=p.useRef(0);return p.useEffect(()=>{o.current=a;const c=performance.now(),l=d=>{const h=d-c,g=Math.min(h/t,1),u=1-Math.pow(1-g,3);s(o.current+(e-o.current)*u),g<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function Oo({value:e,duration:t=800}){const[n,a]=p.useState(0),s=p.useRef(0),o=p.useRef(0);return p.useEffect(()=>{s.current=n;const i=performance.now(),c=l=>{const d=l-i,h=Math.min(d/t,1),g=1-Math.pow(1-h,3);a(s.current+(e-s.current)*g),h<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Pe(n)})}function ux({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(px,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function mx({mons:e,mgrs:t,mds:n}){const{t:a}=$e();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function fx({osds:e,onSelect:t}){const{t:n}=$e(),a=p.useMemo(()=>{const o={};return e.forEach(i=>{const c=i.host||"unknown";o[c]||(o[c]=[]),o[c].push(i)}),Object.entries(o).sort(([i],[c])=>i.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,c])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:c.sort((l,d)=>l.id-d.id).map(l=>{const d=l.total_bytes>0?l.used_bytes/l.total_bytes*100:0,h=l.status!=="up"||Se(d)==="danger"?"#ff0040":Se(d)==="warning"?"#ff6b00":"#00ff88",g=o*30;return o++,r.jsx("div",{className:`osd-hex ${l.status==="up"?"up":"down"}`,style:{"--osd-color":h,animationDelay:`${g}ms`},onClick:()=>t(l),title:`OSD.${l.id} - ${lt(d,0)}`,children:r.jsx("span",{className:"osd-id",children:l.id})},l.id)})})]},i))})()})]})}function hx({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=p.useRef(null),i=p.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),c=p.useRef(0),l=p.useRef(0),d=100,h=g=>g===0?"0":g>=1073741824?`${(g/1073741824).toFixed(1)}G`:g>=1048576?`${(g/1048576).toFixed(1)}M`:g>=1024?`${(g/1024).toFixed(0)}K`:`${g.toFixed(0)}`;return p.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),p.useEffect(()=>{const g=o.current;if(!g)return;const u=g.getContext("2d");if(!u)return;const x=window.devicePixelRatio||1,b=()=>{const M=g.getBoundingClientRect();return g.width=M.width*x,g.height=M.height*x,u.setTransform(x,0,0,x,0,0),{width:M.width,height:M.height}};let{width:j,height:y}=b();const m=42,f=j-m;let v=0;const k=50;let w=0;const _=M=>{const z=M-v;v=M,w+=z;const O=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*O,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*O,w>=k&&(w=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),l.current=(l.current+.5)%20,u.clearRect(0,0,j,y);const P=Math.max(...i.current.read,...i.current.write,1),T=8,R=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let W=0;W<=R;W++){const L=T+W/R*(y-T*2),q=P*(1-W/R);u.fillText(h(q),m-4,L)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let W=0;W<=R;W++){const L=T+W/R*(y-T*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-l.current,u.moveTo(m,L),u.lineTo(j,L),u.stroke()}u.setLineDash([]);const te=(W,L,q)=>{if(W.length<2)return;const I=W.map((V,Q)=>({x:m+Q/(d-1)*f,y:y-T-V/P*(y-T*2)}));u.strokeStyle=q,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(I[0].x,I[0].y);for(let V=1;V<I.length-1;V++){const Q=(I[V].x+I[V+1].x)/2,K=(I[V].y+I[V+1].y)/2;u.quadraticCurveTo(I[V].x,I[V].y,Q,K)}u.lineTo(I[I.length-1].x,I[I.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=L,u.lineWidth=2,u.shadowColor=L,u.shadowBlur=8,u.beginPath(),u.moveTo(I[0].x,I[0].y);for(let V=1;V<I.length-1;V++){const Q=(I[V].x+I[V+1].x)/2,K=(I[V].y+I[V+1].y)/2;u.quadraticCurveTo(I[V].x,I[V].y,Q,K)}u.lineTo(I[I.length-1].x,I[I.length-1].y),u.stroke(),u.shadowBlur=0;const U=3;for(let V=0;V<U;V++){const Q=(l.current/20+V/U)%1,K=Math.floor(Q*(I.length-1));K<I.length&&(u.fillStyle=L,u.globalAlpha=.8,u.beginPath(),u.arc(I[K].x,I[K].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};te(i.current.write,"#ff6b00","#ff6b00"),te(i.current.read,"#00ff88","#00ff88"),s||(c.current=requestAnimationFrame(_))};return c.current=requestAnimationFrame(_),()=>cancelAnimationFrame(c.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Pe(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Pe(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function jp({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Pe(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function gx({osd:e,onClose:t}){const{t:n}=$e(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=Se(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Pe(e.used_bytes)," / ",Pe(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:lt(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function xx({ceph:e}){const{t}=$e(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Pe(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Pe(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",lt(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",lt(a,1)]})]})]})}function vx({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:lt(n,0)})]})})}function bx({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function yx({ceph:e}){const{t}=$e(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(Oo,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(Oo,{value:e.total_bytes})})]})]})}function wx({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function kx({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Oo,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Oo,{value:t,duration:500}),"/s"]})]})]})}function jx({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:lt(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function Nx({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=$e();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx(vx,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(bx,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx(yx,{ceph:e}),r.jsx(kx,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx(wx,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(jx,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),c=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),l=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(ux,{ceph:e}),r.jsx(xx,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(mx,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,h)=>r.jsx(jp,{pool:d,totalBytes:e.total_bytes},d.name))})]}),c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,h)=>r.jsx(jp,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(hx,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(fx,{osds:e.osds,onSelect:n})]})]})})}function _x({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=$e(),[s,o]=p.useState(null),i=!e&&t&&Object.keys(t).length>0,c=p.useMemo(()=>i?Object.entries(t).filter(([l,d])=>d.ceph).map(([l,d])=>({id:l,name:d.name||l,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:Hi})]}):c.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:Hi})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:c.map((l,d)=>{const h=l.ceph.health==="HEALTH_OK"?"success":l.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[c.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${h}`}),r.jsx("span",{className:"section-name",children:l.name}),r.jsxs("span",{className:"section-osd",children:[l.ceph.osd_up,"/",l.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(Nx,{ceph:l.ceph,clusterName:c.length===1?l.name:void 0,onOSDSelect:o,compact:c.length>1,isPaused:n})]},l.id)})}),s&&r.jsx(gx,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:Hi})]})}const Hi=`
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
`;var Sx={value:()=>{}};function yf(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new po(n)}function po(e){this._=e}function Cx(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}po.prototype=yf.prototype={constructor:po,on:function(e,t){var n=this._,a=Cx(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=Mx(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=Np(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Np(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new po(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function Mx(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function Np(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=Sx,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var Yl="http://www.w3.org/1999/xhtml";const _p={svg:"http://www.w3.org/2000/svg",xhtml:Yl,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function di(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),_p.hasOwnProperty(t)?{space:_p[t],local:e}:e}function zx(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Yl&&t.documentElement.namespaceURI===Yl?t.createElement(e):t.createElementNS(n,e)}}function $x(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function wf(e){var t=di(e);return(t.local?$x:zx)(t)}function Ex(){}function Xc(e){return e==null?Ex:function(){return this.querySelector(e)}}function Tx(e){typeof e!="function"&&(e=Xc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=new Array(i),l,d,h=0;h<i;++h)(l=o[h])&&(d=e.call(l,l.__data__,h,o))&&("__data__"in l&&(d.__data__=l.__data__),c[h]=d);return new wr(a,this._parents)}function Px(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Rx(){return[]}function kf(e){return e==null?Rx:function(){return this.querySelectorAll(e)}}function Ix(e){return function(){return Px(e.apply(this,arguments))}}function Lx(e){typeof e=="function"?e=Ix(e):e=kf(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&(a.push(e.call(l,l.__data__,d,i)),s.push(l));return new wr(a,s)}function jf(e){return function(){return this.matches(e)}}function Nf(e){return function(t){return t.matches(e)}}var Ax=Array.prototype.find;function Ox(e){return function(){return Ax.call(this.children,e)}}function Fx(){return this.firstElementChild}function Dx(e){return this.select(e==null?Fx:Ox(typeof e=="function"?e:Nf(e)))}var Bx=Array.prototype.filter;function Wx(){return Array.from(this.children)}function Ux(e){return function(){return Bx.call(this.children,e)}}function Vx(e){return this.selectAll(e==null?Wx:Ux(typeof e=="function"?e:Nf(e)))}function Hx(e){typeof e!="function"&&(e=jf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new wr(a,this._parents)}function _f(e){return new Array(e.length)}function Yx(){return new wr(this._enter||this._groups.map(_f),this._parents)}function Fo(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Fo.prototype={constructor:Fo,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Gx(e){return function(){return e}}function Kx(e,t,n,a,s,o){for(var i=0,c,l=t.length,d=o.length;i<d;++i)(c=t[i])?(c.__data__=o[i],a[i]=c):n[i]=new Fo(e,o[i]);for(;i<l;++i)(c=t[i])&&(s[i]=c)}function Xx(e,t,n,a,s,o,i){var c,l,d=new Map,h=t.length,g=o.length,u=new Array(h),x;for(c=0;c<h;++c)(l=t[c])&&(u[c]=x=i.call(l,l.__data__,c,t)+"",d.has(x)?s[c]=l:d.set(x,l));for(c=0;c<g;++c)x=i.call(e,o[c],c,o)+"",(l=d.get(x))?(a[c]=l,l.__data__=o[c],d.delete(x)):n[c]=new Fo(e,o[c]);for(c=0;c<h;++c)(l=t[c])&&d.get(u[c])===l&&(s[c]=l)}function qx(e){return e.__data__}function Qx(e,t){if(!arguments.length)return Array.from(this,qx);var n=t?Xx:Kx,a=this._parents,s=this._groups;typeof e!="function"&&(e=Gx(e));for(var o=s.length,i=new Array(o),c=new Array(o),l=new Array(o),d=0;d<o;++d){var h=a[d],g=s[d],u=g.length,x=Jx(e.call(h,h&&h.__data__,d,a)),b=x.length,j=c[d]=new Array(b),y=i[d]=new Array(b),m=l[d]=new Array(u);n(h,g,j,y,m,x,t);for(var f=0,v=0,k,w;f<b;++f)if(k=j[f]){for(f>=v&&(v=f+1);!(w=y[v])&&++v<b;);k._next=w||null}}return i=new wr(i,a),i._enter=c,i._exit=l,i}function Jx(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Zx(){return new wr(this._exit||this._groups.map(_f),this._parents)}function ev(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function tv(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),c=new Array(s),l=0;l<i;++l)for(var d=n[l],h=a[l],g=d.length,u=c[l]=new Array(g),x,b=0;b<g;++b)(x=d[b]||h[b])&&(u[b]=x);for(;l<s;++l)c[l]=n[l];return new wr(c,this._parents)}function rv(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function nv(e){e||(e=av);function t(g,u){return g&&u?e(g.__data__,u.__data__):!g-!u}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],c=i.length,l=s[o]=new Array(c),d,h=0;h<c;++h)(d=i[h])&&(l[h]=d);l.sort(t)}return new wr(s,this._parents).order()}function av(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function sv(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function ov(){return Array.from(this)}function iv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function lv(){let e=0;for(const t of this)++e;return e}function cv(){return!this.node()}function dv(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,c;o<i;++o)(c=s[o])&&e.call(c,c.__data__,o,s);return this}function pv(e){return function(){this.removeAttribute(e)}}function uv(e){return function(){this.removeAttributeNS(e.space,e.local)}}function mv(e,t){return function(){this.setAttribute(e,t)}}function fv(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function hv(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function gv(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function xv(e,t){var n=di(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?uv:pv:typeof t=="function"?n.local?gv:hv:n.local?fv:mv)(n,t))}function Sf(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function vv(e){return function(){this.style.removeProperty(e)}}function bv(e,t,n){return function(){this.style.setProperty(e,t,n)}}function yv(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function wv(e,t,n){return arguments.length>1?this.each((t==null?vv:typeof t=="function"?yv:bv)(e,t,n??"")):ya(this.node(),e)}function ya(e,t){return e.style.getPropertyValue(t)||Sf(e).getComputedStyle(e,null).getPropertyValue(t)}function kv(e){return function(){delete this[e]}}function jv(e,t){return function(){this[e]=t}}function Nv(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function _v(e,t){return arguments.length>1?this.each((t==null?kv:typeof t=="function"?Nv:jv)(e,t)):this.node()[e]}function Cf(e){return e.trim().split(/^|\s+/)}function qc(e){return e.classList||new Mf(e)}function Mf(e){this._node=e,this._names=Cf(e.getAttribute("class")||"")}Mf.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function zf(e,t){for(var n=qc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function $f(e,t){for(var n=qc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function Sv(e){return function(){zf(this,e)}}function Cv(e){return function(){$f(this,e)}}function Mv(e,t){return function(){(t.apply(this,arguments)?zf:$f)(this,e)}}function zv(e,t){var n=Cf(e+"");if(arguments.length<2){for(var a=qc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Mv:t?Sv:Cv)(n,t))}function $v(){this.textContent=""}function Ev(e){return function(){this.textContent=e}}function Tv(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Pv(e){return arguments.length?this.each(e==null?$v:(typeof e=="function"?Tv:Ev)(e)):this.node().textContent}function Rv(){this.innerHTML=""}function Iv(e){return function(){this.innerHTML=e}}function Lv(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Av(e){return arguments.length?this.each(e==null?Rv:(typeof e=="function"?Lv:Iv)(e)):this.node().innerHTML}function Ov(){this.nextSibling&&this.parentNode.appendChild(this)}function Fv(){return this.each(Ov)}function Dv(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Bv(){return this.each(Dv)}function Wv(e){var t=typeof e=="function"?e:wf(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Uv(){return null}function Vv(e,t){var n=typeof e=="function"?e:wf(e),a=t==null?Uv:typeof t=="function"?t:Xc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function Hv(){var e=this.parentNode;e&&e.removeChild(this)}function Yv(){return this.each(Hv)}function Gv(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Kv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Xv(e){return this.select(e?Kv:Gv)}function qv(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Qv(e){return function(t){e.call(this,t,this.__data__)}}function Jv(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function Zv(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function eb(e,t,n){return function(){var a=this.__on,s,o=Qv(t);if(a){for(var i=0,c=a.length;i<c;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function tb(e,t,n){var a=Jv(e+""),s,o=a.length,i;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,d=c.length,h;l<d;++l)for(s=0,h=c[l];s<o;++s)if((i=a[s]).type===h.type&&i.name===h.name)return h.value}return}for(c=t?eb:Zv,s=0;s<o;++s)this.each(c(a[s],t,n));return this}function Ef(e,t,n){var a=Sf(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function rb(e,t){return function(){return Ef(this,e,t)}}function nb(e,t){return function(){return Ef(this,e,t.apply(this,arguments))}}function ab(e,t){return this.each((typeof t=="function"?nb:rb)(e,t))}function*sb(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var ob=[null];function wr(e,t){this._groups=e,this._parents=t}function Ss(){return new wr([[document.documentElement]],ob)}function ib(){return this}wr.prototype=Ss.prototype={constructor:wr,select:Tx,selectAll:Lx,selectChild:Dx,selectChildren:Vx,filter:Hx,data:Qx,enter:Yx,exit:Zx,join:ev,merge:tv,selection:ib,order:rv,sort:nv,call:sv,nodes:ov,node:iv,size:lv,empty:cv,each:dv,attr:xv,style:wv,property:_v,classed:zv,text:Pv,html:Av,raise:Fv,lower:Bv,append:Wv,insert:Vv,remove:Yv,clone:Xv,datum:qv,on:tb,dispatch:ab,[Symbol.iterator]:sb};function Qc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Tf(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function Cs(){}var gs=.7,Do=1/gs,ua="\\s*([+-]?\\d+)\\s*",xs="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",$r="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",lb=/^#([0-9a-f]{3,8})$/,cb=new RegExp(`^rgb\\(${ua},${ua},${ua}\\)$`),db=new RegExp(`^rgb\\(${$r},${$r},${$r}\\)$`),pb=new RegExp(`^rgba\\(${ua},${ua},${ua},${xs}\\)$`),ub=new RegExp(`^rgba\\(${$r},${$r},${$r},${xs}\\)$`),mb=new RegExp(`^hsl\\(${xs},${$r},${$r}\\)$`),fb=new RegExp(`^hsla\\(${xs},${$r},${$r},${xs}\\)$`),Sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Qc(Cs,vs,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Cp,formatHex:Cp,formatHex8:hb,formatHsl:gb,formatRgb:Mp,toString:Mp});function Cp(){return this.rgb().formatHex()}function hb(){return this.rgb().formatHex8()}function gb(){return Pf(this).formatHsl()}function Mp(){return this.rgb().formatRgb()}function vs(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=lb.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?zp(t):n===3?new Kt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Xs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Xs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=cb.exec(e))?new Kt(t[1],t[2],t[3],1):(t=db.exec(e))?new Kt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=pb.exec(e))?Xs(t[1],t[2],t[3],t[4]):(t=ub.exec(e))?Xs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=mb.exec(e))?Tp(t[1],t[2]/100,t[3]/100,1):(t=fb.exec(e))?Tp(t[1],t[2]/100,t[3]/100,t[4]):Sp.hasOwnProperty(e)?zp(Sp[e]):e==="transparent"?new Kt(NaN,NaN,NaN,0):null}function zp(e){return new Kt(e>>16&255,e>>8&255,e&255,1)}function Xs(e,t,n,a){return a<=0&&(e=t=n=NaN),new Kt(e,t,n,a)}function xb(e){return e instanceof Cs||(e=vs(e)),e?(e=e.rgb(),new Kt(e.r,e.g,e.b,e.opacity)):new Kt}function Gl(e,t,n,a){return arguments.length===1?xb(e):new Kt(e,t,n,a??1)}function Kt(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}Qc(Kt,Gl,Tf(Cs,{brighter(e){return e=e==null?Do:Math.pow(Do,e),new Kt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?gs:Math.pow(gs,e),new Kt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Kt(Tn(this.r),Tn(this.g),Tn(this.b),Bo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:$p,formatHex:$p,formatHex8:vb,formatRgb:Ep,toString:Ep}));function $p(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}`}function vb(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}${zn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ep(){const e=Bo(this.opacity);return`${e===1?"rgb(":"rgba("}${Tn(this.r)}, ${Tn(this.g)}, ${Tn(this.b)}${e===1?")":`, ${e})`}`}function Bo(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Tn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function zn(e){return e=Tn(e),(e<16?"0":"")+e.toString(16)}function Tp(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new xr(e,t,n,a)}function Pf(e){if(e instanceof xr)return new xr(e.h,e.s,e.l,e.opacity);if(e instanceof Cs||(e=vs(e)),!e)return new xr;if(e instanceof xr)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,c=o-s,l=(o+s)/2;return c?(t===o?i=(n-a)/c+(n<a)*6:n===o?i=(a-t)/c+2:i=(t-n)/c+4,c/=l<.5?o+s:2-o-s,i*=60):c=l>0&&l<1?0:i,new xr(i,c,l,e.opacity)}function bb(e,t,n,a){return arguments.length===1?Pf(e):new xr(e,t,n,a??1)}function xr(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}Qc(xr,bb,Tf(Cs,{brighter(e){return e=e==null?Do:Math.pow(Do,e),new xr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?gs:Math.pow(gs,e),new xr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new Kt(Yi(e>=240?e-240:e+120,s,a),Yi(e,s,a),Yi(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new xr(Pp(this.h),qs(this.s),qs(this.l),Bo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Bo(this.opacity);return`${e===1?"hsl(":"hsla("}${Pp(this.h)}, ${qs(this.s)*100}%, ${qs(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Pp(e){return e=(e||0)%360,e<0?e+360:e}function qs(e){return Math.max(0,Math.min(1,e||0))}function Yi(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Rf=e=>()=>e;function yb(e,t){return function(n){return e+n*t}}function wb(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function kb(e){return(e=+e)==1?If:function(t,n){return n-t?wb(t,n,e):Rf(isNaN(t)?n:t)}}function If(e,t){var n=t-e;return n?yb(e,n):Rf(isNaN(e)?t:e)}const Rp=function e(t){var n=kb(t);function a(s,o){var i=n((s=Gl(s)).r,(o=Gl(o)).r),c=n(s.g,o.g),l=n(s.b,o.b),d=If(s.opacity,o.opacity);return function(h){return s.r=i(h),s.g=c(h),s.b=l(h),s.opacity=d(h),s+""}}return a.gamma=e,a}(1);function rn(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Kl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Gi=new RegExp(Kl.source,"g");function jb(e){return function(){return e}}function Nb(e){return function(t){return e(t)+""}}function _b(e,t){var n=Kl.lastIndex=Gi.lastIndex=0,a,s,o,i=-1,c=[],l=[];for(e=e+"",t=t+"";(a=Kl.exec(e))&&(s=Gi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),c[i]?c[i]+=o:c[++i]=o),(a=a[0])===(s=s[0])?c[i]?c[i]+=s:c[++i]=s:(c[++i]=null,l.push({i,x:rn(a,s)})),n=Gi.lastIndex;return n<t.length&&(o=t.slice(n),c[i]?c[i]+=o:c[++i]=o),c.length<2?l[0]?Nb(l[0].x):jb(t):(t=l.length,function(d){for(var h=0,g;h<t;++h)c[(g=l[h]).i]=g.x(d);return c.join("")})}var Ip=180/Math.PI,Xl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Lf(e,t,n,a,s,o){var i,c,l;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(l=e*n+t*a)&&(n-=e*l,a-=t*l),(c=Math.sqrt(n*n+a*a))&&(n/=c,a/=c,l/=c),e*a<t*n&&(e=-e,t=-t,l=-l,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*Ip,skewX:Math.atan(l)*Ip,scaleX:i,scaleY:c}}var Qs;function Sb(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Xl:Lf(t.a,t.b,t.c,t.d,t.e,t.f)}function Cb(e){return e==null||(Qs||(Qs=document.createElementNS("http://www.w3.org/2000/svg","g")),Qs.setAttribute("transform",e),!(e=Qs.transform.baseVal.consolidate()))?Xl:(e=e.matrix,Lf(e.a,e.b,e.c,e.d,e.e,e.f))}function Af(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,h,g,u,x,b){if(d!==g||h!==u){var j=x.push("translate(",null,t,null,n);b.push({i:j-4,x:rn(d,g)},{i:j-2,x:rn(h,u)})}else(g||u)&&x.push("translate("+g+t+u+n)}function i(d,h,g,u){d!==h?(d-h>180?h+=360:h-d>180&&(d+=360),u.push({i:g.push(s(g)+"rotate(",null,a)-2,x:rn(d,h)})):h&&g.push(s(g)+"rotate("+h+a)}function c(d,h,g,u){d!==h?u.push({i:g.push(s(g)+"skewX(",null,a)-2,x:rn(d,h)}):h&&g.push(s(g)+"skewX("+h+a)}function l(d,h,g,u,x,b){if(d!==g||h!==u){var j=x.push(s(x)+"scale(",null,",",null,")");b.push({i:j-4,x:rn(d,g)},{i:j-2,x:rn(h,u)})}else(g!==1||u!==1)&&x.push(s(x)+"scale("+g+","+u+")")}return function(d,h){var g=[],u=[];return d=e(d),h=e(h),o(d.translateX,d.translateY,h.translateX,h.translateY,g,u),i(d.rotate,h.rotate,g,u),c(d.skewX,h.skewX,g,u),l(d.scaleX,d.scaleY,h.scaleX,h.scaleY,g,u),d=h=null,function(x){for(var b=-1,j=u.length,y;++b<j;)g[(y=u[b]).i]=y.x(x);return g.join("")}}}var Mb=Af(Sb,"px, ","px)","deg)"),zb=Af(Cb,", ",")",")"),wa=0,Ba=0,Pa=0,Of=1e3,Wo,Wa,Uo=0,On=0,pi=0,bs=typeof performance=="object"&&performance.now?performance:Date,Ff=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Jc(){return On||(Ff($b),On=bs.now()+pi)}function $b(){On=0}function Vo(){this._call=this._time=this._next=null}Vo.prototype=Df.prototype={constructor:Vo,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?Jc():+n)+(t==null?0:+t),!this._next&&Wa!==this&&(Wa?Wa._next=this:Wo=this,Wa=this),this._call=e,this._time=n,ql()},stop:function(){this._call&&(this._call=null,this._time=1/0,ql())}};function Df(e,t,n){var a=new Vo;return a.restart(e,t,n),a}function Eb(){Jc(),++wa;for(var e=Wo,t;e;)(t=On-e._time)>=0&&e._call.call(void 0,t),e=e._next;--wa}function Lp(){On=(Uo=bs.now())+pi,wa=Ba=0;try{Eb()}finally{wa=0,Pb(),On=0}}function Tb(){var e=bs.now(),t=e-Uo;t>Of&&(pi-=t,Uo=e)}function Pb(){for(var e,t=Wo,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Wo=n);Wa=e,ql(a)}function ql(e){if(!wa){Ba&&(Ba=clearTimeout(Ba));var t=e-On;t>24?(e<1/0&&(Ba=setTimeout(Lp,e-bs.now()-pi)),Pa&&(Pa=clearInterval(Pa))):(Pa||(Uo=bs.now(),Pa=setInterval(Tb,Of)),wa=1,Ff(Lp))}}function Ap(e,t,n){var a=new Vo;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var Rb=yf("start","end","cancel","interrupt"),Ib=[],Bf=0,Op=1,Ql=2,uo=3,Fp=4,Jl=5,mo=6;function ui(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;Lb(e,n,{name:t,index:a,group:s,on:Rb,tween:Ib,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:Bf})}function Zc(e,t){var n=kr(e,t);if(n.state>Bf)throw new Error("too late; already scheduled");return n}function Er(e,t){var n=kr(e,t);if(n.state>uo)throw new Error("too late; already running");return n}function kr(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Lb(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=Df(o,0,n.time);function o(d){n.state=Op,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var h,g,u,x;if(n.state!==Op)return l();for(h in a)if(x=a[h],x.name===n.name){if(x.state===uo)return Ap(i);x.state===Fp?(x.state=mo,x.timer.stop(),x.on.call("interrupt",e,e.__data__,x.index,x.group),delete a[h]):+h<t&&(x.state=mo,x.timer.stop(),x.on.call("cancel",e,e.__data__,x.index,x.group),delete a[h])}if(Ap(function(){n.state===uo&&(n.state=Fp,n.timer.restart(c,n.delay,n.time),c(d))}),n.state=Ql,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Ql){for(n.state=uo,s=new Array(u=n.tween.length),h=0,g=-1;h<u;++h)(x=n.tween[h].value.call(e,e.__data__,n.index,n.group))&&(s[++g]=x);s.length=g+1}}function c(d){for(var h=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(l),n.state=Jl,1),g=-1,u=s.length;++g<u;)s[g].call(e,h);n.state===Jl&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=mo,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function Ab(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>Ql&&a.state<Jl,a.state=mo,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function Ob(e){return this.each(function(){Ab(this,e)})}function Fb(e,t){var n,a;return function(){var s=Er(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,c=a.length;i<c;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Db(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=Er(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var c={name:t,value:n},l=0,d=s.length;l<d;++l)if(s[l].name===t){s[l]=c;break}l===d&&s.push(c)}o.tween=s}}function Bb(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=kr(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?Fb:Db)(n,e,t))}function ed(e,t,n){var a=e._id;return e.each(function(){var s=Er(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return kr(s,a).value[t]}}function Wf(e,t){var n;return(typeof t=="number"?rn:t instanceof vs?Rp:(n=vs(t))?(t=n,Rp):_b)(e,t)}function Wb(e){return function(){this.removeAttribute(e)}}function Ub(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Vb(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function Hb(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function Yb(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttribute(e):(i=this.getAttribute(e),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function Gb(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function Kb(e,t){var n=di(e),a=n==="transform"?zb:Wf;return this.attrTween(e,typeof t=="function"?(n.local?Gb:Yb)(n,a,ed(this,"attr."+e,t)):t==null?(n.local?Ub:Wb)(n):(n.local?Hb:Vb)(n,a,t))}function Xb(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function qb(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Qb(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&qb(e,o)),n}return s._value=t,s}function Jb(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&Xb(e,o)),n}return s._value=t,s}function Zb(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=di(e);return this.tween(n,(a.local?Qb:Jb)(a,t))}function e1(e,t){return function(){Zc(this,e).delay=+t.apply(this,arguments)}}function t1(e,t){return t=+t,function(){Zc(this,e).delay=t}}function r1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?e1:t1)(t,e)):kr(this.node(),t).delay}function n1(e,t){return function(){Er(this,e).duration=+t.apply(this,arguments)}}function a1(e,t){return t=+t,function(){Er(this,e).duration=t}}function s1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?n1:a1)(t,e)):kr(this.node(),t).duration}function o1(e,t){if(typeof t!="function")throw new Error;return function(){Er(this,e).ease=t}}function i1(e){var t=this._id;return arguments.length?this.each(o1(t,e)):kr(this.node(),t).ease}function l1(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Er(this,e).ease=n}}function c1(e){if(typeof e!="function")throw new Error;return this.each(l1(this._id,e))}function d1(e){typeof e!="function"&&(e=jf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new Yr(a,this._parents,this._name,this._id)}function p1(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),c=0;c<o;++c)for(var l=t[c],d=n[c],h=l.length,g=i[c]=new Array(h),u,x=0;x<h;++x)(u=l[x]||d[x])&&(g[x]=u);for(;c<a;++c)i[c]=t[c];return new Yr(i,this._parents,this._name,this._id)}function u1(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function m1(e,t,n){var a,s,o=u1(t)?Zc:Er;return function(){var i=o(this,e),c=i.on;c!==a&&(s=(a=c).copy()).on(t,n),i.on=s}}function f1(e,t){var n=this._id;return arguments.length<2?kr(this.node(),n).on.on(e):this.each(m1(n,e,t))}function h1(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function g1(){return this.on("end.remove",h1(this._id))}function x1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Xc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var c=a[i],l=c.length,d=o[i]=new Array(l),h,g,u=0;u<l;++u)(h=c[u])&&(g=e.call(h,h.__data__,u,c))&&("__data__"in h&&(g.__data__=h.__data__),d[u]=g,ui(d[u],t,n,u,d,kr(h,n)));return new Yr(o,this._parents,t,n)}function v1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=kf(e));for(var a=this._groups,s=a.length,o=[],i=[],c=0;c<s;++c)for(var l=a[c],d=l.length,h,g=0;g<d;++g)if(h=l[g]){for(var u=e.call(h,h.__data__,g,l),x,b=kr(h,n),j=0,y=u.length;j<y;++j)(x=u[j])&&ui(x,t,n,j,u,b);o.push(u),i.push(h)}return new Yr(o,i,t,n)}var b1=Ss.prototype.constructor;function y1(){return new b1(this._groups,this._parents)}function w1(e,t){var n,a,s;return function(){var o=ya(this,e),i=(this.style.removeProperty(e),ya(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function Uf(e){return function(){this.style.removeProperty(e)}}function k1(e,t,n){var a,s=n+"",o;return function(){var i=ya(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function j1(e,t,n){var a,s,o;return function(){var i=ya(this,e),c=n(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(e),ya(this,e))),i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c))}}function N1(e,t){var n,a,s,o="style."+t,i="end."+o,c;return function(){var l=Er(this,e),d=l.on,h=l.value[o]==null?c||(c=Uf(t)):void 0;(d!==n||s!==h)&&(a=(n=d).copy()).on(i,s=h),l.on=a}}function _1(e,t,n){var a=(e+="")=="transform"?Mb:Wf;return t==null?this.styleTween(e,w1(e,a)).on("end.style."+e,Uf(e)):typeof t=="function"?this.styleTween(e,j1(e,a,ed(this,"style."+e,t))).each(N1(this._id,e)):this.styleTween(e,k1(e,a,t),n).on("end.style."+e,null)}function S1(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function C1(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&S1(e,i,n)),a}return o._value=t,o}function M1(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,C1(e,t,n??""))}function z1(e){return function(){this.textContent=e}}function $1(e){return function(){var t=e(this);this.textContent=t??""}}function E1(e){return this.tween("text",typeof e=="function"?$1(ed(this,"text",e)):z1(e==null?"":e+""))}function T1(e){return function(t){this.textContent=e.call(this,t)}}function P1(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&T1(s)),t}return a._value=e,a}function R1(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,P1(e))}function I1(){for(var e=this._name,t=this._id,n=Vf(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)if(l=i[d]){var h=kr(l,t);ui(l,e,n,d,i,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new Yr(a,this._parents,e,n)}function L1(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var c={value:i},l={value:function(){--s===0&&o()}};n.each(function(){var d=Er(this,a),h=d.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(c),t._.interrupt.push(c),t._.end.push(l)),d.on=t}),s===0&&o()})}var A1=0;function Yr(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function Vf(){return++A1}var Lr=Ss.prototype;Yr.prototype={constructor:Yr,select:x1,selectAll:v1,selectChild:Lr.selectChild,selectChildren:Lr.selectChildren,filter:d1,merge:p1,selection:y1,transition:I1,call:Lr.call,nodes:Lr.nodes,node:Lr.node,size:Lr.size,empty:Lr.empty,each:Lr.each,on:f1,attr:Kb,attrTween:Zb,style:_1,styleTween:M1,text:E1,textTween:R1,remove:g1,tween:Bb,delay:r1,duration:s1,ease:i1,easeVarying:c1,end:L1,[Symbol.iterator]:Lr[Symbol.iterator]};function O1(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var F1={time:null,delay:0,duration:250,ease:O1};function D1(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function B1(e){var t,n;e instanceof Yr?(t=e._id,e=e._name):(t=Vf(),(n=F1).time=Jc(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&ui(l,e,t,d,i,n||D1(l,t));return new Yr(a,this._parents,e,t)}Ss.prototype.interrupt=Ob;Ss.prototype.transition=B1;function W1(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function U1(){return this.eachAfter(W1)}function V1(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function H1(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function Y1(e,t){for(var n=this,a=[n],s=[],o,i,c,l=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,c=o.length;i<c;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++l,this);return this}function G1(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function K1(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function X1(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function q1(e){for(var t=this,n=Q1(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function Q1(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function J1(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Z1(){return Array.from(this)}function ey(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function ty(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*ry(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function td(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=sy)):t===void 0&&(t=ay);for(var n=new Ho(e),a,s=[n],o,i,c,l;a=s.pop();)if((i=t(a.data))&&(l=(i=Array.from(i)).length))for(a.children=i,c=l-1;c>=0;--c)s.push(o=i[c]=new Ho(i[c])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(iy)}function ny(){return td(this).eachBefore(oy)}function ay(e){return e.children}function sy(e){return Array.isArray(e)?e[1]:null}function oy(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function iy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function Ho(e){this.data=e,this.depth=this.height=0,this.parent=null}Ho.prototype=td.prototype={constructor:Ho,count:U1,each:V1,eachAfter:Y1,eachBefore:H1,find:G1,sum:K1,sort:X1,path:q1,ancestors:J1,descendants:Z1,leaves:ey,links:ty,copy:ny,[Symbol.iterator]:ry};function ly(e){if(typeof e!="function")throw new Error;return e}function Ra(){return 0}function Ia(e){return function(){return e}}function cy(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function dy(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(a-t)/e.value;++c<l;)i=o[c],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function py(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(s-n)/e.value;++c<l;)i=o[c],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var uy=(1+Math.sqrt(5))/2;function my(e,t,n,a,s,o){for(var i=[],c=t.children,l,d,h=0,g=0,u=c.length,x,b,j=t.value,y,m,f,v,k,w,_;h<u;){x=s-n,b=o-a;do y=c[g++].value;while(!y&&g<u);for(m=f=y,w=Math.max(b/x,x/b)/(j*e),_=y*y*w,k=Math.max(f/_,_/m);g<u;++g){if(y+=d=c[g].value,d<m&&(m=d),d>f&&(f=d),_=y*y*w,v=Math.max(f/_,_/m),v>k){y-=d;break}k=v}i.push(l={value:y,dice:x<b,children:c.slice(h,g)}),l.dice?dy(l,n,a,s,j?a+=b*y/j:o):py(l,n,a,j?n+=x*y/j:s,o),j-=y,h=g}return i}const Hf=function e(t){function n(a,s,o,i,c){my(t,a,s,o,i,c)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(uy);function fy(){var e=Hf,t=!1,n=1,a=1,s=[0],o=Ra,i=Ra,c=Ra,l=Ra,d=Ra;function h(u){return u.x0=u.y0=0,u.x1=n,u.y1=a,u.eachBefore(g),s=[0],t&&u.eachBefore(cy),u}function g(u){var x=s[u.depth],b=u.x0+x,j=u.y0+x,y=u.x1-x,m=u.y1-x;y<b&&(b=y=(b+y)/2),m<j&&(j=m=(j+m)/2),u.x0=b,u.y0=j,u.x1=y,u.y1=m,u.children&&(x=s[u.depth+1]=o(u)/2,b+=d(u)-x,j+=i(u)-x,y-=c(u)-x,m-=l(u)-x,y<b&&(b=y=(b+y)/2),m<j&&(j=m=(j+m)/2),e(u,b,j,y,m))}return h.round=function(u){return arguments.length?(t=!!u,h):t},h.size=function(u){return arguments.length?(n=+u[0],a=+u[1],h):[n,a]},h.tile=function(u){return arguments.length?(e=ly(u),h):e},h.padding=function(u){return arguments.length?h.paddingInner(u).paddingOuter(u):h.paddingInner()},h.paddingInner=function(u){return arguments.length?(o=typeof u=="function"?u:Ia(+u),h):o},h.paddingOuter=function(u){return arguments.length?h.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):h.paddingTop()},h.paddingTop=function(u){return arguments.length?(i=typeof u=="function"?u:Ia(+u),h):i},h.paddingRight=function(u){return arguments.length?(c=typeof u=="function"?u:Ia(+u),h):c},h.paddingBottom=function(u){return arguments.length?(l=typeof u=="function"?u:Ia(+u),h):l},h.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:Ia(+u),h):d},h}function Ua(e,t,n){this.k=e,this.x=t,this.y=n}Ua.prototype={constructor:Ua,scale:function(e){return e===1?this:new Ua(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Ua(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Ua.prototype;const Dp={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function hy(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Dp[n]||Dp.default}function Bp(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function Wp({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:c=!1,width:l=120,height:d=180,animationDelay:h=0,onClick:g,onHover:u}){const x=p.useRef(null),b=p.useRef(0),j=p.useRef([]),y=p.useRef(0),[m,f]=p.useState(!1),v=n>0?t/n*100:0,[k,w]=p.useState(0),[_,M]=p.useState(!1),[z,O]=p.useState(!0),P=p.useRef(null),T=p.useRef(0),R=1200,te=500;p.useEffect(()=>{const K=setTimeout(()=>{M(!0)},h);return()=>clearTimeout(K)},[h]),p.useEffect(()=>{if(!_)return;T.current=k,P.current=null;const K=T.current,C=v;if(Math.abs(K-C)<.1){w(C);return}const Ne=z?R:te,_e=Ke=>{P.current===null&&(P.current=Ke);const G=Ke-P.current,de=Math.min(G/Ne,1),Z=(F=>1-Math.pow(1-F,3))(de),se=K+(C-K)*Z;w(se),de<1?requestAnimationFrame(_e):z&&O(!1)};requestAnimationFrame(_e)},[v,_]);const W=k,L=v>=85,q=v>=95,I=hy(v,a),U=p.useCallback(K=>{const C=[];for(let Ne=0;Ne<K;Ne++)C.push({x:Math.random()*l*.6+l*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return C},[l,d]);p.useEffect(()=>{const K=x.current;if(!K)return;const C=K.getContext("2d");if(!C)return;const Ne=window.devicePixelRatio||1;K.width=l*Ne,K.height=d*Ne,C.scale(Ne,Ne);const _e=L?15:5;j.current=U(_e);const Ke=G=>{G-y.current,y.current=G;const de=G*.001;C.clearRect(0,0,l,d);const me=8,Z=me,se=me+20,F=l-me*2,S=d-me*2-40,H=8,oe=c?.05:W/100,ye=S*oe,B=se+S-ye,ie=C.createLinearGradient(Z,se,Z,se+S);ie.addColorStop(0,"#0a0a12"),ie.addColorStop(.5,"#050510"),ie.addColorStop(1,"#0a0a12"),C.fillStyle=ie,C.beginPath(),C.roundRect(Z,se,F,S,H),C.fill(),C.save(),C.beginPath(),C.roundRect(Z,se,F,S,H),C.clip();const he=12,pe=he*Math.sqrt(3);C.strokeStyle="rgba(0, 240, 255, 0.06)",C.lineWidth=.5;for(let ne=0;ne<S/pe+1;ne++)for(let le=0;le<F/(he*1.5)+1;le++){const ke=ne%2*he*.75,Me=Z+le*he*1.5+ke,Le=se+ne*pe*.5;C.beginPath();for(let Fe=0;Fe<6;Fe++){const kt=Math.PI/3*Fe+Math.PI/6,ue=Me+he*.4*Math.cos(kt),We=Le+he*.4*Math.sin(kt);Fe===0?C.moveTo(ue,We):C.lineTo(ue,We)}C.closePath(),C.stroke()}C.restore();const we=se+de*30%S;C.save(),C.beginPath(),C.roundRect(Z,se,F,S,H),C.clip();const Ie=C.createLinearGradient(Z,we-15,Z,we+5);Ie.addColorStop(0,"transparent"),Ie.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ie.addColorStop(1,"transparent"),C.fillStyle=Ie,C.fillRect(Z,we-15,F,20),C.restore(),C.strokeStyle="rgba(0, 240, 255, 0.2)",C.lineWidth=1;for(let ne=0;ne<=10;ne++){const le=se+S-S*ne/10,ke=ne%5===0?12:6,Me=ne%5===0?.4:.2;C.strokeStyle=`rgba(0, 240, 255, ${Me})`,C.beginPath(),C.moveTo(Z+2,le),C.lineTo(Z+2+ke,le),C.stroke(),C.beginPath(),C.moveTo(Z+F-2,le),C.lineTo(Z+F-2-ke,le),C.stroke()}const tt=de*50%S;for(let ne=0;ne<3;ne++){const le=se+(tt+ne*S/3)%S,ke=.3+Math.sin(de*3+ne)*.2;C.beginPath(),C.strokeStyle=`rgba(0, 240, 255, ${ke})`,C.lineWidth=2,C.moveTo(Z,le),C.lineTo(Z+4,le),C.stroke(),C.beginPath(),C.moveTo(Z+F,le),C.lineTo(Z+F-4,le),C.stroke()}if(!c&&oe>0){const ne=C.createLinearGradient(0,B,0,se+S);ne.addColorStop(0,I.gradient[0]),ne.addColorStop(1,I.gradient[1]);const le=L?6:3,ke=.05,Me=L?.1:.05,Le=Math.PI/3;C.save(),C.beginPath(),C.rect(Z,se,F,S),C.clip(),C.fillStyle=ne,C.beginPath(),C.moveTo(Z,se+S);for(let ue=0;ue<=F;ue+=2){const We=Math.sin(ue*ke+de*Me*60)*le,Ye=Math.sin(ue*ke*1.5+de*Me*40+Le)*(le*.5),Je=B+We+Ye;ue===0?C.moveTo(Z+ue,Je):C.lineTo(Z+ue,Je)}C.lineTo(Z+F,se+S),C.lineTo(Z,se+S),C.closePath(),C.fill(),C.strokeStyle=I.glow,C.lineWidth=2,C.shadowColor=I.main,C.shadowBlur=10,C.beginPath();for(let ue=0;ue<=F;ue+=2){const We=Math.sin(ue*ke+de*Me*60)*le,Ye=Math.sin(ue*ke*1.5+de*Me*40+Le)*(le*.5),Je=B+We+Ye;ue===0?C.moveTo(Z+ue,Je):C.lineTo(Z+ue,Je)}C.stroke(),C.shadowBlur=0,j.current.forEach((ue,We)=>{if(ue.y>B&&ue.y<se+S){const Ye=Math.sin(de*ue.wobbleSpeed*60+ue.wobbleOffset)*3;C.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,C.beginPath(),C.arc(ue.x+Ye,ue.y,ue.radius,0,Math.PI*2),C.fill(),C.fillStyle="rgba(255, 255, 255, 0.5)",C.beginPath(),C.arc(ue.x+Ye-ue.radius*.3,ue.y-ue.radius*.3,ue.radius*.3,0,Math.PI*2),C.fill()}ue.y-=ue.speed*(L?2:1),ue.y<B-10&&(ue.y=se+S+Math.random()*20,ue.x=Z+Math.random()*F*.6+F*.2)}),C.restore();const Fe=3;for(let ue=0;ue<Fe;ue++){const We=Z+F*(ue+.5)/Fe,Ye=de*2+ue*Math.PI*.7,Je=(Math.sin(Ye)*.5+.5)*.3;if(Je>.1){const at=C.createLinearGradient(We-8,B,We+8,se+S);at.addColorStop(0,"rgba(255, 255, 255, 0)"),at.addColorStop(.3,`rgba(255, 255, 255, ${Je})`),at.addColorStop(.7,`rgba(255, 255, 255, ${Je*.5})`),at.addColorStop(1,"rgba(255, 255, 255, 0)"),C.fillStyle=at,C.fillRect(We-8,B,16,ye)}}const kt=Math.floor(oe*8);for(let ue=0;ue<kt;ue++){const We=ue*137.5,Ye=Z+10+We*7%(F-20),at=B+10+We*13%(ye-20)+Math.sin(de*2+We)*5,sr=.4+Math.sin(de*3+We)*.3;if(C.fillStyle=`rgba(255, 255, 255, ${sr})`,C.beginPath(),C.arc(Ye,at,1.5,0,Math.PI*2),C.fill(),ue>0&&ue%3===0){const Te=(ue-1)*137.5,Wt=Z+10+Te*7%(F-20),It=B+10+Te*13%(ye-20)+Math.sin(de*2+Te)*5,jr=Math.sqrt((Ye-Wt)**2+(at-It)**2);jr<30&&(C.strokeStyle=`rgba(255, 255, 255, ${.1*(1-jr/30)})`,C.lineWidth=.5,C.beginPath(),C.moveTo(Ye,at),C.lineTo(Wt,It),C.stroke())}}if(L){for(let ue=0;ue<8;ue++){const We=Z+F*.15+Math.random()*F*.7,Ye=B-Math.random()*25,Je=Math.random()*4+1;C.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,C.beginPath(),C.arc(We,Ye,Je,0,Math.PI*2),C.fill()}Math.sin(de*10)>.7&&(C.fillStyle="rgba(255, 100, 0, 0.05)",C.fillRect(Z,se,F,S))}}const Ve=c||q?"#ff0040":I.main,He=q?Math.sin(de*5)*.3+.7:1;C.strokeStyle=Ve,C.lineWidth=3,C.shadowColor=Ve,C.shadowBlur=m?20:12*He,C.beginPath(),C.roundRect(Z,se,F,S,H),C.stroke(),C.shadowBlur=0,C.strokeStyle=`${Ve}60`,C.lineWidth=1,C.beginPath(),C.roundRect(Z+3,se+3,F-6,S-6,H-2),C.stroke();const ge=16,ve=3;C.strokeStyle=Ve,C.lineWidth=ve,C.shadowColor=Ve,C.shadowBlur=8,C.beginPath(),C.moveTo(Z-2,se+ge),C.lineTo(Z-2,se-2),C.lineTo(Z+ge,se-2),C.stroke(),C.beginPath(),C.moveTo(Z+F-ge,se-2),C.lineTo(Z+F+2,se-2),C.lineTo(Z+F+2,se+ge),C.stroke(),C.beginPath(),C.moveTo(Z-2,se+S-ge),C.lineTo(Z-2,se+S+2),C.lineTo(Z+ge,se+S+2),C.stroke(),C.beginPath(),C.moveTo(Z+F-ge,se+S+2),C.lineTo(Z+F+2,se+S+2),C.lineTo(Z+F+2,se+S-ge),C.stroke(),C.shadowBlur=0;const Y=2+(Math.sin(de*4)*.5+.5);if(C.fillStyle=Ve,C.shadowColor=Ve,C.shadowBlur=6,[[Z-2,se-2],[Z+F+2,se-2],[Z-2,se+S+2],[Z+F+2,se+S+2]].forEach(([ne,le])=>{C.beginPath(),C.arc(ne,le,Y,0,Math.PI*2),C.fill()}),C.shadowBlur=0,!c){const le=Z+F+6,ke=S,Me=ke*(W/100);C.fillStyle="rgba(0, 20, 40, 0.8)",C.fillRect(le,se,4,ke);const Le=C.createLinearGradient(0,se+ke-Me,0,se+ke);Le.addColorStop(0,I.main),Le.addColorStop(1,I.gradient[1]),C.fillStyle=Le,C.fillRect(le,se+ke-Me,4,Me),C.strokeStyle=`${Ve}40`,C.lineWidth=1,C.strokeRect(le,se,4,ke)}if(c){C.strokeStyle="#ff0040",C.lineWidth=2,C.beginPath();const ne=Z+F*.3,le=se+S*.3;C.moveTo(ne,le),C.lineTo(ne+10,le+15),C.lineTo(ne+5,le+25),C.lineTo(ne+15,le+40),C.stroke(),C.beginPath(),C.moveTo(ne+10,le+15),C.lineTo(ne+20,le+20),C.stroke()}b.current=requestAnimationFrame(Ke)};return b.current=requestAnimationFrame(Ke),()=>{cancelAnimationFrame(b.current)}},[l,d,W,L,q,c,I,m,U]);const V=()=>{f(!0),u==null||u(!0)},Q=()=>{f(!1),u==null||u(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${q?"critical":""} ${c?"offline":""}`,onClick:g,onMouseEnter:V,onMouseLeave:Q,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:I.main,background:`${I.main}15`,borderColor:`${I.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:x,style:{width:l,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${q?"critical":L?"warning":""}`,style:{color:c?"#FF4081":I.main,textShadow:c?"none":`0 0 10px ${I.glow}`},children:c?"OFFLINE":`${v.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[Bp(t)," / ",Bp(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((K,C)=>r.jsx("span",{className:"node-tag",children:K},C))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
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

      `})]})}function gy({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=p.useState(0),i=p.useRef(0),c=p.useRef(null),l=p.useRef(0);p.useEffect(()=>{l.current=s,c.current=null;const x=b=>{c.current===null&&(c.current=b);const j=b-c.current,y=Math.min(j/a,1),m=y===1?1:1-Math.pow(2,-10*y),f=l.current+(e-l.current)*m;o(f),y<1&&(i.current=requestAnimationFrame(x))};return i.current=requestAnimationFrame(x),()=>cancelAnimationFrame(i.current)},[e,a]);const h=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",g=40,u=[];for(let x=0;x<g;x++){const b=x/g*100,j=b<s,y=x%4===0;u.push({index:x,isActive:j,isMajor:y,percent:b})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:h},children:Pe(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Pe(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:u.map(x=>r.jsx("div",{className:`segment ${x.isActive?"active":""} ${x.isMajor?"major":""}`,style:{"--segment-color":x.isActive?h:"rgba(60, 80, 100, 0.3)",animationDelay:x.isActive?`${x.index*20}ms`:"0ms"}},x.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${h}40)`,boxShadow:`0 0 20px ${h}60, 0 0 40px ${h}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${h} transparent`,filter:`drop-shadow(0 0 4px ${h})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:h}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:h},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const xy=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function vy({vm:e,position:t,onClose:n}){var m,f,v,k,w;const{t:a,language:s}=$e(),o=p.useRef(null),[i,c]=p.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",h=e.type==="lxc",g=e.disks||[],u=s==="zh-TW",x=((m=e.disk)==null?void 0:m.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,b=x>=90?"#ff0040":x>=70?"#ff6b00":"#00f0ff",j=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();p.useEffect(()=>{if(!o.current)return;const M=o.current.getBoundingClientRect(),z=M.width,O=M.height,P=window.innerWidth,T=window.innerHeight,R=15,{cellX:te,cellY:W,cellTop:L,cellBottom:q,cellLeft:I,cellRight:U}=t;let V=0,Q=0,K=te,C=W;U+R+z<P?(V=U+R,Q=Math.max(R,Math.min(T-O-R,W-O/2)),K=U,C=W):I-R-z>0?(V=I-R-z,Q=Math.max(R,Math.min(T-O-R,W-O/2)),K=I,C=W):L-R-O>0?(V=Math.max(R,Math.min(P-z-R,te-z/2)),Q=L-R-O,K=te,C=L):(V=Math.max(R,Math.min(P-z-R,te-z/2)),Q=q+R,K=te,C=q);let Ne=V,_e=Q+O/2;V>U?(Ne=V,_e=Math.max(Q,Math.min(Q+O,C))):V+z<I?(Ne=V+z,_e=Math.max(Q,Math.min(Q+O,C))):Q+O<L?(Ne=Math.max(V,Math.min(V+z,K)),_e=Q+O):(Ne=Math.max(V,Math.min(V+z,K)),_e=Q),c({x:V,y:Q,lineStart:{x:K,y:C},lineEnd:{x:Ne,y:_e}})},[t]);const y=i?(()=>{const _=i.lineEnd.x-i.lineStart.x,M=i.lineEnd.y-i.lineStart.y,z=Math.sqrt(_*_+M*M),O=Math.atan2(M,_)*(180/Math.PI);return{width:`${z}px`,transform:`rotate(${O}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&y&&r.jsx("div",{className:"popup-connector-line",style:y}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:_=>_.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:j}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",g.length>1?u?"":"S":""," (",g.length||1,")"]}),g.length>0?r.jsx("div",{className:"disk-list",children:g.map((_,M)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:_.device}),r.jsx("span",{className:"device-format",children:_.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:_.storage}),r.jsx("span",{className:"disk-size",children:Pe(_.size)})]})]},M))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Pe(((f=e.disk)==null?void 0:f.total_bytes)||0)})]})}),h&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Pe(((v=e.disk)==null?void 0:v.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:b},children:[x.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${x}%`,background:b}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((k=e.cpu)==null?void 0:k.cores)||0," ",u?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Pe(((w=e.memory)==null?void 0:w.total_bytes)||0)})]})]})]})]})}function by({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=p.useState(null),c=p.useRef(null),l=p.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(x=>({name:x.vm.name,value:x.value,vm:x.vm}))},h=td(d).sum(x=>x.value||0).sort((x,b)=>(b.value||0)-(x.value||0));return fy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Hf.ratio(1))(h).leaves().map(x=>({x:x.x0,y:x.y0,width:x.x1-x.x0,height:x.y1-x.y0,vm:x.data.vm,value:x.value||0}))},[e,t,n]);return l.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:c,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),l.map((d,h)=>{var O;const g=((O=d.vm.disk)==null?void 0:O.total_bytes)||1,u=d.vm.status==="running",x=o===`${d.vm.node}-${d.vm.vmid}`,b=d.width>15&&d.height>12,j=d.width>40&&d.height>25,y=d.width>50&&d.height>40,m=d.width>60&&d.height>55,f=Math.max(...l.map(P=>P.value)),v=d.value/f,k=()=>u?v>.7?"rgba(0, 255, 200, 0.15)":v>.4?"rgba(0, 200, 255, 0.12)":v>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",w=()=>u?v>.7?"rgba(0, 255, 200, 0.9)":v>.4?"rgba(0, 200, 255, 0.85)":v>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",_=()=>u?v>.7?"rgba(0, 255, 200, 0.4)":v>.4?"rgba(0, 200, 255, 0.35)":v>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",M=()=>u?v>.7?"rgba(0, 255, 220, 1)":v>.4?"rgba(100, 220, 255, 1)":v>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",z=a?h*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:P=>{if(P.stopPropagation(),s){const T=P.clientX,R=P.clientY,te=d.width/2,W=d.height/2;s(d.vm,{cellX:T,cellY:R,cellWidth:d.width,cellHeight:d.height,cellTop:R-W,cellBottom:R+W,cellLeft:T-te,cellRight:T+te})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${z}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Pe(g)}`}),u&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:_(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:x?1:.6}}),u&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:w(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:k(),stroke:w(),strokeWidth:x?2:1,rx:4,ry:4,style:{filter:x?`drop-shadow(0 0 12px ${_()}) drop-shadow(0 0 4px ${w()})`:`drop-shadow(0 0 3px ${_()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:w(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:w(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:w(),opacity:.8,className:"energy-dot"})]}),u&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),b&&!j&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:M(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${_()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),j&&(()=>{const P=d.width,T=d.height,R=Math.min(16,Math.max(9,Math.min(P/8,T/5))),te=Math.min(12,Math.max(8,Math.min(P/10,T/7))),W=Math.min(10,Math.max(7,Math.min(P/12,T/8))),L=Math.floor((P-8)/(R*.6)),q=d.vm.name.length>L?d.vm.name.slice(0,Math.max(1,L-1))+"…":d.vm.name,I=R+(y?te+2:0)+(m?W+2:0),U=(T-I)/2+R/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:P/2,y:U,textAnchor:"middle",dominantBaseline:"middle",fill:M(),fontSize:R,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${_()}`:"none",filter:u?`drop-shadow(0 0 2px ${_()})`:"none"},children:q}),y&&r.jsx("text",{x:P/2,y:U+R*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:te,fontFamily:"var(--font-mono)",children:Pe(g)}),m&&r.jsxs("text",{x:P/2,y:U+R*.8+(y?te*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:M(),fontSize:W,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${_()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function yy({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=$e(),o=p.useRef(null),[i,c]=p.useState({width:0,height:0}),[l,d]=p.useState(!0),[h,g]=p.useState(null);p.useEffect(()=>{const x=()=>{if(o.current){const j=o.current.getBoundingClientRect();c({width:j.width,height:j.height})}};x();const b=new ResizeObserver(x);return o.current&&b.observe(o.current),()=>b.disconnect()},[]),p.useEffect(()=>{if(l&&e.length>0){const x=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(x)}},[l,e.length]);const u=p.useMemo(()=>e.map(x=>{var b;return{vm:x,value:((b=x.disk)==null?void 0:b.total_bytes)||0}}).filter(x=>x.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Pe(e.reduce((x,b)=>{var j;return x+(((j=b.disk)==null?void 0:j.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>g(null),children:i.width>0&&i.height>0&&r.jsx(by,{data:u,width:i.width,height:i.height,isInitialLoad:l,onVMClick:(x,b)=>g({vm:x,position:b})})}),h&&r.jsx(vy,{vm:h.vm,position:h.position,onClose:()=>g(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function wy({storage:e,position:t,sourcePos:n,onClose:a,onManage:s}){const{t:o}=$e();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,c=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:c.x,y1:c.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((d,h)=>r.jsx("span",{className:"tooltip-label",children:d},h))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.used"),":"]}),r.jsx("span",{children:Pe(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.total"),":"]}),r.jsx("span",{children:Pe(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.usage"),":"]}),r.jsx("span",{className:`text-${Se(i)}`,children:lt(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((d,h)=>r.jsx("span",{className:"tooltip-label node",children:d},h))})]})]}),s&&r.jsx("div",{className:"tooltip-actions",children:r.jsxs("button",{className:"tooltip-action-btn",onClick:d=>{d.stopPropagation(),s(e)},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),r.jsx("span",{children:o("storage.manage")})]})})]})]})}function ky({cluster:e,clusters:t}){const{t:n,language:a}=$e(),[s,o]=p.useState(()=>{if(typeof window>"u")return"tanks";const L=window.location.pathname.split("/").filter(Boolean)[1];return L==="treemap"||L==="tanks"?L:"tanks"});p.useEffect(()=>{if(typeof window>"u")return;const L=window.location.pathname.split("/").filter(Boolean);if(L[0]!=="storage"||L.length>=4)return;const q=`/storage/${s}`;window.location.pathname!==q&&window.history.replaceState(null,"",q)},[s]),p.useEffect(()=>{const L=()=>{const q=window.location.pathname.split("/").filter(Boolean);if(q[0]!=="storage"||q.length>=4)return;const I=q[1];(I==="tanks"||I==="treemap")&&o(I)};return window.addEventListener("popstate",L),()=>window.removeEventListener("popstate",L)},[]);const[i,c]=p.useState("all"),[l,d]=p.useState(""),[h,g]=p.useState(null),[u,x]=p.useState(null),[b,j]=p.useState(null),[y,m]=p.useState(null),[f,v]=p.useState(null),k=p.useCallback(L=>{let q=(e==null?void 0:e.id)||"",I="";if(L.isShared)I=L.connectedNodes[0]||"";else{const V=L.nodeInstances.find(Q=>Q.active)||L.nodeInstances[0];I=(V==null?void 0:V.node)||""}if(!q&&t){for(const[V,Q]of Object.entries(t))if(Q.nodes&&Q.nodes[I]){q=V;break}}if(!q||!I)return;const U=`/storage/${encodeURIComponent(q)}/${encodeURIComponent(I)}/${encodeURIComponent(L.name)}`;window.history.pushState(null,"",U),window.dispatchEvent(new PopStateEvent("popstate")),x(null),j(null),m(null),v(null)},[e,t]),w=p.useCallback((L,q)=>{L.preventDefault(),L.stopPropagation();const I=Math.min(L.clientX,window.innerWidth-180),U=Math.min(L.clientY,window.innerHeight-80);v({x:I,y:U,storage:q})},[]),_=!e&&t&&Object.keys(t).length>0,M=p.useMemo(()=>{const L=[],q=(I,U)=>{Object.values(I.vms).forEach(V=>{var Q;(Q=V.disk)!=null&&Q.total_bytes&&V.disk.total_bytes>0&&!V.template&&L.push({...V,clusterName:U})})};return _?Object.entries(t).forEach(([I,U])=>{q(U,U.name||I)}):e&&q(e,e.name||""),L.sort((I,U)=>{var V,Q;return(((V=U.disk)==null?void 0:V.total_bytes)||0)-(((Q=I.disk)==null?void 0:Q.total_bytes)||0)})},[e,t,_]),{sharedStorages:z,localStoragesByNode:O,allNodes:P,totals:T,warnings:R}=p.useMemo(()=>{const L=new Map;let q=0,I=0,U=0;const V=new Set,Q=G=>{Object.values(G.storages).forEach(de=>{V.add(de.node);const me=de.storage;L.has(me)||L.set(me,{name:de.storage,type:de.type,content:de.content,allowedNodes:de.allowed_nodes||[],nodes:[]}),L.get(me).nodes.push({node:de.node,totalBytes:de.disk.total_bytes,usedBytes:de.disk.used_bytes,active:de.enabled!==!1})})};_?Object.values(t).forEach(G=>Q(G)):e&&Q(e);const K=[],C={};V.forEach(G=>{C[G]=[]}),L.forEach(G=>{const de=xy.includes(G.type),me=G.nodes[0].totalBytes,Z=G.nodes.length>1&&me>0&&G.nodes.every(se=>Math.abs(se.totalBytes-me)/me<.01);if(de||Z){const se=G.nodes[0],F=G.allowedNodes.length>0?G.allowedNodes:G.nodes.map(S=>S.node);K.push({name:G.name,type:G.type,content:G.content,isShared:!0,totalBytes:se.totalBytes,usedBytes:se.usedBytes,connectedNodes:F,nodeInstances:G.nodes})}else G.nodes.forEach(se=>{C[se.node]||(C[se.node]=[]),C[se.node].push({name:G.name,type:G.type,content:G.content,isShared:!1,totalBytes:se.totalBytes,usedBytes:se.usedBytes,connectedNodes:[],nodeInstances:[se]})})});const Ne=G=>{if(i==="local"&&G.isShared||i==="shared"&&!G.isShared)return!1;if(l){const de=l.toLowerCase();if(!G.name.toLowerCase().includes(de)&&!G.type.toLowerCase().includes(de))return!1}return!0},_e=K.filter(Ne).sort((G,de)=>G.name.localeCompare(de.name)),Ke={};return Object.entries(C).forEach(([G,de])=>{const me=de.filter(Ne).sort((Z,se)=>Z.name.localeCompare(se.name));me.length>0&&(Ke[G]=me)}),_e.forEach(G=>{(G.totalBytes>0?G.usedBytes/G.totalBytes*100:0)>=85&&U++,q+=G.usedBytes,I+=G.totalBytes}),Object.values(Ke).flat().forEach(G=>{(G.totalBytes>0?G.usedBytes/G.totalBytes*100:0)>=85&&U++,q+=G.usedBytes,I+=G.totalBytes}),{sharedStorages:_e,localStoragesByNode:Ke,allNodes:Array.from(V).sort(),totals:{totalUsed:q,totalCapacity:I},warnings:U}},[e,t,_,i,l]),te=(L,q)=>{if(u&&u.name===L.name&&u.isShared===L.isShared){x(null),j(null),m(null);return}const I=q.getBoundingClientRect(),U=240,V=200,Q=I.top+I.height/2;let K=I.right+30,C=!1;K+U>window.innerWidth&&(K=I.left-U-30,C=!0);let Ne=I.top;Ne+V>window.innerHeight&&(Ne=window.innerHeight-V-10),Ne<10&&(Ne=10),x(L),j({x:K,y:Ne}),m({x:C?I.left:I.right,y:Q})};if(!e&&!_)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const W=T.totalCapacity>0?T.totalUsed/T.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:z.length+Object.values(O).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:z.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(O).flat().length})}),R>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",R," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:l,onChange:L=>d(L.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>c("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>c("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>c("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(gy,{percent:W,usedBytes:T.totalUsed,totalBytes:T.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx(yy,{vmDiskData:M,totals:T,storages:[...z.map(L=>L.name),...Object.values(O).flat().map(L=>L.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&z.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n(z.length>1?"storage.storages_plural":"storage.storages_count",{n:z.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:z.map((L,q)=>r.jsx("div",{onClick:I=>te(L,I.currentTarget),onContextMenu:I=>w(I,L),style:{cursor:"pointer"},children:r.jsx(Wp,{name:L.name,usedBytes:L.usedBytes,totalBytes:L.totalBytes,type:L.type,isShared:!0,connectedNodes:L.connectedNodes,width:140,height:220,animationDelay:q*80})},L.name))})]}),(i==="all"||i==="local")&&Object.keys(O).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(O).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(O).flat().length})," ",n(Object.keys(O).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(O).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let L=z.length;return Object.entries(O).sort(([q],[I])=>q.localeCompare(I)).flatMap(([q,I])=>I.map(U=>{const V=U.nodeInstances[0],Q=L++;return r.jsx("div",{onClick:K=>te(U,K.currentTarget),onContextMenu:K=>w(K,U),style:{cursor:"pointer"},children:r.jsx(Wp,{name:U.name,usedBytes:V.usedBytes,totalBytes:V.totalBytes,type:U.type,isShared:!1,nodeName:q,isOffline:!V.active,width:120,height:200,animationDelay:Q*80})},`${q}-${U.name}`)}))})()})]}),z.length===0&&Object.keys(O).length===0&&r.jsx("div",{className:"no-storage",children:l?r.jsxs("span",{children:[n("error.no_data"),': "',l,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(wy,{storage:u,position:b,sourcePos:y,onClose:()=>{x(null),j(null),m(null)},onManage:k}),f&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"storage-ctx-shield",onClick:()=>v(null),onContextMenu:L=>{L.preventDefault(),v(null)}}),r.jsx("div",{className:"storage-ctx-menu",style:{left:f.x,top:f.y},onClick:L=>L.stopPropagation(),children:r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{k(f.storage),v(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]}),r.jsx("span",{children:n("storage.content")})]})})]}),r.jsx("style",{children:`
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
      `})]})}const jy=["backup","iso","vztmpl","snippets","import","images","rootdir"],Ny=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function _y({clusterId:e,node:t,storageName:n,clusters:a}){var ve,Oe;const{t:s,language:o}=$e(),i=Kr(),c=_s(),l=p.useMemo(()=>{var ke,Me;const Y=a==null?void 0:a[e];if(!Y)return null;const ne=Y.storages||{};let le=ne[`${t}/${n}`]||ne[n];if(!le){for(const Le of Object.values(ne))if(Le&&Le.storage===n){le=Le;break}}return le?{clusterName:Y.name||e,type:le.type||"",content:le.content||[],total:((ke=le.disk)==null?void 0:ke.total_bytes)||0,used:((Me=le.disk)==null?void 0:Me.used_bytes)||0,shared:!!le.shared}:null},[a,e,n,t]),d=l?Ny.has(l.type):!1,h=((ve=c.user)==null?void 0:ve.role_global)==="operator"||((Oe=c.user)==null?void 0:Oe.role_global)==="admin"||!c.authEnforced,g=p.useMemo(()=>{if(!l)return[];const Y=new Set(l.content);return jy.filter(ne=>Y.has(ne))},[l]),[u,x]=p.useState(null);p.useEffect(()=>{u&&g.includes(u)||g.length>0&&x(g[0])},[g,u]);const[b,j]=p.useState([]),[y,m]=p.useState(!1),[f,v]=p.useState(null),[k,w]=p.useState(0),[_,M]=p.useState(!1),[z,O]=p.useState(null),[P,T]=p.useState(0),[R,te]=p.useState(!1),[W,L]=p.useState(null),[q,I]=p.useState(!1),[U,V]=p.useState(""),[Q,K]=p.useState(""),[C,Ne]=p.useState(""),[_e,Ke]=p.useState(""),[G,de]=p.useState(!0),[me,Z]=p.useState(!1),[se,F]=p.useState(null),[S,H]=p.useState(""),[oe,ye]=p.useState("ctime"),[B,ie]=p.useState("desc"),he=Y=>{oe===Y?ie(ne=>ne==="asc"?"desc":"asc"):(ye(Y),ie(Y==="name"||Y==="format"||Y==="notes"?"asc":"desc")),we(!0),setTimeout(()=>we(!1),600)},[pe,we]=p.useState(!1);p.useEffect(()=>{if(!u)return;let Y=!1;m(!0),v(null);const ne=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content?type=${u}`;return fetch(ne,{credentials:"same-origin"}).then(async le=>{if(!le.ok){const Me=await le.text().catch(()=>"");throw new Error(`HTTP ${le.status}: ${Me.slice(0,200)}`)}const ke=await le.json();Y||j(Array.isArray(ke.items)?ke.items:[])}).catch(le=>{Y||v(String((le==null?void 0:le.message)||le))}).finally(()=>{Y||m(!1)}),()=>{Y=!0}},[u,k,e,t,n]);const Ie=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},tt=async Y=>{if(!(!h||d||!await i.confirm(o==="zh-TW"?`確定要刪除「${Gn(Y.volid)}」？此操作無法復原。`:`Delete "${Gn(Y.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const le=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content/`+encodeURIComponent(Y.volid),ke=await fetch(le,{method:"DELETE",credentials:"same-origin"});if(!ke.ok){const Me=await ke.text().catch(()=>"");throw new Error(`HTTP ${ke.status}: ${Me.slice(0,200)}`)}j(Me=>Me.filter(Le=>Le.volid!==Y.volid)),w(Me=>Me+1)}catch(le){await i.alert(o==="zh-TW"?`刪除失敗：${le}`:`Delete failed: ${le}`,{title:o==="zh-TW"?"錯誤":"Error"})}},Ve=p.useMemo(()=>{let Y=b;const ne=S.trim().toLowerCase();return ne&&(Y=b.filter(ke=>Gn(ke.volid).toLowerCase().includes(ne)||(ke.format||"").toLowerCase().includes(ne)||(ke.notes||"").toLowerCase().includes(ne))),Y.slice().sort((ke,Me)=>{let Le=0;switch(oe){case"name":Le=Gn(ke.volid).localeCompare(Gn(Me.volid));break;case"ctime":Le=(ke.ctime||0)-(Me.ctime||0);break;case"format":Le=(ke.format||"").localeCompare(Me.format||"");break;case"size":Le=(ke.size||0)-(Me.size||0);break;case"vmid":Le=(ke.vmid??-1)-(Me.vmid??-1);break;case"notes":Le=(ke.notes||"").localeCompare(Me.notes||"");break}return B==="asc"?Le:-Le})},[b,S,oe,B]),He=Y=>oe===Y?B==="asc"?"▲":"▼":"";if(!l)return r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const ge=l.total>0?l.used/l.total*100:0;return r.jsxs("div",{className:"storage-detail",children:[r.jsxs("div",{className:"storage-detail-header",children:[r.jsxs("button",{className:"back-btn",onClick:Ie,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M15 18l-6-6 6-6"})}),r.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),r.jsxs("div",{className:"storage-detail-title",children:[r.jsx("span",{className:"breadcrumb",children:l.clusterName}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb",children:t}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("h1",{className:"storage-name font-display",children:n}),r.jsx("span",{className:`storage-type-badge ${d?"block":"file"}`,children:l.type.toUpperCase()}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),r.jsxs("div",{className:"storage-detail-stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.used")}),r.jsxs("span",{className:`stat-val text-${Se(ge)}`,children:[Pe(l.used)," / ",Pe(l.total)]})]}),r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.usage")}),r.jsx("span",{className:`stat-val text-${Se(ge)}`,children:lt(ge,1)})]})]})]}),r.jsx("div",{className:"storage-detail-tabs",children:g.length===0?r.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):g.map(Y=>r.jsxs("button",{className:`storage-tab tab-${Y} ${u===Y?"active":""}`,onClick:()=>x(Y),children:[r.jsx("span",{className:"tab-icon","aria-hidden":!0,children:Sy(Y)}),r.jsx("span",{children:Ki(Y,o)})]},Y))}),r.jsxs("div",{className:"storage-detail-toolbar",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:S,onChange:Y=>H(Y.target.value)})]}),!d&&h&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"action-btn",onClick:()=>M(!0),title:o==="zh-TW"?"從本機上傳檔案到此儲存":"Upload a local file to this storage",children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),r.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),r.jsxs("button",{className:"action-btn",onClick:()=>I(!0),title:o==="zh-TW"?"伺服器端從 URL 下載到此儲存（PVE download-url）":"Server-side download to this storage (PVE download-url)",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"})]}),r.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),d&&r.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),r.jsxs("button",{className:"action-btn ghost",onClick:()=>w(Y=>Y+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),r.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),r.jsxs("div",{className:"storage-detail-list",children:[r.jsx("div",{className:"tab-scan-line"}),y&&b.length===0&&r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),f&&r.jsx("div",{className:"storage-detail-error",children:r.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",f]})}),!y&&!f&&Ve.length===0&&r.jsx("div",{className:"storage-detail-empty",children:r.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),Ve.length>0&&r.jsxs("table",{className:"storage-content-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:`sortable ${oe==="name"?"sorted":""}`,onClick:()=>he("name"),children:r.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",He("name")&&r.jsx("span",{className:"sort-indicator",children:He("name")})]})}),r.jsx("th",{className:`sortable ${oe==="ctime"?"sorted":""}`,onClick:()=>he("ctime"),children:r.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",He("ctime")&&r.jsx("span",{className:"sort-indicator",children:He("ctime")})]})}),r.jsx("th",{className:`sortable ${oe==="format"?"sorted":""}`,onClick:()=>he("format"),children:r.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",He("format")&&r.jsx("span",{className:"sort-indicator",children:He("format")})]})}),r.jsx("th",{className:`num sortable ${oe==="size"?"sorted":""}`,onClick:()=>he("size"),children:r.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",He("size")&&r.jsx("span",{className:"sort-indicator",children:He("size")})]})}),u==="backup"&&r.jsx("th",{className:`num sortable ${oe==="vmid"?"sorted":""}`,onClick:()=>he("vmid"),children:r.jsxs("span",{children:["VMID",He("vmid")&&r.jsx("span",{className:"sort-indicator",children:He("vmid")})]})}),u==="backup"&&r.jsx("th",{className:`sortable ${oe==="notes"?"sorted":""}`,onClick:()=>he("notes"),children:r.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",He("notes")&&r.jsx("span",{className:"sort-indicator",children:He("notes")})]})}),!d&&h&&r.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:Ve.map(Y=>{const ne=Yf(Y.format),le=Cy(Y.size);return r.jsxs("tr",{className:pe?"sort-animating":"",children:[r.jsxs("td",{className:"name-cell",title:Y.volid,children:[r.jsx("span",{className:"file-icon","aria-hidden":!0,children:My(Y.format)}),r.jsx("span",{className:"file-name",children:Gn(Y.volid)})]}),r.jsx("td",{className:"date-cell",children:Y.ctime?zy(Y.ctime):"—"}),r.jsx("td",{children:Y.format?r.jsx("span",{className:`format-badge ${ne}`,children:Y.format}):r.jsx("span",{className:"muted",children:"—"})}),r.jsx("td",{className:`num size-${le}`,children:Y.size?Pe(Y.size):"—"}),u==="backup"&&r.jsx("td",{className:"num",children:Y.vmid!=null?r.jsxs("span",{className:"vmid-badge",children:["#",Y.vmid]}):r.jsx("span",{className:"muted",children:"—"})}),u==="backup"&&r.jsx("td",{className:"notes-cell",title:Y.notes||"",children:Y.notes||r.jsx("span",{className:"muted",children:"—"})}),!d&&r.jsxs("td",{className:"actions",children:[r.jsx("a",{className:"action-btn-row",href:`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download/`+encodeURIComponent(Y.volid),download:!0,title:o==="zh-TW"?"下載到本機（SSH 串流）":"Download to local (SSH stream)",onClick:ke=>ke.stopPropagation(),children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),h&&r.jsx("button",{className:"action-btn-row danger",onClick:()=>tt(Y),title:o==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"}),r.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]})})]})]},Y.volid)})})]})]},u||"none"),_&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!R&&M(!1),onDragOver:Y=>Y.preventDefault(),onDrop:Y=>{var le;if(Y.preventDefault(),R)return;const ne=(le=Y.dataTransfer.files)==null?void 0:le[0];ne&&O(ne)},children:r.jsxs("div",{className:"url-dl-frame",onClick:Y=>Y.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsxs("span",{children:[o==="zh-TW"?"上傳到 ":"Upload to ",n]}),r.jsx("button",{className:"url-dl-close",onClick:()=>!R&&M(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`將檔案上傳到此儲存區的 ${Ki(u||"iso",o)} 分類。可拖曳檔案到此視窗。`:`Upload a file to this storage's ${Ki(u||"iso",o)} category. You can also drag-drop into this window.`}),r.jsx("label",{children:o==="zh-TW"?"檔案":"File"}),r.jsx("input",{type:"file",disabled:R,onChange:Y=>{var ne;return O(((ne=Y.target.files)==null?void 0:ne[0])||null)},style:{width:"100%",padding:"8px",background:"#02050b",border:"1px solid var(--border)",borderRadius:4,color:"var(--text-primary)",fontFamily:"var(--font-mono)",fontSize:13}}),z&&r.jsxs("div",{className:"url-dl-lead",style:{marginTop:8},children:[r.jsx("code",{children:z.name})," · ",r.jsxs("span",{children:[(z.size/(1024*1024)).toFixed(1)," MB"]})]}),R&&r.jsxs("div",{style:{marginTop:12},children:[r.jsx("div",{style:{height:6,background:"#02050b",borderRadius:3,border:"1px solid var(--border)",overflow:"hidden"},children:r.jsx("div",{style:{width:`${P}%`,height:"100%",background:"linear-gradient(90deg, var(--primary), #00b4ff)",transition:"width 0.2s ease",boxShadow:"0 0 8px rgba(0,240,255,0.5)"}})}),r.jsxs("div",{style:{marginTop:6,fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)"},children:[P.toFixed(1),"%"," ",o==="zh-TW"?"上傳中…":"Uploading…"]})]}),W&&r.jsx("div",{className:"url-dl-err",children:W})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!R&&M(!1),disabled:R,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:R||!z||!u,onClick:()=>{if(!z||!u)return;te(!0),L(null),T(0);const Y=new FormData;Y.append("content",u),Y.append("filename",z,z.name);const ne=new XMLHttpRequest;ne.upload.onprogress=le=>{le.lengthComputable&&T(le.loaded/le.total*100)},ne.onload=()=>{te(!1),ne.status>=200&&ne.status<300?(M(!1),O(null),T(0),w(le=>le+1),i.alert(o==="zh-TW"?"上傳完成。檔案已派送到 PVE。":"Upload complete. File dispatched to PVE.",{title:o==="zh-TW"?"完成":"Done"})):L(`HTTP ${ne.status}: ${ne.responseText.slice(0,200)}`)},ne.onerror=()=>{te(!1),L(o==="zh-TW"?"網路錯誤":"Network error")},ne.open("POST",`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/upload`),ne.withCredentials=!0,ne.send(Y)},children:R?o==="zh-TW"?"上傳中…":"Uploading…":o==="zh-TW"?"開始上傳":"Upload"})]})]})}),q&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!me&&I(!1),children:r.jsxs("div",{className:"url-dl-frame",onClick:Y=>Y.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsx("span",{children:o==="zh-TW"?"從網址下載":"Download from URL"}),r.jsx("button",{className:"url-dl-close",onClick:()=>!me&&I(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`PVE 端伺服器會直接從這個網址抓檔到 ${n}，你的網路頻寬不會經手。`:`The PVE host will pull the file directly into ${n}; your bandwidth never carries it.`}),r.jsx("label",{children:o==="zh-TW"?"網址 (URL)":"URL"}),r.jsx("input",{type:"text",value:U,onChange:Y=>V(Y.target.value),placeholder:"https://example.com/debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"檔名（儲存後）":"Filename (as stored)"}),r.jsx("input",{type:"text",value:Q,onChange:Y=>K(Y.target.value),placeholder:"debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"校驗 (選填)":"Checksum (optional)"}),r.jsxs("div",{className:"url-dl-row",children:[r.jsxs("select",{value:_e,onChange:Y=>Ke(Y.target.value),className:"url-dl-algo",children:[r.jsx("option",{value:"",children:o==="zh-TW"?"— 演算法 —":"— algorithm —"}),r.jsx("option",{value:"sha256",children:"sha256"}),r.jsx("option",{value:"sha512",children:"sha512"}),r.jsx("option",{value:"md5",children:"md5"})]}),r.jsx("input",{type:"text",value:C,onChange:Y=>Ne(Y.target.value),placeholder:o==="zh-TW"?"十六進位摘要":"hex digest",spellCheck:!1,autoComplete:"off"})]}),r.jsxs("label",{className:"url-dl-check",children:[r.jsx("input",{type:"checkbox",checked:G,onChange:Y=>de(Y.target.checked)}),r.jsx("span",{children:o==="zh-TW"?"驗證來源 TLS 憑證（建議開啟）":"Verify source TLS certificate (recommended)"})]}),se&&r.jsx("div",{className:"url-dl-err",children:se})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!me&&I(!1),disabled:me,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:me||!U||!Q||!u,onClick:async()=>{if(u){Z(!0),F(null);try{const Y=await fetch(`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download-url`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:U,filename:Q,content:u,checksum:C||void 0,checksum_algorithm:_e||void 0,verify_certificates:G})});if(!Y.ok){const ne=await Y.text().catch(()=>"");throw new Error(`HTTP ${Y.status}: ${ne.slice(0,200)}`)}I(!1),V(""),K(""),Ne(""),Ke(""),setTimeout(()=>w(ne=>ne+1),1e3),await i.alert(o==="zh-TW"?"下載任務已派送。完成後檔案會出現在清單。":"Download task dispatched. The file will appear in the list when finished.",{title:o==="zh-TW"?"已派送":"Dispatched"})}catch(Y){F(String(Y instanceof Error?Y.message:Y))}finally{Z(!1)}}},children:me?o==="zh-TW"?"派送中…":"Dispatching…":o==="zh-TW"?"開始下載":"Start download"})]})]})}),r.jsx("style",{children:`
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
      `})]})}function Gn(e){const t=e.indexOf("/");if(t>=0)return e.slice(t+1);const n=e.indexOf(":");return n>=0?e.slice(n+1):e}function Sy(e){switch(e){case"backup":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function Ki(e,t){return t==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[e]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[e]}function Yf(e){if(!e)return"fmt-other";const t=e.toLowerCase();return t==="iso"||t==="img"?"fmt-iso":t.startsWith("vma")||t==="pbs-vm"||t==="pbs-ct"?"fmt-backup":t.startsWith("tar")?"fmt-tmpl":t==="qcow2"||t==="raw"||t==="vmdk"||t==="subvol"?"fmt-disk":t==="snippet"||t==="yaml"||t==="yml"||t==="sh"?"fmt-snippet":t==="ovf"||t==="ova"||t==="vmx"?"fmt-import":"fmt-other"}function Cy(e){if(!e)return"tiny";const t=e/(1024*1024);return t<50?"tiny":t<1024?"small":t<5120?"medium":t<20480?"large":"huge"}function My(e,t){const n=Yf(e),a=n==="fmt-iso"?"#00b4ff":n==="fmt-backup"?"#ffa500":n==="fmt-tmpl"?"#b464ff":n==="fmt-disk"?"#00f0c8":n==="fmt-snippet"?"#a0c864":n==="fmt-import"?"#ff64b4":"var(--text-muted)";return n==="fmt-iso"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):n==="fmt-backup"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):n==="fmt-tmpl"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]}):n==="fmt-disk"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):n==="fmt-snippet"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]}):n==="fmt-import"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function zy(e,t){const n=new Date(e*1e3),a=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${a(n.getMonth()+1)}-${a(n.getDate())} ${a(n.getHours())}:${a(n.getMinutes())}`}function Up(){if(typeof window>"u")return null;const e=window.location.pathname.split("/").filter(Boolean);return e.length<4||e[0]!=="storage"?null:{clusterId:decodeURIComponent(e[1]),node:decodeURIComponent(e[2]),storage:decodeURIComponent(e[3])}}function $y({cluster:e,clusters:t}){const[n,a]=p.useState(()=>Up());if(p.useEffect(()=>{const s=()=>a(Up());return window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)},[]),n){const s=t||(e?{[e.id]:e}:null);return r.jsx(_y,{clusterId:n.clusterId,node:n.node,storageName:n.storage,clusters:s})}return r.jsx(ky,{cluster:e,clusters:t})}function Ey(){var P;const{language:e}=$e(),t=Kr(),n=_s(),[a,s]=p.useState([]),[o,i]=p.useState(!0),[c,l]=p.useState(null),[d,h]=p.useState(null),[g,u]=p.useState(""),[x,b]=p.useState(""),[j,y]=p.useState(!1),m=p.useCallback(async()=>{i(!0),l(null);try{const T=await fetch("/api/admin/users",{credentials:"same-origin"});if(!T.ok)throw new Error(`HTTP ${T.status}`);const R=await T.json();s(R.users||[])}catch(T){l(String(T instanceof Error?T.message:T))}finally{i(!1)}},[]);p.useEffect(()=>{m()},[m]);const f=((P=n.user)==null?void 0:P.role_global)==="admin"||!n.authEnforced,v=async()=>{if(!g.trim()||x.length<8){await t.alert(e==="zh-TW"?"使用者名稱必填，密碼至少 8 字元":"Username required, password ≥ 8 chars");return}y(!0);try{const T=await fetch("/api/admin/users",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:g,password:x})});if(!T.ok)throw new Error(`HTTP ${T.status}: ${await T.text()}`);u(""),b(""),await m()}catch(T){await t.alert(`${T}`)}finally{y(!1)}},k=async T=>{const R=await t.prompt(e==="zh-TW"?`為 ${T.username} 設定新密碼（至少 8 字元）：`:`New password for ${T.username} (≥8 chars):`,{inputType:"password"});if(!R||R.length<8)return;const te=await fetch(`/api/admin/users/${encodeURIComponent(T.username)}/password`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:R,must_change_pw:!0})});te.ok?await t.alert(e==="zh-TW"?"已重設並要求下次登入時變更":"Reset; user must change on next login"):await t.alert(`HTTP ${te.status}: ${await te.text()}`),m()},w=async T=>{if(!T.totp_enabled||!await t.confirm(e==="zh-TW"?`清除 ${T.username} 的 2FA 註冊？`:`Clear 2FA enrolment for ${T.username}?`,{destructive:!0}))return;const te=await fetch(`/api/admin/users/${encodeURIComponent(T.username)}/totp/disable`,{method:"POST",credentials:"same-origin"});te.ok||await t.alert(`HTTP ${te.status}`),m()},_=async T=>{const R=await fetch(`/api/admin/users/${encodeURIComponent(T.username)}/enabled`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!T.enabled})});R.ok||await t.alert(`HTTP ${R.status}`),m()},M=async T=>{if(!await t.confirm(e==="zh-TW"?`永久刪除使用者 ${T.username}？`:`Permanently delete user ${T.username}?`,{destructive:!0}))return;const te=await fetch(`/api/admin/users/${encodeURIComponent(T.username)}`,{method:"DELETE",credentials:"same-origin"});te.ok||await t.alert(`HTTP ${te.status}`),m()},z=T=>{if(!T)return"—";const R=new Date(T),te=W=>String(W).padStart(2,"0");return`${R.getFullYear()}-${te(R.getMonth()+1)}-${te(R.getDate())} ${te(R.getHours())}:${te(R.getMinutes())}`};if(!f)return r.jsxs("div",{className:"user-admin-noauth",children:[r.jsx("h2",{children:e==="zh-TW"?"需要管理員權限":"Admin role required"}),r.jsx("p",{children:e==="zh-TW"?"此頁僅限 admin 角色檢視。":"Only users with the admin role can access this page."})]});const O=p.useMemo(()=>[...a].sort((T,R)=>T.username.localeCompare(R.username)),[a]);return r.jsxs("div",{className:"user-admin",children:[r.jsxs("div",{className:"ua-header",children:[r.jsxs("h1",{className:"ua-title font-display",children:[r.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),r.jsx("circle",{cx:"9",cy:"7",r:"4"}),r.jsx("path",{d:"M23 21v-2a4 4 0 00-3-3.87"}),r.jsx("path",{d:"M16 3.13a4 4 0 010 7.75"})]}),e==="zh-TW"?"使用者管理":"User management"]}),r.jsxs("span",{className:"ua-count",children:[a.length," ",e==="zh-TW"?"位使用者":"users"]})]}),r.jsxs("div",{className:"ua-newrow",children:[r.jsx("span",{className:"ua-newlabel",children:e==="zh-TW"?"新增本機帳號":"Create local user"}),r.jsx("input",{type:"text",value:g,onChange:T=>u(T.target.value),placeholder:e==="zh-TW"?"使用者名稱":"username",spellCheck:!1,autoComplete:"off"}),r.jsx("input",{type:"password",value:x,onChange:T=>b(T.target.value),placeholder:e==="zh-TW"?"密碼（≥8 字元）":"password (≥8 chars)",autoComplete:"new-password"}),r.jsx("button",{className:"ua-btn primary",disabled:j||!g||x.length<8,onClick:v,children:j?e==="zh-TW"?"建立中…":"Creating…":e==="zh-TW"?"建立":"Create"})]}),o&&r.jsx("div",{className:"ua-loading",children:e==="zh-TW"?"載入中…":"Loading…"}),c&&r.jsx("div",{className:"ua-err",children:c}),!o&&!c&&r.jsx("div",{className:"ua-table-wrap",children:r.jsxs("table",{className:"ua-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:e==="zh-TW"?"帳號":"Username"}),r.jsx("th",{children:e==="zh-TW"?"狀態":"Status"}),r.jsx("th",{children:"2FA"}),r.jsx("th",{children:e==="zh-TW"?"角色":"Roles"}),r.jsx("th",{children:e==="zh-TW"?"上次登入":"Last login"}),r.jsx("th",{className:"actions",children:e==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:O.map(T=>r.jsxs("tr",{className:T.enabled?"":"is-disabled",children:[r.jsxs("td",{children:[r.jsx("code",{className:"ua-username",children:T.username}),T.must_change_pw&&r.jsx("span",{className:"ua-badge warn",title:e==="zh-TW"?"下次登入需變更密碼":"Must change password",children:"!"})]}),r.jsx("td",{children:r.jsx("span",{className:`ua-state-pill ${T.enabled?"on":"off"}`,children:T.enabled?e==="zh-TW"?"啟用":"Enabled":e==="zh-TW"?"停用":"Disabled"})}),r.jsx("td",{children:T.totp_enabled?r.jsx("span",{className:"ua-totp on",title:"2FA enrolled",children:"●"}):r.jsx("span",{className:"ua-totp off",title:"No 2FA",children:"○"})}),r.jsx("td",{children:r.jsx("div",{className:"ua-roles",children:T.roles.length===0?r.jsx("span",{className:"muted",children:"—"}):T.roles.map((R,te)=>r.jsxs("span",{className:`ua-role role-${R.role}`,children:[R.role,r.jsxs("span",{className:"ua-role-scope",children:["@",R.cluster_id==="*"?"all":R.cluster_id,R.vm_pattern!=="*"&&` :${R.vm_pattern}`]})]},te))})}),r.jsx("td",{className:"muted",children:z(T.last_login_at)}),r.jsxs("td",{className:"actions",children:[r.jsx("button",{className:"ua-icon-btn",onClick:()=>h(T),title:e==="zh-TW"?"管理角色":"Manage roles",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 20h9"}),r.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>k(T),title:e==="zh-TW"?"重設密碼":"Reset password",children:r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})})}),r.jsx("button",{className:`ua-icon-btn ${T.totp_enabled?"":"is-faded"}`,onClick:()=>w(T),disabled:!T.totp_enabled,title:e==="zh-TW"?"清除 2FA":"Clear 2FA",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"}),r.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>_(T),title:T.enabled?e==="zh-TW"?"停用":"Disable":e==="zh-TW"?"啟用":"Enable",children:T.enabled?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("polyline",{points:"9 12 11 14 15 10"})]})}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>M(T),title:e==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"})]})})]})]},T.id))})]})}),d&&r.jsx(Ty,{user:d,onClose:()=>{h(null),m()}}),r.jsx("style",{children:`
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
      `})]})}function Ty({user:e,onClose:t}){const{language:n}=$e(),a=Kr(),[s,o]=p.useState(!1),[i,c]=p.useState("*"),[l,d]=p.useState("viewer"),[h,g]=p.useState("*"),u=async()=>{o(!0);try{const b=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:i,role:l,vm_pattern:h})});if(!b.ok)throw new Error(`HTTP ${b.status}: ${await b.text()}`);t()}catch(b){await a.alert(`${b}`)}finally{o(!1)}},x=async b=>{o(!0);try{const j=new URLSearchParams({cluster_id:b.cluster_id,vm_pattern:b.vm_pattern}).toString(),y=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles?${j}`,{method:"DELETE",credentials:"same-origin"});if(!y.ok)throw new Error(`HTTP ${y.status}`);t()}catch(j){await a.alert(`${j}`)}finally{o(!1)}};return r.jsxs("div",{className:"ua-drawer-overlay",onClick:()=>!s&&t(),children:[r.jsxs("div",{className:"ua-drawer",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"ua-drawer-head",children:[r.jsxs("span",{children:[n==="zh-TW"?"管理角色":"Manage roles",": "]}),r.jsx("code",{children:e.username}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>!s&&t(),children:"×"})]}),r.jsxs("div",{className:"ua-drawer-body",children:[r.jsxs("div",{className:"ua-existing",children:[r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"現有授權":"Current grants"}),e.roles.length===0?r.jsx("div",{className:"muted",children:n==="zh-TW"?"無":"None"}):e.roles.map((b,j)=>r.jsxs("div",{className:"ua-grant-row",children:[r.jsx("span",{className:`ua-role role-${b.role}`,children:b.role}),r.jsxs("code",{className:"ua-grant-scope",children:["@",b.cluster_id,b.vm_pattern!=="*"&&` :${b.vm_pattern}`]}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>x(b),disabled:s,title:"Revoke",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"})]})})]},j))]}),r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"新增授權":"Add grant"}),r.jsxs("div",{className:"ua-grant-form",children:[r.jsx("label",{children:n==="zh-TW"?"叢集 ID（* = 全部）":"Cluster ID (* = all)"}),r.jsx("input",{type:"text",value:i,onChange:b=>c(b.target.value)}),r.jsx("label",{children:n==="zh-TW"?"角色":"Role"}),r.jsxs("select",{value:l,onChange:b=>d(b.target.value),children:[r.jsx("option",{value:"viewer",children:"viewer"}),r.jsx("option",{value:"operator",children:"operator"}),r.jsx("option",{value:"admin",children:"admin"})]}),r.jsx("label",{children:n==="zh-TW"?"VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）":"VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)"}),r.jsx("input",{type:"text",value:h,onChange:b=>g(b.target.value)}),r.jsx("button",{className:"ua-btn primary",disabled:s,onClick:u,children:s?"…":n==="zh-TW"?"授權":"Grant"})]})]})]}),r.jsx("style",{children:`
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
      `})]})}const Py={0:"crit",1:"crit",2:"crit",3:"err",4:"warn",5:"notice",6:"info",7:"debug"},Ry=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`};function Iy({open:e,onClose:t,clusterId:n}){const{t:a}=$e(),[s,o]=p.useState([]),[i,c]=p.useState(!1),[l,d]=p.useState(null),[h,g]=p.useState(""),[u,x]=p.useState(!0),b=p.useRef(null),j=async()=>{if(n){c(!0),d(null);try{const f=await fetch(`/api/clusters/${encodeURIComponent(n)}/log?max=500`,{credentials:"same-origin"});if(!f.ok){const k=await f.json().catch(()=>({}));throw new Error(k.error||`HTTP ${f.status}`)}const v=await f.json();o(v.lines||[])}catch(f){d(f.message||String(f))}finally{c(!1)}}};p.useEffect(()=>{e&&j()},[e,n]),p.useEffect(()=>{if(!e||!u)return;const f=setInterval(j,5e3);return()=>clearInterval(f)},[e,u,n]);const y=h.trim().toLowerCase(),m=y?s.filter(f=>(f.msg||"").toLowerCase().includes(y)||(f.node||"").toLowerCase().includes(y)||(f.user||"").toLowerCase().includes(y)||(f.tag||"").toLowerCase().includes(y)):s;return e?r.jsx("div",{className:"cl-back",onClick:t,children:r.jsxs("div",{className:"cl-modal",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"cl-head",children:[r.jsxs("div",{className:"cl-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"}),r.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),r.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),r.jsx("span",{children:a("clog.title")})]}),r.jsxs("div",{className:"cl-actions",children:[r.jsx("input",{className:"cl-filter",value:h,onChange:f=>g(f.target.value),placeholder:a("clog.filter_ph")}),r.jsxs("label",{className:"cl-auto",children:[r.jsx("input",{type:"checkbox",checked:u,onChange:f=>x(f.target.checked)}),a("tasks.auto_refresh")]}),r.jsxs("button",{className:"cl-btn",onClick:j,disabled:i,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:a("tasks.refresh")})]}),r.jsx("button",{className:"cl-close",onClick:t,children:"×"})]})]}),r.jsx("div",{className:"cl-meta",children:r.jsxs("span",{children:[m.length,h&&` / ${s.length}`]})}),r.jsxs("div",{className:"cl-body",ref:b,children:[l&&r.jsx("div",{className:"cl-error",children:l}),m.length===0&&!i&&r.jsx("div",{className:"cl-empty",children:a(h?"clog.no_match":"clog.empty")}),m.map((f,v)=>r.jsxs("div",{className:`cl-row cl-pri-${Py[f.pri??6]||"info"}`,children:[r.jsx("span",{className:"cl-time",children:Ry(f.time)}),r.jsx("span",{className:"cl-node",children:f.node||"—"}),r.jsx("span",{className:"cl-user",children:f.user||""}),r.jsx("span",{className:"cl-tag",children:f.tag||""}),r.jsx("span",{className:"cl-msg",children:f.msg||""})]},f.n??v))]}),r.jsx("style",{children:`
          .cl-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cl-modal { width: min(1200px, 96vw); height: 80vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cl-in .18s ease-out; overflow: hidden; }
          @keyframes cl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cl-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cl-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cl-actions { display: flex; align-items: center; gap: 8px; }
          .cl-filter { padding: 5px 10px; min-width: 220px; font-family: var(--font-mono); font-size: 12px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .cl-filter:focus { border-color: var(--primary); }
          .cl-auto { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .cl-auto input { accent-color: var(--primary); }
          .cl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .cl-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .cl-btn:disabled { opacity: .5; cursor: not-allowed; }
          .cl-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cl-close:hover { color: var(--primary); }
          .cl-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.08); }

          .cl-body { flex: 1; overflow: auto; padding: 6px 12px; font-family: var(--font-mono); font-size: 12px; }
          .cl-empty { padding: 40px 12px; text-align: center; color: var(--text-muted); font-style: italic; }
          .cl-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); border-radius: 2px; }

          .cl-row { display: grid; grid-template-columns: 90px 90px 130px 130px 1fr; gap: 10px; padding: 3px 8px; border-bottom: 1px solid rgba(0,240,255,.04); white-space: pre; }
          .cl-row:hover { background: rgba(0, 240, 255, 0.05); }
          .cl-time { color: var(--text-secondary); }
          .cl-node { color: var(--accent); }
          .cl-user { color: var(--primary); }
          .cl-tag  { color: var(--text-secondary); opacity: .85; }
          .cl-msg  { color: var(--text-primary); white-space: pre-wrap; word-break: break-all; }
          .cl-pri-crit  .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-err   .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-warn  .cl-msg { color: var(--warning); }
          .cl-pri-notice .cl-msg, .cl-pri-info .cl-msg { color: var(--text-primary); }
          .cl-pri-debug .cl-msg { color: var(--text-muted); }
        `})]})}):null}const Ly={running:"tasks.filter.running",ok:"tasks.filter.ok",error:"tasks.filter.error"},Gf=(e,t)=>{if(!e)return"—";const a=(t??Math.floor(Date.now()/1e3))-e;if(a<0)return"—";if(a<60)return`${a}s`;if(a<3600)return`${Math.floor(a/60)}m ${a%60}s`;const s=Math.floor(a/3600),o=Math.floor(a%3600/60);return`${s}h ${o}m`},Kf=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`},Ay=()=>{if(typeof window>"u")return{vmid:"",cluster:null};const e=new URLSearchParams(window.location.search);return{vmid:e.get("vmid")||"",cluster:e.get("cluster")}};function Oy({clusters:e,selectedCluster:t}){const{t:n,language:a}=$e(),s=Kr(),o=p.useRef(Ay()),i=p.useMemo(()=>Object.keys(e),[e]),[c,l]=p.useState(()=>o.current.cluster&&e[o.current.cluster]?o.current.cluster:t&&t!=="__all__"&&e[t]?t:i[0]||"");p.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==c&&l(t)},[t]);const[d,h]=p.useState(""),[g,u]=p.useState("all"),[x,b]=p.useState(o.current.vmid),[j,y]=p.useState(""),[m,f]=p.useState([]),[v,k]=p.useState([]),[w,_]=p.useState([]),[M,z]=p.useState(!1),[O,P]=p.useState(null),[T,R]=p.useState(!0),[te,W]=p.useState(null),[L,q]=p.useState(!1),I=p.useRef(new Set),U=p.useRef(new Map),V=p.useRef(!0),[Q,K]=p.useState(new Set),[C,Ne]=p.useState(new Set),_e=p.useCallback(async(G=!1)=>{if(!c)return;z(!0),P(null);const de=new URLSearchParams;d&&de.set("type",d),g!=="all"&&de.set("status",g),x&&de.set("vmid",x),j&&de.set("user",j),de.set("limit","300"),G&&de.set("force","1");try{const me=await fetch(`/api/clusters/${encodeURIComponent(c)}/tasks?`+de.toString(),{credentials:"same-origin"});if(!me.ok){const H=await me.json().catch(()=>({}));throw new Error(H.error||`HTTP ${me.status}`)}const Z=await me.json(),se=Z.tasks||[],F=new Set,S=new Set;if(!V.current)for(const H of se)if(!I.current.has(H.upid))F.add(H.upid);else{const oe=U.current.get(H.upid);oe&&oe!==H._status&&S.add(H.upid)}for(const H of se)I.current.add(H.upid),U.current.set(H.upid,H._status);I.current.size>5e3&&(I.current=new Set(se.map(H=>H.upid)),U.current=new Map(se.map(H=>[H.upid,H._status]))),V.current=!1,f(se),k(Z.types||[]),_(Z.users||[]),F.size>0&&(K(F),setTimeout(()=>K(new Set),900)),S.size>0&&(Ne(S),setTimeout(()=>Ne(new Set),900))}catch(me){P(me.message||String(me))}finally{z(!1)}},[c,d,g,x,j]);p.useEffect(()=>{_e(!1)},[_e]),p.useEffect(()=>{if(!T)return;const G=setInterval(()=>_e(!0),5e3);return()=>clearInterval(G)},[T,_e]);const Ke=p.useMemo(()=>m.filter(G=>G._status==="running").length,[m]);return r.jsxs("div",{className:"pt-page",children:[r.jsxs("div",{className:"pt-header",children:[r.jsxs("div",{className:"pt-title-section",children:[r.jsxs("h1",{className:"pt-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),n("tasks.title")]}),r.jsx("div",{className:"pt-sub",children:n("tasks.subtitle")})]}),r.jsxs("div",{className:"pt-actions",children:[r.jsxs("label",{className:"pt-auto",children:[r.jsx("input",{type:"checkbox",checked:T,onChange:G=>R(G.target.checked)}),n("tasks.auto_refresh")]}),r.jsxs("button",{className:"pt-btn",onClick:()=>{const G=["starttime","endtime","duration_s","type","id","node","user","status","upid"],de=m.map(H=>[H.starttime?new Date(H.starttime*1e3).toISOString():"",H.endtime?new Date(H.endtime*1e3).toISOString():"",H.starttime&&H.endtime?String(H.endtime-H.starttime):"",H.type||"",H.id||"",H.node||"",H.user||"",H._status,H.upid]),me=H=>/[",\n]/.test(H)?'"'+H.replace(/"/g,'""')+'"':H,Z=[G.join(","),...de.map(H=>H.map(me).join(","))].join(`
`),se=new Blob([Z],{type:"text/csv;charset=utf-8"}),F=document.createElement("a");F.href=URL.createObjectURL(se);const S=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);F.download=`pve-tasks-${c}-${S}.csv`,document.body.appendChild(F),F.click(),F.remove(),setTimeout(()=>URL.revokeObjectURL(F.href),1e3)},disabled:m.length===0,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{children:"CSV"})]}),r.jsxs("button",{className:"pt-btn",onClick:()=>q(!0),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"}),r.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),r.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),r.jsx("span",{children:n("clog.button")})]}),r.jsxs("button",{className:"pt-btn",onClick:()=>_e(!0),disabled:M,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})]})]}),r.jsx(Iy,{open:L,clusterId:c,onClose:()=>q(!1)}),r.jsxs("div",{className:"pt-filters",children:[r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:c,onChange:G=>l(G.target.value),children:i.map(G=>{var de;return r.jsx("option",{value:G,children:((de=e[G])==null?void 0:de.name)||G},G)})})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.type")}),r.jsxs("select",{value:d,onChange:G=>h(G.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),v.map(G=>r.jsx("option",{value:G,children:G},G))]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.status")}),r.jsxs("select",{value:g,onChange:G=>u(G.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"running",children:n("tasks.filter.running")}),r.jsx("option",{value:"ok",children:n("tasks.filter.ok")}),r.jsx("option",{value:"error",children:n("tasks.filter.error")})]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.vmid")}),r.jsx("input",{type:"text",inputMode:"numeric",value:x,onChange:G=>b(G.target.value.replace(/[^\d]/g,"")),placeholder:"e.g. 102"})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.user")}),r.jsxs("select",{value:j,onChange:G=>y(G.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),w.map(G=>r.jsx("option",{value:G,children:G},G))]})]}),r.jsxs("span",{className:"pt-count",children:[m.length," / ",Ke?`${Ke} ${n("tasks.filter.running").toLowerCase()}`:""]})]}),O&&r.jsx("div",{className:"pt-error",children:O}),r.jsx("div",{className:"pt-tablewrap",children:r.jsxs("table",{className:"vm-table pt-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("tasks.col.starttime")}),r.jsx("th",{children:n("tasks.col.duration")}),r.jsx("th",{children:n("tasks.col.type")}),r.jsx("th",{children:n("tasks.col.target")}),r.jsx("th",{children:n("tasks.col.node")}),r.jsx("th",{children:n("tasks.col.user")}),r.jsx("th",{children:n("tasks.col.status")})]})}),r.jsxs("tbody",{children:[m.length===0&&!M&&r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"pt-empty",children:n("tasks.empty")})}),m.map(G=>{const de=[G===te?"pt-active":"",Q.has(G.upid)?"pt-new":""].filter(Boolean).join(" "),me=["pt-st",`pt-st-${G._status}`,C.has(G.upid)?"pt-st-pulse":""].join(" ");return r.jsxs("tr",{className:de,onClick:()=>W(G),children:[r.jsx("td",{className:"pt-mono",children:Kf(G.starttime)}),r.jsx("td",{className:"pt-mono",children:Gf(G.starttime,G.endtime)}),r.jsx("td",{children:r.jsx("span",{className:`pt-type pt-type-${G.type}`,children:G.type})}),r.jsx("td",{className:"pt-mono",children:G.id||"—"}),r.jsx("td",{className:"pt-mono",children:G.node}),r.jsx("td",{className:"pt-mono",children:G.user||"—"}),r.jsx("td",{children:r.jsx("span",{className:me,children:n(Ly[G._status]||"tasks.filter.all")})})]},G.upid)})]})]})}),te&&r.jsx(Fy,{clusterId:c,task:te,onClose:()=>W(null),onCopyUpid:async()=>{try{await navigator.clipboard.writeText(te.upid),s.alert(a==="zh-TW"?"UPID 已複製":"UPID copied")}catch{}}}),r.jsx("style",{children:`
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
      `})]})}function Fy({clusterId:e,task:t,onClose:n,onCopyUpid:a}){const{t:s,language:o}=$e(),[i,c]=p.useState([]),[l,d]=p.useState(!0),[h,g]=p.useState(null),[u,x]=p.useState(null),b=t._status==="running";return p.useEffect(()=>{let j=!0;const y=async()=>{try{d(!0);const f=encodeURIComponent(t.upid),v=encodeURIComponent(t.node),k=encodeURIComponent(e),[w,_]=await Promise.all([fetch(`/api/clusters/${k}/nodes/${v}/tasks/${f}/log?limit=2000`,{credentials:"same-origin"}),fetch(`/api/clusters/${k}/nodes/${v}/tasks/${f}/status`,{credentials:"same-origin"})]);if(!j)return;if(w.ok){const z=((await w.json()).lines||[]).map(O=>O.t||"").filter(Boolean);c(z)}else{const M=await w.json().catch(()=>({}));throw new Error(M.error||`HTTP ${w.status}`)}_.ok&&x(await _.json())}catch(f){j&&g(f.message||String(f))}finally{j&&d(!1)}};y();const m=b?setInterval(y,2500):null;return()=>{j=!1,m&&clearInterval(m)}},[t.upid,t.node,e,b]),r.jsxs("div",{className:"pt-drawer-back",onClick:n,children:[r.jsxs("div",{className:"pt-drawer",onClick:j=>j.stopPropagation(),children:[r.jsxs("div",{className:"pt-drawer-head",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"pt-drawer-title",children:[r.jsx("span",{className:`pt-type pt-type-${t.type}`,children:t.type}),r.jsx("span",{className:"pt-mono",children:t.id||""}),r.jsx("span",{className:`pt-st pt-st-${t._status}`,children:t._status})]}),r.jsxs("div",{className:"pt-drawer-sub",children:[r.jsx("code",{className:"pt-upid",children:t.upid}),r.jsx("button",{className:"pt-btn",onClick:a,children:r.jsx("span",{children:s("tasks.copy_upid")})})]})]}),r.jsx("button",{className:"pt-drawer-close",onClick:n,"aria-label":"close",children:"×"})]}),r.jsxs("div",{className:"pt-drawer-meta",children:[r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.node")})," ",t.node]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.user")})," ",t.user||"—"]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.starttime")})," ",Kf(t.starttime)]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.duration")})," ",Gf(t.starttime,t.endtime)]})]}),r.jsxs("div",{className:"pt-drawer-log",children:[l&&i.length===0&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_loading")}),h&&r.jsx("div",{className:"pt-error",children:h}),i.length===0&&!l&&!h&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_empty")}),i.length>0&&r.jsx("pre",{children:i.join(`
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
      `})]})}const Vp={critical:0,warning:1,info:2,ok:3};function Dy({clusters:e,onNavigate:t}){const{t:n,language:a}=$e(),[s,o]=p.useState({}),[i,c]=p.useState([]),[l,d]=p.useState([]),[h,g]=p.useState(0),u=p.useCallback(async()=>{const y={},m=[],f=[],v=[];for(const[k,w]of Object.entries(e)){const _=w.name||k;v.push((async()=>{try{const M=await fetch(`/api/clusters/${encodeURIComponent(k)}/tasks?status=error&limit=200`,{credentials:"same-origin"});if(M.ok){const z=await M.json(),O=Math.floor(Date.now()/1e3)-86400;y[k]=(z.tasks||[]).filter(P=>(P.starttime||0)>O).length}}catch{}})());for(const M of Object.keys(w.nodes||{}))v.push((async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(k)}/nodes/${encodeURIComponent(M)}/certificates`,{credentials:"same-origin"});if(z.ok){const P=(await z.json()).certificates||[];let T=null;for(const R of P){const te=R.notafter||R["notafter-formatted"];if(!te)continue;const W=typeof te=="number"?te:Date.parse(String(te))/1e3;!W||isNaN(W)||(!T||W<T.ts)&&(T={ts:W,subj:R.subject||R.filename||"cert"})}if(T){const R=Math.floor((T.ts-Date.now()/1e3)/86400);R<90&&m.push({cluster:_,clusterId:k,node:M,days:R,subject:T.subj})}}}catch{}})()),v.push((async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(k)}/nodes/${encodeURIComponent(M)}/updates`,{credentials:"same-origin"});if(z.ok){const O=await z.json();(O.count??0)>0&&f.push({cluster:_,clusterId:k,node:M,count:O.count})}}catch{}})())}await Promise.all(v),o(y),c(m),d(f),g(Date.now())},[e]);p.useEffect(()=>{u()},[u]),p.useEffect(()=>{const y=setInterval(u,6e4);return()=>clearInterval(y)},[u]);const x=p.useMemo(()=>{var m,f,v;const y=[];for(const[k,w]of Object.entries(e)){const _=w.name||k;for(const[O,P]of Object.entries(w.nodes||{})){const T=P;T.status&&T.status!=="online"&&y.push({sev:"critical",cluster:_,target:`node:${O}`,category:n("health.cat.node_down"),msg:a==="zh-TW"?`${O} 狀態 ${T.status}`:`${O} is ${T.status}`,navView:"cluster-core",navParams:{cluster:k}});const R=((m=T.cpu)==null?void 0:m.usage_percent)||0,te=((f=T.memory)==null?void 0:f.usage_percent)||0;R>92&&y.push({sev:"warning",cluster:_,target:`node:${O}`,category:n("health.cat.high_cpu"),msg:`${O} CPU ${R.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:k}}),te>92&&y.push({sev:"warning",cluster:_,target:`node:${O}`,category:n("health.cat.high_mem"),msg:`${O} ${a==="zh-TW"?"記憶體":"memory"} ${te.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:k}})}for(const[O,P]of Object.entries(w.storages||{})){const T=P,R=T.usage_percent??T.used_pct??0;R>=95?y.push({sev:"critical",cluster:_,target:`storage:${O}`,category:n("health.cat.storage_full"),msg:`${T.storage||O} ${R.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:k}}):R>=85&&y.push({sev:"warning",cluster:_,target:`storage:${O}`,category:n("health.cat.storage_high"),msg:`${T.storage||O} ${R.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:k}})}const M=w.ceph;if(M){const O=(M.status||((v=M.health)==null?void 0:v.status)||"").toUpperCase();O.includes("ERR")?y.push({sev:"critical",cluster:_,target:"ceph",category:n("health.cat.ceph_err"),msg:O,navView:"ceph-constellation",navParams:{cluster:k}}):O.includes("WARN")&&y.push({sev:"warning",cluster:_,target:"ceph",category:n("health.cat.ceph_warn"),msg:O,navView:"ceph-constellation",navParams:{cluster:k}})}const z=s[k]||0;z>0&&y.push({sev:z>=10?"warning":"info",cluster:_,target:"tasks",category:n("health.cat.task_failures"),msg:a==="zh-TW"?`過去 24h 共 ${z} 筆作業失敗`:`${z} task error(s) in the last 24h`,navView:"tasks",navParams:{cluster:k}})}for(const k of i){let w="info";if(k.days<0)w="critical";else if(k.days<14)w="critical";else if(k.days<30)w="warning";else if(k.days<60)w="info";else continue;y.push({sev:w,cluster:k.cluster,target:`cert:${k.node}`,category:k.days<0?n("health.cat.cert_expired"):n("health.cat.cert_expiring"),msg:a==="zh-TW"?`${k.node}: ${k.subject} (${k.days<0?`已過期 ${Math.abs(k.days)} 天`:`${k.days} 天`})`:`${k.node}: ${k.subject} (${k.days<0?`expired ${Math.abs(k.days)}d ago`:`${k.days}d`})`,navView:"cluster-core",navParams:{cluster:k.clusterId}})}for(const k of l)y.push({sev:k.count>=50?"warning":"info",cluster:k.cluster,target:`updates:${k.node}`,category:n("health.cat.updates"),msg:a==="zh-TW"?`${k.node}: ${k.count} 個套件待更新`:`${k.node}: ${k.count} package update(s) pending`,navView:"cluster-core",navParams:{cluster:k.clusterId}});return y.sort((k,w)=>Vp[k.sev]-Vp[w.sev]),y},[e,s,i,l,a,n]),b=p.useMemo(()=>{const y={critical:0,warning:0,info:0,ok:0};for(const m of x)y[m.sev]++;return y},[x]),j=p.useMemo(()=>{let y=0,m=0,f=0,v=0,k=0,w=0,_=0;for(const M of Object.values(e)){for(const z of Object.values(M.nodes||{}))y++,z.status==="online"&&m++;for(const z of Object.values(M.vms||{}))z.type==="lxc"?(k++,z.status==="running"&&w++):(f++,z.status==="running"&&v++);_+=Object.keys(M.storages||{}).length}return{nodes:y,online:m,vms:f,running:v,cts:k,ctsRunning:w,storages:_}},[e]);return r.jsxs("div",{className:"hm-page",children:[r.jsxs("div",{className:"hm-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"hm-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),n("health.title")]}),r.jsxs("div",{className:"hm-sub",children:[n("health.subtitle"),h?` · ${n("health.updated")} ${new Date(h).toLocaleTimeString()}`:""]})]}),r.jsxs("div",{className:"hm-tally",children:[r.jsxs("span",{className:"hm-pill hm-pill-critical",children:[b.critical," ",n("health.sev.critical")]}),r.jsxs("span",{className:"hm-pill hm-pill-warning",children:[b.warning," ",n("health.sev.warning")]}),r.jsxs("span",{className:"hm-pill hm-pill-info",children:[b.info," ",n("health.sev.info")]})]})]}),r.jsxs("div",{className:"hm-stats",children:[r.jsxs("div",{className:"hm-stat",onClick:()=>t("cluster-core"),children:[r.jsxs("div",{className:"hm-stat-num",children:[j.online,r.jsxs("span",{className:"hm-stat-of",children:["/",j.nodes]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.nodes")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[j.running,r.jsxs("span",{className:"hm-stat-of",children:["/",j.vms]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.vms")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[j.ctsRunning,r.jsxs("span",{className:"hm-stat-of",children:["/",j.cts]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.cts")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("storage"),children:[r.jsx("div",{className:"hm-stat-num",children:j.storages}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.storages")})]})]}),x.length===0?r.jsxs("div",{className:"hm-empty",children:[r.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),r.jsx("div",{className:"hm-empty-title",children:n("health.empty.title")}),r.jsx("div",{className:"hm-empty-sub",children:n("health.empty.sub")})]}):r.jsx("div",{className:"hm-grid",children:x.map((y,m)=>r.jsxs("div",{className:`hm-card hm-card-${y.sev}`,onClick:()=>{var f;return y.navView&&t(y.navView,{cluster:(f=y.navParams)==null?void 0:f.cluster})},children:[r.jsxs("div",{className:"hm-card-head",children:[r.jsx("span",{className:"hm-card-sev",children:y.sev.toUpperCase()}),r.jsx("span",{className:"hm-card-cluster",children:y.cluster})]}),r.jsx("div",{className:"hm-card-cat",children:y.category}),r.jsx("div",{className:"hm-card-msg",children:y.msg})]},m))}),r.jsx("style",{children:`
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
      `})]})}const By=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`};function Wy({clusters:e,selectedCluster:t}){const{t:n,language:a}=$e(),s=p.useMemo(()=>Object.keys(e),[e]),[o,i]=p.useState(()=>t&&t!=="__all__"&&e[t]?t:s[0]||"");p.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==o&&i(t)},[t]);const[c,l]=p.useState([]),[d,h]=p.useState(!1),[g,u]=p.useState(null),[x,b]=p.useState("all"),j=p.useCallback(async(m=!1)=>{if(o){h(!0),u(null);try{const f=await fetch(`/api/clusters/${encodeURIComponent(o)}/backup-jobs${m?"?force=1":""}`,{credentials:"same-origin"});if(!f.ok){const k=await f.json().catch(()=>({}));throw new Error(k.error||`HTTP ${f.status}`)}const v=await f.json();l(v.jobs||[])}catch(f){u(f.message||String(f))}finally{h(!1)}}},[o]);p.useEffect(()=>{j(!1)},[j]);const y=p.useMemo(()=>x==="all"?c:c.filter(m=>x==="enabled"?m.enabled:!m.enabled),[c,x]);return r.jsxs("div",{className:"bj-page",children:[r.jsxs("div",{className:"bj-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"bj-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),n("bjobs.title")]}),r.jsx("div",{className:"bj-sub",children:n("bjobs.subtitle")})]}),r.jsx("div",{className:"bj-actions",children:r.jsxs("button",{className:"bj-btn",onClick:()=>j(!0),disabled:d,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})})]}),r.jsxs("div",{className:"bj-filters",children:[r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:o,onChange:m=>i(m.target.value),children:s.map(m=>{var f;return r.jsx("option",{value:m,children:((f=e[m])==null?void 0:f.name)||m},m)})})]}),r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("bjobs.filter.enabled")}),r.jsxs("select",{value:x,onChange:m=>b(m.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"enabled",children:n("bjobs.enabled_yes")}),r.jsx("option",{value:"disabled",children:n("bjobs.enabled_no")})]})]}),r.jsxs("span",{className:"bj-count",children:[y.length," / ",c.length]})]}),g&&r.jsx("div",{className:"bj-error",children:g}),r.jsx("div",{className:"bj-tablewrap",children:r.jsxs("table",{className:"vm-table bj-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("bjobs.col.id")}),r.jsx("th",{children:n("bjobs.col.schedule")}),r.jsx("th",{children:n("bjobs.col.next_run")}),r.jsx("th",{children:n("bjobs.col.storage")}),r.jsx("th",{children:n("bjobs.col.scope")}),r.jsx("th",{children:n("bjobs.col.mode")}),r.jsx("th",{children:n("bjobs.col.enabled")}),r.jsx("th",{children:n("bjobs.col.comment")})]})}),r.jsxs("tbody",{children:[y.length===0&&!d&&r.jsx("tr",{children:r.jsx("td",{colSpan:8,className:"bj-empty",children:n("bjobs.empty")})}),y.map(m=>{const f=m.all?n("bjobs.scope_all"):m.pool?`${a==="zh-TW"?"池":"pool"}: ${m.pool}`:m.vmid?`vmid: ${m.vmid}`:"—",v=m.schedule||(m.dow&&m.starttime?`${m.dow} ${m.starttime}`:"—");return r.jsxs("tr",{children:[r.jsx("td",{className:"bj-mono",children:m.id}),r.jsx("td",{className:"bj-mono",children:v}),r.jsx("td",{className:"bj-mono",children:By(m.next_run)}),r.jsx("td",{className:"bj-mono",children:m.storage||"—"}),r.jsx("td",{className:"bj-mono",children:f}),r.jsx("td",{children:r.jsx("span",{className:"bj-mode",children:m.mode||"snapshot"})}),r.jsx("td",{children:r.jsx("span",{className:`bj-state ${m.enabled?"on":"off"}`,children:m.enabled?n("bjobs.enabled_yes"):n("bjobs.enabled_no")})}),r.jsx("td",{className:"bj-mono bj-comment",title:m.comment||"",children:m.comment||""})]},m.id)})]})]})}),r.jsx("style",{children:`
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
      `})]})}function Uy({clusters:e,onNavigate:t}){const{t:n,language:a}=$e(),[s,o]=p.useState(!1),[i,c]=p.useState(""),[l,d]=p.useState(0),h=p.useRef(null),g=p.useRef(null);p.useEffect(()=>{const y=m=>{if((m.metaKey||m.ctrlKey)&&m.key.toLowerCase()==="k"){m.preventDefault(),o(f=>!f);return}m.key==="Escape"&&s&&o(!1)};return window.addEventListener("keydown",y),()=>window.removeEventListener("keydown",y)},[s]),p.useEffect(()=>{s?setTimeout(()=>{var y;return(y=h.current)==null?void 0:y.focus()},30):(c(""),d(0))},[s]);const u=(y,m)=>{if(!m)return 0;const f=y.toLowerCase(),v=m.toLowerCase();if(f===v)return 100;if(f.startsWith(v))return 80;if(f.indexOf(" "+v)>=0)return 70;const w=f.indexOf(v);return w>=0?50-Math.min(20,w):0},x=p.useMemo(()=>{const y=i.trim();if(!y)return[];const m=[];for(const[f,v]of Object.entries(e)){const k=v.name||f;for(const w of Object.values(v.vms||{})){const _=w.type==="lxc",M=`${w.vmid} ${w.name||""} ${w.node||""} ${k}`,z=Math.max(u(String(w.vmid),y),u(w.name||"",y),u(M,y));z>0&&m.push({kind:_?"ct":"vm",cluster:f,clusterName:k,name:`${_?"CT":"VM"} ${w.vmid} — ${w.name||"(unnamed)"}`,meta:`${k} · ${w.node||"?"} · ${w.status||"unknown"}`,score:z+(w.status==="running"?2:0),go:()=>{t("holo-matrix",{cluster:f})}})}for(const w of Object.values(v.nodes||{})){const _=Math.max(u(w.node||"",y),u(`${w.node} ${k}`,y));_>0&&m.push({kind:"node",cluster:f,clusterName:k,name:w.node,meta:`${k} · ${w.status||"?"} · ${w.vm_count||0}+${w.ct_count||0}`,score:_,go:()=>t("cluster-core",{cluster:f})})}for(const w of Object.values(v.storages||{})){const _=Math.max(u(w.storage||"",y),u(`${w.storage} ${w.node||""} ${k}`,y));_>0&&m.push({kind:"storage",cluster:f,clusterName:k,name:w.storage,meta:`${k} · ${w.node||"?"} · ${w.type||""}`,score:_,go:()=>t("storage",{cluster:f})})}}return m.sort((f,v)=>v.score-f.score),m.slice(0,30)},[i,e,t]);if(p.useEffect(()=>{d(0)},[i]),p.useEffect(()=>{const y=g.current;if(!y)return;const m=y.querySelector(`[data-idx="${l}"]`);m==null||m.scrollIntoView({block:"nearest"})},[l]),!s)return null;const b=y=>{if(y.key==="ArrowDown")y.preventDefault(),d(m=>Math.min(x.length-1,m+1));else if(y.key==="ArrowUp")y.preventDefault(),d(m=>Math.max(0,m-1));else if(y.key==="Enter"){y.preventDefault();const m=x[l];m&&(m.go(),o(!1))}},j=y=>y==="vm"||y==="ct"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),r.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}):y==="node"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]});return r.jsx("div",{className:"cp-back",onClick:()=>o(!1),children:r.jsxs("div",{className:"cp-modal",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"cp-input-row",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{ref:h,value:i,placeholder:n("cmdk.placeholder"),onChange:y=>c(y.target.value),onKeyDown:b}),r.jsx("span",{className:"cp-hint",children:"↑↓ ⏎"}),r.jsx("button",{className:"cp-x",onClick:()=>o(!1),children:"×"})]}),r.jsxs("div",{className:"cp-list",ref:g,children:[x.length===0&&i&&r.jsx("div",{className:"cp-empty",children:n("cmdk.empty")}),x.length===0&&!i&&r.jsx("div",{className:"cp-empty",children:n("cmdk.tip")}),x.map((y,m)=>r.jsxs("div",{"data-idx":m,className:`cp-item ${m===l?"cp-active":""}`,onClick:()=>{y.go(),o(!1)},onMouseEnter:()=>d(m),children:[r.jsx("span",{className:`cp-kind cp-kind-${y.kind}`,children:j(y.kind)}),r.jsx("span",{className:"cp-name",children:y.name}),r.jsx("span",{className:"cp-meta",children:y.meta})]},`${y.kind}:${y.cluster}:${y.name}:${m}`))]}),r.jsxs("div",{className:"cp-foot",children:[r.jsx("span",{className:"cp-foot-key",children:"⌘K"}),r.jsx("span",{children:n("cmdk.toggle")})]}),r.jsx("style",{children:`
          .cp-back { position: fixed; inset: 0; background: rgba(2,4,10,.55); display: flex; justify-content: center; align-items: flex-start; padding-top: 12vh; z-index: 12000; animation: cp-fade .12s ease-out; }
          @keyframes cp-fade { from { opacity: 0; } to { opacity: 1; } }
          .cp-modal { width: min(720px, 92vw); display: flex; flex-direction: column; max-height: 70vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 12px 48px rgba(0,240,255,0.3); animation: cp-in .15s ease-out; overflow: hidden; }
          @keyframes cp-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
          .cp-input-row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.16); color: var(--primary); }
          .cp-input-row svg { stroke: var(--primary); }
          .cp-input-row input { flex: 1; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 16px; }
          .cp-input-row input::placeholder { color: var(--text-muted); }
          .cp-hint { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
          .cp-x { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; line-height: 1; cursor: pointer; padding: 0 6px; }
          .cp-x:hover { color: var(--primary); }

          .cp-list { flex: 1; overflow: auto; padding: 6px 0; }
          .cp-item { display: grid; grid-template-columns: 24px 1fr auto; gap: 10px; align-items: center; padding: 7px 18px; cursor: pointer; transition: background .08s; }
          .cp-item:hover, .cp-item.cp-active { background: rgba(0, 240, 255, 0.10); }
          .cp-active { box-shadow: inset 3px 0 0 var(--primary); }
          .cp-kind { display: inline-flex; align-items: center; justify-content: center; }
          .cp-kind-vm { color: var(--primary); }
          .cp-kind-ct { color: var(--accent); }
          .cp-kind-node { color: var(--success); }
          .cp-kind-storage { color: var(--warning); }
          .cp-name { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .cp-meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }
          .cp-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-style: italic; font-family: var(--font-mono); font-size: 13px; }

          .cp-foot { padding: 7px 14px; background: rgba(0,240,255,.04); border-top: 1px solid rgba(0,240,255,.1); font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); display: flex; gap: 8px; align-items: center; }
          .cp-foot-key { display: inline-block; padding: 1px 6px; border: 1px solid rgba(0,240,255,.4); border-radius: 3px; color: var(--primary); }
        `})]})})}function Vy({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:c}){const{t:l}=$e(),[d,h]=p.useState(""),[g,u]=p.useState(!1),[x,b]=p.useState(""),j=p.useRef(null);if(p.useEffect(()=>{e&&(h(""),b(""),u(!1),setTimeout(()=>{var m;return(m=j.current)==null?void 0:m.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const m=f=>{f.key==="Escape"&&!g&&i()};return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[e,g,i]),!e)return null;const y=async()=>{if(d){u(!0),b("");try{await Be.setClusterSecret(t,n,d),c()}catch(m){b(m instanceof Error?m.message:String(m)),u(!1)}}};return r.jsxs("div",{onClick:()=>!g&&i(),style:Hy,children:[r.jsx("style",{children:Yy}),r.jsxs("div",{className:"ssm-modal",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:j,type:"password",value:d,onChange:m=>h(m.target.value),onKeyDown:m=>{m.key==="Enter"&&y()},autoComplete:"new-password",spellCheck:!1}),x&&r.jsx("div",{className:"ssm-err",children:x}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:g,children:l("action.cancel")}),r.jsx("button",{className:"primary",onClick:y,disabled:g||!d,children:g?"…":l("action.save")})]})]})]})}const Hy={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},Yy=`
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
`;function Gy({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=$e(),o=Kr(),[i,c]=p.useState(null),[l,d]=p.useState(!0),[h,g]=p.useState(!1),[u,x]=p.useState(null),[b,j]=p.useState(!1),[y,m]=p.useState("ui"),[f,v]=p.useState(!0),[k,w]=p.useState("cyberpunk"),[_,M]=p.useState("command-center"),[z,O]=p.useState(100),[P,T]=p.useState("all"),[R,te]=p.useState(85),[W,L]=p.useState("vmid"),[q,I]=p.useState("node"),[U,V]=p.useState("node"),[Q,K]=p.useState("asc"),[C,Ne]=p.useState({}),[_e,Ke]=p.useState(!0),[G,de]=p.useState(80),[me,Z]=p.useState(95),[se,F]=p.useState(85),[S,H]=p.useState(95),[oe,ye]=p.useState(80),[B,ie]=p.useState(95),[he,pe]=p.useState(50),[we,Ie]=p.useState(100),[tt,Ve]=p.useState(5),[He,ge]=p.useState(10),[ve,Oe]=p.useState("0.0.0.0"),[Y,ne]=p.useState(8098),[le,ke]=p.useState(!1),[Me,Le]=p.useState(8086),[Fe,kt]=p.useState("disabled"),[ue,We]=p.useState(null),[Ye,Je]=p.useState({}),at=()=>{j(!0),setTimeout(()=>e(),400)};p.useEffect(()=>{sr()},[]);const sr=async()=>{var X,Ze,Xe,ct,yt,ht,vt,Bn,Wn,Tr,Xr,Jt,qr,Qr,ur,Un,dt,Jr,wn,Pr,ze,je,Ae,gt,pt,Ut,st,ot,Rr,Lt,At,kn,Ct,Ir,Vn;try{d(!0);const Ce=await Be.getConfig();c(Ce),v(((X=Ce.ui)==null?void 0:X.animations_enabled)??!0),w(((Ze=Ce.ui)==null?void 0:Ze.theme)??"cyberpunk"),M(((Xe=Ce.ui)==null?void 0:Xe.default_view)??"command-center"),O(((ct=Ce.ui)==null?void 0:ct.particle_count)??100),T(((yt=Ce.ui)==null?void 0:yt.vm_matrix_default_filter)??"all"),te(((ht=Ce.ui)==null?void 0:ht.matrix_card_width)??85),L(((vt=Ce.ui)==null?void 0:vt.matrix_sort_by)??"vmid"),I(((Bn=Ce.ui)==null?void 0:Bn.matrix_group_by)??"node"),V(((Wn=Ce.ui)==null?void 0:Wn.matrix_group_sort_by)??"node"),K(((Tr=Ce.ui)==null?void 0:Tr.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Xr=Ce.ui)==null?void 0:Xr.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Jt=Ce.ui)==null?void 0:Jt.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((qr=Ce.ui)==null?void 0:qr.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((Qr=Ce.ui)==null?void 0:Qr.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((ur=Ce.ui)==null?void 0:ur.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((Un=Ce.ui)==null?void 0:Un.matrix_group_sort_order)??"asc");const jn={};(dt=Ce.clusters)==null||dt.forEach(A=>{jn[A.id]={enabled:A.enabled!==!1,poll_interval:A.poll_interval||5,static_refresh_interval:A.static_refresh_interval||60}}),Ne(jn),Ke(((Jr=Ce.alerts)==null?void 0:Jr.enabled)??!0),de(((wn=Ce.alerts)==null?void 0:wn.cpu_warning)??80),Z(((Pr=Ce.alerts)==null?void 0:Pr.cpu_critical)??95),F(((ze=Ce.alerts)==null?void 0:ze.memory_warning)??85),H(((je=Ce.alerts)==null?void 0:je.memory_critical)??95),ye(((Ae=Ce.alerts)==null?void 0:Ae.disk_warning)??80),ie(((gt=Ce.alerts)==null?void 0:gt.disk_critical)??95),pe(((pt=Ce.alerts)==null?void 0:pt.diskio_warning)??50),Ie(((Ut=Ce.alerts)==null?void 0:Ut.diskio_critical)??100),Ve(((st=Ce.alerts)==null?void 0:st.iowait_warning)??5),ge(((ot=Ce.alerts)==null?void 0:ot.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((Rr=Ce.alerts)==null?void 0:Rr.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((Lt=Ce.alerts)==null?void 0:Lt.iowait_critical)??10)),Oe(((At=Ce.server)==null?void 0:At.host)??"0.0.0.0"),ne(((kn=Ce.server)==null?void 0:kn.http_port)??8098),ke(((Ct=Ce.server)==null?void 0:Ct.influx_enabled)??!1),Le(((Ir=Ce.server)==null?void 0:Ir.influx_port)??8086),kt(((Vn=Ce.console)==null?void 0:Vn.mode)||"disabled");const N={};(Ce.clusters||[]).forEach(A=>{N[A.id]=!!(A.auth&&A.auth.password&&A.auth.password.length>0)}),Je(N)}catch(Ce){x(String(Ce))}finally{d(!1)}},Te=async()=>{var X;try{g(!0),localStorage.setItem("matrix_card_width",String(R)),localStorage.setItem("matrix_sort_by",W),localStorage.setItem("matrix_group_by",q),localStorage.setItem("vm_matrix_default_filter",P),localStorage.setItem("matrix_group_sort_by",U),localStorage.setItem("matrix_group_sort_order",Q),localStorage.setItem("iowait_warning",String(tt)),localStorage.setItem("iowait_critical",String(He));const Ze=(X=i==null?void 0:i.clusters)==null?void 0:X.map(Xe=>{var ct,yt,ht;return{...Xe,enabled:((ct=C[Xe.id])==null?void 0:ct.enabled)!==!1,poll_interval:((yt=C[Xe.id])==null?void 0:yt.poll_interval)||Xe.poll_interval,static_refresh_interval:((ht=C[Xe.id])==null?void 0:ht.static_refresh_interval)||Xe.static_refresh_interval}});await Be.updateConfig({server:{host:ve,http_port:Y,influx_enabled:le,influx_port:Me},console:{mode:Fe},ui:{default_view:_,theme:k,language:a,animations_enabled:f,particle_count:z,vm_matrix_default_filter:P,matrix_card_width:R,matrix_sort_by:W,matrix_group_by:q,matrix_group_sort_by:U,matrix_group_sort_order:Q},alerts:{enabled:_e,cpu_warning:G,cpu_critical:me,memory_warning:se,memory_critical:S,disk_warning:oe,disk_critical:B,diskio_warning:he,diskio_critical:we,iowait_warning:tt,iowait_critical:He},clusters:Ze}),e()}catch(Ze){x(String(Ze))}finally{g(!1)}},Wt=X=>{Ne(Ze=>{var Xe;return{...Ze,[X]:{...Ze[X],enabled:!((Xe=Ze[X])!=null&&Xe.enabled)}}})},It=(X,Ze,Xe)=>{Ne(ct=>({...ct,[X]:{...ct[X],[Ze]:Xe}}))};p.useEffect(()=>{const X=Ze=>{Ze.key==="Escape"&&!b&&at()};return window.addEventListener("keydown",X),()=>window.removeEventListener("keydown",X)},[b]);const jr=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${b?"exiting":""}`,onClick:X=>X.target===X.currentTarget&&!b&&at(),children:[r.jsxs("div",{className:`settings-panel panel ${b?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:at,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:jr.map(X=>r.jsxs("button",{className:`settings-tab ${y===X.id?"active":""}`,onClick:()=>m(X.id),children:[X.icon,r.jsx("span",{children:n(X.labelKey)})]},X.id))}),r.jsx("div",{className:"settings-content",children:l?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):u?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:u})}):r.jsxs(r.Fragment,{children:[y==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(X=>r.jsxs("label",{className:`radio-option ${_===X.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:X.id,checked:_===X.id,onChange:()=>M(X.id)}),r.jsx("span",{className:"radio-label",children:n(X.labelKey)})]},X.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(X=>r.jsxs("label",{className:`radio-option ${P===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:X,checked:P===X,onChange:()=>T(X)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:R,onChange:X=>te(Number(X.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(X=>r.jsxs("label",{className:`radio-option ${W===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:X,checked:W===X,onChange:()=>L(X)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(X=>r.jsxs("label",{className:`radio-option ${q===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:X,checked:q===X,onChange:()=>I(X)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${U==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:U==="node",onChange:()=>V("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${U==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:U==="cluster",onChange:()=>V("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${Q==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:Q==="asc",onChange:()=>K("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${Q==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:Q==="desc",onChange:()=>K("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),y==="clusters"&&i&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:i.clusters.map(X=>{var yt,ht;const Ze=t==null?void 0:t[X.id],Xe=(Ze==null?void 0:Ze.name)||X.name||X.id,ct=C[X.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${ct.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:vt=>vt.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:ct.enabled,onChange:()=>Wt(X.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${ct.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:Xe}),r.jsxs("span",{className:"cluster-id",children:["(",X.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ct.poll_interval,onChange:vt=>It(X.id,"poll_interval",Number(vt.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ct.static_refresh_interval,onChange:vt=>It(X.id,"static_refresh_interval",Number(vt.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((yt=X.nodes)==null?void 0:yt.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((ht=X.auth)==null?void 0:ht.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Ye[X.id]?"set":"unset"}`,children:Ye[X.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>We(X.id),children:Ye[X.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Ye[X.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(n("settings.secret_confirm_clear",{id:X.id}),{destructive:!0}))try{await Be.deleteClusterSecret(X.id,"pve_password"),Je(vt=>({...vt,[X.id]:!1}))}catch(vt){await o.alert(String(vt))}},children:n("settings.secret_clear")})]})]},X.id)})})]})}),y==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:G,onChange:X=>de(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:me,onChange:X=>Z(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:se,onChange:X=>F(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:S,onChange:X=>H(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:oe,onChange:X=>ye(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:B,onChange:X=>ie(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:he,onChange:X=>pe(Number(X.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:we,onChange:X=>Ie(Number(X.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:tt,onChange:X=>Ve(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:He,onChange:X=>ge(Number(X.target.value)),min:0,max:100})]})]})]})]}),y==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:ve,onChange:X=>Oe(X.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:Y,onChange:X=>ne(Number(X.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:le,onChange:X=>ke(X.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(le?"settings.enabled":"settings.disabled")})]}),le&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:Me,onChange:X=>Le(Number(X.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(Da,{className:"full",value:Fe,onChange:kt,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.3.11"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:at,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:Te,disabled:h||b,children:n(h?"action.saving":"action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(Vy,{open:ue!==null,cluster_id:ue||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:ue||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>We(null),onSaved:()=>{ue&&Je(X=>({...X,[ue]:!0})),We(null)}}),r.jsx("style",{children:`
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
      `})]})}const Hp=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function Ky({particleCount:e=18,enabled:t=!0,isPaused:n=!1}){const a=p.useRef(null),s=p.useRef([]),o=p.useRef(),i=p.useRef({x:0,y:0}),c=p.useRef(0),[l,d]=p.useState(()=>typeof document>"u"||document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()));p.useEffect(()=>{const u=()=>{d(document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()))};return document.addEventListener("visibilitychange",u),window.addEventListener("focus",u),window.addEventListener("blur",u),()=>{document.removeEventListener("visibilitychange",u),window.removeEventListener("focus",u),window.removeEventListener("blur",u)}},[]);const h=p.useCallback((u,x)=>{s.current=Array.from({length:e},()=>({x:Math.random()*u,y:Math.random()*x,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:Hp[Math.floor(Math.random()*Hp.length)]}))},[e]),g=p.useCallback(u=>{const x=a.current;if(!x)return;const b=u??performance.now();if(b-c.current<50){o.current=requestAnimationFrame(g);return}c.current=b;const j=x.getContext("2d");if(!j)return;const{width:y,height:m}=x;j.clearRect(0,0,y,m),s.current.forEach(f=>{const v=f.x-i.current.x,k=f.y-i.current.y,w=Math.sqrt(v*v+k*k);if(w<100){const _=(100-w)/100;f.vx+=v/w*_*.05,f.vy+=k/w*_*.05}f.x+=f.vx,f.y+=f.vy,f.vx*=.99,f.vy*=.99,f.x<0&&(f.x=y),f.x>y&&(f.x=0),f.y<0&&(f.y=m),f.y>m&&(f.y=0),f.alpha+=(Math.random()-.5)*.02,f.alpha=Math.max(.1,Math.min(.7,f.alpha)),j.beginPath(),j.arc(f.x,f.y,f.size,0,Math.PI*2),j.fillStyle=f.color,j.globalAlpha=f.alpha,j.fill()}),j.globalAlpha=1,o.current=requestAnimationFrame(g)},[]);return p.useEffect(()=>{if(!t)return;const u=a.current;if(!u)return;const x=()=>{u.width=window.innerWidth,u.height=window.innerHeight,h(u.width,u.height)},b=j=>{i.current={x:j.clientX,y:j.clientY}};return x(),window.addEventListener("resize",x),window.addEventListener("mousemove",b),()=>{window.removeEventListener("resize",x),window.removeEventListener("mousemove",b)}},[t,h]),p.useEffect(()=>{if(!t||n||!l){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return g(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,l,g]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const Yp={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function Xi({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=Yp[e]||Yp[" "],i=t,c=t*1.8,l=t*.15,d=t*.05,h=s?t*.4:t*.15,g=[`M ${d+l} ${d} L ${i-d-l} ${d} L ${i-d-l*.3} ${l*.7+d} L ${d+l*.3} ${l*.7+d} Z`,`M ${i-d} ${d+l} L ${i-d} ${c/2-d} L ${i-d-l*.7} ${c/2-d-l*.3} L ${i-d-l*.7} ${d+l+l*.3} Z`,`M ${i-d} ${c/2+d} L ${i-d} ${c-d-l} L ${i-d-l*.7} ${c-d-l-l*.3} L ${i-d-l*.7} ${c/2+d+l*.3} Z`,`M ${d+l} ${c-d} L ${i-d-l} ${c-d} L ${i-d-l*.3} ${c-l*.7-d} L ${d+l*.3} ${c-l*.7-d} Z`,`M ${d} ${c/2+d} L ${d} ${c-d-l} L ${d+l*.7} ${c-d-l-l*.3} L ${d+l*.7} ${c/2+d+l*.3} Z`,`M ${d} ${d+l} L ${d} ${c/2-d} L ${d+l*.7} ${c/2-d-l*.3} L ${d+l*.7} ${d+l+l*.3} Z`,`M ${d+l*.5} ${c/2} L ${d+l} ${c/2-l*.4} L ${i-d-l} ${c/2-l*.4} L ${i-d-l*.5} ${c/2} L ${i-d-l} ${c/2+l*.4} L ${d+l} ${c/2+l*.4} Z`];return r.jsx("svg",{width:i,height:c,style:{display:"inline-block"},children:g.map((u,x)=>r.jsx("path",{d:u,fill:o[x]?n:a,style:{filter:o[x]?`drop-shadow(0 0 ${h}px ${n})`:"none",transition:"fill 0.03s ease-out"}},x))})}function Gp({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function Kp(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function Xy(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function qy({timestamp:e,connected:t=!0}){const[n,a]=p.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=p.useState(!1),[i,c]=p.useState(!1),l=p.useRef(!1),d=p.useRef(null),h=p.useRef(null),g=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",x=n.hours==="  ",b=p.useCallback(f=>{const v=Kp(f);a(v),h.current=f},[]),j=p.useCallback(f=>{d.current&&clearInterval(d.current),c(!0),o(!0);let v=0;const k=20,w=50,_={current:f};return d.current=setInterval(()=>{if(v++,v<k)a(Xy());else{d.current&&(clearInterval(d.current),d.current=null);const M=Kp(_.current);a(M),h.current=_.current,c(!1),o(!1)}},w),M=>{_.current=M}},[]),y=p.useRef(null);p.useEffect(()=>{if(e===null){l.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!l.current){l.current=!0,y.current=j(e);return}if(d.current&&y.current){y.current(e);return}h.current!==e&&b(e)},[e,j,b]),p.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const m=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:g,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:g},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((f,v)=>r.jsx(Xi,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`h${v}`)),r.jsx(Gp,{size:m,color:g,dim:x}),(n.minutes||"  ").split("").map((f,v)=>r.jsx(Xi,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`m${v}`)),r.jsx(Gp,{size:m,color:g,dim:x}),(n.seconds||"  ").split("").map((f,v)=>r.jsx(Xi,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`s${v}`))]})]})}function Qy({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=p.useState(!1),i=p.useRef(null);p.useEffect(()=>{const d=h=>{i.current&&!i.current.contains(h.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),p.useEffect(()=>{const d=h=>{h.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const c=d=>{n(d),o(!1)},l=()=>{var g;if(t==="__all__")return"⊕ All";const d=e[t];return d?((g=d.summary)!=null&&g.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:l(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:l()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>c("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,h])=>{var j,y;const g=(j=h.summary)==null?void 0:j.is_standalone,u=h.name||d,x=((y=h.summary)==null?void 0:y.nodes_online)??0,b=Object.keys(h.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>c(d),children:[r.jsx("span",{className:"option-icon",children:g?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:u}),r.jsxs("span",{className:"option-meta",children:[x," nodes · ",b," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const Xp={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function Jy({user:e,onLogout:t}){const{t:n}=$e(),[a,s]=p.useState(!1),o=p.useRef(null);if(p.useEffect(()=>{if(!a)return;const d=g=>{o.current&&!o.current.contains(g.target)&&s(!1)},h=g=>{g.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",h),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",h)}},[a]),!e)return null;const i=e.role_global||"guest",c=Xp[i]||Xp.guest,l=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:c,boxShadow:`0 0 6px ${c}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:c,borderColor:c},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),l&&r.jsxs("a",{href:"/users",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚇"}),r.jsx("span",{className:"option-label",children:n("user.user_admin")})]}),l&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),l&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const Ht={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Tasks:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),Health:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),Backup:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},qp=[{view:"command-center",icon:Ht.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:Ht.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:Ht.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:Ht.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:Ht.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:Ht.Ceph,labelKey:"nav.ceph",shortcut:"C"},{view:"tasks",icon:Ht.Tasks,labelKey:"nav.tasks",shortcut:"T"},{view:"health",icon:Ht.Health,labelKey:"nav.health",shortcut:"H"},{view:"backups",icon:Ht.Backup,labelKey:"nav.backups",shortcut:"B"}],Zy={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation",t:"tasks",h:"health",b:"backups"},e2={"command-center":"/","cluster-core":"/nodes","holo-matrix":"/matrix","radar-scan":"/radar","ceph-constellation":"/ceph",storage:"/storage",tasks:"/tasks",health:"/health",backups:"/backups",settings:"/settings",users:"/users"},qi={"/":"command-center","/overview":"command-center","/nodes":"cluster-core","/matrix":"holo-matrix","/radar":"radar-scan","/ceph":"ceph-constellation","/storage":"storage","/tasks":"tasks","/health":"health","/backups":"backups","/settings":"settings","/users":"users"};function Qp(){const e=(typeof window<"u"?window.location.pathname:"/")||"/",t=e!=="/"&&e.endsWith("/")?e.slice(0,-1):e;if(qi[t])return qi[t];const n="/"+(t.split("/").filter(Boolean)[0]||"");return qi[n]||"command-center"}function t2(){var te;const{t:e,language:t,setLanguage:n}=$e(),[a,s]=p.useState(()=>Qp());p.useEffect(()=>{const W=e2[a];if(!W)return;const L=window.location.pathname||"/",q="/"+(L.split("/").filter(Boolean)[0]||""),I="/"+(W.split("/").filter(Boolean)[0]||"");L==="/"&&W==="/"||L!=="/"&&W!=="/"&&q===I||window.history.pushState(null,"",W)},[a]),p.useEffect(()=>{const W=()=>s(Qp());return window.addEventListener("popstate",W),()=>window.removeEventListener("popstate",W)},[]);const[o,i]=p.useState({}),[c,l]=p.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,h]=p.useState(!1),g=_s(),[u,x]=p.useState(0),[b,j]=p.useState(!1),[y,m]=p.useState(null),[f,v]=p.useState(!1),[k,w]=p.useState(!1),{connected:_,connecting:M,send:z}=_g({onMessage:p.useCallback(W=>{b||(i(W),x(Date.now()/1e3))},[b])});p.useEffect(()=>{let W=!0;const L=()=>document.visibilityState!=="hidden"&&document.hasFocus(),q=()=>{const I=L();if(I!==W){W=I,document.body.setAttribute("data-app-visible",I?"true":"false");try{I?(z({type:"resume"}),z({type:"refresh"})):z({type:"pause"})}catch{}}};return document.body.setAttribute("data-app-visible",L()?"true":"false"),document.addEventListener("visibilitychange",q),window.addEventListener("focus",q),window.addEventListener("blur",q),()=>{document.removeEventListener("visibilitychange",q),window.removeEventListener("focus",q),window.removeEventListener("blur",q)}},[z]);const O=p.useCallback(()=>{m(b?"resuming":"pausing"),setTimeout(()=>{j(W=>!W),setTimeout(()=>m(null),500)},300)},[b]),P=c==="__all__"?null:o[c]||null,T=p.useMemo(()=>{const W=Object.values(o);return{total_clusters:W.length,total_nodes:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.node_count)||0)},0),total_nodes_online:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.nodes_online)||0)},0),total_vms:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.vm_count)||0)},0),total_vms_running:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.vms_running)||0)},0),total_cts:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.ct_count)||0)},0),total_cts_running:W.reduce((L,q)=>{var I;return L+(((I=q.summary)==null?void 0:I.cts_running)||0)},0),clusters:W.map(L=>L.summary).filter(Boolean)}},[o]);p.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",c)}catch{}},[c]),p.useEffect(()=>{Object.keys(o).length>0&&c!=="__all__"&&(o[c]||l("__all__"))},[o,c]),p.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),p.useEffect(()=>{Be.getConfig().then(W=>{W!=null&&W.ui&&(W.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",W.ui.vm_matrix_default_filter),W.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(W.ui.matrix_card_width)),W.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",W.ui.matrix_sort_by))}).catch(()=>{})},[]),p.useEffect(()=>{if(!f)return;const W=()=>v(!1);return document.addEventListener("click",W),()=>document.removeEventListener("click",W)},[f]),p.useEffect(()=>{if(!k)return;const W=()=>w(!1);return document.addEventListener("click",W),()=>document.removeEventListener("click",W)},[k]),p.useEffect(()=>{const W=L=>{if(L.target instanceof HTMLInputElement||L.target instanceof HTMLTextAreaElement)return;const q=L.key.toLowerCase();if(q===" "||L.code==="Space"){L.preventDefault(),O();return}if(!L.ctrlKey&&!L.metaKey&&!L.altKey){const I=Zy[q];if(I){L.preventDefault(),s(I);return}}(L.ctrlKey||L.metaKey)&&q==="s"&&(L.preventDefault(),h(I=>!I))};return window.addEventListener("keydown",W),()=>window.removeEventListener("keydown",W)},[O]);const R=()=>{const W=c==="__all__";switch(a){case"command-center":return r.jsx(mp,{clusters:o,globalSummary:T,isPaused:b,onSelectCluster:L=>{l(L),s("cluster-core")}});case"cluster-core":return r.jsx(Og,{cluster:P,clusters:W?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:L=>{l(L),s("holo-matrix")},isPaused:b});case"holo-matrix":return r.jsx(sx,{cluster:P,clusters:W?o:void 0});case"radar-scan":return r.jsx(dx,{cluster:P,clusters:W?o:void 0,isPaused:b});case"storage":return r.jsx($y,{cluster:P,clusters:W?o:void 0});case"ceph-constellation":return r.jsx(_x,{cluster:P,clusters:W?o:void 0,isPaused:b});case"users":return r.jsx(Ey,{});case"tasks":return r.jsx(Oy,{clusters:o,selectedCluster:c});case"health":return r.jsx(Dy,{clusters:o,onNavigate:(L,q)=>{q!=null&&q.cluster&&l(q.cluster),s(L)}});case"backups":return r.jsx(Wy,{clusters:o,selectedCluster:c});default:return r.jsx(mp,{clusters:o,globalSummary:T,isPaused:b,onSelectCluster:L=>{l(L),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${b?"animations-paused":""}`,children:[r.jsx(Ky,{isPaused:b}),r.jsx(Uy,{clusters:o,onNavigate:(W,L)=>{L!=null&&L.cluster&&l(L.cluster),s(W)}}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${_?"connected":M?"connecting":"disconnected"}`,title:e(_?"status.connected":M?"status.connecting":"status.disconnected")}),r.jsx(qy,{timestamp:u,connected:_})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[qp.map(({view:W,icon:L,labelKey:q,shortcut:I},U)=>r.jsxs("button",{className:`nav-tab nav-tab-${U} ${a===W?"active":""}`,onClick:()=>s(W),title:`${e(q)} [${I}]`,children:[r.jsx(L,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:I})]},W)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:W=>{W.stopPropagation(),w(!k)},title:e("nav.more"),children:r.jsx(Ht.MoreHorizontal,{})}),k&&r.jsx("div",{className:"nav-more-dropdown",onClick:W=>W.stopPropagation(),children:qp.map(({view:W,icon:L,labelKey:q,shortcut:I},U)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${U} ${a===W?"active":""}`,onClick:()=>{s(W),w(!1)},children:[r.jsx(L,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:I})]},W))})]})]}),Object.keys(o).length>0&&r.jsx(Qy,{clusters:o,value:c,onChange:l,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${b?"paused":""} ${y||""}`,onClick:O,title:`${e(b?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:b?r.jsx(Ht.Play,{}):r.jsx(Ht.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:W=>{W.stopPropagation(),v(!f)},title:e("settings.language"),children:r.jsx(Ht.Language,{})}),f&&r.jsxs("div",{className:"lang-dropdown",onClick:W=>W.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),v(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),v(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(Jy,{user:g.user,onLogout:g.logout}),(!g.authEnforced||((te=g.user)==null?void 0:te.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>h(!0),title:e("settings.title"),children:r.jsx(Ht.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:R()},a)}),d&&r.jsx(Gy,{onClose:()=>h(!1),clusters:o}),y&&r.jsxs("div",{className:`pause-overlay ${y}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((W,L)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${L*.05}s`}},L))}),r.jsx("div",{className:"pause-status-text",children:y==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function r2(){return r.jsx(wg,{children:r.jsx(kg,{children:r.jsx(t2,{})})})}Qi.createRoot(document.getElementById("root")).render(r.jsx(Go.StrictMode,{children:r.jsx(r2,{})}));
