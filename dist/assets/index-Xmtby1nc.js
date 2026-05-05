(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Kf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ou={exports:{}},ri={},lu={exports:{}},fe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ea=Symbol.for("react.element"),qf=Symbol.for("react.portal"),Qf=Symbol.for("react.fragment"),Zf=Symbol.for("react.strict_mode"),Jf=Symbol.for("react.profiler"),e0=Symbol.for("react.provider"),t0=Symbol.for("react.context"),n0=Symbol.for("react.forward_ref"),r0=Symbol.for("react.suspense"),a0=Symbol.for("react.memo"),s0=Symbol.for("react.lazy"),bc=Symbol.iterator;function i0(e){return e===null||typeof e!="object"?null:(e=bc&&e[bc]||e["@@iterator"],typeof e=="function"?e:null)}var cu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},du=Object.assign,uu={};function zr(e,t,n){this.props=e,this.context=t,this.refs=uu,this.updater=n||cu}zr.prototype.isReactComponent={};zr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};zr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function pu(){}pu.prototype=zr.prototype;function sl(e,t,n){this.props=e,this.context=t,this.refs=uu,this.updater=n||cu}var il=sl.prototype=new pu;il.constructor=sl;du(il,zr.prototype);il.isPureReactComponent=!0;var wc=Array.isArray,fu=Object.prototype.hasOwnProperty,ol={current:null},mu={key:!0,ref:!0,__self:!0,__source:!0};function gu(e,t,n){var r,s={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)fu.call(t,r)&&!mu.hasOwnProperty(r)&&(s[r]=t[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Ea,type:e,key:i,ref:o,props:s,_owner:ol.current}}function o0(e,t){return{$$typeof:Ea,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ll(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ea}function l0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var kc=/\/+/g;function ji(e,t){return typeof e=="object"&&e!==null&&e.key!=null?l0(""+e.key):t.toString(36)}function ds(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Ea:case qf:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+ji(o,0):r,wc(s)?(n="",e!=null&&(n=e.replace(kc,"$&/")+"/"),ds(s,t,n,"",function(d){return d})):s!=null&&(ll(s)&&(s=o0(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(kc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",wc(e))for(var l=0;l<e.length;l++){i=e[l];var c=r+ji(i,l);o+=ds(i,t,n,c,s)}else if(c=i0(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=r+ji(i,l++),o+=ds(i,t,n,c,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Ba(e,t,n){if(e==null)return e;var r=[],s=0;return ds(e,r,"","",function(i){return t.call(n,i,s++)}),r}function c0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ut={current:null},us={transition:null},d0={ReactCurrentDispatcher:ut,ReactCurrentBatchConfig:us,ReactCurrentOwner:ol};function hu(){throw Error("act(...) is not supported in production builds of React.")}fe.Children={map:Ba,forEach:function(e,t,n){Ba(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ba(e,function(){t++}),t},toArray:function(e){return Ba(e,function(t){return t})||[]},only:function(e){if(!ll(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};fe.Component=zr;fe.Fragment=Qf;fe.Profiler=Jf;fe.PureComponent=sl;fe.StrictMode=Zf;fe.Suspense=r0;fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=d0;fe.act=hu;fe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=du({},e.props),s=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=ol.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)fu.call(t,c)&&!mu.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Ea,type:e.type,key:s,ref:i,props:r,_owner:o}};fe.createContext=function(e){return e={$$typeof:t0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:e0,_context:e},e.Consumer=e};fe.createElement=gu;fe.createFactory=function(e){var t=gu.bind(null,e);return t.type=e,t};fe.createRef=function(){return{current:null}};fe.forwardRef=function(e){return{$$typeof:n0,render:e}};fe.isValidElement=ll;fe.lazy=function(e){return{$$typeof:s0,_payload:{_status:-1,_result:e},_init:c0}};fe.memo=function(e,t){return{$$typeof:a0,type:e,compare:t===void 0?null:t}};fe.startTransition=function(e){var t=us.transition;us.transition={};try{e()}finally{us.transition=t}};fe.unstable_act=hu;fe.useCallback=function(e,t){return ut.current.useCallback(e,t)};fe.useContext=function(e){return ut.current.useContext(e)};fe.useDebugValue=function(){};fe.useDeferredValue=function(e){return ut.current.useDeferredValue(e)};fe.useEffect=function(e,t){return ut.current.useEffect(e,t)};fe.useId=function(){return ut.current.useId()};fe.useImperativeHandle=function(e,t,n){return ut.current.useImperativeHandle(e,t,n)};fe.useInsertionEffect=function(e,t){return ut.current.useInsertionEffect(e,t)};fe.useLayoutEffect=function(e,t){return ut.current.useLayoutEffect(e,t)};fe.useMemo=function(e,t){return ut.current.useMemo(e,t)};fe.useReducer=function(e,t,n){return ut.current.useReducer(e,t,n)};fe.useRef=function(e){return ut.current.useRef(e)};fe.useState=function(e){return ut.current.useState(e)};fe.useSyncExternalStore=function(e,t,n){return ut.current.useSyncExternalStore(e,t,n)};fe.useTransition=function(){return ut.current.useTransition()};fe.version="18.3.1";lu.exports=fe;var h=lu.exports;const cl=Kf(h);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u0=h,p0=Symbol.for("react.element"),f0=Symbol.for("react.fragment"),m0=Object.prototype.hasOwnProperty,g0=u0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h0={key:!0,ref:!0,__self:!0,__source:!0};function xu(e,t,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)m0.call(t,r)&&!h0.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:p0,type:e,key:i,ref:o,props:s,_owner:g0.current}}ri.Fragment=f0;ri.jsx=xu;ri.jsxs=xu;ou.exports=ri;var a=ou.exports,ro={},vu={exports:{}},Nt={},yu={exports:{}},bu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(L,O){var U=L.length;L.push(O);e:for(;0<U;){var X=U-1>>>1,y=L[X];if(0<s(y,O))L[X]=O,L[U]=y,U=X;else break e}}function n(L){return L.length===0?null:L[0]}function r(L){if(L.length===0)return null;var O=L[0],U=L.pop();if(U!==O){L[0]=U;e:for(var X=0,y=L.length,V=y>>>1;X<V;){var Q=2*(X+1)-1,le=L[Q],ae=Q+1,oe=L[ae];if(0>s(le,U))ae<y&&0>s(oe,le)?(L[X]=oe,L[ae]=U,X=ae):(L[X]=le,L[Q]=U,X=Q);else if(ae<y&&0>s(oe,U))L[X]=oe,L[ae]=U,X=ae;else break e}}return O}function s(L,O){var U=L.sortIndex-O.sortIndex;return U!==0?U:L.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],p=1,f=null,u=3,m=!1,w=!1,_=!1,M=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(L){for(var O=n(d);O!==null;){if(O.callback===null)r(d);else if(O.startTime<=L)r(d),O.sortIndex=O.expirationTime,t(c,O);else break;O=n(d)}}function N(L){if(_=!1,x(L),!w)if(n(c)!==null)w=!0,Y(S);else{var O=n(d);O!==null&&F(N,O.startTime-L)}}function S(L,O){w=!1,_&&(_=!1,v(B),B=-1),m=!0;var U=u;try{for(x(O),f=n(c);f!==null&&(!(f.expirationTime>O)||L&&!z());){var X=f.callback;if(typeof X=="function"){f.callback=null,u=f.priorityLevel;var y=X(f.expirationTime<=O);O=e.unstable_now(),typeof y=="function"?f.callback=y:f===n(c)&&r(c),x(O)}else r(c);f=n(c)}if(f!==null)var V=!0;else{var Q=n(d);Q!==null&&F(N,Q.startTime-O),V=!1}return V}finally{f=null,u=U,m=!1}}var T=!1,A=null,B=-1,E=5,b=-1;function z(){return!(e.unstable_now()-b<E)}function $(){if(A!==null){var L=e.unstable_now();b=L;var O=!0;try{O=A(!0,L)}finally{O?C():(T=!1,A=null)}}else T=!1}var C;if(typeof g=="function")C=function(){g($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,W=P.port2;P.port1.onmessage=$,C=function(){W.postMessage(null)}}else C=function(){M($,0)};function Y(L){A=L,T||(T=!0,C())}function F(L,O){B=M(function(){L(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_continueExecution=function(){w||m||(w=!0,Y(S))},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(L){switch(u){case 1:case 2:case 3:var O=3;break;default:O=u}var U=u;u=O;try{return L()}finally{u=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(L,O){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var U=u;u=L;try{return O()}finally{u=U}},e.unstable_scheduleCallback=function(L,O,U){var X=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?X+U:X):U=X,L){case 1:var y=-1;break;case 2:y=250;break;case 5:y=1073741823;break;case 4:y=1e4;break;default:y=5e3}return y=U+y,L={id:p++,callback:O,priorityLevel:L,startTime:U,expirationTime:y,sortIndex:-1},U>X?(L.sortIndex=U,t(d,L),n(c)===null&&L===n(d)&&(_?(v(B),B=-1):_=!0,F(N,U-X))):(L.sortIndex=y,t(c,L),w||m||(w=!0,Y(S))),L},e.unstable_shouldYield=z,e.unstable_wrapCallback=function(L){var O=u;return function(){var U=u;u=O;try{return L.apply(this,arguments)}finally{u=U}}}})(bu);yu.exports=bu;var x0=yu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v0=h,_t=x0;function H(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var wu=new Set,la={};function Jn(e,t){wr(e,t),wr(e+"Capture",t)}function wr(e,t){for(la[e]=t,e=0;e<t.length;e++)wu.add(t[e])}var ln=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ao=Object.prototype.hasOwnProperty,y0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jc={},_c={};function b0(e){return ao.call(_c,e)?!0:ao.call(jc,e)?!1:y0.test(e)?_c[e]=!0:(jc[e]=!0,!1)}function w0(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function k0(e,t,n,r){if(t===null||typeof t>"u"||w0(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function pt(e,t,n,r,s,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){et[e]=new pt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];et[t]=new pt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){et[e]=new pt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){et[e]=new pt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){et[e]=new pt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){et[e]=new pt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){et[e]=new pt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){et[e]=new pt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){et[e]=new pt(e,5,!1,e.toLowerCase(),null,!1,!1)});var dl=/[\-:]([a-z])/g;function ul(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(dl,ul);et[t]=new pt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(dl,ul);et[t]=new pt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(dl,ul);et[t]=new pt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){et[e]=new pt(e,1,!1,e.toLowerCase(),null,!1,!1)});et.xlinkHref=new pt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){et[e]=new pt(e,1,!1,e.toLowerCase(),null,!0,!0)});function pl(e,t,n,r){var s=et.hasOwnProperty(t)?et[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(k0(t,n,s,r)&&(n=null),r||s===null?b0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var fn=v0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Wa=Symbol.for("react.element"),nr=Symbol.for("react.portal"),rr=Symbol.for("react.fragment"),fl=Symbol.for("react.strict_mode"),so=Symbol.for("react.profiler"),ku=Symbol.for("react.provider"),ju=Symbol.for("react.context"),ml=Symbol.for("react.forward_ref"),io=Symbol.for("react.suspense"),oo=Symbol.for("react.suspense_list"),gl=Symbol.for("react.memo"),gn=Symbol.for("react.lazy"),_u=Symbol.for("react.offscreen"),Nc=Symbol.iterator;function Ir(e){return e===null||typeof e!="object"?null:(e=Nc&&e[Nc]||e["@@iterator"],typeof e=="function"?e:null)}var $e=Object.assign,_i;function Yr(e){if(_i===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);_i=t&&t[1]||""}return`
`+_i+e}var Ni=!1;function Si(e,t){if(!e||Ni)return"";Ni=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var c=`
`+s[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Ni=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Yr(e):""}function j0(e){switch(e.tag){case 5:return Yr(e.type);case 16:return Yr("Lazy");case 13:return Yr("Suspense");case 19:return Yr("SuspenseList");case 0:case 2:case 15:return e=Si(e.type,!1),e;case 11:return e=Si(e.type.render,!1),e;case 1:return e=Si(e.type,!0),e;default:return""}}function lo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case rr:return"Fragment";case nr:return"Portal";case so:return"Profiler";case fl:return"StrictMode";case io:return"Suspense";case oo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ju:return(e.displayName||"Context")+".Consumer";case ku:return(e._context.displayName||"Context")+".Provider";case ml:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case gl:return t=e.displayName||null,t!==null?t:lo(e.type)||"Memo";case gn:t=e._payload,e=e._init;try{return lo(e(t))}catch{}}return null}function _0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return lo(t);case 8:return t===fl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function zn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Nu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function N0(e){var t=Nu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Va(e){e._valueTracker||(e._valueTracker=N0(e))}function Su(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Nu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ns(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function co(e,t){var n=t.checked;return $e({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Sc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=zn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Cu(e,t){t=t.checked,t!=null&&pl(e,"checked",t,!1)}function uo(e,t){Cu(e,t);var n=zn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?po(e,t.type,n):t.hasOwnProperty("defaultValue")&&po(e,t.type,zn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Cc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function po(e,t,n){(t!=="number"||Ns(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Gr=Array.isArray;function mr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+zn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function fo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(H(91));return $e({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Mc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(H(92));if(Gr(n)){if(1<n.length)throw Error(H(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:zn(n)}}function Mu(e,t){var n=zn(t.value),r=zn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ec(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Eu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Eu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ua,zu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ua=Ua||document.createElement("div"),Ua.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ua.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ca(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},S0=["Webkit","ms","Moz","O"];Object.keys(Jr).forEach(function(e){S0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jr[t]=Jr[e]})});function $u(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Jr.hasOwnProperty(e)&&Jr[e]?(""+t).trim():t+"px"}function Pu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=$u(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var C0=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function go(e,t){if(t){if(C0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(H(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(H(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(H(61))}if(t.style!=null&&typeof t.style!="object")throw Error(H(62))}}function ho(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xo=null;function hl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var vo=null,gr=null,hr=null;function zc(e){if(e=Pa(e)){if(typeof vo!="function")throw Error(H(280));var t=e.stateNode;t&&(t=li(t),vo(e.stateNode,e.type,t))}}function Ru(e){gr?hr?hr.push(e):hr=[e]:gr=e}function Tu(){if(gr){var e=gr,t=hr;if(hr=gr=null,zc(e),t)for(e=0;e<t.length;e++)zc(t[e])}}function Iu(e,t){return e(t)}function Lu(){}var Ci=!1;function Au(e,t,n){if(Ci)return e(t,n);Ci=!0;try{return Iu(e,t,n)}finally{Ci=!1,(gr!==null||hr!==null)&&(Lu(),Tu())}}function da(e,t){var n=e.stateNode;if(n===null)return null;var r=li(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(H(231,t,typeof n));return n}var yo=!1;if(ln)try{var Lr={};Object.defineProperty(Lr,"passive",{get:function(){yo=!0}}),window.addEventListener("test",Lr,Lr),window.removeEventListener("test",Lr,Lr)}catch{yo=!1}function M0(e,t,n,r,s,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(p){this.onError(p)}}var ea=!1,Ss=null,Cs=!1,bo=null,E0={onError:function(e){ea=!0,Ss=e}};function z0(e,t,n,r,s,i,o,l,c){ea=!1,Ss=null,M0.apply(E0,arguments)}function $0(e,t,n,r,s,i,o,l,c){if(z0.apply(this,arguments),ea){if(ea){var d=Ss;ea=!1,Ss=null}else throw Error(H(198));Cs||(Cs=!0,bo=d)}}function er(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ou(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function $c(e){if(er(e)!==e)throw Error(H(188))}function P0(e){var t=e.alternate;if(!t){if(t=er(e),t===null)throw Error(H(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return $c(s),e;if(i===r)return $c(s),t;i=i.sibling}throw Error(H(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(H(189))}}if(n.alternate!==r)throw Error(H(190))}if(n.tag!==3)throw Error(H(188));return n.stateNode.current===n?e:t}function Fu(e){return e=P0(e),e!==null?Du(e):null}function Du(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Du(e);if(t!==null)return t;e=e.sibling}return null}var Bu=_t.unstable_scheduleCallback,Pc=_t.unstable_cancelCallback,R0=_t.unstable_shouldYield,T0=_t.unstable_requestPaint,Le=_t.unstable_now,I0=_t.unstable_getCurrentPriorityLevel,xl=_t.unstable_ImmediatePriority,Wu=_t.unstable_UserBlockingPriority,Ms=_t.unstable_NormalPriority,L0=_t.unstable_LowPriority,Vu=_t.unstable_IdlePriority,ai=null,qt=null;function A0(e){if(qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(ai,e,void 0,(e.current.flags&128)===128)}catch{}}var Wt=Math.clz32?Math.clz32:D0,O0=Math.log,F0=Math.LN2;function D0(e){return e>>>=0,e===0?32:31-(O0(e)/F0|0)|0}var Ha=64,Ya=4194304;function Xr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Es(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Xr(l):(i&=o,i!==0&&(r=Xr(i)))}else o=n&~s,o!==0?r=Xr(o):i!==0&&(r=Xr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Wt(t),s=1<<n,r|=e[n],t&=~s;return r}function B0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function W0(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Wt(i),l=1<<o,c=s[o];c===-1?(!(l&n)||l&r)&&(s[o]=B0(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function wo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Uu(){var e=Ha;return Ha<<=1,!(Ha&4194240)&&(Ha=64),e}function Mi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function za(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Wt(t),e[t]=n}function V0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Wt(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function vl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Wt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var we=0;function Hu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Yu,yl,Gu,Xu,Ku,ko=!1,Ga=[],kn=null,jn=null,_n=null,ua=new Map,pa=new Map,vn=[],U0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rc(e,t){switch(e){case"focusin":case"focusout":kn=null;break;case"dragenter":case"dragleave":jn=null;break;case"mouseover":case"mouseout":_n=null;break;case"pointerover":case"pointerout":ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pa.delete(t.pointerId)}}function Ar(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=Pa(t),t!==null&&yl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function H0(e,t,n,r,s){switch(t){case"focusin":return kn=Ar(kn,e,t,n,r,s),!0;case"dragenter":return jn=Ar(jn,e,t,n,r,s),!0;case"mouseover":return _n=Ar(_n,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return ua.set(i,Ar(ua.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,pa.set(i,Ar(pa.get(i)||null,e,t,n,r,s)),!0}return!1}function qu(e){var t=Dn(e.target);if(t!==null){var n=er(t);if(n!==null){if(t=n.tag,t===13){if(t=Ou(n),t!==null){e.blockedOn=t,Ku(e.priority,function(){Gu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ps(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=jo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);xo=r,n.target.dispatchEvent(r),xo=null}else return t=Pa(n),t!==null&&yl(t),e.blockedOn=n,!1;t.shift()}return!0}function Tc(e,t,n){ps(e)&&n.delete(t)}function Y0(){ko=!1,kn!==null&&ps(kn)&&(kn=null),jn!==null&&ps(jn)&&(jn=null),_n!==null&&ps(_n)&&(_n=null),ua.forEach(Tc),pa.forEach(Tc)}function Or(e,t){e.blockedOn===t&&(e.blockedOn=null,ko||(ko=!0,_t.unstable_scheduleCallback(_t.unstable_NormalPriority,Y0)))}function fa(e){function t(s){return Or(s,e)}if(0<Ga.length){Or(Ga[0],e);for(var n=1;n<Ga.length;n++){var r=Ga[n];r.blockedOn===e&&(r.blockedOn=null)}}for(kn!==null&&Or(kn,e),jn!==null&&Or(jn,e),_n!==null&&Or(_n,e),ua.forEach(t),pa.forEach(t),n=0;n<vn.length;n++)r=vn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<vn.length&&(n=vn[0],n.blockedOn===null);)qu(n),n.blockedOn===null&&vn.shift()}var xr=fn.ReactCurrentBatchConfig,zs=!0;function G0(e,t,n,r){var s=we,i=xr.transition;xr.transition=null;try{we=1,bl(e,t,n,r)}finally{we=s,xr.transition=i}}function X0(e,t,n,r){var s=we,i=xr.transition;xr.transition=null;try{we=4,bl(e,t,n,r)}finally{we=s,xr.transition=i}}function bl(e,t,n,r){if(zs){var s=jo(e,t,n,r);if(s===null)Oi(e,t,r,$s,n),Rc(e,r);else if(H0(s,e,t,n,r))r.stopPropagation();else if(Rc(e,r),t&4&&-1<U0.indexOf(e)){for(;s!==null;){var i=Pa(s);if(i!==null&&Yu(i),i=jo(e,t,n,r),i===null&&Oi(e,t,r,$s,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Oi(e,t,r,null,n)}}var $s=null;function jo(e,t,n,r){if($s=null,e=hl(r),e=Dn(e),e!==null)if(t=er(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ou(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $s=e,null}function Qu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(I0()){case xl:return 1;case Wu:return 4;case Ms:case L0:return 16;case Vu:return 536870912;default:return 16}default:return 16}}var bn=null,wl=null,fs=null;function Zu(){if(fs)return fs;var e,t=wl,n=t.length,r,s="value"in bn?bn.value:bn.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[i-r];r++);return fs=s.slice(e,1<r?1-r:void 0)}function ms(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Xa(){return!0}function Ic(){return!1}function St(e){function t(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Xa:Ic,this.isPropagationStopped=Ic,this}return $e(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Xa)},persist:function(){},isPersistent:Xa}),t}var $r={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kl=St($r),$a=$e({},$r,{view:0,detail:0}),K0=St($a),Ei,zi,Fr,si=$e({},$a,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Fr&&(Fr&&e.type==="mousemove"?(Ei=e.screenX-Fr.screenX,zi=e.screenY-Fr.screenY):zi=Ei=0,Fr=e),Ei)},movementY:function(e){return"movementY"in e?e.movementY:zi}}),Lc=St(si),q0=$e({},si,{dataTransfer:0}),Q0=St(q0),Z0=$e({},$a,{relatedTarget:0}),$i=St(Z0),J0=$e({},$r,{animationName:0,elapsedTime:0,pseudoElement:0}),em=St(J0),tm=$e({},$r,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nm=St(tm),rm=$e({},$r,{data:0}),Ac=St(rm),am={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},im={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function om(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=im[e])?!!t[e]:!1}function jl(){return om}var lm=$e({},$a,{key:function(e){if(e.key){var t=am[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ms(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jl,charCode:function(e){return e.type==="keypress"?ms(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ms(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cm=St(lm),dm=$e({},si,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Oc=St(dm),um=$e({},$a,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jl}),pm=St(um),fm=$e({},$r,{propertyName:0,elapsedTime:0,pseudoElement:0}),mm=St(fm),gm=$e({},si,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hm=St(gm),xm=[9,13,27,32],_l=ln&&"CompositionEvent"in window,ta=null;ln&&"documentMode"in document&&(ta=document.documentMode);var vm=ln&&"TextEvent"in window&&!ta,Ju=ln&&(!_l||ta&&8<ta&&11>=ta),Fc=" ",Dc=!1;function ep(e,t){switch(e){case"keyup":return xm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ar=!1;function ym(e,t){switch(e){case"compositionend":return tp(t);case"keypress":return t.which!==32?null:(Dc=!0,Fc);case"textInput":return e=t.data,e===Fc&&Dc?null:e;default:return null}}function bm(e,t){if(ar)return e==="compositionend"||!_l&&ep(e,t)?(e=Zu(),fs=wl=bn=null,ar=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ju&&t.locale!=="ko"?null:t.data;default:return null}}var wm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!wm[e.type]:t==="textarea"}function np(e,t,n,r){Ru(r),t=Ps(t,"onChange"),0<t.length&&(n=new kl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var na=null,ma=null;function km(e){fp(e,0)}function ii(e){var t=or(e);if(Su(t))return e}function jm(e,t){if(e==="change")return t}var rp=!1;if(ln){var Pi;if(ln){var Ri="oninput"in document;if(!Ri){var Wc=document.createElement("div");Wc.setAttribute("oninput","return;"),Ri=typeof Wc.oninput=="function"}Pi=Ri}else Pi=!1;rp=Pi&&(!document.documentMode||9<document.documentMode)}function Vc(){na&&(na.detachEvent("onpropertychange",ap),ma=na=null)}function ap(e){if(e.propertyName==="value"&&ii(ma)){var t=[];np(t,ma,e,hl(e)),Au(km,t)}}function _m(e,t,n){e==="focusin"?(Vc(),na=t,ma=n,na.attachEvent("onpropertychange",ap)):e==="focusout"&&Vc()}function Nm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ii(ma)}function Sm(e,t){if(e==="click")return ii(t)}function Cm(e,t){if(e==="input"||e==="change")return ii(t)}function Mm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ut=typeof Object.is=="function"?Object.is:Mm;function ga(e,t){if(Ut(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!ao.call(t,s)||!Ut(e[s],t[s]))return!1}return!0}function Uc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hc(e,t){var n=Uc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Uc(n)}}function sp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?sp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ip(){for(var e=window,t=Ns();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ns(e.document)}return t}function Nl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Em(e){var t=ip(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&sp(n.ownerDocument.documentElement,n)){if(r!==null&&Nl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=Hc(n,i);var o=Hc(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zm=ln&&"documentMode"in document&&11>=document.documentMode,sr=null,_o=null,ra=null,No=!1;function Yc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;No||sr==null||sr!==Ns(r)||(r=sr,"selectionStart"in r&&Nl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ra&&ga(ra,r)||(ra=r,r=Ps(_o,"onSelect"),0<r.length&&(t=new kl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=sr)))}function Ka(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ir={animationend:Ka("Animation","AnimationEnd"),animationiteration:Ka("Animation","AnimationIteration"),animationstart:Ka("Animation","AnimationStart"),transitionend:Ka("Transition","TransitionEnd")},Ti={},op={};ln&&(op=document.createElement("div").style,"AnimationEvent"in window||(delete ir.animationend.animation,delete ir.animationiteration.animation,delete ir.animationstart.animation),"TransitionEvent"in window||delete ir.transitionend.transition);function oi(e){if(Ti[e])return Ti[e];if(!ir[e])return e;var t=ir[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in op)return Ti[e]=t[n];return e}var lp=oi("animationend"),cp=oi("animationiteration"),dp=oi("animationstart"),up=oi("transitionend"),pp=new Map,Gc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pn(e,t){pp.set(e,t),Jn(t,[e])}for(var Ii=0;Ii<Gc.length;Ii++){var Li=Gc[Ii],$m=Li.toLowerCase(),Pm=Li[0].toUpperCase()+Li.slice(1);Pn($m,"on"+Pm)}Pn(lp,"onAnimationEnd");Pn(cp,"onAnimationIteration");Pn(dp,"onAnimationStart");Pn("dblclick","onDoubleClick");Pn("focusin","onFocus");Pn("focusout","onBlur");Pn(up,"onTransitionEnd");wr("onMouseEnter",["mouseout","mouseover"]);wr("onMouseLeave",["mouseout","mouseover"]);wr("onPointerEnter",["pointerout","pointerover"]);wr("onPointerLeave",["pointerout","pointerover"]);Jn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Kr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Rm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));function Xc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,$0(r,t,void 0,e),e.currentTarget=null}function fp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;Xc(s,l,d),i=c}else for(o=0;o<r.length;o++){if(l=r[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;Xc(s,l,d),i=c}}}if(Cs)throw e=bo,Cs=!1,bo=null,e}function Ne(e,t){var n=t[zo];n===void 0&&(n=t[zo]=new Set);var r=e+"__bubble";n.has(r)||(mp(t,e,2,!1),n.add(r))}function Ai(e,t,n){var r=0;t&&(r|=4),mp(n,e,r,t)}var qa="_reactListening"+Math.random().toString(36).slice(2);function ha(e){if(!e[qa]){e[qa]=!0,wu.forEach(function(n){n!=="selectionchange"&&(Rm.has(n)||Ai(n,!1,e),Ai(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[qa]||(t[qa]=!0,Ai("selectionchange",!1,t))}}function mp(e,t,n,r){switch(Qu(t)){case 1:var s=G0;break;case 4:s=X0;break;default:s=bl}n=s.bind(null,t,n,e),s=void 0,!yo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Oi(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Dn(l),o===null)return;if(c=o.tag,c===5||c===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Au(function(){var d=i,p=hl(n),f=[];e:{var u=pp.get(e);if(u!==void 0){var m=kl,w=e;switch(e){case"keypress":if(ms(n)===0)break e;case"keydown":case"keyup":m=cm;break;case"focusin":w="focus",m=$i;break;case"focusout":w="blur",m=$i;break;case"beforeblur":case"afterblur":m=$i;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Lc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=Q0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=pm;break;case lp:case cp:case dp:m=em;break;case up:m=mm;break;case"scroll":m=K0;break;case"wheel":m=hm;break;case"copy":case"cut":case"paste":m=nm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Oc}var _=(t&4)!==0,M=!_&&e==="scroll",v=_?u!==null?u+"Capture":null:u;_=[];for(var g=d,x;g!==null;){x=g;var N=x.stateNode;if(x.tag===5&&N!==null&&(x=N,v!==null&&(N=da(g,v),N!=null&&_.push(xa(g,N,x)))),M)break;g=g.return}0<_.length&&(u=new m(u,w,null,n,p),f.push({event:u,listeners:_}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",u&&n!==xo&&(w=n.relatedTarget||n.fromElement)&&(Dn(w)||w[cn]))break e;if((m||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,m?(w=n.relatedTarget||n.toElement,m=d,w=w?Dn(w):null,w!==null&&(M=er(w),w!==M||w.tag!==5&&w.tag!==6)&&(w=null)):(m=null,w=d),m!==w)){if(_=Lc,N="onMouseLeave",v="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(_=Oc,N="onPointerLeave",v="onPointerEnter",g="pointer"),M=m==null?u:or(m),x=w==null?u:or(w),u=new _(N,g+"leave",m,n,p),u.target=M,u.relatedTarget=x,N=null,Dn(p)===d&&(_=new _(v,g+"enter",w,n,p),_.target=x,_.relatedTarget=M,N=_),M=N,m&&w)t:{for(_=m,v=w,g=0,x=_;x;x=tr(x))g++;for(x=0,N=v;N;N=tr(N))x++;for(;0<g-x;)_=tr(_),g--;for(;0<x-g;)v=tr(v),x--;for(;g--;){if(_===v||v!==null&&_===v.alternate)break t;_=tr(_),v=tr(v)}_=null}else _=null;m!==null&&Kc(f,u,m,_,!1),w!==null&&M!==null&&Kc(f,M,w,_,!0)}}e:{if(u=d?or(d):window,m=u.nodeName&&u.nodeName.toLowerCase(),m==="select"||m==="input"&&u.type==="file")var S=jm;else if(Bc(u))if(rp)S=Cm;else{S=Nm;var T=_m}else(m=u.nodeName)&&m.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(S=Sm);if(S&&(S=S(e,d))){np(f,S,n,p);break e}T&&T(e,u,d),e==="focusout"&&(T=u._wrapperState)&&T.controlled&&u.type==="number"&&po(u,"number",u.value)}switch(T=d?or(d):window,e){case"focusin":(Bc(T)||T.contentEditable==="true")&&(sr=T,_o=d,ra=null);break;case"focusout":ra=_o=sr=null;break;case"mousedown":No=!0;break;case"contextmenu":case"mouseup":case"dragend":No=!1,Yc(f,n,p);break;case"selectionchange":if(zm)break;case"keydown":case"keyup":Yc(f,n,p)}var A;if(_l)e:{switch(e){case"compositionstart":var B="onCompositionStart";break e;case"compositionend":B="onCompositionEnd";break e;case"compositionupdate":B="onCompositionUpdate";break e}B=void 0}else ar?ep(e,n)&&(B="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(B="onCompositionStart");B&&(Ju&&n.locale!=="ko"&&(ar||B!=="onCompositionStart"?B==="onCompositionEnd"&&ar&&(A=Zu()):(bn=p,wl="value"in bn?bn.value:bn.textContent,ar=!0)),T=Ps(d,B),0<T.length&&(B=new Ac(B,e,null,n,p),f.push({event:B,listeners:T}),A?B.data=A:(A=tp(n),A!==null&&(B.data=A)))),(A=vm?ym(e,n):bm(e,n))&&(d=Ps(d,"onBeforeInput"),0<d.length&&(p=new Ac("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=A))}fp(f,t)})}function xa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ps(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=da(e,n),i!=null&&r.unshift(xa(e,i,s)),i=da(e,t),i!=null&&r.push(xa(e,i,s))),e=e.return}return r}function tr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Kc(e,t,n,r,s){for(var i=t._reactName,o=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,s?(c=da(n,i),c!=null&&o.unshift(xa(n,c,l))):s||(c=da(n,i),c!=null&&o.push(xa(n,c,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Tm=/\r\n?/g,Im=/\u0000|\uFFFD/g;function qc(e){return(typeof e=="string"?e:""+e).replace(Tm,`
`).replace(Im,"")}function Qa(e,t,n){if(t=qc(t),qc(e)!==t&&n)throw Error(H(425))}function Rs(){}var So=null,Co=null;function Mo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Eo=typeof setTimeout=="function"?setTimeout:void 0,Lm=typeof clearTimeout=="function"?clearTimeout:void 0,Qc=typeof Promise=="function"?Promise:void 0,Am=typeof queueMicrotask=="function"?queueMicrotask:typeof Qc<"u"?function(e){return Qc.resolve(null).then(e).catch(Om)}:Eo;function Om(e){setTimeout(function(){throw e})}function Fi(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),fa(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);fa(t)}function Nn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Zc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Pr=Math.random().toString(36).slice(2),Kt="__reactFiber$"+Pr,va="__reactProps$"+Pr,cn="__reactContainer$"+Pr,zo="__reactEvents$"+Pr,Fm="__reactListeners$"+Pr,Dm="__reactHandles$"+Pr;function Dn(e){var t=e[Kt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[cn]||n[Kt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Zc(e);e!==null;){if(n=e[Kt])return n;e=Zc(e)}return t}e=n,n=e.parentNode}return null}function Pa(e){return e=e[Kt]||e[cn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function or(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(H(33))}function li(e){return e[va]||null}var $o=[],lr=-1;function Rn(e){return{current:e}}function Se(e){0>lr||(e.current=$o[lr],$o[lr]=null,lr--)}function je(e,t){lr++,$o[lr]=e.current,e.current=t}var $n={},ot=Rn($n),xt=Rn(!1),Gn=$n;function kr(e,t){var n=e.type.contextTypes;if(!n)return $n;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function vt(e){return e=e.childContextTypes,e!=null}function Ts(){Se(xt),Se(ot)}function Jc(e,t,n){if(ot.current!==$n)throw Error(H(168));je(ot,t),je(xt,n)}function gp(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(H(108,_0(e)||"Unknown",s));return $e({},n,r)}function Is(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$n,Gn=ot.current,je(ot,e),je(xt,xt.current),!0}function ed(e,t,n){var r=e.stateNode;if(!r)throw Error(H(169));n?(e=gp(e,t,Gn),r.__reactInternalMemoizedMergedChildContext=e,Se(xt),Se(ot),je(ot,e)):Se(xt),je(xt,n)}var rn=null,ci=!1,Di=!1;function hp(e){rn===null?rn=[e]:rn.push(e)}function Bm(e){ci=!0,hp(e)}function Tn(){if(!Di&&rn!==null){Di=!0;var e=0,t=we;try{var n=rn;for(we=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}rn=null,ci=!1}catch(s){throw rn!==null&&(rn=rn.slice(e+1)),Bu(xl,Tn),s}finally{we=t,Di=!1}}return null}var cr=[],dr=0,Ls=null,As=0,Ct=[],Mt=0,Xn=null,an=1,sn="";function On(e,t){cr[dr++]=As,cr[dr++]=Ls,Ls=e,As=t}function xp(e,t,n){Ct[Mt++]=an,Ct[Mt++]=sn,Ct[Mt++]=Xn,Xn=e;var r=an;e=sn;var s=32-Wt(r)-1;r&=~(1<<s),n+=1;var i=32-Wt(t)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,an=1<<32-Wt(t)+s|n<<s|r,sn=i+e}else an=1<<i|n<<s|r,sn=e}function Sl(e){e.return!==null&&(On(e,1),xp(e,1,0))}function Cl(e){for(;e===Ls;)Ls=cr[--dr],cr[dr]=null,As=cr[--dr],cr[dr]=null;for(;e===Xn;)Xn=Ct[--Mt],Ct[Mt]=null,sn=Ct[--Mt],Ct[Mt]=null,an=Ct[--Mt],Ct[Mt]=null}var jt=null,kt=null,Me=!1,Ft=null;function vp(e,t){var n=Et(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function td(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,jt=e,kt=Nn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,jt=e,kt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Xn!==null?{id:an,overflow:sn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Et(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,jt=e,kt=null,!0):!1;default:return!1}}function Po(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ro(e){if(Me){var t=kt;if(t){var n=t;if(!td(e,t)){if(Po(e))throw Error(H(418));t=Nn(n.nextSibling);var r=jt;t&&td(e,t)?vp(r,n):(e.flags=e.flags&-4097|2,Me=!1,jt=e)}}else{if(Po(e))throw Error(H(418));e.flags=e.flags&-4097|2,Me=!1,jt=e}}}function nd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;jt=e}function Za(e){if(e!==jt)return!1;if(!Me)return nd(e),Me=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Mo(e.type,e.memoizedProps)),t&&(t=kt)){if(Po(e))throw yp(),Error(H(418));for(;t;)vp(e,t),t=Nn(t.nextSibling)}if(nd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(H(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){kt=Nn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}kt=null}}else kt=jt?Nn(e.stateNode.nextSibling):null;return!0}function yp(){for(var e=kt;e;)e=Nn(e.nextSibling)}function jr(){kt=jt=null,Me=!1}function Ml(e){Ft===null?Ft=[e]:Ft.push(e)}var Wm=fn.ReactCurrentBatchConfig;function Dr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(H(309));var r=n.stateNode}if(!r)throw Error(H(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(H(284));if(!n._owner)throw Error(H(290,e))}return e}function Ja(e,t){throw e=Object.prototype.toString.call(t),Error(H(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function rd(e){var t=e._init;return t(e._payload)}function bp(e){function t(v,g){if(e){var x=v.deletions;x===null?(v.deletions=[g],v.flags|=16):x.push(g)}}function n(v,g){if(!e)return null;for(;g!==null;)t(v,g),g=g.sibling;return null}function r(v,g){for(v=new Map;g!==null;)g.key!==null?v.set(g.key,g):v.set(g.index,g),g=g.sibling;return v}function s(v,g){return v=En(v,g),v.index=0,v.sibling=null,v}function i(v,g,x){return v.index=x,e?(x=v.alternate,x!==null?(x=x.index,x<g?(v.flags|=2,g):x):(v.flags|=2,g)):(v.flags|=1048576,g)}function o(v){return e&&v.alternate===null&&(v.flags|=2),v}function l(v,g,x,N){return g===null||g.tag!==6?(g=Gi(x,v.mode,N),g.return=v,g):(g=s(g,x),g.return=v,g)}function c(v,g,x,N){var S=x.type;return S===rr?p(v,g,x.props.children,N,x.key):g!==null&&(g.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===gn&&rd(S)===g.type)?(N=s(g,x.props),N.ref=Dr(v,g,x),N.return=v,N):(N=ws(x.type,x.key,x.props,null,v.mode,N),N.ref=Dr(v,g,x),N.return=v,N)}function d(v,g,x,N){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=Xi(x,v.mode,N),g.return=v,g):(g=s(g,x.children||[]),g.return=v,g)}function p(v,g,x,N,S){return g===null||g.tag!==7?(g=Hn(x,v.mode,N,S),g.return=v,g):(g=s(g,x),g.return=v,g)}function f(v,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Gi(""+g,v.mode,x),g.return=v,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Wa:return x=ws(g.type,g.key,g.props,null,v.mode,x),x.ref=Dr(v,null,g),x.return=v,x;case nr:return g=Xi(g,v.mode,x),g.return=v,g;case gn:var N=g._init;return f(v,N(g._payload),x)}if(Gr(g)||Ir(g))return g=Hn(g,v.mode,x,null),g.return=v,g;Ja(v,g)}return null}function u(v,g,x,N){var S=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return S!==null?null:l(v,g,""+x,N);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Wa:return x.key===S?c(v,g,x,N):null;case nr:return x.key===S?d(v,g,x,N):null;case gn:return S=x._init,u(v,g,S(x._payload),N)}if(Gr(x)||Ir(x))return S!==null?null:p(v,g,x,N,null);Ja(v,x)}return null}function m(v,g,x,N,S){if(typeof N=="string"&&N!==""||typeof N=="number")return v=v.get(x)||null,l(g,v,""+N,S);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Wa:return v=v.get(N.key===null?x:N.key)||null,c(g,v,N,S);case nr:return v=v.get(N.key===null?x:N.key)||null,d(g,v,N,S);case gn:var T=N._init;return m(v,g,x,T(N._payload),S)}if(Gr(N)||Ir(N))return v=v.get(x)||null,p(g,v,N,S,null);Ja(g,N)}return null}function w(v,g,x,N){for(var S=null,T=null,A=g,B=g=0,E=null;A!==null&&B<x.length;B++){A.index>B?(E=A,A=null):E=A.sibling;var b=u(v,A,x[B],N);if(b===null){A===null&&(A=E);break}e&&A&&b.alternate===null&&t(v,A),g=i(b,g,B),T===null?S=b:T.sibling=b,T=b,A=E}if(B===x.length)return n(v,A),Me&&On(v,B),S;if(A===null){for(;B<x.length;B++)A=f(v,x[B],N),A!==null&&(g=i(A,g,B),T===null?S=A:T.sibling=A,T=A);return Me&&On(v,B),S}for(A=r(v,A);B<x.length;B++)E=m(A,v,B,x[B],N),E!==null&&(e&&E.alternate!==null&&A.delete(E.key===null?B:E.key),g=i(E,g,B),T===null?S=E:T.sibling=E,T=E);return e&&A.forEach(function(z){return t(v,z)}),Me&&On(v,B),S}function _(v,g,x,N){var S=Ir(x);if(typeof S!="function")throw Error(H(150));if(x=S.call(x),x==null)throw Error(H(151));for(var T=S=null,A=g,B=g=0,E=null,b=x.next();A!==null&&!b.done;B++,b=x.next()){A.index>B?(E=A,A=null):E=A.sibling;var z=u(v,A,b.value,N);if(z===null){A===null&&(A=E);break}e&&A&&z.alternate===null&&t(v,A),g=i(z,g,B),T===null?S=z:T.sibling=z,T=z,A=E}if(b.done)return n(v,A),Me&&On(v,B),S;if(A===null){for(;!b.done;B++,b=x.next())b=f(v,b.value,N),b!==null&&(g=i(b,g,B),T===null?S=b:T.sibling=b,T=b);return Me&&On(v,B),S}for(A=r(v,A);!b.done;B++,b=x.next())b=m(A,v,B,b.value,N),b!==null&&(e&&b.alternate!==null&&A.delete(b.key===null?B:b.key),g=i(b,g,B),T===null?S=b:T.sibling=b,T=b);return e&&A.forEach(function($){return t(v,$)}),Me&&On(v,B),S}function M(v,g,x,N){if(typeof x=="object"&&x!==null&&x.type===rr&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Wa:e:{for(var S=x.key,T=g;T!==null;){if(T.key===S){if(S=x.type,S===rr){if(T.tag===7){n(v,T.sibling),g=s(T,x.props.children),g.return=v,v=g;break e}}else if(T.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===gn&&rd(S)===T.type){n(v,T.sibling),g=s(T,x.props),g.ref=Dr(v,T,x),g.return=v,v=g;break e}n(v,T);break}else t(v,T);T=T.sibling}x.type===rr?(g=Hn(x.props.children,v.mode,N,x.key),g.return=v,v=g):(N=ws(x.type,x.key,x.props,null,v.mode,N),N.ref=Dr(v,g,x),N.return=v,v=N)}return o(v);case nr:e:{for(T=x.key;g!==null;){if(g.key===T)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(v,g.sibling),g=s(g,x.children||[]),g.return=v,v=g;break e}else{n(v,g);break}else t(v,g);g=g.sibling}g=Xi(x,v.mode,N),g.return=v,v=g}return o(v);case gn:return T=x._init,M(v,g,T(x._payload),N)}if(Gr(x))return w(v,g,x,N);if(Ir(x))return _(v,g,x,N);Ja(v,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(n(v,g.sibling),g=s(g,x),g.return=v,v=g):(n(v,g),g=Gi(x,v.mode,N),g.return=v,v=g),o(v)):n(v,g)}return M}var _r=bp(!0),wp=bp(!1),Os=Rn(null),Fs=null,ur=null,El=null;function zl(){El=ur=Fs=null}function $l(e){var t=Os.current;Se(Os),e._currentValue=t}function To(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function vr(e,t){Fs=e,El=ur=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(gt=!0),e.firstContext=null)}function $t(e){var t=e._currentValue;if(El!==e)if(e={context:e,memoizedValue:t,next:null},ur===null){if(Fs===null)throw Error(H(308));ur=e,Fs.dependencies={lanes:0,firstContext:e}}else ur=ur.next=e;return t}var Bn=null;function Pl(e){Bn===null?Bn=[e]:Bn.push(e)}function kp(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Pl(t)):(n.next=s.next,s.next=n),t.interleaved=n,dn(e,r)}function dn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var hn=!1;function Rl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function on(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Sn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,xe&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,dn(e,n)}return s=r.interleaved,s===null?(t.next=t,Pl(r)):(t.next=s.next,s.next=t),r.interleaved=t,dn(e,n)}function gs(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vl(e,n)}}function ad(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ds(e,t,n,r){var s=e.updateQueue;hn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=d:l.next=d,p.lastBaseUpdate=c))}if(i!==null){var f=s.baseState;o=0,p=d=c=null,l=i;do{var u=l.lane,m=l.eventTime;if((r&u)===u){p!==null&&(p=p.next={eventTime:m,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var w=e,_=l;switch(u=t,m=n,_.tag){case 1:if(w=_.payload,typeof w=="function"){f=w.call(m,f,u);break e}f=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=_.payload,u=typeof w=="function"?w.call(m,f,u):w,u==null)break e;f=$e({},f,u);break e;case 2:hn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else m={eventTime:m,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(d=p=m,c=f):p=p.next=m,o|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(p===null&&(c=f),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);qn|=o,e.lanes=o,e.memoizedState=f}}function sd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(H(191,s));s.call(r)}}}var Ra={},Qt=Rn(Ra),ya=Rn(Ra),ba=Rn(Ra);function Wn(e){if(e===Ra)throw Error(H(174));return e}function Tl(e,t){switch(je(ba,t),je(ya,e),je(Qt,Ra),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:mo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=mo(t,e)}Se(Qt),je(Qt,t)}function Nr(){Se(Qt),Se(ya),Se(ba)}function _p(e){Wn(ba.current);var t=Wn(Qt.current),n=mo(t,e.type);t!==n&&(je(ya,e),je(Qt,n))}function Il(e){ya.current===e&&(Se(Qt),Se(ya))}var Ee=Rn(0);function Bs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bi=[];function Ll(){for(var e=0;e<Bi.length;e++)Bi[e]._workInProgressVersionPrimary=null;Bi.length=0}var hs=fn.ReactCurrentDispatcher,Wi=fn.ReactCurrentBatchConfig,Kn=0,ze=null,Ue=null,Ke=null,Ws=!1,aa=!1,wa=0,Vm=0;function at(){throw Error(H(321))}function Al(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ut(e[n],t[n]))return!1;return!0}function Ol(e,t,n,r,s,i){if(Kn=i,ze=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,hs.current=e===null||e.memoizedState===null?Gm:Xm,e=n(r,s),aa){i=0;do{if(aa=!1,wa=0,25<=i)throw Error(H(301));i+=1,Ke=Ue=null,t.updateQueue=null,hs.current=Km,e=n(r,s)}while(aa)}if(hs.current=Vs,t=Ue!==null&&Ue.next!==null,Kn=0,Ke=Ue=ze=null,Ws=!1,t)throw Error(H(300));return e}function Fl(){var e=wa!==0;return wa=0,e}function Xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ke===null?ze.memoizedState=Ke=e:Ke=Ke.next=e,Ke}function Pt(){if(Ue===null){var e=ze.alternate;e=e!==null?e.memoizedState:null}else e=Ue.next;var t=Ke===null?ze.memoizedState:Ke.next;if(t!==null)Ke=t,Ue=e;else{if(e===null)throw Error(H(310));Ue=e,e={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},Ke===null?ze.memoizedState=Ke=e:Ke=Ke.next=e}return Ke}function ka(e,t){return typeof t=="function"?t(e):t}function Vi(e){var t=Pt(),n=t.queue;if(n===null)throw Error(H(311));n.lastRenderedReducer=e;var r=Ue,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,c=null,d=i;do{var p=d.lane;if((Kn&p)===p)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=f,o=r):c=c.next=f,ze.lanes|=p,qn|=p}d=d.next}while(d!==null&&d!==i);c===null?o=r:c.next=l,Ut(r,t.memoizedState)||(gt=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,ze.lanes|=i,qn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ui(e){var t=Pt(),n=t.queue;if(n===null)throw Error(H(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=e(i,o.action),o=o.next;while(o!==s);Ut(i,t.memoizedState)||(gt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Np(){}function Sp(e,t){var n=ze,r=Pt(),s=t(),i=!Ut(r.memoizedState,s);if(i&&(r.memoizedState=s,gt=!0),r=r.queue,Dl(Ep.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Ke!==null&&Ke.memoizedState.tag&1){if(n.flags|=2048,ja(9,Mp.bind(null,n,r,s,t),void 0,null),qe===null)throw Error(H(349));Kn&30||Cp(n,t,s)}return s}function Cp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ze.updateQueue,t===null?(t={lastEffect:null,stores:null},ze.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Mp(e,t,n,r){t.value=n,t.getSnapshot=r,zp(t)&&$p(e)}function Ep(e,t,n){return n(function(){zp(t)&&$p(e)})}function zp(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ut(e,n)}catch{return!0}}function $p(e){var t=dn(e,1);t!==null&&Vt(t,e,1,-1)}function id(e){var t=Xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ka,lastRenderedState:e},t.queue=e,e=e.dispatch=Ym.bind(null,ze,e),[t.memoizedState,e]}function ja(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ze.updateQueue,t===null?(t={lastEffect:null,stores:null},ze.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Pp(){return Pt().memoizedState}function xs(e,t,n,r){var s=Xt();ze.flags|=e,s.memoizedState=ja(1|t,n,void 0,r===void 0?null:r)}function di(e,t,n,r){var s=Pt();r=r===void 0?null:r;var i=void 0;if(Ue!==null){var o=Ue.memoizedState;if(i=o.destroy,r!==null&&Al(r,o.deps)){s.memoizedState=ja(t,n,i,r);return}}ze.flags|=e,s.memoizedState=ja(1|t,n,i,r)}function od(e,t){return xs(8390656,8,e,t)}function Dl(e,t){return di(2048,8,e,t)}function Rp(e,t){return di(4,2,e,t)}function Tp(e,t){return di(4,4,e,t)}function Ip(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Lp(e,t,n){return n=n!=null?n.concat([e]):null,di(4,4,Ip.bind(null,t,e),n)}function Bl(){}function Ap(e,t){var n=Pt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Op(e,t){var n=Pt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Fp(e,t,n){return Kn&21?(Ut(n,t)||(n=Uu(),ze.lanes|=n,qn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,gt=!0),e.memoizedState=n)}function Um(e,t){var n=we;we=n!==0&&4>n?n:4,e(!0);var r=Wi.transition;Wi.transition={};try{e(!1),t()}finally{we=n,Wi.transition=r}}function Dp(){return Pt().memoizedState}function Hm(e,t,n){var r=Mn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Bp(e))Wp(t,n);else if(n=kp(e,t,n,r),n!==null){var s=dt();Vt(n,e,r,s),Vp(n,t,r)}}function Ym(e,t,n){var r=Mn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bp(e))Wp(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Ut(l,o)){var c=t.interleaved;c===null?(s.next=s,Pl(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=kp(e,t,s,r),n!==null&&(s=dt(),Vt(n,e,r,s),Vp(n,t,r))}}function Bp(e){var t=e.alternate;return e===ze||t!==null&&t===ze}function Wp(e,t){aa=Ws=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vl(e,n)}}var Vs={readContext:$t,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useInsertionEffect:at,useLayoutEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useMutableSource:at,useSyncExternalStore:at,useId:at,unstable_isNewReconciler:!1},Gm={readContext:$t,useCallback:function(e,t){return Xt().memoizedState=[e,t===void 0?null:t],e},useContext:$t,useEffect:od,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xs(4194308,4,Ip.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xs(4194308,4,e,t)},useInsertionEffect:function(e,t){return xs(4,2,e,t)},useMemo:function(e,t){var n=Xt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Xt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Hm.bind(null,ze,e),[r.memoizedState,e]},useRef:function(e){var t=Xt();return e={current:e},t.memoizedState=e},useState:id,useDebugValue:Bl,useDeferredValue:function(e){return Xt().memoizedState=e},useTransition:function(){var e=id(!1),t=e[0];return e=Um.bind(null,e[1]),Xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ze,s=Xt();if(Me){if(n===void 0)throw Error(H(407));n=n()}else{if(n=t(),qe===null)throw Error(H(349));Kn&30||Cp(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,od(Ep.bind(null,r,i,e),[e]),r.flags|=2048,ja(9,Mp.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Xt(),t=qe.identifierPrefix;if(Me){var n=sn,r=an;n=(r&~(1<<32-Wt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=wa++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Vm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Xm={readContext:$t,useCallback:Ap,useContext:$t,useEffect:Dl,useImperativeHandle:Lp,useInsertionEffect:Rp,useLayoutEffect:Tp,useMemo:Op,useReducer:Vi,useRef:Pp,useState:function(){return Vi(ka)},useDebugValue:Bl,useDeferredValue:function(e){var t=Pt();return Fp(t,Ue.memoizedState,e)},useTransition:function(){var e=Vi(ka)[0],t=Pt().memoizedState;return[e,t]},useMutableSource:Np,useSyncExternalStore:Sp,useId:Dp,unstable_isNewReconciler:!1},Km={readContext:$t,useCallback:Ap,useContext:$t,useEffect:Dl,useImperativeHandle:Lp,useInsertionEffect:Rp,useLayoutEffect:Tp,useMemo:Op,useReducer:Ui,useRef:Pp,useState:function(){return Ui(ka)},useDebugValue:Bl,useDeferredValue:function(e){var t=Pt();return Ue===null?t.memoizedState=e:Fp(t,Ue.memoizedState,e)},useTransition:function(){var e=Ui(ka)[0],t=Pt().memoizedState;return[e,t]},useMutableSource:Np,useSyncExternalStore:Sp,useId:Dp,unstable_isNewReconciler:!1};function At(e,t){if(e&&e.defaultProps){t=$e({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Io(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:$e({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ui={isMounted:function(e){return(e=e._reactInternals)?er(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=dt(),s=Mn(e),i=on(r,s);i.payload=t,n!=null&&(i.callback=n),t=Sn(e,i,s),t!==null&&(Vt(t,e,s,r),gs(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=dt(),s=Mn(e),i=on(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Sn(e,i,s),t!==null&&(Vt(t,e,s,r),gs(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=dt(),r=Mn(e),s=on(n,r);s.tag=2,t!=null&&(s.callback=t),t=Sn(e,s,r),t!==null&&(Vt(t,e,r,n),gs(t,e,r))}};function ld(e,t,n,r,s,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!ga(n,r)||!ga(s,i):!0}function Up(e,t,n){var r=!1,s=$n,i=t.contextType;return typeof i=="object"&&i!==null?i=$t(i):(s=vt(t)?Gn:ot.current,r=t.contextTypes,i=(r=r!=null)?kr(e,s):$n),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ui,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function cd(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ui.enqueueReplaceState(t,t.state,null)}function Lo(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Rl(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=$t(i):(i=vt(t)?Gn:ot.current,s.context=kr(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Io(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ui.enqueueReplaceState(s,s.state,null),Ds(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Sr(e,t){try{var n="",r=t;do n+=j0(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Hi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ao(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var qm=typeof WeakMap=="function"?WeakMap:Map;function Hp(e,t,n){n=on(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hs||(Hs=!0,Go=r),Ao(e,t)},n}function Yp(e,t,n){n=on(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Ao(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ao(e,t),typeof r!="function"&&(Cn===null?Cn=new Set([this]):Cn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function dd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new qm;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=dg.bind(null,e,t,n),t.then(e,e))}function ud(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function pd(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=on(-1,1),t.tag=2,Sn(n,t,1))),n.lanes|=1),e)}var Qm=fn.ReactCurrentOwner,gt=!1;function ct(e,t,n,r){t.child=e===null?wp(t,null,n,r):_r(t,e.child,n,r)}function fd(e,t,n,r,s){n=n.render;var i=t.ref;return vr(t,s),r=Ol(e,t,n,r,i,s),n=Fl(),e!==null&&!gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,un(e,t,s)):(Me&&n&&Sl(t),t.flags|=1,ct(e,t,r,s),t.child)}function md(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!Kl(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Gp(e,t,i,r,s)):(e=ws(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:ga,n(o,r)&&e.ref===t.ref)return un(e,t,s)}return t.flags|=1,e=En(i,r),e.ref=t.ref,e.return=t,t.child=e}function Gp(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(ga(i,r)&&e.ref===t.ref)if(gt=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(gt=!0);else return t.lanes=e.lanes,un(e,t,s)}return Oo(e,t,n,r,s)}function Xp(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},je(fr,wt),wt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,je(fr,wt),wt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,je(fr,wt),wt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,je(fr,wt),wt|=r;return ct(e,t,s,n),t.child}function Kp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Oo(e,t,n,r,s){var i=vt(n)?Gn:ot.current;return i=kr(t,i),vr(t,s),n=Ol(e,t,n,r,i,s),r=Fl(),e!==null&&!gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,un(e,t,s)):(Me&&r&&Sl(t),t.flags|=1,ct(e,t,n,s),t.child)}function gd(e,t,n,r,s){if(vt(n)){var i=!0;Is(t)}else i=!1;if(vr(t,s),t.stateNode===null)vs(e,t),Up(t,n,r),Lo(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=$t(d):(d=vt(n)?Gn:ot.current,d=kr(t,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||c!==d)&&cd(t,o,r,d),hn=!1;var u=t.memoizedState;o.state=u,Ds(t,r,o,s),c=t.memoizedState,l!==r||u!==c||xt.current||hn?(typeof p=="function"&&(Io(t,n,p,r),c=t.memoizedState),(l=hn||ld(t,n,l,r,u,c,d))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=d,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,jp(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:At(t.type,l),o.props=d,f=t.pendingProps,u=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=$t(c):(c=vt(n)?Gn:ot.current,c=kr(t,c));var m=n.getDerivedStateFromProps;(p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||u!==c)&&cd(t,o,r,c),hn=!1,u=t.memoizedState,o.state=u,Ds(t,r,o,s);var w=t.memoizedState;l!==f||u!==w||xt.current||hn?(typeof m=="function"&&(Io(t,n,m,r),w=t.memoizedState),(d=hn||ld(t,n,d,r,u,w,c)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),r=!1)}return Fo(e,t,n,r,i,s)}function Fo(e,t,n,r,s,i){Kp(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&ed(t,n,!1),un(e,t,i);r=t.stateNode,Qm.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=_r(t,e.child,null,i),t.child=_r(t,null,l,i)):ct(e,t,l,i),t.memoizedState=r.state,s&&ed(t,n,!0),t.child}function qp(e){var t=e.stateNode;t.pendingContext?Jc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Jc(e,t.context,!1),Tl(e,t.containerInfo)}function hd(e,t,n,r,s){return jr(),Ml(s),t.flags|=256,ct(e,t,n,r),t.child}var Do={dehydrated:null,treeContext:null,retryLane:0};function Bo(e){return{baseLanes:e,cachePool:null,transitions:null}}function Qp(e,t,n){var r=t.pendingProps,s=Ee.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),je(Ee,s&1),e===null)return Ro(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=mi(o,r,0,null),e=Hn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Bo(n),t.memoizedState=Do,e):Wl(t,o));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Zm(e,t,o,r,l,s,n);if(i){i=r.fallback,o=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=En(s,c),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=En(l,i):(i=Hn(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Bo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Do,r}return i=e.child,e=i.sibling,r=En(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Wl(e,t){return t=mi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function es(e,t,n,r){return r!==null&&Ml(r),_r(t,e.child,null,n),e=Wl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Zm(e,t,n,r,s,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Hi(Error(H(422))),es(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=mi({mode:"visible",children:r.children},s,0,null),i=Hn(i,s,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&_r(t,e.child,null,o),t.child.memoizedState=Bo(o),t.memoizedState=Do,i);if(!(t.mode&1))return es(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(H(419)),r=Hi(i,r,void 0),es(e,t,o,r)}if(l=(o&e.childLanes)!==0,gt||l){if(r=qe,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,dn(e,s),Vt(r,e,s,-1))}return Xl(),r=Hi(Error(H(421))),es(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=ug.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,kt=Nn(s.nextSibling),jt=t,Me=!0,Ft=null,e!==null&&(Ct[Mt++]=an,Ct[Mt++]=sn,Ct[Mt++]=Xn,an=e.id,sn=e.overflow,Xn=t),t=Wl(t,r.children),t.flags|=4096,t)}function xd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),To(e.return,t,n)}function Yi(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Zp(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(ct(e,t,r.children,n),r=Ee.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xd(e,n,t);else if(e.tag===19)xd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(je(Ee,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Bs(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Yi(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Bs(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Yi(t,!0,n,null,i);break;case"together":Yi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vs(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function un(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),qn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(H(153));if(t.child!==null){for(e=t.child,n=En(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=En(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Jm(e,t,n){switch(t.tag){case 3:qp(t),jr();break;case 5:_p(t);break;case 1:vt(t.type)&&Is(t);break;case 4:Tl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;je(Os,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(je(Ee,Ee.current&1),t.flags|=128,null):n&t.child.childLanes?Qp(e,t,n):(je(Ee,Ee.current&1),e=un(e,t,n),e!==null?e.sibling:null);je(Ee,Ee.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Zp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),je(Ee,Ee.current),r)break;return null;case 22:case 23:return t.lanes=0,Xp(e,t,n)}return un(e,t,n)}var Jp,Wo,ef,tf;Jp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Wo=function(){};ef=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Wn(Qt.current);var i=null;switch(n){case"input":s=co(e,s),r=co(e,r),i=[];break;case"select":s=$e({},s,{value:void 0}),r=$e({},r,{value:void 0}),i=[];break;case"textarea":s=fo(e,s),r=fo(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Rs)}go(n,r);var o;n=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(la.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var c=r[d];if(l=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(la.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Ne("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};tf=function(e,t,n,r){n!==r&&(t.flags|=4)};function Br(e,t){if(!Me)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function st(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function eg(e,t,n){var r=t.pendingProps;switch(Cl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return st(t),null;case 1:return vt(t.type)&&Ts(),st(t),null;case 3:return r=t.stateNode,Nr(),Se(xt),Se(ot),Ll(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Za(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ft!==null&&(qo(Ft),Ft=null))),Wo(e,t),st(t),null;case 5:Il(t);var s=Wn(ba.current);if(n=t.type,e!==null&&t.stateNode!=null)ef(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(H(166));return st(t),null}if(e=Wn(Qt.current),Za(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Kt]=t,r[va]=i,e=(t.mode&1)!==0,n){case"dialog":Ne("cancel",r),Ne("close",r);break;case"iframe":case"object":case"embed":Ne("load",r);break;case"video":case"audio":for(s=0;s<Kr.length;s++)Ne(Kr[s],r);break;case"source":Ne("error",r);break;case"img":case"image":case"link":Ne("error",r),Ne("load",r);break;case"details":Ne("toggle",r);break;case"input":Sc(r,i),Ne("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Ne("invalid",r);break;case"textarea":Mc(r,i),Ne("invalid",r)}go(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Qa(r.textContent,l,e),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Qa(r.textContent,l,e),s=["children",""+l]):la.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Ne("scroll",r)}switch(n){case"input":Va(r),Cc(r,i,!0);break;case"textarea":Va(r),Ec(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Rs)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Eu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Kt]=t,e[va]=r,Jp(e,t,!1,!1),t.stateNode=e;e:{switch(o=ho(n,r),n){case"dialog":Ne("cancel",e),Ne("close",e),s=r;break;case"iframe":case"object":case"embed":Ne("load",e),s=r;break;case"video":case"audio":for(s=0;s<Kr.length;s++)Ne(Kr[s],e);s=r;break;case"source":Ne("error",e),s=r;break;case"img":case"image":case"link":Ne("error",e),Ne("load",e),s=r;break;case"details":Ne("toggle",e),s=r;break;case"input":Sc(e,r),s=co(e,r),Ne("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=$e({},r,{value:void 0}),Ne("invalid",e);break;case"textarea":Mc(e,r),s=fo(e,r),Ne("invalid",e);break;default:s=r}go(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?Pu(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&zu(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ca(e,c):typeof c=="number"&&ca(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(la.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Ne("scroll",e):c!=null&&pl(e,i,c,o))}switch(n){case"input":Va(e),Cc(e,r,!1);break;case"textarea":Va(e),Ec(e);break;case"option":r.value!=null&&e.setAttribute("value",""+zn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?mr(e,!!r.multiple,i,!1):r.defaultValue!=null&&mr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Rs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return st(t),null;case 6:if(e&&t.stateNode!=null)tf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(H(166));if(n=Wn(ba.current),Wn(Qt.current),Za(t)){if(r=t.stateNode,n=t.memoizedProps,r[Kt]=t,(i=r.nodeValue!==n)&&(e=jt,e!==null))switch(e.tag){case 3:Qa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Qa(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Kt]=t,t.stateNode=r}return st(t),null;case 13:if(Se(Ee),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Me&&kt!==null&&t.mode&1&&!(t.flags&128))yp(),jr(),t.flags|=98560,i=!1;else if(i=Za(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(H(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(H(317));i[Kt]=t}else jr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;st(t),i=!1}else Ft!==null&&(qo(Ft),Ft=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Ee.current&1?He===0&&(He=3):Xl())),t.updateQueue!==null&&(t.flags|=4),st(t),null);case 4:return Nr(),Wo(e,t),e===null&&ha(t.stateNode.containerInfo),st(t),null;case 10:return $l(t.type._context),st(t),null;case 17:return vt(t.type)&&Ts(),st(t),null;case 19:if(Se(Ee),i=t.memoizedState,i===null)return st(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)Br(i,!1);else{if(He!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Bs(e),o!==null){for(t.flags|=128,Br(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return je(Ee,Ee.current&1|2),t.child}e=e.sibling}i.tail!==null&&Le()>Cr&&(t.flags|=128,r=!0,Br(i,!1),t.lanes=4194304)}else{if(!r)if(e=Bs(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Br(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Me)return st(t),null}else 2*Le()-i.renderingStartTime>Cr&&n!==1073741824&&(t.flags|=128,r=!0,Br(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Le(),t.sibling=null,n=Ee.current,je(Ee,r?n&1|2:n&1),t):(st(t),null);case 22:case 23:return Gl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?wt&1073741824&&(st(t),t.subtreeFlags&6&&(t.flags|=8192)):st(t),null;case 24:return null;case 25:return null}throw Error(H(156,t.tag))}function tg(e,t){switch(Cl(t),t.tag){case 1:return vt(t.type)&&Ts(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Nr(),Se(xt),Se(ot),Ll(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Il(t),null;case 13:if(Se(Ee),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(H(340));jr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Se(Ee),null;case 4:return Nr(),null;case 10:return $l(t.type._context),null;case 22:case 23:return Gl(),null;case 24:return null;default:return null}}var ts=!1,it=!1,ng=typeof WeakSet=="function"?WeakSet:Set,J=null;function pr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Te(e,t,r)}else n.current=null}function Vo(e,t,n){try{n()}catch(r){Te(e,t,r)}}var vd=!1;function rg(e,t){if(So=zs,e=ip(),Nl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,d=0,p=0,f=e,u=null;t:for(;;){for(var m;f!==n||s!==0&&f.nodeType!==3||(l=o+s),f!==i||r!==0&&f.nodeType!==3||(c=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)u=f,f=m;for(;;){if(f===e)break t;if(u===n&&++d===s&&(l=o),u===i&&++p===r&&(c=o),(m=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=m}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Co={focusedElem:e,selectionRange:n},zs=!1,J=t;J!==null;)if(t=J,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,J=e;else for(;J!==null;){t=J;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var _=w.memoizedProps,M=w.memoizedState,v=t.stateNode,g=v.getSnapshotBeforeUpdate(t.elementType===t.type?_:At(t.type,_),M);v.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(H(163))}}catch(N){Te(t,t.return,N)}if(e=t.sibling,e!==null){e.return=t.return,J=e;break}J=t.return}return w=vd,vd=!1,w}function sa(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Vo(t,n,i)}s=s.next}while(s!==r)}}function pi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Uo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function nf(e){var t=e.alternate;t!==null&&(e.alternate=null,nf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Kt],delete t[va],delete t[zo],delete t[Fm],delete t[Dm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function rf(e){return e.tag===5||e.tag===3||e.tag===4}function yd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||rf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ho(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Rs));else if(r!==4&&(e=e.child,e!==null))for(Ho(e,t,n),e=e.sibling;e!==null;)Ho(e,t,n),e=e.sibling}function Yo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Yo(e,t,n),e=e.sibling;e!==null;)Yo(e,t,n),e=e.sibling}var Ze=null,Ot=!1;function mn(e,t,n){for(n=n.child;n!==null;)af(e,t,n),n=n.sibling}function af(e,t,n){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(ai,n)}catch{}switch(n.tag){case 5:it||pr(n,t);case 6:var r=Ze,s=Ot;Ze=null,mn(e,t,n),Ze=r,Ot=s,Ze!==null&&(Ot?(e=Ze,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ze.removeChild(n.stateNode));break;case 18:Ze!==null&&(Ot?(e=Ze,n=n.stateNode,e.nodeType===8?Fi(e.parentNode,n):e.nodeType===1&&Fi(e,n),fa(e)):Fi(Ze,n.stateNode));break;case 4:r=Ze,s=Ot,Ze=n.stateNode.containerInfo,Ot=!0,mn(e,t,n),Ze=r,Ot=s;break;case 0:case 11:case 14:case 15:if(!it&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Vo(n,t,o),s=s.next}while(s!==r)}mn(e,t,n);break;case 1:if(!it&&(pr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Te(n,t,l)}mn(e,t,n);break;case 21:mn(e,t,n);break;case 22:n.mode&1?(it=(r=it)||n.memoizedState!==null,mn(e,t,n),it=r):mn(e,t,n);break;default:mn(e,t,n)}}function bd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ng),t.forEach(function(r){var s=pg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Lt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ze=l.stateNode,Ot=!1;break e;case 3:Ze=l.stateNode.containerInfo,Ot=!0;break e;case 4:Ze=l.stateNode.containerInfo,Ot=!0;break e}l=l.return}if(Ze===null)throw Error(H(160));af(i,o,s),Ze=null,Ot=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){Te(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)sf(t,e),t=t.sibling}function sf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Lt(t,e),Gt(e),r&4){try{sa(3,e,e.return),pi(3,e)}catch(_){Te(e,e.return,_)}try{sa(5,e,e.return)}catch(_){Te(e,e.return,_)}}break;case 1:Lt(t,e),Gt(e),r&512&&n!==null&&pr(n,n.return);break;case 5:if(Lt(t,e),Gt(e),r&512&&n!==null&&pr(n,n.return),e.flags&32){var s=e.stateNode;try{ca(s,"")}catch(_){Te(e,e.return,_)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Cu(s,i),ho(l,o);var d=ho(l,i);for(o=0;o<c.length;o+=2){var p=c[o],f=c[o+1];p==="style"?Pu(s,f):p==="dangerouslySetInnerHTML"?zu(s,f):p==="children"?ca(s,f):pl(s,p,f,d)}switch(l){case"input":uo(s,i);break;case"textarea":Mu(s,i);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?mr(s,!!i.multiple,m,!1):u!==!!i.multiple&&(i.defaultValue!=null?mr(s,!!i.multiple,i.defaultValue,!0):mr(s,!!i.multiple,i.multiple?[]:"",!1))}s[va]=i}catch(_){Te(e,e.return,_)}}break;case 6:if(Lt(t,e),Gt(e),r&4){if(e.stateNode===null)throw Error(H(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(_){Te(e,e.return,_)}}break;case 3:if(Lt(t,e),Gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{fa(t.containerInfo)}catch(_){Te(e,e.return,_)}break;case 4:Lt(t,e),Gt(e);break;case 13:Lt(t,e),Gt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Hl=Le())),r&4&&bd(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(it=(d=it)||p,Lt(t,e),it=d):Lt(t,e),Gt(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!p&&e.mode&1)for(J=e,p=e.child;p!==null;){for(f=J=p;J!==null;){switch(u=J,m=u.child,u.tag){case 0:case 11:case 14:case 15:sa(4,u,u.return);break;case 1:pr(u,u.return);var w=u.stateNode;if(typeof w.componentWillUnmount=="function"){r=u,n=u.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(_){Te(r,n,_)}}break;case 5:pr(u,u.return);break;case 22:if(u.memoizedState!==null){kd(f);continue}}m!==null?(m.return=u,J=m):kd(f)}p=p.sibling}e:for(p=null,f=e;;){if(f.tag===5){if(p===null){p=f;try{s=f.stateNode,d?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=f.stateNode,c=f.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=$u("display",o))}catch(_){Te(e,e.return,_)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(_){Te(e,e.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Lt(t,e),Gt(e),r&4&&bd(e);break;case 21:break;default:Lt(t,e),Gt(e)}}function Gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(rf(n)){var r=n;break e}n=n.return}throw Error(H(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ca(s,""),r.flags&=-33);var i=yd(e);Yo(e,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=yd(e);Ho(e,l,o);break;default:throw Error(H(161))}}catch(c){Te(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ag(e,t,n){J=e,of(e)}function of(e,t,n){for(var r=(e.mode&1)!==0;J!==null;){var s=J,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||ts;if(!o){var l=s.alternate,c=l!==null&&l.memoizedState!==null||it;l=ts;var d=it;if(ts=o,(it=c)&&!d)for(J=s;J!==null;)o=J,c=o.child,o.tag===22&&o.memoizedState!==null?jd(s):c!==null?(c.return=o,J=c):jd(s);for(;i!==null;)J=i,of(i),i=i.sibling;J=s,ts=l,it=d}wd(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,J=i):wd(e)}}function wd(e){for(;J!==null;){var t=J;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:it||pi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!it)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:At(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&sd(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}sd(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&fa(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(H(163))}it||t.flags&512&&Uo(t)}catch(u){Te(t,t.return,u)}}if(t===e){J=null;break}if(n=t.sibling,n!==null){n.return=t.return,J=n;break}J=t.return}}function kd(e){for(;J!==null;){var t=J;if(t===e){J=null;break}var n=t.sibling;if(n!==null){n.return=t.return,J=n;break}J=t.return}}function jd(e){for(;J!==null;){var t=J;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{pi(4,t)}catch(c){Te(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){Te(t,s,c)}}var i=t.return;try{Uo(t)}catch(c){Te(t,i,c)}break;case 5:var o=t.return;try{Uo(t)}catch(c){Te(t,o,c)}}}catch(c){Te(t,t.return,c)}if(t===e){J=null;break}var l=t.sibling;if(l!==null){l.return=t.return,J=l;break}J=t.return}}var sg=Math.ceil,Us=fn.ReactCurrentDispatcher,Vl=fn.ReactCurrentOwner,zt=fn.ReactCurrentBatchConfig,xe=0,qe=null,Be=null,Je=0,wt=0,fr=Rn(0),He=0,_a=null,qn=0,fi=0,Ul=0,ia=null,mt=null,Hl=0,Cr=1/0,nn=null,Hs=!1,Go=null,Cn=null,ns=!1,wn=null,Ys=0,oa=0,Xo=null,ys=-1,bs=0;function dt(){return xe&6?Le():ys!==-1?ys:ys=Le()}function Mn(e){return e.mode&1?xe&2&&Je!==0?Je&-Je:Wm.transition!==null?(bs===0&&(bs=Uu()),bs):(e=we,e!==0||(e=window.event,e=e===void 0?16:Qu(e.type)),e):1}function Vt(e,t,n,r){if(50<oa)throw oa=0,Xo=null,Error(H(185));za(e,n,r),(!(xe&2)||e!==qe)&&(e===qe&&(!(xe&2)&&(fi|=n),He===4&&yn(e,Je)),yt(e,r),n===1&&xe===0&&!(t.mode&1)&&(Cr=Le()+500,ci&&Tn()))}function yt(e,t){var n=e.callbackNode;W0(e,t);var r=Es(e,e===qe?Je:0);if(r===0)n!==null&&Pc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Pc(n),t===1)e.tag===0?Bm(_d.bind(null,e)):hp(_d.bind(null,e)),Am(function(){!(xe&6)&&Tn()}),n=null;else{switch(Hu(r)){case 1:n=xl;break;case 4:n=Wu;break;case 16:n=Ms;break;case 536870912:n=Vu;break;default:n=Ms}n=gf(n,lf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function lf(e,t){if(ys=-1,bs=0,xe&6)throw Error(H(327));var n=e.callbackNode;if(yr()&&e.callbackNode!==n)return null;var r=Es(e,e===qe?Je:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Gs(e,r);else{t=r;var s=xe;xe|=2;var i=df();(qe!==e||Je!==t)&&(nn=null,Cr=Le()+500,Un(e,t));do try{lg();break}catch(l){cf(e,l)}while(!0);zl(),Us.current=i,xe=s,Be!==null?t=0:(qe=null,Je=0,t=He)}if(t!==0){if(t===2&&(s=wo(e),s!==0&&(r=s,t=Ko(e,s))),t===1)throw n=_a,Un(e,0),yn(e,r),yt(e,Le()),n;if(t===6)yn(e,r);else{if(s=e.current.alternate,!(r&30)&&!ig(s)&&(t=Gs(e,r),t===2&&(i=wo(e),i!==0&&(r=i,t=Ko(e,i))),t===1))throw n=_a,Un(e,0),yn(e,r),yt(e,Le()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(H(345));case 2:Fn(e,mt,nn);break;case 3:if(yn(e,r),(r&130023424)===r&&(t=Hl+500-Le(),10<t)){if(Es(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){dt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Eo(Fn.bind(null,e,mt,nn),t);break}Fn(e,mt,nn);break;case 4:if(yn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-Wt(r);i=1<<o,o=t[o],o>s&&(s=o),r&=~i}if(r=s,r=Le()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*sg(r/1960))-r,10<r){e.timeoutHandle=Eo(Fn.bind(null,e,mt,nn),r);break}Fn(e,mt,nn);break;case 5:Fn(e,mt,nn);break;default:throw Error(H(329))}}}return yt(e,Le()),e.callbackNode===n?lf.bind(null,e):null}function Ko(e,t){var n=ia;return e.current.memoizedState.isDehydrated&&(Un(e,t).flags|=256),e=Gs(e,t),e!==2&&(t=mt,mt=n,t!==null&&qo(t)),e}function qo(e){mt===null?mt=e:mt.push.apply(mt,e)}function ig(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Ut(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yn(e,t){for(t&=~Ul,t&=~fi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Wt(t),r=1<<n;e[n]=-1,t&=~r}}function _d(e){if(xe&6)throw Error(H(327));yr();var t=Es(e,0);if(!(t&1))return yt(e,Le()),null;var n=Gs(e,t);if(e.tag!==0&&n===2){var r=wo(e);r!==0&&(t=r,n=Ko(e,r))}if(n===1)throw n=_a,Un(e,0),yn(e,t),yt(e,Le()),n;if(n===6)throw Error(H(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Fn(e,mt,nn),yt(e,Le()),null}function Yl(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===0&&(Cr=Le()+500,ci&&Tn())}}function Qn(e){wn!==null&&wn.tag===0&&!(xe&6)&&yr();var t=xe;xe|=1;var n=zt.transition,r=we;try{if(zt.transition=null,we=1,e)return e()}finally{we=r,zt.transition=n,xe=t,!(xe&6)&&Tn()}}function Gl(){wt=fr.current,Se(fr)}function Un(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lm(n)),Be!==null)for(n=Be.return;n!==null;){var r=n;switch(Cl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ts();break;case 3:Nr(),Se(xt),Se(ot),Ll();break;case 5:Il(r);break;case 4:Nr();break;case 13:Se(Ee);break;case 19:Se(Ee);break;case 10:$l(r.type._context);break;case 22:case 23:Gl()}n=n.return}if(qe=e,Be=e=En(e.current,null),Je=wt=t,He=0,_a=null,Ul=fi=qn=0,mt=ia=null,Bn!==null){for(t=0;t<Bn.length;t++)if(n=Bn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Bn=null}return e}function cf(e,t){do{var n=Be;try{if(zl(),hs.current=Vs,Ws){for(var r=ze.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Ws=!1}if(Kn=0,Ke=Ue=ze=null,aa=!1,wa=0,Vl.current=null,n===null||n.return===null){He=1,_a=t,Be=null;break}e:{var i=e,o=n.return,l=n,c=t;if(t=Je,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var m=ud(o);if(m!==null){m.flags&=-257,pd(m,o,l,i,t),m.mode&1&&dd(i,d,t),t=m,c=d;var w=t.updateQueue;if(w===null){var _=new Set;_.add(c),t.updateQueue=_}else w.add(c);break e}else{if(!(t&1)){dd(i,d,t),Xl();break e}c=Error(H(426))}}else if(Me&&l.mode&1){var M=ud(o);if(M!==null){!(M.flags&65536)&&(M.flags|=256),pd(M,o,l,i,t),Ml(Sr(c,l));break e}}i=c=Sr(c,l),He!==4&&(He=2),ia===null?ia=[i]:ia.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var v=Hp(i,c,t);ad(i,v);break e;case 1:l=c;var g=i.type,x=i.stateNode;if(!(i.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(Cn===null||!Cn.has(x)))){i.flags|=65536,t&=-t,i.lanes|=t;var N=Yp(i,l,t);ad(i,N);break e}}i=i.return}while(i!==null)}pf(n)}catch(S){t=S,Be===n&&n!==null&&(Be=n=n.return);continue}break}while(!0)}function df(){var e=Us.current;return Us.current=Vs,e===null?Vs:e}function Xl(){(He===0||He===3||He===2)&&(He=4),qe===null||!(qn&268435455)&&!(fi&268435455)||yn(qe,Je)}function Gs(e,t){var n=xe;xe|=2;var r=df();(qe!==e||Je!==t)&&(nn=null,Un(e,t));do try{og();break}catch(s){cf(e,s)}while(!0);if(zl(),xe=n,Us.current=r,Be!==null)throw Error(H(261));return qe=null,Je=0,He}function og(){for(;Be!==null;)uf(Be)}function lg(){for(;Be!==null&&!R0();)uf(Be)}function uf(e){var t=mf(e.alternate,e,wt);e.memoizedProps=e.pendingProps,t===null?pf(e):Be=t,Vl.current=null}function pf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=tg(n,t),n!==null){n.flags&=32767,Be=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{He=6,Be=null;return}}else if(n=eg(n,t,wt),n!==null){Be=n;return}if(t=t.sibling,t!==null){Be=t;return}Be=t=e}while(t!==null);He===0&&(He=5)}function Fn(e,t,n){var r=we,s=zt.transition;try{zt.transition=null,we=1,cg(e,t,n,r)}finally{zt.transition=s,we=r}return null}function cg(e,t,n,r){do yr();while(wn!==null);if(xe&6)throw Error(H(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(H(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(V0(e,i),e===qe&&(Be=qe=null,Je=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ns||(ns=!0,gf(Ms,function(){return yr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=zt.transition,zt.transition=null;var o=we;we=1;var l=xe;xe|=4,Vl.current=null,rg(e,n),sf(n,e),Em(Co),zs=!!So,Co=So=null,e.current=n,ag(n),T0(),xe=l,we=o,zt.transition=i}else e.current=n;if(ns&&(ns=!1,wn=e,Ys=s),i=e.pendingLanes,i===0&&(Cn=null),A0(n.stateNode),yt(e,Le()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Hs)throw Hs=!1,e=Go,Go=null,e;return Ys&1&&e.tag!==0&&yr(),i=e.pendingLanes,i&1?e===Xo?oa++:(oa=0,Xo=e):oa=0,Tn(),null}function yr(){if(wn!==null){var e=Hu(Ys),t=zt.transition,n=we;try{if(zt.transition=null,we=16>e?16:e,wn===null)var r=!1;else{if(e=wn,wn=null,Ys=0,xe&6)throw Error(H(331));var s=xe;for(xe|=4,J=e.current;J!==null;){var i=J,o=i.child;if(J.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(J=d;J!==null;){var p=J;switch(p.tag){case 0:case 11:case 15:sa(8,p,i)}var f=p.child;if(f!==null)f.return=p,J=f;else for(;J!==null;){p=J;var u=p.sibling,m=p.return;if(nf(p),p===d){J=null;break}if(u!==null){u.return=m,J=u;break}J=m}}}var w=i.alternate;if(w!==null){var _=w.child;if(_!==null){w.child=null;do{var M=_.sibling;_.sibling=null,_=M}while(_!==null)}}J=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,J=o;else e:for(;J!==null;){if(i=J,i.flags&2048)switch(i.tag){case 0:case 11:case 15:sa(9,i,i.return)}var v=i.sibling;if(v!==null){v.return=i.return,J=v;break e}J=i.return}}var g=e.current;for(J=g;J!==null;){o=J;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,J=x;else e:for(o=g;J!==null;){if(l=J,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:pi(9,l)}}catch(S){Te(l,l.return,S)}if(l===o){J=null;break e}var N=l.sibling;if(N!==null){N.return=l.return,J=N;break e}J=l.return}}if(xe=s,Tn(),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(ai,e)}catch{}r=!0}return r}finally{we=n,zt.transition=t}}return!1}function Nd(e,t,n){t=Sr(n,t),t=Hp(e,t,1),e=Sn(e,t,1),t=dt(),e!==null&&(za(e,1,t),yt(e,t))}function Te(e,t,n){if(e.tag===3)Nd(e,e,n);else for(;t!==null;){if(t.tag===3){Nd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Cn===null||!Cn.has(r))){e=Sr(n,e),e=Yp(t,e,1),t=Sn(t,e,1),e=dt(),t!==null&&(za(t,1,e),yt(t,e));break}}t=t.return}}function dg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=dt(),e.pingedLanes|=e.suspendedLanes&n,qe===e&&(Je&n)===n&&(He===4||He===3&&(Je&130023424)===Je&&500>Le()-Hl?Un(e,0):Ul|=n),yt(e,t)}function ff(e,t){t===0&&(e.mode&1?(t=Ya,Ya<<=1,!(Ya&130023424)&&(Ya=4194304)):t=1);var n=dt();e=dn(e,t),e!==null&&(za(e,t,n),yt(e,n))}function ug(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ff(e,n)}function pg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(H(314))}r!==null&&r.delete(t),ff(e,n)}var mf;mf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||xt.current)gt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return gt=!1,Jm(e,t,n);gt=!!(e.flags&131072)}else gt=!1,Me&&t.flags&1048576&&xp(t,As,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;vs(e,t),e=t.pendingProps;var s=kr(t,ot.current);vr(t,n),s=Ol(null,t,r,e,s,n);var i=Fl();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,vt(r)?(i=!0,Is(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Rl(t),s.updater=ui,t.stateNode=s,s._reactInternals=t,Lo(t,r,e,n),t=Fo(null,t,r,!0,i,n)):(t.tag=0,Me&&i&&Sl(t),ct(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(vs(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=mg(r),e=At(r,e),s){case 0:t=Oo(null,t,r,e,n);break e;case 1:t=gd(null,t,r,e,n);break e;case 11:t=fd(null,t,r,e,n);break e;case 14:t=md(null,t,r,At(r.type,e),n);break e}throw Error(H(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:At(r,s),Oo(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:At(r,s),gd(e,t,r,s,n);case 3:e:{if(qp(t),e===null)throw Error(H(387));r=t.pendingProps,i=t.memoizedState,s=i.element,jp(e,t),Ds(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=Sr(Error(H(423)),t),t=hd(e,t,r,n,s);break e}else if(r!==s){s=Sr(Error(H(424)),t),t=hd(e,t,r,n,s);break e}else for(kt=Nn(t.stateNode.containerInfo.firstChild),jt=t,Me=!0,Ft=null,n=wp(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(jr(),r===s){t=un(e,t,n);break e}ct(e,t,r,n)}t=t.child}return t;case 5:return _p(t),e===null&&Ro(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,o=s.children,Mo(r,s)?o=null:i!==null&&Mo(r,i)&&(t.flags|=32),Kp(e,t),ct(e,t,o,n),t.child;case 6:return e===null&&Ro(t),null;case 13:return Qp(e,t,n);case 4:return Tl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=_r(t,null,r,n):ct(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:At(r,s),fd(e,t,r,s,n);case 7:return ct(e,t,t.pendingProps,n),t.child;case 8:return ct(e,t,t.pendingProps.children,n),t.child;case 12:return ct(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,o=s.value,je(Os,r._currentValue),r._currentValue=o,i!==null)if(Ut(i.value,o)){if(i.children===s.children&&!xt.current){t=un(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=on(-1,n&-n),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?c.next=c:(c.next=p.next,p.next=c),d.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),To(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(H(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),To(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ct(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,vr(t,n),s=$t(s),r=r(s),t.flags|=1,ct(e,t,r,n),t.child;case 14:return r=t.type,s=At(r,t.pendingProps),s=At(r.type,s),md(e,t,r,s,n);case 15:return Gp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:At(r,s),vs(e,t),t.tag=1,vt(r)?(e=!0,Is(t)):e=!1,vr(t,n),Up(t,r,s),Lo(t,r,s,n),Fo(null,t,r,!0,e,n);case 19:return Zp(e,t,n);case 22:return Xp(e,t,n)}throw Error(H(156,t.tag))};function gf(e,t){return Bu(e,t)}function fg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Et(e,t,n,r){return new fg(e,t,n,r)}function Kl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function mg(e){if(typeof e=="function")return Kl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ml)return 11;if(e===gl)return 14}return 2}function En(e,t){var n=e.alternate;return n===null?(n=Et(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ws(e,t,n,r,s,i){var o=2;if(r=e,typeof e=="function")Kl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case rr:return Hn(n.children,s,i,t);case fl:o=8,s|=8;break;case so:return e=Et(12,n,t,s|2),e.elementType=so,e.lanes=i,e;case io:return e=Et(13,n,t,s),e.elementType=io,e.lanes=i,e;case oo:return e=Et(19,n,t,s),e.elementType=oo,e.lanes=i,e;case _u:return mi(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ku:o=10;break e;case ju:o=9;break e;case ml:o=11;break e;case gl:o=14;break e;case gn:o=16,r=null;break e}throw Error(H(130,e==null?e:typeof e,""))}return t=Et(o,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function Hn(e,t,n,r){return e=Et(7,e,r,t),e.lanes=n,e}function mi(e,t,n,r){return e=Et(22,e,r,t),e.elementType=_u,e.lanes=n,e.stateNode={isHidden:!1},e}function Gi(e,t,n){return e=Et(6,e,null,t),e.lanes=n,e}function Xi(e,t,n){return t=Et(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function gg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Mi(0),this.expirationTimes=Mi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Mi(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function ql(e,t,n,r,s,i,o,l,c){return e=new gg(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Et(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Rl(i),e}function hg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:nr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function hf(e){if(!e)return $n;e=e._reactInternals;e:{if(er(e)!==e||e.tag!==1)throw Error(H(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(vt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(H(171))}if(e.tag===1){var n=e.type;if(vt(n))return gp(e,n,t)}return t}function xf(e,t,n,r,s,i,o,l,c){return e=ql(n,r,!0,e,s,i,o,l,c),e.context=hf(null),n=e.current,r=dt(),s=Mn(n),i=on(r,s),i.callback=t??null,Sn(n,i,s),e.current.lanes=s,za(e,s,r),yt(e,r),e}function gi(e,t,n,r){var s=t.current,i=dt(),o=Mn(s);return n=hf(n),t.context===null?t.context=n:t.pendingContext=n,t=on(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Sn(s,t,o),e!==null&&(Vt(e,s,o,i),gs(e,s,o)),o}function Xs(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Sd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ql(e,t){Sd(e,t),(e=e.alternate)&&Sd(e,t)}function xg(){return null}var vf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Zl(e){this._internalRoot=e}hi.prototype.render=Zl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(H(409));gi(e,t,null,null)};hi.prototype.unmount=Zl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Qn(function(){gi(null,e,null,null)}),t[cn]=null}};function hi(e){this._internalRoot=e}hi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Xu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<vn.length&&t!==0&&t<vn[n].priority;n++);vn.splice(n,0,e),n===0&&qu(e)}};function Jl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function xi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Cd(){}function vg(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var d=Xs(o);i.call(d)}}var o=xf(t,r,e,0,null,!1,!1,"",Cd);return e._reactRootContainer=o,e[cn]=o.current,ha(e.nodeType===8?e.parentNode:e),Qn(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var d=Xs(c);l.call(d)}}var c=ql(e,0,!1,null,null,!1,!1,"",Cd);return e._reactRootContainer=c,e[cn]=c.current,ha(e.nodeType===8?e.parentNode:e),Qn(function(){gi(t,c,n,r)}),c}function vi(e,t,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var c=Xs(o);l.call(c)}}gi(t,o,e,s)}else o=vg(n,t,e,s,r);return Xs(o)}Yu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Xr(t.pendingLanes);n!==0&&(vl(t,n|1),yt(t,Le()),!(xe&6)&&(Cr=Le()+500,Tn()))}break;case 13:Qn(function(){var r=dn(e,1);if(r!==null){var s=dt();Vt(r,e,1,s)}}),Ql(e,1)}};yl=function(e){if(e.tag===13){var t=dn(e,134217728);if(t!==null){var n=dt();Vt(t,e,134217728,n)}Ql(e,134217728)}};Gu=function(e){if(e.tag===13){var t=Mn(e),n=dn(e,t);if(n!==null){var r=dt();Vt(n,e,t,r)}Ql(e,t)}};Xu=function(){return we};Ku=function(e,t){var n=we;try{return we=e,t()}finally{we=n}};vo=function(e,t,n){switch(t){case"input":if(uo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=li(r);if(!s)throw Error(H(90));Su(r),uo(r,s)}}}break;case"textarea":Mu(e,n);break;case"select":t=n.value,t!=null&&mr(e,!!n.multiple,t,!1)}};Iu=Yl;Lu=Qn;var yg={usingClientEntryPoint:!1,Events:[Pa,or,li,Ru,Tu,Yl]},Wr={findFiberByHostInstance:Dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},bg={bundleType:Wr.bundleType,version:Wr.version,rendererPackageName:Wr.rendererPackageName,rendererConfig:Wr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Fu(e),e===null?null:e.stateNode},findFiberByHostInstance:Wr.findFiberByHostInstance||xg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rs.isDisabled&&rs.supportsFiber)try{ai=rs.inject(bg),qt=rs}catch{}}Nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yg;Nt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Jl(t))throw Error(H(200));return hg(e,t,null,n)};Nt.createRoot=function(e,t){if(!Jl(e))throw Error(H(299));var n=!1,r="",s=vf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=ql(e,1,!1,null,null,n,!1,r,s),e[cn]=t.current,ha(e.nodeType===8?e.parentNode:e),new Zl(t)};Nt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(H(188)):(e=Object.keys(e).join(","),Error(H(268,e)));return e=Fu(t),e=e===null?null:e.stateNode,e};Nt.flushSync=function(e){return Qn(e)};Nt.hydrate=function(e,t,n){if(!xi(t))throw Error(H(200));return vi(null,e,t,!0,n)};Nt.hydrateRoot=function(e,t,n){if(!Jl(e))throw Error(H(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=vf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=xf(t,null,e,1,n??null,s,!1,i,o),e[cn]=t.current,ha(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new hi(t)};Nt.render=function(e,t,n){if(!xi(t))throw Error(H(200));return vi(null,e,t,!1,n)};Nt.unmountComponentAtNode=function(e){if(!xi(e))throw Error(H(40));return e._reactRootContainer?(Qn(function(){vi(null,null,e,!1,function(){e._reactRootContainer=null,e[cn]=null})}),!0):!1};Nt.unstable_batchedUpdates=Yl;Nt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!xi(n))throw Error(H(200));if(e==null||e._reactInternals===void 0)throw Error(H(38));return vi(e,t,n,!1,r)};Nt.version="18.3.1-next-f1338f8080-20240426";function yf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yf)}catch(e){console.error(e)}}yf(),vu.exports=Nt;var wg=vu.exports,Md=wg;ro.createRoot=Md.createRoot,ro.hydrateRoot=Md.hydrateRoot;const Ki={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.settings":"Settings","nav.more":"More","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.settings":"設定","nav.more":"更多","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},bf=h.createContext(null);function kg({children:e}){const[t,n]=h.useState(()=>{const i=localStorage.getItem("language");return i&&Ki[i]?i:navigator.language.startsWith("zh")?"zh-TW":"en"}),r=h.useCallback(i=>{n(i),localStorage.setItem("language",i)},[]),s=h.useCallback((i,o)=>{let l=Ki[t][i]||Ki.en[i]||i;return o&&Object.entries(o).forEach(([c,d])=>{l=l.replace(`{${c}}`,String(d))}),l},[t]);return a.jsx(bf.Provider,{value:{language:t,setLanguage:r,t:s},children:e})}function Ie(){const e=h.useContext(bf);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}function jg(e={}){const{onMessage:t,onConnect:n,onDisconnect:r,onError:s,reconnectInterval:i=2e3,pingInterval:o=5e3}=e,l=h.useRef(null),c=h.useRef(null),d=h.useRef(null),p=h.useRef(t),[f,u]=h.useState({connected:!1,connecting:!1,lastMessageTime:0});p.current=t;const m=h.useCallback(()=>{const v=window.location.protocol==="https:"?"wss:":"ws:",g=window.location.host;return`${v}//${g}/ws`},[]),w=h.useCallback(()=>{var g;if(((g=l.current)==null?void 0:g.readyState)===WebSocket.OPEN)return;u(x=>({...x,connecting:!0}));const v=new WebSocket(m());l.current=v,v.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{v.readyState===WebSocket.OPEN&&v.send(JSON.stringify({type:"ping"}))},o)},v.onmessage=x=>{var N;try{const S=JSON.parse(x.data);u(T=>({...T,lastMessageTime:Date.now()})),(S.type==="initial"||S.type==="update")&&(N=S.data)!=null&&N.clusters&&p.current&&p.current(S.data.clusters)}catch(S){console.error("[WS] Failed to parse message:",S)}},v.onerror=x=>{console.error("[WS] Error:",x),s==null||s(x)},v.onclose=()=>{u(x=>({...x,connected:!1,connecting:!1})),r==null||r(),d.current&&(clearInterval(d.current),d.current=null),c.current&&clearTimeout(c.current),c.current=window.setTimeout(()=>{w()},i)}},[m,n,r,s,i,o]),_=h.useCallback(()=>{c.current&&(clearTimeout(c.current),c.current=null),d.current&&(clearInterval(d.current),d.current=null),l.current&&(l.current.close(),l.current=null)},[]),M=h.useCallback(v=>{var g;((g=l.current)==null?void 0:g.readyState)===WebSocket.OPEN&&l.current.send(JSON.stringify(v))},[]);return h.useEffect(()=>(w(),()=>{_()}),[w,_]),h.useEffect(()=>{const v=setInterval(()=>{const x=Date.now()-f.lastMessageTime;f.connected&&x>15e3&&(_(),w())},5e3);return()=>clearInterval(v)},[f.connected,f.lastMessageTime,w,_]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:M,reconnect:w,disconnect:_}}const _g="/api";async function Re(e,t){const n=await fetch(`${_g}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}return n.json()}const Zt={authMe:()=>Re("/auth/me"),authLogin:(e,t)=>Re("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Re("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Re("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Re("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Re("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Re("/config"),updateConfig:e=>Re("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Re("/clusters"),getCluster:e=>Re(`/clusters/${e}`),getSummary:()=>Re("/summary"),getNodes:e=>Re(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Re(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Re(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Re(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Re("/health"),vmAction:(e,t,n,r)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${r}`,{method:"POST"}),ctAction:(e,t,n,r)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${r}`,{method:"POST"}),guestAction:(e,t,n,r,s)=>r==="lxc"?Zt.ctAction(e,t,n,s):Zt.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>Re(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`)};function he(e,t=1){if(e===0)return"0 B";const n=1024,r=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${r[s]}`}function Ae(e,t=1){return`${e.toFixed(t)}%`}function yi(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),r=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),r>0&&s.push(`${r}m`),s.length>0?s.join(" "):"< 1m"}function ue(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function Qo(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function Ng({value:e,suffix:t="",className:n=""}){const r=m=>{if(typeof m=="number")return{left:m,isRatio:!1};const w=String(m).match(/^(\d+)\/(\d+)$/);if(w)return{left:parseInt(w[1]),right:parseInt(w[2]),isRatio:!0};const _=parseFloat(String(m));return isNaN(_)?{left:0,isRatio:!1}:{left:_,isRatio:!1}},s=r(e),[i,o]=h.useState(0),[l,c]=h.useState(s.right||0),d=h.useRef(null),p=h.useRef(0),f=h.useRef(!0);h.useEffect(()=>{const m=r(e),w=800,_=f.current?0:i,M=f.current?0:l;f.current=!1,d.current=null;const v=g=>{d.current||(d.current=g);const x=g-d.current,N=Math.min(x/w,1),S=1-Math.pow(1-N,3),T=_+(m.left-_)*S;if(o(Math.round(T)),m.isRatio&&m.right!==void 0){const A=M+(m.right-M)*S;c(Math.round(A))}N<1?p.current=requestAnimationFrame(v):(o(m.left),m.right!==void 0&&c(m.right))};return p.current=requestAnimationFrame(v),()=>{p.current&&cancelAnimationFrame(p.current)}},[e]);const u=s.isRatio?`${i}/${l}`:i;return a.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&a.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function Ed({value:e,decimals:t=0,className:n=""}){const[r,s]=h.useState(0),i=h.useRef(null),o=h.useRef(0),l=h.useRef(!0);return h.useEffect(()=>{const d=l.current?0:r;l.current=!1,i.current=null;const p=f=>{i.current||(i.current=f);const u=f-i.current,m=Math.min(u/800,1),w=1-Math.pow(1-m,3),_=d+(e-d)*w;s(_),m<1?o.current=requestAnimationFrame(p):s(e)};return o.current=requestAnimationFrame(p),()=>{o.current&&cancelAnimationFrame(o.current)}},[e]),a.jsxs("span",{className:n,children:[r.toFixed(t),"%"]})}function qi({left:e,right:t,className:n=""}){const[r,s]=h.useState(0),[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const f=d.current?0:r,u=d.current?0:i;d.current=!1,l.current=null;const m=w=>{l.current||(l.current=w);const _=w-l.current,M=Math.min(_/800,1),v=1-Math.pow(1-M,3);s(Math.round(f+(e-f)*v)),o(Math.round(u+(t-u)*v)),M<1?c.current=requestAnimationFrame(m):(s(e),o(t))};return c.current=requestAnimationFrame(m),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),a.jsxs("span",{className:n,children:[r,"/",i]})}function as({label:e,value:t,suffix:n,subValue:r,color:s="primary",icon:i}){return a.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[i&&a.jsx("div",{className:"stat-icon",children:i}),a.jsxs("div",{className:"stat-content",children:[a.jsx("div",{className:"stat-label",children:e}),a.jsx(Ng,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),r&&a.jsx("div",{className:"stat-sub",children:r})]})]})}function Qi({value:e,label:t,color:n,size:r=100}){const[s,i]=h.useState(0),o=h.useRef(null),l=h.useRef(0),c=h.useRef(!0);h.useEffect(()=>{const v=c.current?0:s;c.current=!1,o.current=null;const g=x=>{o.current||(o.current=x);const N=x-o.current,S=Math.min(N/1e3,1),T=1-Math.pow(1-S,3),A=v+(e-v)*T;i(A),S<1?l.current=requestAnimationFrame(g):i(e)};return l.current=requestAnimationFrame(g),()=>{l.current&&cancelAnimationFrame(l.current)}},[e]);const d=5,p=(r-d*4)/2-8,f=(r-d)/2,u=p+(f-p)/2,m=2*Math.PI*u,w=m-s/100*m,_=Array.from({length:36},(M,v)=>{const g=(v*10-90)*(Math.PI/180),x=v%3===0,N=x?6:3,S=f-2,T=S-N;return{x1:r/2+Math.cos(g)*S,y1:r/2+Math.sin(g)*S,x2:r/2+Math.cos(g)*T,y2:r/2+Math.sin(g)*T,isMajor:x}});return a.jsxs("div",{className:"ring-gauge",children:[a.jsxs("svg",{viewBox:`0 0 ${r} ${r}`,className:"ring-svg",children:[a.jsx("circle",{className:"ring-outer-deco",cx:r/2,cy:r/2,r:f,strokeWidth:1}),_.map((M,v)=>a.jsx("line",{x1:M.x1,y1:M.y1,x2:M.x2,y2:M.y2,className:`ring-tick ${M.isMajor?"major":""}`},v)),a.jsx("circle",{className:"ring-bg",cx:r/2,cy:r/2,r:u,strokeWidth:d}),a.jsx("circle",{className:"ring-inner-deco",cx:r/2,cy:r/2,r:p,strokeWidth:1}),a.jsx("circle",{className:`ring-fill ${n}`,cx:r/2,cy:r/2,r:u,strokeWidth:d,strokeDasharray:m,strokeDashoffset:w,transform:`rotate(-90 ${r/2} ${r/2})`}),a.jsx("line",{className:"ring-sweep",x1:r/2,y1:r/2,x2:r/2,y2:r/2-u-4,transform:`rotate(${s/100*360-90} ${r/2} ${r/2})`})]}),a.jsxs("div",{className:"ring-content",children:[a.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),a.jsx("span",{className:"ring-percent",children:"%"})]}),a.jsx("span",{className:"ring-label",children:t})]})]})}function Sg({cluster:e,onClick:t}){var c,d;const{t:n}=Ie(),r=e.summary;if(!r)return null;const s=ue(r.total_cpu_usage),i=ue(r.total_memory_usage),o=r.alerts_warning>0,l=r.alerts_critical>0;return a.jsxs("div",{className:`cluster-hex-card ${l?"critical":o?"warning":""}`,onClick:t,children:[a.jsxs("div",{className:"cluster-hex-inner",children:[a.jsxs("div",{className:"cluster-hex-header",children:[a.jsxs("div",{className:"cluster-hex-title",children:[a.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),r.is_standalone&&a.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),a.jsx("span",{className:`cluster-hex-status ${r.status==="connected"?"online":"offline"}`})]}),a.jsxs("div",{className:"cluster-hex-metrics",children:[a.jsxs("div",{className:"cluster-hex-metric",children:[a.jsx("span",{className:"metric-label",children:"CPU"}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${r.total_cpu_usage}%`}})}),a.jsx(Ed,{value:r.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),a.jsxs("div",{className:"cluster-hex-metric",children:[a.jsx("span",{className:"metric-label",children:"MEM"}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-bar-fill ${i}`,style:{width:`${r.total_memory_usage}%`}})}),a.jsx(Ed,{value:r.total_memory_usage,decimals:0,className:`metric-value small text-${i}`})]})]}),a.jsxs("div",{className:"cluster-hex-stats",children:[a.jsxs("div",{className:"hex-stat",children:[a.jsx(qi,{left:r.nodes_online,right:r.node_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),a.jsxs("div",{className:"hex-stat",children:[a.jsx(qi,{left:r.vms_running,right:r.vm_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),a.jsxs("div",{className:"hex-stat",children:[a.jsx(qi,{left:r.cts_running,right:r.ct_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),r.has_ceph&&a.jsx("div",{className:"cluster-hex-ceph",children:a.jsxs("span",{className:`ceph-badge ${((c=r.ceph_health)==null?void 0:c.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=r.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function zd({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:r=!1}){const{t:s}=Ie(),i=h.useMemo(()=>Object.entries(e),[e]),o=h.useMemo(()=>{let l=0,c=0,d=0,p=0;return Object.values(e).forEach(f=>{f.summary&&(l+=f.summary.total_cpu_usage||0,c+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,p++)}),{avgCpu:p>0?l/p:0,avgMem:p>0?c/p:0,avgStorage:p>0?d/p:0}},[e]);return a.jsxs("div",{className:"command-center",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"cc-header",children:[a.jsx("h1",{className:"cc-title font-display",children:a.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),a.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),a.jsxs("div",{className:"cc-content",children:[a.jsxs("div",{className:"cc-top-row",children:[a.jsxs("div",{className:"cc-gauges panel panel-scan",children:[a.jsx("div",{className:"panel-header",children:a.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),a.jsxs("div",{className:"gauges-container",children:[a.jsx(Qi,{value:o.avgCpu,label:s("metric.cpu"),color:ue(o.avgCpu),size:110}),a.jsx(Qi,{value:o.avgMem,label:s("metric.memory"),color:ue(o.avgMem),size:110}),a.jsx(Qi,{value:o.avgStorage,label:s("metric.disk"),color:ue(o.avgStorage),size:110})]})]}),a.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[a.jsx("div",{className:"panel-header",children:a.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),a.jsxs("div",{className:"stats-grid",children:[a.jsx(as,{label:s("cluster.total"),value:t.total_clusters,icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),a.jsx(as,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),a.jsx("path",{d:"M8 21h8M12 17v4"})]})}),a.jsx(as,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18M9 3v18"})]})}),a.jsx(as,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),a.jsxs("div",{className:"cc-galaxy",children:[a.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),a.jsx("div",{className:"galaxy-container",children:i.length===0?a.jsxs("div",{className:"no-clusters",children:[a.jsx("div",{className:"no-clusters-icon",children:a.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 6v6l4 2"})]})}),a.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),a.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):a.jsx("div",{className:"cluster-grid",children:i.map(([l,c])=>a.jsx(Sg,{cluster:c,onClick:()=>n(l)},l))})})]})]}),a.jsx("style",{children:`
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
          font-size: 12px;
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
          font-size: 12px;
          opacity: 0.7;
        }

        .ring-label {
          font-family: var(--font-display);
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .stat-sub {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 14px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .no-clusters-hint {
          font-family: var(--font-mono);
          font-size: 13px;
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
            font-size: 14px;
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
            font-size: 11px;
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
      `})]})}function Cg(e,t,n){const r=Math.min(e,100)/100,s=.1+r*.6,i=t;let o=(Math.random()-.5)*.02;if(i>.08&&i<.22){const l=(i-.08)/.14;o+=s*.2*Math.sin(l*Math.PI)}if(i>.24&&i<.4){const l=(i-.24)/.16;if(l<.2)o-=s*.15*Math.sin(l*5*Math.PI);else if(l<.5){const c=(l-.2)/.3;o+=s*(1+r*.5)*Math.sin(c*Math.PI)}else if(l<.7){const c=(l-.5)/.2;o-=s*.25*Math.sin(c*Math.PI)}}if(i>.48&&i<.72){const l=(i-.48)/.24;o+=s*.35*Math.sin(l*Math.PI)}return o*n}function Zi({value:e,label:t,color:n,isOnline:r,width:s=180,height:i=35,isPaused:o=!1}){const l=h.useRef(null),c=h.useRef(null),d=h.useRef([]),p=h.useRef(0),f=h.useRef(0),u=h.useRef(0),m=h.useRef(0),w=h.useRef(!o),_=h.useRef(!1),v=6e4/(50+e/100*50),g=12;h.useEffect(()=>{w.current=!o},[o]);const x=h.useCallback(()=>{const S=c.current;if(!S)return;S.fillStyle="rgba(5, 8, 15, 0.95)",S.fillRect(0,0,s,i),S.strokeStyle="rgba(0, 240, 255, 0.08)",S.lineWidth=.5;for(let $=0;$<i;$+=10)S.beginPath(),S.moveTo(0,$),S.lineTo(s,$),S.stroke();for(let $=0;$<s;$+=10)S.beginPath(),S.moveTo($,0),S.lineTo($,i),S.stroke();const T=i/2,A=i*.45,E=!r||e>90?"#ff0040":e>70?"#ff6b00":n;S.shadowColor=E,S.shadowBlur=6,S.strokeStyle=E,S.lineWidth=1.5,S.lineCap="round",S.lineJoin="round",S.beginPath();let b=!1;for(let $=0;$<s;$++){const C=($-p.current+s)%s;if(C<8&&C>0)continue;const P=T-d.current[$]*A;b?S.lineTo($,P):(S.moveTo($,P),b=!0)}S.stroke(),S.shadowBlur=0,S.strokeStyle=`${E}60`,S.lineWidth=2,S.beginPath(),S.moveTo(p.current,0),S.lineTo(p.current,i),S.stroke();const z=S.createLinearGradient(p.current-15,0,p.current,0);z.addColorStop(0,"transparent"),z.addColorStop(1,`${E}30`),S.fillStyle=z,S.fillRect(p.current-15,0,15,i)},[s,i,e,r,n]);h.useEffect(()=>{const S=l.current;if(!S)return;const T=S.getContext("2d");if(!T)return;const A=window.devicePixelRatio||1;S.width=s*A,S.height=i*A,T.scale(A,A),c.current=T,d.current.length!==s&&(d.current=new Array(s).fill(0)),_.current=!0,x()},[s,i,x]),h.useEffect(()=>{if(!_.current||!c.current)return;const T=A=>{m.current||(m.current=A);const B=A-m.current;m.current=A;const E=B/1e3*g;f.current+=B/v,f.current>=1&&(f.current-=1);const b=Math.ceil(E);for(let z=0;z<b;z++){const C=(f.current+z/b*(B/v))%1;let P;r?P=Cg(e,C,1):P=(Math.random()-.5)*.01,p.current=(p.current+1)%s,d.current[p.current]=P;const W=(p.current+1)%s;for(let Y=0;Y<8;Y++){const F=(W+Y)%s;d.current[F]=0}}x(),w.current&&(u.current=requestAnimationFrame(T))};return o||(m.current=0,u.current=requestAnimationFrame(T)),()=>{cancelAnimationFrame(u.current)}},[s,i,e,r,v,g,o,x]);const N=()=>!r||e>90?"#ff0040":e>70?"#ff6b00":n;return a.jsxs("div",{className:"ecg-trace",children:[a.jsxs("div",{className:"ecg-trace-header",children:[a.jsx("span",{className:"ecg-trace-label",style:{color:N()},children:t}),a.jsx("span",{className:"ecg-trace-value",style:{color:N()},children:r?`${Math.round(e)}%`:"--"})]}),a.jsx("canvas",{ref:l,style:{width:s,height:i,display:"block"}}),a.jsx("style",{children:`
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
      `})]})}function Mg({cpu:e,memory:t,diskIO:n,isOnline:r,isPaused:s=!1}){const i=h.useRef(null),[o,l]=h.useState(180);return h.useEffect(()=>{const c=i.current;if(!c)return;const d=()=>{const f=c.clientWidth-6;f>0&&l(f)};d();const p=new ResizeObserver(d);return p.observe(c),()=>p.disconnect()},[]),a.jsxs("div",{className:"ecg-monitor-stack",ref:i,children:[a.jsx(Zi,{value:e,label:"CPU",color:"#00f0ff",isOnline:r,width:o,height:32,isPaused:s}),a.jsx(Zi,{value:t,label:"MEM",color:"#00ff88",isOnline:r,width:o,height:32,isPaused:s}),a.jsx(Zi,{value:n,label:"IOW",color:"#ffd700",isOnline:r,width:o,height:32,isPaused:s}),a.jsx("style",{children:`
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
      `})]})}function $d(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function Pd({value:e,decimals:t=0,suffix:n="",duration:r=800,className:s=""}){const[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const p=d.current?0:i;d.current=!1,l.current=null;const f=u=>{l.current||(l.current=u);const m=u-l.current,w=Math.min(m/r,1),_=1-Math.pow(1-w,3),M=p+(e-p)*_;o(M),w<1?c.current=requestAnimationFrame(f):o(e)};return c.current=requestAnimationFrame(f),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,r]),a.jsxs("span",{className:s,children:[i.toFixed(t),n]})}function Rd({left:e,right:t,className:n=""}){const[r,s]=h.useState(0),[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const f=d.current?0:r,u=d.current?0:i;d.current=!1,l.current=null;const m=w=>{l.current||(l.current=w);const _=w-l.current,M=Math.min(_/800,1),v=1-Math.pow(1-M,3);s(Math.round(f+(e-f)*v)),o(Math.round(u+(t-u)*v)),M<1?c.current=requestAnimationFrame(m):(s(e),o(t))};return c.current=requestAnimationFrame(m),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),a.jsxs("span",{className:n,children:[r,"/",i]})}function Eg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function zg(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function $g({state:e,onClose:t,onShowDetails:n,getNodeHealth:r}){const{t:s}=Ie();if(h.useEffect(()=>{const f=()=>t(),u=()=>t(),m=w=>{w.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",u,!0),document.addEventListener("keydown",m)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",u,!0),document.removeEventListener("keydown",m)}},[e.visible,t]),!e.visible||!e.node)return null;const i=e.node,o=i.status==="online",l=r(e.clusterId,i.node),c=l?`https://${l.host}:${l.port}/#v1:0:=node/${i.node}`:null,d=f=>{f.stopPropagation(),c&&window.open(c,"_blank","noopener,noreferrer"),t()},p=f=>{f.stopPropagation(),n(),t()};return a.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[a.jsxs("div",{className:"context-menu-header",children:[a.jsx("span",{className:`context-status ${o?"online":"offline"}`}),a.jsx("span",{className:"context-menu-name",children:i.node})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("button",{className:"context-menu-item",onClick:p,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:s("vm.details")})]}),c&&a.jsxs("button",{className:"context-menu-item",onClick:d,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),a.jsx("polyline",{points:"15,3 21,3 21,9"}),a.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),a.jsx("span",{children:s("node.open_pve")})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("div",{className:"context-menu-info",children:[a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("node.status"),":"]}),a.jsx("span",{className:o?"text-success":"text-danger",children:o?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("metric.cpu"),":"]}),a.jsxs("span",{children:[i.cpu.cores," ",s("node.cores")]})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("metric.memory"),":"]}),a.jsx("span",{children:he(i.memory.total_bytes)})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("cluster.vms_short"),":"]}),a.jsx("span",{children:i.vm_count})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("cluster.cts_short"),":"]}),a.jsx("span",{children:i.ct_count})]})]})]})}function Pg({cpuUsage:e,memUsage:t,compact:n,label:r="AVG LOAD"}){const s=(e+t)/2,i=ue(s),o=.3+s/100*.7,[l,c]=h.useState(0),d=h.useRef(null),p=h.useRef(0),f=h.useRef(!0);return h.useEffect(()=>{const m=f.current?0:l;f.current=!1,d.current=null;const w=_=>{d.current||(d.current=_);const M=_-d.current,v=Math.min(M/1e3,1),g=1-Math.pow(1-v,3),x=m+(s-m)*g;c(x),v<1?p.current=requestAnimationFrame(w):c(s)};return p.current=requestAnimationFrame(w),()=>{p.current&&cancelAnimationFrame(p.current)}},[s]),a.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[a.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[a.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),a.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${i})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${o*10}px var(--${i}))`,transition:"all 0.5s ease"}}),a.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),a.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${i})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${o*15}px var(--${i}))`}}),a.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${i})`,style:{textShadow:`0 0 10px var(--${i})`},children:[l.toFixed(0),"%"]}),a.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:r})]}),a.jsx("div",{className:"reactor-pulse",style:{opacity:o*.3}})]})}function Rg({node:e,onClick:t,onContextMenu:n,clusterName:r,isPaused:s=!1}){ue(e.cpu.usage_percent),ue(e.memory.used_bytes/e.memory.total_bytes*100);const i=e.status==="online";return a.jsxs("div",{className:`node-card ${i?"":"offline"}`,onClick:t,onContextMenu:n,children:[a.jsxs("div",{className:"node-header",children:[a.jsx("span",{className:`node-status ${i?"online":"offline"}`}),a.jsx("span",{className:"node-name",children:e.node}),r&&a.jsx("span",{className:"node-cluster-tag",children:r})]}),a.jsx("div",{className:"node-ecg-container",children:a.jsx(Mg,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:i,isPaused:s})}),a.jsxs("div",{className:"node-info",children:[a.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),a.jsx("span",{className:"node-info-item",children:yi(e.uptime)})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function Tg({node:e,storages:t,onClose:n}){const{t:r}=Ie(),s=e.status==="online",i=e.cpu.usage_percent,o=e.memory.used_bytes/e.memory.total_bytes*100,l=e.disk.used_bytes/e.disk.total_bytes*100;return a.jsx("div",{className:"node-detail-overlay",onClick:n,children:a.jsxs("div",{className:"node-detail-panel",onClick:c=>c.stopPropagation(),children:[a.jsxs("div",{className:"detail-header",children:[a.jsxs("div",{className:"detail-title",children:[a.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),a.jsx("h2",{children:e.node}),a.jsx("span",{className:"detail-tag",children:s?r("node.online").toUpperCase():r("node.offline").toUpperCase()})]}),a.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),a.jsxs("div",{className:"detail-body",children:[a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.system_info")}),a.jsxs("div",{className:"info-grid",children:[a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.kernel")}),a.jsx("span",{className:"info-value",children:zg(e.kernel_version)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.pve_version")}),a.jsx("span",{className:"info-value",children:Eg(e.pve_version)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.uptime")}),a.jsx("span",{className:"info-value",children:yi(e.uptime)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.workloads")}),a.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.resource_usage")}),a.jsxs("div",{className:"resource-bars",children:[a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("metric.cpu")}),a.jsx("span",{className:`resource-value text-${ue(i)}`,children:Ae(i,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${ue(i)}`,style:{width:`${i}%`}})}),a.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",r("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("node.io_wait")}),a.jsx("span",{className:`resource-value text-${$d(e.cpu.iowait)}`,children:Ae(e.cpu.iowait,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${$d(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),a.jsx("span",{className:"resource-detail",children:r("node.io_wait_desc")})]}),a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("metric.memory")}),a.jsx("span",{className:`resource-value text-${ue(o)}`,children:Ae(o,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${ue(o)}`,style:{width:`${o}%`}})}),a.jsxs("span",{className:"resource-detail",children:[he(e.memory.used_bytes)," / ",he(e.memory.total_bytes)]})]}),a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("node.root_disk")}),a.jsx("span",{className:`resource-value text-${ue(l)}`,children:Ae(l,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${ue(l)}`,style:{width:`${l}%`}})}),a.jsxs("span",{className:"resource-detail",children:[he(e.disk.used_bytes)," / ",he(e.disk.total_bytes)]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.network_io")}),a.jsxs("div",{className:"network-stats",children:[a.jsxs("div",{className:"net-stat",children:[a.jsxs("span",{className:"net-direction",children:["↓ ",r("metric.rx")]}),a.jsxs("span",{className:"net-value",children:[he(e.network.rx_bytes_sec),"/s"]})]}),a.jsxs("div",{className:"net-stat",children:[a.jsxs("span",{className:"net-direction",children:["↑ ",r("metric.tx")]}),a.jsxs("span",{className:"net-value",children:[he(e.network.tx_bytes_sec),"/s"]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsxs("h3",{className:"section-title",children:[r("node.storage")," (",t.length,")"]}),t.length>0?a.jsx("div",{className:"storage-list",children:t.map(c=>{const d=c.disk.used_bytes/c.disk.total_bytes*100;return a.jsxs("div",{className:`storage-item ${c.shared?"shared":"local"}`,children:[a.jsxs("div",{className:"storage-header",children:[a.jsx("span",{className:"storage-name",children:c.storage}),a.jsx("span",{className:"storage-type",children:c.type}),c.shared&&a.jsx("span",{className:"storage-shared-badge",children:r("node.shared")})]}),a.jsx("div",{className:"storage-bar",children:a.jsx("div",{className:`storage-fill ${ue(d)}`,style:{width:`${d}%`}})}),a.jsxs("div",{className:"storage-info",children:[a.jsxs("span",{children:[he(c.disk.used_bytes)," / ",he(c.disk.total_bytes)]}),a.jsx("span",{className:`text-${ue(d)}`,children:Ae(d,1)})]}),a.jsx("div",{className:"storage-content-labels",children:[...c.content].sort().map(p=>a.jsx("span",{className:"content-label",children:p},p))})]},c.storage)})}):a.jsx("div",{className:"no-storage",children:r("node.no_storage")})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Ig({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:r,isPaused:s=!1}){const{t:i}=Ie(),[o,l]=h.useState(null),[c,d]=h.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),p=!e&&t&&Object.keys(t).length>0,f=h.useCallback((x,N)=>{var S;return e&&e.client_health?e.client_health[N]||null:t&&((S=t[x])!=null&&S.client_health)&&t[x].client_health[N]||null},[e,t]),u=h.useCallback((x,N,S)=>{x.preventDefault(),x.stopPropagation();const T=Math.min(x.clientX,window.innerWidth-250),A=Math.min(x.clientY,window.innerHeight-280);d({visible:!0,x:T,y:A,node:N,clusterId:S})},[]),m=h.useCallback(()=>{d(x=>({...x,visible:!1}))},[]),w=h.useMemo(()=>{var N,S,T,A,B;const x=[];if(p)Object.entries(t).forEach(([E,b])=>{var $,C,P,W,Y;const z=Object.values(b.nodes);if(z.length>0){const F=z.reduce((O,U)=>O+U.cpu.usage_percent,0)/z.length,L=z.reduce((O,U)=>U.memory.total_bytes===0?O:O+U.memory.used_bytes/U.memory.total_bytes*100,0)/z.length;x.push({clusterId:E,clusterName:b.name||E,clusterNodes:z,isStandalone:(($=b.summary)==null?void 0:$.is_standalone)||!1,avgCpu:F,avgMem:L,vmsRunning:((C=b.summary)==null?void 0:C.vms_running)||0,ctsRunning:((P=b.summary)==null?void 0:P.cts_running)||0,vmCount:((W=b.summary)==null?void 0:W.vm_count)||0,ctCount:((Y=b.summary)==null?void 0:Y.ct_count)||0})}});else if(e){const E=Object.values(e.nodes),b=E.length>0?E.reduce(($,C)=>$+C.cpu.usage_percent,0)/E.length:0,z=E.length>0?E.reduce(($,C)=>C.memory.total_bytes===0?$:$+C.memory.used_bytes/C.memory.total_bytes*100,0)/E.length:0;x.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:E,isStandalone:((N=e.summary)==null?void 0:N.is_standalone)||!1,avgCpu:b,avgMem:z,vmsRunning:((S=e.summary)==null?void 0:S.vms_running)||0,ctsRunning:((T=e.summary)==null?void 0:T.cts_running)||0,vmCount:((A=e.summary)==null?void 0:A.vm_count)||0,ctCount:((B=e.summary)==null?void 0:B.ct_count)||0})}return x},[e,t,p]),_=w.flatMap(x=>x.clusterNodes);h.useMemo(()=>_.length===0?0:_.reduce((x,N)=>x+N.cpu.usage_percent,0)/_.length,[_]),h.useMemo(()=>_.length===0?0:_.reduce((x,N)=>N.memory.total_bytes===0?x:x+N.memory.used_bytes/N.memory.total_bytes*100,0)/_.length,[_]);let M=null,v=[];if(o){const[x,N]=o.split("/");if(p&&t){const S=t[x];S&&(M=S.nodes[N]||null,v=Object.values(S.storages).filter(T=>T.node===N))}else e&&(M=e.nodes[N]||null,v=Object.values(e.storages).filter(S=>S.node===N))}if(!e&&!p)return a.jsx("div",{className:"cluster-core empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:i("cluster.select")})]})});const g=p?i("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||i("cluster.nodes");return a.jsxs("div",{className:"cluster-core",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"core-header",children:a.jsxs("h1",{className:"core-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),a.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),a.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),a.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),a.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),g]})}),a.jsx("div",{className:"cluster-sections",children:w.map(x=>a.jsxs("div",{className:"cluster-section",children:[a.jsxs("div",{className:`cluster-section-header ${r?"clickable":""}`,onClick:()=>r==null?void 0:r(x.clusterId),title:r?i("cluster.view_vms_in",{name:x.clusterName}):void 0,children:[a.jsxs("div",{className:"section-title-group",children:[a.jsx("span",{className:"cluster-section-name",children:x.clusterName}),x.isStandalone&&a.jsx("span",{className:"standalone-tag",children:i("dashboard.standalone")}),r&&a.jsx("span",{className:"nav-arrow",children:"→"})]}),a.jsxs("span",{className:"cluster-section-count",children:[x.clusterNodes.filter(N=>N.status==="online").length,"/",x.clusterNodes.length," ",i("cluster.nodes")]})]}),a.jsxs("div",{className:"cluster-section-content",children:[a.jsx("div",{className:"section-reactor",children:a.jsx(Pg,{cpuUsage:x.avgCpu,memUsage:x.avgMem,compact:!0,label:i("node.avg_load")})}),a.jsxs("div",{className:"section-nodes",children:[a.jsx("div",{className:"nodes-grid",children:x.clusterNodes.map(N=>a.jsx(Rg,{node:N,onClick:()=>l(`${x.clusterId}/${N.node}`),onContextMenu:S=>u(S,N,x.clusterId),isPaused:s},`${x.clusterId}-${N.node}`))}),a.jsxs("div",{className:"ecg-legend",children:[a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line cpu"}),a.jsx("span",{children:i("metric.cpu")})]}),a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line mem"}),a.jsx("span",{children:i("metric.memory")})]}),a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line io"}),a.jsx("span",{children:i("node.io_wait")})]})]})]}),a.jsxs("div",{className:"section-telemetry",children:[a.jsxs("div",{className:"mini-telemetry",children:[a.jsxs("div",{className:"mini-chart",children:[a.jsx("span",{className:"mini-label",children:"CPU"}),a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-fill ${ue(x.avgCpu)}`,style:{width:`${x.avgCpu}%`}})}),a.jsx(Pd,{value:x.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${ue(x.avgCpu)}`})]}),a.jsxs("div",{className:"mini-chart",children:[a.jsx("span",{className:"mini-label",children:"MEM"}),a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-fill ${ue(x.avgMem)}`,style:{width:`${x.avgMem}%`}})}),a.jsx(Pd,{value:x.avgMem,decimals:0,suffix:"%",className:`mini-value text-${ue(x.avgMem)}`})]})]}),a.jsxs("div",{className:"mini-stats",children:[a.jsxs("div",{className:"mini-stat",children:[a.jsx(Rd,{left:x.vmsRunning,right:x.vmCount,className:"mini-stat-value"}),a.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),a.jsxs("div",{className:"mini-stat",children:[a.jsx(Rd,{left:x.ctsRunning,right:x.ctCount,className:"mini-stat-value"}),a.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},x.clusterId))}),a.jsx("div",{className:"core-footer",children:a.jsxs("button",{className:"btn-view-vms",onClick:n,children:[i("cluster.view_all_vms")," →"]})}),M&&a.jsx(Tg,{node:M,storages:v,onClose:()=>l(null)}),a.jsx($g,{state:c,onClose:m,onShowDetails:()=>{c.node&&l(`${c.clusterId}/${c.node.node}`)},getNodeHealth:f}),a.jsx("style",{children:`
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
          font-size: 13px;
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
          font-size: 14px;
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
          font-size: 12px;
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
          font-size: 14px;
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
          font-size: 14px;
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
          font-size: 13px;
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
          font-size: 14px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .section-count {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px var(--primary);
        }

        .standalone-tag {
          font-family: var(--font-mono);
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .node-cluster-tag {
          font-family: var(--font-mono);
          font-size: 13px;
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
          font-size: 11px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .resource-value {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .net-value {
          font-family: var(--font-mono);
          font-size: 14px;
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
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .storage-type {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .storage-shared-badge {
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
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
      `})]})}const Lg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Ag(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Og({task:e}){const t=Lg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Ag(e.task_type);return a.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[a.jsx("span",{className:"task-badge-icon",children:t.icon}),a.jsx("span",{className:"task-badge-text",children:t.label}),a.jsx("style",{children:Fg})]})}const Fg=`
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
    font-size: 13px;
  }

  .task-indicator-sm {
    padding: 2px 6px;
    font-size: 12px;
    gap: 4px;
  }

  .task-indicator-lg {
    padding: 6px 14px;
    font-size: 13px;
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
    font-size: 12px;
    white-space: nowrap;
  }

  .task-badge-icon {
    font-size: 12px;
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
`;function Dg({open:e,title:t,details:n,typeToConfirm:r,destructive:s=!1,confirmLabel:i="Confirm",cancelLabel:o="Cancel",onConfirm:l,onCancel:c}){const[d,p]=cl.useState(""),f=h.useRef(null),u=h.useRef(null);if(h.useEffect(()=>{e&&(p(""),setTimeout(()=>{var w,_;r?(w=u.current)==null||w.focus():(_=f.current)==null||_.focus()},50))},[e,r]),h.useEffect(()=>{if(!e)return;const w=_=>{_.key==="Escape"&&(_.preventDefault(),c()),_.key==="Enter"&&(!r||d===r)&&(_.preventDefault(),l())};return document.addEventListener("keydown",w),()=>document.removeEventListener("keydown",w)},[e,d,r,l,c]),!e)return null;const m=!r||d===r;return a.jsxs("div",{onClick:c,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[a.jsx("style",{children:`
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
          font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: #00f0ff; margin-bottom: 14px;
        }
        .cm-card.danger .cm-eyebrow { color: #ff3860; }
        .cm-details {
          font-family: 'Rajdhani', sans-serif; font-size: 14px;
          color: #95a8c4; line-height: 1.5; margin-bottom: 16px;
        }
        .cm-details code, .cm-details strong {
          color: #e6f6ff; font-family: 'Share Tech Mono', monospace;
          background: rgba(0,240,255,.08); padding: 1px 6px; border-radius: 3px;
        }
        .cm-input-label {
          display: block; font-size: 11px; letter-spacing: .08em;
          text-transform: uppercase; color: #95a8c4; margin: 16px 0 6px;
        }
        .cm-input {
          width: 100%; padding: 10px 14px;
          background: #02050b; color: #e6f6ff;
          border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
          font-family: 'Share Tech Mono', monospace; font-size: 14px;
          outline: none;
        }
        .cm-input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
        .cm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .cm-btn {
          padding: 9px 20px;
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
          border-radius: 6px; cursor: pointer; border: 1px solid transparent;
        }
        .cm-btn.cancel { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
        .cm-btn.cancel:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
        .cm-btn.confirm { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
        .cm-btn.confirm.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
        .cm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}),a.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:w=>w.stopPropagation(),children:[a.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),a.jsx("h3",{className:"cm-title",children:t}),n&&a.jsx("div",{className:"cm-details",children:n}),r&&a.jsxs(a.Fragment,{children:[a.jsxs("label",{className:"cm-input-label",children:["Type ",a.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:r})," to confirm"]}),a.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:w=>p(w.target.value),autoComplete:"off",spellCheck:!1})]}),a.jsxs("div",{className:"cm-actions",children:[a.jsx("button",{className:"cm-btn cancel",onClick:c,children:o}),a.jsx("button",{ref:f,className:`cm-btn confirm ${s?"danger":""}`,disabled:!m,onClick:l,children:i})]})]})]})}function wf(){const[e,t]=h.useState(!0),[n,r]=h.useState(null),[s,i]=h.useState(!1),o=async()=>{try{const c=await Zt.authMe();c.authenticated&&c.user?(r(c.user),i(!0)):(r(null),i(!1))}catch{r(null),i(!1)}finally{t(!1)}},l=async()=>{try{await Zt.authLogout()}catch{}window.location.replace("/login")};return h.useEffect(()=>{o()},[]),{loading:e,user:n,authEnforced:s,refresh:o,logout:l}}function Td(e){switch(e){case"start":return"Start";case"stop":return"Stop (hard power-off)";case"shutdown":return"Shutdown (ACPI)";case"reboot":return"Reboot";case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function Bg(e){return e==="stop"||e==="shutdown"||e==="reboot"}function ss(e,t,n,r,s){const i=o=>{if(!o.tasks)return null;for(const l of Object.values(o.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const o=s[n];if(o)return i(o)}else if(r)return i(r);return null}function Wg({state:e,onClose:t,onShowDetails:n,onPowerAction:r,getNodeHealth:s,userRole:i}){const{t:o}=Ie();if(h.useEffect(()=>{const u=()=>t(),m=()=>t(),w=_=>{_.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",u),document.addEventListener("scroll",m,!0),document.addEventListener("keydown",w)),()=>{document.removeEventListener("click",u),document.removeEventListener("scroll",m,!0),document.removeEventListener("keydown",w)}},[e.visible,t]),!e.visible||!e.vm)return null;const l=e.vm,c=s(e.clusterId,l.node),d=c?`https://${c.host}:${c.port}/#v1:0:=${l.type}/${l.vmid}`:null,p=u=>{u.stopPropagation(),d&&window.open(d,"_blank","noopener,noreferrer"),t()},f=u=>{u.stopPropagation(),n(),t()};return a.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"context-menu-header",children:[a.jsx("span",{className:"context-menu-name",children:l.name}),a.jsxs("span",{className:"context-menu-id",children:["#",l.vmid]})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("button",{className:"context-menu-item",onClick:f,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:o("vm.details")||"View Details"})]}),d&&a.jsxs("button",{className:"context-menu-item",onClick:p,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),a.jsx("polyline",{points:"15,3 21,3 21,9"}),a.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),a.jsx("span",{children:o("vm.open_pve")||"Open in PVE Manager"})]}),(i==="operator"||i==="admin")&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"context-menu-divider"}),l.status!=="running"&&a.jsxs("button",{className:"context-menu-item",onClick:u=>{u.stopPropagation(),r({vm:l,clusterId:e.clusterId,action:"start"}),t()},children:[a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:a.jsx("polygon",{points:"6,4 20,12 6,20"})}),a.jsx("span",{children:"Start"})]}),l.status==="running"&&a.jsxs(a.Fragment,{children:[a.jsxs("button",{className:"context-menu-item",onClick:u=>{u.stopPropagation(),r({vm:l,clusterId:e.clusterId,action:"shutdown"}),t()},children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),a.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),a.jsx("span",{children:"Shutdown (ACPI)"})]}),a.jsxs("button",{className:"context-menu-item",onClick:u=>{u.stopPropagation(),r({vm:l,clusterId:e.clusterId,action:"reboot"}),t()},children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("polyline",{points:"23,4 23,10 17,10"}),a.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),a.jsx("span",{children:"Reboot"})]}),a.jsxs("button",{className:"context-menu-item danger",onClick:u=>{u.stopPropagation(),r({vm:l,clusterId:e.clusterId,action:"stop"}),t()},children:[a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:a.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),a.jsx("span",{children:"Stop (hard)"})]})]})]})]})}const Id=cl.forwardRef(function({vm:t,isSelected:n,onClick:r,onContextMenu:s,animationDelay:i,task:o,isGhost:l=!1,isCompleting:c=!1},d){var T,A,B;const p=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,m=Math.max(t.cpu.usage_percent,f,u),w=p?ue(m):"muted",_=!!o,M=(T=o==null?void 0:o.task_type)==null?void 0:T.includes("migrate"),v=((A=o==null?void 0:o.task_type)==null?void 0:A.includes("backup"))||((B=o==null?void 0:o.task_type)==null?void 0:B.includes("vzdump")),g=t.name.length>12?t.name.substring(0,11)+"…":t.name,N=o?(E=>{const b=E.toLowerCase();return b.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:b.includes("backup")||b.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:b.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:b.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:b.includes("clone")?{label:"CLONE",color:"#10b981"}:b.includes("start")||b.includes("qmstart")?{label:"START",color:"#00ff88"}:b.includes("stop")||b.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:b.includes("reboot")||b.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(o.task_type):null,S=o?{type:o.task_type,target:o.target_node}:null;return a.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${_?"has-task":""} ${M?"migrating":""} ${v?"backup":""} ${l?"ghost":""} ${c?"completing":""}`,onClick:r,onContextMenu:s,title:`${t.name} (${t.vmid})${o?`
[${o.task_type}]${o.target_node?` → ${o.target_node}`:""}`:""}`,style:{"--anim-delay":`${i}ms`,animationDelay:`${i}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[a.jsxs("div",{className:`vm-cell-inner ${w}`,children:[a.jsx("span",{className:"vm-name",children:g}),a.jsx("span",{className:"vm-id",children:t.vmid}),o&&!M&&!v&&a.jsx("span",{className:"vm-task-icon",children:"⚙"}),v&&a.jsx("span",{className:"vm-backup-icon",children:"◉"}),M&&a.jsx("span",{className:"vm-migrate-icon",children:a.jsx("span",{className:"migrate-arrow",children:"→"})})]}),N&&a.jsx("div",{className:"vm-task-label",style:{borderColor:N.color,color:N.color},children:N.label}),_&&!M&&!v&&a.jsx("div",{className:"vm-task-ring"}),v&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"backup-ring"}),a.jsx("div",{className:"backup-scanner"}),a.jsxs("div",{className:"backup-particles",children:[a.jsx("span",{className:"bp bp1"}),a.jsx("span",{className:"bp bp2"}),a.jsx("span",{className:"bp bp3"}),a.jsx("span",{className:"bp bp4"})]})]}),M&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"migrate-ring"}),a.jsxs("div",{className:"migrate-particles",children:[a.jsx("span",{className:"particle p1"}),a.jsx("span",{className:"particle p2"}),a.jsx("span",{className:"particle p3"})]}),(S==null?void 0:S.target)&&a.jsxs("div",{className:"migrate-target-label",children:["→ ",S.target]})]})]})});function Vg({vm:e,onClose:t}){const{t:n}=Ie(),r=e.status==="running";return a.jsxs("div",{className:"vm-detail-panel panel",children:[a.jsxs("div",{className:"detail-scroll-area",children:[a.jsxs("div",{className:"detail-header",children:[a.jsxs("div",{className:"detail-title",children:[a.jsx("span",{className:`detail-status ${Qo(e.status)}`}),a.jsx("span",{className:"detail-name",children:e.name}),a.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),a.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),a.jsxs("div",{className:"detail-content",children:[a.jsxs("div",{className:"detail-info",children:[a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.node")}),a.jsx("span",{className:"info-value",children:e.node})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.type")}),a.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("node.status")}),a.jsx("span",{className:`info-value text-${Qo(e.status)}`,children:e.status.toUpperCase()})]}),r&&a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.uptime")}),a.jsx("span",{className:"info-value",children:yi(e.uptime)})]}),e.tags&&e.tags.length>0&&a.jsxs("div",{className:"info-row tags-row",children:[a.jsx("span",{className:"info-label",children:n("table.tags")}),a.jsx("div",{className:"vm-tags detail-tags",children:e.tags.map((s,i)=>a.jsx("span",{className:"vm-tag",children:s},i))})]})]}),r&&a.jsxs("div",{className:"detail-metrics",children:[a.jsxs("div",{className:"metric-row metric-row-stacked",children:[a.jsxs("div",{className:"metric-row-header",children:[a.jsx("span",{className:"metric-label",children:n("metric.cpu")}),a.jsx("span",{className:`metric-value text-${ue(e.cpu.usage_percent)}`,children:Ae(e.cpu.usage_percent,1)})]}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-fill ${ue(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),a.jsxs("div",{className:"metric-row metric-row-stacked",children:[a.jsxs("div",{className:"metric-row-header",children:[a.jsx("span",{className:"metric-label",children:n("metric.memory")}),a.jsxs("span",{className:"metric-value",children:[he(e.memory.used_bytes)," / ",he(e.memory.total_bytes)]})]}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-fill ${ue(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),a.jsxs("div",{className:"metric-row metric-row-network",children:[a.jsx("span",{className:"metric-label",children:n("metric.network")}),a.jsxs("div",{className:"network-stats",children:[a.jsxs("span",{className:"net-rx",children:["↓ ",he(e.network.rx_bytes_sec),"/s"]}),a.jsxs("span",{className:"net-tx",children:["↑ ",he(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function Ug({cluster:e,clusters:t}){var It;const{t:n,language:r}=Ie(),[s,i]=h.useState(null),o=wf(),[l,c]=h.useState(null),d=h.useCallback(k=>{k.action==="start"||k.action==="resume"?p(k):c(k)},[]),p=h.useCallback(async k=>{c(null);try{const D=k.vm.type==="lxc",I=D?await Zt.ctAction(k.clusterId,k.vm.node,k.vm.vmid,k.action):await Zt.vmAction(k.clusterId,k.vm.node,k.vm.vmid,k.action);console.info(`[vm_control] ${k.action} ${D?"ct":"vm"}/${k.vm.vmid} → upid=${I.upid}`)}catch(D){const I=D instanceof Error?D.message:String(D);I.includes("vm_control_disabled")?alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):alert(`${k.action} failed: ${I.slice(0,200)}`)}},[]),f=h.useCallback(()=>{l&&p(l)},[l,p]),[u,m]=h.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[w,_]=h.useState(""),[M,v]=h.useState("grid"),[g,x]=h.useState("vmid"),[N,S]=h.useState("asc"),[T,A]=h.useState(!1),[B,E]=h.useState(()=>{const k=localStorage.getItem("matrix_card_width");return k?parseInt(k,10):85}),[b,z]=h.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[$,C]=h.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[P,W]=h.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[Y,F]=h.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[L,O]=h.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[U,X]=h.useState([]),[y,V]=h.useState([]),[Q,le]=h.useState(new Map),ae=h.useRef(new Set),[oe,Oe]=h.useState(!1),[ee,ne]=h.useState(0),[ie,ce]=h.useState(!0);h.useEffect(()=>{Oe(!1),ne(I=>I+1),ce(!0);const k=setTimeout(()=>{Oe(!0)},100),D=setTimeout(()=>{ce(!1)},8e3);return()=>{clearTimeout(k),clearTimeout(D)}},[$]);const Ce=h.useRef(new Map),We=h.useRef(new Map),Qe=h.useRef(null),ke=h.useRef(!1),Ve=h.useMemo(()=>{if(b!=="load")return"";const k=[],D=I=>{Object.values(I.vms).forEach(j=>{if(j.template||u==="running"&&j.status!=="running"||u==="stopped"&&j.status!=="stopped")return;const R=j.memory.total_bytes>0?j.memory.used_bytes/j.memory.total_bytes*100:0,K=j.disk.total_bytes>0?j.disk.used_bytes/j.disk.total_bytes*100:0,G=Math.max(j.cpu.usage_percent,R,K);k.push({key:`${j.node}/${j.vmid}`,load:Math.round(G)})})};return t?Object.values(t).forEach(D):e&&D(e),k.sort((I,j)=>j.load-I.load),k.map(I=>`${I.key}:${I.load}`).join("|")},[e,t,b,u]);h.useLayoutEffect(()=>{if(b!=="load"||ke.current)return;const k=new Map;Ce.current.forEach((D,I)=>{D&&k.set(I,D.getBoundingClientRect())}),We.current=k},[Ve,b]),h.useEffect(()=>{b==="load"&&We.current.size!==0&&requestAnimationFrame(()=>{const k=[];Ce.current.forEach((D,I)=>{if(!D)return;const j=We.current.get(I);if(!j)return;const R=D.getBoundingClientRect(),K=j.left-R.left,G=j.top-R.top;if(Math.abs(K)>2||Math.abs(G)>2){ke.current=!0;const se=D.animate([{transform:`translate(${K}px, ${G}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});k.push(se)}}),k.length>0?Promise.all(k.map(D=>D.finished)).then(()=>{ke.current=!1}).catch(()=>{ke.current=!1}):ke.current=!1})},[Ve,b]);const[tt,lt]=h.useState(!1);h.useEffect(()=>{tt||Zt.getConfig().then(k=>{var I;const D=(I=k==null?void 0:k.ui)==null?void 0:I.vm_matrix_default_filter;D&&(m(D),localStorage.setItem("vm_matrix_default_filter",D)),lt(!0)}).catch(()=>{const k=localStorage.getItem("vm_matrix_default_filter");k&&m(k),lt(!0)})},[tt]),h.useEffect(()=>{const k=()=>{const I=localStorage.getItem("matrix_card_width");I&&E(parseInt(I,10));const j=localStorage.getItem("matrix_sort_by");j&&j!==b&&z(j);const R=localStorage.getItem("matrix_group_sort_by");R&&R!==P&&W(R);const K=localStorage.getItem("matrix_group_sort_order");K&&K!==Y&&F(K)};window.addEventListener("storage",k);const D=setInterval(k,1e3);return()=>{window.removeEventListener("storage",k),clearInterval(D)}},[b,P,Y]);const nt=h.useCallback((k,D)=>{var I;return e&&e.client_health?e.client_health[D]||null:t&&((I=t[k])!=null&&I.client_health)&&t[k].client_health[D]||null},[e,t]),Ye=h.useCallback((k,D,I)=>{k.preventDefault(),k.stopPropagation();const j=Math.min(k.clientX,window.innerWidth-250),R=Math.min(k.clientY,window.innerHeight-300);O({visible:!0,x:j,y:R,vm:D,clusterId:I})},[]),Rt=h.useCallback(()=>{O(k=>({...k,visible:!1}))},[]),ve=!e&&t&&Object.keys(t).length>0,Ge=h.useMemo(()=>{const k=[],D=(I,j,R)=>{if(!I.tasks)return;Object.values(I.tasks).forEach(G=>{var ge;const se=((ge=G.task_type)==null?void 0:ge.toLowerCase())||"",Z=se.includes("migrate"),q=G.status==="running",te=!!G.target_node,ye=se.startsWith("ha");if(se.startsWith("qm")||se.startsWith("vz"),q&&Z&&te&&!ye){const De=Object.keys(I.vms).find(be=>{const _e=I.vms[be];return _e.vmid===G.vmid&&_e.node===G.node});De&&k.push({vm:I.vms[De],task:G,targetNode:G.target_node||"",clusterId:j,clusterLabel:R})}})};return ve&&t?Object.entries(t).forEach(([I,j])=>{D(j,I,j.name||I)}):e&&D(e,e.id,e.name||e.id),k},[e,t,ve]);h.useEffect(()=>{const k=new Set(Ge.map(I=>`${I.clusterId}:${I.vm.vmid}`)),D=ae.current;D.forEach(I=>{!k.has(I)&&Q.has(I)}),Ge.forEach(({vm:I,clusterId:j})=>{const R=`${j}:${I.vmid}`;D.has(R)}),ae.current=k},[Ge,Q]);const Fe=h.useRef(new Map);h.useEffect(()=>{Ge.forEach(({vm:k,targetNode:D,clusterId:I})=>{const j=`${I}:${k.vmid}`;Fe.current.set(j,{targetNode:D,sourceNode:k.node,clusterId:I,vmid:k.vmid})})},[Ge]);const bt=h.useRef(new Map);h.useEffect(()=>{U.forEach(k=>{const D=`${k.clusterId}:${k.vmid}`;bt.current.set(D,{x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2})})},[U]),h.useEffect(()=>{const k=new Set(Ge.map(D=>`${D.clusterId}:${D.vm.vmid}`));Fe.current.forEach((D,I)=>{if(!k.has(I)&&!Q.has(I)){const j=bt.current.get(I);if(j){const R=Date.now(),K=800,G=()=>{const se=Date.now()-R,Z=Math.min(se/K,1),q=j.x1+(j.x2-j.x1)*Z,te=j.y1+(j.y2-j.y1)*Z;V([{x1:q,y1:te,x2:j.x2,y2:j.y2,vmid:D.vmid,progress:Z}]),Z<1?requestAnimationFrame(G):V([])};requestAnimationFrame(G)}le(R=>{const K=new Map(R);return K.set(I,{...D,startTime:Date.now()}),K}),Fe.current.delete(I),bt.current.delete(I),setTimeout(()=>{le(R=>{const K=new Map(R);return K.delete(I),K})},1e4)}})},[Ge,Q]),h.useEffect(()=>{if(Q.size===0)return;const k=(D,I)=>{const j=R=>{for(const K of Object.values(R.vms))if(K.vmid===D)return K.node;return null};if(t&&I){const R=t[I];if(R)return j(R)}else if(e)return j(e);return null};Q.forEach((D,I)=>{const j=k(D.vmid,D.clusterId);j&&j===D.targetNode&&j!==D.sourceNode&&le(R=>{const K=new Map(R);return K.delete(I),K})})},[e,t,Q]);const Tt=h.useCallback((k,D)=>{const I=ve?`${D} / `:"";switch($){case"none":return ve?D:"all";case"type":return`${I}${k.type==="qemu"?"VM":"CT"}`;case"tag":return k.tags&&k.tags.length>0?`${I}${k.tags[0]}`:`${I}(no tag)`;case"node":default:return`${I}${k.node}`}},[$,ve]),rt=h.useMemo(()=>{const k={},D=(I,j,R)=>{Object.entries(I.vms).forEach(([K,G])=>{if(u==="running"&&G.status!=="running"||u==="stopped"&&G.status!=="stopped"||w&&!G.name.toLowerCase().includes(w.toLowerCase())&&!String(G.vmid).includes(w)||G.template)return;const se=Tt(G,j);k[se]||(k[se]={vms:[],clusterId:R}),k[se].vms.push(G)})};return ve?Object.entries(t).forEach(([I,j])=>{const R=j.name||I;D(j,R,I)}):e&&D(e,"",e.id),Object.values(k).forEach(I=>{I.vms.sort((j,R)=>{switch(b){case"name":return j.name.localeCompare(R.name);case"load":{const K=j.memory.total_bytes>0?j.memory.used_bytes/j.memory.total_bytes*100:0,G=R.memory.total_bytes>0?R.memory.used_bytes/R.memory.total_bytes*100:0,se=j.disk.total_bytes>0?j.disk.used_bytes/j.disk.total_bytes*100:0,Z=R.disk.total_bytes>0?R.disk.used_bytes/R.disk.total_bytes*100:0,q=Math.max(j.cpu.usage_percent,K,se),te=Math.max(R.cpu.usage_percent,G,Z);if(j.status!=="running"&&R.status==="running")return 1;if(j.status==="running"&&R.status!=="running")return-1;if(j.status!=="running"&&R.status!=="running")return j.vmid-R.vmid;const ye=be=>be>=95?0:be>=80?1:2,ge=ye(q),De=ye(te);return ge!==De?ge-De:te-q}case"vmid":default:return j.vmid-R.vmid}})}),k},[e,t,ve,u,w,b,Tt]),re=h.useMemo(()=>{const k=[];return Ge.forEach(({vm:D,targetNode:I,clusterId:j,clusterLabel:R})=>{const K=ve?`${R} / ${I}`:I,G=ve?`${R} / ${D.node}`:D.node;k.push({vm:D,targetGroupKey:K,sourceGroupKey:G,clusterId:j})}),k},[Ge,ve]);h.useEffect(()=>{if(M!=="grid"||re.length===0){X([]);return}const k=()=>{const R=Qe.current;if(!R)return;const K=R.getBoundingClientRect(),G=R.scrollLeft,se=R.scrollTop,Z=[];re.forEach(({vm:q})=>{const te=`${q.cluster_id}/${q.node}/${q.vmid}`,ye=`ghost-${q.cluster_id}-${q.vmid}`,ge=Ce.current.get(te),De=Ce.current.get(ye);if(ge&&De){const be=ge.getBoundingClientRect(),_e=De.getBoundingClientRect();Z.push({x1:be.left+be.width/2-K.left+G,y1:be.top+be.height/2-K.top+se,x2:_e.left+_e.width/2-K.left+G,y2:_e.top+_e.height/2-K.top+se,vmid:q.vmid,clusterId:q.cluster_id})}}),X(Z)},D=setTimeout(k,100),I=setInterval(k,500),j=Qe.current;return j&&j.addEventListener("scroll",k),()=>{clearTimeout(D),clearInterval(I),j&&j.removeEventListener("scroll",k)}},[re,M]);const de=h.useMemo(()=>{const k=[],D=(I,j,R)=>{Object.values(I.vms).forEach(K=>{u==="running"&&K.status!=="running"||u==="stopped"&&K.status!=="stopped"||w&&!K.name.toLowerCase().includes(w.toLowerCase())&&!String(K.vmid).includes(w)||K.template||k.push({...K,clusterName:j,clusterId:R})})};return ve?Object.entries(t).forEach(([I,j])=>{const R=j.name||I;D(j,R,I)}):e&&D(e,e.name||"Cluster",e.id),k.sort((I,j)=>{var K,G,se,Z;let R=0;switch(g){case"name":R=I.name.localeCompare(j.name);break;case"vmid":R=I.vmid-j.vmid;break;case"type":R=I.type.localeCompare(j.type);break;case"node":R=I.node.localeCompare(j.node);break;case"status":R=I.status.localeCompare(j.status);break;case"cpu":R=I.cpu.usage_percent-j.cpu.usage_percent;break;case"memory":R=I.memory.used_bytes/I.memory.total_bytes-j.memory.used_bytes/j.memory.total_bytes;break;case"uptime":R=I.uptime-j.uptime;break;case"rx":R=(((K=I.network)==null?void 0:K.rx_bytes_sec)||0)-(((G=j.network)==null?void 0:G.rx_bytes_sec)||0);break;case"tx":R=(((se=I.network)==null?void 0:se.tx_bytes_sec)||0)-(((Z=j.network)==null?void 0:Z.tx_bytes_sec)||0);break;case"task":{const q=ss(I.vmid,I.node,I.cluster_id,e,t),te=ss(j.vmid,j.node,j.cluster_id,e,t);q&&!te?R=-1:!q&&te?R=1:q&&te?R=q.task_type.localeCompare(te.task_type):R=0;break}}return N==="asc"?R:-R}),k},[e,t,ve,u,w,g,N]),me=k=>{A(!0),setTimeout(()=>A(!1),300),g===k?S(N==="asc"?"desc":"asc"):(x(k),S("asc"))},Pe=h.useMemo(()=>{if(!s)return null;if(e)return e.vms[s]||null;if(t){for(const k of Object.values(t))if(k.vms[s])return k.vms[s]}return null},[s,e,t]);if(!e&&!ve)return a.jsx("div",{className:"holo-matrix empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("cluster.select")})]})});const{totalVMs:Xe,runningVMs:ft}=h.useMemo(()=>{let k=0,D=0;const I=j=>{Object.values(j.vms).forEach(R=>{R.template||(k++,R.status==="running"&&D++)})};return ve?Object.values(t).forEach(I):e&&I(e),{totalVMs:k,runningVMs:D}},[e,t,ve]);return a.jsxs("div",{className:"holo-matrix",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"matrix-header",children:[a.jsxs("div",{className:"matrix-title-section",children:[a.jsxs("h1",{className:"matrix-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),a.jsxs("div",{className:"matrix-stats",children:[a.jsxs("span",{className:"stat-running",children:[ft," ",n("matrix.running")]}),a.jsx("span",{className:"stat-divider",children:"/"}),a.jsxs("span",{className:"stat-total",children:[Xe," ",n("matrix.total")]})]})]}),a.jsxs("div",{className:"matrix-controls",children:[a.jsxs("div",{className:"search-box",children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("path",{d:"M21 21l-4.35-4.35"})]}),a.jsx("input",{type:"text",placeholder:n("matrix.search"),value:w,onChange:k=>_(k.target.value)})]}),a.jsxs("div",{className:"filter-tabs",children:[a.jsx("button",{className:`filter-tab ${u==="all"?"active":""}`,onClick:()=>m("all"),children:n("matrix.filter_all")}),a.jsx("button",{className:`filter-tab ${u==="running"?"active":""}`,onClick:()=>m("running"),children:n("matrix.filter_running")}),a.jsx("button",{className:`filter-tab ${u==="stopped"?"active":""}`,onClick:()=>m("stopped"),children:n("matrix.filter_stopped")})]}),a.jsxs("div",{className:"sort-selector",children:[a.jsxs("span",{className:"sort-label",children:[n("settings.sort_by"),":"]}),a.jsx("button",{className:`sort-btn ${b==="vmid"?"active":""}`,onClick:()=>{z("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:"ID"}),a.jsx("button",{className:`sort-btn ${b==="name"?"active":""}`,onClick:()=>{z("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:n("settings.sort_name")}),a.jsx("button",{className:`sort-btn ${b==="load"?"active":""}`,onClick:()=>{z("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:n("settings.sort_load")})]}),a.jsxs("div",{className:"sort-selector",children:[a.jsxs("span",{className:"sort-label",children:[n("matrix.group_by"),":"]}),a.jsx("button",{className:`sort-btn ${$==="none"?"active":""}`,onClick:()=>{C("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:n("matrix.group_none")}),a.jsx("button",{className:`sort-btn ${$==="node"?"active":""}`,onClick:()=>{C("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:n("matrix.group_node")}),a.jsx("button",{className:`sort-btn ${$==="type"?"active":""}`,onClick:()=>{C("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:n("matrix.group_type")}),a.jsx("button",{className:`sort-btn ${$==="tag"?"active":""}`,onClick:()=>{C("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:n("matrix.group_tag")})]}),a.jsxs("div",{className:"view-toggle",children:[a.jsx("button",{className:`view-btn ${M==="grid"?"active":""}`,onClick:()=>v("grid"),title:r==="zh-TW"?"方格檢視":"Grid view",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a.jsx("button",{className:`view-btn ${M==="table"?"active":""}`,onClick:()=>v("table"),title:r==="zh-TW"?"表格檢視":"Table view",children:a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})})]})]})]}),a.jsxs("div",{className:"matrix-content",children:[M==="grid"?a.jsxs("div",{className:"matrix-grid",ref:Qe,children:[U.length>0&&a.jsxs("svg",{className:"migration-lines-overlay",children:[a.jsxs("defs",{children:[a.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),a.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),a.jsxs("filter",{id:"migrationGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),U.map((k,D)=>a.jsxs("g",{children:[a.jsx("line",{className:"migration-line",x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),a.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})}),a.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})}),a.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})})]},`line-${k.vmid}-${D}`))]}),y.length>0&&a.jsxs("svg",{className:"migration-lines-overlay completing",children:[a.jsxs("defs",{children:[a.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),a.jsxs("filter",{id:"completingGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),y.map((k,D)=>a.jsxs("g",{children:[a.jsx("line",{className:"completing-line",x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-k.progress)+1,filter:"url(#completingGlow)",opacity:1-k.progress*.5}),k.progress>.8&&a.jsx("circle",{cx:k.x2,cy:k.y2,r:20*(k.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(k.progress-.8)*5})]},`completing-${k.vmid}-${D}`))]}),(()=>{const k=new Map;Object.entries(rt).forEach(([j,R])=>{k.set(j,R)}),re.forEach(j=>{k.has(j.targetGroupKey)||k.set(j.targetGroupKey,{vms:[],clusterId:j.clusterId})});const D=Array.from(k.entries()).sort((j,R)=>{const[K]=j,[G]=R,se=ye=>{if(ye.includes(" / ")){const[ge,De]=ye.split(" / ");return{cluster:ge,node:De}}return{cluster:"",node:ye}},Z=se(K),q=se(G);let te=0;return P==="cluster"?(te=Z.cluster.localeCompare(q.cluster),te===0&&(te=Z.node.localeCompare(q.node))):(te=Z.node.localeCompare(q.node),te===0&&(te=Z.cluster.localeCompare(q.cluster))),Y==="desc"?-te:te});let I=0;return D.map(([j,R])=>{const K=re.filter(G=>G.targetGroupKey===j);return a.jsxs("div",{className:`node-section ${R.vms.length===0&&K.length>0?"ghost-only":""}`,children:[a.jsxs("div",{className:"node-section-header",children:[a.jsx("span",{className:"node-section-name",children:j}),a.jsxs("span",{className:"node-section-count",children:[R.vms.length,K.length>0&&a.jsxs("span",{className:"incoming-count",children:[" +",K.length]})]})]}),a.jsxs("div",{className:`vm-grid ${b==="load"&&!ie?"sort-by-load":""} ${ie?"initial-load":""}`,children:[oe&&R.vms.map(G=>{const se=`${G.cluster_id}/${G.node}/${G.vmid}`,Z=ss(G.vmid,G.node,G.cluster_id,e,t),q=`${G.cluster_id}:${G.vmid}`,te=Q.get(q);if(te&&te.sourceNode===G.node)return null;const ye=I++;return a.jsx(Id,{ref:ge=>{ge?Ce.current.set(se,ge):Ce.current.delete(se)},vm:G,isSelected:s===se,onClick:()=>i(s===se?null:se),onContextMenu:ge=>Ye(ge,G,R.clusterId),animationDelay:ie?ye*50:0,task:Z,isCompleting:!!te},se)}).filter(Boolean),oe&&K.map(G=>{var q;const se=`ghost-${G.vm.cluster_id}-${G.vm.vmid}`,Z=(q=Ge.find(te=>te.vm.vmid===G.vm.vmid&&te.clusterId===G.vm.cluster_id))==null?void 0:q.task;return a.jsx(Id,{ref:te=>{te?Ce.current.set(se,te):Ce.current.delete(se)},vm:G.vm,isSelected:!1,onClick:()=>{},onContextMenu:te=>te.preventDefault(),animationDelay:0,task:Z,isGhost:!0},se)})]},`grid-${u}-${w}-${b}-${ee}`)]},j)})})(),Object.keys(rt).length===0&&re.length===0&&a.jsx("div",{className:"no-vms",children:a.jsx("span",{children:n("error.no_data")})})]}):a.jsxs("div",{className:"matrix-table-container",children:[a.jsxs("table",{className:"vm-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsxs("th",{className:`sortable ${g==="status"?"sorted":""}`,onClick:()=>me("status"),children:[a.jsx("span",{children:n("node.status")}),g==="status"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="vmid"?"sorted":""}`,onClick:()=>me("vmid"),children:[a.jsx("span",{children:"VMID"}),g==="vmid"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="type"?"sorted":""}`,onClick:()=>me("type"),children:[a.jsx("span",{children:n("table.type")}),g==="type"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="name"?"sorted":""}`,onClick:()=>me("name"),children:[a.jsx("span",{children:n("table.name")}),g==="name"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsx("th",{className:"tags-header",children:n("table.tags")}),a.jsxs("th",{className:`sortable ${g==="node"?"sorted":""}`,onClick:()=>me("node"),children:[a.jsx("span",{children:n("table.node")}),g==="node"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="cpu"?"sorted":""}`,onClick:()=>me("cpu"),children:[a.jsx("span",{children:n("metric.cpu")}),g==="cpu"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="memory"?"sorted":""}`,onClick:()=>me("memory"),children:[a.jsx("span",{children:n("metric.memory")}),g==="memory"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable net-header ${g==="rx"?"sorted":""}`,onClick:()=>me("rx"),children:[a.jsxs("span",{children:["↓ ",n("metric.rx")]}),g==="rx"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable net-header ${g==="tx"?"sorted":""}`,onClick:()=>me("tx"),children:[a.jsxs("span",{children:["↑ ",n("metric.tx")]}),g==="tx"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${g==="uptime"?"sorted":""}`,onClick:()=>me("uptime"),children:[a.jsx("span",{children:n("table.uptime")}),g==="uptime"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable task-header ${g==="task"?"sorted":""}`,onClick:()=>me("task"),children:[a.jsx("span",{children:n("table.task")}),g==="task"&&a.jsx("span",{className:"sort-indicator",children:N==="asc"?"▲":"▼"})]})]})}),a.jsx("tbody",{children:de.map(k=>{const D=`${k.cluster_id}/${k.node}/${k.vmid}`,I=k.status==="running",j=k.cpu.usage_percent,R=k.memory.used_bytes/k.memory.total_bytes*100,K=ss(k.vmid,k.node,k.cluster_id,e,t);return a.jsxs("tr",{className:`${s===D?"selected":""} ${k.status} ${T?"sort-animating":""}`,onClick:()=>i(s===D?null:D),onContextMenu:G=>Ye(G,k,k.clusterId),children:[a.jsx("td",{children:a.jsx("span",{className:`status-badge ${Qo(k.status)}`,children:k.status.toUpperCase()})}),a.jsx("td",{className:"vmid-cell",children:k.vmid}),a.jsx("td",{className:"type-cell",children:a.jsx("span",{className:`type-badge ${k.type}`,children:k.type==="qemu"?"VM":"CT"})}),a.jsx("td",{className:"name-cell",children:k.name}),a.jsx("td",{className:"tags-cell",children:k.tags&&k.tags.length>0?a.jsx("div",{className:"vm-tags",children:k.tags.map((G,se)=>a.jsx("span",{className:"vm-tag",children:G},se))}):null}),a.jsx("td",{className:"node-cell",children:k.node}),a.jsx("td",{children:I?a.jsxs("div",{className:"cpu-cell",children:[a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-bar-fill ${ue(j)}`,style:{width:`${j}%`}})}),a.jsx("span",{className:`text-${ue(j)}`,children:Ae(j,1)})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{children:I?a.jsxs("div",{className:"mem-cell",children:[a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-bar-fill ${ue(R)}`,style:{width:`${R}%`}})}),a.jsx("span",{children:Ae(R,1)})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"net-rx-cell",children:I?a.jsxs("span",{className:"net-rx",children:[he(k.network.rx_bytes_sec),"/s"]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"net-tx-cell",children:I?a.jsxs("span",{className:"net-tx",children:[he(k.network.tx_bytes_sec),"/s"]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{children:I?a.jsx("span",{className:"uptime-cell",children:yi(k.uptime)}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"task-cell",children:K&&a.jsx(Og,{task:K})})]},D)})})]}),de.length===0&&a.jsx("div",{className:"no-vms",children:a.jsx("span",{children:n("error.no_data")})})]}),Pe&&a.jsx(Vg,{vm:Pe,onClose:()=>i(null)},`${Pe.node}/${Pe.vmid}`)]}),a.jsx(Wg,{state:L,onClose:Rt,onShowDetails:()=>{L.vm&&i(`${L.vm.node}/${L.vm.vmid}`)},onPowerAction:d,getNodeHealth:nt,userRole:((It=o.user)==null?void 0:It.role_global)??null}),a.jsx(Dg,{open:l!==null,title:l?Td(l.action):"",destructive:l?Bg(l.action):!1,details:l?a.jsxs(a.Fragment,{children:["You are about to ",a.jsx("strong",{children:l.action})," ",l.vm.type==="lxc"?"CT":"VM"," ",a.jsx("code",{children:l.vm.vmid})," (",l.vm.name,") on node ",a.jsx("code",{children:l.vm.node})," ","(",l.clusterId,").",l.action==="stop"&&a.jsxs(a.Fragment,{children:[a.jsx("br",{}),a.jsx("br",{}),a.jsx("strong",{style:{color:"#ff8a3c"},children:"Hard power-off bypasses guest OS shutdown."})," Unsaved data may be lost."]})]}):null,confirmLabel:l?Td(l.action):"Confirm",onConfirm:f,onCancel:()=>c(null)}),a.jsxs("div",{className:"matrix-legend",children:[a.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color success"}),a.jsx("span",{className:"legend-label",children:"<80%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color warning"}),a.jsx("span",{className:"legend-label",children:"80-95%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color danger"}),a.jsx("span",{className:"legend-label",children:">95%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color muted"}),a.jsx("span",{className:"legend-label",children:"Stopped"})]}),a.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"})]}),a.jsx("style",{children:`
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
          font-size: 12px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .matrix-stats {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 11px;
          color: var(--text-muted);
          margin-right: 2px;
        }

        .sort-btn {
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
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
          font-size: 11px;
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
          font-size: 13px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .node-section-count {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #ffffff;
        }

        /* VM Grid */
        .vm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(${B}px, 1fr));
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 14px;
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
          font-size: 11px;
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

        /* Incoming badge on ghost */
        .vm-cell.ghost::after {
          content: 'INCOMING';
          position: absolute;
          top: -8px;
          right: -8px;
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          color: #00ff88;
          background: rgba(0, 30, 20, 0.9);
          padding: 2px 4px;
          border: 1px solid #00ff88;
          border-radius: 2px;
          text-shadow: 0 0 4px #00ff88;
          animation: incomingPulse 1s ease-in-out infinite;
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
          width: 320px;
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
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-id {
          font-family: var(--font-mono);
          font-size: 12px;
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
          gap: var(--spacing-xs);
        }

        .info-row {
          display: flex;
          justify-content: space-between;
        }

        .info-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          border-bottom: 1px solid var(--border-dim);
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
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 13px;
        }

        .net-cell .net-rx { color: var(--success); }
        .net-cell .net-tx { color: var(--warning); }

        .uptime-cell {
          color: var(--text-secondary);
        }

        .task-header {
          color: var(--accent);
          font-size: 12px;
        }

        .task-cell {
          min-width: 100px;
        }

        .tags-header {
          color: var(--primary);
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 12px;
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
          font-size: 11px;
          color: var(--text-secondary);
        }

        .legend-note {
          font-family: var(--font-mono);
          font-size: 11px;
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

        .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .context-menu-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .context-menu-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }

        .context-menu-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-sm);
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 12px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .context-menu-item:hover {
          background: rgba(0, 240, 255, 0.1);
          color: var(--primary);
        }

        .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .context-menu-item:hover svg {
          color: var(--primary);
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
          font-size: 12px;
          padding: 2px 0;
        }

        .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }
      `})]})}function is(e,t,n,r,s){const i=o=>{if(!o.tasks)return null;for(const l of Object.values(o.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const o=s[n];if(o)return i(o)}else if(r)return i(r);return null}function kf(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Hg({vm:e,index:t,previousIndex:n,onClick:r,isSelected:s,task:i}){var g;const o=e.memory.used_bytes/e.memory.total_bytes*100,l=((g=e.disk)==null?void 0:g.usage_percent)||0,c=ue(e.cpu.usage_percent),d=ue(o),p=ue(l),f=h.useRef(null),[u,m]=h.useState(n===void 0),w=kf(i||null);h.useEffect(()=>{if(u){const x=setTimeout(()=>m(!1),50);return()=>clearTimeout(x)}},[u]);const _=e.name.length>10?e.name.substring(0,9)+"…":e.name,v=Math.max(e.cpu.usage_percent,o,l)>95?"critical":"warning";return a.jsxs("div",{ref:f,className:`anomaly-item ${v} ${u?"entering":""} ${s?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:r?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${Ae(e.cpu.usage_percent,1)}
MEM: ${Ae(o,1)}
DISK: ${Ae(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:r,children:[a.jsx("div",{className:"corner-bracket tl"}),a.jsx("div",{className:"corner-bracket tr"}),a.jsx("div",{className:"corner-bracket bl"}),a.jsx("div",{className:"corner-bracket br"}),a.jsxs("div",{className:"anomaly-header",children:[a.jsx("span",{className:`anomaly-indicator ${c}`}),a.jsx("span",{className:"anomaly-name",children:_}),a.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),w&&a.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${w.color}30`,borderColor:w.color,color:w.color},children:w.label})]}),a.jsxs("div",{className:"anomaly-bars-row",children:[a.jsxs("div",{className:`metric-gauge ${c}`,children:[a.jsx("span",{className:"gauge-label",children:"C"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),a.jsxs("div",{className:`metric-gauge ${d}`,children:[a.jsx("span",{className:"gauge-label",children:"M"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(o,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(o,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(o)})]}),a.jsxs("div",{className:`metric-gauge ${p}`,children:[a.jsx("span",{className:"gauge-label",children:"D"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Yg({cluster:e,clusters:t,isPaused:n=!1}){const{t:r}=Ie(),s=h.useRef(null),i=h.useRef(null),[o,l]=h.useState(0),[c,d]=h.useState(null),[p,f]=h.useState(new Map),[u,m]=h.useState(new Map),[w,_]=h.useState("grid"),[M,v]=h.useState(0);h.useEffect(()=>{const E=setTimeout(()=>_("line"),600),b=setTimeout(()=>_("flip"),1100),z=setTimeout(()=>_("done"),3300);return()=>{clearTimeout(E),clearTimeout(b),clearTimeout(z)}},[]),h.useEffect(()=>{if(w!=="flip"&&w!=="done"){v(0);return}const E=w==="flip"?300:0,b=1800;let z,$=null;const C=P=>{$===null&&($=P);const W=P-$-E;if(W<0){z=requestAnimationFrame(C);return}const Y=Math.min(W/b,1),F=1-Math.pow(1-Y,3);v(F),Y<1&&(z=requestAnimationFrame(C))};return z=requestAnimationFrame(C),()=>cancelAnimationFrame(z)},[w]);const g=!e&&t&&Object.keys(t).length>0,x=h.useMemo(()=>{if(!e&&!g)return[];const E=[];return g?Object.values(t).forEach(b=>{Object.values(b.vms).forEach(z=>{z.status==="running"&&!z.template&&E.push(z)})}):e&&Object.values(e.vms).forEach(b=>{b.status==="running"&&!b.template&&E.push(b)}),E},[e,t,g]),N=h.useMemo(()=>x.map((E,b)=>{var O;const z=b/x.length*Math.PI*2,$=E.cpu.usage_percent,C=E.memory.total_bytes>0?E.memory.used_bytes/E.memory.total_bytes*100:0,P=((O=E.disk)==null?void 0:O.usage_percent)||0,W=Math.max($,C,P),Y=.2+W/100*.6,F=ue(W),L=is(E.vmid,E.node,E.cluster_id,e,t);return{vm:E,angle:z,distance:Y,color:F,task:L}}),[x,e,t]),S=h.useMemo(()=>{if(!e&&!g)return[];const E=[];return g?Object.values(t).forEach(z=>{Object.values(z.vms).forEach($=>E.push($))}):e&&Object.values(e.vms).forEach(z=>E.push(z)),E.filter(z=>{if(z.status!=="running"||z.template)return!1;const $=z.memory.used_bytes/z.memory.total_bytes*100,C=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0;return z.cpu.usage_percent>80||$>85||C>85}).sort((z,$)=>{const C=z.memory.used_bytes/z.memory.total_bytes*100,P=$.memory.used_bytes/$.memory.total_bytes*100,W=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0,Y=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,F=Math.max(z.cpu.usage_percent,C,W);return Math.max($.cpu.usage_percent,P,Y)-F})},[e,t,g]);h.useEffect(()=>{const E=new Map;S.forEach((b,z)=>{E.set(`${b.cluster_id}/${b.node}/${b.vmid}`,z)}),f(E)},[S]);const T=h.useCallback(E=>{const b=s.current;if(!b)return;const z=b.getBoundingClientRect(),$=b.width/z.width,C=b.height/z.height,P=(E.clientX-z.left)*$,W=(E.clientY-z.top)*C,Y=Math.min(b.width,b.height),F=b.width/2,L=b.height/2,O=Y*.4;let U=null;for(const X of N){const y=F+Math.cos(X.angle)*O*X.distance,V=L+Math.sin(X.angle)*O*X.distance,Q=Math.sqrt((P-y)**2+(W-V)**2),le=15*Math.max($,C);if(Q<le){U={vm:X.vm,x:E.clientX,y:E.clientY,pointX:y,pointY:V};break}}d(U)},[N]),A=h.useCallback(()=>{d(null)},[]),B=h.useCallback(E=>{const b=s.current;if(!b)return;const z=N.find(L=>L.vm.node===E.node&&L.vm.vmid===E.vmid);if(!z)return;const $=Math.min(b.width,b.height),C=b.width/2,P=b.height/2,W=$*.4,Y=C+Math.cos(z.angle)*W*z.distance,F=P+Math.sin(z.angle)*W*z.distance;d({vm:z.vm,x:Y,y:F,pointX:Y,pointY:F})},[N]);return h.useEffect(()=>{if(n||w!=="done")return;const E=setInterval(()=>{l(b=>(b+2)%360)},50);return()=>clearInterval(E)},[n,w]),h.useEffect(()=>{const E=s.current;if(!E)return;const b=E.getContext("2d");if(!b)return;const z=Math.min(E.width,E.height),$=E.width/2,C=E.height/2,P=z*.4;b.clearRect(0,0,E.width,E.height),b.strokeStyle="rgba(0, 240, 255, 0.12)",b.lineWidth=.8;const W=20;for(let V=$%W;V<E.width;V+=W)b.beginPath(),b.moveTo(V,0),b.lineTo(V,E.height),b.stroke();for(let V=C%W;V<E.height;V+=W)b.beginPath(),b.moveTo(0,V),b.lineTo(E.width,V),b.stroke();if(w!=="flip"&&w!=="done")return;b.globalAlpha=M,b.strokeStyle="rgba(0, 240, 255, 0.25)",b.lineWidth=1.5,b.font='13px "Share Tech Mono", monospace',b.fillStyle="rgba(0, 240, 255, 0.6)",b.textAlign="left";const Y=["25%","50%","75%","100%"];for(let V=1;V<=4;V++){const Q=P*(V/4);b.beginPath(),b.arc($,C,Q,0,Math.PI*2),b.stroke();const le=$+Q+4,ae=C+4;b.fillText(Y[V-1],le,ae)}b.fillStyle="rgba(0, 255, 136, 0.8)",b.textAlign="center",b.font='14px "Share Tech Mono", monospace',b.fillText("0%",$,C-8),b.font='11px "Share Tech Mono", monospace',b.fillText("LOW",$,C+8),b.fillStyle="rgba(0, 240, 255, 0.5)",b.textAlign="left",b.font='10px "Share Tech Mono", monospace',b.beginPath(),b.moveTo($-P,C),b.lineTo($+P,C),b.moveTo($,C-P),b.lineTo($,C+P),b.stroke();const F=o*Math.PI/180;for(let V=0;V<8;V++){const Q=.12*(V+1),le=.15-V*.015;b.fillStyle=`rgba(0, 240, 255, ${le})`,b.beginPath(),b.moveTo($,C),b.arc($,C,P,F-Q,F-Q+.12),b.closePath(),b.fill()}b.save(),b.shadowBlur=20,b.shadowColor="#00f0ff";const L=b.createLinearGradient($,C,$+Math.cos(F)*P,C+Math.sin(F)*P);L.addColorStop(0,"rgba(0, 255, 200, 1)"),L.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),L.addColorStop(1,"rgba(0, 240, 255, 0)"),b.strokeStyle=L,b.lineWidth=3,b.beginPath(),b.moveTo($,C),b.lineTo($+Math.cos(F)*P,C+Math.sin(F)*P),b.stroke(),b.lineWidth=1.5,L.addColorStop(0,"rgba(255, 255, 255, 1)"),b.stroke(),b.restore();const O=$+Math.cos(F)*P*.95,U=C+Math.sin(F)*P*.95,X=b.createRadialGradient(O,U,0,O,U,15);X.addColorStop(0,"rgba(0, 255, 200, 0.8)"),X.addColorStop(1,"rgba(0, 240, 255, 0)"),b.fillStyle=X,b.beginPath(),b.arc(O,U,15,0,Math.PI*2),b.fill();const y=[];N.forEach(V=>{const Q=`${V.vm.cluster_id}/${V.vm.node}/${V.vm.vmid}`,le=(V.angle*180/Math.PI+360)%360;(o-le+360)%360<=5&&y.push({key:Q,point:{vm:V.vm,angle:V.angle,distance:V.distance,color:V.color,lastScanAngle:o}})}),y.length>0&&m(V=>{const Q=new Map(V);y.forEach(({key:ae,point:oe})=>{Q.set(ae,oe)});const le=new Set(N.map(ae=>`${ae.vm.cluster_id}/${ae.vm.node}/${ae.vm.vmid}`));for(const ae of Q.keys())le.has(ae)||Q.delete(ae);return Q}),N.forEach(V=>{var ce,Ce;const Q=$+Math.cos(V.angle)*P*V.distance,le=C+Math.sin(V.angle)*P*V.distance,ae=(V.angle*180/Math.PI+360)%360,oe=(o-ae+360)%360;let Oe;oe<20?Oe=1:oe<60?Oe=1-(oe-20)/40*.4:Oe=.6-(oe-60)/300*.45;let ee="#00ff88";V.color==="warning"&&(ee="#ff6b00"),V.color==="danger"&&(ee="#ff0040");const ne=!!V.task,ie=(Ce=(ce=V.task)==null?void 0:ce.task_type)==null?void 0:Ce.includes("migrate");if(ne){const We=ie?"#00f0ff":"#a855f7",Qe=Date.now()/500%1;if(b.beginPath(),b.arc(Q,le,12+Qe*8,0,Math.PI*2),b.strokeStyle=We,b.lineWidth=1.5,b.globalAlpha=(1-Qe)*.6*M,b.stroke(),b.beginPath(),b.arc(Q,le,10,0,Math.PI*2),b.strokeStyle=We,b.lineWidth=1,b.globalAlpha=.8*M,b.stroke(),ie){const ke=Date.now()/200%(Math.PI*2);b.beginPath(),b.arc(Q,le,15,ke,ke+Math.PI/2),b.strokeStyle=We,b.lineWidth=2,b.globalAlpha=.9*M,b.stroke();for(let Ve=0;Ve<3;Ve++){const tt=ke+Ve*Math.PI*2/3,lt=8+(Date.now()/100+Ve*50)%100/100*10,nt=Q+Math.cos(tt)*lt,Ye=le+Math.sin(tt)*lt;b.beginPath(),b.arc(nt,Ye,1.5,0,Math.PI*2),b.fillStyle=We,b.globalAlpha=(.8-(Date.now()/100+Ve*50)%100/100*.6)*M,b.fill()}}b.globalAlpha=M}b.beginPath(),b.arc(Q,le,4+V.vm.cpu.usage_percent/100*4,0,Math.PI*2),b.fillStyle=ee,b.globalAlpha=Oe*M,b.fill(),b.shadowBlur=10,b.shadowColor=ee,b.fill(),b.shadowBlur=0,b.globalAlpha=M}),b.beginPath(),b.arc($,C,6,0,Math.PI*2),b.fillStyle="#00f0ff",b.fill()},[o,N,w,M]),h.useEffect(()=>{const E=s.current;if(!E)return;const b=()=>{const z=E.parentElement;z&&(E.width=z.clientWidth,E.height=z.clientHeight)};return b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]),!e&&!g?a.jsx("div",{className:"radar-scan empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:r("cluster.select")})]})}):a.jsxs("div",{className:"radar-scan",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"radar-header",children:a.jsxs("h1",{className:"radar-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),r("nav.radar_scan").toUpperCase()]})}),a.jsxs("div",{className:"radar-layout",children:[a.jsxs("div",{className:`radar-container ${w!=="done"?"entering":""} ${w==="grid"?"grid-phase":""}`,ref:i,style:{position:"relative"},children:[(w==="line"||w==="flip")&&a.jsxs("div",{className:`radar-entry-overlay ${w}`,children:[a.jsx("div",{className:"entry-line"}),a.jsx("div",{className:"entry-circle"}),a.jsx("div",{className:"entry-glow"})]}),a.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:T,onMouseLeave:A,style:{position:"absolute",top:0,left:0,cursor:c?"pointer":"default"}}),a.jsx("div",{className:"radar-overlay",style:{opacity:M},children:a.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",o.toFixed(0),"°"]})}),c&&(()=>{var K,G,se;const E=s.current;if(!E)return null;const b=E.width,z=E.height,$=E.getBoundingClientRect(),C=$.width,P=$.height,W=C/b,Y=P/z,F=c.pointX*W,L=c.pointY*Y,O=C,U=P,X=180,V=is(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t)?145:120,Q=X/2,le=V/2,ae=50,oe=120,Oe=O/2,ee=U/2,ne=F-Oe,ie=L-ee,ce=Math.sqrt(ne*ne+ie*ie)||1,Ce=ne/ce,We=ie/ce,Qe=(Z,q)=>{const te=Z-Q,ye=Z+Q,ge=q-le,De=q+le;if(F>=te&&F<=ye&&L>=ge&&L<=De)return-1;const be=Math.max(te,Math.min(ye,F)),_e=Math.max(ge,Math.min(De,L));return Math.sqrt((F-be)**2+(L-_e)**2)},ke=20,Ve=(Z,q)=>({x:Math.max(Q+ke,Math.min(O-Q-ke,Z)),y:Math.max(le+ke,Math.min(U-le-ke,q))}),lt=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((Z,q)=>{const te=Z.dx*Ce+Z.dy*We;return q.dx*Ce+q.dy*We-te});let nt={x:F+Ce*oe,y:L+We*oe},Ye=!1;for(const Z of lt){const q={x:F+Z.dx*oe,y:L+Z.dy*oe},te=Ve(q.x,q.y),ye=te.x-F,ge=te.y-L,be=Math.sqrt(ye*ye+ge*ge)>30&&Math.abs(Math.abs(ye)-Math.abs(ge))<20,_e=Qe(te.x,te.y);if(be&&_e>=ae){nt=te,Ye=!0;break}}if(!Ye)for(const Z of lt){const q={x:F+Z.dx*(oe+60),y:L+Z.dy*(oe+60)},te=Ve(q.x,q.y),ye=te.x-F,ge=te.y-L,be=Math.sqrt(ye*ye+ge*ge)>30&&Math.abs(Math.abs(ye)-Math.abs(ge))<20,_e=Qe(te.x,te.y);if(be&&_e>=ae){nt=te,Ye=!0;break}}if(!Ye){const Z=lt[0],q=Z.dx>0?(O-Q-10-F)/Z.dx:(Q+10-F)/Z.dx,te=Z.dy>0?(U-le-10-L)/Z.dy:(le+10-L)/Z.dy,ye=Math.min(Math.abs(q),Math.abs(te),oe),ge=Math.max(ae+20,ye);nt={x:F+Z.dx*ge,y:L+Z.dy*ge}}const Rt=20,ve=Math.max(Q+Rt,Math.min(O-Q-Rt,nt.x)),Ge=Math.max(le+Rt,Math.min(U-le-Rt,nt.y)),Fe=F,bt=L,Tt=20,rt=28,re=5,de=-Math.PI/2,me=ve-Q,Pe=Ge-le,Xe=ve,ft=Ge,It=c.vm.memory.total_bytes>0?c.vm.memory.used_bytes/c.vm.memory.total_bytes*100:0,k=((K=c.vm.disk)==null?void 0:K.usage_percent)||0,D=Math.max(c.vm.cpu.usage_percent,It,k),I=ue(D),R={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[I]||"#00f0ff";return O<=0||U<=0?null:a.jsxs(a.Fragment,{children:[(()=>{const Z=Math.sqrt((Xe-Fe)**2+(ft-bt)**2),q=Math.atan2(ft-bt,Xe-Fe)*180/Math.PI;return a.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Fe,top:bt,width:Z,height:2,background:`linear-gradient(90deg, ${R}, ${R}80)`,transformOrigin:"0 50%",transform:`rotate(${q}deg)`,boxShadow:`0 0 8px ${R}, 0 0 16px ${R}60`,pointerEvents:"none",zIndex:99}})})(),a.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Fe-rt-5,top:bt-rt-5,width:(rt+5)*2,height:(rt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[a.jsx("defs",{children:a.jsxs("filter",{id:"frameGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const Z=rt+5,q=rt+5,te=[];for(let be=0;be<re;be++){const _e=de+be*2*Math.PI/re;te.push(`${Z+Tt*Math.cos(_e)},${q+Tt*Math.sin(_e)}`)}const ye=te.join(" "),ge=[];for(let be=0;be<re;be++){const _e=de+be*2*Math.PI/re;ge.push(`${Z+rt*Math.cos(_e)},${q+rt*Math.sin(_e)}`)}const De=ge.join(" ");return a.jsxs(a.Fragment,{children:[a.jsx("polygon",{points:De,fill:"none",stroke:R,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${Z}px ${q}px`}}),a.jsx("polygon",{points:ye,fill:"none",stroke:R,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(be=>{const _e=de+be*2*Math.PI/re,In=Z+Tt*Math.cos(_e),Ln=q+Tt*Math.sin(_e),An=6,Rr=de+(be-1+re)%re*2*Math.PI/re,Tr=de+(be+1)%re*2*Math.PI/re,La=In+An*Math.cos(Rr+Math.PI),Aa=Ln+An*Math.sin(Rr+Math.PI),Oa=In+An*Math.cos(Tr+Math.PI),Fa=Ln+An*Math.sin(Tr+Math.PI);return a.jsxs("g",{children:[a.jsx("line",{x1:In,y1:Ln,x2:La,y2:Aa,stroke:R,strokeWidth:"2"}),a.jsx("line",{x1:In,y1:Ln,x2:Oa,y2:Fa,stroke:R,strokeWidth:"2"})]},be)}),a.jsx("line",{x1:Z-5,y1:q,x2:Z+5,y2:q,stroke:R,strokeWidth:"1"}),a.jsx("line",{x1:Z,y1:q-5,x2:Z,y2:q+5,stroke:R,strokeWidth:"1"})]})})()]}),a.jsxs("div",{className:`radar-tooltip tooltip-${I}`,style:{position:"absolute",left:me,top:Pe,width:X,height:V,borderColor:R,boxShadow:`0 0 15px ${R}40, 0 0 30px ${R}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[a.jsx("div",{className:"tooltip-corner tl",style:{borderColor:R}}),a.jsx("div",{className:"tooltip-corner tr",style:{borderColor:R}}),a.jsx("div",{className:"tooltip-corner bl",style:{borderColor:R}}),a.jsx("div",{className:"tooltip-corner br",style:{borderColor:R}}),a.jsxs("div",{className:"tooltip-header",children:[a.jsx("span",{className:"tooltip-name",children:c.vm.name}),a.jsxs("span",{className:"tooltip-id",children:["#",c.vm.vmid]})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"NODE"}),a.jsx("span",{className:"tooltip-value",children:c.vm.node})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"CPU"}),a.jsx("span",{className:`tooltip-value text-${ue(c.vm.cpu.usage_percent)}`,children:Ae(c.vm.cpu.usage_percent,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"MEMORY"}),a.jsx("span",{className:`tooltip-value text-${ue(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100)}`,children:Ae(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"DISKIO"}),a.jsx("span",{className:`tooltip-value text-${ue(((G=c.vm.disk)==null?void 0:G.usage_percent)||0)}`,children:Ae(((se=c.vm.disk)==null?void 0:se.usage_percent)||0,1)})]}),(()=>{const Z=is(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t),q=kf(Z);return q?a.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${q.color}40`,marginTop:4,paddingTop:4},children:[a.jsx("span",{className:"tooltip-label",children:"TASK"}),a.jsx("span",{className:"tooltip-value",style:{color:q.color},children:q.label})]}):null})(),a.jsx("div",{className:"tooltip-scanline"})]})]})})(),a.jsxs("div",{className:"radar-legend",style:{opacity:M},children:[a.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),a.jsx("span",{children:"<80%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),a.jsx("span",{children:"80-95%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),a.jsx("span",{children:">95%"}),a.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),a.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("h2",{className:"panel-title font-display",children:r("radar.anomalies")}),a.jsx("span",{className:"anomaly-count",children:S.length})]}),a.jsx("div",{className:"anomaly-list",children:S.length===0?a.jsxs("div",{className:"no-anomalies",children:[a.jsx("span",{className:"status-indicator"}),a.jsx("span",{children:r("radar.all_normal")})]}):S.map((E,b)=>{const z=`${E.cluster_id}/${E.node}/${E.vmid}`,$=p.get(z),C=(c==null?void 0:c.vm.node)===E.node&&(c==null?void 0:c.vm.vmid)===E.vmid&&(c==null?void 0:c.vm.cluster_id)===E.cluster_id,P=is(E.vmid,E.node,E.cluster_id,e,t);return a.jsx(Hg,{vm:E,index:b,previousIndex:$,onClick:()=>B(E),isSelected:C,task:P},z)})})]})]}),a.jsx("style",{children:`
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
          font-size: 13px;
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
          font-size: 12px;
          color: var(--primary);
          flex: 1;
        }

        .tooltip-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
        }

        .tooltip-label {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .tooltip-value {
          font-family: var(--font-mono);
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 11px;
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
          font-size: 14px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .anomaly-stats .stat-label {
          font-size: 13px;
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

      `})]})}function Gg({value:e,duration:t=800,suffix:n=""}){const[r,s]=h.useState(0),i=h.useRef(0),o=h.useRef(0);return h.useEffect(()=>{i.current=r;const l=performance.now(),c=d=>{const p=d-l,f=Math.min(p/t,1),u=1-Math.pow(1-f,3);s(i.current+(e-i.current)*u),f<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),a.jsxs(a.Fragment,{children:[r.toFixed(0),n]})}function Ks({value:e,duration:t=800}){const[n,r]=h.useState(0),s=h.useRef(0),i=h.useRef(0);return h.useEffect(()=>{s.current=n;const o=performance.now(),l=c=>{const d=c-o,p=Math.min(d/t,1),f=1-Math.pow(1-p,3);r(s.current+(e-s.current)*f),p<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),a.jsx(a.Fragment,{children:he(n)})}function Xg({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"ceph-core visible",children:[a.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),a.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),a.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),a.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),a.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),a.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),a.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),a.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:r,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${r})`}}),a.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),a.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),a.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:a.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),a.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:a.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),a.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:a.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),a.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),a.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:a.jsx(Gg,{value:n,duration:1500,suffix:"%"})})]}),a.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),a.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),a.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function Kg({mons:e,mgrs:t,mds:n}){const{t:r}=Ie();return a.jsxs("div",{className:"daemon-orbital",children:[a.jsx("div",{className:"orbital-title",children:r("ceph.cluster_daemons")}),a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mon",children:"MON"}),a.jsx("span",{className:"daemon-count",children:e.length})]}),a.jsx("div",{className:"daemon-nodes",children:e.map(s=>a.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&a.jsx("div",{className:"leader-glow"})]},s.name))})]}),a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mgr",children:"MGR"}),a.jsx("span",{className:"daemon-count",children:t.length})]}),a.jsx("div",{className:"daemon-nodes",children:t.map(s=>a.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&a.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mds",children:"MDS"}),a.jsx("span",{className:"daemon-count",children:n.length})]}),a.jsx("div",{className:"daemon-nodes",children:n.map(s=>a.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&a.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function qg({osds:e,onSelect:t}){const{t:n}=Ie(),r=h.useMemo(()=>{const i={};return e.forEach(o=>{const l=o.host||"unknown";i[l]||(i[l]=[]),i[l].push(o)}),Object.entries(i).sort(([o],[l])=>o.localeCompare(l,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(i=>i.status==="up").length;return a.jsxs("div",{className:"osd-grid-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),a.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),a.jsx("div",{className:"osd-hosts",children:(()=>{let i=0;return r.map(([o,l])=>a.jsxs("div",{className:"osd-host-group",children:[a.jsx("div",{className:"host-label",children:o}),a.jsx("div",{className:"osd-hexgrid",children:l.sort((c,d)=>c.id-d.id).map(c=>{const d=c.total_bytes>0?c.used_bytes/c.total_bytes*100:0,p=c.status!=="up"||ue(d)==="danger"?"#ff0040":ue(d)==="warning"?"#ff6b00":"#00ff88",f=i*30;return i++,a.jsx("div",{className:`osd-hex ${c.status==="up"?"up":"down"}`,style:{"--osd-color":p,animationDelay:`${f}ms`},onClick:()=>t(c),title:`OSD.${c.id} - ${Ae(d,0)}`,children:a.jsx("span",{className:"osd-id",children:c.id})},c.id)})})]},o))})()})]})}function Qg({readBps:e,writeBps:t,readOps:n,writeOps:r,isPaused:s=!1}){const i=h.useRef(null),o=h.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),l=h.useRef(0),c=h.useRef(0),d=100,p=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return h.useEffect(()=>{o.current.targetRead=e,o.current.targetWrite=t},[e,t]),h.useEffect(()=>{const f=i.current;if(!f)return;const u=f.getContext("2d");if(!u)return;const m=window.devicePixelRatio||1,w=()=>{const A=f.getBoundingClientRect();return f.width=A.width*m,f.height=A.height*m,u.setTransform(m,0,0,m,0,0),{width:A.width,height:A.height}};let{width:_,height:M}=w();const v=42,g=_-v;let x=0;const N=50;let S=0;const T=A=>{const B=A-x;x=A,S+=B;const E=.1;o.current.currentRead+=(o.current.targetRead-o.current.currentRead)*E,o.current.currentWrite+=(o.current.targetWrite-o.current.currentWrite)*E,S>=N&&(S=0,o.current.read.push(o.current.currentRead),o.current.write.push(o.current.currentWrite),o.current.read.length>d&&o.current.read.shift(),o.current.write.length>d&&o.current.write.shift()),c.current=(c.current+.5)%20,u.clearRect(0,0,_,M);const b=Math.max(...o.current.read,...o.current.write,1),z=8,$=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let P=0;P<=$;P++){const W=z+P/$*(M-z*2),Y=b*(1-P/$);u.fillText(p(Y),v-4,W)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let P=0;P<=$;P++){const W=z+P/$*(M-z*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-c.current,u.moveTo(v,W),u.lineTo(_,W),u.stroke()}u.setLineDash([]);const C=(P,W,Y)=>{if(P.length<2)return;const F=P.map((O,U)=>({x:v+U/(d-1)*g,y:M-z-O/b*(M-z*2)}));u.strokeStyle=Y,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(F[0].x,F[0].y);for(let O=1;O<F.length-1;O++){const U=(F[O].x+F[O+1].x)/2,X=(F[O].y+F[O+1].y)/2;u.quadraticCurveTo(F[O].x,F[O].y,U,X)}u.lineTo(F[F.length-1].x,F[F.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=W,u.lineWidth=2,u.shadowColor=W,u.shadowBlur=8,u.beginPath(),u.moveTo(F[0].x,F[0].y);for(let O=1;O<F.length-1;O++){const U=(F[O].x+F[O+1].x)/2,X=(F[O].y+F[O+1].y)/2;u.quadraticCurveTo(F[O].x,F[O].y,U,X)}u.lineTo(F[F.length-1].x,F[F.length-1].y),u.stroke(),u.shadowBlur=0;const L=3;for(let O=0;O<L;O++){const U=(c.current/20+O/L)%1,X=Math.floor(U*(F.length-1));X<F.length&&(u.fillStyle=W,u.globalAlpha=.8,u.beginPath(),u.arc(F[X].x,F[X].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};C(o.current.write,"#ff6b00","#ff6b00"),C(o.current.read,"#00ff88","#00ff88"),s||(l.current=requestAnimationFrame(T))};return l.current=requestAnimationFrame(T),()=>cancelAnimationFrame(l.current)},[s]),a.jsxs("div",{className:"io-wave-panel",children:[a.jsx("div",{className:"panel-header",children:a.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),a.jsx("canvas",{ref:i,className:"io-canvas",style:{width:"100%",height:"100px"}}),a.jsxs("div",{className:"io-stats",children:[a.jsxs("div",{className:"io-stat read",children:[a.jsx("span",{className:"io-icon",children:"▼"}),a.jsx("span",{className:"io-label",children:"READ"}),a.jsxs("span",{className:"io-value",children:[he(e),"/s"]}),a.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),a.jsxs("div",{className:"io-stat write",children:[a.jsx("span",{className:"io-icon",children:"▲"}),a.jsx("span",{className:"io-label",children:"WRITE"}),a.jsxs("span",{className:"io-value",children:[he(t),"/s"]}),a.jsxs("span",{className:"io-ops",children:[r.toFixed(0)," IOPS"]})]})]})]})}function Ld({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"pool-energy-bar visible",children:[a.jsxs("div",{className:"pool-info",children:[a.jsx("span",{className:"pool-name",children:e.name}),a.jsx("span",{className:"pool-size",children:he(e.used_bytes)})]}),a.jsxs("div",{className:"energy-track",children:[a.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${r}88, ${r})`,boxShadow:`0 0 10px ${r}`}}),a.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:r}})]}),a.jsxs("span",{className:"pool-percent",style:{color:r},children:[n.toFixed(1),"%"]})]})}function Zg({osd:e,onClose:t}){const{t:n}=Ie(),r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=ue(r);return a.jsx("div",{className:"osd-popup-overlay",onClick:t,children:a.jsxs("div",{className:"osd-popup",onClick:i=>i.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",children:[a.jsxs("div",{className:"popup-title",children:[a.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),a.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),a.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),a.jsxs("div",{className:"popup-content",children:[a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:"Host"}),a.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),a.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),a.jsxs("div",{className:"storage-section",children:[a.jsx("div",{className:"storage-bar",children:a.jsx("div",{className:`storage-fill ${s}`,style:{width:`${r}%`}})}),a.jsxs("div",{className:"storage-stats",children:[a.jsxs("span",{children:[he(e.used_bytes)," / ",he(e.total_bytes)]}),a.jsx("span",{className:`text-${s}`,children:Ae(r,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&a.jsxs("div",{className:"latency-section",children:[a.jsx("div",{className:"latency-title",children:n("ceph.latency")}),a.jsxs("div",{className:"latency-grid",children:[a.jsxs("div",{className:"latency-item",children:[a.jsx("span",{className:"latency-label",children:n("ceph.apply")}),a.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),a.jsxs("div",{className:"latency-item",children:[a.jsx("span",{className:"latency-label",children:n("ceph.commit")}),a.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function Jg({ceph:e}){const{t}=Ie(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=100-n;return a.jsxs("div",{className:"storage-summary",children:[a.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),a.jsxs("div",{className:"summary-stats",children:[a.jsxs("div",{className:"stat-block used",children:[a.jsx("span",{className:"stat-value",children:he(e.used_bytes)}),a.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),a.jsx("div",{className:"stat-divider",children:"/"}),a.jsxs("div",{className:"stat-block total",children:[a.jsx("span",{className:"stat-value",children:he(e.total_bytes)}),a.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),a.jsxs("div",{className:"summary-bar",children:[a.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),a.jsx("div",{className:"bar-available",style:{width:`${r}%`}})]}),a.jsxs("div",{className:"summary-legend",children:[a.jsxs("span",{className:"legend-item used",children:[a.jsx("span",{className:"legend-dot"})," Used ",Ae(n,1)]}),a.jsxs("span",{className:"legend-item available",children:[a.jsx("span",{className:"legend-dot"})," Available ",Ae(r,1)]})]})]})}function eh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsx("div",{className:"compact-core",children:a.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[a.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),a.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),a.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),a.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:r,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${r})`,transition:"stroke-dasharray 0.5s ease"}}),a.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),a.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),a.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:Ae(n,0)})]})})}function th({mons:e,mgrs:t,mds:n}){return a.jsxs("div",{className:"compact-daemons",children:[a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mon",children:"MON"}),a.jsx("div",{className:"daemon-dots",children:e.map(r=>a.jsx("span",{className:`daemon-dot mon ${r.state}`,title:`${r.name} - ${r.state}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:e.length})]}),a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),a.jsx("div",{className:"daemon-dots",children:t.map(r=>a.jsx("span",{className:`daemon-dot mgr ${r.active?"active":"standby"}`,title:`${r.name} - ${r.active?"Active":"Standby"}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mds",children:"MDS"}),a.jsx("div",{className:"daemon-dots",children:n.map(r=>a.jsx("span",{className:`daemon-dot mds ${r.state}`,title:`${r.name} - ${r.state}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function nh({ceph:e}){const{t}=Ie(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return a.jsxs("div",{className:"compact-storage",children:[a.jsxs("div",{className:"storage-row",children:[a.jsx("span",{className:"storage-label",children:t("ceph.used")}),a.jsx("span",{className:"storage-value",children:a.jsx(Ks,{value:e.used_bytes})})]}),a.jsx("div",{className:"compact-bar",children:a.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),a.jsxs("div",{className:"storage-row",children:[a.jsx("span",{className:"storage-label",children:t("ceph.total")}),a.jsx("span",{className:"storage-value",children:a.jsx(Ks,{value:e.total_bytes})})]})]})}function rh({osds:e,onSelect:t}){const n=e.filter(r=>r.status==="up").length;return a.jsxs("div",{className:"compact-osd-panel",children:[a.jsxs("div",{className:"compact-osd-header",children:[a.jsx("span",{className:"compact-osd-title",children:"OSD"}),a.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),a.jsx("div",{className:"compact-osd-grid",children:e.sort((r,s)=>r.id-s.id).map((r,s)=>{const i=r.total_bytes>0?r.used_bytes/r.total_bytes*100:0,o=r.status!=="up"||i>=95?"#ff0040":i>=80?"#ff6b00":"#00ff88";return a.jsx("div",{className:`compact-osd ${r.status==="up"?"up":"down"}`,style:{"--osd-color":o,animationDelay:`${s*20}ms`},onClick:()=>t(r),title:`OSD.${r.id}`,children:r.id},r.id)})})]})}function ah({readBps:e,writeBps:t}){return a.jsxs("div",{className:"compact-io",children:[a.jsxs("div",{className:"io-row read",children:[a.jsx("span",{className:"io-arrow",children:"▼"}),a.jsx("span",{className:"io-label",children:"R"}),a.jsxs("span",{className:"io-val",children:[a.jsx(Ks,{value:e,duration:500}),"/s"]})]}),a.jsxs("div",{className:"io-row write",children:[a.jsx("span",{className:"io-arrow",children:"▲"}),a.jsx("span",{className:"io-label",children:"W"}),a.jsxs("span",{className:"io-val",children:[a.jsx(Ks,{value:t,duration:500}),"/s"]})]})]})}function sh({pools:e,totalBytes:t}){const n=e.filter(r=>!r.name.startsWith(".")&&!r.name.endsWith("_metadata")).map(r=>({...r,name:r.name.endsWith("_data")?r.name.replace(/_data$/,""):r.name}));return n.length===0?null:a.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(r=>{const s=r.total_bytes>0?r.used_bytes/r.total_bytes*100:r.used_bytes/t*100,i=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"compact-pool",children:[a.jsx("span",{className:"pool-label",children:r.name.substring(0,12)}),a.jsx("div",{className:"pool-mini-bar",children:a.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:i}})}),a.jsx("span",{className:"pool-pct",style:{color:i},children:Ae(s,0)})]},r.name)}),n.length>6&&a.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function ih({ceph:e,clusterName:t,onOSDSelect:n,compact:r=!1,isPaused:s=!1}){const{t:i}=Ie();if(r)return a.jsxs("div",{className:"ceph-cluster-compact",children:[a.jsx("div",{className:"compact-left",children:a.jsx(eh,{ceph:e})}),a.jsxs("div",{className:"compact-middle",children:[a.jsx(th,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),a.jsx(nh,{ceph:e}),a.jsx(ah,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),a.jsx("div",{className:"compact-right",children:a.jsx(rh,{osds:e.osds,onSelect:n})}),a.jsx("div",{className:"compact-pools-section",children:a.jsx(sh,{pools:e.pools,totalBytes:e.total_bytes})})]});const o=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),l=o.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),c=o.filter(d=>!d.name.toLowerCase().includes("cephfs"));return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"ceph-content-full",children:[a.jsxs("div",{className:"col-core",children:[a.jsx(Xg,{ceph:e}),a.jsx(Jg,{ceph:e})]}),a.jsxs("div",{className:"col-daemons",children:[a.jsx(Kg,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),a.jsxs("div",{className:"pools-inline",children:[c.length>0&&a.jsxs("div",{className:"pool-group-inline",children:[a.jsx("div",{className:"pool-group-title",children:i("ceph.ceph_pools")}),a.jsx("div",{className:"pools-list",children:c.map((d,p)=>a.jsx(Ld,{pool:d,totalBytes:e.total_bytes},d.name))})]}),l.length>0&&a.jsxs("div",{className:"pool-group-inline",children:[a.jsx("div",{className:"pool-group-title",children:i("ceph.cephfs_pools")}),a.jsx("div",{className:"pools-list",children:l.map((d,p)=>a.jsx(Ld,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),a.jsxs("div",{className:"col-osd",children:[a.jsx(Qg,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),a.jsx(qg,{osds:e.osds,onSelect:n})]})]})})}function oh({cluster:e,clusters:t,isPaused:n=!1}){const{t:r}=Ie(),[s,i]=h.useState(null),o=!e&&t&&Object.keys(t).length>0,l=h.useMemo(()=>o?Object.entries(t).filter(([c,d])=>d.ceph).map(([c,d])=>({id:c,name:d.name||c,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,o]);return!e&&!o?a.jsxs("div",{className:"ceph-constellation empty",children:[a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:r("cluster.select")})]}),a.jsx("style",{children:Ji})]}):l.length===0?a.jsxs("div",{className:"ceph-constellation empty",children:[a.jsxs("div",{className:"empty-message",children:[a.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 8v4M12 16h.01"})]}),a.jsx("span",{children:r("ceph.no_cluster")})]}),a.jsx("style",{children:Ji})]}):a.jsxs("div",{className:"ceph-constellation",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"ceph-header",children:a.jsxs("h1",{className:"ceph-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),a.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),r("ceph.title")]})}),a.jsx("div",{className:"ceph-clusters-stack",children:l.map((c,d)=>{const p=c.ceph.health==="HEALTH_OK"?"success":c.ceph.health==="HEALTH_WARN"?"warning":"danger";return a.jsxs("div",{className:"ceph-cluster-section",children:[l.length>1&&a.jsxs("div",{className:"cluster-section-header",children:[a.jsx("span",{className:`section-health ${p}`}),a.jsx("span",{className:"section-name",children:c.name}),a.jsxs("span",{className:"section-osd",children:[c.ceph.osd_up,"/",c.ceph.osd_count," OSD"]}),a.jsx("div",{className:"section-line"})]}),a.jsx(ih,{ceph:c.ceph,clusterName:l.length===1?c.name:void 0,onOSDSelect:i,compact:l.length>1,isPaused:n})]},c.id)})}),s&&a.jsx(Zg,{osd:s,onClose:()=>i(null)}),a.jsx("style",{children:Ji})]})}const Ji=`
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
    font-size: 12px;
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
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .compact-storage-text {
    font-family: var(--font-mono);
    font-size: 14px;
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
    font-size: 11px;
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
    font-size: 14px;
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
    font-size: 12px;
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
    font-size: 12px;
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
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 3px;
    font-weight: 600;
  }

  .daemon-type.mon { background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
  .daemon-type.mgr { background: rgba(255, 149, 0, 0.15); color: #ff9500; border: 1px solid rgba(255, 149, 0, 0.3); }
  .daemon-type.mds { background: rgba(180, 120, 255, 0.15); color: #b478ff; border: 1px solid rgba(180, 120, 255, 0.3); }

  .daemon-count {
    font-family: var(--font-mono);
    font-size: 11px;
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
    font-size: 12px;
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
    font-size: 12px;
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
    font-size: 11px;
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
    font-size: 12px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
  }

  .osd-status {
    font-family: var(--font-mono);
    font-size: 12px;
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
    font-size: 12px;
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
    font-size: 11px;
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
    font-size: 12px;
  }

  .io-stat.read .io-icon { color: #00ff88; }
  .io-stat.write .io-icon { color: #ff6b00; }

  .io-label {
    font-family: var(--font-display);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    min-width: 45px;
  }

  .io-value {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
  }

  .io-stat.read .io-value { color: #00ff88; }
  .io-stat.write .io-value { color: #ff6b00; }

  .io-ops {
    font-family: var(--font-mono);
    font-size: 12px;
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
    font-size: 12px;
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
    font-size: 11px;
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
    font-size: 12px;
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
    font-size: 12px;
    color: var(--text-muted);
  }

  .info-value {
    font-family: var(--font-mono);
    font-size: 12px;
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
    font-size: 11px;
    color: var(--text-secondary);
  }

  .latency-section {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .latency-title {
    font-family: var(--font-display);
    font-size: 11px;
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
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .text-success { color: #00ff88 !important; }
  .text-warning { color: #ff6b00 !important; }
  .text-danger { color: #ff0040 !important; }
`;var lh={value:()=>{}};function jf(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new ks(n)}function ks(e){this._=e}function ch(e,t){return e.trim().split(/^|\s+/).map(function(n){var r="",s=n.indexOf(".");if(s>=0&&(r=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}ks.prototype=jf.prototype={constructor:ks,on:function(e,t){var n=this._,r=ch(e+"",n),s,i=-1,o=r.length;if(arguments.length<2){for(;++i<o;)if((s=(e=r[i]).type)&&(s=dh(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++i<o;)if(s=(e=r[i]).type)n[s]=Ad(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Ad(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new ks(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),r=0,s,i;r<s;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=this._[e],r=0,s=i.length;r<s;++r)i[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],s=0,i=r.length;s<i;++s)r[s].value.apply(t,n)}};function dh(e,t){for(var n=0,r=e.length,s;n<r;++n)if((s=e[n]).name===t)return s.value}function Ad(e,t,n){for(var r=0,s=e.length;r<s;++r)if(e[r].name===t){e[r]=lh,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Zo="http://www.w3.org/1999/xhtml";const Od={svg:"http://www.w3.org/2000/svg",xhtml:Zo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function bi(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Od.hasOwnProperty(t)?{space:Od[t],local:e}:e}function uh(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Zo&&t.documentElement.namespaceURI===Zo?t.createElement(e):t.createElementNS(n,e)}}function ph(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function _f(e){var t=bi(e);return(t.local?ph:uh)(t)}function fh(){}function ec(e){return e==null?fh:function(){return this.querySelector(e)}}function mh(e){typeof e!="function"&&(e=ec(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=new Array(o),c,d,p=0;p<o;++p)(c=i[p])&&(d=e.call(c,c.__data__,p,i))&&("__data__"in c&&(d.__data__=c.__data__),l[p]=d);return new Ht(r,this._parents)}function gh(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function hh(){return[]}function Nf(e){return e==null?hh:function(){return this.querySelectorAll(e)}}function xh(e){return function(){return gh(e.apply(this,arguments))}}function vh(e){typeof e=="function"?e=xh(e):e=Nf(e);for(var t=this._groups,n=t.length,r=[],s=[],i=0;i<n;++i)for(var o=t[i],l=o.length,c,d=0;d<l;++d)(c=o[d])&&(r.push(e.call(c,c.__data__,d,o)),s.push(c));return new Ht(r,s)}function Sf(e){return function(){return this.matches(e)}}function Cf(e){return function(t){return t.matches(e)}}var yh=Array.prototype.find;function bh(e){return function(){return yh.call(this.children,e)}}function wh(){return this.firstElementChild}function kh(e){return this.select(e==null?wh:bh(typeof e=="function"?e:Cf(e)))}var jh=Array.prototype.filter;function _h(){return Array.from(this.children)}function Nh(e){return function(){return jh.call(this.children,e)}}function Sh(e){return this.selectAll(e==null?_h:Nh(typeof e=="function"?e:Cf(e)))}function Ch(e){typeof e!="function"&&(e=Sf(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=[],c,d=0;d<o;++d)(c=i[d])&&e.call(c,c.__data__,d,i)&&l.push(c);return new Ht(r,this._parents)}function Mf(e){return new Array(e.length)}function Mh(){return new Ht(this._enter||this._groups.map(Mf),this._parents)}function qs(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}qs.prototype={constructor:qs,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Eh(e){return function(){return e}}function zh(e,t,n,r,s,i){for(var o=0,l,c=t.length,d=i.length;o<d;++o)(l=t[o])?(l.__data__=i[o],r[o]=l):n[o]=new qs(e,i[o]);for(;o<c;++o)(l=t[o])&&(s[o]=l)}function $h(e,t,n,r,s,i,o){var l,c,d=new Map,p=t.length,f=i.length,u=new Array(p),m;for(l=0;l<p;++l)(c=t[l])&&(u[l]=m=o.call(c,c.__data__,l,t)+"",d.has(m)?s[l]=c:d.set(m,c));for(l=0;l<f;++l)m=o.call(e,i[l],l,i)+"",(c=d.get(m))?(r[l]=c,c.__data__=i[l],d.delete(m)):n[l]=new qs(e,i[l]);for(l=0;l<p;++l)(c=t[l])&&d.get(u[l])===c&&(s[l]=c)}function Ph(e){return e.__data__}function Rh(e,t){if(!arguments.length)return Array.from(this,Ph);var n=t?$h:zh,r=this._parents,s=this._groups;typeof e!="function"&&(e=Eh(e));for(var i=s.length,o=new Array(i),l=new Array(i),c=new Array(i),d=0;d<i;++d){var p=r[d],f=s[d],u=f.length,m=Th(e.call(p,p&&p.__data__,d,r)),w=m.length,_=l[d]=new Array(w),M=o[d]=new Array(w),v=c[d]=new Array(u);n(p,f,_,M,v,m,t);for(var g=0,x=0,N,S;g<w;++g)if(N=_[g]){for(g>=x&&(x=g+1);!(S=M[x])&&++x<w;);N._next=S||null}}return o=new Ht(o,r),o._enter=l,o._exit=c,o}function Th(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Ih(){return new Ht(this._exit||this._groups.map(Mf),this._parents)}function Lh(e,t,n){var r=this.enter(),s=this,i=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?i.remove():n(i),r&&s?r.merge(s).order():s}function Ah(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,s=n.length,i=r.length,o=Math.min(s,i),l=new Array(s),c=0;c<o;++c)for(var d=n[c],p=r[c],f=d.length,u=l[c]=new Array(f),m,w=0;w<f;++w)(m=d[w]||p[w])&&(u[w]=m);for(;c<s;++c)l[c]=n[c];return new Ht(l,this._parents)}function Oh(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],s=r.length-1,i=r[s],o;--s>=0;)(o=r[s])&&(i&&o.compareDocumentPosition(i)^4&&i.parentNode.insertBefore(o,i),i=o);return this}function Fh(e){e||(e=Dh);function t(f,u){return f&&u?e(f.__data__,u.__data__):!f-!u}for(var n=this._groups,r=n.length,s=new Array(r),i=0;i<r;++i){for(var o=n[i],l=o.length,c=s[i]=new Array(l),d,p=0;p<l;++p)(d=o[p])&&(c[p]=d);c.sort(t)}return new Ht(s,this._parents).order()}function Dh(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Bh(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Wh(){return Array.from(this)}function Vh(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],s=0,i=r.length;s<i;++s){var o=r[s];if(o)return o}return null}function Uh(){let e=0;for(const t of this)++e;return e}function Hh(){return!this.node()}function Yh(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var s=t[n],i=0,o=s.length,l;i<o;++i)(l=s[i])&&e.call(l,l.__data__,i,s);return this}function Gh(e){return function(){this.removeAttribute(e)}}function Xh(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Kh(e,t){return function(){this.setAttribute(e,t)}}function qh(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Qh(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Zh(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Jh(e,t){var n=bi(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?Xh:Gh:typeof t=="function"?n.local?Zh:Qh:n.local?qh:Kh)(n,t))}function Ef(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function ex(e){return function(){this.style.removeProperty(e)}}function tx(e,t,n){return function(){this.style.setProperty(e,t,n)}}function nx(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function rx(e,t,n){return arguments.length>1?this.each((t==null?ex:typeof t=="function"?nx:tx)(e,t,n??"")):Mr(this.node(),e)}function Mr(e,t){return e.style.getPropertyValue(t)||Ef(e).getComputedStyle(e,null).getPropertyValue(t)}function ax(e){return function(){delete this[e]}}function sx(e,t){return function(){this[e]=t}}function ix(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function ox(e,t){return arguments.length>1?this.each((t==null?ax:typeof t=="function"?ix:sx)(e,t)):this.node()[e]}function zf(e){return e.trim().split(/^|\s+/)}function tc(e){return e.classList||new $f(e)}function $f(e){this._node=e,this._names=zf(e.getAttribute("class")||"")}$f.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Pf(e,t){for(var n=tc(e),r=-1,s=t.length;++r<s;)n.add(t[r])}function Rf(e,t){for(var n=tc(e),r=-1,s=t.length;++r<s;)n.remove(t[r])}function lx(e){return function(){Pf(this,e)}}function cx(e){return function(){Rf(this,e)}}function dx(e,t){return function(){(t.apply(this,arguments)?Pf:Rf)(this,e)}}function ux(e,t){var n=zf(e+"");if(arguments.length<2){for(var r=tc(this.node()),s=-1,i=n.length;++s<i;)if(!r.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?dx:t?lx:cx)(n,t))}function px(){this.textContent=""}function fx(e){return function(){this.textContent=e}}function mx(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function gx(e){return arguments.length?this.each(e==null?px:(typeof e=="function"?mx:fx)(e)):this.node().textContent}function hx(){this.innerHTML=""}function xx(e){return function(){this.innerHTML=e}}function vx(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function yx(e){return arguments.length?this.each(e==null?hx:(typeof e=="function"?vx:xx)(e)):this.node().innerHTML}function bx(){this.nextSibling&&this.parentNode.appendChild(this)}function wx(){return this.each(bx)}function kx(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function jx(){return this.each(kx)}function _x(e){var t=typeof e=="function"?e:_f(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Nx(){return null}function Sx(e,t){var n=typeof e=="function"?e:_f(e),r=t==null?Nx:typeof t=="function"?t:ec(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function Cx(){var e=this.parentNode;e&&e.removeChild(this)}function Mx(){return this.each(Cx)}function Ex(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function zx(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function $x(e){return this.select(e?zx:Ex)}function Px(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Rx(e){return function(t){e.call(this,t,this.__data__)}}function Tx(e){return e.trim().split(/^|\s+/).map(function(t){var n="",r=t.indexOf(".");return r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),{type:t,name:n}})}function Ix(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,s=t.length,i;n<s;++n)i=t[n],(!e.type||i.type===e.type)&&i.name===e.name?this.removeEventListener(i.type,i.listener,i.options):t[++r]=i;++r?t.length=r:delete this.__on}}}function Lx(e,t,n){return function(){var r=this.__on,s,i=Rx(t);if(r){for(var o=0,l=r.length;o<l;++o)if((s=r[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=i,s.options=n),s.value=t;return}}this.addEventListener(e.type,i,n),s={type:e.type,name:e.name,value:t,listener:i,options:n},r?r.push(s):this.__on=[s]}}function Ax(e,t,n){var r=Tx(e+""),s,i=r.length,o;if(arguments.length<2){var l=this.node().__on;if(l){for(var c=0,d=l.length,p;c<d;++c)for(s=0,p=l[c];s<i;++s)if((o=r[s]).type===p.type&&o.name===p.name)return p.value}return}for(l=t?Lx:Ix,s=0;s<i;++s)this.each(l(r[s],t,n));return this}function Tf(e,t,n){var r=Ef(e),s=r.CustomEvent;typeof s=="function"?s=new s(t,n):(s=r.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function Ox(e,t){return function(){return Tf(this,e,t)}}function Fx(e,t){return function(){return Tf(this,e,t.apply(this,arguments))}}function Dx(e,t){return this.each((typeof t=="function"?Fx:Ox)(e,t))}function*Bx(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],s=0,i=r.length,o;s<i;++s)(o=r[s])&&(yield o)}var Wx=[null];function Ht(e,t){this._groups=e,this._parents=t}function Ta(){return new Ht([[document.documentElement]],Wx)}function Vx(){return this}Ht.prototype=Ta.prototype={constructor:Ht,select:mh,selectAll:vh,selectChild:kh,selectChildren:Sh,filter:Ch,data:Rh,enter:Mh,exit:Ih,join:Lh,merge:Ah,selection:Vx,order:Oh,sort:Fh,call:Bh,nodes:Wh,node:Vh,size:Uh,empty:Hh,each:Yh,attr:Jh,style:rx,property:ox,classed:ux,text:gx,html:yx,raise:wx,lower:jx,append:_x,insert:Sx,remove:Mx,clone:$x,datum:Px,on:Ax,dispatch:Dx,[Symbol.iterator]:Bx};function nc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function If(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Ia(){}var Na=.7,Qs=1/Na,br="\\s*([+-]?\\d+)\\s*",Sa="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Jt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ux=/^#([0-9a-f]{3,8})$/,Hx=new RegExp(`^rgb\\(${br},${br},${br}\\)$`),Yx=new RegExp(`^rgb\\(${Jt},${Jt},${Jt}\\)$`),Gx=new RegExp(`^rgba\\(${br},${br},${br},${Sa}\\)$`),Xx=new RegExp(`^rgba\\(${Jt},${Jt},${Jt},${Sa}\\)$`),Kx=new RegExp(`^hsl\\(${Sa},${Jt},${Jt}\\)$`),qx=new RegExp(`^hsla\\(${Sa},${Jt},${Jt},${Sa}\\)$`),Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};nc(Ia,Ca,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Dd,formatHex:Dd,formatHex8:Qx,formatHsl:Zx,formatRgb:Bd,toString:Bd});function Dd(){return this.rgb().formatHex()}function Qx(){return this.rgb().formatHex8()}function Zx(){return Lf(this).formatHsl()}function Bd(){return this.rgb().formatRgb()}function Ca(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=Ux.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Wd(t):n===3?new ht(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?os(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?os(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Hx.exec(e))?new ht(t[1],t[2],t[3],1):(t=Yx.exec(e))?new ht(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Gx.exec(e))?os(t[1],t[2],t[3],t[4]):(t=Xx.exec(e))?os(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Kx.exec(e))?Hd(t[1],t[2]/100,t[3]/100,1):(t=qx.exec(e))?Hd(t[1],t[2]/100,t[3]/100,t[4]):Fd.hasOwnProperty(e)?Wd(Fd[e]):e==="transparent"?new ht(NaN,NaN,NaN,0):null}function Wd(e){return new ht(e>>16&255,e>>8&255,e&255,1)}function os(e,t,n,r){return r<=0&&(e=t=n=NaN),new ht(e,t,n,r)}function Jx(e){return e instanceof Ia||(e=Ca(e)),e?(e=e.rgb(),new ht(e.r,e.g,e.b,e.opacity)):new ht}function Jo(e,t,n,r){return arguments.length===1?Jx(e):new ht(e,t,n,r??1)}function ht(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}nc(ht,Jo,If(Ia,{brighter(e){return e=e==null?Qs:Math.pow(Qs,e),new ht(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Na:Math.pow(Na,e),new ht(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new ht(Yn(this.r),Yn(this.g),Yn(this.b),Zs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Vd,formatHex:Vd,formatHex8:ev,formatRgb:Ud,toString:Ud}));function Vd(){return`#${Vn(this.r)}${Vn(this.g)}${Vn(this.b)}`}function ev(){return`#${Vn(this.r)}${Vn(this.g)}${Vn(this.b)}${Vn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ud(){const e=Zs(this.opacity);return`${e===1?"rgb(":"rgba("}${Yn(this.r)}, ${Yn(this.g)}, ${Yn(this.b)}${e===1?")":`, ${e})`}`}function Zs(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Yn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Vn(e){return e=Yn(e),(e<16?"0":"")+e.toString(16)}function Hd(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Bt(e,t,n,r)}function Lf(e){if(e instanceof Bt)return new Bt(e.h,e.s,e.l,e.opacity);if(e instanceof Ia||(e=Ca(e)),!e)return new Bt;if(e instanceof Bt)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,s=Math.min(t,n,r),i=Math.max(t,n,r),o=NaN,l=i-s,c=(i+s)/2;return l?(t===i?o=(n-r)/l+(n<r)*6:n===i?o=(r-t)/l+2:o=(t-n)/l+4,l/=c<.5?i+s:2-i-s,o*=60):l=c>0&&c<1?0:o,new Bt(o,l,c,e.opacity)}function tv(e,t,n,r){return arguments.length===1?Lf(e):new Bt(e,t,n,r??1)}function Bt(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}nc(Bt,tv,If(Ia,{brighter(e){return e=e==null?Qs:Math.pow(Qs,e),new Bt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Na:Math.pow(Na,e),new Bt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,s=2*n-r;return new ht(eo(e>=240?e-240:e+120,s,r),eo(e,s,r),eo(e<120?e+240:e-120,s,r),this.opacity)},clamp(){return new Bt(Yd(this.h),ls(this.s),ls(this.l),Zs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Zs(this.opacity);return`${e===1?"hsl(":"hsla("}${Yd(this.h)}, ${ls(this.s)*100}%, ${ls(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Yd(e){return e=(e||0)%360,e<0?e+360:e}function ls(e){return Math.max(0,Math.min(1,e||0))}function eo(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Af=e=>()=>e;function nv(e,t){return function(n){return e+n*t}}function rv(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}function av(e){return(e=+e)==1?Of:function(t,n){return n-t?rv(t,n,e):Af(isNaN(t)?n:t)}}function Of(e,t){var n=t-e;return n?nv(e,n):Af(isNaN(e)?t:e)}const Gd=function e(t){var n=av(t);function r(s,i){var o=n((s=Jo(s)).r,(i=Jo(i)).r),l=n(s.g,i.g),c=n(s.b,i.b),d=Of(s.opacity,i.opacity);return function(p){return s.r=o(p),s.g=l(p),s.b=c(p),s.opacity=d(p),s+""}}return r.gamma=e,r}(1);function xn(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var el=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,to=new RegExp(el.source,"g");function sv(e){return function(){return e}}function iv(e){return function(t){return e(t)+""}}function ov(e,t){var n=el.lastIndex=to.lastIndex=0,r,s,i,o=-1,l=[],c=[];for(e=e+"",t=t+"";(r=el.exec(e))&&(s=to.exec(t));)(i=s.index)>n&&(i=t.slice(n,i),l[o]?l[o]+=i:l[++o]=i),(r=r[0])===(s=s[0])?l[o]?l[o]+=s:l[++o]=s:(l[++o]=null,c.push({i:o,x:xn(r,s)})),n=to.lastIndex;return n<t.length&&(i=t.slice(n),l[o]?l[o]+=i:l[++o]=i),l.length<2?c[0]?iv(c[0].x):sv(t):(t=c.length,function(d){for(var p=0,f;p<t;++p)l[(f=c[p]).i]=f.x(d);return l.join("")})}var Xd=180/Math.PI,tl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ff(e,t,n,r,s,i){var o,l,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(l=Math.sqrt(n*n+r*r))&&(n/=l,r/=l,c/=l),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:s,translateY:i,rotate:Math.atan2(t,e)*Xd,skewX:Math.atan(c)*Xd,scaleX:o,scaleY:l}}var cs;function lv(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?tl:Ff(t.a,t.b,t.c,t.d,t.e,t.f)}function cv(e){return e==null||(cs||(cs=document.createElementNS("http://www.w3.org/2000/svg","g")),cs.setAttribute("transform",e),!(e=cs.transform.baseVal.consolidate()))?tl:(e=e.matrix,Ff(e.a,e.b,e.c,e.d,e.e,e.f))}function Df(e,t,n,r){function s(d){return d.length?d.pop()+" ":""}function i(d,p,f,u,m,w){if(d!==f||p!==u){var _=m.push("translate(",null,t,null,n);w.push({i:_-4,x:xn(d,f)},{i:_-2,x:xn(p,u)})}else(f||u)&&m.push("translate("+f+t+u+n)}function o(d,p,f,u){d!==p?(d-p>180?p+=360:p-d>180&&(d+=360),u.push({i:f.push(s(f)+"rotate(",null,r)-2,x:xn(d,p)})):p&&f.push(s(f)+"rotate("+p+r)}function l(d,p,f,u){d!==p?u.push({i:f.push(s(f)+"skewX(",null,r)-2,x:xn(d,p)}):p&&f.push(s(f)+"skewX("+p+r)}function c(d,p,f,u,m,w){if(d!==f||p!==u){var _=m.push(s(m)+"scale(",null,",",null,")");w.push({i:_-4,x:xn(d,f)},{i:_-2,x:xn(p,u)})}else(f!==1||u!==1)&&m.push(s(m)+"scale("+f+","+u+")")}return function(d,p){var f=[],u=[];return d=e(d),p=e(p),i(d.translateX,d.translateY,p.translateX,p.translateY,f,u),o(d.rotate,p.rotate,f,u),l(d.skewX,p.skewX,f,u),c(d.scaleX,d.scaleY,p.scaleX,p.scaleY,f,u),d=p=null,function(m){for(var w=-1,_=u.length,M;++w<_;)f[(M=u[w]).i]=M.x(m);return f.join("")}}}var dv=Df(lv,"px, ","px)","deg)"),uv=Df(cv,", ",")",")"),Er=0,qr=0,Vr=0,Bf=1e3,Js,Qr,ei=0,Zn=0,wi=0,Ma=typeof performance=="object"&&performance.now?performance:Date,Wf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function rc(){return Zn||(Wf(pv),Zn=Ma.now()+wi)}function pv(){Zn=0}function ti(){this._call=this._time=this._next=null}ti.prototype=Vf.prototype={constructor:ti,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?rc():+n)+(t==null?0:+t),!this._next&&Qr!==this&&(Qr?Qr._next=this:Js=this,Qr=this),this._call=e,this._time=n,nl()},stop:function(){this._call&&(this._call=null,this._time=1/0,nl())}};function Vf(e,t,n){var r=new ti;return r.restart(e,t,n),r}function fv(){rc(),++Er;for(var e=Js,t;e;)(t=Zn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Er}function Kd(){Zn=(ei=Ma.now())+wi,Er=qr=0;try{fv()}finally{Er=0,gv(),Zn=0}}function mv(){var e=Ma.now(),t=e-ei;t>Bf&&(wi-=t,ei=e)}function gv(){for(var e,t=Js,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Js=n);Qr=e,nl(r)}function nl(e){if(!Er){qr&&(qr=clearTimeout(qr));var t=e-Zn;t>24?(e<1/0&&(qr=setTimeout(Kd,e-Ma.now()-wi)),Vr&&(Vr=clearInterval(Vr))):(Vr||(ei=Ma.now(),Vr=setInterval(mv,Bf)),Er=1,Wf(Kd))}}function qd(e,t,n){var r=new ti;return t=t==null?0:+t,r.restart(s=>{r.stop(),e(s+t)},t,n),r}var hv=jf("start","end","cancel","interrupt"),xv=[],Uf=0,Qd=1,rl=2,js=3,Zd=4,al=5,_s=6;function ki(e,t,n,r,s,i){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;vv(e,n,{name:t,index:r,group:s,on:hv,tween:xv,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:Uf})}function ac(e,t){var n=Yt(e,t);if(n.state>Uf)throw new Error("too late; already scheduled");return n}function en(e,t){var n=Yt(e,t);if(n.state>js)throw new Error("too late; already running");return n}function Yt(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function vv(e,t,n){var r=e.__transition,s;r[t]=n,n.timer=Vf(i,0,n.time);function i(d){n.state=Qd,n.timer.restart(o,n.delay,n.time),n.delay<=d&&o(d-n.delay)}function o(d){var p,f,u,m;if(n.state!==Qd)return c();for(p in r)if(m=r[p],m.name===n.name){if(m.state===js)return qd(o);m.state===Zd?(m.state=_s,m.timer.stop(),m.on.call("interrupt",e,e.__data__,m.index,m.group),delete r[p]):+p<t&&(m.state=_s,m.timer.stop(),m.on.call("cancel",e,e.__data__,m.index,m.group),delete r[p])}if(qd(function(){n.state===js&&(n.state=Zd,n.timer.restart(l,n.delay,n.time),l(d))}),n.state=rl,n.on.call("start",e,e.__data__,n.index,n.group),n.state===rl){for(n.state=js,s=new Array(u=n.tween.length),p=0,f=-1;p<u;++p)(m=n.tween[p].value.call(e,e.__data__,n.index,n.group))&&(s[++f]=m);s.length=f+1}}function l(d){for(var p=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(c),n.state=al,1),f=-1,u=s.length;++f<u;)s[f].call(e,p);n.state===al&&(n.on.call("end",e,e.__data__,n.index,n.group),c())}function c(){n.state=_s,n.timer.stop(),delete r[t];for(var d in r)return;delete e.__transition}}function yv(e,t){var n=e.__transition,r,s,i=!0,o;if(n){t=t==null?null:t+"";for(o in n){if((r=n[o]).name!==t){i=!1;continue}s=r.state>rl&&r.state<al,r.state=_s,r.timer.stop(),r.on.call(s?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete n[o]}i&&delete e.__transition}}function bv(e){return this.each(function(){yv(this,e)})}function wv(e,t){var n,r;return function(){var s=en(this,e),i=s.tween;if(i!==n){r=n=i;for(var o=0,l=r.length;o<l;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}s.tween=r}}function kv(e,t,n){var r,s;if(typeof n!="function")throw new Error;return function(){var i=en(this,e),o=i.tween;if(o!==r){s=(r=o).slice();for(var l={name:t,value:n},c=0,d=s.length;c<d;++c)if(s[c].name===t){s[c]=l;break}c===d&&s.push(l)}i.tween=s}}function jv(e,t){var n=this._id;if(e+="",arguments.length<2){for(var r=Yt(this.node(),n).tween,s=0,i=r.length,o;s<i;++s)if((o=r[s]).name===e)return o.value;return null}return this.each((t==null?wv:kv)(n,e,t))}function sc(e,t,n){var r=e._id;return e.each(function(){var s=en(this,r);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return Yt(s,r).value[t]}}function Hf(e,t){var n;return(typeof t=="number"?xn:t instanceof Ca?Gd:(n=Ca(t))?(t=n,Gd):ov)(e,t)}function _v(e){return function(){this.removeAttribute(e)}}function Nv(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Sv(e,t,n){var r,s=n+"",i;return function(){var o=this.getAttribute(e);return o===s?null:o===r?i:i=t(r=o,n)}}function Cv(e,t,n){var r,s=n+"",i;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===r?i:i=t(r=o,n)}}function Mv(e,t,n){var r,s,i;return function(){var o,l=n(this),c;return l==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=l+"",o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l)))}}function Ev(e,t,n){var r,s,i;return function(){var o,l=n(this),c;return l==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=l+"",o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l)))}}function zv(e,t){var n=bi(e),r=n==="transform"?uv:Hf;return this.attrTween(e,typeof t=="function"?(n.local?Ev:Mv)(n,r,sc(this,"attr."+e,t)):t==null?(n.local?Nv:_v)(n):(n.local?Cv:Sv)(n,r,t))}function $v(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Pv(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Rv(e,t){var n,r;function s(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Pv(e,i)),n}return s._value=t,s}function Tv(e,t){var n,r;function s(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&$v(e,i)),n}return s._value=t,s}function Iv(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var r=bi(e);return this.tween(n,(r.local?Rv:Tv)(r,t))}function Lv(e,t){return function(){ac(this,e).delay=+t.apply(this,arguments)}}function Av(e,t){return t=+t,function(){ac(this,e).delay=t}}function Ov(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Lv:Av)(t,e)):Yt(this.node(),t).delay}function Fv(e,t){return function(){en(this,e).duration=+t.apply(this,arguments)}}function Dv(e,t){return t=+t,function(){en(this,e).duration=t}}function Bv(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Fv:Dv)(t,e)):Yt(this.node(),t).duration}function Wv(e,t){if(typeof t!="function")throw new Error;return function(){en(this,e).ease=t}}function Vv(e){var t=this._id;return arguments.length?this.each(Wv(t,e)):Yt(this.node(),t).ease}function Uv(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;en(this,e).ease=n}}function Hv(e){if(typeof e!="function")throw new Error;return this.each(Uv(this._id,e))}function Yv(e){typeof e!="function"&&(e=Sf(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=[],c,d=0;d<o;++d)(c=i[d])&&e.call(c,c.__data__,d,i)&&l.push(c);return new pn(r,this._parents,this._name,this._id)}function Gv(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,r=t.length,s=n.length,i=Math.min(r,s),o=new Array(r),l=0;l<i;++l)for(var c=t[l],d=n[l],p=c.length,f=o[l]=new Array(p),u,m=0;m<p;++m)(u=c[m]||d[m])&&(f[m]=u);for(;l<r;++l)o[l]=t[l];return new pn(o,this._parents,this._name,this._id)}function Xv(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Kv(e,t,n){var r,s,i=Xv(t)?ac:en;return function(){var o=i(this,e),l=o.on;l!==r&&(s=(r=l).copy()).on(t,n),o.on=s}}function qv(e,t){var n=this._id;return arguments.length<2?Yt(this.node(),n).on.on(e):this.each(Kv(n,e,t))}function Qv(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Zv(){return this.on("end.remove",Qv(this._id))}function Jv(e){var t=this._name,n=this._id;typeof e!="function"&&(e=ec(e));for(var r=this._groups,s=r.length,i=new Array(s),o=0;o<s;++o)for(var l=r[o],c=l.length,d=i[o]=new Array(c),p,f,u=0;u<c;++u)(p=l[u])&&(f=e.call(p,p.__data__,u,l))&&("__data__"in p&&(f.__data__=p.__data__),d[u]=f,ki(d[u],t,n,u,d,Yt(p,n)));return new pn(i,this._parents,t,n)}function ey(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Nf(e));for(var r=this._groups,s=r.length,i=[],o=[],l=0;l<s;++l)for(var c=r[l],d=c.length,p,f=0;f<d;++f)if(p=c[f]){for(var u=e.call(p,p.__data__,f,c),m,w=Yt(p,n),_=0,M=u.length;_<M;++_)(m=u[_])&&ki(m,t,n,_,u,w);i.push(u),o.push(p)}return new pn(i,o,t,n)}var ty=Ta.prototype.constructor;function ny(){return new ty(this._groups,this._parents)}function ry(e,t){var n,r,s;return function(){var i=Mr(this,e),o=(this.style.removeProperty(e),Mr(this,e));return i===o?null:i===n&&o===r?s:s=t(n=i,r=o)}}function Yf(e){return function(){this.style.removeProperty(e)}}function ay(e,t,n){var r,s=n+"",i;return function(){var o=Mr(this,e);return o===s?null:o===r?i:i=t(r=o,n)}}function sy(e,t,n){var r,s,i;return function(){var o=Mr(this,e),l=n(this),c=l+"";return l==null&&(c=l=(this.style.removeProperty(e),Mr(this,e))),o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l))}}function iy(e,t){var n,r,s,i="style."+t,o="end."+i,l;return function(){var c=en(this,e),d=c.on,p=c.value[i]==null?l||(l=Yf(t)):void 0;(d!==n||s!==p)&&(r=(n=d).copy()).on(o,s=p),c.on=r}}function oy(e,t,n){var r=(e+="")=="transform"?dv:Hf;return t==null?this.styleTween(e,ry(e,r)).on("end.style."+e,Yf(e)):typeof t=="function"?this.styleTween(e,sy(e,r,sc(this,"style."+e,t))).each(iy(this._id,e)):this.styleTween(e,ay(e,r,t),n).on("end.style."+e,null)}function ly(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function cy(e,t,n){var r,s;function i(){var o=t.apply(this,arguments);return o!==s&&(r=(s=o)&&ly(e,o,n)),r}return i._value=t,i}function dy(e,t,n){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,cy(e,t,n??""))}function uy(e){return function(){this.textContent=e}}function py(e){return function(){var t=e(this);this.textContent=t??""}}function fy(e){return this.tween("text",typeof e=="function"?py(sc(this,"text",e)):uy(e==null?"":e+""))}function my(e){return function(t){this.textContent=e.call(this,t)}}function gy(e){var t,n;function r(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&my(s)),t}return r._value=e,r}function hy(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,gy(e))}function xy(){for(var e=this._name,t=this._id,n=Gf(),r=this._groups,s=r.length,i=0;i<s;++i)for(var o=r[i],l=o.length,c,d=0;d<l;++d)if(c=o[d]){var p=Yt(c,t);ki(c,e,n,d,o,{time:p.time+p.delay+p.duration,delay:0,duration:p.duration,ease:p.ease})}return new pn(r,this._parents,e,n)}function vy(){var e,t,n=this,r=n._id,s=n.size();return new Promise(function(i,o){var l={value:o},c={value:function(){--s===0&&i()}};n.each(function(){var d=en(this,r),p=d.on;p!==e&&(t=(e=p).copy(),t._.cancel.push(l),t._.interrupt.push(l),t._.end.push(c)),d.on=t}),s===0&&i()})}var yy=0;function pn(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function Gf(){return++yy}var tn=Ta.prototype;pn.prototype={constructor:pn,select:Jv,selectAll:ey,selectChild:tn.selectChild,selectChildren:tn.selectChildren,filter:Yv,merge:Gv,selection:ny,transition:xy,call:tn.call,nodes:tn.nodes,node:tn.node,size:tn.size,empty:tn.empty,each:tn.each,on:qv,attr:zv,attrTween:Iv,style:oy,styleTween:dy,text:fy,textTween:hy,remove:Zv,tween:jv,delay:Ov,duration:Bv,ease:Vv,easeVarying:Hv,end:vy,[Symbol.iterator]:tn[Symbol.iterator]};function by(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var wy={time:null,delay:0,duration:250,ease:by};function ky(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function jy(e){var t,n;e instanceof pn?(t=e._id,e=e._name):(t=Gf(),(n=wy).time=rc(),e=e==null?null:e+"");for(var r=this._groups,s=r.length,i=0;i<s;++i)for(var o=r[i],l=o.length,c,d=0;d<l;++d)(c=o[d])&&ki(c,e,t,d,o,n||ky(c,t));return new pn(r,this._parents,e,t)}Ta.prototype.interrupt=bv;Ta.prototype.transition=jy;function _y(e){var t=0,n=e.children,r=n&&n.length;if(!r)t=1;else for(;--r>=0;)t+=n[r].value;e.value=t}function Ny(){return this.eachAfter(_y)}function Sy(e,t){let n=-1;for(const r of this)e.call(t,r,++n,this);return this}function Cy(e,t){for(var n=this,r=[n],s,i,o=-1;n=r.pop();)if(e.call(t,n,++o,this),s=n.children)for(i=s.length-1;i>=0;--i)r.push(s[i]);return this}function My(e,t){for(var n=this,r=[n],s=[],i,o,l,c=-1;n=r.pop();)if(s.push(n),i=n.children)for(o=0,l=i.length;o<l;++o)r.push(i[o]);for(;n=s.pop();)e.call(t,n,++c,this);return this}function Ey(e,t){let n=-1;for(const r of this)if(e.call(t,r,++n,this))return r}function zy(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,r=t.children,s=r&&r.length;--s>=0;)n+=r[s].value;t.value=n})}function $y(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function Py(e){for(var t=this,n=Ry(t,e),r=[t];t!==n;)t=t.parent,r.push(t);for(var s=r.length;e!==n;)r.splice(s,0,e),e=e.parent;return r}function Ry(e,t){if(e===t)return e;var n=e.ancestors(),r=t.ancestors(),s=null;for(e=n.pop(),t=r.pop();e===t;)s=e,e=n.pop(),t=r.pop();return s}function Ty(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Iy(){return Array.from(this)}function Ly(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function Ay(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*Oy(){var e=this,t,n=[e],r,s,i;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,r=e.children)for(s=0,i=r.length;s<i;++s)n.push(r[s]);while(n.length)}function ic(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=By)):t===void 0&&(t=Dy);for(var n=new ni(e),r,s=[n],i,o,l,c;r=s.pop();)if((o=t(r.data))&&(c=(o=Array.from(o)).length))for(r.children=o,l=c-1;l>=0;--l)s.push(i=o[l]=new ni(o[l])),i.parent=r,i.depth=r.depth+1;return n.eachBefore(Vy)}function Fy(){return ic(this).eachBefore(Wy)}function Dy(e){return e.children}function By(e){return Array.isArray(e)?e[1]:null}function Wy(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Vy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function ni(e){this.data=e,this.depth=this.height=0,this.parent=null}ni.prototype=ic.prototype={constructor:ni,count:Ny,each:Sy,eachAfter:My,eachBefore:Cy,find:Ey,sum:zy,sort:$y,path:Py,ancestors:Ty,descendants:Iy,leaves:Ly,links:Ay,copy:Fy,[Symbol.iterator]:Oy};function Uy(e){if(typeof e!="function")throw new Error;return e}function Ur(){return 0}function Hr(e){return function(){return e}}function Hy(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function Yy(e,t,n,r,s){for(var i=e.children,o,l=-1,c=i.length,d=e.value&&(r-t)/e.value;++l<c;)o=i[l],o.y0=n,o.y1=s,o.x0=t,o.x1=t+=o.value*d}function Gy(e,t,n,r,s){for(var i=e.children,o,l=-1,c=i.length,d=e.value&&(s-n)/e.value;++l<c;)o=i[l],o.x0=t,o.x1=r,o.y0=n,o.y1=n+=o.value*d}var Xy=(1+Math.sqrt(5))/2;function Ky(e,t,n,r,s,i){for(var o=[],l=t.children,c,d,p=0,f=0,u=l.length,m,w,_=t.value,M,v,g,x,N,S,T;p<u;){m=s-n,w=i-r;do M=l[f++].value;while(!M&&f<u);for(v=g=M,S=Math.max(w/m,m/w)/(_*e),T=M*M*S,N=Math.max(g/T,T/v);f<u;++f){if(M+=d=l[f].value,d<v&&(v=d),d>g&&(g=d),T=M*M*S,x=Math.max(g/T,T/v),x>N){M-=d;break}N=x}o.push(c={value:M,dice:m<w,children:l.slice(p,f)}),c.dice?Yy(c,n,r,s,_?r+=w*M/_:i):Gy(c,n,r,_?n+=m*M/_:s,i),_-=M,p=f}return o}const Xf=function e(t){function n(r,s,i,o,l){Ky(t,r,s,i,o,l)}return n.ratio=function(r){return e((r=+r)>1?r:1)},n}(Xy);function qy(){var e=Xf,t=!1,n=1,r=1,s=[0],i=Ur,o=Ur,l=Ur,c=Ur,d=Ur;function p(u){return u.x0=u.y0=0,u.x1=n,u.y1=r,u.eachBefore(f),s=[0],t&&u.eachBefore(Hy),u}function f(u){var m=s[u.depth],w=u.x0+m,_=u.y0+m,M=u.x1-m,v=u.y1-m;M<w&&(w=M=(w+M)/2),v<_&&(_=v=(_+v)/2),u.x0=w,u.y0=_,u.x1=M,u.y1=v,u.children&&(m=s[u.depth+1]=i(u)/2,w+=d(u)-m,_+=o(u)-m,M-=l(u)-m,v-=c(u)-m,M<w&&(w=M=(w+M)/2),v<_&&(_=v=(_+v)/2),e(u,w,_,M,v))}return p.round=function(u){return arguments.length?(t=!!u,p):t},p.size=function(u){return arguments.length?(n=+u[0],r=+u[1],p):[n,r]},p.tile=function(u){return arguments.length?(e=Uy(u),p):e},p.padding=function(u){return arguments.length?p.paddingInner(u).paddingOuter(u):p.paddingInner()},p.paddingInner=function(u){return arguments.length?(i=typeof u=="function"?u:Hr(+u),p):i},p.paddingOuter=function(u){return arguments.length?p.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):p.paddingTop()},p.paddingTop=function(u){return arguments.length?(o=typeof u=="function"?u:Hr(+u),p):o},p.paddingRight=function(u){return arguments.length?(l=typeof u=="function"?u:Hr(+u),p):l},p.paddingBottom=function(u){return arguments.length?(c=typeof u=="function"?u:Hr(+u),p):c},p.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:Hr(+u),p):d},p}function Zr(e,t,n){this.k=e,this.x=t,this.y=n}Zr.prototype={constructor:Zr,scale:function(e){return e===1?this:new Zr(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Zr(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Zr.prototype;const Jd={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Qy(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Jd[n]||Jd.default}function eu(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,r)).toFixed(1))+" "+n[r]}function tu({name:e,usedBytes:t,totalBytes:n,type:r,isShared:s=!1,connectedNodes:i=[],nodeName:o,isOffline:l=!1,width:c=120,height:d=180,animationDelay:p=0,onClick:f,onHover:u}){const m=h.useRef(null),w=h.useRef(0),_=h.useRef([]),M=h.useRef(0),[v,g]=h.useState(!1),x=n>0?t/n*100:0,[N,S]=h.useState(0),[T,A]=h.useState(!1),[B,E]=h.useState(!0),b=h.useRef(null),z=h.useRef(0),$=1200,C=500;h.useEffect(()=>{const X=setTimeout(()=>{A(!0)},p);return()=>clearTimeout(X)},[p]),h.useEffect(()=>{if(!T)return;z.current=N,b.current=null;const X=z.current,y=x;if(Math.abs(X-y)<.1){S(y);return}const V=B?$:C,Q=le=>{b.current===null&&(b.current=le);const ae=le-b.current,oe=Math.min(ae/V,1),ee=(ie=>1-Math.pow(1-ie,3))(oe),ne=X+(y-X)*ee;S(ne),oe<1?requestAnimationFrame(Q):B&&E(!1)};requestAnimationFrame(Q)},[x,T]);const P=N,W=x>=85,Y=x>=95,F=Qy(x,r),L=h.useCallback(X=>{const y=[];for(let V=0;V<X;V++)y.push({x:Math.random()*c*.6+c*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return y},[c,d]);h.useEffect(()=>{const X=m.current;if(!X)return;const y=X.getContext("2d");if(!y)return;const V=window.devicePixelRatio||1;X.width=c*V,X.height=d*V,y.scale(V,V);const Q=W?15:5;_.current=L(Q);const le=ae=>{ae-M.current,M.current=ae;const oe=ae*.001;y.clearRect(0,0,c,d);const Oe=8,ee=Oe,ne=Oe+20,ie=c-Oe*2,ce=d-Oe*2-40,Ce=8,We=l?.05:P/100,Qe=ce*We,ke=ne+ce-Qe,Ve=y.createLinearGradient(ee,ne,ee,ne+ce);Ve.addColorStop(0,"#0a0a12"),Ve.addColorStop(.5,"#050510"),Ve.addColorStop(1,"#0a0a12"),y.fillStyle=Ve,y.beginPath(),y.roundRect(ee,ne,ie,ce,Ce),y.fill(),y.save(),y.beginPath(),y.roundRect(ee,ne,ie,ce,Ce),y.clip();const tt=12,lt=tt*Math.sqrt(3);y.strokeStyle="rgba(0, 240, 255, 0.06)",y.lineWidth=.5;for(let re=0;re<ce/lt+1;re++)for(let de=0;de<ie/(tt*1.5)+1;de++){const me=re%2*tt*.75,Pe=ee+de*tt*1.5+me,Xe=ne+re*lt*.5;y.beginPath();for(let ft=0;ft<6;ft++){const It=Math.PI/3*ft+Math.PI/6,k=Pe+tt*.4*Math.cos(It),D=Xe+tt*.4*Math.sin(It);ft===0?y.moveTo(k,D):y.lineTo(k,D)}y.closePath(),y.stroke()}y.restore();const nt=ne+oe*30%ce;y.save(),y.beginPath(),y.roundRect(ee,ne,ie,ce,Ce),y.clip();const Ye=y.createLinearGradient(ee,nt-15,ee,nt+5);Ye.addColorStop(0,"transparent"),Ye.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ye.addColorStop(1,"transparent"),y.fillStyle=Ye,y.fillRect(ee,nt-15,ie,20),y.restore(),y.strokeStyle="rgba(0, 240, 255, 0.2)",y.lineWidth=1;for(let re=0;re<=10;re++){const de=ne+ce-ce*re/10,me=re%5===0?12:6,Pe=re%5===0?.4:.2;y.strokeStyle=`rgba(0, 240, 255, ${Pe})`,y.beginPath(),y.moveTo(ee+2,de),y.lineTo(ee+2+me,de),y.stroke(),y.beginPath(),y.moveTo(ee+ie-2,de),y.lineTo(ee+ie-2-me,de),y.stroke()}const Rt=oe*50%ce;for(let re=0;re<3;re++){const de=ne+(Rt+re*ce/3)%ce,me=.3+Math.sin(oe*3+re)*.2;y.beginPath(),y.strokeStyle=`rgba(0, 240, 255, ${me})`,y.lineWidth=2,y.moveTo(ee,de),y.lineTo(ee+4,de),y.stroke(),y.beginPath(),y.moveTo(ee+ie,de),y.lineTo(ee+ie-4,de),y.stroke()}if(!l&&We>0){const re=y.createLinearGradient(0,ke,0,ne+ce);re.addColorStop(0,F.gradient[0]),re.addColorStop(1,F.gradient[1]);const de=W?6:3,me=.05,Pe=W?.1:.05,Xe=Math.PI/3;y.save(),y.beginPath(),y.rect(ee,ne,ie,ce),y.clip(),y.fillStyle=re,y.beginPath(),y.moveTo(ee,ne+ce);for(let k=0;k<=ie;k+=2){const D=Math.sin(k*me+oe*Pe*60)*de,I=Math.sin(k*me*1.5+oe*Pe*40+Xe)*(de*.5),j=ke+D+I;k===0?y.moveTo(ee+k,j):y.lineTo(ee+k,j)}y.lineTo(ee+ie,ne+ce),y.lineTo(ee,ne+ce),y.closePath(),y.fill(),y.strokeStyle=F.glow,y.lineWidth=2,y.shadowColor=F.main,y.shadowBlur=10,y.beginPath();for(let k=0;k<=ie;k+=2){const D=Math.sin(k*me+oe*Pe*60)*de,I=Math.sin(k*me*1.5+oe*Pe*40+Xe)*(de*.5),j=ke+D+I;k===0?y.moveTo(ee+k,j):y.lineTo(ee+k,j)}y.stroke(),y.shadowBlur=0,_.current.forEach((k,D)=>{if(k.y>ke&&k.y<ne+ce){const I=Math.sin(oe*k.wobbleSpeed*60+k.wobbleOffset)*3;y.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,y.beginPath(),y.arc(k.x+I,k.y,k.radius,0,Math.PI*2),y.fill(),y.fillStyle="rgba(255, 255, 255, 0.5)",y.beginPath(),y.arc(k.x+I-k.radius*.3,k.y-k.radius*.3,k.radius*.3,0,Math.PI*2),y.fill()}k.y-=k.speed*(W?2:1),k.y<ke-10&&(k.y=ne+ce+Math.random()*20,k.x=ee+Math.random()*ie*.6+ie*.2)}),y.restore();const ft=3;for(let k=0;k<ft;k++){const D=ee+ie*(k+.5)/ft,I=oe*2+k*Math.PI*.7,j=(Math.sin(I)*.5+.5)*.3;if(j>.1){const R=y.createLinearGradient(D-8,ke,D+8,ne+ce);R.addColorStop(0,"rgba(255, 255, 255, 0)"),R.addColorStop(.3,`rgba(255, 255, 255, ${j})`),R.addColorStop(.7,`rgba(255, 255, 255, ${j*.5})`),R.addColorStop(1,"rgba(255, 255, 255, 0)"),y.fillStyle=R,y.fillRect(D-8,ke,16,Qe)}}const It=Math.floor(We*8);for(let k=0;k<It;k++){const D=k*137.5,I=ee+10+D*7%(ie-20),R=ke+10+D*13%(Qe-20)+Math.sin(oe*2+D)*5,K=.4+Math.sin(oe*3+D)*.3;if(y.fillStyle=`rgba(255, 255, 255, ${K})`,y.beginPath(),y.arc(I,R,1.5,0,Math.PI*2),y.fill(),k>0&&k%3===0){const G=(k-1)*137.5,se=ee+10+G*7%(ie-20),Z=ke+10+G*13%(Qe-20)+Math.sin(oe*2+G)*5,q=Math.sqrt((I-se)**2+(R-Z)**2);q<30&&(y.strokeStyle=`rgba(255, 255, 255, ${.1*(1-q/30)})`,y.lineWidth=.5,y.beginPath(),y.moveTo(I,R),y.lineTo(se,Z),y.stroke())}}if(W){for(let k=0;k<8;k++){const D=ee+ie*.15+Math.random()*ie*.7,I=ke-Math.random()*25,j=Math.random()*4+1;y.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,y.beginPath(),y.arc(D,I,j,0,Math.PI*2),y.fill()}Math.sin(oe*10)>.7&&(y.fillStyle="rgba(255, 100, 0, 0.05)",y.fillRect(ee,ne,ie,ce))}}const ve=l||Y?"#ff0040":F.main,Ge=Y?Math.sin(oe*5)*.3+.7:1;y.strokeStyle=ve,y.lineWidth=3,y.shadowColor=ve,y.shadowBlur=v?20:12*Ge,y.beginPath(),y.roundRect(ee,ne,ie,ce,Ce),y.stroke(),y.shadowBlur=0,y.strokeStyle=`${ve}60`,y.lineWidth=1,y.beginPath(),y.roundRect(ee+3,ne+3,ie-6,ce-6,Ce-2),y.stroke();const Fe=16,bt=3;y.strokeStyle=ve,y.lineWidth=bt,y.shadowColor=ve,y.shadowBlur=8,y.beginPath(),y.moveTo(ee-2,ne+Fe),y.lineTo(ee-2,ne-2),y.lineTo(ee+Fe,ne-2),y.stroke(),y.beginPath(),y.moveTo(ee+ie-Fe,ne-2),y.lineTo(ee+ie+2,ne-2),y.lineTo(ee+ie+2,ne+Fe),y.stroke(),y.beginPath(),y.moveTo(ee-2,ne+ce-Fe),y.lineTo(ee-2,ne+ce+2),y.lineTo(ee+Fe,ne+ce+2),y.stroke(),y.beginPath(),y.moveTo(ee+ie-Fe,ne+ce+2),y.lineTo(ee+ie+2,ne+ce+2),y.lineTo(ee+ie+2,ne+ce-Fe),y.stroke(),y.shadowBlur=0;const rt=2+(Math.sin(oe*4)*.5+.5);if(y.fillStyle=ve,y.shadowColor=ve,y.shadowBlur=6,[[ee-2,ne-2],[ee+ie+2,ne-2],[ee-2,ne+ce+2],[ee+ie+2,ne+ce+2]].forEach(([re,de])=>{y.beginPath(),y.arc(re,de,rt,0,Math.PI*2),y.fill()}),y.shadowBlur=0,!l){const de=ee+ie+6,me=ce,Pe=me*(P/100);y.fillStyle="rgba(0, 20, 40, 0.8)",y.fillRect(de,ne,4,me);const Xe=y.createLinearGradient(0,ne+me-Pe,0,ne+me);Xe.addColorStop(0,F.main),Xe.addColorStop(1,F.gradient[1]),y.fillStyle=Xe,y.fillRect(de,ne+me-Pe,4,Pe),y.strokeStyle=`${ve}40`,y.lineWidth=1,y.strokeRect(de,ne,4,me)}if(l){y.strokeStyle="#ff0040",y.lineWidth=2,y.beginPath();const re=ee+ie*.3,de=ne+ce*.3;y.moveTo(re,de),y.lineTo(re+10,de+15),y.lineTo(re+5,de+25),y.lineTo(re+15,de+40),y.stroke(),y.beginPath(),y.moveTo(re+10,de+15),y.lineTo(re+20,de+20),y.stroke()}w.current=requestAnimationFrame(le)};return w.current=requestAnimationFrame(le),()=>{cancelAnimationFrame(w.current)}},[c,d,P,W,Y,l,F,v,L]);const O=()=>{g(!0),u==null||u(!0)},U=()=>{g(!1),u==null||u(!1)};return a.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${Y?"critical":""} ${l?"offline":""}`,onClick:f,onMouseEnter:O,onMouseLeave:U,children:[a.jsxs("div",{className:"tank-header",children:[a.jsx("div",{className:`tank-name-tag ${l?"offline":""}`,style:l?void 0:{color:F.main,background:`${F.main}15`,borderColor:`${F.main}50`},children:e}),a.jsx("div",{className:`tank-type-tag type-${r.toLowerCase()}`,children:r})]}),a.jsx("canvas",{ref:m,style:{width:c,height:d-50,display:"block"}}),a.jsxs("div",{className:"tank-stats",children:[a.jsx("div",{className:`tank-percent ${Y?"critical":W?"warning":""}`,style:{color:l?"#FF4081":F.main,textShadow:l?"none":`0 0 10px ${F.glow}`},children:l?"OFFLINE":`${x.toFixed(1)}%`}),a.jsxs("div",{className:"tank-capacity",children:[eu(t)," / ",eu(n)]})]}),s&&i.length>0&&a.jsx("div",{className:"tank-nodes",children:i.map((X,y)=>a.jsx("span",{className:"node-tag",children:X},y))}),!s&&o&&a.jsx("div",{className:"tank-node-label",children:o}),a.jsx("style",{children:`
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
          font-size: 11px;
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

      `})]})}function Zy({percent:e,usedBytes:t,totalBytes:n,duration:r=1200}){const[s,i]=h.useState(0),o=h.useRef(0),l=h.useRef(null),c=h.useRef(0);h.useEffect(()=>{c.current=s,l.current=null;const m=w=>{l.current===null&&(l.current=w);const _=w-l.current,M=Math.min(_/r,1),v=M===1?1:1-Math.pow(2,-10*M),g=c.current+(e-c.current)*v;i(g),M<1&&(o.current=requestAnimationFrame(m))};return o.current=requestAnimationFrame(m),()=>cancelAnimationFrame(o.current)},[e,r]);const p=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,u=[];for(let m=0;m<f;m++){const w=m/f*100,_=w<s,M=m%4===0;u.push({index:m,isActive:_,isMajor:M,percent:w})}return a.jsxs("div",{className:"scifi-indicator",children:[a.jsx("div",{className:"indicator-left",children:a.jsxs("div",{className:"indicator-bytes",children:[a.jsx("span",{className:"used",style:{color:p},children:he(t)}),a.jsx("span",{className:"separator",children:"/"}),a.jsx("span",{className:"total",children:he(n)})]})}),a.jsxs("div",{className:"indicator-bar-container",children:[a.jsxs("div",{className:"indicator-bar",children:[a.jsx("div",{className:"segments-container",children:u.map(m=>a.jsx("div",{className:`segment ${m.isActive?"active":""} ${m.isMajor?"major":""}`,style:{"--segment-color":m.isActive?p:"rgba(60, 80, 100, 0.3)",animationDelay:m.isActive?`${m.index*20}ms`:"0ms"}},m.index))}),a.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${p}40)`,boxShadow:`0 0 20px ${p}60, 0 0 40px ${p}30`}}),a.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${p} transparent`,filter:`drop-shadow(0 0 4px ${p})`}}),a.jsx("div",{className:"indicator-scanline"})]}),a.jsx("div",{className:"indicator-accent",style:{background:p}})]}),a.jsx("div",{className:"indicator-right",children:a.jsxs("div",{className:"indicator-percent",style:{color:p},children:[s.toFixed(1),a.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const Jy=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function e1({vm:e,position:t,onClose:n}){var v,g,x,N,S;const{t:r,language:s}=Ie(),i=h.useRef(null),[o,l]=h.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",p=e.type==="lxc",f=e.disks||[],u=s==="zh-TW",m=((v=e.disk)==null?void 0:v.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,w=m>=90?"#ff0040":m>=70?"#ff6b00":"#00f0ff",_=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();h.useEffect(()=>{if(!i.current)return;const A=i.current.getBoundingClientRect(),B=A.width,E=A.height,b=window.innerWidth,z=window.innerHeight,$=15,{cellX:C,cellY:P,cellTop:W,cellBottom:Y,cellLeft:F,cellRight:L}=t;let O=0,U=0,X=C,y=P;L+$+B<b?(O=L+$,U=Math.max($,Math.min(z-E-$,P-E/2)),X=L,y=P):F-$-B>0?(O=F-$-B,U=Math.max($,Math.min(z-E-$,P-E/2)),X=F,y=P):W-$-E>0?(O=Math.max($,Math.min(b-B-$,C-B/2)),U=W-$-E,X=C,y=W):(O=Math.max($,Math.min(b-B-$,C-B/2)),U=Y+$,X=C,y=Y);let V=O,Q=U+E/2;O>L?(V=O,Q=Math.max(U,Math.min(U+E,y))):O+B<F?(V=O+B,Q=Math.max(U,Math.min(U+E,y))):U+E<W?(V=Math.max(O,Math.min(O+B,X)),Q=U+E):(V=Math.max(O,Math.min(O+B,X)),Q=U),l({x:O,y:U,lineStart:{x:X,y},lineEnd:{x:V,y:Q}})},[t]);const M=o?(()=>{const T=o.lineEnd.x-o.lineStart.x,A=o.lineEnd.y-o.lineStart.y,B=Math.sqrt(T*T+A*A),E=Math.atan2(A,T)*(180/Math.PI);return{width:`${B}px`,transform:`rotate(${E}deg)`,left:`${o.lineStart.x}px`,top:`${o.lineStart.y}px`}})():null;return a.jsxs(a.Fragment,{children:[o&&M&&a.jsx("div",{className:"popup-connector-line",style:M}),a.jsxs("div",{ref:i,className:"vm-disk-popup",style:{left:(o==null?void 0:o.x)??-9999,top:(o==null?void 0:o.y)??-9999,opacity:o?1:0,transform:"none"},onClick:T=>T.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",children:[a.jsxs("div",{className:"popup-title",children:[a.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),a.jsx("span",{className:"vm-name",children:e.name}),a.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),a.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),a.jsxs("div",{className:"popup-status",children:[a.jsx("span",{className:"status-dot",style:{background:d}}),a.jsx("span",{className:"status-text",style:{color:d},children:_}),a.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),a.jsxs("div",{className:"popup-section",children:[a.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",f.length>1?u?"":"S":""," (",f.length||1,")"]}),f.length>0?a.jsx("div",{className:"disk-list",children:f.map((T,A)=>a.jsxs("div",{className:"disk-item",children:[a.jsxs("div",{className:"disk-device",children:[a.jsx("span",{className:"device-name",children:T.device}),a.jsx("span",{className:"device-format",children:T.format})]}),a.jsxs("div",{className:"disk-info",children:[a.jsx("span",{className:"disk-storage",children:T.storage}),a.jsx("span",{className:"disk-size",children:he(T.size)})]})]},A))}):a.jsx("div",{className:"disk-summary",children:a.jsxs("div",{className:"disk-summary-row",children:[a.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),a.jsx("span",{className:"disk-value",children:he(((g=e.disk)==null?void 0:g.total_bytes)||0)})]})}),p&&a.jsxs("div",{className:"disk-usage-section",children:[a.jsxs("div",{className:"disk-summary-row",children:[a.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),a.jsx("span",{className:"disk-value",children:he(((x=e.disk)==null?void 0:x.used_bytes)||0)})]}),a.jsxs("div",{className:"disk-summary-row",children:[a.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),a.jsxs("span",{className:"disk-value",style:{color:w},children:[m.toFixed(1),"%"]})]}),a.jsx("div",{className:"disk-bar",children:a.jsx("div",{className:"disk-bar-fill",style:{width:`${m}%`,background:w}})})]})]}),a.jsxs("div",{className:"popup-metrics",children:[a.jsxs("div",{className:"metric-item",children:[a.jsx("span",{className:"metric-label",children:"CPU"}),a.jsxs("span",{className:"metric-value",children:[((N=e.cpu)==null?void 0:N.cores)||0," ",u?"核心":"cores"]})]}),a.jsxs("div",{className:"metric-item",children:[a.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),a.jsx("span",{className:"metric-value",children:he(((S=e.memory)==null?void 0:S.total_bytes)||0)})]})]})]})]})}function t1({data:e,width:t,height:n,isInitialLoad:r=!1,onVMClick:s}){const[i,o]=h.useState(null),l=h.useRef(null),c=h.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(m=>({name:m.vm.name,value:m.value,vm:m.vm}))},p=ic(d).sum(m=>m.value||0).sort((m,w)=>(w.value||0)-(m.value||0));return qy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Xf.ratio(1))(p).leaves().map(m=>({x:m.x0,y:m.y0,width:m.x1-m.x0,height:m.y1-m.y0,vm:m.data.vm,value:m.value||0}))},[e,t,n]);return c.length===0?a.jsx("div",{className:"no-storage",children:"No VM disk data available"}):a.jsxs("svg",{ref:l,width:t,height:n,className:"d3-treemap",children:[a.jsxs("defs",{children:[a.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:a.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),a.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:a.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),a.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:a.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),a.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[a.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),a.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),c.map((d,p)=>{var E;const f=((E=d.vm.disk)==null?void 0:E.total_bytes)||1,u=d.vm.status==="running",m=i===`${d.vm.node}-${d.vm.vmid}`,w=d.width>15&&d.height>12,_=d.width>40&&d.height>25,M=d.width>50&&d.height>40,v=d.width>60&&d.height>55,g=Math.max(...c.map(b=>b.value)),x=d.value/g,N=()=>u?x>.7?"rgba(0, 255, 200, 0.15)":x>.4?"rgba(0, 200, 255, 0.12)":x>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",S=()=>u?x>.7?"rgba(0, 255, 200, 0.9)":x>.4?"rgba(0, 200, 255, 0.85)":x>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",T=()=>u?x>.7?"rgba(0, 255, 200, 0.4)":x>.4?"rgba(0, 200, 255, 0.35)":x>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",A=()=>u?x>.7?"rgba(0, 255, 220, 1)":x>.4?"rgba(100, 220, 255, 1)":x>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",B=r?p*30:0;return a.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>o(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>o(null),onClick:b=>{if(b.stopPropagation(),s){const z=b.clientX,$=b.clientY,C=d.width/2,P=d.height/2;s(d.vm,{cellX:z,cellY:$,cellWidth:d.width,cellHeight:d.height,cellTop:$-P,cellBottom:$+P,cellLeft:z-C,cellRight:z+C})}},className:r?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${B}ms`},children:[a.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${he(f)}`}),u&&a.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:T(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:m?1:.6}}),u&&d.width>30&&d.height>25&&a.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:S(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),a.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:N(),stroke:S(),strokeWidth:m?2:1,rx:4,ry:4,style:{filter:m?`drop-shadow(0 0 12px ${T()}) drop-shadow(0 0 4px ${S()})`:`drop-shadow(0 0 3px ${T()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&a.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:S(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&a.jsxs(a.Fragment,{children:[a.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:S(),strokeWidth:1,opacity:.4,className:"circuit-line"}),a.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:S(),opacity:.8,className:"energy-dot"})]}),u&&a.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),w&&!_&&a.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:A(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${T()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),_&&(()=>{const b=d.width,z=d.height,$=Math.min(16,Math.max(9,Math.min(b/8,z/5))),C=Math.min(12,Math.max(8,Math.min(b/10,z/7))),P=Math.min(10,Math.max(7,Math.min(b/12,z/8))),W=Math.floor((b-8)/($*.6)),Y=d.vm.name.length>W?d.vm.name.slice(0,Math.max(1,W-1))+"…":d.vm.name,F=$+(M?C+2:0)+(v?P+2:0),L=(z-F)/2+$/2;return a.jsxs(a.Fragment,{children:[a.jsx("text",{x:b/2,y:L,textAnchor:"middle",dominantBaseline:"middle",fill:A(),fontSize:$,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${T()}`:"none",filter:u?`drop-shadow(0 0 2px ${T()})`:"none"},children:Y}),M&&a.jsx("text",{x:b/2,y:L+$*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:C,fontFamily:"var(--font-mono)",children:he(f)}),v&&a.jsxs("text",{x:b/2,y:L+$*.8+(M?C*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:A(),fontSize:P,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${T()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function n1({vmDiskData:e,totals:t,storages:n}){const{t:r,language:s}=Ie(),i=h.useRef(null),[o,l]=h.useState({width:0,height:0}),[c,d]=h.useState(!0),[p,f]=h.useState(null);h.useEffect(()=>{const m=()=>{if(i.current){const _=i.current.getBoundingClientRect();l({width:_.width,height:_.height})}};m();const w=new ResizeObserver(m);return i.current&&w.observe(i.current),()=>w.disconnect()},[]),h.useEffect(()=>{if(c&&e.length>0){const m=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(m)}},[c,e.length]);const u=h.useMemo(()=>e.map(m=>{var w;return{vm:m,value:((w=m.disk)==null?void 0:w.total_bytes)||0}}).filter(m=>m.value>0),[e]);return a.jsxs("div",{className:"treemap-container",children:[a.jsxs("div",{className:"treemap-header",children:[a.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),a.jsxs("div",{className:"treemap-stats",children:[a.jsxs("span",{children:[e.length," VMs"]}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsxs("span",{children:["Total Allocated: ",he(e.reduce((m,w)=>{var _;return m+(((_=w.disk)==null?void 0:_.total_bytes)||0)},0))]})]})]}),a.jsx("div",{ref:i,className:"treemap-grid",onClick:()=>f(null),children:o.width>0&&o.height>0&&a.jsx(t1,{data:u,width:o.width,height:o.height,isInitialLoad:c,onVMClick:(m,w)=>f({vm:m,position:w})})}),p&&a.jsx(e1,{vm:p.vm,position:p.position,onClose:()=>f(null)}),a.jsxs("div",{className:"treemap-legend",children:[a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color running"}),a.jsx("span",{children:r("vm.running")})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color stopped"}),a.jsx("span",{children:r("vm.stopped")})]}),a.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function r1({storage:e,position:t,sourcePos:n,onClose:r}){const{t:s}=Ie();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,o=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return a.jsxs(a.Fragment,{children:[a.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),a.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),a.jsx("line",{x1:o.x,y1:o.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),a.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),a.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[a.jsx("div",{className:"tooltip-grid"}),a.jsx("div",{className:"tooltip-scan-line"}),a.jsx("div",{className:"tooltip-corner tl"}),a.jsx("div",{className:"tooltip-corner tr"}),a.jsx("div",{className:"tooltip-corner bl"}),a.jsx("div",{className:"tooltip-corner br"}),a.jsxs("div",{className:"tooltip-header",children:[a.jsx("span",{className:"tooltip-name",children:e.name}),a.jsx("button",{className:"tooltip-close",onClick:r,children:"×"})]}),a.jsx("div",{className:"tooltip-type-row",children:a.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?s("storage.filter_shared"):s("storage.filter_local")})}),a.jsxs("div",{className:"tooltip-content",children:[a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("table.type"),":"]}),a.jsx("span",{children:e.type.toUpperCase()})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("storage.content"),":"]}),a.jsx("div",{className:"tooltip-labels",children:e.content.map((c,d)=>a.jsx("span",{className:"tooltip-label",children:c},d))})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.used"),":"]}),a.jsx("span",{children:he(e.usedBytes)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.total"),":"]}),a.jsx("span",{children:he(e.totalBytes)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.usage"),":"]}),a.jsx("span",{className:`text-${ue(i)}`,children:Ae(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("cluster.nodes"),":"]}),a.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((c,d)=>a.jsx("span",{className:"tooltip-label node",children:c},d))})]})]})]})]})}function a1({cluster:e,clusters:t}){const{t:n,language:r}=Ie(),[s,i]=h.useState("tanks"),[o,l]=h.useState("all"),[c,d]=h.useState(""),[p,f]=h.useState(null),[u,m]=h.useState(null),[w,_]=h.useState(null),[M,v]=h.useState(null),g=!e&&t&&Object.keys(t).length>0,x=h.useMemo(()=>{const z=[],$=(C,P)=>{Object.values(C.vms).forEach(W=>{var Y;(Y=W.disk)!=null&&Y.total_bytes&&W.disk.total_bytes>0&&!W.template&&z.push({...W,clusterName:P})})};return g?Object.entries(t).forEach(([C,P])=>{$(P,P.name||C)}):e&&$(e,e.name||""),z.sort((C,P)=>{var W,Y;return(((W=P.disk)==null?void 0:W.total_bytes)||0)-(((Y=C.disk)==null?void 0:Y.total_bytes)||0)})},[e,t,g]),{sharedStorages:N,localStoragesByNode:S,allNodes:T,totals:A,warnings:B}=h.useMemo(()=>{const z=new Map;let $=0,C=0,P=0;const W=new Set,Y=y=>{Object.values(y.storages).forEach(V=>{W.add(V.node);const Q=V.storage;z.has(Q)||z.set(Q,{name:V.storage,type:V.type,content:V.content,allowedNodes:V.allowed_nodes||[],nodes:[]}),z.get(Q).nodes.push({node:V.node,totalBytes:V.disk.total_bytes,usedBytes:V.disk.used_bytes,active:V.enabled!==!1})})};g?Object.values(t).forEach(y=>Y(y)):e&&Y(e);const F=[],L={};W.forEach(y=>{L[y]=[]}),z.forEach(y=>{const V=Jy.includes(y.type),Q=y.nodes[0].totalBytes,le=y.nodes.length>1&&Q>0&&y.nodes.every(ae=>Math.abs(ae.totalBytes-Q)/Q<.01);if(V||le){const ae=y.nodes[0],oe=y.allowedNodes.length>0?y.allowedNodes:y.nodes.map(Oe=>Oe.node);F.push({name:y.name,type:y.type,content:y.content,isShared:!0,totalBytes:ae.totalBytes,usedBytes:ae.usedBytes,connectedNodes:oe,nodeInstances:y.nodes})}else y.nodes.forEach(ae=>{L[ae.node]||(L[ae.node]=[]),L[ae.node].push({name:y.name,type:y.type,content:y.content,isShared:!1,totalBytes:ae.totalBytes,usedBytes:ae.usedBytes,connectedNodes:[],nodeInstances:[ae]})})});const O=y=>{if(o==="local"&&y.isShared||o==="shared"&&!y.isShared)return!1;if(c){const V=c.toLowerCase();if(!y.name.toLowerCase().includes(V)&&!y.type.toLowerCase().includes(V))return!1}return!0},U=F.filter(O).sort((y,V)=>y.name.localeCompare(V.name)),X={};return Object.entries(L).forEach(([y,V])=>{const Q=V.filter(O).sort((le,ae)=>le.name.localeCompare(ae.name));Q.length>0&&(X[y]=Q)}),U.forEach(y=>{(y.totalBytes>0?y.usedBytes/y.totalBytes*100:0)>=85&&P++,$+=y.usedBytes,C+=y.totalBytes}),Object.values(X).flat().forEach(y=>{(y.totalBytes>0?y.usedBytes/y.totalBytes*100:0)>=85&&P++,$+=y.usedBytes,C+=y.totalBytes}),{sharedStorages:U,localStoragesByNode:X,allNodes:Array.from(W).sort(),totals:{totalUsed:$,totalCapacity:C},warnings:P}},[e,t,g,o,c]),E=(z,$)=>{if(u&&u.name===z.name&&u.isShared===z.isShared){m(null),_(null),v(null);return}const C=$.getBoundingClientRect(),P=240,W=200,Y=C.top+C.height/2;let F=C.right+30,L=!1;F+P>window.innerWidth&&(F=C.left-P-30,L=!0);let O=C.top;O+W>window.innerHeight&&(O=window.innerHeight-W-10),O<10&&(O=10),m(z),_({x:F,y:O}),v({x:L?C.left:C.right,y:Y})};if(!e&&!g)return a.jsx("div",{className:"storage-vault empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("cluster.select")})]})});const b=A.totalCapacity>0?A.totalUsed/A.totalCapacity*100:0;return a.jsxs("div",{className:"storage-vault",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"vault-header",children:[a.jsxs("div",{className:"header-title-section",children:[a.jsxs("h1",{className:"vault-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),a.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),a.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),a.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),a.jsxs("div",{className:"vault-stats",children:[a.jsx("span",{className:"stat-item",children:n("storage.count",{n:N.length+Object.values(S).flat().length})}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:N.length})}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(S).flat().length})}),B>0&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"stat-divider",children:"|"}),a.jsxs("span",{className:"stat-warning",children:["⚠️ ",B," ",n("settings.warning")]})]})]})]}),a.jsxs("div",{className:"header-controls",children:[a.jsxs("div",{className:"search-box",children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("path",{d:"M21 21l-4.35-4.35"})]}),a.jsx("input",{type:"text",placeholder:n("storage.search"),value:c,onChange:z=>d(z.target.value)})]}),a.jsxs("div",{className:"filter-tabs",children:[a.jsx("button",{className:`filter-tab ${o==="all"?"active":""}`,onClick:()=>l("all"),children:n("storage.filter_all")}),a.jsx("button",{className:`filter-tab ${o==="shared"?"active":""}`,onClick:()=>l("shared"),children:n("storage.filter_shared")}),a.jsx("button",{className:`filter-tab ${o==="local"?"active":""}`,onClick:()=>l("local"),children:n("storage.filter_local")})]}),a.jsxs("div",{className:"view-toggle",children:[a.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>i("tanks"),title:r==="zh-TW"?"能量槽檢視":"Tank view",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),a.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),a.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>i("treemap"),title:r==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),a.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),a.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),a.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),a.jsxs("div",{className:"summary-indicator-container",children:[a.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),a.jsx(Zy,{percent:b,usedBytes:A.totalUsed,totalBytes:A.totalCapacity,duration:1500})]}),a.jsx("div",{className:"vault-content",children:s==="treemap"?a.jsx(n1,{vmDiskData:x,totals:A,storages:[...N.map(z=>z.name),...Object.values(S).flat().map(z=>z.name)]}):a.jsxs("div",{className:"tanks-layout",children:[(o==="all"||o==="shared")&&N.length>0&&a.jsxs("div",{className:"storage-section shared-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsxs("div",{className:"section-title shared",children:[a.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),a.jsx("span",{children:n("storage.section_shared")})]}),a.jsx("span",{className:"section-count shared",children:n(N.length>1?"storage.storages_plural":"storage.storages_count",{n:N.length})})]}),a.jsx("div",{className:"tanks-grid shared-grid",children:N.map((z,$)=>a.jsx("div",{onClick:C=>E(z,C.currentTarget),style:{cursor:"pointer"},children:a.jsx(tu,{name:z.name,usedBytes:z.usedBytes,totalBytes:z.totalBytes,type:z.type,isShared:!0,connectedNodes:z.connectedNodes,width:140,height:220,animationDelay:$*80})},z.name))})]}),(o==="all"||o==="local")&&Object.keys(S).length>0&&a.jsxs("div",{className:"storage-section local-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsxs("div",{className:"section-title local",children:[a.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),a.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),a.jsx("span",{children:n("storage.section_local")})]}),a.jsxs("span",{className:"section-count local",children:[n(Object.values(S).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(S).flat().length})," ",n(Object.keys(S).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(S).length})]})]}),a.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let z=N.length;return Object.entries(S).sort(([$],[C])=>$.localeCompare(C)).flatMap(([$,C])=>C.map(P=>{const W=P.nodeInstances[0],Y=z++;return a.jsx("div",{onClick:F=>E(P,F.currentTarget),style:{cursor:"pointer"},children:a.jsx(tu,{name:P.name,usedBytes:W.usedBytes,totalBytes:W.totalBytes,type:P.type,isShared:!1,nodeName:$,isOffline:!W.active,width:120,height:200,animationDelay:Y*80})},`${$}-${P.name}`)}))})()})]}),N.length===0&&Object.keys(S).length===0&&a.jsx("div",{className:"no-storage",children:c?a.jsxs("span",{children:[n("error.no_data"),': "',c,'"']}):a.jsx("span",{children:n("error.no_data")})})]})}),a.jsx(r1,{storage:u,position:w,sourcePos:M,onClose:()=>{m(null),_(null),v(null)}}),a.jsx("style",{children:`
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
          font-size: 12px;
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
          font-size: 14px;
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
          font-size: 13px;
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
          font-size: 14px;
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 13px;
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
          font-size: 13px;
          padding: 3px 0;
          gap: 12px;
        }

        .tooltip-row > span:first-child {
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 11px;
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
          font-size: 13px;
          color: rgba(100, 200, 220, 0.9);
          letter-spacing: 0.12em;
        }

        .treemap-stats {
          font-family: var(--font-mono);
          font-size: 11px;
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
          font-size: 11px;
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
          font-size: 12px;
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
          font-size: 11px;
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
            font-size: 11px;
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
            font-size: 12px;
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
          font-size: 12px;
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
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .node-info {
          font-family: var(--font-mono);
          font-size: 11px;
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
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
        }

        .device-format {
          font-family: var(--font-mono);
          font-size: 11px;
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
          font-size: 12px;
          color: #ff9f43;
        }

        .disk-size {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 12px;
          color: var(--text-muted);
        }

        .popup-total .total-value {
          font-size: 14px;
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
          font-size: 12px;
          color: var(--text-muted);
        }

        .disk-value {
          font-family: var(--font-mono);
          font-size: 13px;
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
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .disk-usage-section {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.1);
        }
      `})]})}function s1({onClose:e,clusters:t}){const{t:n,language:r,setLanguage:s}=Ie(),[i,o]=h.useState(null),[l,c]=h.useState(!0),[d,p]=h.useState(!1),[f,u]=h.useState(null),[m,w]=h.useState(!1),[_,M]=h.useState("ui"),[v,g]=h.useState(!0),[x,N]=h.useState("cyberpunk"),[S,T]=h.useState("command-center"),[A,B]=h.useState(100),[E,b]=h.useState("all"),[z,$]=h.useState(85),[C,P]=h.useState("vmid"),[W,Y]=h.useState("node"),[F,L]=h.useState("node"),[O,U]=h.useState("asc"),[X,y]=h.useState({}),[V,Q]=h.useState(!0),[le,ae]=h.useState(80),[oe,Oe]=h.useState(95),[ee,ne]=h.useState(85),[ie,ce]=h.useState(95),[Ce,We]=h.useState(80),[Qe,ke]=h.useState(95),[Ve,tt]=h.useState(50),[lt,nt]=h.useState(100),[Ye,Rt]=h.useState(5),[ve,Ge]=h.useState(10),[Fe,bt]=h.useState("0.0.0.0"),[Tt,rt]=h.useState(8098),[re,de]=h.useState(!1),[me,Pe]=h.useState(8086),Xe=()=>{w(!0),setTimeout(()=>e(),400)};h.useEffect(()=>{ft()},[]);const ft=async()=>{var j,R,K,G,se,Z,q,te,ye,ge,De,be,_e,In,Ln,An,Rr,Tr,La,Aa,Oa,Fa,oc,lc,cc,dc,uc,pc,fc,mc,gc,hc,xc,vc;try{c(!0);const pe=await Zt.getConfig();o(pe),g(((j=pe.ui)==null?void 0:j.animations_enabled)??!0),N(((R=pe.ui)==null?void 0:R.theme)??"cyberpunk"),T(((K=pe.ui)==null?void 0:K.default_view)??"command-center"),B(((G=pe.ui)==null?void 0:G.particle_count)??100),b(((se=pe.ui)==null?void 0:se.vm_matrix_default_filter)??"all"),$(((Z=pe.ui)==null?void 0:Z.matrix_card_width)??85),P(((q=pe.ui)==null?void 0:q.matrix_sort_by)??"vmid"),Y(((te=pe.ui)==null?void 0:te.matrix_group_by)??"node"),L(((ye=pe.ui)==null?void 0:ye.matrix_group_sort_by)??"node"),U(((ge=pe.ui)==null?void 0:ge.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((De=pe.ui)==null?void 0:De.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((be=pe.ui)==null?void 0:be.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((_e=pe.ui)==null?void 0:_e.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((In=pe.ui)==null?void 0:In.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((Ln=pe.ui)==null?void 0:Ln.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((An=pe.ui)==null?void 0:An.matrix_group_sort_order)??"asc");const yc={};(Rr=pe.clusters)==null||Rr.forEach(Da=>{yc[Da.id]={enabled:Da.enabled!==!1,poll_interval:Da.poll_interval||5,static_refresh_interval:Da.static_refresh_interval||60}}),y(yc),Q(((Tr=pe.alerts)==null?void 0:Tr.enabled)??!0),ae(((La=pe.alerts)==null?void 0:La.cpu_warning)??80),Oe(((Aa=pe.alerts)==null?void 0:Aa.cpu_critical)??95),ne(((Oa=pe.alerts)==null?void 0:Oa.memory_warning)??85),ce(((Fa=pe.alerts)==null?void 0:Fa.memory_critical)??95),We(((oc=pe.alerts)==null?void 0:oc.disk_warning)??80),ke(((lc=pe.alerts)==null?void 0:lc.disk_critical)??95),tt(((cc=pe.alerts)==null?void 0:cc.diskio_warning)??50),nt(((dc=pe.alerts)==null?void 0:dc.diskio_critical)??100),Rt(((uc=pe.alerts)==null?void 0:uc.iowait_warning)??5),Ge(((pc=pe.alerts)==null?void 0:pc.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((fc=pe.alerts)==null?void 0:fc.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((mc=pe.alerts)==null?void 0:mc.iowait_critical)??10)),bt(((gc=pe.server)==null?void 0:gc.host)??"0.0.0.0"),rt(((hc=pe.server)==null?void 0:hc.http_port)??8098),de(((xc=pe.server)==null?void 0:xc.influx_enabled)??!1),Pe(((vc=pe.server)==null?void 0:vc.influx_port)??8086)}catch(pe){u(String(pe))}finally{c(!1)}},It=async()=>{var j;try{p(!0),localStorage.setItem("matrix_card_width",String(z)),localStorage.setItem("matrix_sort_by",C),localStorage.setItem("matrix_group_by",W),localStorage.setItem("vm_matrix_default_filter",E),localStorage.setItem("matrix_group_sort_by",F),localStorage.setItem("matrix_group_sort_order",O),localStorage.setItem("iowait_warning",String(Ye)),localStorage.setItem("iowait_critical",String(ve));const R=(j=i==null?void 0:i.clusters)==null?void 0:j.map(K=>{var G,se,Z;return{...K,enabled:((G=X[K.id])==null?void 0:G.enabled)!==!1,poll_interval:((se=X[K.id])==null?void 0:se.poll_interval)||K.poll_interval,static_refresh_interval:((Z=X[K.id])==null?void 0:Z.static_refresh_interval)||K.static_refresh_interval}});await Zt.updateConfig({server:{host:Fe,http_port:Tt,influx_enabled:re,influx_port:me},ui:{default_view:S,theme:x,language:r,animations_enabled:v,particle_count:A,vm_matrix_default_filter:E,matrix_card_width:z,matrix_sort_by:C,matrix_group_by:W,matrix_group_sort_by:F,matrix_group_sort_order:O},alerts:{enabled:V,cpu_warning:le,cpu_critical:oe,memory_warning:ee,memory_critical:ie,disk_warning:Ce,disk_critical:Qe,diskio_warning:Ve,diskio_critical:lt,iowait_warning:Ye,iowait_critical:ve},clusters:R}),e()}catch(R){u(String(R))}finally{p(!1)}},k=j=>{y(R=>{var K;return{...R,[j]:{...R[j],enabled:!((K=R[j])!=null&&K.enabled)}}})},D=(j,R,K)=>{y(G=>({...G,[j]:{...G[j],[R]:K}}))};h.useEffect(()=>{const j=R=>{R.key==="Escape"&&!m&&Xe()};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[m]);const I=[{id:"ui",labelKey:"settings.tab_ui",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),a.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),a.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),a.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),a.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return a.jsxs("div",{className:`settings-overlay ${m?"exiting":""}`,onClick:j=>j.target===j.currentTarget&&!m&&Xe(),children:[a.jsxs("div",{className:`settings-panel panel ${m?"exiting":""}`,children:[a.jsx("div",{className:"settings-scanline"}),a.jsxs("div",{className:"settings-header",children:[a.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),a.jsx("button",{className:"settings-close",onClick:Xe,children:"×"})]}),a.jsx("div",{className:"settings-tabs",children:I.map(j=>a.jsxs("button",{className:`settings-tab ${_===j.id?"active":""}`,onClick:()=>M(j.id),children:[j.icon,a.jsx("span",{children:n(j.labelKey)})]},j.id))}),a.jsx("div",{className:"settings-content",children:l?a.jsxs("div",{className:"settings-loading",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("loading.data")})]}):f?a.jsx("div",{className:"settings-error",children:a.jsx("span",{children:f})}):a.jsxs(a.Fragment,{children:[_==="ui"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.default_view")}),a.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(j=>a.jsxs("label",{className:`radio-option ${S===j.id?"active":""}`,children:[a.jsx("input",{type:"radio",name:"defaultView",value:j.id,checked:S===j.id,onChange:()=>T(j.id)}),a.jsx("span",{className:"radio-label",children:n(j.labelKey)})]},j.id))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),a.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(j=>a.jsxs("label",{className:`radio-option ${E===j?"active":""}`,children:[a.jsx("input",{type:"radio",name:"vmFilter",value:j,checked:E===j,onChange:()=>b(j)}),a.jsx("span",{className:"radio-label",children:n(`settings.filter_${j}`)})]},j))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),a.jsxs("div",{className:"input-row",children:[a.jsx("input",{type:"number",className:"input-field",value:z,onChange:j=>$(Number(j.target.value)),min:60,max:200}),a.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),a.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(j=>a.jsxs("label",{className:`radio-option ${C===j?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixSortBy",value:j,checked:C===j,onChange:()=>P(j)}),a.jsx("span",{className:"radio-label",children:n(`settings.sort_${j}`)})]},j))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),a.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(j=>a.jsxs("label",{className:`radio-option ${W===j?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupBy",value:j,checked:W===j,onChange:()=>Y(j)}),a.jsx("span",{className:"radio-label",children:n(`matrix.group_${j}`)})]},j))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),a.jsxs("div",{className:"settings-row",children:[a.jsxs("div",{className:"settings-item",children:[a.jsx("label",{children:n("settings.sort_by")}),a.jsxs("div",{className:"radio-group inline",children:[a.jsxs("label",{className:`radio-option ${F==="node"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:F==="node",onChange:()=>L("node")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),a.jsxs("label",{className:`radio-option ${F==="cluster"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:F==="cluster",onChange:()=>L("cluster")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),a.jsxs("div",{className:"settings-item",children:[a.jsx("label",{children:n("settings.sort_order")}),a.jsxs("div",{className:"radio-group inline",children:[a.jsxs("label",{className:`radio-option ${O==="asc"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:O==="asc",onChange:()=>U("asc")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),a.jsxs("label",{className:`radio-option ${O==="desc"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:O==="desc",onChange:()=>U("desc")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),_==="clusters"&&i&&a.jsx("div",{className:"tab-content",children:a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),a.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),a.jsx("div",{className:"cluster-list-full",children:i.clusters.map(j=>{var se,Z;const R=t==null?void 0:t[j.id],K=(R==null?void 0:R.name)||j.name||j.id,G=X[j.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return a.jsxs("div",{className:`cluster-card ${G.enabled?"":"disabled-cluster"}`,children:[a.jsxs("div",{className:"cluster-card-header",children:[a.jsxs("label",{className:"cluster-toggle",onClick:q=>q.stopPropagation(),children:[a.jsx("input",{type:"checkbox",checked:G.enabled,onChange:()=>k(j.id)}),a.jsx("span",{className:"cluster-toggle-switch"})]}),a.jsx("span",{className:`cluster-status ${G.enabled?"enabled":"disabled"}`}),a.jsx("span",{className:"cluster-name",children:K}),a.jsxs("span",{className:"cluster-id",children:["(",j.id,")"]})]}),a.jsxs("div",{className:"cluster-card-body",children:[a.jsxs("div",{className:"cluster-setting",children:[a.jsx("label",{children:n("settings.poll_interval")}),a.jsx("input",{type:"number",className:"input-field-sm",value:G.poll_interval,onChange:q=>D(j.id,"poll_interval",Number(q.target.value)),min:1,max:60})]}),a.jsxs("div",{className:"cluster-setting",children:[a.jsx("label",{children:n("settings.static_refresh")}),a.jsx("input",{type:"number",className:"input-field-sm",value:G.static_refresh_interval,onChange:q=>D(j.id,"static_refresh_interval",Number(q.target.value)),min:30,max:600})]})]}),a.jsxs("div",{className:"cluster-card-info",children:[a.jsx("span",{children:n("settings.nodes_count",{n:((se=j.nodes)==null?void 0:se.length)||0})}),a.jsxs("span",{children:[n("settings.auth"),": ",((Z=j.auth)==null?void 0:Z.user)||"N/A"]})]})]},j.id)})})]})}),_==="alerts"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:le,onChange:j=>ae(Number(j.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:oe,onChange:j=>Oe(Number(j.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:ee,onChange:j=>ne(Number(j.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:ie,onChange:j=>ce(Number(j.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ce,onChange:j=>We(Number(j.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Qe,onChange:j=>ke(Number(j.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsx("label",{children:n("settings.warning")}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ve,onChange:j=>tt(Number(j.target.value)),min:0,max:1e4})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsx("label",{children:n("settings.critical")}),a.jsx("input",{type:"number",className:"input-field-sm",value:lt,onChange:j=>nt(Number(j.target.value)),min:0,max:1e4})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ye,onChange:j=>Rt(Number(j.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:ve,onChange:j=>Ge(Number(j.target.value)),min:0,max:100})]})]})]})]}),_==="server"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.http_server")}),a.jsxs("div",{className:"input-group",children:[a.jsxs("div",{className:"input-row",children:[a.jsx("label",{children:n("settings.host")}),a.jsx("input",{type:"text",className:"input-field",value:Fe,onChange:j=>bt(j.target.value)})]}),a.jsxs("div",{className:"input-row",children:[a.jsx("label",{children:n("settings.port")}),a.jsx("input",{type:"number",className:"input-field",value:Tt,onChange:j=>rt(Number(j.target.value)),min:1,max:65535})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),a.jsxs("label",{className:"toggle-option",children:[a.jsx("input",{type:"checkbox",checked:re,onChange:j=>de(j.target.checked)}),a.jsx("span",{className:"toggle-switch"}),a.jsx("span",{className:"toggle-label",children:n(re?"settings.enabled":"settings.disabled")})]}),re&&a.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[a.jsx("label",{children:n("settings.influx_port")}),a.jsx("input",{type:"number",className:"input-field",value:me,onChange:j=>Pe(Number(j.target.value)),min:1,max:65535})]})]}),a.jsx("div",{className:"settings-section",children:a.jsxs("div",{className:"server-note",children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),a.jsxs("div",{className:"settings-footer",children:[a.jsxs("div",{className:"settings-footer-left",children:[a.jsxs("div",{className:"settings-version",children:[a.jsx("span",{className:"version-label",children:n("settings.version")}),a.jsx("span",{className:"version-number",children:"v0.1.0"})]}),a.jsxs("div",{className:"settings-author",children:[a.jsx("span",{className:"author-label",children:"by"}),a.jsx("span",{className:"author-name",children:"Jason Cheng"}),a.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),a.jsxs("div",{className:"settings-actions",children:[a.jsx("button",{className:"btn",onClick:Xe,children:n("action.cancel")}),a.jsx("button",{className:"btn btn-primary",onClick:It,disabled:d||m,children:d?"Saving...":n("action.save")})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]}),a.jsx("style",{children:`
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
          font-size: 13px;
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
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .section-hint {
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 13px;
          outline: none;
          text-align: center;
        }

        .input-field-sm:focus { border-color: var(--primary); }

        .input-hint {
          font-size: 12px;
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
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .cluster-id {
          font-family: var(--font-mono);
          font-size: 12px;
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
          font-size: 12px;
          color: var(--text-muted);
        }

        .cluster-card-info {
          display: flex;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
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
          font-size: 12px;
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
          font-size: 12px;
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
          font-size: 12px;
        }

        .version-label {
          color: var(--text-muted);
        }

        .settings-author {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
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
      `})]})}const nu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function i1({particleCount:e=80,enabled:t=!0,isPaused:n=!1}){const r=h.useRef(null),s=h.useRef([]),i=h.useRef(),o=h.useRef({x:0,y:0}),l=h.useCallback((d,p)=>{s.current=Array.from({length:e},()=>({x:Math.random()*d,y:Math.random()*p,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:nu[Math.floor(Math.random()*nu.length)]}))},[e]),c=h.useCallback(()=>{const d=r.current;if(!d)return;const p=d.getContext("2d");if(!p)return;const{width:f,height:u}=d;p.clearRect(0,0,f,u),s.current.forEach(m=>{const w=m.x-o.current.x,_=m.y-o.current.y,M=Math.sqrt(w*w+_*_);if(M<100){const v=(100-M)/100;m.vx+=w/M*v*.05,m.vy+=_/M*v*.05}m.x+=m.vx,m.y+=m.vy,m.vx*=.99,m.vy*=.99,m.x<0&&(m.x=f),m.x>f&&(m.x=0),m.y<0&&(m.y=u),m.y>u&&(m.y=0),m.alpha+=(Math.random()-.5)*.02,m.alpha=Math.max(.1,Math.min(.7,m.alpha)),p.beginPath(),p.arc(m.x,m.y,m.size,0,Math.PI*2),p.fillStyle=m.color,p.globalAlpha=m.alpha,p.fill(),p.shadowBlur=10,p.shadowColor=m.color,p.fill(),p.shadowBlur=0}),p.globalAlpha=1,i.current=requestAnimationFrame(c)},[]);return h.useEffect(()=>{if(!t)return;const d=r.current;if(!d)return;const p=()=>{d.width=window.innerWidth,d.height=window.innerHeight,l(d.width,d.height)},f=u=>{o.current={x:u.clientX,y:u.clientY}};return p(),window.addEventListener("resize",p),window.addEventListener("mousemove",f),()=>{window.removeEventListener("resize",p),window.removeEventListener("mousemove",f)}},[t,l]),h.useEffect(()=>{if(!t||n){i.current&&(cancelAnimationFrame(i.current),i.current=void 0);return}return c(),()=>{i.current&&cancelAnimationFrame(i.current)}},[t,n,c]),t?a.jsx("canvas",{ref:r,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const ru={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function no({digit:e,size:t=16,color:n="#00f0ff",dimColor:r="rgba(0, 240, 255, 0.08)",glow:s=!1}){const i=ru[e]||ru[" "],o=t,l=t*1.8,c=t*.15,d=t*.05,p=s?t*.4:t*.15,f=[`M ${d+c} ${d} L ${o-d-c} ${d} L ${o-d-c*.3} ${c*.7+d} L ${d+c*.3} ${c*.7+d} Z`,`M ${o-d} ${d+c} L ${o-d} ${l/2-d} L ${o-d-c*.7} ${l/2-d-c*.3} L ${o-d-c*.7} ${d+c+c*.3} Z`,`M ${o-d} ${l/2+d} L ${o-d} ${l-d-c} L ${o-d-c*.7} ${l-d-c-c*.3} L ${o-d-c*.7} ${l/2+d+c*.3} Z`,`M ${d+c} ${l-d} L ${o-d-c} ${l-d} L ${o-d-c*.3} ${l-c*.7-d} L ${d+c*.3} ${l-c*.7-d} Z`,`M ${d} ${l/2+d} L ${d} ${l-d-c} L ${d+c*.7} ${l-d-c-c*.3} L ${d+c*.7} ${l/2+d+c*.3} Z`,`M ${d} ${d+c} L ${d} ${l/2-d} L ${d+c*.7} ${l/2-d-c*.3} L ${d+c*.7} ${d+c+c*.3} Z`,`M ${d+c*.5} ${l/2} L ${d+c} ${l/2-c*.4} L ${o-d-c} ${l/2-c*.4} L ${o-d-c*.5} ${l/2} L ${o-d-c} ${l/2+c*.4} L ${d+c} ${l/2+c*.4} Z`];return a.jsx("svg",{width:o,height:l,style:{display:"inline-block"},children:f.map((u,m)=>a.jsx("path",{d:u,fill:i[m]?n:r,style:{filter:i[m]?`drop-shadow(0 0 ${p}px ${n})`:"none",transition:"fill 0.03s ease-out"}},m))})}function au({size:e=16,color:t="#00f0ff",dim:n=!1}){const r=e*.4,s=e*1.8,i=e*.15,o=n?.15:1;return a.jsxs("svg",{width:r,height:s,style:{display:"inline-block"},children:[a.jsx("circle",{cx:r/2,cy:s*.3,r:i,fill:t,opacity:o,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),a.jsx("circle",{cx:r/2,cy:s*.7,r:i,fill:t,opacity:o,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function su(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function o1(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function l1({timestamp:e,connected:t=!0}){const[n,r]=h.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,i]=h.useState(!1),[o,l]=h.useState(!1),c=h.useRef(!1),d=h.useRef(null),p=h.useRef(null),f=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",m=n.hours==="  ",w=h.useCallback(g=>{const x=su(g);r(x),p.current=g},[]),_=h.useCallback(g=>{d.current&&clearInterval(d.current),l(!0),i(!0);let x=0;const N=20,S=50,T={current:g};return d.current=setInterval(()=>{if(x++,x<N)r(o1());else{d.current&&(clearInterval(d.current),d.current=null);const A=su(T.current);r(A),p.current=T.current,l(!1),i(!1)}},S),A=>{T.current=A}},[]),M=h.useRef(null);h.useEffect(()=>{if(e===null){c.current||r({hours:"  ",minutes:"  ",seconds:"  "});return}if(!c.current){c.current=!0,M.current=_(e);return}if(d.current&&M.current){M.current(e);return}p.current!==e&&w(e)},[e,_,w]),h.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const v=14;return a.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${o?"first-spin":""} ${t?"":"disconnected"}`,children:[a.jsxs("div",{className:"clock-label",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"7 10 12 15 17 10"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),a.jsx("span",{style:{color:f},children:"LAST"})]}),a.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((g,x)=>a.jsx(no,{digit:g||" ",size:v,color:f,dimColor:u,glow:o},`h${x}`)),a.jsx(au,{size:v,color:f,dim:m}),(n.minutes||"  ").split("").map((g,x)=>a.jsx(no,{digit:g||" ",size:v,color:f,dimColor:u,glow:o},`m${x}`)),a.jsx(au,{size:v,color:f,dim:m}),(n.seconds||"  ").split("").map((g,x)=>a.jsx(no,{digit:g||" ",size:v,color:f,dimColor:u,glow:o},`s${x}`))]})]})}function c1({clusters:e,value:t,onChange:n,disabled:r}){const[s,i]=h.useState(!1),o=h.useRef(null);h.useEffect(()=>{const d=p=>{o.current&&!o.current.contains(p.target)&&i(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),h.useEffect(()=>{const d=p=>{p.key==="Escape"&&i(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const l=d=>{n(d),i(!1)},c=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return a.jsxs("div",{ref:o,className:`cluster-selector-wrapper ${r?"disabled":""}`,children:[a.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!r&&i(!s),disabled:r,title:c(),children:[a.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"4",r:"2"}),a.jsx("circle",{cx:"12",cy:"20",r:"2"}),a.jsx("circle",{cx:"4",cy:"12",r:"2"}),a.jsx("circle",{cx:"20",cy:"12",r:"2"}),a.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),a.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),a.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),a.jsx("span",{className:"selector-label",children:c()}),a.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!r&&a.jsxs("div",{className:"cluster-dropdown",children:[a.jsxs("div",{className:"dropdown-header",children:[a.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),a.jsx("div",{className:"dropdown-line"})]}),a.jsxs("div",{className:"dropdown-options",children:[a.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>l("__all__"),children:[a.jsx("span",{className:"option-icon",children:"⊕"}),a.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&a.jsx("span",{className:"option-check",children:"✓"})]}),a.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,p])=>{var _,M;const f=(_=p.summary)==null?void 0:_.is_standalone,u=p.name||d,m=((M=p.summary)==null?void 0:M.nodes_online)??0,w=Object.keys(p.vms||{}).length;return a.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>l(d),children:[a.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),a.jsxs("div",{className:"option-content",children:[a.jsx("span",{className:"option-label",children:u}),a.jsxs("span",{className:"option-meta",children:[m," nodes · ",w," VMs"]})]}),t===d&&a.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),a.jsx("div",{className:"dropdown-corner tl"}),a.jsx("div",{className:"dropdown-corner tr"}),a.jsx("div",{className:"dropdown-corner bl"}),a.jsx("div",{className:"dropdown-corner br"})]}),a.jsx("style",{children:`
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          font-size: 12px;
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
          font-size: 13px;
          color: var(--text-muted);
          text-transform: none;
          letter-spacing: 0;
        }

        .dropdown-option:hover .option-meta {
          color: var(--text-secondary);
        }

        .option-check {
          color: var(--success);
          font-size: 12px;
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
      `})]})}function d1({user:e,onLogout:t}){const[n,r]=h.useState(!1),s=h.useRef(null);if(h.useEffect(()=>{if(!n)return;const o=c=>{s.current&&!s.current.contains(c.target)&&r(!1)},l=c=>{c.key==="Escape"&&r(!1)};return document.addEventListener("mousedown",o),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",o),document.removeEventListener("keydown",l)}},[n]),!e)return null;const i=e.role_global||"guest";return a.jsxs("div",{className:"user-badge",ref:s,style:{position:"relative"},children:[a.jsxs("button",{className:"btn btn-icon",onClick:()=>r(o=>!o),title:`${e.username} · ${i}`,style:{gap:8,padding:"0 12px",minWidth:"auto",display:"flex",alignItems:"center"},children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"8",r:"4"}),a.jsx("path",{d:"M4 21v-1a8 8 0 0 1 16 0v1"})]}),a.jsx("span",{style:{fontFamily:"Share Tech Mono, monospace",fontSize:12,letterSpacing:"0.04em",textTransform:"uppercase"},children:e.username}),a.jsx("span",{className:"role-pill","data-role":i,style:{fontFamily:"Share Tech Mono, monospace",fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",padding:"1px 6px",borderRadius:3,border:"1px solid currentColor",color:u1(i)},children:i})]}),n&&a.jsxs("div",{className:"user-menu",style:{position:"absolute",top:"calc(100% + 6px)",right:0,minWidth:220,background:"linear-gradient(180deg, #0d1320, #050810)",border:"1px solid rgba(0,240,255,.16)",borderRadius:8,padding:6,zIndex:200,boxShadow:"0 0 0 1px rgba(0,240,255,.1), 0 8px 24px rgba(0,0,0,.5), 0 0 32px -10px rgba(0,240,255,.4)",animation:"userMenuIn .15s ease"},children:[a.jsx("style",{children:`
            @keyframes userMenuIn {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: none; }
            }
            .user-menu a, .user-menu button {
              display: block; width: 100%; text-align: left;
              padding: 9px 12px; background: transparent; border: none;
              color: var(--text, #e6f6ff);
              font-family: 'Rajdhani', sans-serif; font-size: 14px;
              text-decoration: none; cursor: pointer;
              border-radius: 4px;
              transition: background .12s, color .12s, padding-left .12s;
            }
            .user-menu a:hover, .user-menu button:hover {
              background: rgba(0,240,255,.08);
              color: #00f0ff;
              padding-left: 16px;
            }
            .user-menu .danger:hover { color: #ff3860; background: rgba(255,56,96,.06); }
            .user-menu hr { border: none; border-top: 1px solid rgba(0,240,255,.1); margin: 4px 0; }
            .user-menu .meta {
              padding: 8px 12px; color: var(--text-dim, #95a8c4);
              font-family: 'Share Tech Mono', monospace;
              font-size: 11px; letter-spacing: .04em;
            }
          `}),a.jsxs("div",{className:"meta",children:["// signed in as ",e.username]}),a.jsx("hr",{}),a.jsx("a",{href:"/account",children:"Account · change password"}),a.jsx("a",{href:"/totp",children:"Two-factor (TOTP) setup"}),i==="admin"&&a.jsx("a",{href:"/audit",children:"Audit log viewer"}),i==="admin"&&a.jsx("a",{href:"/sessions",children:"Active sessions"}),a.jsx("hr",{}),a.jsx("button",{className:"danger",onClick:t,children:"Sign out"})]})]})}function u1(e){switch(e){case"admin":return"#ff8a3c";case"operator":return"#00f0ff";case"viewer":return"#95a8c4";default:return"#6b7c93"}}const Dt={Command:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),a.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),a.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),a.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),a.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),a.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),a.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),a.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),a.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),a.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),a.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),a.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Settings:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),a.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),a.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:a.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[a.jsx("circle",{cx:"5",cy:"12",r:"2"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},iu=[{view:"command-center",icon:Dt.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:Dt.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:Dt.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:Dt.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:Dt.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:Dt.Ceph,labelKey:"nav.ceph",shortcut:"C"}],p1={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation"};function f1(){var $;const{t:e,language:t,setLanguage:n}=Ie(),[r,s]=h.useState("command-center"),[i,o]=h.useState({}),[l,c]=h.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,p]=h.useState(!1),f=wf(),[u,m]=h.useState(0),[w,_]=h.useState(!1),[M,v]=h.useState(null),[g,x]=h.useState(!1),[N,S]=h.useState(!1),{connected:T,connecting:A}=jg({onMessage:h.useCallback(C=>{w||(o(C),m(Date.now()/1e3))},[w])}),B=h.useCallback(()=>{v(w?"resuming":"pausing"),setTimeout(()=>{_(C=>!C),setTimeout(()=>v(null),500)},300)},[w]),E=l==="__all__"?null:i[l]||null,b=h.useMemo(()=>{const C=Object.values(i);return{total_clusters:C.length,total_nodes:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.node_count)||0)},0),total_nodes_online:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.nodes_online)||0)},0),total_vms:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.vm_count)||0)},0),total_vms_running:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.vms_running)||0)},0),total_cts:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.ct_count)||0)},0),total_cts_running:C.reduce((P,W)=>{var Y;return P+(((Y=W.summary)==null?void 0:Y.cts_running)||0)},0),clusters:C.map(P=>P.summary).filter(Boolean)}},[i]);h.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",l)}catch{}},[l]),h.useEffect(()=>{Object.keys(i).length>0&&l!=="__all__"&&(i[l]||c("__all__"))},[i,l]),h.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),h.useEffect(()=>{Zt.getConfig().then(C=>{C!=null&&C.ui&&(C.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",C.ui.vm_matrix_default_filter),C.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(C.ui.matrix_card_width)),C.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",C.ui.matrix_sort_by))}).catch(()=>{})},[]),h.useEffect(()=>{if(!g)return;const C=()=>x(!1);return document.addEventListener("click",C),()=>document.removeEventListener("click",C)},[g]),h.useEffect(()=>{if(!N)return;const C=()=>S(!1);return document.addEventListener("click",C),()=>document.removeEventListener("click",C)},[N]),h.useEffect(()=>{const C=P=>{if(P.target instanceof HTMLInputElement||P.target instanceof HTMLTextAreaElement)return;const W=P.key.toLowerCase();if(W===" "||P.code==="Space"){P.preventDefault(),B();return}if(!P.ctrlKey&&!P.metaKey&&!P.altKey){const Y=p1[W];if(Y){P.preventDefault(),s(Y);return}}(P.ctrlKey||P.metaKey)&&W==="s"&&(P.preventDefault(),p(Y=>!Y))};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[B]);const z=()=>{const C=l==="__all__";switch(r){case"command-center":return a.jsx(zd,{clusters:i,globalSummary:b,isPaused:w,onSelectCluster:P=>{c(P),s("cluster-core")}});case"cluster-core":return a.jsx(Ig,{cluster:E,clusters:C?i:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:P=>{c(P),s("holo-matrix")},isPaused:w});case"holo-matrix":return a.jsx(Ug,{cluster:E,clusters:C?i:void 0});case"radar-scan":return a.jsx(Yg,{cluster:E,clusters:C?i:void 0,isPaused:w});case"storage":return a.jsx(a1,{cluster:E,clusters:C?i:void 0});case"ceph-constellation":return a.jsx(oh,{cluster:E,clusters:C?i:void 0,isPaused:w});default:return a.jsx(zd,{clusters:i,globalSummary:b,isPaused:w,onSelectCluster:P=>{c(P),s("cluster-core")}})}};return a.jsxs("div",{className:`app-container ${w?"animations-paused":""}`,children:[a.jsx(i1,{isPaused:w}),a.jsxs("header",{className:"header-bar",children:[a.jsxs("div",{className:"header-logo",children:[a.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),a.jsx("span",{className:`status-dot ${T?"connected":A?"connecting":"disconnected"}`,title:e(T?"status.connected":A?"status.connecting":"status.disconnected")}),a.jsx(l1,{timestamp:u,connected:T})]}),a.jsxs("nav",{className:"header-center",children:[a.jsxs("div",{className:"nav-tabs",children:[iu.map(({view:C,icon:P,labelKey:W,shortcut:Y},F)=>a.jsxs("button",{className:`nav-tab nav-tab-${F} ${r===C?"active":""}`,onClick:()=>s(C),title:`${e(W)} [${Y}]`,children:[a.jsx(P,{}),a.jsx("span",{children:e(W)}),a.jsx("span",{className:"nav-shortcut",children:Y})]},C)),a.jsxs("div",{className:"nav-more-wrapper",children:[a.jsx("button",{className:"nav-tab nav-more-btn",onClick:C=>{C.stopPropagation(),S(!N)},title:e("nav.more"),children:a.jsx(Dt.MoreHorizontal,{})}),N&&a.jsx("div",{className:"nav-more-dropdown",onClick:C=>C.stopPropagation(),children:iu.map(({view:C,icon:P,labelKey:W,shortcut:Y},F)=>a.jsxs("button",{className:`nav-more-option nav-more-option-${F} ${r===C?"active":""}`,onClick:()=>{s(C),S(!1)},children:[a.jsx(P,{}),a.jsx("span",{children:e(W)}),a.jsx("span",{className:"nav-shortcut",children:Y})]},C))})]})]}),Object.keys(i).length>0&&a.jsx(c1,{clusters:i,value:l,onChange:c,disabled:r==="command-center"})]}),a.jsxs("div",{className:"header-right",children:[a.jsxs("button",{className:`btn btn-icon pause-btn ${w?"paused":""} ${M||""}`,onClick:B,title:`${e(w?"status.paused":"status.live")} [Space]`,children:[a.jsx("div",{className:"pause-btn-inner",children:w?a.jsx(Dt.Play,{}):a.jsx(Dt.Pause,{})}),a.jsx("div",{className:"pause-fx"})]}),a.jsxs("div",{className:"lang-menu-wrapper",children:[a.jsx("button",{className:"btn btn-icon",onClick:C=>{C.stopPropagation(),x(!g)},title:e("settings.language"),children:a.jsx(Dt.Language,{})}),g&&a.jsxs("div",{className:"lang-dropdown",onClick:C=>C.stopPropagation(),children:[a.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),x(!1)},children:[a.jsx("span",{className:"lang-flag",children:"EN"}),a.jsx("span",{children:"English"})]}),a.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),x(!1)},children:[a.jsx("span",{className:"lang-flag",children:"繁"}),a.jsx("span",{children:"繁體中文"})]})]})]}),a.jsx(d1,{user:f.user,onLogout:f.logout}),(!f.authEnforced||(($=f.user)==null?void 0:$.role_global)==="admin")&&a.jsx("button",{className:"btn btn-icon",onClick:()=>p(!0),title:e("settings.title"),children:a.jsx(Dt.Settings,{})})]})]}),a.jsx("main",{className:"main-content",children:a.jsx("div",{className:"view-container",children:z()},r)}),d&&a.jsx(s1,{onClose:()=>p(!1),clusters:i}),M&&a.jsxs("div",{className:`pause-overlay ${M}`,children:[a.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((C,P)=>a.jsx("div",{className:"glitch-line",style:{animationDelay:`${P*.05}s`}},P))}),a.jsx("div",{className:"pause-status-text",children:M==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),a.jsx("div",{className:"pause-scan-ring"})]})]})}function m1(){return a.jsx(kg,{children:a.jsx(f1,{})})}ro.createRoot(document.getElementById("root")).render(a.jsx(cl.StrictMode,{children:a.jsx(m1,{})}));
