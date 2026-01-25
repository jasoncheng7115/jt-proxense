(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Gf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var su={exports:{}},ti={},iu={exports:{}},me={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca=Symbol.for("react.element"),Xf=Symbol.for("react.portal"),Kf=Symbol.for("react.fragment"),qf=Symbol.for("react.strict_mode"),Qf=Symbol.for("react.profiler"),Zf=Symbol.for("react.provider"),Jf=Symbol.for("react.context"),e0=Symbol.for("react.forward_ref"),t0=Symbol.for("react.suspense"),n0=Symbol.for("react.memo"),r0=Symbol.for("react.lazy"),yc=Symbol.iterator;function a0(e){return e===null||typeof e!="object"?null:(e=yc&&e[yc]||e["@@iterator"],typeof e=="function"?e:null)}var ou={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},lu=Object.assign,cu={};function Mr(e,t,n){this.props=e,this.context=t,this.refs=cu,this.updater=n||ou}Mr.prototype.isReactComponent={};Mr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Mr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function du(){}du.prototype=Mr.prototype;function al(e,t,n){this.props=e,this.context=t,this.refs=cu,this.updater=n||ou}var sl=al.prototype=new du;sl.constructor=al;lu(sl,Mr.prototype);sl.isPureReactComponent=!0;var bc=Array.isArray,uu=Object.prototype.hasOwnProperty,il={current:null},pu={key:!0,ref:!0,__self:!0,__source:!0};function fu(e,t,n){var r,s={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)uu.call(t,r)&&!pu.hasOwnProperty(r)&&(s[r]=t[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Ca,type:e,key:i,ref:o,props:s,_owner:il.current}}function s0(e,t){return{$$typeof:Ca,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ol(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ca}function i0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var wc=/\/+/g;function wi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?i0(""+e.key):t.toString(36)}function os(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Ca:case Xf:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+wi(o,0):r,bc(s)?(n="",e!=null&&(n=e.replace(wc,"$&/")+"/"),os(s,t,n,"",function(d){return d})):s!=null&&(ol(s)&&(s=s0(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(wc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",bc(e))for(var l=0;l<e.length;l++){i=e[l];var c=r+wi(i,l);o+=os(i,t,n,c,s)}else if(c=a0(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=r+wi(i,l++),o+=os(i,t,n,c,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Fa(e,t,n){if(e==null)return e;var r=[],s=0;return os(e,r,"","",function(i){return t.call(n,i,s++)}),r}function o0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ct={current:null},ls={transition:null},l0={ReactCurrentDispatcher:ct,ReactCurrentBatchConfig:ls,ReactCurrentOwner:il};function mu(){throw Error("act(...) is not supported in production builds of React.")}me.Children={map:Fa,forEach:function(e,t,n){Fa(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Fa(e,function(){t++}),t},toArray:function(e){return Fa(e,function(t){return t})||[]},only:function(e){if(!ol(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};me.Component=Mr;me.Fragment=Kf;me.Profiler=Qf;me.PureComponent=al;me.StrictMode=qf;me.Suspense=t0;me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=l0;me.act=mu;me.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=lu({},e.props),s=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=il.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)uu.call(t,c)&&!pu.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Ca,type:e.type,key:s,ref:i,props:r,_owner:o}};me.createContext=function(e){return e={$$typeof:Jf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Zf,_context:e},e.Consumer=e};me.createElement=fu;me.createFactory=function(e){var t=fu.bind(null,e);return t.type=e,t};me.createRef=function(){return{current:null}};me.forwardRef=function(e){return{$$typeof:e0,render:e}};me.isValidElement=ol;me.lazy=function(e){return{$$typeof:r0,_payload:{_status:-1,_result:e},_init:o0}};me.memo=function(e,t){return{$$typeof:n0,type:e,compare:t===void 0?null:t}};me.startTransition=function(e){var t=ls.transition;ls.transition={};try{e()}finally{ls.transition=t}};me.unstable_act=mu;me.useCallback=function(e,t){return ct.current.useCallback(e,t)};me.useContext=function(e){return ct.current.useContext(e)};me.useDebugValue=function(){};me.useDeferredValue=function(e){return ct.current.useDeferredValue(e)};me.useEffect=function(e,t){return ct.current.useEffect(e,t)};me.useId=function(){return ct.current.useId()};me.useImperativeHandle=function(e,t,n){return ct.current.useImperativeHandle(e,t,n)};me.useInsertionEffect=function(e,t){return ct.current.useInsertionEffect(e,t)};me.useLayoutEffect=function(e,t){return ct.current.useLayoutEffect(e,t)};me.useMemo=function(e,t){return ct.current.useMemo(e,t)};me.useReducer=function(e,t,n){return ct.current.useReducer(e,t,n)};me.useRef=function(e){return ct.current.useRef(e)};me.useState=function(e){return ct.current.useState(e)};me.useSyncExternalStore=function(e,t,n){return ct.current.useSyncExternalStore(e,t,n)};me.useTransition=function(){return ct.current.useTransition()};me.version="18.3.1";iu.exports=me;var h=iu.exports;const gu=Gf(h);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c0=h,d0=Symbol.for("react.element"),u0=Symbol.for("react.fragment"),p0=Object.prototype.hasOwnProperty,f0=c0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m0={key:!0,ref:!0,__self:!0,__source:!0};function hu(e,t,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)p0.call(t,r)&&!m0.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:d0,type:e,key:i,ref:o,props:s,_owner:f0.current}}ti.Fragment=u0;ti.jsx=hu;ti.jsxs=hu;su.exports=ti;var a=su.exports,no={},xu={exports:{}},jt={},vu={exports:{}},yu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,F){var G=$.length;$.push(F);e:for(;0<G;){var X=G-1>>>1,y=$[X];if(0<s(y,F))$[X]=F,$[G]=y,G=X;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var F=$[0],G=$.pop();if(G!==F){$[0]=G;e:for(var X=0,y=$.length,W=y>>>1;X<W;){var ee=2*(X+1)-1,ue=$[ee],ne=ee+1,se=$[ne];if(0>s(ue,G))ne<y&&0>s(se,ue)?($[X]=se,$[ne]=G,X=ne):($[X]=ue,$[ee]=G,X=ee);else if(ne<y&&0>s(se,G))$[X]=se,$[ne]=G,X=ne;else break e}}return F}function s($,F){var G=$.sortIndex-F.sortIndex;return G!==0?G:$.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],p=1,f=null,u=3,m=!1,w=!1,k=!1,E=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g($){for(var F=n(d);F!==null;){if(F.callback===null)r(d);else if(F.startTime<=$)r(d),F.sortIndex=F.expirationTime,t(c,F);else break;F=n(d)}}function _($){if(k=!1,g($),!w)if(n(c)!==null)w=!0,te(j);else{var F=n(d);F!==null&&O(_,F.startTime-$)}}function j($,F){w=!1,k&&(k=!1,v(H),H=-1),m=!0;var G=u;try{for(g(F),f=n(c);f!==null&&(!(f.expirationTime>F)||$&&!N());){var X=f.callback;if(typeof X=="function"){f.callback=null,u=f.priorityLevel;var y=X(f.expirationTime<=F);F=e.unstable_now(),typeof y=="function"?f.callback=y:f===n(c)&&r(c),g(F)}else r(c);f=n(c)}if(f!==null)var W=!0;else{var ee=n(d);ee!==null&&O(_,ee.startTime-F),W=!1}return W}finally{f=null,u=G,m=!1}}var z=!1,I=null,H=-1,R=5,b=-1;function N(){return!(e.unstable_now()-b<R)}function C(){if(I!==null){var $=e.unstable_now();b=$;var F=!0;try{F=I(!0,$)}finally{F?L():(z=!1,I=null)}}else z=!1}var L;if(typeof x=="function")L=function(){x(C)};else if(typeof MessageChannel<"u"){var A=new MessageChannel,Y=A.port2;A.port1.onmessage=C,L=function(){Y.postMessage(null)}}else L=function(){E(C,0)};function te($){I=$,z||(z=!0,L())}function O($,F){H=E(function(){$(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){w||m||(w=!0,te(j))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function($){switch(u){case 1:case 2:case 3:var F=3;break;default:F=u}var G=u;u=F;try{return $()}finally{u=G}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,F){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var G=u;u=$;try{return F()}finally{u=G}},e.unstable_scheduleCallback=function($,F,G){var X=e.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?X+G:X):G=X,$){case 1:var y=-1;break;case 2:y=250;break;case 5:y=1073741823;break;case 4:y=1e4;break;default:y=5e3}return y=G+y,$={id:p++,callback:F,priorityLevel:$,startTime:G,expirationTime:y,sortIndex:-1},G>X?($.sortIndex=G,t(d,$),n(c)===null&&$===n(d)&&(k?(v(H),H=-1):k=!0,O(_,G-X))):($.sortIndex=y,t(c,$),w||m||(w=!0,te(j))),$},e.unstable_shouldYield=N,e.unstable_wrapCallback=function($){var F=u;return function(){var G=u;u=F;try{return $.apply(this,arguments)}finally{u=G}}}})(yu);vu.exports=yu;var g0=vu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h0=h,kt=g0;function V(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var bu=new Set,ia={};function Qn(e,t){yr(e,t),yr(e+"Capture",t)}function yr(e,t){for(ia[e]=t,e=0;e<t.length;e++)bu.add(t[e])}var sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ro=Object.prototype.hasOwnProperty,x0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kc={},jc={};function v0(e){return ro.call(jc,e)?!0:ro.call(kc,e)?!1:x0.test(e)?jc[e]=!0:(kc[e]=!0,!1)}function y0(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function b0(e,t,n,r){if(t===null||typeof t>"u"||y0(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function dt(e,t,n,r,s,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){tt[e]=new dt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];tt[t]=new dt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){tt[e]=new dt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){tt[e]=new dt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){tt[e]=new dt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){tt[e]=new dt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){tt[e]=new dt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){tt[e]=new dt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){tt[e]=new dt(e,5,!1,e.toLowerCase(),null,!1,!1)});var ll=/[\-:]([a-z])/g;function cl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ll,cl);tt[t]=new dt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ll,cl);tt[t]=new dt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ll,cl);tt[t]=new dt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){tt[e]=new dt(e,1,!1,e.toLowerCase(),null,!1,!1)});tt.xlinkHref=new dt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){tt[e]=new dt(e,1,!1,e.toLowerCase(),null,!0,!0)});function dl(e,t,n,r){var s=tt.hasOwnProperty(t)?tt[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(b0(t,n,s,r)&&(n=null),r||s===null?v0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var un=h0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Da=Symbol.for("react.element"),er=Symbol.for("react.portal"),tr=Symbol.for("react.fragment"),ul=Symbol.for("react.strict_mode"),ao=Symbol.for("react.profiler"),wu=Symbol.for("react.provider"),ku=Symbol.for("react.context"),pl=Symbol.for("react.forward_ref"),so=Symbol.for("react.suspense"),io=Symbol.for("react.suspense_list"),fl=Symbol.for("react.memo"),fn=Symbol.for("react.lazy"),ju=Symbol.for("react.offscreen"),_c=Symbol.iterator;function Rr(e){return e===null||typeof e!="object"?null:(e=_c&&e[_c]||e["@@iterator"],typeof e=="function"?e:null)}var ze=Object.assign,ki;function Ur(e){if(ki===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ki=t&&t[1]||""}return`
`+ki+e}var ji=!1;function _i(e,t){if(!e||ji)return"";ji=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var c=`
`+s[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{ji=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ur(e):""}function w0(e){switch(e.tag){case 5:return Ur(e.type);case 16:return Ur("Lazy");case 13:return Ur("Suspense");case 19:return Ur("SuspenseList");case 0:case 2:case 15:return e=_i(e.type,!1),e;case 11:return e=_i(e.type.render,!1),e;case 1:return e=_i(e.type,!0),e;default:return""}}function oo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case tr:return"Fragment";case er:return"Portal";case ao:return"Profiler";case ul:return"StrictMode";case so:return"Suspense";case io:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ku:return(e.displayName||"Context")+".Consumer";case wu:return(e._context.displayName||"Context")+".Provider";case pl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fl:return t=e.displayName||null,t!==null?t:oo(e.type)||"Memo";case fn:t=e._payload,e=e._init;try{return oo(e(t))}catch{}}return null}function k0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return oo(t);case 8:return t===ul?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function _u(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function j0(e){var t=_u(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ba(e){e._valueTracker||(e._valueTracker=j0(e))}function Nu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=_u(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ks(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function lo(e,t){var n=t.checked;return ze({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Nc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Mn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Su(e,t){t=t.checked,t!=null&&dl(e,"checked",t,!1)}function co(e,t){Su(e,t);var n=Mn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?uo(e,t.type,n):t.hasOwnProperty("defaultValue")&&uo(e,t.type,Mn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Sc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function uo(e,t,n){(t!=="number"||ks(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Hr=Array.isArray;function pr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Mn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function po(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(V(91));return ze({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Cc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(V(92));if(Hr(n)){if(1<n.length)throw Error(V(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Mn(n)}}function Cu(e,t){var n=Mn(t.value),r=Mn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Mc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Mu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Mu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Wa,Eu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Wa=Wa||document.createElement("div"),Wa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Wa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function oa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_0=["Webkit","ms","Moz","O"];Object.keys(Qr).forEach(function(e){_0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Qr[t]=Qr[e]})});function zu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Qr.hasOwnProperty(e)&&Qr[e]?(""+t).trim():t+"px"}function $u(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=zu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var N0=ze({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mo(e,t){if(t){if(N0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(V(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(V(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(V(61))}if(t.style!=null&&typeof t.style!="object")throw Error(V(62))}}function go(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ho=null;function ml(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xo=null,fr=null,mr=null;function Ec(e){if(e=za(e)){if(typeof xo!="function")throw Error(V(280));var t=e.stateNode;t&&(t=ii(t),xo(e.stateNode,e.type,t))}}function Pu(e){fr?mr?mr.push(e):mr=[e]:fr=e}function Ru(){if(fr){var e=fr,t=mr;if(mr=fr=null,Ec(e),t)for(e=0;e<t.length;e++)Ec(t[e])}}function Tu(e,t){return e(t)}function Lu(){}var Ni=!1;function Iu(e,t,n){if(Ni)return e(t,n);Ni=!0;try{return Tu(e,t,n)}finally{Ni=!1,(fr!==null||mr!==null)&&(Lu(),Ru())}}function la(e,t){var n=e.stateNode;if(n===null)return null;var r=ii(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(V(231,t,typeof n));return n}var vo=!1;if(sn)try{var Tr={};Object.defineProperty(Tr,"passive",{get:function(){vo=!0}}),window.addEventListener("test",Tr,Tr),window.removeEventListener("test",Tr,Tr)}catch{vo=!1}function S0(e,t,n,r,s,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(p){this.onError(p)}}var Zr=!1,js=null,_s=!1,yo=null,C0={onError:function(e){Zr=!0,js=e}};function M0(e,t,n,r,s,i,o,l,c){Zr=!1,js=null,S0.apply(C0,arguments)}function E0(e,t,n,r,s,i,o,l,c){if(M0.apply(this,arguments),Zr){if(Zr){var d=js;Zr=!1,js=null}else throw Error(V(198));_s||(_s=!0,yo=d)}}function Zn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Au(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zc(e){if(Zn(e)!==e)throw Error(V(188))}function z0(e){var t=e.alternate;if(!t){if(t=Zn(e),t===null)throw Error(V(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return zc(s),e;if(i===r)return zc(s),t;i=i.sibling}throw Error(V(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(V(189))}}if(n.alternate!==r)throw Error(V(190))}if(n.tag!==3)throw Error(V(188));return n.stateNode.current===n?e:t}function Ou(e){return e=z0(e),e!==null?Fu(e):null}function Fu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fu(e);if(t!==null)return t;e=e.sibling}return null}var Du=kt.unstable_scheduleCallback,$c=kt.unstable_cancelCallback,$0=kt.unstable_shouldYield,P0=kt.unstable_requestPaint,Ie=kt.unstable_now,R0=kt.unstable_getCurrentPriorityLevel,gl=kt.unstable_ImmediatePriority,Bu=kt.unstable_UserBlockingPriority,Ns=kt.unstable_NormalPriority,T0=kt.unstable_LowPriority,Wu=kt.unstable_IdlePriority,ni=null,Xt=null;function L0(e){if(Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(ni,e,void 0,(e.current.flags&128)===128)}catch{}}var Ot=Math.clz32?Math.clz32:O0,I0=Math.log,A0=Math.LN2;function O0(e){return e>>>=0,e===0?32:31-(I0(e)/A0|0)|0}var Va=64,Ua=4194304;function Yr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ss(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Yr(l):(i&=o,i!==0&&(r=Yr(i)))}else o=n&~s,o!==0?r=Yr(o):i!==0&&(r=Yr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ot(t),s=1<<n,r|=e[n],t&=~s;return r}function F0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function D0(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Ot(i),l=1<<o,c=s[o];c===-1?(!(l&n)||l&r)&&(s[o]=F0(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function bo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Vu(){var e=Va;return Va<<=1,!(Va&4194240)&&(Va=64),e}function Si(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ma(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ot(t),e[t]=n}function B0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Ot(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function hl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ot(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var we=0;function Uu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Hu,xl,Yu,Gu,Xu,wo=!1,Ha=[],bn=null,wn=null,kn=null,ca=new Map,da=new Map,hn=[],W0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pc(e,t){switch(e){case"focusin":case"focusout":bn=null;break;case"dragenter":case"dragleave":wn=null;break;case"mouseover":case"mouseout":kn=null;break;case"pointerover":case"pointerout":ca.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":da.delete(t.pointerId)}}function Lr(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=za(t),t!==null&&xl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function V0(e,t,n,r,s){switch(t){case"focusin":return bn=Lr(bn,e,t,n,r,s),!0;case"dragenter":return wn=Lr(wn,e,t,n,r,s),!0;case"mouseover":return kn=Lr(kn,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return ca.set(i,Lr(ca.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,da.set(i,Lr(da.get(i)||null,e,t,n,r,s)),!0}return!1}function Ku(e){var t=On(e.target);if(t!==null){var n=Zn(t);if(n!==null){if(t=n.tag,t===13){if(t=Au(n),t!==null){e.blockedOn=t,Xu(e.priority,function(){Yu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function cs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ko(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ho=r,n.target.dispatchEvent(r),ho=null}else return t=za(n),t!==null&&xl(t),e.blockedOn=n,!1;t.shift()}return!0}function Rc(e,t,n){cs(e)&&n.delete(t)}function U0(){wo=!1,bn!==null&&cs(bn)&&(bn=null),wn!==null&&cs(wn)&&(wn=null),kn!==null&&cs(kn)&&(kn=null),ca.forEach(Rc),da.forEach(Rc)}function Ir(e,t){e.blockedOn===t&&(e.blockedOn=null,wo||(wo=!0,kt.unstable_scheduleCallback(kt.unstable_NormalPriority,U0)))}function ua(e){function t(s){return Ir(s,e)}if(0<Ha.length){Ir(Ha[0],e);for(var n=1;n<Ha.length;n++){var r=Ha[n];r.blockedOn===e&&(r.blockedOn=null)}}for(bn!==null&&Ir(bn,e),wn!==null&&Ir(wn,e),kn!==null&&Ir(kn,e),ca.forEach(t),da.forEach(t),n=0;n<hn.length;n++)r=hn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<hn.length&&(n=hn[0],n.blockedOn===null);)Ku(n),n.blockedOn===null&&hn.shift()}var gr=un.ReactCurrentBatchConfig,Cs=!0;function H0(e,t,n,r){var s=we,i=gr.transition;gr.transition=null;try{we=1,vl(e,t,n,r)}finally{we=s,gr.transition=i}}function Y0(e,t,n,r){var s=we,i=gr.transition;gr.transition=null;try{we=4,vl(e,t,n,r)}finally{we=s,gr.transition=i}}function vl(e,t,n,r){if(Cs){var s=ko(e,t,n,r);if(s===null)Ii(e,t,r,Ms,n),Pc(e,r);else if(V0(s,e,t,n,r))r.stopPropagation();else if(Pc(e,r),t&4&&-1<W0.indexOf(e)){for(;s!==null;){var i=za(s);if(i!==null&&Hu(i),i=ko(e,t,n,r),i===null&&Ii(e,t,r,Ms,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ii(e,t,r,null,n)}}var Ms=null;function ko(e,t,n,r){if(Ms=null,e=ml(r),e=On(e),e!==null)if(t=Zn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Au(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ms=e,null}function qu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(R0()){case gl:return 1;case Bu:return 4;case Ns:case T0:return 16;case Wu:return 536870912;default:return 16}default:return 16}}var vn=null,yl=null,ds=null;function Qu(){if(ds)return ds;var e,t=yl,n=t.length,r,s="value"in vn?vn.value:vn.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[i-r];r++);return ds=s.slice(e,1<r?1-r:void 0)}function us(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ya(){return!0}function Tc(){return!1}function _t(e){function t(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ya:Tc,this.isPropagationStopped=Tc,this}return ze(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ya)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ya)},persist:function(){},isPersistent:Ya}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bl=_t(Er),Ea=ze({},Er,{view:0,detail:0}),G0=_t(Ea),Ci,Mi,Ar,ri=ze({},Ea,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ar&&(Ar&&e.type==="mousemove"?(Ci=e.screenX-Ar.screenX,Mi=e.screenY-Ar.screenY):Mi=Ci=0,Ar=e),Ci)},movementY:function(e){return"movementY"in e?e.movementY:Mi}}),Lc=_t(ri),X0=ze({},ri,{dataTransfer:0}),K0=_t(X0),q0=ze({},Ea,{relatedTarget:0}),Ei=_t(q0),Q0=ze({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),Z0=_t(Q0),J0=ze({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),em=_t(J0),tm=ze({},Er,{data:0}),Ic=_t(tm),nm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},am={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=am[e])?!!t[e]:!1}function wl(){return sm}var im=ze({},Ea,{key:function(e){if(e.key){var t=nm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=us(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wl,charCode:function(e){return e.type==="keypress"?us(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?us(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),om=_t(im),lm=ze({},ri,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ac=_t(lm),cm=ze({},Ea,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wl}),dm=_t(cm),um=ze({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),pm=_t(um),fm=ze({},ri,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),mm=_t(fm),gm=[9,13,27,32],kl=sn&&"CompositionEvent"in window,Jr=null;sn&&"documentMode"in document&&(Jr=document.documentMode);var hm=sn&&"TextEvent"in window&&!Jr,Zu=sn&&(!kl||Jr&&8<Jr&&11>=Jr),Oc=" ",Fc=!1;function Ju(e,t){switch(e){case"keyup":return gm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ep(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var nr=!1;function xm(e,t){switch(e){case"compositionend":return ep(t);case"keypress":return t.which!==32?null:(Fc=!0,Oc);case"textInput":return e=t.data,e===Oc&&Fc?null:e;default:return null}}function vm(e,t){if(nr)return e==="compositionend"||!kl&&Ju(e,t)?(e=Qu(),ds=yl=vn=null,nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Zu&&t.locale!=="ko"?null:t.data;default:return null}}var ym={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ym[e.type]:t==="textarea"}function tp(e,t,n,r){Pu(r),t=Es(t,"onChange"),0<t.length&&(n=new bl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ea=null,pa=null;function bm(e){pp(e,0)}function ai(e){var t=sr(e);if(Nu(t))return e}function wm(e,t){if(e==="change")return t}var np=!1;if(sn){var zi;if(sn){var $i="oninput"in document;if(!$i){var Bc=document.createElement("div");Bc.setAttribute("oninput","return;"),$i=typeof Bc.oninput=="function"}zi=$i}else zi=!1;np=zi&&(!document.documentMode||9<document.documentMode)}function Wc(){ea&&(ea.detachEvent("onpropertychange",rp),pa=ea=null)}function rp(e){if(e.propertyName==="value"&&ai(pa)){var t=[];tp(t,pa,e,ml(e)),Iu(bm,t)}}function km(e,t,n){e==="focusin"?(Wc(),ea=t,pa=n,ea.attachEvent("onpropertychange",rp)):e==="focusout"&&Wc()}function jm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ai(pa)}function _m(e,t){if(e==="click")return ai(t)}function Nm(e,t){if(e==="input"||e==="change")return ai(t)}function Sm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Dt=typeof Object.is=="function"?Object.is:Sm;function fa(e,t){if(Dt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!ro.call(t,s)||!Dt(e[s],t[s]))return!1}return!0}function Vc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Uc(e,t){var n=Vc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Vc(n)}}function ap(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ap(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function sp(){for(var e=window,t=ks();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ks(e.document)}return t}function jl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Cm(e){var t=sp(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ap(n.ownerDocument.documentElement,n)){if(r!==null&&jl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=Uc(n,i);var o=Uc(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mm=sn&&"documentMode"in document&&11>=document.documentMode,rr=null,jo=null,ta=null,_o=!1;function Hc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_o||rr==null||rr!==ks(r)||(r=rr,"selectionStart"in r&&jl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ta&&fa(ta,r)||(ta=r,r=Es(jo,"onSelect"),0<r.length&&(t=new bl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=rr)))}function Ga(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ar={animationend:Ga("Animation","AnimationEnd"),animationiteration:Ga("Animation","AnimationIteration"),animationstart:Ga("Animation","AnimationStart"),transitionend:Ga("Transition","TransitionEnd")},Pi={},ip={};sn&&(ip=document.createElement("div").style,"AnimationEvent"in window||(delete ar.animationend.animation,delete ar.animationiteration.animation,delete ar.animationstart.animation),"TransitionEvent"in window||delete ar.transitionend.transition);function si(e){if(Pi[e])return Pi[e];if(!ar[e])return e;var t=ar[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ip)return Pi[e]=t[n];return e}var op=si("animationend"),lp=si("animationiteration"),cp=si("animationstart"),dp=si("transitionend"),up=new Map,Yc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function zn(e,t){up.set(e,t),Qn(t,[e])}for(var Ri=0;Ri<Yc.length;Ri++){var Ti=Yc[Ri],Em=Ti.toLowerCase(),zm=Ti[0].toUpperCase()+Ti.slice(1);zn(Em,"on"+zm)}zn(op,"onAnimationEnd");zn(lp,"onAnimationIteration");zn(cp,"onAnimationStart");zn("dblclick","onDoubleClick");zn("focusin","onFocus");zn("focusout","onBlur");zn(dp,"onTransitionEnd");yr("onMouseEnter",["mouseout","mouseover"]);yr("onMouseLeave",["mouseout","mouseover"]);yr("onPointerEnter",["pointerout","pointerover"]);yr("onPointerLeave",["pointerout","pointerover"]);Qn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$m=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gr));function Gc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,E0(r,t,void 0,e),e.currentTarget=null}function pp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;Gc(s,l,d),i=c}else for(o=0;o<r.length;o++){if(l=r[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;Gc(s,l,d),i=c}}}if(_s)throw e=yo,_s=!1,yo=null,e}function Ne(e,t){var n=t[Eo];n===void 0&&(n=t[Eo]=new Set);var r=e+"__bubble";n.has(r)||(fp(t,e,2,!1),n.add(r))}function Li(e,t,n){var r=0;t&&(r|=4),fp(n,e,r,t)}var Xa="_reactListening"+Math.random().toString(36).slice(2);function ma(e){if(!e[Xa]){e[Xa]=!0,bu.forEach(function(n){n!=="selectionchange"&&($m.has(n)||Li(n,!1,e),Li(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Xa]||(t[Xa]=!0,Li("selectionchange",!1,t))}}function fp(e,t,n,r){switch(qu(t)){case 1:var s=H0;break;case 4:s=Y0;break;default:s=vl}n=s.bind(null,t,n,e),s=void 0,!vo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ii(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;l!==null;){if(o=On(l),o===null)return;if(c=o.tag,c===5||c===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Iu(function(){var d=i,p=ml(n),f=[];e:{var u=up.get(e);if(u!==void 0){var m=bl,w=e;switch(e){case"keypress":if(us(n)===0)break e;case"keydown":case"keyup":m=om;break;case"focusin":w="focus",m=Ei;break;case"focusout":w="blur",m=Ei;break;case"beforeblur":case"afterblur":m=Ei;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Lc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=K0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=dm;break;case op:case lp:case cp:m=Z0;break;case dp:m=pm;break;case"scroll":m=G0;break;case"wheel":m=mm;break;case"copy":case"cut":case"paste":m=em;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Ac}var k=(t&4)!==0,E=!k&&e==="scroll",v=k?u!==null?u+"Capture":null:u;k=[];for(var x=d,g;x!==null;){g=x;var _=g.stateNode;if(g.tag===5&&_!==null&&(g=_,v!==null&&(_=la(x,v),_!=null&&k.push(ga(x,_,g)))),E)break;x=x.return}0<k.length&&(u=new m(u,w,null,n,p),f.push({event:u,listeners:k}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",u&&n!==ho&&(w=n.relatedTarget||n.fromElement)&&(On(w)||w[on]))break e;if((m||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,m?(w=n.relatedTarget||n.toElement,m=d,w=w?On(w):null,w!==null&&(E=Zn(w),w!==E||w.tag!==5&&w.tag!==6)&&(w=null)):(m=null,w=d),m!==w)){if(k=Lc,_="onMouseLeave",v="onMouseEnter",x="mouse",(e==="pointerout"||e==="pointerover")&&(k=Ac,_="onPointerLeave",v="onPointerEnter",x="pointer"),E=m==null?u:sr(m),g=w==null?u:sr(w),u=new k(_,x+"leave",m,n,p),u.target=E,u.relatedTarget=g,_=null,On(p)===d&&(k=new k(v,x+"enter",w,n,p),k.target=g,k.relatedTarget=E,_=k),E=_,m&&w)t:{for(k=m,v=w,x=0,g=k;g;g=Jn(g))x++;for(g=0,_=v;_;_=Jn(_))g++;for(;0<x-g;)k=Jn(k),x--;for(;0<g-x;)v=Jn(v),g--;for(;x--;){if(k===v||v!==null&&k===v.alternate)break t;k=Jn(k),v=Jn(v)}k=null}else k=null;m!==null&&Xc(f,u,m,k,!1),w!==null&&E!==null&&Xc(f,E,w,k,!0)}}e:{if(u=d?sr(d):window,m=u.nodeName&&u.nodeName.toLowerCase(),m==="select"||m==="input"&&u.type==="file")var j=wm;else if(Dc(u))if(np)j=Nm;else{j=jm;var z=km}else(m=u.nodeName)&&m.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(j=_m);if(j&&(j=j(e,d))){tp(f,j,n,p);break e}z&&z(e,u,d),e==="focusout"&&(z=u._wrapperState)&&z.controlled&&u.type==="number"&&uo(u,"number",u.value)}switch(z=d?sr(d):window,e){case"focusin":(Dc(z)||z.contentEditable==="true")&&(rr=z,jo=d,ta=null);break;case"focusout":ta=jo=rr=null;break;case"mousedown":_o=!0;break;case"contextmenu":case"mouseup":case"dragend":_o=!1,Hc(f,n,p);break;case"selectionchange":if(Mm)break;case"keydown":case"keyup":Hc(f,n,p)}var I;if(kl)e:{switch(e){case"compositionstart":var H="onCompositionStart";break e;case"compositionend":H="onCompositionEnd";break e;case"compositionupdate":H="onCompositionUpdate";break e}H=void 0}else nr?Ju(e,n)&&(H="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(H="onCompositionStart");H&&(Zu&&n.locale!=="ko"&&(nr||H!=="onCompositionStart"?H==="onCompositionEnd"&&nr&&(I=Qu()):(vn=p,yl="value"in vn?vn.value:vn.textContent,nr=!0)),z=Es(d,H),0<z.length&&(H=new Ic(H,e,null,n,p),f.push({event:H,listeners:z}),I?H.data=I:(I=ep(n),I!==null&&(H.data=I)))),(I=hm?xm(e,n):vm(e,n))&&(d=Es(d,"onBeforeInput"),0<d.length&&(p=new Ic("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=I))}pp(f,t)})}function ga(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Es(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=la(e,n),i!=null&&r.unshift(ga(e,i,s)),i=la(e,t),i!=null&&r.push(ga(e,i,s))),e=e.return}return r}function Jn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Xc(e,t,n,r,s){for(var i=t._reactName,o=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,s?(c=la(n,i),c!=null&&o.unshift(ga(n,c,l))):s||(c=la(n,i),c!=null&&o.push(ga(n,c,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Pm=/\r\n?/g,Rm=/\u0000|\uFFFD/g;function Kc(e){return(typeof e=="string"?e:""+e).replace(Pm,`
`).replace(Rm,"")}function Ka(e,t,n){if(t=Kc(t),Kc(e)!==t&&n)throw Error(V(425))}function zs(){}var No=null,So=null;function Co(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Mo=typeof setTimeout=="function"?setTimeout:void 0,Tm=typeof clearTimeout=="function"?clearTimeout:void 0,qc=typeof Promise=="function"?Promise:void 0,Lm=typeof queueMicrotask=="function"?queueMicrotask:typeof qc<"u"?function(e){return qc.resolve(null).then(e).catch(Im)}:Mo;function Im(e){setTimeout(function(){throw e})}function Ai(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),ua(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ua(t)}function jn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Qc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var zr=Math.random().toString(36).slice(2),Gt="__reactFiber$"+zr,ha="__reactProps$"+zr,on="__reactContainer$"+zr,Eo="__reactEvents$"+zr,Am="__reactListeners$"+zr,Om="__reactHandles$"+zr;function On(e){var t=e[Gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[on]||n[Gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Qc(e);e!==null;){if(n=e[Gt])return n;e=Qc(e)}return t}e=n,n=e.parentNode}return null}function za(e){return e=e[Gt]||e[on],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(V(33))}function ii(e){return e[ha]||null}var zo=[],ir=-1;function $n(e){return{current:e}}function Se(e){0>ir||(e.current=zo[ir],zo[ir]=null,ir--)}function _e(e,t){ir++,zo[ir]=e.current,e.current=t}var En={},it=$n(En),ht=$n(!1),Hn=En;function br(e,t){var n=e.type.contextTypes;if(!n)return En;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function xt(e){return e=e.childContextTypes,e!=null}function $s(){Se(ht),Se(it)}function Zc(e,t,n){if(it.current!==En)throw Error(V(168));_e(it,t),_e(ht,n)}function mp(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(V(108,k0(e)||"Unknown",s));return ze({},n,r)}function Ps(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||En,Hn=it.current,_e(it,e),_e(ht,ht.current),!0}function Jc(e,t,n){var r=e.stateNode;if(!r)throw Error(V(169));n?(e=mp(e,t,Hn),r.__reactInternalMemoizedMergedChildContext=e,Se(ht),Se(it),_e(it,e)):Se(ht),_e(ht,n)}var tn=null,oi=!1,Oi=!1;function gp(e){tn===null?tn=[e]:tn.push(e)}function Fm(e){oi=!0,gp(e)}function Pn(){if(!Oi&&tn!==null){Oi=!0;var e=0,t=we;try{var n=tn;for(we=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}tn=null,oi=!1}catch(s){throw tn!==null&&(tn=tn.slice(e+1)),Du(gl,Pn),s}finally{we=t,Oi=!1}}return null}var or=[],lr=0,Rs=null,Ts=0,St=[],Ct=0,Yn=null,nn=1,rn="";function In(e,t){or[lr++]=Ts,or[lr++]=Rs,Rs=e,Ts=t}function hp(e,t,n){St[Ct++]=nn,St[Ct++]=rn,St[Ct++]=Yn,Yn=e;var r=nn;e=rn;var s=32-Ot(r)-1;r&=~(1<<s),n+=1;var i=32-Ot(t)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,nn=1<<32-Ot(t)+s|n<<s|r,rn=i+e}else nn=1<<i|n<<s|r,rn=e}function _l(e){e.return!==null&&(In(e,1),hp(e,1,0))}function Nl(e){for(;e===Rs;)Rs=or[--lr],or[lr]=null,Ts=or[--lr],or[lr]=null;for(;e===Yn;)Yn=St[--Ct],St[Ct]=null,rn=St[--Ct],St[Ct]=null,nn=St[--Ct],St[Ct]=null}var wt=null,bt=null,Ce=!1,Lt=null;function xp(e,t){var n=Mt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ed(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,wt=e,bt=jn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,wt=e,bt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Yn!==null?{id:nn,overflow:rn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Mt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,wt=e,bt=null,!0):!1;default:return!1}}function $o(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Po(e){if(Ce){var t=bt;if(t){var n=t;if(!ed(e,t)){if($o(e))throw Error(V(418));t=jn(n.nextSibling);var r=wt;t&&ed(e,t)?xp(r,n):(e.flags=e.flags&-4097|2,Ce=!1,wt=e)}}else{if($o(e))throw Error(V(418));e.flags=e.flags&-4097|2,Ce=!1,wt=e}}}function td(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;wt=e}function qa(e){if(e!==wt)return!1;if(!Ce)return td(e),Ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Co(e.type,e.memoizedProps)),t&&(t=bt)){if($o(e))throw vp(),Error(V(418));for(;t;)xp(e,t),t=jn(t.nextSibling)}if(td(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(V(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){bt=jn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}bt=null}}else bt=wt?jn(e.stateNode.nextSibling):null;return!0}function vp(){for(var e=bt;e;)e=jn(e.nextSibling)}function wr(){bt=wt=null,Ce=!1}function Sl(e){Lt===null?Lt=[e]:Lt.push(e)}var Dm=un.ReactCurrentBatchConfig;function Or(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(V(309));var r=n.stateNode}if(!r)throw Error(V(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(V(284));if(!n._owner)throw Error(V(290,e))}return e}function Qa(e,t){throw e=Object.prototype.toString.call(t),Error(V(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function nd(e){var t=e._init;return t(e._payload)}function yp(e){function t(v,x){if(e){var g=v.deletions;g===null?(v.deletions=[x],v.flags|=16):g.push(x)}}function n(v,x){if(!e)return null;for(;x!==null;)t(v,x),x=x.sibling;return null}function r(v,x){for(v=new Map;x!==null;)x.key!==null?v.set(x.key,x):v.set(x.index,x),x=x.sibling;return v}function s(v,x){return v=Cn(v,x),v.index=0,v.sibling=null,v}function i(v,x,g){return v.index=g,e?(g=v.alternate,g!==null?(g=g.index,g<x?(v.flags|=2,x):g):(v.flags|=2,x)):(v.flags|=1048576,x)}function o(v){return e&&v.alternate===null&&(v.flags|=2),v}function l(v,x,g,_){return x===null||x.tag!==6?(x=Hi(g,v.mode,_),x.return=v,x):(x=s(x,g),x.return=v,x)}function c(v,x,g,_){var j=g.type;return j===tr?p(v,x,g.props.children,_,g.key):x!==null&&(x.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===fn&&nd(j)===x.type)?(_=s(x,g.props),_.ref=Or(v,x,g),_.return=v,_):(_=vs(g.type,g.key,g.props,null,v.mode,_),_.ref=Or(v,x,g),_.return=v,_)}function d(v,x,g,_){return x===null||x.tag!==4||x.stateNode.containerInfo!==g.containerInfo||x.stateNode.implementation!==g.implementation?(x=Yi(g,v.mode,_),x.return=v,x):(x=s(x,g.children||[]),x.return=v,x)}function p(v,x,g,_,j){return x===null||x.tag!==7?(x=Vn(g,v.mode,_,j),x.return=v,x):(x=s(x,g),x.return=v,x)}function f(v,x,g){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Hi(""+x,v.mode,g),x.return=v,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Da:return g=vs(x.type,x.key,x.props,null,v.mode,g),g.ref=Or(v,null,x),g.return=v,g;case er:return x=Yi(x,v.mode,g),x.return=v,x;case fn:var _=x._init;return f(v,_(x._payload),g)}if(Hr(x)||Rr(x))return x=Vn(x,v.mode,g,null),x.return=v,x;Qa(v,x)}return null}function u(v,x,g,_){var j=x!==null?x.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return j!==null?null:l(v,x,""+g,_);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Da:return g.key===j?c(v,x,g,_):null;case er:return g.key===j?d(v,x,g,_):null;case fn:return j=g._init,u(v,x,j(g._payload),_)}if(Hr(g)||Rr(g))return j!==null?null:p(v,x,g,_,null);Qa(v,g)}return null}function m(v,x,g,_,j){if(typeof _=="string"&&_!==""||typeof _=="number")return v=v.get(g)||null,l(x,v,""+_,j);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Da:return v=v.get(_.key===null?g:_.key)||null,c(x,v,_,j);case er:return v=v.get(_.key===null?g:_.key)||null,d(x,v,_,j);case fn:var z=_._init;return m(v,x,g,z(_._payload),j)}if(Hr(_)||Rr(_))return v=v.get(g)||null,p(x,v,_,j,null);Qa(x,_)}return null}function w(v,x,g,_){for(var j=null,z=null,I=x,H=x=0,R=null;I!==null&&H<g.length;H++){I.index>H?(R=I,I=null):R=I.sibling;var b=u(v,I,g[H],_);if(b===null){I===null&&(I=R);break}e&&I&&b.alternate===null&&t(v,I),x=i(b,x,H),z===null?j=b:z.sibling=b,z=b,I=R}if(H===g.length)return n(v,I),Ce&&In(v,H),j;if(I===null){for(;H<g.length;H++)I=f(v,g[H],_),I!==null&&(x=i(I,x,H),z===null?j=I:z.sibling=I,z=I);return Ce&&In(v,H),j}for(I=r(v,I);H<g.length;H++)R=m(I,v,H,g[H],_),R!==null&&(e&&R.alternate!==null&&I.delete(R.key===null?H:R.key),x=i(R,x,H),z===null?j=R:z.sibling=R,z=R);return e&&I.forEach(function(N){return t(v,N)}),Ce&&In(v,H),j}function k(v,x,g,_){var j=Rr(g);if(typeof j!="function")throw Error(V(150));if(g=j.call(g),g==null)throw Error(V(151));for(var z=j=null,I=x,H=x=0,R=null,b=g.next();I!==null&&!b.done;H++,b=g.next()){I.index>H?(R=I,I=null):R=I.sibling;var N=u(v,I,b.value,_);if(N===null){I===null&&(I=R);break}e&&I&&N.alternate===null&&t(v,I),x=i(N,x,H),z===null?j=N:z.sibling=N,z=N,I=R}if(b.done)return n(v,I),Ce&&In(v,H),j;if(I===null){for(;!b.done;H++,b=g.next())b=f(v,b.value,_),b!==null&&(x=i(b,x,H),z===null?j=b:z.sibling=b,z=b);return Ce&&In(v,H),j}for(I=r(v,I);!b.done;H++,b=g.next())b=m(I,v,H,b.value,_),b!==null&&(e&&b.alternate!==null&&I.delete(b.key===null?H:b.key),x=i(b,x,H),z===null?j=b:z.sibling=b,z=b);return e&&I.forEach(function(C){return t(v,C)}),Ce&&In(v,H),j}function E(v,x,g,_){if(typeof g=="object"&&g!==null&&g.type===tr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Da:e:{for(var j=g.key,z=x;z!==null;){if(z.key===j){if(j=g.type,j===tr){if(z.tag===7){n(v,z.sibling),x=s(z,g.props.children),x.return=v,v=x;break e}}else if(z.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===fn&&nd(j)===z.type){n(v,z.sibling),x=s(z,g.props),x.ref=Or(v,z,g),x.return=v,v=x;break e}n(v,z);break}else t(v,z);z=z.sibling}g.type===tr?(x=Vn(g.props.children,v.mode,_,g.key),x.return=v,v=x):(_=vs(g.type,g.key,g.props,null,v.mode,_),_.ref=Or(v,x,g),_.return=v,v=_)}return o(v);case er:e:{for(z=g.key;x!==null;){if(x.key===z)if(x.tag===4&&x.stateNode.containerInfo===g.containerInfo&&x.stateNode.implementation===g.implementation){n(v,x.sibling),x=s(x,g.children||[]),x.return=v,v=x;break e}else{n(v,x);break}else t(v,x);x=x.sibling}x=Yi(g,v.mode,_),x.return=v,v=x}return o(v);case fn:return z=g._init,E(v,x,z(g._payload),_)}if(Hr(g))return w(v,x,g,_);if(Rr(g))return k(v,x,g,_);Qa(v,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,x!==null&&x.tag===6?(n(v,x.sibling),x=s(x,g),x.return=v,v=x):(n(v,x),x=Hi(g,v.mode,_),x.return=v,v=x),o(v)):n(v,x)}return E}var kr=yp(!0),bp=yp(!1),Ls=$n(null),Is=null,cr=null,Cl=null;function Ml(){Cl=cr=Is=null}function El(e){var t=Ls.current;Se(Ls),e._currentValue=t}function Ro(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function hr(e,t){Is=e,Cl=cr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(mt=!0),e.firstContext=null)}function zt(e){var t=e._currentValue;if(Cl!==e)if(e={context:e,memoizedValue:t,next:null},cr===null){if(Is===null)throw Error(V(308));cr=e,Is.dependencies={lanes:0,firstContext:e}}else cr=cr.next=e;return t}var Fn=null;function zl(e){Fn===null?Fn=[e]:Fn.push(e)}function wp(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,zl(t)):(n.next=s.next,s.next=n),t.interleaved=n,ln(e,r)}function ln(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var mn=!1;function $l(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function kp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function an(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function _n(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,xe&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,ln(e,n)}return s=r.interleaved,s===null?(t.next=t,zl(r)):(t.next=s.next,s.next=t),r.interleaved=t,ln(e,n)}function ps(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,hl(e,n)}}function rd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function As(e,t,n,r){var s=e.updateQueue;mn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=d:l.next=d,p.lastBaseUpdate=c))}if(i!==null){var f=s.baseState;o=0,p=d=c=null,l=i;do{var u=l.lane,m=l.eventTime;if((r&u)===u){p!==null&&(p=p.next={eventTime:m,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var w=e,k=l;switch(u=t,m=n,k.tag){case 1:if(w=k.payload,typeof w=="function"){f=w.call(m,f,u);break e}f=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=k.payload,u=typeof w=="function"?w.call(m,f,u):w,u==null)break e;f=ze({},f,u);break e;case 2:mn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else m={eventTime:m,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(d=p=m,c=f):p=p.next=m,o|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(p===null&&(c=f),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);Xn|=o,e.lanes=o,e.memoizedState=f}}function ad(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(V(191,s));s.call(r)}}}var $a={},Kt=$n($a),xa=$n($a),va=$n($a);function Dn(e){if(e===$a)throw Error(V(174));return e}function Pl(e,t){switch(_e(va,t),_e(xa,e),_e(Kt,$a),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:fo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=fo(t,e)}Se(Kt),_e(Kt,t)}function jr(){Se(Kt),Se(xa),Se(va)}function jp(e){Dn(va.current);var t=Dn(Kt.current),n=fo(t,e.type);t!==n&&(_e(xa,e),_e(Kt,n))}function Rl(e){xa.current===e&&(Se(Kt),Se(xa))}var Me=$n(0);function Os(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fi=[];function Tl(){for(var e=0;e<Fi.length;e++)Fi[e]._workInProgressVersionPrimary=null;Fi.length=0}var fs=un.ReactCurrentDispatcher,Di=un.ReactCurrentBatchConfig,Gn=0,Ee=null,Be=null,Xe=null,Fs=!1,na=!1,ya=0,Bm=0;function rt(){throw Error(V(321))}function Ll(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dt(e[n],t[n]))return!1;return!0}function Il(e,t,n,r,s,i){if(Gn=i,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fs.current=e===null||e.memoizedState===null?Hm:Ym,e=n(r,s),na){i=0;do{if(na=!1,ya=0,25<=i)throw Error(V(301));i+=1,Xe=Be=null,t.updateQueue=null,fs.current=Gm,e=n(r,s)}while(na)}if(fs.current=Ds,t=Be!==null&&Be.next!==null,Gn=0,Xe=Be=Ee=null,Fs=!1,t)throw Error(V(300));return e}function Al(){var e=ya!==0;return ya=0,e}function Yt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xe===null?Ee.memoizedState=Xe=e:Xe=Xe.next=e,Xe}function $t(){if(Be===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=Be.next;var t=Xe===null?Ee.memoizedState:Xe.next;if(t!==null)Xe=t,Be=e;else{if(e===null)throw Error(V(310));Be=e,e={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},Xe===null?Ee.memoizedState=Xe=e:Xe=Xe.next=e}return Xe}function ba(e,t){return typeof t=="function"?t(e):t}function Bi(e){var t=$t(),n=t.queue;if(n===null)throw Error(V(311));n.lastRenderedReducer=e;var r=Be,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,c=null,d=i;do{var p=d.lane;if((Gn&p)===p)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=f,o=r):c=c.next=f,Ee.lanes|=p,Xn|=p}d=d.next}while(d!==null&&d!==i);c===null?o=r:c.next=l,Dt(r,t.memoizedState)||(mt=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,Ee.lanes|=i,Xn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Wi(e){var t=$t(),n=t.queue;if(n===null)throw Error(V(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=e(i,o.action),o=o.next;while(o!==s);Dt(i,t.memoizedState)||(mt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function _p(){}function Np(e,t){var n=Ee,r=$t(),s=t(),i=!Dt(r.memoizedState,s);if(i&&(r.memoizedState=s,mt=!0),r=r.queue,Ol(Mp.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Xe!==null&&Xe.memoizedState.tag&1){if(n.flags|=2048,wa(9,Cp.bind(null,n,r,s,t),void 0,null),Ke===null)throw Error(V(349));Gn&30||Sp(n,t,s)}return s}function Sp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ee.updateQueue,t===null?(t={lastEffect:null,stores:null},Ee.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Cp(e,t,n,r){t.value=n,t.getSnapshot=r,Ep(t)&&zp(e)}function Mp(e,t,n){return n(function(){Ep(t)&&zp(e)})}function Ep(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dt(e,n)}catch{return!0}}function zp(e){var t=ln(e,1);t!==null&&Ft(t,e,1,-1)}function sd(e){var t=Yt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:e},t.queue=e,e=e.dispatch=Um.bind(null,Ee,e),[t.memoizedState,e]}function wa(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ee.updateQueue,t===null?(t={lastEffect:null,stores:null},Ee.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function $p(){return $t().memoizedState}function ms(e,t,n,r){var s=Yt();Ee.flags|=e,s.memoizedState=wa(1|t,n,void 0,r===void 0?null:r)}function li(e,t,n,r){var s=$t();r=r===void 0?null:r;var i=void 0;if(Be!==null){var o=Be.memoizedState;if(i=o.destroy,r!==null&&Ll(r,o.deps)){s.memoizedState=wa(t,n,i,r);return}}Ee.flags|=e,s.memoizedState=wa(1|t,n,i,r)}function id(e,t){return ms(8390656,8,e,t)}function Ol(e,t){return li(2048,8,e,t)}function Pp(e,t){return li(4,2,e,t)}function Rp(e,t){return li(4,4,e,t)}function Tp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Lp(e,t,n){return n=n!=null?n.concat([e]):null,li(4,4,Tp.bind(null,t,e),n)}function Fl(){}function Ip(e,t){var n=$t();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ll(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ap(e,t){var n=$t();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ll(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Op(e,t,n){return Gn&21?(Dt(n,t)||(n=Vu(),Ee.lanes|=n,Xn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,mt=!0),e.memoizedState=n)}function Wm(e,t){var n=we;we=n!==0&&4>n?n:4,e(!0);var r=Di.transition;Di.transition={};try{e(!1),t()}finally{we=n,Di.transition=r}}function Fp(){return $t().memoizedState}function Vm(e,t,n){var r=Sn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Dp(e))Bp(t,n);else if(n=wp(e,t,n,r),n!==null){var s=lt();Ft(n,e,r,s),Wp(n,t,r)}}function Um(e,t,n){var r=Sn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Dp(e))Bp(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Dt(l,o)){var c=t.interleaved;c===null?(s.next=s,zl(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=wp(e,t,s,r),n!==null&&(s=lt(),Ft(n,e,r,s),Wp(n,t,r))}}function Dp(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function Bp(e,t){na=Fs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Wp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,hl(e,n)}}var Ds={readContext:zt,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},Hm={readContext:zt,useCallback:function(e,t){return Yt().memoizedState=[e,t===void 0?null:t],e},useContext:zt,useEffect:id,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ms(4194308,4,Tp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ms(4194308,4,e,t)},useInsertionEffect:function(e,t){return ms(4,2,e,t)},useMemo:function(e,t){var n=Yt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Yt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Vm.bind(null,Ee,e),[r.memoizedState,e]},useRef:function(e){var t=Yt();return e={current:e},t.memoizedState=e},useState:sd,useDebugValue:Fl,useDeferredValue:function(e){return Yt().memoizedState=e},useTransition:function(){var e=sd(!1),t=e[0];return e=Wm.bind(null,e[1]),Yt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ee,s=Yt();if(Ce){if(n===void 0)throw Error(V(407));n=n()}else{if(n=t(),Ke===null)throw Error(V(349));Gn&30||Sp(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,id(Mp.bind(null,r,i,e),[e]),r.flags|=2048,wa(9,Cp.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Yt(),t=Ke.identifierPrefix;if(Ce){var n=rn,r=nn;n=(r&~(1<<32-Ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ya++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Bm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ym={readContext:zt,useCallback:Ip,useContext:zt,useEffect:Ol,useImperativeHandle:Lp,useInsertionEffect:Pp,useLayoutEffect:Rp,useMemo:Ap,useReducer:Bi,useRef:$p,useState:function(){return Bi(ba)},useDebugValue:Fl,useDeferredValue:function(e){var t=$t();return Op(t,Be.memoizedState,e)},useTransition:function(){var e=Bi(ba)[0],t=$t().memoizedState;return[e,t]},useMutableSource:_p,useSyncExternalStore:Np,useId:Fp,unstable_isNewReconciler:!1},Gm={readContext:zt,useCallback:Ip,useContext:zt,useEffect:Ol,useImperativeHandle:Lp,useInsertionEffect:Pp,useLayoutEffect:Rp,useMemo:Ap,useReducer:Wi,useRef:$p,useState:function(){return Wi(ba)},useDebugValue:Fl,useDeferredValue:function(e){var t=$t();return Be===null?t.memoizedState=e:Op(t,Be.memoizedState,e)},useTransition:function(){var e=Wi(ba)[0],t=$t().memoizedState;return[e,t]},useMutableSource:_p,useSyncExternalStore:Np,useId:Fp,unstable_isNewReconciler:!1};function Rt(e,t){if(e&&e.defaultProps){t=ze({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function To(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ze({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ci={isMounted:function(e){return(e=e._reactInternals)?Zn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=lt(),s=Sn(e),i=an(r,s);i.payload=t,n!=null&&(i.callback=n),t=_n(e,i,s),t!==null&&(Ft(t,e,s,r),ps(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=lt(),s=Sn(e),i=an(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=_n(e,i,s),t!==null&&(Ft(t,e,s,r),ps(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=lt(),r=Sn(e),s=an(n,r);s.tag=2,t!=null&&(s.callback=t),t=_n(e,s,r),t!==null&&(Ft(t,e,r,n),ps(t,e,r))}};function od(e,t,n,r,s,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!fa(n,r)||!fa(s,i):!0}function Vp(e,t,n){var r=!1,s=En,i=t.contextType;return typeof i=="object"&&i!==null?i=zt(i):(s=xt(t)?Hn:it.current,r=t.contextTypes,i=(r=r!=null)?br(e,s):En),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ci,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function ld(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ci.enqueueReplaceState(t,t.state,null)}function Lo(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},$l(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=zt(i):(i=xt(t)?Hn:it.current,s.context=br(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(To(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ci.enqueueReplaceState(s,s.state,null),As(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function _r(e,t){try{var n="",r=t;do n+=w0(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Vi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Io(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Xm=typeof WeakMap=="function"?WeakMap:Map;function Up(e,t,n){n=an(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ws||(Ws=!0,Yo=r),Io(e,t)},n}function Hp(e,t,n){n=an(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Io(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Io(e,t),typeof r!="function"&&(Nn===null?Nn=new Set([this]):Nn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function cd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Xm;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=lg.bind(null,e,t,n),t.then(e,e))}function dd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ud(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=an(-1,1),t.tag=2,_n(n,t,1))),n.lanes|=1),e)}var Km=un.ReactCurrentOwner,mt=!1;function ot(e,t,n,r){t.child=e===null?bp(t,null,n,r):kr(t,e.child,n,r)}function pd(e,t,n,r,s){n=n.render;var i=t.ref;return hr(t,s),r=Il(e,t,n,r,i,s),n=Al(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,cn(e,t,s)):(Ce&&n&&_l(t),t.flags|=1,ot(e,t,r,s),t.child)}function fd(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!Gl(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Yp(e,t,i,r,s)):(e=vs(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:fa,n(o,r)&&e.ref===t.ref)return cn(e,t,s)}return t.flags|=1,e=Cn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Yp(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(fa(i,r)&&e.ref===t.ref)if(mt=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(mt=!0);else return t.lanes=e.lanes,cn(e,t,s)}return Ao(e,t,n,r,s)}function Gp(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},_e(ur,yt),yt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,_e(ur,yt),yt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,_e(ur,yt),yt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,_e(ur,yt),yt|=r;return ot(e,t,s,n),t.child}function Xp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ao(e,t,n,r,s){var i=xt(n)?Hn:it.current;return i=br(t,i),hr(t,s),n=Il(e,t,n,r,i,s),r=Al(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,cn(e,t,s)):(Ce&&r&&_l(t),t.flags|=1,ot(e,t,n,s),t.child)}function md(e,t,n,r,s){if(xt(n)){var i=!0;Ps(t)}else i=!1;if(hr(t,s),t.stateNode===null)gs(e,t),Vp(t,n,r),Lo(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=zt(d):(d=xt(n)?Hn:it.current,d=br(t,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||c!==d)&&ld(t,o,r,d),mn=!1;var u=t.memoizedState;o.state=u,As(t,r,o,s),c=t.memoizedState,l!==r||u!==c||ht.current||mn?(typeof p=="function"&&(To(t,n,p,r),c=t.memoizedState),(l=mn||od(t,n,l,r,u,c,d))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=d,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,kp(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Rt(t.type,l),o.props=d,f=t.pendingProps,u=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=zt(c):(c=xt(n)?Hn:it.current,c=br(t,c));var m=n.getDerivedStateFromProps;(p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||u!==c)&&ld(t,o,r,c),mn=!1,u=t.memoizedState,o.state=u,As(t,r,o,s);var w=t.memoizedState;l!==f||u!==w||ht.current||mn?(typeof m=="function"&&(To(t,n,m,r),w=t.memoizedState),(d=mn||od(t,n,d,r,u,w,c)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),r=!1)}return Oo(e,t,n,r,i,s)}function Oo(e,t,n,r,s,i){Xp(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&Jc(t,n,!1),cn(e,t,i);r=t.stateNode,Km.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=kr(t,e.child,null,i),t.child=kr(t,null,l,i)):ot(e,t,l,i),t.memoizedState=r.state,s&&Jc(t,n,!0),t.child}function Kp(e){var t=e.stateNode;t.pendingContext?Zc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Zc(e,t.context,!1),Pl(e,t.containerInfo)}function gd(e,t,n,r,s){return wr(),Sl(s),t.flags|=256,ot(e,t,n,r),t.child}var Fo={dehydrated:null,treeContext:null,retryLane:0};function Do(e){return{baseLanes:e,cachePool:null,transitions:null}}function qp(e,t,n){var r=t.pendingProps,s=Me.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),_e(Me,s&1),e===null)return Po(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=pi(o,r,0,null),e=Vn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Do(n),t.memoizedState=Fo,e):Dl(t,o));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return qm(e,t,o,r,l,s,n);if(i){i=r.fallback,o=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Cn(s,c),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=Cn(l,i):(i=Vn(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Do(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Fo,r}return i=e.child,e=i.sibling,r=Cn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Dl(e,t){return t=pi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Za(e,t,n,r){return r!==null&&Sl(r),kr(t,e.child,null,n),e=Dl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function qm(e,t,n,r,s,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Vi(Error(V(422))),Za(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=pi({mode:"visible",children:r.children},s,0,null),i=Vn(i,s,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&kr(t,e.child,null,o),t.child.memoizedState=Do(o),t.memoizedState=Fo,i);if(!(t.mode&1))return Za(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(V(419)),r=Vi(i,r,void 0),Za(e,t,o,r)}if(l=(o&e.childLanes)!==0,mt||l){if(r=Ke,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,ln(e,s),Ft(r,e,s,-1))}return Yl(),r=Vi(Error(V(421))),Za(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=cg.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,bt=jn(s.nextSibling),wt=t,Ce=!0,Lt=null,e!==null&&(St[Ct++]=nn,St[Ct++]=rn,St[Ct++]=Yn,nn=e.id,rn=e.overflow,Yn=t),t=Dl(t,r.children),t.flags|=4096,t)}function hd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ro(e.return,t,n)}function Ui(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Qp(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(ot(e,t,r.children,n),r=Me.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hd(e,n,t);else if(e.tag===19)hd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(_e(Me,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Os(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Ui(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Os(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Ui(t,!0,n,null,i);break;case"together":Ui(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function gs(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function cn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Xn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(V(153));if(t.child!==null){for(e=t.child,n=Cn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Cn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Qm(e,t,n){switch(t.tag){case 3:Kp(t),wr();break;case 5:jp(t);break;case 1:xt(t.type)&&Ps(t);break;case 4:Pl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;_e(Ls,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(_e(Me,Me.current&1),t.flags|=128,null):n&t.child.childLanes?qp(e,t,n):(_e(Me,Me.current&1),e=cn(e,t,n),e!==null?e.sibling:null);_e(Me,Me.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Qp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),_e(Me,Me.current),r)break;return null;case 22:case 23:return t.lanes=0,Gp(e,t,n)}return cn(e,t,n)}var Zp,Bo,Jp,ef;Zp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Bo=function(){};Jp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Dn(Kt.current);var i=null;switch(n){case"input":s=lo(e,s),r=lo(e,r),i=[];break;case"select":s=ze({},s,{value:void 0}),r=ze({},r,{value:void 0}),i=[];break;case"textarea":s=po(e,s),r=po(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=zs)}mo(n,r);var o;n=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ia.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var c=r[d];if(l=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ia.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Ne("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};ef=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fr(e,t){if(!Ce)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function at(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Zm(e,t,n){var r=t.pendingProps;switch(Nl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return at(t),null;case 1:return xt(t.type)&&$s(),at(t),null;case 3:return r=t.stateNode,jr(),Se(ht),Se(it),Tl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(qa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Lt!==null&&(Ko(Lt),Lt=null))),Bo(e,t),at(t),null;case 5:Rl(t);var s=Dn(va.current);if(n=t.type,e!==null&&t.stateNode!=null)Jp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(V(166));return at(t),null}if(e=Dn(Kt.current),qa(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Gt]=t,r[ha]=i,e=(t.mode&1)!==0,n){case"dialog":Ne("cancel",r),Ne("close",r);break;case"iframe":case"object":case"embed":Ne("load",r);break;case"video":case"audio":for(s=0;s<Gr.length;s++)Ne(Gr[s],r);break;case"source":Ne("error",r);break;case"img":case"image":case"link":Ne("error",r),Ne("load",r);break;case"details":Ne("toggle",r);break;case"input":Nc(r,i),Ne("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Ne("invalid",r);break;case"textarea":Cc(r,i),Ne("invalid",r)}mo(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Ka(r.textContent,l,e),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Ka(r.textContent,l,e),s=["children",""+l]):ia.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Ne("scroll",r)}switch(n){case"input":Ba(r),Sc(r,i,!0);break;case"textarea":Ba(r),Mc(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=zs)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Mu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Gt]=t,e[ha]=r,Zp(e,t,!1,!1),t.stateNode=e;e:{switch(o=go(n,r),n){case"dialog":Ne("cancel",e),Ne("close",e),s=r;break;case"iframe":case"object":case"embed":Ne("load",e),s=r;break;case"video":case"audio":for(s=0;s<Gr.length;s++)Ne(Gr[s],e);s=r;break;case"source":Ne("error",e),s=r;break;case"img":case"image":case"link":Ne("error",e),Ne("load",e),s=r;break;case"details":Ne("toggle",e),s=r;break;case"input":Nc(e,r),s=lo(e,r),Ne("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=ze({},r,{value:void 0}),Ne("invalid",e);break;case"textarea":Cc(e,r),s=po(e,r),Ne("invalid",e);break;default:s=r}mo(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?$u(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Eu(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&oa(e,c):typeof c=="number"&&oa(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ia.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Ne("scroll",e):c!=null&&dl(e,i,c,o))}switch(n){case"input":Ba(e),Sc(e,r,!1);break;case"textarea":Ba(e),Mc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Mn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?pr(e,!!r.multiple,i,!1):r.defaultValue!=null&&pr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=zs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return at(t),null;case 6:if(e&&t.stateNode!=null)ef(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(V(166));if(n=Dn(va.current),Dn(Kt.current),qa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Gt]=t,(i=r.nodeValue!==n)&&(e=wt,e!==null))switch(e.tag){case 3:Ka(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ka(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Gt]=t,t.stateNode=r}return at(t),null;case 13:if(Se(Me),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ce&&bt!==null&&t.mode&1&&!(t.flags&128))vp(),wr(),t.flags|=98560,i=!1;else if(i=qa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(V(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(V(317));i[Gt]=t}else wr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;at(t),i=!1}else Lt!==null&&(Ko(Lt),Lt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Me.current&1?We===0&&(We=3):Yl())),t.updateQueue!==null&&(t.flags|=4),at(t),null);case 4:return jr(),Bo(e,t),e===null&&ma(t.stateNode.containerInfo),at(t),null;case 10:return El(t.type._context),at(t),null;case 17:return xt(t.type)&&$s(),at(t),null;case 19:if(Se(Me),i=t.memoizedState,i===null)return at(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)Fr(i,!1);else{if(We!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Os(e),o!==null){for(t.flags|=128,Fr(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return _e(Me,Me.current&1|2),t.child}e=e.sibling}i.tail!==null&&Ie()>Nr&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304)}else{if(!r)if(e=Os(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Ce)return at(t),null}else 2*Ie()-i.renderingStartTime>Nr&&n!==1073741824&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Ie(),t.sibling=null,n=Me.current,_e(Me,r?n&1|2:n&1),t):(at(t),null);case 22:case 23:return Hl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?yt&1073741824&&(at(t),t.subtreeFlags&6&&(t.flags|=8192)):at(t),null;case 24:return null;case 25:return null}throw Error(V(156,t.tag))}function Jm(e,t){switch(Nl(t),t.tag){case 1:return xt(t.type)&&$s(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return jr(),Se(ht),Se(it),Tl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Rl(t),null;case 13:if(Se(Me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(V(340));wr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Se(Me),null;case 4:return jr(),null;case 10:return El(t.type._context),null;case 22:case 23:return Hl(),null;case 24:return null;default:return null}}var Ja=!1,st=!1,eg=typeof WeakSet=="function"?WeakSet:Set,q=null;function dr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Re(e,t,r)}else n.current=null}function Wo(e,t,n){try{n()}catch(r){Re(e,t,r)}}var xd=!1;function tg(e,t){if(No=Cs,e=sp(),jl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,d=0,p=0,f=e,u=null;t:for(;;){for(var m;f!==n||s!==0&&f.nodeType!==3||(l=o+s),f!==i||r!==0&&f.nodeType!==3||(c=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)u=f,f=m;for(;;){if(f===e)break t;if(u===n&&++d===s&&(l=o),u===i&&++p===r&&(c=o),(m=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=m}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(So={focusedElem:e,selectionRange:n},Cs=!1,q=t;q!==null;)if(t=q,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,q=e;else for(;q!==null;){t=q;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var k=w.memoizedProps,E=w.memoizedState,v=t.stateNode,x=v.getSnapshotBeforeUpdate(t.elementType===t.type?k:Rt(t.type,k),E);v.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(V(163))}}catch(_){Re(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,q=e;break}q=t.return}return w=xd,xd=!1,w}function ra(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Wo(t,n,i)}s=s.next}while(s!==r)}}function di(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Vo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function tf(e){var t=e.alternate;t!==null&&(e.alternate=null,tf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Gt],delete t[ha],delete t[Eo],delete t[Am],delete t[Om])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function nf(e){return e.tag===5||e.tag===3||e.tag===4}function vd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||nf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Uo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=zs));else if(r!==4&&(e=e.child,e!==null))for(Uo(e,t,n),e=e.sibling;e!==null;)Uo(e,t,n),e=e.sibling}function Ho(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ho(e,t,n),e=e.sibling;e!==null;)Ho(e,t,n),e=e.sibling}var Je=null,Tt=!1;function pn(e,t,n){for(n=n.child;n!==null;)rf(e,t,n),n=n.sibling}function rf(e,t,n){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(ni,n)}catch{}switch(n.tag){case 5:st||dr(n,t);case 6:var r=Je,s=Tt;Je=null,pn(e,t,n),Je=r,Tt=s,Je!==null&&(Tt?(e=Je,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Je.removeChild(n.stateNode));break;case 18:Je!==null&&(Tt?(e=Je,n=n.stateNode,e.nodeType===8?Ai(e.parentNode,n):e.nodeType===1&&Ai(e,n),ua(e)):Ai(Je,n.stateNode));break;case 4:r=Je,s=Tt,Je=n.stateNode.containerInfo,Tt=!0,pn(e,t,n),Je=r,Tt=s;break;case 0:case 11:case 14:case 15:if(!st&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Wo(n,t,o),s=s.next}while(s!==r)}pn(e,t,n);break;case 1:if(!st&&(dr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Re(n,t,l)}pn(e,t,n);break;case 21:pn(e,t,n);break;case 22:n.mode&1?(st=(r=st)||n.memoizedState!==null,pn(e,t,n),st=r):pn(e,t,n);break;default:pn(e,t,n)}}function yd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new eg),t.forEach(function(r){var s=dg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Pt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Je=l.stateNode,Tt=!1;break e;case 3:Je=l.stateNode.containerInfo,Tt=!0;break e;case 4:Je=l.stateNode.containerInfo,Tt=!0;break e}l=l.return}if(Je===null)throw Error(V(160));rf(i,o,s),Je=null,Tt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){Re(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)af(t,e),t=t.sibling}function af(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pt(t,e),Ut(e),r&4){try{ra(3,e,e.return),di(3,e)}catch(k){Re(e,e.return,k)}try{ra(5,e,e.return)}catch(k){Re(e,e.return,k)}}break;case 1:Pt(t,e),Ut(e),r&512&&n!==null&&dr(n,n.return);break;case 5:if(Pt(t,e),Ut(e),r&512&&n!==null&&dr(n,n.return),e.flags&32){var s=e.stateNode;try{oa(s,"")}catch(k){Re(e,e.return,k)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Su(s,i),go(l,o);var d=go(l,i);for(o=0;o<c.length;o+=2){var p=c[o],f=c[o+1];p==="style"?$u(s,f):p==="dangerouslySetInnerHTML"?Eu(s,f):p==="children"?oa(s,f):dl(s,p,f,d)}switch(l){case"input":co(s,i);break;case"textarea":Cu(s,i);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?pr(s,!!i.multiple,m,!1):u!==!!i.multiple&&(i.defaultValue!=null?pr(s,!!i.multiple,i.defaultValue,!0):pr(s,!!i.multiple,i.multiple?[]:"",!1))}s[ha]=i}catch(k){Re(e,e.return,k)}}break;case 6:if(Pt(t,e),Ut(e),r&4){if(e.stateNode===null)throw Error(V(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(k){Re(e,e.return,k)}}break;case 3:if(Pt(t,e),Ut(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ua(t.containerInfo)}catch(k){Re(e,e.return,k)}break;case 4:Pt(t,e),Ut(e);break;case 13:Pt(t,e),Ut(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Vl=Ie())),r&4&&yd(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(st=(d=st)||p,Pt(t,e),st=d):Pt(t,e),Ut(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!p&&e.mode&1)for(q=e,p=e.child;p!==null;){for(f=q=p;q!==null;){switch(u=q,m=u.child,u.tag){case 0:case 11:case 14:case 15:ra(4,u,u.return);break;case 1:dr(u,u.return);var w=u.stateNode;if(typeof w.componentWillUnmount=="function"){r=u,n=u.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(k){Re(r,n,k)}}break;case 5:dr(u,u.return);break;case 22:if(u.memoizedState!==null){wd(f);continue}}m!==null?(m.return=u,q=m):wd(f)}p=p.sibling}e:for(p=null,f=e;;){if(f.tag===5){if(p===null){p=f;try{s=f.stateNode,d?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=f.stateNode,c=f.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=zu("display",o))}catch(k){Re(e,e.return,k)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(k){Re(e,e.return,k)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Pt(t,e),Ut(e),r&4&&yd(e);break;case 21:break;default:Pt(t,e),Ut(e)}}function Ut(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(nf(n)){var r=n;break e}n=n.return}throw Error(V(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(oa(s,""),r.flags&=-33);var i=vd(e);Ho(e,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=vd(e);Uo(e,l,o);break;default:throw Error(V(161))}}catch(c){Re(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ng(e,t,n){q=e,sf(e)}function sf(e,t,n){for(var r=(e.mode&1)!==0;q!==null;){var s=q,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Ja;if(!o){var l=s.alternate,c=l!==null&&l.memoizedState!==null||st;l=Ja;var d=st;if(Ja=o,(st=c)&&!d)for(q=s;q!==null;)o=q,c=o.child,o.tag===22&&o.memoizedState!==null?kd(s):c!==null?(c.return=o,q=c):kd(s);for(;i!==null;)q=i,sf(i),i=i.sibling;q=s,Ja=l,st=d}bd(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,q=i):bd(e)}}function bd(e){for(;q!==null;){var t=q;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:st||di(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!st)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Rt(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&ad(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ad(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&ua(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(V(163))}st||t.flags&512&&Vo(t)}catch(u){Re(t,t.return,u)}}if(t===e){q=null;break}if(n=t.sibling,n!==null){n.return=t.return,q=n;break}q=t.return}}function wd(e){for(;q!==null;){var t=q;if(t===e){q=null;break}var n=t.sibling;if(n!==null){n.return=t.return,q=n;break}q=t.return}}function kd(e){for(;q!==null;){var t=q;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{di(4,t)}catch(c){Re(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){Re(t,s,c)}}var i=t.return;try{Vo(t)}catch(c){Re(t,i,c)}break;case 5:var o=t.return;try{Vo(t)}catch(c){Re(t,o,c)}}}catch(c){Re(t,t.return,c)}if(t===e){q=null;break}var l=t.sibling;if(l!==null){l.return=t.return,q=l;break}q=t.return}}var rg=Math.ceil,Bs=un.ReactCurrentDispatcher,Bl=un.ReactCurrentOwner,Et=un.ReactCurrentBatchConfig,xe=0,Ke=null,Fe=null,et=0,yt=0,ur=$n(0),We=0,ka=null,Xn=0,ui=0,Wl=0,aa=null,ft=null,Vl=0,Nr=1/0,en=null,Ws=!1,Yo=null,Nn=null,es=!1,yn=null,Vs=0,sa=0,Go=null,hs=-1,xs=0;function lt(){return xe&6?Ie():hs!==-1?hs:hs=Ie()}function Sn(e){return e.mode&1?xe&2&&et!==0?et&-et:Dm.transition!==null?(xs===0&&(xs=Vu()),xs):(e=we,e!==0||(e=window.event,e=e===void 0?16:qu(e.type)),e):1}function Ft(e,t,n,r){if(50<sa)throw sa=0,Go=null,Error(V(185));Ma(e,n,r),(!(xe&2)||e!==Ke)&&(e===Ke&&(!(xe&2)&&(ui|=n),We===4&&xn(e,et)),vt(e,r),n===1&&xe===0&&!(t.mode&1)&&(Nr=Ie()+500,oi&&Pn()))}function vt(e,t){var n=e.callbackNode;D0(e,t);var r=Ss(e,e===Ke?et:0);if(r===0)n!==null&&$c(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&$c(n),t===1)e.tag===0?Fm(jd.bind(null,e)):gp(jd.bind(null,e)),Lm(function(){!(xe&6)&&Pn()}),n=null;else{switch(Uu(r)){case 1:n=gl;break;case 4:n=Bu;break;case 16:n=Ns;break;case 536870912:n=Wu;break;default:n=Ns}n=mf(n,of.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function of(e,t){if(hs=-1,xs=0,xe&6)throw Error(V(327));var n=e.callbackNode;if(xr()&&e.callbackNode!==n)return null;var r=Ss(e,e===Ke?et:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Us(e,r);else{t=r;var s=xe;xe|=2;var i=cf();(Ke!==e||et!==t)&&(en=null,Nr=Ie()+500,Wn(e,t));do try{ig();break}catch(l){lf(e,l)}while(!0);Ml(),Bs.current=i,xe=s,Fe!==null?t=0:(Ke=null,et=0,t=We)}if(t!==0){if(t===2&&(s=bo(e),s!==0&&(r=s,t=Xo(e,s))),t===1)throw n=ka,Wn(e,0),xn(e,r),vt(e,Ie()),n;if(t===6)xn(e,r);else{if(s=e.current.alternate,!(r&30)&&!ag(s)&&(t=Us(e,r),t===2&&(i=bo(e),i!==0&&(r=i,t=Xo(e,i))),t===1))throw n=ka,Wn(e,0),xn(e,r),vt(e,Ie()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(V(345));case 2:An(e,ft,en);break;case 3:if(xn(e,r),(r&130023424)===r&&(t=Vl+500-Ie(),10<t)){if(Ss(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){lt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Mo(An.bind(null,e,ft,en),t);break}An(e,ft,en);break;case 4:if(xn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-Ot(r);i=1<<o,o=t[o],o>s&&(s=o),r&=~i}if(r=s,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rg(r/1960))-r,10<r){e.timeoutHandle=Mo(An.bind(null,e,ft,en),r);break}An(e,ft,en);break;case 5:An(e,ft,en);break;default:throw Error(V(329))}}}return vt(e,Ie()),e.callbackNode===n?of.bind(null,e):null}function Xo(e,t){var n=aa;return e.current.memoizedState.isDehydrated&&(Wn(e,t).flags|=256),e=Us(e,t),e!==2&&(t=ft,ft=n,t!==null&&Ko(t)),e}function Ko(e){ft===null?ft=e:ft.push.apply(ft,e)}function ag(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Dt(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function xn(e,t){for(t&=~Wl,t&=~ui,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ot(t),r=1<<n;e[n]=-1,t&=~r}}function jd(e){if(xe&6)throw Error(V(327));xr();var t=Ss(e,0);if(!(t&1))return vt(e,Ie()),null;var n=Us(e,t);if(e.tag!==0&&n===2){var r=bo(e);r!==0&&(t=r,n=Xo(e,r))}if(n===1)throw n=ka,Wn(e,0),xn(e,t),vt(e,Ie()),n;if(n===6)throw Error(V(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,An(e,ft,en),vt(e,Ie()),null}function Ul(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===0&&(Nr=Ie()+500,oi&&Pn())}}function Kn(e){yn!==null&&yn.tag===0&&!(xe&6)&&xr();var t=xe;xe|=1;var n=Et.transition,r=we;try{if(Et.transition=null,we=1,e)return e()}finally{we=r,Et.transition=n,xe=t,!(xe&6)&&Pn()}}function Hl(){yt=ur.current,Se(ur)}function Wn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Tm(n)),Fe!==null)for(n=Fe.return;n!==null;){var r=n;switch(Nl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&$s();break;case 3:jr(),Se(ht),Se(it),Tl();break;case 5:Rl(r);break;case 4:jr();break;case 13:Se(Me);break;case 19:Se(Me);break;case 10:El(r.type._context);break;case 22:case 23:Hl()}n=n.return}if(Ke=e,Fe=e=Cn(e.current,null),et=yt=t,We=0,ka=null,Wl=ui=Xn=0,ft=aa=null,Fn!==null){for(t=0;t<Fn.length;t++)if(n=Fn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Fn=null}return e}function lf(e,t){do{var n=Fe;try{if(Ml(),fs.current=Ds,Fs){for(var r=Ee.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Fs=!1}if(Gn=0,Xe=Be=Ee=null,na=!1,ya=0,Bl.current=null,n===null||n.return===null){We=1,ka=t,Fe=null;break}e:{var i=e,o=n.return,l=n,c=t;if(t=et,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var m=dd(o);if(m!==null){m.flags&=-257,ud(m,o,l,i,t),m.mode&1&&cd(i,d,t),t=m,c=d;var w=t.updateQueue;if(w===null){var k=new Set;k.add(c),t.updateQueue=k}else w.add(c);break e}else{if(!(t&1)){cd(i,d,t),Yl();break e}c=Error(V(426))}}else if(Ce&&l.mode&1){var E=dd(o);if(E!==null){!(E.flags&65536)&&(E.flags|=256),ud(E,o,l,i,t),Sl(_r(c,l));break e}}i=c=_r(c,l),We!==4&&(We=2),aa===null?aa=[i]:aa.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var v=Up(i,c,t);rd(i,v);break e;case 1:l=c;var x=i.type,g=i.stateNode;if(!(i.flags&128)&&(typeof x.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Nn===null||!Nn.has(g)))){i.flags|=65536,t&=-t,i.lanes|=t;var _=Hp(i,l,t);rd(i,_);break e}}i=i.return}while(i!==null)}uf(n)}catch(j){t=j,Fe===n&&n!==null&&(Fe=n=n.return);continue}break}while(!0)}function cf(){var e=Bs.current;return Bs.current=Ds,e===null?Ds:e}function Yl(){(We===0||We===3||We===2)&&(We=4),Ke===null||!(Xn&268435455)&&!(ui&268435455)||xn(Ke,et)}function Us(e,t){var n=xe;xe|=2;var r=cf();(Ke!==e||et!==t)&&(en=null,Wn(e,t));do try{sg();break}catch(s){lf(e,s)}while(!0);if(Ml(),xe=n,Bs.current=r,Fe!==null)throw Error(V(261));return Ke=null,et=0,We}function sg(){for(;Fe!==null;)df(Fe)}function ig(){for(;Fe!==null&&!$0();)df(Fe)}function df(e){var t=ff(e.alternate,e,yt);e.memoizedProps=e.pendingProps,t===null?uf(e):Fe=t,Bl.current=null}function uf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Jm(n,t),n!==null){n.flags&=32767,Fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{We=6,Fe=null;return}}else if(n=Zm(n,t,yt),n!==null){Fe=n;return}if(t=t.sibling,t!==null){Fe=t;return}Fe=t=e}while(t!==null);We===0&&(We=5)}function An(e,t,n){var r=we,s=Et.transition;try{Et.transition=null,we=1,og(e,t,n,r)}finally{Et.transition=s,we=r}return null}function og(e,t,n,r){do xr();while(yn!==null);if(xe&6)throw Error(V(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(V(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(B0(e,i),e===Ke&&(Fe=Ke=null,et=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||es||(es=!0,mf(Ns,function(){return xr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Et.transition,Et.transition=null;var o=we;we=1;var l=xe;xe|=4,Bl.current=null,tg(e,n),af(n,e),Cm(So),Cs=!!No,So=No=null,e.current=n,ng(n),P0(),xe=l,we=o,Et.transition=i}else e.current=n;if(es&&(es=!1,yn=e,Vs=s),i=e.pendingLanes,i===0&&(Nn=null),L0(n.stateNode),vt(e,Ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ws)throw Ws=!1,e=Yo,Yo=null,e;return Vs&1&&e.tag!==0&&xr(),i=e.pendingLanes,i&1?e===Go?sa++:(sa=0,Go=e):sa=0,Pn(),null}function xr(){if(yn!==null){var e=Uu(Vs),t=Et.transition,n=we;try{if(Et.transition=null,we=16>e?16:e,yn===null)var r=!1;else{if(e=yn,yn=null,Vs=0,xe&6)throw Error(V(331));var s=xe;for(xe|=4,q=e.current;q!==null;){var i=q,o=i.child;if(q.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(q=d;q!==null;){var p=q;switch(p.tag){case 0:case 11:case 15:ra(8,p,i)}var f=p.child;if(f!==null)f.return=p,q=f;else for(;q!==null;){p=q;var u=p.sibling,m=p.return;if(tf(p),p===d){q=null;break}if(u!==null){u.return=m,q=u;break}q=m}}}var w=i.alternate;if(w!==null){var k=w.child;if(k!==null){w.child=null;do{var E=k.sibling;k.sibling=null,k=E}while(k!==null)}}q=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,q=o;else e:for(;q!==null;){if(i=q,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ra(9,i,i.return)}var v=i.sibling;if(v!==null){v.return=i.return,q=v;break e}q=i.return}}var x=e.current;for(q=x;q!==null;){o=q;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,q=g;else e:for(o=x;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:di(9,l)}}catch(j){Re(l,l.return,j)}if(l===o){q=null;break e}var _=l.sibling;if(_!==null){_.return=l.return,q=_;break e}q=l.return}}if(xe=s,Pn(),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(ni,e)}catch{}r=!0}return r}finally{we=n,Et.transition=t}}return!1}function _d(e,t,n){t=_r(n,t),t=Up(e,t,1),e=_n(e,t,1),t=lt(),e!==null&&(Ma(e,1,t),vt(e,t))}function Re(e,t,n){if(e.tag===3)_d(e,e,n);else for(;t!==null;){if(t.tag===3){_d(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Nn===null||!Nn.has(r))){e=_r(n,e),e=Hp(t,e,1),t=_n(t,e,1),e=lt(),t!==null&&(Ma(t,1,e),vt(t,e));break}}t=t.return}}function lg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=lt(),e.pingedLanes|=e.suspendedLanes&n,Ke===e&&(et&n)===n&&(We===4||We===3&&(et&130023424)===et&&500>Ie()-Vl?Wn(e,0):Wl|=n),vt(e,t)}function pf(e,t){t===0&&(e.mode&1?(t=Ua,Ua<<=1,!(Ua&130023424)&&(Ua=4194304)):t=1);var n=lt();e=ln(e,t),e!==null&&(Ma(e,t,n),vt(e,n))}function cg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),pf(e,n)}function dg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(V(314))}r!==null&&r.delete(t),pf(e,n)}var ff;ff=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ht.current)mt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return mt=!1,Qm(e,t,n);mt=!!(e.flags&131072)}else mt=!1,Ce&&t.flags&1048576&&hp(t,Ts,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;gs(e,t),e=t.pendingProps;var s=br(t,it.current);hr(t,n),s=Il(null,t,r,e,s,n);var i=Al();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,xt(r)?(i=!0,Ps(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,$l(t),s.updater=ci,t.stateNode=s,s._reactInternals=t,Lo(t,r,e,n),t=Oo(null,t,r,!0,i,n)):(t.tag=0,Ce&&i&&_l(t),ot(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(gs(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=pg(r),e=Rt(r,e),s){case 0:t=Ao(null,t,r,e,n);break e;case 1:t=md(null,t,r,e,n);break e;case 11:t=pd(null,t,r,e,n);break e;case 14:t=fd(null,t,r,Rt(r.type,e),n);break e}throw Error(V(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),Ao(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),md(e,t,r,s,n);case 3:e:{if(Kp(t),e===null)throw Error(V(387));r=t.pendingProps,i=t.memoizedState,s=i.element,kp(e,t),As(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=_r(Error(V(423)),t),t=gd(e,t,r,n,s);break e}else if(r!==s){s=_r(Error(V(424)),t),t=gd(e,t,r,n,s);break e}else for(bt=jn(t.stateNode.containerInfo.firstChild),wt=t,Ce=!0,Lt=null,n=bp(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(wr(),r===s){t=cn(e,t,n);break e}ot(e,t,r,n)}t=t.child}return t;case 5:return jp(t),e===null&&Po(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,o=s.children,Co(r,s)?o=null:i!==null&&Co(r,i)&&(t.flags|=32),Xp(e,t),ot(e,t,o,n),t.child;case 6:return e===null&&Po(t),null;case 13:return qp(e,t,n);case 4:return Pl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=kr(t,null,r,n):ot(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),pd(e,t,r,s,n);case 7:return ot(e,t,t.pendingProps,n),t.child;case 8:return ot(e,t,t.pendingProps.children,n),t.child;case 12:return ot(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,o=s.value,_e(Ls,r._currentValue),r._currentValue=o,i!==null)if(Dt(i.value,o)){if(i.children===s.children&&!ht.current){t=cn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=an(-1,n&-n),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?c.next=c:(c.next=p.next,p.next=c),d.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Ro(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(V(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Ro(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ot(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,hr(t,n),s=zt(s),r=r(s),t.flags|=1,ot(e,t,r,n),t.child;case 14:return r=t.type,s=Rt(r,t.pendingProps),s=Rt(r.type,s),fd(e,t,r,s,n);case 15:return Yp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),gs(e,t),t.tag=1,xt(r)?(e=!0,Ps(t)):e=!1,hr(t,n),Vp(t,r,s),Lo(t,r,s,n),Oo(null,t,r,!0,e,n);case 19:return Qp(e,t,n);case 22:return Gp(e,t,n)}throw Error(V(156,t.tag))};function mf(e,t){return Du(e,t)}function ug(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mt(e,t,n,r){return new ug(e,t,n,r)}function Gl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function pg(e){if(typeof e=="function")return Gl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pl)return 11;if(e===fl)return 14}return 2}function Cn(e,t){var n=e.alternate;return n===null?(n=Mt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function vs(e,t,n,r,s,i){var o=2;if(r=e,typeof e=="function")Gl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case tr:return Vn(n.children,s,i,t);case ul:o=8,s|=8;break;case ao:return e=Mt(12,n,t,s|2),e.elementType=ao,e.lanes=i,e;case so:return e=Mt(13,n,t,s),e.elementType=so,e.lanes=i,e;case io:return e=Mt(19,n,t,s),e.elementType=io,e.lanes=i,e;case ju:return pi(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case wu:o=10;break e;case ku:o=9;break e;case pl:o=11;break e;case fl:o=14;break e;case fn:o=16,r=null;break e}throw Error(V(130,e==null?e:typeof e,""))}return t=Mt(o,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function Vn(e,t,n,r){return e=Mt(7,e,r,t),e.lanes=n,e}function pi(e,t,n,r){return e=Mt(22,e,r,t),e.elementType=ju,e.lanes=n,e.stateNode={isHidden:!1},e}function Hi(e,t,n){return e=Mt(6,e,null,t),e.lanes=n,e}function Yi(e,t,n){return t=Mt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function fg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Si(0),this.expirationTimes=Si(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Si(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Xl(e,t,n,r,s,i,o,l,c){return e=new fg(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Mt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$l(i),e}function mg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:er,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function gf(e){if(!e)return En;e=e._reactInternals;e:{if(Zn(e)!==e||e.tag!==1)throw Error(V(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(xt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(V(171))}if(e.tag===1){var n=e.type;if(xt(n))return mp(e,n,t)}return t}function hf(e,t,n,r,s,i,o,l,c){return e=Xl(n,r,!0,e,s,i,o,l,c),e.context=gf(null),n=e.current,r=lt(),s=Sn(n),i=an(r,s),i.callback=t??null,_n(n,i,s),e.current.lanes=s,Ma(e,s,r),vt(e,r),e}function fi(e,t,n,r){var s=t.current,i=lt(),o=Sn(s);return n=gf(n),t.context===null?t.context=n:t.pendingContext=n,t=an(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=_n(s,t,o),e!==null&&(Ft(e,s,o,i),ps(e,s,o)),o}function Hs(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Nd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Kl(e,t){Nd(e,t),(e=e.alternate)&&Nd(e,t)}function gg(){return null}var xf=typeof reportError=="function"?reportError:function(e){console.error(e)};function ql(e){this._internalRoot=e}mi.prototype.render=ql.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(V(409));fi(e,t,null,null)};mi.prototype.unmount=ql.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kn(function(){fi(null,e,null,null)}),t[on]=null}};function mi(e){this._internalRoot=e}mi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Gu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<hn.length&&t!==0&&t<hn[n].priority;n++);hn.splice(n,0,e),n===0&&Ku(e)}};function Ql(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function gi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Sd(){}function hg(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var d=Hs(o);i.call(d)}}var o=hf(t,r,e,0,null,!1,!1,"",Sd);return e._reactRootContainer=o,e[on]=o.current,ma(e.nodeType===8?e.parentNode:e),Kn(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var d=Hs(c);l.call(d)}}var c=Xl(e,0,!1,null,null,!1,!1,"",Sd);return e._reactRootContainer=c,e[on]=c.current,ma(e.nodeType===8?e.parentNode:e),Kn(function(){fi(t,c,n,r)}),c}function hi(e,t,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var c=Hs(o);l.call(c)}}fi(t,o,e,s)}else o=hg(n,t,e,s,r);return Hs(o)}Hu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Yr(t.pendingLanes);n!==0&&(hl(t,n|1),vt(t,Ie()),!(xe&6)&&(Nr=Ie()+500,Pn()))}break;case 13:Kn(function(){var r=ln(e,1);if(r!==null){var s=lt();Ft(r,e,1,s)}}),Kl(e,1)}};xl=function(e){if(e.tag===13){var t=ln(e,134217728);if(t!==null){var n=lt();Ft(t,e,134217728,n)}Kl(e,134217728)}};Yu=function(e){if(e.tag===13){var t=Sn(e),n=ln(e,t);if(n!==null){var r=lt();Ft(n,e,t,r)}Kl(e,t)}};Gu=function(){return we};Xu=function(e,t){var n=we;try{return we=e,t()}finally{we=n}};xo=function(e,t,n){switch(t){case"input":if(co(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=ii(r);if(!s)throw Error(V(90));Nu(r),co(r,s)}}}break;case"textarea":Cu(e,n);break;case"select":t=n.value,t!=null&&pr(e,!!n.multiple,t,!1)}};Tu=Ul;Lu=Kn;var xg={usingClientEntryPoint:!1,Events:[za,sr,ii,Pu,Ru,Ul]},Dr={findFiberByHostInstance:On,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vg={bundleType:Dr.bundleType,version:Dr.version,rendererPackageName:Dr.rendererPackageName,rendererConfig:Dr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:un.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ou(e),e===null?null:e.stateNode},findFiberByHostInstance:Dr.findFiberByHostInstance||gg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ts=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ts.isDisabled&&ts.supportsFiber)try{ni=ts.inject(vg),Xt=ts}catch{}}jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xg;jt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ql(t))throw Error(V(200));return mg(e,t,null,n)};jt.createRoot=function(e,t){if(!Ql(e))throw Error(V(299));var n=!1,r="",s=xf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Xl(e,1,!1,null,null,n,!1,r,s),e[on]=t.current,ma(e.nodeType===8?e.parentNode:e),new ql(t)};jt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(V(188)):(e=Object.keys(e).join(","),Error(V(268,e)));return e=Ou(t),e=e===null?null:e.stateNode,e};jt.flushSync=function(e){return Kn(e)};jt.hydrate=function(e,t,n){if(!gi(t))throw Error(V(200));return hi(null,e,t,!0,n)};jt.hydrateRoot=function(e,t,n){if(!Ql(e))throw Error(V(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=xf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=hf(t,null,e,1,n??null,s,!1,i,o),e[on]=t.current,ma(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new mi(t)};jt.render=function(e,t,n){if(!gi(t))throw Error(V(200));return hi(null,e,t,!1,n)};jt.unmountComponentAtNode=function(e){if(!gi(e))throw Error(V(40));return e._reactRootContainer?(Kn(function(){hi(null,null,e,!1,function(){e._reactRootContainer=null,e[on]=null})}),!0):!1};jt.unstable_batchedUpdates=Ul;jt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!gi(n))throw Error(V(200));if(e==null||e._reactInternals===void 0)throw Error(V(38));return hi(e,t,n,!1,r)};jt.version="18.3.1-next-f1338f8080-20240426";function vf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vf)}catch(e){console.error(e)}}vf(),xu.exports=jt;var yg=xu.exports,Cd=yg;no.createRoot=Cd.createRoot,no.hydrateRoot=Cd.hydrateRoot;const Gi={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.settings":"Settings","nav.more":"More","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.settings":"設定","nav.more":"更多","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},yf=h.createContext(null);function bg({children:e}){const[t,n]=h.useState(()=>{const i=localStorage.getItem("language");return i&&Gi[i]?i:navigator.language.startsWith("zh")?"zh-TW":"en"}),r=h.useCallback(i=>{n(i),localStorage.setItem("language",i)},[]),s=h.useCallback((i,o)=>{let l=Gi[t][i]||Gi.en[i]||i;return o&&Object.entries(o).forEach(([c,d])=>{l=l.replace(`{${c}}`,String(d))}),l},[t]);return a.jsx(yf.Provider,{value:{language:t,setLanguage:r,t:s},children:e})}function Oe(){const e=h.useContext(yf);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}function wg(e={}){const{onMessage:t,onConnect:n,onDisconnect:r,onError:s,reconnectInterval:i=2e3,pingInterval:o=5e3}=e,l=h.useRef(null),c=h.useRef(null),d=h.useRef(null),p=h.useRef(t),[f,u]=h.useState({connected:!1,connecting:!1,lastMessageTime:0});p.current=t;const m=h.useCallback(()=>{const v=window.location.protocol==="https:"?"wss:":"ws:",x=window.location.host;return`${v}//${x}/ws`},[]),w=h.useCallback(()=>{var x;if(((x=l.current)==null?void 0:x.readyState)===WebSocket.OPEN)return;u(g=>({...g,connecting:!0}));const v=new WebSocket(m());l.current=v,v.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{v.readyState===WebSocket.OPEN&&v.send(JSON.stringify({type:"ping"}))},o)},v.onmessage=g=>{var _;try{const j=JSON.parse(g.data);u(z=>({...z,lastMessageTime:Date.now()})),(j.type==="initial"||j.type==="update")&&(_=j.data)!=null&&_.clusters&&p.current&&p.current(j.data.clusters)}catch(j){console.error("[WS] Failed to parse message:",j)}},v.onerror=g=>{console.error("[WS] Error:",g),s==null||s(g)},v.onclose=()=>{u(g=>({...g,connected:!1,connecting:!1})),r==null||r(),d.current&&(clearInterval(d.current),d.current=null),c.current&&clearTimeout(c.current),c.current=window.setTimeout(()=>{w()},i)}},[m,n,r,s,i,o]),k=h.useCallback(()=>{c.current&&(clearTimeout(c.current),c.current=null),d.current&&(clearInterval(d.current),d.current=null),l.current&&(l.current.close(),l.current=null)},[]),E=h.useCallback(v=>{var x;((x=l.current)==null?void 0:x.readyState)===WebSocket.OPEN&&l.current.send(JSON.stringify(v))},[]);return h.useEffect(()=>(w(),()=>{k()}),[w,k]),h.useEffect(()=>{const v=setInterval(()=>{const g=Date.now()-f.lastMessageTime;f.connected&&g>15e3&&(k(),w())},5e3);return()=>clearInterval(v)},[f.connected,f.lastMessageTime,w,k]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:E,reconnect:w,disconnect:k}}const kg="/api";async function Ht(e,t){const n=await fetch(`${kg}${e}`,{headers:{"Content-Type":"application/json"},...t});if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}return n.json()}const Ys={getConfig:()=>Ht("/config"),updateConfig:e=>Ht("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Ht("/clusters"),getCluster:e=>Ht(`/clusters/${e}`),getSummary:()=>Ht("/summary"),getNodes:e=>Ht(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Ht(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Ht(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Ht(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Ht("/health")};function ve(e,t=1){if(e===0)return"0 B";const n=1024,r=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${r[s]}`}function Ae(e,t=1){return`${e.toFixed(t)}%`}function xi(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),r=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),r>0&&s.push(`${r}m`),s.length>0?s.join(" "):"< 1m"}function pe(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function qo(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function jg({value:e,suffix:t="",className:n=""}){const r=m=>{if(typeof m=="number")return{left:m,isRatio:!1};const w=String(m).match(/^(\d+)\/(\d+)$/);if(w)return{left:parseInt(w[1]),right:parseInt(w[2]),isRatio:!0};const k=parseFloat(String(m));return isNaN(k)?{left:0,isRatio:!1}:{left:k,isRatio:!1}},s=r(e),[i,o]=h.useState(0),[l,c]=h.useState(s.right||0),d=h.useRef(null),p=h.useRef(0),f=h.useRef(!0);h.useEffect(()=>{const m=r(e),w=800,k=f.current?0:i,E=f.current?0:l;f.current=!1,d.current=null;const v=x=>{d.current||(d.current=x);const g=x-d.current,_=Math.min(g/w,1),j=1-Math.pow(1-_,3),z=k+(m.left-k)*j;if(o(Math.round(z)),m.isRatio&&m.right!==void 0){const I=E+(m.right-E)*j;c(Math.round(I))}_<1?p.current=requestAnimationFrame(v):(o(m.left),m.right!==void 0&&c(m.right))};return p.current=requestAnimationFrame(v),()=>{p.current&&cancelAnimationFrame(p.current)}},[e]);const u=s.isRatio?`${i}/${l}`:i;return a.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&a.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function Md({value:e,decimals:t=0,className:n=""}){const[r,s]=h.useState(0),i=h.useRef(null),o=h.useRef(0),l=h.useRef(!0);return h.useEffect(()=>{const d=l.current?0:r;l.current=!1,i.current=null;const p=f=>{i.current||(i.current=f);const u=f-i.current,m=Math.min(u/800,1),w=1-Math.pow(1-m,3),k=d+(e-d)*w;s(k),m<1?o.current=requestAnimationFrame(p):s(e)};return o.current=requestAnimationFrame(p),()=>{o.current&&cancelAnimationFrame(o.current)}},[e]),a.jsxs("span",{className:n,children:[r.toFixed(t),"%"]})}function Xi({left:e,right:t,className:n=""}){const[r,s]=h.useState(0),[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const f=d.current?0:r,u=d.current?0:i;d.current=!1,l.current=null;const m=w=>{l.current||(l.current=w);const k=w-l.current,E=Math.min(k/800,1),v=1-Math.pow(1-E,3);s(Math.round(f+(e-f)*v)),o(Math.round(u+(t-u)*v)),E<1?c.current=requestAnimationFrame(m):(s(e),o(t))};return c.current=requestAnimationFrame(m),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),a.jsxs("span",{className:n,children:[r,"/",i]})}function ns({label:e,value:t,suffix:n,subValue:r,color:s="primary",icon:i}){return a.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[i&&a.jsx("div",{className:"stat-icon",children:i}),a.jsxs("div",{className:"stat-content",children:[a.jsx("div",{className:"stat-label",children:e}),a.jsx(jg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),r&&a.jsx("div",{className:"stat-sub",children:r})]})]})}function Ki({value:e,label:t,color:n,size:r=100}){const[s,i]=h.useState(0),o=h.useRef(null),l=h.useRef(0),c=h.useRef(!0);h.useEffect(()=>{const v=c.current?0:s;c.current=!1,o.current=null;const x=g=>{o.current||(o.current=g);const _=g-o.current,j=Math.min(_/1e3,1),z=1-Math.pow(1-j,3),I=v+(e-v)*z;i(I),j<1?l.current=requestAnimationFrame(x):i(e)};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e]);const d=5,p=(r-d*4)/2-8,f=(r-d)/2,u=p+(f-p)/2,m=2*Math.PI*u,w=m-s/100*m,k=Array.from({length:36},(E,v)=>{const x=(v*10-90)*(Math.PI/180),g=v%3===0,_=g?6:3,j=f-2,z=j-_;return{x1:r/2+Math.cos(x)*j,y1:r/2+Math.sin(x)*j,x2:r/2+Math.cos(x)*z,y2:r/2+Math.sin(x)*z,isMajor:g}});return a.jsxs("div",{className:"ring-gauge",children:[a.jsxs("svg",{viewBox:`0 0 ${r} ${r}`,className:"ring-svg",children:[a.jsx("circle",{className:"ring-outer-deco",cx:r/2,cy:r/2,r:f,strokeWidth:1}),k.map((E,v)=>a.jsx("line",{x1:E.x1,y1:E.y1,x2:E.x2,y2:E.y2,className:`ring-tick ${E.isMajor?"major":""}`},v)),a.jsx("circle",{className:"ring-bg",cx:r/2,cy:r/2,r:u,strokeWidth:d}),a.jsx("circle",{className:"ring-inner-deco",cx:r/2,cy:r/2,r:p,strokeWidth:1}),a.jsx("circle",{className:`ring-fill ${n}`,cx:r/2,cy:r/2,r:u,strokeWidth:d,strokeDasharray:m,strokeDashoffset:w,transform:`rotate(-90 ${r/2} ${r/2})`}),a.jsx("line",{className:"ring-sweep",x1:r/2,y1:r/2,x2:r/2,y2:r/2-u-4,transform:`rotate(${s/100*360-90} ${r/2} ${r/2})`})]}),a.jsxs("div",{className:"ring-content",children:[a.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),a.jsx("span",{className:"ring-percent",children:"%"})]}),a.jsx("span",{className:"ring-label",children:t})]})]})}function _g({cluster:e,onClick:t}){var c,d;const{t:n}=Oe(),r=e.summary;if(!r)return null;const s=pe(r.total_cpu_usage),i=pe(r.total_memory_usage),o=r.alerts_warning>0,l=r.alerts_critical>0;return a.jsxs("div",{className:`cluster-hex-card ${l?"critical":o?"warning":""}`,onClick:t,children:[a.jsxs("div",{className:"cluster-hex-inner",children:[a.jsxs("div",{className:"cluster-hex-header",children:[a.jsxs("div",{className:"cluster-hex-title",children:[a.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),r.is_standalone&&a.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),a.jsx("span",{className:`cluster-hex-status ${r.status==="connected"?"online":"offline"}`})]}),a.jsxs("div",{className:"cluster-hex-metrics",children:[a.jsxs("div",{className:"cluster-hex-metric",children:[a.jsx("span",{className:"metric-label",children:"CPU"}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${r.total_cpu_usage}%`}})}),a.jsx(Md,{value:r.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),a.jsxs("div",{className:"cluster-hex-metric",children:[a.jsx("span",{className:"metric-label",children:"MEM"}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-bar-fill ${i}`,style:{width:`${r.total_memory_usage}%`}})}),a.jsx(Md,{value:r.total_memory_usage,decimals:0,className:`metric-value small text-${i}`})]})]}),a.jsxs("div",{className:"cluster-hex-stats",children:[a.jsxs("div",{className:"hex-stat",children:[a.jsx(Xi,{left:r.nodes_online,right:r.node_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),a.jsxs("div",{className:"hex-stat",children:[a.jsx(Xi,{left:r.vms_running,right:r.vm_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),a.jsxs("div",{className:"hex-stat",children:[a.jsx(Xi,{left:r.cts_running,right:r.ct_count,className:"hex-stat-value"}),a.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),r.has_ceph&&a.jsx("div",{className:"cluster-hex-ceph",children:a.jsxs("span",{className:`ceph-badge ${((c=r.ceph_health)==null?void 0:c.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=r.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function Ed({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:r=!1}){const{t:s}=Oe(),i=h.useMemo(()=>Object.entries(e),[e]),o=h.useMemo(()=>{let l=0,c=0,d=0,p=0;return Object.values(e).forEach(f=>{f.summary&&(l+=f.summary.total_cpu_usage||0,c+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,p++)}),{avgCpu:p>0?l/p:0,avgMem:p>0?c/p:0,avgStorage:p>0?d/p:0}},[e]);return a.jsxs("div",{className:"command-center",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"cc-header",children:[a.jsx("h1",{className:"cc-title font-display",children:a.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),a.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),a.jsxs("div",{className:"cc-content",children:[a.jsxs("div",{className:"cc-top-row",children:[a.jsxs("div",{className:"cc-gauges panel panel-scan",children:[a.jsx("div",{className:"panel-header",children:a.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),a.jsxs("div",{className:"gauges-container",children:[a.jsx(Ki,{value:o.avgCpu,label:s("metric.cpu"),color:pe(o.avgCpu),size:110}),a.jsx(Ki,{value:o.avgMem,label:s("metric.memory"),color:pe(o.avgMem),size:110}),a.jsx(Ki,{value:o.avgStorage,label:s("metric.disk"),color:pe(o.avgStorage),size:110})]})]}),a.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[a.jsx("div",{className:"panel-header",children:a.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),a.jsxs("div",{className:"stats-grid",children:[a.jsx(ns,{label:s("cluster.total"),value:t.total_clusters,icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),a.jsx(ns,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),a.jsx("path",{d:"M8 21h8M12 17v4"})]})}),a.jsx(ns,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18M9 3v18"})]})}),a.jsx(ns,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),a.jsxs("div",{className:"cc-galaxy",children:[a.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),a.jsx("div",{className:"galaxy-container",children:i.length===0?a.jsxs("div",{className:"no-clusters",children:[a.jsx("div",{className:"no-clusters-icon",children:a.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 6v6l4 2"})]})}),a.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),a.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):a.jsx("div",{className:"cluster-grid",children:i.map(([l,c])=>a.jsx(_g,{cluster:c,onClick:()=>n(l)},l))})})]})]}),a.jsx("style",{children:`
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
      `})]})}function Ng(e,t,n){const r=Math.min(e,100)/100,s=.1+r*.6,i=t;let o=(Math.random()-.5)*.02;if(i>.08&&i<.22){const l=(i-.08)/.14;o+=s*.2*Math.sin(l*Math.PI)}if(i>.24&&i<.4){const l=(i-.24)/.16;if(l<.2)o-=s*.15*Math.sin(l*5*Math.PI);else if(l<.5){const c=(l-.2)/.3;o+=s*(1+r*.5)*Math.sin(c*Math.PI)}else if(l<.7){const c=(l-.5)/.2;o-=s*.25*Math.sin(c*Math.PI)}}if(i>.48&&i<.72){const l=(i-.48)/.24;o+=s*.35*Math.sin(l*Math.PI)}return o*n}function qi({value:e,label:t,color:n,isOnline:r,width:s=180,height:i=35,isPaused:o=!1}){const l=h.useRef(null),c=h.useRef(null),d=h.useRef([]),p=h.useRef(0),f=h.useRef(0),u=h.useRef(0),m=h.useRef(0),w=h.useRef(!o),k=h.useRef(!1),v=6e4/(50+e/100*50),x=12;h.useEffect(()=>{w.current=!o},[o]);const g=h.useCallback(()=>{const j=c.current;if(!j)return;j.fillStyle="rgba(5, 8, 15, 0.95)",j.fillRect(0,0,s,i),j.strokeStyle="rgba(0, 240, 255, 0.08)",j.lineWidth=.5;for(let C=0;C<i;C+=10)j.beginPath(),j.moveTo(0,C),j.lineTo(s,C),j.stroke();for(let C=0;C<s;C+=10)j.beginPath(),j.moveTo(C,0),j.lineTo(C,i),j.stroke();const z=i/2,I=i*.45,R=!r||e>90?"#ff0040":e>70?"#ff6b00":n;j.shadowColor=R,j.shadowBlur=6,j.strokeStyle=R,j.lineWidth=1.5,j.lineCap="round",j.lineJoin="round",j.beginPath();let b=!1;for(let C=0;C<s;C++){const L=(C-p.current+s)%s;if(L<8&&L>0)continue;const A=z-d.current[C]*I;b?j.lineTo(C,A):(j.moveTo(C,A),b=!0)}j.stroke(),j.shadowBlur=0,j.strokeStyle=`${R}60`,j.lineWidth=2,j.beginPath(),j.moveTo(p.current,0),j.lineTo(p.current,i),j.stroke();const N=j.createLinearGradient(p.current-15,0,p.current,0);N.addColorStop(0,"transparent"),N.addColorStop(1,`${R}30`),j.fillStyle=N,j.fillRect(p.current-15,0,15,i)},[s,i,e,r,n]);h.useEffect(()=>{const j=l.current;if(!j)return;const z=j.getContext("2d");if(!z)return;const I=window.devicePixelRatio||1;j.width=s*I,j.height=i*I,z.scale(I,I),c.current=z,d.current.length!==s&&(d.current=new Array(s).fill(0)),k.current=!0,g()},[s,i,g]),h.useEffect(()=>{if(!k.current||!c.current)return;const z=I=>{m.current||(m.current=I);const H=I-m.current;m.current=I;const R=H/1e3*x;f.current+=H/v,f.current>=1&&(f.current-=1);const b=Math.ceil(R);for(let N=0;N<b;N++){const L=(f.current+N/b*(H/v))%1;let A;r?A=Ng(e,L,1):A=(Math.random()-.5)*.01,p.current=(p.current+1)%s,d.current[p.current]=A;const Y=(p.current+1)%s;for(let te=0;te<8;te++){const O=(Y+te)%s;d.current[O]=0}}g(),w.current&&(u.current=requestAnimationFrame(z))};return o||(m.current=0,u.current=requestAnimationFrame(z)),()=>{cancelAnimationFrame(u.current)}},[s,i,e,r,v,x,o,g]);const _=()=>!r||e>90?"#ff0040":e>70?"#ff6b00":n;return a.jsxs("div",{className:"ecg-trace",children:[a.jsxs("div",{className:"ecg-trace-header",children:[a.jsx("span",{className:"ecg-trace-label",style:{color:_()},children:t}),a.jsx("span",{className:"ecg-trace-value",style:{color:_()},children:r?`${Math.round(e)}%`:"--"})]}),a.jsx("canvas",{ref:l,style:{width:s,height:i,display:"block"}}),a.jsx("style",{children:`
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
      `})]})}function Sg({cpu:e,memory:t,diskIO:n,isOnline:r,isPaused:s=!1}){const i=h.useRef(null),[o,l]=h.useState(180);return h.useEffect(()=>{const c=i.current;if(!c)return;const d=()=>{const f=c.clientWidth-6;f>0&&l(f)};d();const p=new ResizeObserver(d);return p.observe(c),()=>p.disconnect()},[]),a.jsxs("div",{className:"ecg-monitor-stack",ref:i,children:[a.jsx(qi,{value:e,label:"CPU",color:"#00f0ff",isOnline:r,width:o,height:32,isPaused:s}),a.jsx(qi,{value:t,label:"MEM",color:"#00ff88",isOnline:r,width:o,height:32,isPaused:s}),a.jsx(qi,{value:n,label:"IOW",color:"#ffd700",isOnline:r,width:o,height:32,isPaused:s}),a.jsx("style",{children:`
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
      `})]})}function zd(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function $d({value:e,decimals:t=0,suffix:n="",duration:r=800,className:s=""}){const[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const p=d.current?0:i;d.current=!1,l.current=null;const f=u=>{l.current||(l.current=u);const m=u-l.current,w=Math.min(m/r,1),k=1-Math.pow(1-w,3),E=p+(e-p)*k;o(E),w<1?c.current=requestAnimationFrame(f):o(e)};return c.current=requestAnimationFrame(f),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,r]),a.jsxs("span",{className:s,children:[i.toFixed(t),n]})}function Pd({left:e,right:t,className:n=""}){const[r,s]=h.useState(0),[i,o]=h.useState(0),l=h.useRef(null),c=h.useRef(0),d=h.useRef(!0);return h.useEffect(()=>{const f=d.current?0:r,u=d.current?0:i;d.current=!1,l.current=null;const m=w=>{l.current||(l.current=w);const k=w-l.current,E=Math.min(k/800,1),v=1-Math.pow(1-E,3);s(Math.round(f+(e-f)*v)),o(Math.round(u+(t-u)*v)),E<1?c.current=requestAnimationFrame(m):(s(e),o(t))};return c.current=requestAnimationFrame(m),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),a.jsxs("span",{className:n,children:[r,"/",i]})}function Cg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Mg(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Eg({state:e,onClose:t,onShowDetails:n,getNodeHealth:r}){const{t:s}=Oe();if(h.useEffect(()=>{const f=()=>t(),u=()=>t(),m=w=>{w.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",u,!0),document.addEventListener("keydown",m)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",u,!0),document.removeEventListener("keydown",m)}},[e.visible,t]),!e.visible||!e.node)return null;const i=e.node,o=i.status==="online",l=r(e.clusterId,i.node),c=l?`https://${l.host}:${l.port}/#v1:0:=node/${i.node}`:null,d=f=>{f.stopPropagation(),c&&window.open(c,"_blank","noopener,noreferrer"),t()},p=f=>{f.stopPropagation(),n(),t()};return a.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[a.jsxs("div",{className:"context-menu-header",children:[a.jsx("span",{className:`context-status ${o?"online":"offline"}`}),a.jsx("span",{className:"context-menu-name",children:i.node})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("button",{className:"context-menu-item",onClick:p,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:s("vm.details")})]}),c&&a.jsxs("button",{className:"context-menu-item",onClick:d,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),a.jsx("polyline",{points:"15,3 21,3 21,9"}),a.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),a.jsx("span",{children:s("node.open_pve")})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("div",{className:"context-menu-info",children:[a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("node.status"),":"]}),a.jsx("span",{className:o?"text-success":"text-danger",children:o?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("metric.cpu"),":"]}),a.jsxs("span",{children:[i.cpu.cores," ",s("node.cores")]})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("metric.memory"),":"]}),a.jsx("span",{children:ve(i.memory.total_bytes)})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("cluster.vms_short"),":"]}),a.jsx("span",{children:i.vm_count})]}),a.jsxs("div",{className:"info-row",children:[a.jsxs("span",{children:[s("cluster.cts_short"),":"]}),a.jsx("span",{children:i.ct_count})]})]})]})}function zg({cpuUsage:e,memUsage:t,compact:n,label:r="AVG LOAD"}){const s=(e+t)/2,i=pe(s),o=.3+s/100*.7,[l,c]=h.useState(0),d=h.useRef(null),p=h.useRef(0),f=h.useRef(!0);return h.useEffect(()=>{const m=f.current?0:l;f.current=!1,d.current=null;const w=k=>{d.current||(d.current=k);const E=k-d.current,v=Math.min(E/1e3,1),x=1-Math.pow(1-v,3),g=m+(s-m)*x;c(g),v<1?p.current=requestAnimationFrame(w):c(s)};return p.current=requestAnimationFrame(w),()=>{p.current&&cancelAnimationFrame(p.current)}},[s]),a.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[a.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[a.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),a.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${i})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${o*10}px var(--${i}))`,transition:"all 0.5s ease"}}),a.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),a.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${i})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${o*15}px var(--${i}))`}}),a.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${i})`,style:{textShadow:`0 0 10px var(--${i})`},children:[l.toFixed(0),"%"]}),a.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:r})]}),a.jsx("div",{className:"reactor-pulse",style:{opacity:o*.3}})]})}function $g({node:e,onClick:t,onContextMenu:n,clusterName:r,isPaused:s=!1}){pe(e.cpu.usage_percent),pe(e.memory.used_bytes/e.memory.total_bytes*100);const i=e.status==="online";return a.jsxs("div",{className:`node-card ${i?"":"offline"}`,onClick:t,onContextMenu:n,children:[a.jsxs("div",{className:"node-header",children:[a.jsx("span",{className:`node-status ${i?"online":"offline"}`}),a.jsx("span",{className:"node-name",children:e.node}),r&&a.jsx("span",{className:"node-cluster-tag",children:r})]}),a.jsx("div",{className:"node-ecg-container",children:a.jsx(Sg,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:i,isPaused:s})}),a.jsxs("div",{className:"node-info",children:[a.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),a.jsx("span",{className:"node-info-item",children:xi(e.uptime)})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function Pg({node:e,storages:t,onClose:n}){const{t:r}=Oe(),s=e.status==="online",i=e.cpu.usage_percent,o=e.memory.used_bytes/e.memory.total_bytes*100,l=e.disk.used_bytes/e.disk.total_bytes*100;return a.jsx("div",{className:"node-detail-overlay",onClick:n,children:a.jsxs("div",{className:"node-detail-panel",onClick:c=>c.stopPropagation(),children:[a.jsxs("div",{className:"detail-header",children:[a.jsxs("div",{className:"detail-title",children:[a.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),a.jsx("h2",{children:e.node}),a.jsx("span",{className:"detail-tag",children:s?r("node.online").toUpperCase():r("node.offline").toUpperCase()})]}),a.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),a.jsxs("div",{className:"detail-body",children:[a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.system_info")}),a.jsxs("div",{className:"info-grid",children:[a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.kernel")}),a.jsx("span",{className:"info-value",children:Mg(e.kernel_version)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.pve_version")}),a.jsx("span",{className:"info-value",children:Cg(e.pve_version)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.uptime")}),a.jsx("span",{className:"info-value",children:xi(e.uptime)})]}),a.jsxs("div",{className:"info-item",children:[a.jsx("span",{className:"info-label",children:r("node.workloads")}),a.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.resource_usage")}),a.jsxs("div",{className:"resource-bars",children:[a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("metric.cpu")}),a.jsx("span",{className:`resource-value text-${pe(i)}`,children:Ae(i,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${pe(i)}`,style:{width:`${i}%`}})}),a.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",r("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("node.io_wait")}),a.jsx("span",{className:`resource-value text-${zd(e.cpu.iowait)}`,children:Ae(e.cpu.iowait,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${zd(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),a.jsx("span",{className:"resource-detail",children:r("node.io_wait_desc")})]}),a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("metric.memory")}),a.jsx("span",{className:`resource-value text-${pe(o)}`,children:Ae(o,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${pe(o)}`,style:{width:`${o}%`}})}),a.jsxs("span",{className:"resource-detail",children:[ve(e.memory.used_bytes)," / ",ve(e.memory.total_bytes)]})]}),a.jsxs("div",{className:"resource-bar-item",children:[a.jsxs("div",{className:"resource-header",children:[a.jsx("span",{className:"resource-label",children:r("node.root_disk")}),a.jsx("span",{className:`resource-value text-${pe(l)}`,children:Ae(l,1)})]}),a.jsx("div",{className:"resource-track",children:a.jsx("div",{className:`resource-fill ${pe(l)}`,style:{width:`${l}%`}})}),a.jsxs("span",{className:"resource-detail",children:[ve(e.disk.used_bytes)," / ",ve(e.disk.total_bytes)]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{className:"section-title",children:r("node.network_io")}),a.jsxs("div",{className:"network-stats",children:[a.jsxs("div",{className:"net-stat",children:[a.jsxs("span",{className:"net-direction",children:["↓ ",r("metric.rx")]}),a.jsxs("span",{className:"net-value",children:[ve(e.network.rx_bytes_sec),"/s"]})]}),a.jsxs("div",{className:"net-stat",children:[a.jsxs("span",{className:"net-direction",children:["↑ ",r("metric.tx")]}),a.jsxs("span",{className:"net-value",children:[ve(e.network.tx_bytes_sec),"/s"]})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsxs("h3",{className:"section-title",children:[r("node.storage")," (",t.length,")"]}),t.length>0?a.jsx("div",{className:"storage-list",children:t.map(c=>{const d=c.disk.used_bytes/c.disk.total_bytes*100;return a.jsxs("div",{className:`storage-item ${c.shared?"shared":"local"}`,children:[a.jsxs("div",{className:"storage-header",children:[a.jsx("span",{className:"storage-name",children:c.storage}),a.jsx("span",{className:"storage-type",children:c.type}),c.shared&&a.jsx("span",{className:"storage-shared-badge",children:r("node.shared")})]}),a.jsx("div",{className:"storage-bar",children:a.jsx("div",{className:`storage-fill ${pe(d)}`,style:{width:`${d}%`}})}),a.jsxs("div",{className:"storage-info",children:[a.jsxs("span",{children:[ve(c.disk.used_bytes)," / ",ve(c.disk.total_bytes)]}),a.jsx("span",{className:`text-${pe(d)}`,children:Ae(d,1)})]}),a.jsx("div",{className:"storage-content-labels",children:[...c.content].sort().map(p=>a.jsx("span",{className:"content-label",children:p},p))})]},c.storage)})}):a.jsx("div",{className:"no-storage",children:r("node.no_storage")})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Rg({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:r,isPaused:s=!1}){const{t:i}=Oe(),[o,l]=h.useState(null),[c,d]=h.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),p=!e&&t&&Object.keys(t).length>0,f=h.useCallback((g,_)=>{var j;return e&&e.client_health?e.client_health[_]||null:t&&((j=t[g])!=null&&j.client_health)&&t[g].client_health[_]||null},[e,t]),u=h.useCallback((g,_,j)=>{g.preventDefault(),g.stopPropagation();const z=Math.min(g.clientX,window.innerWidth-250),I=Math.min(g.clientY,window.innerHeight-280);d({visible:!0,x:z,y:I,node:_,clusterId:j})},[]),m=h.useCallback(()=>{d(g=>({...g,visible:!1}))},[]),w=h.useMemo(()=>{var _,j,z,I,H;const g=[];if(p)Object.entries(t).forEach(([R,b])=>{var C,L,A,Y,te;const N=Object.values(b.nodes);if(N.length>0){const O=N.reduce((F,G)=>F+G.cpu.usage_percent,0)/N.length,$=N.reduce((F,G)=>G.memory.total_bytes===0?F:F+G.memory.used_bytes/G.memory.total_bytes*100,0)/N.length;g.push({clusterId:R,clusterName:b.name||R,clusterNodes:N,isStandalone:((C=b.summary)==null?void 0:C.is_standalone)||!1,avgCpu:O,avgMem:$,vmsRunning:((L=b.summary)==null?void 0:L.vms_running)||0,ctsRunning:((A=b.summary)==null?void 0:A.cts_running)||0,vmCount:((Y=b.summary)==null?void 0:Y.vm_count)||0,ctCount:((te=b.summary)==null?void 0:te.ct_count)||0})}});else if(e){const R=Object.values(e.nodes),b=R.length>0?R.reduce((C,L)=>C+L.cpu.usage_percent,0)/R.length:0,N=R.length>0?R.reduce((C,L)=>L.memory.total_bytes===0?C:C+L.memory.used_bytes/L.memory.total_bytes*100,0)/R.length:0;g.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:R,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:b,avgMem:N,vmsRunning:((j=e.summary)==null?void 0:j.vms_running)||0,ctsRunning:((z=e.summary)==null?void 0:z.cts_running)||0,vmCount:((I=e.summary)==null?void 0:I.vm_count)||0,ctCount:((H=e.summary)==null?void 0:H.ct_count)||0})}return g},[e,t,p]),k=w.flatMap(g=>g.clusterNodes);h.useMemo(()=>k.length===0?0:k.reduce((g,_)=>g+_.cpu.usage_percent,0)/k.length,[k]),h.useMemo(()=>k.length===0?0:k.reduce((g,_)=>_.memory.total_bytes===0?g:g+_.memory.used_bytes/_.memory.total_bytes*100,0)/k.length,[k]);let E=null,v=[];if(o){const[g,_]=o.split("/");if(p&&t){const j=t[g];j&&(E=j.nodes[_]||null,v=Object.values(j.storages).filter(z=>z.node===_))}else e&&(E=e.nodes[_]||null,v=Object.values(e.storages).filter(j=>j.node===_))}if(!e&&!p)return a.jsx("div",{className:"cluster-core empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:i("cluster.select")})]})});const x=p?i("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||i("cluster.nodes");return a.jsxs("div",{className:"cluster-core",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"core-header",children:a.jsxs("h1",{className:"core-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),a.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),a.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),a.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),a.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),x]})}),a.jsx("div",{className:"cluster-sections",children:w.map(g=>a.jsxs("div",{className:"cluster-section",children:[a.jsxs("div",{className:`cluster-section-header ${r?"clickable":""}`,onClick:()=>r==null?void 0:r(g.clusterId),title:r?i("cluster.view_vms_in",{name:g.clusterName}):void 0,children:[a.jsxs("div",{className:"section-title-group",children:[a.jsx("span",{className:"cluster-section-name",children:g.clusterName}),g.isStandalone&&a.jsx("span",{className:"standalone-tag",children:i("dashboard.standalone")}),r&&a.jsx("span",{className:"nav-arrow",children:"→"})]}),a.jsxs("span",{className:"cluster-section-count",children:[g.clusterNodes.filter(_=>_.status==="online").length,"/",g.clusterNodes.length," ",i("cluster.nodes")]})]}),a.jsxs("div",{className:"cluster-section-content",children:[a.jsx("div",{className:"section-reactor",children:a.jsx(zg,{cpuUsage:g.avgCpu,memUsage:g.avgMem,compact:!0,label:i("node.avg_load")})}),a.jsxs("div",{className:"section-nodes",children:[a.jsx("div",{className:"nodes-grid",children:g.clusterNodes.map(_=>a.jsx($g,{node:_,onClick:()=>l(`${g.clusterId}/${_.node}`),onContextMenu:j=>u(j,_,g.clusterId),isPaused:s},`${g.clusterId}-${_.node}`))}),a.jsxs("div",{className:"ecg-legend",children:[a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line cpu"}),a.jsx("span",{children:i("metric.cpu")})]}),a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line mem"}),a.jsx("span",{children:i("metric.memory")})]}),a.jsxs("span",{className:"ecg-legend-item",children:[a.jsx("span",{className:"ecg-legend-line io"}),a.jsx("span",{children:i("node.io_wait")})]})]})]}),a.jsxs("div",{className:"section-telemetry",children:[a.jsxs("div",{className:"mini-telemetry",children:[a.jsxs("div",{className:"mini-chart",children:[a.jsx("span",{className:"mini-label",children:"CPU"}),a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-fill ${pe(g.avgCpu)}`,style:{width:`${g.avgCpu}%`}})}),a.jsx($d,{value:g.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${pe(g.avgCpu)}`})]}),a.jsxs("div",{className:"mini-chart",children:[a.jsx("span",{className:"mini-label",children:"MEM"}),a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-fill ${pe(g.avgMem)}`,style:{width:`${g.avgMem}%`}})}),a.jsx($d,{value:g.avgMem,decimals:0,suffix:"%",className:`mini-value text-${pe(g.avgMem)}`})]})]}),a.jsxs("div",{className:"mini-stats",children:[a.jsxs("div",{className:"mini-stat",children:[a.jsx(Pd,{left:g.vmsRunning,right:g.vmCount,className:"mini-stat-value"}),a.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),a.jsxs("div",{className:"mini-stat",children:[a.jsx(Pd,{left:g.ctsRunning,right:g.ctCount,className:"mini-stat-value"}),a.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},g.clusterId))}),a.jsx("div",{className:"core-footer",children:a.jsxs("button",{className:"btn-view-vms",onClick:n,children:[i("cluster.view_all_vms")," →"]})}),E&&a.jsx(Pg,{node:E,storages:v,onClose:()=>l(null)}),a.jsx(Eg,{state:c,onClose:m,onShowDetails:()=>{c.node&&l(`${c.clusterId}/${c.node.node}`)},getNodeHealth:f}),a.jsx("style",{children:`
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
      `})]})}const Tg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Lg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Ig({task:e}){const t=Tg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Lg(e.task_type);return a.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[a.jsx("span",{className:"task-badge-icon",children:t.icon}),a.jsx("span",{className:"task-badge-text",children:t.label}),a.jsx("style",{children:Ag})]})}const Ag=`
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
`;function rs(e,t,n){const r=s=>{if(!s.tasks)return null;for(const i of Object.values(s.tasks))if(i.vmid===e&&i.status==="running")return i;return null};if(n)for(const s of Object.values(n)){const i=r(s);if(i)return i}else if(t)return r(t);return null}function Og({state:e,onClose:t,onShowDetails:n,getNodeHealth:r}){const{t:s}=Oe();if(h.useEffect(()=>{const p=()=>t(),f=()=>t(),u=m=>{m.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",p),document.addEventListener("scroll",f,!0),document.addEventListener("keydown",u)),()=>{document.removeEventListener("click",p),document.removeEventListener("scroll",f,!0),document.removeEventListener("keydown",u)}},[e.visible,t]),!e.visible||!e.vm)return null;const i=e.vm,o=r(e.clusterId,i.node),l=o?`https://${o.host}:${o.port}/#v1:0:=${i.type}/${i.vmid}`:null,c=p=>{p.stopPropagation(),l&&window.open(l,"_blank","noopener,noreferrer"),t()},d=p=>{p.stopPropagation(),n(),t()};return a.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:p=>p.stopPropagation(),children:[a.jsxs("div",{className:"context-menu-header",children:[a.jsx("span",{className:"context-menu-name",children:i.name}),a.jsxs("span",{className:"context-menu-id",children:["#",i.vmid]})]}),a.jsx("div",{className:"context-menu-divider"}),a.jsxs("button",{className:"context-menu-item",onClick:d,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:s("vm.details")||"View Details"})]}),l&&a.jsxs("button",{className:"context-menu-item",onClick:c,children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),a.jsx("polyline",{points:"15,3 21,3 21,9"}),a.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),a.jsx("span",{children:s("vm.open_pve")||"Open in PVE Manager"})]})]})}const Rd=gu.forwardRef(function({vm:t,isSelected:n,onClick:r,onContextMenu:s,animationDelay:i,task:o,isGhost:l=!1,isCompleting:c=!1},d){var z,I,H;const p=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,m=Math.max(t.cpu.usage_percent,f,u),w=p?pe(m):"muted",k=!!o,E=(z=o==null?void 0:o.task_type)==null?void 0:z.includes("migrate"),v=((I=o==null?void 0:o.task_type)==null?void 0:I.includes("backup"))||((H=o==null?void 0:o.task_type)==null?void 0:H.includes("vzdump")),x=t.name.length>12?t.name.substring(0,11)+"…":t.name,_=o?(R=>{const b=R.toLowerCase();return b.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:b.includes("backup")||b.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:b.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:b.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:b.includes("clone")?{label:"CLONE",color:"#10b981"}:b.includes("start")||b.includes("qmstart")?{label:"START",color:"#00ff88"}:b.includes("stop")||b.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:b.includes("reboot")||b.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(o.task_type):null,j=o?{type:o.task_type,target:o.target_node}:null;return a.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${k?"has-task":""} ${E?"migrating":""} ${v?"backup":""} ${l?"ghost":""} ${c?"completing":""}`,onClick:r,onContextMenu:s,title:`${t.name} (${t.vmid})${o?`
[${o.task_type}]${o.target_node?` → ${o.target_node}`:""}`:""}`,style:{"--anim-delay":`${i}ms`,animationDelay:`${i}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[a.jsxs("div",{className:`vm-cell-inner ${w}`,children:[a.jsx("span",{className:"vm-name",children:x}),a.jsx("span",{className:"vm-id",children:t.vmid}),o&&!E&&!v&&a.jsx("span",{className:"vm-task-icon",children:"⚙"}),v&&a.jsx("span",{className:"vm-backup-icon",children:"◉"}),E&&a.jsx("span",{className:"vm-migrate-icon",children:a.jsx("span",{className:"migrate-arrow",children:"→"})})]}),_&&a.jsx("div",{className:"vm-task-label",style:{borderColor:_.color,color:_.color},children:_.label}),k&&!E&&!v&&a.jsx("div",{className:"vm-task-ring"}),v&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"backup-ring"}),a.jsx("div",{className:"backup-scanner"}),a.jsxs("div",{className:"backup-particles",children:[a.jsx("span",{className:"bp bp1"}),a.jsx("span",{className:"bp bp2"}),a.jsx("span",{className:"bp bp3"}),a.jsx("span",{className:"bp bp4"})]})]}),E&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"migrate-ring"}),a.jsxs("div",{className:"migrate-particles",children:[a.jsx("span",{className:"particle p1"}),a.jsx("span",{className:"particle p2"}),a.jsx("span",{className:"particle p3"})]}),(j==null?void 0:j.target)&&a.jsxs("div",{className:"migrate-target-label",children:["→ ",j.target]})]})]})});function Fg({vm:e,onClose:t}){const{t:n}=Oe(),r=e.status==="running";return a.jsxs("div",{className:"vm-detail-panel panel",children:[a.jsxs("div",{className:"detail-scroll-area",children:[a.jsxs("div",{className:"detail-header",children:[a.jsxs("div",{className:"detail-title",children:[a.jsx("span",{className:`detail-status ${qo(e.status)}`}),a.jsx("span",{className:"detail-name",children:e.name}),a.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),a.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),a.jsxs("div",{className:"detail-content",children:[a.jsxs("div",{className:"detail-info",children:[a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.node")}),a.jsx("span",{className:"info-value",children:e.node})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.type")}),a.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("node.status")}),a.jsx("span",{className:`info-value text-${qo(e.status)}`,children:e.status.toUpperCase()})]}),r&&a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("table.uptime")}),a.jsx("span",{className:"info-value",children:xi(e.uptime)})]}),e.tags&&e.tags.length>0&&a.jsxs("div",{className:"info-row tags-row",children:[a.jsx("span",{className:"info-label",children:n("table.tags")}),a.jsx("div",{className:"vm-tags detail-tags",children:e.tags.map((s,i)=>a.jsx("span",{className:"vm-tag",children:s},i))})]})]}),r&&a.jsxs("div",{className:"detail-metrics",children:[a.jsxs("div",{className:"metric-row metric-row-stacked",children:[a.jsxs("div",{className:"metric-row-header",children:[a.jsx("span",{className:"metric-label",children:n("metric.cpu")}),a.jsx("span",{className:`metric-value text-${pe(e.cpu.usage_percent)}`,children:Ae(e.cpu.usage_percent,1)})]}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-fill ${pe(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),a.jsxs("div",{className:"metric-row metric-row-stacked",children:[a.jsxs("div",{className:"metric-row-header",children:[a.jsx("span",{className:"metric-label",children:n("metric.memory")}),a.jsxs("span",{className:"metric-value",children:[ve(e.memory.used_bytes)," / ",ve(e.memory.total_bytes)]})]}),a.jsx("div",{className:"metric-bar",children:a.jsx("div",{className:`metric-fill ${pe(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),a.jsxs("div",{className:"metric-row metric-row-network",children:[a.jsx("span",{className:"metric-label",children:n("metric.network")}),a.jsxs("div",{className:"network-stats",children:[a.jsxs("span",{className:"net-rx",children:["↓ ",ve(e.network.rx_bytes_sec),"/s"]}),a.jsxs("span",{className:"net-tx",children:["↑ ",ve(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]})}function Dg({cluster:e,clusters:t}){const{t:n,language:r}=Oe(),[s,i]=h.useState(null),[o,l]=h.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[c,d]=h.useState(""),[p,f]=h.useState("grid"),[u,m]=h.useState("vmid"),[w,k]=h.useState("asc"),[E,v]=h.useState(!1),[x,g]=h.useState(()=>{const S=localStorage.getItem("matrix_card_width");return S?parseInt(S,10):85}),[_,j]=h.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[z,I]=h.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[H,R]=h.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[b,N]=h.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[C,L]=h.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[A,Y]=h.useState([]),[te,O]=h.useState([]),[$,F]=h.useState(new Map),G=h.useRef(new Set),[X,y]=h.useState(!1),[W,ee]=h.useState(0),[ue,ne]=h.useState(!0);h.useEffect(()=>{y(!1),ee(T=>T+1),ne(!0);const S=setTimeout(()=>{y(!0)},100),D=setTimeout(()=>{ne(!1)},8e3);return()=>{clearTimeout(S),clearTimeout(D)}},[z]);const se=h.useRef(new Map),Te=h.useRef(new Map),K=h.useRef(null),Z=h.useRef(!1),ie=h.useMemo(()=>{if(_!=="load")return"";const S=[],D=T=>{Object.values(T.vms).forEach(P=>{if(P.template||o==="running"&&P.status!=="running"||o==="stopped"&&P.status!=="stopped")return;const B=P.memory.total_bytes>0?P.memory.used_bytes/P.memory.total_bytes*100:0,J=P.disk.total_bytes>0?P.disk.used_bytes/P.disk.total_bytes*100:0,Q=Math.max(P.cpu.usage_percent,B,J);S.push({key:`${P.node}/${P.vmid}`,load:Math.round(Q)})})};return t?Object.values(t).forEach(D):e&&D(e),S.sort((T,P)=>P.load-T.load),S.map(T=>`${T.key}:${T.load}`).join("|")},[e,t,_,o]);h.useLayoutEffect(()=>{if(_!=="load"||Z.current)return;const S=new Map;se.current.forEach((D,T)=>{D&&S.set(T,D.getBoundingClientRect())}),Te.current=S},[ie,_]),h.useEffect(()=>{_==="load"&&Te.current.size!==0&&requestAnimationFrame(()=>{const S=[];se.current.forEach((D,T)=>{if(!D)return;const P=Te.current.get(T);if(!P)return;const B=D.getBoundingClientRect(),J=P.left-B.left,Q=P.top-B.top;if(Math.abs(J)>2||Math.abs(Q)>2){Z.current=!0;const U=D.animate([{transform:`translate(${J}px, ${Q}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});S.push(U)}}),S.length>0?Promise.all(S.map(D=>D.finished)).then(()=>{Z.current=!1}).catch(()=>{Z.current=!1}):Z.current=!1})},[ie,_]);const[oe,Ve]=h.useState(!1);h.useEffect(()=>{oe||Ys.getConfig().then(S=>{var T;const D=(T=S==null?void 0:S.ui)==null?void 0:T.vm_matrix_default_filter;D&&(l(D),localStorage.setItem("vm_matrix_default_filter",D)),Ve(!0)}).catch(()=>{const S=localStorage.getItem("vm_matrix_default_filter");S&&l(S),Ve(!0)})},[oe]),h.useEffect(()=>{const S=()=>{const T=localStorage.getItem("matrix_card_width");T&&g(parseInt(T,10));const P=localStorage.getItem("matrix_sort_by");P&&P!==_&&j(P);const B=localStorage.getItem("matrix_group_sort_by");B&&B!==H&&R(B);const J=localStorage.getItem("matrix_group_sort_order");J&&J!==b&&N(J)};window.addEventListener("storage",S);const D=setInterval(S,1e3);return()=>{window.removeEventListener("storage",S),clearInterval(D)}},[_,H,b]);const nt=h.useCallback((S,D)=>{var T;return e&&e.client_health?e.client_health[D]||null:t&&((T=t[S])!=null&&T.client_health)&&t[S].client_health[D]||null},[e,t]),Ue=h.useCallback((S,D,T)=>{S.preventDefault(),S.stopPropagation();const P=Math.min(S.clientX,window.innerWidth-250),B=Math.min(S.clientY,window.innerHeight-300);L({visible:!0,x:P,y:B,vm:D,clusterId:T})},[]),$e=h.useCallback(()=>{L(S=>({...S,visible:!1}))},[]),ye=!e&&t&&Object.keys(t).length>0,je=h.useMemo(()=>{const S=[],D=(T,P,B)=>{if(!T.tasks)return;Object.values(T.tasks).forEach(Q=>{var ge;const U=((ge=Q.task_type)==null?void 0:ge.toLowerCase())||"",le=U.includes("migrate"),ce=Q.status==="running",M=!!Q.target_node,ae=U.startsWith("ha");if(U.startsWith("qm")||U.startsWith("vz"),ce&&le&&M&&!ae){const be=Object.keys(T.vms).find(re=>T.vms[re].vmid===Q.vmid);be&&S.push({vm:T.vms[be],task:Q,targetNode:Q.target_node||"",clusterId:P,clusterLabel:B})}})};return ye&&t?Object.entries(t).forEach(([T,P])=>{D(P,T,P.name||T)}):e&&D(e,e.id,e.name||e.id),S},[e,t,ye]);h.useEffect(()=>{const S=new Set(je.map(T=>T.vm.vmid)),D=G.current;D.forEach(T=>{!S.has(T)&&$.has(T)}),je.forEach(({vm:T})=>{D.has(T.vmid)}),G.current=S},[je,$]);const He=h.useRef(new Map);h.useEffect(()=>{je.forEach(({vm:S,targetNode:D})=>{He.current.set(S.vmid,{targetNode:D,sourceNode:S.node})})},[je]);const qe=h.useRef(new Map);h.useEffect(()=>{A.forEach(S=>{qe.current.set(S.vmid,{x1:S.x1,y1:S.y1,x2:S.x2,y2:S.y2})})},[A]),h.useEffect(()=>{const S=new Set(je.map(D=>D.vm.vmid));He.current.forEach((D,T)=>{if(!S.has(T)&&!$.has(T)){const P=qe.current.get(T);if(P){const B=Date.now(),J=800,Q=()=>{const U=Date.now()-B,le=Math.min(U/J,1),ce=P.x1+(P.x2-P.x1)*le,M=P.y1+(P.y2-P.y1)*le;O([{x1:ce,y1:M,x2:P.x2,y2:P.y2,vmid:T,progress:le}]),le<1?requestAnimationFrame(Q):O([])};requestAnimationFrame(Q)}F(B=>{const J=new Map(B);return J.set(T,{...D,startTime:Date.now()}),J}),He.current.delete(T),qe.current.delete(T),setTimeout(()=>{F(B=>{const J=new Map(B);return J.delete(T),J})},1e4)}})},[je,$]),h.useEffect(()=>{if($.size===0)return;const S=D=>{const T=P=>{for(const B of Object.values(P.vms))if(B.vmid===D)return B.node;return null};if(t)for(const P of Object.values(t)){const B=T(P);if(B)return B}else if(e)return T(e);return null};$.forEach((D,T)=>{const P=S(T);P&&P===D.targetNode&&P!==D.sourceNode&&F(B=>{const J=new Map(B);return J.delete(T),J})})},[e,t,$]);const Ye=h.useCallback((S,D)=>{const T=ye?`${D} / `:"";switch(z){case"none":return ye?D:"all";case"type":return`${T}${S.type==="qemu"?"VM":"CT"}`;case"tag":return S.tags&&S.tags.length>0?`${T}${S.tags[0]}`:`${T}(no tag)`;case"node":default:return`${T}${S.node}`}},[z,ye]),Vt=h.useMemo(()=>{const S={},D=(T,P,B)=>{Object.entries(T.vms).forEach(([J,Q])=>{if(o==="running"&&Q.status!=="running"||o==="stopped"&&Q.status!=="stopped"||c&&!Q.name.toLowerCase().includes(c.toLowerCase())&&!String(Q.vmid).includes(c)||Q.template)return;const U=Ye(Q,P);S[U]||(S[U]={vms:[],clusterId:B}),S[U].vms.push(Q)})};return ye?Object.entries(t).forEach(([T,P])=>{const B=P.name||T;D(P,B,T)}):e&&D(e,"",e.id),Object.values(S).forEach(T=>{T.vms.sort((P,B)=>{switch(_){case"name":return P.name.localeCompare(B.name);case"load":{const J=P.memory.total_bytes>0?P.memory.used_bytes/P.memory.total_bytes*100:0,Q=B.memory.total_bytes>0?B.memory.used_bytes/B.memory.total_bytes*100:0,U=P.disk.total_bytes>0?P.disk.used_bytes/P.disk.total_bytes*100:0,le=B.disk.total_bytes>0?B.disk.used_bytes/B.disk.total_bytes*100:0,ce=Math.max(P.cpu.usage_percent,J,U),M=Math.max(B.cpu.usage_percent,Q,le);if(P.status!=="running"&&B.status==="running")return 1;if(P.status==="running"&&B.status!=="running")return-1;if(P.status!=="running"&&B.status!=="running")return P.vmid-B.vmid;const ae=re=>re>=95?0:re>=80?1:2,ge=ae(ce),be=ae(M);return ge!==be?ge-be:M-ce}case"vmid":default:return P.vmid-B.vmid}})}),S},[e,t,ye,o,c,_,Ye]),Pe=h.useMemo(()=>{const S=[];return je.forEach(({vm:D,targetNode:T,clusterId:P,clusterLabel:B})=>{const J=ye?`${B} / ${T}`:T,Q=ye?`${B} / ${D.node}`:D.node;S.push({vm:D,targetGroupKey:J,sourceGroupKey:Q,clusterId:P})}),S},[je,ye]);h.useEffect(()=>{if(p!=="grid"||Pe.length===0){Y([]);return}const S=()=>{const P=K.current;if(!P)return;const B=P.getBoundingClientRect(),J=[];Pe.forEach(({vm:Q})=>{const U=`${Q.node}/${Q.vmid}`,le=`ghost-${Q.vmid}`,ce=se.current.get(U),M=se.current.get(le);if(ce&&M){const ae=ce.getBoundingClientRect(),ge=M.getBoundingClientRect();J.push({x1:ae.left+ae.width/2-B.left,y1:ae.top+ae.height/2-B.top,x2:ge.left+ge.width/2-B.left,y2:ge.top+ge.height/2-B.top,vmid:Q.vmid})}}),Y(J)},D=setTimeout(S,100),T=setInterval(S,500);return()=>{clearTimeout(D),clearInterval(T)}},[Pe,p]);const Nt=h.useMemo(()=>{const S=[],D=(T,P,B)=>{Object.values(T.vms).forEach(J=>{o==="running"&&J.status!=="running"||o==="stopped"&&J.status!=="stopped"||c&&!J.name.toLowerCase().includes(c.toLowerCase())&&!String(J.vmid).includes(c)||J.template||S.push({...J,clusterName:P,clusterId:B})})};return ye?Object.entries(t).forEach(([T,P])=>{const B=P.name||T;D(P,B,T)}):e&&D(e,e.name||"Cluster",e.id),S.sort((T,P)=>{var J,Q,U,le;let B=0;switch(u){case"name":B=T.name.localeCompare(P.name);break;case"vmid":B=T.vmid-P.vmid;break;case"type":B=T.type.localeCompare(P.type);break;case"node":B=T.node.localeCompare(P.node);break;case"status":B=T.status.localeCompare(P.status);break;case"cpu":B=T.cpu.usage_percent-P.cpu.usage_percent;break;case"memory":B=T.memory.used_bytes/T.memory.total_bytes-P.memory.used_bytes/P.memory.total_bytes;break;case"uptime":B=T.uptime-P.uptime;break;case"rx":B=(((J=T.network)==null?void 0:J.rx_bytes_sec)||0)-(((Q=P.network)==null?void 0:Q.rx_bytes_sec)||0);break;case"tx":B=(((U=T.network)==null?void 0:U.tx_bytes_sec)||0)-(((le=P.network)==null?void 0:le.tx_bytes_sec)||0);break;case"task":{const ce=rs(T.vmid,e,t),M=rs(P.vmid,e,t);ce&&!M?B=-1:!ce&&M?B=1:ce&&M?B=ce.task_type.localeCompare(M.task_type):B=0;break}}return w==="asc"?B:-B}),S},[e,t,ye,o,c,u,w]),ke=S=>{v(!0),setTimeout(()=>v(!1),300),u===S?k(w==="asc"?"desc":"asc"):(m(S),k("asc"))},ut=h.useMemo(()=>{if(!s)return null;if(e)return e.vms[s]||null;if(t){for(const S of Object.values(t))if(S.vms[s])return S.vms[s]}return null},[s,e,t]);if(!e&&!ye)return a.jsx("div",{className:"holo-matrix empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("cluster.select")})]})});const{totalVMs:pt,runningVMs:Qe}=h.useMemo(()=>{let S=0,D=0;const T=P=>{Object.values(P.vms).forEach(B=>{B.template||(S++,B.status==="running"&&D++)})};return ye?Object.values(t).forEach(T):e&&T(e),{totalVMs:S,runningVMs:D}},[e,t,ye]);return a.jsxs("div",{className:"holo-matrix",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"matrix-header",children:[a.jsxs("div",{className:"matrix-title-section",children:[a.jsxs("h1",{className:"matrix-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),a.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),a.jsxs("div",{className:"matrix-stats",children:[a.jsxs("span",{className:"stat-running",children:[Qe," ",n("matrix.running")]}),a.jsx("span",{className:"stat-divider",children:"/"}),a.jsxs("span",{className:"stat-total",children:[pt," ",n("matrix.total")]})]})]}),a.jsxs("div",{className:"matrix-controls",children:[a.jsxs("div",{className:"search-box",children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("path",{d:"M21 21l-4.35-4.35"})]}),a.jsx("input",{type:"text",placeholder:n("matrix.search"),value:c,onChange:S=>d(S.target.value)})]}),a.jsxs("div",{className:"filter-tabs",children:[a.jsx("button",{className:`filter-tab ${o==="all"?"active":""}`,onClick:()=>l("all"),children:n("matrix.filter_all")}),a.jsx("button",{className:`filter-tab ${o==="running"?"active":""}`,onClick:()=>l("running"),children:n("matrix.filter_running")}),a.jsx("button",{className:`filter-tab ${o==="stopped"?"active":""}`,onClick:()=>l("stopped"),children:n("matrix.filter_stopped")})]}),a.jsxs("div",{className:"sort-selector",children:[a.jsxs("span",{className:"sort-label",children:[n("settings.sort_by"),":"]}),a.jsx("button",{className:`sort-btn ${_==="vmid"?"active":""}`,onClick:()=>{j("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:"ID"}),a.jsx("button",{className:`sort-btn ${_==="name"?"active":""}`,onClick:()=>{j("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:n("settings.sort_name")}),a.jsx("button",{className:`sort-btn ${_==="load"?"active":""}`,onClick:()=>{j("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:n("settings.sort_load")})]}),a.jsxs("div",{className:"sort-selector",children:[a.jsxs("span",{className:"sort-label",children:[n("matrix.group_by"),":"]}),a.jsx("button",{className:`sort-btn ${z==="none"?"active":""}`,onClick:()=>{I("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:n("matrix.group_none")}),a.jsx("button",{className:`sort-btn ${z==="node"?"active":""}`,onClick:()=>{I("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:n("matrix.group_node")}),a.jsx("button",{className:`sort-btn ${z==="type"?"active":""}`,onClick:()=>{I("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:n("matrix.group_type")}),a.jsx("button",{className:`sort-btn ${z==="tag"?"active":""}`,onClick:()=>{I("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:n("matrix.group_tag")})]}),a.jsxs("div",{className:"view-toggle",children:[a.jsx("button",{className:`view-btn ${p==="grid"?"active":""}`,onClick:()=>f("grid"),title:r==="zh-TW"?"方格檢視":"Grid view",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a.jsx("button",{className:`view-btn ${p==="table"?"active":""}`,onClick:()=>f("table"),title:r==="zh-TW"?"表格檢視":"Table view",children:a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})})]})]})]}),a.jsxs("div",{className:"matrix-content",children:[p==="grid"?a.jsxs("div",{className:"matrix-grid",ref:K,children:[A.length>0&&a.jsxs("svg",{className:"migration-lines-overlay",children:[a.jsxs("defs",{children:[a.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),a.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),a.jsxs("filter",{id:"migrationGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),A.map((S,D)=>a.jsxs("g",{children:[a.jsx("line",{className:"migration-line",x1:S.x1,y1:S.y1,x2:S.x2,y2:S.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),a.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${S.x1},${S.y1} L${S.x2},${S.y2}`})}),a.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${S.x1},${S.y1} L${S.x2},${S.y2}`})}),a.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:a.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${S.x1},${S.y1} L${S.x2},${S.y2}`})})]},`line-${S.vmid}-${D}`))]}),te.length>0&&a.jsxs("svg",{className:"migration-lines-overlay completing",children:[a.jsxs("defs",{children:[a.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),a.jsxs("filter",{id:"completingGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),te.map((S,D)=>a.jsxs("g",{children:[a.jsx("line",{className:"completing-line",x1:S.x1,y1:S.y1,x2:S.x2,y2:S.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-S.progress)+1,filter:"url(#completingGlow)",opacity:1-S.progress*.5}),S.progress>.8&&a.jsx("circle",{cx:S.x2,cy:S.y2,r:20*(S.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(S.progress-.8)*5})]},`completing-${S.vmid}-${D}`))]}),(()=>{const S=new Map;Object.entries(Vt).forEach(([P,B])=>{S.set(P,B)}),Pe.forEach(P=>{S.has(P.targetGroupKey)||S.set(P.targetGroupKey,{vms:[],clusterId:P.clusterId})});const D=Array.from(S.entries()).sort((P,B)=>{const[J]=P,[Q]=B,U=ae=>{if(ae.includes(" / ")){const[ge,be]=ae.split(" / ");return{cluster:ge,node:be}}return{cluster:"",node:ae}},le=U(J),ce=U(Q);let M=0;return H==="cluster"?(M=le.cluster.localeCompare(ce.cluster),M===0&&(M=le.node.localeCompare(ce.node))):(M=le.node.localeCompare(ce.node),M===0&&(M=le.cluster.localeCompare(ce.cluster))),b==="desc"?-M:M});let T=0;return D.map(([P,B])=>{const J=Pe.filter(Q=>Q.targetGroupKey===P);return a.jsxs("div",{className:`node-section ${B.vms.length===0&&J.length>0?"ghost-only":""}`,children:[a.jsxs("div",{className:"node-section-header",children:[a.jsx("span",{className:"node-section-name",children:P}),a.jsxs("span",{className:"node-section-count",children:[B.vms.length,J.length>0&&a.jsxs("span",{className:"incoming-count",children:[" +",J.length]})]})]}),a.jsxs("div",{className:`vm-grid ${_==="load"&&!ue?"sort-by-load":""} ${ue?"initial-load":""}`,children:[X&&B.vms.map(Q=>{const U=`${Q.node}/${Q.vmid}`,le=rs(Q.vmid,e,t),ce=$.get(Q.vmid);if(ce&&ce.sourceNode===Q.node)return null;const M=T++;return a.jsx(Rd,{ref:ae=>{ae?se.current.set(U,ae):se.current.delete(U)},vm:Q,isSelected:s===U,onClick:()=>i(s===U?null:U),onContextMenu:ae=>Ue(ae,Q,B.clusterId),animationDelay:ue?M*50:0,task:le,isCompleting:!!ce},U)}).filter(Boolean),X&&J.map(Q=>{var ce;const U=`ghost-${Q.vm.vmid}`,le=(ce=je.find(M=>M.vm.vmid===Q.vm.vmid))==null?void 0:ce.task;return a.jsx(Rd,{ref:M=>{M?se.current.set(U,M):se.current.delete(U)},vm:Q.vm,isSelected:!1,onClick:()=>{},onContextMenu:M=>M.preventDefault(),animationDelay:0,task:le,isGhost:!0},U)})]},`grid-${o}-${c}-${_}-${W}`)]},P)})})(),Object.keys(Vt).length===0&&Pe.length===0&&a.jsx("div",{className:"no-vms",children:a.jsx("span",{children:n("error.no_data")})})]}):a.jsxs("div",{className:"matrix-table-container",children:[a.jsxs("table",{className:"vm-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsxs("th",{className:`sortable ${u==="status"?"sorted":""}`,onClick:()=>ke("status"),children:[a.jsx("span",{children:n("node.status")}),u==="status"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="vmid"?"sorted":""}`,onClick:()=>ke("vmid"),children:[a.jsx("span",{children:"VMID"}),u==="vmid"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="type"?"sorted":""}`,onClick:()=>ke("type"),children:[a.jsx("span",{children:n("table.type")}),u==="type"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="name"?"sorted":""}`,onClick:()=>ke("name"),children:[a.jsx("span",{children:n("table.name")}),u==="name"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsx("th",{className:"tags-header",children:n("table.tags")}),a.jsxs("th",{className:`sortable ${u==="node"?"sorted":""}`,onClick:()=>ke("node"),children:[a.jsx("span",{children:n("table.node")}),u==="node"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="cpu"?"sorted":""}`,onClick:()=>ke("cpu"),children:[a.jsx("span",{children:n("metric.cpu")}),u==="cpu"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="memory"?"sorted":""}`,onClick:()=>ke("memory"),children:[a.jsx("span",{children:n("metric.memory")}),u==="memory"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable net-header ${u==="rx"?"sorted":""}`,onClick:()=>ke("rx"),children:[a.jsxs("span",{children:["↓ ",n("metric.rx")]}),u==="rx"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable net-header ${u==="tx"?"sorted":""}`,onClick:()=>ke("tx"),children:[a.jsxs("span",{children:["↑ ",n("metric.tx")]}),u==="tx"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable ${u==="uptime"?"sorted":""}`,onClick:()=>ke("uptime"),children:[a.jsx("span",{children:n("table.uptime")}),u==="uptime"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]}),a.jsxs("th",{className:`sortable task-header ${u==="task"?"sorted":""}`,onClick:()=>ke("task"),children:[a.jsx("span",{children:n("table.task")}),u==="task"&&a.jsx("span",{className:"sort-indicator",children:w==="asc"?"▲":"▼"})]})]})}),a.jsx("tbody",{children:Nt.map(S=>{const D=`${S.node}/${S.vmid}`,T=S.status==="running",P=S.cpu.usage_percent,B=S.memory.used_bytes/S.memory.total_bytes*100,J=rs(S.vmid,e,t);return a.jsxs("tr",{className:`${s===D?"selected":""} ${S.status} ${E?"sort-animating":""}`,onClick:()=>i(s===D?null:D),onContextMenu:Q=>Ue(Q,S,S.clusterId),children:[a.jsx("td",{children:a.jsx("span",{className:`status-badge ${qo(S.status)}`,children:S.status.toUpperCase()})}),a.jsx("td",{className:"vmid-cell",children:S.vmid}),a.jsx("td",{className:"type-cell",children:a.jsx("span",{className:`type-badge ${S.type}`,children:S.type==="qemu"?"VM":"CT"})}),a.jsx("td",{className:"name-cell",children:S.name}),a.jsx("td",{className:"tags-cell",children:S.tags&&S.tags.length>0?a.jsx("div",{className:"vm-tags",children:S.tags.map((Q,U)=>a.jsx("span",{className:"vm-tag",children:Q},U))}):null}),a.jsx("td",{className:"node-cell",children:S.node}),a.jsx("td",{children:T?a.jsxs("div",{className:"cpu-cell",children:[a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-bar-fill ${pe(P)}`,style:{width:`${P}%`}})}),a.jsx("span",{className:`text-${pe(P)}`,children:Ae(P,1)})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{children:T?a.jsxs("div",{className:"mem-cell",children:[a.jsx("div",{className:"mini-bar",children:a.jsx("div",{className:`mini-bar-fill ${pe(B)}`,style:{width:`${B}%`}})}),a.jsx("span",{children:Ae(B,1)})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"net-rx-cell",children:T?a.jsxs("span",{className:"net-rx",children:[ve(S.network.rx_bytes_sec),"/s"]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"net-tx-cell",children:T?a.jsxs("span",{className:"net-tx",children:[ve(S.network.tx_bytes_sec),"/s"]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{children:T?a.jsx("span",{className:"uptime-cell",children:xi(S.uptime)}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{className:"task-cell",children:J&&a.jsx(Ig,{task:J})})]},D)})})]}),Nt.length===0&&a.jsx("div",{className:"no-vms",children:a.jsx("span",{children:n("error.no_data")})})]}),ut&&a.jsx(Fg,{vm:ut,onClose:()=>i(null)},`${ut.node}/${ut.vmid}`)]}),a.jsx(Og,{state:C,onClose:$e,onShowDetails:()=>{C.vm&&i(`${C.vm.node}/${C.vm.vmid}`)},getNodeHealth:nt}),a.jsxs("div",{className:"matrix-legend",children:[a.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color success"}),a.jsx("span",{className:"legend-label",children:"<80%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color warning"}),a.jsx("span",{className:"legend-label",children:"80-95%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color danger"}),a.jsx("span",{className:"legend-label",children:">95%"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color muted"}),a.jsx("span",{className:"legend-label",children:"Stopped"})]}),a.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"})]}),a.jsx("style",{children:`
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
          grid-template-columns: repeat(auto-fill, minmax(${x}px, 1fr));
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
      `})]})}function Qi(e,t,n){const r=s=>{if(!s.tasks)return null;for(const i of Object.values(s.tasks))if(i.vmid===e&&i.status==="running")return i;return null};if(n)for(const s of Object.values(n)){const i=r(s);if(i)return i}else if(t)return r(t);return null}function bf(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Bg({vm:e,index:t,previousIndex:n,onClick:r,isSelected:s,task:i}){var x;const o=e.memory.used_bytes/e.memory.total_bytes*100,l=((x=e.disk)==null?void 0:x.usage_percent)||0,c=pe(e.cpu.usage_percent),d=pe(o),p=pe(l),f=h.useRef(null),[u,m]=h.useState(n===void 0),w=bf(i||null);h.useEffect(()=>{if(u){const g=setTimeout(()=>m(!1),50);return()=>clearTimeout(g)}},[u]);const k=e.name.length>10?e.name.substring(0,9)+"…":e.name,v=Math.max(e.cpu.usage_percent,o,l)>95?"critical":"warning";return a.jsxs("div",{ref:f,className:`anomaly-item ${v} ${u?"entering":""} ${s?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:r?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${Ae(e.cpu.usage_percent,1)}
MEM: ${Ae(o,1)}
DISK: ${Ae(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:r,children:[a.jsx("div",{className:"corner-bracket tl"}),a.jsx("div",{className:"corner-bracket tr"}),a.jsx("div",{className:"corner-bracket bl"}),a.jsx("div",{className:"corner-bracket br"}),a.jsxs("div",{className:"anomaly-header",children:[a.jsx("span",{className:`anomaly-indicator ${c}`}),a.jsx("span",{className:"anomaly-name",children:k}),a.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),w&&a.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${w.color}30`,borderColor:w.color,color:w.color},children:w.label})]}),a.jsxs("div",{className:"anomaly-bars-row",children:[a.jsxs("div",{className:`metric-gauge ${c}`,children:[a.jsx("span",{className:"gauge-label",children:"C"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),a.jsxs("div",{className:`metric-gauge ${d}`,children:[a.jsx("span",{className:"gauge-label",children:"M"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(o,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(o,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(o)})]}),a.jsxs("div",{className:`metric-gauge ${p}`,children:[a.jsx("span",{className:"gauge-label",children:"D"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Wg({cluster:e,clusters:t,isPaused:n=!1}){const{t:r}=Oe(),s=h.useRef(null),i=h.useRef(null),[o,l]=h.useState(0),[c,d]=h.useState(null),[p,f]=h.useState(new Map),[u,m]=h.useState(new Map),[w,k]=h.useState("grid"),[E,v]=h.useState(0);h.useEffect(()=>{const R=setTimeout(()=>k("line"),600),b=setTimeout(()=>k("flip"),1100),N=setTimeout(()=>k("done"),3300);return()=>{clearTimeout(R),clearTimeout(b),clearTimeout(N)}},[]),h.useEffect(()=>{if(w!=="flip"&&w!=="done"){v(0);return}const R=w==="flip"?300:0,b=1800;let N,C=null;const L=A=>{C===null&&(C=A);const Y=A-C-R;if(Y<0){N=requestAnimationFrame(L);return}const te=Math.min(Y/b,1),O=1-Math.pow(1-te,3);v(O),te<1&&(N=requestAnimationFrame(L))};return N=requestAnimationFrame(L),()=>cancelAnimationFrame(N)},[w]);const x=!e&&t&&Object.keys(t).length>0,g=h.useMemo(()=>{if(!e&&!x)return[];const R=[];return x?Object.values(t).forEach(b=>{Object.values(b.vms).forEach(N=>{N.status==="running"&&!N.template&&R.push(N)})}):e&&Object.values(e.vms).forEach(b=>{b.status==="running"&&!b.template&&R.push(b)}),R},[e,t,x]),_=h.useMemo(()=>g.map((R,b)=>{var F;const N=b/g.length*Math.PI*2,C=R.cpu.usage_percent,L=R.memory.total_bytes>0?R.memory.used_bytes/R.memory.total_bytes*100:0,A=((F=R.disk)==null?void 0:F.usage_percent)||0,Y=Math.max(C,L,A),te=.2+Y/100*.6,O=pe(Y),$=Qi(R.vmid,e,t);return{vm:R,angle:N,distance:te,color:O,task:$}}),[g,e,t]),j=h.useMemo(()=>{if(!e&&!x)return[];const R=[];return x?Object.values(t).forEach(N=>{Object.values(N.vms).forEach(C=>R.push(C))}):e&&Object.values(e.vms).forEach(N=>R.push(N)),R.filter(N=>{if(N.status!=="running"||N.template)return!1;const C=N.memory.used_bytes/N.memory.total_bytes*100,L=N.disk.total_bytes>0?N.disk.used_bytes/N.disk.total_bytes*100:0;return N.cpu.usage_percent>80||C>85||L>85}).sort((N,C)=>{const L=N.memory.used_bytes/N.memory.total_bytes*100,A=C.memory.used_bytes/C.memory.total_bytes*100,Y=N.disk.total_bytes>0?N.disk.used_bytes/N.disk.total_bytes*100:0,te=C.disk.total_bytes>0?C.disk.used_bytes/C.disk.total_bytes*100:0,O=Math.max(N.cpu.usage_percent,L,Y);return Math.max(C.cpu.usage_percent,A,te)-O})},[e,t,x]);h.useEffect(()=>{const R=new Map;j.forEach((b,N)=>{R.set(`${b.node}/${b.vmid}`,N)}),f(R)},[j]);const z=h.useCallback(R=>{const b=s.current;if(!b)return;const N=b.getBoundingClientRect(),C=b.width/N.width,L=b.height/N.height,A=(R.clientX-N.left)*C,Y=(R.clientY-N.top)*L,te=Math.min(b.width,b.height),O=b.width/2,$=b.height/2,F=te*.4;let G=null;for(const X of _){const y=O+Math.cos(X.angle)*F*X.distance,W=$+Math.sin(X.angle)*F*X.distance,ee=Math.sqrt((A-y)**2+(Y-W)**2),ue=15*Math.max(C,L);if(ee<ue){G={vm:X.vm,x:R.clientX,y:R.clientY,pointX:y,pointY:W};break}}d(G)},[_]),I=h.useCallback(()=>{d(null)},[]),H=h.useCallback(R=>{const b=s.current;if(!b)return;const N=_.find($=>$.vm.node===R.node&&$.vm.vmid===R.vmid);if(!N)return;const C=Math.min(b.width,b.height),L=b.width/2,A=b.height/2,Y=C*.4,te=L+Math.cos(N.angle)*Y*N.distance,O=A+Math.sin(N.angle)*Y*N.distance;d({vm:N.vm,x:te,y:O,pointX:te,pointY:O})},[_]);return h.useEffect(()=>{if(n||w!=="done")return;const R=setInterval(()=>{l(b=>(b+2)%360)},50);return()=>clearInterval(R)},[n,w]),h.useEffect(()=>{const R=s.current;if(!R)return;const b=R.getContext("2d");if(!b)return;const N=Math.min(R.width,R.height),C=R.width/2,L=R.height/2,A=N*.4;b.clearRect(0,0,R.width,R.height),b.strokeStyle="rgba(0, 240, 255, 0.12)",b.lineWidth=.8;const Y=20;for(let W=C%Y;W<R.width;W+=Y)b.beginPath(),b.moveTo(W,0),b.lineTo(W,R.height),b.stroke();for(let W=L%Y;W<R.height;W+=Y)b.beginPath(),b.moveTo(0,W),b.lineTo(R.width,W),b.stroke();if(w!=="flip"&&w!=="done")return;b.globalAlpha=E,b.strokeStyle="rgba(0, 240, 255, 0.25)",b.lineWidth=1.5,b.font='13px "Share Tech Mono", monospace',b.fillStyle="rgba(0, 240, 255, 0.6)",b.textAlign="left";const te=["25%","50%","75%","100%"];for(let W=1;W<=4;W++){const ee=A*(W/4);b.beginPath(),b.arc(C,L,ee,0,Math.PI*2),b.stroke();const ue=C+ee+4,ne=L+4;b.fillText(te[W-1],ue,ne)}b.fillStyle="rgba(0, 255, 136, 0.8)",b.textAlign="center",b.font='14px "Share Tech Mono", monospace',b.fillText("0%",C,L-8),b.font='11px "Share Tech Mono", monospace',b.fillText("LOW",C,L+8),b.fillStyle="rgba(0, 240, 255, 0.5)",b.textAlign="left",b.font='10px "Share Tech Mono", monospace',b.beginPath(),b.moveTo(C-A,L),b.lineTo(C+A,L),b.moveTo(C,L-A),b.lineTo(C,L+A),b.stroke();const O=o*Math.PI/180;for(let W=0;W<8;W++){const ee=.12*(W+1),ue=.15-W*.015;b.fillStyle=`rgba(0, 240, 255, ${ue})`,b.beginPath(),b.moveTo(C,L),b.arc(C,L,A,O-ee,O-ee+.12),b.closePath(),b.fill()}b.save(),b.shadowBlur=20,b.shadowColor="#00f0ff";const $=b.createLinearGradient(C,L,C+Math.cos(O)*A,L+Math.sin(O)*A);$.addColorStop(0,"rgba(0, 255, 200, 1)"),$.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),$.addColorStop(1,"rgba(0, 240, 255, 0)"),b.strokeStyle=$,b.lineWidth=3,b.beginPath(),b.moveTo(C,L),b.lineTo(C+Math.cos(O)*A,L+Math.sin(O)*A),b.stroke(),b.lineWidth=1.5,$.addColorStop(0,"rgba(255, 255, 255, 1)"),b.stroke(),b.restore();const F=C+Math.cos(O)*A*.95,G=L+Math.sin(O)*A*.95,X=b.createRadialGradient(F,G,0,F,G,15);X.addColorStop(0,"rgba(0, 255, 200, 0.8)"),X.addColorStop(1,"rgba(0, 240, 255, 0)"),b.fillStyle=X,b.beginPath(),b.arc(F,G,15,0,Math.PI*2),b.fill();const y=[];_.forEach(W=>{const ee=`${W.vm.node}/${W.vm.vmid}`,ue=(W.angle*180/Math.PI+360)%360;(o-ue+360)%360<=5&&y.push({key:ee,point:{vm:W.vm,angle:W.angle,distance:W.distance,color:W.color,lastScanAngle:o}})}),y.length>0&&m(W=>{const ee=new Map(W);y.forEach(({key:ne,point:se})=>{ee.set(ne,se)});const ue=new Set(_.map(ne=>`${ne.vm.node}/${ne.vm.vmid}`));for(const ne of ee.keys())ue.has(ne)||ee.delete(ne);return ee}),_.forEach(W=>{var oe,Ve;const ee=C+Math.cos(W.angle)*A*W.distance,ue=L+Math.sin(W.angle)*A*W.distance,ne=(W.angle*180/Math.PI+360)%360,se=(o-ne+360)%360;let Te;se<20?Te=1:se<60?Te=1-(se-20)/40*.4:Te=.6-(se-60)/300*.45;let K="#00ff88";W.color==="warning"&&(K="#ff6b00"),W.color==="danger"&&(K="#ff0040");const Z=!!W.task,ie=(Ve=(oe=W.task)==null?void 0:oe.task_type)==null?void 0:Ve.includes("migrate");if(Z){const nt=ie?"#00f0ff":"#a855f7",Ue=Date.now()/500%1;if(b.beginPath(),b.arc(ee,ue,12+Ue*8,0,Math.PI*2),b.strokeStyle=nt,b.lineWidth=1.5,b.globalAlpha=(1-Ue)*.6*E,b.stroke(),b.beginPath(),b.arc(ee,ue,10,0,Math.PI*2),b.strokeStyle=nt,b.lineWidth=1,b.globalAlpha=.8*E,b.stroke(),ie){const $e=Date.now()/200%(Math.PI*2);b.beginPath(),b.arc(ee,ue,15,$e,$e+Math.PI/2),b.strokeStyle=nt,b.lineWidth=2,b.globalAlpha=.9*E,b.stroke();for(let ye=0;ye<3;ye++){const je=$e+ye*Math.PI*2/3,He=8+(Date.now()/100+ye*50)%100/100*10,qe=ee+Math.cos(je)*He,Ye=ue+Math.sin(je)*He;b.beginPath(),b.arc(qe,Ye,1.5,0,Math.PI*2),b.fillStyle=nt,b.globalAlpha=(.8-(Date.now()/100+ye*50)%100/100*.6)*E,b.fill()}}b.globalAlpha=E}b.beginPath(),b.arc(ee,ue,4+W.vm.cpu.usage_percent/100*4,0,Math.PI*2),b.fillStyle=K,b.globalAlpha=Te*E,b.fill(),b.shadowBlur=10,b.shadowColor=K,b.fill(),b.shadowBlur=0,b.globalAlpha=E}),b.beginPath(),b.arc(C,L,6,0,Math.PI*2),b.fillStyle="#00f0ff",b.fill()},[o,_,w,E]),h.useEffect(()=>{const R=s.current;if(!R)return;const b=()=>{const N=R.parentElement;N&&(R.width=N.clientWidth,R.height=N.clientHeight)};return b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]),!e&&!x?a.jsx("div",{className:"radar-scan empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:r("cluster.select")})]})}):a.jsxs("div",{className:"radar-scan",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"radar-header",children:a.jsxs("h1",{className:"radar-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),r("nav.radar_scan").toUpperCase()]})}),a.jsxs("div",{className:"radar-layout",children:[a.jsxs("div",{className:`radar-container ${w!=="done"?"entering":""} ${w==="grid"?"grid-phase":""}`,ref:i,style:{position:"relative"},children:[(w==="line"||w==="flip")&&a.jsxs("div",{className:`radar-entry-overlay ${w}`,children:[a.jsx("div",{className:"entry-line"}),a.jsx("div",{className:"entry-circle"}),a.jsx("div",{className:"entry-glow"})]}),a.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:z,onMouseLeave:I,style:{position:"absolute",top:0,left:0,cursor:c?"pointer":"default"}}),a.jsx("div",{className:"radar-overlay",style:{opacity:E},children:a.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",o.toFixed(0),"°"]})}),a.jsxs("div",{className:"radar-legend",style:{opacity:E},children:[a.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),a.jsx("span",{children:"<80%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),a.jsx("span",{children:"80-95%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),a.jsx("span",{children:">95%"}),a.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]}),c&&(()=>{var ae,ge,be;const R=s.current;if(!R)return null;const b=R.width,N=R.height,C=R.getBoundingClientRect(),L=C.width,A=C.height,Y=L/b,te=A/N,O=c.pointX*Y,$=c.pointY*te,F=L,G=A,X=180,y=120,W=X/2,ee=y/2,ue=50,ne=120,se=F/2,Te=G/2,K=O-se,Z=$-Te,ie=Math.sqrt(K*K+Z*Z)||1,oe=K/ie,Ve=Z/ie,nt=(re,de)=>{const he=re-W,Ge=re+W,De=de-ee,Zt=de+ee;if(O>=he&&O<=Ge&&$>=De&&$<=Zt)return-1;const Le=Math.max(he,Math.min(Ge,O)),Ze=Math.max(De,Math.min(Zt,$));return Math.sqrt((O-Le)**2+($-Ze)**2)},Ue=20,$e=(re,de)=>({x:Math.max(W+Ue,Math.min(F-W-Ue,re)),y:Math.max(ee+Ue,Math.min(G-ee-Ue,de))}),je=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((re,de)=>{const he=re.dx*oe+re.dy*Ve;return de.dx*oe+de.dy*Ve-he});let He={x:O+oe*ne,y:$+Ve*ne},qe=!1;for(const re of je){const de={x:O+re.dx*ne,y:$+re.dy*ne},he=$e(de.x,de.y),Ge=he.x-O,De=he.y-$,Le=Math.sqrt(Ge*Ge+De*De)>30&&Math.abs(Math.abs(Ge)-Math.abs(De))<20,Ze=nt(he.x,he.y);if(Le&&Ze>=ue){He=he,qe=!0;break}}if(!qe)for(const re of je){const de={x:O+re.dx*(ne+60),y:$+re.dy*(ne+60)},he=$e(de.x,de.y),Ge=he.x-O,De=he.y-$,Le=Math.sqrt(Ge*Ge+De*De)>30&&Math.abs(Math.abs(Ge)-Math.abs(De))<20,Ze=nt(he.x,he.y);if(Le&&Ze>=ue){He=he,qe=!0;break}}if(!qe){const re=je[0],de=re.dx>0?(F-W-10-O)/re.dx:(W+10-O)/re.dx,he=re.dy>0?(G-ee-10-$)/re.dy:(ee+10-$)/re.dy,Ge=Math.min(Math.abs(de),Math.abs(he),ne),De=Math.max(ue+20,Ge);He={x:O+re.dx*De,y:$+re.dy*De}}const Ye=20,Vt=Math.max(W+Ye,Math.min(F-W-Ye,He.x)),Pe=Math.max(ee+Ye,Math.min(G-ee-Ye,He.y)),Nt=O,ke=$,ut=20,pt=28,Qe=5,S=-Math.PI/2,D=Vt-W,T=Pe-ee,P=Vt,B=Pe,J=c.vm.memory.total_bytes>0?c.vm.memory.used_bytes/c.vm.memory.total_bytes*100:0,Q=((ae=c.vm.disk)==null?void 0:ae.usage_percent)||0,U=Math.max(c.vm.cpu.usage_percent,J,Q),le=pe(U),M={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[le]||"#00f0ff";return F<=0||G<=0?null:a.jsxs(a.Fragment,{children:[(()=>{const re=Math.sqrt((P-Nt)**2+(B-ke)**2),de=Math.atan2(B-ke,P-Nt)*180/Math.PI;return a.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Nt,top:ke,width:re,height:2,background:`linear-gradient(90deg, ${M}, ${M}80)`,transformOrigin:"0 50%",transform:`rotate(${de}deg)`,boxShadow:`0 0 8px ${M}, 0 0 16px ${M}60`,pointerEvents:"none",zIndex:99}})})(),a.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Nt-pt-5,top:ke-pt-5,width:(pt+5)*2,height:(pt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[a.jsx("defs",{children:a.jsxs("filter",{id:"frameGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const re=pt+5,de=pt+5,he=[];for(let Le=0;Le<Qe;Le++){const Ze=S+Le*2*Math.PI/Qe;he.push(`${re+ut*Math.cos(Ze)},${de+ut*Math.sin(Ze)}`)}const Ge=he.join(" "),De=[];for(let Le=0;Le<Qe;Le++){const Ze=S+Le*2*Math.PI/Qe;De.push(`${re+pt*Math.cos(Ze)},${de+pt*Math.sin(Ze)}`)}const Zt=De.join(" ");return a.jsxs(a.Fragment,{children:[a.jsx("polygon",{points:Zt,fill:"none",stroke:M,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${re}px ${de}px`}}),a.jsx("polygon",{points:Ge,fill:"none",stroke:M,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(Le=>{const Ze=S+Le*2*Math.PI/Qe,Rn=re+ut*Math.cos(Ze),Tn=de+ut*Math.sin(Ze),Ln=6,$r=S+(Le-1+Qe)%Qe*2*Math.PI/Qe,Pr=S+(Le+1)%Qe*2*Math.PI/Qe,Ta=Rn+Ln*Math.cos($r+Math.PI),La=Tn+Ln*Math.sin($r+Math.PI),Ia=Rn+Ln*Math.cos(Pr+Math.PI),Aa=Tn+Ln*Math.sin(Pr+Math.PI);return a.jsxs("g",{children:[a.jsx("line",{x1:Rn,y1:Tn,x2:Ta,y2:La,stroke:M,strokeWidth:"2"}),a.jsx("line",{x1:Rn,y1:Tn,x2:Ia,y2:Aa,stroke:M,strokeWidth:"2"})]},Le)}),a.jsx("line",{x1:re-5,y1:de,x2:re+5,y2:de,stroke:M,strokeWidth:"1"}),a.jsx("line",{x1:re,y1:de-5,x2:re,y2:de+5,stroke:M,strokeWidth:"1"})]})})()]}),a.jsxs("div",{className:`radar-tooltip tooltip-${le}`,style:{position:"absolute",left:D,top:T,width:X,height:y,borderColor:M,boxShadow:`0 0 15px ${M}40, 0 0 30px ${M}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[a.jsx("div",{className:"tooltip-corner tl",style:{borderColor:M}}),a.jsx("div",{className:"tooltip-corner tr",style:{borderColor:M}}),a.jsx("div",{className:"tooltip-corner bl",style:{borderColor:M}}),a.jsx("div",{className:"tooltip-corner br",style:{borderColor:M}}),a.jsxs("div",{className:"tooltip-header",children:[a.jsx("span",{className:"tooltip-name",children:c.vm.name}),a.jsxs("span",{className:"tooltip-id",children:["#",c.vm.vmid]})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"NODE"}),a.jsx("span",{className:"tooltip-value",children:c.vm.node})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"CPU"}),a.jsx("span",{className:`tooltip-value text-${pe(c.vm.cpu.usage_percent)}`,children:Ae(c.vm.cpu.usage_percent,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"MEMORY"}),a.jsx("span",{className:`tooltip-value text-${pe(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100)}`,children:Ae(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"DISKIO"}),a.jsx("span",{className:`tooltip-value text-${pe(((ge=c.vm.disk)==null?void 0:ge.usage_percent)||0)}`,children:Ae(((be=c.vm.disk)==null?void 0:be.usage_percent)||0,1)})]}),(()=>{const re=Qi(c.vm.vmid,e,t),de=bf(re);return de?a.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${de.color}40`,marginTop:4,paddingTop:4},children:[a.jsx("span",{className:"tooltip-label",children:"TASK"}),a.jsx("span",{className:"tooltip-value",style:{color:de.color},children:de.label})]}):null})(),a.jsx("div",{className:"tooltip-scanline"})]})]})})()]}),a.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("h2",{className:"panel-title font-display",children:r("radar.anomalies")}),a.jsx("span",{className:"anomaly-count",children:j.length})]}),a.jsx("div",{className:"anomaly-list",children:j.length===0?a.jsxs("div",{className:"no-anomalies",children:[a.jsx("span",{className:"status-indicator"}),a.jsx("span",{children:r("radar.all_normal")})]}):j.map((R,b)=>{const N=`${R.node}/${R.vmid}`,C=p.get(N),L=(c==null?void 0:c.vm.node)===R.node&&(c==null?void 0:c.vm.vmid)===R.vmid,A=Qi(R.vmid,e,t);return a.jsx(Bg,{vm:R,index:b,previousIndex:C,onClick:()=>H(R),isSelected:L,task:A},N)})})]})]}),a.jsx("style",{children:`
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
          background: rgba(0, 10, 20, 0.8);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
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

        /* Narrow screens: reposition legend to avoid overlapping radar */
        @media (max-width: 1024px) {
          .radar-legend {
            position: relative;
            bottom: auto;
            left: auto;
            margin: var(--spacing-sm) auto;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 95%;
            background: rgba(0, 10, 20, 0.9);
          }

          .radar-legend .legend-note {
            width: 100%;
            text-align: center;
            margin-top: 4px;
            margin-left: 0;
          }
        }
      `})]})}function Vg({value:e,duration:t=800,suffix:n=""}){const[r,s]=h.useState(0),i=h.useRef(0),o=h.useRef(0);return h.useEffect(()=>{i.current=r;const l=performance.now(),c=d=>{const p=d-l,f=Math.min(p/t,1),u=1-Math.pow(1-f,3);s(i.current+(e-i.current)*u),f<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),a.jsxs(a.Fragment,{children:[r.toFixed(0),n]})}function Gs({value:e,duration:t=800}){const[n,r]=h.useState(0),s=h.useRef(0),i=h.useRef(0);return h.useEffect(()=>{s.current=n;const o=performance.now(),l=c=>{const d=c-o,p=Math.min(d/t,1),f=1-Math.pow(1-p,3);r(s.current+(e-s.current)*f),p<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),a.jsx(a.Fragment,{children:ve(n)})}function Ug({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"ceph-core visible",children:[a.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),a.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),a.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),a.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),a.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),a.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),a.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),a.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:r,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${r})`}}),a.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),a.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),a.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:a.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),a.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:a.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),a.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:a.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),a.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),a.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:a.jsx(Vg,{value:n,duration:1500,suffix:"%"})})]}),a.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),a.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),a.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function Hg({mons:e,mgrs:t,mds:n}){const{t:r}=Oe();return a.jsxs("div",{className:"daemon-orbital",children:[a.jsx("div",{className:"orbital-title",children:r("ceph.cluster_daemons")}),a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mon",children:"MON"}),a.jsx("span",{className:"daemon-count",children:e.length})]}),a.jsx("div",{className:"daemon-nodes",children:e.map(s=>a.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&a.jsx("div",{className:"leader-glow"})]},s.name))})]}),a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mgr",children:"MGR"}),a.jsx("span",{className:"daemon-count",children:t.length})]}),a.jsx("div",{className:"daemon-nodes",children:t.map(s=>a.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&a.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&a.jsxs("div",{className:"daemon-row",children:[a.jsxs("div",{className:"daemon-label",children:[a.jsx("span",{className:"daemon-type mds",children:"MDS"}),a.jsx("span",{className:"daemon-count",children:n.length})]}),a.jsx("div",{className:"daemon-nodes",children:n.map(s=>a.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[a.jsx("span",{className:"node-name",children:s.name}),a.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&a.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function Yg({osds:e,onSelect:t}){const{t:n}=Oe(),r=h.useMemo(()=>{const i={};return e.forEach(o=>{const l=o.host||"unknown";i[l]||(i[l]=[]),i[l].push(o)}),Object.entries(i).sort(([o],[l])=>o.localeCompare(l,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(i=>i.status==="up").length;return a.jsxs("div",{className:"osd-grid-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),a.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),a.jsx("div",{className:"osd-hosts",children:(()=>{let i=0;return r.map(([o,l])=>a.jsxs("div",{className:"osd-host-group",children:[a.jsx("div",{className:"host-label",children:o}),a.jsx("div",{className:"osd-hexgrid",children:l.sort((c,d)=>c.id-d.id).map(c=>{const d=c.total_bytes>0?c.used_bytes/c.total_bytes*100:0,p=c.status!=="up"||pe(d)==="danger"?"#ff0040":pe(d)==="warning"?"#ff6b00":"#00ff88",f=i*30;return i++,a.jsx("div",{className:`osd-hex ${c.status==="up"?"up":"down"}`,style:{"--osd-color":p,animationDelay:`${f}ms`},onClick:()=>t(c),title:`OSD.${c.id} - ${Ae(d,0)}`,children:a.jsx("span",{className:"osd-id",children:c.id})},c.id)})})]},o))})()})]})}function Gg({readBps:e,writeBps:t,readOps:n,writeOps:r,isPaused:s=!1}){const i=h.useRef(null),o=h.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),l=h.useRef(0),c=h.useRef(0),d=100,p=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return h.useEffect(()=>{o.current.targetRead=e,o.current.targetWrite=t},[e,t]),h.useEffect(()=>{const f=i.current;if(!f)return;const u=f.getContext("2d");if(!u)return;const m=window.devicePixelRatio||1,w=()=>{const I=f.getBoundingClientRect();return f.width=I.width*m,f.height=I.height*m,u.setTransform(m,0,0,m,0,0),{width:I.width,height:I.height}};let{width:k,height:E}=w();const v=42,x=k-v;let g=0;const _=50;let j=0;const z=I=>{const H=I-g;g=I,j+=H;const R=.1;o.current.currentRead+=(o.current.targetRead-o.current.currentRead)*R,o.current.currentWrite+=(o.current.targetWrite-o.current.currentWrite)*R,j>=_&&(j=0,o.current.read.push(o.current.currentRead),o.current.write.push(o.current.currentWrite),o.current.read.length>d&&o.current.read.shift(),o.current.write.length>d&&o.current.write.shift()),c.current=(c.current+.5)%20,u.clearRect(0,0,k,E);const b=Math.max(...o.current.read,...o.current.write,1),N=8,C=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let A=0;A<=C;A++){const Y=N+A/C*(E-N*2),te=b*(1-A/C);u.fillText(p(te),v-4,Y)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let A=0;A<=C;A++){const Y=N+A/C*(E-N*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-c.current,u.moveTo(v,Y),u.lineTo(k,Y),u.stroke()}u.setLineDash([]);const L=(A,Y,te)=>{if(A.length<2)return;const O=A.map((F,G)=>({x:v+G/(d-1)*x,y:E-N-F/b*(E-N*2)}));u.strokeStyle=te,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(O[0].x,O[0].y);for(let F=1;F<O.length-1;F++){const G=(O[F].x+O[F+1].x)/2,X=(O[F].y+O[F+1].y)/2;u.quadraticCurveTo(O[F].x,O[F].y,G,X)}u.lineTo(O[O.length-1].x,O[O.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=Y,u.lineWidth=2,u.shadowColor=Y,u.shadowBlur=8,u.beginPath(),u.moveTo(O[0].x,O[0].y);for(let F=1;F<O.length-1;F++){const G=(O[F].x+O[F+1].x)/2,X=(O[F].y+O[F+1].y)/2;u.quadraticCurveTo(O[F].x,O[F].y,G,X)}u.lineTo(O[O.length-1].x,O[O.length-1].y),u.stroke(),u.shadowBlur=0;const $=3;for(let F=0;F<$;F++){const G=(c.current/20+F/$)%1,X=Math.floor(G*(O.length-1));X<O.length&&(u.fillStyle=Y,u.globalAlpha=.8,u.beginPath(),u.arc(O[X].x,O[X].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};L(o.current.write,"#ff6b00","#ff6b00"),L(o.current.read,"#00ff88","#00ff88"),s||(l.current=requestAnimationFrame(z))};return l.current=requestAnimationFrame(z),()=>cancelAnimationFrame(l.current)},[s]),a.jsxs("div",{className:"io-wave-panel",children:[a.jsx("div",{className:"panel-header",children:a.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),a.jsx("canvas",{ref:i,className:"io-canvas",style:{width:"100%",height:"100px"}}),a.jsxs("div",{className:"io-stats",children:[a.jsxs("div",{className:"io-stat read",children:[a.jsx("span",{className:"io-icon",children:"▼"}),a.jsx("span",{className:"io-label",children:"READ"}),a.jsxs("span",{className:"io-value",children:[ve(e),"/s"]}),a.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),a.jsxs("div",{className:"io-stat write",children:[a.jsx("span",{className:"io-icon",children:"▲"}),a.jsx("span",{className:"io-label",children:"WRITE"}),a.jsxs("span",{className:"io-value",children:[ve(t),"/s"]}),a.jsxs("span",{className:"io-ops",children:[r.toFixed(0)," IOPS"]})]})]})]})}function Td({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"pool-energy-bar visible",children:[a.jsxs("div",{className:"pool-info",children:[a.jsx("span",{className:"pool-name",children:e.name}),a.jsx("span",{className:"pool-size",children:ve(e.used_bytes)})]}),a.jsxs("div",{className:"energy-track",children:[a.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${r}88, ${r})`,boxShadow:`0 0 10px ${r}`}}),a.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:r}})]}),a.jsxs("span",{className:"pool-percent",style:{color:r},children:[n.toFixed(1),"%"]})]})}function Xg({osd:e,onClose:t}){const{t:n}=Oe(),r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=pe(r);return a.jsx("div",{className:"osd-popup-overlay",onClick:t,children:a.jsxs("div",{className:"osd-popup",onClick:i=>i.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",children:[a.jsxs("div",{className:"popup-title",children:[a.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),a.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),a.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),a.jsxs("div",{className:"popup-content",children:[a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:"Host"}),a.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),a.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),a.jsxs("div",{className:"storage-section",children:[a.jsx("div",{className:"storage-bar",children:a.jsx("div",{className:`storage-fill ${s}`,style:{width:`${r}%`}})}),a.jsxs("div",{className:"storage-stats",children:[a.jsxs("span",{children:[ve(e.used_bytes)," / ",ve(e.total_bytes)]}),a.jsx("span",{className:`text-${s}`,children:Ae(r,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&a.jsxs("div",{className:"latency-section",children:[a.jsx("div",{className:"latency-title",children:n("ceph.latency")}),a.jsxs("div",{className:"latency-grid",children:[a.jsxs("div",{className:"latency-item",children:[a.jsx("span",{className:"latency-label",children:n("ceph.apply")}),a.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),a.jsxs("div",{className:"latency-item",children:[a.jsx("span",{className:"latency-label",children:n("ceph.commit")}),a.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function Kg({ceph:e}){const{t}=Oe(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=100-n;return a.jsxs("div",{className:"storage-summary",children:[a.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),a.jsxs("div",{className:"summary-stats",children:[a.jsxs("div",{className:"stat-block used",children:[a.jsx("span",{className:"stat-value",children:ve(e.used_bytes)}),a.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),a.jsx("div",{className:"stat-divider",children:"/"}),a.jsxs("div",{className:"stat-block total",children:[a.jsx("span",{className:"stat-value",children:ve(e.total_bytes)}),a.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),a.jsxs("div",{className:"summary-bar",children:[a.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),a.jsx("div",{className:"bar-available",style:{width:`${r}%`}})]}),a.jsxs("div",{className:"summary-legend",children:[a.jsxs("span",{className:"legend-item used",children:[a.jsx("span",{className:"legend-dot"})," Used ",Ae(n,1)]}),a.jsxs("span",{className:"legend-item available",children:[a.jsx("span",{className:"legend-dot"})," Available ",Ae(r,1)]})]})]})}function qg({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,r=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return a.jsx("div",{className:"compact-core",children:a.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[a.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),a.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),a.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),a.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:r,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${r})`,transition:"stroke-dasharray 0.5s ease"}}),a.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),a.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),a.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:Ae(n,0)})]})})}function Qg({mons:e,mgrs:t,mds:n}){return a.jsxs("div",{className:"compact-daemons",children:[a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mon",children:"MON"}),a.jsx("div",{className:"daemon-dots",children:e.map(r=>a.jsx("span",{className:`daemon-dot mon ${r.state}`,title:`${r.name} - ${r.state}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:e.length})]}),a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),a.jsx("div",{className:"daemon-dots",children:t.map(r=>a.jsx("span",{className:`daemon-dot mgr ${r.active?"active":"standby"}`,title:`${r.name} - ${r.active?"Active":"Standby"}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&a.jsxs("div",{className:"daemon-row",children:[a.jsx("span",{className:"daemon-badge mds",children:"MDS"}),a.jsx("div",{className:"daemon-dots",children:n.map(r=>a.jsx("span",{className:`daemon-dot mds ${r.state}`,title:`${r.name} - ${r.state}`},r.name))}),a.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function Zg({ceph:e}){const{t}=Oe(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return a.jsxs("div",{className:"compact-storage",children:[a.jsxs("div",{className:"storage-row",children:[a.jsx("span",{className:"storage-label",children:t("ceph.used")}),a.jsx("span",{className:"storage-value",children:a.jsx(Gs,{value:e.used_bytes})})]}),a.jsx("div",{className:"compact-bar",children:a.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),a.jsxs("div",{className:"storage-row",children:[a.jsx("span",{className:"storage-label",children:t("ceph.total")}),a.jsx("span",{className:"storage-value",children:a.jsx(Gs,{value:e.total_bytes})})]})]})}function Jg({osds:e,onSelect:t}){const n=e.filter(r=>r.status==="up").length;return a.jsxs("div",{className:"compact-osd-panel",children:[a.jsxs("div",{className:"compact-osd-header",children:[a.jsx("span",{className:"compact-osd-title",children:"OSD"}),a.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),a.jsx("div",{className:"compact-osd-grid",children:e.sort((r,s)=>r.id-s.id).map((r,s)=>{const i=r.total_bytes>0?r.used_bytes/r.total_bytes*100:0,o=r.status!=="up"||i>=95?"#ff0040":i>=80?"#ff6b00":"#00ff88";return a.jsx("div",{className:`compact-osd ${r.status==="up"?"up":"down"}`,style:{"--osd-color":o,animationDelay:`${s*20}ms`},onClick:()=>t(r),title:`OSD.${r.id}`,children:r.id},r.id)})})]})}function eh({readBps:e,writeBps:t}){return a.jsxs("div",{className:"compact-io",children:[a.jsxs("div",{className:"io-row read",children:[a.jsx("span",{className:"io-arrow",children:"▼"}),a.jsx("span",{className:"io-label",children:"R"}),a.jsxs("span",{className:"io-val",children:[a.jsx(Gs,{value:e,duration:500}),"/s"]})]}),a.jsxs("div",{className:"io-row write",children:[a.jsx("span",{className:"io-arrow",children:"▲"}),a.jsx("span",{className:"io-label",children:"W"}),a.jsxs("span",{className:"io-val",children:[a.jsx(Gs,{value:t,duration:500}),"/s"]})]})]})}function th({pools:e,totalBytes:t}){const n=e.filter(r=>!r.name.startsWith(".")&&!r.name.endsWith("_metadata")).map(r=>({...r,name:r.name.endsWith("_data")?r.name.replace(/_data$/,""):r.name}));return n.length===0?null:a.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(r=>{const s=r.total_bytes>0?r.used_bytes/r.total_bytes*100:r.used_bytes/t*100,i=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return a.jsxs("div",{className:"compact-pool",children:[a.jsx("span",{className:"pool-label",children:r.name.substring(0,12)}),a.jsx("div",{className:"pool-mini-bar",children:a.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:i}})}),a.jsx("span",{className:"pool-pct",style:{color:i},children:Ae(s,0)})]},r.name)}),n.length>6&&a.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function nh({ceph:e,clusterName:t,onOSDSelect:n,compact:r=!1,isPaused:s=!1}){const{t:i}=Oe();if(r)return a.jsxs("div",{className:"ceph-cluster-compact",children:[a.jsx("div",{className:"compact-left",children:a.jsx(qg,{ceph:e})}),a.jsxs("div",{className:"compact-middle",children:[a.jsx(Qg,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),a.jsx(Zg,{ceph:e}),a.jsx(eh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),a.jsx("div",{className:"compact-right",children:a.jsx(Jg,{osds:e.osds,onSelect:n})}),a.jsx("div",{className:"compact-pools-section",children:a.jsx(th,{pools:e.pools,totalBytes:e.total_bytes})})]});const o=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),l=o.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),c=o.filter(d=>!d.name.toLowerCase().includes("cephfs"));return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"ceph-content-full",children:[a.jsxs("div",{className:"col-core",children:[a.jsx(Ug,{ceph:e}),a.jsx(Kg,{ceph:e})]}),a.jsxs("div",{className:"col-daemons",children:[a.jsx(Hg,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),a.jsxs("div",{className:"pools-inline",children:[c.length>0&&a.jsxs("div",{className:"pool-group-inline",children:[a.jsx("div",{className:"pool-group-title",children:i("ceph.ceph_pools")}),a.jsx("div",{className:"pools-list",children:c.map((d,p)=>a.jsx(Td,{pool:d,totalBytes:e.total_bytes},d.name))})]}),l.length>0&&a.jsxs("div",{className:"pool-group-inline",children:[a.jsx("div",{className:"pool-group-title",children:i("ceph.cephfs_pools")}),a.jsx("div",{className:"pools-list",children:l.map((d,p)=>a.jsx(Td,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),a.jsxs("div",{className:"col-osd",children:[a.jsx(Gg,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),a.jsx(Yg,{osds:e.osds,onSelect:n})]})]})})}function rh({cluster:e,clusters:t,isPaused:n=!1}){const{t:r}=Oe(),[s,i]=h.useState(null),o=!e&&t&&Object.keys(t).length>0,l=h.useMemo(()=>o?Object.entries(t).filter(([c,d])=>d.ceph).map(([c,d])=>({id:c,name:d.name||c,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,o]);return!e&&!o?a.jsxs("div",{className:"ceph-constellation empty",children:[a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:r("cluster.select")})]}),a.jsx("style",{children:Zi})]}):l.length===0?a.jsxs("div",{className:"ceph-constellation empty",children:[a.jsxs("div",{className:"empty-message",children:[a.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 8v4M12 16h.01"})]}),a.jsx("span",{children:r("ceph.no_cluster")})]}),a.jsx("style",{children:Zi})]}):a.jsxs("div",{className:"ceph-constellation",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"ceph-header",children:a.jsxs("h1",{className:"ceph-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),a.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),r("ceph.title")]})}),a.jsx("div",{className:"ceph-clusters-stack",children:l.map((c,d)=>{const p=c.ceph.health==="HEALTH_OK"?"success":c.ceph.health==="HEALTH_WARN"?"warning":"danger";return a.jsxs("div",{className:"ceph-cluster-section",children:[l.length>1&&a.jsxs("div",{className:"cluster-section-header",children:[a.jsx("span",{className:`section-health ${p}`}),a.jsx("span",{className:"section-name",children:c.name}),a.jsxs("span",{className:"section-osd",children:[c.ceph.osd_up,"/",c.ceph.osd_count," OSD"]}),a.jsx("div",{className:"section-line"})]}),a.jsx(nh,{ceph:c.ceph,clusterName:l.length===1?c.name:void 0,onOSDSelect:i,compact:l.length>1,isPaused:n})]},c.id)})}),s&&a.jsx(Xg,{osd:s,onClose:()=>i(null)}),a.jsx("style",{children:Zi})]})}const Zi=`
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
`;var ah={value:()=>{}};function wf(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new ys(n)}function ys(e){this._=e}function sh(e,t){return e.trim().split(/^|\s+/).map(function(n){var r="",s=n.indexOf(".");if(s>=0&&(r=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}ys.prototype=wf.prototype={constructor:ys,on:function(e,t){var n=this._,r=sh(e+"",n),s,i=-1,o=r.length;if(arguments.length<2){for(;++i<o;)if((s=(e=r[i]).type)&&(s=ih(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++i<o;)if(s=(e=r[i]).type)n[s]=Ld(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Ld(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new ys(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),r=0,s,i;r<s;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=this._[e],r=0,s=i.length;r<s;++r)i[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],s=0,i=r.length;s<i;++s)r[s].value.apply(t,n)}};function ih(e,t){for(var n=0,r=e.length,s;n<r;++n)if((s=e[n]).name===t)return s.value}function Ld(e,t,n){for(var r=0,s=e.length;r<s;++r)if(e[r].name===t){e[r]=ah,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Qo="http://www.w3.org/1999/xhtml";const Id={svg:"http://www.w3.org/2000/svg",xhtml:Qo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function vi(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Id.hasOwnProperty(t)?{space:Id[t],local:e}:e}function oh(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Qo&&t.documentElement.namespaceURI===Qo?t.createElement(e):t.createElementNS(n,e)}}function lh(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function kf(e){var t=vi(e);return(t.local?lh:oh)(t)}function ch(){}function Zl(e){return e==null?ch:function(){return this.querySelector(e)}}function dh(e){typeof e!="function"&&(e=Zl(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=new Array(o),c,d,p=0;p<o;++p)(c=i[p])&&(d=e.call(c,c.__data__,p,i))&&("__data__"in c&&(d.__data__=c.__data__),l[p]=d);return new Bt(r,this._parents)}function uh(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function ph(){return[]}function jf(e){return e==null?ph:function(){return this.querySelectorAll(e)}}function fh(e){return function(){return uh(e.apply(this,arguments))}}function mh(e){typeof e=="function"?e=fh(e):e=jf(e);for(var t=this._groups,n=t.length,r=[],s=[],i=0;i<n;++i)for(var o=t[i],l=o.length,c,d=0;d<l;++d)(c=o[d])&&(r.push(e.call(c,c.__data__,d,o)),s.push(c));return new Bt(r,s)}function _f(e){return function(){return this.matches(e)}}function Nf(e){return function(t){return t.matches(e)}}var gh=Array.prototype.find;function hh(e){return function(){return gh.call(this.children,e)}}function xh(){return this.firstElementChild}function vh(e){return this.select(e==null?xh:hh(typeof e=="function"?e:Nf(e)))}var yh=Array.prototype.filter;function bh(){return Array.from(this.children)}function wh(e){return function(){return yh.call(this.children,e)}}function kh(e){return this.selectAll(e==null?bh:wh(typeof e=="function"?e:Nf(e)))}function jh(e){typeof e!="function"&&(e=_f(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=[],c,d=0;d<o;++d)(c=i[d])&&e.call(c,c.__data__,d,i)&&l.push(c);return new Bt(r,this._parents)}function Sf(e){return new Array(e.length)}function _h(){return new Bt(this._enter||this._groups.map(Sf),this._parents)}function Xs(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Xs.prototype={constructor:Xs,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Nh(e){return function(){return e}}function Sh(e,t,n,r,s,i){for(var o=0,l,c=t.length,d=i.length;o<d;++o)(l=t[o])?(l.__data__=i[o],r[o]=l):n[o]=new Xs(e,i[o]);for(;o<c;++o)(l=t[o])&&(s[o]=l)}function Ch(e,t,n,r,s,i,o){var l,c,d=new Map,p=t.length,f=i.length,u=new Array(p),m;for(l=0;l<p;++l)(c=t[l])&&(u[l]=m=o.call(c,c.__data__,l,t)+"",d.has(m)?s[l]=c:d.set(m,c));for(l=0;l<f;++l)m=o.call(e,i[l],l,i)+"",(c=d.get(m))?(r[l]=c,c.__data__=i[l],d.delete(m)):n[l]=new Xs(e,i[l]);for(l=0;l<p;++l)(c=t[l])&&d.get(u[l])===c&&(s[l]=c)}function Mh(e){return e.__data__}function Eh(e,t){if(!arguments.length)return Array.from(this,Mh);var n=t?Ch:Sh,r=this._parents,s=this._groups;typeof e!="function"&&(e=Nh(e));for(var i=s.length,o=new Array(i),l=new Array(i),c=new Array(i),d=0;d<i;++d){var p=r[d],f=s[d],u=f.length,m=zh(e.call(p,p&&p.__data__,d,r)),w=m.length,k=l[d]=new Array(w),E=o[d]=new Array(w),v=c[d]=new Array(u);n(p,f,k,E,v,m,t);for(var x=0,g=0,_,j;x<w;++x)if(_=k[x]){for(x>=g&&(g=x+1);!(j=E[g])&&++g<w;);_._next=j||null}}return o=new Bt(o,r),o._enter=l,o._exit=c,o}function zh(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function $h(){return new Bt(this._exit||this._groups.map(Sf),this._parents)}function Ph(e,t,n){var r=this.enter(),s=this,i=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?i.remove():n(i),r&&s?r.merge(s).order():s}function Rh(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,s=n.length,i=r.length,o=Math.min(s,i),l=new Array(s),c=0;c<o;++c)for(var d=n[c],p=r[c],f=d.length,u=l[c]=new Array(f),m,w=0;w<f;++w)(m=d[w]||p[w])&&(u[w]=m);for(;c<s;++c)l[c]=n[c];return new Bt(l,this._parents)}function Th(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],s=r.length-1,i=r[s],o;--s>=0;)(o=r[s])&&(i&&o.compareDocumentPosition(i)^4&&i.parentNode.insertBefore(o,i),i=o);return this}function Lh(e){e||(e=Ih);function t(f,u){return f&&u?e(f.__data__,u.__data__):!f-!u}for(var n=this._groups,r=n.length,s=new Array(r),i=0;i<r;++i){for(var o=n[i],l=o.length,c=s[i]=new Array(l),d,p=0;p<l;++p)(d=o[p])&&(c[p]=d);c.sort(t)}return new Bt(s,this._parents).order()}function Ih(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Ah(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Oh(){return Array.from(this)}function Fh(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],s=0,i=r.length;s<i;++s){var o=r[s];if(o)return o}return null}function Dh(){let e=0;for(const t of this)++e;return e}function Bh(){return!this.node()}function Wh(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var s=t[n],i=0,o=s.length,l;i<o;++i)(l=s[i])&&e.call(l,l.__data__,i,s);return this}function Vh(e){return function(){this.removeAttribute(e)}}function Uh(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Hh(e,t){return function(){this.setAttribute(e,t)}}function Yh(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Gh(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Xh(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Kh(e,t){var n=vi(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?Uh:Vh:typeof t=="function"?n.local?Xh:Gh:n.local?Yh:Hh)(n,t))}function Cf(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function qh(e){return function(){this.style.removeProperty(e)}}function Qh(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Zh(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function Jh(e,t,n){return arguments.length>1?this.each((t==null?qh:typeof t=="function"?Zh:Qh)(e,t,n??"")):Sr(this.node(),e)}function Sr(e,t){return e.style.getPropertyValue(t)||Cf(e).getComputedStyle(e,null).getPropertyValue(t)}function ex(e){return function(){delete this[e]}}function tx(e,t){return function(){this[e]=t}}function nx(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function rx(e,t){return arguments.length>1?this.each((t==null?ex:typeof t=="function"?nx:tx)(e,t)):this.node()[e]}function Mf(e){return e.trim().split(/^|\s+/)}function Jl(e){return e.classList||new Ef(e)}function Ef(e){this._node=e,this._names=Mf(e.getAttribute("class")||"")}Ef.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function zf(e,t){for(var n=Jl(e),r=-1,s=t.length;++r<s;)n.add(t[r])}function $f(e,t){for(var n=Jl(e),r=-1,s=t.length;++r<s;)n.remove(t[r])}function ax(e){return function(){zf(this,e)}}function sx(e){return function(){$f(this,e)}}function ix(e,t){return function(){(t.apply(this,arguments)?zf:$f)(this,e)}}function ox(e,t){var n=Mf(e+"");if(arguments.length<2){for(var r=Jl(this.node()),s=-1,i=n.length;++s<i;)if(!r.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?ix:t?ax:sx)(n,t))}function lx(){this.textContent=""}function cx(e){return function(){this.textContent=e}}function dx(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function ux(e){return arguments.length?this.each(e==null?lx:(typeof e=="function"?dx:cx)(e)):this.node().textContent}function px(){this.innerHTML=""}function fx(e){return function(){this.innerHTML=e}}function mx(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function gx(e){return arguments.length?this.each(e==null?px:(typeof e=="function"?mx:fx)(e)):this.node().innerHTML}function hx(){this.nextSibling&&this.parentNode.appendChild(this)}function xx(){return this.each(hx)}function vx(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function yx(){return this.each(vx)}function bx(e){var t=typeof e=="function"?e:kf(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function wx(){return null}function kx(e,t){var n=typeof e=="function"?e:kf(e),r=t==null?wx:typeof t=="function"?t:Zl(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function jx(){var e=this.parentNode;e&&e.removeChild(this)}function _x(){return this.each(jx)}function Nx(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Sx(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Cx(e){return this.select(e?Sx:Nx)}function Mx(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Ex(e){return function(t){e.call(this,t,this.__data__)}}function zx(e){return e.trim().split(/^|\s+/).map(function(t){var n="",r=t.indexOf(".");return r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),{type:t,name:n}})}function $x(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,s=t.length,i;n<s;++n)i=t[n],(!e.type||i.type===e.type)&&i.name===e.name?this.removeEventListener(i.type,i.listener,i.options):t[++r]=i;++r?t.length=r:delete this.__on}}}function Px(e,t,n){return function(){var r=this.__on,s,i=Ex(t);if(r){for(var o=0,l=r.length;o<l;++o)if((s=r[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=i,s.options=n),s.value=t;return}}this.addEventListener(e.type,i,n),s={type:e.type,name:e.name,value:t,listener:i,options:n},r?r.push(s):this.__on=[s]}}function Rx(e,t,n){var r=zx(e+""),s,i=r.length,o;if(arguments.length<2){var l=this.node().__on;if(l){for(var c=0,d=l.length,p;c<d;++c)for(s=0,p=l[c];s<i;++s)if((o=r[s]).type===p.type&&o.name===p.name)return p.value}return}for(l=t?Px:$x,s=0;s<i;++s)this.each(l(r[s],t,n));return this}function Pf(e,t,n){var r=Cf(e),s=r.CustomEvent;typeof s=="function"?s=new s(t,n):(s=r.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function Tx(e,t){return function(){return Pf(this,e,t)}}function Lx(e,t){return function(){return Pf(this,e,t.apply(this,arguments))}}function Ix(e,t){return this.each((typeof t=="function"?Lx:Tx)(e,t))}function*Ax(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],s=0,i=r.length,o;s<i;++s)(o=r[s])&&(yield o)}var Ox=[null];function Bt(e,t){this._groups=e,this._parents=t}function Pa(){return new Bt([[document.documentElement]],Ox)}function Fx(){return this}Bt.prototype=Pa.prototype={constructor:Bt,select:dh,selectAll:mh,selectChild:vh,selectChildren:kh,filter:jh,data:Eh,enter:_h,exit:$h,join:Ph,merge:Rh,selection:Fx,order:Th,sort:Lh,call:Ah,nodes:Oh,node:Fh,size:Dh,empty:Bh,each:Wh,attr:Kh,style:Jh,property:rx,classed:ox,text:ux,html:gx,raise:xx,lower:yx,append:bx,insert:kx,remove:_x,clone:Cx,datum:Mx,on:Rx,dispatch:Ix,[Symbol.iterator]:Ax};function ec(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Rf(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Ra(){}var ja=.7,Ks=1/ja,vr="\\s*([+-]?\\d+)\\s*",_a="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",qt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Dx=/^#([0-9a-f]{3,8})$/,Bx=new RegExp(`^rgb\\(${vr},${vr},${vr}\\)$`),Wx=new RegExp(`^rgb\\(${qt},${qt},${qt}\\)$`),Vx=new RegExp(`^rgba\\(${vr},${vr},${vr},${_a}\\)$`),Ux=new RegExp(`^rgba\\(${qt},${qt},${qt},${_a}\\)$`),Hx=new RegExp(`^hsl\\(${_a},${qt},${qt}\\)$`),Yx=new RegExp(`^hsla\\(${_a},${qt},${qt},${_a}\\)$`),Ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ec(Ra,Na,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Od,formatHex:Od,formatHex8:Gx,formatHsl:Xx,formatRgb:Fd,toString:Fd});function Od(){return this.rgb().formatHex()}function Gx(){return this.rgb().formatHex8()}function Xx(){return Tf(this).formatHsl()}function Fd(){return this.rgb().formatRgb()}function Na(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=Dx.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Dd(t):n===3?new gt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?as(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?as(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Bx.exec(e))?new gt(t[1],t[2],t[3],1):(t=Wx.exec(e))?new gt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Vx.exec(e))?as(t[1],t[2],t[3],t[4]):(t=Ux.exec(e))?as(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Hx.exec(e))?Vd(t[1],t[2]/100,t[3]/100,1):(t=Yx.exec(e))?Vd(t[1],t[2]/100,t[3]/100,t[4]):Ad.hasOwnProperty(e)?Dd(Ad[e]):e==="transparent"?new gt(NaN,NaN,NaN,0):null}function Dd(e){return new gt(e>>16&255,e>>8&255,e&255,1)}function as(e,t,n,r){return r<=0&&(e=t=n=NaN),new gt(e,t,n,r)}function Kx(e){return e instanceof Ra||(e=Na(e)),e?(e=e.rgb(),new gt(e.r,e.g,e.b,e.opacity)):new gt}function Zo(e,t,n,r){return arguments.length===1?Kx(e):new gt(e,t,n,r??1)}function gt(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}ec(gt,Zo,Rf(Ra,{brighter(e){return e=e==null?Ks:Math.pow(Ks,e),new gt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?ja:Math.pow(ja,e),new gt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new gt(Un(this.r),Un(this.g),Un(this.b),qs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Bd,formatHex:Bd,formatHex8:qx,formatRgb:Wd,toString:Wd}));function Bd(){return`#${Bn(this.r)}${Bn(this.g)}${Bn(this.b)}`}function qx(){return`#${Bn(this.r)}${Bn(this.g)}${Bn(this.b)}${Bn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Wd(){const e=qs(this.opacity);return`${e===1?"rgb(":"rgba("}${Un(this.r)}, ${Un(this.g)}, ${Un(this.b)}${e===1?")":`, ${e})`}`}function qs(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Un(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Bn(e){return e=Un(e),(e<16?"0":"")+e.toString(16)}function Vd(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new At(e,t,n,r)}function Tf(e){if(e instanceof At)return new At(e.h,e.s,e.l,e.opacity);if(e instanceof Ra||(e=Na(e)),!e)return new At;if(e instanceof At)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,s=Math.min(t,n,r),i=Math.max(t,n,r),o=NaN,l=i-s,c=(i+s)/2;return l?(t===i?o=(n-r)/l+(n<r)*6:n===i?o=(r-t)/l+2:o=(t-n)/l+4,l/=c<.5?i+s:2-i-s,o*=60):l=c>0&&c<1?0:o,new At(o,l,c,e.opacity)}function Qx(e,t,n,r){return arguments.length===1?Tf(e):new At(e,t,n,r??1)}function At(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}ec(At,Qx,Rf(Ra,{brighter(e){return e=e==null?Ks:Math.pow(Ks,e),new At(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?ja:Math.pow(ja,e),new At(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,s=2*n-r;return new gt(Ji(e>=240?e-240:e+120,s,r),Ji(e,s,r),Ji(e<120?e+240:e-120,s,r),this.opacity)},clamp(){return new At(Ud(this.h),ss(this.s),ss(this.l),qs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=qs(this.opacity);return`${e===1?"hsl(":"hsla("}${Ud(this.h)}, ${ss(this.s)*100}%, ${ss(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Ud(e){return e=(e||0)%360,e<0?e+360:e}function ss(e){return Math.max(0,Math.min(1,e||0))}function Ji(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Lf=e=>()=>e;function Zx(e,t){return function(n){return e+n*t}}function Jx(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}function ev(e){return(e=+e)==1?If:function(t,n){return n-t?Jx(t,n,e):Lf(isNaN(t)?n:t)}}function If(e,t){var n=t-e;return n?Zx(e,n):Lf(isNaN(e)?t:e)}const Hd=function e(t){var n=ev(t);function r(s,i){var o=n((s=Zo(s)).r,(i=Zo(i)).r),l=n(s.g,i.g),c=n(s.b,i.b),d=If(s.opacity,i.opacity);return function(p){return s.r=o(p),s.g=l(p),s.b=c(p),s.opacity=d(p),s+""}}return r.gamma=e,r}(1);function gn(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Jo=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,eo=new RegExp(Jo.source,"g");function tv(e){return function(){return e}}function nv(e){return function(t){return e(t)+""}}function rv(e,t){var n=Jo.lastIndex=eo.lastIndex=0,r,s,i,o=-1,l=[],c=[];for(e=e+"",t=t+"";(r=Jo.exec(e))&&(s=eo.exec(t));)(i=s.index)>n&&(i=t.slice(n,i),l[o]?l[o]+=i:l[++o]=i),(r=r[0])===(s=s[0])?l[o]?l[o]+=s:l[++o]=s:(l[++o]=null,c.push({i:o,x:gn(r,s)})),n=eo.lastIndex;return n<t.length&&(i=t.slice(n),l[o]?l[o]+=i:l[++o]=i),l.length<2?c[0]?nv(c[0].x):tv(t):(t=c.length,function(d){for(var p=0,f;p<t;++p)l[(f=c[p]).i]=f.x(d);return l.join("")})}var Yd=180/Math.PI,el={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Af(e,t,n,r,s,i){var o,l,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(l=Math.sqrt(n*n+r*r))&&(n/=l,r/=l,c/=l),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:s,translateY:i,rotate:Math.atan2(t,e)*Yd,skewX:Math.atan(c)*Yd,scaleX:o,scaleY:l}}var is;function av(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?el:Af(t.a,t.b,t.c,t.d,t.e,t.f)}function sv(e){return e==null||(is||(is=document.createElementNS("http://www.w3.org/2000/svg","g")),is.setAttribute("transform",e),!(e=is.transform.baseVal.consolidate()))?el:(e=e.matrix,Af(e.a,e.b,e.c,e.d,e.e,e.f))}function Of(e,t,n,r){function s(d){return d.length?d.pop()+" ":""}function i(d,p,f,u,m,w){if(d!==f||p!==u){var k=m.push("translate(",null,t,null,n);w.push({i:k-4,x:gn(d,f)},{i:k-2,x:gn(p,u)})}else(f||u)&&m.push("translate("+f+t+u+n)}function o(d,p,f,u){d!==p?(d-p>180?p+=360:p-d>180&&(d+=360),u.push({i:f.push(s(f)+"rotate(",null,r)-2,x:gn(d,p)})):p&&f.push(s(f)+"rotate("+p+r)}function l(d,p,f,u){d!==p?u.push({i:f.push(s(f)+"skewX(",null,r)-2,x:gn(d,p)}):p&&f.push(s(f)+"skewX("+p+r)}function c(d,p,f,u,m,w){if(d!==f||p!==u){var k=m.push(s(m)+"scale(",null,",",null,")");w.push({i:k-4,x:gn(d,f)},{i:k-2,x:gn(p,u)})}else(f!==1||u!==1)&&m.push(s(m)+"scale("+f+","+u+")")}return function(d,p){var f=[],u=[];return d=e(d),p=e(p),i(d.translateX,d.translateY,p.translateX,p.translateY,f,u),o(d.rotate,p.rotate,f,u),l(d.skewX,p.skewX,f,u),c(d.scaleX,d.scaleY,p.scaleX,p.scaleY,f,u),d=p=null,function(m){for(var w=-1,k=u.length,E;++w<k;)f[(E=u[w]).i]=E.x(m);return f.join("")}}}var iv=Of(av,"px, ","px)","deg)"),ov=Of(sv,", ",")",")"),Cr=0,Xr=0,Br=0,Ff=1e3,Qs,Kr,Zs=0,qn=0,yi=0,Sa=typeof performance=="object"&&performance.now?performance:Date,Df=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function tc(){return qn||(Df(lv),qn=Sa.now()+yi)}function lv(){qn=0}function Js(){this._call=this._time=this._next=null}Js.prototype=Bf.prototype={constructor:Js,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?tc():+n)+(t==null?0:+t),!this._next&&Kr!==this&&(Kr?Kr._next=this:Qs=this,Kr=this),this._call=e,this._time=n,tl()},stop:function(){this._call&&(this._call=null,this._time=1/0,tl())}};function Bf(e,t,n){var r=new Js;return r.restart(e,t,n),r}function cv(){tc(),++Cr;for(var e=Qs,t;e;)(t=qn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Cr}function Gd(){qn=(Zs=Sa.now())+yi,Cr=Xr=0;try{cv()}finally{Cr=0,uv(),qn=0}}function dv(){var e=Sa.now(),t=e-Zs;t>Ff&&(yi-=t,Zs=e)}function uv(){for(var e,t=Qs,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Qs=n);Kr=e,tl(r)}function tl(e){if(!Cr){Xr&&(Xr=clearTimeout(Xr));var t=e-qn;t>24?(e<1/0&&(Xr=setTimeout(Gd,e-Sa.now()-yi)),Br&&(Br=clearInterval(Br))):(Br||(Zs=Sa.now(),Br=setInterval(dv,Ff)),Cr=1,Df(Gd))}}function Xd(e,t,n){var r=new Js;return t=t==null?0:+t,r.restart(s=>{r.stop(),e(s+t)},t,n),r}var pv=wf("start","end","cancel","interrupt"),fv=[],Wf=0,Kd=1,nl=2,bs=3,qd=4,rl=5,ws=6;function bi(e,t,n,r,s,i){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;mv(e,n,{name:t,index:r,group:s,on:pv,tween:fv,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:Wf})}function nc(e,t){var n=Wt(e,t);if(n.state>Wf)throw new Error("too late; already scheduled");return n}function Qt(e,t){var n=Wt(e,t);if(n.state>bs)throw new Error("too late; already running");return n}function Wt(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function mv(e,t,n){var r=e.__transition,s;r[t]=n,n.timer=Bf(i,0,n.time);function i(d){n.state=Kd,n.timer.restart(o,n.delay,n.time),n.delay<=d&&o(d-n.delay)}function o(d){var p,f,u,m;if(n.state!==Kd)return c();for(p in r)if(m=r[p],m.name===n.name){if(m.state===bs)return Xd(o);m.state===qd?(m.state=ws,m.timer.stop(),m.on.call("interrupt",e,e.__data__,m.index,m.group),delete r[p]):+p<t&&(m.state=ws,m.timer.stop(),m.on.call("cancel",e,e.__data__,m.index,m.group),delete r[p])}if(Xd(function(){n.state===bs&&(n.state=qd,n.timer.restart(l,n.delay,n.time),l(d))}),n.state=nl,n.on.call("start",e,e.__data__,n.index,n.group),n.state===nl){for(n.state=bs,s=new Array(u=n.tween.length),p=0,f=-1;p<u;++p)(m=n.tween[p].value.call(e,e.__data__,n.index,n.group))&&(s[++f]=m);s.length=f+1}}function l(d){for(var p=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(c),n.state=rl,1),f=-1,u=s.length;++f<u;)s[f].call(e,p);n.state===rl&&(n.on.call("end",e,e.__data__,n.index,n.group),c())}function c(){n.state=ws,n.timer.stop(),delete r[t];for(var d in r)return;delete e.__transition}}function gv(e,t){var n=e.__transition,r,s,i=!0,o;if(n){t=t==null?null:t+"";for(o in n){if((r=n[o]).name!==t){i=!1;continue}s=r.state>nl&&r.state<rl,r.state=ws,r.timer.stop(),r.on.call(s?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete n[o]}i&&delete e.__transition}}function hv(e){return this.each(function(){gv(this,e)})}function xv(e,t){var n,r;return function(){var s=Qt(this,e),i=s.tween;if(i!==n){r=n=i;for(var o=0,l=r.length;o<l;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}s.tween=r}}function vv(e,t,n){var r,s;if(typeof n!="function")throw new Error;return function(){var i=Qt(this,e),o=i.tween;if(o!==r){s=(r=o).slice();for(var l={name:t,value:n},c=0,d=s.length;c<d;++c)if(s[c].name===t){s[c]=l;break}c===d&&s.push(l)}i.tween=s}}function yv(e,t){var n=this._id;if(e+="",arguments.length<2){for(var r=Wt(this.node(),n).tween,s=0,i=r.length,o;s<i;++s)if((o=r[s]).name===e)return o.value;return null}return this.each((t==null?xv:vv)(n,e,t))}function rc(e,t,n){var r=e._id;return e.each(function(){var s=Qt(this,r);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return Wt(s,r).value[t]}}function Vf(e,t){var n;return(typeof t=="number"?gn:t instanceof Na?Hd:(n=Na(t))?(t=n,Hd):rv)(e,t)}function bv(e){return function(){this.removeAttribute(e)}}function wv(e){return function(){this.removeAttributeNS(e.space,e.local)}}function kv(e,t,n){var r,s=n+"",i;return function(){var o=this.getAttribute(e);return o===s?null:o===r?i:i=t(r=o,n)}}function jv(e,t,n){var r,s=n+"",i;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===r?i:i=t(r=o,n)}}function _v(e,t,n){var r,s,i;return function(){var o,l=n(this),c;return l==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=l+"",o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l)))}}function Nv(e,t,n){var r,s,i;return function(){var o,l=n(this),c;return l==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=l+"",o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l)))}}function Sv(e,t){var n=vi(e),r=n==="transform"?ov:Vf;return this.attrTween(e,typeof t=="function"?(n.local?Nv:_v)(n,r,rc(this,"attr."+e,t)):t==null?(n.local?wv:bv)(n):(n.local?jv:kv)(n,r,t))}function Cv(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Mv(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Ev(e,t){var n,r;function s(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Mv(e,i)),n}return s._value=t,s}function zv(e,t){var n,r;function s(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Cv(e,i)),n}return s._value=t,s}function $v(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var r=vi(e);return this.tween(n,(r.local?Ev:zv)(r,t))}function Pv(e,t){return function(){nc(this,e).delay=+t.apply(this,arguments)}}function Rv(e,t){return t=+t,function(){nc(this,e).delay=t}}function Tv(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Pv:Rv)(t,e)):Wt(this.node(),t).delay}function Lv(e,t){return function(){Qt(this,e).duration=+t.apply(this,arguments)}}function Iv(e,t){return t=+t,function(){Qt(this,e).duration=t}}function Av(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Lv:Iv)(t,e)):Wt(this.node(),t).duration}function Ov(e,t){if(typeof t!="function")throw new Error;return function(){Qt(this,e).ease=t}}function Fv(e){var t=this._id;return arguments.length?this.each(Ov(t,e)):Wt(this.node(),t).ease}function Dv(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Qt(this,e).ease=n}}function Bv(e){if(typeof e!="function")throw new Error;return this.each(Dv(this._id,e))}function Wv(e){typeof e!="function"&&(e=_f(e));for(var t=this._groups,n=t.length,r=new Array(n),s=0;s<n;++s)for(var i=t[s],o=i.length,l=r[s]=[],c,d=0;d<o;++d)(c=i[d])&&e.call(c,c.__data__,d,i)&&l.push(c);return new dn(r,this._parents,this._name,this._id)}function Vv(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,r=t.length,s=n.length,i=Math.min(r,s),o=new Array(r),l=0;l<i;++l)for(var c=t[l],d=n[l],p=c.length,f=o[l]=new Array(p),u,m=0;m<p;++m)(u=c[m]||d[m])&&(f[m]=u);for(;l<r;++l)o[l]=t[l];return new dn(o,this._parents,this._name,this._id)}function Uv(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Hv(e,t,n){var r,s,i=Uv(t)?nc:Qt;return function(){var o=i(this,e),l=o.on;l!==r&&(s=(r=l).copy()).on(t,n),o.on=s}}function Yv(e,t){var n=this._id;return arguments.length<2?Wt(this.node(),n).on.on(e):this.each(Hv(n,e,t))}function Gv(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Xv(){return this.on("end.remove",Gv(this._id))}function Kv(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Zl(e));for(var r=this._groups,s=r.length,i=new Array(s),o=0;o<s;++o)for(var l=r[o],c=l.length,d=i[o]=new Array(c),p,f,u=0;u<c;++u)(p=l[u])&&(f=e.call(p,p.__data__,u,l))&&("__data__"in p&&(f.__data__=p.__data__),d[u]=f,bi(d[u],t,n,u,d,Wt(p,n)));return new dn(i,this._parents,t,n)}function qv(e){var t=this._name,n=this._id;typeof e!="function"&&(e=jf(e));for(var r=this._groups,s=r.length,i=[],o=[],l=0;l<s;++l)for(var c=r[l],d=c.length,p,f=0;f<d;++f)if(p=c[f]){for(var u=e.call(p,p.__data__,f,c),m,w=Wt(p,n),k=0,E=u.length;k<E;++k)(m=u[k])&&bi(m,t,n,k,u,w);i.push(u),o.push(p)}return new dn(i,o,t,n)}var Qv=Pa.prototype.constructor;function Zv(){return new Qv(this._groups,this._parents)}function Jv(e,t){var n,r,s;return function(){var i=Sr(this,e),o=(this.style.removeProperty(e),Sr(this,e));return i===o?null:i===n&&o===r?s:s=t(n=i,r=o)}}function Uf(e){return function(){this.style.removeProperty(e)}}function ey(e,t,n){var r,s=n+"",i;return function(){var o=Sr(this,e);return o===s?null:o===r?i:i=t(r=o,n)}}function ty(e,t,n){var r,s,i;return function(){var o=Sr(this,e),l=n(this),c=l+"";return l==null&&(c=l=(this.style.removeProperty(e),Sr(this,e))),o===c?null:o===r&&c===s?i:(s=c,i=t(r=o,l))}}function ny(e,t){var n,r,s,i="style."+t,o="end."+i,l;return function(){var c=Qt(this,e),d=c.on,p=c.value[i]==null?l||(l=Uf(t)):void 0;(d!==n||s!==p)&&(r=(n=d).copy()).on(o,s=p),c.on=r}}function ry(e,t,n){var r=(e+="")=="transform"?iv:Vf;return t==null?this.styleTween(e,Jv(e,r)).on("end.style."+e,Uf(e)):typeof t=="function"?this.styleTween(e,ty(e,r,rc(this,"style."+e,t))).each(ny(this._id,e)):this.styleTween(e,ey(e,r,t),n).on("end.style."+e,null)}function ay(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function sy(e,t,n){var r,s;function i(){var o=t.apply(this,arguments);return o!==s&&(r=(s=o)&&ay(e,o,n)),r}return i._value=t,i}function iy(e,t,n){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,sy(e,t,n??""))}function oy(e){return function(){this.textContent=e}}function ly(e){return function(){var t=e(this);this.textContent=t??""}}function cy(e){return this.tween("text",typeof e=="function"?ly(rc(this,"text",e)):oy(e==null?"":e+""))}function dy(e){return function(t){this.textContent=e.call(this,t)}}function uy(e){var t,n;function r(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&dy(s)),t}return r._value=e,r}function py(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,uy(e))}function fy(){for(var e=this._name,t=this._id,n=Hf(),r=this._groups,s=r.length,i=0;i<s;++i)for(var o=r[i],l=o.length,c,d=0;d<l;++d)if(c=o[d]){var p=Wt(c,t);bi(c,e,n,d,o,{time:p.time+p.delay+p.duration,delay:0,duration:p.duration,ease:p.ease})}return new dn(r,this._parents,e,n)}function my(){var e,t,n=this,r=n._id,s=n.size();return new Promise(function(i,o){var l={value:o},c={value:function(){--s===0&&i()}};n.each(function(){var d=Qt(this,r),p=d.on;p!==e&&(t=(e=p).copy(),t._.cancel.push(l),t._.interrupt.push(l),t._.end.push(c)),d.on=t}),s===0&&i()})}var gy=0;function dn(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function Hf(){return++gy}var Jt=Pa.prototype;dn.prototype={constructor:dn,select:Kv,selectAll:qv,selectChild:Jt.selectChild,selectChildren:Jt.selectChildren,filter:Wv,merge:Vv,selection:Zv,transition:fy,call:Jt.call,nodes:Jt.nodes,node:Jt.node,size:Jt.size,empty:Jt.empty,each:Jt.each,on:Yv,attr:Sv,attrTween:$v,style:ry,styleTween:iy,text:cy,textTween:py,remove:Xv,tween:yv,delay:Tv,duration:Av,ease:Fv,easeVarying:Bv,end:my,[Symbol.iterator]:Jt[Symbol.iterator]};function hy(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var xy={time:null,delay:0,duration:250,ease:hy};function vy(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function yy(e){var t,n;e instanceof dn?(t=e._id,e=e._name):(t=Hf(),(n=xy).time=tc(),e=e==null?null:e+"");for(var r=this._groups,s=r.length,i=0;i<s;++i)for(var o=r[i],l=o.length,c,d=0;d<l;++d)(c=o[d])&&bi(c,e,t,d,o,n||vy(c,t));return new dn(r,this._parents,e,t)}Pa.prototype.interrupt=hv;Pa.prototype.transition=yy;function by(e){var t=0,n=e.children,r=n&&n.length;if(!r)t=1;else for(;--r>=0;)t+=n[r].value;e.value=t}function wy(){return this.eachAfter(by)}function ky(e,t){let n=-1;for(const r of this)e.call(t,r,++n,this);return this}function jy(e,t){for(var n=this,r=[n],s,i,o=-1;n=r.pop();)if(e.call(t,n,++o,this),s=n.children)for(i=s.length-1;i>=0;--i)r.push(s[i]);return this}function _y(e,t){for(var n=this,r=[n],s=[],i,o,l,c=-1;n=r.pop();)if(s.push(n),i=n.children)for(o=0,l=i.length;o<l;++o)r.push(i[o]);for(;n=s.pop();)e.call(t,n,++c,this);return this}function Ny(e,t){let n=-1;for(const r of this)if(e.call(t,r,++n,this))return r}function Sy(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,r=t.children,s=r&&r.length;--s>=0;)n+=r[s].value;t.value=n})}function Cy(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function My(e){for(var t=this,n=Ey(t,e),r=[t];t!==n;)t=t.parent,r.push(t);for(var s=r.length;e!==n;)r.splice(s,0,e),e=e.parent;return r}function Ey(e,t){if(e===t)return e;var n=e.ancestors(),r=t.ancestors(),s=null;for(e=n.pop(),t=r.pop();e===t;)s=e,e=n.pop(),t=r.pop();return s}function zy(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function $y(){return Array.from(this)}function Py(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function Ry(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*Ty(){var e=this,t,n=[e],r,s,i;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,r=e.children)for(s=0,i=r.length;s<i;++s)n.push(r[s]);while(n.length)}function ac(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=Ay)):t===void 0&&(t=Iy);for(var n=new ei(e),r,s=[n],i,o,l,c;r=s.pop();)if((o=t(r.data))&&(c=(o=Array.from(o)).length))for(r.children=o,l=c-1;l>=0;--l)s.push(i=o[l]=new ei(o[l])),i.parent=r,i.depth=r.depth+1;return n.eachBefore(Fy)}function Ly(){return ac(this).eachBefore(Oy)}function Iy(e){return e.children}function Ay(e){return Array.isArray(e)?e[1]:null}function Oy(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Fy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function ei(e){this.data=e,this.depth=this.height=0,this.parent=null}ei.prototype=ac.prototype={constructor:ei,count:wy,each:ky,eachAfter:_y,eachBefore:jy,find:Ny,sum:Sy,sort:Cy,path:My,ancestors:zy,descendants:$y,leaves:Py,links:Ry,copy:Ly,[Symbol.iterator]:Ty};function Dy(e){if(typeof e!="function")throw new Error;return e}function Wr(){return 0}function Vr(e){return function(){return e}}function By(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function Wy(e,t,n,r,s){for(var i=e.children,o,l=-1,c=i.length,d=e.value&&(r-t)/e.value;++l<c;)o=i[l],o.y0=n,o.y1=s,o.x0=t,o.x1=t+=o.value*d}function Vy(e,t,n,r,s){for(var i=e.children,o,l=-1,c=i.length,d=e.value&&(s-n)/e.value;++l<c;)o=i[l],o.x0=t,o.x1=r,o.y0=n,o.y1=n+=o.value*d}var Uy=(1+Math.sqrt(5))/2;function Hy(e,t,n,r,s,i){for(var o=[],l=t.children,c,d,p=0,f=0,u=l.length,m,w,k=t.value,E,v,x,g,_,j,z;p<u;){m=s-n,w=i-r;do E=l[f++].value;while(!E&&f<u);for(v=x=E,j=Math.max(w/m,m/w)/(k*e),z=E*E*j,_=Math.max(x/z,z/v);f<u;++f){if(E+=d=l[f].value,d<v&&(v=d),d>x&&(x=d),z=E*E*j,g=Math.max(x/z,z/v),g>_){E-=d;break}_=g}o.push(c={value:E,dice:m<w,children:l.slice(p,f)}),c.dice?Wy(c,n,r,s,k?r+=w*E/k:i):Vy(c,n,r,k?n+=m*E/k:s,i),k-=E,p=f}return o}const Yf=function e(t){function n(r,s,i,o,l){Hy(t,r,s,i,o,l)}return n.ratio=function(r){return e((r=+r)>1?r:1)},n}(Uy);function Yy(){var e=Yf,t=!1,n=1,r=1,s=[0],i=Wr,o=Wr,l=Wr,c=Wr,d=Wr;function p(u){return u.x0=u.y0=0,u.x1=n,u.y1=r,u.eachBefore(f),s=[0],t&&u.eachBefore(By),u}function f(u){var m=s[u.depth],w=u.x0+m,k=u.y0+m,E=u.x1-m,v=u.y1-m;E<w&&(w=E=(w+E)/2),v<k&&(k=v=(k+v)/2),u.x0=w,u.y0=k,u.x1=E,u.y1=v,u.children&&(m=s[u.depth+1]=i(u)/2,w+=d(u)-m,k+=o(u)-m,E-=l(u)-m,v-=c(u)-m,E<w&&(w=E=(w+E)/2),v<k&&(k=v=(k+v)/2),e(u,w,k,E,v))}return p.round=function(u){return arguments.length?(t=!!u,p):t},p.size=function(u){return arguments.length?(n=+u[0],r=+u[1],p):[n,r]},p.tile=function(u){return arguments.length?(e=Dy(u),p):e},p.padding=function(u){return arguments.length?p.paddingInner(u).paddingOuter(u):p.paddingInner()},p.paddingInner=function(u){return arguments.length?(i=typeof u=="function"?u:Vr(+u),p):i},p.paddingOuter=function(u){return arguments.length?p.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):p.paddingTop()},p.paddingTop=function(u){return arguments.length?(o=typeof u=="function"?u:Vr(+u),p):o},p.paddingRight=function(u){return arguments.length?(l=typeof u=="function"?u:Vr(+u),p):l},p.paddingBottom=function(u){return arguments.length?(c=typeof u=="function"?u:Vr(+u),p):c},p.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:Vr(+u),p):d},p}function qr(e,t,n){this.k=e,this.x=t,this.y=n}qr.prototype={constructor:qr,scale:function(e){return e===1?this:new qr(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new qr(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};qr.prototype;const Qd={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Gy(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Qd[n]||Qd.default}function Zd(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,r)).toFixed(1))+" "+n[r]}function Jd({name:e,usedBytes:t,totalBytes:n,type:r,isShared:s=!1,connectedNodes:i=[],nodeName:o,isOffline:l=!1,width:c=120,height:d=180,animationDelay:p=0,onClick:f,onHover:u}){const m=h.useRef(null),w=h.useRef(0),k=h.useRef([]),E=h.useRef(0),[v,x]=h.useState(!1),g=n>0?t/n*100:0,[_,j]=h.useState(0),[z,I]=h.useState(!1),[H,R]=h.useState(!0),b=h.useRef(null),N=h.useRef(0),C=1200,L=500;h.useEffect(()=>{const X=setTimeout(()=>{I(!0)},p);return()=>clearTimeout(X)},[p]),h.useEffect(()=>{if(!z)return;N.current=_,b.current=null;const X=N.current,y=g;if(Math.abs(X-y)<.1){j(y);return}const W=H?C:L,ee=ue=>{b.current===null&&(b.current=ue);const ne=ue-b.current,se=Math.min(ne/W,1),K=(ie=>1-Math.pow(1-ie,3))(se),Z=X+(y-X)*K;j(Z),se<1?requestAnimationFrame(ee):H&&R(!1)};requestAnimationFrame(ee)},[g,z]);const A=_,Y=g>=85,te=g>=95,O=Gy(g,r),$=h.useCallback(X=>{const y=[];for(let W=0;W<X;W++)y.push({x:Math.random()*c*.6+c*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return y},[c,d]);h.useEffect(()=>{const X=m.current;if(!X)return;const y=X.getContext("2d");if(!y)return;const W=window.devicePixelRatio||1;X.width=c*W,X.height=d*W,y.scale(W,W);const ee=Y?15:5;k.current=$(ee);const ue=ne=>{ne-E.current,E.current=ne;const se=ne*.001;y.clearRect(0,0,c,d);const Te=8,K=Te,Z=Te+20,ie=c-Te*2,oe=d-Te*2-40,Ve=8,nt=l?.05:A/100,Ue=oe*nt,$e=Z+oe-Ue,ye=y.createLinearGradient(K,Z,K,Z+oe);ye.addColorStop(0,"#0a0a12"),ye.addColorStop(.5,"#050510"),ye.addColorStop(1,"#0a0a12"),y.fillStyle=ye,y.beginPath(),y.roundRect(K,Z,ie,oe,Ve),y.fill(),y.save(),y.beginPath(),y.roundRect(K,Z,ie,oe,Ve),y.clip();const je=12,He=je*Math.sqrt(3);y.strokeStyle="rgba(0, 240, 255, 0.06)",y.lineWidth=.5;for(let S=0;S<oe/He+1;S++)for(let D=0;D<ie/(je*1.5)+1;D++){const T=S%2*je*.75,P=K+D*je*1.5+T,B=Z+S*He*.5;y.beginPath();for(let J=0;J<6;J++){const Q=Math.PI/3*J+Math.PI/6,U=P+je*.4*Math.cos(Q),le=B+je*.4*Math.sin(Q);J===0?y.moveTo(U,le):y.lineTo(U,le)}y.closePath(),y.stroke()}y.restore();const qe=Z+se*30%oe;y.save(),y.beginPath(),y.roundRect(K,Z,ie,oe,Ve),y.clip();const Ye=y.createLinearGradient(K,qe-15,K,qe+5);Ye.addColorStop(0,"transparent"),Ye.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ye.addColorStop(1,"transparent"),y.fillStyle=Ye,y.fillRect(K,qe-15,ie,20),y.restore(),y.strokeStyle="rgba(0, 240, 255, 0.2)",y.lineWidth=1;for(let S=0;S<=10;S++){const D=Z+oe-oe*S/10,T=S%5===0?12:6,P=S%5===0?.4:.2;y.strokeStyle=`rgba(0, 240, 255, ${P})`,y.beginPath(),y.moveTo(K+2,D),y.lineTo(K+2+T,D),y.stroke(),y.beginPath(),y.moveTo(K+ie-2,D),y.lineTo(K+ie-2-T,D),y.stroke()}const Vt=se*50%oe;for(let S=0;S<3;S++){const D=Z+(Vt+S*oe/3)%oe,T=.3+Math.sin(se*3+S)*.2;y.beginPath(),y.strokeStyle=`rgba(0, 240, 255, ${T})`,y.lineWidth=2,y.moveTo(K,D),y.lineTo(K+4,D),y.stroke(),y.beginPath(),y.moveTo(K+ie,D),y.lineTo(K+ie-4,D),y.stroke()}if(!l&&nt>0){const S=y.createLinearGradient(0,$e,0,Z+oe);S.addColorStop(0,O.gradient[0]),S.addColorStop(1,O.gradient[1]);const D=Y?6:3,T=.05,P=Y?.1:.05,B=Math.PI/3;y.save(),y.beginPath(),y.rect(K,Z,ie,oe),y.clip(),y.fillStyle=S,y.beginPath(),y.moveTo(K,Z+oe);for(let U=0;U<=ie;U+=2){const le=Math.sin(U*T+se*P*60)*D,ce=Math.sin(U*T*1.5+se*P*40+B)*(D*.5),M=$e+le+ce;U===0?y.moveTo(K+U,M):y.lineTo(K+U,M)}y.lineTo(K+ie,Z+oe),y.lineTo(K,Z+oe),y.closePath(),y.fill(),y.strokeStyle=O.glow,y.lineWidth=2,y.shadowColor=O.main,y.shadowBlur=10,y.beginPath();for(let U=0;U<=ie;U+=2){const le=Math.sin(U*T+se*P*60)*D,ce=Math.sin(U*T*1.5+se*P*40+B)*(D*.5),M=$e+le+ce;U===0?y.moveTo(K+U,M):y.lineTo(K+U,M)}y.stroke(),y.shadowBlur=0,k.current.forEach((U,le)=>{if(U.y>$e&&U.y<Z+oe){const ce=Math.sin(se*U.wobbleSpeed*60+U.wobbleOffset)*3;y.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,y.beginPath(),y.arc(U.x+ce,U.y,U.radius,0,Math.PI*2),y.fill(),y.fillStyle="rgba(255, 255, 255, 0.5)",y.beginPath(),y.arc(U.x+ce-U.radius*.3,U.y-U.radius*.3,U.radius*.3,0,Math.PI*2),y.fill()}U.y-=U.speed*(Y?2:1),U.y<$e-10&&(U.y=Z+oe+Math.random()*20,U.x=K+Math.random()*ie*.6+ie*.2)}),y.restore();const J=3;for(let U=0;U<J;U++){const le=K+ie*(U+.5)/J,ce=se*2+U*Math.PI*.7,M=(Math.sin(ce)*.5+.5)*.3;if(M>.1){const ae=y.createLinearGradient(le-8,$e,le+8,Z+oe);ae.addColorStop(0,"rgba(255, 255, 255, 0)"),ae.addColorStop(.3,`rgba(255, 255, 255, ${M})`),ae.addColorStop(.7,`rgba(255, 255, 255, ${M*.5})`),ae.addColorStop(1,"rgba(255, 255, 255, 0)"),y.fillStyle=ae,y.fillRect(le-8,$e,16,Ue)}}const Q=Math.floor(nt*8);for(let U=0;U<Q;U++){const le=U*137.5,ce=K+10+le*7%(ie-20),ae=$e+10+le*13%(Ue-20)+Math.sin(se*2+le)*5,ge=.4+Math.sin(se*3+le)*.3;if(y.fillStyle=`rgba(255, 255, 255, ${ge})`,y.beginPath(),y.arc(ce,ae,1.5,0,Math.PI*2),y.fill(),U>0&&U%3===0){const be=(U-1)*137.5,re=K+10+be*7%(ie-20),de=$e+10+be*13%(Ue-20)+Math.sin(se*2+be)*5,he=Math.sqrt((ce-re)**2+(ae-de)**2);he<30&&(y.strokeStyle=`rgba(255, 255, 255, ${.1*(1-he/30)})`,y.lineWidth=.5,y.beginPath(),y.moveTo(ce,ae),y.lineTo(re,de),y.stroke())}}if(Y){for(let U=0;U<8;U++){const le=K+ie*.15+Math.random()*ie*.7,ce=$e-Math.random()*25,M=Math.random()*4+1;y.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,y.beginPath(),y.arc(le,ce,M,0,Math.PI*2),y.fill()}Math.sin(se*10)>.7&&(y.fillStyle="rgba(255, 100, 0, 0.05)",y.fillRect(K,Z,ie,oe))}}const Pe=l||te?"#ff0040":O.main,Nt=te?Math.sin(se*5)*.3+.7:1;y.strokeStyle=Pe,y.lineWidth=3,y.shadowColor=Pe,y.shadowBlur=v?20:12*Nt,y.beginPath(),y.roundRect(K,Z,ie,oe,Ve),y.stroke(),y.shadowBlur=0,y.strokeStyle=`${Pe}60`,y.lineWidth=1,y.beginPath(),y.roundRect(K+3,Z+3,ie-6,oe-6,Ve-2),y.stroke();const ke=16,ut=3;y.strokeStyle=Pe,y.lineWidth=ut,y.shadowColor=Pe,y.shadowBlur=8,y.beginPath(),y.moveTo(K-2,Z+ke),y.lineTo(K-2,Z-2),y.lineTo(K+ke,Z-2),y.stroke(),y.beginPath(),y.moveTo(K+ie-ke,Z-2),y.lineTo(K+ie+2,Z-2),y.lineTo(K+ie+2,Z+ke),y.stroke(),y.beginPath(),y.moveTo(K-2,Z+oe-ke),y.lineTo(K-2,Z+oe+2),y.lineTo(K+ke,Z+oe+2),y.stroke(),y.beginPath(),y.moveTo(K+ie-ke,Z+oe+2),y.lineTo(K+ie+2,Z+oe+2),y.lineTo(K+ie+2,Z+oe-ke),y.stroke(),y.shadowBlur=0;const Qe=2+(Math.sin(se*4)*.5+.5);if(y.fillStyle=Pe,y.shadowColor=Pe,y.shadowBlur=6,[[K-2,Z-2],[K+ie+2,Z-2],[K-2,Z+oe+2],[K+ie+2,Z+oe+2]].forEach(([S,D])=>{y.beginPath(),y.arc(S,D,Qe,0,Math.PI*2),y.fill()}),y.shadowBlur=0,!l){const D=K+ie+6,T=oe,P=T*(A/100);y.fillStyle="rgba(0, 20, 40, 0.8)",y.fillRect(D,Z,4,T);const B=y.createLinearGradient(0,Z+T-P,0,Z+T);B.addColorStop(0,O.main),B.addColorStop(1,O.gradient[1]),y.fillStyle=B,y.fillRect(D,Z+T-P,4,P),y.strokeStyle=`${Pe}40`,y.lineWidth=1,y.strokeRect(D,Z,4,T)}if(l){y.strokeStyle="#ff0040",y.lineWidth=2,y.beginPath();const S=K+ie*.3,D=Z+oe*.3;y.moveTo(S,D),y.lineTo(S+10,D+15),y.lineTo(S+5,D+25),y.lineTo(S+15,D+40),y.stroke(),y.beginPath(),y.moveTo(S+10,D+15),y.lineTo(S+20,D+20),y.stroke()}w.current=requestAnimationFrame(ue)};return w.current=requestAnimationFrame(ue),()=>{cancelAnimationFrame(w.current)}},[c,d,A,Y,te,l,O,v,$]);const F=()=>{x(!0),u==null||u(!0)},G=()=>{x(!1),u==null||u(!1)};return a.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${te?"critical":""} ${l?"offline":""}`,onClick:f,onMouseEnter:F,onMouseLeave:G,children:[a.jsxs("div",{className:"tank-header",children:[a.jsx("div",{className:`tank-name-tag ${l?"offline":""}`,style:l?void 0:{color:O.main,background:`${O.main}15`,borderColor:`${O.main}50`},children:e}),a.jsx("div",{className:`tank-type-tag type-${r.toLowerCase()}`,children:r})]}),a.jsx("canvas",{ref:m,style:{width:c,height:d-50,display:"block"}}),a.jsxs("div",{className:"tank-stats",children:[a.jsx("div",{className:`tank-percent ${te?"critical":Y?"warning":""}`,style:{color:l?"#FF4081":O.main,textShadow:l?"none":`0 0 10px ${O.glow}`},children:l?"OFFLINE":`${g.toFixed(1)}%`}),a.jsxs("div",{className:"tank-capacity",children:[Zd(t)," / ",Zd(n)]})]}),s&&i.length>0&&a.jsx("div",{className:"tank-nodes",children:i.map((X,y)=>a.jsx("span",{className:"node-tag",children:X},y))}),!s&&o&&a.jsx("div",{className:"tank-node-label",children:o}),a.jsx("style",{children:`
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

      `})]})}function Xy({percent:e,usedBytes:t,totalBytes:n,duration:r=1200}){const[s,i]=h.useState(0),o=h.useRef(0),l=h.useRef(null),c=h.useRef(0);h.useEffect(()=>{c.current=s,l.current=null;const m=w=>{l.current===null&&(l.current=w);const k=w-l.current,E=Math.min(k/r,1),v=E===1?1:1-Math.pow(2,-10*E),x=c.current+(e-c.current)*v;i(x),E<1&&(o.current=requestAnimationFrame(m))};return o.current=requestAnimationFrame(m),()=>cancelAnimationFrame(o.current)},[e,r]);const p=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,u=[];for(let m=0;m<f;m++){const w=m/f*100,k=w<s,E=m%4===0;u.push({index:m,isActive:k,isMajor:E,percent:w})}return a.jsxs("div",{className:"scifi-indicator",children:[a.jsx("div",{className:"indicator-left",children:a.jsxs("div",{className:"indicator-bytes",children:[a.jsx("span",{className:"used",style:{color:p},children:ve(t)}),a.jsx("span",{className:"separator",children:"/"}),a.jsx("span",{className:"total",children:ve(n)})]})}),a.jsxs("div",{className:"indicator-bar-container",children:[a.jsxs("div",{className:"indicator-bar",children:[a.jsx("div",{className:"segments-container",children:u.map(m=>a.jsx("div",{className:`segment ${m.isActive?"active":""} ${m.isMajor?"major":""}`,style:{"--segment-color":m.isActive?p:"rgba(60, 80, 100, 0.3)",animationDelay:m.isActive?`${m.index*20}ms`:"0ms"}},m.index))}),a.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${p}40)`,boxShadow:`0 0 20px ${p}60, 0 0 40px ${p}30`}}),a.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${p} transparent`,filter:`drop-shadow(0 0 4px ${p})`}}),a.jsx("div",{className:"indicator-scanline"})]}),a.jsx("div",{className:"indicator-accent",style:{background:p}})]}),a.jsx("div",{className:"indicator-right",children:a.jsxs("div",{className:"indicator-percent",style:{color:p},children:[s.toFixed(1),a.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const Ky=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function qy(e,t){var p;const n=((p=e.disk)==null?void 0:p.total_bytes)||0;if(n===0||t.length===0)return[];const r=e.vmid,s=f=>{const u=Math.sin(r*f)*1e4;return u-Math.floor(u)},i=Math.min(4,Math.max(1,Math.floor(s(1)*3)+1)),o=[];let l=n;const c=["scsi","virtio","ide","sata"],d=["raw","qcow2","vmdk"];for(let f=0;f<i;f++){const m=f===i-1?l:Math.floor(l*(.3+s(f+2)*.4));l-=m;const w=c[Math.floor(s(f+3)*c.length)],k=t[Math.floor(s(f+4)*t.length)],E=d[Math.floor(s(f+5)*d.length)];o.push({device:`${w}${f}`,storage:k,size:m,format:E})}return o}function Qy({vm:e,disks:t,position:n,onClose:r}){var o;const i=e.status==="running"?"#00ff88":"#ff6b00";return a.jsxs("div",{className:"vm-disk-popup",style:{left:n.x,top:n.y},onClick:l=>l.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",children:[a.jsxs("div",{className:"popup-title",children:[a.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"🖥️":"📦"}),a.jsx("span",{className:"vm-name",children:e.name}),a.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),a.jsx("button",{className:"popup-close",onClick:r,children:"×"})]}),a.jsxs("div",{className:"popup-status",children:[a.jsx("span",{className:"status-dot",style:{background:i}}),a.jsx("span",{className:"status-text",style:{color:i},children:e.status.toUpperCase()}),a.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),a.jsxs("div",{className:"popup-section",children:[a.jsxs("div",{className:"section-label",children:["DISK ALLOCATION (",t.length," ",t.length===1?"disk":"disks",")"]}),a.jsx("div",{className:"disk-list",children:t.map((l,c)=>{var d;return a.jsxs("div",{className:"disk-item",children:[a.jsxs("div",{className:"disk-device",children:[a.jsx("span",{className:"device-name",children:l.device}),a.jsx("span",{className:"device-format",children:l.format})]}),a.jsxs("div",{className:"disk-info",children:[a.jsx("span",{className:"disk-storage",children:l.storage}),a.jsx("span",{className:"disk-size",children:ve(l.size)})]}),a.jsx("div",{className:"disk-bar",children:a.jsx("div",{className:"disk-bar-fill",style:{width:`${l.size/(((d=e.disk)==null?void 0:d.total_bytes)||1)*100}%`}})})]},c)})})]}),a.jsxs("div",{className:"popup-total",children:[a.jsx("span",{children:"Total:"}),a.jsx("span",{className:"total-value",children:ve(((o=e.disk)==null?void 0:o.total_bytes)||0)})]})]})}function Zy({data:e,width:t,height:n,isInitialLoad:r=!1,storages:s=[],onVMClick:i}){const[o,l]=h.useState(null),c=h.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(m=>({name:m.vm.name,value:m.value,vm:m.vm}))},p=ac(d).sum(m=>m.value||0).sort((m,w)=>(w.value||0)-(m.value||0));return Yy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Yf.ratio(1))(p).leaves().map(m=>({x:m.x0,y:m.y0,width:m.x1-m.x0,height:m.y1-m.y0,vm:m.data.vm,value:m.value||0}))},[e,t,n]);return c.length===0?a.jsx("div",{className:"no-storage",children:"No VM disk data available"}):a.jsxs("svg",{width:t,height:n,className:"d3-treemap",children:[a.jsxs("defs",{children:[a.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:a.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),a.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:a.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),a.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:a.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),a.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[a.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),a.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),c.map((d,p)=>{var R;const f=((R=d.vm.disk)==null?void 0:R.total_bytes)||1,u=d.vm.status==="running",m=o===`${d.vm.node}-${d.vm.vmid}`,w=d.width>15&&d.height>12,k=d.width>40&&d.height>25,E=d.width>50&&d.height>40,v=d.width>60&&d.height>55,x=Math.max(...c.map(b=>b.value)),g=d.value/x,_=()=>u?g>.7?"rgba(0, 255, 200, 0.15)":g>.4?"rgba(0, 200, 255, 0.12)":g>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",j=()=>u?g>.7?"rgba(0, 255, 200, 0.9)":g>.4?"rgba(0, 200, 255, 0.85)":g>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",z=()=>u?g>.7?"rgba(0, 255, 200, 0.4)":g>.4?"rgba(0, 200, 255, 0.35)":g>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",I=()=>u?g>.7?"rgba(0, 255, 220, 1)":g>.4?"rgba(100, 220, 255, 1)":g>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",H=r?p*30:0;return a.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>l(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>l(null),onClick:b=>{if(i){const N=b.currentTarget.getBoundingClientRect(),C=qy(d.vm,s);i(d.vm,C,{x:N.left+N.width/2,y:N.top})}},className:r?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${H}ms`},children:[a.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${ve(f)}`}),u&&a.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:z(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:m?1:.6}}),u&&d.width>30&&d.height>25&&a.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:j(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),a.jsx("rect",{width:d.width,height:d.height,fill:_(),stroke:j(),strokeWidth:m?2:1,rx:4,ry:4,style:{filter:m?`drop-shadow(0 0 12px ${z()}) drop-shadow(0 0 4px ${j()})`:`drop-shadow(0 0 3px ${z()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&a.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:j(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&a.jsxs(a.Fragment,{children:[a.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:j(),strokeWidth:1,opacity:.4,className:"circuit-line"}),a.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:j(),opacity:.8,className:"energy-dot"})]}),u&&a.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),w&&!k&&a.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:I(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${z()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),k&&(()=>{const b=d.width,N=d.height,C=Math.min(16,Math.max(9,Math.min(b/8,N/5))),L=Math.min(12,Math.max(8,Math.min(b/10,N/7))),A=Math.min(10,Math.max(7,Math.min(b/12,N/8))),Y=Math.floor((b-8)/(C*.6)),te=d.vm.name.length>Y?d.vm.name.slice(0,Math.max(1,Y-1))+"…":d.vm.name,O=C+(E?L+2:0)+(v?A+2:0),$=(N-O)/2+C/2;return a.jsxs(a.Fragment,{children:[a.jsx("text",{x:b/2,y:$,textAnchor:"middle",dominantBaseline:"middle",fill:I(),fontSize:C,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${z()}`:"none",filter:u?`drop-shadow(0 0 2px ${z()})`:"none"},children:te}),E&&a.jsx("text",{x:b/2,y:$+C*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:L,fontFamily:"var(--font-mono)",children:ve(f)}),v&&a.jsxs("text",{x:b/2,y:$+C*.8+(E?L*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:I(),fontSize:A,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${z()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function Jy({vmDiskData:e,totals:t,storages:n}){const{t:r,language:s}=Oe(),i=h.useRef(null),[o,l]=h.useState({width:0,height:0}),[c,d]=h.useState(!0),[p,f]=h.useState(null);h.useEffect(()=>{const m=()=>{if(i.current){const k=i.current.getBoundingClientRect();l({width:k.width,height:k.height})}};m();const w=new ResizeObserver(m);return i.current&&w.observe(i.current),()=>w.disconnect()},[]),h.useEffect(()=>{if(c&&e.length>0){const m=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(m)}},[c,e.length]);const u=h.useMemo(()=>e.map(m=>{var w;return{vm:m,value:((w=m.disk)==null?void 0:w.total_bytes)||0}}).filter(m=>m.value>0),[e]);return a.jsxs("div",{className:"treemap-container",children:[a.jsxs("div",{className:"treemap-header",children:[a.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),a.jsxs("div",{className:"treemap-stats",children:[a.jsxs("span",{children:[e.length," VMs"]}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsxs("span",{children:["Total Allocated: ",ve(e.reduce((m,w)=>{var k;return m+(((k=w.disk)==null?void 0:k.total_bytes)||0)},0))]})]})]}),a.jsxs("div",{ref:i,className:"treemap-grid",onClick:()=>f(null),children:[o.width>0&&o.height>0&&a.jsx(Zy,{data:u,width:o.width,height:o.height,isInitialLoad:c,storages:n,onVMClick:(m,w,k)=>f({vm:m,disks:w,position:k})}),p&&a.jsx(Qy,{vm:p.vm,disks:p.disks,position:p.position,onClose:()=>f(null)})]}),a.jsxs("div",{className:"treemap-legend",children:[a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color running"}),a.jsx("span",{children:r("vm.running")})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-color stopped"}),a.jsx("span",{children:r("vm.stopped")})]}),a.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function e1({storage:e,position:t,sourcePos:n,onClose:r}){const{t:s}=Oe();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,o=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return a.jsxs(a.Fragment,{children:[a.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[a.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),a.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),a.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),a.jsx("line",{x1:o.x,y1:o.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),a.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),a.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[a.jsx("div",{className:"tooltip-grid"}),a.jsx("div",{className:"tooltip-scan-line"}),a.jsx("div",{className:"tooltip-corner tl"}),a.jsx("div",{className:"tooltip-corner tr"}),a.jsx("div",{className:"tooltip-corner bl"}),a.jsx("div",{className:"tooltip-corner br"}),a.jsxs("div",{className:"tooltip-header",children:[a.jsx("span",{className:"tooltip-name",children:e.name}),a.jsx("button",{className:"tooltip-close",onClick:r,children:"×"})]}),a.jsx("div",{className:"tooltip-type-row",children:a.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?s("storage.filter_shared"):s("storage.filter_local")})}),a.jsxs("div",{className:"tooltip-content",children:[a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("table.type"),":"]}),a.jsx("span",{children:e.type.toUpperCase()})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("storage.content"),":"]}),a.jsx("div",{className:"tooltip-labels",children:e.content.map((c,d)=>a.jsx("span",{className:"tooltip-label",children:c},d))})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.used"),":"]}),a.jsx("span",{children:ve(e.usedBytes)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.total"),":"]}),a.jsx("span",{children:ve(e.totalBytes)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("metric.usage"),":"]}),a.jsx("span",{className:`text-${pe(i)}`,children:Ae(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&a.jsxs("div",{className:"tooltip-row",children:[a.jsxs("span",{children:[s("cluster.nodes"),":"]}),a.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((c,d)=>a.jsx("span",{className:"tooltip-label node",children:c},d))})]})]})]})]})}function t1({cluster:e,clusters:t}){const{t:n,language:r}=Oe(),[s,i]=h.useState("tanks"),[o,l]=h.useState("all"),[c,d]=h.useState(""),[p,f]=h.useState(null),[u,m]=h.useState(null),[w,k]=h.useState(null),[E,v]=h.useState(null),x=!e&&t&&Object.keys(t).length>0,g=h.useMemo(()=>{const N=[],C=(L,A)=>{Object.values(L.vms).forEach(Y=>{var te;(te=Y.disk)!=null&&te.total_bytes&&Y.disk.total_bytes>0&&!Y.template&&N.push({...Y,clusterName:A})})};return x?Object.entries(t).forEach(([L,A])=>{C(A,A.name||L)}):e&&C(e,e.name||""),N.sort((L,A)=>{var Y,te;return(((Y=A.disk)==null?void 0:Y.total_bytes)||0)-(((te=L.disk)==null?void 0:te.total_bytes)||0)})},[e,t,x]),{sharedStorages:_,localStoragesByNode:j,allNodes:z,totals:I,warnings:H}=h.useMemo(()=>{const N=new Map;let C=0,L=0,A=0;const Y=new Set,te=y=>{Object.values(y.storages).forEach(W=>{Y.add(W.node);const ee=W.storage;N.has(ee)||N.set(ee,{name:W.storage,type:W.type,content:W.content,allowedNodes:W.allowed_nodes||[],nodes:[]}),N.get(ee).nodes.push({node:W.node,totalBytes:W.disk.total_bytes,usedBytes:W.disk.used_bytes,active:W.enabled!==!1})})};x?Object.values(t).forEach(y=>te(y)):e&&te(e);const O=[],$={};Y.forEach(y=>{$[y]=[]}),N.forEach(y=>{const W=Ky.includes(y.type),ee=y.nodes[0].totalBytes,ue=y.nodes.length>1&&ee>0&&y.nodes.every(ne=>Math.abs(ne.totalBytes-ee)/ee<.01);if(W||ue){const ne=y.nodes[0],se=y.allowedNodes.length>0?y.allowedNodes:y.nodes.map(Te=>Te.node);O.push({name:y.name,type:y.type,content:y.content,isShared:!0,totalBytes:ne.totalBytes,usedBytes:ne.usedBytes,connectedNodes:se,nodeInstances:y.nodes})}else y.nodes.forEach(ne=>{$[ne.node]||($[ne.node]=[]),$[ne.node].push({name:y.name,type:y.type,content:y.content,isShared:!1,totalBytes:ne.totalBytes,usedBytes:ne.usedBytes,connectedNodes:[],nodeInstances:[ne]})})});const F=y=>{if(o==="local"&&y.isShared||o==="shared"&&!y.isShared)return!1;if(c){const W=c.toLowerCase();if(!y.name.toLowerCase().includes(W)&&!y.type.toLowerCase().includes(W))return!1}return!0},G=O.filter(F).sort((y,W)=>y.name.localeCompare(W.name)),X={};return Object.entries($).forEach(([y,W])=>{const ee=W.filter(F).sort((ue,ne)=>ue.name.localeCompare(ne.name));ee.length>0&&(X[y]=ee)}),G.forEach(y=>{(y.totalBytes>0?y.usedBytes/y.totalBytes*100:0)>=85&&A++,C+=y.usedBytes,L+=y.totalBytes}),Object.values(X).flat().forEach(y=>{(y.totalBytes>0?y.usedBytes/y.totalBytes*100:0)>=85&&A++,C+=y.usedBytes,L+=y.totalBytes}),{sharedStorages:G,localStoragesByNode:X,allNodes:Array.from(Y).sort(),totals:{totalUsed:C,totalCapacity:L},warnings:A}},[e,t,x,o,c]),R=(N,C)=>{if(u&&u.name===N.name&&u.isShared===N.isShared){m(null),k(null),v(null);return}const L=C.getBoundingClientRect(),A=240,Y=200,te=L.top+L.height/2;let O=L.right+30,$=!1;O+A>window.innerWidth&&(O=L.left-A-30,$=!0);let F=L.top;F+Y>window.innerHeight&&(F=window.innerHeight-Y-10),F<10&&(F=10),m(N),k({x:O,y:F}),v({x:$?L.left:L.right,y:te})};if(!e&&!x)return a.jsx("div",{className:"storage-vault empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("cluster.select")})]})});const b=I.totalCapacity>0?I.totalUsed/I.totalCapacity*100:0;return a.jsxs("div",{className:"storage-vault",children:[a.jsx("div",{className:"grid-floor"}),a.jsxs("div",{className:"vault-header",children:[a.jsxs("div",{className:"header-title-section",children:[a.jsxs("h1",{className:"vault-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),a.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),a.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),a.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),a.jsxs("div",{className:"vault-stats",children:[a.jsx("span",{className:"stat-item",children:n("storage.count",{n:_.length+Object.values(j).flat().length})}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:_.length})}),a.jsx("span",{className:"stat-divider",children:"|"}),a.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(j).flat().length})}),H>0&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"stat-divider",children:"|"}),a.jsxs("span",{className:"stat-warning",children:["⚠️ ",H," ",n("settings.warning")]})]})]})]}),a.jsxs("div",{className:"header-controls",children:[a.jsxs("div",{className:"search-box",children:[a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("path",{d:"M21 21l-4.35-4.35"})]}),a.jsx("input",{type:"text",placeholder:n("storage.search"),value:c,onChange:N=>d(N.target.value)})]}),a.jsxs("div",{className:"filter-tabs",children:[a.jsx("button",{className:`filter-tab ${o==="all"?"active":""}`,onClick:()=>l("all"),children:n("storage.filter_all")}),a.jsx("button",{className:`filter-tab ${o==="shared"?"active":""}`,onClick:()=>l("shared"),children:n("storage.filter_shared")}),a.jsx("button",{className:`filter-tab ${o==="local"?"active":""}`,onClick:()=>l("local"),children:n("storage.filter_local")})]}),a.jsxs("div",{className:"view-toggle",children:[a.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>i("tanks"),title:r==="zh-TW"?"能量槽檢視":"Tank view",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),a.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),a.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>i("treemap"),title:r==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),a.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),a.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),a.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),a.jsxs("div",{className:"summary-indicator-container",children:[a.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),a.jsx(Xy,{percent:b,usedBytes:I.totalUsed,totalBytes:I.totalCapacity,duration:1500})]}),a.jsx("div",{className:"vault-content",children:s==="treemap"?a.jsx(Jy,{vmDiskData:g,totals:I,storages:[..._.map(N=>N.name),...Object.values(j).flat().map(N=>N.name)]}):a.jsxs("div",{className:"tanks-layout",children:[(o==="all"||o==="shared")&&_.length>0&&a.jsxs("div",{className:"storage-section shared-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsxs("div",{className:"section-title shared",children:[a.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),a.jsx("span",{children:n("storage.section_shared")})]}),a.jsx("span",{className:"section-count shared",children:n(_.length>1?"storage.storages_plural":"storage.storages_count",{n:_.length})})]}),a.jsx("div",{className:"tanks-grid shared-grid",children:_.map((N,C)=>a.jsx("div",{onClick:L=>R(N,L.currentTarget),style:{cursor:"pointer"},children:a.jsx(Jd,{name:N.name,usedBytes:N.usedBytes,totalBytes:N.totalBytes,type:N.type,isShared:!0,connectedNodes:N.connectedNodes,width:140,height:220,animationDelay:C*80})},N.name))})]}),(o==="all"||o==="local")&&Object.keys(j).length>0&&a.jsxs("div",{className:"storage-section local-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsxs("div",{className:"section-title local",children:[a.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),a.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),a.jsx("span",{children:n("storage.section_local")})]}),a.jsxs("span",{className:"section-count local",children:[n(Object.values(j).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(j).flat().length})," ",n(Object.keys(j).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(j).length})]})]}),a.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let N=_.length;return Object.entries(j).sort(([C],[L])=>C.localeCompare(L)).flatMap(([C,L])=>L.map(A=>{const Y=A.nodeInstances[0],te=N++;return a.jsx("div",{onClick:O=>R(A,O.currentTarget),style:{cursor:"pointer"},children:a.jsx(Jd,{name:A.name,usedBytes:Y.usedBytes,totalBytes:Y.totalBytes,type:A.type,isShared:!1,nodeName:C,isOffline:!Y.active,width:120,height:200,animationDelay:te*80})},`${C}-${A.name}`)}))})()})]}),_.length===0&&Object.keys(j).length===0&&a.jsx("div",{className:"no-storage",children:c?a.jsxs("span",{children:[n("error.no_data"),': "',c,'"']}):a.jsx("span",{children:n("error.no_data")})})]})}),a.jsx(e1,{storage:u,position:w,sourcePos:E,onClose:()=>{m(null),k(null),v(null)}}),a.jsx("style",{children:`
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
          padding: var(--spacing-xs) var(--spacing-lg);
          margin-bottom: var(--spacing-sm);
          position: relative;
          overflow: hidden;
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
        }

        /* VM Disk Popup Styles */
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
          transform: translate(-50%, -100%) translateY(-10px);
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
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(0, 240, 255, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
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
      `})]})}function n1({onClose:e,clusters:t}){const{t:n,language:r,setLanguage:s}=Oe(),[i,o]=h.useState(null),[l,c]=h.useState(!0),[d,p]=h.useState(!1),[f,u]=h.useState(null),[m,w]=h.useState(!1),[k,E]=h.useState("ui"),[v,x]=h.useState(!0),[g,_]=h.useState("cyberpunk"),[j,z]=h.useState("command-center"),[I,H]=h.useState(100),[R,b]=h.useState("all"),[N,C]=h.useState(85),[L,A]=h.useState("vmid"),[Y,te]=h.useState("node"),[O,$]=h.useState("node"),[F,G]=h.useState("asc"),[X,y]=h.useState({}),[W,ee]=h.useState(!0),[ue,ne]=h.useState(80),[se,Te]=h.useState(95),[K,Z]=h.useState(85),[ie,oe]=h.useState(95),[Ve,nt]=h.useState(80),[Ue,$e]=h.useState(95),[ye,je]=h.useState(50),[He,qe]=h.useState(100),[Ye,Vt]=h.useState(5),[Pe,Nt]=h.useState(10),[ke,ut]=h.useState("0.0.0.0"),[pt,Qe]=h.useState(8098),[S,D]=h.useState(!1),[T,P]=h.useState(8086),B=()=>{w(!0),setTimeout(()=>e(),400)};h.useEffect(()=>{J()},[]);const J=async()=>{var M,ae,ge,be,re,de,he,Ge,De,Zt,Le,Ze,Rn,Tn,Ln,$r,Pr,Ta,La,Ia,Aa,sc,ic,oc,lc,cc,dc,uc,pc,fc,mc,gc,hc,xc;try{c(!0);const fe=await Ys.getConfig();o(fe),x(((M=fe.ui)==null?void 0:M.animations_enabled)??!0),_(((ae=fe.ui)==null?void 0:ae.theme)??"cyberpunk"),z(((ge=fe.ui)==null?void 0:ge.default_view)??"command-center"),H(((be=fe.ui)==null?void 0:be.particle_count)??100),b(((re=fe.ui)==null?void 0:re.vm_matrix_default_filter)??"all"),C(((de=fe.ui)==null?void 0:de.matrix_card_width)??85),A(((he=fe.ui)==null?void 0:he.matrix_sort_by)??"vmid"),te(((Ge=fe.ui)==null?void 0:Ge.matrix_group_by)??"node"),$(((De=fe.ui)==null?void 0:De.matrix_group_sort_by)??"node"),G(((Zt=fe.ui)==null?void 0:Zt.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Le=fe.ui)==null?void 0:Le.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Ze=fe.ui)==null?void 0:Ze.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((Rn=fe.ui)==null?void 0:Rn.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((Tn=fe.ui)==null?void 0:Tn.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((Ln=fe.ui)==null?void 0:Ln.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",(($r=fe.ui)==null?void 0:$r.matrix_group_sort_order)??"asc");const vc={};(Pr=fe.clusters)==null||Pr.forEach(Oa=>{vc[Oa.id]={enabled:Oa.enabled!==!1,poll_interval:Oa.poll_interval||5,static_refresh_interval:Oa.static_refresh_interval||60}}),y(vc),ee(((Ta=fe.alerts)==null?void 0:Ta.enabled)??!0),ne(((La=fe.alerts)==null?void 0:La.cpu_warning)??80),Te(((Ia=fe.alerts)==null?void 0:Ia.cpu_critical)??95),Z(((Aa=fe.alerts)==null?void 0:Aa.memory_warning)??85),oe(((sc=fe.alerts)==null?void 0:sc.memory_critical)??95),nt(((ic=fe.alerts)==null?void 0:ic.disk_warning)??80),$e(((oc=fe.alerts)==null?void 0:oc.disk_critical)??95),je(((lc=fe.alerts)==null?void 0:lc.diskio_warning)??50),qe(((cc=fe.alerts)==null?void 0:cc.diskio_critical)??100),Vt(((dc=fe.alerts)==null?void 0:dc.iowait_warning)??5),Nt(((uc=fe.alerts)==null?void 0:uc.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((pc=fe.alerts)==null?void 0:pc.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((fc=fe.alerts)==null?void 0:fc.iowait_critical)??10)),ut(((mc=fe.server)==null?void 0:mc.host)??"0.0.0.0"),Qe(((gc=fe.server)==null?void 0:gc.http_port)??8098),D(((hc=fe.server)==null?void 0:hc.influx_enabled)??!1),P(((xc=fe.server)==null?void 0:xc.influx_port)??8086)}catch(fe){u(String(fe))}finally{c(!1)}},Q=async()=>{var M;try{p(!0),localStorage.setItem("matrix_card_width",String(N)),localStorage.setItem("matrix_sort_by",L),localStorage.setItem("matrix_group_by",Y),localStorage.setItem("vm_matrix_default_filter",R),localStorage.setItem("matrix_group_sort_by",O),localStorage.setItem("matrix_group_sort_order",F),localStorage.setItem("iowait_warning",String(Ye)),localStorage.setItem("iowait_critical",String(Pe));const ae=(M=i==null?void 0:i.clusters)==null?void 0:M.map(ge=>{var be,re,de;return{...ge,enabled:((be=X[ge.id])==null?void 0:be.enabled)!==!1,poll_interval:((re=X[ge.id])==null?void 0:re.poll_interval)||ge.poll_interval,static_refresh_interval:((de=X[ge.id])==null?void 0:de.static_refresh_interval)||ge.static_refresh_interval}});await Ys.updateConfig({server:{host:ke,http_port:pt,influx_enabled:S,influx_port:T},ui:{default_view:j,theme:g,language:r,animations_enabled:v,particle_count:I,vm_matrix_default_filter:R,matrix_card_width:N,matrix_sort_by:L,matrix_group_by:Y,matrix_group_sort_by:O,matrix_group_sort_order:F},alerts:{enabled:W,cpu_warning:ue,cpu_critical:se,memory_warning:K,memory_critical:ie,disk_warning:Ve,disk_critical:Ue,diskio_warning:ye,diskio_critical:He,iowait_warning:Ye,iowait_critical:Pe},clusters:ae}),e()}catch(ae){u(String(ae))}finally{p(!1)}},U=M=>{y(ae=>{var ge;return{...ae,[M]:{...ae[M],enabled:!((ge=ae[M])!=null&&ge.enabled)}}})},le=(M,ae,ge)=>{y(be=>({...be,[M]:{...be[M],[ae]:ge}}))};h.useEffect(()=>{const M=ae=>{ae.key==="Escape"&&!m&&B()};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[m]);const ce=[{id:"ui",labelKey:"settings.tab_ui",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),a.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),a.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),a.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),a.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return a.jsxs("div",{className:`settings-overlay ${m?"exiting":""}`,onClick:M=>M.target===M.currentTarget&&!m&&B(),children:[a.jsxs("div",{className:`settings-panel panel ${m?"exiting":""}`,children:[a.jsx("div",{className:"settings-scanline"}),a.jsxs("div",{className:"settings-header",children:[a.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),a.jsx("button",{className:"settings-close",onClick:B,children:"×"})]}),a.jsx("div",{className:"settings-tabs",children:ce.map(M=>a.jsxs("button",{className:`settings-tab ${k===M.id?"active":""}`,onClick:()=>E(M.id),children:[M.icon,a.jsx("span",{children:n(M.labelKey)})]},M.id))}),a.jsx("div",{className:"settings-content",children:l?a.jsxs("div",{className:"settings-loading",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:n("loading.data")})]}):f?a.jsx("div",{className:"settings-error",children:a.jsx("span",{children:f})}):a.jsxs(a.Fragment,{children:[k==="ui"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.default_view")}),a.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(M=>a.jsxs("label",{className:`radio-option ${j===M.id?"active":""}`,children:[a.jsx("input",{type:"radio",name:"defaultView",value:M.id,checked:j===M.id,onChange:()=>z(M.id)}),a.jsx("span",{className:"radio-label",children:n(M.labelKey)})]},M.id))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),a.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(M=>a.jsxs("label",{className:`radio-option ${R===M?"active":""}`,children:[a.jsx("input",{type:"radio",name:"vmFilter",value:M,checked:R===M,onChange:()=>b(M)}),a.jsx("span",{className:"radio-label",children:n(`settings.filter_${M}`)})]},M))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),a.jsxs("div",{className:"input-row",children:[a.jsx("input",{type:"number",className:"input-field",value:N,onChange:M=>C(Number(M.target.value)),min:60,max:200}),a.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),a.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(M=>a.jsxs("label",{className:`radio-option ${L===M?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixSortBy",value:M,checked:L===M,onChange:()=>A(M)}),a.jsx("span",{className:"radio-label",children:n(`settings.sort_${M}`)})]},M))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),a.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(M=>a.jsxs("label",{className:`radio-option ${Y===M?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupBy",value:M,checked:Y===M,onChange:()=>te(M)}),a.jsx("span",{className:"radio-label",children:n(`matrix.group_${M}`)})]},M))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),a.jsxs("div",{className:"settings-row",children:[a.jsxs("div",{className:"settings-item",children:[a.jsx("label",{children:n("settings.sort_by")}),a.jsxs("div",{className:"radio-group inline",children:[a.jsxs("label",{className:`radio-option ${O==="node"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:O==="node",onChange:()=>$("node")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),a.jsxs("label",{className:`radio-option ${O==="cluster"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:O==="cluster",onChange:()=>$("cluster")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),a.jsxs("div",{className:"settings-item",children:[a.jsx("label",{children:n("settings.sort_order")}),a.jsxs("div",{className:"radio-group inline",children:[a.jsxs("label",{className:`radio-option ${F==="asc"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:F==="asc",onChange:()=>G("asc")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),a.jsxs("label",{className:`radio-option ${F==="desc"?"active":""}`,children:[a.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:F==="desc",onChange:()=>G("desc")}),a.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),k==="clusters"&&i&&a.jsx("div",{className:"tab-content",children:a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),a.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),a.jsx("div",{className:"cluster-list-full",children:i.clusters.map(M=>{var re,de;const ae=t==null?void 0:t[M.id],ge=(ae==null?void 0:ae.name)||M.name||M.id,be=X[M.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return a.jsxs("div",{className:`cluster-card ${be.enabled?"":"disabled-cluster"}`,children:[a.jsxs("div",{className:"cluster-card-header",children:[a.jsxs("label",{className:"cluster-toggle",onClick:he=>he.stopPropagation(),children:[a.jsx("input",{type:"checkbox",checked:be.enabled,onChange:()=>U(M.id)}),a.jsx("span",{className:"cluster-toggle-switch"})]}),a.jsx("span",{className:`cluster-status ${be.enabled?"enabled":"disabled"}`}),a.jsx("span",{className:"cluster-name",children:ge}),a.jsxs("span",{className:"cluster-id",children:["(",M.id,")"]})]}),a.jsxs("div",{className:"cluster-card-body",children:[a.jsxs("div",{className:"cluster-setting",children:[a.jsx("label",{children:n("settings.poll_interval")}),a.jsx("input",{type:"number",className:"input-field-sm",value:be.poll_interval,onChange:he=>le(M.id,"poll_interval",Number(he.target.value)),min:1,max:60})]}),a.jsxs("div",{className:"cluster-setting",children:[a.jsx("label",{children:n("settings.static_refresh")}),a.jsx("input",{type:"number",className:"input-field-sm",value:be.static_refresh_interval,onChange:he=>le(M.id,"static_refresh_interval",Number(he.target.value)),min:30,max:600})]})]}),a.jsxs("div",{className:"cluster-card-info",children:[a.jsx("span",{children:n("settings.nodes_count",{n:((re=M.nodes)==null?void 0:re.length)||0})}),a.jsxs("span",{children:[n("settings.auth"),": ",((de=M.auth)==null?void 0:de.user)||"N/A"]})]})]},M.id)})})]})}),k==="alerts"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:ue,onChange:M=>ne(Number(M.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:se,onChange:M=>Te(Number(M.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:K,onChange:M=>Z(Number(M.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:ie,onChange:M=>oe(Number(M.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ve,onChange:M=>nt(Number(M.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ue,onChange:M=>$e(Number(M.target.value)),min:0,max:100})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsx("label",{children:n("settings.warning")}),a.jsx("input",{type:"number",className:"input-field-sm",value:ye,onChange:M=>je(Number(M.target.value)),min:0,max:1e4})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsx("label",{children:n("settings.critical")}),a.jsx("input",{type:"number",className:"input-field-sm",value:He,onChange:M=>qe(Number(M.target.value)),min:0,max:1e4})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),a.jsxs("div",{className:"threshold-row",children:[a.jsxs("div",{className:"threshold-item warning",children:[a.jsxs("label",{children:[n("settings.warning")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Ye,onChange:M=>Vt(Number(M.target.value)),min:0,max:100})]}),a.jsxs("div",{className:"threshold-item danger",children:[a.jsxs("label",{children:[n("settings.critical")," (%)"]}),a.jsx("input",{type:"number",className:"input-field-sm",value:Pe,onChange:M=>Nt(Number(M.target.value)),min:0,max:100})]})]})]})]}),k==="server"&&a.jsxs("div",{className:"tab-content",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.http_server")}),a.jsxs("div",{className:"input-group",children:[a.jsxs("div",{className:"input-row",children:[a.jsx("label",{children:n("settings.host")}),a.jsx("input",{type:"text",className:"input-field",value:ke,onChange:M=>ut(M.target.value)})]}),a.jsxs("div",{className:"input-row",children:[a.jsx("label",{children:n("settings.port")}),a.jsx("input",{type:"number",className:"input-field",value:pt,onChange:M=>Qe(Number(M.target.value)),min:1,max:65535})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),a.jsxs("label",{className:"toggle-option",children:[a.jsx("input",{type:"checkbox",checked:S,onChange:M=>D(M.target.checked)}),a.jsx("span",{className:"toggle-switch"}),a.jsx("span",{className:"toggle-label",children:n(S?"settings.enabled":"settings.disabled")})]}),S&&a.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[a.jsx("label",{children:n("settings.influx_port")}),a.jsx("input",{type:"number",className:"input-field",value:T,onChange:M=>P(Number(M.target.value)),min:1,max:65535})]})]}),a.jsx("div",{className:"settings-section",children:a.jsxs("div",{className:"server-note",children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),a.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),a.jsxs("div",{className:"settings-footer",children:[a.jsxs("div",{className:"settings-footer-left",children:[a.jsxs("div",{className:"settings-version",children:[a.jsx("span",{className:"version-label",children:n("settings.version")}),a.jsx("span",{className:"version-number",children:"v0.1.0"})]}),a.jsxs("div",{className:"settings-author",children:[a.jsx("span",{className:"author-label",children:"by"}),a.jsx("span",{className:"author-name",children:"Jason Cheng"}),a.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),a.jsxs("div",{className:"settings-actions",children:[a.jsx("button",{className:"btn",onClick:B,children:n("action.cancel")}),a.jsx("button",{className:"btn btn-primary",onClick:Q,disabled:d||m,children:d?"Saving...":n("action.save")})]})]}),a.jsx("div",{className:"corner-decoration top-left"}),a.jsx("div",{className:"corner-decoration top-right"}),a.jsx("div",{className:"corner-decoration bottom-left"}),a.jsx("div",{className:"corner-decoration bottom-right"})]}),a.jsx("style",{children:`
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
      `})]})}const eu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function r1({particleCount:e=80,enabled:t=!0,isPaused:n=!1}){const r=h.useRef(null),s=h.useRef([]),i=h.useRef(),o=h.useRef({x:0,y:0}),l=h.useCallback((d,p)=>{s.current=Array.from({length:e},()=>({x:Math.random()*d,y:Math.random()*p,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:eu[Math.floor(Math.random()*eu.length)]}))},[e]),c=h.useCallback(()=>{const d=r.current;if(!d)return;const p=d.getContext("2d");if(!p)return;const{width:f,height:u}=d;p.clearRect(0,0,f,u),s.current.forEach(m=>{const w=m.x-o.current.x,k=m.y-o.current.y,E=Math.sqrt(w*w+k*k);if(E<100){const v=(100-E)/100;m.vx+=w/E*v*.05,m.vy+=k/E*v*.05}m.x+=m.vx,m.y+=m.vy,m.vx*=.99,m.vy*=.99,m.x<0&&(m.x=f),m.x>f&&(m.x=0),m.y<0&&(m.y=u),m.y>u&&(m.y=0),m.alpha+=(Math.random()-.5)*.02,m.alpha=Math.max(.1,Math.min(.7,m.alpha)),p.beginPath(),p.arc(m.x,m.y,m.size,0,Math.PI*2),p.fillStyle=m.color,p.globalAlpha=m.alpha,p.fill(),p.shadowBlur=10,p.shadowColor=m.color,p.fill(),p.shadowBlur=0}),p.globalAlpha=1,i.current=requestAnimationFrame(c)},[]);return h.useEffect(()=>{if(!t)return;const d=r.current;if(!d)return;const p=()=>{d.width=window.innerWidth,d.height=window.innerHeight,l(d.width,d.height)},f=u=>{o.current={x:u.clientX,y:u.clientY}};return p(),window.addEventListener("resize",p),window.addEventListener("mousemove",f),()=>{window.removeEventListener("resize",p),window.removeEventListener("mousemove",f)}},[t,l]),h.useEffect(()=>{if(!t||n){i.current&&(cancelAnimationFrame(i.current),i.current=void 0);return}return c(),()=>{i.current&&cancelAnimationFrame(i.current)}},[t,n,c]),t?a.jsx("canvas",{ref:r,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const tu={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function to({digit:e,size:t=16,color:n="#00f0ff",dimColor:r="rgba(0, 240, 255, 0.08)",glow:s=!1}){const i=tu[e]||tu[" "],o=t,l=t*1.8,c=t*.15,d=t*.05,p=s?t*.4:t*.15,f=[`M ${d+c} ${d} L ${o-d-c} ${d} L ${o-d-c*.3} ${c*.7+d} L ${d+c*.3} ${c*.7+d} Z`,`M ${o-d} ${d+c} L ${o-d} ${l/2-d} L ${o-d-c*.7} ${l/2-d-c*.3} L ${o-d-c*.7} ${d+c+c*.3} Z`,`M ${o-d} ${l/2+d} L ${o-d} ${l-d-c} L ${o-d-c*.7} ${l-d-c-c*.3} L ${o-d-c*.7} ${l/2+d+c*.3} Z`,`M ${d+c} ${l-d} L ${o-d-c} ${l-d} L ${o-d-c*.3} ${l-c*.7-d} L ${d+c*.3} ${l-c*.7-d} Z`,`M ${d} ${l/2+d} L ${d} ${l-d-c} L ${d+c*.7} ${l-d-c-c*.3} L ${d+c*.7} ${l/2+d+c*.3} Z`,`M ${d} ${d+c} L ${d} ${l/2-d} L ${d+c*.7} ${l/2-d-c*.3} L ${d+c*.7} ${d+c+c*.3} Z`,`M ${d+c*.5} ${l/2} L ${d+c} ${l/2-c*.4} L ${o-d-c} ${l/2-c*.4} L ${o-d-c*.5} ${l/2} L ${o-d-c} ${l/2+c*.4} L ${d+c} ${l/2+c*.4} Z`];return a.jsx("svg",{width:o,height:l,style:{display:"inline-block"},children:f.map((u,m)=>a.jsx("path",{d:u,fill:i[m]?n:r,style:{filter:i[m]?`drop-shadow(0 0 ${p}px ${n})`:"none",transition:"fill 0.03s ease-out"}},m))})}function nu({size:e=16,color:t="#00f0ff",dim:n=!1}){const r=e*.4,s=e*1.8,i=e*.15,o=n?.15:1;return a.jsxs("svg",{width:r,height:s,style:{display:"inline-block"},children:[a.jsx("circle",{cx:r/2,cy:s*.3,r:i,fill:t,opacity:o,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),a.jsx("circle",{cx:r/2,cy:s*.7,r:i,fill:t,opacity:o,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function ru(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function a1(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function s1({timestamp:e,connected:t=!0}){const[n,r]=h.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,i]=h.useState(!1),[o,l]=h.useState(!1),c=h.useRef(!1),d=h.useRef(null),p=h.useRef(null),f=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",m=n.hours==="  ",w=h.useCallback(x=>{const g=ru(x);r(g),p.current=x},[]),k=h.useCallback(x=>{d.current&&clearInterval(d.current),l(!0),i(!0);let g=0;const _=20,j=50,z={current:x};return d.current=setInterval(()=>{if(g++,g<_)r(a1());else{d.current&&(clearInterval(d.current),d.current=null);const I=ru(z.current);r(I),p.current=z.current,l(!1),i(!1)}},j),I=>{z.current=I}},[]),E=h.useRef(null);h.useEffect(()=>{if(e===null){c.current||r({hours:"  ",minutes:"  ",seconds:"  "});return}if(!c.current){c.current=!0,E.current=k(e);return}if(d.current&&E.current){E.current(e);return}p.current!==e&&w(e)},[e,k,w]),h.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const v=14;return a.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${o?"first-spin":""} ${t?"":"disconnected"}`,children:[a.jsxs("div",{className:"clock-label",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"7 10 12 15 17 10"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),a.jsx("span",{style:{color:f},children:"LAST"})]}),a.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((x,g)=>a.jsx(to,{digit:x||" ",size:v,color:f,dimColor:u,glow:o},`h${g}`)),a.jsx(nu,{size:v,color:f,dim:m}),(n.minutes||"  ").split("").map((x,g)=>a.jsx(to,{digit:x||" ",size:v,color:f,dimColor:u,glow:o},`m${g}`)),a.jsx(nu,{size:v,color:f,dim:m}),(n.seconds||"  ").split("").map((x,g)=>a.jsx(to,{digit:x||" ",size:v,color:f,dimColor:u,glow:o},`s${g}`))]})]})}function i1({clusters:e,value:t,onChange:n,disabled:r}){const[s,i]=h.useState(!1),o=h.useRef(null);h.useEffect(()=>{const d=p=>{o.current&&!o.current.contains(p.target)&&i(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),h.useEffect(()=>{const d=p=>{p.key==="Escape"&&i(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const l=d=>{n(d),i(!1)},c=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return a.jsxs("div",{ref:o,className:`cluster-selector-wrapper ${r?"disabled":""}`,children:[a.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!r&&i(!s),disabled:r,title:c(),children:[a.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"4",r:"2"}),a.jsx("circle",{cx:"12",cy:"20",r:"2"}),a.jsx("circle",{cx:"4",cy:"12",r:"2"}),a.jsx("circle",{cx:"20",cy:"12",r:"2"}),a.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),a.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),a.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),a.jsx("span",{className:"selector-label",children:c()}),a.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!r&&a.jsxs("div",{className:"cluster-dropdown",children:[a.jsxs("div",{className:"dropdown-header",children:[a.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),a.jsx("div",{className:"dropdown-line"})]}),a.jsxs("div",{className:"dropdown-options",children:[a.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>l("__all__"),children:[a.jsx("span",{className:"option-icon",children:"⊕"}),a.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&a.jsx("span",{className:"option-check",children:"✓"})]}),a.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,p])=>{var k,E;const f=(k=p.summary)==null?void 0:k.is_standalone,u=p.name||d,m=((E=p.summary)==null?void 0:E.nodes_online)??0,w=Object.keys(p.vms||{}).length;return a.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>l(d),children:[a.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),a.jsxs("div",{className:"option-content",children:[a.jsx("span",{className:"option-label",children:u}),a.jsxs("span",{className:"option-meta",children:[m," nodes · ",w," VMs"]})]}),t===d&&a.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),a.jsx("div",{className:"dropdown-corner tl"}),a.jsx("div",{className:"dropdown-corner tr"}),a.jsx("div",{className:"dropdown-corner bl"}),a.jsx("div",{className:"dropdown-corner br"})]}),a.jsx("style",{children:`
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
      `})]})}const It={Command:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),a.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),a.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),a.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),a.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),a.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),a.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),a.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),a.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),a.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),a.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),a.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Settings:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),a.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),a.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:a.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[a.jsx("circle",{cx:"5",cy:"12",r:"2"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},au=[{view:"command-center",icon:It.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:It.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:It.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:It.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:It.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:It.Ceph,labelKey:"nav.ceph",shortcut:"C"}],o1={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation"};function l1(){const{t:e,language:t,setLanguage:n}=Oe(),[r,s]=h.useState("command-center"),[i,o]=h.useState({}),[l,c]=h.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,p]=h.useState(!1),[f,u]=h.useState(0),[m,w]=h.useState(!1),[k,E]=h.useState(null),[v,x]=h.useState(!1),[g,_]=h.useState(!1),{connected:j,connecting:z}=wg({onMessage:h.useCallback(N=>{m||(o(N),u(Date.now()/1e3))},[m])}),I=h.useCallback(()=>{E(m?"resuming":"pausing"),setTimeout(()=>{w(N=>!N),setTimeout(()=>E(null),500)},300)},[m]),H=l==="__all__"?null:i[l]||null,R=h.useMemo(()=>{const N=Object.values(i);return{total_clusters:N.length,total_nodes:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.node_count)||0)},0),total_nodes_online:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.nodes_online)||0)},0),total_vms:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.vm_count)||0)},0),total_vms_running:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.vms_running)||0)},0),total_cts:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.ct_count)||0)},0),total_cts_running:N.reduce((C,L)=>{var A;return C+(((A=L.summary)==null?void 0:A.cts_running)||0)},0),clusters:N.map(C=>C.summary).filter(Boolean)}},[i]);h.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",l)}catch{}},[l]),h.useEffect(()=>{Object.keys(i).length>0&&l!=="__all__"&&(i[l]||c("__all__"))},[i,l]),h.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),h.useEffect(()=>{Ys.getConfig().then(N=>{N!=null&&N.ui&&(N.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",N.ui.vm_matrix_default_filter),N.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(N.ui.matrix_card_width)),N.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",N.ui.matrix_sort_by))}).catch(()=>{})},[]),h.useEffect(()=>{if(!v)return;const N=()=>x(!1);return document.addEventListener("click",N),()=>document.removeEventListener("click",N)},[v]),h.useEffect(()=>{if(!g)return;const N=()=>_(!1);return document.addEventListener("click",N),()=>document.removeEventListener("click",N)},[g]),h.useEffect(()=>{const N=C=>{if(C.target instanceof HTMLInputElement||C.target instanceof HTMLTextAreaElement)return;const L=C.key.toLowerCase();if(L===" "||C.code==="Space"){C.preventDefault(),I();return}if(!C.ctrlKey&&!C.metaKey&&!C.altKey){const A=o1[L];if(A){C.preventDefault(),s(A);return}}(C.ctrlKey||C.metaKey)&&L==="s"&&(C.preventDefault(),p(A=>!A))};return window.addEventListener("keydown",N),()=>window.removeEventListener("keydown",N)},[I]);const b=()=>{const N=l==="__all__";switch(r){case"command-center":return a.jsx(Ed,{clusters:i,globalSummary:R,isPaused:m,onSelectCluster:C=>{c(C),s("cluster-core")}});case"cluster-core":return a.jsx(Rg,{cluster:H,clusters:N?i:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:C=>{c(C),s("holo-matrix")},isPaused:m});case"holo-matrix":return a.jsx(Dg,{cluster:H,clusters:N?i:void 0});case"radar-scan":return a.jsx(Wg,{cluster:H,clusters:N?i:void 0,isPaused:m});case"storage":return a.jsx(t1,{cluster:H,clusters:N?i:void 0});case"ceph-constellation":return a.jsx(rh,{cluster:H,clusters:N?i:void 0,isPaused:m});default:return a.jsx(Ed,{clusters:i,globalSummary:R,isPaused:m,onSelectCluster:C=>{c(C),s("cluster-core")}})}};return a.jsxs("div",{className:`app-container ${m?"animations-paused":""}`,children:[a.jsx(r1,{isPaused:m}),a.jsxs("header",{className:"header-bar",children:[a.jsxs("div",{className:"header-logo",children:[a.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),a.jsx("span",{className:`status-dot ${j?"connected":z?"connecting":"disconnected"}`,title:e(j?"status.connected":z?"status.connecting":"status.disconnected")}),a.jsx(s1,{timestamp:f,connected:j})]}),a.jsxs("nav",{className:"header-center",children:[a.jsxs("div",{className:"nav-tabs",children:[au.map(({view:N,icon:C,labelKey:L,shortcut:A},Y)=>a.jsxs("button",{className:`nav-tab nav-tab-${Y} ${r===N?"active":""}`,onClick:()=>s(N),title:`${e(L)} [${A}]`,children:[a.jsx(C,{}),a.jsx("span",{children:e(L)}),a.jsx("span",{className:"nav-shortcut",children:A})]},N)),a.jsxs("div",{className:"nav-more-wrapper",children:[a.jsx("button",{className:"nav-tab nav-more-btn",onClick:N=>{N.stopPropagation(),_(!g)},title:e("nav.more"),children:a.jsx(It.MoreHorizontal,{})}),g&&a.jsx("div",{className:"nav-more-dropdown",onClick:N=>N.stopPropagation(),children:au.map(({view:N,icon:C,labelKey:L,shortcut:A},Y)=>a.jsxs("button",{className:`nav-more-option nav-more-option-${Y} ${r===N?"active":""}`,onClick:()=>{s(N),_(!1)},children:[a.jsx(C,{}),a.jsx("span",{children:e(L)}),a.jsx("span",{className:"nav-shortcut",children:A})]},N))})]})]}),Object.keys(i).length>0&&a.jsx(i1,{clusters:i,value:l,onChange:c,disabled:r==="command-center"})]}),a.jsxs("div",{className:"header-right",children:[a.jsxs("button",{className:`btn btn-icon pause-btn ${m?"paused":""} ${k||""}`,onClick:I,title:`${e(m?"status.paused":"status.live")} [Space]`,children:[a.jsx("div",{className:"pause-btn-inner",children:m?a.jsx(It.Play,{}):a.jsx(It.Pause,{})}),a.jsx("div",{className:"pause-fx"})]}),a.jsxs("div",{className:"lang-menu-wrapper",children:[a.jsx("button",{className:"btn btn-icon",onClick:N=>{N.stopPropagation(),x(!v)},title:e("settings.language"),children:a.jsx(It.Language,{})}),v&&a.jsxs("div",{className:"lang-dropdown",onClick:N=>N.stopPropagation(),children:[a.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),x(!1)},children:[a.jsx("span",{className:"lang-flag",children:"EN"}),a.jsx("span",{children:"English"})]}),a.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),x(!1)},children:[a.jsx("span",{className:"lang-flag",children:"繁"}),a.jsx("span",{children:"繁體中文"})]})]})]}),a.jsx("button",{className:"btn btn-icon",onClick:()=>p(!0),title:e("settings.title"),children:a.jsx(It.Settings,{})})]})]}),a.jsx("main",{className:"main-content",children:a.jsx("div",{className:"view-container",children:b()},r)}),d&&a.jsx(n1,{onClose:()=>p(!1),clusters:i}),k&&a.jsxs("div",{className:`pause-overlay ${k}`,children:[a.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((N,C)=>a.jsx("div",{className:"glitch-line",style:{animationDelay:`${C*.05}s`}},C))}),a.jsx("div",{className:"pause-status-text",children:k==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),a.jsx("div",{className:"pause-scan-ring"})]})]})}function c1(){return a.jsx(bg,{children:a.jsx(l1,{})})}no.createRoot(document.getElementById("root")).render(a.jsx(gu.StrictMode,{children:a.jsx(c1,{})}));
