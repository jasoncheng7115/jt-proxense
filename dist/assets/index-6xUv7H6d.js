(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Zf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ru={exports:{}},Xo={},nu={exports:{}},Le={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ks=Symbol.for("react.element"),e0=Symbol.for("react.portal"),t0=Symbol.for("react.fragment"),r0=Symbol.for("react.strict_mode"),n0=Symbol.for("react.profiler"),a0=Symbol.for("react.provider"),s0=Symbol.for("react.context"),o0=Symbol.for("react.forward_ref"),i0=Symbol.for("react.suspense"),l0=Symbol.for("react.memo"),c0=Symbol.for("react.lazy"),od=Symbol.iterator;function d0(e){return e===null||typeof e!="object"?null:(e=od&&e[od]||e["@@iterator"],typeof e=="function"?e:null)}var au={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},su=Object.assign,ou={};function ja(e,t,n){this.props=e,this.context=t,this.refs=ou,this.updater=n||au}ja.prototype.isReactComponent={};ja.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ja.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function iu(){}iu.prototype=ja.prototype;function rc(e,t,n){this.props=e,this.context=t,this.refs=ou,this.updater=n||au}var nc=rc.prototype=new iu;nc.constructor=rc;su(nc,ja.prototype);nc.isPureReactComponent=!0;var id=Array.isArray,lu=Object.prototype.hasOwnProperty,ac={current:null},cu={key:!0,ref:!0,__self:!0,__source:!0};function du(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)lu.call(t,a)&&!cu.hasOwnProperty(a)&&(s[a]=t[a]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)s[a]===void 0&&(s[a]=l[a]);return{$$typeof:ks,type:e,key:o,ref:i,props:s,_owner:ac.current}}function p0(e,t){return{$$typeof:ks,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function sc(e){return typeof e=="object"&&e!==null&&e.$$typeof===ks}function u0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ld=/\/+/g;function gi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?u0(""+e.key):t.toString(36)}function to(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case ks:case e0:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+gi(i,0):a,id(s)?(n="",e!=null&&(n=e.replace(ld,"$&/")+"/"),to(s,t,n,"",function(d){return d})):s!=null&&(sc(s)&&(s=p0(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(ld,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",id(e))for(var l=0;l<e.length;l++){o=e[l];var c=a+gi(o,l);i+=to(o,t,n,c,s)}else if(c=d0(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=a+gi(o,l++),i+=to(o,t,n,c,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Es(e,t,n){if(e==null)return e;var a=[],s=0;return to(e,a,"","",function(o){return t.call(n,o,s++)}),a}function m0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ot={current:null},ro={transition:null},f0={ReactCurrentDispatcher:Ot,ReactCurrentBatchConfig:ro,ReactCurrentOwner:ac};function pu(){throw Error("act(...) is not supported in production builds of React.")}Le.Children={map:Es,forEach:function(e,t,n){Es(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Es(e,function(){t++}),t},toArray:function(e){return Es(e,function(t){return t})||[]},only:function(e){if(!sc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Le.Component=ja;Le.Fragment=t0;Le.Profiler=n0;Le.PureComponent=rc;Le.StrictMode=r0;Le.Suspense=i0;Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=f0;Le.act=pu;Le.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=su({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=ac.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)lu.call(t,c)&&!cu.hasOwnProperty(c)&&(a[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)a.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];a.children=l}return{$$typeof:ks,type:e.type,key:s,ref:o,props:a,_owner:i}};Le.createContext=function(e){return e={$$typeof:s0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:a0,_context:e},e.Consumer=e};Le.createElement=du;Le.createFactory=function(e){var t=du.bind(null,e);return t.type=e,t};Le.createRef=function(){return{current:null}};Le.forwardRef=function(e){return{$$typeof:o0,render:e}};Le.isValidElement=sc;Le.lazy=function(e){return{$$typeof:c0,_payload:{_status:-1,_result:e},_init:m0}};Le.memo=function(e,t){return{$$typeof:l0,type:e,compare:t===void 0?null:t}};Le.startTransition=function(e){var t=ro.transition;ro.transition={};try{e()}finally{ro.transition=t}};Le.unstable_act=pu;Le.useCallback=function(e,t){return Ot.current.useCallback(e,t)};Le.useContext=function(e){return Ot.current.useContext(e)};Le.useDebugValue=function(){};Le.useDeferredValue=function(e){return Ot.current.useDeferredValue(e)};Le.useEffect=function(e,t){return Ot.current.useEffect(e,t)};Le.useId=function(){return Ot.current.useId()};Le.useImperativeHandle=function(e,t,n){return Ot.current.useImperativeHandle(e,t,n)};Le.useInsertionEffect=function(e,t){return Ot.current.useInsertionEffect(e,t)};Le.useLayoutEffect=function(e,t){return Ot.current.useLayoutEffect(e,t)};Le.useMemo=function(e,t){return Ot.current.useMemo(e,t)};Le.useReducer=function(e,t,n){return Ot.current.useReducer(e,t,n)};Le.useRef=function(e){return Ot.current.useRef(e)};Le.useState=function(e){return Ot.current.useState(e)};Le.useSyncExternalStore=function(e,t,n){return Ot.current.useSyncExternalStore(e,t,n)};Le.useTransition=function(){return Ot.current.useTransition()};Le.version="18.3.1";nu.exports=Le;var p=nu.exports;const qo=Zf(p);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h0=p,g0=Symbol.for("react.element"),x0=Symbol.for("react.fragment"),v0=Object.prototype.hasOwnProperty,b0=h0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y0={key:!0,ref:!0,__self:!0,__source:!0};function uu(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)v0.call(t,a)&&!y0.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:g0,type:e,key:o,ref:i,props:s,_owner:b0.current}}Xo.Fragment=x0;Xo.jsx=uu;Xo.jsxs=uu;ru.exports=Xo;var r=ru.exports,el={},mu={exports:{}},ar={},fu={exports:{}},hu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(H,U){var X=H.length;H.push(U);e:for(;0<X;){var Q=X-1>>>1,M=H[Q];if(0<s(M,U))H[Q]=U,H[X]=M,X=Q;else break e}}function n(H){return H.length===0?null:H[0]}function a(H){if(H.length===0)return null;var U=H[0],X=H.pop();if(X!==U){H[0]=X;e:for(var Q=0,M=H.length,ge=M>>>1;Q<ge;){var je=2*(Q+1)-1,Oe=H[je],G=je+1,ue=H[G];if(0>s(Oe,X))G<M&&0>s(ue,Oe)?(H[Q]=ue,H[G]=X,Q=G):(H[Q]=Oe,H[je]=X,Q=je);else if(G<M&&0>s(ue,X))H[Q]=ue,H[G]=X,Q=G;else break e}}return U}function s(H,U){var X=H.sortIndex-U.sortIndex;return X!==0?X:H.id-U.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var c=[],d=[],h=1,g=null,u=3,v=!1,y=!1,k=!1,x=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(H){for(var U=n(d);U!==null;){if(U.callback===null)a(d);else if(U.startTime<=H)a(d),U.sortIndex=U.expirationTime,t(c,U);else break;U=n(d)}}function j(H){if(k=!1,b(H),!y)if(n(c)!==null)y=!0,q(w);else{var U=n(d);U!==null&&A(j,U.startTime-H)}}function w(H,U){y=!1,k&&(k=!1,m(z),z=-1),v=!0;var X=u;try{for(b(U),g=n(c);g!==null&&(!(g.expirationTime>U)||H&&!E());){var Q=g.callback;if(typeof Q=="function"){g.callback=null,u=g.priorityLevel;var M=Q(g.expirationTime<=U);U=e.unstable_now(),typeof M=="function"?g.callback=M:g===n(c)&&a(c),b(U)}else a(c);g=n(c)}if(g!==null)var ge=!0;else{var je=n(d);je!==null&&A(j,je.startTime-U),ge=!1}return ge}finally{g=null,u=X,v=!1}}var _=!1,S=null,z=-1,R=5,F=-1;function E(){return!(e.unstable_now()-F<R)}function P(){if(S!==null){var H=e.unstable_now();F=H;var U=!0;try{U=S(!0,H)}finally{U?ee():(_=!1,S=null)}}else _=!1}var ee;if(typeof f=="function")ee=function(){f(P)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,I=D.port2;D.port1.onmessage=P,ee=function(){I.postMessage(null)}}else ee=function(){x(P,0)};function q(H){S=H,_||(_=!0,ee())}function A(H,U){z=x(function(){H(e.unstable_now())},U)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(H){H.callback=null},e.unstable_continueExecution=function(){y||v||(y=!0,q(w))},e.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<H?Math.floor(1e3/H):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(H){switch(u){case 1:case 2:case 3:var U=3;break;default:U=u}var X=u;u=U;try{return H()}finally{u=X}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(H,U){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var X=u;u=H;try{return U()}finally{u=X}},e.unstable_scheduleCallback=function(H,U,X){var Q=e.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?Q+X:Q):X=Q,H){case 1:var M=-1;break;case 2:M=250;break;case 5:M=1073741823;break;case 4:M=1e4;break;default:M=5e3}return M=X+M,H={id:h++,callback:U,priorityLevel:H,startTime:X,expirationTime:M,sortIndex:-1},X>Q?(H.sortIndex=X,t(d,H),n(c)===null&&H===n(d)&&(k?(m(z),z=-1):k=!0,A(j,X-Q))):(H.sortIndex=M,t(c,H),y||v||(y=!0,q(w))),H},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(H){var U=u;return function(){var X=u;u=U;try{return H.apply(this,arguments)}finally{u=X}}}})(hu);fu.exports=hu;var w0=fu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k0=p,nr=w0;function ae(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var gu=new Set,ts={};function Wn(e,t){fa(e,t),fa(e+"Capture",t)}function fa(e,t){for(ts[e]=t,e=0;e<t.length;e++)gu.add(t[e])}var Wr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tl=Object.prototype.hasOwnProperty,j0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,cd={},dd={};function N0(e){return tl.call(dd,e)?!0:tl.call(cd,e)?!1:j0.test(e)?dd[e]=!0:(cd[e]=!0,!1)}function _0(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function S0(e,t,n,a){if(t===null||typeof t>"u"||_0(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ft(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var zt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){zt[e]=new Ft(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];zt[t]=new Ft(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){zt[e]=new Ft(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){zt[e]=new Ft(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){zt[e]=new Ft(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){zt[e]=new Ft(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){zt[e]=new Ft(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){zt[e]=new Ft(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){zt[e]=new Ft(e,5,!1,e.toLowerCase(),null,!1,!1)});var oc=/[\-:]([a-z])/g;function ic(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(oc,ic);zt[t]=new Ft(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(oc,ic);zt[t]=new Ft(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(oc,ic);zt[t]=new Ft(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){zt[e]=new Ft(e,1,!1,e.toLowerCase(),null,!1,!1)});zt.xlinkHref=new Ft("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){zt[e]=new Ft(e,1,!1,e.toLowerCase(),null,!0,!0)});function lc(e,t,n,a){var s=zt.hasOwnProperty(t)?zt[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(S0(t,n,s,a)&&(n=null),a||s===null?N0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var Gr=k0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ts=Symbol.for("react.element"),Xn=Symbol.for("react.portal"),qn=Symbol.for("react.fragment"),cc=Symbol.for("react.strict_mode"),rl=Symbol.for("react.profiler"),xu=Symbol.for("react.provider"),vu=Symbol.for("react.context"),dc=Symbol.for("react.forward_ref"),nl=Symbol.for("react.suspense"),al=Symbol.for("react.suspense_list"),pc=Symbol.for("react.memo"),en=Symbol.for("react.lazy"),bu=Symbol.for("react.offscreen"),pd=Symbol.iterator;function Sa(e){return e===null||typeof e!="object"?null:(e=pd&&e[pd]||e["@@iterator"],typeof e=="function"?e:null)}var mt=Object.assign,xi;function Oa(e){if(xi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);xi=t&&t[1]||""}return`
`+xi+e}var vi=!1;function bi(e,t){if(!e||vi)return"";vi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,l=o.length-1;1<=i&&0<=l&&s[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(s[i]!==o[l]){if(i!==1||l!==1)do if(i--,l--,0>l||s[i]!==o[l]){var c=`
`+s[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=l);break}}}finally{vi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Oa(e):""}function C0(e){switch(e.tag){case 5:return Oa(e.type);case 16:return Oa("Lazy");case 13:return Oa("Suspense");case 19:return Oa("SuspenseList");case 0:case 2:case 15:return e=bi(e.type,!1),e;case 11:return e=bi(e.type.render,!1),e;case 1:return e=bi(e.type,!0),e;default:return""}}function sl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case qn:return"Fragment";case Xn:return"Portal";case rl:return"Profiler";case cc:return"StrictMode";case nl:return"Suspense";case al:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vu:return(e.displayName||"Context")+".Consumer";case xu:return(e._context.displayName||"Context")+".Provider";case dc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pc:return t=e.displayName||null,t!==null?t:sl(e.type)||"Memo";case en:t=e._payload,e=e._init;try{return sl(e(t))}catch{}}return null}function M0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sl(t);case 8:return t===cc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function gn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function z0(e){var t=yu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ps(e){e._valueTracker||(e._valueTracker=z0(e))}function wu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=yu(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function xo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ol(e,t){var n=t.checked;return mt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ud(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=gn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ku(e,t){t=t.checked,t!=null&&lc(e,"checked",t,!1)}function il(e,t){ku(e,t);var n=gn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ll(e,t.type,n):t.hasOwnProperty("defaultValue")&&ll(e,t.type,gn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function md(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ll(e,t,n){(t!=="number"||xo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Fa=Array.isArray;function ia(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+gn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function cl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(ae(91));return mt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(ae(92));if(Fa(n)){if(1<n.length)throw Error(ae(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:gn(n)}}function ju(e,t){var n=gn(t.value),a=gn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function hd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Nu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function dl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Nu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rs,_u=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rs=Rs||document.createElement("div"),Rs.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function rs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Ya={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$0=["Webkit","ms","Moz","O"];Object.keys(Ya).forEach(function(e){$0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ya[t]=Ya[e]})});function Su(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Ya.hasOwnProperty(e)&&Ya[e]?(""+t).trim():t+"px"}function Cu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=Su(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var E0=mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function pl(e,t){if(t){if(E0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(ae(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(ae(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(ae(61))}if(t.style!=null&&typeof t.style!="object")throw Error(ae(62))}}function ul(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ml=null;function uc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fl=null,la=null,ca=null;function gd(e){if(e=_s(e)){if(typeof fl!="function")throw Error(ae(280));var t=e.stateNode;t&&(t=ti(t),fl(e.stateNode,e.type,t))}}function Mu(e){la?ca?ca.push(e):ca=[e]:la=e}function zu(){if(la){var e=la,t=ca;if(ca=la=null,gd(e),t)for(e=0;e<t.length;e++)gd(t[e])}}function $u(e,t){return e(t)}function Eu(){}var yi=!1;function Tu(e,t,n){if(yi)return e(t,n);yi=!0;try{return $u(e,t,n)}finally{yi=!1,(la!==null||ca!==null)&&(Eu(),zu())}}function ns(e,t){var n=e.stateNode;if(n===null)return null;var a=ti(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(ae(231,t,typeof n));return n}var hl=!1;if(Wr)try{var Ca={};Object.defineProperty(Ca,"passive",{get:function(){hl=!0}}),window.addEventListener("test",Ca,Ca),window.removeEventListener("test",Ca,Ca)}catch{hl=!1}function T0(e,t,n,a,s,o,i,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(h){this.onError(h)}}var Ga=!1,vo=null,bo=!1,gl=null,P0={onError:function(e){Ga=!0,vo=e}};function R0(e,t,n,a,s,o,i,l,c){Ga=!1,vo=null,T0.apply(P0,arguments)}function I0(e,t,n,a,s,o,i,l,c){if(R0.apply(this,arguments),Ga){if(Ga){var d=vo;Ga=!1,vo=null}else throw Error(ae(198));bo||(bo=!0,gl=d)}}function Un(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Pu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function xd(e){if(Un(e)!==e)throw Error(ae(188))}function L0(e){var t=e.alternate;if(!t){if(t=Un(e),t===null)throw Error(ae(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return xd(s),e;if(o===a)return xd(s),t;o=o.sibling}throw Error(ae(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,l=s.child;l;){if(l===n){i=!0,n=s,a=o;break}if(l===a){i=!0,a=s,n=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===n){i=!0,n=o,a=s;break}if(l===a){i=!0,a=o,n=s;break}l=l.sibling}if(!i)throw Error(ae(189))}}if(n.alternate!==a)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?e:t}function Ru(e){return e=L0(e),e!==null?Iu(e):null}function Iu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Iu(e);if(t!==null)return t;e=e.sibling}return null}var Lu=nr.unstable_scheduleCallback,vd=nr.unstable_cancelCallback,A0=nr.unstable_shouldYield,O0=nr.unstable_requestPaint,bt=nr.unstable_now,F0=nr.unstable_getCurrentPriorityLevel,mc=nr.unstable_ImmediatePriority,Au=nr.unstable_UserBlockingPriority,yo=nr.unstable_NormalPriority,D0=nr.unstable_LowPriority,Ou=nr.unstable_IdlePriority,Qo=null,$r=null;function B0(e){if($r&&typeof $r.onCommitFiberRoot=="function")try{$r.onCommitFiberRoot(Qo,e,void 0,(e.current.flags&128)===128)}catch{}}var br=Math.clz32?Math.clz32:V0,W0=Math.log,U0=Math.LN2;function V0(e){return e>>>=0,e===0?32:31-(W0(e)/U0|0)|0}var Is=64,Ls=4194304;function Da(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function wo(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var l=i&~s;l!==0?a=Da(l):(o&=i,o!==0&&(a=Da(o)))}else i=n&~s,i!==0?a=Da(i):o!==0&&(a=Da(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-br(t),s=1<<n,a|=e[n],t&=~s;return a}function H0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Y0(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-br(o),l=1<<i,c=s[i];c===-1?(!(l&n)||l&a)&&(s[i]=H0(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function xl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Fu(){var e=Is;return Is<<=1,!(Is&4194240)&&(Is=64),e}function wi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function js(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-br(t),e[t]=n}function G0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-br(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function fc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-br(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var qe=0;function Du(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Bu,hc,Wu,Uu,Vu,vl=!1,As=[],ln=null,cn=null,dn=null,as=new Map,ss=new Map,nn=[],K0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function bd(e,t){switch(e){case"focusin":case"focusout":ln=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":as.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ss.delete(t.pointerId)}}function Ma(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=_s(t),t!==null&&hc(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function X0(e,t,n,a,s){switch(t){case"focusin":return ln=Ma(ln,e,t,n,a,s),!0;case"dragenter":return cn=Ma(cn,e,t,n,a,s),!0;case"mouseover":return dn=Ma(dn,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return as.set(o,Ma(as.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,ss.set(o,Ma(ss.get(o)||null,e,t,n,a,s)),!0}return!1}function Hu(e){var t=zn(e.target);if(t!==null){var n=Un(t);if(n!==null){if(t=n.tag,t===13){if(t=Pu(n),t!==null){e.blockedOn=t,Vu(e.priority,function(){Wu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function no(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);ml=a,n.target.dispatchEvent(a),ml=null}else return t=_s(n),t!==null&&hc(t),e.blockedOn=n,!1;t.shift()}return!0}function yd(e,t,n){no(e)&&n.delete(t)}function q0(){vl=!1,ln!==null&&no(ln)&&(ln=null),cn!==null&&no(cn)&&(cn=null),dn!==null&&no(dn)&&(dn=null),as.forEach(yd),ss.forEach(yd)}function za(e,t){e.blockedOn===t&&(e.blockedOn=null,vl||(vl=!0,nr.unstable_scheduleCallback(nr.unstable_NormalPriority,q0)))}function os(e){function t(s){return za(s,e)}if(0<As.length){za(As[0],e);for(var n=1;n<As.length;n++){var a=As[n];a.blockedOn===e&&(a.blockedOn=null)}}for(ln!==null&&za(ln,e),cn!==null&&za(cn,e),dn!==null&&za(dn,e),as.forEach(t),ss.forEach(t),n=0;n<nn.length;n++)a=nn[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<nn.length&&(n=nn[0],n.blockedOn===null);)Hu(n),n.blockedOn===null&&nn.shift()}var da=Gr.ReactCurrentBatchConfig,ko=!0;function Q0(e,t,n,a){var s=qe,o=da.transition;da.transition=null;try{qe=1,gc(e,t,n,a)}finally{qe=s,da.transition=o}}function J0(e,t,n,a){var s=qe,o=da.transition;da.transition=null;try{qe=4,gc(e,t,n,a)}finally{qe=s,da.transition=o}}function gc(e,t,n,a){if(ko){var s=bl(e,t,n,a);if(s===null)Ei(e,t,a,jo,n),bd(e,a);else if(X0(s,e,t,n,a))a.stopPropagation();else if(bd(e,a),t&4&&-1<K0.indexOf(e)){for(;s!==null;){var o=_s(s);if(o!==null&&Bu(o),o=bl(e,t,n,a),o===null&&Ei(e,t,a,jo,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else Ei(e,t,a,null,n)}}var jo=null;function bl(e,t,n,a){if(jo=null,e=uc(a),e=zn(e),e!==null)if(t=Un(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Pu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return jo=e,null}function Yu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(F0()){case mc:return 1;case Au:return 4;case yo:case D0:return 16;case Ou:return 536870912;default:return 16}default:return 16}}var sn=null,xc=null,ao=null;function Gu(){if(ao)return ao;var e,t=xc,n=t.length,a,s="value"in sn?sn.value:sn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return ao=s.slice(e,1<a?1-a:void 0)}function so(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Os(){return!0}function wd(){return!1}function sr(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Os:wd,this.isPropagationStopped=wd,this}return mt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Os)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Os)},persist:function(){},isPersistent:Os}),t}var Na={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vc=sr(Na),Ns=mt({},Na,{view:0,detail:0}),Z0=sr(Ns),ki,ji,$a,Jo=mt({},Ns,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:bc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==$a&&($a&&e.type==="mousemove"?(ki=e.screenX-$a.screenX,ji=e.screenY-$a.screenY):ji=ki=0,$a=e),ki)},movementY:function(e){return"movementY"in e?e.movementY:ji}}),kd=sr(Jo),eh=mt({},Jo,{dataTransfer:0}),th=sr(eh),rh=mt({},Ns,{relatedTarget:0}),Ni=sr(rh),nh=mt({},Na,{animationName:0,elapsedTime:0,pseudoElement:0}),ah=sr(nh),sh=mt({},Na,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),oh=sr(sh),ih=mt({},Na,{data:0}),jd=sr(ih),lh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ch={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ph(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=dh[e])?!!t[e]:!1}function bc(){return ph}var uh=mt({},Ns,{key:function(e){if(e.key){var t=lh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=so(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ch[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:bc,charCode:function(e){return e.type==="keypress"?so(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?so(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),mh=sr(uh),fh=mt({},Jo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nd=sr(fh),hh=mt({},Ns,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:bc}),gh=sr(hh),xh=mt({},Na,{propertyName:0,elapsedTime:0,pseudoElement:0}),vh=sr(xh),bh=mt({},Jo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),yh=sr(bh),wh=[9,13,27,32],yc=Wr&&"CompositionEvent"in window,Ka=null;Wr&&"documentMode"in document&&(Ka=document.documentMode);var kh=Wr&&"TextEvent"in window&&!Ka,Ku=Wr&&(!yc||Ka&&8<Ka&&11>=Ka),_d=" ",Sd=!1;function Xu(e,t){switch(e){case"keyup":return wh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qn=!1;function jh(e,t){switch(e){case"compositionend":return qu(t);case"keypress":return t.which!==32?null:(Sd=!0,_d);case"textInput":return e=t.data,e===_d&&Sd?null:e;default:return null}}function Nh(e,t){if(Qn)return e==="compositionend"||!yc&&Xu(e,t)?(e=Gu(),ao=xc=sn=null,Qn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ku&&t.locale!=="ko"?null:t.data;default:return null}}var _h={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!_h[e.type]:t==="textarea"}function Qu(e,t,n,a){Mu(a),t=No(t,"onChange"),0<t.length&&(n=new vc("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Xa=null,is=null;function Sh(e){lm(e,0)}function Zo(e){var t=ea(e);if(wu(t))return e}function Ch(e,t){if(e==="change")return t}var Ju=!1;if(Wr){var _i;if(Wr){var Si="oninput"in document;if(!Si){var Md=document.createElement("div");Md.setAttribute("oninput","return;"),Si=typeof Md.oninput=="function"}_i=Si}else _i=!1;Ju=_i&&(!document.documentMode||9<document.documentMode)}function zd(){Xa&&(Xa.detachEvent("onpropertychange",Zu),is=Xa=null)}function Zu(e){if(e.propertyName==="value"&&Zo(is)){var t=[];Qu(t,is,e,uc(e)),Tu(Sh,t)}}function Mh(e,t,n){e==="focusin"?(zd(),Xa=t,is=n,Xa.attachEvent("onpropertychange",Zu)):e==="focusout"&&zd()}function zh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zo(is)}function $h(e,t){if(e==="click")return Zo(t)}function Eh(e,t){if(e==="input"||e==="change")return Zo(t)}function Th(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var wr=typeof Object.is=="function"?Object.is:Th;function ls(e,t){if(wr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!tl.call(t,s)||!wr(e[s],t[s]))return!1}return!0}function $d(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ed(e,t){var n=$d(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$d(n)}}function em(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?em(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function tm(){for(var e=window,t=xo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=xo(e.document)}return t}function wc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ph(e){var t=tm(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&em(n.ownerDocument.documentElement,n)){if(a!==null&&wc(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=Ed(n,o);var i=Ed(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Rh=Wr&&"documentMode"in document&&11>=document.documentMode,Jn=null,yl=null,qa=null,wl=!1;function Td(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wl||Jn==null||Jn!==xo(a)||(a=Jn,"selectionStart"in a&&wc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),qa&&ls(qa,a)||(qa=a,a=No(yl,"onSelect"),0<a.length&&(t=new vc("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Jn)))}function Fs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Zn={animationend:Fs("Animation","AnimationEnd"),animationiteration:Fs("Animation","AnimationIteration"),animationstart:Fs("Animation","AnimationStart"),transitionend:Fs("Transition","TransitionEnd")},Ci={},rm={};Wr&&(rm=document.createElement("div").style,"AnimationEvent"in window||(delete Zn.animationend.animation,delete Zn.animationiteration.animation,delete Zn.animationstart.animation),"TransitionEvent"in window||delete Zn.transitionend.transition);function ei(e){if(Ci[e])return Ci[e];if(!Zn[e])return e;var t=Zn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in rm)return Ci[e]=t[n];return e}var nm=ei("animationend"),am=ei("animationiteration"),sm=ei("animationstart"),om=ei("transitionend"),im=new Map,Pd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,t){im.set(e,t),Wn(t,[e])}for(var Mi=0;Mi<Pd.length;Mi++){var zi=Pd[Mi],Ih=zi.toLowerCase(),Lh=zi[0].toUpperCase()+zi.slice(1);vn(Ih,"on"+Lh)}vn(nm,"onAnimationEnd");vn(am,"onAnimationIteration");vn(sm,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(om,"onTransitionEnd");fa("onMouseEnter",["mouseout","mouseover"]);fa("onMouseLeave",["mouseout","mouseover"]);fa("onPointerEnter",["pointerout","pointerover"]);fa("onPointerLeave",["pointerout","pointerover"]);Wn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ba="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ah=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ba));function Rd(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,I0(a,t,void 0,e),e.currentTarget=null}function lm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var l=a[i],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&s.isPropagationStopped())break e;Rd(s,l,d),o=c}else for(i=0;i<a.length;i++){if(l=a[i],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&s.isPropagationStopped())break e;Rd(s,l,d),o=c}}}if(bo)throw e=gl,bo=!1,gl=null,e}function st(e,t){var n=t[Sl];n===void 0&&(n=t[Sl]=new Set);var a=e+"__bubble";n.has(a)||(cm(t,e,2,!1),n.add(a))}function $i(e,t,n){var a=0;t&&(a|=4),cm(n,e,a,t)}var Ds="_reactListening"+Math.random().toString(36).slice(2);function cs(e){if(!e[Ds]){e[Ds]=!0,gu.forEach(function(n){n!=="selectionchange"&&(Ah.has(n)||$i(n,!1,e),$i(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ds]||(t[Ds]=!0,$i("selectionchange",!1,t))}}function cm(e,t,n,a){switch(Yu(t)){case 1:var s=Q0;break;case 4:s=J0;break;default:s=gc}n=s.bind(null,t,n,e),s=void 0,!hl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ei(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var l=a.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;i=i.return}for(;l!==null;){if(i=zn(l),i===null)return;if(c=i.tag,c===5||c===6){a=o=i;continue e}l=l.parentNode}}a=a.return}Tu(function(){var d=o,h=uc(n),g=[];e:{var u=im.get(e);if(u!==void 0){var v=vc,y=e;switch(e){case"keypress":if(so(n)===0)break e;case"keydown":case"keyup":v=mh;break;case"focusin":y="focus",v=Ni;break;case"focusout":y="blur",v=Ni;break;case"beforeblur":case"afterblur":v=Ni;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=kd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=th;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=gh;break;case nm:case am:case sm:v=ah;break;case om:v=vh;break;case"scroll":v=Z0;break;case"wheel":v=yh;break;case"copy":case"cut":case"paste":v=oh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Nd}var k=(t&4)!==0,x=!k&&e==="scroll",m=k?u!==null?u+"Capture":null:u;k=[];for(var f=d,b;f!==null;){b=f;var j=b.stateNode;if(b.tag===5&&j!==null&&(b=j,m!==null&&(j=ns(f,m),j!=null&&k.push(ds(f,j,b)))),x)break;f=f.return}0<k.length&&(u=new v(u,y,null,n,h),g.push({event:u,listeners:k}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",u&&n!==ml&&(y=n.relatedTarget||n.fromElement)&&(zn(y)||y[Ur]))break e;if((v||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,v?(y=n.relatedTarget||n.toElement,v=d,y=y?zn(y):null,y!==null&&(x=Un(y),y!==x||y.tag!==5&&y.tag!==6)&&(y=null)):(v=null,y=d),v!==y)){if(k=kd,j="onMouseLeave",m="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(k=Nd,j="onPointerLeave",m="onPointerEnter",f="pointer"),x=v==null?u:ea(v),b=y==null?u:ea(y),u=new k(j,f+"leave",v,n,h),u.target=x,u.relatedTarget=b,j=null,zn(h)===d&&(k=new k(m,f+"enter",y,n,h),k.target=b,k.relatedTarget=x,j=k),x=j,v&&y)t:{for(k=v,m=y,f=0,b=k;b;b=Yn(b))f++;for(b=0,j=m;j;j=Yn(j))b++;for(;0<f-b;)k=Yn(k),f--;for(;0<b-f;)m=Yn(m),b--;for(;f--;){if(k===m||m!==null&&k===m.alternate)break t;k=Yn(k),m=Yn(m)}k=null}else k=null;v!==null&&Id(g,u,v,k,!1),y!==null&&x!==null&&Id(g,x,y,k,!0)}}e:{if(u=d?ea(d):window,v=u.nodeName&&u.nodeName.toLowerCase(),v==="select"||v==="input"&&u.type==="file")var w=Ch;else if(Cd(u))if(Ju)w=Eh;else{w=zh;var _=Mh}else(v=u.nodeName)&&v.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(w=$h);if(w&&(w=w(e,d))){Qu(g,w,n,h);break e}_&&_(e,u,d),e==="focusout"&&(_=u._wrapperState)&&_.controlled&&u.type==="number"&&ll(u,"number",u.value)}switch(_=d?ea(d):window,e){case"focusin":(Cd(_)||_.contentEditable==="true")&&(Jn=_,yl=d,qa=null);break;case"focusout":qa=yl=Jn=null;break;case"mousedown":wl=!0;break;case"contextmenu":case"mouseup":case"dragend":wl=!1,Td(g,n,h);break;case"selectionchange":if(Rh)break;case"keydown":case"keyup":Td(g,n,h)}var S;if(yc)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Qn?Xu(e,n)&&(z="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&(Ku&&n.locale!=="ko"&&(Qn||z!=="onCompositionStart"?z==="onCompositionEnd"&&Qn&&(S=Gu()):(sn=h,xc="value"in sn?sn.value:sn.textContent,Qn=!0)),_=No(d,z),0<_.length&&(z=new jd(z,e,null,n,h),g.push({event:z,listeners:_}),S?z.data=S:(S=qu(n),S!==null&&(z.data=S)))),(S=kh?jh(e,n):Nh(e,n))&&(d=No(d,"onBeforeInput"),0<d.length&&(h=new jd("onBeforeInput","beforeinput",null,n,h),g.push({event:h,listeners:d}),h.data=S))}lm(g,t)})}function ds(e,t,n){return{instance:e,listener:t,currentTarget:n}}function No(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=ns(e,n),o!=null&&a.unshift(ds(e,o,s)),o=ns(e,t),o!=null&&a.push(ds(e,o,s))),e=e.return}return a}function Yn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Id(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===a)break;l.tag===5&&d!==null&&(l=d,s?(c=ns(n,o),c!=null&&i.unshift(ds(n,c,l))):s||(c=ns(n,o),c!=null&&i.push(ds(n,c,l)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var Oh=/\r\n?/g,Fh=/\u0000|\uFFFD/g;function Ld(e){return(typeof e=="string"?e:""+e).replace(Oh,`
`).replace(Fh,"")}function Bs(e,t,n){if(t=Ld(t),Ld(e)!==t&&n)throw Error(ae(425))}function _o(){}var kl=null,jl=null;function Nl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var _l=typeof setTimeout=="function"?setTimeout:void 0,Dh=typeof clearTimeout=="function"?clearTimeout:void 0,Ad=typeof Promise=="function"?Promise:void 0,Bh=typeof queueMicrotask=="function"?queueMicrotask:typeof Ad<"u"?function(e){return Ad.resolve(null).then(e).catch(Wh)}:_l;function Wh(e){setTimeout(function(){throw e})}function Ti(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),os(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);os(t)}function pn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Od(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _a=Math.random().toString(36).slice(2),zr="__reactFiber$"+_a,ps="__reactProps$"+_a,Ur="__reactContainer$"+_a,Sl="__reactEvents$"+_a,Uh="__reactListeners$"+_a,Vh="__reactHandles$"+_a;function zn(e){var t=e[zr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ur]||n[zr]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Od(e);e!==null;){if(n=e[zr])return n;e=Od(e)}return t}e=n,n=e.parentNode}return null}function _s(e){return e=e[zr]||e[Ur],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ea(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(ae(33))}function ti(e){return e[ps]||null}var Cl=[],ta=-1;function bn(e){return{current:e}}function ot(e){0>ta||(e.current=Cl[ta],Cl[ta]=null,ta--)}function nt(e,t){ta++,Cl[ta]=e.current,e.current=t}var xn={},It=bn(xn),Yt=bn(!1),Ln=xn;function ha(e,t){var n=e.type.contextTypes;if(!n)return xn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Gt(e){return e=e.childContextTypes,e!=null}function So(){ot(Yt),ot(It)}function Fd(e,t,n){if(It.current!==xn)throw Error(ae(168));nt(It,t),nt(Yt,n)}function dm(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(ae(108,M0(e)||"Unknown",s));return mt({},n,a)}function Co(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||xn,Ln=It.current,nt(It,e),nt(Yt,Yt.current),!0}function Dd(e,t,n){var a=e.stateNode;if(!a)throw Error(ae(169));n?(e=dm(e,t,Ln),a.__reactInternalMemoizedMergedChildContext=e,ot(Yt),ot(It),nt(It,e)):ot(Yt),nt(Yt,n)}var Or=null,ri=!1,Pi=!1;function pm(e){Or===null?Or=[e]:Or.push(e)}function Hh(e){ri=!0,pm(e)}function yn(){if(!Pi&&Or!==null){Pi=!0;var e=0,t=qe;try{var n=Or;for(qe=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Or=null,ri=!1}catch(s){throw Or!==null&&(Or=Or.slice(e+1)),Lu(mc,yn),s}finally{qe=t,Pi=!1}}return null}var ra=[],na=0,Mo=null,zo=0,lr=[],cr=0,An=null,Fr=1,Dr="";function Cn(e,t){ra[na++]=zo,ra[na++]=Mo,Mo=e,zo=t}function um(e,t,n){lr[cr++]=Fr,lr[cr++]=Dr,lr[cr++]=An,An=e;var a=Fr;e=Dr;var s=32-br(a)-1;a&=~(1<<s),n+=1;var o=32-br(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,Fr=1<<32-br(t)+s|n<<s|a,Dr=o+e}else Fr=1<<o|n<<s|a,Dr=e}function kc(e){e.return!==null&&(Cn(e,1),um(e,1,0))}function jc(e){for(;e===Mo;)Mo=ra[--na],ra[na]=null,zo=ra[--na],ra[na]=null;for(;e===An;)An=lr[--cr],lr[cr]=null,Dr=lr[--cr],lr[cr]=null,Fr=lr[--cr],lr[cr]=null}var rr=null,tr=null,lt=!1,xr=null;function mm(e,t){var n=dr(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Bd(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,rr=e,tr=pn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,rr=e,tr=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=An!==null?{id:Fr,overflow:Dr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=dr(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,rr=e,tr=null,!0):!1;default:return!1}}function Ml(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zl(e){if(lt){var t=tr;if(t){var n=t;if(!Bd(e,t)){if(Ml(e))throw Error(ae(418));t=pn(n.nextSibling);var a=rr;t&&Bd(e,t)?mm(a,n):(e.flags=e.flags&-4097|2,lt=!1,rr=e)}}else{if(Ml(e))throw Error(ae(418));e.flags=e.flags&-4097|2,lt=!1,rr=e}}}function Wd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;rr=e}function Ws(e){if(e!==rr)return!1;if(!lt)return Wd(e),lt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Nl(e.type,e.memoizedProps)),t&&(t=tr)){if(Ml(e))throw fm(),Error(ae(418));for(;t;)mm(e,t),t=pn(t.nextSibling)}if(Wd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(ae(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){tr=pn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}tr=null}}else tr=rr?pn(e.stateNode.nextSibling):null;return!0}function fm(){for(var e=tr;e;)e=pn(e.nextSibling)}function ga(){tr=rr=null,lt=!1}function Nc(e){xr===null?xr=[e]:xr.push(e)}var Yh=Gr.ReactCurrentBatchConfig;function Ea(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var a=n.stateNode}if(!a)throw Error(ae(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var l=s.refs;i===null?delete l[o]:l[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,e))}return e}function Us(e,t){throw e=Object.prototype.toString.call(t),Error(ae(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ud(e){var t=e._init;return t(e._payload)}function hm(e){function t(m,f){if(e){var b=m.deletions;b===null?(m.deletions=[f],m.flags|=16):b.push(f)}}function n(m,f){if(!e)return null;for(;f!==null;)t(m,f),f=f.sibling;return null}function a(m,f){for(m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function s(m,f){return m=hn(m,f),m.index=0,m.sibling=null,m}function o(m,f,b){return m.index=b,e?(b=m.alternate,b!==null?(b=b.index,b<f?(m.flags|=2,f):b):(m.flags|=2,f)):(m.flags|=1048576,f)}function i(m){return e&&m.alternate===null&&(m.flags|=2),m}function l(m,f,b,j){return f===null||f.tag!==6?(f=Di(b,m.mode,j),f.return=m,f):(f=s(f,b),f.return=m,f)}function c(m,f,b,j){var w=b.type;return w===qn?h(m,f,b.props.children,j,b.key):f!==null&&(f.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===en&&Ud(w)===f.type)?(j=s(f,b.props),j.ref=Ea(m,f,b),j.return=m,j):(j=mo(b.type,b.key,b.props,null,m.mode,j),j.ref=Ea(m,f,b),j.return=m,j)}function d(m,f,b,j){return f===null||f.tag!==4||f.stateNode.containerInfo!==b.containerInfo||f.stateNode.implementation!==b.implementation?(f=Bi(b,m.mode,j),f.return=m,f):(f=s(f,b.children||[]),f.return=m,f)}function h(m,f,b,j,w){return f===null||f.tag!==7?(f=Rn(b,m.mode,j,w),f.return=m,f):(f=s(f,b),f.return=m,f)}function g(m,f,b){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Di(""+f,m.mode,b),f.return=m,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ts:return b=mo(f.type,f.key,f.props,null,m.mode,b),b.ref=Ea(m,null,f),b.return=m,b;case Xn:return f=Bi(f,m.mode,b),f.return=m,f;case en:var j=f._init;return g(m,j(f._payload),b)}if(Fa(f)||Sa(f))return f=Rn(f,m.mode,b,null),f.return=m,f;Us(m,f)}return null}function u(m,f,b,j){var w=f!==null?f.key:null;if(typeof b=="string"&&b!==""||typeof b=="number")return w!==null?null:l(m,f,""+b,j);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ts:return b.key===w?c(m,f,b,j):null;case Xn:return b.key===w?d(m,f,b,j):null;case en:return w=b._init,u(m,f,w(b._payload),j)}if(Fa(b)||Sa(b))return w!==null?null:h(m,f,b,j,null);Us(m,b)}return null}function v(m,f,b,j,w){if(typeof j=="string"&&j!==""||typeof j=="number")return m=m.get(b)||null,l(f,m,""+j,w);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case Ts:return m=m.get(j.key===null?b:j.key)||null,c(f,m,j,w);case Xn:return m=m.get(j.key===null?b:j.key)||null,d(f,m,j,w);case en:var _=j._init;return v(m,f,b,_(j._payload),w)}if(Fa(j)||Sa(j))return m=m.get(b)||null,h(f,m,j,w,null);Us(f,j)}return null}function y(m,f,b,j){for(var w=null,_=null,S=f,z=f=0,R=null;S!==null&&z<b.length;z++){S.index>z?(R=S,S=null):R=S.sibling;var F=u(m,S,b[z],j);if(F===null){S===null&&(S=R);break}e&&S&&F.alternate===null&&t(m,S),f=o(F,f,z),_===null?w=F:_.sibling=F,_=F,S=R}if(z===b.length)return n(m,S),lt&&Cn(m,z),w;if(S===null){for(;z<b.length;z++)S=g(m,b[z],j),S!==null&&(f=o(S,f,z),_===null?w=S:_.sibling=S,_=S);return lt&&Cn(m,z),w}for(S=a(m,S);z<b.length;z++)R=v(S,m,z,b[z],j),R!==null&&(e&&R.alternate!==null&&S.delete(R.key===null?z:R.key),f=o(R,f,z),_===null?w=R:_.sibling=R,_=R);return e&&S.forEach(function(E){return t(m,E)}),lt&&Cn(m,z),w}function k(m,f,b,j){var w=Sa(b);if(typeof w!="function")throw Error(ae(150));if(b=w.call(b),b==null)throw Error(ae(151));for(var _=w=null,S=f,z=f=0,R=null,F=b.next();S!==null&&!F.done;z++,F=b.next()){S.index>z?(R=S,S=null):R=S.sibling;var E=u(m,S,F.value,j);if(E===null){S===null&&(S=R);break}e&&S&&E.alternate===null&&t(m,S),f=o(E,f,z),_===null?w=E:_.sibling=E,_=E,S=R}if(F.done)return n(m,S),lt&&Cn(m,z),w;if(S===null){for(;!F.done;z++,F=b.next())F=g(m,F.value,j),F!==null&&(f=o(F,f,z),_===null?w=F:_.sibling=F,_=F);return lt&&Cn(m,z),w}for(S=a(m,S);!F.done;z++,F=b.next())F=v(S,m,z,F.value,j),F!==null&&(e&&F.alternate!==null&&S.delete(F.key===null?z:F.key),f=o(F,f,z),_===null?w=F:_.sibling=F,_=F);return e&&S.forEach(function(P){return t(m,P)}),lt&&Cn(m,z),w}function x(m,f,b,j){if(typeof b=="object"&&b!==null&&b.type===qn&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case Ts:e:{for(var w=b.key,_=f;_!==null;){if(_.key===w){if(w=b.type,w===qn){if(_.tag===7){n(m,_.sibling),f=s(_,b.props.children),f.return=m,m=f;break e}}else if(_.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===en&&Ud(w)===_.type){n(m,_.sibling),f=s(_,b.props),f.ref=Ea(m,_,b),f.return=m,m=f;break e}n(m,_);break}else t(m,_);_=_.sibling}b.type===qn?(f=Rn(b.props.children,m.mode,j,b.key),f.return=m,m=f):(j=mo(b.type,b.key,b.props,null,m.mode,j),j.ref=Ea(m,f,b),j.return=m,m=j)}return i(m);case Xn:e:{for(_=b.key;f!==null;){if(f.key===_)if(f.tag===4&&f.stateNode.containerInfo===b.containerInfo&&f.stateNode.implementation===b.implementation){n(m,f.sibling),f=s(f,b.children||[]),f.return=m,m=f;break e}else{n(m,f);break}else t(m,f);f=f.sibling}f=Bi(b,m.mode,j),f.return=m,m=f}return i(m);case en:return _=b._init,x(m,f,_(b._payload),j)}if(Fa(b))return y(m,f,b,j);if(Sa(b))return k(m,f,b,j);Us(m,b)}return typeof b=="string"&&b!==""||typeof b=="number"?(b=""+b,f!==null&&f.tag===6?(n(m,f.sibling),f=s(f,b),f.return=m,m=f):(n(m,f),f=Di(b,m.mode,j),f.return=m,m=f),i(m)):n(m,f)}return x}var xa=hm(!0),gm=hm(!1),$o=bn(null),Eo=null,aa=null,_c=null;function Sc(){_c=aa=Eo=null}function Cc(e){var t=$o.current;ot($o),e._currentValue=t}function $l(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function pa(e,t){Eo=e,_c=aa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Vt=!0),e.firstContext=null)}function ur(e){var t=e._currentValue;if(_c!==e)if(e={context:e,memoizedValue:t,next:null},aa===null){if(Eo===null)throw Error(ae(308));aa=e,Eo.dependencies={lanes:0,firstContext:e}}else aa=aa.next=e;return t}var $n=null;function Mc(e){$n===null?$n=[e]:$n.push(e)}function xm(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,Mc(t)):(n.next=s.next,s.next=n),t.interleaved=n,Vr(e,a)}function Vr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var tn=!1;function zc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Br(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function un(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,Ve&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Vr(e,n)}return s=a.interleaved,s===null?(t.next=t,Mc(a)):(t.next=s.next,s.next=t),a.interleaved=t,Vr(e,n)}function oo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,fc(e,n)}}function Vd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function To(e,t,n,a){var s=e.updateQueue;tn=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,i===null?o=d:i.next=d,i=c;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==i&&(l===null?h.firstBaseUpdate=d:l.next=d,h.lastBaseUpdate=c))}if(o!==null){var g=s.baseState;i=0,h=d=c=null,l=o;do{var u=l.lane,v=l.eventTime;if((a&u)===u){h!==null&&(h=h.next={eventTime:v,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,k=l;switch(u=t,v=n,k.tag){case 1:if(y=k.payload,typeof y=="function"){g=y.call(v,g,u);break e}g=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=k.payload,u=typeof y=="function"?y.call(v,g,u):y,u==null)break e;g=mt({},g,u);break e;case 2:tn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else v={eventTime:v,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(d=h=v,c=g):h=h.next=v,i|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(h===null&&(c=g),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=h,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Fn|=i,e.lanes=i,e.memoizedState=g}}function Hd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(ae(191,s));s.call(a)}}}var Ss={},Er=bn(Ss),us=bn(Ss),ms=bn(Ss);function En(e){if(e===Ss)throw Error(ae(174));return e}function $c(e,t){switch(nt(ms,t),nt(us,e),nt(Er,Ss),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:dl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=dl(t,e)}ot(Er),nt(Er,t)}function va(){ot(Er),ot(us),ot(ms)}function bm(e){En(ms.current);var t=En(Er.current),n=dl(t,e.type);t!==n&&(nt(us,e),nt(Er,n))}function Ec(e){us.current===e&&(ot(Er),ot(us))}var pt=bn(0);function Po(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ri=[];function Tc(){for(var e=0;e<Ri.length;e++)Ri[e]._workInProgressVersionPrimary=null;Ri.length=0}var io=Gr.ReactCurrentDispatcher,Ii=Gr.ReactCurrentBatchConfig,On=0,ut=null,kt=null,_t=null,Ro=!1,Qa=!1,fs=0,Gh=0;function Tt(){throw Error(ae(321))}function Pc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!wr(e[n],t[n]))return!1;return!0}function Rc(e,t,n,a,s,o){if(On=o,ut=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,io.current=e===null||e.memoizedState===null?Qh:Jh,e=n(a,s),Qa){o=0;do{if(Qa=!1,fs=0,25<=o)throw Error(ae(301));o+=1,_t=kt=null,t.updateQueue=null,io.current=Zh,e=n(a,s)}while(Qa)}if(io.current=Io,t=kt!==null&&kt.next!==null,On=0,_t=kt=ut=null,Ro=!1,t)throw Error(ae(300));return e}function Ic(){var e=fs!==0;return fs=0,e}function Mr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?ut.memoizedState=_t=e:_t=_t.next=e,_t}function mr(){if(kt===null){var e=ut.alternate;e=e!==null?e.memoizedState:null}else e=kt.next;var t=_t===null?ut.memoizedState:_t.next;if(t!==null)_t=t,kt=e;else{if(e===null)throw Error(ae(310));kt=e,e={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},_t===null?ut.memoizedState=_t=e:_t=_t.next=e}return _t}function hs(e,t){return typeof t=="function"?t(e):t}function Li(e){var t=mr(),n=t.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=e;var a=kt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var l=i=null,c=null,d=o;do{var h=d.lane;if((On&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=g,i=a):c=c.next=g,ut.lanes|=h,Fn|=h}d=d.next}while(d!==null&&d!==o);c===null?i=a:c.next=l,wr(a,t.memoizedState)||(Vt=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=c,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,ut.lanes|=o,Fn|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ai(e){var t=mr(),n=t.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);wr(o,t.memoizedState)||(Vt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function ym(){}function wm(e,t){var n=ut,a=mr(),s=t(),o=!wr(a.memoizedState,s);if(o&&(a.memoizedState=s,Vt=!0),a=a.queue,Lc(Nm.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||_t!==null&&_t.memoizedState.tag&1){if(n.flags|=2048,gs(9,jm.bind(null,n,a,s,t),void 0,null),St===null)throw Error(ae(349));On&30||km(n,t,s)}return s}function km(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ut.updateQueue,t===null?(t={lastEffect:null,stores:null},ut.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function jm(e,t,n,a){t.value=n,t.getSnapshot=a,_m(t)&&Sm(e)}function Nm(e,t,n){return n(function(){_m(t)&&Sm(e)})}function _m(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wr(e,n)}catch{return!0}}function Sm(e){var t=Vr(e,1);t!==null&&yr(t,e,1,-1)}function Yd(e){var t=Mr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:e},t.queue=e,e=e.dispatch=qh.bind(null,ut,e),[t.memoizedState,e]}function gs(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=ut.updateQueue,t===null?(t={lastEffect:null,stores:null},ut.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Cm(){return mr().memoizedState}function lo(e,t,n,a){var s=Mr();ut.flags|=e,s.memoizedState=gs(1|t,n,void 0,a===void 0?null:a)}function ni(e,t,n,a){var s=mr();a=a===void 0?null:a;var o=void 0;if(kt!==null){var i=kt.memoizedState;if(o=i.destroy,a!==null&&Pc(a,i.deps)){s.memoizedState=gs(t,n,o,a);return}}ut.flags|=e,s.memoizedState=gs(1|t,n,o,a)}function Gd(e,t){return lo(8390656,8,e,t)}function Lc(e,t){return ni(2048,8,e,t)}function Mm(e,t){return ni(4,2,e,t)}function zm(e,t){return ni(4,4,e,t)}function $m(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Em(e,t,n){return n=n!=null?n.concat([e]):null,ni(4,4,$m.bind(null,t,e),n)}function Ac(){}function Tm(e,t){var n=mr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Pc(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Pm(e,t){var n=mr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Pc(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Rm(e,t,n){return On&21?(wr(n,t)||(n=Fu(),ut.lanes|=n,Fn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Vt=!0),e.memoizedState=n)}function Kh(e,t){var n=qe;qe=n!==0&&4>n?n:4,e(!0);var a=Ii.transition;Ii.transition={};try{e(!1),t()}finally{qe=n,Ii.transition=a}}function Im(){return mr().memoizedState}function Xh(e,t,n){var a=fn(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Lm(e))Am(t,n);else if(n=xm(e,t,n,a),n!==null){var s=At();yr(n,e,a,s),Om(n,t,a)}}function qh(e,t,n){var a=fn(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Lm(e))Am(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,l=o(i,n);if(s.hasEagerState=!0,s.eagerState=l,wr(l,i)){var c=t.interleaved;c===null?(s.next=s,Mc(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=xm(e,t,s,a),n!==null&&(s=At(),yr(n,e,a,s),Om(n,t,a))}}function Lm(e){var t=e.alternate;return e===ut||t!==null&&t===ut}function Am(e,t){Qa=Ro=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Om(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,fc(e,n)}}var Io={readContext:ur,useCallback:Tt,useContext:Tt,useEffect:Tt,useImperativeHandle:Tt,useInsertionEffect:Tt,useLayoutEffect:Tt,useMemo:Tt,useReducer:Tt,useRef:Tt,useState:Tt,useDebugValue:Tt,useDeferredValue:Tt,useTransition:Tt,useMutableSource:Tt,useSyncExternalStore:Tt,useId:Tt,unstable_isNewReconciler:!1},Qh={readContext:ur,useCallback:function(e,t){return Mr().memoizedState=[e,t===void 0?null:t],e},useContext:ur,useEffect:Gd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,lo(4194308,4,$m.bind(null,t,e),n)},useLayoutEffect:function(e,t){return lo(4194308,4,e,t)},useInsertionEffect:function(e,t){return lo(4,2,e,t)},useMemo:function(e,t){var n=Mr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Mr();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=Xh.bind(null,ut,e),[a.memoizedState,e]},useRef:function(e){var t=Mr();return e={current:e},t.memoizedState=e},useState:Yd,useDebugValue:Ac,useDeferredValue:function(e){return Mr().memoizedState=e},useTransition:function(){var e=Yd(!1),t=e[0];return e=Kh.bind(null,e[1]),Mr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=ut,s=Mr();if(lt){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=t(),St===null)throw Error(ae(349));On&30||km(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,Gd(Nm.bind(null,a,o,e),[e]),a.flags|=2048,gs(9,jm.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=Mr(),t=St.identifierPrefix;if(lt){var n=Dr,a=Fr;n=(a&~(1<<32-br(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=fs++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Gh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Jh={readContext:ur,useCallback:Tm,useContext:ur,useEffect:Lc,useImperativeHandle:Em,useInsertionEffect:Mm,useLayoutEffect:zm,useMemo:Pm,useReducer:Li,useRef:Cm,useState:function(){return Li(hs)},useDebugValue:Ac,useDeferredValue:function(e){var t=mr();return Rm(t,kt.memoizedState,e)},useTransition:function(){var e=Li(hs)[0],t=mr().memoizedState;return[e,t]},useMutableSource:ym,useSyncExternalStore:wm,useId:Im,unstable_isNewReconciler:!1},Zh={readContext:ur,useCallback:Tm,useContext:ur,useEffect:Lc,useImperativeHandle:Em,useInsertionEffect:Mm,useLayoutEffect:zm,useMemo:Pm,useReducer:Ai,useRef:Cm,useState:function(){return Ai(hs)},useDebugValue:Ac,useDeferredValue:function(e){var t=mr();return kt===null?t.memoizedState=e:Rm(t,kt.memoizedState,e)},useTransition:function(){var e=Ai(hs)[0],t=mr().memoizedState;return[e,t]},useMutableSource:ym,useSyncExternalStore:wm,useId:Im,unstable_isNewReconciler:!1};function hr(e,t){if(e&&e.defaultProps){t=mt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function El(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:mt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ai={isMounted:function(e){return(e=e._reactInternals)?Un(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=At(),s=fn(e),o=Br(a,s);o.payload=t,n!=null&&(o.callback=n),t=un(e,o,s),t!==null&&(yr(t,e,s,a),oo(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=At(),s=fn(e),o=Br(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=un(e,o,s),t!==null&&(yr(t,e,s,a),oo(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=At(),a=fn(e),s=Br(n,a);s.tag=2,t!=null&&(s.callback=t),t=un(e,s,a),t!==null&&(yr(t,e,a,n),oo(t,e,a))}};function Kd(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!ls(n,a)||!ls(s,o):!0}function Fm(e,t,n){var a=!1,s=xn,o=t.contextType;return typeof o=="object"&&o!==null?o=ur(o):(s=Gt(t)?Ln:It.current,a=t.contextTypes,o=(a=a!=null)?ha(e,s):xn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ai,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function Xd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&ai.enqueueReplaceState(t,t.state,null)}function Tl(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},zc(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=ur(o):(o=Gt(t)?Ln:It.current,s.context=ha(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(El(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ai.enqueueReplaceState(s,s.state,null),To(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function ba(e,t){try{var n="",a=t;do n+=C0(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function Oi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Pl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var eg=typeof WeakMap=="function"?WeakMap:Map;function Dm(e,t,n){n=Br(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Ao||(Ao=!0,Ul=a),Pl(e,t)},n}function Bm(e,t,n){n=Br(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){Pl(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Pl(e,t),typeof a!="function"&&(mn===null?mn=new Set([this]):mn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function qd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new eg;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=fg.bind(null,e,t,n),t.then(e,e))}function Qd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Jd(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Br(-1,1),t.tag=2,un(n,t,1))),n.lanes|=1),e)}var tg=Gr.ReactCurrentOwner,Vt=!1;function Lt(e,t,n,a){t.child=e===null?gm(t,null,n,a):xa(t,e.child,n,a)}function Zd(e,t,n,a,s){n=n.render;var o=t.ref;return pa(t,s),a=Rc(e,t,n,a,o,s),n=Ic(),e!==null&&!Vt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Hr(e,t,s)):(lt&&n&&kc(t),t.flags|=1,Lt(e,t,a,s),t.child)}function ep(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!Hc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Wm(e,t,o,a,s)):(e=mo(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:ls,n(i,a)&&e.ref===t.ref)return Hr(e,t,s)}return t.flags|=1,e=hn(o,a),e.ref=t.ref,e.return=t,t.child=e}function Wm(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(ls(o,a)&&e.ref===t.ref)if(Vt=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Vt=!0);else return t.lanes=e.lanes,Hr(e,t,s)}return Rl(e,t,n,a,s)}function Um(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},nt(oa,er),er|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,nt(oa,er),er|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,nt(oa,er),er|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,nt(oa,er),er|=a;return Lt(e,t,s,n),t.child}function Vm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Rl(e,t,n,a,s){var o=Gt(n)?Ln:It.current;return o=ha(t,o),pa(t,s),n=Rc(e,t,n,a,o,s),a=Ic(),e!==null&&!Vt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Hr(e,t,s)):(lt&&a&&kc(t),t.flags|=1,Lt(e,t,n,s),t.child)}function tp(e,t,n,a,s){if(Gt(n)){var o=!0;Co(t)}else o=!1;if(pa(t,s),t.stateNode===null)co(e,t),Fm(t,n,a),Tl(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var c=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=ur(d):(d=Gt(n)?Ln:It.current,d=ha(t,d));var h=n.getDerivedStateFromProps,g=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==a||c!==d)&&Xd(t,i,a,d),tn=!1;var u=t.memoizedState;i.state=u,To(t,a,i,s),c=t.memoizedState,l!==a||u!==c||Yt.current||tn?(typeof h=="function"&&(El(t,n,h,a),c=t.memoizedState),(l=tn||Kd(t,n,l,a,u,c,d))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),i.props=a,i.state=c,i.context=d,a=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,vm(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:hr(t.type,l),i.props=d,g=t.pendingProps,u=i.context,c=n.contextType,typeof c=="object"&&c!==null?c=ur(c):(c=Gt(n)?Ln:It.current,c=ha(t,c));var v=n.getDerivedStateFromProps;(h=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==g||u!==c)&&Xd(t,i,a,c),tn=!1,u=t.memoizedState,i.state=u,To(t,a,i,s);var y=t.memoizedState;l!==g||u!==y||Yt.current||tn?(typeof v=="function"&&(El(t,n,v,a),y=t.memoizedState),(d=tn||Kd(t,n,d,a,u,y,c)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=c,a=d):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),a=!1)}return Il(e,t,n,a,o,s)}function Il(e,t,n,a,s,o){Vm(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&Dd(t,n,!1),Hr(e,t,o);a=t.stateNode,tg.current=t;var l=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=xa(t,e.child,null,o),t.child=xa(t,null,l,o)):Lt(e,t,l,o),t.memoizedState=a.state,s&&Dd(t,n,!0),t.child}function Hm(e){var t=e.stateNode;t.pendingContext?Fd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Fd(e,t.context,!1),$c(e,t.containerInfo)}function rp(e,t,n,a,s){return ga(),Nc(s),t.flags|=256,Lt(e,t,n,a),t.child}var Ll={dehydrated:null,treeContext:null,retryLane:0};function Al(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ym(e,t,n){var a=t.pendingProps,s=pt.current,o=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),nt(pt,s&1),e===null)return zl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=ii(i,a,0,null),e=Rn(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Al(n),t.memoizedState=Ll,e):Oc(t,i));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return rg(e,t,i,a,l,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=c,t.deletions=null):(a=hn(s,c),a.subtreeFlags=s.subtreeFlags&14680064),l!==null?o=hn(l,o):(o=Rn(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?Al(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=Ll,a}return o=e.child,e=o.sibling,a=hn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Oc(e,t){return t=ii({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Vs(e,t,n,a){return a!==null&&Nc(a),xa(t,e.child,null,n),e=Oc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function rg(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=Oi(Error(ae(422))),Vs(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=ii({mode:"visible",children:a.children},s,0,null),o=Rn(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&xa(t,e.child,null,i),t.child.memoizedState=Al(i),t.memoizedState=Ll,o);if(!(t.mode&1))return Vs(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var l=a.dgst;return a=l,o=Error(ae(419)),a=Oi(o,a,void 0),Vs(e,t,i,a)}if(l=(i&e.childLanes)!==0,Vt||l){if(a=St,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Vr(e,s),yr(a,e,s,-1))}return Vc(),a=Oi(Error(ae(421))),Vs(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=hg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,tr=pn(s.nextSibling),rr=t,lt=!0,xr=null,e!==null&&(lr[cr++]=Fr,lr[cr++]=Dr,lr[cr++]=An,Fr=e.id,Dr=e.overflow,An=t),t=Oc(t,a.children),t.flags|=4096,t)}function np(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),$l(e.return,t,n)}function Fi(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function Gm(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(Lt(e,t,a.children,n),a=pt.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&np(e,n,t);else if(e.tag===19)np(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(nt(pt,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Po(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Fi(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Po(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Fi(t,!0,n,null,o);break;case"together":Fi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function co(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Fn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(ae(153));if(t.child!==null){for(e=t.child,n=hn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ng(e,t,n){switch(t.tag){case 3:Hm(t),ga();break;case 5:bm(t);break;case 1:Gt(t.type)&&Co(t);break;case 4:$c(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;nt($o,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(nt(pt,pt.current&1),t.flags|=128,null):n&t.child.childLanes?Ym(e,t,n):(nt(pt,pt.current&1),e=Hr(e,t,n),e!==null?e.sibling:null);nt(pt,pt.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return Gm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),nt(pt,pt.current),a)break;return null;case 22:case 23:return t.lanes=0,Um(e,t,n)}return Hr(e,t,n)}var Km,Ol,Xm,qm;Km=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ol=function(){};Xm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,En(Er.current);var o=null;switch(n){case"input":s=ol(e,s),a=ol(e,a),o=[];break;case"select":s=mt({},s,{value:void 0}),a=mt({},a,{value:void 0}),o=[];break;case"textarea":s=cl(e,s),a=cl(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=_o)}pl(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ts.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var c=a[d];if(l=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(i in l)!l.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&l[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ts.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&st("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};qm=function(e,t,n,a){n!==a&&(t.flags|=4)};function Ta(e,t){if(!lt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Pt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function ag(e,t,n){var a=t.pendingProps;switch(jc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pt(t),null;case 1:return Gt(t.type)&&So(),Pt(t),null;case 3:return a=t.stateNode,va(),ot(Yt),ot(It),Tc(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Ws(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,xr!==null&&(Yl(xr),xr=null))),Ol(e,t),Pt(t),null;case 5:Ec(t);var s=En(ms.current);if(n=t.type,e!==null&&t.stateNode!=null)Xm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(ae(166));return Pt(t),null}if(e=En(Er.current),Ws(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[zr]=t,a[ps]=o,e=(t.mode&1)!==0,n){case"dialog":st("cancel",a),st("close",a);break;case"iframe":case"object":case"embed":st("load",a);break;case"video":case"audio":for(s=0;s<Ba.length;s++)st(Ba[s],a);break;case"source":st("error",a);break;case"img":case"image":case"link":st("error",a),st("load",a);break;case"details":st("toggle",a);break;case"input":ud(a,o),st("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},st("invalid",a);break;case"textarea":fd(a,o),st("invalid",a)}pl(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="children"?typeof l=="string"?a.textContent!==l&&(o.suppressHydrationWarning!==!0&&Bs(a.textContent,l,e),s=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Bs(a.textContent,l,e),s=["children",""+l]):ts.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&st("scroll",a)}switch(n){case"input":Ps(a),md(a,o,!0);break;case"textarea":Ps(a),hd(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=_o)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Nu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[zr]=t,e[ps]=a,Km(e,t,!1,!1),t.stateNode=e;e:{switch(i=ul(n,a),n){case"dialog":st("cancel",e),st("close",e),s=a;break;case"iframe":case"object":case"embed":st("load",e),s=a;break;case"video":case"audio":for(s=0;s<Ba.length;s++)st(Ba[s],e);s=a;break;case"source":st("error",e),s=a;break;case"img":case"image":case"link":st("error",e),st("load",e),s=a;break;case"details":st("toggle",e),s=a;break;case"input":ud(e,a),s=ol(e,a),st("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=mt({},a,{value:void 0}),st("invalid",e);break;case"textarea":fd(e,a),s=cl(e,a),st("invalid",e);break;default:s=a}pl(n,s),l=s;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?Cu(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&_u(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&rs(e,c):typeof c=="number"&&rs(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ts.hasOwnProperty(o)?c!=null&&o==="onScroll"&&st("scroll",e):c!=null&&lc(e,o,c,i))}switch(n){case"input":Ps(e),md(e,a,!1);break;case"textarea":Ps(e),hd(e);break;case"option":a.value!=null&&e.setAttribute("value",""+gn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?ia(e,!!a.multiple,o,!1):a.defaultValue!=null&&ia(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=_o)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Pt(t),null;case 6:if(e&&t.stateNode!=null)qm(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(ae(166));if(n=En(ms.current),En(Er.current),Ws(t)){if(a=t.stateNode,n=t.memoizedProps,a[zr]=t,(o=a.nodeValue!==n)&&(e=rr,e!==null))switch(e.tag){case 3:Bs(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Bs(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[zr]=t,t.stateNode=a}return Pt(t),null;case 13:if(ot(pt),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(lt&&tr!==null&&t.mode&1&&!(t.flags&128))fm(),ga(),t.flags|=98560,o=!1;else if(o=Ws(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(ae(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(ae(317));o[zr]=t}else ga(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pt(t),o=!1}else xr!==null&&(Yl(xr),xr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||pt.current&1?jt===0&&(jt=3):Vc())),t.updateQueue!==null&&(t.flags|=4),Pt(t),null);case 4:return va(),Ol(e,t),e===null&&cs(t.stateNode.containerInfo),Pt(t),null;case 10:return Cc(t.type._context),Pt(t),null;case 17:return Gt(t.type)&&So(),Pt(t),null;case 19:if(ot(pt),o=t.memoizedState,o===null)return Pt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)Ta(o,!1);else{if(jt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Po(e),i!==null){for(t.flags|=128,Ta(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return nt(pt,pt.current&1|2),t.child}e=e.sibling}o.tail!==null&&bt()>ya&&(t.flags|=128,a=!0,Ta(o,!1),t.lanes=4194304)}else{if(!a)if(e=Po(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ta(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!lt)return Pt(t),null}else 2*bt()-o.renderingStartTime>ya&&n!==1073741824&&(t.flags|=128,a=!0,Ta(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=bt(),t.sibling=null,n=pt.current,nt(pt,a?n&1|2:n&1),t):(Pt(t),null);case 22:case 23:return Uc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?er&1073741824&&(Pt(t),t.subtreeFlags&6&&(t.flags|=8192)):Pt(t),null;case 24:return null;case 25:return null}throw Error(ae(156,t.tag))}function sg(e,t){switch(jc(t),t.tag){case 1:return Gt(t.type)&&So(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return va(),ot(Yt),ot(It),Tc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ec(t),null;case 13:if(ot(pt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(ae(340));ga()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ot(pt),null;case 4:return va(),null;case 10:return Cc(t.type._context),null;case 22:case 23:return Uc(),null;case 24:return null;default:return null}}var Hs=!1,Rt=!1,og=typeof WeakSet=="function"?WeakSet:Set,he=null;function sa(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){xt(e,t,a)}else n.current=null}function Fl(e,t,n){try{n()}catch(a){xt(e,t,a)}}var ap=!1;function ig(e,t){if(kl=ko,e=tm(),wc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,l=-1,c=-1,d=0,h=0,g=e,u=null;t:for(;;){for(var v;g!==n||s!==0&&g.nodeType!==3||(l=i+s),g!==o||a!==0&&g.nodeType!==3||(c=i+a),g.nodeType===3&&(i+=g.nodeValue.length),(v=g.firstChild)!==null;)u=g,g=v;for(;;){if(g===e)break t;if(u===n&&++d===s&&(l=i),u===o&&++h===a&&(c=i),(v=g.nextSibling)!==null)break;g=u,u=g.parentNode}g=v}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(jl={focusedElem:e,selectionRange:n},ko=!1,he=t;he!==null;)if(t=he,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,he=e;else for(;he!==null;){t=he;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var k=y.memoizedProps,x=y.memoizedState,m=t.stateNode,f=m.getSnapshotBeforeUpdate(t.elementType===t.type?k:hr(t.type,k),x);m.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var b=t.stateNode.containerInfo;b.nodeType===1?b.textContent="":b.nodeType===9&&b.documentElement&&b.removeChild(b.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(j){xt(t,t.return,j)}if(e=t.sibling,e!==null){e.return=t.return,he=e;break}he=t.return}return y=ap,ap=!1,y}function Ja(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Fl(t,n,o)}s=s.next}while(s!==a)}}function si(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function Dl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Qm(e){var t=e.alternate;t!==null&&(e.alternate=null,Qm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[zr],delete t[ps],delete t[Sl],delete t[Uh],delete t[Vh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Jm(e){return e.tag===5||e.tag===3||e.tag===4}function sp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Jm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_o));else if(a!==4&&(e=e.child,e!==null))for(Bl(e,t,n),e=e.sibling;e!==null;)Bl(e,t,n),e=e.sibling}function Wl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Wl(e,t,n),e=e.sibling;e!==null;)Wl(e,t,n),e=e.sibling}var Ct=null,gr=!1;function Zr(e,t,n){for(n=n.child;n!==null;)Zm(e,t,n),n=n.sibling}function Zm(e,t,n){if($r&&typeof $r.onCommitFiberUnmount=="function")try{$r.onCommitFiberUnmount(Qo,n)}catch{}switch(n.tag){case 5:Rt||sa(n,t);case 6:var a=Ct,s=gr;Ct=null,Zr(e,t,n),Ct=a,gr=s,Ct!==null&&(gr?(e=Ct,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ct.removeChild(n.stateNode));break;case 18:Ct!==null&&(gr?(e=Ct,n=n.stateNode,e.nodeType===8?Ti(e.parentNode,n):e.nodeType===1&&Ti(e,n),os(e)):Ti(Ct,n.stateNode));break;case 4:a=Ct,s=gr,Ct=n.stateNode.containerInfo,gr=!0,Zr(e,t,n),Ct=a,gr=s;break;case 0:case 11:case 14:case 15:if(!Rt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Fl(n,t,i),s=s.next}while(s!==a)}Zr(e,t,n);break;case 1:if(!Rt&&(sa(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){xt(n,t,l)}Zr(e,t,n);break;case 21:Zr(e,t,n);break;case 22:n.mode&1?(Rt=(a=Rt)||n.memoizedState!==null,Zr(e,t,n),Rt=a):Zr(e,t,n);break;default:Zr(e,t,n)}}function op(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new og),t.forEach(function(a){var s=gg.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function fr(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:Ct=l.stateNode,gr=!1;break e;case 3:Ct=l.stateNode.containerInfo,gr=!0;break e;case 4:Ct=l.stateNode.containerInfo,gr=!0;break e}l=l.return}if(Ct===null)throw Error(ae(160));Zm(o,i,s),Ct=null,gr=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){xt(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ef(t,e),t=t.sibling}function ef(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fr(t,e),Cr(e),a&4){try{Ja(3,e,e.return),si(3,e)}catch(k){xt(e,e.return,k)}try{Ja(5,e,e.return)}catch(k){xt(e,e.return,k)}}break;case 1:fr(t,e),Cr(e),a&512&&n!==null&&sa(n,n.return);break;case 5:if(fr(t,e),Cr(e),a&512&&n!==null&&sa(n,n.return),e.flags&32){var s=e.stateNode;try{rs(s,"")}catch(k){xt(e,e.return,k)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&ku(s,o),ul(l,i);var d=ul(l,o);for(i=0;i<c.length;i+=2){var h=c[i],g=c[i+1];h==="style"?Cu(s,g):h==="dangerouslySetInnerHTML"?_u(s,g):h==="children"?rs(s,g):lc(s,h,g,d)}switch(l){case"input":il(s,o);break;case"textarea":ju(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?ia(s,!!o.multiple,v,!1):u!==!!o.multiple&&(o.defaultValue!=null?ia(s,!!o.multiple,o.defaultValue,!0):ia(s,!!o.multiple,o.multiple?[]:"",!1))}s[ps]=o}catch(k){xt(e,e.return,k)}}break;case 6:if(fr(t,e),Cr(e),a&4){if(e.stateNode===null)throw Error(ae(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(k){xt(e,e.return,k)}}break;case 3:if(fr(t,e),Cr(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{os(t.containerInfo)}catch(k){xt(e,e.return,k)}break;case 4:fr(t,e),Cr(e);break;case 13:fr(t,e),Cr(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(Bc=bt())),a&4&&op(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(Rt=(d=Rt)||h,fr(t,e),Rt=d):fr(t,e),Cr(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(he=e,h=e.child;h!==null;){for(g=he=h;he!==null;){switch(u=he,v=u.child,u.tag){case 0:case 11:case 14:case 15:Ja(4,u,u.return);break;case 1:sa(u,u.return);var y=u.stateNode;if(typeof y.componentWillUnmount=="function"){a=u,n=u.return;try{t=a,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(k){xt(a,n,k)}}break;case 5:sa(u,u.return);break;case 22:if(u.memoizedState!==null){lp(g);continue}}v!==null?(v.return=u,he=v):lp(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{s=g.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=g.stateNode,c=g.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Su("display",i))}catch(k){xt(e,e.return,k)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(k){xt(e,e.return,k)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:fr(t,e),Cr(e),a&4&&op(e);break;case 21:break;default:fr(t,e),Cr(e)}}function Cr(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Jm(n)){var a=n;break e}n=n.return}throw Error(ae(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(rs(s,""),a.flags&=-33);var o=sp(e);Wl(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,l=sp(e);Bl(e,l,i);break;default:throw Error(ae(161))}}catch(c){xt(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function lg(e,t,n){he=e,tf(e)}function tf(e,t,n){for(var a=(e.mode&1)!==0;he!==null;){var s=he,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||Hs;if(!i){var l=s.alternate,c=l!==null&&l.memoizedState!==null||Rt;l=Hs;var d=Rt;if(Hs=i,(Rt=c)&&!d)for(he=s;he!==null;)i=he,c=i.child,i.tag===22&&i.memoizedState!==null?cp(s):c!==null?(c.return=i,he=c):cp(s);for(;o!==null;)he=o,tf(o),o=o.sibling;he=s,Hs=l,Rt=d}ip(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,he=o):ip(e)}}function ip(e){for(;he!==null;){var t=he;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Rt||si(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!Rt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:hr(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Hd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Hd(t,i,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&os(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}Rt||t.flags&512&&Dl(t)}catch(u){xt(t,t.return,u)}}if(t===e){he=null;break}if(n=t.sibling,n!==null){n.return=t.return,he=n;break}he=t.return}}function lp(e){for(;he!==null;){var t=he;if(t===e){he=null;break}var n=t.sibling;if(n!==null){n.return=t.return,he=n;break}he=t.return}}function cp(e){for(;he!==null;){var t=he;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{si(4,t)}catch(c){xt(t,n,c)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(c){xt(t,s,c)}}var o=t.return;try{Dl(t)}catch(c){xt(t,o,c)}break;case 5:var i=t.return;try{Dl(t)}catch(c){xt(t,i,c)}}}catch(c){xt(t,t.return,c)}if(t===e){he=null;break}var l=t.sibling;if(l!==null){l.return=t.return,he=l;break}he=t.return}}var cg=Math.ceil,Lo=Gr.ReactCurrentDispatcher,Fc=Gr.ReactCurrentOwner,pr=Gr.ReactCurrentBatchConfig,Ve=0,St=null,yt=null,Mt=0,er=0,oa=bn(0),jt=0,xs=null,Fn=0,oi=0,Dc=0,Za=null,Ut=null,Bc=0,ya=1/0,Ar=null,Ao=!1,Ul=null,mn=null,Ys=!1,on=null,Oo=0,es=0,Vl=null,po=-1,uo=0;function At(){return Ve&6?bt():po!==-1?po:po=bt()}function fn(e){return e.mode&1?Ve&2&&Mt!==0?Mt&-Mt:Yh.transition!==null?(uo===0&&(uo=Fu()),uo):(e=qe,e!==0||(e=window.event,e=e===void 0?16:Yu(e.type)),e):1}function yr(e,t,n,a){if(50<es)throw es=0,Vl=null,Error(ae(185));js(e,n,a),(!(Ve&2)||e!==St)&&(e===St&&(!(Ve&2)&&(oi|=n),jt===4&&an(e,Mt)),Kt(e,a),n===1&&Ve===0&&!(t.mode&1)&&(ya=bt()+500,ri&&yn()))}function Kt(e,t){var n=e.callbackNode;Y0(e,t);var a=wo(e,e===St?Mt:0);if(a===0)n!==null&&vd(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&vd(n),t===1)e.tag===0?Hh(dp.bind(null,e)):pm(dp.bind(null,e)),Bh(function(){!(Ve&6)&&yn()}),n=null;else{switch(Du(a)){case 1:n=mc;break;case 4:n=Au;break;case 16:n=yo;break;case 536870912:n=Ou;break;default:n=yo}n=df(n,rf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function rf(e,t){if(po=-1,uo=0,Ve&6)throw Error(ae(327));var n=e.callbackNode;if(ua()&&e.callbackNode!==n)return null;var a=wo(e,e===St?Mt:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Fo(e,a);else{t=a;var s=Ve;Ve|=2;var o=af();(St!==e||Mt!==t)&&(Ar=null,ya=bt()+500,Pn(e,t));do try{ug();break}catch(l){nf(e,l)}while(!0);Sc(),Lo.current=o,Ve=s,yt!==null?t=0:(St=null,Mt=0,t=jt)}if(t!==0){if(t===2&&(s=xl(e),s!==0&&(a=s,t=Hl(e,s))),t===1)throw n=xs,Pn(e,0),an(e,a),Kt(e,bt()),n;if(t===6)an(e,a);else{if(s=e.current.alternate,!(a&30)&&!dg(s)&&(t=Fo(e,a),t===2&&(o=xl(e),o!==0&&(a=o,t=Hl(e,o))),t===1))throw n=xs,Pn(e,0),an(e,a),Kt(e,bt()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(ae(345));case 2:Mn(e,Ut,Ar);break;case 3:if(an(e,a),(a&130023424)===a&&(t=Bc+500-bt(),10<t)){if(wo(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){At(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=_l(Mn.bind(null,e,Ut,Ar),t);break}Mn(e,Ut,Ar);break;case 4:if(an(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-br(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=bt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*cg(a/1960))-a,10<a){e.timeoutHandle=_l(Mn.bind(null,e,Ut,Ar),a);break}Mn(e,Ut,Ar);break;case 5:Mn(e,Ut,Ar);break;default:throw Error(ae(329))}}}return Kt(e,bt()),e.callbackNode===n?rf.bind(null,e):null}function Hl(e,t){var n=Za;return e.current.memoizedState.isDehydrated&&(Pn(e,t).flags|=256),e=Fo(e,t),e!==2&&(t=Ut,Ut=n,t!==null&&Yl(t)),e}function Yl(e){Ut===null?Ut=e:Ut.push.apply(Ut,e)}function dg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!wr(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function an(e,t){for(t&=~Dc,t&=~oi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-br(t),a=1<<n;e[n]=-1,t&=~a}}function dp(e){if(Ve&6)throw Error(ae(327));ua();var t=wo(e,0);if(!(t&1))return Kt(e,bt()),null;var n=Fo(e,t);if(e.tag!==0&&n===2){var a=xl(e);a!==0&&(t=a,n=Hl(e,a))}if(n===1)throw n=xs,Pn(e,0),an(e,t),Kt(e,bt()),n;if(n===6)throw Error(ae(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Mn(e,Ut,Ar),Kt(e,bt()),null}function Wc(e,t){var n=Ve;Ve|=1;try{return e(t)}finally{Ve=n,Ve===0&&(ya=bt()+500,ri&&yn())}}function Dn(e){on!==null&&on.tag===0&&!(Ve&6)&&ua();var t=Ve;Ve|=1;var n=pr.transition,a=qe;try{if(pr.transition=null,qe=1,e)return e()}finally{qe=a,pr.transition=n,Ve=t,!(Ve&6)&&yn()}}function Uc(){er=oa.current,ot(oa)}function Pn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Dh(n)),yt!==null)for(n=yt.return;n!==null;){var a=n;switch(jc(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&So();break;case 3:va(),ot(Yt),ot(It),Tc();break;case 5:Ec(a);break;case 4:va();break;case 13:ot(pt);break;case 19:ot(pt);break;case 10:Cc(a.type._context);break;case 22:case 23:Uc()}n=n.return}if(St=e,yt=e=hn(e.current,null),Mt=er=t,jt=0,xs=null,Dc=oi=Fn=0,Ut=Za=null,$n!==null){for(t=0;t<$n.length;t++)if(n=$n[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}$n=null}return e}function nf(e,t){do{var n=yt;try{if(Sc(),io.current=Io,Ro){for(var a=ut.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}Ro=!1}if(On=0,_t=kt=ut=null,Qa=!1,fs=0,Fc.current=null,n===null||n.return===null){jt=1,xs=t,yt=null;break}e:{var o=e,i=n.return,l=n,c=t;if(t=Mt,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=l,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var u=h.alternate;u?(h.updateQueue=u.updateQueue,h.memoizedState=u.memoizedState,h.lanes=u.lanes):(h.updateQueue=null,h.memoizedState=null)}var v=Qd(i);if(v!==null){v.flags&=-257,Jd(v,i,l,o,t),v.mode&1&&qd(o,d,t),t=v,c=d;var y=t.updateQueue;if(y===null){var k=new Set;k.add(c),t.updateQueue=k}else y.add(c);break e}else{if(!(t&1)){qd(o,d,t),Vc();break e}c=Error(ae(426))}}else if(lt&&l.mode&1){var x=Qd(i);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Jd(x,i,l,o,t),Nc(ba(c,l));break e}}o=c=ba(c,l),jt!==4&&(jt=2),Za===null?Za=[o]:Za.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=Dm(o,c,t);Vd(o,m);break e;case 1:l=c;var f=o.type,b=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||b!==null&&typeof b.componentDidCatch=="function"&&(mn===null||!mn.has(b)))){o.flags|=65536,t&=-t,o.lanes|=t;var j=Bm(o,l,t);Vd(o,j);break e}}o=o.return}while(o!==null)}of(n)}catch(w){t=w,yt===n&&n!==null&&(yt=n=n.return);continue}break}while(!0)}function af(){var e=Lo.current;return Lo.current=Io,e===null?Io:e}function Vc(){(jt===0||jt===3||jt===2)&&(jt=4),St===null||!(Fn&268435455)&&!(oi&268435455)||an(St,Mt)}function Fo(e,t){var n=Ve;Ve|=2;var a=af();(St!==e||Mt!==t)&&(Ar=null,Pn(e,t));do try{pg();break}catch(s){nf(e,s)}while(!0);if(Sc(),Ve=n,Lo.current=a,yt!==null)throw Error(ae(261));return St=null,Mt=0,jt}function pg(){for(;yt!==null;)sf(yt)}function ug(){for(;yt!==null&&!A0();)sf(yt)}function sf(e){var t=cf(e.alternate,e,er);e.memoizedProps=e.pendingProps,t===null?of(e):yt=t,Fc.current=null}function of(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=sg(n,t),n!==null){n.flags&=32767,yt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{jt=6,yt=null;return}}else if(n=ag(n,t,er),n!==null){yt=n;return}if(t=t.sibling,t!==null){yt=t;return}yt=t=e}while(t!==null);jt===0&&(jt=5)}function Mn(e,t,n){var a=qe,s=pr.transition;try{pr.transition=null,qe=1,mg(e,t,n,a)}finally{pr.transition=s,qe=a}return null}function mg(e,t,n,a){do ua();while(on!==null);if(Ve&6)throw Error(ae(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(ae(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(G0(e,o),e===St&&(yt=St=null,Mt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ys||(Ys=!0,df(yo,function(){return ua(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=pr.transition,pr.transition=null;var i=qe;qe=1;var l=Ve;Ve|=4,Fc.current=null,ig(e,n),ef(n,e),Ph(jl),ko=!!kl,jl=kl=null,e.current=n,lg(n),O0(),Ve=l,qe=i,pr.transition=o}else e.current=n;if(Ys&&(Ys=!1,on=e,Oo=s),o=e.pendingLanes,o===0&&(mn=null),B0(n.stateNode),Kt(e,bt()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(Ao)throw Ao=!1,e=Ul,Ul=null,e;return Oo&1&&e.tag!==0&&ua(),o=e.pendingLanes,o&1?e===Vl?es++:(es=0,Vl=e):es=0,yn(),null}function ua(){if(on!==null){var e=Du(Oo),t=pr.transition,n=qe;try{if(pr.transition=null,qe=16>e?16:e,on===null)var a=!1;else{if(e=on,on=null,Oo=0,Ve&6)throw Error(ae(331));var s=Ve;for(Ve|=4,he=e.current;he!==null;){var o=he,i=o.child;if(he.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(he=d;he!==null;){var h=he;switch(h.tag){case 0:case 11:case 15:Ja(8,h,o)}var g=h.child;if(g!==null)g.return=h,he=g;else for(;he!==null;){h=he;var u=h.sibling,v=h.return;if(Qm(h),h===d){he=null;break}if(u!==null){u.return=v,he=u;break}he=v}}}var y=o.alternate;if(y!==null){var k=y.child;if(k!==null){y.child=null;do{var x=k.sibling;k.sibling=null,k=x}while(k!==null)}}he=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,he=i;else e:for(;he!==null;){if(o=he,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Ja(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,he=m;break e}he=o.return}}var f=e.current;for(he=f;he!==null;){i=he;var b=i.child;if(i.subtreeFlags&2064&&b!==null)b.return=i,he=b;else e:for(i=f;he!==null;){if(l=he,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:si(9,l)}}catch(w){xt(l,l.return,w)}if(l===i){he=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,he=j;break e}he=l.return}}if(Ve=s,yn(),$r&&typeof $r.onPostCommitFiberRoot=="function")try{$r.onPostCommitFiberRoot(Qo,e)}catch{}a=!0}return a}finally{qe=n,pr.transition=t}}return!1}function pp(e,t,n){t=ba(n,t),t=Dm(e,t,1),e=un(e,t,1),t=At(),e!==null&&(js(e,1,t),Kt(e,t))}function xt(e,t,n){if(e.tag===3)pp(e,e,n);else for(;t!==null;){if(t.tag===3){pp(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(mn===null||!mn.has(a))){e=ba(n,e),e=Bm(t,e,1),t=un(t,e,1),e=At(),t!==null&&(js(t,1,e),Kt(t,e));break}}t=t.return}}function fg(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=At(),e.pingedLanes|=e.suspendedLanes&n,St===e&&(Mt&n)===n&&(jt===4||jt===3&&(Mt&130023424)===Mt&&500>bt()-Bc?Pn(e,0):Dc|=n),Kt(e,t)}function lf(e,t){t===0&&(e.mode&1?(t=Ls,Ls<<=1,!(Ls&130023424)&&(Ls=4194304)):t=1);var n=At();e=Vr(e,t),e!==null&&(js(e,t,n),Kt(e,n))}function hg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),lf(e,n)}function gg(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(ae(314))}a!==null&&a.delete(t),lf(e,n)}var cf;cf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Yt.current)Vt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Vt=!1,ng(e,t,n);Vt=!!(e.flags&131072)}else Vt=!1,lt&&t.flags&1048576&&um(t,zo,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;co(e,t),e=t.pendingProps;var s=ha(t,It.current);pa(t,n),s=Rc(null,t,a,e,s,n);var o=Ic();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Gt(a)?(o=!0,Co(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,zc(t),s.updater=ai,t.stateNode=s,s._reactInternals=t,Tl(t,a,e,n),t=Il(null,t,a,!0,o,n)):(t.tag=0,lt&&o&&kc(t),Lt(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch(co(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=vg(a),e=hr(a,e),s){case 0:t=Rl(null,t,a,e,n);break e;case 1:t=tp(null,t,a,e,n);break e;case 11:t=Zd(null,t,a,e,n);break e;case 14:t=ep(null,t,a,hr(a.type,e),n);break e}throw Error(ae(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:hr(a,s),Rl(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:hr(a,s),tp(e,t,a,s,n);case 3:e:{if(Hm(t),e===null)throw Error(ae(387));a=t.pendingProps,o=t.memoizedState,s=o.element,vm(e,t),To(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=ba(Error(ae(423)),t),t=rp(e,t,a,n,s);break e}else if(a!==s){s=ba(Error(ae(424)),t),t=rp(e,t,a,n,s);break e}else for(tr=pn(t.stateNode.containerInfo.firstChild),rr=t,lt=!0,xr=null,n=gm(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ga(),a===s){t=Hr(e,t,n);break e}Lt(e,t,a,n)}t=t.child}return t;case 5:return bm(t),e===null&&zl(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,Nl(a,s)?i=null:o!==null&&Nl(a,o)&&(t.flags|=32),Vm(e,t),Lt(e,t,i,n),t.child;case 6:return e===null&&zl(t),null;case 13:return Ym(e,t,n);case 4:return $c(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=xa(t,null,a,n):Lt(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:hr(a,s),Zd(e,t,a,s,n);case 7:return Lt(e,t,t.pendingProps,n),t.child;case 8:return Lt(e,t,t.pendingProps.children,n),t.child;case 12:return Lt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,nt($o,a._currentValue),a._currentValue=i,o!==null)if(wr(o.value,i)){if(o.children===s.children&&!Yt.current){t=Hr(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){i=o.child;for(var c=l.firstContext;c!==null;){if(c.context===a){if(o.tag===1){c=Br(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),$l(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(ae(341));i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),$l(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}Lt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,pa(t,n),s=ur(s),a=a(s),t.flags|=1,Lt(e,t,a,n),t.child;case 14:return a=t.type,s=hr(a,t.pendingProps),s=hr(a.type,s),ep(e,t,a,s,n);case 15:return Wm(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:hr(a,s),co(e,t),t.tag=1,Gt(a)?(e=!0,Co(t)):e=!1,pa(t,n),Fm(t,a,s),Tl(t,a,s,n),Il(null,t,a,!0,e,n);case 19:return Gm(e,t,n);case 22:return Um(e,t,n)}throw Error(ae(156,t.tag))};function df(e,t){return Lu(e,t)}function xg(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dr(e,t,n,a){return new xg(e,t,n,a)}function Hc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function vg(e){if(typeof e=="function")return Hc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===dc)return 11;if(e===pc)return 14}return 2}function hn(e,t){var n=e.alternate;return n===null?(n=dr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function mo(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")Hc(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case qn:return Rn(n.children,s,o,t);case cc:i=8,s|=8;break;case rl:return e=dr(12,n,t,s|2),e.elementType=rl,e.lanes=o,e;case nl:return e=dr(13,n,t,s),e.elementType=nl,e.lanes=o,e;case al:return e=dr(19,n,t,s),e.elementType=al,e.lanes=o,e;case bu:return ii(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xu:i=10;break e;case vu:i=9;break e;case dc:i=11;break e;case pc:i=14;break e;case en:i=16,a=null;break e}throw Error(ae(130,e==null?e:typeof e,""))}return t=dr(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function Rn(e,t,n,a){return e=dr(7,e,a,t),e.lanes=n,e}function ii(e,t,n,a){return e=dr(22,e,a,t),e.elementType=bu,e.lanes=n,e.stateNode={isHidden:!1},e}function Di(e,t,n){return e=dr(6,e,null,t),e.lanes=n,e}function Bi(e,t,n){return t=dr(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function bg(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=wi(0),this.expirationTimes=wi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wi(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Yc(e,t,n,a,s,o,i,l,c){return e=new bg(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=dr(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},zc(o),e}function yg(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Xn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function pf(e){if(!e)return xn;e=e._reactInternals;e:{if(Un(e)!==e||e.tag!==1)throw Error(ae(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Gt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(ae(171))}if(e.tag===1){var n=e.type;if(Gt(n))return dm(e,n,t)}return t}function uf(e,t,n,a,s,o,i,l,c){return e=Yc(n,a,!0,e,s,o,i,l,c),e.context=pf(null),n=e.current,a=At(),s=fn(n),o=Br(a,s),o.callback=t??null,un(n,o,s),e.current.lanes=s,js(e,s,a),Kt(e,a),e}function li(e,t,n,a){var s=t.current,o=At(),i=fn(s);return n=pf(n),t.context===null?t.context=n:t.pendingContext=n,t=Br(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=un(s,t,i),e!==null&&(yr(e,s,i,o),oo(e,s,i)),i}function Do(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function up(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Gc(e,t){up(e,t),(e=e.alternate)&&up(e,t)}function wg(){return null}var mf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Kc(e){this._internalRoot=e}ci.prototype.render=Kc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(ae(409));li(e,t,null,null)};ci.prototype.unmount=Kc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Dn(function(){li(null,e,null,null)}),t[Ur]=null}};function ci(e){this._internalRoot=e}ci.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<nn.length&&t!==0&&t<nn[n].priority;n++);nn.splice(n,0,e),n===0&&Hu(e)}};function Xc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function di(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function mp(){}function kg(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=Do(i);o.call(d)}}var i=uf(t,a,e,0,null,!1,!1,"",mp);return e._reactRootContainer=i,e[Ur]=i.current,cs(e.nodeType===8?e.parentNode:e),Dn(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var l=a;a=function(){var d=Do(c);l.call(d)}}var c=Yc(e,0,!1,null,null,!1,!1,"",mp);return e._reactRootContainer=c,e[Ur]=c.current,cs(e.nodeType===8?e.parentNode:e),Dn(function(){li(t,c,n,a)}),c}function pi(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var l=s;s=function(){var c=Do(i);l.call(c)}}li(t,i,e,s)}else i=kg(n,t,e,s,a);return Do(i)}Bu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Da(t.pendingLanes);n!==0&&(fc(t,n|1),Kt(t,bt()),!(Ve&6)&&(ya=bt()+500,yn()))}break;case 13:Dn(function(){var a=Vr(e,1);if(a!==null){var s=At();yr(a,e,1,s)}}),Gc(e,1)}};hc=function(e){if(e.tag===13){var t=Vr(e,134217728);if(t!==null){var n=At();yr(t,e,134217728,n)}Gc(e,134217728)}};Wu=function(e){if(e.tag===13){var t=fn(e),n=Vr(e,t);if(n!==null){var a=At();yr(n,e,t,a)}Gc(e,t)}};Uu=function(){return qe};Vu=function(e,t){var n=qe;try{return qe=e,t()}finally{qe=n}};fl=function(e,t,n){switch(t){case"input":if(il(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=ti(a);if(!s)throw Error(ae(90));wu(a),il(a,s)}}}break;case"textarea":ju(e,n);break;case"select":t=n.value,t!=null&&ia(e,!!n.multiple,t,!1)}};$u=Wc;Eu=Dn;var jg={usingClientEntryPoint:!1,Events:[_s,ea,ti,Mu,zu,Wc]},Pa={findFiberByHostInstance:zn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ng={bundleType:Pa.bundleType,version:Pa.version,rendererPackageName:Pa.rendererPackageName,rendererConfig:Pa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ru(e),e===null?null:e.stateNode},findFiberByHostInstance:Pa.findFiberByHostInstance||wg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gs.isDisabled&&Gs.supportsFiber)try{Qo=Gs.inject(Ng),$r=Gs}catch{}}ar.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jg;ar.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xc(t))throw Error(ae(200));return yg(e,t,null,n)};ar.createRoot=function(e,t){if(!Xc(e))throw Error(ae(299));var n=!1,a="",s=mf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Yc(e,1,!1,null,null,n,!1,a,s),e[Ur]=t.current,cs(e.nodeType===8?e.parentNode:e),new Kc(t)};ar.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(ae(188)):(e=Object.keys(e).join(","),Error(ae(268,e)));return e=Ru(t),e=e===null?null:e.stateNode,e};ar.flushSync=function(e){return Dn(e)};ar.hydrate=function(e,t,n){if(!di(t))throw Error(ae(200));return pi(null,e,t,!0,n)};ar.hydrateRoot=function(e,t,n){if(!Xc(e))throw Error(ae(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=mf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=uf(t,null,e,1,n??null,s,!1,o,i),e[Ur]=t.current,cs(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new ci(t)};ar.render=function(e,t,n){if(!di(t))throw Error(ae(200));return pi(null,e,t,!1,n)};ar.unmountComponentAtNode=function(e){if(!di(e))throw Error(ae(40));return e._reactRootContainer?(Dn(function(){pi(null,null,e,!1,function(){e._reactRootContainer=null,e[Ur]=null})}),!0):!1};ar.unstable_batchedUpdates=Wc;ar.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!di(n))throw Error(ae(200));if(e==null||e._reactInternals===void 0)throw Error(ae(38));return pi(e,t,n,!1,a)};ar.version="18.3.1-next-f1338f8080-20240426";function ff(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ff)}catch(e){console.error(e)}}ff(),mu.exports=ar;var qc=mu.exports,fp=qc;el.createRoot=fp.createRoot,el.hydrateRoot=fp.hydrateRoot;const Wi={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.tasks":"Tasks","nav.health":"Health","nav.backups":"Backups","nav.settings":"Settings","nav.more":"More","bjobs.title":"Backup schedules","bjobs.subtitle":"Cluster-level vzdump cron jobs","bjobs.filter.enabled":"State","bjobs.col.id":"Job ID","bjobs.col.schedule":"Schedule","bjobs.col.next_run":"Next run","bjobs.col.storage":"Storage","bjobs.col.scope":"Scope","bjobs.col.mode":"Mode","bjobs.col.enabled":"Enabled","bjobs.col.comment":"Comment","bjobs.scope_all":"All VMs/CTs","bjobs.enabled_yes":"On","bjobs.enabled_no":"Off","bjobs.empty":"No scheduled backup jobs","health.title":"Health monitor","health.subtitle":"Aggregated proactive checks across every cluster","health.updated":"updated","health.sev.critical":"Critical","health.sev.warning":"Warning","health.sev.info":"Info","health.cat.node_down":"Node offline","health.cat.high_cpu":"High CPU","health.cat.high_mem":"High memory","health.cat.storage_full":"Storage almost full","health.cat.storage_high":"Storage high usage","health.cat.ceph_err":"Ceph HEALTH_ERR","health.cat.ceph_warn":"Ceph HEALTH_WARN","health.cat.task_failures":"Recent task failures","health.cat.cert_expired":"Certificate expired","health.cat.cert_expiring":"Certificate expiring","health.cat.updates":"Pending updates","health.stat.nodes":"Nodes online","health.stat.vms":"VMs running","health.stat.cts":"CTs running","health.stat.storages":"Storages","health.empty.title":"All systems nominal","health.empty.sub":"No critical or warning conditions detected.","tasks.title":"PVE task / VM operation history","tasks.subtitle":"Real PVE-side actions (qmstart / shutdown / snapshot / migrate / backup / etc.)","tasks.filter.cluster":"Cluster","tasks.filter.type":"Type","tasks.filter.status":"Status","tasks.filter.user":"User","tasks.filter.vmid":"VMID","tasks.filter.all":"All","tasks.filter.running":"Running","tasks.filter.ok":"Success","tasks.filter.error":"Error","tasks.col.starttime":"Started","tasks.col.duration":"Duration","tasks.col.type":"Type","tasks.col.target":"Target","tasks.col.user":"User","tasks.col.node":"Node","tasks.col.status":"Status","tasks.refresh":"Refresh","tasks.auto_refresh":"Auto","tasks.empty":"No tasks match the filters","tasks.loading":"Loading…","tasks.log_title":"Task log","tasks.log_loading":"Loading log…","tasks.log_empty":"No log output","tasks.copy_upid":"Copy UPID","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.subscription":"Subscription","node.no_sub":"None","node.updates_pending":"Updates pending","node.cert_expires":"Cert expires","node.host_shell":"Host shell","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.task_history":"Task history","vm.perf_charts":"Performance charts","vm.backup_history":"Backup history","vm.config_view":"Hardware / config","vmcfg.title":"VM hardware / config","vmcfg.loading":"Reading config…","vmcfg.section.general":"General","vmcfg.section.disks":"Disks","vmcfg.section.nics":"Network","vmcfg.section.mounts":"Mountpoints","vmcfg.section.other":"Other","vmcfg.col.bus":"Bus","vmcfg.col.volid":"Volume","vmcfg.col.size":"Size","vmcfg.col.opts":"Options","vmcfg.col.id":"NIC","vmcfg.col.model":"Model","vmcfg.col.bridge":"Bridge","vmcfg.col.mac":"MAC","vmcfg.col.vlan":"VLAN","vmcfg.col.firewall":"FW","bh.title":"Backup history","bh.count":"Backups","bh.total_size":"Total","bh.newest":"Newest","bh.col.ctime":"Created","bh.col.age":"Age","bh.col.storage":"Storage","bh.col.node":"Node","bh.col.size":"Size","bh.col.flags":"Flags","bh.col.notes":"Notes","bh.protected":"PROTECTED","bh.verified":"VERIFIED","bh.verify_failed":"VERIFY FAIL","bh.loading":"Scanning every backup-capable storage…","bh.empty":"No backups found for this VM/CT.","rrd.title":"Performance","rrd.tf.hour":"1H","rrd.tf.day":"24H","rrd.tf.week":"7D","rrd.tf.month":"30D","rrd.tf.year":"1Y","rrd.chart.cpu":"CPU","rrd.chart.mem":"Memory","rrd.chart.net":"Network I/O","rrd.chart.disk":"Disk I/O","rrd.loading":"Loading time-series…","rrd.empty":"No RRD data — VM may have just been created.","clog.title":"Cluster syslog","clog.button":"Cluster log","clog.filter_ph":"filter (msg / node / user / tag)","clog.empty":"No syslog lines available","clog.no_match":"No lines match the filter","cmdk.placeholder":"Search VMs / CTs / nodes / storages…","cmdk.empty":"No matches.","cmdk.tip":"Start typing — match by id, name, node, or cluster.","cmdk.toggle":"toggle palette","vm.start":"Start","vm.shutdown_acpi":"Shutdown","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.user_admin":"User management","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","matrix.bulk.select_all":"Select all","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.manage":"Manage","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.saving":"Saving…","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.tasks":"作業","nav.health":"健康","nav.backups":"備份","nav.settings":"設定","nav.more":"更多","bjobs.title":"備份排程","bjobs.subtitle":"叢集層級的 vzdump 排程作業","bjobs.filter.enabled":"狀態","bjobs.col.id":"排程 ID","bjobs.col.schedule":"排程時間","bjobs.col.next_run":"下次執行","bjobs.col.storage":"儲存","bjobs.col.scope":"對象","bjobs.col.mode":"模式","bjobs.col.enabled":"啟用","bjobs.col.comment":"備註","bjobs.scope_all":"全部 VM/CT","bjobs.enabled_yes":"開","bjobs.enabled_no":"關","bjobs.empty":"尚未設定備份排程","health.title":"健康監測","health.subtitle":"跨叢集的即時健康狀況彙總","health.updated":"更新於","health.sev.critical":"嚴重","health.sev.warning":"警告","health.sev.info":"資訊","health.cat.node_down":"節點離線","health.cat.high_cpu":"CPU 過高","health.cat.high_mem":"記憶體過高","health.cat.storage_full":"儲存接近滿載","health.cat.storage_high":"儲存使用率偏高","health.cat.ceph_err":"Ceph 嚴重錯誤","health.cat.ceph_warn":"Ceph 警告","health.cat.task_failures":"近期作業失敗","health.cat.cert_expired":"憑證已過期","health.cat.cert_expiring":"憑證即將到期","health.cat.updates":"套件待更新","health.stat.nodes":"節點在線","health.stat.vms":"VM 執行中","health.stat.cts":"CT 執行中","health.stat.storages":"儲存","health.empty.title":"一切正常","health.empty.sub":"目前沒有嚴重或警告等級的問題。","tasks.title":"PVE 作業 / VM 操作紀錄","tasks.subtitle":"PVE 端真實作業（qmstart / shutdown / 快照 / 遷移 / 備份 等）","tasks.filter.cluster":"叢集","tasks.filter.type":"類型","tasks.filter.status":"狀態","tasks.filter.user":"使用者","tasks.filter.vmid":"VMID","tasks.filter.all":"全部","tasks.filter.running":"進行中","tasks.filter.ok":"成功","tasks.filter.error":"錯誤","tasks.col.starttime":"開始時間","tasks.col.duration":"耗時","tasks.col.type":"類型","tasks.col.target":"對象","tasks.col.user":"使用者","tasks.col.node":"節點","tasks.col.status":"狀態","tasks.refresh":"重新整理","tasks.auto_refresh":"自動","tasks.empty":"沒有符合條件的作業","tasks.loading":"載入中…","tasks.log_title":"作業紀錄","tasks.log_loading":"載入紀錄中…","tasks.log_empty":"沒有日誌輸出","tasks.copy_upid":"複製 UPID","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.subscription":"訂閱","node.no_sub":"未訂閱","node.updates_pending":"待更新套件","node.cert_expires":"憑證到期","node.host_shell":"主機 Shell","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.task_history":"作業紀錄","vm.perf_charts":"效能圖表","vm.backup_history":"備份歷史","vm.config_view":"硬體 / 設定","vmcfg.title":"VM 硬體 / 設定","vmcfg.loading":"讀取設定中…","vmcfg.section.general":"一般","vmcfg.section.disks":"磁碟","vmcfg.section.nics":"網路","vmcfg.section.mounts":"掛載點","vmcfg.section.other":"其他","vmcfg.col.bus":"匯流排","vmcfg.col.volid":"卷","vmcfg.col.size":"大小","vmcfg.col.opts":"選項","vmcfg.col.id":"網卡","vmcfg.col.model":"型號","vmcfg.col.bridge":"橋接","vmcfg.col.mac":"MAC","vmcfg.col.vlan":"VLAN","vmcfg.col.firewall":"防火牆","bh.title":"備份歷史","bh.count":"備份檔數","bh.total_size":"總容量","bh.newest":"最新一次","bh.col.ctime":"建立時間","bh.col.age":"時間距","bh.col.storage":"儲存","bh.col.node":"節點","bh.col.size":"大小","bh.col.flags":"標記","bh.col.notes":"備註","bh.protected":"保護","bh.verified":"已驗證","bh.verify_failed":"驗證失敗","bh.loading":"掃描所有備份儲存…","bh.empty":"此 VM/CT 尚無備份。","rrd.title":"效能歷史","rrd.tf.hour":"1 小時","rrd.tf.day":"24 小時","rrd.tf.week":"7 天","rrd.tf.month":"30 天","rrd.tf.year":"1 年","rrd.chart.cpu":"CPU","rrd.chart.mem":"記憶體","rrd.chart.net":"網路 I/O","rrd.chart.disk":"磁碟 I/O","rrd.loading":"載入時序資料…","rrd.empty":"沒有 RRD 資料 — VM 可能剛建立。","clog.title":"叢集系統日誌","clog.button":"叢集日誌","clog.filter_ph":"篩選（訊息 / 節點 / 使用者 / tag）","clog.empty":"沒有日誌","clog.no_match":"沒有符合的日誌","cmdk.placeholder":"搜尋 VM / CT / 節點 / 儲存…","cmdk.empty":"沒有符合項目。","cmdk.tip":"直接打字 — 可用 id / 名稱 / 節點 / 叢集 比對。","cmdk.toggle":"切換命令搜尋","vm.start":"啟動","vm.shutdown_acpi":"關機","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.user_admin":"使用者管理","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","matrix.bulk.select_all":"全選","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.manage":"管理","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.saving":"儲存中…","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},hf=p.createContext(null);function _g({children:e}){const[t,n]=p.useState(()=>{const o=localStorage.getItem("language");return o&&Wi[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=p.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=p.useCallback((o,i)=>{let l=Wi[t][o]||Wi.en[o]||o;return i&&Object.entries(i).forEach(([c,d])=>{l=l.replace(`{${c}}`,String(d))}),l},[t]);return r.jsx(hf.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Me(){const e=p.useContext(hf);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const gf=p.createContext(null);function Kr(){const e=p.useContext(gf);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,n)=>Promise.resolve(window.prompt(t,(n==null?void 0:n.defaultValue)??""))})}function Sg({children:e}){const{t}=Me(),[n,a]=p.useState(null),[s,o]=p.useState(""),i=p.useRef(null),l=p.useCallback(g=>{n&&(n.resolve(g),a(null),o(""))},[n]),c=p.useCallback((g,u={})=>new Promise(v=>{a({kind:"alert",title:u.title||t("dialog.notice"),body:g,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:()=>v()})}),[t]),d=p.useCallback((g,u={})=>new Promise(v=>{a({kind:"confirm",title:u.title||t("dialog.confirm"),body:g,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:y=>v(!!y)})}),[t]),h=p.useCallback((g,u={})=>new Promise(v=>{o(u.defaultValue||""),a({kind:"prompt",title:u.title||t("dialog.input"),body:g,destructive:!!u.destructive,inputType:u.inputType||"text",placeholder:u.placeholder||"",resolve:y=>v(y===null?null:String(y))})}),[t]);return p.useEffect(()=>{if(!n)return;const g=u=>{u.key==="Escape"?l(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):u.key==="Enter"&&n.kind!=="alert"?(u.preventDefault(),l(n.kind==="prompt"?s:!0)):u.key==="Enter"&&n.kind==="alert"&&l(void 0)};return document.addEventListener("keydown",g),n.kind==="prompt"&&setTimeout(()=>{var u;return(u=i.current)==null?void 0:u.focus()},50),()=>document.removeEventListener("keydown",g)},[n,s,l]),r.jsxs(gf.Provider,{value:{alert:c,confirm:d,prompt:h},children:[e,n&&r.jsxs("div",{onClick:()=>l(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:Cg,children:[r.jsx("style",{children:Mg}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:g=>g.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:g=>o(g.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>l(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>l(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const Cg={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},Mg=`
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
`;function zg(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,l=p.useRef(null),c=p.useRef(null),d=p.useRef(null),h=p.useRef(t),[g,u]=p.useState({connected:!1,connecting:!1,lastMessageTime:0});h.current=t;const v=p.useCallback(()=>{const m=window.location.protocol==="https:"?"wss:":"ws:",f=window.location.host;return`${m}//${f}/ws`},[]),y=p.useCallback(()=>{var f;if(((f=l.current)==null?void 0:f.readyState)===WebSocket.OPEN)return;u(b=>({...b,connecting:!0}));const m=new WebSocket(v());l.current=m,m.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{m.readyState===WebSocket.OPEN&&m.send(JSON.stringify({type:"ping"}))},i)},m.onmessage=b=>{var j;try{const w=JSON.parse(b.data);u(_=>({..._,lastMessageTime:Date.now()})),(w.type==="initial"||w.type==="update")&&(j=w.data)!=null&&j.clusters&&h.current&&h.current(w.data.clusters)}catch(w){console.error("[WS] Failed to parse message:",w)}},m.onerror=b=>{console.error("[WS] Error:",b),s==null||s(b)},m.onclose=()=>{u(b=>({...b,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),c.current&&clearTimeout(c.current),c.current=window.setTimeout(()=>{y()},o)}},[v,n,a,s,o,i]),k=p.useCallback(()=>{c.current&&(clearTimeout(c.current),c.current=null),d.current&&(clearInterval(d.current),d.current=null),l.current&&(l.current.close(),l.current=null)},[]),x=p.useCallback(m=>{var f;((f=l.current)==null?void 0:f.readyState)===WebSocket.OPEN&&l.current.send(JSON.stringify(m))},[]);return p.useEffect(()=>(y(),()=>{k()}),[y,k]),p.useEffect(()=>{const m=setInterval(()=>{const b=Date.now()-g.lastMessageTime;g.connected&&b>15e3&&(k(),y())},5e3);return()=>clearInterval(m)},[g.connected,g.lastMessageTime,y,k]),{connected:g.connected,connecting:g.connecting,lastMessageTime:g.lastMessageTime,send:x,reconnect:y,disconnect:k}}const $g="/api";async function Ee(e,t){const n=await fetch(`${$g}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const We={authMe:()=>Ee("/auth/me"),authLogin:(e,t)=>Ee("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Ee("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Ee("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Ee("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Ee("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Ee("/config"),updateConfig:e=>Ee("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Ee("/clusters"),getCluster:e=>Ee(`/clusters/${e}`),getSummary:()=>Ee("/summary"),getNodes:e=>Ee(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Ee(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Ee(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Ee(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Ee("/health"),vmAction:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?We.ctAction(e,t,n,s):We.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>Ee(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>Ee(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>Ee(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>Ee(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>Ee("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>Ee(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>Ee(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Ie(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function ct(e,t=1){return`${e.toFixed(t)}%`}function ui(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function _e(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function Gl(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function Eg({value:e,suffix:t="",className:n=""}){const a=v=>{if(typeof v=="number")return{left:v,isRatio:!1};const y=String(v).match(/^(\d+)\/(\d+)$/);if(y)return{left:parseInt(y[1]),right:parseInt(y[2]),isRatio:!0};const k=parseFloat(String(v));return isNaN(k)?{left:0,isRatio:!1}:{left:k,isRatio:!1}},s=a(e),[o,i]=p.useState(0),[l,c]=p.useState(s.right||0),d=p.useRef(null),h=p.useRef(0),g=p.useRef(!0);p.useEffect(()=>{const v=a(e);if(!g.current){i(v.left),v.right!==void 0&&c(v.right);return}const y=800,k=0,x=0;g.current=!1,d.current=null;const m=f=>{d.current||(d.current=f);const b=f-d.current,j=Math.min(b/y,1),w=1-Math.pow(1-j,3),_=k+(v.left-k)*w;if(i(Math.round(_)),v.isRatio&&v.right!==void 0){const S=x+(v.right-x)*w;c(Math.round(S))}j<1?h.current=requestAnimationFrame(m):(i(v.left),v.right!==void 0&&c(v.right))};return h.current=requestAnimationFrame(m),()=>{h.current&&cancelAnimationFrame(h.current)}},[e]);const u=s.isRatio?`${o}/${l}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function hp({value:e,decimals:t=0,className:n=""}){const[a,s]=p.useState(0),o=p.useRef(null),i=p.useRef(0),l=p.useRef(!0);return p.useEffect(()=>{if(!l.current){s(e);return}const c=800,d=0;l.current=!1,o.current=null;const h=g=>{o.current||(o.current=g);const u=g-o.current,v=Math.min(u/c,1),y=1-Math.pow(1-v,3),k=d+(e-d)*y;s(k),v<1?i.current=requestAnimationFrame(h):s(e)};return i.current=requestAnimationFrame(h),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function Ui({left:e,right:t,className:n=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),l=p.useRef(null),c=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{if(!d.current){s(e),i(t);return}const h=800,g=0,u=0;d.current=!1,l.current=null;const v=y=>{l.current||(l.current=y);const k=y-l.current,x=Math.min(k/h,1),m=1-Math.pow(1-x,3);s(Math.round(g+(e-g)*m)),i(Math.round(u+(t-u)*m)),x<1?c.current=requestAnimationFrame(v):(s(e),i(t))};return c.current=requestAnimationFrame(v),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Ks({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(Eg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function Vi({value:e,label:t,color:n,size:a=100}){const[s,o]=p.useState(0),i=p.useRef(null),l=p.useRef(0),c=p.useRef(!0);p.useEffect(()=>{if(!c.current){o(e);return}const x=1e3,m=0;c.current=!1,i.current=null;const f=b=>{i.current||(i.current=b);const j=b-i.current,w=Math.min(j/x,1),_=1-Math.pow(1-w,3),S=m+(e-m)*_;o(S),w<1?l.current=requestAnimationFrame(f):o(e)};return l.current=requestAnimationFrame(f),()=>{l.current&&cancelAnimationFrame(l.current)}},[e]);const d=5,h=(a-d*4)/2-8,g=(a-d)/2,u=h+(g-h)/2,v=2*Math.PI*u,y=v-s/100*v,k=Array.from({length:36},(x,m)=>{const f=(m*10-90)*(Math.PI/180),b=m%3===0,j=b?6:3,w=g-2,_=w-j;return{x1:a/2+Math.cos(f)*w,y1:a/2+Math.sin(f)*w,x2:a/2+Math.cos(f)*_,y2:a/2+Math.sin(f)*_,isMajor:b}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:g,strokeWidth:1}),k.map((x,m)=>r.jsx("line",{x1:x.x1,y1:x.y1,x2:x.x2,y2:x.y2,className:`ring-tick ${x.isMajor?"major":""}`},m)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:u,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:h,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:u,strokeWidth:d,strokeDasharray:v,strokeDashoffset:y,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-u-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function Tg({cluster:e,onClick:t}){var c,d;const{t:n}=Me(),a=e.summary;if(!a)return null;const s=_e(a.total_cpu_usage),o=_e(a.total_memory_usage),i=a.alerts_warning>0,l=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${l?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(hp,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(hp,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ui,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ui,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ui,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((c=a.ceph_health)==null?void 0:c.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function gp({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=Me(),o=p.useMemo(()=>Object.entries(e),[e]),i=p.useMemo(()=>{let l=0,c=0,d=0,h=0;return Object.values(e).forEach(g=>{g.summary&&(l+=g.summary.total_cpu_usage||0,c+=g.summary.total_memory_usage||0,d+=g.summary.total_storage_usage||0,h++)}),{avgCpu:h>0?l/h:0,avgMem:h>0?c/h:0,avgStorage:h>0?d/h:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(Vi,{value:i.avgCpu,label:s("metric.cpu"),color:_e(i.avgCpu),size:110}),r.jsx(Vi,{value:i.avgMem,label:s("metric.memory"),color:_e(i.avgMem),size:110}),r.jsx(Vi,{value:i.avgStorage,label:s("metric.disk"),color:_e(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(Ks,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(Ks,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(Ks,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(Ks,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([l,c])=>r.jsx(Tg,{cluster:c,onClick:()=>n(l)},l))})})]})]}),r.jsx("style",{children:`
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
      `})]})}function Pg(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const l=(o-.08)/.14;i+=s*.2*Math.sin(l*Math.PI)}if(o>.24&&o<.4){const l=(o-.24)/.16;if(l<.2)i-=s*.15*Math.sin(l*5*Math.PI);else if(l<.5){const c=(l-.2)/.3;i+=s*(1+a*.5)*Math.sin(c*Math.PI)}else if(l<.7){const c=(l-.5)/.2;i-=s*.25*Math.sin(c*Math.PI)}}if(o>.48&&o<.72){const l=(o-.48)/.24;i+=s*.35*Math.sin(l*Math.PI)}return i*n}function Hi({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const l=p.useRef(null),c=p.useRef(null),d=p.useRef([]),h=p.useRef(0),g=p.useRef(0),u=p.useRef(0),v=p.useRef(0),y=p.useRef(!i),k=p.useRef(!1),m=6e4/(50+e/100*50),f=12;p.useEffect(()=>{y.current=!i},[i]);const b=p.useCallback(()=>{const w=c.current;if(!w)return;w.fillStyle="rgba(5, 8, 15, 0.95)",w.fillRect(0,0,s,o),w.strokeStyle="rgba(0, 240, 255, 0.08)",w.lineWidth=.5;for(let P=0;P<o;P+=10)w.beginPath(),w.moveTo(0,P),w.lineTo(s,P),w.stroke();for(let P=0;P<s;P+=10)w.beginPath(),w.moveTo(P,0),w.lineTo(P,o),w.stroke();const _=o/2,S=o*.45,R=!a||e>90?"#ff0040":e>70?"#ff6b00":n;w.shadowColor=R,w.shadowBlur=6,w.strokeStyle=R,w.lineWidth=1.5,w.lineCap="round",w.lineJoin="round",w.beginPath();let F=!1;for(let P=0;P<s;P++){const ee=(P-h.current+s)%s;if(ee<8&&ee>0)continue;const D=_-d.current[P]*S;F?w.lineTo(P,D):(w.moveTo(P,D),F=!0)}w.stroke(),w.shadowBlur=0,w.strokeStyle=`${R}60`,w.lineWidth=2,w.beginPath(),w.moveTo(h.current,0),w.lineTo(h.current,o),w.stroke();const E=w.createLinearGradient(h.current-15,0,h.current,0);E.addColorStop(0,"transparent"),E.addColorStop(1,`${R}30`),w.fillStyle=E,w.fillRect(h.current-15,0,15,o)},[s,o,e,a,n]);p.useEffect(()=>{const w=l.current;if(!w)return;const _=w.getContext("2d");if(!_)return;const S=window.devicePixelRatio||1;w.width=s*S,w.height=o*S,_.scale(S,S),c.current=_,d.current.length!==s&&(d.current=new Array(s).fill(0)),k.current=!0,b()},[s,o,b]),p.useEffect(()=>{if(!k.current||!c.current)return;const _=S=>{v.current||(v.current=S);const z=S-v.current;v.current=S;const R=z/1e3*f;g.current+=z/m,g.current>=1&&(g.current-=1);const F=Math.ceil(R);for(let E=0;E<F;E++){const ee=(g.current+E/F*(z/m))%1;let D;a?D=Pg(e,ee,1):D=(Math.random()-.5)*.01,h.current=(h.current+1)%s,d.current[h.current]=D;const I=(h.current+1)%s;for(let q=0;q<8;q++){const A=(I+q)%s;d.current[A]=0}}b(),y.current&&(u.current=requestAnimationFrame(_))};return i||(v.current=0,u.current=requestAnimationFrame(_)),()=>{cancelAnimationFrame(u.current)}},[s,o,e,a,m,f,i,b]);const j=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:j()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:j()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:l,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function Rg({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=p.useRef(null),[i,l]=p.useState(180);return p.useEffect(()=>{const c=o.current;if(!c)return;const d=()=>{const g=c.clientWidth-6;g>0&&l(g)};d();const h=new ResizeObserver(d);return h.observe(c),()=>h.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(Hi,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Hi,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Hi,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}const Ig=["hour","day","week","month","year"],Kl=e=>{if(!isFinite(e)||e===0)return"0";const t=["B","K","M","G","T"];let n=0,a=e;for(;a>=1024&&n<t.length-1;)a/=1024,n++;return`${a.toFixed(a>=10?0:1)}${t[n]}`},Gn=e=>Kl(e)+"/s",xp=e=>`${(e*100).toFixed(0)}%`;function xf({open:e,onClose:t,clusterId:n,node:a,vmid:s,kind:o,title:i}){const{t:l,language:c}=Me(),[d,h]=p.useState("hour"),[g,u]=p.useState([]),[v,y]=p.useState(!1),[k,x]=p.useState(null);return p.useEffect(()=>{if(!e)return;let m=!0;return(async()=>{y(!0),x(null);try{const f=encodeURIComponent(n),b=encodeURIComponent(a),j=o==="node"?`/api/clusters/${f}/nodes/${b}/rrddata`:o==="qemu"?`/api/clusters/${f}/nodes/${b}/qemu/${s}/rrddata`:`/api/clusters/${f}/nodes/${b}/lxc/${s}/rrddata`,w=await fetch(`${j}?timeframe=${d}`,{credentials:"same-origin"});if(!w.ok){const S=await w.json().catch(()=>({}));throw new Error(S.error||`HTTP ${w.status}`)}const _=await w.json();if(!m)return;u((_.samples||[]).filter(S=>S&&S.time))}catch(f){m&&x(f.message||String(f))}finally{m&&y(!1)}})(),()=>{m=!1}},[e,n,a,s,o,d]),e?r.jsx("div",{className:"rrd-back",onClick:t,children:r.jsxs("div",{className:"rrd-modal",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"rrd-head",children:[r.jsxs("div",{className:"rrd-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:l("rrd.title")}),i&&r.jsx("span",{className:"rrd-target",children:i})]}),r.jsxs("div",{className:"rrd-tfs",children:[Ig.map(m=>r.jsx("button",{className:`rrd-tf ${m===d?"on":""}`,onClick:()=>h(m),children:l(`rrd.tf.${m}`)},m)),r.jsx("button",{className:"rrd-close",onClick:t,"aria-label":"close",children:"×"})]})]}),r.jsxs("div",{className:"rrd-body",children:[k&&r.jsx("div",{className:"rrd-error",children:k}),v&&g.length===0&&r.jsx("div",{className:"rrd-loading",children:l("rrd.loading")}),!v&&g.length===0&&!k&&r.jsx("div",{className:"rrd-loading",children:l("rrd.empty")}),g.length>0&&r.jsxs("div",{className:"rrd-grid",children:[r.jsx(Xs,{title:l("rrd.chart.cpu"),samples:g,color:"#00f0ff",series:[{key:"cpu",label:"CPU",fmt:xp,scale:m=>m.cpu??null}],yMax:1,yFmt:xp}),r.jsx(Xs,{title:l("rrd.chart.mem"),samples:g,color:"#00ff88",series:[{key:"mem",label:"Mem",fmt:m=>Kl(m),scale:m=>m.mem??null}],yFmt:Kl,fillTop:m=>m.maxmem}),r.jsx(Xs,{title:l("rrd.chart.net"),samples:g,color:"#ff8a3c",series:[{key:"netin",label:"In",fmt:Gn,scale:m=>m.netin??null,color:"#ff8a3c"},{key:"netout",label:"Out",fmt:Gn,scale:m=>m.netout??null,color:"#bf00ff"}],yFmt:Gn}),r.jsx(Xs,{title:l("rrd.chart.disk"),samples:g,color:"#bf00ff",series:[{key:"diskread",label:"Read",fmt:Gn,scale:m=>m.diskread??null,color:"#00f0ff"},{key:"diskwrite",label:"Write",fmt:Gn,scale:m=>m.diskwrite??null,color:"#bf00ff"}],yFmt:Gn})]})]}),r.jsx("style",{children:`
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
        `})]})}):null}function Xs({title:e,samples:t,series:n,yMax:a,yFmt:s,fillTop:o}){var j,w;const{width:i,height:l}={width:460,height:160},c=48,d=8,h=10,g=22,u=p.useMemo(()=>{if(typeof a=="number")return a;let _=1;for(const S of t){const z=o==null?void 0:o(S);z&&z>_&&(_=z);for(const R of n){const F=R.scale(S);F!=null&&F>_&&(_=F)}}return _*1.1},[t,n,o,a]),v=((j=t[0])==null?void 0:j.time)||0,y=((w=t[t.length-1])==null?void 0:w.time)||v+1,k=Math.max(1,y-v),x=_=>c+(_-v)/k*(i-c-d),m=_=>h+(1-_/u)*(l-h-g),f=_=>{let S="",z=!1;for(const R of t){const F=_.scale(R);if(F==null||!isFinite(F)){z=!1;continue}const E=x(R.time),P=m(F);S+=(z?" L ":" M ")+E.toFixed(1)+","+P.toFixed(1),z=!0}return S},b=[0,.25,.5,.75,1].map(_=>u*(1-_));return r.jsxs("div",{className:"rrd-card",children:[r.jsxs("div",{className:"rrd-card-head",children:[r.jsx("div",{className:"rrd-card-title",children:e}),r.jsx("div",{className:"rrd-card-legend",children:n.map(_=>r.jsxs("span",{children:[r.jsx("span",{className:"dot",style:{background:_.color||"#00f0ff"}}),_.label]},_.key))})]}),r.jsxs("svg",{viewBox:`0 0 ${i} ${l}`,className:"rrd-svg",children:[b.map((_,S)=>{const z=h+S/4*(l-h-g);return r.jsxs("g",{children:[r.jsx("line",{x1:c,y1:z,x2:i-d,y2:z,stroke:"rgba(0,240,255,.08)"}),r.jsx("text",{x:c-4,y:z+3,textAnchor:"end",fontSize:"9",fill:"rgba(160,180,200,.6)",fontFamily:"Share Tech Mono, monospace",children:s(_)})]},S)}),n.map(_=>r.jsx("path",{d:f(_),fill:"none",stroke:_.color||"#00f0ff",strokeWidth:"1.3",opacity:"0.95"},_.key))]}),r.jsx("style",{children:`
        .rrd-card { background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 4px; padding: 10px 12px; }
        .rrd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .rrd-card-title { font-family: var(--font-display); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-primary); }
        .rrd-card-legend { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); }
        .rrd-card-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 6px currentColor; vertical-align: 1px; }
        .rrd-svg { width: 100%; height: 160px; display: block; }
      `})]})}function vp(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function bp({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=p.useState(0),l=p.useRef(null),c=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const h=d.current?0:o;d.current=!1,l.current=null;const g=u=>{l.current||(l.current=u);const v=u-l.current,y=Math.min(v/a,1),k=1-Math.pow(1-y,3),x=h+(e-h)*k;i(x),y<1?c.current=requestAnimationFrame(g):i(e)};return c.current=requestAnimationFrame(g),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function yp({left:e,right:t,className:n=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),l=p.useRef(null),c=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const g=d.current?0:a,u=d.current?0:o;d.current=!1,l.current=null;const v=y=>{l.current||(l.current=y);const k=y-l.current,x=Math.min(k/800,1),m=1-Math.pow(1-x,3);s(Math.round(g+(e-g)*m)),i(Math.round(u+(t-u)*m)),x<1?c.current=requestAnimationFrame(v):(s(e),i(t))};return c.current=requestAnimationFrame(v),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Lg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Ag(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Og({state:e,onClose:t,onShowDetails:n,onShowPerf:a,onOpenShell:s,getNodeHealth:o}){const{t:i}=Me();if(p.useEffect(()=>{const v=()=>t(),y=()=>t(),k=x=>{x.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",v),document.addEventListener("scroll",y,!0),document.addEventListener("keydown",k)),()=>{document.removeEventListener("click",v),document.removeEventListener("scroll",y,!0),document.removeEventListener("keydown",k)}},[e.visible,t]),!e.visible||!e.node)return null;const l=e.node,c=l.status==="online",d=o(e.clusterId,l.node),h=d?`https://${d.host}:${d.port}/#v1:0:=node/${l.node}`:null,g=v=>{v.stopPropagation(),h&&window.open(h,"_blank","noopener,noreferrer"),t()},u=v=>{v.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:v=>v.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${c?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:l.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:u,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:i("vm.details")})]}),r.jsxs("button",{className:"context-menu-item",onClick:v=>{v.stopPropagation(),a(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:i("vm.perf_charts")})]}),r.jsxs("button",{className:"context-menu-item",onClick:v=>{v.stopPropagation(),s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"4 17 10 11 4 5"}),r.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),r.jsx("span",{children:i("node.host_shell")})]}),h&&r.jsxs("button",{className:"context-menu-item",onClick:g,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:i("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("node.status"),":"]}),r.jsx("span",{className:c?"text-success":"text-danger",children:c?i("node.online").toUpperCase():i("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("metric.cpu"),":"]}),r.jsxs("span",{children:[l.cpu.cores," ",i("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("metric.memory"),":"]}),r.jsx("span",{children:Ie(l.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("cluster.vms_short"),":"]}),r.jsx("span",{children:l.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[i("cluster.cts_short"),":"]}),r.jsx("span",{children:l.ct_count})]})]})]})}function Fg({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=_e(s),i=.3+s/100*.7,[l,c]=p.useState(0),d=p.useRef(null),h=p.useRef(0),g=p.useRef(!0);return p.useEffect(()=>{const v=g.current?0:l;g.current=!1,d.current=null;const y=k=>{d.current||(d.current=k);const x=k-d.current,m=Math.min(x/1e3,1),f=1-Math.pow(1-m,3),b=v+(s-v)*f;c(b),m<1?h.current=requestAnimationFrame(y):c(s)};return h.current=requestAnimationFrame(y),()=>{h.current&&cancelAnimationFrame(h.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[l.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function Dg({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){_e(e.cpu.usage_percent),_e(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx(Rg,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:ui(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Bg({node:e,storages:t,onClose:n}){const{t:a,language:s}=Me(),o=e.status==="online",i=e.cpu.usage_percent,l=e.memory.used_bytes/e.memory.total_bytes*100,c=e.disk.used_bytes/e.disk.total_bytes*100,d=e.cluster_id||"",[h,g]=p.useState(null),[u,v]=p.useState(null),[y,k]=p.useState(null);return p.useEffect(()=>{if(!d)return;let x=!0;const m=encodeURIComponent(d),f=encodeURIComponent(e.node);return(async()=>{try{const b=await fetch(`/api/clusters/${m}/nodes/${f}/updates`,{credentials:"same-origin"});b.ok&&x&&g((await b.json()).count??0)}catch{}})(),(async()=>{try{const b=await fetch(`/api/clusters/${m}/nodes/${f}/subscription`,{credentials:"same-origin"});b.ok&&x&&v((await b.json()).subscription||{})}catch{}})(),(async()=>{try{const b=await fetch(`/api/clusters/${m}/nodes/${f}/certificates`,{credentials:"same-origin"});if(b.ok&&x){const j=(await b.json()).certificates||[];let w=null;for(const _ of j){const S=_.notafter||_["notafter-formatted"];if(!S)continue;const z=typeof S=="number"?S:Date.parse(String(S))/1e3;!z||isNaN(z)||(!w||z<w.ts)&&(w={ts:z,subj:_.subject||_.filename||"cert"})}if(w){const _=Math.floor((w.ts-Date.now()/1e3)/86400);k({days:_,subj:w.subj})}}}catch{}})(),()=>{x=!1}},[d,e.node]),r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${o?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:o?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:Ag(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:Lg(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:ui(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.subscription")}),r.jsx("span",{className:"info-value",children:u===null?"…":u.status==="active"?r.jsx("span",{className:"ndp-badge ok",children:u.level||"Active"}):u.status?r.jsx("span",{className:"ndp-badge warn",children:u.status}):r.jsx("span",{className:"ndp-badge muted",children:a("node.no_sub")})})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.updates_pending")}),r.jsx("span",{className:"info-value",children:h===null?"…":h===0?r.jsx("span",{className:"ndp-badge ok",children:"0"}):r.jsx("span",{className:`ndp-badge ${h>=50?"warn":"info"}`,children:h})})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.cert_expires")}),r.jsx("span",{className:"info-value",children:y===null?"…":y.days<0?r.jsx("span",{className:"ndp-badge crit",title:y.subj,children:s==="zh-TW"?`已過期 ${Math.abs(y.days)} 天`:`expired ${Math.abs(y.days)}d ago`}):y.days<30?r.jsx("span",{className:"ndp-badge warn",title:y.subj,children:s==="zh-TW"?`${y.days} 天`:`${y.days}d`}):r.jsx("span",{className:"ndp-badge ok",title:y.subj,children:s==="zh-TW"?`${y.days} 天`:`${y.days}d`})})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${_e(i)}`,children:ct(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${_e(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${vp(e.cpu.iowait)}`,children:ct(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${vp(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${_e(l)}`,children:ct(l,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${_e(l)}`,style:{width:`${l}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ie(e.memory.used_bytes)," / ",Ie(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${_e(c)}`,children:ct(c,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${_e(c)}`,style:{width:`${c}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ie(e.disk.used_bytes)," / ",Ie(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Ie(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Ie(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(x=>{const m=x.disk.used_bytes/x.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${x.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:x.storage}),r.jsx("span",{className:"storage-type",children:x.type}),x.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${_e(m)}`,style:{width:`${m}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Ie(x.disk.used_bytes)," / ",Ie(x.disk.total_bytes)]}),r.jsx("span",{className:`text-${_e(m)}`,children:ct(m,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...x.content].sort().map(f=>r.jsx("span",{className:"content-label",children:f},f))})]},x.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Wg({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Me(),[i,l]=p.useState(null),[c,d]=p.useState(null),[h,g]=p.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),u=!e&&t&&Object.keys(t).length>0,v=p.useCallback((w,_)=>{var S;return e&&e.client_health?e.client_health[_]||null:t&&((S=t[w])!=null&&S.client_health)&&t[w].client_health[_]||null},[e,t]),y=p.useCallback((w,_,S)=>{w.preventDefault(),w.stopPropagation();const z=Math.min(w.clientX,window.innerWidth-250),R=Math.min(w.clientY,window.innerHeight-280);g({visible:!0,x:z,y:R,node:_,clusterId:S})},[]),k=p.useCallback(()=>{g(w=>({...w,visible:!1}))},[]),x=p.useMemo(()=>{var _,S,z,R,F;const w=[];if(u)Object.entries(t).forEach(([E,P])=>{var D,I,q,A,H;const ee=Object.values(P.nodes);if(ee.length>0){const U=ee.reduce((Q,M)=>Q+M.cpu.usage_percent,0)/ee.length,X=ee.reduce((Q,M)=>M.memory.total_bytes===0?Q:Q+M.memory.used_bytes/M.memory.total_bytes*100,0)/ee.length;w.push({clusterId:E,clusterName:P.name||E,clusterNodes:ee,isStandalone:((D=P.summary)==null?void 0:D.is_standalone)||!1,avgCpu:U,avgMem:X,vmsRunning:((I=P.summary)==null?void 0:I.vms_running)||0,ctsRunning:((q=P.summary)==null?void 0:q.cts_running)||0,vmCount:((A=P.summary)==null?void 0:A.vm_count)||0,ctCount:((H=P.summary)==null?void 0:H.ct_count)||0})}});else if(e){const E=Object.values(e.nodes),P=E.length>0?E.reduce((D,I)=>D+I.cpu.usage_percent,0)/E.length:0,ee=E.length>0?E.reduce((D,I)=>I.memory.total_bytes===0?D:D+I.memory.used_bytes/I.memory.total_bytes*100,0)/E.length:0;w.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:E,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:P,avgMem:ee,vmsRunning:((S=e.summary)==null?void 0:S.vms_running)||0,ctsRunning:((z=e.summary)==null?void 0:z.cts_running)||0,vmCount:((R=e.summary)==null?void 0:R.vm_count)||0,ctCount:((F=e.summary)==null?void 0:F.ct_count)||0})}return w},[e,t,u]),m=x.flatMap(w=>w.clusterNodes);p.useMemo(()=>m.length===0?0:m.reduce((w,_)=>w+_.cpu.usage_percent,0)/m.length,[m]),p.useMemo(()=>m.length===0?0:m.reduce((w,_)=>_.memory.total_bytes===0?w:w+_.memory.used_bytes/_.memory.total_bytes*100,0)/m.length,[m]);let f=null,b=[];if(i){const[w,_]=i.split("/");if(u&&t){const S=t[w];S&&(f=S.nodes[_]||null,b=Object.values(S.storages).filter(z=>z.node===_))}else e&&(f=e.nodes[_]||null,b=Object.values(e.storages).filter(S=>S.node===_))}if(!e&&!u)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const j=u?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),j]})}),r.jsx("div",{className:"cluster-sections",children:x.map(w=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(w.clusterId),title:a?o("cluster.view_vms_in",{name:w.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:w.clusterName}),w.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[w.clusterNodes.filter(_=>_.status==="online").length,"/",w.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(Fg,{cpuUsage:w.avgCpu,memUsage:w.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:w.clusterNodes.map(_=>r.jsx(Dg,{node:_,onClick:()=>l(`${w.clusterId}/${_.node}`),onContextMenu:S=>y(S,_,w.clusterId),isPaused:s},`${w.clusterId}-${_.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${_e(w.avgCpu)}`,style:{width:`${w.avgCpu}%`}})}),r.jsx(bp,{value:w.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${_e(w.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${_e(w.avgMem)}`,style:{width:`${w.avgMem}%`}})}),r.jsx(bp,{value:w.avgMem,decimals:0,suffix:"%",className:`mini-value text-${_e(w.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(yp,{left:w.vmsRunning,right:w.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(yp,{left:w.ctsRunning,right:w.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},w.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),f&&r.jsx(Bg,{node:f,storages:b,onClose:()=>l(null)}),r.jsx(Og,{state:h,onClose:k,onShowDetails:()=>{h.node&&l(`${h.clusterId}/${h.node.node}`)},onShowPerf:()=>{h.node&&d({clusterId:h.clusterId,node:h.node.node})},onOpenShell:async()=>{if(!h.node)return;const w=h.clusterId,_=h.node.node;try{const S=await fetch("/api/console/host/prepare",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:w,node:_})}),z=await S.json().catch(()=>({}));if(!S.ok){alert(z.message||z.error||"HTTP "+S.status);return}const R=`/console-host/${encodeURIComponent(w)}/${encodeURIComponent(_)}?ct=${encodeURIComponent(z.console_token)}&lang=zh-TW`;window.open(R,"_blank","noopener,noreferrer")}catch(S){alert((S==null?void 0:S.message)||String(S))}},getNodeHealth:v}),r.jsx(xf,{open:c!==null,clusterId:(c==null?void 0:c.clusterId)||"",node:(c==null?void 0:c.node)||"",kind:"node",title:c?c.node:"",onClose:()=>d(null)}),r.jsx("style",{children:`
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
      `})]})}function vf({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:l,onShowPerf:c,onShowBackupHistory:d,onShowConfig:h,getNodeHealth:g,userRole:u,consoleMode:v,consolePasswordSet:y,hideSnapshots:k,hideBackup:x,hideRemoteMigrate:m,hideConsole:f}){const{t:b}=Me(),j=Kr();if(p.useEffect(()=>{const E=()=>t(),P=()=>t(),ee=D=>{D.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",E),document.addEventListener("scroll",P,!0),document.addEventListener("keydown",ee)),()=>{document.removeEventListener("click",E),document.removeEventListener("scroll",P,!0),document.removeEventListener("keydown",ee)}},[e.visible,t]),!e.visible||!e.vm)return null;const w=e.vm,_=g(e.clusterId,w.node),S=_?`https://${_.host}:${_.port}/#v1:0:=${w.type}/${w.vmid}`:null,z=E=>{E.stopPropagation(),S&&window.open(S,"_blank","noopener,noreferrer"),t()},R=E=>{E.stopPropagation(),n(),t()},F=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:E=>E.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:w.name}),r.jsxs("span",{className:"context-menu-id",children:["#",w.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:R,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:b("vm.details")})]}),S&&r.jsxs("button",{className:"context-menu-item",onClick:z,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:b("vm.open_pve")})]}),!f&&(u==="operator"||u==="admin")&&(()=>{const E=v==="disabled"?"console.disabled":w.status!=="running"?"console.vm_not_running":null,P=!!E;return r.jsxs("button",{className:`context-menu-item ${P?"is-disabled":""}`,title:P?b(E):void 0,onClick:ee=>{if(ee.stopPropagation(),P){t(),j.alert(b(E));return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:b("vm.console")})]})})(),!k&&(u==="operator"||u==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:b("vm.snapshots")})]}),r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation();const P=`/tasks?vmid=${encodeURIComponent(String(w.vmid))}&cluster=${encodeURIComponent(e.clusterId)}`;window.history.pushState(null,"",P),window.dispatchEvent(new PopStateEvent("popstate")),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"})]}),r.jsx("span",{children:b("vm.task_history")})]}),c&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),c(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:b("vm.perf_charts")})]}),d&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),d(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:b("vm.backup_history")})]}),h&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),h(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),r.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),r.jsx("span",{children:b("vm.config_view")})]}),!x&&(u==="operator"||u==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:b("vm.backup_now")})]}),(u==="operator"||u==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),w.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),a({vm:w,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:b("vm.start")})]}),w.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),a({vm:w,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:b("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),a({vm:w,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:b("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:E=>{E.stopPropagation(),a({vm:w,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:b("vm.stop_hard")})]})]})]}),!m&&u==="admin"&&w.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:E=>{E.stopPropagation(),l(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:b("vm.migrate_remote")})]})]}),r.jsx("style",{children:`
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
      `})]});return qc.createPortal(F,document.body)}const Ug={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Vg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Hg({task:e}){const t=Ug[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Vg(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:Yg})]})}const Yg=`
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
`;function Gg({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:l,onCancel:c}){const[d,h]=qo.useState(""),g=p.useRef(null),u=p.useRef(null);if(p.useEffect(()=>{e&&(h(""),setTimeout(()=>{var y,k;a?(y=u.current)==null||y.focus():(k=g.current)==null||k.focus()},50))},[e,a]),p.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&(k.preventDefault(),c()),k.key==="Enter"&&(!a||d===a)&&(k.preventDefault(),l())};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,d,a,l,c]),!e)return null;const v=!a||d===a;return r.jsxs("div",{onClick:c,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:y=>y.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:y=>h(y.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:c,children:i}),r.jsx("button",{ref:g,className:`cm-btn confirm ${s?"danger":""}`,disabled:!v,onClick:l,children:o})]})]})]})}function Wa({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,l]=p.useState(!1),[c,d]=p.useState(-1),h=p.useRef(null),g=p.useRef(null),u=p.useId(),v=t.find(m=>m.value===e);p.useEffect(()=>{if(!i)return;const m=b=>{var S,z;const j=b.target,w=(S=h.current)==null?void 0:S.contains(j),_=(z=g.current)==null?void 0:z.contains(j);!w&&!_&&l(!1)},f=b=>{if(b.key==="Escape"){l(!1);return}if(b.key==="ArrowDown")b.preventDefault(),d(j=>Math.min(t.length-1,j<0?0:j+1));else if(b.key==="ArrowUp")b.preventDefault(),d(j=>Math.max(0,j-1));else if(b.key==="Enter"){b.preventDefault();const j=t[c];j&&!j.disabled&&(n(j.value),l(!1))}};return document.addEventListener("mousedown",m),document.addEventListener("keydown",f),()=>{document.removeEventListener("mousedown",m),document.removeEventListener("keydown",f)}},[i,c,t,n]);const y=()=>{o||(l(m=>!m),d(t.findIndex(m=>m.value===e)))},[k,x]=p.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return p.useLayoutEffect(()=>{if(!i)return;const m=()=>{var R;const f=(R=h.current)==null?void 0:R.getBoundingClientRect();if(!f)return;const b=6,j=320,w=window.innerHeight-f.bottom-b-8,_=f.top-b-8,S=w<160&&_>w+40,z=Math.max(120,Math.min(j,S?_:w));x({left:f.left,top:S?f.top-b:f.bottom+b,width:f.width,flipUp:S,maxH:z})};return m(),window.addEventListener("resize",m),window.addEventListener("scroll",m,!0),()=>{window.removeEventListener("resize",m),window.removeEventListener("scroll",m,!0)}},[i]),r.jsxs("div",{ref:h,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:Kg}),r.jsxs("button",{type:"button",id:u,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:y,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:v?v.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&qc.createPortal(r.jsx("div",{ref:g,className:"cyber-select-list",role:"listbox",style:{left:k.left,width:k.width,...k.flipUp?{bottom:window.innerHeight-k.top,top:"auto"}:{top:k.top},maxHeight:k.maxH},children:t.map((m,f)=>r.jsxs("div",{role:"option","aria-selected":m.value===e,"aria-disabled":m.disabled||void 0,className:`cyber-select-opt ${m.value===e?"selected":""} ${f===c?"hover":""} ${m.disabled?"disabled":""}`,onMouseEnter:()=>d(f),onClick:()=>{m.disabled||(n(m.value),l(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:m.label}),m.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:m.hint}),m.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},m.value))}),document.body)]})}const Kg=`
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
`,Xg=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function bf({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=Me(),[i,l]=p.useState("endpoint"),[c,d]=p.useState([]),[h,g]=p.useState(""),[u,v]=p.useState(""),[y,k]=p.useState(!1),[x,m]=p.useState(null),[f,b]=p.useState(null),[j,w]=p.useState(!1),[_,S]=p.useState({}),[z,R]=p.useState({}),[F,E]=p.useState(""),[P,ee]=p.useState(""),[D,I]=p.useState(!0),[q,A]=p.useState(!1),[H,U]=p.useState(""),[X,Q]=p.useState(""),[M,ge]=p.useState(""),[je,Oe]=p.useState(null),[G,ue]=p.useState(!1),ke=async()=>{if(!(!n||!te)){ue(!0),Oe(null),Q("");try{const W=await We.migrationPrecheck(t,n.vmid,te.cluster_id,te.node_name||te.node_host);Oe({ok:W.ok,blockers:W.blockers,warnings:W.warnings})}catch(W){const ce=W instanceof Error?W.message:String(W);Q(`pre-flight check failed: ${ce}`)}finally{ue(!1)}}};p.useEffect(()=>{e&&(l("endpoint"),d([]),g(""),v(""),m(null),b(null),S({}),R({}),E(""),ee(n?String(n.vmid):""),U(""),Q(""),ge(""),Oe(null),We.listRemoteEndpoints(t).then(W=>d(W.endpoints)).catch(W=>Q(`could not list target clusters: ${W.message||W}`)),n&&We.getMigrationSource(t,n.vmid).then(m).catch(W=>Q(`could not introspect source VM: ${W.message||W}`)))},[e,t,n]),p.useEffect(()=>{if(!e)return;const W=ce=>{ce.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",W),()=>document.removeEventListener("keydown",W)},[e,i,a]);const te=c.find(W=>Yi(W)===h),J=async W=>{var me;g(W);const ce=c.find(pe=>Yi(pe)===W);if(ce){k(!0),w(!0),Q(""),b(null),E("");try{const pe=await We.fetchRemoteFingerprint(ce.node_host,ce.node_port);v(pe.fingerprint)}catch(pe){const ye=pe instanceof Error?pe.message:String(pe);Q(`could not auto-fetch fingerprint (${ye}); paste manually`),v("")}finally{k(!1)}try{const pe=ce.node_name||ce.node_host,ye=await We.getMigrationTargets(ce.cluster_id,pe);b(ye);const Fe=ye.ips.find(Je=>Je.address===ce.node_host);E(Fe?Fe.address:((me=ye.ips[0])==null?void 0:me.address)||ce.node_host)}catch(pe){const ye=pe instanceof Error?pe.message:String(pe);Q(`could not enumerate target node resources: ${ye}`)}finally{w(!1)}}};p.useEffect(()=>{!x||!f||(S(W=>{const ce={...W};return x.disks.forEach(me=>{var pe;if(!ce[me.key]){const ye=f.storages.find(Fe=>Fe.storage===me.storage);ce[me.key]=((pe=ye||f.storages[0])==null?void 0:pe.storage)||""}}),ce}),R(W=>{const ce={...W};return x.nics.forEach(me=>{var pe;if(!ce[me.key]){const ye=f.bridges.find(Fe=>Fe.iface===me.bridge);ce[me.key]=((pe=ye||f.bridges[0])==null?void 0:pe.iface)||""}}),ce}))},[x,f]);const L=p.useMemo(()=>{if(!x)return"";const W=new Set,ce=new Map;return x.disks.forEach(me=>{const pe=_[me.key];me.storage&&pe&&(ce.set(me.storage,pe),W.add(pe))}),W.size===1?Array.from(W)[0]:Array.from(ce.entries()).map(([me,pe])=>`${me}=${pe}`).join(",")},[x,_]),C=p.useMemo(()=>{if(!x)return"";const W=new Set,ce=new Map;return x.nics.forEach(me=>{const pe=z[me.key];me.bridge&&pe&&(ce.set(me.bridge,pe),W.add(pe))}),W.size===1?Array.from(W)[0]:Array.from(ce.entries()).map(([me,pe])=>`${me}=${pe}`).join(",")},[x,z]),Y=async()=>{if(!(!n||!te)){l("submitting"),Q("");try{const W=await We.remoteMigrate(t,n.vmid,{target_cluster_id:te.cluster_id,target_endpoint_host:F||te.node_host,target_endpoint_port:te.node_port,target_endpoint_fingerprint:u||void 0,target_vmid:parseInt(P,10),target_bridge_map:C,target_storage_map:L,online:D,delete_source:q,bwlimit:H?parseInt(H,10):void 0});ge(W.upid),l("done"),s==null||s(W.upid)}catch(W){const ce=W instanceof Error?W.message:String(W);Q(ce),l("error")}}};if(!e||!n)return null;const re=!!P&&/^\d+$/.test(P)&&!!x&&!!f&&x.disks.every(W=>!!_[W.key])&&x.nics.every(W=>!!z[W.key]),be=i==="endpoint"?!!te&&!!f&&!!F:i==="mappings"?re:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:Qg,children:[r.jsx("style",{children:Jg}),r.jsxs("div",{className:"rmm",onClick:W=>W.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsx(Wa,{value:h,placeholder:o("rmm.endpoint.select"),options:c.map(W=>({value:Yi(W),label:`${W.cluster_name} @ ${W.node_host}:${W.node_port}`})),onChange:W=>J(W)}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:u,onChange:W=>v(W.target.value),placeholder:y?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),te&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsx(Wa,{value:F,disabled:j||!f,placeholder:j?o("rmm.endpoint.datapath_loading"):"",options:j?[]:!f||f.ips.length===0?[{value:te.node_host,label:`${te.node_host} (mgmt)`}]:f.ips.map(W=>({value:W.address,label:`${W.address} · ${W.iface} (${W.type})`})),onChange:W=>E(W)}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),X&&r.jsx("div",{className:"rmm-err",children:X}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!be,onClick:()=>l("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&te&&x&&f&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:P,onChange:W=>ee(W.target.value)}),x.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),x.disks.map(W=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:W.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[W.storage," ",r.jsx("em",{children:W.size})]}),r.jsx(Wa,{value:_[W.key]||"",options:f.storages.map(ce=>({value:ce.storage,label:`${ce.storage} (${ce.type}, ${Xg(ce.avail)} free)`})),onChange:ce=>S({..._,[W.key]:ce})})]},W.key))]})]}),x.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),x.nics.map(W=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:W.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[W.bridge," ",r.jsx("em",{children:W.model})]}),r.jsx(Wa,{value:z[W.key]||"",options:f.bridges.map(ce=>({value:ce.iface,label:`${ce.iface}${ce.address?` (${ce.address})`:""}`})),onChange:ce=>R({...z,[W.key]:ce})})]},W.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:D,onChange:W=>I(W.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:q,onChange:W=>A(W.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:H,onChange:W=>U(W.target.value),placeholder:"0"}),X&&r.jsx("div",{className:"rmm-err",children:X}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!be,onClick:()=>l("review"),children:o("rmm.action.review")})]})]}),i==="review"&&te&&r.jsxs(r.Fragment,{children:[r.jsx(qg,{vm:n,selected:te,clusterId:t,precheck:je,precheckLoading:G,onRun:ke,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[te.cluster_id,"/",te.node_host,":",te.node_port," → vmid ",P]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:F})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:u||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:L||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:C||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(D?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(q?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:H?`${H} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:G||je!==null&&!je.ok,onClick:Y,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:M})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:X}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function Yi(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function qg({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(qo.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const l=a.blockers.length>0,c=a.warnings.length>0,d=l?"blockers":c?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((h,g)=>r.jsx("li",{children:h},g))})]}),c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((h,g)=>r.jsx("li",{children:h},g))})]}),!l&&!c&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const Qg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},Jg=`
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
`;function Zg(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function yf({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Me(),o=Kr(),[i,l]=p.useState([]),[c,d]=p.useState(!1),[h,g]=p.useState(!1),[u,v]=p.useState(""),[y,k]=p.useState(""),[x,m]=p.useState(!1),[f,b]=p.useState(""),j=async()=>{if(n){d(!0),b("");try{const z=await We.listSnapshots(t,n.vmid);l((z.snapshots||[]).filter(R=>R.name!=="current"))}catch(z){b(z instanceof Error?z.message:String(z))}finally{d(!1)}}};if(p.useEffect(()=>{e&&(v(""),k(""),m(!1),b(""),j())},[e,t,n==null?void 0:n.vmid]),p.useEffect(()=>{if(!e)return;const z=R=>{R.key==="Escape"&&a()};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[e,a]),!e||!n)return null;const w=async()=>{if(u){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(u)){b("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}g(!0),b("");try{await We.createSnapshot(t,n.vmid,{snapname:u,description:y,vmstate:x}),v(""),k(""),m(!1),await j()}catch(z){b(z instanceof Error?z.message:String(z))}finally{g(!1)}}},_=async z=>{if(await o.confirm(s("snap.confirm_delete",{name:z.name}),{destructive:!0})){b("");try{await We.deleteSnapshot(t,n.vmid,z.name),await j()}catch(R){b(R instanceof Error?R.message:String(R))}}},S=async z=>{if(await o.confirm(s("snap.confirm_rollback",{name:z.name}),{destructive:!0})){b("");try{await We.rollbackSnapshot(t,n.vmid,z.name),await j()}catch(R){b(R instanceof Error?R.message:String(R))}}};return r.jsxs("div",{onClick:a,style:ex,children:[r.jsx("style",{children:tx}),r.jsxs("div",{className:"sm-modal",onClick:z=>z.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:u,onChange:z=>v(z.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:y,onChange:z=>k(z.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:x,onChange:z=>m(z.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:h||!u,onClick:w,children:h?"…":s("snap.create")})]})]}),f&&r.jsx("div",{className:"sm-err",children:f}),r.jsxs("div",{className:"sm-list",children:[c&&r.jsx("div",{className:"sm-empty",children:"…"}),!c&&i.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!c&&i.map(z=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:z.name}),z.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:z.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",Zg(z.snaptime)]}),z.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),z.description&&r.jsx("div",{className:"sm-desc",children:z.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>S(z),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>_(z),children:s("snap.delete")})]})]},z.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const ex={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},tx=`
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
`;function wf({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Me(),[o,i]=p.useState([]),[l,c]=p.useState(!1),[d,h]=p.useState(""),[g,u]=p.useState("snapshot"),[v,y]=p.useState("zstd"),[k,x]=p.useState(""),[m,f]=p.useState(""),[b,j]=p.useState(!1);if(p.useEffect(()=>{!e||!n||(x(""),f(""),h(""),c(!0),We.getCluster(t).then(S=>{const R=Object.values(S.storages||{}).filter(F=>{var P;if(!((P=F.content)!=null&&P.includes("backup")))return!1;const E=F.allowed_nodes||[];return E.length>0&&!E.includes(n.node)||!F.shared&&F.node!==n.node?!1:F.enabled!==!1});i(R),R.length>0&&h(R[0].storage)}).catch(S=>x(S.message||String(S))).finally(()=>c(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),p.useEffect(()=>{if(!e)return;const S=z=>{z.key==="Escape"&&!b&&a()};return document.addEventListener("keydown",S),()=>document.removeEventListener("keydown",S)},[e,b,a]),!e||!n)return null;const w=o.length>0,_=async()=>{if(d){j(!0),x("");try{const S=await We.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:g,compress:v});f(S.upid)}catch(S){x(S instanceof Error?S.message:String(S))}finally{j(!1)}}};return r.jsxs("div",{onClick:()=>!b&&a(),style:rx,children:[r.jsx("style",{children:nx}),r.jsxs("div",{className:"bm-modal",onClick:S=>S.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!m&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),l?r.jsx("div",{className:"bm-empty",children:"…"}):w?r.jsx("select",{value:d,onChange:S=>h(S.target.value),children:o.map(S=>r.jsxs("option",{value:S.storage,children:[S.storage," (",S.type,S.shared?", shared":"",")"]},S.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:g,onChange:S=>u(S.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:v,onChange:S=>y(S.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),k&&r.jsx("div",{className:"bm-err",children:k}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:b,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:b||!d,onClick:_,children:b?"…":s("backup.start")})]})]}),m&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:m})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const rx={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},nx=`
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
`,wp=e=>{if(!e||!isFinite(e))return"—";const t=["B","KB","MB","GB","TB"];let n=0,a=e;for(;a>=1024&&n<t.length-1;)a/=1024,n++;return`${a.toFixed(a>=100?0:a>=10?1:2)} ${t[n]}`},kp=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`},jp=(e,t)=>{if(!e)return"—";const n=Math.floor(Date.now()/1e3)-e,a=Math.floor(n/86400);if(a===0)return t==="zh-TW"?"今天":"today";if(a===1)return t==="zh-TW"?"昨天":"yesterday";if(a<30)return t==="zh-TW"?`${a} 天前`:`${a}d ago`;const s=Math.floor(a/30);return t==="zh-TW"?`${s} 個月前`:`${s}mo ago`},Np=e=>{if(!e)return"unknown";const t=(Date.now()/1e3-e)/86400;return t>30?"stale":t>7?"aging":"fresh"};function ax({open:e,onClose:t,clusterId:n,vmid:a,vmName:s}){var k;const{t:o,language:i}=Me(),[l,c]=p.useState([]),[d,h]=p.useState(!1),[g,u]=p.useState(null);if(p.useEffect(()=>{if(!e)return;let x=!0;return(async()=>{h(!0),u(null);try{const m=await fetch(`/api/clusters/${encodeURIComponent(n)}/vms/${a}/backups`,{credentials:"same-origin"});if(!m.ok){const b=await m.json().catch(()=>({}));throw new Error(b.error||`HTTP ${m.status}`)}const f=await m.json();x&&c(f.backups||[])}catch(m){x&&u(m.message||String(m))}finally{x&&h(!1)}})(),()=>{x=!1}},[e,n,a]),!e)return null;const v=l.reduce((x,m)=>x+(m.size||0),0),y=(k=l[0])==null?void 0:k.ctime;return r.jsx("div",{className:"bh-back",onClick:t,children:r.jsxs("div",{className:"bh-modal",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"bh-head",children:[r.jsxs("div",{className:"bh-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:o("bh.title")}),s&&r.jsxs("span",{className:"bh-target",children:[a," — ",s]})]}),r.jsx("button",{className:"bh-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"bh-stats",children:[r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.count")})," ",l.length]}),r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.total_size")})," ",wp(v)]}),r.jsxs("div",{children:[r.jsx("span",{className:"lbl",children:o("bh.newest")})," ",y?kp(y):"—",y&&r.jsx("span",{className:`bh-age bh-age-${Np(y)}`,children:jp(y,i)})]})]}),r.jsxs("div",{className:"bh-body",children:[g&&r.jsx("div",{className:"bh-error",children:g}),d&&l.length===0&&r.jsx("div",{className:"bh-loading",children:o("bh.loading")}),!d&&l.length===0&&!g&&r.jsxs("div",{className:"bh-empty",children:[r.jsx("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"})}),r.jsx("div",{children:o("bh.empty")})]}),l.length>0&&r.jsxs("table",{className:"bh-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:o("bh.col.ctime")}),r.jsx("th",{children:o("bh.col.age")}),r.jsx("th",{children:o("bh.col.storage")}),r.jsx("th",{children:o("bh.col.node")}),r.jsx("th",{className:"num",children:o("bh.col.size")}),r.jsx("th",{children:o("bh.col.flags")}),r.jsx("th",{children:o("bh.col.notes")})]})}),r.jsx("tbody",{children:l.map(x=>{var m,f;return r.jsxs("tr",{children:[r.jsx("td",{children:kp(x.ctime)}),r.jsx("td",{children:r.jsx("span",{className:`bh-age bh-age-${Np(x.ctime)}`,children:jp(x.ctime,i)})}),r.jsx("td",{children:x.storage||"—"}),r.jsx("td",{children:x.node||"—"}),r.jsx("td",{className:"num",children:wp(x.size)}),r.jsxs("td",{children:[x.protected&&r.jsx("span",{className:"bh-flag protected",children:o("bh.protected")}),((m=x.verification)==null?void 0:m.state)==="ok"&&r.jsx("span",{className:"bh-flag verified",children:o("bh.verified")}),((f=x.verification)==null?void 0:f.state)==="failed"&&r.jsx("span",{className:"bh-flag failed",children:o("bh.verify_failed")})]}),r.jsx("td",{className:"bh-notes",title:x.notes,children:x.notes||""})]},x.volid)})})]})]}),r.jsx("style",{children:`
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
        `})]})})}const sx=/^(scsi|virtio|sata|ide)\d+$/,ox=/^net\d+$/,ix=/^(mp|rootfs)\d*$/,lx=e=>{const t=/size=([^,]+)/.exec(e);return t?t[1]:""},_p=e=>{const t={};if(!e)return t;const n=e.split(",");n[0]&&n[0].indexOf("=")<0&&(t._head=n[0],n.shift());for(const a of n){const s=a.indexOf("=");s>0&&(t[a.slice(0,s).trim()]=a.slice(s+1).trim())}return t};function cx({open:e,onClose:t,clusterId:n,node:a,vmid:s,kind:o,title:i}){const{t:l,language:c}=Me(),[d,h]=p.useState(null),[g,u]=p.useState(!1),[v,y]=p.useState(null);p.useEffect(()=>{if(!e)return;let x=!0;return(async()=>{u(!0),y(null);try{const m=o==="qemu"?"qemu":"lxc",f=await fetch(`/api/clusters/${encodeURIComponent(n)}/nodes/${encodeURIComponent(a)}/${m}/${s}/config`,{credentials:"same-origin"});if(!f.ok){const j=await f.json().catch(()=>({}));throw new Error(j.error||`HTTP ${f.status}`)}const b=await f.json();x&&h(b.config||{})}catch(m){x&&y(m.message||String(m))}finally{x&&u(!1)}})(),()=>{x=!1}},[e,n,a,s,o]);const k=p.useMemo(()=>{if(!d)return null;const x=[],m=[],f=[],b=[],j=[],w=new Set(["name","hostname","cores","sockets","cpu","cpulimit","cpuunits","memory","balloon","shares","ostype","agent","boot","bios","machine","numa","tablet","onboot","protection","startup","arch","description","tags","unprivileged","features","parent","lock","swap","vga"]);for(const[_,S]of Object.entries(d)){const z=String(S);if(!(_.startsWith("digest")||_==="_error")){if(w.has(_)){x.push([_,z]);continue}if(sx.test(_)){const R=_p(z),F=R._head||z.split(",")[0],E=R.size||lx(z),P=Object.entries(R).filter(([ee])=>ee!=="_head"&&ee!=="size");m.push({id:_,bus:_,volid:F,size:E,opts:P.map(([ee,D])=>`${ee}=${D}`).join(", ")});continue}if(ix.test(_)){f.push([_,z]);continue}if(ox.test(_)){const R=_p(z),F=(R._head||"").split("="),E=F[0]||"",P=F[1]||"";b.push({id:_,model:E||R.model||"",bridge:R.bridge||"",mac:P,vlan:R.tag||"",firewall:R.firewall||""});continue}j.push([_,z])}}return x.sort((_,S)=>_[0].localeCompare(S[0])),j.sort((_,S)=>_[0].localeCompare(S[0])),{general:x,disks:m,mounts:f,nics:b,other:j}},[d]);return e?r.jsx("div",{className:"vc-back",onClick:t,children:r.jsxs("div",{className:"vc-modal",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"vc-head",children:[r.jsxs("div",{className:"vc-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),r.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),r.jsx("span",{children:l("vmcfg.title")}),i&&r.jsx("span",{className:"vc-target",children:i})]}),r.jsx("button",{className:"vc-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"vc-body",children:[g&&!d&&r.jsx("div",{className:"vc-loading",children:l("vmcfg.loading")}),v&&r.jsx("div",{className:"vc-error",children:v}),k&&r.jsxs(r.Fragment,{children:[k.general.length>0&&r.jsx(Ra,{title:l("vmcfg.section.general"),children:r.jsx("div",{className:"vc-kv",children:k.general.map(([x,m])=>r.jsxs("div",{className:"vc-kv-row",children:[r.jsx("span",{className:"vc-kv-key",children:x}),r.jsx("span",{className:"vc-kv-val",children:m})]},x))})}),k.disks.length>0&&r.jsx(Ra,{title:l("vmcfg.section.disks"),children:r.jsxs("table",{className:"vc-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:l("vmcfg.col.bus")}),r.jsx("th",{children:l("vmcfg.col.volid")}),r.jsx("th",{children:l("vmcfg.col.size")}),r.jsx("th",{children:l("vmcfg.col.opts")})]})}),r.jsx("tbody",{children:k.disks.map(x=>r.jsxs("tr",{children:[r.jsx("td",{className:"vc-mono",children:x.bus}),r.jsx("td",{className:"vc-mono",children:x.volid}),r.jsx("td",{className:"vc-mono",children:x.size}),r.jsx("td",{className:"vc-mono vc-trunc",title:x.opts,children:x.opts})]},x.id))})]})}),k.nics.length>0&&r.jsx(Ra,{title:l("vmcfg.section.nics"),children:r.jsxs("table",{className:"vc-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:l("vmcfg.col.id")}),r.jsx("th",{children:l("vmcfg.col.model")}),r.jsx("th",{children:l("vmcfg.col.bridge")}),r.jsx("th",{children:l("vmcfg.col.mac")}),r.jsx("th",{children:l("vmcfg.col.vlan")}),r.jsx("th",{children:l("vmcfg.col.firewall")})]})}),r.jsx("tbody",{children:k.nics.map(x=>r.jsxs("tr",{children:[r.jsx("td",{className:"vc-mono",children:x.id}),r.jsx("td",{className:"vc-mono",children:x.model}),r.jsx("td",{className:"vc-mono",children:x.bridge}),r.jsx("td",{className:"vc-mono",children:x.mac}),r.jsx("td",{className:"vc-mono",children:x.vlan||"—"}),r.jsx("td",{className:"vc-mono",children:x.firewall==="1"?"on":"—"})]},x.id))})]})}),k.mounts.length>0&&r.jsx(Ra,{title:l("vmcfg.section.mounts"),children:r.jsx("div",{className:"vc-kv",children:k.mounts.map(([x,m])=>r.jsxs("div",{className:"vc-kv-row",children:[r.jsx("span",{className:"vc-kv-key",children:x}),r.jsx("span",{className:"vc-kv-val vc-trunc",title:m,children:m})]},x))})}),k.other.length>0&&r.jsx(Ra,{title:l("vmcfg.section.other"),children:r.jsx("div",{className:"vc-kv",children:k.other.map(([x,m])=>r.jsxs("div",{className:"vc-kv-row",children:[r.jsx("span",{className:"vc-kv-key",children:x}),r.jsx("span",{className:"vc-kv-val vc-trunc",title:m,children:m})]},x))})})]})]}),r.jsx("style",{children:`
          .vc-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .vc-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: vc-in .18s ease-out; overflow: hidden; }
          @keyframes vc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .vc-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .vc-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .vc-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 12px; letter-spacing: .04em; text-transform: none; }
          .vc-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .vc-close:hover { color: var(--primary); }
          .vc-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .vc-loading { padding: 40px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .vc-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; margin-bottom: 12px; }

          .vc-section { margin-bottom: 18px; }
          .vc-section-title { font-family: var(--font-display); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.12); }
          .vc-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4px 16px; font-family: var(--font-mono); font-size: 12px; }
          .vc-kv-row { display: flex; justify-content: space-between; gap: 12px; padding: 4px 6px; border-bottom: 1px solid rgba(0, 240, 255, 0.05); }
          .vc-kv-row:hover { background: rgba(0, 240, 255, 0.04); }
          .vc-kv-key { color: var(--text-secondary); font-family: var(--font-display); font-size: 11px; letter-spacing: .04em; text-transform: uppercase; }
          .vc-kv-val { color: var(--text-primary); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

          .vc-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; }
          .vc-table th { padding: 5px 8px; text-align: left; font-family: var(--font-display); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.04); }
          .vc-table td { padding: 4px 8px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .vc-table tbody tr:hover { background: rgba(0,240,255,.04); }
          .vc-mono { font-family: var(--font-mono); }
          .vc-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
        `})]})}):null}function Ra({title:e,children:t}){return r.jsxs("div",{className:"vc-section",children:[r.jsx("div",{className:"vc-section-title",children:e}),t]})}function kf({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=Me(),[i,l]=p.useState(""),[c,d]=p.useState(!1),[h,g]=p.useState(""),u=p.useRef(null);if(p.useEffect(()=>{e&&(l(""),g(""),d(!1),setTimeout(()=>{var y;return(y=u.current)==null?void 0:y.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&!c&&a()};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,c,a]),!e)return null;const v=async()=>{if(i){d(!0),g("");try{await s(i)}catch(y){const k=y instanceof Error?y.message:String(y);g(o("console.prepare_failed",{err:k})),d(!1)}}};return r.jsxs("div",{onClick:()=>!c&&a(),style:dx,children:[r.jsx("style",{children:px}),r.jsxs("div",{className:"cpw-modal",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:u,type:"password",value:i,onChange:y=>l(y.target.value),onKeyDown:y=>{y.key==="Enter"&&v()},autoComplete:"current-password",spellCheck:!1}),h&&r.jsx("div",{className:"cpw-err",children:h}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:c,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:v,disabled:c||!i,children:c?"…":o("console.prompt_open")})]})]})]})}const dx={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},px=`
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
`;function Cs(){const[e,t]=p.useState(!0),[n,a]=p.useState(null),[s,o]=p.useState(!1),i=async()=>{try{const c=await We.authMe();c.authenticated&&c.user?(a(c.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},l=async()=>{try{await We.authLogout()}catch{}window.location.replace("/login")};return p.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:l}}function Gi(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function ux(e){return e==="stop"||e==="shutdown"||e==="reboot"}function qs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const l of Object.values(i.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}const Sp=qo.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:l=!1,isCompleting:c=!1},d){var _,S,z;const h=t.status==="running",g=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,v=Math.max(t.cpu.usage_percent,g,u),y=h?_e(v):"muted",k=!!i,x=(_=i==null?void 0:i.task_type)==null?void 0:_.includes("migrate"),m=((S=i==null?void 0:i.task_type)==null?void 0:S.includes("backup"))||((z=i==null?void 0:i.task_type)==null?void 0:z.includes("vzdump")),f=t.name.length>12?t.name.substring(0,11)+"…":t.name,j=i?(R=>{const F=R.toLowerCase();return F.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:F.includes("backup")||F.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:F.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:F.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:F.includes("clone")?{label:"CLONE",color:"#10b981"}:F.includes("start")||F.includes("qmstart")?{label:"START",color:"#00ff88"}:F.includes("stop")||F.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:F.includes("reboot")||F.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,w=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${k?"has-task":""} ${x?"migrating":""} ${m?"backup":""} ${l?"ghost":""} ${c?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${y}`,children:[r.jsx("span",{className:"vm-name",children:f}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!x&&!m&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),m&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),x&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),j&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:j.color,color:j.color},children:[j.label,x&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),k&&!x&&!m&&r.jsx("div",{className:"vm-task-ring"}),m&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),x&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(w==null?void 0:w.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",w.target]})]}),l&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function mx({vm:e,onClose:t}){const{t:n}=Me(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${Gl(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${Gl(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:ui(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${_e(e.cpu.usage_percent)}`,children:ct(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${_e(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Ie(e.memory.used_bytes)," / ",Ie(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${_e(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Ie(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Ie(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function fx({cluster:e,clusters:t}){var ir;const{t:n,language:a}=Me(),s=Kr(),[o,i]=p.useState(null),l=Cs(),[c,d]=p.useState(null),[h,g]=p.useState(null),[u,v]=p.useState(null),[y,k]=p.useState(null),[x,m]=p.useState(null),[f,b]=p.useState(null),[j,w]=p.useState(null),[_,S]=p.useState("disabled"),[z,R]=p.useState({});p.useEffect(()=>{We.getConfig().then(N=>{var T;S(((T=N.console)==null?void 0:T.mode)||"disabled");const B={};(N.clusters||[]).forEach($=>{B[$.id]=!!($.auth&&$.auth.password&&$.auth.password.length>0)}),R(B)}).catch(()=>S("disabled"))},[]);const[F,E]=p.useState(null),P=p.useCallback((N,B,T,$)=>{const O=typeof localStorage<"u"&&localStorage.getItem("language")||"",se=B.type==="lxc",ie=`${se?"/console-term":"/console"}/${encodeURIComponent(N)}/${encodeURIComponent(B.node)}/${B.vmid}?ct=${encodeURIComponent(T)}`+(B.name?`&name=${encodeURIComponent(B.name)}`:"")+(O?`&lang=${encodeURIComponent(O)}`:"")+(!se&&$?`#vp=${encodeURIComponent($)}`:"");window.open(ie,"_blank","noopener,noreferrer")},[]),[ee,D]=p.useState([]),I=p.useRef(new Map),q=p.useCallback(N=>{N.action==="start"||N.action==="resume"?A(N):d(N)},[]),A=p.useCallback(async N=>{d(null);try{const B=N.vm.type==="lxc",T=B?await We.ctAction(N.clusterId,N.vm.node,N.vm.vmid,N.action):await We.vmAction(N.clusterId,N.vm.node,N.vm.vmid,N.action);console.info(`[vm_control] ${N.action} ${B?"ct":"vm"}/${N.vm.vmid} → upid=${T.upid}`)}catch(B){const T=B instanceof Error?B.message:String(B);T.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${N.action} failed: ${T.slice(0,200)}`)}},[]),H=p.useCallback(()=>{c&&A(c)},[c,A]),[U,X]=p.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[Q,M]=p.useState(""),[ge,je]=p.useState(new Set),[Oe,G]=p.useState(!1),ue=p.useCallback(N=>{je(B=>{const T=new Set(B);return T.has(N)?T.delete(N):T.add(N),T})},[]),ke=p.useCallback(()=>je(new Set),[]),te=p.useCallback(async N=>{if(ge.size!==0){G(!0);try{const B=new Map;for(const Z of ge){const[ie,,de]=Z.split("/"),xe=parseInt(de,10);if(!ie||!Number.isFinite(xe))continue;const ve=B.get(ie)||[];ve.push(xe),B.set(ie,ve)}const T=[];for(const[Z,ie]of B)try{const de=await We.bulkAction(Z,{action:N,vmids:ie}),xe=de.results.filter(Be=>Be.ok).length,ve=de.results.length-xe,He=de.results.filter(Be=>!Be.ok).map(Be=>`#${Be.vmid}: ${Be.error||"unknown"}`);T.push({cluster:Z,ok:xe,fail:ve,errs:He})}catch(de){const xe=de instanceof Error?de.message:String(de);T.push({cluster:Z,ok:0,fail:ie.length,errs:[xe]})}const $=T.reduce((Z,ie)=>Z+ie.ok,0),O=T.reduce((Z,ie)=>Z+ie.fail,0),se=[];T.forEach(Z=>{se.push(`${Z.cluster}: ${Z.ok} ok / ${Z.fail} fail`),Z.errs.slice(0,5).forEach(ie=>se.push(`  • ${ie}`)),Z.errs.length>5&&se.push(`  • … +${Z.errs.length-5}`)}),await s.alert(`${N.toUpperCase()}: ${$} ok, ${O} fail

${se.join(`
`)}`,{title:"Bulk action result"}),O===0&&ke()}finally{G(!1)}}},[ge,ke]),[J,L]=p.useState(()=>{const N=(()=>{if(typeof window>"u")return null;const T=window.location.pathname.split("/").filter(Boolean)[1];return T==="grid"||T==="table"||T==="thumb"?T:null})();if(N)return N;const B=localStorage.getItem("vm_matrix_view_mode");return B==="table"||B==="thumb"||B==="grid"?B:"grid"});p.useEffect(()=>{if(typeof window>"u"||window.location.pathname.split("/").filter(Boolean)[0]!=="matrix")return;const B=`/matrix/${J}`;window.location.pathname!==B&&window.history.replaceState(null,"",B)},[J]),p.useEffect(()=>{const N=()=>{const B=window.location.pathname.split("/").filter(Boolean)[1];(B==="grid"||B==="table"||B==="thumb")&&L(B)};return window.addEventListener("popstate",N),()=>window.removeEventListener("popstate",N)},[]);const[C,Y]=p.useState(()=>{const N=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(N)?Math.max(160,Math.min(640,N)):320}),[re,be]=p.useState(null);p.useEffect(()=>{if(!re)return;const N=B=>{B.key==="Escape"&&be(null)};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[re]);const[W,ce]=p.useState(()=>Math.floor(Date.now()/3e4));p.useEffect(()=>{if(J!=="thumb")return;const N=window.setInterval(()=>ce(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(N)},[J]);const[me,pe]=p.useState(()=>{const N=localStorage.getItem("vm_matrix_thumb_type");return N==="qemu"||N==="lxc"?N:"all"});p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",me)},[me]);const[ye,Fe]=p.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",ye?"1":"0")},[ye]);const[Je,Ye]=p.useState({}),Xe=p.useRef({});Xe.current=Je,p.useEffect(()=>()=>{Object.values(Xe.current).forEach(N=>{try{URL.revokeObjectURL(N.url)}catch{}})},[]);const fe=p.useRef(new Map),Se=p.useRef(!1);p.useEffect(()=>{J==="thumb"&&(Se.current=!1)},[J]),p.useLayoutEffect(()=>{if(J!=="thumb"){fe.current.clear();return}const N=$=>{let O=0,se=0,Z=$;for(;Z;)O+=Z.offsetLeft,se+=Z.offsetTop,Z=Z.offsetParent;return{left:O,top:se}},B=document.querySelectorAll(".vm-thumb-card[data-card-key]"),T=new Map;B.forEach($=>{const O=$.dataset.cardKey;O&&T.set(O,N($))}),Se.current&&B.forEach($=>{const O=$.dataset.cardKey;if(!O)return;const se=fe.current.get(O),Z=T.get(O);if(!se||!Z)return;const ie=se.left-Z.left,de=se.top-Z.top;Math.abs(ie)<1&&Math.abs(de)<1||($.style.transition="none",$.style.transform=`translate(${ie}px, ${de}px)`,requestAnimationFrame(()=>{$.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",$.style.transform=""}))}),fe.current=T}),p.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",J)},[J]),p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(C))},[C]);const De=p.useRef(null),[V,oe]=p.useState("vmid"),[ne,we]=p.useState("asc"),[Ce,Ae]=p.useState(!1),[Nt,$t]=p.useState(()=>{const N=localStorage.getItem("matrix_card_width");return N?parseInt(N,10):85}),[le,Ue]=p.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[Te,Ge]=p.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[ft,or]=p.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[wt,Xt]=p.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[Pe,Nr]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[K,Ze]=p.useState([]),[it,ht]=p.useState([]),[et,dt]=p.useState(new Map),vt=p.useRef(new Set),[wn,kn]=p.useState(!1),[jn,Nn]=p.useState(0),[Xr,_n]=p.useState(!0);p.useEffect(()=>{kn(!1),Nn(T=>T+1),_n(!0);const N=setTimeout(()=>{kn(!0)},100),B=setTimeout(()=>{_n(!1)},8e3);return()=>{clearTimeout(N),clearTimeout(B)}},[Te]);const qt=p.useRef(new Map),Rr=p.useRef(new Map),Sn=p.useRef(null),tt=p.useRef(!1),qr=p.useMemo(()=>{if(le!=="load")return"";const N=[],B=T=>{Object.values(T.vms).forEach($=>{if($.template||U==="running"&&$.status!=="running"||U==="stopped"&&$.status!=="stopped")return;const O=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,se=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,Z=Math.max($.cpu.usage_percent,O,se);N.push({key:`${$.node}/${$.vmid}`,load:Math.round(Z)})})};return t?Object.values(t).forEach(B):e&&B(e),N.sort((T,$)=>$.load-T.load),N.map(T=>`${T.key}:${T.load}`).join("|")},[e,t,le,U]);p.useLayoutEffect(()=>{if(le!=="load"||tt.current)return;const N=new Map;qt.current.forEach((B,T)=>{B&&N.set(T,B.getBoundingClientRect())}),Rr.current=N},[qr,le]),p.useEffect(()=>{le==="load"&&Rr.current.size!==0&&requestAnimationFrame(()=>{const N=[];qt.current.forEach((B,T)=>{if(!B)return;const $=Rr.current.get(T);if(!$)return;const O=B.getBoundingClientRect(),se=$.left-O.left,Z=$.top-O.top;if(Math.abs(se)>2||Math.abs(Z)>2){tt.current=!0;const ie=B.animate([{transform:`translate(${se}px, ${Z}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});N.push(ie)}}),N.length>0?Promise.all(N.map(B=>B.finished)).then(()=>{tt.current=!1}).catch(()=>{tt.current=!1}):tt.current=!1})},[qr,le]);const[Qr,Jr]=p.useState(!1);p.useEffect(()=>{Qr||We.getConfig().then(N=>{var T;const B=(T=N==null?void 0:N.ui)==null?void 0:T.vm_matrix_default_filter;B&&(X(B),localStorage.setItem("vm_matrix_default_filter",B)),Jr(!0)}).catch(()=>{const N=localStorage.getItem("vm_matrix_default_filter");N&&X(N),Jr(!0)})},[Qr]),p.useEffect(()=>{const N=()=>{const T=localStorage.getItem("matrix_card_width");T&&$t(parseInt(T,10));const $=localStorage.getItem("matrix_sort_by");$&&$!==le&&Ue($);const O=localStorage.getItem("matrix_group_sort_by");O&&O!==ft&&or(O);const se=localStorage.getItem("matrix_group_sort_order");se&&se!==wt&&Xt(se)};window.addEventListener("storage",N);const B=setInterval(N,1e3);return()=>{window.removeEventListener("storage",N),clearInterval(B)}},[le,ft,wt]);const ze=p.useCallback((N,B)=>{var T;return e&&e.client_health?e.client_health[B]||null:t&&((T=t[N])!=null&&T.client_health)&&t[N].client_health[B]||null},[e,t]),$e=p.useCallback((N,B,T)=>{N.preventDefault(),N.stopPropagation();const $=Math.min(N.clientX,window.innerWidth-250),O=Math.min(N.clientY,window.innerHeight-300);Nr({visible:!0,x:$,y:O,vm:B,clusterId:T})},[]),rt=p.useCallback(()=>{Nr(N=>({...N,visible:!1}))},[]),Re=!e&&t&&Object.keys(t).length>0,Ke=p.useMemo(()=>{const N=[],B=(T,$,O)=>{if(!T.tasks)return;Object.values(T.tasks).forEach(Z=>{var Be;const ie=((Be=Z.task_type)==null?void 0:Be.toLowerCase())||"",de=ie.includes("migrate"),xe=Z.status==="running",ve=!!Z.target_node,He=ie.startsWith("ha");if(ie.startsWith("qm")||ie.startsWith("vz"),xe&&de&&ve&&!He){const Qe=Object.keys(T.vms).find(Bt=>{const Sr=T.vms[Bt];return Sr.vmid===Z.vmid&&Sr.node===Z.node});Qe&&N.push({vm:T.vms[Qe],task:Z,targetNode:Z.target_node||"",clusterId:$,clusterLabel:O})}})};return Re&&t?Object.entries(t).forEach(([T,$])=>{B($,T,$.name||T)}):e&&B(e,e.id,e.name||e.id),N},[e,t,Re]);p.useEffect(()=>{const N=new Set(Ke.map($=>`${$.clusterId}:${$.vm.vmid}`)),B=vt.current,T=I.current;B.forEach($=>{if(!N.has($)&&!et.has($)){const O=T.get($);O&&O.upid&&(async()=>{var se,Z,ie;try{const de=await We.taskStatus(O.clusterId,O.node,O.upid),xe=(de==null?void 0:de.exitstatus)||"";if((de==null?void 0:de.status)==="running")return;if(xe&&xe!=="OK"){const He=((se=e==null?void 0:e.vms)==null?void 0:se[`${O.node}/${O.vmid}`])||((ie=(Z=t==null?void 0:t[O.clusterId])==null?void 0:Z.vms)==null?void 0:ie[`${O.node}/${O.vmid}`]),Be=He&&He.lock||"migrate";D(Qe=>Qe.some(Bt=>Bt.id===$)?Qe:[...Qe,{id:$,vmid:O.vmid,sourceNode:O.node,targetNode:O.targetNode,clusterLabel:O.clusterLabel,lock:Be,copied:!1}])}}catch{}})(),T.delete($)}}),Ke.forEach(({vm:$,task:O,clusterId:se,clusterLabel:Z,targetNode:ie})=>{const de=`${se}:${$.vmid}`;T.set(de,{upid:O.upid,node:O.node,vmid:$.vmid,clusterId:se,clusterLabel:Z,targetNode:ie})}),vt.current=N},[Ke,et,e,t]);const Qt=p.useRef(new Map);p.useEffect(()=>{Ke.forEach(({vm:N,targetNode:B,clusterId:T})=>{const $=`${T}:${N.vmid}`;Qt.current.set($,{targetNode:B,sourceNode:N.node,clusterId:T,vmid:N.vmid})})},[Ke]);const at=p.useRef(new Map);p.useEffect(()=>{K.forEach(N=>{const B=`${N.clusterId}:${N.vmid}`;at.current.set(B,{x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2})})},[K]),p.useEffect(()=>{const N=new Set(Ke.map(B=>`${B.clusterId}:${B.vm.vmid}`));Qt.current.forEach((B,T)=>{if(!N.has(T)&&!et.has(T)){const $=at.current.get(T);if($){const O=Date.now(),se=800,Z=()=>{const ie=Date.now()-O,de=Math.min(ie/se,1),xe=$.x1+($.x2-$.x1)*de,ve=$.y1+($.y2-$.y1)*de;ht([{x1:xe,y1:ve,x2:$.x2,y2:$.y2,vmid:B.vmid,progress:de}]),de<1?requestAnimationFrame(Z):ht([])};requestAnimationFrame(Z)}dt(O=>{const se=new Map(O);return se.set(T,{...B,startTime:Date.now()}),se}),Qt.current.delete(T),at.current.delete(T),setTimeout(()=>{dt(O=>{const se=new Map(O);return se.delete(T),se})},1e4)}})},[Ke,et]),p.useEffect(()=>{if(et.size===0)return;const N=(B,T)=>{const $=O=>{for(const se of Object.values(O.vms))if(se.vmid===B)return se.node;return null};if(t&&T){const O=t[T];if(O)return $(O)}else if(e)return $(e);return null};et.forEach((B,T)=>{const $=N(B.vmid,B.clusterId);$&&$===B.targetNode&&$!==B.sourceNode&&dt(O=>{const se=new Map(O);return se.delete(T),se})})},[e,t,et]);const gt=p.useCallback((N,B)=>{const T=Re?`${B} / `:"";switch(Te){case"none":return Re?B:"all";case"type":return`${T}${N.type==="qemu"?"VM":"CT"}`;case"tag":return N.tags&&N.tags.length>0?`${T}${N.tags[0]}`:`${T}(no tag)`;case"node":default:return`${T}${N.node}`}},[Te,Re]),_r=p.useMemo(()=>{const N={},B=(T,$,O)=>{Object.entries(T.vms).forEach(([se,Z])=>{if(U==="running"&&Z.status!=="running"||U==="stopped"&&Z.status!=="stopped"||Q&&!Z.name.toLowerCase().includes(Q.toLowerCase())&&!String(Z.vmid).includes(Q)||Z.template)return;const ie=gt(Z,$);N[ie]||(N[ie]={vms:[],clusterId:O}),N[ie].vms.push(Z)})};return Re?Object.entries(t).forEach(([T,$])=>{const O=$.name||T;B($,O,T)}):e&&B(e,"",e.id),Object.values(N).forEach(T=>{T.vms.sort(($,O)=>{switch(le){case"name":return $.name.localeCompare(O.name);case"load":{const se=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,Z=O.memory.total_bytes>0?O.memory.used_bytes/O.memory.total_bytes*100:0,ie=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,de=O.disk.total_bytes>0?O.disk.used_bytes/O.disk.total_bytes*100:0,xe=Math.max($.cpu.usage_percent,se,ie),ve=Math.max(O.cpu.usage_percent,Z,de);if($.status!=="running"&&O.status==="running")return 1;if($.status==="running"&&O.status!=="running")return-1;if($.status!=="running"&&O.status!=="running")return $.vmid-O.vmid;const He=Bt=>Bt>=95?0:Bt>=80?1:2,Be=He(xe),Qe=He(ve);return Be!==Qe?Be-Qe:ve-xe}case"vmid":default:return $.vmid-O.vmid}})}),N},[e,t,Re,U,Q,le,gt]),Dt=p.useMemo(()=>{const N=[],B=(T,$)=>{Object.values(T.vms).forEach(O=>{O.template||O.status==="running"&&U!=="stopped"&&(me==="qemu"&&O.type!=="qemu"||me==="lxc"&&O.type!=="lxc"||Q&&!O.name.toLowerCase().includes(Q.toLowerCase())&&!String(O.vmid).includes(Q)||N.push({...O,clusterId:$}))})};return Re&&t?Object.entries(t).forEach(([T,$])=>B($,T)):e&&B(e,e.id),N.sort((T,$)=>{switch(le){case"name":return T.name.localeCompare($.name);case"load":{const O=T.memory.total_bytes>0?T.memory.used_bytes/T.memory.total_bytes*100:0,se=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,Z=T.disk.total_bytes>0?T.disk.used_bytes/T.disk.total_bytes*100:0,ie=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,de=Math.max(T.cpu.usage_percent,O,Z),xe=Math.max($.cpu.usage_percent,se,ie),ve=de>=95?0:de>=80?1:2,He=xe>=95?0:xe>=80?1:2;return ve!==He?ve-He:xe-de}case"vmid":default:return T.vmid-$.vmid}}),N},[e,t,Re,U,Q,le,me]),Ir=p.useMemo(()=>{const N=new Map,B=T=>t&&t[T]?t[T].name||T:e&&e.id===T&&e.name||T;return Dt.forEach(T=>{const $=B(T.clusterId),O=gt(T,$),se=N.get(O)||[];se.push(T),N.set(O,se)}),Array.from(N.entries()).sort(([T],[$])=>{const O=T.localeCompare($);return wt==="desc"?-O:O})},[Dt,gt,t,e,wt]);p.useEffect(()=>{if(J!=="thumb")return;let N=!1;const B=640,T=Se.current,$={},O=async ie=>{const de=ie.clusterId||(e==null?void 0:e.id)||"",xe=`${de}/${ie.node}/${ie.vmid}`,ve=`/api/console/screenshot/${encodeURIComponent(de)}/${encodeURIComponent(ie.node)}/${ie.vmid}?max=${B}&t=${W}`;try{const He=await fetch(ve,{credentials:"same-origin"});if(!He.ok||N)return;const Be=await He.blob();if(N)return;const Qe=URL.createObjectURL(Be),Bt=He.headers.get("X-Thumb-Empty")==="1";T?$[xe]={url:Qe,isBlank:Bt}:Ye(Sr=>{const sd=Sr[xe];if(sd)try{URL.revokeObjectURL(sd.url)}catch{}return{...Sr,[xe]:{url:Qe,isBlank:Bt}}})}catch{}},se=6;return(async ie=>{const de=new Set;for(const xe of ie){const ve=O(xe).finally(()=>{de.delete(ve)});de.add(ve),de.size>=se&&await Promise.race(de)}await Promise.all(de)})(Dt).finally(()=>{if(N){Object.values($).forEach(de=>{try{URL.revokeObjectURL(de.url)}catch{}});return}const ie=new Set(Dt.map(de=>`${de.clusterId||(e==null?void 0:e.id)||""}/${de.node}/${de.vmid}`));Ye(de=>{let xe=!1;const ve={};return Object.entries(de).forEach(([He,Be])=>{if(ie.has(He))ve[He]=Be;else{try{URL.revokeObjectURL(Be.url)}catch{}xe=!0}}),T&&Object.entries($).forEach(([He,Be])=>{const Qe=ve[He];if(Qe)try{URL.revokeObjectURL(Qe.url)}catch{}ve[He]=Be,xe=!0}),xe?ve:de}),Se.current||setTimeout(()=>{N||(Se.current=!0)},300)}),()=>{N=!0}},[J,Dt,W,e==null?void 0:e.id]);const Jt=p.useMemo(()=>{const N=[],B=new Map;return Re&&t&&Object.entries(t).forEach(([T,$])=>{const O=$.name||T;Object.values($.nodes||{}).forEach(se=>{se&&se.node&&B.set(se.node,{id:T,label:O})})}),Ke.forEach(({vm:T,targetNode:$,clusterId:O,clusterLabel:se})=>{const Z=B.get($),ie=Z&&Z.id!==O?Z:{id:O,label:se},de=Re?`${ie.label} / ${$}`:$,xe=Re?`${se} / ${T.node}`:T.node;N.push({vm:T,targetGroupKey:de,sourceGroupKey:xe,clusterId:O,targetClusterId:ie.id})}),N},[Ke,Re,t]);p.useEffect(()=>{if(J!=="grid"||Jt.length===0){Ze([]);return}const N=()=>{const O=Sn.current;if(!O)return;const se=O.getBoundingClientRect(),Z=O.scrollLeft,ie=O.scrollTop,de=[];Jt.forEach(({vm:xe})=>{const ve=`${xe.cluster_id}/${xe.node}/${xe.vmid}`,He=`ghost-${xe.cluster_id}-${xe.vmid}`,Be=qt.current.get(ve),Qe=qt.current.get(He);if(Be&&Qe){const Bt=Be.getBoundingClientRect(),Sr=Qe.getBoundingClientRect();de.push({x1:Bt.left+Bt.width/2-se.left+Z,y1:Bt.top+Bt.height/2-se.top+ie,x2:Sr.left+Sr.width/2-se.left+Z,y2:Sr.top+Sr.height/2-se.top+ie,vmid:xe.vmid,clusterId:xe.cluster_id})}}),Ze(de)},B=setTimeout(N,100),T=setInterval(N,500),$=Sn.current;return $&&$.addEventListener("scroll",N),()=>{clearTimeout(B),clearInterval(T),$&&$.removeEventListener("scroll",N)}},[Jt,J]);const Zt=p.useMemo(()=>{const N=[],B=(T,$,O)=>{Object.values(T.vms).forEach(se=>{U==="running"&&se.status!=="running"||U==="stopped"&&se.status!=="stopped"||Q&&!se.name.toLowerCase().includes(Q.toLowerCase())&&!String(se.vmid).includes(Q)||se.template||N.push({...se,clusterName:$,clusterId:O})})};return Re?Object.entries(t).forEach(([T,$])=>{const O=$.name||T;B($,O,T)}):e&&B(e,e.name||"Cluster",e.id),N.sort((T,$)=>{var se,Z,ie,de;let O=0;switch(V){case"name":O=T.name.localeCompare($.name);break;case"vmid":O=T.vmid-$.vmid;break;case"type":O=T.type.localeCompare($.type);break;case"node":O=T.node.localeCompare($.node);break;case"status":O=T.status.localeCompare($.status);break;case"cpu":O=T.cpu.usage_percent-$.cpu.usage_percent;break;case"memory":O=T.memory.used_bytes/T.memory.total_bytes-$.memory.used_bytes/$.memory.total_bytes;break;case"uptime":O=T.uptime-$.uptime;break;case"rx":O=(((se=T.network)==null?void 0:se.rx_bytes_sec)||0)-(((Z=$.network)==null?void 0:Z.rx_bytes_sec)||0);break;case"tx":O=(((ie=T.network)==null?void 0:ie.tx_bytes_sec)||0)-(((de=$.network)==null?void 0:de.tx_bytes_sec)||0);break;case"task":{const xe=qs(T.vmid,T.node,T.cluster_id,e,t),ve=qs($.vmid,$.node,$.cluster_id,e,t);xe&&!ve?O=-1:!xe&&ve?O=1:xe&&ve?O=xe.task_type.localeCompare(ve.task_type):O=0;break}}return ne==="asc"?O:-O}),N},[e,t,Re,U,Q,V,ne]),Vn=Math.round(C*9/16),Et=N=>{Ae(!0),setTimeout(()=>Ae(!1),300),V===N?we(ne==="asc"?"desc":"asc"):(oe(N),we("asc"))},Ne=p.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const N of Object.values(t))if(N.vms[o])return N.vms[o]}return null},[o,e,t]),{totalVMs:Hn,runningVMs:$s}=p.useMemo(()=>{let N=0,B=0;const T=$=>{Object.values($.vms).forEach(O=>{O.template||(N++,O.status==="running"&&B++)})};return Re?t&&Object.values(t).forEach(T):e&&T(e),{totalVMs:N,runningVMs:B}},[e,t,Re]);return!e&&!Re?r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})}):r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[$s," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[Hn," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:Q,onChange:N=>M(N.target.value)})]}),r.jsxs("div",{className:`filter-tabs ${J==="thumb"?"is-disabled":""}`,children:[r.jsxs("button",{className:`filter-tab ${U==="all"?"active":""}`,onClick:()=>X("all"),disabled:J==="thumb",title:J==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),n("matrix.filter_all")]}),r.jsxs("button",{className:`filter-tab ${U==="running"?"active":""}`,onClick:()=>X("running"),disabled:J==="thumb",title:J==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),n("matrix.filter_running")]}),r.jsxs("button",{className:`filter-tab ${U==="stopped"?"active":""}`,onClick:()=>X("stopped"),disabled:J==="thumb",title:J==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),n("matrix.filter_stopped")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),n("settings.sort_by"),":"]}),r.jsxs("button",{className:`sort-btn ${le==="vmid"?"active":""}`,onClick:()=>{Ue("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),"ID"]}),r.jsxs("button",{className:`sort-btn ${le==="name"?"active":""}`,onClick:()=>{Ue("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),n("settings.sort_name")]}),r.jsxs("button",{className:`sort-btn ${le==="load"?"active":""}`,onClick:()=>{Ue("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),n("settings.sort_load")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),n("matrix.group_by"),":"]}),r.jsxs("button",{className:`sort-btn ${Te==="none"?"active":""}`,onClick:()=>{Ge("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),n("matrix.group_none")]}),r.jsxs("button",{className:`sort-btn ${Te==="node"?"active":""}`,onClick:()=>{Ge("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),n("matrix.group_node")]}),r.jsxs("button",{className:`sort-btn ${Te==="type"?"active":""}`,onClick:()=>{Ge("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),r.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),n("matrix.group_type")]}),r.jsxs("button",{className:`sort-btn ${Te==="tag"?"active":""}`,onClick:()=>{Ge("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),r.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),n("matrix.group_tag")]})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${J==="grid"?"active":""}`,onClick:()=>L("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${J==="table"?"active":""}`,onClick:()=>L("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),r.jsx("button",{className:`view-btn ${J==="thumb"?"active":""}`,onClick:()=>L("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),r.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),r.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]})]})]}),J==="thumb"&&r.jsxs("div",{className:"thumb-size-row",children:[r.jsxs("div",{className:"thumb-size",children:[r.jsxs("span",{className:"thumb-size-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"15 3 21 3 21 9"}),r.jsx("polyline",{points:"9 21 3 21 3 15"}),r.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),r.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),a==="zh-TW"?"尺寸":"Size"]}),r.jsx("input",{type:"range",min:160,max:640,step:20,value:C,onChange:N=>Y(parseInt(N.target.value,10)),className:"thumb-size-slider"}),r.jsxs("span",{className:"thumb-size-val",children:[C,"px"]}),r.jsx("span",{className:"thumb-build-stamp",title:"build 2026-05-08T18:19:56.833Z",children:(()=>{try{return`b${new Date("2026-05-08T18:19:56.833Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),r.jsxs("div",{className:"thumb-type-filter",role:"group",children:[r.jsxs("button",{className:`thumb-type-btn ${me==="all"?"active":""}`,onClick:()=>pe("all"),title:a==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a==="zh-TW"?"全部":"ALL"]}),r.jsxs("button",{className:`thumb-type-btn ${me==="qemu"?"active":""}`,onClick:()=>pe("qemu"),title:a==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),r.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),"VM"]}),r.jsxs("button",{className:`thumb-type-btn ${me==="lxc"?"active":""}`,onClick:()=>pe("lxc"),title:a==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),r.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),r.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),"CT"]})]}),r.jsxs("button",{className:`thumb-prefer-btn ${ye?"active":""}`,onClick:()=>Fe(N=>!N),title:a==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),a==="zh-TW"?"優先有內容":"Prefer content"]})]}),r.jsxs("div",{className:"matrix-content",children:[J==="grid"?r.jsxs("div",{className:"matrix-grid",ref:Sn,children:[K.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),K.map((N,B)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${N.x1},${N.y1} L${N.x2},${N.y2}`})})]},`line-${N.vmid}-${B}`))]}),it.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),it.map((N,B)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-N.progress)+1,filter:"url(#completingGlow)",opacity:1-N.progress*.5}),N.progress>.8&&r.jsx("circle",{cx:N.x2,cy:N.y2,r:20*(N.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(N.progress-.8)*5})]},`completing-${N.vmid}-${B}`))]}),(()=>{const N=new Map;Object.entries(_r).forEach(([$,O])=>{N.set($,O)}),Jt.forEach($=>{N.has($.targetGroupKey)||N.set($.targetGroupKey,{vms:[],clusterId:$.clusterId})});const B=Array.from(N.entries()).sort(($,O)=>{const[se]=$,[Z]=O,ie=He=>{if(He.includes(" / ")){const[Be,Qe]=He.split(" / ");return{cluster:Be,node:Qe}}return{cluster:"",node:He}},de=ie(se),xe=ie(Z);let ve=0;return ft==="cluster"?(ve=de.cluster.localeCompare(xe.cluster),ve===0&&(ve=de.node.localeCompare(xe.node))):(ve=de.node.localeCompare(xe.node),ve===0&&(ve=de.cluster.localeCompare(xe.cluster))),wt==="desc"?-ve:ve});let T=0;return B.map(([$,O])=>{const se=Jt.filter(Z=>Z.targetGroupKey===$);return r.jsxs("div",{className:`node-section ${O.vms.length===0&&se.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:$}),r.jsxs("span",{className:"node-section-count",children:[O.vms.length,se.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",se.length]})]})]}),r.jsxs("div",{className:`vm-grid ${le==="load"&&!Xr?"sort-by-load":""} ${Xr?"initial-load":""}`,children:[wn&&O.vms.map(Z=>{const ie=`${Z.cluster_id}/${Z.node}/${Z.vmid}`,de=qs(Z.vmid,Z.node,Z.cluster_id,e,t),xe=`${Z.cluster_id}:${Z.vmid}`,ve=et.get(xe);if(ve&&ve.sourceNode===Z.node||Jt.find(Qe=>Qe.targetClusterId===Z.cluster_id&&Qe.vm.vmid===Z.vmid))return null;const Be=T++;return r.jsx(Sp,{ref:Qe=>{Qe?qt.current.set(ie,Qe):qt.current.delete(ie)},vm:Z,isSelected:o===ie,onClick:()=>i(o===ie?null:ie),onContextMenu:Qe=>$e(Qe,Z,O.clusterId),animationDelay:Xr?Be*50:0,task:de,isCompleting:!!ve},ie)}).filter(Boolean),wn&&se.map(Z=>{var xe;const ie=`ghost-${Z.vm.cluster_id}-${Z.vm.vmid}`,de=(xe=Ke.find(ve=>ve.vm.vmid===Z.vm.vmid&&ve.clusterId===Z.vm.cluster_id))==null?void 0:xe.task;return r.jsx(Sp,{ref:ve=>{ve?qt.current.set(ie,ve):qt.current.delete(ie)},vm:Z.vm,isSelected:!1,onClick:()=>{},onContextMenu:ve=>ve.preventDefault(),animationDelay:0,task:de,isGhost:!0},ie)})]},`grid-${U}-${Q}-${le}-${jn}`)]},$)})})(),Object.keys(_r).length===0&&Jt.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):J==="thumb"?r.jsxs("div",{ref:De,className:"matrix-thumb-grid",children:[r.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:r.jsx("defs",{children:r.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[r.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:r.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),r.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),Dt.length===0?r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})}):Ir.map(([N,B])=>{const T=ye?[...B].sort(($,O)=>{var xe,ve;const se=`${$.clusterId||(e==null?void 0:e.id)||""}/${$.node}/${$.vmid}`,Z=`${O.clusterId||(e==null?void 0:e.id)||""}/${O.node}/${O.vmid}`,ie=(xe=Je[se])!=null&&xe.isBlank?1:0,de=(ve=Je[Z])!=null&&ve.isBlank?1:0;return ie-de}):B;return r.jsxs("div",{className:"thumb-group",children:[Te!=="none"&&r.jsxs("div",{className:"thumb-group-header",children:[r.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-name",children:N}),r.jsx("span",{className:"thumb-group-count",children:T.length}),r.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),r.jsx("div",{className:"thumb-group-cards",children:T.map($=>{var He;const O=$.type==="lxc",se=$.status==="running",Z=((He=$.cpu)==null?void 0:He.usage_percent)??0,ie=$.memory&&$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,de=$.clusterId||(e==null?void 0:e.id)||"",xe=`${de}/${$.node}/${$.vmid}`,ve=Je[xe];return r.jsxs("div",{"data-card-key":xe,className:`vm-thumb-card status-${$.status}${ve!=null&&ve.isBlank?" is-blank":""}`,style:{width:`${C}px`,flex:"0 0 auto"},onClick:()=>be({vm:$,clusterId:de}),onContextMenu:Be=>$e(Be,$,de),children:[r.jsxs("div",{className:"vm-thumb-image",style:{height:`${Vn}px`},children:[r.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[r.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),r.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),r.jsx("div",{className:"vtl-scanlines"}),r.jsx("div",{className:"vtl-vignette"}),r.jsx("span",{className:"vtl-text",children:a==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),ve&&r.jsx("img",{src:ve.url,alt:`VM ${$.vmid} screenshot`,loading:"lazy",onLoad:Be=>{Be.currentTarget.parentElement.dataset.loaded="1"},onError:Be=>{Be.currentTarget.parentElement.dataset.error="1"}})]}),r.jsxs("div",{className:"vm-thumb-meta",children:[r.jsxs("div",{className:"vm-thumb-title",children:[r.jsx("span",{className:`type-badge ${$.type}`,children:O?"CT":"VM"}),r.jsxs("code",{className:"vm-thumb-id",children:["#",$.vmid]}),r.jsx("span",{className:"vm-thumb-name",children:$.name})]}),se&&r.jsxs("div",{className:"vm-thumb-bars",children:[r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${_e(Z)}`,style:{width:`${Math.min(Z,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${_e(Z)}`,children:ct(Z,1)})]}),r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${_e(ie)}`,style:{width:`${Math.min(ie,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${_e(ie)}`,children:ct(ie,0)})]})]})]})]},xe)})})]},N)})]}):r.jsxs("div",{className:"matrix-table-container",children:[ge.size>0&&r.jsxs("div",{className:"bulk-toolbar",children:[r.jsx("span",{className:"bulk-count",children:a==="zh-TW"?`已選 ${ge.size}`:`${ge.size} selected`}),r.jsxs("button",{className:"bulk-btn",disabled:Oe,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${ge.size} 台 VM/CT 執行開機？`:`Start ${ge.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次開機":"Bulk start"})&&await te("start")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:n("vm.start")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Oe,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${ge.size} 台 VM/CT 執行關機（ACPI）？`:`Shutdown (ACPI) ${ge.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次關機":"Bulk shutdown",destructive:!0})&&await te("shutdown")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:n("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Oe,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${ge.size} 台 VM/CT 重新啟動？`:`Reboot ${ge.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次重啟":"Bulk reboot",destructive:!0})&&await te("reboot")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:n("vm.reboot")})]}),r.jsxs("button",{className:"bulk-btn danger",disabled:Oe,onClick:async()=>{await s.confirm(a==="zh-TW"?`強制停止 ${ge.size} 台 VM/CT？此動作不會通知 guest OS。`:`Hard-stop ${ge.size} selected VM/CTs? Guest OS will not be notified.`,{title:a==="zh-TW"?"批次強制停止":"Bulk hard stop",destructive:!0})&&await te("stop")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:n("vm.stop_hard")})]}),r.jsx("button",{className:"bulk-btn ghost",onClick:ke,disabled:Oe,children:a==="zh-TW"?"取消選取":"Clear"})]}),r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:"select-col",children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:ge.size>0&&Zt.every(N=>ge.has(`${N.cluster_id}/${N.node}/${N.vmid}`)),ref:N=>{if(!N)return;const B=Zt.some($=>ge.has(`${$.cluster_id}/${$.node}/${$.vmid}`)),T=Zt.length>0&&Zt.every($=>ge.has(`${$.cluster_id}/${$.node}/${$.vmid}`));N.indeterminate=B&&!T},onChange:N=>{N.target.checked?je(new Set(Zt.map(B=>`${B.cluster_id}/${B.node}/${B.vmid}`))):ke()},title:n("matrix.bulk.select_all")})}),r.jsxs("th",{className:`sortable ${V==="status"?"sorted":""}`,onClick:()=>Et("status"),children:[r.jsx("span",{children:n("node.status")}),V==="status"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="vmid"?"sorted":""}`,onClick:()=>Et("vmid"),children:[r.jsx("span",{children:"VMID"}),V==="vmid"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="type"?"sorted":""}`,onClick:()=>Et("type"),children:[r.jsx("span",{children:n("table.type")}),V==="type"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="name"?"sorted":""}`,onClick:()=>Et("name"),children:[r.jsx("span",{children:n("table.name")}),V==="name"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${V==="node"?"sorted":""}`,onClick:()=>Et("node"),children:[r.jsx("span",{children:n("table.node")}),V==="node"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="cpu"?"sorted":""}`,onClick:()=>Et("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),V==="cpu"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="memory"?"sorted":""}`,onClick:()=>Et("memory"),children:[r.jsx("span",{children:n("metric.memory")}),V==="memory"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${V==="rx"?"sorted":""}`,onClick:()=>Et("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),V==="rx"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${V==="tx"?"sorted":""}`,onClick:()=>Et("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),V==="tx"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="uptime"?"sorted":""}`,onClick:()=>Et("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),V==="uptime"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${V==="task"?"sorted":""}`,onClick:()=>Et("task"),children:[r.jsx("span",{children:n("table.task")}),V==="task"&&r.jsx("span",{className:"sort-indicator",children:ne==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:Zt.map(N=>{const B=`${N.cluster_id}/${N.node}/${N.vmid}`,T=N.status==="running",$=N.cpu.usage_percent,O=N.memory.used_bytes/N.memory.total_bytes*100,se=qs(N.vmid,N.node,N.cluster_id,e,t),Z=ge.has(B);return r.jsxs("tr",{className:`${o===B?"selected":""} ${Z?"multi-selected":""} ${N.status} ${Ce?"sort-animating":""}`,onClick:()=>i(o===B?null:B),onContextMenu:ie=>$e(ie,N,N.clusterId),children:[r.jsx("td",{className:"select-col",onClick:ie=>ie.stopPropagation(),children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:Z,onChange:()=>ue(B)})}),r.jsx("td",{children:r.jsx("span",{className:`status-badge ${Gl(N.status)}`,children:N.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:N.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${N.type}`,children:N.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:N.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const ie=(N.tags||[]).map(de=>(de||"").trim()).filter(Boolean);return ie.length>0?r.jsx("div",{className:"vm-tags",children:ie.map((de,xe)=>r.jsx("span",{className:"vm-tag",children:de},xe))}):null})()}),r.jsx("td",{className:"node-cell",children:N.node}),r.jsx("td",{children:T?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${_e($)}`,style:{width:`${$}%`}})}),r.jsx("span",{className:`text-${_e($)}`,children:ct($,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:T?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${_e(O)}`,style:{width:`${O}%`}})}),r.jsx("span",{children:ct(O,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:T?r.jsxs("span",{className:"net-rx",children:[Ie(N.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:T?r.jsxs("span",{className:"net-tx",children:[Ie(N.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:T?r.jsx("span",{className:"uptime-cell",children:ui(N.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:se&&r.jsx(Hg,{task:se})})]},B)})})]}),Zt.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),Ne&&r.jsx(mx,{vm:Ne,onClose:()=>i(null)},`${Ne.node}/${Ne.vmid}`)]}),re&&r.jsx("div",{className:"thumb-preview-overlay",onClick:()=>be(null),children:r.jsxs("div",{className:"thumb-preview-frame",onClick:N=>N.stopPropagation(),children:[r.jsxs("div",{className:"thumb-preview-titlebar",children:[r.jsxs("span",{className:"thumb-preview-name",children:[r.jsx("span",{className:`type-badge ${re.vm.type}`,children:re.vm.type==="lxc"?"CT":"VM"}),r.jsxs("code",{className:"thumb-preview-id",children:["#",re.vm.vmid]}),r.jsx("span",{children:re.vm.name}),r.jsx("span",{className:"thumb-preview-node",children:re.vm.node})]}),r.jsx("button",{className:"thumb-preview-close",onClick:()=>be(null),children:"×"})]}),r.jsxs("div",{className:"thumb-preview-body",children:[r.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[r.jsx("div",{className:"tpl-grid"}),r.jsx("div",{className:"tpl-scan"}),r.jsx("div",{className:"tpl-ring"}),r.jsx("div",{className:"tpl-corner tl"}),r.jsx("div",{className:"tpl-corner tr"}),r.jsx("div",{className:"tpl-corner bl"}),r.jsx("div",{className:"tpl-corner br"}),r.jsxs("div",{className:"tpl-status",children:[r.jsxs("span",{className:"tpl-dots",children:[r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{})]}),r.jsx("span",{className:"tpl-text",children:a==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),r.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(re.clusterId)}/${encodeURIComponent(re.vm.node)}/${re.vm.vmid}?max=1600&t=${W}`,alt:`VM ${re.vm.vmid} full screenshot`,onLoad:N=>{N.currentTarget.parentElement.dataset.loaded="1"},onError:N=>{N.currentTarget.parentElement.dataset.error="1"}})]})]})}),r.jsx(vf,{state:Pe,onClose:rt,onShowDetails:()=>{Pe.vm&&i(`${Pe.vm.node}/${Pe.vm.vmid}`)},onPowerAction:q,onOpenConsole:async()=>{if(!Pe.vm)return;const N=Pe.vm,B=Pe.clusterId;if(_==="disabled"){await s.alert(n("console.disabled"));return}if(_==="prompt"){E({vm:N,clusterId:B});return}try{const T=await We.consolePrepare({cluster_id:B,node:N.node,vmid:N.vmid});P(B,N,T.console_token,T.vnc_password)}catch(T){const $=T instanceof Error?T.message:String(T);await s.alert(n("console.prepare_failed",{err:$}))}},onRemoteMigrate:()=>{Pe.vm&&g({vm:Pe.vm,clusterId:Pe.clusterId})},onOpenSnapshots:()=>{Pe.vm&&v({vm:Pe.vm,clusterId:Pe.clusterId})},onBackupNow:()=>{Pe.vm&&k({vm:Pe.vm,clusterId:Pe.clusterId})},onShowPerf:()=>{Pe.vm&&m({vm:Pe.vm,clusterId:Pe.clusterId})},onShowBackupHistory:()=>{Pe.vm&&b({vm:Pe.vm,clusterId:Pe.clusterId})},onShowConfig:()=>{Pe.vm&&w({vm:Pe.vm,clusterId:Pe.clusterId})},getNodeHealth:ze,userRole:((ir=l.user)==null?void 0:ir.role_global)??null,consoleMode:_,consolePasswordSet:!!z[Pe.clusterId]}),r.jsx(Gg,{open:c!==null,title:c?Gi(c.action,n):"",destructive:c?ux(c.action):!1,details:c?r.jsxs(r.Fragment,{children:[n(c.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:Gi(c.action,n),vmid:String(c.vm.vmid),name:c.vm.name,node:c.vm.node,cluster:c.clusterId}),c.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:c?Gi(c.action,n):n("action.cancel"),onConfirm:H,onCancel:()=>d(null)}),r.jsx(bf,{open:h!==null,cluster_id:(h==null?void 0:h.clusterId)||"",vm:h?{vmid:h.vm.vmid,name:h.vm.name,node:h.vm.node,type:h.vm.type}:null,onClose:()=>g(null)}),r.jsx(yf,{open:u!==null,cluster_id:(u==null?void 0:u.clusterId)||"",vm:u?{vmid:u.vm.vmid,name:u.vm.name,node:u.vm.node,type:u.vm.type}:null,onClose:()=>v(null)}),r.jsx(wf,{open:y!==null,cluster_id:(y==null?void 0:y.clusterId)||"",vm:y?{vmid:y.vm.vmid,name:y.vm.name,node:y.vm.node,type:y.vm.type}:null,onClose:()=>k(null)}),r.jsx(xf,{open:x!==null,clusterId:(x==null?void 0:x.clusterId)||"",node:(x==null?void 0:x.vm.node)||"",vmid:x==null?void 0:x.vm.vmid,kind:(x==null?void 0:x.vm.type)==="lxc"?"lxc":"qemu",title:x?`${x.vm.type==="lxc"?"CT":"VM"} ${x.vm.vmid} — ${x.vm.name}`:"",onClose:()=>m(null)}),r.jsx(ax,{open:f!==null,clusterId:(f==null?void 0:f.clusterId)||"",vmid:(f==null?void 0:f.vm.vmid)||0,vmName:(f==null?void 0:f.vm.name)||"",onClose:()=>b(null)}),r.jsx(cx,{open:j!==null,clusterId:(j==null?void 0:j.clusterId)||"",node:(j==null?void 0:j.vm.node)||"",vmid:(j==null?void 0:j.vm.vmid)||0,kind:(j==null?void 0:j.vm.type)==="lxc"?"lxc":"qemu",title:j?`${j.vm.type==="lxc"?"CT":"VM"} ${j.vm.vmid} — ${j.vm.name}`:"",onClose:()=>w(null)}),r.jsx(kf,{open:F!==null,cluster_id:(F==null?void 0:F.clusterId)||"",pveUser:(()=>{const N=F==null?void 0:F.clusterId;if(!N)return"root@pam";const B=t&&t[N]||((e==null?void 0:e.id)===N?e:null);return"root@pam"})(),onCancel:()=>E(null),onSubmit:async N=>{if(!F)return;const{vm:B,clusterId:T}=F,$=await We.consolePrepare({cluster_id:T,node:B.node,vmid:B.vmid,password:N});P(T,B,$.console_token,$.vnc_password),E(null)}}),ee.length>0&&r.jsx("div",{className:"mig-fail-stack",children:ee.map(N=>{const B=`qm unlock ${N.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:N.vmid,target:N.targetNode||"?",lock:N.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:N.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:B}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var T;(T=navigator.clipboard)==null||T.writeText(B).then(()=>{D($=>$.map(O=>O.id===N.id?{...O,copied:!0}:O))})},children:N.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>D(T=>T.filter($=>$.id!==N.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},N.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),J==="thumb"&&r.jsxs("span",{className:"legend-thumb-refresh",title:a==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),a==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),r.jsx("style",{children:`
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
          grid-template-columns: repeat(auto-fill, minmax(${Nt}px, 1fr));
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
      `})]})}function Qs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const l of Object.values(i.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function jf(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function hx({vm:e,index:t,previousIndex:n,onClick:a,onContextMenu:s,isSelected:o,task:i}){var b;const l=e.memory.used_bytes/e.memory.total_bytes*100,c=((b=e.disk)==null?void 0:b.usage_percent)||0,d=_e(e.cpu.usage_percent),h=_e(l),g=_e(c),u=p.useRef(null),[v,y]=p.useState(n===void 0),k=jf(i||null);p.useEffect(()=>{if(v){const j=setTimeout(()=>y(!1),50);return()=>clearTimeout(j)}},[v]);const x=e.name.length>10?e.name.substring(0,9)+"…":e.name,f=Math.max(e.cpu.usage_percent,l,c)>95?"critical":"warning";return r.jsxs("div",{ref:u,className:`anomaly-item ${f} ${v?"entering":""} ${o?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${ct(e.cpu.usage_percent,1)}
MEM: ${ct(l,1)}
DISK: ${ct(c,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:a,onContextMenu:j=>s==null?void 0:s(j,e),children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${d}`}),r.jsx("span",{className:"anomaly-name",children:x}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),k&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${k.color}30`,borderColor:k.color,color:k.color},children:k.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${h}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(l)})]}),r.jsxs("div",{className:`metric-gauge ${g}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(c)})]})]})]})}function Qc(e){return e?{vmid:e.vm.vmid,name:e.vm.name,node:e.vm.node,type:e.vm.type}:null}function gx({sel:e,onClose:t}){const n=p.useMemo(()=>Qc(e),[e]);return r.jsx(yf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function xx({sel:e,onClose:t}){const n=p.useMemo(()=>Qc(e),[e]);return r.jsx(wf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function vx({sel:e,onClose:t}){const n=p.useMemo(()=>Qc(e),[e]);return r.jsx(bf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function bx({cluster:e,clusters:t,isPaused:n=!1}){var J;const{t:a}=Me(),s=p.useRef(null),o=p.useRef(null),[i,l]=p.useState(0),[c,d]=p.useState(null),[h,g]=p.useState(new Map),[u,v]=p.useState(new Map),[y,k]=p.useState("grid"),[x,m]=p.useState(0);p.useEffect(()=>{const L=setTimeout(()=>k("line"),600),C=setTimeout(()=>k("flip"),1100),Y=setTimeout(()=>k("done"),3300);return()=>{clearTimeout(L),clearTimeout(C),clearTimeout(Y)}},[]),p.useEffect(()=>{if(y==="grid"){m(0);return}const L=y==="line"?1500:1200;let C,Y=null;const re=x,be=W=>{Y===null&&(Y=W);const ce=W-Y,me=Math.min(ce/L,1),pe=1-Math.pow(1-me,3),ye=re+(1-re)*pe;m(ye),me<1&&(C=requestAnimationFrame(be))};return C=requestAnimationFrame(be),()=>cancelAnimationFrame(C)},[y]);const f=!e&&t&&Object.keys(t).length>0,b=p.useMemo(()=>{if(!e&&!f)return[];const L=[];return f?Object.values(t).forEach(C=>{Object.values(C.vms).forEach(Y=>{Y.status==="running"&&!Y.template&&L.push(Y)})}):e&&Object.values(e.vms).forEach(C=>{C.status==="running"&&!C.template&&L.push(C)}),L},[e,t,f]),j=p.useMemo(()=>b.map((L,C)=>{var Fe;const Y=C/b.length*Math.PI*2,re=L.cpu.usage_percent,be=L.memory.total_bytes>0?L.memory.used_bytes/L.memory.total_bytes*100:0,W=((Fe=L.disk)==null?void 0:Fe.usage_percent)||0,ce=Math.max(re,be,W),me=.2+ce/100*.6,pe=_e(ce),ye=Qs(L.vmid,L.node,L.cluster_id,e,t);return{vm:L,angle:Y,distance:me,color:pe,task:ye}}),[b,e,t]),w=p.useMemo(()=>{if(!e&&!f)return[];const L=[];return f?Object.values(t).forEach(Y=>{Object.values(Y.vms).forEach(re=>L.push(re))}):e&&Object.values(e.vms).forEach(Y=>L.push(Y)),L.filter(Y=>{if(Y.status!=="running"||Y.template)return!1;const re=Y.memory.used_bytes/Y.memory.total_bytes*100,be=Y.disk.total_bytes>0?Y.disk.used_bytes/Y.disk.total_bytes*100:0;return Y.cpu.usage_percent>80||re>85||be>85}).sort((Y,re)=>{const be=Y.memory.used_bytes/Y.memory.total_bytes*100,W=re.memory.used_bytes/re.memory.total_bytes*100,ce=Y.disk.total_bytes>0?Y.disk.used_bytes/Y.disk.total_bytes*100:0,me=re.disk.total_bytes>0?re.disk.used_bytes/re.disk.total_bytes*100:0,pe=Math.max(Y.cpu.usage_percent,be,ce);return Math.max(re.cpu.usage_percent,W,me)-pe})},[e,t,f]);p.useEffect(()=>{const L=new Map;w.forEach((C,Y)=>{L.set(`${C.cluster_id}/${C.node}/${C.vmid}`,Y)}),g(L)},[w]);const _=p.useCallback(L=>{const C=s.current;if(!C)return;const Y=C.getBoundingClientRect(),re=C.width/Y.width,be=C.height/Y.height,W=(L.clientX-Y.left)*re,ce=(L.clientY-Y.top)*be,me=Math.min(C.width,C.height),pe=C.width/2,ye=C.height/2,Fe=me*.4;let Je=null;for(const Ye of j){const Xe=pe+Math.cos(Ye.angle)*Fe*Ye.distance,fe=ye+Math.sin(Ye.angle)*Fe*Ye.distance,Se=Math.sqrt((W-Xe)**2+(ce-fe)**2),De=15*Math.max(re,be);if(Se<De){Je={vm:Ye.vm,x:L.clientX,y:L.clientY,pointX:Xe,pointY:fe};break}}d(Je)},[j]),S=p.useCallback(()=>{d(null)},[]),z=p.useCallback(L=>{const C=s.current;if(!C)return;const Y=j.find(ye=>ye.vm.node===L.node&&ye.vm.vmid===L.vmid);if(!Y)return;const re=Math.min(C.width,C.height),be=C.width/2,W=C.height/2,ce=re*.4,me=be+Math.cos(Y.angle)*ce*Y.distance,pe=W+Math.sin(Y.angle)*ce*Y.distance;d({vm:Y.vm,x:me,y:pe,pointX:me,pointY:pe})},[j]),R=Kr(),E=((J=Cs().user)==null?void 0:J.role_global)??null,[P,ee]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),D=p.useCallback(()=>ee(L=>({...L,visible:!1})),[]),I=p.useCallback((L,C)=>{L.preventDefault(),L.stopPropagation();const Y=C.cluster_id||(e==null?void 0:e.id)||"";ee({visible:!0,x:L.clientX,y:L.clientY,vm:C,clusterId:Y})},[e]),q=p.useCallback((L,C)=>{var re;const Y=(t==null?void 0:t[L])||((e==null?void 0:e.id)===L?e:null);return((re=Y==null?void 0:Y.client_health)==null?void 0:re[C])||null},[e,t]),A=p.useCallback(async L=>{const{vm:C,action:Y,clusterId:re}=L,be=C.type==="lxc";if(!((Y==="stop"||Y==="shutdown"||Y==="reboot")&&!await R.confirm(`${Y.toUpperCase()} ${C.name} (#${C.vmid})?`,{title:"Confirm",destructive:!0})))try{const ce=be?await We.ctAction(re,C.node,C.vmid,Y):await We.vmAction(re,C.node,C.vmid,Y);console.info(`[radar] ${Y} ${be?"ct":"vm"}/${C.vmid} → upid=${ce.upid}`)}catch(ce){const me=ce instanceof Error?ce.message:String(ce);me.includes("vm_control_disabled")?await R.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await R.alert(`${Y} failed: ${me.slice(0,200)}`)}},[R]),[H,U]=p.useState(null),[X,Q]=p.useState(null),[M,ge]=p.useState(null),[je,Oe]=p.useState(null),[G,ue]=p.useState("disabled");p.useEffect(()=>{We.getConfig().then(L=>{var C;return ue(((C=L.console)==null?void 0:C.mode)||"disabled")}).catch(()=>ue("disabled"))},[]);const ke=p.useCallback((L,C,Y,re)=>{const be=typeof localStorage<"u"&&localStorage.getItem("language")||"",W=C.type==="lxc",me=`${W?"/console-term":"/console"}/${encodeURIComponent(L)}/${encodeURIComponent(C.node)}/${C.vmid}?ct=${encodeURIComponent(Y)}`+(C.name?`&name=${encodeURIComponent(C.name)}`:"")+(be?`&lang=${encodeURIComponent(be)}`:"")+(!W&&re?`#vp=${encodeURIComponent(re)}`:"");window.open(me,"_blank","noopener,noreferrer")},[]),te=p.useCallback(async()=>{if(!P.vm)return;const L=P.vm,C=P.clusterId;if(G==="disabled"){await R.alert(a("console.disabled"));return}if(G==="prompt"){Oe({vm:L,clusterId:C});return}try{const Y=await We.consolePrepare({cluster_id:C,node:L.node,vmid:L.vmid});ke(C,L,Y.console_token,Y.vnc_password)}catch(Y){const re=Y instanceof Error?Y.message:String(Y);await R.alert(a("console.prepare_failed",{err:re}))}},[P,G,R,a,ke]);return p.useEffect(()=>{if(n||y!=="done")return;const L=setInterval(()=>{l(C=>(C+2)%360)},50);return()=>clearInterval(L)},[n,y]),p.useEffect(()=>{const L=s.current;if(!L)return;const C=L.getContext("2d");if(!C)return;const Y=Math.min(L.width,L.height),re=L.width/2,be=L.height/2,W=Y*.4;C.clearRect(0,0,L.width,L.height),C.strokeStyle="rgba(0, 240, 255, 0.12)",C.lineWidth=.8;const ce=20;for(let fe=re%ce;fe<L.width;fe+=ce)C.beginPath(),C.moveTo(fe,0),C.lineTo(fe,L.height),C.stroke();for(let fe=be%ce;fe<L.height;fe+=ce)C.beginPath(),C.moveTo(0,fe),C.lineTo(L.width,fe),C.stroke();if(y!=="flip"&&y!=="done")return;C.globalAlpha=x,C.strokeStyle="rgba(0, 240, 255, 0.25)",C.lineWidth=1.5,C.font='13px "Share Tech Mono", monospace',C.fillStyle="rgba(0, 240, 255, 0.6)",C.textAlign="left";const me=["25%","50%","75%","100%"];for(let fe=1;fe<=4;fe++){const Se=W*(fe/4);C.beginPath(),C.arc(re,be,Se,0,Math.PI*2),C.stroke();const De=re+Se+4,V=be+4;C.fillText(me[fe-1],De,V)}C.fillStyle="rgba(0, 255, 136, 0.8)",C.textAlign="center",C.font='14px "Share Tech Mono", monospace',C.fillText("0%",re,be-8),C.font='11px "Share Tech Mono", monospace',C.fillText("LOW",re,be+8),C.fillStyle="rgba(0, 240, 255, 0.5)",C.textAlign="left",C.font='10px "Share Tech Mono", monospace',C.beginPath(),C.moveTo(re-W,be),C.lineTo(re+W,be),C.moveTo(re,be-W),C.lineTo(re,be+W),C.stroke();const pe=i*Math.PI/180;for(let fe=0;fe<8;fe++){const Se=.12*(fe+1),De=.15-fe*.015;C.fillStyle=`rgba(0, 240, 255, ${De})`,C.beginPath(),C.moveTo(re,be),C.arc(re,be,W,pe-Se,pe-Se+.12),C.closePath(),C.fill()}C.save(),C.shadowBlur=20,C.shadowColor="#00f0ff";const ye=C.createLinearGradient(re,be,re+Math.cos(pe)*W,be+Math.sin(pe)*W);ye.addColorStop(0,"rgba(0, 255, 200, 1)"),ye.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),ye.addColorStop(1,"rgba(0, 240, 255, 0)"),C.strokeStyle=ye,C.lineWidth=3,C.beginPath(),C.moveTo(re,be),C.lineTo(re+Math.cos(pe)*W,be+Math.sin(pe)*W),C.stroke(),C.lineWidth=1.5,ye.addColorStop(0,"rgba(255, 255, 255, 1)"),C.stroke(),C.restore();const Fe=re+Math.cos(pe)*W*.95,Je=be+Math.sin(pe)*W*.95,Ye=C.createRadialGradient(Fe,Je,0,Fe,Je,15);Ye.addColorStop(0,"rgba(0, 255, 200, 0.8)"),Ye.addColorStop(1,"rgba(0, 240, 255, 0)"),C.fillStyle=Ye,C.beginPath(),C.arc(Fe,Je,15,0,Math.PI*2),C.fill();const Xe=[];j.forEach(fe=>{const Se=`${fe.vm.cluster_id}/${fe.vm.node}/${fe.vm.vmid}`,De=(fe.angle*180/Math.PI+360)%360;(i-De+360)%360<=5&&Xe.push({key:Se,point:{vm:fe.vm,angle:fe.angle,distance:fe.distance,color:fe.color,lastScanAngle:i}})}),Xe.length>0&&v(fe=>{const Se=new Map(fe);Xe.forEach(({key:V,point:oe})=>{Se.set(V,oe)});const De=new Set(j.map(V=>`${V.vm.cluster_id}/${V.vm.node}/${V.vm.vmid}`));for(const V of Se.keys())De.has(V)||Se.delete(V);return Se}),j.forEach(fe=>{var Nt,$t;const Se=re+Math.cos(fe.angle)*W*fe.distance,De=be+Math.sin(fe.angle)*W*fe.distance,V=(fe.angle*180/Math.PI+360)%360,oe=(i-V+360)%360;let ne;oe<20?ne=1:oe<60?ne=1-(oe-20)/40*.4:ne=.6-(oe-60)/300*.45;let we="#00ff88";fe.color==="warning"&&(we="#ff6b00"),fe.color==="danger"&&(we="#ff0040");const Ce=!!fe.task,Ae=($t=(Nt=fe.task)==null?void 0:Nt.task_type)==null?void 0:$t.includes("migrate");if(Ce){const le=Ae?"#00f0ff":"#a855f7",Ue=Date.now()/500%1;if(C.beginPath(),C.arc(Se,De,12+Ue*8,0,Math.PI*2),C.strokeStyle=le,C.lineWidth=1.5,C.globalAlpha=(1-Ue)*.6*x,C.stroke(),C.beginPath(),C.arc(Se,De,10,0,Math.PI*2),C.strokeStyle=le,C.lineWidth=1,C.globalAlpha=.8*x,C.stroke(),Ae){const Te=Date.now()/200%(Math.PI*2);C.beginPath(),C.arc(Se,De,15,Te,Te+Math.PI/2),C.strokeStyle=le,C.lineWidth=2,C.globalAlpha=.9*x,C.stroke();for(let Ge=0;Ge<3;Ge++){const ft=Te+Ge*Math.PI*2/3,or=8+(Date.now()/100+Ge*50)%100/100*10,wt=Se+Math.cos(ft)*or,Xt=De+Math.sin(ft)*or;C.beginPath(),C.arc(wt,Xt,1.5,0,Math.PI*2),C.fillStyle=le,C.globalAlpha=(.8-(Date.now()/100+Ge*50)%100/100*.6)*x,C.fill()}}C.globalAlpha=x}C.beginPath(),C.arc(Se,De,4+fe.vm.cpu.usage_percent/100*4,0,Math.PI*2),C.fillStyle=we,C.globalAlpha=ne*x,C.fill(),C.shadowBlur=10,C.shadowColor=we,C.fill(),C.shadowBlur=0,C.globalAlpha=x}),C.beginPath(),C.arc(re,be,6,0,Math.PI*2),C.fillStyle="#00f0ff",C.fill()},[i,j,y,x]),p.useEffect(()=>{const L=s.current;if(!L)return;const C=()=>{const Y=L.parentElement;Y&&(L.width=Y.clientWidth,L.height=Y.clientHeight)};return C(),window.addEventListener("resize",C),()=>window.removeEventListener("resize",C)},[]),!e&&!f?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${y!=="done"?"entering":""} ${y==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(y==="line"||y==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${y}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:_,onMouseLeave:S,style:{position:"absolute",top:0,left:0,cursor:c?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:x},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),c&&(()=>{var qr,Qr,Jr;const L=s.current;if(!L)return null;const C=L.width,Y=L.height,re=L.getBoundingClientRect(),be=re.width,W=re.height,ce=be/C,me=W/Y,pe=c.pointX*ce,ye=c.pointY*me,Fe=be,Je=W,Ye=180,fe=Qs(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t)?175:145,Se=Ye/2,De=fe/2,V=50,oe=120,ne=Fe/2,we=Je/2,Ce=pe-ne,Ae=ye-we,Nt=Math.sqrt(Ce*Ce+Ae*Ae)||1,$t=Ce/Nt,le=Ae/Nt,Ue=(ze,$e)=>{const rt=ze-Se,Re=ze+Se,Ke=$e-De,Qt=$e+De;if(pe>=rt&&pe<=Re&&ye>=Ke&&ye<=Qt)return-1;const at=Math.max(rt,Math.min(Re,pe)),gt=Math.max(Ke,Math.min(Qt,ye));return Math.sqrt((pe-at)**2+(ye-gt)**2)},Te=20,Ge=(ze,$e)=>({x:Math.max(Se+Te,Math.min(Fe-Se-Te,ze)),y:Math.max(De+Te,Math.min(Je-De-Te,$e))}),or=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((ze,$e)=>{const rt=ze.dx*$t+ze.dy*le;return $e.dx*$t+$e.dy*le-rt});let wt={x:pe+$t*oe,y:ye+le*oe},Xt=!1;for(const ze of or){const $e={x:pe+ze.dx*oe,y:ye+ze.dy*oe},rt=Ge($e.x,$e.y),Re=rt.x-pe,Ke=rt.y-ye,at=Math.sqrt(Re*Re+Ke*Ke)>30&&Math.abs(Math.abs(Re)-Math.abs(Ke))<20,gt=Ue(rt.x,rt.y);if(at&&gt>=V){wt=rt,Xt=!0;break}}if(!Xt)for(const ze of or){const $e={x:pe+ze.dx*(oe+60),y:ye+ze.dy*(oe+60)},rt=Ge($e.x,$e.y),Re=rt.x-pe,Ke=rt.y-ye,at=Math.sqrt(Re*Re+Ke*Ke)>30&&Math.abs(Math.abs(Re)-Math.abs(Ke))<20,gt=Ue(rt.x,rt.y);if(at&&gt>=V){wt=rt,Xt=!0;break}}if(!Xt){const ze=or[0],$e=ze.dx>0?(Fe-Se-10-pe)/ze.dx:(Se+10-pe)/ze.dx,rt=ze.dy>0?(Je-De-10-ye)/ze.dy:(De+10-ye)/ze.dy,Re=Math.min(Math.abs($e),Math.abs(rt),oe),Ke=Math.max(V+20,Re);wt={x:pe+ze.dx*Ke,y:ye+ze.dy*Ke}}const Pe=20,Nr=Math.max(Se+Pe,Math.min(Fe-Se-Pe,wt.x)),K=Math.max(De+Pe,Math.min(Je-De-Pe,wt.y)),Ze=pe,it=ye,ht=20,et=28,dt=5,vt=-Math.PI/2,wn=Nr-Se,kn=K-De,jn=Nr,Nn=K,Xr=c.vm.memory.total_bytes>0?c.vm.memory.used_bytes/c.vm.memory.total_bytes*100:0,_n=((qr=c.vm.disk)==null?void 0:qr.usage_percent)||0,qt=Math.max(c.vm.cpu.usage_percent,Xr,_n),Rr=_e(qt),tt={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[Rr]||"#00f0ff";return Fe<=0||Je<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const ze=Math.sqrt((jn-Ze)**2+(Nn-it)**2),$e=Math.atan2(Nn-it,jn-Ze)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Ze,top:it,width:ze,height:2,background:`linear-gradient(90deg, ${tt}, ${tt}80)`,transformOrigin:"0 50%",transform:`rotate(${$e}deg)`,boxShadow:`0 0 8px ${tt}, 0 0 16px ${tt}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Ze-et-5,top:it-et-5,width:(et+5)*2,height:(et+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const ze=et+5,$e=et+5,rt=[];for(let at=0;at<dt;at++){const gt=vt+at*2*Math.PI/dt;rt.push(`${ze+ht*Math.cos(gt)},${$e+ht*Math.sin(gt)}`)}const Re=rt.join(" "),Ke=[];for(let at=0;at<dt;at++){const gt=vt+at*2*Math.PI/dt;Ke.push(`${ze+et*Math.cos(gt)},${$e+et*Math.sin(gt)}`)}const Qt=Ke.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:Qt,fill:"none",stroke:tt,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${ze}px ${$e}px`}}),r.jsx("polygon",{points:Re,fill:"none",stroke:tt,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(at=>{const gt=vt+at*2*Math.PI/dt,_r=ze+ht*Math.cos(gt),Dt=$e+ht*Math.sin(gt),Ir=6,Jt=vt+(at-1+dt)%dt*2*Math.PI/dt,Zt=vt+(at+1)%dt*2*Math.PI/dt,Vn=_r+Ir*Math.cos(Jt+Math.PI),Et=Dt+Ir*Math.sin(Jt+Math.PI),Ne=_r+Ir*Math.cos(Zt+Math.PI),Hn=Dt+Ir*Math.sin(Zt+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:_r,y1:Dt,x2:Vn,y2:Et,stroke:tt,strokeWidth:"2"}),r.jsx("line",{x1:_r,y1:Dt,x2:Ne,y2:Hn,stroke:tt,strokeWidth:"2"})]},at)}),r.jsx("line",{x1:ze-5,y1:$e,x2:ze+5,y2:$e,stroke:tt,strokeWidth:"1"}),r.jsx("line",{x1:ze,y1:$e-5,x2:ze,y2:$e+5,stroke:tt,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${Rr}`,style:{position:"absolute",left:wn,top:kn,width:Ye,height:fe,borderColor:tt,boxShadow:`0 0 15px ${tt}40, 0 0 30px ${tt}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:tt}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:tt}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:tt}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:tt}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:c.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",c.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:c.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${_e(c.vm.cpu.usage_percent)}`,children:ct(c.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${_e(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100)}`,children:ct(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${_e(((Qr=c.vm.disk)==null?void 0:Qr.usage_percent)||0)}`,children:ct(((Jr=c.vm.disk)==null?void 0:Jr.usage_percent)||0,1)})]}),(()=>{const ze=Qs(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t),$e=jf(ze);return $e?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${$e.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:$e.color},children:$e.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:x},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:w.length})]}),r.jsx("div",{className:"anomaly-list",children:w.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):w.map((L,C)=>{const Y=`${L.cluster_id}/${L.node}/${L.vmid}`,re=h.get(Y),be=(c==null?void 0:c.vm.node)===L.node&&(c==null?void 0:c.vm.vmid)===L.vmid&&(c==null?void 0:c.vm.cluster_id)===L.cluster_id,W=Qs(L.vmid,L.node,L.cluster_id,e,t);return r.jsx(hx,{vm:L,index:C,previousIndex:re,onClick:()=>z(L),onContextMenu:I,isSelected:be,task:W},Y)})})]})]}),r.jsx(vf,{state:P,onClose:D,onShowDetails:()=>{P.vm&&z(P.vm)},onPowerAction:A,onOpenConsole:te,onOpenSnapshots:()=>{P.vm&&U({vm:P.vm,clusterId:P.clusterId})},onBackupNow:()=>{P.vm&&Q({vm:P.vm,clusterId:P.clusterId})},onRemoteMigrate:()=>{P.vm&&ge({vm:P.vm,clusterId:P.clusterId})},getNodeHealth:q,userRole:E,consoleMode:G,consolePasswordSet:!1}),r.jsx(gx,{sel:H,onClose:()=>U(null)}),r.jsx(xx,{sel:X,onClose:()=>Q(null)}),r.jsx(vx,{sel:M,onClose:()=>ge(null)}),r.jsx(kf,{open:je!==null,cluster_id:(je==null?void 0:je.clusterId)||"",pveUser:"root@pam",onCancel:()=>Oe(null),onSubmit:async L=>{if(!je)return;const{vm:C,clusterId:Y}=je,re=await We.consolePrepare({cluster_id:Y,node:C.node,vmid:C.vmid,password:L});ke(Y,C,re.console_token,re.vnc_password),Oe(null)}}),r.jsx("style",{children:`
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

      `})]})}function yx({value:e,duration:t=800,suffix:n=""}){const[a,s]=p.useState(0),o=p.useRef(0),i=p.useRef(0);return p.useEffect(()=>{o.current=a;const l=performance.now(),c=d=>{const h=d-l,g=Math.min(h/t,1),u=1-Math.pow(1-g,3);s(o.current+(e-o.current)*u),g<1&&(i.current=requestAnimationFrame(c))};return i.current=requestAnimationFrame(c),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function Bo({value:e,duration:t=800}){const[n,a]=p.useState(0),s=p.useRef(0),o=p.useRef(0);return p.useEffect(()=>{s.current=n;const i=performance.now(),l=c=>{const d=c-i,h=Math.min(d/t,1),g=1-Math.pow(1-h,3);a(s.current+(e-s.current)*g),h<1&&(o.current=requestAnimationFrame(l))};return o.current=requestAnimationFrame(l),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Ie(n)})}function wx({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(yx,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function kx({mons:e,mgrs:t,mds:n}){const{t:a}=Me();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function jx({osds:e,onSelect:t}){const{t:n}=Me(),a=p.useMemo(()=>{const o={};return e.forEach(i=>{const l=i.host||"unknown";o[l]||(o[l]=[]),o[l].push(i)}),Object.entries(o).sort(([i],[l])=>i.localeCompare(l,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,l])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:l.sort((c,d)=>c.id-d.id).map(c=>{const d=c.total_bytes>0?c.used_bytes/c.total_bytes*100:0,h=c.status!=="up"||_e(d)==="danger"?"#ff0040":_e(d)==="warning"?"#ff6b00":"#00ff88",g=o*30;return o++,r.jsx("div",{className:`osd-hex ${c.status==="up"?"up":"down"}`,style:{"--osd-color":h,animationDelay:`${g}ms`},onClick:()=>t(c),title:`OSD.${c.id} - ${ct(d,0)}`,children:r.jsx("span",{className:"osd-id",children:c.id})},c.id)})})]},i))})()})]})}function Nx({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=p.useRef(null),i=p.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),l=p.useRef(0),c=p.useRef(0),d=100,h=g=>g===0?"0":g>=1073741824?`${(g/1073741824).toFixed(1)}G`:g>=1048576?`${(g/1048576).toFixed(1)}M`:g>=1024?`${(g/1024).toFixed(0)}K`:`${g.toFixed(0)}`;return p.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),p.useEffect(()=>{const g=o.current;if(!g)return;const u=g.getContext("2d");if(!u)return;const v=window.devicePixelRatio||1,y=()=>{const S=g.getBoundingClientRect();return g.width=S.width*v,g.height=S.height*v,u.setTransform(v,0,0,v,0,0),{width:S.width,height:S.height}};let{width:k,height:x}=y();const m=42,f=k-m;let b=0;const j=50;let w=0;const _=S=>{const z=S-b;b=S,w+=z;const R=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*R,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*R,w>=j&&(w=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),c.current=(c.current+.5)%20,u.clearRect(0,0,k,x);const F=Math.max(...i.current.read,...i.current.write,1),E=8,P=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let D=0;D<=P;D++){const I=E+D/P*(x-E*2),q=F*(1-D/P);u.fillText(h(q),m-4,I)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let D=0;D<=P;D++){const I=E+D/P*(x-E*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-c.current,u.moveTo(m,I),u.lineTo(k,I),u.stroke()}u.setLineDash([]);const ee=(D,I,q)=>{if(D.length<2)return;const A=D.map((U,X)=>({x:m+X/(d-1)*f,y:x-E-U/F*(x-E*2)}));u.strokeStyle=q,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(A[0].x,A[0].y);for(let U=1;U<A.length-1;U++){const X=(A[U].x+A[U+1].x)/2,Q=(A[U].y+A[U+1].y)/2;u.quadraticCurveTo(A[U].x,A[U].y,X,Q)}u.lineTo(A[A.length-1].x,A[A.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=I,u.lineWidth=2,u.shadowColor=I,u.shadowBlur=8,u.beginPath(),u.moveTo(A[0].x,A[0].y);for(let U=1;U<A.length-1;U++){const X=(A[U].x+A[U+1].x)/2,Q=(A[U].y+A[U+1].y)/2;u.quadraticCurveTo(A[U].x,A[U].y,X,Q)}u.lineTo(A[A.length-1].x,A[A.length-1].y),u.stroke(),u.shadowBlur=0;const H=3;for(let U=0;U<H;U++){const X=(c.current/20+U/H)%1,Q=Math.floor(X*(A.length-1));Q<A.length&&(u.fillStyle=I,u.globalAlpha=.8,u.beginPath(),u.arc(A[Q].x,A[Q].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};ee(i.current.write,"#ff6b00","#ff6b00"),ee(i.current.read,"#00ff88","#00ff88"),s||(l.current=requestAnimationFrame(_))};return l.current=requestAnimationFrame(_),()=>cancelAnimationFrame(l.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Ie(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Ie(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function Cp({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Ie(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function _x({osd:e,onClose:t}){const{t:n}=Me(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=_e(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Ie(e.used_bytes)," / ",Ie(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:ct(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function Sx({ceph:e}){const{t}=Me(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Ie(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Ie(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",ct(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",ct(a,1)]})]})]})}function Cx({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:ct(n,0)})]})})}function Mx({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function zx({ceph:e}){const{t}=Me(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(Bo,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(Bo,{value:e.total_bytes})})]})]})}function $x({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function Ex({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Bo,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Bo,{value:t,duration:500}),"/s"]})]})]})}function Tx({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:ct(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function Px({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=Me();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx(Cx,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(Mx,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx(zx,{ceph:e}),r.jsx(Ex,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx($x,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(Tx,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),l=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),c=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(wx,{ceph:e}),r.jsx(Sx,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(kx,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,h)=>r.jsx(Cp,{pool:d,totalBytes:e.total_bytes},d.name))})]}),l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,h)=>r.jsx(Cp,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(Nx,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(jx,{osds:e.osds,onSelect:n})]})]})})}function Rx({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Me(),[s,o]=p.useState(null),i=!e&&t&&Object.keys(t).length>0,l=p.useMemo(()=>i?Object.entries(t).filter(([c,d])=>d.ceph).map(([c,d])=>({id:c,name:d.name||c,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:Ki})]}):l.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:Ki})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:l.map((c,d)=>{const h=c.ceph.health==="HEALTH_OK"?"success":c.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[l.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${h}`}),r.jsx("span",{className:"section-name",children:c.name}),r.jsxs("span",{className:"section-osd",children:[c.ceph.osd_up,"/",c.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(Px,{ceph:c.ceph,clusterName:l.length===1?c.name:void 0,onOSDSelect:o,compact:l.length>1,isPaused:n})]},c.id)})}),s&&r.jsx(_x,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:Ki})]})}const Ki=`
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
`;var Ix={value:()=>{}};function Nf(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new fo(n)}function fo(e){this._=e}function Lx(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}fo.prototype=Nf.prototype={constructor:fo,on:function(e,t){var n=this._,a=Lx(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=Ax(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=Mp(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Mp(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new fo(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function Ax(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function Mp(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=Ix,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var Xl="http://www.w3.org/1999/xhtml";const zp={svg:"http://www.w3.org/2000/svg",xhtml:Xl,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function mi(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),zp.hasOwnProperty(t)?{space:zp[t],local:e}:e}function Ox(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Xl&&t.documentElement.namespaceURI===Xl?t.createElement(e):t.createElementNS(n,e)}}function Fx(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function _f(e){var t=mi(e);return(t.local?Fx:Ox)(t)}function Dx(){}function Jc(e){return e==null?Dx:function(){return this.querySelector(e)}}function Bx(e){typeof e!="function"&&(e=Jc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=new Array(i),c,d,h=0;h<i;++h)(c=o[h])&&(d=e.call(c,c.__data__,h,o))&&("__data__"in c&&(d.__data__=c.__data__),l[h]=d);return new kr(a,this._parents)}function Wx(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Ux(){return[]}function Sf(e){return e==null?Ux:function(){return this.querySelectorAll(e)}}function Vx(e){return function(){return Wx(e.apply(this,arguments))}}function Hx(e){typeof e=="function"?e=Vx(e):e=Sf(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],l=i.length,c,d=0;d<l;++d)(c=i[d])&&(a.push(e.call(c,c.__data__,d,i)),s.push(c));return new kr(a,s)}function Cf(e){return function(){return this.matches(e)}}function Mf(e){return function(t){return t.matches(e)}}var Yx=Array.prototype.find;function Gx(e){return function(){return Yx.call(this.children,e)}}function Kx(){return this.firstElementChild}function Xx(e){return this.select(e==null?Kx:Gx(typeof e=="function"?e:Mf(e)))}var qx=Array.prototype.filter;function Qx(){return Array.from(this.children)}function Jx(e){return function(){return qx.call(this.children,e)}}function Zx(e){return this.selectAll(e==null?Qx:Jx(typeof e=="function"?e:Mf(e)))}function ev(e){typeof e!="function"&&(e=Cf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=[],c,d=0;d<i;++d)(c=o[d])&&e.call(c,c.__data__,d,o)&&l.push(c);return new kr(a,this._parents)}function zf(e){return new Array(e.length)}function tv(){return new kr(this._enter||this._groups.map(zf),this._parents)}function Wo(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Wo.prototype={constructor:Wo,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function rv(e){return function(){return e}}function nv(e,t,n,a,s,o){for(var i=0,l,c=t.length,d=o.length;i<d;++i)(l=t[i])?(l.__data__=o[i],a[i]=l):n[i]=new Wo(e,o[i]);for(;i<c;++i)(l=t[i])&&(s[i]=l)}function av(e,t,n,a,s,o,i){var l,c,d=new Map,h=t.length,g=o.length,u=new Array(h),v;for(l=0;l<h;++l)(c=t[l])&&(u[l]=v=i.call(c,c.__data__,l,t)+"",d.has(v)?s[l]=c:d.set(v,c));for(l=0;l<g;++l)v=i.call(e,o[l],l,o)+"",(c=d.get(v))?(a[l]=c,c.__data__=o[l],d.delete(v)):n[l]=new Wo(e,o[l]);for(l=0;l<h;++l)(c=t[l])&&d.get(u[l])===c&&(s[l]=c)}function sv(e){return e.__data__}function ov(e,t){if(!arguments.length)return Array.from(this,sv);var n=t?av:nv,a=this._parents,s=this._groups;typeof e!="function"&&(e=rv(e));for(var o=s.length,i=new Array(o),l=new Array(o),c=new Array(o),d=0;d<o;++d){var h=a[d],g=s[d],u=g.length,v=iv(e.call(h,h&&h.__data__,d,a)),y=v.length,k=l[d]=new Array(y),x=i[d]=new Array(y),m=c[d]=new Array(u);n(h,g,k,x,m,v,t);for(var f=0,b=0,j,w;f<y;++f)if(j=k[f]){for(f>=b&&(b=f+1);!(w=x[b])&&++b<y;);j._next=w||null}}return i=new kr(i,a),i._enter=l,i._exit=c,i}function iv(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function lv(){return new kr(this._exit||this._groups.map(zf),this._parents)}function cv(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function dv(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),l=new Array(s),c=0;c<i;++c)for(var d=n[c],h=a[c],g=d.length,u=l[c]=new Array(g),v,y=0;y<g;++y)(v=d[y]||h[y])&&(u[y]=v);for(;c<s;++c)l[c]=n[c];return new kr(l,this._parents)}function pv(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function uv(e){e||(e=mv);function t(g,u){return g&&u?e(g.__data__,u.__data__):!g-!u}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],l=i.length,c=s[o]=new Array(l),d,h=0;h<l;++h)(d=i[h])&&(c[h]=d);c.sort(t)}return new kr(s,this._parents).order()}function mv(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function fv(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function hv(){return Array.from(this)}function gv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function xv(){let e=0;for(const t of this)++e;return e}function vv(){return!this.node()}function bv(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,l;o<i;++o)(l=s[o])&&e.call(l,l.__data__,o,s);return this}function yv(e){return function(){this.removeAttribute(e)}}function wv(e){return function(){this.removeAttributeNS(e.space,e.local)}}function kv(e,t){return function(){this.setAttribute(e,t)}}function jv(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Nv(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function _v(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Sv(e,t){var n=mi(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?wv:yv:typeof t=="function"?n.local?_v:Nv:n.local?jv:kv)(n,t))}function $f(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Cv(e){return function(){this.style.removeProperty(e)}}function Mv(e,t,n){return function(){this.style.setProperty(e,t,n)}}function zv(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function $v(e,t,n){return arguments.length>1?this.each((t==null?Cv:typeof t=="function"?zv:Mv)(e,t,n??"")):wa(this.node(),e)}function wa(e,t){return e.style.getPropertyValue(t)||$f(e).getComputedStyle(e,null).getPropertyValue(t)}function Ev(e){return function(){delete this[e]}}function Tv(e,t){return function(){this[e]=t}}function Pv(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Rv(e,t){return arguments.length>1?this.each((t==null?Ev:typeof t=="function"?Pv:Tv)(e,t)):this.node()[e]}function Ef(e){return e.trim().split(/^|\s+/)}function Zc(e){return e.classList||new Tf(e)}function Tf(e){this._node=e,this._names=Ef(e.getAttribute("class")||"")}Tf.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Pf(e,t){for(var n=Zc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function Rf(e,t){for(var n=Zc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function Iv(e){return function(){Pf(this,e)}}function Lv(e){return function(){Rf(this,e)}}function Av(e,t){return function(){(t.apply(this,arguments)?Pf:Rf)(this,e)}}function Ov(e,t){var n=Ef(e+"");if(arguments.length<2){for(var a=Zc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Av:t?Iv:Lv)(n,t))}function Fv(){this.textContent=""}function Dv(e){return function(){this.textContent=e}}function Bv(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Wv(e){return arguments.length?this.each(e==null?Fv:(typeof e=="function"?Bv:Dv)(e)):this.node().textContent}function Uv(){this.innerHTML=""}function Vv(e){return function(){this.innerHTML=e}}function Hv(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Yv(e){return arguments.length?this.each(e==null?Uv:(typeof e=="function"?Hv:Vv)(e)):this.node().innerHTML}function Gv(){this.nextSibling&&this.parentNode.appendChild(this)}function Kv(){return this.each(Gv)}function Xv(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function qv(){return this.each(Xv)}function Qv(e){var t=typeof e=="function"?e:_f(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Jv(){return null}function Zv(e,t){var n=typeof e=="function"?e:_f(e),a=t==null?Jv:typeof t=="function"?t:Jc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function eb(){var e=this.parentNode;e&&e.removeChild(this)}function tb(){return this.each(eb)}function rb(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function nb(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ab(e){return this.select(e?nb:rb)}function sb(e){return arguments.length?this.property("__data__",e):this.node().__data__}function ob(e){return function(t){e.call(this,t,this.__data__)}}function ib(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function lb(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function cb(e,t,n){return function(){var a=this.__on,s,o=ob(t);if(a){for(var i=0,l=a.length;i<l;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function db(e,t,n){var a=ib(e+""),s,o=a.length,i;if(arguments.length<2){var l=this.node().__on;if(l){for(var c=0,d=l.length,h;c<d;++c)for(s=0,h=l[c];s<o;++s)if((i=a[s]).type===h.type&&i.name===h.name)return h.value}return}for(l=t?cb:lb,s=0;s<o;++s)this.each(l(a[s],t,n));return this}function If(e,t,n){var a=$f(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function pb(e,t){return function(){return If(this,e,t)}}function ub(e,t){return function(){return If(this,e,t.apply(this,arguments))}}function mb(e,t){return this.each((typeof t=="function"?ub:pb)(e,t))}function*fb(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var hb=[null];function kr(e,t){this._groups=e,this._parents=t}function Ms(){return new kr([[document.documentElement]],hb)}function gb(){return this}kr.prototype=Ms.prototype={constructor:kr,select:Bx,selectAll:Hx,selectChild:Xx,selectChildren:Zx,filter:ev,data:ov,enter:tv,exit:lv,join:cv,merge:dv,selection:gb,order:pv,sort:uv,call:fv,nodes:hv,node:gv,size:xv,empty:vv,each:bv,attr:Sv,style:$v,property:Rv,classed:Ov,text:Wv,html:Yv,raise:Kv,lower:qv,append:Qv,insert:Zv,remove:tb,clone:ab,datum:sb,on:db,dispatch:mb,[Symbol.iterator]:fb};function ed(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Lf(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function zs(){}var vs=.7,Uo=1/vs,ma="\\s*([+-]?\\d+)\\s*",bs="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Tr="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",xb=/^#([0-9a-f]{3,8})$/,vb=new RegExp(`^rgb\\(${ma},${ma},${ma}\\)$`),bb=new RegExp(`^rgb\\(${Tr},${Tr},${Tr}\\)$`),yb=new RegExp(`^rgba\\(${ma},${ma},${ma},${bs}\\)$`),wb=new RegExp(`^rgba\\(${Tr},${Tr},${Tr},${bs}\\)$`),kb=new RegExp(`^hsl\\(${bs},${Tr},${Tr}\\)$`),jb=new RegExp(`^hsla\\(${bs},${Tr},${Tr},${bs}\\)$`),$p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ed(zs,ys,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Ep,formatHex:Ep,formatHex8:Nb,formatHsl:_b,formatRgb:Tp,toString:Tp});function Ep(){return this.rgb().formatHex()}function Nb(){return this.rgb().formatHex8()}function _b(){return Af(this).formatHsl()}function Tp(){return this.rgb().formatRgb()}function ys(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=xb.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Pp(t):n===3?new Ht(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Js(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Js(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=vb.exec(e))?new Ht(t[1],t[2],t[3],1):(t=bb.exec(e))?new Ht(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=yb.exec(e))?Js(t[1],t[2],t[3],t[4]):(t=wb.exec(e))?Js(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=kb.exec(e))?Lp(t[1],t[2]/100,t[3]/100,1):(t=jb.exec(e))?Lp(t[1],t[2]/100,t[3]/100,t[4]):$p.hasOwnProperty(e)?Pp($p[e]):e==="transparent"?new Ht(NaN,NaN,NaN,0):null}function Pp(e){return new Ht(e>>16&255,e>>8&255,e&255,1)}function Js(e,t,n,a){return a<=0&&(e=t=n=NaN),new Ht(e,t,n,a)}function Sb(e){return e instanceof zs||(e=ys(e)),e?(e=e.rgb(),new Ht(e.r,e.g,e.b,e.opacity)):new Ht}function ql(e,t,n,a){return arguments.length===1?Sb(e):new Ht(e,t,n,a??1)}function Ht(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}ed(Ht,ql,Lf(zs,{brighter(e){return e=e==null?Uo:Math.pow(Uo,e),new Ht(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?vs:Math.pow(vs,e),new Ht(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Ht(In(this.r),In(this.g),In(this.b),Vo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Rp,formatHex:Rp,formatHex8:Cb,formatRgb:Ip,toString:Ip}));function Rp(){return`#${Tn(this.r)}${Tn(this.g)}${Tn(this.b)}`}function Cb(){return`#${Tn(this.r)}${Tn(this.g)}${Tn(this.b)}${Tn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ip(){const e=Vo(this.opacity);return`${e===1?"rgb(":"rgba("}${In(this.r)}, ${In(this.g)}, ${In(this.b)}${e===1?")":`, ${e})`}`}function Vo(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function In(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Tn(e){return e=In(e),(e<16?"0":"")+e.toString(16)}function Lp(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new vr(e,t,n,a)}function Af(e){if(e instanceof vr)return new vr(e.h,e.s,e.l,e.opacity);if(e instanceof zs||(e=ys(e)),!e)return new vr;if(e instanceof vr)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,l=o-s,c=(o+s)/2;return l?(t===o?i=(n-a)/l+(n<a)*6:n===o?i=(a-t)/l+2:i=(t-n)/l+4,l/=c<.5?o+s:2-o-s,i*=60):l=c>0&&c<1?0:i,new vr(i,l,c,e.opacity)}function Mb(e,t,n,a){return arguments.length===1?Af(e):new vr(e,t,n,a??1)}function vr(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}ed(vr,Mb,Lf(zs,{brighter(e){return e=e==null?Uo:Math.pow(Uo,e),new vr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?vs:Math.pow(vs,e),new vr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new Ht(Xi(e>=240?e-240:e+120,s,a),Xi(e,s,a),Xi(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new vr(Ap(this.h),Zs(this.s),Zs(this.l),Vo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Vo(this.opacity);return`${e===1?"hsl(":"hsla("}${Ap(this.h)}, ${Zs(this.s)*100}%, ${Zs(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Ap(e){return e=(e||0)%360,e<0?e+360:e}function Zs(e){return Math.max(0,Math.min(1,e||0))}function Xi(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Of=e=>()=>e;function zb(e,t){return function(n){return e+n*t}}function $b(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function Eb(e){return(e=+e)==1?Ff:function(t,n){return n-t?$b(t,n,e):Of(isNaN(t)?n:t)}}function Ff(e,t){var n=t-e;return n?zb(e,n):Of(isNaN(e)?t:e)}const Op=function e(t){var n=Eb(t);function a(s,o){var i=n((s=ql(s)).r,(o=ql(o)).r),l=n(s.g,o.g),c=n(s.b,o.b),d=Ff(s.opacity,o.opacity);return function(h){return s.r=i(h),s.g=l(h),s.b=c(h),s.opacity=d(h),s+""}}return a.gamma=e,a}(1);function rn(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Ql=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,qi=new RegExp(Ql.source,"g");function Tb(e){return function(){return e}}function Pb(e){return function(t){return e(t)+""}}function Rb(e,t){var n=Ql.lastIndex=qi.lastIndex=0,a,s,o,i=-1,l=[],c=[];for(e=e+"",t=t+"";(a=Ql.exec(e))&&(s=qi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),l[i]?l[i]+=o:l[++i]=o),(a=a[0])===(s=s[0])?l[i]?l[i]+=s:l[++i]=s:(l[++i]=null,c.push({i,x:rn(a,s)})),n=qi.lastIndex;return n<t.length&&(o=t.slice(n),l[i]?l[i]+=o:l[++i]=o),l.length<2?c[0]?Pb(c[0].x):Tb(t):(t=c.length,function(d){for(var h=0,g;h<t;++h)l[(g=c[h]).i]=g.x(d);return l.join("")})}var Fp=180/Math.PI,Jl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Df(e,t,n,a,s,o){var i,l,c;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(c=e*n+t*a)&&(n-=e*c,a-=t*c),(l=Math.sqrt(n*n+a*a))&&(n/=l,a/=l,c/=l),e*a<t*n&&(e=-e,t=-t,c=-c,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*Fp,skewX:Math.atan(c)*Fp,scaleX:i,scaleY:l}}var eo;function Ib(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Jl:Df(t.a,t.b,t.c,t.d,t.e,t.f)}function Lb(e){return e==null||(eo||(eo=document.createElementNS("http://www.w3.org/2000/svg","g")),eo.setAttribute("transform",e),!(e=eo.transform.baseVal.consolidate()))?Jl:(e=e.matrix,Df(e.a,e.b,e.c,e.d,e.e,e.f))}function Bf(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,h,g,u,v,y){if(d!==g||h!==u){var k=v.push("translate(",null,t,null,n);y.push({i:k-4,x:rn(d,g)},{i:k-2,x:rn(h,u)})}else(g||u)&&v.push("translate("+g+t+u+n)}function i(d,h,g,u){d!==h?(d-h>180?h+=360:h-d>180&&(d+=360),u.push({i:g.push(s(g)+"rotate(",null,a)-2,x:rn(d,h)})):h&&g.push(s(g)+"rotate("+h+a)}function l(d,h,g,u){d!==h?u.push({i:g.push(s(g)+"skewX(",null,a)-2,x:rn(d,h)}):h&&g.push(s(g)+"skewX("+h+a)}function c(d,h,g,u,v,y){if(d!==g||h!==u){var k=v.push(s(v)+"scale(",null,",",null,")");y.push({i:k-4,x:rn(d,g)},{i:k-2,x:rn(h,u)})}else(g!==1||u!==1)&&v.push(s(v)+"scale("+g+","+u+")")}return function(d,h){var g=[],u=[];return d=e(d),h=e(h),o(d.translateX,d.translateY,h.translateX,h.translateY,g,u),i(d.rotate,h.rotate,g,u),l(d.skewX,h.skewX,g,u),c(d.scaleX,d.scaleY,h.scaleX,h.scaleY,g,u),d=h=null,function(v){for(var y=-1,k=u.length,x;++y<k;)g[(x=u[y]).i]=x.x(v);return g.join("")}}}var Ab=Bf(Ib,"px, ","px)","deg)"),Ob=Bf(Lb,", ",")",")"),ka=0,Ua=0,Ia=0,Wf=1e3,Ho,Va,Yo=0,Bn=0,fi=0,ws=typeof performance=="object"&&performance.now?performance:Date,Uf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function td(){return Bn||(Uf(Fb),Bn=ws.now()+fi)}function Fb(){Bn=0}function Go(){this._call=this._time=this._next=null}Go.prototype=Vf.prototype={constructor:Go,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?td():+n)+(t==null?0:+t),!this._next&&Va!==this&&(Va?Va._next=this:Ho=this,Va=this),this._call=e,this._time=n,Zl()},stop:function(){this._call&&(this._call=null,this._time=1/0,Zl())}};function Vf(e,t,n){var a=new Go;return a.restart(e,t,n),a}function Db(){td(),++ka;for(var e=Ho,t;e;)(t=Bn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--ka}function Dp(){Bn=(Yo=ws.now())+fi,ka=Ua=0;try{Db()}finally{ka=0,Wb(),Bn=0}}function Bb(){var e=ws.now(),t=e-Yo;t>Wf&&(fi-=t,Yo=e)}function Wb(){for(var e,t=Ho,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Ho=n);Va=e,Zl(a)}function Zl(e){if(!ka){Ua&&(Ua=clearTimeout(Ua));var t=e-Bn;t>24?(e<1/0&&(Ua=setTimeout(Dp,e-ws.now()-fi)),Ia&&(Ia=clearInterval(Ia))):(Ia||(Yo=ws.now(),Ia=setInterval(Bb,Wf)),ka=1,Uf(Dp))}}function Bp(e,t,n){var a=new Go;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var Ub=Nf("start","end","cancel","interrupt"),Vb=[],Hf=0,Wp=1,ec=2,ho=3,Up=4,tc=5,go=6;function hi(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;Hb(e,n,{name:t,index:a,group:s,on:Ub,tween:Vb,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:Hf})}function rd(e,t){var n=jr(e,t);if(n.state>Hf)throw new Error("too late; already scheduled");return n}function Pr(e,t){var n=jr(e,t);if(n.state>ho)throw new Error("too late; already running");return n}function jr(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Hb(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=Vf(o,0,n.time);function o(d){n.state=Wp,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var h,g,u,v;if(n.state!==Wp)return c();for(h in a)if(v=a[h],v.name===n.name){if(v.state===ho)return Bp(i);v.state===Up?(v.state=go,v.timer.stop(),v.on.call("interrupt",e,e.__data__,v.index,v.group),delete a[h]):+h<t&&(v.state=go,v.timer.stop(),v.on.call("cancel",e,e.__data__,v.index,v.group),delete a[h])}if(Bp(function(){n.state===ho&&(n.state=Up,n.timer.restart(l,n.delay,n.time),l(d))}),n.state=ec,n.on.call("start",e,e.__data__,n.index,n.group),n.state===ec){for(n.state=ho,s=new Array(u=n.tween.length),h=0,g=-1;h<u;++h)(v=n.tween[h].value.call(e,e.__data__,n.index,n.group))&&(s[++g]=v);s.length=g+1}}function l(d){for(var h=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(c),n.state=tc,1),g=-1,u=s.length;++g<u;)s[g].call(e,h);n.state===tc&&(n.on.call("end",e,e.__data__,n.index,n.group),c())}function c(){n.state=go,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function Yb(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>ec&&a.state<tc,a.state=go,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function Gb(e){return this.each(function(){Yb(this,e)})}function Kb(e,t){var n,a;return function(){var s=Pr(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,l=a.length;i<l;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Xb(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=Pr(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var l={name:t,value:n},c=0,d=s.length;c<d;++c)if(s[c].name===t){s[c]=l;break}c===d&&s.push(l)}o.tween=s}}function qb(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=jr(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?Kb:Xb)(n,e,t))}function nd(e,t,n){var a=e._id;return e.each(function(){var s=Pr(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return jr(s,a).value[t]}}function Yf(e,t){var n;return(typeof t=="number"?rn:t instanceof ys?Op:(n=ys(t))?(t=n,Op):Rb)(e,t)}function Qb(e){return function(){this.removeAttribute(e)}}function Jb(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Zb(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function e1(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function t1(e,t,n){var a,s,o;return function(){var i,l=n(this),c;return l==null?void this.removeAttribute(e):(i=this.getAttribute(e),c=l+"",i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l)))}}function r1(e,t,n){var a,s,o;return function(){var i,l=n(this),c;return l==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),c=l+"",i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l)))}}function n1(e,t){var n=mi(e),a=n==="transform"?Ob:Yf;return this.attrTween(e,typeof t=="function"?(n.local?r1:t1)(n,a,nd(this,"attr."+e,t)):t==null?(n.local?Jb:Qb)(n):(n.local?e1:Zb)(n,a,t))}function a1(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function s1(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function o1(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&s1(e,o)),n}return s._value=t,s}function i1(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&a1(e,o)),n}return s._value=t,s}function l1(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=mi(e);return this.tween(n,(a.local?o1:i1)(a,t))}function c1(e,t){return function(){rd(this,e).delay=+t.apply(this,arguments)}}function d1(e,t){return t=+t,function(){rd(this,e).delay=t}}function p1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?c1:d1)(t,e)):jr(this.node(),t).delay}function u1(e,t){return function(){Pr(this,e).duration=+t.apply(this,arguments)}}function m1(e,t){return t=+t,function(){Pr(this,e).duration=t}}function f1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?u1:m1)(t,e)):jr(this.node(),t).duration}function h1(e,t){if(typeof t!="function")throw new Error;return function(){Pr(this,e).ease=t}}function g1(e){var t=this._id;return arguments.length?this.each(h1(t,e)):jr(this.node(),t).ease}function x1(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Pr(this,e).ease=n}}function v1(e){if(typeof e!="function")throw new Error;return this.each(x1(this._id,e))}function b1(e){typeof e!="function"&&(e=Cf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=[],c,d=0;d<i;++d)(c=o[d])&&e.call(c,c.__data__,d,o)&&l.push(c);return new Yr(a,this._parents,this._name,this._id)}function y1(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),l=0;l<o;++l)for(var c=t[l],d=n[l],h=c.length,g=i[l]=new Array(h),u,v=0;v<h;++v)(u=c[v]||d[v])&&(g[v]=u);for(;l<a;++l)i[l]=t[l];return new Yr(i,this._parents,this._name,this._id)}function w1(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function k1(e,t,n){var a,s,o=w1(t)?rd:Pr;return function(){var i=o(this,e),l=i.on;l!==a&&(s=(a=l).copy()).on(t,n),i.on=s}}function j1(e,t){var n=this._id;return arguments.length<2?jr(this.node(),n).on.on(e):this.each(k1(n,e,t))}function N1(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function _1(){return this.on("end.remove",N1(this._id))}function S1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Jc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var l=a[i],c=l.length,d=o[i]=new Array(c),h,g,u=0;u<c;++u)(h=l[u])&&(g=e.call(h,h.__data__,u,l))&&("__data__"in h&&(g.__data__=h.__data__),d[u]=g,hi(d[u],t,n,u,d,jr(h,n)));return new Yr(o,this._parents,t,n)}function C1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Sf(e));for(var a=this._groups,s=a.length,o=[],i=[],l=0;l<s;++l)for(var c=a[l],d=c.length,h,g=0;g<d;++g)if(h=c[g]){for(var u=e.call(h,h.__data__,g,c),v,y=jr(h,n),k=0,x=u.length;k<x;++k)(v=u[k])&&hi(v,t,n,k,u,y);o.push(u),i.push(h)}return new Yr(o,i,t,n)}var M1=Ms.prototype.constructor;function z1(){return new M1(this._groups,this._parents)}function $1(e,t){var n,a,s;return function(){var o=wa(this,e),i=(this.style.removeProperty(e),wa(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function Gf(e){return function(){this.style.removeProperty(e)}}function E1(e,t,n){var a,s=n+"",o;return function(){var i=wa(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function T1(e,t,n){var a,s,o;return function(){var i=wa(this,e),l=n(this),c=l+"";return l==null&&(c=l=(this.style.removeProperty(e),wa(this,e))),i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l))}}function P1(e,t){var n,a,s,o="style."+t,i="end."+o,l;return function(){var c=Pr(this,e),d=c.on,h=c.value[o]==null?l||(l=Gf(t)):void 0;(d!==n||s!==h)&&(a=(n=d).copy()).on(i,s=h),c.on=a}}function R1(e,t,n){var a=(e+="")=="transform"?Ab:Yf;return t==null?this.styleTween(e,$1(e,a)).on("end.style."+e,Gf(e)):typeof t=="function"?this.styleTween(e,T1(e,a,nd(this,"style."+e,t))).each(P1(this._id,e)):this.styleTween(e,E1(e,a,t),n).on("end.style."+e,null)}function I1(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function L1(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&I1(e,i,n)),a}return o._value=t,o}function A1(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,L1(e,t,n??""))}function O1(e){return function(){this.textContent=e}}function F1(e){return function(){var t=e(this);this.textContent=t??""}}function D1(e){return this.tween("text",typeof e=="function"?F1(nd(this,"text",e)):O1(e==null?"":e+""))}function B1(e){return function(t){this.textContent=e.call(this,t)}}function W1(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&B1(s)),t}return a._value=e,a}function U1(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,W1(e))}function V1(){for(var e=this._name,t=this._id,n=Kf(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],l=i.length,c,d=0;d<l;++d)if(c=i[d]){var h=jr(c,t);hi(c,e,n,d,i,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new Yr(a,this._parents,e,n)}function H1(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var l={value:i},c={value:function(){--s===0&&o()}};n.each(function(){var d=Pr(this,a),h=d.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(l),t._.interrupt.push(l),t._.end.push(c)),d.on=t}),s===0&&o()})}var Y1=0;function Yr(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function Kf(){return++Y1}var Lr=Ms.prototype;Yr.prototype={constructor:Yr,select:S1,selectAll:C1,selectChild:Lr.selectChild,selectChildren:Lr.selectChildren,filter:b1,merge:y1,selection:z1,transition:V1,call:Lr.call,nodes:Lr.nodes,node:Lr.node,size:Lr.size,empty:Lr.empty,each:Lr.each,on:j1,attr:n1,attrTween:l1,style:R1,styleTween:A1,text:D1,textTween:U1,remove:_1,tween:qb,delay:p1,duration:f1,ease:g1,easeVarying:v1,end:H1,[Symbol.iterator]:Lr[Symbol.iterator]};function G1(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var K1={time:null,delay:0,duration:250,ease:G1};function X1(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function q1(e){var t,n;e instanceof Yr?(t=e._id,e=e._name):(t=Kf(),(n=K1).time=td(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],l=i.length,c,d=0;d<l;++d)(c=i[d])&&hi(c,e,t,d,i,n||X1(c,t));return new Yr(a,this._parents,e,t)}Ms.prototype.interrupt=Gb;Ms.prototype.transition=q1;function Q1(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function J1(){return this.eachAfter(Q1)}function Z1(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function ey(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function ty(e,t){for(var n=this,a=[n],s=[],o,i,l,c=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,l=o.length;i<l;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++c,this);return this}function ry(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function ny(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function ay(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function sy(e){for(var t=this,n=oy(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function oy(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function iy(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function ly(){return Array.from(this)}function cy(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function dy(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*py(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function ad(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=fy)):t===void 0&&(t=my);for(var n=new Ko(e),a,s=[n],o,i,l,c;a=s.pop();)if((i=t(a.data))&&(c=(i=Array.from(i)).length))for(a.children=i,l=c-1;l>=0;--l)s.push(o=i[l]=new Ko(i[l])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(gy)}function uy(){return ad(this).eachBefore(hy)}function my(e){return e.children}function fy(e){return Array.isArray(e)?e[1]:null}function hy(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function gy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function Ko(e){this.data=e,this.depth=this.height=0,this.parent=null}Ko.prototype=ad.prototype={constructor:Ko,count:J1,each:Z1,eachAfter:ty,eachBefore:ey,find:ry,sum:ny,sort:ay,path:sy,ancestors:iy,descendants:ly,leaves:cy,links:dy,copy:uy,[Symbol.iterator]:py};function xy(e){if(typeof e!="function")throw new Error;return e}function La(){return 0}function Aa(e){return function(){return e}}function vy(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function by(e,t,n,a,s){for(var o=e.children,i,l=-1,c=o.length,d=e.value&&(a-t)/e.value;++l<c;)i=o[l],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function yy(e,t,n,a,s){for(var o=e.children,i,l=-1,c=o.length,d=e.value&&(s-n)/e.value;++l<c;)i=o[l],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var wy=(1+Math.sqrt(5))/2;function ky(e,t,n,a,s,o){for(var i=[],l=t.children,c,d,h=0,g=0,u=l.length,v,y,k=t.value,x,m,f,b,j,w,_;h<u;){v=s-n,y=o-a;do x=l[g++].value;while(!x&&g<u);for(m=f=x,w=Math.max(y/v,v/y)/(k*e),_=x*x*w,j=Math.max(f/_,_/m);g<u;++g){if(x+=d=l[g].value,d<m&&(m=d),d>f&&(f=d),_=x*x*w,b=Math.max(f/_,_/m),b>j){x-=d;break}j=b}i.push(c={value:x,dice:v<y,children:l.slice(h,g)}),c.dice?by(c,n,a,s,k?a+=y*x/k:o):yy(c,n,a,k?n+=v*x/k:s,o),k-=x,h=g}return i}const Xf=function e(t){function n(a,s,o,i,l){ky(t,a,s,o,i,l)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(wy);function jy(){var e=Xf,t=!1,n=1,a=1,s=[0],o=La,i=La,l=La,c=La,d=La;function h(u){return u.x0=u.y0=0,u.x1=n,u.y1=a,u.eachBefore(g),s=[0],t&&u.eachBefore(vy),u}function g(u){var v=s[u.depth],y=u.x0+v,k=u.y0+v,x=u.x1-v,m=u.y1-v;x<y&&(y=x=(y+x)/2),m<k&&(k=m=(k+m)/2),u.x0=y,u.y0=k,u.x1=x,u.y1=m,u.children&&(v=s[u.depth+1]=o(u)/2,y+=d(u)-v,k+=i(u)-v,x-=l(u)-v,m-=c(u)-v,x<y&&(y=x=(y+x)/2),m<k&&(k=m=(k+m)/2),e(u,y,k,x,m))}return h.round=function(u){return arguments.length?(t=!!u,h):t},h.size=function(u){return arguments.length?(n=+u[0],a=+u[1],h):[n,a]},h.tile=function(u){return arguments.length?(e=xy(u),h):e},h.padding=function(u){return arguments.length?h.paddingInner(u).paddingOuter(u):h.paddingInner()},h.paddingInner=function(u){return arguments.length?(o=typeof u=="function"?u:Aa(+u),h):o},h.paddingOuter=function(u){return arguments.length?h.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):h.paddingTop()},h.paddingTop=function(u){return arguments.length?(i=typeof u=="function"?u:Aa(+u),h):i},h.paddingRight=function(u){return arguments.length?(l=typeof u=="function"?u:Aa(+u),h):l},h.paddingBottom=function(u){return arguments.length?(c=typeof u=="function"?u:Aa(+u),h):c},h.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:Aa(+u),h):d},h}function Ha(e,t,n){this.k=e,this.x=t,this.y=n}Ha.prototype={constructor:Ha,scale:function(e){return e===1?this:new Ha(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Ha(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Ha.prototype;const Vp={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Ny(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Vp[n]||Vp.default}function Hp(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function Yp({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:l=!1,width:c=120,height:d=180,animationDelay:h=0,onClick:g,onHover:u}){const v=p.useRef(null),y=p.useRef(0),k=p.useRef([]),x=p.useRef(0),[m,f]=p.useState(!1),b=n>0?t/n*100:0,[j,w]=p.useState(0),[_,S]=p.useState(!1),[z,R]=p.useState(!0),F=p.useRef(null),E=p.useRef(0),P=1200,ee=500;p.useEffect(()=>{const Q=setTimeout(()=>{S(!0)},h);return()=>clearTimeout(Q)},[h]),p.useEffect(()=>{if(!_)return;E.current=j,F.current=null;const Q=E.current,M=b;if(Math.abs(Q-M)<.1){w(M);return}const ge=z?P:ee,je=Oe=>{F.current===null&&(F.current=Oe);const G=Oe-F.current,ue=Math.min(G/ge,1),te=(L=>1-Math.pow(1-L,3))(ue),J=Q+(M-Q)*te;w(J),ue<1?requestAnimationFrame(je):z&&R(!1)};requestAnimationFrame(je)},[b,_]);const D=j,I=b>=85,q=b>=95,A=Ny(b,a),H=p.useCallback(Q=>{const M=[];for(let ge=0;ge<Q;ge++)M.push({x:Math.random()*c*.6+c*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return M},[c,d]);p.useEffect(()=>{const Q=v.current;if(!Q)return;const M=Q.getContext("2d");if(!M)return;const ge=window.devicePixelRatio||1;Q.width=c*ge,Q.height=d*ge,M.scale(ge,ge);const je=I?15:5;k.current=H(je);const Oe=G=>{G-x.current,x.current=G;const ue=G*.001;M.clearRect(0,0,c,d);const ke=8,te=ke,J=ke+20,L=c-ke*2,C=d-ke*2-40,Y=8,re=l?.05:D/100,be=C*re,W=J+C-be,ce=M.createLinearGradient(te,J,te,J+C);ce.addColorStop(0,"#0a0a12"),ce.addColorStop(.5,"#050510"),ce.addColorStop(1,"#0a0a12"),M.fillStyle=ce,M.beginPath(),M.roundRect(te,J,L,C,Y),M.fill(),M.save(),M.beginPath(),M.roundRect(te,J,L,C,Y),M.clip();const me=12,pe=me*Math.sqrt(3);M.strokeStyle="rgba(0, 240, 255, 0.06)",M.lineWidth=.5;for(let oe=0;oe<C/pe+1;oe++)for(let ne=0;ne<L/(me*1.5)+1;ne++){const we=oe%2*me*.75,Ce=te+ne*me*1.5+we,Ae=J+oe*pe*.5;M.beginPath();for(let Nt=0;Nt<6;Nt++){const $t=Math.PI/3*Nt+Math.PI/6,le=Ce+me*.4*Math.cos($t),Ue=Ae+me*.4*Math.sin($t);Nt===0?M.moveTo(le,Ue):M.lineTo(le,Ue)}M.closePath(),M.stroke()}M.restore();const ye=J+ue*30%C;M.save(),M.beginPath(),M.roundRect(te,J,L,C,Y),M.clip();const Fe=M.createLinearGradient(te,ye-15,te,ye+5);Fe.addColorStop(0,"transparent"),Fe.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Fe.addColorStop(1,"transparent"),M.fillStyle=Fe,M.fillRect(te,ye-15,L,20),M.restore(),M.strokeStyle="rgba(0, 240, 255, 0.2)",M.lineWidth=1;for(let oe=0;oe<=10;oe++){const ne=J+C-C*oe/10,we=oe%5===0?12:6,Ce=oe%5===0?.4:.2;M.strokeStyle=`rgba(0, 240, 255, ${Ce})`,M.beginPath(),M.moveTo(te+2,ne),M.lineTo(te+2+we,ne),M.stroke(),M.beginPath(),M.moveTo(te+L-2,ne),M.lineTo(te+L-2-we,ne),M.stroke()}const Je=ue*50%C;for(let oe=0;oe<3;oe++){const ne=J+(Je+oe*C/3)%C,we=.3+Math.sin(ue*3+oe)*.2;M.beginPath(),M.strokeStyle=`rgba(0, 240, 255, ${we})`,M.lineWidth=2,M.moveTo(te,ne),M.lineTo(te+4,ne),M.stroke(),M.beginPath(),M.moveTo(te+L,ne),M.lineTo(te+L-4,ne),M.stroke()}if(!l&&re>0){const oe=M.createLinearGradient(0,W,0,J+C);oe.addColorStop(0,A.gradient[0]),oe.addColorStop(1,A.gradient[1]);const ne=I?6:3,we=.05,Ce=I?.1:.05,Ae=Math.PI/3;M.save(),M.beginPath(),M.rect(te,J,L,C),M.clip(),M.fillStyle=oe,M.beginPath(),M.moveTo(te,J+C);for(let le=0;le<=L;le+=2){const Ue=Math.sin(le*we+ue*Ce*60)*ne,Te=Math.sin(le*we*1.5+ue*Ce*40+Ae)*(ne*.5),Ge=W+Ue+Te;le===0?M.moveTo(te+le,Ge):M.lineTo(te+le,Ge)}M.lineTo(te+L,J+C),M.lineTo(te,J+C),M.closePath(),M.fill(),M.strokeStyle=A.glow,M.lineWidth=2,M.shadowColor=A.main,M.shadowBlur=10,M.beginPath();for(let le=0;le<=L;le+=2){const Ue=Math.sin(le*we+ue*Ce*60)*ne,Te=Math.sin(le*we*1.5+ue*Ce*40+Ae)*(ne*.5),Ge=W+Ue+Te;le===0?M.moveTo(te+le,Ge):M.lineTo(te+le,Ge)}M.stroke(),M.shadowBlur=0,k.current.forEach((le,Ue)=>{if(le.y>W&&le.y<J+C){const Te=Math.sin(ue*le.wobbleSpeed*60+le.wobbleOffset)*3;M.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,M.beginPath(),M.arc(le.x+Te,le.y,le.radius,0,Math.PI*2),M.fill(),M.fillStyle="rgba(255, 255, 255, 0.5)",M.beginPath(),M.arc(le.x+Te-le.radius*.3,le.y-le.radius*.3,le.radius*.3,0,Math.PI*2),M.fill()}le.y-=le.speed*(I?2:1),le.y<W-10&&(le.y=J+C+Math.random()*20,le.x=te+Math.random()*L*.6+L*.2)}),M.restore();const Nt=3;for(let le=0;le<Nt;le++){const Ue=te+L*(le+.5)/Nt,Te=ue*2+le*Math.PI*.7,Ge=(Math.sin(Te)*.5+.5)*.3;if(Ge>.1){const ft=M.createLinearGradient(Ue-8,W,Ue+8,J+C);ft.addColorStop(0,"rgba(255, 255, 255, 0)"),ft.addColorStop(.3,`rgba(255, 255, 255, ${Ge})`),ft.addColorStop(.7,`rgba(255, 255, 255, ${Ge*.5})`),ft.addColorStop(1,"rgba(255, 255, 255, 0)"),M.fillStyle=ft,M.fillRect(Ue-8,W,16,be)}}const $t=Math.floor(re*8);for(let le=0;le<$t;le++){const Ue=le*137.5,Te=te+10+Ue*7%(L-20),ft=W+10+Ue*13%(be-20)+Math.sin(ue*2+Ue)*5,or=.4+Math.sin(ue*3+Ue)*.3;if(M.fillStyle=`rgba(255, 255, 255, ${or})`,M.beginPath(),M.arc(Te,ft,1.5,0,Math.PI*2),M.fill(),le>0&&le%3===0){const wt=(le-1)*137.5,Xt=te+10+wt*7%(L-20),Pe=W+10+wt*13%(be-20)+Math.sin(ue*2+wt)*5,Nr=Math.sqrt((Te-Xt)**2+(ft-Pe)**2);Nr<30&&(M.strokeStyle=`rgba(255, 255, 255, ${.1*(1-Nr/30)})`,M.lineWidth=.5,M.beginPath(),M.moveTo(Te,ft),M.lineTo(Xt,Pe),M.stroke())}}if(I){for(let le=0;le<8;le++){const Ue=te+L*.15+Math.random()*L*.7,Te=W-Math.random()*25,Ge=Math.random()*4+1;M.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,M.beginPath(),M.arc(Ue,Te,Ge,0,Math.PI*2),M.fill()}Math.sin(ue*10)>.7&&(M.fillStyle="rgba(255, 100, 0, 0.05)",M.fillRect(te,J,L,C))}}const Ye=l||q?"#ff0040":A.main,Xe=q?Math.sin(ue*5)*.3+.7:1;M.strokeStyle=Ye,M.lineWidth=3,M.shadowColor=Ye,M.shadowBlur=m?20:12*Xe,M.beginPath(),M.roundRect(te,J,L,C,Y),M.stroke(),M.shadowBlur=0,M.strokeStyle=`${Ye}60`,M.lineWidth=1,M.beginPath(),M.roundRect(te+3,J+3,L-6,C-6,Y-2),M.stroke();const fe=16,Se=3;M.strokeStyle=Ye,M.lineWidth=Se,M.shadowColor=Ye,M.shadowBlur=8,M.beginPath(),M.moveTo(te-2,J+fe),M.lineTo(te-2,J-2),M.lineTo(te+fe,J-2),M.stroke(),M.beginPath(),M.moveTo(te+L-fe,J-2),M.lineTo(te+L+2,J-2),M.lineTo(te+L+2,J+fe),M.stroke(),M.beginPath(),M.moveTo(te-2,J+C-fe),M.lineTo(te-2,J+C+2),M.lineTo(te+fe,J+C+2),M.stroke(),M.beginPath(),M.moveTo(te+L-fe,J+C+2),M.lineTo(te+L+2,J+C+2),M.lineTo(te+L+2,J+C-fe),M.stroke(),M.shadowBlur=0;const V=2+(Math.sin(ue*4)*.5+.5);if(M.fillStyle=Ye,M.shadowColor=Ye,M.shadowBlur=6,[[te-2,J-2],[te+L+2,J-2],[te-2,J+C+2],[te+L+2,J+C+2]].forEach(([oe,ne])=>{M.beginPath(),M.arc(oe,ne,V,0,Math.PI*2),M.fill()}),M.shadowBlur=0,!l){const ne=te+L+6,we=C,Ce=we*(D/100);M.fillStyle="rgba(0, 20, 40, 0.8)",M.fillRect(ne,J,4,we);const Ae=M.createLinearGradient(0,J+we-Ce,0,J+we);Ae.addColorStop(0,A.main),Ae.addColorStop(1,A.gradient[1]),M.fillStyle=Ae,M.fillRect(ne,J+we-Ce,4,Ce),M.strokeStyle=`${Ye}40`,M.lineWidth=1,M.strokeRect(ne,J,4,we)}if(l){M.strokeStyle="#ff0040",M.lineWidth=2,M.beginPath();const oe=te+L*.3,ne=J+C*.3;M.moveTo(oe,ne),M.lineTo(oe+10,ne+15),M.lineTo(oe+5,ne+25),M.lineTo(oe+15,ne+40),M.stroke(),M.beginPath(),M.moveTo(oe+10,ne+15),M.lineTo(oe+20,ne+20),M.stroke()}y.current=requestAnimationFrame(Oe)};return y.current=requestAnimationFrame(Oe),()=>{cancelAnimationFrame(y.current)}},[c,d,D,I,q,l,A,m,H]);const U=()=>{f(!0),u==null||u(!0)},X=()=>{f(!1),u==null||u(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${q?"critical":""} ${l?"offline":""}`,onClick:g,onMouseEnter:U,onMouseLeave:X,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${l?"offline":""}`,style:l?void 0:{color:A.main,background:`${A.main}15`,borderColor:`${A.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:v,style:{width:c,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${q?"critical":I?"warning":""}`,style:{color:l?"#FF4081":A.main,textShadow:l?"none":`0 0 10px ${A.glow}`},children:l?"OFFLINE":`${b.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[Hp(t)," / ",Hp(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((Q,M)=>r.jsx("span",{className:"node-tag",children:Q},M))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
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

      `})]})}function _y({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=p.useState(0),i=p.useRef(0),l=p.useRef(null),c=p.useRef(0);p.useEffect(()=>{c.current=s,l.current=null;const v=y=>{l.current===null&&(l.current=y);const k=y-l.current,x=Math.min(k/a,1),m=x===1?1:1-Math.pow(2,-10*x),f=c.current+(e-c.current)*m;o(f),x<1&&(i.current=requestAnimationFrame(v))};return i.current=requestAnimationFrame(v),()=>cancelAnimationFrame(i.current)},[e,a]);const h=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",g=40,u=[];for(let v=0;v<g;v++){const y=v/g*100,k=y<s,x=v%4===0;u.push({index:v,isActive:k,isMajor:x,percent:y})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:h},children:Ie(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Ie(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:u.map(v=>r.jsx("div",{className:`segment ${v.isActive?"active":""} ${v.isMajor?"major":""}`,style:{"--segment-color":v.isActive?h:"rgba(60, 80, 100, 0.3)",animationDelay:v.isActive?`${v.index*20}ms`:"0ms"}},v.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${h}40)`,boxShadow:`0 0 20px ${h}60, 0 0 40px ${h}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${h} transparent`,filter:`drop-shadow(0 0 4px ${h})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:h}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:h},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const Sy=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function Cy({vm:e,position:t,onClose:n}){var m,f,b,j,w;const{t:a,language:s}=Me(),o=p.useRef(null),[i,l]=p.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",h=e.type==="lxc",g=e.disks||[],u=s==="zh-TW",v=((m=e.disk)==null?void 0:m.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,y=v>=90?"#ff0040":v>=70?"#ff6b00":"#00f0ff",k=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();p.useEffect(()=>{if(!o.current)return;const S=o.current.getBoundingClientRect(),z=S.width,R=S.height,F=window.innerWidth,E=window.innerHeight,P=15,{cellX:ee,cellY:D,cellTop:I,cellBottom:q,cellLeft:A,cellRight:H}=t;let U=0,X=0,Q=ee,M=D;H+P+z<F?(U=H+P,X=Math.max(P,Math.min(E-R-P,D-R/2)),Q=H,M=D):A-P-z>0?(U=A-P-z,X=Math.max(P,Math.min(E-R-P,D-R/2)),Q=A,M=D):I-P-R>0?(U=Math.max(P,Math.min(F-z-P,ee-z/2)),X=I-P-R,Q=ee,M=I):(U=Math.max(P,Math.min(F-z-P,ee-z/2)),X=q+P,Q=ee,M=q);let ge=U,je=X+R/2;U>H?(ge=U,je=Math.max(X,Math.min(X+R,M))):U+z<A?(ge=U+z,je=Math.max(X,Math.min(X+R,M))):X+R<I?(ge=Math.max(U,Math.min(U+z,Q)),je=X+R):(ge=Math.max(U,Math.min(U+z,Q)),je=X),l({x:U,y:X,lineStart:{x:Q,y:M},lineEnd:{x:ge,y:je}})},[t]);const x=i?(()=>{const _=i.lineEnd.x-i.lineStart.x,S=i.lineEnd.y-i.lineStart.y,z=Math.sqrt(_*_+S*S),R=Math.atan2(S,_)*(180/Math.PI);return{width:`${z}px`,transform:`rotate(${R}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&x&&r.jsx("div",{className:"popup-connector-line",style:x}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:_=>_.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:k}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",g.length>1?u?"":"S":""," (",g.length||1,")"]}),g.length>0?r.jsx("div",{className:"disk-list",children:g.map((_,S)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:_.device}),r.jsx("span",{className:"device-format",children:_.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:_.storage}),r.jsx("span",{className:"disk-size",children:Ie(_.size)})]})]},S))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Ie(((f=e.disk)==null?void 0:f.total_bytes)||0)})]})}),h&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Ie(((b=e.disk)==null?void 0:b.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:y},children:[v.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${v}%`,background:y}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((j=e.cpu)==null?void 0:j.cores)||0," ",u?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Ie(((w=e.memory)==null?void 0:w.total_bytes)||0)})]})]})]})]})}function My({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=p.useState(null),l=p.useRef(null),c=p.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(v=>({name:v.vm.name,value:v.value,vm:v.vm}))},h=ad(d).sum(v=>v.value||0).sort((v,y)=>(y.value||0)-(v.value||0));return jy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Xf.ratio(1))(h).leaves().map(v=>({x:v.x0,y:v.y0,width:v.x1-v.x0,height:v.y1-v.y0,vm:v.data.vm,value:v.value||0}))},[e,t,n]);return c.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:l,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),c.map((d,h)=>{var R;const g=((R=d.vm.disk)==null?void 0:R.total_bytes)||1,u=d.vm.status==="running",v=o===`${d.vm.node}-${d.vm.vmid}`,y=d.width>15&&d.height>12,k=d.width>40&&d.height>25,x=d.width>50&&d.height>40,m=d.width>60&&d.height>55,f=Math.max(...c.map(F=>F.value)),b=d.value/f,j=()=>u?b>.7?"rgba(0, 255, 200, 0.15)":b>.4?"rgba(0, 200, 255, 0.12)":b>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",w=()=>u?b>.7?"rgba(0, 255, 200, 0.9)":b>.4?"rgba(0, 200, 255, 0.85)":b>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",_=()=>u?b>.7?"rgba(0, 255, 200, 0.4)":b>.4?"rgba(0, 200, 255, 0.35)":b>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",S=()=>u?b>.7?"rgba(0, 255, 220, 1)":b>.4?"rgba(100, 220, 255, 1)":b>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",z=a?h*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:F=>{if(F.stopPropagation(),s){const E=F.clientX,P=F.clientY,ee=d.width/2,D=d.height/2;s(d.vm,{cellX:E,cellY:P,cellWidth:d.width,cellHeight:d.height,cellTop:P-D,cellBottom:P+D,cellLeft:E-ee,cellRight:E+ee})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${z}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Ie(g)}`}),u&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:_(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:v?1:.6}}),u&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:w(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:j(),stroke:w(),strokeWidth:v?2:1,rx:4,ry:4,style:{filter:v?`drop-shadow(0 0 12px ${_()}) drop-shadow(0 0 4px ${w()})`:`drop-shadow(0 0 3px ${_()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:w(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:w(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:w(),opacity:.8,className:"energy-dot"})]}),u&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),y&&!k&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:S(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${_()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),k&&(()=>{const F=d.width,E=d.height,P=Math.min(16,Math.max(9,Math.min(F/8,E/5))),ee=Math.min(12,Math.max(8,Math.min(F/10,E/7))),D=Math.min(10,Math.max(7,Math.min(F/12,E/8))),I=Math.floor((F-8)/(P*.6)),q=d.vm.name.length>I?d.vm.name.slice(0,Math.max(1,I-1))+"…":d.vm.name,A=P+(x?ee+2:0)+(m?D+2:0),H=(E-A)/2+P/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:F/2,y:H,textAnchor:"middle",dominantBaseline:"middle",fill:S(),fontSize:P,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${_()}`:"none",filter:u?`drop-shadow(0 0 2px ${_()})`:"none"},children:q}),x&&r.jsx("text",{x:F/2,y:H+P*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:ee,fontFamily:"var(--font-mono)",children:Ie(g)}),m&&r.jsxs("text",{x:F/2,y:H+P*.8+(x?ee*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:S(),fontSize:D,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${_()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function zy({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=Me(),o=p.useRef(null),[i,l]=p.useState({width:0,height:0}),[c,d]=p.useState(!0),[h,g]=p.useState(null);p.useEffect(()=>{const v=()=>{if(o.current){const k=o.current.getBoundingClientRect();l({width:k.width,height:k.height})}};v();const y=new ResizeObserver(v);return o.current&&y.observe(o.current),()=>y.disconnect()},[]),p.useEffect(()=>{if(c&&e.length>0){const v=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(v)}},[c,e.length]);const u=p.useMemo(()=>e.map(v=>{var y;return{vm:v,value:((y=v.disk)==null?void 0:y.total_bytes)||0}}).filter(v=>v.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Ie(e.reduce((v,y)=>{var k;return v+(((k=y.disk)==null?void 0:k.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>g(null),children:i.width>0&&i.height>0&&r.jsx(My,{data:u,width:i.width,height:i.height,isInitialLoad:c,onVMClick:(v,y)=>g({vm:v,position:y})})}),h&&r.jsx(Cy,{vm:h.vm,position:h.position,onClose:()=>g(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function $y({storage:e,position:t,sourcePos:n,onClose:a,onManage:s}){const{t:o}=Me();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,l=n||{x:t.x-20,y:t.y+50},c={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:l.x,y1:l.y,x2:c.x,y2:c.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:c.x,cy:c.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((d,h)=>r.jsx("span",{className:"tooltip-label",children:d},h))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.used"),":"]}),r.jsx("span",{children:Ie(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.total"),":"]}),r.jsx("span",{children:Ie(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.usage"),":"]}),r.jsx("span",{className:`text-${_e(i)}`,children:ct(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((d,h)=>r.jsx("span",{className:"tooltip-label node",children:d},h))})]})]}),s&&r.jsx("div",{className:"tooltip-actions",children:r.jsxs("button",{className:"tooltip-action-btn",onClick:d=>{d.stopPropagation(),s(e)},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),r.jsx("span",{children:o("storage.manage")})]})})]})]})}function Ey({cluster:e,clusters:t}){const{t:n,language:a}=Me(),[s,o]=p.useState(()=>{if(typeof window>"u")return"tanks";const I=window.location.pathname.split("/").filter(Boolean)[1];return I==="treemap"||I==="tanks"?I:"tanks"});p.useEffect(()=>{if(typeof window>"u")return;const I=window.location.pathname.split("/").filter(Boolean);if(I[0]!=="storage"||I.length>=4)return;const q=`/storage/${s}`;window.location.pathname!==q&&window.history.replaceState(null,"",q)},[s]),p.useEffect(()=>{const I=()=>{const q=window.location.pathname.split("/").filter(Boolean);if(q[0]!=="storage"||q.length>=4)return;const A=q[1];(A==="tanks"||A==="treemap")&&o(A)};return window.addEventListener("popstate",I),()=>window.removeEventListener("popstate",I)},[]);const[i,l]=p.useState("all"),[c,d]=p.useState(""),[h,g]=p.useState(null),[u,v]=p.useState(null),[y,k]=p.useState(null),[x,m]=p.useState(null),[f,b]=p.useState(null),j=p.useCallback(I=>{let q=(e==null?void 0:e.id)||"",A="";if(I.isShared)A=I.connectedNodes[0]||"";else{const U=I.nodeInstances.find(X=>X.active)||I.nodeInstances[0];A=(U==null?void 0:U.node)||""}if(!q&&t){for(const[U,X]of Object.entries(t))if(X.nodes&&X.nodes[A]){q=U;break}}if(!q||!A)return;const H=`/storage/${encodeURIComponent(q)}/${encodeURIComponent(A)}/${encodeURIComponent(I.name)}`;window.history.pushState(null,"",H),window.dispatchEvent(new PopStateEvent("popstate")),v(null),k(null),m(null),b(null)},[e,t]),w=p.useCallback((I,q)=>{I.preventDefault(),I.stopPropagation();const A=Math.min(I.clientX,window.innerWidth-180),H=Math.min(I.clientY,window.innerHeight-80);b({x:A,y:H,storage:q})},[]),_=!e&&t&&Object.keys(t).length>0,S=p.useMemo(()=>{const I=[],q=(A,H)=>{Object.values(A.vms).forEach(U=>{var X;(X=U.disk)!=null&&X.total_bytes&&U.disk.total_bytes>0&&!U.template&&I.push({...U,clusterName:H})})};return _?Object.entries(t).forEach(([A,H])=>{q(H,H.name||A)}):e&&q(e,e.name||""),I.sort((A,H)=>{var U,X;return(((U=H.disk)==null?void 0:U.total_bytes)||0)-(((X=A.disk)==null?void 0:X.total_bytes)||0)})},[e,t,_]),{sharedStorages:z,localStoragesByNode:R,allNodes:F,totals:E,warnings:P}=p.useMemo(()=>{const I=new Map;let q=0,A=0,H=0;const U=new Set,X=G=>{Object.values(G.storages).forEach(ue=>{U.add(ue.node);const ke=ue.storage;I.has(ke)||I.set(ke,{name:ue.storage,type:ue.type,content:ue.content,allowedNodes:ue.allowed_nodes||[],nodes:[]}),I.get(ke).nodes.push({node:ue.node,totalBytes:ue.disk.total_bytes,usedBytes:ue.disk.used_bytes,active:ue.enabled!==!1})})};_?Object.values(t).forEach(G=>X(G)):e&&X(e);const Q=[],M={};U.forEach(G=>{M[G]=[]}),I.forEach(G=>{const ue=Sy.includes(G.type),ke=G.nodes[0].totalBytes,te=G.nodes.length>1&&ke>0&&G.nodes.every(J=>Math.abs(J.totalBytes-ke)/ke<.01);if(ue||te){const J=G.nodes[0],L=G.allowedNodes.length>0?G.allowedNodes:G.nodes.map(C=>C.node);Q.push({name:G.name,type:G.type,content:G.content,isShared:!0,totalBytes:J.totalBytes,usedBytes:J.usedBytes,connectedNodes:L,nodeInstances:G.nodes})}else G.nodes.forEach(J=>{M[J.node]||(M[J.node]=[]),M[J.node].push({name:G.name,type:G.type,content:G.content,isShared:!1,totalBytes:J.totalBytes,usedBytes:J.usedBytes,connectedNodes:[],nodeInstances:[J]})})});const ge=G=>{if(i==="local"&&G.isShared||i==="shared"&&!G.isShared)return!1;if(c){const ue=c.toLowerCase();if(!G.name.toLowerCase().includes(ue)&&!G.type.toLowerCase().includes(ue))return!1}return!0},je=Q.filter(ge).sort((G,ue)=>G.name.localeCompare(ue.name)),Oe={};return Object.entries(M).forEach(([G,ue])=>{const ke=ue.filter(ge).sort((te,J)=>te.name.localeCompare(J.name));ke.length>0&&(Oe[G]=ke)}),je.forEach(G=>{(G.totalBytes>0?G.usedBytes/G.totalBytes*100:0)>=85&&H++,q+=G.usedBytes,A+=G.totalBytes}),Object.values(Oe).flat().forEach(G=>{(G.totalBytes>0?G.usedBytes/G.totalBytes*100:0)>=85&&H++,q+=G.usedBytes,A+=G.totalBytes}),{sharedStorages:je,localStoragesByNode:Oe,allNodes:Array.from(U).sort(),totals:{totalUsed:q,totalCapacity:A},warnings:H}},[e,t,_,i,c]),ee=(I,q)=>{if(u&&u.name===I.name&&u.isShared===I.isShared){v(null),k(null),m(null);return}const A=q.getBoundingClientRect(),H=240,U=200,X=A.top+A.height/2;let Q=A.right+30,M=!1;Q+H>window.innerWidth&&(Q=A.left-H-30,M=!0);let ge=A.top;ge+U>window.innerHeight&&(ge=window.innerHeight-U-10),ge<10&&(ge=10),v(I),k({x:Q,y:ge}),m({x:M?A.left:A.right,y:X})};if(!e&&!_)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const D=E.totalCapacity>0?E.totalUsed/E.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:z.length+Object.values(R).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:z.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(R).flat().length})}),P>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",P," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:c,onChange:I=>d(I.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>l("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>l("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>l("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(_y,{percent:D,usedBytes:E.totalUsed,totalBytes:E.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx(zy,{vmDiskData:S,totals:E,storages:[...z.map(I=>I.name),...Object.values(R).flat().map(I=>I.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&z.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n(z.length>1?"storage.storages_plural":"storage.storages_count",{n:z.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:z.map((I,q)=>r.jsx("div",{onClick:A=>ee(I,A.currentTarget),onContextMenu:A=>w(A,I),style:{cursor:"pointer"},children:r.jsx(Yp,{name:I.name,usedBytes:I.usedBytes,totalBytes:I.totalBytes,type:I.type,isShared:!0,connectedNodes:I.connectedNodes,width:140,height:220,animationDelay:q*80})},I.name))})]}),(i==="all"||i==="local")&&Object.keys(R).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(R).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(R).flat().length})," ",n(Object.keys(R).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(R).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let I=z.length;return Object.entries(R).sort(([q],[A])=>q.localeCompare(A)).flatMap(([q,A])=>A.map(H=>{const U=H.nodeInstances[0],X=I++;return r.jsx("div",{onClick:Q=>ee(H,Q.currentTarget),onContextMenu:Q=>w(Q,H),style:{cursor:"pointer"},children:r.jsx(Yp,{name:H.name,usedBytes:U.usedBytes,totalBytes:U.totalBytes,type:H.type,isShared:!1,nodeName:q,isOffline:!U.active,width:120,height:200,animationDelay:X*80})},`${q}-${H.name}`)}))})()})]}),z.length===0&&Object.keys(R).length===0&&r.jsx("div",{className:"no-storage",children:c?r.jsxs("span",{children:[n("error.no_data"),': "',c,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx($y,{storage:u,position:y,sourcePos:x,onClose:()=>{v(null),k(null),m(null)},onManage:j}),f&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"storage-ctx-shield",onClick:()=>b(null),onContextMenu:I=>{I.preventDefault(),b(null)}}),r.jsx("div",{className:"storage-ctx-menu",style:{left:f.x,top:f.y},onClick:I=>I.stopPropagation(),children:r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{j(f.storage),b(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]}),r.jsx("span",{children:n("storage.content")})]})})]}),r.jsx("style",{children:`
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
      `})]})}const Ty=["backup","iso","vztmpl","snippets","import","images","rootdir"],Py=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function Ry({clusterId:e,node:t,storageName:n,clusters:a}){var Se,De;const{t:s,language:o}=Me(),i=Kr(),l=Cs(),c=p.useMemo(()=>{var we,Ce;const V=a==null?void 0:a[e];if(!V)return null;const oe=V.storages||{};let ne=oe[`${t}/${n}`]||oe[n];if(!ne){for(const Ae of Object.values(oe))if(Ae&&Ae.storage===n){ne=Ae;break}}return ne?{clusterName:V.name||e,type:ne.type||"",content:ne.content||[],total:((we=ne.disk)==null?void 0:we.total_bytes)||0,used:((Ce=ne.disk)==null?void 0:Ce.used_bytes)||0,shared:!!ne.shared}:null},[a,e,n,t]),d=c?Py.has(c.type):!1,h=((Se=l.user)==null?void 0:Se.role_global)==="operator"||((De=l.user)==null?void 0:De.role_global)==="admin"||!l.authEnforced,g=p.useMemo(()=>{if(!c)return[];const V=new Set(c.content);return Ty.filter(oe=>V.has(oe))},[c]),[u,v]=p.useState(null);p.useEffect(()=>{u&&g.includes(u)||g.length>0&&v(g[0])},[g,u]);const[y,k]=p.useState([]),[x,m]=p.useState(!1),[f,b]=p.useState(null),[j,w]=p.useState(0),[_,S]=p.useState(!1),[z,R]=p.useState(null),[F,E]=p.useState(0),[P,ee]=p.useState(!1),[D,I]=p.useState(null),[q,A]=p.useState(!1),[H,U]=p.useState(""),[X,Q]=p.useState(""),[M,ge]=p.useState(""),[je,Oe]=p.useState(""),[G,ue]=p.useState(!0),[ke,te]=p.useState(!1),[J,L]=p.useState(null),[C,Y]=p.useState(""),[re,be]=p.useState("ctime"),[W,ce]=p.useState("desc"),me=V=>{re===V?ce(oe=>oe==="asc"?"desc":"asc"):(be(V),ce(V==="name"||V==="format"||V==="notes"?"asc":"desc")),ye(!0),setTimeout(()=>ye(!1),600)},[pe,ye]=p.useState(!1);p.useEffect(()=>{if(!u)return;let V=!1;m(!0),b(null);const oe=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content?type=${u}`;return fetch(oe,{credentials:"same-origin"}).then(async ne=>{if(!ne.ok){const Ce=await ne.text().catch(()=>"");throw new Error(`HTTP ${ne.status}: ${Ce.slice(0,200)}`)}const we=await ne.json();V||k(Array.isArray(we.items)?we.items:[])}).catch(ne=>{V||b(String((ne==null?void 0:ne.message)||ne))}).finally(()=>{V||m(!1)}),()=>{V=!0}},[u,j,e,t,n]);const Fe=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},Je=async V=>{if(!(!h||d||!await i.confirm(o==="zh-TW"?`確定要刪除「${Kn(V.volid)}」？此操作無法復原。`:`Delete "${Kn(V.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const ne=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content/`+encodeURIComponent(V.volid),we=await fetch(ne,{method:"DELETE",credentials:"same-origin"});if(!we.ok){const Ce=await we.text().catch(()=>"");throw new Error(`HTTP ${we.status}: ${Ce.slice(0,200)}`)}k(Ce=>Ce.filter(Ae=>Ae.volid!==V.volid)),w(Ce=>Ce+1)}catch(ne){await i.alert(o==="zh-TW"?`刪除失敗：${ne}`:`Delete failed: ${ne}`,{title:o==="zh-TW"?"錯誤":"Error"})}},Ye=p.useMemo(()=>{let V=y;const oe=C.trim().toLowerCase();return oe&&(V=y.filter(we=>Kn(we.volid).toLowerCase().includes(oe)||(we.format||"").toLowerCase().includes(oe)||(we.notes||"").toLowerCase().includes(oe))),V.slice().sort((we,Ce)=>{let Ae=0;switch(re){case"name":Ae=Kn(we.volid).localeCompare(Kn(Ce.volid));break;case"ctime":Ae=(we.ctime||0)-(Ce.ctime||0);break;case"format":Ae=(we.format||"").localeCompare(Ce.format||"");break;case"size":Ae=(we.size||0)-(Ce.size||0);break;case"vmid":Ae=(we.vmid??-1)-(Ce.vmid??-1);break;case"notes":Ae=(we.notes||"").localeCompare(Ce.notes||"");break}return W==="asc"?Ae:-Ae})},[y,C,re,W]),Xe=V=>re===V?W==="asc"?"▲":"▼":"";if(!c)return r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const fe=c.total>0?c.used/c.total*100:0;return r.jsxs("div",{className:"storage-detail",children:[r.jsxs("div",{className:"storage-detail-header",children:[r.jsxs("button",{className:"back-btn",onClick:Fe,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M15 18l-6-6 6-6"})}),r.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),r.jsxs("div",{className:"storage-detail-title",children:[r.jsx("span",{className:"breadcrumb",children:c.clusterName}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb",children:t}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("h1",{className:"storage-name font-display",children:n}),r.jsx("span",{className:`storage-type-badge ${d?"block":"file"}`,children:c.type.toUpperCase()}),c.shared&&r.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),r.jsxs("div",{className:"storage-detail-stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.used")}),r.jsxs("span",{className:`stat-val text-${_e(fe)}`,children:[Ie(c.used)," / ",Ie(c.total)]})]}),r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.usage")}),r.jsx("span",{className:`stat-val text-${_e(fe)}`,children:ct(fe,1)})]})]})]}),r.jsx("div",{className:"storage-detail-tabs",children:g.length===0?r.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):g.map(V=>r.jsxs("button",{className:`storage-tab tab-${V} ${u===V?"active":""}`,onClick:()=>v(V),children:[r.jsx("span",{className:"tab-icon","aria-hidden":!0,children:Iy(V)}),r.jsx("span",{children:Qi(V,o)})]},V))}),r.jsxs("div",{className:"storage-detail-toolbar",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:C,onChange:V=>Y(V.target.value)})]}),!d&&h&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"action-btn",onClick:()=>S(!0),title:o==="zh-TW"?"從本機上傳檔案到此儲存":"Upload a local file to this storage",children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),r.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),r.jsxs("button",{className:"action-btn",onClick:()=>A(!0),title:o==="zh-TW"?"伺服器端從 URL 下載到此儲存（PVE download-url）":"Server-side download to this storage (PVE download-url)",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"})]}),r.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),d&&r.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),r.jsxs("button",{className:"action-btn ghost",onClick:()=>w(V=>V+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),r.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),r.jsxs("div",{className:"storage-detail-list",children:[r.jsx("div",{className:"tab-scan-line"}),x&&y.length===0&&r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),f&&r.jsx("div",{className:"storage-detail-error",children:r.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",f]})}),!x&&!f&&Ye.length===0&&r.jsx("div",{className:"storage-detail-empty",children:r.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),Ye.length>0&&r.jsxs("table",{className:"storage-content-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:`sortable ${re==="name"?"sorted":""}`,onClick:()=>me("name"),children:r.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",Xe("name")&&r.jsx("span",{className:"sort-indicator",children:Xe("name")})]})}),r.jsx("th",{className:`sortable ${re==="ctime"?"sorted":""}`,onClick:()=>me("ctime"),children:r.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",Xe("ctime")&&r.jsx("span",{className:"sort-indicator",children:Xe("ctime")})]})}),r.jsx("th",{className:`sortable ${re==="format"?"sorted":""}`,onClick:()=>me("format"),children:r.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",Xe("format")&&r.jsx("span",{className:"sort-indicator",children:Xe("format")})]})}),r.jsx("th",{className:`num sortable ${re==="size"?"sorted":""}`,onClick:()=>me("size"),children:r.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",Xe("size")&&r.jsx("span",{className:"sort-indicator",children:Xe("size")})]})}),u==="backup"&&r.jsx("th",{className:`num sortable ${re==="vmid"?"sorted":""}`,onClick:()=>me("vmid"),children:r.jsxs("span",{children:["VMID",Xe("vmid")&&r.jsx("span",{className:"sort-indicator",children:Xe("vmid")})]})}),u==="backup"&&r.jsx("th",{className:`sortable ${re==="notes"?"sorted":""}`,onClick:()=>me("notes"),children:r.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",Xe("notes")&&r.jsx("span",{className:"sort-indicator",children:Xe("notes")})]})}),!d&&h&&r.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:Ye.map(V=>{const oe=qf(V.format),ne=Ly(V.size);return r.jsxs("tr",{className:pe?"sort-animating":"",children:[r.jsxs("td",{className:"name-cell",title:V.volid,children:[r.jsx("span",{className:"file-icon","aria-hidden":!0,children:Ay(V.format)}),r.jsx("span",{className:"file-name",children:Kn(V.volid)})]}),r.jsx("td",{className:"date-cell",children:V.ctime?Oy(V.ctime):"—"}),r.jsx("td",{children:V.format?r.jsx("span",{className:`format-badge ${oe}`,children:V.format}):r.jsx("span",{className:"muted",children:"—"})}),r.jsx("td",{className:`num size-${ne}`,children:V.size?Ie(V.size):"—"}),u==="backup"&&r.jsx("td",{className:"num",children:V.vmid!=null?r.jsxs("span",{className:"vmid-badge",children:["#",V.vmid]}):r.jsx("span",{className:"muted",children:"—"})}),u==="backup"&&r.jsx("td",{className:"notes-cell",title:V.notes||"",children:V.notes||r.jsx("span",{className:"muted",children:"—"})}),!d&&r.jsxs("td",{className:"actions",children:[r.jsx("a",{className:"action-btn-row",href:`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download/`+encodeURIComponent(V.volid),download:!0,title:o==="zh-TW"?"下載到本機（SSH 串流）":"Download to local (SSH stream)",onClick:we=>we.stopPropagation(),children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),h&&r.jsx("button",{className:"action-btn-row danger",onClick:()=>Je(V),title:o==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"}),r.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]})})]})]},V.volid)})})]})]},u||"none"),_&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!P&&S(!1),onDragOver:V=>V.preventDefault(),onDrop:V=>{var ne;if(V.preventDefault(),P)return;const oe=(ne=V.dataTransfer.files)==null?void 0:ne[0];oe&&R(oe)},children:r.jsxs("div",{className:"url-dl-frame",onClick:V=>V.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsxs("span",{children:[o==="zh-TW"?"上傳到 ":"Upload to ",n]}),r.jsx("button",{className:"url-dl-close",onClick:()=>!P&&S(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`將檔案上傳到此儲存區的 ${Qi(u||"iso",o)} 分類。可拖曳檔案到此視窗。`:`Upload a file to this storage's ${Qi(u||"iso",o)} category. You can also drag-drop into this window.`}),r.jsx("label",{children:o==="zh-TW"?"檔案":"File"}),r.jsx("input",{type:"file",disabled:P,onChange:V=>{var oe;return R(((oe=V.target.files)==null?void 0:oe[0])||null)},style:{width:"100%",padding:"8px",background:"#02050b",border:"1px solid var(--border)",borderRadius:4,color:"var(--text-primary)",fontFamily:"var(--font-mono)",fontSize:13}}),z&&r.jsxs("div",{className:"url-dl-lead",style:{marginTop:8},children:[r.jsx("code",{children:z.name})," · ",r.jsxs("span",{children:[(z.size/(1024*1024)).toFixed(1)," MB"]})]}),P&&r.jsxs("div",{style:{marginTop:12},children:[r.jsx("div",{style:{height:6,background:"#02050b",borderRadius:3,border:"1px solid var(--border)",overflow:"hidden"},children:r.jsx("div",{style:{width:`${F}%`,height:"100%",background:"linear-gradient(90deg, var(--primary), #00b4ff)",transition:"width 0.2s ease",boxShadow:"0 0 8px rgba(0,240,255,0.5)"}})}),r.jsxs("div",{style:{marginTop:6,fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)"},children:[F.toFixed(1),"%"," ",o==="zh-TW"?"上傳中…":"Uploading…"]})]}),D&&r.jsx("div",{className:"url-dl-err",children:D})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!P&&S(!1),disabled:P,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:P||!z||!u,onClick:()=>{if(!z||!u)return;ee(!0),I(null),E(0);const V=new FormData;V.append("content",u),V.append("filename",z,z.name);const oe=new XMLHttpRequest;oe.upload.onprogress=ne=>{ne.lengthComputable&&E(ne.loaded/ne.total*100)},oe.onload=()=>{ee(!1),oe.status>=200&&oe.status<300?(S(!1),R(null),E(0),w(ne=>ne+1),i.alert(o==="zh-TW"?"上傳完成。檔案已派送到 PVE。":"Upload complete. File dispatched to PVE.",{title:o==="zh-TW"?"完成":"Done"})):I(`HTTP ${oe.status}: ${oe.responseText.slice(0,200)}`)},oe.onerror=()=>{ee(!1),I(o==="zh-TW"?"網路錯誤":"Network error")},oe.open("POST",`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/upload`),oe.withCredentials=!0,oe.send(V)},children:P?o==="zh-TW"?"上傳中…":"Uploading…":o==="zh-TW"?"開始上傳":"Upload"})]})]})}),q&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!ke&&A(!1),children:r.jsxs("div",{className:"url-dl-frame",onClick:V=>V.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsx("span",{children:o==="zh-TW"?"從網址下載":"Download from URL"}),r.jsx("button",{className:"url-dl-close",onClick:()=>!ke&&A(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`PVE 端伺服器會直接從這個網址抓檔到 ${n}，你的網路頻寬不會經手。`:`The PVE host will pull the file directly into ${n}; your bandwidth never carries it.`}),r.jsx("label",{children:o==="zh-TW"?"網址 (URL)":"URL"}),r.jsx("input",{type:"text",value:H,onChange:V=>U(V.target.value),placeholder:"https://example.com/debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"檔名（儲存後）":"Filename (as stored)"}),r.jsx("input",{type:"text",value:X,onChange:V=>Q(V.target.value),placeholder:"debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"校驗 (選填)":"Checksum (optional)"}),r.jsxs("div",{className:"url-dl-row",children:[r.jsxs("select",{value:je,onChange:V=>Oe(V.target.value),className:"url-dl-algo",children:[r.jsx("option",{value:"",children:o==="zh-TW"?"— 演算法 —":"— algorithm —"}),r.jsx("option",{value:"sha256",children:"sha256"}),r.jsx("option",{value:"sha512",children:"sha512"}),r.jsx("option",{value:"md5",children:"md5"})]}),r.jsx("input",{type:"text",value:M,onChange:V=>ge(V.target.value),placeholder:o==="zh-TW"?"十六進位摘要":"hex digest",spellCheck:!1,autoComplete:"off"})]}),r.jsxs("label",{className:"url-dl-check",children:[r.jsx("input",{type:"checkbox",checked:G,onChange:V=>ue(V.target.checked)}),r.jsx("span",{children:o==="zh-TW"?"驗證來源 TLS 憑證（建議開啟）":"Verify source TLS certificate (recommended)"})]}),J&&r.jsx("div",{className:"url-dl-err",children:J})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!ke&&A(!1),disabled:ke,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:ke||!H||!X||!u,onClick:async()=>{if(u){te(!0),L(null);try{const V=await fetch(`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download-url`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:H,filename:X,content:u,checksum:M||void 0,checksum_algorithm:je||void 0,verify_certificates:G})});if(!V.ok){const oe=await V.text().catch(()=>"");throw new Error(`HTTP ${V.status}: ${oe.slice(0,200)}`)}A(!1),U(""),Q(""),ge(""),Oe(""),setTimeout(()=>w(oe=>oe+1),1e3),await i.alert(o==="zh-TW"?"下載任務已派送。完成後檔案會出現在清單。":"Download task dispatched. The file will appear in the list when finished.",{title:o==="zh-TW"?"已派送":"Dispatched"})}catch(V){L(String(V instanceof Error?V.message:V))}finally{te(!1)}}},children:ke?o==="zh-TW"?"派送中…":"Dispatching…":o==="zh-TW"?"開始下載":"Start download"})]})]})}),r.jsx("style",{children:`
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
      `})]})}function Kn(e){const t=e.indexOf("/");if(t>=0)return e.slice(t+1);const n=e.indexOf(":");return n>=0?e.slice(n+1):e}function Iy(e){switch(e){case"backup":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function Qi(e,t){return t==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[e]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[e]}function qf(e){if(!e)return"fmt-other";const t=e.toLowerCase();return t==="iso"||t==="img"?"fmt-iso":t.startsWith("vma")||t==="pbs-vm"||t==="pbs-ct"?"fmt-backup":t.startsWith("tar")?"fmt-tmpl":t==="qcow2"||t==="raw"||t==="vmdk"||t==="subvol"?"fmt-disk":t==="snippet"||t==="yaml"||t==="yml"||t==="sh"?"fmt-snippet":t==="ovf"||t==="ova"||t==="vmx"?"fmt-import":"fmt-other"}function Ly(e){if(!e)return"tiny";const t=e/(1024*1024);return t<50?"tiny":t<1024?"small":t<5120?"medium":t<20480?"large":"huge"}function Ay(e,t){const n=qf(e),a=n==="fmt-iso"?"#00b4ff":n==="fmt-backup"?"#ffa500":n==="fmt-tmpl"?"#b464ff":n==="fmt-disk"?"#00f0c8":n==="fmt-snippet"?"#a0c864":n==="fmt-import"?"#ff64b4":"var(--text-muted)";return n==="fmt-iso"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):n==="fmt-backup"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):n==="fmt-tmpl"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]}):n==="fmt-disk"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):n==="fmt-snippet"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]}):n==="fmt-import"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function Oy(e,t){const n=new Date(e*1e3),a=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${a(n.getMonth()+1)}-${a(n.getDate())} ${a(n.getHours())}:${a(n.getMinutes())}`}function Gp(){if(typeof window>"u")return null;const e=window.location.pathname.split("/").filter(Boolean);return e.length<4||e[0]!=="storage"?null:{clusterId:decodeURIComponent(e[1]),node:decodeURIComponent(e[2]),storage:decodeURIComponent(e[3])}}function Fy({cluster:e,clusters:t}){const[n,a]=p.useState(()=>Gp());if(p.useEffect(()=>{const s=()=>a(Gp());return window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)},[]),n){const s=t||(e?{[e.id]:e}:null);return r.jsx(Ry,{clusterId:n.clusterId,node:n.node,storageName:n.storage,clusters:s})}return r.jsx(Ey,{cluster:e,clusters:t})}function Dy(){var F;const{language:e}=Me(),t=Kr(),n=Cs(),[a,s]=p.useState([]),[o,i]=p.useState(!0),[l,c]=p.useState(null),[d,h]=p.useState(null),[g,u]=p.useState(""),[v,y]=p.useState(""),[k,x]=p.useState(!1),m=p.useCallback(async()=>{i(!0),c(null);try{const E=await fetch("/api/admin/users",{credentials:"same-origin"});if(!E.ok)throw new Error(`HTTP ${E.status}`);const P=await E.json();s(P.users||[])}catch(E){c(String(E instanceof Error?E.message:E))}finally{i(!1)}},[]);p.useEffect(()=>{m()},[m]);const f=((F=n.user)==null?void 0:F.role_global)==="admin"||!n.authEnforced,b=async()=>{if(!g.trim()||v.length<8){await t.alert(e==="zh-TW"?"使用者名稱必填，密碼至少 8 字元":"Username required, password ≥ 8 chars");return}x(!0);try{const E=await fetch("/api/admin/users",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:g,password:v})});if(!E.ok)throw new Error(`HTTP ${E.status}: ${await E.text()}`);u(""),y(""),await m()}catch(E){await t.alert(`${E}`)}finally{x(!1)}},j=async E=>{const P=await t.prompt(e==="zh-TW"?`為 ${E.username} 設定新密碼（至少 8 字元）：`:`New password for ${E.username} (≥8 chars):`,{inputType:"password"});if(!P||P.length<8)return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(E.username)}/password`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:P,must_change_pw:!0})});ee.ok?await t.alert(e==="zh-TW"?"已重設並要求下次登入時變更":"Reset; user must change on next login"):await t.alert(`HTTP ${ee.status}: ${await ee.text()}`),m()},w=async E=>{if(!E.totp_enabled||!await t.confirm(e==="zh-TW"?`清除 ${E.username} 的 2FA 註冊？`:`Clear 2FA enrolment for ${E.username}?`,{destructive:!0}))return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(E.username)}/totp/disable`,{method:"POST",credentials:"same-origin"});ee.ok||await t.alert(`HTTP ${ee.status}`),m()},_=async E=>{const P=await fetch(`/api/admin/users/${encodeURIComponent(E.username)}/enabled`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!E.enabled})});P.ok||await t.alert(`HTTP ${P.status}`),m()},S=async E=>{if(!await t.confirm(e==="zh-TW"?`永久刪除使用者 ${E.username}？`:`Permanently delete user ${E.username}?`,{destructive:!0}))return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(E.username)}`,{method:"DELETE",credentials:"same-origin"});ee.ok||await t.alert(`HTTP ${ee.status}`),m()},z=E=>{if(!E)return"—";const P=new Date(E),ee=D=>String(D).padStart(2,"0");return`${P.getFullYear()}-${ee(P.getMonth()+1)}-${ee(P.getDate())} ${ee(P.getHours())}:${ee(P.getMinutes())}`};if(!f)return r.jsxs("div",{className:"user-admin-noauth",children:[r.jsx("h2",{children:e==="zh-TW"?"需要管理員權限":"Admin role required"}),r.jsx("p",{children:e==="zh-TW"?"此頁僅限 admin 角色檢視。":"Only users with the admin role can access this page."})]});const R=p.useMemo(()=>[...a].sort((E,P)=>E.username.localeCompare(P.username)),[a]);return r.jsxs("div",{className:"user-admin",children:[r.jsxs("div",{className:"ua-header",children:[r.jsxs("h1",{className:"ua-title font-display",children:[r.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),r.jsx("circle",{cx:"9",cy:"7",r:"4"}),r.jsx("path",{d:"M23 21v-2a4 4 0 00-3-3.87"}),r.jsx("path",{d:"M16 3.13a4 4 0 010 7.75"})]}),e==="zh-TW"?"使用者管理":"User management"]}),r.jsxs("span",{className:"ua-count",children:[a.length," ",e==="zh-TW"?"位使用者":"users"]})]}),r.jsxs("div",{className:"ua-newrow",children:[r.jsx("span",{className:"ua-newlabel",children:e==="zh-TW"?"新增本機帳號":"Create local user"}),r.jsx("input",{type:"text",value:g,onChange:E=>u(E.target.value),placeholder:e==="zh-TW"?"使用者名稱":"username",spellCheck:!1,autoComplete:"off"}),r.jsx("input",{type:"password",value:v,onChange:E=>y(E.target.value),placeholder:e==="zh-TW"?"密碼（≥8 字元）":"password (≥8 chars)",autoComplete:"new-password"}),r.jsx("button",{className:"ua-btn primary",disabled:k||!g||v.length<8,onClick:b,children:k?e==="zh-TW"?"建立中…":"Creating…":e==="zh-TW"?"建立":"Create"})]}),o&&r.jsx("div",{className:"ua-loading",children:e==="zh-TW"?"載入中…":"Loading…"}),l&&r.jsx("div",{className:"ua-err",children:l}),!o&&!l&&r.jsx("div",{className:"ua-table-wrap",children:r.jsxs("table",{className:"ua-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:e==="zh-TW"?"帳號":"Username"}),r.jsx("th",{children:e==="zh-TW"?"狀態":"Status"}),r.jsx("th",{children:"2FA"}),r.jsx("th",{children:e==="zh-TW"?"角色":"Roles"}),r.jsx("th",{children:e==="zh-TW"?"上次登入":"Last login"}),r.jsx("th",{className:"actions",children:e==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:R.map(E=>r.jsxs("tr",{className:E.enabled?"":"is-disabled",children:[r.jsxs("td",{children:[r.jsx("code",{className:"ua-username",children:E.username}),E.must_change_pw&&r.jsx("span",{className:"ua-badge warn",title:e==="zh-TW"?"下次登入需變更密碼":"Must change password",children:"!"})]}),r.jsx("td",{children:r.jsx("span",{className:`ua-state-pill ${E.enabled?"on":"off"}`,children:E.enabled?e==="zh-TW"?"啟用":"Enabled":e==="zh-TW"?"停用":"Disabled"})}),r.jsx("td",{children:E.totp_enabled?r.jsx("span",{className:"ua-totp on",title:"2FA enrolled",children:"●"}):r.jsx("span",{className:"ua-totp off",title:"No 2FA",children:"○"})}),r.jsx("td",{children:r.jsx("div",{className:"ua-roles",children:E.roles.length===0?r.jsx("span",{className:"muted",children:"—"}):E.roles.map((P,ee)=>r.jsxs("span",{className:`ua-role role-${P.role}`,children:[P.role,r.jsxs("span",{className:"ua-role-scope",children:["@",P.cluster_id==="*"?"all":P.cluster_id,P.vm_pattern!=="*"&&` :${P.vm_pattern}`]})]},ee))})}),r.jsx("td",{className:"muted",children:z(E.last_login_at)}),r.jsxs("td",{className:"actions",children:[r.jsx("button",{className:"ua-icon-btn",onClick:()=>h(E),title:e==="zh-TW"?"管理角色":"Manage roles",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 20h9"}),r.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>j(E),title:e==="zh-TW"?"重設密碼":"Reset password",children:r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})})}),r.jsx("button",{className:`ua-icon-btn ${E.totp_enabled?"":"is-faded"}`,onClick:()=>w(E),disabled:!E.totp_enabled,title:e==="zh-TW"?"清除 2FA":"Clear 2FA",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"}),r.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>_(E),title:E.enabled?e==="zh-TW"?"停用":"Disable":e==="zh-TW"?"啟用":"Enable",children:E.enabled?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("polyline",{points:"9 12 11 14 15 10"})]})}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>S(E),title:e==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"})]})})]})]},E.id))})]})}),d&&r.jsx(By,{user:d,onClose:()=>{h(null),m()}}),r.jsx("style",{children:`
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
      `})]})}function By({user:e,onClose:t}){const{language:n}=Me(),a=Kr(),[s,o]=p.useState(!1),[i,l]=p.useState("*"),[c,d]=p.useState("viewer"),[h,g]=p.useState("*"),u=async()=>{o(!0);try{const y=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:i,role:c,vm_pattern:h})});if(!y.ok)throw new Error(`HTTP ${y.status}: ${await y.text()}`);t()}catch(y){await a.alert(`${y}`)}finally{o(!1)}},v=async y=>{o(!0);try{const k=new URLSearchParams({cluster_id:y.cluster_id,vm_pattern:y.vm_pattern}).toString(),x=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles?${k}`,{method:"DELETE",credentials:"same-origin"});if(!x.ok)throw new Error(`HTTP ${x.status}`);t()}catch(k){await a.alert(`${k}`)}finally{o(!1)}};return r.jsxs("div",{className:"ua-drawer-overlay",onClick:()=>!s&&t(),children:[r.jsxs("div",{className:"ua-drawer",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"ua-drawer-head",children:[r.jsxs("span",{children:[n==="zh-TW"?"管理角色":"Manage roles",": "]}),r.jsx("code",{children:e.username}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>!s&&t(),children:"×"})]}),r.jsxs("div",{className:"ua-drawer-body",children:[r.jsxs("div",{className:"ua-existing",children:[r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"現有授權":"Current grants"}),e.roles.length===0?r.jsx("div",{className:"muted",children:n==="zh-TW"?"無":"None"}):e.roles.map((y,k)=>r.jsxs("div",{className:"ua-grant-row",children:[r.jsx("span",{className:`ua-role role-${y.role}`,children:y.role}),r.jsxs("code",{className:"ua-grant-scope",children:["@",y.cluster_id,y.vm_pattern!=="*"&&` :${y.vm_pattern}`]}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>v(y),disabled:s,title:"Revoke",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"})]})})]},k))]}),r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"新增授權":"Add grant"}),r.jsxs("div",{className:"ua-grant-form",children:[r.jsx("label",{children:n==="zh-TW"?"叢集 ID（* = 全部）":"Cluster ID (* = all)"}),r.jsx("input",{type:"text",value:i,onChange:y=>l(y.target.value)}),r.jsx("label",{children:n==="zh-TW"?"角色":"Role"}),r.jsxs("select",{value:c,onChange:y=>d(y.target.value),children:[r.jsx("option",{value:"viewer",children:"viewer"}),r.jsx("option",{value:"operator",children:"operator"}),r.jsx("option",{value:"admin",children:"admin"})]}),r.jsx("label",{children:n==="zh-TW"?"VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）":"VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)"}),r.jsx("input",{type:"text",value:h,onChange:y=>g(y.target.value)}),r.jsx("button",{className:"ua-btn primary",disabled:s,onClick:u,children:s?"…":n==="zh-TW"?"授權":"Grant"})]})]})]}),r.jsx("style",{children:`
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
      `})]})}const Wy={0:"crit",1:"crit",2:"crit",3:"err",4:"warn",5:"notice",6:"info",7:"debug"},Uy=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`};function Vy({open:e,onClose:t,clusterId:n}){const{t:a}=Me(),[s,o]=p.useState([]),[i,l]=p.useState(!1),[c,d]=p.useState(null),[h,g]=p.useState(""),[u,v]=p.useState(!0),y=p.useRef(null),k=async()=>{if(n){l(!0),d(null);try{const f=await fetch(`/api/clusters/${encodeURIComponent(n)}/log?max=500`,{credentials:"same-origin"});if(!f.ok){const j=await f.json().catch(()=>({}));throw new Error(j.error||`HTTP ${f.status}`)}const b=await f.json();o(b.lines||[])}catch(f){d(f.message||String(f))}finally{l(!1)}}};p.useEffect(()=>{e&&k()},[e,n]),p.useEffect(()=>{if(!e||!u)return;const f=setInterval(k,5e3);return()=>clearInterval(f)},[e,u,n]);const x=h.trim().toLowerCase(),m=x?s.filter(f=>(f.msg||"").toLowerCase().includes(x)||(f.node||"").toLowerCase().includes(x)||(f.user||"").toLowerCase().includes(x)||(f.tag||"").toLowerCase().includes(x)):s;return e?r.jsx("div",{className:"cl-back",onClick:t,children:r.jsxs("div",{className:"cl-modal",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"cl-head",children:[r.jsxs("div",{className:"cl-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"}),r.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),r.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),r.jsx("span",{children:a("clog.title")})]}),r.jsxs("div",{className:"cl-actions",children:[r.jsx("input",{className:"cl-filter",value:h,onChange:f=>g(f.target.value),placeholder:a("clog.filter_ph")}),r.jsxs("label",{className:"cl-auto",children:[r.jsx("input",{type:"checkbox",checked:u,onChange:f=>v(f.target.checked)}),a("tasks.auto_refresh")]}),r.jsxs("button",{className:"cl-btn",onClick:k,disabled:i,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:a("tasks.refresh")})]}),r.jsx("button",{className:"cl-close",onClick:t,children:"×"})]})]}),r.jsx("div",{className:"cl-meta",children:r.jsxs("span",{children:[m.length,h&&` / ${s.length}`]})}),r.jsxs("div",{className:"cl-body",ref:y,children:[c&&r.jsx("div",{className:"cl-error",children:c}),m.length===0&&!i&&r.jsx("div",{className:"cl-empty",children:a(h?"clog.no_match":"clog.empty")}),m.map((f,b)=>r.jsxs("div",{className:`cl-row cl-pri-${Wy[f.pri??6]||"info"}`,children:[r.jsx("span",{className:"cl-time",children:Uy(f.time)}),r.jsx("span",{className:"cl-node",children:f.node||"—"}),r.jsx("span",{className:"cl-user",children:f.user||""}),r.jsx("span",{className:"cl-tag",children:f.tag||""}),r.jsx("span",{className:"cl-msg",children:f.msg||""})]},f.n??b))]}),r.jsx("style",{children:`
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
        `})]})}):null}const Hy={running:"tasks.filter.running",ok:"tasks.filter.ok",error:"tasks.filter.error"},Qf=(e,t)=>{if(!e)return"—";const a=(t??Math.floor(Date.now()/1e3))-e;if(a<0)return"—";if(a<60)return`${a}s`;if(a<3600)return`${Math.floor(a/60)}m ${a%60}s`;const s=Math.floor(a/3600),o=Math.floor(a%3600/60);return`${s}h ${o}m`},Jf=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`},Yy=()=>{if(typeof window>"u")return{vmid:"",cluster:null};const e=new URLSearchParams(window.location.search);return{vmid:e.get("vmid")||"",cluster:e.get("cluster")}};function Gy({clusters:e,selectedCluster:t}){const{t:n,language:a}=Me(),s=Kr(),o=p.useRef(Yy()),i=p.useMemo(()=>Object.keys(e),[e]),[l,c]=p.useState(()=>o.current.cluster&&e[o.current.cluster]?o.current.cluster:t&&t!=="__all__"&&e[t]?t:i[0]||"");p.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==l&&c(t)},[t]);const[d,h]=p.useState(""),[g,u]=p.useState("all"),[v,y]=p.useState(o.current.vmid),[k,x]=p.useState(""),[m,f]=p.useState([]),[b,j]=p.useState([]),[w,_]=p.useState([]),[S,z]=p.useState(!1),[R,F]=p.useState(null),[E,P]=p.useState(!0),[ee,D]=p.useState(null),[I,q]=p.useState(!1),A=p.useRef(new Set),H=p.useRef(new Map),U=p.useRef(!0),[X,Q]=p.useState(new Set),[M,ge]=p.useState(new Set),je=p.useCallback(async(G=!1)=>{if(!l)return;z(!0),F(null);const ue=new URLSearchParams;d&&ue.set("type",d),g!=="all"&&ue.set("status",g),v&&ue.set("vmid",v),k&&ue.set("user",k),ue.set("limit","300"),G&&ue.set("force","1");try{const ke=await fetch(`/api/clusters/${encodeURIComponent(l)}/tasks?`+ue.toString(),{credentials:"same-origin"});if(!ke.ok){const Y=await ke.json().catch(()=>({}));throw new Error(Y.error||`HTTP ${ke.status}`)}const te=await ke.json(),J=te.tasks||[],L=new Set,C=new Set;if(!U.current)for(const Y of J)if(!A.current.has(Y.upid))L.add(Y.upid);else{const re=H.current.get(Y.upid);re&&re!==Y._status&&C.add(Y.upid)}for(const Y of J)A.current.add(Y.upid),H.current.set(Y.upid,Y._status);A.current.size>5e3&&(A.current=new Set(J.map(Y=>Y.upid)),H.current=new Map(J.map(Y=>[Y.upid,Y._status]))),U.current=!1,f(J),j(te.types||[]),_(te.users||[]),L.size>0&&(Q(L),setTimeout(()=>Q(new Set),900)),C.size>0&&(ge(C),setTimeout(()=>ge(new Set),900))}catch(ke){F(ke.message||String(ke))}finally{z(!1)}},[l,d,g,v,k]);p.useEffect(()=>{je(!1)},[je]),p.useEffect(()=>{if(!E)return;const G=setInterval(()=>je(!0),5e3);return()=>clearInterval(G)},[E,je]);const Oe=p.useMemo(()=>m.filter(G=>G._status==="running").length,[m]);return r.jsxs("div",{className:"pt-page",children:[r.jsxs("div",{className:"pt-header",children:[r.jsxs("div",{className:"pt-title-section",children:[r.jsxs("h1",{className:"pt-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),n("tasks.title")]}),r.jsx("div",{className:"pt-sub",children:n("tasks.subtitle")})]}),r.jsxs("div",{className:"pt-actions",children:[r.jsxs("label",{className:"pt-auto",children:[r.jsx("input",{type:"checkbox",checked:E,onChange:G=>P(G.target.checked)}),n("tasks.auto_refresh")]}),r.jsxs("button",{className:"pt-btn",onClick:()=>{const G=["starttime","endtime","duration_s","type","id","node","user","status","upid"],ue=m.map(Y=>[Y.starttime?new Date(Y.starttime*1e3).toISOString():"",Y.endtime?new Date(Y.endtime*1e3).toISOString():"",Y.starttime&&Y.endtime?String(Y.endtime-Y.starttime):"",Y.type||"",Y.id||"",Y.node||"",Y.user||"",Y._status,Y.upid]),ke=Y=>/[",\n]/.test(Y)?'"'+Y.replace(/"/g,'""')+'"':Y,te=[G.join(","),...ue.map(Y=>Y.map(ke).join(","))].join(`
`),J=new Blob([te],{type:"text/csv;charset=utf-8"}),L=document.createElement("a");L.href=URL.createObjectURL(J);const C=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);L.download=`pve-tasks-${l}-${C}.csv`,document.body.appendChild(L),L.click(),L.remove(),setTimeout(()=>URL.revokeObjectURL(L.href),1e3)},disabled:m.length===0,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{children:"CSV"})]}),r.jsxs("button",{className:"pt-btn",onClick:()=>q(!0),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"}),r.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),r.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),r.jsx("span",{children:n("clog.button")})]}),r.jsxs("button",{className:"pt-btn",onClick:()=>je(!0),disabled:S,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})]})]}),r.jsx(Vy,{open:I,clusterId:l,onClose:()=>q(!1)}),r.jsxs("div",{className:"pt-filters",children:[r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:l,onChange:G=>c(G.target.value),children:i.map(G=>{var ue;return r.jsx("option",{value:G,children:((ue=e[G])==null?void 0:ue.name)||G},G)})})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.type")}),r.jsxs("select",{value:d,onChange:G=>h(G.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),b.map(G=>r.jsx("option",{value:G,children:G},G))]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.status")}),r.jsxs("select",{value:g,onChange:G=>u(G.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"running",children:n("tasks.filter.running")}),r.jsx("option",{value:"ok",children:n("tasks.filter.ok")}),r.jsx("option",{value:"error",children:n("tasks.filter.error")})]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.vmid")}),r.jsx("input",{type:"text",inputMode:"numeric",value:v,onChange:G=>y(G.target.value.replace(/[^\d]/g,"")),placeholder:"e.g. 102"})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.user")}),r.jsxs("select",{value:k,onChange:G=>x(G.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),w.map(G=>r.jsx("option",{value:G,children:G},G))]})]}),r.jsxs("span",{className:"pt-count",children:[m.length," / ",Oe?`${Oe} ${n("tasks.filter.running").toLowerCase()}`:""]})]}),R&&r.jsx("div",{className:"pt-error",children:R}),r.jsx("div",{className:"pt-tablewrap",children:r.jsxs("table",{className:"vm-table pt-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("tasks.col.starttime")}),r.jsx("th",{children:n("tasks.col.duration")}),r.jsx("th",{children:n("tasks.col.type")}),r.jsx("th",{children:n("tasks.col.target")}),r.jsx("th",{children:n("tasks.col.node")}),r.jsx("th",{children:n("tasks.col.user")}),r.jsx("th",{children:n("tasks.col.status")})]})}),r.jsxs("tbody",{children:[m.length===0&&!S&&r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"pt-empty",children:n("tasks.empty")})}),m.map(G=>{const ue=[G===ee?"pt-active":"",X.has(G.upid)?"pt-new":""].filter(Boolean).join(" "),ke=["pt-st",`pt-st-${G._status}`,M.has(G.upid)?"pt-st-pulse":""].join(" ");return r.jsxs("tr",{className:ue,onClick:()=>D(G),children:[r.jsx("td",{className:"pt-mono",children:Jf(G.starttime)}),r.jsx("td",{className:"pt-mono",children:Qf(G.starttime,G.endtime)}),r.jsx("td",{children:r.jsx("span",{className:`pt-type pt-type-${G.type}`,children:G.type})}),r.jsx("td",{className:"pt-mono",children:G.id||"—"}),r.jsx("td",{className:"pt-mono",children:G.node}),r.jsx("td",{className:"pt-mono",children:G.user||"—"}),r.jsx("td",{children:r.jsx("span",{className:ke,children:n(Hy[G._status]||"tasks.filter.all")})})]},G.upid)})]})]})}),ee&&r.jsx(Ky,{clusterId:l,task:ee,onClose:()=>D(null),onCopyUpid:async()=>{try{await navigator.clipboard.writeText(ee.upid),s.alert(a==="zh-TW"?"UPID 已複製":"UPID copied")}catch{}}}),r.jsx("style",{children:`
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
      `})]})}function Ky({clusterId:e,task:t,onClose:n,onCopyUpid:a}){const{t:s,language:o}=Me(),[i,l]=p.useState([]),[c,d]=p.useState(!0),[h,g]=p.useState(null),[u,v]=p.useState(null),y=t._status==="running";return p.useEffect(()=>{let k=!0;const x=async()=>{try{d(!0);const f=encodeURIComponent(t.upid),b=encodeURIComponent(t.node),j=encodeURIComponent(e),[w,_]=await Promise.all([fetch(`/api/clusters/${j}/nodes/${b}/tasks/${f}/log?limit=2000`,{credentials:"same-origin"}),fetch(`/api/clusters/${j}/nodes/${b}/tasks/${f}/status`,{credentials:"same-origin"})]);if(!k)return;if(w.ok){const z=((await w.json()).lines||[]).map(R=>R.t||"").filter(Boolean);l(z)}else{const S=await w.json().catch(()=>({}));throw new Error(S.error||`HTTP ${w.status}`)}_.ok&&v(await _.json())}catch(f){k&&g(f.message||String(f))}finally{k&&d(!1)}};x();const m=y?setInterval(x,2500):null;return()=>{k=!1,m&&clearInterval(m)}},[t.upid,t.node,e,y]),r.jsxs("div",{className:"pt-drawer-back",onClick:n,children:[r.jsxs("div",{className:"pt-drawer",onClick:k=>k.stopPropagation(),children:[r.jsxs("div",{className:"pt-drawer-head",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"pt-drawer-title",children:[r.jsx("span",{className:`pt-type pt-type-${t.type}`,children:t.type}),r.jsx("span",{className:"pt-mono",children:t.id||""}),r.jsx("span",{className:`pt-st pt-st-${t._status}`,children:t._status})]}),r.jsxs("div",{className:"pt-drawer-sub",children:[r.jsx("code",{className:"pt-upid",children:t.upid}),r.jsx("button",{className:"pt-btn",onClick:a,children:r.jsx("span",{children:s("tasks.copy_upid")})})]})]}),r.jsx("button",{className:"pt-drawer-close",onClick:n,"aria-label":"close",children:"×"})]}),r.jsxs("div",{className:"pt-drawer-meta",children:[r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.node")})," ",t.node]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.user")})," ",t.user||"—"]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.starttime")})," ",Jf(t.starttime)]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.duration")})," ",Qf(t.starttime,t.endtime)]})]}),r.jsxs("div",{className:"pt-drawer-log",children:[c&&i.length===0&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_loading")}),h&&r.jsx("div",{className:"pt-error",children:h}),i.length===0&&!c&&!h&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_empty")}),i.length>0&&r.jsx("pre",{children:i.join(`
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
      `})]})}const Kp={critical:0,warning:1,info:2,ok:3};function Xy({clusters:e,onNavigate:t}){const{t:n,language:a}=Me(),[s,o]=p.useState({}),[i,l]=p.useState([]),[c,d]=p.useState([]),[h,g]=p.useState(0),u=p.useCallback(async()=>{const x={},m=[],f=[],b=[];for(const[j,w]of Object.entries(e)){const _=w.name||j;b.push((async()=>{try{const S=await fetch(`/api/clusters/${encodeURIComponent(j)}/tasks?status=error&limit=200`,{credentials:"same-origin"});if(S.ok){const z=await S.json(),R=Math.floor(Date.now()/1e3)-86400;x[j]=(z.tasks||[]).filter(F=>(F.starttime||0)>R).length}}catch{}})());for(const S of Object.keys(w.nodes||{}))b.push((async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(j)}/nodes/${encodeURIComponent(S)}/certificates`,{credentials:"same-origin"});if(z.ok){const F=(await z.json()).certificates||[];let E=null;for(const P of F){const ee=P.notafter||P["notafter-formatted"];if(!ee)continue;const D=typeof ee=="number"?ee:Date.parse(String(ee))/1e3;!D||isNaN(D)||(!E||D<E.ts)&&(E={ts:D,subj:P.subject||P.filename||"cert"})}if(E){const P=Math.floor((E.ts-Date.now()/1e3)/86400);P<90&&m.push({cluster:_,clusterId:j,node:S,days:P,subject:E.subj})}}}catch{}})()),b.push((async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(j)}/nodes/${encodeURIComponent(S)}/updates`,{credentials:"same-origin"});if(z.ok){const R=await z.json();(R.count??0)>0&&f.push({cluster:_,clusterId:j,node:S,count:R.count})}}catch{}})())}await Promise.all(b),o(x),l(m),d(f),g(Date.now())},[e]);p.useEffect(()=>{u()},[u]),p.useEffect(()=>{const x=setInterval(u,6e4);return()=>clearInterval(x)},[u]);const v=p.useMemo(()=>{var m,f,b;const x=[];for(const[j,w]of Object.entries(e)){const _=w.name||j;for(const[R,F]of Object.entries(w.nodes||{})){const E=F;E.status&&E.status!=="online"&&x.push({sev:"critical",cluster:_,target:`node:${R}`,category:n("health.cat.node_down"),msg:a==="zh-TW"?`${R} 狀態 ${E.status}`:`${R} is ${E.status}`,navView:"cluster-core",navParams:{cluster:j}});const P=((m=E.cpu)==null?void 0:m.usage_percent)||0,ee=((f=E.memory)==null?void 0:f.usage_percent)||0;P>92&&x.push({sev:"warning",cluster:_,target:`node:${R}`,category:n("health.cat.high_cpu"),msg:`${R} CPU ${P.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:j}}),ee>92&&x.push({sev:"warning",cluster:_,target:`node:${R}`,category:n("health.cat.high_mem"),msg:`${R} ${a==="zh-TW"?"記憶體":"memory"} ${ee.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:j}})}for(const[R,F]of Object.entries(w.storages||{})){const E=F,P=E.usage_percent??E.used_pct??0;P>=95?x.push({sev:"critical",cluster:_,target:`storage:${R}`,category:n("health.cat.storage_full"),msg:`${E.storage||R} ${P.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:j}}):P>=85&&x.push({sev:"warning",cluster:_,target:`storage:${R}`,category:n("health.cat.storage_high"),msg:`${E.storage||R} ${P.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:j}})}const S=w.ceph;if(S){const R=(S.status||((b=S.health)==null?void 0:b.status)||"").toUpperCase();R.includes("ERR")?x.push({sev:"critical",cluster:_,target:"ceph",category:n("health.cat.ceph_err"),msg:R,navView:"ceph-constellation",navParams:{cluster:j}}):R.includes("WARN")&&x.push({sev:"warning",cluster:_,target:"ceph",category:n("health.cat.ceph_warn"),msg:R,navView:"ceph-constellation",navParams:{cluster:j}})}const z=s[j]||0;z>0&&x.push({sev:z>=10?"warning":"info",cluster:_,target:"tasks",category:n("health.cat.task_failures"),msg:a==="zh-TW"?`過去 24h 共 ${z} 筆作業失敗`:`${z} task error(s) in the last 24h`,navView:"tasks",navParams:{cluster:j}})}for(const j of i){let w="info";if(j.days<0)w="critical";else if(j.days<14)w="critical";else if(j.days<30)w="warning";else if(j.days<60)w="info";else continue;x.push({sev:w,cluster:j.cluster,target:`cert:${j.node}`,category:j.days<0?n("health.cat.cert_expired"):n("health.cat.cert_expiring"),msg:a==="zh-TW"?`${j.node}: ${j.subject} (${j.days<0?`已過期 ${Math.abs(j.days)} 天`:`${j.days} 天`})`:`${j.node}: ${j.subject} (${j.days<0?`expired ${Math.abs(j.days)}d ago`:`${j.days}d`})`,navView:"cluster-core",navParams:{cluster:j.clusterId}})}for(const j of c)x.push({sev:j.count>=50?"warning":"info",cluster:j.cluster,target:`updates:${j.node}`,category:n("health.cat.updates"),msg:a==="zh-TW"?`${j.node}: ${j.count} 個套件待更新`:`${j.node}: ${j.count} package update(s) pending`,navView:"cluster-core",navParams:{cluster:j.clusterId}});return x.sort((j,w)=>Kp[j.sev]-Kp[w.sev]),x},[e,s,i,c,a,n]),y=p.useMemo(()=>{const x={critical:0,warning:0,info:0,ok:0};for(const m of v)x[m.sev]++;return x},[v]),k=p.useMemo(()=>{let x=0,m=0,f=0,b=0,j=0,w=0,_=0;for(const S of Object.values(e)){for(const z of Object.values(S.nodes||{}))x++,z.status==="online"&&m++;for(const z of Object.values(S.vms||{}))z.type==="lxc"?(j++,z.status==="running"&&w++):(f++,z.status==="running"&&b++);_+=Object.keys(S.storages||{}).length}return{nodes:x,online:m,vms:f,running:b,cts:j,ctsRunning:w,storages:_}},[e]);return r.jsxs("div",{className:"hm-page",children:[r.jsxs("div",{className:"hm-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"hm-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),n("health.title")]}),r.jsxs("div",{className:"hm-sub",children:[n("health.subtitle"),h?` · ${n("health.updated")} ${new Date(h).toLocaleTimeString()}`:""]})]}),r.jsxs("div",{className:"hm-tally",children:[r.jsxs("span",{className:"hm-pill hm-pill-critical",children:[y.critical," ",n("health.sev.critical")]}),r.jsxs("span",{className:"hm-pill hm-pill-warning",children:[y.warning," ",n("health.sev.warning")]}),r.jsxs("span",{className:"hm-pill hm-pill-info",children:[y.info," ",n("health.sev.info")]})]})]}),r.jsxs("div",{className:"hm-stats",children:[r.jsxs("div",{className:"hm-stat",onClick:()=>t("cluster-core"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.online,r.jsxs("span",{className:"hm-stat-of",children:["/",k.nodes]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.nodes")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.running,r.jsxs("span",{className:"hm-stat-of",children:["/",k.vms]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.vms")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.ctsRunning,r.jsxs("span",{className:"hm-stat-of",children:["/",k.cts]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.cts")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("storage"),children:[r.jsx("div",{className:"hm-stat-num",children:k.storages}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.storages")})]})]}),v.length===0?r.jsxs("div",{className:"hm-empty",children:[r.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),r.jsx("div",{className:"hm-empty-title",children:n("health.empty.title")}),r.jsx("div",{className:"hm-empty-sub",children:n("health.empty.sub")})]}):r.jsx("div",{className:"hm-grid",children:v.map((x,m)=>r.jsxs("div",{className:`hm-card hm-card-${x.sev}`,onClick:()=>{var f;return x.navView&&t(x.navView,{cluster:(f=x.navParams)==null?void 0:f.cluster})},children:[r.jsxs("div",{className:"hm-card-head",children:[r.jsx("span",{className:"hm-card-sev",children:x.sev.toUpperCase()}),r.jsx("span",{className:"hm-card-cluster",children:x.cluster})]}),r.jsx("div",{className:"hm-card-cat",children:x.category}),r.jsx("div",{className:"hm-card-msg",children:x.msg})]},m))}),r.jsx("style",{children:`
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
      `})]})}const qy=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`};function Qy({clusters:e,selectedCluster:t}){const{t:n,language:a}=Me(),s=p.useMemo(()=>Object.keys(e),[e]),[o,i]=p.useState(()=>t&&t!=="__all__"&&e[t]?t:s[0]||"");p.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==o&&i(t)},[t]);const[l,c]=p.useState([]),[d,h]=p.useState(!1),[g,u]=p.useState(null),[v,y]=p.useState("all"),k=p.useCallback(async(m=!1)=>{if(o){h(!0),u(null);try{const f=await fetch(`/api/clusters/${encodeURIComponent(o)}/backup-jobs${m?"?force=1":""}`,{credentials:"same-origin"});if(!f.ok){const j=await f.json().catch(()=>({}));throw new Error(j.error||`HTTP ${f.status}`)}const b=await f.json();c(b.jobs||[])}catch(f){u(f.message||String(f))}finally{h(!1)}}},[o]);p.useEffect(()=>{k(!1)},[k]);const x=p.useMemo(()=>v==="all"?l:l.filter(m=>v==="enabled"?m.enabled:!m.enabled),[l,v]);return r.jsxs("div",{className:"bj-page",children:[r.jsxs("div",{className:"bj-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"bj-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),n("bjobs.title")]}),r.jsx("div",{className:"bj-sub",children:n("bjobs.subtitle")})]}),r.jsx("div",{className:"bj-actions",children:r.jsxs("button",{className:"bj-btn",onClick:()=>k(!0),disabled:d,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})})]}),r.jsxs("div",{className:"bj-filters",children:[r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:o,onChange:m=>i(m.target.value),children:s.map(m=>{var f;return r.jsx("option",{value:m,children:((f=e[m])==null?void 0:f.name)||m},m)})})]}),r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("bjobs.filter.enabled")}),r.jsxs("select",{value:v,onChange:m=>y(m.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"enabled",children:n("bjobs.enabled_yes")}),r.jsx("option",{value:"disabled",children:n("bjobs.enabled_no")})]})]}),r.jsxs("span",{className:"bj-count",children:[x.length," / ",l.length]})]}),g&&r.jsx("div",{className:"bj-error",children:g}),r.jsx("div",{className:"bj-tablewrap",children:r.jsxs("table",{className:"vm-table bj-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("bjobs.col.id")}),r.jsx("th",{children:n("bjobs.col.schedule")}),r.jsx("th",{children:n("bjobs.col.next_run")}),r.jsx("th",{children:n("bjobs.col.storage")}),r.jsx("th",{children:n("bjobs.col.scope")}),r.jsx("th",{children:n("bjobs.col.mode")}),r.jsx("th",{children:n("bjobs.col.enabled")}),r.jsx("th",{children:n("bjobs.col.comment")})]})}),r.jsxs("tbody",{children:[x.length===0&&!d&&r.jsx("tr",{children:r.jsx("td",{colSpan:8,className:"bj-empty",children:n("bjobs.empty")})}),x.map(m=>{const f=m.all?n("bjobs.scope_all"):m.pool?`${a==="zh-TW"?"池":"pool"}: ${m.pool}`:m.vmid?`vmid: ${m.vmid}`:"—",b=m.schedule||(m.dow&&m.starttime?`${m.dow} ${m.starttime}`:"—");return r.jsxs("tr",{children:[r.jsx("td",{className:"bj-mono",children:m.id}),r.jsx("td",{className:"bj-mono",children:b}),r.jsx("td",{className:"bj-mono",children:qy(m.next_run)}),r.jsx("td",{className:"bj-mono",children:m.storage||"—"}),r.jsx("td",{className:"bj-mono",children:f}),r.jsx("td",{children:r.jsx("span",{className:"bj-mode",children:m.mode||"snapshot"})}),r.jsx("td",{children:r.jsx("span",{className:`bj-state ${m.enabled?"on":"off"}`,children:m.enabled?n("bjobs.enabled_yes"):n("bjobs.enabled_no")})}),r.jsx("td",{className:"bj-mono bj-comment",title:m.comment||"",children:m.comment||""})]},m.id)})]})]})}),r.jsx("style",{children:`
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
      `})]})}function Jy({clusters:e,onNavigate:t}){const{t:n,language:a}=Me(),[s,o]=p.useState(!1),[i,l]=p.useState(""),[c,d]=p.useState(0),h=p.useRef(null),g=p.useRef(null);p.useEffect(()=>{const x=m=>{if((m.metaKey||m.ctrlKey)&&m.key.toLowerCase()==="k"){m.preventDefault(),o(f=>!f);return}m.key==="Escape"&&s&&o(!1)};return window.addEventListener("keydown",x),()=>window.removeEventListener("keydown",x)},[s]),p.useEffect(()=>{s?setTimeout(()=>{var x;return(x=h.current)==null?void 0:x.focus()},30):(l(""),d(0))},[s]);const u=(x,m)=>{if(!m)return 0;const f=x.toLowerCase(),b=m.toLowerCase();if(f===b)return 100;if(f.startsWith(b))return 80;if(f.indexOf(" "+b)>=0)return 70;const w=f.indexOf(b);return w>=0?50-Math.min(20,w):0},v=p.useMemo(()=>{const x=i.trim();if(!x)return[];const m=[];for(const[f,b]of Object.entries(e)){const j=b.name||f;for(const w of Object.values(b.vms||{})){const _=w.type==="lxc",S=`${w.vmid} ${w.name||""} ${w.node||""} ${j}`,z=Math.max(u(String(w.vmid),x),u(w.name||"",x),u(S,x));z>0&&m.push({kind:_?"ct":"vm",cluster:f,clusterName:j,name:`${_?"CT":"VM"} ${w.vmid} — ${w.name||"(unnamed)"}`,meta:`${j} · ${w.node||"?"} · ${w.status||"unknown"}`,score:z+(w.status==="running"?2:0),go:()=>{t("holo-matrix",{cluster:f})}})}for(const w of Object.values(b.nodes||{})){const _=Math.max(u(w.node||"",x),u(`${w.node} ${j}`,x));_>0&&m.push({kind:"node",cluster:f,clusterName:j,name:w.node,meta:`${j} · ${w.status||"?"} · ${w.vm_count||0}+${w.ct_count||0}`,score:_,go:()=>t("cluster-core",{cluster:f})})}for(const w of Object.values(b.storages||{})){const _=Math.max(u(w.storage||"",x),u(`${w.storage} ${w.node||""} ${j}`,x));_>0&&m.push({kind:"storage",cluster:f,clusterName:j,name:w.storage,meta:`${j} · ${w.node||"?"} · ${w.type||""}`,score:_,go:()=>t("storage",{cluster:f})})}}return m.sort((f,b)=>b.score-f.score),m.slice(0,30)},[i,e,t]);if(p.useEffect(()=>{d(0)},[i]),p.useEffect(()=>{const x=g.current;if(!x)return;const m=x.querySelector(`[data-idx="${c}"]`);m==null||m.scrollIntoView({block:"nearest"})},[c]),!s)return null;const y=x=>{if(x.key==="ArrowDown")x.preventDefault(),d(m=>Math.min(v.length-1,m+1));else if(x.key==="ArrowUp")x.preventDefault(),d(m=>Math.max(0,m-1));else if(x.key==="Enter"){x.preventDefault();const m=v[c];m&&(m.go(),o(!1))}},k=x=>x==="vm"||x==="ct"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),r.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}):x==="node"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]});return r.jsx("div",{className:"cp-back",onClick:()=>o(!1),children:r.jsxs("div",{className:"cp-modal",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"cp-input-row",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{ref:h,value:i,placeholder:n("cmdk.placeholder"),onChange:x=>l(x.target.value),onKeyDown:y}),r.jsx("span",{className:"cp-hint",children:"↑↓ ⏎"}),r.jsx("button",{className:"cp-x",onClick:()=>o(!1),children:"×"})]}),r.jsxs("div",{className:"cp-list",ref:g,children:[v.length===0&&i&&r.jsx("div",{className:"cp-empty",children:n("cmdk.empty")}),v.length===0&&!i&&r.jsx("div",{className:"cp-empty",children:n("cmdk.tip")}),v.map((x,m)=>r.jsxs("div",{"data-idx":m,className:`cp-item ${m===c?"cp-active":""}`,onClick:()=>{x.go(),o(!1)},onMouseEnter:()=>d(m),children:[r.jsx("span",{className:`cp-kind cp-kind-${x.kind}`,children:k(x.kind)}),r.jsx("span",{className:"cp-name",children:x.name}),r.jsx("span",{className:"cp-meta",children:x.meta})]},`${x.kind}:${x.cluster}:${x.name}:${m}`))]}),r.jsxs("div",{className:"cp-foot",children:[r.jsx("span",{className:"cp-foot-key",children:"⌘K"}),r.jsx("span",{children:n("cmdk.toggle")})]}),r.jsx("style",{children:`
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
        `})]})})}function Zy({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:l}){const{t:c}=Me(),[d,h]=p.useState(""),[g,u]=p.useState(!1),[v,y]=p.useState(""),k=p.useRef(null);if(p.useEffect(()=>{e&&(h(""),y(""),u(!1),setTimeout(()=>{var m;return(m=k.current)==null?void 0:m.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const m=f=>{f.key==="Escape"&&!g&&i()};return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[e,g,i]),!e)return null;const x=async()=>{if(d){u(!0),y("");try{await We.setClusterSecret(t,n,d),l()}catch(m){y(m instanceof Error?m.message:String(m)),u(!1)}}};return r.jsxs("div",{onClick:()=>!g&&i(),style:e2,children:[r.jsx("style",{children:t2}),r.jsxs("div",{className:"ssm-modal",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:k,type:"password",value:d,onChange:m=>h(m.target.value),onKeyDown:m=>{m.key==="Enter"&&x()},autoComplete:"new-password",spellCheck:!1}),v&&r.jsx("div",{className:"ssm-err",children:v}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:g,children:c("action.cancel")}),r.jsx("button",{className:"primary",onClick:x,disabled:g||!d,children:g?"…":c("action.save")})]})]})]})}const e2={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},t2=`
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
`;function r2({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=Me(),o=Kr(),[i,l]=p.useState(null),[c,d]=p.useState(!0),[h,g]=p.useState(!1),[u,v]=p.useState(null),[y,k]=p.useState(!1),[x,m]=p.useState("ui"),[f,b]=p.useState(!0),[j,w]=p.useState("cyberpunk"),[_,S]=p.useState("command-center"),[z,R]=p.useState(100),[F,E]=p.useState("all"),[P,ee]=p.useState(85),[D,I]=p.useState("vmid"),[q,A]=p.useState("node"),[H,U]=p.useState("node"),[X,Q]=p.useState("asc"),[M,ge]=p.useState({}),[je,Oe]=p.useState(!0),[G,ue]=p.useState(80),[ke,te]=p.useState(95),[J,L]=p.useState(85),[C,Y]=p.useState(95),[re,be]=p.useState(80),[W,ce]=p.useState(95),[me,pe]=p.useState(50),[ye,Fe]=p.useState(100),[Je,Ye]=p.useState(5),[Xe,fe]=p.useState(10),[Se,De]=p.useState("0.0.0.0"),[V,oe]=p.useState(8098),[ne,we]=p.useState(!1),[Ce,Ae]=p.useState(8086),[Nt,$t]=p.useState("disabled"),[le,Ue]=p.useState(null),[Te,Ge]=p.useState({}),ft=()=>{k(!0),setTimeout(()=>e(),400)};p.useEffect(()=>{or()},[]);const or=async()=>{var K,Ze,it,ht,et,dt,vt,wn,kn,jn,Nn,Xr,_n,qt,Rr,Sn,tt,qr,Qr,Jr,ze,$e,rt,Re,Ke,Qt,at,gt,_r,Dt,Ir,Jt,Zt,Vn,Et;try{d(!0);const Ne=await We.getConfig();l(Ne),b(((K=Ne.ui)==null?void 0:K.animations_enabled)??!0),w(((Ze=Ne.ui)==null?void 0:Ze.theme)??"cyberpunk"),S(((it=Ne.ui)==null?void 0:it.default_view)??"command-center"),R(((ht=Ne.ui)==null?void 0:ht.particle_count)??100),E(((et=Ne.ui)==null?void 0:et.vm_matrix_default_filter)??"all"),ee(((dt=Ne.ui)==null?void 0:dt.matrix_card_width)??85),I(((vt=Ne.ui)==null?void 0:vt.matrix_sort_by)??"vmid"),A(((wn=Ne.ui)==null?void 0:wn.matrix_group_by)??"node"),U(((kn=Ne.ui)==null?void 0:kn.matrix_group_sort_by)??"node"),Q(((jn=Ne.ui)==null?void 0:jn.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Nn=Ne.ui)==null?void 0:Nn.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Xr=Ne.ui)==null?void 0:Xr.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((_n=Ne.ui)==null?void 0:_n.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((qt=Ne.ui)==null?void 0:qt.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((Rr=Ne.ui)==null?void 0:Rr.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((Sn=Ne.ui)==null?void 0:Sn.matrix_group_sort_order)??"asc");const Hn={};(tt=Ne.clusters)==null||tt.forEach(ir=>{Hn[ir.id]={enabled:ir.enabled!==!1,poll_interval:ir.poll_interval||5,static_refresh_interval:ir.static_refresh_interval||60}}),ge(Hn),Oe(((qr=Ne.alerts)==null?void 0:qr.enabled)??!0),ue(((Qr=Ne.alerts)==null?void 0:Qr.cpu_warning)??80),te(((Jr=Ne.alerts)==null?void 0:Jr.cpu_critical)??95),L(((ze=Ne.alerts)==null?void 0:ze.memory_warning)??85),Y((($e=Ne.alerts)==null?void 0:$e.memory_critical)??95),be(((rt=Ne.alerts)==null?void 0:rt.disk_warning)??80),ce(((Re=Ne.alerts)==null?void 0:Re.disk_critical)??95),pe(((Ke=Ne.alerts)==null?void 0:Ke.diskio_warning)??50),Fe(((Qt=Ne.alerts)==null?void 0:Qt.diskio_critical)??100),Ye(((at=Ne.alerts)==null?void 0:at.iowait_warning)??5),fe(((gt=Ne.alerts)==null?void 0:gt.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((_r=Ne.alerts)==null?void 0:_r.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((Dt=Ne.alerts)==null?void 0:Dt.iowait_critical)??10)),De(((Ir=Ne.server)==null?void 0:Ir.host)??"0.0.0.0"),oe(((Jt=Ne.server)==null?void 0:Jt.http_port)??8098),we(((Zt=Ne.server)==null?void 0:Zt.influx_enabled)??!1),Ae(((Vn=Ne.server)==null?void 0:Vn.influx_port)??8086),$t(((Et=Ne.console)==null?void 0:Et.mode)||"disabled");const $s={};(Ne.clusters||[]).forEach(ir=>{$s[ir.id]=!!(ir.auth&&ir.auth.password&&ir.auth.password.length>0)}),Ge($s)}catch(Ne){v(String(Ne))}finally{d(!1)}},wt=async()=>{var K;try{g(!0),localStorage.setItem("matrix_card_width",String(P)),localStorage.setItem("matrix_sort_by",D),localStorage.setItem("matrix_group_by",q),localStorage.setItem("vm_matrix_default_filter",F),localStorage.setItem("matrix_group_sort_by",H),localStorage.setItem("matrix_group_sort_order",X),localStorage.setItem("iowait_warning",String(Je)),localStorage.setItem("iowait_critical",String(Xe));const Ze=(K=i==null?void 0:i.clusters)==null?void 0:K.map(it=>{var ht,et,dt;return{...it,enabled:((ht=M[it.id])==null?void 0:ht.enabled)!==!1,poll_interval:((et=M[it.id])==null?void 0:et.poll_interval)||it.poll_interval,static_refresh_interval:((dt=M[it.id])==null?void 0:dt.static_refresh_interval)||it.static_refresh_interval}});await We.updateConfig({server:{host:Se,http_port:V,influx_enabled:ne,influx_port:Ce},console:{mode:Nt},ui:{default_view:_,theme:j,language:a,animations_enabled:f,particle_count:z,vm_matrix_default_filter:F,matrix_card_width:P,matrix_sort_by:D,matrix_group_by:q,matrix_group_sort_by:H,matrix_group_sort_order:X},alerts:{enabled:je,cpu_warning:G,cpu_critical:ke,memory_warning:J,memory_critical:C,disk_warning:re,disk_critical:W,diskio_warning:me,diskio_critical:ye,iowait_warning:Je,iowait_critical:Xe},clusters:Ze}),e()}catch(Ze){v(String(Ze))}finally{g(!1)}},Xt=K=>{ge(Ze=>{var it;return{...Ze,[K]:{...Ze[K],enabled:!((it=Ze[K])!=null&&it.enabled)}}})},Pe=(K,Ze,it)=>{ge(ht=>({...ht,[K]:{...ht[K],[Ze]:it}}))};p.useEffect(()=>{const K=Ze=>{Ze.key==="Escape"&&!y&&ft()};return window.addEventListener("keydown",K),()=>window.removeEventListener("keydown",K)},[y]);const Nr=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${y?"exiting":""}`,onClick:K=>K.target===K.currentTarget&&!y&&ft(),children:[r.jsxs("div",{className:`settings-panel panel ${y?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:ft,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:Nr.map(K=>r.jsxs("button",{className:`settings-tab ${x===K.id?"active":""}`,onClick:()=>m(K.id),children:[K.icon,r.jsx("span",{children:n(K.labelKey)})]},K.id))}),r.jsx("div",{className:"settings-content",children:c?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):u?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:u})}):r.jsxs(r.Fragment,{children:[x==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(K=>r.jsxs("label",{className:`radio-option ${_===K.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:K.id,checked:_===K.id,onChange:()=>S(K.id)}),r.jsx("span",{className:"radio-label",children:n(K.labelKey)})]},K.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(K=>r.jsxs("label",{className:`radio-option ${F===K?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:K,checked:F===K,onChange:()=>E(K)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${K}`)})]},K))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:P,onChange:K=>ee(Number(K.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(K=>r.jsxs("label",{className:`radio-option ${D===K?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:K,checked:D===K,onChange:()=>I(K)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${K}`)})]},K))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(K=>r.jsxs("label",{className:`radio-option ${q===K?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:K,checked:q===K,onChange:()=>A(K)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${K}`)})]},K))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${H==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:H==="node",onChange:()=>U("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${H==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:H==="cluster",onChange:()=>U("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${X==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:X==="asc",onChange:()=>Q("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${X==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:X==="desc",onChange:()=>Q("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),x==="clusters"&&i&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:i.clusters.map(K=>{var et,dt;const Ze=t==null?void 0:t[K.id],it=(Ze==null?void 0:Ze.name)||K.name||K.id,ht=M[K.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${ht.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:vt=>vt.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:ht.enabled,onChange:()=>Xt(K.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${ht.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:it}),r.jsxs("span",{className:"cluster-id",children:["(",K.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ht.poll_interval,onChange:vt=>Pe(K.id,"poll_interval",Number(vt.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ht.static_refresh_interval,onChange:vt=>Pe(K.id,"static_refresh_interval",Number(vt.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((et=K.nodes)==null?void 0:et.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((dt=K.auth)==null?void 0:dt.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Te[K.id]?"set":"unset"}`,children:Te[K.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>Ue(K.id),children:Te[K.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Te[K.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(n("settings.secret_confirm_clear",{id:K.id}),{destructive:!0}))try{await We.deleteClusterSecret(K.id,"pve_password"),Ge(vt=>({...vt,[K.id]:!1}))}catch(vt){await o.alert(String(vt))}},children:n("settings.secret_clear")})]})]},K.id)})})]})}),x==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:G,onChange:K=>ue(Number(K.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ke,onChange:K=>te(Number(K.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:J,onChange:K=>L(Number(K.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:C,onChange:K=>Y(Number(K.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:re,onChange:K=>be(Number(K.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:W,onChange:K=>ce(Number(K.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:me,onChange:K=>pe(Number(K.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ye,onChange:K=>Fe(Number(K.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Je,onChange:K=>Ye(Number(K.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Xe,onChange:K=>fe(Number(K.target.value)),min:0,max:100})]})]})]})]}),x==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:Se,onChange:K=>De(K.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:V,onChange:K=>oe(Number(K.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:ne,onChange:K=>we(K.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(ne?"settings.enabled":"settings.disabled")})]}),ne&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:Ce,onChange:K=>Ae(Number(K.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(Wa,{className:"full",value:Nt,onChange:$t,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.3.12"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:ft,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:wt,disabled:h||y,children:n(h?"action.saving":"action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(Zy,{open:le!==null,cluster_id:le||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:le||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>Ue(null),onSaved:()=>{le&&Ge(K=>({...K,[le]:!0})),Ue(null)}}),r.jsx("style",{children:`
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
      `})]})}const Xp=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function n2({particleCount:e=18,enabled:t=!0,isPaused:n=!1}){const a=p.useRef(null),s=p.useRef([]),o=p.useRef(),i=p.useRef({x:0,y:0}),l=p.useRef(0),[c,d]=p.useState(()=>typeof document>"u"||document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()));p.useEffect(()=>{const u=()=>{d(document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()))};return document.addEventListener("visibilitychange",u),window.addEventListener("focus",u),window.addEventListener("blur",u),()=>{document.removeEventListener("visibilitychange",u),window.removeEventListener("focus",u),window.removeEventListener("blur",u)}},[]);const h=p.useCallback((u,v)=>{s.current=Array.from({length:e},()=>({x:Math.random()*u,y:Math.random()*v,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:Xp[Math.floor(Math.random()*Xp.length)]}))},[e]),g=p.useCallback(u=>{const v=a.current;if(!v)return;const y=u??performance.now();if(y-l.current<50){o.current=requestAnimationFrame(g);return}l.current=y;const k=v.getContext("2d");if(!k)return;const{width:x,height:m}=v;k.clearRect(0,0,x,m),s.current.forEach(f=>{const b=f.x-i.current.x,j=f.y-i.current.y,w=Math.sqrt(b*b+j*j);if(w<100){const _=(100-w)/100;f.vx+=b/w*_*.05,f.vy+=j/w*_*.05}f.x+=f.vx,f.y+=f.vy,f.vx*=.99,f.vy*=.99,f.x<0&&(f.x=x),f.x>x&&(f.x=0),f.y<0&&(f.y=m),f.y>m&&(f.y=0),f.alpha+=(Math.random()-.5)*.02,f.alpha=Math.max(.1,Math.min(.7,f.alpha)),k.beginPath(),k.arc(f.x,f.y,f.size,0,Math.PI*2),k.fillStyle=f.color,k.globalAlpha=f.alpha,k.fill()}),k.globalAlpha=1,o.current=requestAnimationFrame(g)},[]);return p.useEffect(()=>{if(!t)return;const u=a.current;if(!u)return;const v=()=>{u.width=window.innerWidth,u.height=window.innerHeight,h(u.width,u.height)},y=k=>{i.current={x:k.clientX,y:k.clientY}};return v(),window.addEventListener("resize",v),window.addEventListener("mousemove",y),()=>{window.removeEventListener("resize",v),window.removeEventListener("mousemove",y)}},[t,h]),p.useEffect(()=>{if(!t||n||!c){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return g(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,c,g]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const qp={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function Ji({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=qp[e]||qp[" "],i=t,l=t*1.8,c=t*.15,d=t*.05,h=s?t*.4:t*.15,g=[`M ${d+c} ${d} L ${i-d-c} ${d} L ${i-d-c*.3} ${c*.7+d} L ${d+c*.3} ${c*.7+d} Z`,`M ${i-d} ${d+c} L ${i-d} ${l/2-d} L ${i-d-c*.7} ${l/2-d-c*.3} L ${i-d-c*.7} ${d+c+c*.3} Z`,`M ${i-d} ${l/2+d} L ${i-d} ${l-d-c} L ${i-d-c*.7} ${l-d-c-c*.3} L ${i-d-c*.7} ${l/2+d+c*.3} Z`,`M ${d+c} ${l-d} L ${i-d-c} ${l-d} L ${i-d-c*.3} ${l-c*.7-d} L ${d+c*.3} ${l-c*.7-d} Z`,`M ${d} ${l/2+d} L ${d} ${l-d-c} L ${d+c*.7} ${l-d-c-c*.3} L ${d+c*.7} ${l/2+d+c*.3} Z`,`M ${d} ${d+c} L ${d} ${l/2-d} L ${d+c*.7} ${l/2-d-c*.3} L ${d+c*.7} ${d+c+c*.3} Z`,`M ${d+c*.5} ${l/2} L ${d+c} ${l/2-c*.4} L ${i-d-c} ${l/2-c*.4} L ${i-d-c*.5} ${l/2} L ${i-d-c} ${l/2+c*.4} L ${d+c} ${l/2+c*.4} Z`];return r.jsx("svg",{width:i,height:l,style:{display:"inline-block"},children:g.map((u,v)=>r.jsx("path",{d:u,fill:o[v]?n:a,style:{filter:o[v]?`drop-shadow(0 0 ${h}px ${n})`:"none",transition:"fill 0.03s ease-out"}},v))})}function Qp({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function Jp(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function a2(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function s2({timestamp:e,connected:t=!0}){const[n,a]=p.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=p.useState(!1),[i,l]=p.useState(!1),c=p.useRef(!1),d=p.useRef(null),h=p.useRef(null),g=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",v=n.hours==="  ",y=p.useCallback(f=>{const b=Jp(f);a(b),h.current=f},[]),k=p.useCallback(f=>{d.current&&clearInterval(d.current),l(!0),o(!0);let b=0;const j=20,w=50,_={current:f};return d.current=setInterval(()=>{if(b++,b<j)a(a2());else{d.current&&(clearInterval(d.current),d.current=null);const S=Jp(_.current);a(S),h.current=_.current,l(!1),o(!1)}},w),S=>{_.current=S}},[]),x=p.useRef(null);p.useEffect(()=>{if(e===null){c.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!c.current){c.current=!0,x.current=k(e);return}if(d.current&&x.current){x.current(e);return}h.current!==e&&y(e)},[e,k,y]),p.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const m=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:g,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:g},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((f,b)=>r.jsx(Ji,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`h${b}`)),r.jsx(Qp,{size:m,color:g,dim:v}),(n.minutes||"  ").split("").map((f,b)=>r.jsx(Ji,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`m${b}`)),r.jsx(Qp,{size:m,color:g,dim:v}),(n.seconds||"  ").split("").map((f,b)=>r.jsx(Ji,{digit:f||" ",size:m,color:g,dimColor:u,glow:i},`s${b}`))]})]})}function o2({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=p.useState(!1),i=p.useRef(null);p.useEffect(()=>{const d=h=>{i.current&&!i.current.contains(h.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),p.useEffect(()=>{const d=h=>{h.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const l=d=>{n(d),o(!1)},c=()=>{var g;if(t==="__all__")return"⊕ All";const d=e[t];return d?((g=d.summary)!=null&&g.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:c(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:c()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>l("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,h])=>{var k,x;const g=(k=h.summary)==null?void 0:k.is_standalone,u=h.name||d,v=((x=h.summary)==null?void 0:x.nodes_online)??0,y=Object.keys(h.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>l(d),children:[r.jsx("span",{className:"option-icon",children:g?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:u}),r.jsxs("span",{className:"option-meta",children:[v," nodes · ",y," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const Zp={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function i2({user:e,onLogout:t}){const{t:n}=Me(),[a,s]=p.useState(!1),o=p.useRef(null);if(p.useEffect(()=>{if(!a)return;const d=g=>{o.current&&!o.current.contains(g.target)&&s(!1)},h=g=>{g.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",h),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",h)}},[a]),!e)return null;const i=e.role_global||"guest",l=Zp[i]||Zp.guest,c=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:l,boxShadow:`0 0 6px ${l}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:l,borderColor:l},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:l,boxShadow:`0 0 6px ${l}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),c&&r.jsxs("a",{href:"/users",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚇"}),r.jsx("span",{className:"option-label",children:n("user.user_admin")})]}),c&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),c&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const Wt={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Tasks:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),Health:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),Backup:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},eu=[{view:"command-center",icon:Wt.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:Wt.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:Wt.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:Wt.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:Wt.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:Wt.Ceph,labelKey:"nav.ceph",shortcut:"C"},{view:"tasks",icon:Wt.Tasks,labelKey:"nav.tasks",shortcut:"T"},{view:"health",icon:Wt.Health,labelKey:"nav.health",shortcut:"H"},{view:"backups",icon:Wt.Backup,labelKey:"nav.backups",shortcut:"B"}],l2={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation",t:"tasks",h:"health",b:"backups"},c2={"command-center":"/","cluster-core":"/nodes","holo-matrix":"/matrix","radar-scan":"/radar","ceph-constellation":"/ceph",storage:"/storage",tasks:"/tasks",health:"/health",backups:"/backups",settings:"/settings",users:"/users"},Zi={"/":"command-center","/overview":"command-center","/nodes":"cluster-core","/matrix":"holo-matrix","/radar":"radar-scan","/ceph":"ceph-constellation","/storage":"storage","/tasks":"tasks","/health":"health","/backups":"backups","/settings":"settings","/users":"users"};function tu(){const e=(typeof window<"u"?window.location.pathname:"/")||"/",t=e!=="/"&&e.endsWith("/")?e.slice(0,-1):e;if(Zi[t])return Zi[t];const n="/"+(t.split("/").filter(Boolean)[0]||"");return Zi[n]||"command-center"}function d2(){var ee;const{t:e,language:t,setLanguage:n}=Me(),[a,s]=p.useState(()=>tu());p.useEffect(()=>{const D=c2[a];if(!D)return;const I=window.location.pathname||"/",q="/"+(I.split("/").filter(Boolean)[0]||""),A="/"+(D.split("/").filter(Boolean)[0]||"");I==="/"&&D==="/"||I!=="/"&&D!=="/"&&q===A||window.history.pushState(null,"",D)},[a]),p.useEffect(()=>{const D=()=>s(tu());return window.addEventListener("popstate",D),()=>window.removeEventListener("popstate",D)},[]);const[o,i]=p.useState({}),[l,c]=p.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,h]=p.useState(!1),g=Cs(),[u,v]=p.useState(0),[y,k]=p.useState(!1),[x,m]=p.useState(null),[f,b]=p.useState(!1),[j,w]=p.useState(!1),{connected:_,connecting:S,send:z}=zg({onMessage:p.useCallback(D=>{y||(i(D),v(Date.now()/1e3))},[y])});p.useEffect(()=>{let D=!0;const I=()=>document.visibilityState!=="hidden"&&document.hasFocus(),q=()=>{const A=I();if(A!==D){D=A,document.body.setAttribute("data-app-visible",A?"true":"false");try{A?(z({type:"resume"}),z({type:"refresh"})):z({type:"pause"})}catch{}}};return document.body.setAttribute("data-app-visible",I()?"true":"false"),document.addEventListener("visibilitychange",q),window.addEventListener("focus",q),window.addEventListener("blur",q),()=>{document.removeEventListener("visibilitychange",q),window.removeEventListener("focus",q),window.removeEventListener("blur",q)}},[z]);const R=p.useCallback(()=>{m(y?"resuming":"pausing"),setTimeout(()=>{k(D=>!D),setTimeout(()=>m(null),500)},300)},[y]),F=l==="__all__"?null:o[l]||null,E=p.useMemo(()=>{const D=Object.values(o);return{total_clusters:D.length,total_nodes:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.node_count)||0)},0),total_nodes_online:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.nodes_online)||0)},0),total_vms:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.vm_count)||0)},0),total_vms_running:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.vms_running)||0)},0),total_cts:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.ct_count)||0)},0),total_cts_running:D.reduce((I,q)=>{var A;return I+(((A=q.summary)==null?void 0:A.cts_running)||0)},0),clusters:D.map(I=>I.summary).filter(Boolean)}},[o]);p.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",l)}catch{}},[l]),p.useEffect(()=>{Object.keys(o).length>0&&l!=="__all__"&&(o[l]||c("__all__"))},[o,l]),p.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),p.useEffect(()=>{We.getConfig().then(D=>{D!=null&&D.ui&&(D.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",D.ui.vm_matrix_default_filter),D.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(D.ui.matrix_card_width)),D.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",D.ui.matrix_sort_by))}).catch(()=>{})},[]),p.useEffect(()=>{if(!f)return;const D=()=>b(!1);return document.addEventListener("click",D),()=>document.removeEventListener("click",D)},[f]),p.useEffect(()=>{if(!j)return;const D=()=>w(!1);return document.addEventListener("click",D),()=>document.removeEventListener("click",D)},[j]),p.useEffect(()=>{const D=I=>{if(I.target instanceof HTMLInputElement||I.target instanceof HTMLTextAreaElement)return;const q=I.key.toLowerCase();if(q===" "||I.code==="Space"){I.preventDefault(),R();return}if(!I.ctrlKey&&!I.metaKey&&!I.altKey){const A=l2[q];if(A){I.preventDefault(),s(A);return}}(I.ctrlKey||I.metaKey)&&q==="s"&&(I.preventDefault(),h(A=>!A))};return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[R]);const P=()=>{const D=l==="__all__";switch(a){case"command-center":return r.jsx(gp,{clusters:o,globalSummary:E,isPaused:y,onSelectCluster:I=>{c(I),s("cluster-core")}});case"cluster-core":return r.jsx(Wg,{cluster:F,clusters:D?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:I=>{c(I),s("holo-matrix")},isPaused:y});case"holo-matrix":return r.jsx(fx,{cluster:F,clusters:D?o:void 0});case"radar-scan":return r.jsx(bx,{cluster:F,clusters:D?o:void 0,isPaused:y});case"storage":return r.jsx(Fy,{cluster:F,clusters:D?o:void 0});case"ceph-constellation":return r.jsx(Rx,{cluster:F,clusters:D?o:void 0,isPaused:y});case"users":return r.jsx(Dy,{});case"tasks":return r.jsx(Gy,{clusters:o,selectedCluster:l});case"health":return r.jsx(Xy,{clusters:o,onNavigate:(I,q)=>{q!=null&&q.cluster&&c(q.cluster),s(I)}});case"backups":return r.jsx(Qy,{clusters:o,selectedCluster:l});default:return r.jsx(gp,{clusters:o,globalSummary:E,isPaused:y,onSelectCluster:I=>{c(I),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${y?"animations-paused":""}`,children:[r.jsx(n2,{isPaused:y}),r.jsx(Jy,{clusters:o,onNavigate:(D,I)=>{I!=null&&I.cluster&&c(I.cluster),s(D)}}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${_?"connected":S?"connecting":"disconnected"}`,title:e(_?"status.connected":S?"status.connecting":"status.disconnected")}),r.jsx(s2,{timestamp:u,connected:_})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[eu.map(({view:D,icon:I,labelKey:q,shortcut:A},H)=>r.jsxs("button",{className:`nav-tab nav-tab-${H} ${a===D?"active":""}`,onClick:()=>s(D),title:`${e(q)} [${A}]`,children:[r.jsx(I,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:A})]},D)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:D=>{D.stopPropagation(),w(!j)},title:e("nav.more"),children:r.jsx(Wt.MoreHorizontal,{})}),j&&r.jsx("div",{className:"nav-more-dropdown",onClick:D=>D.stopPropagation(),children:eu.map(({view:D,icon:I,labelKey:q,shortcut:A},H)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${H} ${a===D?"active":""}`,onClick:()=>{s(D),w(!1)},children:[r.jsx(I,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:A})]},D))})]})]}),Object.keys(o).length>0&&r.jsx(o2,{clusters:o,value:l,onChange:c,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${y?"paused":""} ${x||""}`,onClick:R,title:`${e(y?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:y?r.jsx(Wt.Play,{}):r.jsx(Wt.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:D=>{D.stopPropagation(),b(!f)},title:e("settings.language"),children:r.jsx(Wt.Language,{})}),f&&r.jsxs("div",{className:"lang-dropdown",onClick:D=>D.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),b(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),b(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(i2,{user:g.user,onLogout:g.logout}),(!g.authEnforced||((ee=g.user)==null?void 0:ee.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>h(!0),title:e("settings.title"),children:r.jsx(Wt.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:P()},a)}),d&&r.jsx(r2,{onClose:()=>h(!1),clusters:o}),x&&r.jsxs("div",{className:`pause-overlay ${x}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((D,I)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${I*.05}s`}},I))}),r.jsx("div",{className:"pause-status-text",children:x==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function p2(){return r.jsx(_g,{children:r.jsx(Sg,{children:r.jsx(d2,{})})})}el.createRoot(document.getElementById("root")).render(r.jsx(qo.StrictMode,{children:r.jsx(p2,{})}));
