(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function R0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Fu={exports:{}},Do={},Du={exports:{}},Le={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gs=Symbol.for("react.element"),I0=Symbol.for("react.portal"),L0=Symbol.for("react.fragment"),A0=Symbol.for("react.strict_mode"),O0=Symbol.for("react.profiler"),F0=Symbol.for("react.provider"),D0=Symbol.for("react.context"),B0=Symbol.for("react.forward_ref"),W0=Symbol.for("react.suspense"),U0=Symbol.for("react.memo"),V0=Symbol.for("react.lazy"),qc=Symbol.iterator;function H0(e){return e===null||typeof e!="object"?null:(e=qc&&e[qc]||e["@@iterator"],typeof e=="function"?e:null)}var Bu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wu=Object.assign,Uu={};function xa(e,t,n){this.props=e,this.context=t,this.refs=Uu,this.updater=n||Bu}xa.prototype.isReactComponent={};xa.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xa.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Vu(){}Vu.prototype=xa.prototype;function Yl(e,t,n){this.props=e,this.context=t,this.refs=Uu,this.updater=n||Bu}var Gl=Yl.prototype=new Vu;Gl.constructor=Yl;Wu(Gl,xa.prototype);Gl.isPureReactComponent=!0;var Qc=Array.isArray,Hu=Object.prototype.hasOwnProperty,Xl={current:null},Yu={key:!0,ref:!0,__self:!0,__source:!0};function Gu(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Hu.call(t,a)&&!Yu.hasOwnProperty(a)&&(s[a]=t[a]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)s[a]===void 0&&(s[a]=c[a]);return{$$typeof:gs,type:e,key:o,ref:i,props:s,_owner:Xl.current}}function Y0(e,t){return{$$typeof:gs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Kl(e){return typeof e=="object"&&e!==null&&e.$$typeof===gs}function G0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Jc=/\/+/g;function ii(e,t){return typeof e=="object"&&e!==null&&e.key!=null?G0(""+e.key):t.toString(36)}function Ys(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case gs:case I0:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+ii(i,0):a,Qc(s)?(n="",e!=null&&(n=e.replace(Jc,"$&/")+"/"),Ys(s,t,n,"",function(d){return d})):s!=null&&(Kl(s)&&(s=Y0(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(Jc,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",Qc(e))for(var c=0;c<e.length;c++){o=e[c];var l=a+ii(o,c);i+=Ys(o,t,n,l,s)}else if(l=H0(e),typeof l=="function")for(e=l.call(e),c=0;!(o=e.next()).done;)o=o.value,l=a+ii(o,c++),i+=Ys(o,t,n,l,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function js(e,t,n){if(e==null)return e;var a=[],s=0;return Ys(e,a,"","",function(o){return t.call(n,o,s++)}),a}function X0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Dt={current:null},Gs={transition:null},K0={ReactCurrentDispatcher:Dt,ReactCurrentBatchConfig:Gs,ReactCurrentOwner:Xl};function Xu(){throw Error("act(...) is not supported in production builds of React.")}Le.Children={map:js,forEach:function(e,t,n){js(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return js(e,function(){t++}),t},toArray:function(e){return js(e,function(t){return t})||[]},only:function(e){if(!Kl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Le.Component=xa;Le.Fragment=L0;Le.Profiler=O0;Le.PureComponent=Yl;Le.StrictMode=A0;Le.Suspense=W0;Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K0;Le.act=Xu;Le.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Wu({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Xl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)Hu.call(t,l)&&!Yu.hasOwnProperty(l)&&(a[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}return{$$typeof:gs,type:e.type,key:s,ref:o,props:a,_owner:i}};Le.createContext=function(e){return e={$$typeof:D0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:F0,_context:e},e.Consumer=e};Le.createElement=Gu;Le.createFactory=function(e){var t=Gu.bind(null,e);return t.type=e,t};Le.createRef=function(){return{current:null}};Le.forwardRef=function(e){return{$$typeof:B0,render:e}};Le.isValidElement=Kl;Le.lazy=function(e){return{$$typeof:V0,_payload:{_status:-1,_result:e},_init:X0}};Le.memo=function(e,t){return{$$typeof:U0,type:e,compare:t===void 0?null:t}};Le.startTransition=function(e){var t=Gs.transition;Gs.transition={};try{e()}finally{Gs.transition=t}};Le.unstable_act=Xu;Le.useCallback=function(e,t){return Dt.current.useCallback(e,t)};Le.useContext=function(e){return Dt.current.useContext(e)};Le.useDebugValue=function(){};Le.useDeferredValue=function(e){return Dt.current.useDeferredValue(e)};Le.useEffect=function(e,t){return Dt.current.useEffect(e,t)};Le.useId=function(){return Dt.current.useId()};Le.useImperativeHandle=function(e,t,n){return Dt.current.useImperativeHandle(e,t,n)};Le.useInsertionEffect=function(e,t){return Dt.current.useInsertionEffect(e,t)};Le.useLayoutEffect=function(e,t){return Dt.current.useLayoutEffect(e,t)};Le.useMemo=function(e,t){return Dt.current.useMemo(e,t)};Le.useReducer=function(e,t,n){return Dt.current.useReducer(e,t,n)};Le.useRef=function(e){return Dt.current.useRef(e)};Le.useState=function(e){return Dt.current.useState(e)};Le.useSyncExternalStore=function(e,t,n){return Dt.current.useSyncExternalStore(e,t,n)};Le.useTransition=function(){return Dt.current.useTransition()};Le.version="18.3.1";Du.exports=Le;var u=Du.exports;const Bo=R0(u);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q0=u,Q0=Symbol.for("react.element"),J0=Symbol.for("react.fragment"),Z0=Object.prototype.hasOwnProperty,ef=q0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,tf={key:!0,ref:!0,__self:!0,__source:!0};function Ku(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)Z0.call(t,a)&&!tf.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:Q0,type:e,key:o,ref:i,props:s,_owner:ef.current}}Do.Fragment=J0;Do.jsx=Ku;Do.jsxs=Ku;Fu.exports=Do;var r=Fu.exports,Hi={},qu={exports:{}},rr={},Qu={exports:{}},Ju={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(D,W){var G=D.length;D.push(W);e:for(;0<G;){var ne=G-1>>>1,k=D[ne];if(0<s(k,W))D[ne]=W,D[G]=k,G=ne;else break e}}function n(D){return D.length===0?null:D[0]}function a(D){if(D.length===0)return null;var W=D[0],G=D.pop();if(G!==W){D[0]=G;e:for(var ne=0,k=D.length,je=k>>>1;ne<je;){var Y=2*(ne+1)-1,Me=D[Y],ae=Y+1,xe=D[ae];if(0>s(Me,G))ae<k&&0>s(xe,Me)?(D[ne]=xe,D[ae]=G,ne=ae):(D[ne]=Me,D[Y]=G,ne=Y);else if(ae<k&&0>s(xe,G))D[ne]=xe,D[ae]=G,ne=ae;else break e}}return W}function s(D,W){var G=D.sortIndex-W.sortIndex;return G!==0?G:D.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var l=[],d=[],m=1,f=null,p=3,v=!1,b=!1,w=!1,C=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(D){for(var W=n(d);W!==null;){if(W.callback===null)a(d);else if(W.startTime<=D)a(d),W.sortIndex=W.expirationTime,t(l,W);else break;W=n(d)}}function N(D){if(w=!1,h(D),!b)if(n(l)!==null)b=!0,q(S);else{var W=n(d);W!==null&&T(N,W.startTime-D)}}function S(D,W){b=!1,w&&(w=!1,x(z),z=-1),v=!0;var G=p;try{for(h(W),f=n(l);f!==null&&(!(f.expirationTime>W)||D&&!A());){var ne=f.callback;if(typeof ne=="function"){f.callback=null,p=f.priorityLevel;var k=ne(f.expirationTime<=W);W=e.unstable_now(),typeof k=="function"?f.callback=k:f===n(l)&&a(l),h(W)}else a(l);f=n(l)}if(f!==null)var je=!0;else{var Y=n(d);Y!==null&&T(N,Y.startTime-W),je=!1}return je}finally{f=null,p=G,v=!1}}var $=!1,E=null,z=-1,U=5,V=-1;function A(){return!(e.unstable_now()-V<U)}function F(){if(E!==null){var D=e.unstable_now();V=D;var W=!0;try{W=E(!0,D)}finally{W?ee():($=!1,E=null)}}else $=!1}var ee;if(typeof g=="function")ee=function(){g(F)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,P=B.port2;B.port1.onmessage=F,ee=function(){P.postMessage(null)}}else ee=function(){C(F,0)};function q(D){E=D,$||($=!0,ee())}function T(D,W){z=C(function(){D(e.unstable_now())},W)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(D){D.callback=null},e.unstable_continueExecution=function(){b||v||(b=!0,q(S))},e.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<D?Math.floor(1e3/D):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(D){switch(p){case 1:case 2:case 3:var W=3;break;default:W=p}var G=p;p=W;try{return D()}finally{p=G}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(D,W){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var G=p;p=D;try{return W()}finally{p=G}},e.unstable_scheduleCallback=function(D,W,G){var ne=e.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ne+G:ne):G=ne,D){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=G+k,D={id:m++,callback:W,priorityLevel:D,startTime:G,expirationTime:k,sortIndex:-1},G>ne?(D.sortIndex=G,t(d,D),n(l)===null&&D===n(d)&&(w?(x(z),z=-1):w=!0,T(N,G-ne))):(D.sortIndex=k,t(l,D),b||v||(b=!0,q(S))),D},e.unstable_shouldYield=A,e.unstable_wrapCallback=function(D){var W=p;return function(){var G=p;p=W;try{return D.apply(this,arguments)}finally{p=G}}}})(Ju);Qu.exports=Ju;var rf=Qu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nf=u,tr=rf;function re(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zu=new Set,Xa={};function Fn(e,t){la(e,t),la(e+"Capture",t)}function la(e,t){for(Xa[e]=t,e=0;e<t.length;e++)Zu.add(t[e])}var Br=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Yi=Object.prototype.hasOwnProperty,af=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Zc={},ed={};function sf(e){return Yi.call(ed,e)?!0:Yi.call(Zc,e)?!1:af.test(e)?ed[e]=!0:(Zc[e]=!0,!1)}function of(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function lf(e,t,n,a){if(t===null||typeof t>"u"||of(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Bt(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var Et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Et[e]=new Bt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Et[t]=new Bt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Et[e]=new Bt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Et[e]=new Bt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Et[e]=new Bt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Et[e]=new Bt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Et[e]=new Bt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Et[e]=new Bt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Et[e]=new Bt(e,5,!1,e.toLowerCase(),null,!1,!1)});var ql=/[\-:]([a-z])/g;function Ql(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ql,Ql);Et[t]=new Bt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ql,Ql);Et[t]=new Bt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ql,Ql);Et[t]=new Bt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Et[e]=new Bt(e,1,!1,e.toLowerCase(),null,!1,!1)});Et.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Et[e]=new Bt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Jl(e,t,n,a){var s=Et.hasOwnProperty(t)?Et[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(lf(t,n,s,a)&&(n=null),a||s===null?sf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var Yr=nf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ns=Symbol.for("react.element"),Un=Symbol.for("react.portal"),Vn=Symbol.for("react.fragment"),Zl=Symbol.for("react.strict_mode"),Gi=Symbol.for("react.profiler"),ep=Symbol.for("react.provider"),tp=Symbol.for("react.context"),ec=Symbol.for("react.forward_ref"),Xi=Symbol.for("react.suspense"),Ki=Symbol.for("react.suspense_list"),tc=Symbol.for("react.memo"),Qr=Symbol.for("react.lazy"),rp=Symbol.for("react.offscreen"),td=Symbol.iterator;function ya(e){return e===null||typeof e!="object"?null:(e=td&&e[td]||e["@@iterator"],typeof e=="function"?e:null)}var dt=Object.assign,li;function $a(e){if(li===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);li=t&&t[1]||""}return`
`+li+e}var ci=!1;function di(e,t){if(!e||ci)return"";ci=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,c=o.length-1;1<=i&&0<=c&&s[i]!==o[c];)c--;for(;1<=i&&0<=c;i--,c--)if(s[i]!==o[c]){if(i!==1||c!==1)do if(i--,c--,0>c||s[i]!==o[c]){var l=`
`+s[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=c);break}}}finally{ci=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?$a(e):""}function cf(e){switch(e.tag){case 5:return $a(e.type);case 16:return $a("Lazy");case 13:return $a("Suspense");case 19:return $a("SuspenseList");case 0:case 2:case 15:return e=di(e.type,!1),e;case 11:return e=di(e.type.render,!1),e;case 1:return e=di(e.type,!0),e;default:return""}}function qi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vn:return"Fragment";case Un:return"Portal";case Gi:return"Profiler";case Zl:return"StrictMode";case Xi:return"Suspense";case Ki:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case tp:return(e.displayName||"Context")+".Consumer";case ep:return(e._context.displayName||"Context")+".Provider";case ec:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case tc:return t=e.displayName||null,t!==null?t:qi(e.type)||"Memo";case Qr:t=e._payload,e=e._init;try{return qi(e(t))}catch{}}return null}function df(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return qi(t);case 8:return t===Zl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function np(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function uf(e){var t=np(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _s(e){e._valueTracker||(e._valueTracker=uf(e))}function ap(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=np(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function io(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Qi(e,t){var n=t.checked;return dt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function rd(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=mn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function sp(e,t){t=t.checked,t!=null&&Jl(e,"checked",t,!1)}function Ji(e,t){sp(e,t);var n=mn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Zi(e,t.type,n):t.hasOwnProperty("defaultValue")&&Zi(e,t.type,mn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function nd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Zi(e,t,n){(t!=="number"||io(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ta=Array.isArray;function ta(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+mn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function el(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(re(91));return dt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ad(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(re(92));if(Ta(n)){if(1<n.length)throw Error(re(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:mn(n)}}function op(e,t){var n=mn(t.value),a=mn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function sd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ip(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function tl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ip(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ss,lp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ss=Ss||document.createElement("div"),Ss.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ss.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ka(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Fa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pf=["Webkit","ms","Moz","O"];Object.keys(Fa).forEach(function(e){pf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fa[t]=Fa[e]})});function cp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Fa.hasOwnProperty(e)&&Fa[e]?(""+t).trim():t+"px"}function dp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=cp(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var mf=dt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function rl(e,t){if(t){if(mf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(re(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(re(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(re(61))}if(t.style!=null&&typeof t.style!="object")throw Error(re(62))}}function nl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var al=null;function rc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sl=null,ra=null,na=null;function od(e){if(e=vs(e)){if(typeof sl!="function")throw Error(re(280));var t=e.stateNode;t&&(t=Yo(t),sl(e.stateNode,e.type,t))}}function up(e){ra?na?na.push(e):na=[e]:ra=e}function pp(){if(ra){var e=ra,t=na;if(na=ra=null,od(e),t)for(e=0;e<t.length;e++)od(t[e])}}function mp(e,t){return e(t)}function fp(){}var ui=!1;function gp(e,t,n){if(ui)return e(t,n);ui=!0;try{return mp(e,t,n)}finally{ui=!1,(ra!==null||na!==null)&&(fp(),pp())}}function qa(e,t){var n=e.stateNode;if(n===null)return null;var a=Yo(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(re(231,t,typeof n));return n}var ol=!1;if(Br)try{var wa={};Object.defineProperty(wa,"passive",{get:function(){ol=!0}}),window.addEventListener("test",wa,wa),window.removeEventListener("test",wa,wa)}catch{ol=!1}function ff(e,t,n,a,s,o,i,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var Da=!1,lo=null,co=!1,il=null,gf={onError:function(e){Da=!0,lo=e}};function hf(e,t,n,a,s,o,i,c,l){Da=!1,lo=null,ff.apply(gf,arguments)}function xf(e,t,n,a,s,o,i,c,l){if(hf.apply(this,arguments),Da){if(Da){var d=lo;Da=!1,lo=null}else throw Error(re(198));co||(co=!0,il=d)}}function Dn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function hp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function id(e){if(Dn(e)!==e)throw Error(re(188))}function vf(e){var t=e.alternate;if(!t){if(t=Dn(e),t===null)throw Error(re(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return id(s),e;if(o===a)return id(s),t;o=o.sibling}throw Error(re(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,c=s.child;c;){if(c===n){i=!0,n=s,a=o;break}if(c===a){i=!0,a=s,n=o;break}c=c.sibling}if(!i){for(c=o.child;c;){if(c===n){i=!0,n=o,a=s;break}if(c===a){i=!0,a=o,n=s;break}c=c.sibling}if(!i)throw Error(re(189))}}if(n.alternate!==a)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?e:t}function xp(e){return e=vf(e),e!==null?vp(e):null}function vp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=vp(e);if(t!==null)return t;e=e.sibling}return null}var bp=tr.unstable_scheduleCallback,ld=tr.unstable_cancelCallback,bf=tr.unstable_shouldYield,yf=tr.unstable_requestPaint,ht=tr.unstable_now,wf=tr.unstable_getCurrentPriorityLevel,nc=tr.unstable_ImmediatePriority,yp=tr.unstable_UserBlockingPriority,uo=tr.unstable_NormalPriority,kf=tr.unstable_LowPriority,wp=tr.unstable_IdlePriority,Wo=null,Mr=null;function jf(e){if(Mr&&typeof Mr.onCommitFiberRoot=="function")try{Mr.onCommitFiberRoot(Wo,e,void 0,(e.current.flags&128)===128)}catch{}}var br=Math.clz32?Math.clz32:Sf,Nf=Math.log,_f=Math.LN2;function Sf(e){return e>>>=0,e===0?32:31-(Nf(e)/_f|0)|0}var Cs=64,Ms=4194304;function Pa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function po(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var c=i&~s;c!==0?a=Pa(c):(o&=i,o!==0&&(a=Pa(o)))}else i=n&~s,i!==0?a=Pa(i):o!==0&&(a=Pa(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-br(t),s=1<<n,a|=e[n],t&=~s;return a}function Cf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-br(o),c=1<<i,l=s[i];l===-1?(!(c&n)||c&a)&&(s[i]=Cf(c,t)):l<=t&&(e.expiredLanes|=c),o&=~c}}function ll(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function kp(){var e=Cs;return Cs<<=1,!(Cs&4194240)&&(Cs=64),e}function pi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hs(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-br(t),e[t]=n}function zf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-br(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function ac(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-br(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var Ge=0;function jp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Np,sc,_p,Sp,Cp,cl=!1,zs=[],an=null,sn=null,on=null,Qa=new Map,Ja=new Map,en=[],Ef="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cd(e,t){switch(e){case"focusin":case"focusout":an=null;break;case"dragenter":case"dragleave":sn=null;break;case"mouseover":case"mouseout":on=null;break;case"pointerover":case"pointerout":Qa.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ja.delete(t.pointerId)}}function ka(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=vs(t),t!==null&&sc(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function $f(e,t,n,a,s){switch(t){case"focusin":return an=ka(an,e,t,n,a,s),!0;case"dragenter":return sn=ka(sn,e,t,n,a,s),!0;case"mouseover":return on=ka(on,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return Qa.set(o,ka(Qa.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,Ja.set(o,ka(Ja.get(o)||null,e,t,n,a,s)),!0}return!1}function Mp(e){var t=Sn(e.target);if(t!==null){var n=Dn(t);if(n!==null){if(t=n.tag,t===13){if(t=hp(n),t!==null){e.blockedOn=t,Cp(e.priority,function(){_p(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Xs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);al=a,n.target.dispatchEvent(a),al=null}else return t=vs(n),t!==null&&sc(t),e.blockedOn=n,!1;t.shift()}return!0}function dd(e,t,n){Xs(e)&&n.delete(t)}function Tf(){cl=!1,an!==null&&Xs(an)&&(an=null),sn!==null&&Xs(sn)&&(sn=null),on!==null&&Xs(on)&&(on=null),Qa.forEach(dd),Ja.forEach(dd)}function ja(e,t){e.blockedOn===t&&(e.blockedOn=null,cl||(cl=!0,tr.unstable_scheduleCallback(tr.unstable_NormalPriority,Tf)))}function Za(e){function t(s){return ja(s,e)}if(0<zs.length){ja(zs[0],e);for(var n=1;n<zs.length;n++){var a=zs[n];a.blockedOn===e&&(a.blockedOn=null)}}for(an!==null&&ja(an,e),sn!==null&&ja(sn,e),on!==null&&ja(on,e),Qa.forEach(t),Ja.forEach(t),n=0;n<en.length;n++)a=en[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<en.length&&(n=en[0],n.blockedOn===null);)Mp(n),n.blockedOn===null&&en.shift()}var aa=Yr.ReactCurrentBatchConfig,mo=!0;function Pf(e,t,n,a){var s=Ge,o=aa.transition;aa.transition=null;try{Ge=1,oc(e,t,n,a)}finally{Ge=s,aa.transition=o}}function Rf(e,t,n,a){var s=Ge,o=aa.transition;aa.transition=null;try{Ge=4,oc(e,t,n,a)}finally{Ge=s,aa.transition=o}}function oc(e,t,n,a){if(mo){var s=dl(e,t,n,a);if(s===null)ki(e,t,a,fo,n),cd(e,a);else if($f(s,e,t,n,a))a.stopPropagation();else if(cd(e,a),t&4&&-1<Ef.indexOf(e)){for(;s!==null;){var o=vs(s);if(o!==null&&Np(o),o=dl(e,t,n,a),o===null&&ki(e,t,a,fo,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else ki(e,t,a,null,n)}}var fo=null;function dl(e,t,n,a){if(fo=null,e=rc(a),e=Sn(e),e!==null)if(t=Dn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=hp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return fo=e,null}function zp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wf()){case nc:return 1;case yp:return 4;case uo:case kf:return 16;case wp:return 536870912;default:return 16}default:return 16}}var rn=null,ic=null,Ks=null;function Ep(){if(Ks)return Ks;var e,t=ic,n=t.length,a,s="value"in rn?rn.value:rn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return Ks=s.slice(e,1<a?1-a:void 0)}function qs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Es(){return!0}function ud(){return!1}function nr(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Es:ud,this.isPropagationStopped=ud,this}return dt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Es)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Es)},persist:function(){},isPersistent:Es}),t}var va={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lc=nr(va),xs=dt({},va,{view:0,detail:0}),If=nr(xs),mi,fi,Na,Uo=dt({},xs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Na&&(Na&&e.type==="mousemove"?(mi=e.screenX-Na.screenX,fi=e.screenY-Na.screenY):fi=mi=0,Na=e),mi)},movementY:function(e){return"movementY"in e?e.movementY:fi}}),pd=nr(Uo),Lf=dt({},Uo,{dataTransfer:0}),Af=nr(Lf),Of=dt({},xs,{relatedTarget:0}),gi=nr(Of),Ff=dt({},va,{animationName:0,elapsedTime:0,pseudoElement:0}),Df=nr(Ff),Bf=dt({},va,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wf=nr(Bf),Uf=dt({},va,{data:0}),md=nr(Uf),Vf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Yf[e])?!!t[e]:!1}function cc(){return Gf}var Xf=dt({},xs,{key:function(e){if(e.key){var t=Vf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cc,charCode:function(e){return e.type==="keypress"?qs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Kf=nr(Xf),qf=dt({},Uo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fd=nr(qf),Qf=dt({},xs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cc}),Jf=nr(Qf),Zf=dt({},va,{propertyName:0,elapsedTime:0,pseudoElement:0}),eg=nr(Zf),tg=dt({},Uo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),rg=nr(tg),ng=[9,13,27,32],dc=Br&&"CompositionEvent"in window,Ba=null;Br&&"documentMode"in document&&(Ba=document.documentMode);var ag=Br&&"TextEvent"in window&&!Ba,$p=Br&&(!dc||Ba&&8<Ba&&11>=Ba),gd=" ",hd=!1;function Tp(e,t){switch(e){case"keyup":return ng.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hn=!1;function sg(e,t){switch(e){case"compositionend":return Pp(t);case"keypress":return t.which!==32?null:(hd=!0,gd);case"textInput":return e=t.data,e===gd&&hd?null:e;default:return null}}function og(e,t){if(Hn)return e==="compositionend"||!dc&&Tp(e,t)?(e=Ep(),Ks=ic=rn=null,Hn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $p&&t.locale!=="ko"?null:t.data;default:return null}}var ig={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ig[e.type]:t==="textarea"}function Rp(e,t,n,a){up(a),t=go(t,"onChange"),0<t.length&&(n=new lc("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Wa=null,es=null;function lg(e){Hp(e,0)}function Vo(e){var t=Xn(e);if(ap(t))return e}function cg(e,t){if(e==="change")return t}var Ip=!1;if(Br){var hi;if(Br){var xi="oninput"in document;if(!xi){var vd=document.createElement("div");vd.setAttribute("oninput","return;"),xi=typeof vd.oninput=="function"}hi=xi}else hi=!1;Ip=hi&&(!document.documentMode||9<document.documentMode)}function bd(){Wa&&(Wa.detachEvent("onpropertychange",Lp),es=Wa=null)}function Lp(e){if(e.propertyName==="value"&&Vo(es)){var t=[];Rp(t,es,e,rc(e)),gp(lg,t)}}function dg(e,t,n){e==="focusin"?(bd(),Wa=t,es=n,Wa.attachEvent("onpropertychange",Lp)):e==="focusout"&&bd()}function ug(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vo(es)}function pg(e,t){if(e==="click")return Vo(t)}function mg(e,t){if(e==="input"||e==="change")return Vo(t)}function fg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var wr=typeof Object.is=="function"?Object.is:fg;function ts(e,t){if(wr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!Yi.call(t,s)||!wr(e[s],t[s]))return!1}return!0}function yd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wd(e,t){var n=yd(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=yd(n)}}function Ap(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ap(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Op(){for(var e=window,t=io();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=io(e.document)}return t}function uc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function gg(e){var t=Op(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ap(n.ownerDocument.documentElement,n)){if(a!==null&&uc(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=wd(n,o);var i=wd(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hg=Br&&"documentMode"in document&&11>=document.documentMode,Yn=null,ul=null,Ua=null,pl=!1;function kd(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;pl||Yn==null||Yn!==io(a)||(a=Yn,"selectionStart"in a&&uc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ua&&ts(Ua,a)||(Ua=a,a=go(ul,"onSelect"),0<a.length&&(t=new lc("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Yn)))}function $s(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Gn={animationend:$s("Animation","AnimationEnd"),animationiteration:$s("Animation","AnimationIteration"),animationstart:$s("Animation","AnimationStart"),transitionend:$s("Transition","TransitionEnd")},vi={},Fp={};Br&&(Fp=document.createElement("div").style,"AnimationEvent"in window||(delete Gn.animationend.animation,delete Gn.animationiteration.animation,delete Gn.animationstart.animation),"TransitionEvent"in window||delete Gn.transitionend.transition);function Ho(e){if(vi[e])return vi[e];if(!Gn[e])return e;var t=Gn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fp)return vi[e]=t[n];return e}var Dp=Ho("animationend"),Bp=Ho("animationiteration"),Wp=Ho("animationstart"),Up=Ho("transitionend"),Vp=new Map,jd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gn(e,t){Vp.set(e,t),Fn(t,[e])}for(var bi=0;bi<jd.length;bi++){var yi=jd[bi],xg=yi.toLowerCase(),vg=yi[0].toUpperCase()+yi.slice(1);gn(xg,"on"+vg)}gn(Dp,"onAnimationEnd");gn(Bp,"onAnimationIteration");gn(Wp,"onAnimationStart");gn("dblclick","onDoubleClick");gn("focusin","onFocus");gn("focusout","onBlur");gn(Up,"onTransitionEnd");la("onMouseEnter",["mouseout","mouseover"]);la("onMouseLeave",["mouseout","mouseover"]);la("onPointerEnter",["pointerout","pointerover"]);la("onPointerLeave",["pointerout","pointerover"]);Fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ra="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ra));function Nd(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,xf(a,t,void 0,e),e.currentTarget=null}function Hp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var c=a[i],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==o&&s.isPropagationStopped())break e;Nd(s,c,d),o=l}else for(i=0;i<a.length;i++){if(c=a[i],l=c.instance,d=c.currentTarget,c=c.listener,l!==o&&s.isPropagationStopped())break e;Nd(s,c,d),o=l}}}if(co)throw e=il,co=!1,il=null,e}function et(e,t){var n=t[xl];n===void 0&&(n=t[xl]=new Set);var a=e+"__bubble";n.has(a)||(Yp(t,e,2,!1),n.add(a))}function wi(e,t,n){var a=0;t&&(a|=4),Yp(n,e,a,t)}var Ts="_reactListening"+Math.random().toString(36).slice(2);function rs(e){if(!e[Ts]){e[Ts]=!0,Zu.forEach(function(n){n!=="selectionchange"&&(bg.has(n)||wi(n,!1,e),wi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ts]||(t[Ts]=!0,wi("selectionchange",!1,t))}}function Yp(e,t,n,a){switch(zp(t)){case 1:var s=Pf;break;case 4:s=Rf;break;default:s=oc}n=s.bind(null,t,n,e),s=void 0,!ol||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function ki(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var c=a.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;i=i.return}for(;c!==null;){if(i=Sn(c),i===null)return;if(l=i.tag,l===5||l===6){a=o=i;continue e}c=c.parentNode}}a=a.return}gp(function(){var d=o,m=rc(n),f=[];e:{var p=Vp.get(e);if(p!==void 0){var v=lc,b=e;switch(e){case"keypress":if(qs(n)===0)break e;case"keydown":case"keyup":v=Kf;break;case"focusin":b="focus",v=gi;break;case"focusout":b="blur",v=gi;break;case"beforeblur":case"afterblur":v=gi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=pd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Af;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Jf;break;case Dp:case Bp:case Wp:v=Df;break;case Up:v=eg;break;case"scroll":v=If;break;case"wheel":v=rg;break;case"copy":case"cut":case"paste":v=Wf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=fd}var w=(t&4)!==0,C=!w&&e==="scroll",x=w?p!==null?p+"Capture":null:p;w=[];for(var g=d,h;g!==null;){h=g;var N=h.stateNode;if(h.tag===5&&N!==null&&(h=N,x!==null&&(N=qa(g,x),N!=null&&w.push(ns(g,N,h)))),C)break;g=g.return}0<w.length&&(p=new v(p,b,null,n,m),f.push({event:p,listeners:w}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&n!==al&&(b=n.relatedTarget||n.fromElement)&&(Sn(b)||b[Wr]))break e;if((v||p)&&(p=m.window===m?m:(p=m.ownerDocument)?p.defaultView||p.parentWindow:window,v?(b=n.relatedTarget||n.toElement,v=d,b=b?Sn(b):null,b!==null&&(C=Dn(b),b!==C||b.tag!==5&&b.tag!==6)&&(b=null)):(v=null,b=d),v!==b)){if(w=pd,N="onMouseLeave",x="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(w=fd,N="onPointerLeave",x="onPointerEnter",g="pointer"),C=v==null?p:Xn(v),h=b==null?p:Xn(b),p=new w(N,g+"leave",v,n,m),p.target=C,p.relatedTarget=h,N=null,Sn(m)===d&&(w=new w(x,g+"enter",b,n,m),w.target=h,w.relatedTarget=C,N=w),C=N,v&&b)t:{for(w=v,x=b,g=0,h=w;h;h=Bn(h))g++;for(h=0,N=x;N;N=Bn(N))h++;for(;0<g-h;)w=Bn(w),g--;for(;0<h-g;)x=Bn(x),h--;for(;g--;){if(w===x||x!==null&&w===x.alternate)break t;w=Bn(w),x=Bn(x)}w=null}else w=null;v!==null&&_d(f,p,v,w,!1),b!==null&&C!==null&&_d(f,C,b,w,!0)}}e:{if(p=d?Xn(d):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var S=cg;else if(xd(p))if(Ip)S=mg;else{S=ug;var $=dg}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(S=pg);if(S&&(S=S(e,d))){Rp(f,S,n,m);break e}$&&$(e,p,d),e==="focusout"&&($=p._wrapperState)&&$.controlled&&p.type==="number"&&Zi(p,"number",p.value)}switch($=d?Xn(d):window,e){case"focusin":(xd($)||$.contentEditable==="true")&&(Yn=$,ul=d,Ua=null);break;case"focusout":Ua=ul=Yn=null;break;case"mousedown":pl=!0;break;case"contextmenu":case"mouseup":case"dragend":pl=!1,kd(f,n,m);break;case"selectionchange":if(hg)break;case"keydown":case"keyup":kd(f,n,m)}var E;if(dc)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Hn?Tp(e,n)&&(z="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&($p&&n.locale!=="ko"&&(Hn||z!=="onCompositionStart"?z==="onCompositionEnd"&&Hn&&(E=Ep()):(rn=m,ic="value"in rn?rn.value:rn.textContent,Hn=!0)),$=go(d,z),0<$.length&&(z=new md(z,e,null,n,m),f.push({event:z,listeners:$}),E?z.data=E:(E=Pp(n),E!==null&&(z.data=E)))),(E=ag?sg(e,n):og(e,n))&&(d=go(d,"onBeforeInput"),0<d.length&&(m=new md("onBeforeInput","beforeinput",null,n,m),f.push({event:m,listeners:d}),m.data=E))}Hp(f,t)})}function ns(e,t,n){return{instance:e,listener:t,currentTarget:n}}function go(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=qa(e,n),o!=null&&a.unshift(ns(e,o,s)),o=qa(e,t),o!=null&&a.push(ns(e,o,s))),e=e.return}return a}function Bn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function _d(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var c=n,l=c.alternate,d=c.stateNode;if(l!==null&&l===a)break;c.tag===5&&d!==null&&(c=d,s?(l=qa(n,o),l!=null&&i.unshift(ns(n,l,c))):s||(l=qa(n,o),l!=null&&i.push(ns(n,l,c)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var yg=/\r\n?/g,wg=/\u0000|\uFFFD/g;function Sd(e){return(typeof e=="string"?e:""+e).replace(yg,`
`).replace(wg,"")}function Ps(e,t,n){if(t=Sd(t),Sd(e)!==t&&n)throw Error(re(425))}function ho(){}var ml=null,fl=null;function gl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hl=typeof setTimeout=="function"?setTimeout:void 0,kg=typeof clearTimeout=="function"?clearTimeout:void 0,Cd=typeof Promise=="function"?Promise:void 0,jg=typeof queueMicrotask=="function"?queueMicrotask:typeof Cd<"u"?function(e){return Cd.resolve(null).then(e).catch(Ng)}:hl;function Ng(e){setTimeout(function(){throw e})}function ji(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),Za(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);Za(t)}function ln(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Md(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ba=Math.random().toString(36).slice(2),Cr="__reactFiber$"+ba,as="__reactProps$"+ba,Wr="__reactContainer$"+ba,xl="__reactEvents$"+ba,_g="__reactListeners$"+ba,Sg="__reactHandles$"+ba;function Sn(e){var t=e[Cr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Wr]||n[Cr]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Md(e);e!==null;){if(n=e[Cr])return n;e=Md(e)}return t}e=n,n=e.parentNode}return null}function vs(e){return e=e[Cr]||e[Wr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Xn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(re(33))}function Yo(e){return e[as]||null}var vl=[],Kn=-1;function hn(e){return{current:e}}function tt(e){0>Kn||(e.current=vl[Kn],vl[Kn]=null,Kn--)}function Je(e,t){Kn++,vl[Kn]=e.current,e.current=t}var fn={},At=hn(fn),Gt=hn(!1),Pn=fn;function ca(e,t){var n=e.type.contextTypes;if(!n)return fn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Xt(e){return e=e.childContextTypes,e!=null}function xo(){tt(Gt),tt(At)}function zd(e,t,n){if(At.current!==fn)throw Error(re(168));Je(At,t),Je(Gt,n)}function Gp(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(re(108,df(e)||"Unknown",s));return dt({},n,a)}function vo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||fn,Pn=At.current,Je(At,e),Je(Gt,Gt.current),!0}function Ed(e,t,n){var a=e.stateNode;if(!a)throw Error(re(169));n?(e=Gp(e,t,Pn),a.__reactInternalMemoizedMergedChildContext=e,tt(Gt),tt(At),Je(At,e)):tt(Gt),Je(Gt,n)}var Ar=null,Go=!1,Ni=!1;function Xp(e){Ar===null?Ar=[e]:Ar.push(e)}function Cg(e){Go=!0,Xp(e)}function xn(){if(!Ni&&Ar!==null){Ni=!0;var e=0,t=Ge;try{var n=Ar;for(Ge=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Ar=null,Go=!1}catch(s){throw Ar!==null&&(Ar=Ar.slice(e+1)),bp(nc,xn),s}finally{Ge=t,Ni=!1}}return null}var qn=[],Qn=0,bo=null,yo=0,or=[],ir=0,Rn=null,Or=1,Fr="";function Nn(e,t){qn[Qn++]=yo,qn[Qn++]=bo,bo=e,yo=t}function Kp(e,t,n){or[ir++]=Or,or[ir++]=Fr,or[ir++]=Rn,Rn=e;var a=Or;e=Fr;var s=32-br(a)-1;a&=~(1<<s),n+=1;var o=32-br(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,Or=1<<32-br(t)+s|n<<s|a,Fr=o+e}else Or=1<<o|n<<s|a,Fr=e}function pc(e){e.return!==null&&(Nn(e,1),Kp(e,1,0))}function mc(e){for(;e===bo;)bo=qn[--Qn],qn[Qn]=null,yo=qn[--Qn],qn[Qn]=null;for(;e===Rn;)Rn=or[--ir],or[ir]=null,Fr=or[--ir],or[ir]=null,Or=or[--ir],or[ir]=null}var er=null,Zt=null,at=!1,xr=null;function qp(e,t){var n=lr(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function $d(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,er=e,Zt=ln(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,er=e,Zt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Rn!==null?{id:Or,overflow:Fr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=lr(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,er=e,Zt=null,!0):!1;default:return!1}}function bl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function yl(e){if(at){var t=Zt;if(t){var n=t;if(!$d(e,t)){if(bl(e))throw Error(re(418));t=ln(n.nextSibling);var a=er;t&&$d(e,t)?qp(a,n):(e.flags=e.flags&-4097|2,at=!1,er=e)}}else{if(bl(e))throw Error(re(418));e.flags=e.flags&-4097|2,at=!1,er=e}}}function Td(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;er=e}function Rs(e){if(e!==er)return!1;if(!at)return Td(e),at=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!gl(e.type,e.memoizedProps)),t&&(t=Zt)){if(bl(e))throw Qp(),Error(re(418));for(;t;)qp(e,t),t=ln(t.nextSibling)}if(Td(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(re(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Zt=ln(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Zt=null}}else Zt=er?ln(e.stateNode.nextSibling):null;return!0}function Qp(){for(var e=Zt;e;)e=ln(e.nextSibling)}function da(){Zt=er=null,at=!1}function fc(e){xr===null?xr=[e]:xr.push(e)}var Mg=Yr.ReactCurrentBatchConfig;function _a(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var a=n.stateNode}if(!a)throw Error(re(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var c=s.refs;i===null?delete c[o]:c[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,e))}return e}function Is(e,t){throw e=Object.prototype.toString.call(t),Error(re(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Pd(e){var t=e._init;return t(e._payload)}function Jp(e){function t(x,g){if(e){var h=x.deletions;h===null?(x.deletions=[g],x.flags|=16):h.push(g)}}function n(x,g){if(!e)return null;for(;g!==null;)t(x,g),g=g.sibling;return null}function a(x,g){for(x=new Map;g!==null;)g.key!==null?x.set(g.key,g):x.set(g.index,g),g=g.sibling;return x}function s(x,g){return x=pn(x,g),x.index=0,x.sibling=null,x}function o(x,g,h){return x.index=h,e?(h=x.alternate,h!==null?(h=h.index,h<g?(x.flags|=2,g):h):(x.flags|=2,g)):(x.flags|=1048576,g)}function i(x){return e&&x.alternate===null&&(x.flags|=2),x}function c(x,g,h,N){return g===null||g.tag!==6?(g=$i(h,x.mode,N),g.return=x,g):(g=s(g,h),g.return=x,g)}function l(x,g,h,N){var S=h.type;return S===Vn?m(x,g,h.props.children,N,h.key):g!==null&&(g.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Qr&&Pd(S)===g.type)?(N=s(g,h.props),N.ref=_a(x,g,h),N.return=x,N):(N=no(h.type,h.key,h.props,null,x.mode,N),N.ref=_a(x,g,h),N.return=x,N)}function d(x,g,h,N){return g===null||g.tag!==4||g.stateNode.containerInfo!==h.containerInfo||g.stateNode.implementation!==h.implementation?(g=Ti(h,x.mode,N),g.return=x,g):(g=s(g,h.children||[]),g.return=x,g)}function m(x,g,h,N,S){return g===null||g.tag!==7?(g=$n(h,x.mode,N,S),g.return=x,g):(g=s(g,h),g.return=x,g)}function f(x,g,h){if(typeof g=="string"&&g!==""||typeof g=="number")return g=$i(""+g,x.mode,h),g.return=x,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ns:return h=no(g.type,g.key,g.props,null,x.mode,h),h.ref=_a(x,null,g),h.return=x,h;case Un:return g=Ti(g,x.mode,h),g.return=x,g;case Qr:var N=g._init;return f(x,N(g._payload),h)}if(Ta(g)||ya(g))return g=$n(g,x.mode,h,null),g.return=x,g;Is(x,g)}return null}function p(x,g,h,N){var S=g!==null?g.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return S!==null?null:c(x,g,""+h,N);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Ns:return h.key===S?l(x,g,h,N):null;case Un:return h.key===S?d(x,g,h,N):null;case Qr:return S=h._init,p(x,g,S(h._payload),N)}if(Ta(h)||ya(h))return S!==null?null:m(x,g,h,N,null);Is(x,h)}return null}function v(x,g,h,N,S){if(typeof N=="string"&&N!==""||typeof N=="number")return x=x.get(h)||null,c(g,x,""+N,S);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Ns:return x=x.get(N.key===null?h:N.key)||null,l(g,x,N,S);case Un:return x=x.get(N.key===null?h:N.key)||null,d(g,x,N,S);case Qr:var $=N._init;return v(x,g,h,$(N._payload),S)}if(Ta(N)||ya(N))return x=x.get(h)||null,m(g,x,N,S,null);Is(g,N)}return null}function b(x,g,h,N){for(var S=null,$=null,E=g,z=g=0,U=null;E!==null&&z<h.length;z++){E.index>z?(U=E,E=null):U=E.sibling;var V=p(x,E,h[z],N);if(V===null){E===null&&(E=U);break}e&&E&&V.alternate===null&&t(x,E),g=o(V,g,z),$===null?S=V:$.sibling=V,$=V,E=U}if(z===h.length)return n(x,E),at&&Nn(x,z),S;if(E===null){for(;z<h.length;z++)E=f(x,h[z],N),E!==null&&(g=o(E,g,z),$===null?S=E:$.sibling=E,$=E);return at&&Nn(x,z),S}for(E=a(x,E);z<h.length;z++)U=v(E,x,z,h[z],N),U!==null&&(e&&U.alternate!==null&&E.delete(U.key===null?z:U.key),g=o(U,g,z),$===null?S=U:$.sibling=U,$=U);return e&&E.forEach(function(A){return t(x,A)}),at&&Nn(x,z),S}function w(x,g,h,N){var S=ya(h);if(typeof S!="function")throw Error(re(150));if(h=S.call(h),h==null)throw Error(re(151));for(var $=S=null,E=g,z=g=0,U=null,V=h.next();E!==null&&!V.done;z++,V=h.next()){E.index>z?(U=E,E=null):U=E.sibling;var A=p(x,E,V.value,N);if(A===null){E===null&&(E=U);break}e&&E&&A.alternate===null&&t(x,E),g=o(A,g,z),$===null?S=A:$.sibling=A,$=A,E=U}if(V.done)return n(x,E),at&&Nn(x,z),S;if(E===null){for(;!V.done;z++,V=h.next())V=f(x,V.value,N),V!==null&&(g=o(V,g,z),$===null?S=V:$.sibling=V,$=V);return at&&Nn(x,z),S}for(E=a(x,E);!V.done;z++,V=h.next())V=v(E,x,z,V.value,N),V!==null&&(e&&V.alternate!==null&&E.delete(V.key===null?z:V.key),g=o(V,g,z),$===null?S=V:$.sibling=V,$=V);return e&&E.forEach(function(F){return t(x,F)}),at&&Nn(x,z),S}function C(x,g,h,N){if(typeof h=="object"&&h!==null&&h.type===Vn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Ns:e:{for(var S=h.key,$=g;$!==null;){if($.key===S){if(S=h.type,S===Vn){if($.tag===7){n(x,$.sibling),g=s($,h.props.children),g.return=x,x=g;break e}}else if($.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Qr&&Pd(S)===$.type){n(x,$.sibling),g=s($,h.props),g.ref=_a(x,$,h),g.return=x,x=g;break e}n(x,$);break}else t(x,$);$=$.sibling}h.type===Vn?(g=$n(h.props.children,x.mode,N,h.key),g.return=x,x=g):(N=no(h.type,h.key,h.props,null,x.mode,N),N.ref=_a(x,g,h),N.return=x,x=N)}return i(x);case Un:e:{for($=h.key;g!==null;){if(g.key===$)if(g.tag===4&&g.stateNode.containerInfo===h.containerInfo&&g.stateNode.implementation===h.implementation){n(x,g.sibling),g=s(g,h.children||[]),g.return=x,x=g;break e}else{n(x,g);break}else t(x,g);g=g.sibling}g=Ti(h,x.mode,N),g.return=x,x=g}return i(x);case Qr:return $=h._init,C(x,g,$(h._payload),N)}if(Ta(h))return b(x,g,h,N);if(ya(h))return w(x,g,h,N);Is(x,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,g!==null&&g.tag===6?(n(x,g.sibling),g=s(g,h),g.return=x,x=g):(n(x,g),g=$i(h,x.mode,N),g.return=x,x=g),i(x)):n(x,g)}return C}var ua=Jp(!0),Zp=Jp(!1),wo=hn(null),ko=null,Jn=null,gc=null;function hc(){gc=Jn=ko=null}function xc(e){var t=wo.current;tt(wo),e._currentValue=t}function wl(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function sa(e,t){ko=e,gc=Jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ht=!0),e.firstContext=null)}function dr(e){var t=e._currentValue;if(gc!==e)if(e={context:e,memoizedValue:t,next:null},Jn===null){if(ko===null)throw Error(re(308));Jn=e,ko.dependencies={lanes:0,firstContext:e}}else Jn=Jn.next=e;return t}var Cn=null;function vc(e){Cn===null?Cn=[e]:Cn.push(e)}function em(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,vc(t)):(n.next=s.next,s.next=n),t.interleaved=n,Ur(e,a)}function Ur(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Jr=!1;function bc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Dr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function cn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,We&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Ur(e,n)}return s=a.interleaved,s===null?(t.next=t,vc(a)):(t.next=s.next,s.next=t),a.interleaved=t,Ur(e,n)}function Qs(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ac(e,n)}}function Rd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function jo(e,t,n,a){var s=e.updateQueue;Jr=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var l=c,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var m=e.alternate;m!==null&&(m=m.updateQueue,c=m.lastBaseUpdate,c!==i&&(c===null?m.firstBaseUpdate=d:c.next=d,m.lastBaseUpdate=l))}if(o!==null){var f=s.baseState;i=0,m=d=l=null,c=o;do{var p=c.lane,v=c.eventTime;if((a&p)===p){m!==null&&(m=m.next={eventTime:v,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var b=e,w=c;switch(p=t,v=n,w.tag){case 1:if(b=w.payload,typeof b=="function"){f=b.call(v,f,p);break e}f=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=w.payload,p=typeof b=="function"?b.call(v,f,p):b,p==null)break e;f=dt({},f,p);break e;case 2:Jr=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,p=s.effects,p===null?s.effects=[c]:p.push(c))}else v={eventTime:v,lane:p,tag:c.tag,payload:c.payload,callback:c.callback,next:null},m===null?(d=m=v,l=f):m=m.next=v,i|=p;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;p=c,c=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);if(m===null&&(l=f),s.baseState=l,s.firstBaseUpdate=d,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Ln|=i,e.lanes=i,e.memoizedState=f}}function Id(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(re(191,s));s.call(a)}}}var bs={},zr=hn(bs),ss=hn(bs),os=hn(bs);function Mn(e){if(e===bs)throw Error(re(174));return e}function yc(e,t){switch(Je(os,t),Je(ss,e),Je(zr,bs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:tl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=tl(t,e)}tt(zr),Je(zr,t)}function pa(){tt(zr),tt(ss),tt(os)}function rm(e){Mn(os.current);var t=Mn(zr.current),n=tl(t,e.type);t!==n&&(Je(ss,e),Je(zr,n))}function wc(e){ss.current===e&&(tt(zr),tt(ss))}var lt=hn(0);function No(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _i=[];function kc(){for(var e=0;e<_i.length;e++)_i[e]._workInProgressVersionPrimary=null;_i.length=0}var Js=Yr.ReactCurrentDispatcher,Si=Yr.ReactCurrentBatchConfig,In=0,ct=null,jt=null,_t=null,_o=!1,Va=!1,is=0,zg=0;function Rt(){throw Error(re(321))}function jc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!wr(e[n],t[n]))return!1;return!0}function Nc(e,t,n,a,s,o){if(In=o,ct=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Js.current=e===null||e.memoizedState===null?Pg:Rg,e=n(a,s),Va){o=0;do{if(Va=!1,is=0,25<=o)throw Error(re(301));o+=1,_t=jt=null,t.updateQueue=null,Js.current=Ig,e=n(a,s)}while(Va)}if(Js.current=So,t=jt!==null&&jt.next!==null,In=0,_t=jt=ct=null,_o=!1,t)throw Error(re(300));return e}function _c(){var e=is!==0;return is=0,e}function Sr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?ct.memoizedState=_t=e:_t=_t.next=e,_t}function ur(){if(jt===null){var e=ct.alternate;e=e!==null?e.memoizedState:null}else e=jt.next;var t=_t===null?ct.memoizedState:_t.next;if(t!==null)_t=t,jt=e;else{if(e===null)throw Error(re(310));jt=e,e={memoizedState:jt.memoizedState,baseState:jt.baseState,baseQueue:jt.baseQueue,queue:jt.queue,next:null},_t===null?ct.memoizedState=_t=e:_t=_t.next=e}return _t}function ls(e,t){return typeof t=="function"?t(e):t}function Ci(e){var t=ur(),n=t.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=e;var a=jt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var c=i=null,l=null,d=o;do{var m=d.lane;if((In&m)===m)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var f={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=f,i=a):l=l.next=f,ct.lanes|=m,Ln|=m}d=d.next}while(d!==null&&d!==o);l===null?i=a:l.next=c,wr(a,t.memoizedState)||(Ht=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=l,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,ct.lanes|=o,Ln|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Mi(e){var t=ur(),n=t.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);wr(o,t.memoizedState)||(Ht=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function nm(){}function am(e,t){var n=ct,a=ur(),s=t(),o=!wr(a.memoizedState,s);if(o&&(a.memoizedState=s,Ht=!0),a=a.queue,Sc(im.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||_t!==null&&_t.memoizedState.tag&1){if(n.flags|=2048,cs(9,om.bind(null,n,a,s,t),void 0,null),St===null)throw Error(re(349));In&30||sm(n,t,s)}return s}function sm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ct.updateQueue,t===null?(t={lastEffect:null,stores:null},ct.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function om(e,t,n,a){t.value=n,t.getSnapshot=a,lm(t)&&cm(e)}function im(e,t,n){return n(function(){lm(t)&&cm(e)})}function lm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wr(e,n)}catch{return!0}}function cm(e){var t=Ur(e,1);t!==null&&yr(t,e,1,-1)}function Ld(e){var t=Sr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t.queue=e,e=e.dispatch=Tg.bind(null,ct,e),[t.memoizedState,e]}function cs(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=ct.updateQueue,t===null?(t={lastEffect:null,stores:null},ct.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function dm(){return ur().memoizedState}function Zs(e,t,n,a){var s=Sr();ct.flags|=e,s.memoizedState=cs(1|t,n,void 0,a===void 0?null:a)}function Xo(e,t,n,a){var s=ur();a=a===void 0?null:a;var o=void 0;if(jt!==null){var i=jt.memoizedState;if(o=i.destroy,a!==null&&jc(a,i.deps)){s.memoizedState=cs(t,n,o,a);return}}ct.flags|=e,s.memoizedState=cs(1|t,n,o,a)}function Ad(e,t){return Zs(8390656,8,e,t)}function Sc(e,t){return Xo(2048,8,e,t)}function um(e,t){return Xo(4,2,e,t)}function pm(e,t){return Xo(4,4,e,t)}function mm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fm(e,t,n){return n=n!=null?n.concat([e]):null,Xo(4,4,mm.bind(null,t,e),n)}function Cc(){}function gm(e,t){var n=ur();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&jc(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function hm(e,t){var n=ur();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&jc(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function xm(e,t,n){return In&21?(wr(n,t)||(n=kp(),ct.lanes|=n,Ln|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ht=!0),e.memoizedState=n)}function Eg(e,t){var n=Ge;Ge=n!==0&&4>n?n:4,e(!0);var a=Si.transition;Si.transition={};try{e(!1),t()}finally{Ge=n,Si.transition=a}}function vm(){return ur().memoizedState}function $g(e,t,n){var a=un(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},bm(e))ym(t,n);else if(n=em(e,t,n,a),n!==null){var s=Ft();yr(n,e,a,s),wm(n,t,a)}}function Tg(e,t,n){var a=un(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(bm(e))ym(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,c=o(i,n);if(s.hasEagerState=!0,s.eagerState=c,wr(c,i)){var l=t.interleaved;l===null?(s.next=s,vc(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=em(e,t,s,a),n!==null&&(s=Ft(),yr(n,e,a,s),wm(n,t,a))}}function bm(e){var t=e.alternate;return e===ct||t!==null&&t===ct}function ym(e,t){Va=_o=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function wm(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ac(e,n)}}var So={readContext:dr,useCallback:Rt,useContext:Rt,useEffect:Rt,useImperativeHandle:Rt,useInsertionEffect:Rt,useLayoutEffect:Rt,useMemo:Rt,useReducer:Rt,useRef:Rt,useState:Rt,useDebugValue:Rt,useDeferredValue:Rt,useTransition:Rt,useMutableSource:Rt,useSyncExternalStore:Rt,useId:Rt,unstable_isNewReconciler:!1},Pg={readContext:dr,useCallback:function(e,t){return Sr().memoizedState=[e,t===void 0?null:t],e},useContext:dr,useEffect:Ad,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Zs(4194308,4,mm.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Zs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Zs(4,2,e,t)},useMemo:function(e,t){var n=Sr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Sr();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=$g.bind(null,ct,e),[a.memoizedState,e]},useRef:function(e){var t=Sr();return e={current:e},t.memoizedState=e},useState:Ld,useDebugValue:Cc,useDeferredValue:function(e){return Sr().memoizedState=e},useTransition:function(){var e=Ld(!1),t=e[0];return e=Eg.bind(null,e[1]),Sr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=ct,s=Sr();if(at){if(n===void 0)throw Error(re(407));n=n()}else{if(n=t(),St===null)throw Error(re(349));In&30||sm(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,Ad(im.bind(null,a,o,e),[e]),a.flags|=2048,cs(9,om.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=Sr(),t=St.identifierPrefix;if(at){var n=Fr,a=Or;n=(a&~(1<<32-br(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=is++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=zg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Rg={readContext:dr,useCallback:gm,useContext:dr,useEffect:Sc,useImperativeHandle:fm,useInsertionEffect:um,useLayoutEffect:pm,useMemo:hm,useReducer:Ci,useRef:dm,useState:function(){return Ci(ls)},useDebugValue:Cc,useDeferredValue:function(e){var t=ur();return xm(t,jt.memoizedState,e)},useTransition:function(){var e=Ci(ls)[0],t=ur().memoizedState;return[e,t]},useMutableSource:nm,useSyncExternalStore:am,useId:vm,unstable_isNewReconciler:!1},Ig={readContext:dr,useCallback:gm,useContext:dr,useEffect:Sc,useImperativeHandle:fm,useInsertionEffect:um,useLayoutEffect:pm,useMemo:hm,useReducer:Mi,useRef:dm,useState:function(){return Mi(ls)},useDebugValue:Cc,useDeferredValue:function(e){var t=ur();return jt===null?t.memoizedState=e:xm(t,jt.memoizedState,e)},useTransition:function(){var e=Mi(ls)[0],t=ur().memoizedState;return[e,t]},useMutableSource:nm,useSyncExternalStore:am,useId:vm,unstable_isNewReconciler:!1};function gr(e,t){if(e&&e.defaultProps){t=dt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function kl(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:dt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ko={isMounted:function(e){return(e=e._reactInternals)?Dn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Ft(),s=un(e),o=Dr(a,s);o.payload=t,n!=null&&(o.callback=n),t=cn(e,o,s),t!==null&&(yr(t,e,s,a),Qs(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Ft(),s=un(e),o=Dr(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=cn(e,o,s),t!==null&&(yr(t,e,s,a),Qs(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ft(),a=un(e),s=Dr(n,a);s.tag=2,t!=null&&(s.callback=t),t=cn(e,s,a),t!==null&&(yr(t,e,a,n),Qs(t,e,a))}};function Od(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!ts(n,a)||!ts(s,o):!0}function km(e,t,n){var a=!1,s=fn,o=t.contextType;return typeof o=="object"&&o!==null?o=dr(o):(s=Xt(t)?Pn:At.current,a=t.contextTypes,o=(a=a!=null)?ca(e,s):fn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ko,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function Fd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Ko.enqueueReplaceState(t,t.state,null)}function jl(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},bc(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=dr(o):(o=Xt(t)?Pn:At.current,s.context=ca(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(kl(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Ko.enqueueReplaceState(s,s.state,null),jo(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function ma(e,t){try{var n="",a=t;do n+=cf(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function zi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Nl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Lg=typeof WeakMap=="function"?WeakMap:Map;function jm(e,t,n){n=Dr(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Mo||(Mo=!0,Rl=a),Nl(e,t)},n}function Nm(e,t,n){n=Dr(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){Nl(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Nl(e,t),typeof a!="function"&&(dn===null?dn=new Set([this]):dn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Dd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Lg;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=qg.bind(null,e,t,n),t.then(e,e))}function Bd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Wd(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Dr(-1,1),t.tag=2,cn(n,t,1))),n.lanes|=1),e)}var Ag=Yr.ReactCurrentOwner,Ht=!1;function Ot(e,t,n,a){t.child=e===null?Zp(t,null,n,a):ua(t,e.child,n,a)}function Ud(e,t,n,a,s){n=n.render;var o=t.ref;return sa(t,s),a=Nc(e,t,n,a,o,s),n=_c(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Vr(e,t,s)):(at&&n&&pc(t),t.flags|=1,Ot(e,t,a,s),t.child)}function Vd(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!Ic(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,_m(e,t,o,a,s)):(e=no(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:ts,n(i,a)&&e.ref===t.ref)return Vr(e,t,s)}return t.flags|=1,e=pn(o,a),e.ref=t.ref,e.return=t,t.child=e}function _m(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(ts(o,a)&&e.ref===t.ref)if(Ht=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Ht=!0);else return t.lanes=e.lanes,Vr(e,t,s)}return _l(e,t,n,a,s)}function Sm(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Je(ea,Jt),Jt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Je(ea,Jt),Jt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,Je(ea,Jt),Jt|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,Je(ea,Jt),Jt|=a;return Ot(e,t,s,n),t.child}function Cm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function _l(e,t,n,a,s){var o=Xt(n)?Pn:At.current;return o=ca(t,o),sa(t,s),n=Nc(e,t,n,a,o,s),a=_c(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Vr(e,t,s)):(at&&a&&pc(t),t.flags|=1,Ot(e,t,n,s),t.child)}function Hd(e,t,n,a,s){if(Xt(n)){var o=!0;vo(t)}else o=!1;if(sa(t,s),t.stateNode===null)eo(e,t),km(t,n,a),jl(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var l=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=dr(d):(d=Xt(n)?Pn:At.current,d=ca(t,d));var m=n.getDerivedStateFromProps,f=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==a||l!==d)&&Fd(t,i,a,d),Jr=!1;var p=t.memoizedState;i.state=p,jo(t,a,i,s),l=t.memoizedState,c!==a||p!==l||Gt.current||Jr?(typeof m=="function"&&(kl(t,n,m,a),l=t.memoizedState),(c=Jr||Od(t,n,c,a,p,l,d))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=l),i.props=a,i.state=l,i.context=d,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,tm(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:gr(t.type,c),i.props=d,f=t.pendingProps,p=i.context,l=n.contextType,typeof l=="object"&&l!==null?l=dr(l):(l=Xt(n)?Pn:At.current,l=ca(t,l));var v=n.getDerivedStateFromProps;(m=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==f||p!==l)&&Fd(t,i,a,l),Jr=!1,p=t.memoizedState,i.state=p,jo(t,a,i,s);var b=t.memoizedState;c!==f||p!==b||Gt.current||Jr?(typeof v=="function"&&(kl(t,n,v,a),b=t.memoizedState),(d=Jr||Od(t,n,d,a,p,b,l)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,b,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,b,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=b),i.props=a,i.state=b,i.context=l,a=d):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),a=!1)}return Sl(e,t,n,a,o,s)}function Sl(e,t,n,a,s,o){Cm(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&Ed(t,n,!1),Vr(e,t,o);a=t.stateNode,Ag.current=t;var c=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=ua(t,e.child,null,o),t.child=ua(t,null,c,o)):Ot(e,t,c,o),t.memoizedState=a.state,s&&Ed(t,n,!0),t.child}function Mm(e){var t=e.stateNode;t.pendingContext?zd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&zd(e,t.context,!1),yc(e,t.containerInfo)}function Yd(e,t,n,a,s){return da(),fc(s),t.flags|=256,Ot(e,t,n,a),t.child}var Cl={dehydrated:null,treeContext:null,retryLane:0};function Ml(e){return{baseLanes:e,cachePool:null,transitions:null}}function zm(e,t,n){var a=t.pendingProps,s=lt.current,o=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Je(lt,s&1),e===null)return yl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Jo(i,a,0,null),e=$n(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Ml(n),t.memoizedState=Cl,e):Mc(t,i));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Og(e,t,i,a,c,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,c=s.sibling;var l={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=l,t.deletions=null):(a=pn(s,l),a.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=pn(c,o):(o=$n(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?Ml(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=Cl,a}return o=e.child,e=o.sibling,a=pn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Mc(e,t){return t=Jo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ls(e,t,n,a){return a!==null&&fc(a),ua(t,e.child,null,n),e=Mc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Og(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=zi(Error(re(422))),Ls(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=Jo({mode:"visible",children:a.children},s,0,null),o=$n(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&ua(t,e.child,null,i),t.child.memoizedState=Ml(i),t.memoizedState=Cl,o);if(!(t.mode&1))return Ls(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var c=a.dgst;return a=c,o=Error(re(419)),a=zi(o,a,void 0),Ls(e,t,i,a)}if(c=(i&e.childLanes)!==0,Ht||c){if(a=St,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Ur(e,s),yr(a,e,s,-1))}return Rc(),a=zi(Error(re(421))),Ls(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Qg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,Zt=ln(s.nextSibling),er=t,at=!0,xr=null,e!==null&&(or[ir++]=Or,or[ir++]=Fr,or[ir++]=Rn,Or=e.id,Fr=e.overflow,Rn=t),t=Mc(t,a.children),t.flags|=4096,t)}function Gd(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),wl(e.return,t,n)}function Ei(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function Em(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(Ot(e,t,a.children,n),a=lt.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gd(e,n,t);else if(e.tag===19)Gd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(Je(lt,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&No(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Ei(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&No(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Ei(t,!0,n,null,o);break;case"together":Ei(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function eo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Vr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ln|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(re(153));if(t.child!==null){for(e=t.child,n=pn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=pn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Fg(e,t,n){switch(t.tag){case 3:Mm(t),da();break;case 5:rm(t);break;case 1:Xt(t.type)&&vo(t);break;case 4:yc(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;Je(wo,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(Je(lt,lt.current&1),t.flags|=128,null):n&t.child.childLanes?zm(e,t,n):(Je(lt,lt.current&1),e=Vr(e,t,n),e!==null?e.sibling:null);Je(lt,lt.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return Em(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Je(lt,lt.current),a)break;return null;case 22:case 23:return t.lanes=0,Sm(e,t,n)}return Vr(e,t,n)}var $m,zl,Tm,Pm;$m=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};zl=function(){};Tm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,Mn(zr.current);var o=null;switch(n){case"input":s=Qi(e,s),a=Qi(e,a),o=[];break;case"select":s=dt({},s,{value:void 0}),a=dt({},a,{value:void 0}),o=[];break;case"textarea":s=el(e,s),a=el(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=ho)}rl(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var c=s[d];for(i in c)c.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Xa.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var l=a[d];if(c=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(i in c)!c.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in l)l.hasOwnProperty(i)&&c[i]!==l[i]&&(n||(n={}),n[i]=l[i])}else n||(o||(o=[]),o.push(d,n)),n=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Xa.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&et("scroll",e),o||c===l||(o=[])):(o=o||[]).push(d,l))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};Pm=function(e,t,n,a){n!==a&&(t.flags|=4)};function Sa(e,t){if(!at)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function It(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Dg(e,t,n){var a=t.pendingProps;switch(mc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return It(t),null;case 1:return Xt(t.type)&&xo(),It(t),null;case 3:return a=t.stateNode,pa(),tt(Gt),tt(At),kc(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Rs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,xr!==null&&(Al(xr),xr=null))),zl(e,t),It(t),null;case 5:wc(t);var s=Mn(os.current);if(n=t.type,e!==null&&t.stateNode!=null)Tm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(re(166));return It(t),null}if(e=Mn(zr.current),Rs(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[Cr]=t,a[as]=o,e=(t.mode&1)!==0,n){case"dialog":et("cancel",a),et("close",a);break;case"iframe":case"object":case"embed":et("load",a);break;case"video":case"audio":for(s=0;s<Ra.length;s++)et(Ra[s],a);break;case"source":et("error",a);break;case"img":case"image":case"link":et("error",a),et("load",a);break;case"details":et("toggle",a);break;case"input":rd(a,o),et("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},et("invalid",a);break;case"textarea":ad(a,o),et("invalid",a)}rl(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="children"?typeof c=="string"?a.textContent!==c&&(o.suppressHydrationWarning!==!0&&Ps(a.textContent,c,e),s=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Ps(a.textContent,c,e),s=["children",""+c]):Xa.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&et("scroll",a)}switch(n){case"input":_s(a),nd(a,o,!0);break;case"textarea":_s(a),sd(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=ho)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ip(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[Cr]=t,e[as]=a,$m(e,t,!1,!1),t.stateNode=e;e:{switch(i=nl(n,a),n){case"dialog":et("cancel",e),et("close",e),s=a;break;case"iframe":case"object":case"embed":et("load",e),s=a;break;case"video":case"audio":for(s=0;s<Ra.length;s++)et(Ra[s],e);s=a;break;case"source":et("error",e),s=a;break;case"img":case"image":case"link":et("error",e),et("load",e),s=a;break;case"details":et("toggle",e),s=a;break;case"input":rd(e,a),s=Qi(e,a),et("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=dt({},a,{value:void 0}),et("invalid",e);break;case"textarea":ad(e,a),s=el(e,a),et("invalid",e);break;default:s=a}rl(n,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var l=c[o];o==="style"?dp(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&lp(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ka(e,l):typeof l=="number"&&Ka(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Xa.hasOwnProperty(o)?l!=null&&o==="onScroll"&&et("scroll",e):l!=null&&Jl(e,o,l,i))}switch(n){case"input":_s(e),nd(e,a,!1);break;case"textarea":_s(e),sd(e);break;case"option":a.value!=null&&e.setAttribute("value",""+mn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?ta(e,!!a.multiple,o,!1):a.defaultValue!=null&&ta(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ho)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return It(t),null;case 6:if(e&&t.stateNode!=null)Pm(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(re(166));if(n=Mn(os.current),Mn(zr.current),Rs(t)){if(a=t.stateNode,n=t.memoizedProps,a[Cr]=t,(o=a.nodeValue!==n)&&(e=er,e!==null))switch(e.tag){case 3:Ps(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ps(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Cr]=t,t.stateNode=a}return It(t),null;case 13:if(tt(lt),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(at&&Zt!==null&&t.mode&1&&!(t.flags&128))Qp(),da(),t.flags|=98560,o=!1;else if(o=Rs(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(re(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(re(317));o[Cr]=t}else da(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;It(t),o=!1}else xr!==null&&(Al(xr),xr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||lt.current&1?Nt===0&&(Nt=3):Rc())),t.updateQueue!==null&&(t.flags|=4),It(t),null);case 4:return pa(),zl(e,t),e===null&&rs(t.stateNode.containerInfo),It(t),null;case 10:return xc(t.type._context),It(t),null;case 17:return Xt(t.type)&&xo(),It(t),null;case 19:if(tt(lt),o=t.memoizedState,o===null)return It(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)Sa(o,!1);else{if(Nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=No(e),i!==null){for(t.flags|=128,Sa(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Je(lt,lt.current&1|2),t.child}e=e.sibling}o.tail!==null&&ht()>fa&&(t.flags|=128,a=!0,Sa(o,!1),t.lanes=4194304)}else{if(!a)if(e=No(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Sa(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!at)return It(t),null}else 2*ht()-o.renderingStartTime>fa&&n!==1073741824&&(t.flags|=128,a=!0,Sa(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ht(),t.sibling=null,n=lt.current,Je(lt,a?n&1|2:n&1),t):(It(t),null);case 22:case 23:return Pc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Jt&1073741824&&(It(t),t.subtreeFlags&6&&(t.flags|=8192)):It(t),null;case 24:return null;case 25:return null}throw Error(re(156,t.tag))}function Bg(e,t){switch(mc(t),t.tag){case 1:return Xt(t.type)&&xo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return pa(),tt(Gt),tt(At),kc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return wc(t),null;case 13:if(tt(lt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(re(340));da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return tt(lt),null;case 4:return pa(),null;case 10:return xc(t.type._context),null;case 22:case 23:return Pc(),null;case 24:return null;default:return null}}var As=!1,Lt=!1,Wg=typeof WeakSet=="function"?WeakSet:Set,fe=null;function Zn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){pt(e,t,a)}else n.current=null}function El(e,t,n){try{n()}catch(a){pt(e,t,a)}}var Xd=!1;function Ug(e,t){if(ml=mo,e=Op(),uc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,c=-1,l=-1,d=0,m=0,f=e,p=null;t:for(;;){for(var v;f!==n||s!==0&&f.nodeType!==3||(c=i+s),f!==o||a!==0&&f.nodeType!==3||(l=i+a),f.nodeType===3&&(i+=f.nodeValue.length),(v=f.firstChild)!==null;)p=f,f=v;for(;;){if(f===e)break t;if(p===n&&++d===s&&(c=i),p===o&&++m===a&&(l=i),(v=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=v}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(fl={focusedElem:e,selectionRange:n},mo=!1,fe=t;fe!==null;)if(t=fe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,fe=e;else for(;fe!==null;){t=fe;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var w=b.memoizedProps,C=b.memoizedState,x=t.stateNode,g=x.getSnapshotBeforeUpdate(t.elementType===t.type?w:gr(t.type,w),C);x.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(N){pt(t,t.return,N)}if(e=t.sibling,e!==null){e.return=t.return,fe=e;break}fe=t.return}return b=Xd,Xd=!1,b}function Ha(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&El(t,n,o)}s=s.next}while(s!==a)}}function qo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function $l(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Rm(e){var t=e.alternate;t!==null&&(e.alternate=null,Rm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Cr],delete t[as],delete t[xl],delete t[_g],delete t[Sg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Im(e){return e.tag===5||e.tag===3||e.tag===4}function Kd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Im(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Tl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ho));else if(a!==4&&(e=e.child,e!==null))for(Tl(e,t,n),e=e.sibling;e!==null;)Tl(e,t,n),e=e.sibling}function Pl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Pl(e,t,n),e=e.sibling;e!==null;)Pl(e,t,n),e=e.sibling}var Mt=null,hr=!1;function qr(e,t,n){for(n=n.child;n!==null;)Lm(e,t,n),n=n.sibling}function Lm(e,t,n){if(Mr&&typeof Mr.onCommitFiberUnmount=="function")try{Mr.onCommitFiberUnmount(Wo,n)}catch{}switch(n.tag){case 5:Lt||Zn(n,t);case 6:var a=Mt,s=hr;Mt=null,qr(e,t,n),Mt=a,hr=s,Mt!==null&&(hr?(e=Mt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Mt.removeChild(n.stateNode));break;case 18:Mt!==null&&(hr?(e=Mt,n=n.stateNode,e.nodeType===8?ji(e.parentNode,n):e.nodeType===1&&ji(e,n),Za(e)):ji(Mt,n.stateNode));break;case 4:a=Mt,s=hr,Mt=n.stateNode.containerInfo,hr=!0,qr(e,t,n),Mt=a,hr=s;break;case 0:case 11:case 14:case 15:if(!Lt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&El(n,t,i),s=s.next}while(s!==a)}qr(e,t,n);break;case 1:if(!Lt&&(Zn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(c){pt(n,t,c)}qr(e,t,n);break;case 21:qr(e,t,n);break;case 22:n.mode&1?(Lt=(a=Lt)||n.memoizedState!==null,qr(e,t,n),Lt=a):qr(e,t,n);break;default:qr(e,t,n)}}function qd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Wg),t.forEach(function(a){var s=Jg.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function fr(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:Mt=c.stateNode,hr=!1;break e;case 3:Mt=c.stateNode.containerInfo,hr=!0;break e;case 4:Mt=c.stateNode.containerInfo,hr=!0;break e}c=c.return}if(Mt===null)throw Error(re(160));Lm(o,i,s),Mt=null,hr=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(d){pt(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Am(t,e),t=t.sibling}function Am(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fr(t,e),_r(e),a&4){try{Ha(3,e,e.return),qo(3,e)}catch(w){pt(e,e.return,w)}try{Ha(5,e,e.return)}catch(w){pt(e,e.return,w)}}break;case 1:fr(t,e),_r(e),a&512&&n!==null&&Zn(n,n.return);break;case 5:if(fr(t,e),_r(e),a&512&&n!==null&&Zn(n,n.return),e.flags&32){var s=e.stateNode;try{Ka(s,"")}catch(w){pt(e,e.return,w)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&sp(s,o),nl(c,i);var d=nl(c,o);for(i=0;i<l.length;i+=2){var m=l[i],f=l[i+1];m==="style"?dp(s,f):m==="dangerouslySetInnerHTML"?lp(s,f):m==="children"?Ka(s,f):Jl(s,m,f,d)}switch(c){case"input":Ji(s,o);break;case"textarea":op(s,o);break;case"select":var p=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?ta(s,!!o.multiple,v,!1):p!==!!o.multiple&&(o.defaultValue!=null?ta(s,!!o.multiple,o.defaultValue,!0):ta(s,!!o.multiple,o.multiple?[]:"",!1))}s[as]=o}catch(w){pt(e,e.return,w)}}break;case 6:if(fr(t,e),_r(e),a&4){if(e.stateNode===null)throw Error(re(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(w){pt(e,e.return,w)}}break;case 3:if(fr(t,e),_r(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Za(t.containerInfo)}catch(w){pt(e,e.return,w)}break;case 4:fr(t,e),_r(e);break;case 13:fr(t,e),_r(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||($c=ht())),a&4&&qd(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Lt=(d=Lt)||m,fr(t,e),Lt=d):fr(t,e),_r(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(fe=e,m=e.child;m!==null;){for(f=fe=m;fe!==null;){switch(p=fe,v=p.child,p.tag){case 0:case 11:case 14:case 15:Ha(4,p,p.return);break;case 1:Zn(p,p.return);var b=p.stateNode;if(typeof b.componentWillUnmount=="function"){a=p,n=p.return;try{t=a,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(w){pt(a,n,w)}}break;case 5:Zn(p,p.return);break;case 22:if(p.memoizedState!==null){Jd(f);continue}}v!==null?(v.return=p,fe=v):Jd(f)}m=m.sibling}e:for(m=null,f=e;;){if(f.tag===5){if(m===null){m=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=f.stateNode,l=f.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=cp("display",i))}catch(w){pt(e,e.return,w)}}}else if(f.tag===6){if(m===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(w){pt(e,e.return,w)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;m===f&&(m=null),f=f.return}m===f&&(m=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:fr(t,e),_r(e),a&4&&qd(e);break;case 21:break;default:fr(t,e),_r(e)}}function _r(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Im(n)){var a=n;break e}n=n.return}throw Error(re(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(Ka(s,""),a.flags&=-33);var o=Kd(e);Pl(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,c=Kd(e);Tl(e,c,i);break;default:throw Error(re(161))}}catch(l){pt(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Vg(e,t,n){fe=e,Om(e)}function Om(e,t,n){for(var a=(e.mode&1)!==0;fe!==null;){var s=fe,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||As;if(!i){var c=s.alternate,l=c!==null&&c.memoizedState!==null||Lt;c=As;var d=Lt;if(As=i,(Lt=l)&&!d)for(fe=s;fe!==null;)i=fe,l=i.child,i.tag===22&&i.memoizedState!==null?Zd(s):l!==null?(l.return=i,fe=l):Zd(s);for(;o!==null;)fe=o,Om(o),o=o.sibling;fe=s,As=c,Lt=d}Qd(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,fe=o):Qd(e)}}function Qd(e){for(;fe!==null;){var t=fe;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Lt||qo(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!Lt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:gr(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Id(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Id(t,i,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var f=m.dehydrated;f!==null&&Za(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}Lt||t.flags&512&&$l(t)}catch(p){pt(t,t.return,p)}}if(t===e){fe=null;break}if(n=t.sibling,n!==null){n.return=t.return,fe=n;break}fe=t.return}}function Jd(e){for(;fe!==null;){var t=fe;if(t===e){fe=null;break}var n=t.sibling;if(n!==null){n.return=t.return,fe=n;break}fe=t.return}}function Zd(e){for(;fe!==null;){var t=fe;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{qo(4,t)}catch(l){pt(t,n,l)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(l){pt(t,s,l)}}var o=t.return;try{$l(t)}catch(l){pt(t,o,l)}break;case 5:var i=t.return;try{$l(t)}catch(l){pt(t,i,l)}}}catch(l){pt(t,t.return,l)}if(t===e){fe=null;break}var c=t.sibling;if(c!==null){c.return=t.return,fe=c;break}fe=t.return}}var Hg=Math.ceil,Co=Yr.ReactCurrentDispatcher,zc=Yr.ReactCurrentOwner,cr=Yr.ReactCurrentBatchConfig,We=0,St=null,vt=null,zt=0,Jt=0,ea=hn(0),Nt=0,ds=null,Ln=0,Qo=0,Ec=0,Ya=null,Vt=null,$c=0,fa=1/0,Lr=null,Mo=!1,Rl=null,dn=null,Os=!1,nn=null,zo=0,Ga=0,Il=null,to=-1,ro=0;function Ft(){return We&6?ht():to!==-1?to:to=ht()}function un(e){return e.mode&1?We&2&&zt!==0?zt&-zt:Mg.transition!==null?(ro===0&&(ro=kp()),ro):(e=Ge,e!==0||(e=window.event,e=e===void 0?16:zp(e.type)),e):1}function yr(e,t,n,a){if(50<Ga)throw Ga=0,Il=null,Error(re(185));hs(e,n,a),(!(We&2)||e!==St)&&(e===St&&(!(We&2)&&(Qo|=n),Nt===4&&tn(e,zt)),Kt(e,a),n===1&&We===0&&!(t.mode&1)&&(fa=ht()+500,Go&&xn()))}function Kt(e,t){var n=e.callbackNode;Mf(e,t);var a=po(e,e===St?zt:0);if(a===0)n!==null&&ld(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&ld(n),t===1)e.tag===0?Cg(eu.bind(null,e)):Xp(eu.bind(null,e)),jg(function(){!(We&6)&&xn()}),n=null;else{switch(jp(a)){case 1:n=nc;break;case 4:n=yp;break;case 16:n=uo;break;case 536870912:n=wp;break;default:n=uo}n=Ym(n,Fm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Fm(e,t){if(to=-1,ro=0,We&6)throw Error(re(327));var n=e.callbackNode;if(oa()&&e.callbackNode!==n)return null;var a=po(e,e===St?zt:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Eo(e,a);else{t=a;var s=We;We|=2;var o=Bm();(St!==e||zt!==t)&&(Lr=null,fa=ht()+500,En(e,t));do try{Xg();break}catch(c){Dm(e,c)}while(!0);hc(),Co.current=o,We=s,vt!==null?t=0:(St=null,zt=0,t=Nt)}if(t!==0){if(t===2&&(s=ll(e),s!==0&&(a=s,t=Ll(e,s))),t===1)throw n=ds,En(e,0),tn(e,a),Kt(e,ht()),n;if(t===6)tn(e,a);else{if(s=e.current.alternate,!(a&30)&&!Yg(s)&&(t=Eo(e,a),t===2&&(o=ll(e),o!==0&&(a=o,t=Ll(e,o))),t===1))throw n=ds,En(e,0),tn(e,a),Kt(e,ht()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(re(345));case 2:_n(e,Vt,Lr);break;case 3:if(tn(e,a),(a&130023424)===a&&(t=$c+500-ht(),10<t)){if(po(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){Ft(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=hl(_n.bind(null,e,Vt,Lr),t);break}_n(e,Vt,Lr);break;case 4:if(tn(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-br(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=ht()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Hg(a/1960))-a,10<a){e.timeoutHandle=hl(_n.bind(null,e,Vt,Lr),a);break}_n(e,Vt,Lr);break;case 5:_n(e,Vt,Lr);break;default:throw Error(re(329))}}}return Kt(e,ht()),e.callbackNode===n?Fm.bind(null,e):null}function Ll(e,t){var n=Ya;return e.current.memoizedState.isDehydrated&&(En(e,t).flags|=256),e=Eo(e,t),e!==2&&(t=Vt,Vt=n,t!==null&&Al(t)),e}function Al(e){Vt===null?Vt=e:Vt.push.apply(Vt,e)}function Yg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!wr(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function tn(e,t){for(t&=~Ec,t&=~Qo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-br(t),a=1<<n;e[n]=-1,t&=~a}}function eu(e){if(We&6)throw Error(re(327));oa();var t=po(e,0);if(!(t&1))return Kt(e,ht()),null;var n=Eo(e,t);if(e.tag!==0&&n===2){var a=ll(e);a!==0&&(t=a,n=Ll(e,a))}if(n===1)throw n=ds,En(e,0),tn(e,t),Kt(e,ht()),n;if(n===6)throw Error(re(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,_n(e,Vt,Lr),Kt(e,ht()),null}function Tc(e,t){var n=We;We|=1;try{return e(t)}finally{We=n,We===0&&(fa=ht()+500,Go&&xn())}}function An(e){nn!==null&&nn.tag===0&&!(We&6)&&oa();var t=We;We|=1;var n=cr.transition,a=Ge;try{if(cr.transition=null,Ge=1,e)return e()}finally{Ge=a,cr.transition=n,We=t,!(We&6)&&xn()}}function Pc(){Jt=ea.current,tt(ea)}function En(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,kg(n)),vt!==null)for(n=vt.return;n!==null;){var a=n;switch(mc(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&xo();break;case 3:pa(),tt(Gt),tt(At),kc();break;case 5:wc(a);break;case 4:pa();break;case 13:tt(lt);break;case 19:tt(lt);break;case 10:xc(a.type._context);break;case 22:case 23:Pc()}n=n.return}if(St=e,vt=e=pn(e.current,null),zt=Jt=t,Nt=0,ds=null,Ec=Qo=Ln=0,Vt=Ya=null,Cn!==null){for(t=0;t<Cn.length;t++)if(n=Cn[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}Cn=null}return e}function Dm(e,t){do{var n=vt;try{if(hc(),Js.current=So,_o){for(var a=ct.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}_o=!1}if(In=0,_t=jt=ct=null,Va=!1,is=0,zc.current=null,n===null||n.return===null){Nt=1,ds=t,vt=null;break}e:{var o=e,i=n.return,c=n,l=t;if(t=zt,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,m=c,f=m.tag;if(!(m.mode&1)&&(f===0||f===11||f===15)){var p=m.alternate;p?(m.updateQueue=p.updateQueue,m.memoizedState=p.memoizedState,m.lanes=p.lanes):(m.updateQueue=null,m.memoizedState=null)}var v=Bd(i);if(v!==null){v.flags&=-257,Wd(v,i,c,o,t),v.mode&1&&Dd(o,d,t),t=v,l=d;var b=t.updateQueue;if(b===null){var w=new Set;w.add(l),t.updateQueue=w}else b.add(l);break e}else{if(!(t&1)){Dd(o,d,t),Rc();break e}l=Error(re(426))}}else if(at&&c.mode&1){var C=Bd(i);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Wd(C,i,c,o,t),fc(ma(l,c));break e}}o=l=ma(l,c),Nt!==4&&(Nt=2),Ya===null?Ya=[o]:Ya.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var x=jm(o,l,t);Rd(o,x);break e;case 1:c=l;var g=o.type,h=o.stateNode;if(!(o.flags&128)&&(typeof g.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(dn===null||!dn.has(h)))){o.flags|=65536,t&=-t,o.lanes|=t;var N=Nm(o,c,t);Rd(o,N);break e}}o=o.return}while(o!==null)}Um(n)}catch(S){t=S,vt===n&&n!==null&&(vt=n=n.return);continue}break}while(!0)}function Bm(){var e=Co.current;return Co.current=So,e===null?So:e}function Rc(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),St===null||!(Ln&268435455)&&!(Qo&268435455)||tn(St,zt)}function Eo(e,t){var n=We;We|=2;var a=Bm();(St!==e||zt!==t)&&(Lr=null,En(e,t));do try{Gg();break}catch(s){Dm(e,s)}while(!0);if(hc(),We=n,Co.current=a,vt!==null)throw Error(re(261));return St=null,zt=0,Nt}function Gg(){for(;vt!==null;)Wm(vt)}function Xg(){for(;vt!==null&&!bf();)Wm(vt)}function Wm(e){var t=Hm(e.alternate,e,Jt);e.memoizedProps=e.pendingProps,t===null?Um(e):vt=t,zc.current=null}function Um(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Bg(n,t),n!==null){n.flags&=32767,vt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Nt=6,vt=null;return}}else if(n=Dg(n,t,Jt),n!==null){vt=n;return}if(t=t.sibling,t!==null){vt=t;return}vt=t=e}while(t!==null);Nt===0&&(Nt=5)}function _n(e,t,n){var a=Ge,s=cr.transition;try{cr.transition=null,Ge=1,Kg(e,t,n,a)}finally{cr.transition=s,Ge=a}return null}function Kg(e,t,n,a){do oa();while(nn!==null);if(We&6)throw Error(re(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(re(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(zf(e,o),e===St&&(vt=St=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Os||(Os=!0,Ym(uo,function(){return oa(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=cr.transition,cr.transition=null;var i=Ge;Ge=1;var c=We;We|=4,zc.current=null,Ug(e,n),Am(n,e),gg(fl),mo=!!ml,fl=ml=null,e.current=n,Vg(n),yf(),We=c,Ge=i,cr.transition=o}else e.current=n;if(Os&&(Os=!1,nn=e,zo=s),o=e.pendingLanes,o===0&&(dn=null),jf(n.stateNode),Kt(e,ht()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(Mo)throw Mo=!1,e=Rl,Rl=null,e;return zo&1&&e.tag!==0&&oa(),o=e.pendingLanes,o&1?e===Il?Ga++:(Ga=0,Il=e):Ga=0,xn(),null}function oa(){if(nn!==null){var e=jp(zo),t=cr.transition,n=Ge;try{if(cr.transition=null,Ge=16>e?16:e,nn===null)var a=!1;else{if(e=nn,nn=null,zo=0,We&6)throw Error(re(331));var s=We;for(We|=4,fe=e.current;fe!==null;){var o=fe,i=o.child;if(fe.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(fe=d;fe!==null;){var m=fe;switch(m.tag){case 0:case 11:case 15:Ha(8,m,o)}var f=m.child;if(f!==null)f.return=m,fe=f;else for(;fe!==null;){m=fe;var p=m.sibling,v=m.return;if(Rm(m),m===d){fe=null;break}if(p!==null){p.return=v,fe=p;break}fe=v}}}var b=o.alternate;if(b!==null){var w=b.child;if(w!==null){b.child=null;do{var C=w.sibling;w.sibling=null,w=C}while(w!==null)}}fe=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,fe=i;else e:for(;fe!==null;){if(o=fe,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Ha(9,o,o.return)}var x=o.sibling;if(x!==null){x.return=o.return,fe=x;break e}fe=o.return}}var g=e.current;for(fe=g;fe!==null;){i=fe;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,fe=h;else e:for(i=g;fe!==null;){if(c=fe,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:qo(9,c)}}catch(S){pt(c,c.return,S)}if(c===i){fe=null;break e}var N=c.sibling;if(N!==null){N.return=c.return,fe=N;break e}fe=c.return}}if(We=s,xn(),Mr&&typeof Mr.onPostCommitFiberRoot=="function")try{Mr.onPostCommitFiberRoot(Wo,e)}catch{}a=!0}return a}finally{Ge=n,cr.transition=t}}return!1}function tu(e,t,n){t=ma(n,t),t=jm(e,t,1),e=cn(e,t,1),t=Ft(),e!==null&&(hs(e,1,t),Kt(e,t))}function pt(e,t,n){if(e.tag===3)tu(e,e,n);else for(;t!==null;){if(t.tag===3){tu(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(dn===null||!dn.has(a))){e=ma(n,e),e=Nm(t,e,1),t=cn(t,e,1),e=Ft(),t!==null&&(hs(t,1,e),Kt(t,e));break}}t=t.return}}function qg(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=Ft(),e.pingedLanes|=e.suspendedLanes&n,St===e&&(zt&n)===n&&(Nt===4||Nt===3&&(zt&130023424)===zt&&500>ht()-$c?En(e,0):Ec|=n),Kt(e,t)}function Vm(e,t){t===0&&(e.mode&1?(t=Ms,Ms<<=1,!(Ms&130023424)&&(Ms=4194304)):t=1);var n=Ft();e=Ur(e,t),e!==null&&(hs(e,t,n),Kt(e,n))}function Qg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Vm(e,n)}function Jg(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(re(314))}a!==null&&a.delete(t),Vm(e,n)}var Hm;Hm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Gt.current)Ht=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ht=!1,Fg(e,t,n);Ht=!!(e.flags&131072)}else Ht=!1,at&&t.flags&1048576&&Kp(t,yo,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;eo(e,t),e=t.pendingProps;var s=ca(t,At.current);sa(t,n),s=Nc(null,t,a,e,s,n);var o=_c();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Xt(a)?(o=!0,vo(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,bc(t),s.updater=Ko,t.stateNode=s,s._reactInternals=t,jl(t,a,e,n),t=Sl(null,t,a,!0,o,n)):(t.tag=0,at&&o&&pc(t),Ot(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch(eo(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=eh(a),e=gr(a,e),s){case 0:t=_l(null,t,a,e,n);break e;case 1:t=Hd(null,t,a,e,n);break e;case 11:t=Ud(null,t,a,e,n);break e;case 14:t=Vd(null,t,a,gr(a.type,e),n);break e}throw Error(re(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:gr(a,s),_l(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:gr(a,s),Hd(e,t,a,s,n);case 3:e:{if(Mm(t),e===null)throw Error(re(387));a=t.pendingProps,o=t.memoizedState,s=o.element,tm(e,t),jo(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=ma(Error(re(423)),t),t=Yd(e,t,a,n,s);break e}else if(a!==s){s=ma(Error(re(424)),t),t=Yd(e,t,a,n,s);break e}else for(Zt=ln(t.stateNode.containerInfo.firstChild),er=t,at=!0,xr=null,n=Zp(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(da(),a===s){t=Vr(e,t,n);break e}Ot(e,t,a,n)}t=t.child}return t;case 5:return rm(t),e===null&&yl(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,gl(a,s)?i=null:o!==null&&gl(a,o)&&(t.flags|=32),Cm(e,t),Ot(e,t,i,n),t.child;case 6:return e===null&&yl(t),null;case 13:return zm(e,t,n);case 4:return yc(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=ua(t,null,a,n):Ot(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:gr(a,s),Ud(e,t,a,s,n);case 7:return Ot(e,t,t.pendingProps,n),t.child;case 8:return Ot(e,t,t.pendingProps.children,n),t.child;case 12:return Ot(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,Je(wo,a._currentValue),a._currentValue=i,o!==null)if(wr(o.value,i)){if(o.children===s.children&&!Gt.current){t=Vr(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){i=o.child;for(var l=c.firstContext;l!==null;){if(l.context===a){if(o.tag===1){l=Dr(-1,n&-n),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?l.next=l:(l.next=m.next,m.next=l),d.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),wl(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(re(341));i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),wl(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}Ot(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,sa(t,n),s=dr(s),a=a(s),t.flags|=1,Ot(e,t,a,n),t.child;case 14:return a=t.type,s=gr(a,t.pendingProps),s=gr(a.type,s),Vd(e,t,a,s,n);case 15:return _m(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:gr(a,s),eo(e,t),t.tag=1,Xt(a)?(e=!0,vo(t)):e=!1,sa(t,n),km(t,a,s),jl(t,a,s,n),Sl(null,t,a,!0,e,n);case 19:return Em(e,t,n);case 22:return Sm(e,t,n)}throw Error(re(156,t.tag))};function Ym(e,t){return bp(e,t)}function Zg(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function lr(e,t,n,a){return new Zg(e,t,n,a)}function Ic(e){return e=e.prototype,!(!e||!e.isReactComponent)}function eh(e){if(typeof e=="function")return Ic(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ec)return 11;if(e===tc)return 14}return 2}function pn(e,t){var n=e.alternate;return n===null?(n=lr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function no(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")Ic(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Vn:return $n(n.children,s,o,t);case Zl:i=8,s|=8;break;case Gi:return e=lr(12,n,t,s|2),e.elementType=Gi,e.lanes=o,e;case Xi:return e=lr(13,n,t,s),e.elementType=Xi,e.lanes=o,e;case Ki:return e=lr(19,n,t,s),e.elementType=Ki,e.lanes=o,e;case rp:return Jo(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ep:i=10;break e;case tp:i=9;break e;case ec:i=11;break e;case tc:i=14;break e;case Qr:i=16,a=null;break e}throw Error(re(130,e==null?e:typeof e,""))}return t=lr(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function $n(e,t,n,a){return e=lr(7,e,a,t),e.lanes=n,e}function Jo(e,t,n,a){return e=lr(22,e,a,t),e.elementType=rp,e.lanes=n,e.stateNode={isHidden:!1},e}function $i(e,t,n){return e=lr(6,e,null,t),e.lanes=n,e}function Ti(e,t,n){return t=lr(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function th(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pi(0),this.expirationTimes=pi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pi(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Lc(e,t,n,a,s,o,i,c,l){return e=new th(e,t,n,c,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=lr(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bc(o),e}function rh(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Un,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function Gm(e){if(!e)return fn;e=e._reactInternals;e:{if(Dn(e)!==e||e.tag!==1)throw Error(re(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Xt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(re(171))}if(e.tag===1){var n=e.type;if(Xt(n))return Gp(e,n,t)}return t}function Xm(e,t,n,a,s,o,i,c,l){return e=Lc(n,a,!0,e,s,o,i,c,l),e.context=Gm(null),n=e.current,a=Ft(),s=un(n),o=Dr(a,s),o.callback=t??null,cn(n,o,s),e.current.lanes=s,hs(e,s,a),Kt(e,a),e}function Zo(e,t,n,a){var s=t.current,o=Ft(),i=un(s);return n=Gm(n),t.context===null?t.context=n:t.pendingContext=n,t=Dr(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=cn(s,t,i),e!==null&&(yr(e,s,i,o),Qs(e,s,i)),i}function $o(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ru(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ac(e,t){ru(e,t),(e=e.alternate)&&ru(e,t)}function nh(){return null}var Km=typeof reportError=="function"?reportError:function(e){console.error(e)};function Oc(e){this._internalRoot=e}ei.prototype.render=Oc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(re(409));Zo(e,t,null,null)};ei.prototype.unmount=Oc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;An(function(){Zo(null,e,null,null)}),t[Wr]=null}};function ei(e){this._internalRoot=e}ei.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<en.length&&t!==0&&t<en[n].priority;n++);en.splice(n,0,e),n===0&&Mp(e)}};function Fc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ti(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function nu(){}function ah(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=$o(i);o.call(d)}}var i=Xm(t,a,e,0,null,!1,!1,"",nu);return e._reactRootContainer=i,e[Wr]=i.current,rs(e.nodeType===8?e.parentNode:e),An(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var c=a;a=function(){var d=$o(l);c.call(d)}}var l=Lc(e,0,!1,null,null,!1,!1,"",nu);return e._reactRootContainer=l,e[Wr]=l.current,rs(e.nodeType===8?e.parentNode:e),An(function(){Zo(t,l,n,a)}),l}function ri(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var c=s;s=function(){var l=$o(i);c.call(l)}}Zo(t,i,e,s)}else i=ah(n,t,e,s,a);return $o(i)}Np=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Pa(t.pendingLanes);n!==0&&(ac(t,n|1),Kt(t,ht()),!(We&6)&&(fa=ht()+500,xn()))}break;case 13:An(function(){var a=Ur(e,1);if(a!==null){var s=Ft();yr(a,e,1,s)}}),Ac(e,1)}};sc=function(e){if(e.tag===13){var t=Ur(e,134217728);if(t!==null){var n=Ft();yr(t,e,134217728,n)}Ac(e,134217728)}};_p=function(e){if(e.tag===13){var t=un(e),n=Ur(e,t);if(n!==null){var a=Ft();yr(n,e,t,a)}Ac(e,t)}};Sp=function(){return Ge};Cp=function(e,t){var n=Ge;try{return Ge=e,t()}finally{Ge=n}};sl=function(e,t,n){switch(t){case"input":if(Ji(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=Yo(a);if(!s)throw Error(re(90));ap(a),Ji(a,s)}}}break;case"textarea":op(e,n);break;case"select":t=n.value,t!=null&&ta(e,!!n.multiple,t,!1)}};mp=Tc;fp=An;var sh={usingClientEntryPoint:!1,Events:[vs,Xn,Yo,up,pp,Tc]},Ca={findFiberByHostInstance:Sn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},oh={bundleType:Ca.bundleType,version:Ca.version,rendererPackageName:Ca.rendererPackageName,rendererConfig:Ca.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xp(e),e===null?null:e.stateNode},findFiberByHostInstance:Ca.findFiberByHostInstance||nh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fs.isDisabled&&Fs.supportsFiber)try{Wo=Fs.inject(oh),Mr=Fs}catch{}}rr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sh;rr.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fc(t))throw Error(re(200));return rh(e,t,null,n)};rr.createRoot=function(e,t){if(!Fc(e))throw Error(re(299));var n=!1,a="",s=Km;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Lc(e,1,!1,null,null,n,!1,a,s),e[Wr]=t.current,rs(e.nodeType===8?e.parentNode:e),new Oc(t)};rr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(re(188)):(e=Object.keys(e).join(","),Error(re(268,e)));return e=xp(t),e=e===null?null:e.stateNode,e};rr.flushSync=function(e){return An(e)};rr.hydrate=function(e,t,n){if(!ti(t))throw Error(re(200));return ri(null,e,t,!0,n)};rr.hydrateRoot=function(e,t,n){if(!Fc(e))throw Error(re(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=Km;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Xm(t,null,e,1,n??null,s,!1,o,i),e[Wr]=t.current,rs(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new ei(t)};rr.render=function(e,t,n){if(!ti(t))throw Error(re(200));return ri(null,e,t,!1,n)};rr.unmountComponentAtNode=function(e){if(!ti(e))throw Error(re(40));return e._reactRootContainer?(An(function(){ri(null,null,e,!1,function(){e._reactRootContainer=null,e[Wr]=null})}),!0):!1};rr.unstable_batchedUpdates=Tc;rr.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!ti(n))throw Error(re(200));if(e==null||e._reactInternals===void 0)throw Error(re(38));return ri(e,t,n,!1,a)};rr.version="18.3.1-next-f1338f8080-20240426";function qm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qm)}catch(e){console.error(e)}}qm(),qu.exports=rr;var Dc=qu.exports,au=Dc;Hi.createRoot=au.createRoot,Hi.hydrateRoot=au.hydrateRoot;const Pi={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.tasks":"Tasks","nav.settings":"Settings","nav.more":"More","tasks.title":"PVE task / VM operation history","tasks.subtitle":"Real PVE-side actions (qmstart / shutdown / snapshot / migrate / backup / etc.)","tasks.filter.cluster":"Cluster","tasks.filter.type":"Type","tasks.filter.status":"Status","tasks.filter.user":"User","tasks.filter.vmid":"VMID","tasks.filter.all":"All","tasks.filter.running":"Running","tasks.filter.ok":"Success","tasks.filter.error":"Error","tasks.col.starttime":"Started","tasks.col.duration":"Duration","tasks.col.type":"Type","tasks.col.target":"Target","tasks.col.user":"User","tasks.col.node":"Node","tasks.col.status":"Status","tasks.refresh":"Refresh","tasks.auto_refresh":"Auto","tasks.empty":"No tasks match the filters","tasks.loading":"Loading…","tasks.log_title":"Task log","tasks.log_loading":"Loading log…","tasks.log_empty":"No log output","tasks.copy_upid":"Copy UPID","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.task_history":"Task history","vm.start":"Start","vm.shutdown_acpi":"Shutdown","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.user_admin":"User management","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","matrix.bulk.select_all":"Select all","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.manage":"Manage","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.saving":"Saving…","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.tasks":"作業","nav.settings":"設定","nav.more":"更多","tasks.title":"PVE 作業 / VM 操作紀錄","tasks.subtitle":"PVE 端真實作業（qmstart / shutdown / 快照 / 遷移 / 備份 等）","tasks.filter.cluster":"叢集","tasks.filter.type":"類型","tasks.filter.status":"狀態","tasks.filter.user":"使用者","tasks.filter.vmid":"VMID","tasks.filter.all":"全部","tasks.filter.running":"進行中","tasks.filter.ok":"成功","tasks.filter.error":"錯誤","tasks.col.starttime":"開始時間","tasks.col.duration":"耗時","tasks.col.type":"類型","tasks.col.target":"對象","tasks.col.user":"使用者","tasks.col.node":"節點","tasks.col.status":"狀態","tasks.refresh":"重新整理","tasks.auto_refresh":"自動","tasks.empty":"沒有符合條件的作業","tasks.loading":"載入中…","tasks.log_title":"作業紀錄","tasks.log_loading":"載入紀錄中…","tasks.log_empty":"沒有日誌輸出","tasks.copy_upid":"複製 UPID","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.task_history":"作業紀錄","vm.start":"啟動","vm.shutdown_acpi":"關機","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.user_admin":"使用者管理","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","matrix.bulk.select_all":"全選","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.manage":"管理","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.saving":"儲存中…","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},Qm=u.createContext(null);function ih({children:e}){const[t,n]=u.useState(()=>{const o=localStorage.getItem("language");return o&&Pi[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=u.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=u.useCallback((o,i)=>{let c=Pi[t][o]||Pi.en[o]||o;return i&&Object.entries(i).forEach(([l,d])=>{c=c.replace(`{${l}}`,String(d))}),c},[t]);return r.jsx(Qm.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Be(){const e=u.useContext(Qm);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const Jm=u.createContext(null);function Gr(){const e=u.useContext(Jm);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,n)=>Promise.resolve(window.prompt(t,(n==null?void 0:n.defaultValue)??""))})}function lh({children:e}){const{t}=Be(),[n,a]=u.useState(null),[s,o]=u.useState(""),i=u.useRef(null),c=u.useCallback(f=>{n&&(n.resolve(f),a(null),o(""))},[n]),l=u.useCallback((f,p={})=>new Promise(v=>{a({kind:"alert",title:p.title||t("dialog.notice"),body:f,destructive:!!p.destructive,inputType:"text",placeholder:"",resolve:()=>v()})}),[t]),d=u.useCallback((f,p={})=>new Promise(v=>{a({kind:"confirm",title:p.title||t("dialog.confirm"),body:f,destructive:!!p.destructive,inputType:"text",placeholder:"",resolve:b=>v(!!b)})}),[t]),m=u.useCallback((f,p={})=>new Promise(v=>{o(p.defaultValue||""),a({kind:"prompt",title:p.title||t("dialog.input"),body:f,destructive:!!p.destructive,inputType:p.inputType||"text",placeholder:p.placeholder||"",resolve:b=>v(b===null?null:String(b))})}),[t]);return u.useEffect(()=>{if(!n)return;const f=p=>{p.key==="Escape"?c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):p.key==="Enter"&&n.kind!=="alert"?(p.preventDefault(),c(n.kind==="prompt"?s:!0)):p.key==="Enter"&&n.kind==="alert"&&c(void 0)};return document.addEventListener("keydown",f),n.kind==="prompt"&&setTimeout(()=>{var p;return(p=i.current)==null?void 0:p.focus()},50),()=>document.removeEventListener("keydown",f)},[n,s,c]),r.jsxs(Jm.Provider,{value:{alert:l,confirm:d,prompt:m},children:[e,n&&r.jsxs("div",{onClick:()=>c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:ch,children:[r.jsx("style",{children:dh}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:f=>o(f.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>c(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>c(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const ch={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},dh=`
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
`;function uh(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,c=u.useRef(null),l=u.useRef(null),d=u.useRef(null),m=u.useRef(t),[f,p]=u.useState({connected:!1,connecting:!1,lastMessageTime:0});m.current=t;const v=u.useCallback(()=>{const x=window.location.protocol==="https:"?"wss:":"ws:",g=window.location.host;return`${x}//${g}/ws`},[]),b=u.useCallback(()=>{var g;if(((g=c.current)==null?void 0:g.readyState)===WebSocket.OPEN)return;p(h=>({...h,connecting:!0}));const x=new WebSocket(v());c.current=x,x.onopen=()=>{p({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{x.readyState===WebSocket.OPEN&&x.send(JSON.stringify({type:"ping"}))},i)},x.onmessage=h=>{var N;try{const S=JSON.parse(h.data);p($=>({...$,lastMessageTime:Date.now()})),(S.type==="initial"||S.type==="update")&&(N=S.data)!=null&&N.clusters&&m.current&&m.current(S.data.clusters)}catch(S){console.error("[WS] Failed to parse message:",S)}},x.onerror=h=>{console.error("[WS] Error:",h),s==null||s(h)},x.onclose=()=>{p(h=>({...h,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{b()},o)}},[v,n,a,s,o,i]),w=u.useCallback(()=>{l.current&&(clearTimeout(l.current),l.current=null),d.current&&(clearInterval(d.current),d.current=null),c.current&&(c.current.close(),c.current=null)},[]),C=u.useCallback(x=>{var g;((g=c.current)==null?void 0:g.readyState)===WebSocket.OPEN&&c.current.send(JSON.stringify(x))},[]);return u.useEffect(()=>(b(),()=>{w()}),[b,w]),u.useEffect(()=>{const x=setInterval(()=>{const h=Date.now()-f.lastMessageTime;f.connected&&h>15e3&&(w(),b())},5e3);return()=>clearInterval(x)},[f.connected,f.lastMessageTime,b,w]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:C,reconnect:b,disconnect:w}}const ph="/api";async function Re(e,t){const n=await fetch(`${ph}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const De={authMe:()=>Re("/auth/me"),authLogin:(e,t)=>Re("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Re("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Re("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Re("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Re("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Re("/config"),updateConfig:e=>Re("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Re("/clusters"),getCluster:e=>Re(`/clusters/${e}`),getSummary:()=>Re("/summary"),getNodes:e=>Re(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Re(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Re(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Re(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Re("/health"),vmAction:(e,t,n,a)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?De.ctAction(e,t,n,s):De.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>Re(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>Re(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>Re(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>Re(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>Re(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>Re("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>Re(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>Re(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Ie(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function st(e,t=1){return`${e.toFixed(t)}%`}function ni(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function Ce(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function Ol(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function mh({value:e,suffix:t="",className:n=""}){const a=v=>{if(typeof v=="number")return{left:v,isRatio:!1};const b=String(v).match(/^(\d+)\/(\d+)$/);if(b)return{left:parseInt(b[1]),right:parseInt(b[2]),isRatio:!0};const w=parseFloat(String(v));return isNaN(w)?{left:0,isRatio:!1}:{left:w,isRatio:!1}},s=a(e),[o,i]=u.useState(0),[c,l]=u.useState(s.right||0),d=u.useRef(null),m=u.useRef(0),f=u.useRef(!0);u.useEffect(()=>{const v=a(e);if(!f.current){i(v.left),v.right!==void 0&&l(v.right);return}const b=800,w=0,C=0;f.current=!1,d.current=null;const x=g=>{d.current||(d.current=g);const h=g-d.current,N=Math.min(h/b,1),S=1-Math.pow(1-N,3),$=w+(v.left-w)*S;if(i(Math.round($)),v.isRatio&&v.right!==void 0){const E=C+(v.right-C)*S;l(Math.round(E))}N<1?m.current=requestAnimationFrame(x):(i(v.left),v.right!==void 0&&l(v.right))};return m.current=requestAnimationFrame(x),()=>{m.current&&cancelAnimationFrame(m.current)}},[e]);const p=s.isRatio?`${o}/${c}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[p,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function su({value:e,decimals:t=0,className:n=""}){const[a,s]=u.useState(0),o=u.useRef(null),i=u.useRef(0),c=u.useRef(!0);return u.useEffect(()=>{if(!c.current){s(e);return}const l=800,d=0;c.current=!1,o.current=null;const m=f=>{o.current||(o.current=f);const p=f-o.current,v=Math.min(p/l,1),b=1-Math.pow(1-v,3),w=d+(e-d)*b;s(w),v<1?i.current=requestAnimationFrame(m):s(e)};return i.current=requestAnimationFrame(m),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function Ri({left:e,right:t,className:n=""}){const[a,s]=u.useState(0),[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{if(!d.current){s(e),i(t);return}const m=800,f=0,p=0;d.current=!1,c.current=null;const v=b=>{c.current||(c.current=b);const w=b-c.current,C=Math.min(w/m,1),x=1-Math.pow(1-C,3);s(Math.round(f+(e-f)*x)),i(Math.round(p+(t-p)*x)),C<1?l.current=requestAnimationFrame(v):(s(e),i(t))};return l.current=requestAnimationFrame(v),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Ds({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(mh,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function Ii({value:e,label:t,color:n,size:a=100}){const[s,o]=u.useState(0),i=u.useRef(null),c=u.useRef(0),l=u.useRef(!0);u.useEffect(()=>{if(!l.current){o(e);return}const C=1e3,x=0;l.current=!1,i.current=null;const g=h=>{i.current||(i.current=h);const N=h-i.current,S=Math.min(N/C,1),$=1-Math.pow(1-S,3),E=x+(e-x)*$;o(E),S<1?c.current=requestAnimationFrame(g):o(e)};return c.current=requestAnimationFrame(g),()=>{c.current&&cancelAnimationFrame(c.current)}},[e]);const d=5,m=(a-d*4)/2-8,f=(a-d)/2,p=m+(f-m)/2,v=2*Math.PI*p,b=v-s/100*v,w=Array.from({length:36},(C,x)=>{const g=(x*10-90)*(Math.PI/180),h=x%3===0,N=h?6:3,S=f-2,$=S-N;return{x1:a/2+Math.cos(g)*S,y1:a/2+Math.sin(g)*S,x2:a/2+Math.cos(g)*$,y2:a/2+Math.sin(g)*$,isMajor:h}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:f,strokeWidth:1}),w.map((C,x)=>r.jsx("line",{x1:C.x1,y1:C.y1,x2:C.x2,y2:C.y2,className:`ring-tick ${C.isMajor?"major":""}`},x)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:p,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:m,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:p,strokeWidth:d,strokeDasharray:v,strokeDashoffset:b,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-p-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function fh({cluster:e,onClick:t}){var l,d;const{t:n}=Be(),a=e.summary;if(!a)return null;const s=Ce(a.total_cpu_usage),o=Ce(a.total_memory_usage),i=a.alerts_warning>0,c=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${c?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(su,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(su,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ri,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ri,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Ri,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((l=a.ceph_health)==null?void 0:l.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function ou({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=Be(),o=u.useMemo(()=>Object.entries(e),[e]),i=u.useMemo(()=>{let c=0,l=0,d=0,m=0;return Object.values(e).forEach(f=>{f.summary&&(c+=f.summary.total_cpu_usage||0,l+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,m++)}),{avgCpu:m>0?c/m:0,avgMem:m>0?l/m:0,avgStorage:m>0?d/m:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(Ii,{value:i.avgCpu,label:s("metric.cpu"),color:Ce(i.avgCpu),size:110}),r.jsx(Ii,{value:i.avgMem,label:s("metric.memory"),color:Ce(i.avgMem),size:110}),r.jsx(Ii,{value:i.avgStorage,label:s("metric.disk"),color:Ce(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(Ds,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(Ds,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(Ds,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(Ds,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([c,l])=>r.jsx(fh,{cluster:l,onClick:()=>n(c)},c))})})]})]}),r.jsx("style",{children:`
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
      `})]})}function gh(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const c=(o-.08)/.14;i+=s*.2*Math.sin(c*Math.PI)}if(o>.24&&o<.4){const c=(o-.24)/.16;if(c<.2)i-=s*.15*Math.sin(c*5*Math.PI);else if(c<.5){const l=(c-.2)/.3;i+=s*(1+a*.5)*Math.sin(l*Math.PI)}else if(c<.7){const l=(c-.5)/.2;i-=s*.25*Math.sin(l*Math.PI)}}if(o>.48&&o<.72){const c=(o-.48)/.24;i+=s*.35*Math.sin(c*Math.PI)}return i*n}function Li({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const c=u.useRef(null),l=u.useRef(null),d=u.useRef([]),m=u.useRef(0),f=u.useRef(0),p=u.useRef(0),v=u.useRef(0),b=u.useRef(!i),w=u.useRef(!1),x=6e4/(50+e/100*50),g=12;u.useEffect(()=>{b.current=!i},[i]);const h=u.useCallback(()=>{const S=l.current;if(!S)return;S.fillStyle="rgba(5, 8, 15, 0.95)",S.fillRect(0,0,s,o),S.strokeStyle="rgba(0, 240, 255, 0.08)",S.lineWidth=.5;for(let F=0;F<o;F+=10)S.beginPath(),S.moveTo(0,F),S.lineTo(s,F),S.stroke();for(let F=0;F<s;F+=10)S.beginPath(),S.moveTo(F,0),S.lineTo(F,o),S.stroke();const $=o/2,E=o*.45,U=!a||e>90?"#ff0040":e>70?"#ff6b00":n;S.shadowColor=U,S.shadowBlur=6,S.strokeStyle=U,S.lineWidth=1.5,S.lineCap="round",S.lineJoin="round",S.beginPath();let V=!1;for(let F=0;F<s;F++){const ee=(F-m.current+s)%s;if(ee<8&&ee>0)continue;const B=$-d.current[F]*E;V?S.lineTo(F,B):(S.moveTo(F,B),V=!0)}S.stroke(),S.shadowBlur=0,S.strokeStyle=`${U}60`,S.lineWidth=2,S.beginPath(),S.moveTo(m.current,0),S.lineTo(m.current,o),S.stroke();const A=S.createLinearGradient(m.current-15,0,m.current,0);A.addColorStop(0,"transparent"),A.addColorStop(1,`${U}30`),S.fillStyle=A,S.fillRect(m.current-15,0,15,o)},[s,o,e,a,n]);u.useEffect(()=>{const S=c.current;if(!S)return;const $=S.getContext("2d");if(!$)return;const E=window.devicePixelRatio||1;S.width=s*E,S.height=o*E,$.scale(E,E),l.current=$,d.current.length!==s&&(d.current=new Array(s).fill(0)),w.current=!0,h()},[s,o,h]),u.useEffect(()=>{if(!w.current||!l.current)return;const $=E=>{v.current||(v.current=E);const z=E-v.current;v.current=E;const U=z/1e3*g;f.current+=z/x,f.current>=1&&(f.current-=1);const V=Math.ceil(U);for(let A=0;A<V;A++){const ee=(f.current+A/V*(z/x))%1;let B;a?B=gh(e,ee,1):B=(Math.random()-.5)*.01,m.current=(m.current+1)%s,d.current[m.current]=B;const P=(m.current+1)%s;for(let q=0;q<8;q++){const T=(P+q)%s;d.current[T]=0}}h(),b.current&&(p.current=requestAnimationFrame($))};return i||(v.current=0,p.current=requestAnimationFrame($)),()=>{cancelAnimationFrame(p.current)}},[s,o,e,a,x,g,i,h]);const N=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:N()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:N()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:c,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function hh({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=u.useRef(null),[i,c]=u.useState(180);return u.useEffect(()=>{const l=o.current;if(!l)return;const d=()=>{const f=l.clientWidth-6;f>0&&c(f)};d();const m=new ResizeObserver(d);return m.observe(l),()=>m.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(Li,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Li,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Li,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}function iu(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function lu({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{const m=d.current?0:o;d.current=!1,c.current=null;const f=p=>{c.current||(c.current=p);const v=p-c.current,b=Math.min(v/a,1),w=1-Math.pow(1-b,3),C=m+(e-m)*w;i(C),b<1?l.current=requestAnimationFrame(f):i(e)};return l.current=requestAnimationFrame(f),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function cu({left:e,right:t,className:n=""}){const[a,s]=u.useState(0),[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{const f=d.current?0:a,p=d.current?0:o;d.current=!1,c.current=null;const v=b=>{c.current||(c.current=b);const w=b-c.current,C=Math.min(w/800,1),x=1-Math.pow(1-C,3);s(Math.round(f+(e-f)*x)),i(Math.round(p+(t-p)*x)),C<1?l.current=requestAnimationFrame(v):(s(e),i(t))};return l.current=requestAnimationFrame(v),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function xh(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function vh(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function bh({state:e,onClose:t,onShowDetails:n,getNodeHealth:a}){const{t:s}=Be();if(u.useEffect(()=>{const f=()=>t(),p=()=>t(),v=b=>{b.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",p,!0),document.addEventListener("keydown",v)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",p,!0),document.removeEventListener("keydown",v)}},[e.visible,t]),!e.visible||!e.node)return null;const o=e.node,i=o.status==="online",c=a(e.clusterId,o.node),l=c?`https://${c.host}:${c.port}/#v1:0:=node/${o.node}`:null,d=f=>{f.stopPropagation(),l&&window.open(l,"_blank","noopener,noreferrer"),t()},m=f=>{f.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${i?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:o.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:m,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:s("vm.details")})]}),l&&r.jsxs("button",{className:"context-menu-item",onClick:d,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:s("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("node.status"),":"]}),r.jsx("span",{className:i?"text-success":"text-danger",children:i?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.cpu"),":"]}),r.jsxs("span",{children:[o.cpu.cores," ",s("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.memory"),":"]}),r.jsx("span",{children:Ie(o.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.vms_short"),":"]}),r.jsx("span",{children:o.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.cts_short"),":"]}),r.jsx("span",{children:o.ct_count})]})]})]})}function yh({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=Ce(s),i=.3+s/100*.7,[c,l]=u.useState(0),d=u.useRef(null),m=u.useRef(0),f=u.useRef(!0);return u.useEffect(()=>{const v=f.current?0:c;f.current=!1,d.current=null;const b=w=>{d.current||(d.current=w);const C=w-d.current,x=Math.min(C/1e3,1),g=1-Math.pow(1-x,3),h=v+(s-v)*g;l(h),x<1?m.current=requestAnimationFrame(b):l(s)};return m.current=requestAnimationFrame(b),()=>{m.current&&cancelAnimationFrame(m.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[c.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function wh({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){Ce(e.cpu.usage_percent),Ce(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx(hh,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:ni(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function kh({node:e,storages:t,onClose:n}){const{t:a}=Be(),s=e.status==="online",o=e.cpu.usage_percent,i=e.memory.used_bytes/e.memory.total_bytes*100,c=e.disk.used_bytes/e.disk.total_bytes*100;return r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:l=>l.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:s?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:vh(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:xh(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:ni(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${Ce(o)}`,children:st(o,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Ce(o)}`,style:{width:`${o}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${iu(e.cpu.iowait)}`,children:st(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${iu(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${Ce(i)}`,children:st(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Ce(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ie(e.memory.used_bytes)," / ",Ie(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${Ce(c)}`,children:st(c,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Ce(c)}`,style:{width:`${c}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ie(e.disk.used_bytes)," / ",Ie(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Ie(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Ie(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(l=>{const d=l.disk.used_bytes/l.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${l.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:l.storage}),r.jsx("span",{className:"storage-type",children:l.type}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${Ce(d)}`,style:{width:`${d}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Ie(l.disk.used_bytes)," / ",Ie(l.disk.total_bytes)]}),r.jsx("span",{className:`text-${Ce(d)}`,children:st(d,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...l.content].sort().map(m=>r.jsx("span",{className:"content-label",children:m},m))})]},l.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function jh({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Be(),[i,c]=u.useState(null),[l,d]=u.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),m=!e&&t&&Object.keys(t).length>0,f=u.useCallback((h,N)=>{var S;return e&&e.client_health?e.client_health[N]||null:t&&((S=t[h])!=null&&S.client_health)&&t[h].client_health[N]||null},[e,t]),p=u.useCallback((h,N,S)=>{h.preventDefault(),h.stopPropagation();const $=Math.min(h.clientX,window.innerWidth-250),E=Math.min(h.clientY,window.innerHeight-280);d({visible:!0,x:$,y:E,node:N,clusterId:S})},[]),v=u.useCallback(()=>{d(h=>({...h,visible:!1}))},[]),b=u.useMemo(()=>{var N,S,$,E,z;const h=[];if(m)Object.entries(t).forEach(([U,V])=>{var F,ee,B,P,q;const A=Object.values(V.nodes);if(A.length>0){const T=A.reduce((W,G)=>W+G.cpu.usage_percent,0)/A.length,D=A.reduce((W,G)=>G.memory.total_bytes===0?W:W+G.memory.used_bytes/G.memory.total_bytes*100,0)/A.length;h.push({clusterId:U,clusterName:V.name||U,clusterNodes:A,isStandalone:((F=V.summary)==null?void 0:F.is_standalone)||!1,avgCpu:T,avgMem:D,vmsRunning:((ee=V.summary)==null?void 0:ee.vms_running)||0,ctsRunning:((B=V.summary)==null?void 0:B.cts_running)||0,vmCount:((P=V.summary)==null?void 0:P.vm_count)||0,ctCount:((q=V.summary)==null?void 0:q.ct_count)||0})}});else if(e){const U=Object.values(e.nodes),V=U.length>0?U.reduce((F,ee)=>F+ee.cpu.usage_percent,0)/U.length:0,A=U.length>0?U.reduce((F,ee)=>ee.memory.total_bytes===0?F:F+ee.memory.used_bytes/ee.memory.total_bytes*100,0)/U.length:0;h.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:U,isStandalone:((N=e.summary)==null?void 0:N.is_standalone)||!1,avgCpu:V,avgMem:A,vmsRunning:((S=e.summary)==null?void 0:S.vms_running)||0,ctsRunning:(($=e.summary)==null?void 0:$.cts_running)||0,vmCount:((E=e.summary)==null?void 0:E.vm_count)||0,ctCount:((z=e.summary)==null?void 0:z.ct_count)||0})}return h},[e,t,m]),w=b.flatMap(h=>h.clusterNodes);u.useMemo(()=>w.length===0?0:w.reduce((h,N)=>h+N.cpu.usage_percent,0)/w.length,[w]),u.useMemo(()=>w.length===0?0:w.reduce((h,N)=>N.memory.total_bytes===0?h:h+N.memory.used_bytes/N.memory.total_bytes*100,0)/w.length,[w]);let C=null,x=[];if(i){const[h,N]=i.split("/");if(m&&t){const S=t[h];S&&(C=S.nodes[N]||null,x=Object.values(S.storages).filter($=>$.node===N))}else e&&(C=e.nodes[N]||null,x=Object.values(e.storages).filter(S=>S.node===N))}if(!e&&!m)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const g=m?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),g]})}),r.jsx("div",{className:"cluster-sections",children:b.map(h=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(h.clusterId),title:a?o("cluster.view_vms_in",{name:h.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:h.clusterName}),h.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[h.clusterNodes.filter(N=>N.status==="online").length,"/",h.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(yh,{cpuUsage:h.avgCpu,memUsage:h.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:h.clusterNodes.map(N=>r.jsx(wh,{node:N,onClick:()=>c(`${h.clusterId}/${N.node}`),onContextMenu:S=>p(S,N,h.clusterId),isPaused:s},`${h.clusterId}-${N.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${Ce(h.avgCpu)}`,style:{width:`${h.avgCpu}%`}})}),r.jsx(lu,{value:h.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${Ce(h.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${Ce(h.avgMem)}`,style:{width:`${h.avgMem}%`}})}),r.jsx(lu,{value:h.avgMem,decimals:0,suffix:"%",className:`mini-value text-${Ce(h.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(cu,{left:h.vmsRunning,right:h.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(cu,{left:h.ctsRunning,right:h.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},h.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),C&&r.jsx(kh,{node:C,storages:x,onClose:()=>c(null)}),r.jsx(bh,{state:l,onClose:v,onShowDetails:()=>{l.node&&c(`${l.clusterId}/${l.node.node}`)},getNodeHealth:f}),r.jsx("style",{children:`
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
      `})]})}function Zm({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:c,getNodeHealth:l,userRole:d,consoleMode:m,consolePasswordSet:f,hideSnapshots:p,hideBackup:v,hideRemoteMigrate:b,hideConsole:w}){const{t:C}=Be(),x=Gr();if(u.useEffect(()=>{const z=()=>t(),U=()=>t(),V=A=>{A.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",z),document.addEventListener("scroll",U,!0),document.addEventListener("keydown",V)),()=>{document.removeEventListener("click",z),document.removeEventListener("scroll",U,!0),document.removeEventListener("keydown",V)}},[e.visible,t]),!e.visible||!e.vm)return null;const g=e.vm,h=l(e.clusterId,g.node),N=h?`https://${h.host}:${h.port}/#v1:0:=${g.type}/${g.vmid}`:null,S=z=>{z.stopPropagation(),N&&window.open(N,"_blank","noopener,noreferrer"),t()},$=z=>{z.stopPropagation(),n(),t()},E=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:z=>z.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:g.name}),r.jsxs("span",{className:"context-menu-id",children:["#",g.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:$,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:C("vm.details")})]}),N&&r.jsxs("button",{className:"context-menu-item",onClick:S,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:C("vm.open_pve")})]}),!w&&(d==="operator"||d==="admin")&&(()=>{const z=m==="disabled"?"console.disabled":g.status!=="running"?"console.vm_not_running":null,U=!!z;return r.jsxs("button",{className:`context-menu-item ${U?"is-disabled":""}`,title:U?C(z):void 0,onClick:V=>{if(V.stopPropagation(),U){t(),x.alert(C(z));return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:C("vm.console")})]})})(),!p&&(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:C("vm.snapshots")})]}),r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation();const U=`/tasks?vmid=${encodeURIComponent(String(g.vmid))}&cluster=${encodeURIComponent(e.clusterId)}`;window.history.pushState(null,"",U),window.dispatchEvent(new PopStateEvent("popstate")),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"})]}),r.jsx("span",{children:C("vm.task_history")})]}),!v&&(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:C("vm.backup_now")})]}),(d==="operator"||d==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),g.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),a({vm:g,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:C("vm.start")})]}),g.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),a({vm:g,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:C("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),a({vm:g,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:C("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:z=>{z.stopPropagation(),a({vm:g,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:C("vm.stop_hard")})]})]})]}),!b&&d==="admin"&&g.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:z=>{z.stopPropagation(),c(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:C("vm.migrate_remote")})]})]}),r.jsx("style",{children:`
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
      `})]});return Dc.createPortal(E,document.body)}const Nh={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function _h(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Sh({task:e}){const t=Nh[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=_h(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:Ch})]})}const Ch=`
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
`;function Mh({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:c,onCancel:l}){const[d,m]=Bo.useState(""),f=u.useRef(null),p=u.useRef(null);if(u.useEffect(()=>{e&&(m(""),setTimeout(()=>{var b,w;a?(b=p.current)==null||b.focus():(w=f.current)==null||w.focus()},50))},[e,a]),u.useEffect(()=>{if(!e)return;const b=w=>{w.key==="Escape"&&(w.preventDefault(),l()),w.key==="Enter"&&(!a||d===a)&&(w.preventDefault(),c())};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,d,a,c,l]),!e)return null;const v=!a||d===a;return r.jsxs("div",{onClick:l,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:b=>b.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:p,className:"cm-input",type:"text",value:d,onChange:b=>m(b.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:l,children:i}),r.jsx("button",{ref:f,className:`cm-btn confirm ${s?"danger":""}`,disabled:!v,onClick:c,children:o})]})]})]})}function Ia({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,c]=u.useState(!1),[l,d]=u.useState(-1),m=u.useRef(null),f=u.useRef(null),p=u.useId(),v=t.find(x=>x.value===e);u.useEffect(()=>{if(!i)return;const x=h=>{var E,z;const N=h.target,S=(E=m.current)==null?void 0:E.contains(N),$=(z=f.current)==null?void 0:z.contains(N);!S&&!$&&c(!1)},g=h=>{if(h.key==="Escape"){c(!1);return}if(h.key==="ArrowDown")h.preventDefault(),d(N=>Math.min(t.length-1,N<0?0:N+1));else if(h.key==="ArrowUp")h.preventDefault(),d(N=>Math.max(0,N-1));else if(h.key==="Enter"){h.preventDefault();const N=t[l];N&&!N.disabled&&(n(N.value),c(!1))}};return document.addEventListener("mousedown",x),document.addEventListener("keydown",g),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("keydown",g)}},[i,l,t,n]);const b=()=>{o||(c(x=>!x),d(t.findIndex(x=>x.value===e)))},[w,C]=u.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return u.useLayoutEffect(()=>{if(!i)return;const x=()=>{var U;const g=(U=m.current)==null?void 0:U.getBoundingClientRect();if(!g)return;const h=6,N=320,S=window.innerHeight-g.bottom-h-8,$=g.top-h-8,E=S<160&&$>S+40,z=Math.max(120,Math.min(N,E?$:S));C({left:g.left,top:E?g.top-h:g.bottom+h,width:g.width,flipUp:E,maxH:z})};return x(),window.addEventListener("resize",x),window.addEventListener("scroll",x,!0),()=>{window.removeEventListener("resize",x),window.removeEventListener("scroll",x,!0)}},[i]),r.jsxs("div",{ref:m,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:zh}),r.jsxs("button",{type:"button",id:p,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:b,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:v?v.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&Dc.createPortal(r.jsx("div",{ref:f,className:"cyber-select-list",role:"listbox",style:{left:w.left,width:w.width,...w.flipUp?{bottom:window.innerHeight-w.top,top:"auto"}:{top:w.top},maxHeight:w.maxH},children:t.map((x,g)=>r.jsxs("div",{role:"option","aria-selected":x.value===e,"aria-disabled":x.disabled||void 0,className:`cyber-select-opt ${x.value===e?"selected":""} ${g===l?"hover":""} ${x.disabled?"disabled":""}`,onMouseEnter:()=>d(g),onClick:()=>{x.disabled||(n(x.value),c(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:x.label}),x.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:x.hint}),x.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},x.value))}),document.body)]})}const zh=`
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
`,Eh=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function e0({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=Be(),[i,c]=u.useState("endpoint"),[l,d]=u.useState([]),[m,f]=u.useState(""),[p,v]=u.useState(""),[b,w]=u.useState(!1),[C,x]=u.useState(null),[g,h]=u.useState(null),[N,S]=u.useState(!1),[$,E]=u.useState({}),[z,U]=u.useState({}),[V,A]=u.useState(""),[F,ee]=u.useState(""),[B,P]=u.useState(!0),[q,T]=u.useState(!1),[D,W]=u.useState(""),[G,ne]=u.useState(""),[k,je]=u.useState(""),[Y,Me]=u.useState(null),[ae,xe]=u.useState(!1),ke=async()=>{if(!(!n||!te)){xe(!0),Me(null),ne("");try{const O=await De.migrationPrecheck(t,n.vmid,te.cluster_id,te.node_name||te.node_host);Me({ok:O.ok,blockers:O.blockers,warnings:O.warnings})}catch(O){const le=O instanceof Error?O.message:String(O);ne(`pre-flight check failed: ${le}`)}finally{xe(!1)}}};u.useEffect(()=>{e&&(c("endpoint"),d([]),f(""),v(""),x(null),h(null),E({}),U({}),A(""),ee(n?String(n.vmid):""),W(""),ne(""),je(""),Me(null),De.listRemoteEndpoints(t).then(O=>d(O.endpoints)).catch(O=>ne(`could not list target clusters: ${O.message||O}`)),n&&De.getMigrationSource(t,n.vmid).then(x).catch(O=>ne(`could not introspect source VM: ${O.message||O}`)))},[e,t,n]),u.useEffect(()=>{if(!e)return;const O=le=>{le.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[e,i,a]);const te=l.find(O=>Ai(O)===m),de=async O=>{var he;f(O);const le=l.find(ue=>Ai(ue)===O);if(le){w(!0),S(!0),ne(""),h(null),A("");try{const ue=await De.fetchRemoteFingerprint(le.node_host,le.node_port);v(ue.fingerprint)}catch(ue){const ye=ue instanceof Error?ue.message:String(ue);ne(`could not auto-fetch fingerprint (${ye}); paste manually`),v("")}finally{w(!1)}try{const ue=le.node_name||le.node_host,ye=await De.getMigrationTargets(le.cluster_id,ue);h(ye);const Oe=ye.ips.find(Ne=>Ne.address===le.node_host);A(Oe?Oe.address:((he=ye.ips[0])==null?void 0:he.address)||le.node_host)}catch(ue){const ye=ue instanceof Error?ue.message:String(ue);ne(`could not enumerate target node resources: ${ye}`)}finally{S(!1)}}};u.useEffect(()=>{!C||!g||(E(O=>{const le={...O};return C.disks.forEach(he=>{var ue;if(!le[he.key]){const ye=g.storages.find(Oe=>Oe.storage===he.storage);le[he.key]=((ue=ye||g.storages[0])==null?void 0:ue.storage)||""}}),le}),U(O=>{const le={...O};return C.nics.forEach(he=>{var ue;if(!le[he.key]){const ye=g.bridges.find(Oe=>Oe.iface===he.bridge);le[he.key]=((ue=ye||g.bridges[0])==null?void 0:ue.iface)||""}}),le}))},[C,g]);const R=u.useMemo(()=>{if(!C)return"";const O=new Set,le=new Map;return C.disks.forEach(he=>{const ue=$[he.key];he.storage&&ue&&(le.set(he.storage,ue),O.add(ue))}),O.size===1?Array.from(O)[0]:Array.from(le.entries()).map(([he,ue])=>`${he}=${ue}`).join(",")},[C,$]),j=u.useMemo(()=>{if(!C)return"";const O=new Set,le=new Map;return C.nics.forEach(he=>{const ue=z[he.key];he.bridge&&ue&&(le.set(he.bridge,ue),O.add(ue))}),O.size===1?Array.from(O)[0]:Array.from(le.entries()).map(([he,ue])=>`${he}=${ue}`).join(",")},[C,z]),Q=async()=>{if(!(!n||!te)){c("submitting"),ne("");try{const O=await De.remoteMigrate(t,n.vmid,{target_cluster_id:te.cluster_id,target_endpoint_host:V||te.node_host,target_endpoint_port:te.node_port,target_endpoint_fingerprint:p||void 0,target_vmid:parseInt(F,10),target_bridge_map:j,target_storage_map:R,online:B,delete_source:q,bwlimit:D?parseInt(D,10):void 0});je(O.upid),c("done"),s==null||s(O.upid)}catch(O){const le=O instanceof Error?O.message:String(O);ne(le),c("error")}}};if(!e||!n)return null;const ie=!!F&&/^\d+$/.test(F)&&!!C&&!!g&&C.disks.every(O=>!!$[O.key])&&C.nics.every(O=>!!z[O.key]),be=i==="endpoint"?!!te&&!!g&&!!V:i==="mappings"?ie:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:Th,children:[r.jsx("style",{children:Ph}),r.jsxs("div",{className:"rmm",onClick:O=>O.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsx(Ia,{value:m,placeholder:o("rmm.endpoint.select"),options:l.map(O=>({value:Ai(O),label:`${O.cluster_name} @ ${O.node_host}:${O.node_port}`})),onChange:O=>de(O)}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:p,onChange:O=>v(O.target.value),placeholder:b?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),te&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsx(Ia,{value:V,disabled:N||!g,placeholder:N?o("rmm.endpoint.datapath_loading"):"",options:N?[]:!g||g.ips.length===0?[{value:te.node_host,label:`${te.node_host} (mgmt)`}]:g.ips.map(O=>({value:O.address,label:`${O.address} · ${O.iface} (${O.type})`})),onChange:O=>A(O)}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),G&&r.jsx("div",{className:"rmm-err",children:G}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!be,onClick:()=>c("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&te&&C&&g&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:F,onChange:O=>ee(O.target.value)}),C.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),C.disks.map(O=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:O.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[O.storage," ",r.jsx("em",{children:O.size})]}),r.jsx(Ia,{value:$[O.key]||"",options:g.storages.map(le=>({value:le.storage,label:`${le.storage} (${le.type}, ${Eh(le.avail)} free)`})),onChange:le=>E({...$,[O.key]:le})})]},O.key))]})]}),C.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),C.nics.map(O=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:O.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[O.bridge," ",r.jsx("em",{children:O.model})]}),r.jsx(Ia,{value:z[O.key]||"",options:g.bridges.map(le=>({value:le.iface,label:`${le.iface}${le.address?` (${le.address})`:""}`})),onChange:le=>U({...z,[O.key]:le})})]},O.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:B,onChange:O=>P(O.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:q,onChange:O=>T(O.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:D,onChange:O=>W(O.target.value),placeholder:"0"}),G&&r.jsx("div",{className:"rmm-err",children:G}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!be,onClick:()=>c("review"),children:o("rmm.action.review")})]})]}),i==="review"&&te&&r.jsxs(r.Fragment,{children:[r.jsx($h,{vm:n,selected:te,clusterId:t,precheck:Y,precheckLoading:ae,onRun:ke,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[te.cluster_id,"/",te.node_host,":",te.node_port," → vmid ",F]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:V})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:p||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:R||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:j||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(B?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(q?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:D?`${D} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:ae||Y!==null&&!Y.ok,onClick:Q,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:k})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:G}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function Ai(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function $h({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(Bo.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const c=a.blockers.length>0,l=a.warnings.length>0,d=c?"blockers":l?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((m,f)=>r.jsx("li",{children:m},f))})]}),l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((m,f)=>r.jsx("li",{children:m},f))})]}),!c&&!l&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const Th={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},Ph=`
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
`;function Rh(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function t0({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Be(),o=Gr(),[i,c]=u.useState([]),[l,d]=u.useState(!1),[m,f]=u.useState(!1),[p,v]=u.useState(""),[b,w]=u.useState(""),[C,x]=u.useState(!1),[g,h]=u.useState(""),N=async()=>{if(n){d(!0),h("");try{const z=await De.listSnapshots(t,n.vmid);c((z.snapshots||[]).filter(U=>U.name!=="current"))}catch(z){h(z instanceof Error?z.message:String(z))}finally{d(!1)}}};if(u.useEffect(()=>{e&&(v(""),w(""),x(!1),h(""),N())},[e,t,n==null?void 0:n.vmid]),u.useEffect(()=>{if(!e)return;const z=U=>{U.key==="Escape"&&a()};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[e,a]),!e||!n)return null;const S=async()=>{if(p){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(p)){h("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}f(!0),h("");try{await De.createSnapshot(t,n.vmid,{snapname:p,description:b,vmstate:C}),v(""),w(""),x(!1),await N()}catch(z){h(z instanceof Error?z.message:String(z))}finally{f(!1)}}},$=async z=>{if(await o.confirm(s("snap.confirm_delete",{name:z.name}),{destructive:!0})){h("");try{await De.deleteSnapshot(t,n.vmid,z.name),await N()}catch(U){h(U instanceof Error?U.message:String(U))}}},E=async z=>{if(await o.confirm(s("snap.confirm_rollback",{name:z.name}),{destructive:!0})){h("");try{await De.rollbackSnapshot(t,n.vmid,z.name),await N()}catch(U){h(U instanceof Error?U.message:String(U))}}};return r.jsxs("div",{onClick:a,style:Ih,children:[r.jsx("style",{children:Lh}),r.jsxs("div",{className:"sm-modal",onClick:z=>z.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:p,onChange:z=>v(z.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:b,onChange:z=>w(z.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:C,onChange:z=>x(z.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:m||!p,onClick:S,children:m?"…":s("snap.create")})]})]}),g&&r.jsx("div",{className:"sm-err",children:g}),r.jsxs("div",{className:"sm-list",children:[l&&r.jsx("div",{className:"sm-empty",children:"…"}),!l&&i.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&i.map(z=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:z.name}),z.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:z.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",Rh(z.snaptime)]}),z.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),z.description&&r.jsx("div",{className:"sm-desc",children:z.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>E(z),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>$(z),children:s("snap.delete")})]})]},z.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const Ih={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},Lh=`
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
`;function r0({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Be(),[o,i]=u.useState([]),[c,l]=u.useState(!1),[d,m]=u.useState(""),[f,p]=u.useState("snapshot"),[v,b]=u.useState("zstd"),[w,C]=u.useState(""),[x,g]=u.useState(""),[h,N]=u.useState(!1);if(u.useEffect(()=>{!e||!n||(C(""),g(""),m(""),l(!0),De.getCluster(t).then(E=>{const U=Object.values(E.storages||{}).filter(V=>{var F;if(!((F=V.content)!=null&&F.includes("backup")))return!1;const A=V.allowed_nodes||[];return A.length>0&&!A.includes(n.node)||!V.shared&&V.node!==n.node?!1:V.enabled!==!1});i(U),U.length>0&&m(U[0].storage)}).catch(E=>C(E.message||String(E))).finally(()=>l(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),u.useEffect(()=>{if(!e)return;const E=z=>{z.key==="Escape"&&!h&&a()};return document.addEventListener("keydown",E),()=>document.removeEventListener("keydown",E)},[e,h,a]),!e||!n)return null;const S=o.length>0,$=async()=>{if(d){N(!0),C("");try{const E=await De.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:f,compress:v});g(E.upid)}catch(E){C(E instanceof Error?E.message:String(E))}finally{N(!1)}}};return r.jsxs("div",{onClick:()=>!h&&a(),style:Ah,children:[r.jsx("style",{children:Oh}),r.jsxs("div",{className:"bm-modal",onClick:E=>E.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!x&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),c?r.jsx("div",{className:"bm-empty",children:"…"}):S?r.jsx("select",{value:d,onChange:E=>m(E.target.value),children:o.map(E=>r.jsxs("option",{value:E.storage,children:[E.storage," (",E.type,E.shared?", shared":"",")"]},E.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:f,onChange:E=>p(E.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:v,onChange:E=>b(E.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),w&&r.jsx("div",{className:"bm-err",children:w}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:h,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:h||!d,onClick:$,children:h?"…":s("backup.start")})]})]}),x&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:x})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const Ah={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},Oh=`
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
`;function n0({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=Be(),[i,c]=u.useState(""),[l,d]=u.useState(!1),[m,f]=u.useState(""),p=u.useRef(null);if(u.useEffect(()=>{e&&(c(""),f(""),d(!1),setTimeout(()=>{var b;return(b=p.current)==null?void 0:b.focus()},50))},[e]),u.useEffect(()=>{if(!e)return;const b=w=>{w.key==="Escape"&&!l&&a()};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,l,a]),!e)return null;const v=async()=>{if(i){d(!0),f("");try{await s(i)}catch(b){const w=b instanceof Error?b.message:String(b);f(o("console.prepare_failed",{err:w})),d(!1)}}};return r.jsxs("div",{onClick:()=>!l&&a(),style:Fh,children:[r.jsx("style",{children:Dh}),r.jsxs("div",{className:"cpw-modal",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:p,type:"password",value:i,onChange:b=>c(b.target.value),onKeyDown:b=>{b.key==="Enter"&&v()},autoComplete:"current-password",spellCheck:!1}),m&&r.jsx("div",{className:"cpw-err",children:m}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:l,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:v,disabled:l||!i,children:l?"…":o("console.prompt_open")})]})]})]})}const Fh={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},Dh=`
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
`;function ys(){const[e,t]=u.useState(!0),[n,a]=u.useState(null),[s,o]=u.useState(!1),i=async()=>{try{const l=await De.authMe();l.authenticated&&l.user?(a(l.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},c=async()=>{try{await De.authLogout()}catch{}window.location.replace("/login")};return u.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:c}}function Oi(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function Bh(e){return e==="stop"||e==="shutdown"||e==="reboot"}function Bs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}const du=Bo.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:c=!1,isCompleting:l=!1},d){var $,E,z;const m=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,p=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,v=Math.max(t.cpu.usage_percent,f,p),b=m?Ce(v):"muted",w=!!i,C=($=i==null?void 0:i.task_type)==null?void 0:$.includes("migrate"),x=((E=i==null?void 0:i.task_type)==null?void 0:E.includes("backup"))||((z=i==null?void 0:i.task_type)==null?void 0:z.includes("vzdump")),g=t.name.length>12?t.name.substring(0,11)+"…":t.name,N=i?(U=>{const V=U.toLowerCase();return V.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:V.includes("backup")||V.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:V.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:V.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:V.includes("clone")?{label:"CLONE",color:"#10b981"}:V.includes("start")||V.includes("qmstart")?{label:"START",color:"#00ff88"}:V.includes("stop")||V.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:V.includes("reboot")||V.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,S=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${w?"has-task":""} ${C?"migrating":""} ${x?"backup":""} ${c?"ghost":""} ${l?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${b}`,children:[r.jsx("span",{className:"vm-name",children:g}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!C&&!x&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),x&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),C&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),N&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:N.color,color:N.color},children:[N.label,C&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),w&&!C&&!x&&r.jsx("div",{className:"vm-task-ring"}),x&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),C&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(S==null?void 0:S.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",S.target]})]}),c&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function Wh({vm:e,onClose:t}){const{t:n}=Be(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${Ol(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${Ol(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:ni(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${Ce(e.cpu.usage_percent)}`,children:st(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${Ce(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Ie(e.memory.used_bytes)," / ",Ie(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${Ce(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Ie(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Ie(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Uh({cluster:e,clusters:t}){var Kr;const{t:n,language:a}=Be(),s=Gr(),[o,i]=u.useState(null),c=ys(),[l,d]=u.useState(null),[m,f]=u.useState(null),[p,v]=u.useState(null),[b,w]=u.useState(null),[C,x]=u.useState("disabled"),[g,h]=u.useState({});u.useEffect(()=>{De.getConfig().then(y=>{var _;x(((_=y.console)==null?void 0:_.mode)||"disabled");const L={};(y.clusters||[]).forEach(M=>{L[M.id]=!!(M.auth&&M.auth.password&&M.auth.password.length>0)}),h(L)}).catch(()=>x("disabled"))},[]);const[N,S]=u.useState(null),$=u.useCallback((y,L,_,M)=>{const I=typeof localStorage<"u"&&localStorage.getItem("language")||"",J=L.type==="lxc",oe=`${J?"/console-term":"/console"}/${encodeURIComponent(y)}/${encodeURIComponent(L.node)}/${L.vmid}?ct=${encodeURIComponent(_)}`+(L.name?`&name=${encodeURIComponent(L.name)}`:"")+(I?`&lang=${encodeURIComponent(I)}`:"")+(!J&&M?`#vp=${encodeURIComponent(M)}`:"");window.open(oe,"_blank","noopener,noreferrer")},[]),[E,z]=u.useState([]),U=u.useRef(new Map),V=u.useCallback(y=>{y.action==="start"||y.action==="resume"?A(y):d(y)},[]),A=u.useCallback(async y=>{d(null);try{const L=y.vm.type==="lxc",_=L?await De.ctAction(y.clusterId,y.vm.node,y.vm.vmid,y.action):await De.vmAction(y.clusterId,y.vm.node,y.vm.vmid,y.action);console.info(`[vm_control] ${y.action} ${L?"ct":"vm"}/${y.vm.vmid} → upid=${_.upid}`)}catch(L){const _=L instanceof Error?L.message:String(L);_.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${y.action} failed: ${_.slice(0,200)}`)}},[]),F=u.useCallback(()=>{l&&A(l)},[l,A]),[ee,B]=u.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[P,q]=u.useState(""),[T,D]=u.useState(new Set),[W,G]=u.useState(!1),ne=u.useCallback(y=>{D(L=>{const _=new Set(L);return _.has(y)?_.delete(y):_.add(y),_})},[]),k=u.useCallback(()=>D(new Set),[]),je=u.useCallback(async y=>{if(T.size!==0){G(!0);try{const L=new Map;for(const K of T){const[oe,,ce]=K.split("/"),ge=parseInt(ce,10);if(!oe||!Number.isFinite(ge))continue;const ve=L.get(oe)||[];ve.push(ge),L.set(oe,ve)}const _=[];for(const[K,oe]of L)try{const ce=await De.bulkAction(K,{action:y,vmids:oe}),ge=ce.results.filter(Fe=>Fe.ok).length,ve=ce.results.length-ge,Ue=ce.results.filter(Fe=>!Fe.ok).map(Fe=>`#${Fe.vmid}: ${Fe.error||"unknown"}`);_.push({cluster:K,ok:ge,fail:ve,errs:Ue})}catch(ce){const ge=ce instanceof Error?ce.message:String(ce);_.push({cluster:K,ok:0,fail:oe.length,errs:[ge]})}const M=_.reduce((K,oe)=>K+oe.ok,0),I=_.reduce((K,oe)=>K+oe.fail,0),J=[];_.forEach(K=>{J.push(`${K.cluster}: ${K.ok} ok / ${K.fail} fail`),K.errs.slice(0,5).forEach(oe=>J.push(`  • ${oe}`)),K.errs.length>5&&J.push(`  • … +${K.errs.length-5}`)}),await s.alert(`${y.toUpperCase()}: ${M} ok, ${I} fail

${J.join(`
`)}`,{title:"Bulk action result"}),I===0&&k()}finally{G(!1)}}},[T,k]),[Y,Me]=u.useState(()=>{const y=(()=>{if(typeof window>"u")return null;const _=window.location.pathname.split("/").filter(Boolean)[1];return _==="grid"||_==="table"||_==="thumb"?_:null})();if(y)return y;const L=localStorage.getItem("vm_matrix_view_mode");return L==="table"||L==="thumb"||L==="grid"?L:"grid"});u.useEffect(()=>{if(typeof window>"u"||window.location.pathname.split("/").filter(Boolean)[0]!=="matrix")return;const L=`/matrix/${Y}`;window.location.pathname!==L&&window.history.replaceState(null,"",L)},[Y]),u.useEffect(()=>{const y=()=>{const L=window.location.pathname.split("/").filter(Boolean)[1];(L==="grid"||L==="table"||L==="thumb")&&Me(L)};return window.addEventListener("popstate",y),()=>window.removeEventListener("popstate",y)},[]);const[ae,xe]=u.useState(()=>{const y=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(y)?Math.max(160,Math.min(640,y)):320}),[ke,te]=u.useState(null);u.useEffect(()=>{if(!ke)return;const y=L=>{L.key==="Escape"&&te(null)};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[ke]);const[de,R]=u.useState(()=>Math.floor(Date.now()/3e4));u.useEffect(()=>{if(Y!=="thumb")return;const y=window.setInterval(()=>R(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(y)},[Y]);const[j,Q]=u.useState(()=>{const y=localStorage.getItem("vm_matrix_thumb_type");return y==="qemu"||y==="lxc"?y:"all"});u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",j)},[j]);const[ie,be]=u.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",ie?"1":"0")},[ie]);const[O,le]=u.useState({}),he=u.useRef({});he.current=O,u.useEffect(()=>()=>{Object.values(he.current).forEach(y=>{try{URL.revokeObjectURL(y.url)}catch{}})},[]);const ue=u.useRef(new Map),ye=u.useRef(!1);u.useEffect(()=>{Y==="thumb"&&(ye.current=!1)},[Y]),u.useLayoutEffect(()=>{if(Y!=="thumb"){ue.current.clear();return}const y=M=>{let I=0,J=0,K=M;for(;K;)I+=K.offsetLeft,J+=K.offsetTop,K=K.offsetParent;return{left:I,top:J}},L=document.querySelectorAll(".vm-thumb-card[data-card-key]"),_=new Map;L.forEach(M=>{const I=M.dataset.cardKey;I&&_.set(I,y(M))}),ye.current&&L.forEach(M=>{const I=M.dataset.cardKey;if(!I)return;const J=ue.current.get(I),K=_.get(I);if(!J||!K)return;const oe=J.left-K.left,ce=J.top-K.top;Math.abs(oe)<1&&Math.abs(ce)<1||(M.style.transition="none",M.style.transform=`translate(${oe}px, ${ce}px)`,requestAnimationFrame(()=>{M.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",M.style.transform=""}))}),ue.current=_}),u.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",Y)},[Y]),u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(ae))},[ae]);const Oe=u.useRef(null),[Ne,Ve]=u.useState("vmid"),[Ee,me]=u.useState("asc"),[$e,Ae]=u.useState(!1),[H,se]=u.useState(()=>{const y=localStorage.getItem("matrix_card_width");return y?parseInt(y,10):85}),[Z,we]=u.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[_e,Pe]=u.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[xt,$t]=u.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[pe,He]=u.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[Se,Xe]=u.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[ot,qt]=u.useState([]),[Tt,Wt]=u.useState([]),[bt,pr]=u.useState(new Map),X=u.useRef(new Set),[Qe,rt]=u.useState(!1),[mt,yt]=u.useState(0),[it,ft]=u.useState(!0);u.useEffect(()=>{rt(!1),yt(_=>_+1),ft(!0);const y=setTimeout(()=>{rt(!0)},100),L=setTimeout(()=>{ft(!1)},8e3);return()=>{clearTimeout(y),clearTimeout(L)}},[_e]);const Qt=u.useRef(new Map),Xr=u.useRef(new Map),Tr=u.useRef(null),mr=u.useRef(!1),vn=u.useMemo(()=>{if(Z!=="load")return"";const y=[],L=_=>{Object.values(_.vms).forEach(M=>{if(M.template||ee==="running"&&M.status!=="running"||ee==="stopped"&&M.status!=="stopped")return;const I=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,J=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,K=Math.max(M.cpu.usage_percent,I,J);y.push({key:`${M.node}/${M.vmid}`,load:Math.round(K)})})};return t?Object.values(t).forEach(L):e&&L(e),y.sort((_,M)=>M.load-_.load),y.map(_=>`${_.key}:${_.load}`).join("|")},[e,t,Z,ee]);u.useLayoutEffect(()=>{if(Z!=="load"||mr.current)return;const y=new Map;Qt.current.forEach((L,_)=>{L&&y.set(_,L.getBoundingClientRect())}),Xr.current=y},[vn,Z]),u.useEffect(()=>{Z==="load"&&Xr.current.size!==0&&requestAnimationFrame(()=>{const y=[];Qt.current.forEach((L,_)=>{if(!L)return;const M=Xr.current.get(_);if(!M)return;const I=L.getBoundingClientRect(),J=M.left-I.left,K=M.top-I.top;if(Math.abs(J)>2||Math.abs(K)>2){mr.current=!0;const oe=L.animate([{transform:`translate(${J}px, ${K}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});y.push(oe)}}),y.length>0?Promise.all(y.map(L=>L.finished)).then(()=>{mr.current=!1}).catch(()=>{mr.current=!1}):mr.current=!1})},[vn,Z]);const[bn,yn]=u.useState(!1);u.useEffect(()=>{bn||De.getConfig().then(y=>{var _;const L=(_=y==null?void 0:y.ui)==null?void 0:_.vm_matrix_default_filter;L&&(B(L),localStorage.setItem("vm_matrix_default_filter",L)),yn(!0)}).catch(()=>{const y=localStorage.getItem("vm_matrix_default_filter");y&&B(y),yn(!0)})},[bn]),u.useEffect(()=>{const y=()=>{const _=localStorage.getItem("matrix_card_width");_&&se(parseInt(_,10));const M=localStorage.getItem("matrix_sort_by");M&&M!==Z&&we(M);const I=localStorage.getItem("matrix_group_sort_by");I&&I!==xt&&$t(I);const J=localStorage.getItem("matrix_group_sort_order");J&&J!==pe&&He(J)};window.addEventListener("storage",y);const L=setInterval(y,1e3);return()=>{window.removeEventListener("storage",y),clearInterval(L)}},[Z,xt,pe]);const wn=u.useCallback((y,L)=>{var _;return e&&e.client_health?e.client_health[L]||null:t&&((_=t[y])!=null&&_.client_health)&&t[y].client_health[L]||null},[e,t]),kn=u.useCallback((y,L,_)=>{y.preventDefault(),y.stopPropagation();const M=Math.min(y.clientX,window.innerWidth-250),I=Math.min(y.clientY,window.innerHeight-300);Xe({visible:!0,x:M,y:I,vm:L,clusterId:_})},[]),ut=u.useCallback(()=>{Xe(y=>({...y,visible:!1}))},[]),nt=!e&&t&&Object.keys(t).length>0,Pt=u.useMemo(()=>{const y=[],L=(_,M,I)=>{if(!_.tasks)return;Object.values(_.tasks).forEach(K=>{var Fe;const oe=((Fe=K.task_type)==null?void 0:Fe.toLowerCase())||"",ce=oe.includes("migrate"),ge=K.status==="running",ve=!!K.target_node,Ue=oe.startsWith("ha");if(oe.startsWith("qm")||oe.startsWith("vz"),ge&&ce&&ve&&!Ue){const Ke=Object.keys(_.vms).find(Ut=>{const Nr=_.vms[Ut];return Nr.vmid===K.vmid&&Nr.node===K.node});Ke&&y.push({vm:_.vms[Ke],task:K,targetNode:K.target_node||"",clusterId:M,clusterLabel:I})}})};return nt&&t?Object.entries(t).forEach(([_,M])=>{L(M,_,M.name||_)}):e&&L(e,e.id,e.name||e.id),y},[e,t,nt]);u.useEffect(()=>{const y=new Set(Pt.map(M=>`${M.clusterId}:${M.vm.vmid}`)),L=X.current,_=U.current;L.forEach(M=>{if(!y.has(M)&&!bt.has(M)){const I=_.get(M);I&&I.upid&&(async()=>{var J,K,oe;try{const ce=await De.taskStatus(I.clusterId,I.node,I.upid),ge=(ce==null?void 0:ce.exitstatus)||"";if((ce==null?void 0:ce.status)==="running")return;if(ge&&ge!=="OK"){const Ue=((J=e==null?void 0:e.vms)==null?void 0:J[`${I.node}/${I.vmid}`])||((oe=(K=t==null?void 0:t[I.clusterId])==null?void 0:K.vms)==null?void 0:oe[`${I.node}/${I.vmid}`]),Fe=Ue&&Ue.lock||"migrate";z(Ke=>Ke.some(Ut=>Ut.id===M)?Ke:[...Ke,{id:M,vmid:I.vmid,sourceNode:I.node,targetNode:I.targetNode,clusterLabel:I.clusterLabel,lock:Fe,copied:!1}])}}catch{}})(),_.delete(M)}}),Pt.forEach(({vm:M,task:I,clusterId:J,clusterLabel:K,targetNode:oe})=>{const ce=`${J}:${M.vmid}`;_.set(ce,{upid:I.upid,node:I.node,vmid:M.vmid,clusterId:J,clusterLabel:K,targetNode:oe})}),X.current=y},[Pt,bt,e,t]);const Pr=u.useRef(new Map);u.useEffect(()=>{Pt.forEach(({vm:y,targetNode:L,clusterId:_})=>{const M=`${_}:${y.vmid}`;Pr.current.set(M,{targetNode:L,sourceNode:y.node,clusterId:_,vmid:y.vmid})})},[Pt]);const ze=u.useRef(new Map);u.useEffect(()=>{ot.forEach(y=>{const L=`${y.clusterId}:${y.vmid}`;ze.current.set(L,{x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2})})},[ot]),u.useEffect(()=>{const y=new Set(Pt.map(L=>`${L.clusterId}:${L.vm.vmid}`));Pr.current.forEach((L,_)=>{if(!y.has(_)&&!bt.has(_)){const M=ze.current.get(_);if(M){const I=Date.now(),J=800,K=()=>{const oe=Date.now()-I,ce=Math.min(oe/J,1),ge=M.x1+(M.x2-M.x1)*ce,ve=M.y1+(M.y2-M.y1)*ce;Wt([{x1:ge,y1:ve,x2:M.x2,y2:M.y2,vmid:L.vmid,progress:ce}]),ce<1?requestAnimationFrame(K):Wt([])};requestAnimationFrame(K)}pr(I=>{const J=new Map(I);return J.set(_,{...L,startTime:Date.now()}),J}),Pr.current.delete(_),ze.current.delete(_),setTimeout(()=>{pr(I=>{const J=new Map(I);return J.delete(_),J})},1e4)}})},[Pt,bt]),u.useEffect(()=>{if(bt.size===0)return;const y=(L,_)=>{const M=I=>{for(const J of Object.values(I.vms))if(J.vmid===L)return J.node;return null};if(t&&_){const I=t[_];if(I)return M(I)}else if(e)return M(e);return null};bt.forEach((L,_)=>{const M=y(L.vmid,L.clusterId);M&&M===L.targetNode&&M!==L.sourceNode&&pr(I=>{const J=new Map(I);return J.delete(_),J})})},[e,t,bt]);const Te=u.useCallback((y,L)=>{const _=nt?`${L} / `:"";switch(_e){case"none":return nt?L:"all";case"type":return`${_}${y.type==="qemu"?"VM":"CT"}`;case"tag":return y.tags&&y.tags.length>0?`${_}${y.tags[0]}`:`${_}(no tag)`;case"node":default:return`${_}${y.node}`}},[_e,nt]),qe=u.useMemo(()=>{const y={},L=(_,M,I)=>{Object.entries(_.vms).forEach(([J,K])=>{if(ee==="running"&&K.status!=="running"||ee==="stopped"&&K.status!=="stopped"||P&&!K.name.toLowerCase().includes(P.toLowerCase())&&!String(K.vmid).includes(P)||K.template)return;const oe=Te(K,M);y[oe]||(y[oe]={vms:[],clusterId:I}),y[oe].vms.push(K)})};return nt?Object.entries(t).forEach(([_,M])=>{const I=M.name||_;L(M,I,_)}):e&&L(e,"",e.id),Object.values(y).forEach(_=>{_.vms.sort((M,I)=>{switch(Z){case"name":return M.name.localeCompare(I.name);case"load":{const J=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,K=I.memory.total_bytes>0?I.memory.used_bytes/I.memory.total_bytes*100:0,oe=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,ce=I.disk.total_bytes>0?I.disk.used_bytes/I.disk.total_bytes*100:0,ge=Math.max(M.cpu.usage_percent,J,oe),ve=Math.max(I.cpu.usage_percent,K,ce);if(M.status!=="running"&&I.status==="running")return 1;if(M.status==="running"&&I.status!=="running")return-1;if(M.status!=="running"&&I.status!=="running")return M.vmid-I.vmid;const Ue=Ut=>Ut>=95?0:Ut>=80?1:2,Fe=Ue(ge),Ke=Ue(ve);return Fe!==Ke?Fe-Ke:ve-ge}case"vmid":default:return M.vmid-I.vmid}})}),y},[e,t,nt,ee,P,Z,Te]),Ze=u.useMemo(()=>{const y=[],L=(_,M)=>{Object.values(_.vms).forEach(I=>{I.template||I.status==="running"&&ee!=="stopped"&&(j==="qemu"&&I.type!=="qemu"||j==="lxc"&&I.type!=="lxc"||P&&!I.name.toLowerCase().includes(P.toLowerCase())&&!String(I.vmid).includes(P)||y.push({...I,clusterId:M}))})};return nt&&t?Object.entries(t).forEach(([_,M])=>L(M,_)):e&&L(e,e.id),y.sort((_,M)=>{switch(Z){case"name":return _.name.localeCompare(M.name);case"load":{const I=_.memory.total_bytes>0?_.memory.used_bytes/_.memory.total_bytes*100:0,J=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,K=_.disk.total_bytes>0?_.disk.used_bytes/_.disk.total_bytes*100:0,oe=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,ce=Math.max(_.cpu.usage_percent,I,K),ge=Math.max(M.cpu.usage_percent,J,oe),ve=ce>=95?0:ce>=80?1:2,Ue=ge>=95?0:ge>=80?1:2;return ve!==Ue?ve-Ue:ge-ce}case"vmid":default:return _.vmid-M.vmid}}),y},[e,t,nt,ee,P,Z,j]),gt=u.useMemo(()=>{const y=new Map,L=_=>t&&t[_]?t[_].name||_:e&&e.id===_&&e.name||_;return Ze.forEach(_=>{const M=L(_.clusterId),I=Te(_,M),J=y.get(I)||[];J.push(_),y.set(I,J)}),Array.from(y.entries()).sort(([_],[M])=>{const I=_.localeCompare(M);return pe==="desc"?-I:I})},[Ze,Te,t,e,pe]);u.useEffect(()=>{if(Y!=="thumb")return;let y=!1;const L=640,_=ye.current,M={},I=async oe=>{const ce=oe.clusterId||(e==null?void 0:e.id)||"",ge=`${ce}/${oe.node}/${oe.vmid}`,ve=`/api/console/screenshot/${encodeURIComponent(ce)}/${encodeURIComponent(oe.node)}/${oe.vmid}?max=${L}&t=${de}`;try{const Ue=await fetch(ve,{credentials:"same-origin"});if(!Ue.ok||y)return;const Fe=await Ue.blob();if(y)return;const Ke=URL.createObjectURL(Fe),Ut=Ue.headers.get("X-Thumb-Empty")==="1";_?M[ge]={url:Ke,isBlank:Ut}:le(Nr=>{const Kc=Nr[ge];if(Kc)try{URL.revokeObjectURL(Kc.url)}catch{}return{...Nr,[ge]:{url:Ke,isBlank:Ut}}})}catch{}},J=6;return(async oe=>{const ce=new Set;for(const ge of oe){const ve=I(ge).finally(()=>{ce.delete(ve)});ce.add(ve),ce.size>=J&&await Promise.race(ce)}await Promise.all(ce)})(Ze).finally(()=>{if(y){Object.values(M).forEach(ce=>{try{URL.revokeObjectURL(ce.url)}catch{}});return}const oe=new Set(Ze.map(ce=>`${ce.clusterId||(e==null?void 0:e.id)||""}/${ce.node}/${ce.vmid}`));le(ce=>{let ge=!1;const ve={};return Object.entries(ce).forEach(([Ue,Fe])=>{if(oe.has(Ue))ve[Ue]=Fe;else{try{URL.revokeObjectURL(Fe.url)}catch{}ge=!0}}),_&&Object.entries(M).forEach(([Ue,Fe])=>{const Ke=ve[Ue];if(Ke)try{URL.revokeObjectURL(Ke.url)}catch{}ve[Ue]=Fe,ge=!0}),ge?ve:ce}),ye.current||setTimeout(()=>{y||(ye.current=!0)},300)}),()=>{y=!0}},[Y,Ze,de,e==null?void 0:e.id]);const Ct=u.useMemo(()=>{const y=[],L=new Map;return nt&&t&&Object.entries(t).forEach(([_,M])=>{const I=M.name||_;Object.values(M.nodes||{}).forEach(J=>{J&&J.node&&L.set(J.node,{id:_,label:I})})}),Pt.forEach(({vm:_,targetNode:M,clusterId:I,clusterLabel:J})=>{const K=L.get(M),oe=K&&K.id!==I?K:{id:I,label:J},ce=nt?`${oe.label} / ${M}`:M,ge=nt?`${J} / ${_.node}`:_.node;y.push({vm:_,targetGroupKey:ce,sourceGroupKey:ge,clusterId:I,targetClusterId:oe.id})}),y},[Pt,nt,t]);u.useEffect(()=>{if(Y!=="grid"||Ct.length===0){qt([]);return}const y=()=>{const I=Tr.current;if(!I)return;const J=I.getBoundingClientRect(),K=I.scrollLeft,oe=I.scrollTop,ce=[];Ct.forEach(({vm:ge})=>{const ve=`${ge.cluster_id}/${ge.node}/${ge.vmid}`,Ue=`ghost-${ge.cluster_id}-${ge.vmid}`,Fe=Qt.current.get(ve),Ke=Qt.current.get(Ue);if(Fe&&Ke){const Ut=Fe.getBoundingClientRect(),Nr=Ke.getBoundingClientRect();ce.push({x1:Ut.left+Ut.width/2-J.left+K,y1:Ut.top+Ut.height/2-J.top+oe,x2:Nr.left+Nr.width/2-J.left+K,y2:Nr.top+Nr.height/2-J.top+oe,vmid:ge.vmid,clusterId:ge.cluster_id})}}),qt(ce)},L=setTimeout(y,100),_=setInterval(y,500),M=Tr.current;return M&&M.addEventListener("scroll",y),()=>{clearTimeout(L),clearInterval(_),M&&M.removeEventListener("scroll",y)}},[Ct,Y]);const Ye=u.useMemo(()=>{const y=[],L=(_,M,I)=>{Object.values(_.vms).forEach(J=>{ee==="running"&&J.status!=="running"||ee==="stopped"&&J.status!=="stopped"||P&&!J.name.toLowerCase().includes(P.toLowerCase())&&!String(J.vmid).includes(P)||J.template||y.push({...J,clusterName:M,clusterId:I})})};return nt?Object.entries(t).forEach(([_,M])=>{const I=M.name||_;L(M,I,_)}):e&&L(e,e.name||"Cluster",e.id),y.sort((_,M)=>{var J,K,oe,ce;let I=0;switch(Ne){case"name":I=_.name.localeCompare(M.name);break;case"vmid":I=_.vmid-M.vmid;break;case"type":I=_.type.localeCompare(M.type);break;case"node":I=_.node.localeCompare(M.node);break;case"status":I=_.status.localeCompare(M.status);break;case"cpu":I=_.cpu.usage_percent-M.cpu.usage_percent;break;case"memory":I=_.memory.used_bytes/_.memory.total_bytes-M.memory.used_bytes/M.memory.total_bytes;break;case"uptime":I=_.uptime-M.uptime;break;case"rx":I=(((J=_.network)==null?void 0:J.rx_bytes_sec)||0)-(((K=M.network)==null?void 0:K.rx_bytes_sec)||0);break;case"tx":I=(((oe=_.network)==null?void 0:oe.tx_bytes_sec)||0)-(((ce=M.network)==null?void 0:ce.tx_bytes_sec)||0);break;case"task":{const ge=Bs(_.vmid,_.node,_.cluster_id,e,t),ve=Bs(M.vmid,M.node,M.cluster_id,e,t);ge&&!ve?I=-1:!ge&&ve?I=1:ge&&ve?I=ge.task_type.localeCompare(ve.task_type):I=0;break}}return Ee==="asc"?I:-I}),y},[e,t,nt,ee,P,Ne,Ee]),wt=Math.round(ae*9/16),kt=y=>{Ae(!0),setTimeout(()=>Ae(!1),300),Ne===y?me(Ee==="asc"?"desc":"asc"):(Ve(y),me("asc"))},ar=u.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const y of Object.values(t))if(y.vms[o])return y.vms[o]}return null},[o,e,t]),{totalVMs:Rr,runningVMs:jn}=u.useMemo(()=>{let y=0,L=0;const _=M=>{Object.values(M.vms).forEach(I=>{I.template||(y++,I.status==="running"&&L++)})};return nt?t&&Object.values(t).forEach(_):e&&_(e),{totalVMs:y,runningVMs:L}},[e,t,nt]);return!e&&!nt?r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})}):r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[jn," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[Rr," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:P,onChange:y=>q(y.target.value)})]}),r.jsxs("div",{className:`filter-tabs ${Y==="thumb"?"is-disabled":""}`,children:[r.jsxs("button",{className:`filter-tab ${ee==="all"?"active":""}`,onClick:()=>B("all"),disabled:Y==="thumb",title:Y==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),n("matrix.filter_all")]}),r.jsxs("button",{className:`filter-tab ${ee==="running"?"active":""}`,onClick:()=>B("running"),disabled:Y==="thumb",title:Y==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),n("matrix.filter_running")]}),r.jsxs("button",{className:`filter-tab ${ee==="stopped"?"active":""}`,onClick:()=>B("stopped"),disabled:Y==="thumb",title:Y==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),n("matrix.filter_stopped")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),n("settings.sort_by"),":"]}),r.jsxs("button",{className:`sort-btn ${Z==="vmid"?"active":""}`,onClick:()=>{we("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),"ID"]}),r.jsxs("button",{className:`sort-btn ${Z==="name"?"active":""}`,onClick:()=>{we("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),n("settings.sort_name")]}),r.jsxs("button",{className:`sort-btn ${Z==="load"?"active":""}`,onClick:()=>{we("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),n("settings.sort_load")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),n("matrix.group_by"),":"]}),r.jsxs("button",{className:`sort-btn ${_e==="none"?"active":""}`,onClick:()=>{Pe("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),n("matrix.group_none")]}),r.jsxs("button",{className:`sort-btn ${_e==="node"?"active":""}`,onClick:()=>{Pe("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),n("matrix.group_node")]}),r.jsxs("button",{className:`sort-btn ${_e==="type"?"active":""}`,onClick:()=>{Pe("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),r.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),n("matrix.group_type")]}),r.jsxs("button",{className:`sort-btn ${_e==="tag"?"active":""}`,onClick:()=>{Pe("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),r.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),n("matrix.group_tag")]})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${Y==="grid"?"active":""}`,onClick:()=>Me("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${Y==="table"?"active":""}`,onClick:()=>Me("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),r.jsx("button",{className:`view-btn ${Y==="thumb"?"active":""}`,onClick:()=>Me("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),r.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),r.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]})]})]}),Y==="thumb"&&r.jsxs("div",{className:"thumb-size-row",children:[r.jsxs("div",{className:"thumb-size",children:[r.jsxs("span",{className:"thumb-size-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"15 3 21 3 21 9"}),r.jsx("polyline",{points:"9 21 3 21 3 15"}),r.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),r.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),a==="zh-TW"?"尺寸":"Size"]}),r.jsx("input",{type:"range",min:160,max:640,step:20,value:ae,onChange:y=>xe(parseInt(y.target.value,10)),className:"thumb-size-slider"}),r.jsxs("span",{className:"thumb-size-val",children:[ae,"px"]}),r.jsx("span",{className:"thumb-build-stamp",title:"build 2026-05-08T17:16:10.237Z",children:(()=>{try{return`b${new Date("2026-05-08T17:16:10.237Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),r.jsxs("div",{className:"thumb-type-filter",role:"group",children:[r.jsxs("button",{className:`thumb-type-btn ${j==="all"?"active":""}`,onClick:()=>Q("all"),title:a==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a==="zh-TW"?"全部":"ALL"]}),r.jsxs("button",{className:`thumb-type-btn ${j==="qemu"?"active":""}`,onClick:()=>Q("qemu"),title:a==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),r.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),"VM"]}),r.jsxs("button",{className:`thumb-type-btn ${j==="lxc"?"active":""}`,onClick:()=>Q("lxc"),title:a==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),r.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),r.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),"CT"]})]}),r.jsxs("button",{className:`thumb-prefer-btn ${ie?"active":""}`,onClick:()=>be(y=>!y),title:a==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),a==="zh-TW"?"優先有內容":"Prefer content"]})]}),r.jsxs("div",{className:"matrix-content",children:[Y==="grid"?r.jsxs("div",{className:"matrix-grid",ref:Tr,children:[ot.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),ot.map((y,L)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})})]},`line-${y.vmid}-${L}`))]}),Tt.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Tt.map((y,L)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-y.progress)+1,filter:"url(#completingGlow)",opacity:1-y.progress*.5}),y.progress>.8&&r.jsx("circle",{cx:y.x2,cy:y.y2,r:20*(y.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(y.progress-.8)*5})]},`completing-${y.vmid}-${L}`))]}),(()=>{const y=new Map;Object.entries(qe).forEach(([M,I])=>{y.set(M,I)}),Ct.forEach(M=>{y.has(M.targetGroupKey)||y.set(M.targetGroupKey,{vms:[],clusterId:M.clusterId})});const L=Array.from(y.entries()).sort((M,I)=>{const[J]=M,[K]=I,oe=Ue=>{if(Ue.includes(" / ")){const[Fe,Ke]=Ue.split(" / ");return{cluster:Fe,node:Ke}}return{cluster:"",node:Ue}},ce=oe(J),ge=oe(K);let ve=0;return xt==="cluster"?(ve=ce.cluster.localeCompare(ge.cluster),ve===0&&(ve=ce.node.localeCompare(ge.node))):(ve=ce.node.localeCompare(ge.node),ve===0&&(ve=ce.cluster.localeCompare(ge.cluster))),pe==="desc"?-ve:ve});let _=0;return L.map(([M,I])=>{const J=Ct.filter(K=>K.targetGroupKey===M);return r.jsxs("div",{className:`node-section ${I.vms.length===0&&J.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:M}),r.jsxs("span",{className:"node-section-count",children:[I.vms.length,J.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",J.length]})]})]}),r.jsxs("div",{className:`vm-grid ${Z==="load"&&!it?"sort-by-load":""} ${it?"initial-load":""}`,children:[Qe&&I.vms.map(K=>{const oe=`${K.cluster_id}/${K.node}/${K.vmid}`,ce=Bs(K.vmid,K.node,K.cluster_id,e,t),ge=`${K.cluster_id}:${K.vmid}`,ve=bt.get(ge);if(ve&&ve.sourceNode===K.node||Ct.find(Ke=>Ke.targetClusterId===K.cluster_id&&Ke.vm.vmid===K.vmid))return null;const Fe=_++;return r.jsx(du,{ref:Ke=>{Ke?Qt.current.set(oe,Ke):Qt.current.delete(oe)},vm:K,isSelected:o===oe,onClick:()=>i(o===oe?null:oe),onContextMenu:Ke=>kn(Ke,K,I.clusterId),animationDelay:it?Fe*50:0,task:ce,isCompleting:!!ve},oe)}).filter(Boolean),Qe&&J.map(K=>{var ge;const oe=`ghost-${K.vm.cluster_id}-${K.vm.vmid}`,ce=(ge=Pt.find(ve=>ve.vm.vmid===K.vm.vmid&&ve.clusterId===K.vm.cluster_id))==null?void 0:ge.task;return r.jsx(du,{ref:ve=>{ve?Qt.current.set(oe,ve):Qt.current.delete(oe)},vm:K.vm,isSelected:!1,onClick:()=>{},onContextMenu:ve=>ve.preventDefault(),animationDelay:0,task:ce,isGhost:!0},oe)})]},`grid-${ee}-${P}-${Z}-${mt}`)]},M)})})(),Object.keys(qe).length===0&&Ct.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):Y==="thumb"?r.jsxs("div",{ref:Oe,className:"matrix-thumb-grid",children:[r.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:r.jsx("defs",{children:r.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[r.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:r.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),r.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),Ze.length===0?r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})}):gt.map(([y,L])=>{const _=ie?[...L].sort((M,I)=>{var ge,ve;const J=`${M.clusterId||(e==null?void 0:e.id)||""}/${M.node}/${M.vmid}`,K=`${I.clusterId||(e==null?void 0:e.id)||""}/${I.node}/${I.vmid}`,oe=(ge=O[J])!=null&&ge.isBlank?1:0,ce=(ve=O[K])!=null&&ve.isBlank?1:0;return oe-ce}):L;return r.jsxs("div",{className:"thumb-group",children:[_e!=="none"&&r.jsxs("div",{className:"thumb-group-header",children:[r.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-name",children:y}),r.jsx("span",{className:"thumb-group-count",children:_.length}),r.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),r.jsx("div",{className:"thumb-group-cards",children:_.map(M=>{var Ue;const I=M.type==="lxc",J=M.status==="running",K=((Ue=M.cpu)==null?void 0:Ue.usage_percent)??0,oe=M.memory&&M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,ce=M.clusterId||(e==null?void 0:e.id)||"",ge=`${ce}/${M.node}/${M.vmid}`,ve=O[ge];return r.jsxs("div",{"data-card-key":ge,className:`vm-thumb-card status-${M.status}${ve!=null&&ve.isBlank?" is-blank":""}`,style:{width:`${ae}px`,flex:"0 0 auto"},onClick:()=>te({vm:M,clusterId:ce}),onContextMenu:Fe=>kn(Fe,M,ce),children:[r.jsxs("div",{className:"vm-thumb-image",style:{height:`${wt}px`},children:[r.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[r.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),r.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),r.jsx("div",{className:"vtl-scanlines"}),r.jsx("div",{className:"vtl-vignette"}),r.jsx("span",{className:"vtl-text",children:a==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),ve&&r.jsx("img",{src:ve.url,alt:`VM ${M.vmid} screenshot`,loading:"lazy",onLoad:Fe=>{Fe.currentTarget.parentElement.dataset.loaded="1"},onError:Fe=>{Fe.currentTarget.parentElement.dataset.error="1"}})]}),r.jsxs("div",{className:"vm-thumb-meta",children:[r.jsxs("div",{className:"vm-thumb-title",children:[r.jsx("span",{className:`type-badge ${M.type}`,children:I?"CT":"VM"}),r.jsxs("code",{className:"vm-thumb-id",children:["#",M.vmid]}),r.jsx("span",{className:"vm-thumb-name",children:M.name})]}),J&&r.jsxs("div",{className:"vm-thumb-bars",children:[r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Ce(K)}`,style:{width:`${Math.min(K,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${Ce(K)}`,children:st(K,1)})]}),r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Ce(oe)}`,style:{width:`${Math.min(oe,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${Ce(oe)}`,children:st(oe,0)})]})]})]})]},ge)})})]},y)})]}):r.jsxs("div",{className:"matrix-table-container",children:[T.size>0&&r.jsxs("div",{className:"bulk-toolbar",children:[r.jsx("span",{className:"bulk-count",children:a==="zh-TW"?`已選 ${T.size}`:`${T.size} selected`}),r.jsxs("button",{className:"bulk-btn",disabled:W,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${T.size} 台 VM/CT 執行開機？`:`Start ${T.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次開機":"Bulk start"})&&await je("start")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:n("vm.start")})]}),r.jsxs("button",{className:"bulk-btn",disabled:W,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${T.size} 台 VM/CT 執行關機（ACPI）？`:`Shutdown (ACPI) ${T.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次關機":"Bulk shutdown",destructive:!0})&&await je("shutdown")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:n("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"bulk-btn",disabled:W,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${T.size} 台 VM/CT 重新啟動？`:`Reboot ${T.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次重啟":"Bulk reboot",destructive:!0})&&await je("reboot")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:n("vm.reboot")})]}),r.jsxs("button",{className:"bulk-btn danger",disabled:W,onClick:async()=>{await s.confirm(a==="zh-TW"?`強制停止 ${T.size} 台 VM/CT？此動作不會通知 guest OS。`:`Hard-stop ${T.size} selected VM/CTs? Guest OS will not be notified.`,{title:a==="zh-TW"?"批次強制停止":"Bulk hard stop",destructive:!0})&&await je("stop")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:n("vm.stop_hard")})]}),r.jsx("button",{className:"bulk-btn ghost",onClick:k,disabled:W,children:a==="zh-TW"?"取消選取":"Clear"})]}),r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:"select-col",children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:T.size>0&&Ye.every(y=>T.has(`${y.cluster_id}/${y.node}/${y.vmid}`)),ref:y=>{if(!y)return;const L=Ye.some(M=>T.has(`${M.cluster_id}/${M.node}/${M.vmid}`)),_=Ye.length>0&&Ye.every(M=>T.has(`${M.cluster_id}/${M.node}/${M.vmid}`));y.indeterminate=L&&!_},onChange:y=>{y.target.checked?D(new Set(Ye.map(L=>`${L.cluster_id}/${L.node}/${L.vmid}`))):k()},title:n("matrix.bulk.select_all")})}),r.jsxs("th",{className:`sortable ${Ne==="status"?"sorted":""}`,onClick:()=>kt("status"),children:[r.jsx("span",{children:n("node.status")}),Ne==="status"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="vmid"?"sorted":""}`,onClick:()=>kt("vmid"),children:[r.jsx("span",{children:"VMID"}),Ne==="vmid"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="type"?"sorted":""}`,onClick:()=>kt("type"),children:[r.jsx("span",{children:n("table.type")}),Ne==="type"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="name"?"sorted":""}`,onClick:()=>kt("name"),children:[r.jsx("span",{children:n("table.name")}),Ne==="name"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${Ne==="node"?"sorted":""}`,onClick:()=>kt("node"),children:[r.jsx("span",{children:n("table.node")}),Ne==="node"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="cpu"?"sorted":""}`,onClick:()=>kt("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),Ne==="cpu"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="memory"?"sorted":""}`,onClick:()=>kt("memory"),children:[r.jsx("span",{children:n("metric.memory")}),Ne==="memory"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${Ne==="rx"?"sorted":""}`,onClick:()=>kt("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),Ne==="rx"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${Ne==="tx"?"sorted":""}`,onClick:()=>kt("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),Ne==="tx"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="uptime"?"sorted":""}`,onClick:()=>kt("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),Ne==="uptime"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${Ne==="task"?"sorted":""}`,onClick:()=>kt("task"),children:[r.jsx("span",{children:n("table.task")}),Ne==="task"&&r.jsx("span",{className:"sort-indicator",children:Ee==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:Ye.map(y=>{const L=`${y.cluster_id}/${y.node}/${y.vmid}`,_=y.status==="running",M=y.cpu.usage_percent,I=y.memory.used_bytes/y.memory.total_bytes*100,J=Bs(y.vmid,y.node,y.cluster_id,e,t),K=T.has(L);return r.jsxs("tr",{className:`${o===L?"selected":""} ${K?"multi-selected":""} ${y.status} ${$e?"sort-animating":""}`,onClick:()=>i(o===L?null:L),onContextMenu:oe=>kn(oe,y,y.clusterId),children:[r.jsx("td",{className:"select-col",onClick:oe=>oe.stopPropagation(),children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:K,onChange:()=>ne(L)})}),r.jsx("td",{children:r.jsx("span",{className:`status-badge ${Ol(y.status)}`,children:y.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:y.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${y.type}`,children:y.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:y.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const oe=(y.tags||[]).map(ce=>(ce||"").trim()).filter(Boolean);return oe.length>0?r.jsx("div",{className:"vm-tags",children:oe.map((ce,ge)=>r.jsx("span",{className:"vm-tag",children:ce},ge))}):null})()}),r.jsx("td",{className:"node-cell",children:y.node}),r.jsx("td",{children:_?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Ce(M)}`,style:{width:`${M}%`}})}),r.jsx("span",{className:`text-${Ce(M)}`,children:st(M,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:_?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${Ce(I)}`,style:{width:`${I}%`}})}),r.jsx("span",{children:st(I,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:_?r.jsxs("span",{className:"net-rx",children:[Ie(y.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:_?r.jsxs("span",{className:"net-tx",children:[Ie(y.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:_?r.jsx("span",{className:"uptime-cell",children:ni(y.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:J&&r.jsx(Sh,{task:J})})]},L)})})]}),Ye.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),ar&&r.jsx(Wh,{vm:ar,onClose:()=>i(null)},`${ar.node}/${ar.vmid}`)]}),ke&&r.jsx("div",{className:"thumb-preview-overlay",onClick:()=>te(null),children:r.jsxs("div",{className:"thumb-preview-frame",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"thumb-preview-titlebar",children:[r.jsxs("span",{className:"thumb-preview-name",children:[r.jsx("span",{className:`type-badge ${ke.vm.type}`,children:ke.vm.type==="lxc"?"CT":"VM"}),r.jsxs("code",{className:"thumb-preview-id",children:["#",ke.vm.vmid]}),r.jsx("span",{children:ke.vm.name}),r.jsx("span",{className:"thumb-preview-node",children:ke.vm.node})]}),r.jsx("button",{className:"thumb-preview-close",onClick:()=>te(null),children:"×"})]}),r.jsxs("div",{className:"thumb-preview-body",children:[r.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[r.jsx("div",{className:"tpl-grid"}),r.jsx("div",{className:"tpl-scan"}),r.jsx("div",{className:"tpl-ring"}),r.jsx("div",{className:"tpl-corner tl"}),r.jsx("div",{className:"tpl-corner tr"}),r.jsx("div",{className:"tpl-corner bl"}),r.jsx("div",{className:"tpl-corner br"}),r.jsxs("div",{className:"tpl-status",children:[r.jsxs("span",{className:"tpl-dots",children:[r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{})]}),r.jsx("span",{className:"tpl-text",children:a==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),r.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(ke.clusterId)}/${encodeURIComponent(ke.vm.node)}/${ke.vm.vmid}?max=1600&t=${de}`,alt:`VM ${ke.vm.vmid} full screenshot`,onLoad:y=>{y.currentTarget.parentElement.dataset.loaded="1"},onError:y=>{y.currentTarget.parentElement.dataset.error="1"}})]})]})}),r.jsx(Zm,{state:Se,onClose:ut,onShowDetails:()=>{Se.vm&&i(`${Se.vm.node}/${Se.vm.vmid}`)},onPowerAction:V,onOpenConsole:async()=>{if(!Se.vm)return;const y=Se.vm,L=Se.clusterId;if(C==="disabled"){await s.alert(n("console.disabled"));return}if(C==="prompt"){S({vm:y,clusterId:L});return}try{const _=await De.consolePrepare({cluster_id:L,node:y.node,vmid:y.vmid});$(L,y,_.console_token,_.vnc_password)}catch(_){const M=_ instanceof Error?_.message:String(_);await s.alert(n("console.prepare_failed",{err:M}))}},onRemoteMigrate:()=>{Se.vm&&f({vm:Se.vm,clusterId:Se.clusterId})},onOpenSnapshots:()=>{Se.vm&&v({vm:Se.vm,clusterId:Se.clusterId})},onBackupNow:()=>{Se.vm&&w({vm:Se.vm,clusterId:Se.clusterId})},getNodeHealth:wn,userRole:((Kr=c.user)==null?void 0:Kr.role_global)??null,consoleMode:C,consolePasswordSet:!!g[Se.clusterId]}),r.jsx(Mh,{open:l!==null,title:l?Oi(l.action,n):"",destructive:l?Bh(l.action):!1,details:l?r.jsxs(r.Fragment,{children:[n(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:Oi(l.action,n),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?Oi(l.action,n):n("action.cancel"),onConfirm:F,onCancel:()=>d(null)}),r.jsx(e0,{open:m!==null,cluster_id:(m==null?void 0:m.clusterId)||"",vm:m?{vmid:m.vm.vmid,name:m.vm.name,node:m.vm.node,type:m.vm.type}:null,onClose:()=>f(null)}),r.jsx(t0,{open:p!==null,cluster_id:(p==null?void 0:p.clusterId)||"",vm:p?{vmid:p.vm.vmid,name:p.vm.name,node:p.vm.node,type:p.vm.type}:null,onClose:()=>v(null)}),r.jsx(r0,{open:b!==null,cluster_id:(b==null?void 0:b.clusterId)||"",vm:b?{vmid:b.vm.vmid,name:b.vm.name,node:b.vm.node,type:b.vm.type}:null,onClose:()=>w(null)}),r.jsx(n0,{open:N!==null,cluster_id:(N==null?void 0:N.clusterId)||"",pveUser:(()=>{const y=N==null?void 0:N.clusterId;if(!y)return"root@pam";const L=t&&t[y]||((e==null?void 0:e.id)===y?e:null);return"root@pam"})(),onCancel:()=>S(null),onSubmit:async y=>{if(!N)return;const{vm:L,clusterId:_}=N,M=await De.consolePrepare({cluster_id:_,node:L.node,vmid:L.vmid,password:y});$(_,L,M.console_token,M.vnc_password),S(null)}}),E.length>0&&r.jsx("div",{className:"mig-fail-stack",children:E.map(y=>{const L=`qm unlock ${y.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:y.vmid,target:y.targetNode||"?",lock:y.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:y.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:L}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var _;(_=navigator.clipboard)==null||_.writeText(L).then(()=>{z(M=>M.map(I=>I.id===y.id?{...I,copied:!0}:I))})},children:y.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>z(_=>_.filter(M=>M.id!==y.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},y.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),Y==="thumb"&&r.jsxs("span",{className:"legend-thumb-refresh",title:a==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),a==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),r.jsx("style",{children:`
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
          grid-template-columns: repeat(auto-fill, minmax(${H}px, 1fr));
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
      `})]})}function Ws(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function a0(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Vh({vm:e,index:t,previousIndex:n,onClick:a,onContextMenu:s,isSelected:o,task:i}){var h;const c=e.memory.used_bytes/e.memory.total_bytes*100,l=((h=e.disk)==null?void 0:h.usage_percent)||0,d=Ce(e.cpu.usage_percent),m=Ce(c),f=Ce(l),p=u.useRef(null),[v,b]=u.useState(n===void 0),w=a0(i||null);u.useEffect(()=>{if(v){const N=setTimeout(()=>b(!1),50);return()=>clearTimeout(N)}},[v]);const C=e.name.length>10?e.name.substring(0,9)+"…":e.name,g=Math.max(e.cpu.usage_percent,c,l)>95?"critical":"warning";return r.jsxs("div",{ref:p,className:`anomaly-item ${g} ${v?"entering":""} ${o?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${st(e.cpu.usage_percent,1)}
MEM: ${st(c,1)}
DISK: ${st(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:a,onContextMenu:N=>s==null?void 0:s(N,e),children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${d}`}),r.jsx("span",{className:"anomaly-name",children:C}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),w&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${w.color}30`,borderColor:w.color,color:w.color},children:w.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${m}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(c)})]}),r.jsxs("div",{className:`metric-gauge ${f}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Bc(e){return e?{vmid:e.vm.vmid,name:e.vm.name,node:e.vm.node,type:e.vm.type}:null}function Hh({sel:e,onClose:t}){const n=u.useMemo(()=>Bc(e),[e]);return r.jsx(t0,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function Yh({sel:e,onClose:t}){const n=u.useMemo(()=>Bc(e),[e]);return r.jsx(r0,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function Gh({sel:e,onClose:t}){const n=u.useMemo(()=>Bc(e),[e]);return r.jsx(e0,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function Xh({cluster:e,clusters:t,isPaused:n=!1}){var de;const{t:a}=Be(),s=u.useRef(null),o=u.useRef(null),[i,c]=u.useState(0),[l,d]=u.useState(null),[m,f]=u.useState(new Map),[p,v]=u.useState(new Map),[b,w]=u.useState("grid"),[C,x]=u.useState(0);u.useEffect(()=>{const R=setTimeout(()=>w("line"),600),j=setTimeout(()=>w("flip"),1100),Q=setTimeout(()=>w("done"),3300);return()=>{clearTimeout(R),clearTimeout(j),clearTimeout(Q)}},[]),u.useEffect(()=>{if(b==="grid"){x(0);return}const R=b==="line"?1500:1200;let j,Q=null;const ie=C,be=O=>{Q===null&&(Q=O);const le=O-Q,he=Math.min(le/R,1),ue=1-Math.pow(1-he,3),ye=ie+(1-ie)*ue;x(ye),he<1&&(j=requestAnimationFrame(be))};return j=requestAnimationFrame(be),()=>cancelAnimationFrame(j)},[b]);const g=!e&&t&&Object.keys(t).length>0,h=u.useMemo(()=>{if(!e&&!g)return[];const R=[];return g?Object.values(t).forEach(j=>{Object.values(j.vms).forEach(Q=>{Q.status==="running"&&!Q.template&&R.push(Q)})}):e&&Object.values(e.vms).forEach(j=>{j.status==="running"&&!j.template&&R.push(j)}),R},[e,t,g]),N=u.useMemo(()=>h.map((R,j)=>{var Oe;const Q=j/h.length*Math.PI*2,ie=R.cpu.usage_percent,be=R.memory.total_bytes>0?R.memory.used_bytes/R.memory.total_bytes*100:0,O=((Oe=R.disk)==null?void 0:Oe.usage_percent)||0,le=Math.max(ie,be,O),he=.2+le/100*.6,ue=Ce(le),ye=Ws(R.vmid,R.node,R.cluster_id,e,t);return{vm:R,angle:Q,distance:he,color:ue,task:ye}}),[h,e,t]),S=u.useMemo(()=>{if(!e&&!g)return[];const R=[];return g?Object.values(t).forEach(Q=>{Object.values(Q.vms).forEach(ie=>R.push(ie))}):e&&Object.values(e.vms).forEach(Q=>R.push(Q)),R.filter(Q=>{if(Q.status!=="running"||Q.template)return!1;const ie=Q.memory.used_bytes/Q.memory.total_bytes*100,be=Q.disk.total_bytes>0?Q.disk.used_bytes/Q.disk.total_bytes*100:0;return Q.cpu.usage_percent>80||ie>85||be>85}).sort((Q,ie)=>{const be=Q.memory.used_bytes/Q.memory.total_bytes*100,O=ie.memory.used_bytes/ie.memory.total_bytes*100,le=Q.disk.total_bytes>0?Q.disk.used_bytes/Q.disk.total_bytes*100:0,he=ie.disk.total_bytes>0?ie.disk.used_bytes/ie.disk.total_bytes*100:0,ue=Math.max(Q.cpu.usage_percent,be,le);return Math.max(ie.cpu.usage_percent,O,he)-ue})},[e,t,g]);u.useEffect(()=>{const R=new Map;S.forEach((j,Q)=>{R.set(`${j.cluster_id}/${j.node}/${j.vmid}`,Q)}),f(R)},[S]);const $=u.useCallback(R=>{const j=s.current;if(!j)return;const Q=j.getBoundingClientRect(),ie=j.width/Q.width,be=j.height/Q.height,O=(R.clientX-Q.left)*ie,le=(R.clientY-Q.top)*be,he=Math.min(j.width,j.height),ue=j.width/2,ye=j.height/2,Oe=he*.4;let Ne=null;for(const Ve of N){const Ee=ue+Math.cos(Ve.angle)*Oe*Ve.distance,me=ye+Math.sin(Ve.angle)*Oe*Ve.distance,$e=Math.sqrt((O-Ee)**2+(le-me)**2),Ae=15*Math.max(ie,be);if($e<Ae){Ne={vm:Ve.vm,x:R.clientX,y:R.clientY,pointX:Ee,pointY:me};break}}d(Ne)},[N]),E=u.useCallback(()=>{d(null)},[]),z=u.useCallback(R=>{const j=s.current;if(!j)return;const Q=N.find(ye=>ye.vm.node===R.node&&ye.vm.vmid===R.vmid);if(!Q)return;const ie=Math.min(j.width,j.height),be=j.width/2,O=j.height/2,le=ie*.4,he=be+Math.cos(Q.angle)*le*Q.distance,ue=O+Math.sin(Q.angle)*le*Q.distance;d({vm:Q.vm,x:he,y:ue,pointX:he,pointY:ue})},[N]),U=Gr(),A=((de=ys().user)==null?void 0:de.role_global)??null,[F,ee]=u.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),B=u.useCallback(()=>ee(R=>({...R,visible:!1})),[]),P=u.useCallback((R,j)=>{R.preventDefault(),R.stopPropagation();const Q=j.cluster_id||(e==null?void 0:e.id)||"";ee({visible:!0,x:R.clientX,y:R.clientY,vm:j,clusterId:Q})},[e]),q=u.useCallback((R,j)=>{var ie;const Q=(t==null?void 0:t[R])||((e==null?void 0:e.id)===R?e:null);return((ie=Q==null?void 0:Q.client_health)==null?void 0:ie[j])||null},[e,t]),T=u.useCallback(async R=>{const{vm:j,action:Q,clusterId:ie}=R,be=j.type==="lxc";if(!((Q==="stop"||Q==="shutdown"||Q==="reboot")&&!await U.confirm(`${Q.toUpperCase()} ${j.name} (#${j.vmid})?`,{title:"Confirm",destructive:!0})))try{const le=be?await De.ctAction(ie,j.node,j.vmid,Q):await De.vmAction(ie,j.node,j.vmid,Q);console.info(`[radar] ${Q} ${be?"ct":"vm"}/${j.vmid} → upid=${le.upid}`)}catch(le){const he=le instanceof Error?le.message:String(le);he.includes("vm_control_disabled")?await U.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await U.alert(`${Q} failed: ${he.slice(0,200)}`)}},[U]),[D,W]=u.useState(null),[G,ne]=u.useState(null),[k,je]=u.useState(null),[Y,Me]=u.useState(null),[ae,xe]=u.useState("disabled");u.useEffect(()=>{De.getConfig().then(R=>{var j;return xe(((j=R.console)==null?void 0:j.mode)||"disabled")}).catch(()=>xe("disabled"))},[]);const ke=u.useCallback((R,j,Q,ie)=>{const be=typeof localStorage<"u"&&localStorage.getItem("language")||"",O=j.type==="lxc",he=`${O?"/console-term":"/console"}/${encodeURIComponent(R)}/${encodeURIComponent(j.node)}/${j.vmid}?ct=${encodeURIComponent(Q)}`+(j.name?`&name=${encodeURIComponent(j.name)}`:"")+(be?`&lang=${encodeURIComponent(be)}`:"")+(!O&&ie?`#vp=${encodeURIComponent(ie)}`:"");window.open(he,"_blank","noopener,noreferrer")},[]),te=u.useCallback(async()=>{if(!F.vm)return;const R=F.vm,j=F.clusterId;if(ae==="disabled"){await U.alert(a("console.disabled"));return}if(ae==="prompt"){Me({vm:R,clusterId:j});return}try{const Q=await De.consolePrepare({cluster_id:j,node:R.node,vmid:R.vmid});ke(j,R,Q.console_token,Q.vnc_password)}catch(Q){const ie=Q instanceof Error?Q.message:String(Q);await U.alert(a("console.prepare_failed",{err:ie}))}},[F,ae,U,a,ke]);return u.useEffect(()=>{if(n||b!=="done")return;const R=setInterval(()=>{c(j=>(j+2)%360)},50);return()=>clearInterval(R)},[n,b]),u.useEffect(()=>{const R=s.current;if(!R)return;const j=R.getContext("2d");if(!j)return;const Q=Math.min(R.width,R.height),ie=R.width/2,be=R.height/2,O=Q*.4;j.clearRect(0,0,R.width,R.height),j.strokeStyle="rgba(0, 240, 255, 0.12)",j.lineWidth=.8;const le=20;for(let me=ie%le;me<R.width;me+=le)j.beginPath(),j.moveTo(me,0),j.lineTo(me,R.height),j.stroke();for(let me=be%le;me<R.height;me+=le)j.beginPath(),j.moveTo(0,me),j.lineTo(R.width,me),j.stroke();if(b!=="flip"&&b!=="done")return;j.globalAlpha=C,j.strokeStyle="rgba(0, 240, 255, 0.25)",j.lineWidth=1.5,j.font='13px "Share Tech Mono", monospace',j.fillStyle="rgba(0, 240, 255, 0.6)",j.textAlign="left";const he=["25%","50%","75%","100%"];for(let me=1;me<=4;me++){const $e=O*(me/4);j.beginPath(),j.arc(ie,be,$e,0,Math.PI*2),j.stroke();const Ae=ie+$e+4,H=be+4;j.fillText(he[me-1],Ae,H)}j.fillStyle="rgba(0, 255, 136, 0.8)",j.textAlign="center",j.font='14px "Share Tech Mono", monospace',j.fillText("0%",ie,be-8),j.font='11px "Share Tech Mono", monospace',j.fillText("LOW",ie,be+8),j.fillStyle="rgba(0, 240, 255, 0.5)",j.textAlign="left",j.font='10px "Share Tech Mono", monospace',j.beginPath(),j.moveTo(ie-O,be),j.lineTo(ie+O,be),j.moveTo(ie,be-O),j.lineTo(ie,be+O),j.stroke();const ue=i*Math.PI/180;for(let me=0;me<8;me++){const $e=.12*(me+1),Ae=.15-me*.015;j.fillStyle=`rgba(0, 240, 255, ${Ae})`,j.beginPath(),j.moveTo(ie,be),j.arc(ie,be,O,ue-$e,ue-$e+.12),j.closePath(),j.fill()}j.save(),j.shadowBlur=20,j.shadowColor="#00f0ff";const ye=j.createLinearGradient(ie,be,ie+Math.cos(ue)*O,be+Math.sin(ue)*O);ye.addColorStop(0,"rgba(0, 255, 200, 1)"),ye.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),ye.addColorStop(1,"rgba(0, 240, 255, 0)"),j.strokeStyle=ye,j.lineWidth=3,j.beginPath(),j.moveTo(ie,be),j.lineTo(ie+Math.cos(ue)*O,be+Math.sin(ue)*O),j.stroke(),j.lineWidth=1.5,ye.addColorStop(0,"rgba(255, 255, 255, 1)"),j.stroke(),j.restore();const Oe=ie+Math.cos(ue)*O*.95,Ne=be+Math.sin(ue)*O*.95,Ve=j.createRadialGradient(Oe,Ne,0,Oe,Ne,15);Ve.addColorStop(0,"rgba(0, 255, 200, 0.8)"),Ve.addColorStop(1,"rgba(0, 240, 255, 0)"),j.fillStyle=Ve,j.beginPath(),j.arc(Oe,Ne,15,0,Math.PI*2),j.fill();const Ee=[];N.forEach(me=>{const $e=`${me.vm.cluster_id}/${me.vm.node}/${me.vm.vmid}`,Ae=(me.angle*180/Math.PI+360)%360;(i-Ae+360)%360<=5&&Ee.push({key:$e,point:{vm:me.vm,angle:me.angle,distance:me.distance,color:me.color,lastScanAngle:i}})}),Ee.length>0&&v(me=>{const $e=new Map(me);Ee.forEach(({key:H,point:se})=>{$e.set(H,se)});const Ae=new Set(N.map(H=>`${H.vm.cluster_id}/${H.vm.node}/${H.vm.vmid}`));for(const H of $e.keys())Ae.has(H)||$e.delete(H);return $e}),N.forEach(me=>{var xt,$t;const $e=ie+Math.cos(me.angle)*O*me.distance,Ae=be+Math.sin(me.angle)*O*me.distance,H=(me.angle*180/Math.PI+360)%360,se=(i-H+360)%360;let Z;se<20?Z=1:se<60?Z=1-(se-20)/40*.4:Z=.6-(se-60)/300*.45;let we="#00ff88";me.color==="warning"&&(we="#ff6b00"),me.color==="danger"&&(we="#ff0040");const _e=!!me.task,Pe=($t=(xt=me.task)==null?void 0:xt.task_type)==null?void 0:$t.includes("migrate");if(_e){const pe=Pe?"#00f0ff":"#a855f7",He=Date.now()/500%1;if(j.beginPath(),j.arc($e,Ae,12+He*8,0,Math.PI*2),j.strokeStyle=pe,j.lineWidth=1.5,j.globalAlpha=(1-He)*.6*C,j.stroke(),j.beginPath(),j.arc($e,Ae,10,0,Math.PI*2),j.strokeStyle=pe,j.lineWidth=1,j.globalAlpha=.8*C,j.stroke(),Pe){const Se=Date.now()/200%(Math.PI*2);j.beginPath(),j.arc($e,Ae,15,Se,Se+Math.PI/2),j.strokeStyle=pe,j.lineWidth=2,j.globalAlpha=.9*C,j.stroke();for(let Xe=0;Xe<3;Xe++){const ot=Se+Xe*Math.PI*2/3,qt=8+(Date.now()/100+Xe*50)%100/100*10,Tt=$e+Math.cos(ot)*qt,Wt=Ae+Math.sin(ot)*qt;j.beginPath(),j.arc(Tt,Wt,1.5,0,Math.PI*2),j.fillStyle=pe,j.globalAlpha=(.8-(Date.now()/100+Xe*50)%100/100*.6)*C,j.fill()}}j.globalAlpha=C}j.beginPath(),j.arc($e,Ae,4+me.vm.cpu.usage_percent/100*4,0,Math.PI*2),j.fillStyle=we,j.globalAlpha=Z*C,j.fill(),j.shadowBlur=10,j.shadowColor=we,j.fill(),j.shadowBlur=0,j.globalAlpha=C}),j.beginPath(),j.arc(ie,be,6,0,Math.PI*2),j.fillStyle="#00f0ff",j.fill()},[i,N,b,C]),u.useEffect(()=>{const R=s.current;if(!R)return;const j=()=>{const Q=R.parentElement;Q&&(R.width=Q.clientWidth,R.height=Q.clientHeight)};return j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)},[]),!e&&!g?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${b!=="done"?"entering":""} ${b==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(b==="line"||b==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${b}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:$,onMouseLeave:E,style:{position:"absolute",top:0,left:0,cursor:l?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:C},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),l&&(()=>{var nt,Pt,Pr;const R=s.current;if(!R)return null;const j=R.width,Q=R.height,ie=R.getBoundingClientRect(),be=ie.width,O=ie.height,le=be/j,he=O/Q,ue=l.pointX*le,ye=l.pointY*he,Oe=be,Ne=O,Ve=180,me=Ws(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t)?175:145,$e=Ve/2,Ae=me/2,H=50,se=120,Z=Oe/2,we=Ne/2,_e=ue-Z,Pe=ye-we,xt=Math.sqrt(_e*_e+Pe*Pe)||1,$t=_e/xt,pe=Pe/xt,He=(ze,Te)=>{const qe=ze-$e,Ze=ze+$e,gt=Te-Ae,Ct=Te+Ae;if(ue>=qe&&ue<=Ze&&ye>=gt&&ye<=Ct)return-1;const Ye=Math.max(qe,Math.min(Ze,ue)),wt=Math.max(gt,Math.min(Ct,ye));return Math.sqrt((ue-Ye)**2+(ye-wt)**2)},Se=20,Xe=(ze,Te)=>({x:Math.max($e+Se,Math.min(Oe-$e-Se,ze)),y:Math.max(Ae+Se,Math.min(Ne-Ae-Se,Te))}),qt=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((ze,Te)=>{const qe=ze.dx*$t+ze.dy*pe;return Te.dx*$t+Te.dy*pe-qe});let Tt={x:ue+$t*se,y:ye+pe*se},Wt=!1;for(const ze of qt){const Te={x:ue+ze.dx*se,y:ye+ze.dy*se},qe=Xe(Te.x,Te.y),Ze=qe.x-ue,gt=qe.y-ye,Ye=Math.sqrt(Ze*Ze+gt*gt)>30&&Math.abs(Math.abs(Ze)-Math.abs(gt))<20,wt=He(qe.x,qe.y);if(Ye&&wt>=H){Tt=qe,Wt=!0;break}}if(!Wt)for(const ze of qt){const Te={x:ue+ze.dx*(se+60),y:ye+ze.dy*(se+60)},qe=Xe(Te.x,Te.y),Ze=qe.x-ue,gt=qe.y-ye,Ye=Math.sqrt(Ze*Ze+gt*gt)>30&&Math.abs(Math.abs(Ze)-Math.abs(gt))<20,wt=He(qe.x,qe.y);if(Ye&&wt>=H){Tt=qe,Wt=!0;break}}if(!Wt){const ze=qt[0],Te=ze.dx>0?(Oe-$e-10-ue)/ze.dx:($e+10-ue)/ze.dx,qe=ze.dy>0?(Ne-Ae-10-ye)/ze.dy:(Ae+10-ye)/ze.dy,Ze=Math.min(Math.abs(Te),Math.abs(qe),se),gt=Math.max(H+20,Ze);Tt={x:ue+ze.dx*gt,y:ye+ze.dy*gt}}const bt=20,pr=Math.max($e+bt,Math.min(Oe-$e-bt,Tt.x)),X=Math.max(Ae+bt,Math.min(Ne-Ae-bt,Tt.y)),Qe=ue,rt=ye,mt=20,yt=28,it=5,ft=-Math.PI/2,Qt=pr-$e,Xr=X-Ae,Tr=pr,mr=X,vn=l.vm.memory.total_bytes>0?l.vm.memory.used_bytes/l.vm.memory.total_bytes*100:0,bn=((nt=l.vm.disk)==null?void 0:nt.usage_percent)||0,yn=Math.max(l.vm.cpu.usage_percent,vn,bn),wn=Ce(yn),ut={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[wn]||"#00f0ff";return Oe<=0||Ne<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const ze=Math.sqrt((Tr-Qe)**2+(mr-rt)**2),Te=Math.atan2(mr-rt,Tr-Qe)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Qe,top:rt,width:ze,height:2,background:`linear-gradient(90deg, ${ut}, ${ut}80)`,transformOrigin:"0 50%",transform:`rotate(${Te}deg)`,boxShadow:`0 0 8px ${ut}, 0 0 16px ${ut}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Qe-yt-5,top:rt-yt-5,width:(yt+5)*2,height:(yt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const ze=yt+5,Te=yt+5,qe=[];for(let Ye=0;Ye<it;Ye++){const wt=ft+Ye*2*Math.PI/it;qe.push(`${ze+mt*Math.cos(wt)},${Te+mt*Math.sin(wt)}`)}const Ze=qe.join(" "),gt=[];for(let Ye=0;Ye<it;Ye++){const wt=ft+Ye*2*Math.PI/it;gt.push(`${ze+yt*Math.cos(wt)},${Te+yt*Math.sin(wt)}`)}const Ct=gt.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:Ct,fill:"none",stroke:ut,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${ze}px ${Te}px`}}),r.jsx("polygon",{points:Ze,fill:"none",stroke:ut,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(Ye=>{const wt=ft+Ye*2*Math.PI/it,kt=ze+mt*Math.cos(wt),ar=Te+mt*Math.sin(wt),Rr=6,jn=ft+(Ye-1+it)%it*2*Math.PI/it,Kr=ft+(Ye+1)%it*2*Math.PI/it,y=kt+Rr*Math.cos(jn+Math.PI),L=ar+Rr*Math.sin(jn+Math.PI),_=kt+Rr*Math.cos(Kr+Math.PI),M=ar+Rr*Math.sin(Kr+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:kt,y1:ar,x2:y,y2:L,stroke:ut,strokeWidth:"2"}),r.jsx("line",{x1:kt,y1:ar,x2:_,y2:M,stroke:ut,strokeWidth:"2"})]},Ye)}),r.jsx("line",{x1:ze-5,y1:Te,x2:ze+5,y2:Te,stroke:ut,strokeWidth:"1"}),r.jsx("line",{x1:ze,y1:Te-5,x2:ze,y2:Te+5,stroke:ut,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${wn}`,style:{position:"absolute",left:Qt,top:Xr,width:Ve,height:me,borderColor:ut,boxShadow:`0 0 15px ${ut}40, 0 0 30px ${ut}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:ut}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:ut}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:ut}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:ut}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:l.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",l.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:l.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${Ce(l.vm.cpu.usage_percent)}`,children:st(l.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${Ce(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100)}`,children:st(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${Ce(((Pt=l.vm.disk)==null?void 0:Pt.usage_percent)||0)}`,children:st(((Pr=l.vm.disk)==null?void 0:Pr.usage_percent)||0,1)})]}),(()=>{const ze=Ws(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t),Te=a0(ze);return Te?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${Te.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:Te.color},children:Te.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:C},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:S.length})]}),r.jsx("div",{className:"anomaly-list",children:S.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):S.map((R,j)=>{const Q=`${R.cluster_id}/${R.node}/${R.vmid}`,ie=m.get(Q),be=(l==null?void 0:l.vm.node)===R.node&&(l==null?void 0:l.vm.vmid)===R.vmid&&(l==null?void 0:l.vm.cluster_id)===R.cluster_id,O=Ws(R.vmid,R.node,R.cluster_id,e,t);return r.jsx(Vh,{vm:R,index:j,previousIndex:ie,onClick:()=>z(R),onContextMenu:P,isSelected:be,task:O},Q)})})]})]}),r.jsx(Zm,{state:F,onClose:B,onShowDetails:()=>{F.vm&&z(F.vm)},onPowerAction:T,onOpenConsole:te,onOpenSnapshots:()=>{F.vm&&W({vm:F.vm,clusterId:F.clusterId})},onBackupNow:()=>{F.vm&&ne({vm:F.vm,clusterId:F.clusterId})},onRemoteMigrate:()=>{F.vm&&je({vm:F.vm,clusterId:F.clusterId})},getNodeHealth:q,userRole:A,consoleMode:ae,consolePasswordSet:!1}),r.jsx(Hh,{sel:D,onClose:()=>W(null)}),r.jsx(Yh,{sel:G,onClose:()=>ne(null)}),r.jsx(Gh,{sel:k,onClose:()=>je(null)}),r.jsx(n0,{open:Y!==null,cluster_id:(Y==null?void 0:Y.clusterId)||"",pveUser:"root@pam",onCancel:()=>Me(null),onSubmit:async R=>{if(!Y)return;const{vm:j,clusterId:Q}=Y,ie=await De.consolePrepare({cluster_id:Q,node:j.node,vmid:j.vmid,password:R});ke(Q,j,ie.console_token,ie.vnc_password),Me(null)}}),r.jsx("style",{children:`
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

      `})]})}function Kh({value:e,duration:t=800,suffix:n=""}){const[a,s]=u.useState(0),o=u.useRef(0),i=u.useRef(0);return u.useEffect(()=>{o.current=a;const c=performance.now(),l=d=>{const m=d-c,f=Math.min(m/t,1),p=1-Math.pow(1-f,3);s(o.current+(e-o.current)*p),f<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function To({value:e,duration:t=800}){const[n,a]=u.useState(0),s=u.useRef(0),o=u.useRef(0);return u.useEffect(()=>{s.current=n;const i=performance.now(),c=l=>{const d=l-i,m=Math.min(d/t,1),f=1-Math.pow(1-m,3);a(s.current+(e-s.current)*f),m<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Ie(n)})}function qh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(Kh,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function Qh({mons:e,mgrs:t,mds:n}){const{t:a}=Be();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function Jh({osds:e,onSelect:t}){const{t:n}=Be(),a=u.useMemo(()=>{const o={};return e.forEach(i=>{const c=i.host||"unknown";o[c]||(o[c]=[]),o[c].push(i)}),Object.entries(o).sort(([i],[c])=>i.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,c])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:c.sort((l,d)=>l.id-d.id).map(l=>{const d=l.total_bytes>0?l.used_bytes/l.total_bytes*100:0,m=l.status!=="up"||Ce(d)==="danger"?"#ff0040":Ce(d)==="warning"?"#ff6b00":"#00ff88",f=o*30;return o++,r.jsx("div",{className:`osd-hex ${l.status==="up"?"up":"down"}`,style:{"--osd-color":m,animationDelay:`${f}ms`},onClick:()=>t(l),title:`OSD.${l.id} - ${st(d,0)}`,children:r.jsx("span",{className:"osd-id",children:l.id})},l.id)})})]},i))})()})]})}function Zh({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=u.useRef(null),i=u.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),c=u.useRef(0),l=u.useRef(0),d=100,m=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return u.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),u.useEffect(()=>{const f=o.current;if(!f)return;const p=f.getContext("2d");if(!p)return;const v=window.devicePixelRatio||1,b=()=>{const E=f.getBoundingClientRect();return f.width=E.width*v,f.height=E.height*v,p.setTransform(v,0,0,v,0,0),{width:E.width,height:E.height}};let{width:w,height:C}=b();const x=42,g=w-x;let h=0;const N=50;let S=0;const $=E=>{const z=E-h;h=E,S+=z;const U=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*U,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*U,S>=N&&(S=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),l.current=(l.current+.5)%20,p.clearRect(0,0,w,C);const V=Math.max(...i.current.read,...i.current.write,1),A=8,F=4;p.font="9px monospace",p.fillStyle="rgba(0, 240, 255, 0.6)",p.textAlign="right",p.textBaseline="middle";for(let B=0;B<=F;B++){const P=A+B/F*(C-A*2),q=V*(1-B/F);p.fillText(m(q),x-4,P)}p.strokeStyle="rgba(0, 240, 255, 0.06)",p.lineWidth=1;for(let B=0;B<=F;B++){const P=A+B/F*(C-A*2);p.beginPath(),p.setLineDash([4,4]),p.lineDashOffset=-l.current,p.moveTo(x,P),p.lineTo(w,P),p.stroke()}p.setLineDash([]);const ee=(B,P,q)=>{if(B.length<2)return;const T=B.map((W,G)=>({x:x+G/(d-1)*g,y:C-A-W/V*(C-A*2)}));p.strokeStyle=q,p.lineWidth=6,p.lineCap="round",p.lineJoin="round",p.globalAlpha=.3,p.beginPath(),p.moveTo(T[0].x,T[0].y);for(let W=1;W<T.length-1;W++){const G=(T[W].x+T[W+1].x)/2,ne=(T[W].y+T[W+1].y)/2;p.quadraticCurveTo(T[W].x,T[W].y,G,ne)}p.lineTo(T[T.length-1].x,T[T.length-1].y),p.stroke(),p.globalAlpha=1,p.strokeStyle=P,p.lineWidth=2,p.shadowColor=P,p.shadowBlur=8,p.beginPath(),p.moveTo(T[0].x,T[0].y);for(let W=1;W<T.length-1;W++){const G=(T[W].x+T[W+1].x)/2,ne=(T[W].y+T[W+1].y)/2;p.quadraticCurveTo(T[W].x,T[W].y,G,ne)}p.lineTo(T[T.length-1].x,T[T.length-1].y),p.stroke(),p.shadowBlur=0;const D=3;for(let W=0;W<D;W++){const G=(l.current/20+W/D)%1,ne=Math.floor(G*(T.length-1));ne<T.length&&(p.fillStyle=P,p.globalAlpha=.8,p.beginPath(),p.arc(T[ne].x,T[ne].y,3,0,Math.PI*2),p.fill())}p.globalAlpha=1};ee(i.current.write,"#ff6b00","#ff6b00"),ee(i.current.read,"#00ff88","#00ff88"),s||(c.current=requestAnimationFrame($))};return c.current=requestAnimationFrame($),()=>cancelAnimationFrame(c.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Ie(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Ie(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function uu({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Ie(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function ex({osd:e,onClose:t}){const{t:n}=Be(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=Ce(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Ie(e.used_bytes)," / ",Ie(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:st(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function tx({ceph:e}){const{t}=Be(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Ie(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Ie(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",st(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",st(a,1)]})]})]})}function rx({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:st(n,0)})]})})}function nx({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function ax({ceph:e}){const{t}=Be(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(To,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(To,{value:e.total_bytes})})]})]})}function sx({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function ox({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(To,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(To,{value:t,duration:500}),"/s"]})]})]})}function ix({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:st(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function lx({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=Be();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx(rx,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(nx,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx(ax,{ceph:e}),r.jsx(ox,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx(sx,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(ix,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),c=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),l=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(qh,{ceph:e}),r.jsx(tx,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(Qh,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,m)=>r.jsx(uu,{pool:d,totalBytes:e.total_bytes},d.name))})]}),c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,m)=>r.jsx(uu,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(Zh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(Jh,{osds:e.osds,onSelect:n})]})]})})}function cx({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Be(),[s,o]=u.useState(null),i=!e&&t&&Object.keys(t).length>0,c=u.useMemo(()=>i?Object.entries(t).filter(([l,d])=>d.ceph).map(([l,d])=>({id:l,name:d.name||l,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:Fi})]}):c.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:Fi})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:c.map((l,d)=>{const m=l.ceph.health==="HEALTH_OK"?"success":l.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[c.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${m}`}),r.jsx("span",{className:"section-name",children:l.name}),r.jsxs("span",{className:"section-osd",children:[l.ceph.osd_up,"/",l.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(lx,{ceph:l.ceph,clusterName:c.length===1?l.name:void 0,onOSDSelect:o,compact:c.length>1,isPaused:n})]},l.id)})}),s&&r.jsx(ex,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:Fi})]})}const Fi=`
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
`;var dx={value:()=>{}};function s0(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new ao(n)}function ao(e){this._=e}function ux(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}ao.prototype=s0.prototype={constructor:ao,on:function(e,t){var n=this._,a=ux(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=px(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=pu(n[s],e.name,t);else if(t==null)for(s in n)n[s]=pu(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new ao(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function px(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function pu(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=dx,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var Fl="http://www.w3.org/1999/xhtml";const mu={svg:"http://www.w3.org/2000/svg",xhtml:Fl,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ai(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),mu.hasOwnProperty(t)?{space:mu[t],local:e}:e}function mx(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Fl&&t.documentElement.namespaceURI===Fl?t.createElement(e):t.createElementNS(n,e)}}function fx(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function o0(e){var t=ai(e);return(t.local?fx:mx)(t)}function gx(){}function Wc(e){return e==null?gx:function(){return this.querySelector(e)}}function hx(e){typeof e!="function"&&(e=Wc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=new Array(i),l,d,m=0;m<i;++m)(l=o[m])&&(d=e.call(l,l.__data__,m,o))&&("__data__"in l&&(d.__data__=l.__data__),c[m]=d);return new kr(a,this._parents)}function xx(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function vx(){return[]}function i0(e){return e==null?vx:function(){return this.querySelectorAll(e)}}function bx(e){return function(){return xx(e.apply(this,arguments))}}function yx(e){typeof e=="function"?e=bx(e):e=i0(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&(a.push(e.call(l,l.__data__,d,i)),s.push(l));return new kr(a,s)}function l0(e){return function(){return this.matches(e)}}function c0(e){return function(t){return t.matches(e)}}var wx=Array.prototype.find;function kx(e){return function(){return wx.call(this.children,e)}}function jx(){return this.firstElementChild}function Nx(e){return this.select(e==null?jx:kx(typeof e=="function"?e:c0(e)))}var _x=Array.prototype.filter;function Sx(){return Array.from(this.children)}function Cx(e){return function(){return _x.call(this.children,e)}}function Mx(e){return this.selectAll(e==null?Sx:Cx(typeof e=="function"?e:c0(e)))}function zx(e){typeof e!="function"&&(e=l0(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new kr(a,this._parents)}function d0(e){return new Array(e.length)}function Ex(){return new kr(this._enter||this._groups.map(d0),this._parents)}function Po(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Po.prototype={constructor:Po,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function $x(e){return function(){return e}}function Tx(e,t,n,a,s,o){for(var i=0,c,l=t.length,d=o.length;i<d;++i)(c=t[i])?(c.__data__=o[i],a[i]=c):n[i]=new Po(e,o[i]);for(;i<l;++i)(c=t[i])&&(s[i]=c)}function Px(e,t,n,a,s,o,i){var c,l,d=new Map,m=t.length,f=o.length,p=new Array(m),v;for(c=0;c<m;++c)(l=t[c])&&(p[c]=v=i.call(l,l.__data__,c,t)+"",d.has(v)?s[c]=l:d.set(v,l));for(c=0;c<f;++c)v=i.call(e,o[c],c,o)+"",(l=d.get(v))?(a[c]=l,l.__data__=o[c],d.delete(v)):n[c]=new Po(e,o[c]);for(c=0;c<m;++c)(l=t[c])&&d.get(p[c])===l&&(s[c]=l)}function Rx(e){return e.__data__}function Ix(e,t){if(!arguments.length)return Array.from(this,Rx);var n=t?Px:Tx,a=this._parents,s=this._groups;typeof e!="function"&&(e=$x(e));for(var o=s.length,i=new Array(o),c=new Array(o),l=new Array(o),d=0;d<o;++d){var m=a[d],f=s[d],p=f.length,v=Lx(e.call(m,m&&m.__data__,d,a)),b=v.length,w=c[d]=new Array(b),C=i[d]=new Array(b),x=l[d]=new Array(p);n(m,f,w,C,x,v,t);for(var g=0,h=0,N,S;g<b;++g)if(N=w[g]){for(g>=h&&(h=g+1);!(S=C[h])&&++h<b;);N._next=S||null}}return i=new kr(i,a),i._enter=c,i._exit=l,i}function Lx(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Ax(){return new kr(this._exit||this._groups.map(d0),this._parents)}function Ox(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function Fx(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),c=new Array(s),l=0;l<i;++l)for(var d=n[l],m=a[l],f=d.length,p=c[l]=new Array(f),v,b=0;b<f;++b)(v=d[b]||m[b])&&(p[b]=v);for(;l<s;++l)c[l]=n[l];return new kr(c,this._parents)}function Dx(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function Bx(e){e||(e=Wx);function t(f,p){return f&&p?e(f.__data__,p.__data__):!f-!p}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],c=i.length,l=s[o]=new Array(c),d,m=0;m<c;++m)(d=i[m])&&(l[m]=d);l.sort(t)}return new kr(s,this._parents).order()}function Wx(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Ux(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Vx(){return Array.from(this)}function Hx(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function Yx(){let e=0;for(const t of this)++e;return e}function Gx(){return!this.node()}function Xx(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,c;o<i;++o)(c=s[o])&&e.call(c,c.__data__,o,s);return this}function Kx(e){return function(){this.removeAttribute(e)}}function qx(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Qx(e,t){return function(){this.setAttribute(e,t)}}function Jx(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Zx(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function ev(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function tv(e,t){var n=ai(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?qx:Kx:typeof t=="function"?n.local?ev:Zx:n.local?Jx:Qx)(n,t))}function u0(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function rv(e){return function(){this.style.removeProperty(e)}}function nv(e,t,n){return function(){this.style.setProperty(e,t,n)}}function av(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function sv(e,t,n){return arguments.length>1?this.each((t==null?rv:typeof t=="function"?av:nv)(e,t,n??"")):ga(this.node(),e)}function ga(e,t){return e.style.getPropertyValue(t)||u0(e).getComputedStyle(e,null).getPropertyValue(t)}function ov(e){return function(){delete this[e]}}function iv(e,t){return function(){this[e]=t}}function lv(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function cv(e,t){return arguments.length>1?this.each((t==null?ov:typeof t=="function"?lv:iv)(e,t)):this.node()[e]}function p0(e){return e.trim().split(/^|\s+/)}function Uc(e){return e.classList||new m0(e)}function m0(e){this._node=e,this._names=p0(e.getAttribute("class")||"")}m0.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function f0(e,t){for(var n=Uc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function g0(e,t){for(var n=Uc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function dv(e){return function(){f0(this,e)}}function uv(e){return function(){g0(this,e)}}function pv(e,t){return function(){(t.apply(this,arguments)?f0:g0)(this,e)}}function mv(e,t){var n=p0(e+"");if(arguments.length<2){for(var a=Uc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?pv:t?dv:uv)(n,t))}function fv(){this.textContent=""}function gv(e){return function(){this.textContent=e}}function hv(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function xv(e){return arguments.length?this.each(e==null?fv:(typeof e=="function"?hv:gv)(e)):this.node().textContent}function vv(){this.innerHTML=""}function bv(e){return function(){this.innerHTML=e}}function yv(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function wv(e){return arguments.length?this.each(e==null?vv:(typeof e=="function"?yv:bv)(e)):this.node().innerHTML}function kv(){this.nextSibling&&this.parentNode.appendChild(this)}function jv(){return this.each(kv)}function Nv(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function _v(){return this.each(Nv)}function Sv(e){var t=typeof e=="function"?e:o0(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Cv(){return null}function Mv(e,t){var n=typeof e=="function"?e:o0(e),a=t==null?Cv:typeof t=="function"?t:Wc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function zv(){var e=this.parentNode;e&&e.removeChild(this)}function Ev(){return this.each(zv)}function $v(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Tv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Pv(e){return this.select(e?Tv:$v)}function Rv(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Iv(e){return function(t){e.call(this,t,this.__data__)}}function Lv(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function Av(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function Ov(e,t,n){return function(){var a=this.__on,s,o=Iv(t);if(a){for(var i=0,c=a.length;i<c;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function Fv(e,t,n){var a=Lv(e+""),s,o=a.length,i;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,d=c.length,m;l<d;++l)for(s=0,m=c[l];s<o;++s)if((i=a[s]).type===m.type&&i.name===m.name)return m.value}return}for(c=t?Ov:Av,s=0;s<o;++s)this.each(c(a[s],t,n));return this}function h0(e,t,n){var a=u0(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function Dv(e,t){return function(){return h0(this,e,t)}}function Bv(e,t){return function(){return h0(this,e,t.apply(this,arguments))}}function Wv(e,t){return this.each((typeof t=="function"?Bv:Dv)(e,t))}function*Uv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var Vv=[null];function kr(e,t){this._groups=e,this._parents=t}function ws(){return new kr([[document.documentElement]],Vv)}function Hv(){return this}kr.prototype=ws.prototype={constructor:kr,select:hx,selectAll:yx,selectChild:Nx,selectChildren:Mx,filter:zx,data:Ix,enter:Ex,exit:Ax,join:Ox,merge:Fx,selection:Hv,order:Dx,sort:Bx,call:Ux,nodes:Vx,node:Hx,size:Yx,empty:Gx,each:Xx,attr:tv,style:sv,property:cv,classed:mv,text:xv,html:wv,raise:jv,lower:_v,append:Sv,insert:Mv,remove:Ev,clone:Pv,datum:Rv,on:Fv,dispatch:Wv,[Symbol.iterator]:Uv};function Vc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function x0(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function ks(){}var us=.7,Ro=1/us,ia="\\s*([+-]?\\d+)\\s*",ps="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Er="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Yv=/^#([0-9a-f]{3,8})$/,Gv=new RegExp(`^rgb\\(${ia},${ia},${ia}\\)$`),Xv=new RegExp(`^rgb\\(${Er},${Er},${Er}\\)$`),Kv=new RegExp(`^rgba\\(${ia},${ia},${ia},${ps}\\)$`),qv=new RegExp(`^rgba\\(${Er},${Er},${Er},${ps}\\)$`),Qv=new RegExp(`^hsl\\(${ps},${Er},${Er}\\)$`),Jv=new RegExp(`^hsla\\(${ps},${Er},${Er},${ps}\\)$`),fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Vc(ks,ms,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:gu,formatHex:gu,formatHex8:Zv,formatHsl:eb,formatRgb:hu,toString:hu});function gu(){return this.rgb().formatHex()}function Zv(){return this.rgb().formatHex8()}function eb(){return v0(this).formatHsl()}function hu(){return this.rgb().formatRgb()}function ms(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=Yv.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?xu(t):n===3?new Yt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Us(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Us(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Gv.exec(e))?new Yt(t[1],t[2],t[3],1):(t=Xv.exec(e))?new Yt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Kv.exec(e))?Us(t[1],t[2],t[3],t[4]):(t=qv.exec(e))?Us(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Qv.exec(e))?yu(t[1],t[2]/100,t[3]/100,1):(t=Jv.exec(e))?yu(t[1],t[2]/100,t[3]/100,t[4]):fu.hasOwnProperty(e)?xu(fu[e]):e==="transparent"?new Yt(NaN,NaN,NaN,0):null}function xu(e){return new Yt(e>>16&255,e>>8&255,e&255,1)}function Us(e,t,n,a){return a<=0&&(e=t=n=NaN),new Yt(e,t,n,a)}function tb(e){return e instanceof ks||(e=ms(e)),e?(e=e.rgb(),new Yt(e.r,e.g,e.b,e.opacity)):new Yt}function Dl(e,t,n,a){return arguments.length===1?tb(e):new Yt(e,t,n,a??1)}function Yt(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}Vc(Yt,Dl,x0(ks,{brighter(e){return e=e==null?Ro:Math.pow(Ro,e),new Yt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?us:Math.pow(us,e),new Yt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Yt(Tn(this.r),Tn(this.g),Tn(this.b),Io(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:vu,formatHex:vu,formatHex8:rb,formatRgb:bu,toString:bu}));function vu(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}`}function rb(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}${zn((isNaN(this.opacity)?1:this.opacity)*255)}`}function bu(){const e=Io(this.opacity);return`${e===1?"rgb(":"rgba("}${Tn(this.r)}, ${Tn(this.g)}, ${Tn(this.b)}${e===1?")":`, ${e})`}`}function Io(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Tn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function zn(e){return e=Tn(e),(e<16?"0":"")+e.toString(16)}function yu(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new vr(e,t,n,a)}function v0(e){if(e instanceof vr)return new vr(e.h,e.s,e.l,e.opacity);if(e instanceof ks||(e=ms(e)),!e)return new vr;if(e instanceof vr)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,c=o-s,l=(o+s)/2;return c?(t===o?i=(n-a)/c+(n<a)*6:n===o?i=(a-t)/c+2:i=(t-n)/c+4,c/=l<.5?o+s:2-o-s,i*=60):c=l>0&&l<1?0:i,new vr(i,c,l,e.opacity)}function nb(e,t,n,a){return arguments.length===1?v0(e):new vr(e,t,n,a??1)}function vr(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}Vc(vr,nb,x0(ks,{brighter(e){return e=e==null?Ro:Math.pow(Ro,e),new vr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?us:Math.pow(us,e),new vr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new Yt(Di(e>=240?e-240:e+120,s,a),Di(e,s,a),Di(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new vr(wu(this.h),Vs(this.s),Vs(this.l),Io(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Io(this.opacity);return`${e===1?"hsl(":"hsla("}${wu(this.h)}, ${Vs(this.s)*100}%, ${Vs(this.l)*100}%${e===1?")":`, ${e})`}`}}));function wu(e){return e=(e||0)%360,e<0?e+360:e}function Vs(e){return Math.max(0,Math.min(1,e||0))}function Di(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const b0=e=>()=>e;function ab(e,t){return function(n){return e+n*t}}function sb(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function ob(e){return(e=+e)==1?y0:function(t,n){return n-t?sb(t,n,e):b0(isNaN(t)?n:t)}}function y0(e,t){var n=t-e;return n?ab(e,n):b0(isNaN(e)?t:e)}const ku=function e(t){var n=ob(t);function a(s,o){var i=n((s=Dl(s)).r,(o=Dl(o)).r),c=n(s.g,o.g),l=n(s.b,o.b),d=y0(s.opacity,o.opacity);return function(m){return s.r=i(m),s.g=c(m),s.b=l(m),s.opacity=d(m),s+""}}return a.gamma=e,a}(1);function Zr(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Bl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Bi=new RegExp(Bl.source,"g");function ib(e){return function(){return e}}function lb(e){return function(t){return e(t)+""}}function cb(e,t){var n=Bl.lastIndex=Bi.lastIndex=0,a,s,o,i=-1,c=[],l=[];for(e=e+"",t=t+"";(a=Bl.exec(e))&&(s=Bi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),c[i]?c[i]+=o:c[++i]=o),(a=a[0])===(s=s[0])?c[i]?c[i]+=s:c[++i]=s:(c[++i]=null,l.push({i,x:Zr(a,s)})),n=Bi.lastIndex;return n<t.length&&(o=t.slice(n),c[i]?c[i]+=o:c[++i]=o),c.length<2?l[0]?lb(l[0].x):ib(t):(t=l.length,function(d){for(var m=0,f;m<t;++m)c[(f=l[m]).i]=f.x(d);return c.join("")})}var ju=180/Math.PI,Wl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function w0(e,t,n,a,s,o){var i,c,l;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(l=e*n+t*a)&&(n-=e*l,a-=t*l),(c=Math.sqrt(n*n+a*a))&&(n/=c,a/=c,l/=c),e*a<t*n&&(e=-e,t=-t,l=-l,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*ju,skewX:Math.atan(l)*ju,scaleX:i,scaleY:c}}var Hs;function db(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Wl:w0(t.a,t.b,t.c,t.d,t.e,t.f)}function ub(e){return e==null||(Hs||(Hs=document.createElementNS("http://www.w3.org/2000/svg","g")),Hs.setAttribute("transform",e),!(e=Hs.transform.baseVal.consolidate()))?Wl:(e=e.matrix,w0(e.a,e.b,e.c,e.d,e.e,e.f))}function k0(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,m,f,p,v,b){if(d!==f||m!==p){var w=v.push("translate(",null,t,null,n);b.push({i:w-4,x:Zr(d,f)},{i:w-2,x:Zr(m,p)})}else(f||p)&&v.push("translate("+f+t+p+n)}function i(d,m,f,p){d!==m?(d-m>180?m+=360:m-d>180&&(d+=360),p.push({i:f.push(s(f)+"rotate(",null,a)-2,x:Zr(d,m)})):m&&f.push(s(f)+"rotate("+m+a)}function c(d,m,f,p){d!==m?p.push({i:f.push(s(f)+"skewX(",null,a)-2,x:Zr(d,m)}):m&&f.push(s(f)+"skewX("+m+a)}function l(d,m,f,p,v,b){if(d!==f||m!==p){var w=v.push(s(v)+"scale(",null,",",null,")");b.push({i:w-4,x:Zr(d,f)},{i:w-2,x:Zr(m,p)})}else(f!==1||p!==1)&&v.push(s(v)+"scale("+f+","+p+")")}return function(d,m){var f=[],p=[];return d=e(d),m=e(m),o(d.translateX,d.translateY,m.translateX,m.translateY,f,p),i(d.rotate,m.rotate,f,p),c(d.skewX,m.skewX,f,p),l(d.scaleX,d.scaleY,m.scaleX,m.scaleY,f,p),d=m=null,function(v){for(var b=-1,w=p.length,C;++b<w;)f[(C=p[b]).i]=C.x(v);return f.join("")}}}var pb=k0(db,"px, ","px)","deg)"),mb=k0(ub,", ",")",")"),ha=0,La=0,Ma=0,j0=1e3,Lo,Aa,Ao=0,On=0,si=0,fs=typeof performance=="object"&&performance.now?performance:Date,N0=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Hc(){return On||(N0(fb),On=fs.now()+si)}function fb(){On=0}function Oo(){this._call=this._time=this._next=null}Oo.prototype=_0.prototype={constructor:Oo,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?Hc():+n)+(t==null?0:+t),!this._next&&Aa!==this&&(Aa?Aa._next=this:Lo=this,Aa=this),this._call=e,this._time=n,Ul()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ul())}};function _0(e,t,n){var a=new Oo;return a.restart(e,t,n),a}function gb(){Hc(),++ha;for(var e=Lo,t;e;)(t=On-e._time)>=0&&e._call.call(void 0,t),e=e._next;--ha}function Nu(){On=(Ao=fs.now())+si,ha=La=0;try{gb()}finally{ha=0,xb(),On=0}}function hb(){var e=fs.now(),t=e-Ao;t>j0&&(si-=t,Ao=e)}function xb(){for(var e,t=Lo,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Lo=n);Aa=e,Ul(a)}function Ul(e){if(!ha){La&&(La=clearTimeout(La));var t=e-On;t>24?(e<1/0&&(La=setTimeout(Nu,e-fs.now()-si)),Ma&&(Ma=clearInterval(Ma))):(Ma||(Ao=fs.now(),Ma=setInterval(hb,j0)),ha=1,N0(Nu))}}function _u(e,t,n){var a=new Oo;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var vb=s0("start","end","cancel","interrupt"),bb=[],S0=0,Su=1,Vl=2,so=3,Cu=4,Hl=5,oo=6;function oi(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;yb(e,n,{name:t,index:a,group:s,on:vb,tween:bb,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:S0})}function Yc(e,t){var n=jr(e,t);if(n.state>S0)throw new Error("too late; already scheduled");return n}function $r(e,t){var n=jr(e,t);if(n.state>so)throw new Error("too late; already running");return n}function jr(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function yb(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=_0(o,0,n.time);function o(d){n.state=Su,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var m,f,p,v;if(n.state!==Su)return l();for(m in a)if(v=a[m],v.name===n.name){if(v.state===so)return _u(i);v.state===Cu?(v.state=oo,v.timer.stop(),v.on.call("interrupt",e,e.__data__,v.index,v.group),delete a[m]):+m<t&&(v.state=oo,v.timer.stop(),v.on.call("cancel",e,e.__data__,v.index,v.group),delete a[m])}if(_u(function(){n.state===so&&(n.state=Cu,n.timer.restart(c,n.delay,n.time),c(d))}),n.state=Vl,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Vl){for(n.state=so,s=new Array(p=n.tween.length),m=0,f=-1;m<p;++m)(v=n.tween[m].value.call(e,e.__data__,n.index,n.group))&&(s[++f]=v);s.length=f+1}}function c(d){for(var m=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(l),n.state=Hl,1),f=-1,p=s.length;++f<p;)s[f].call(e,m);n.state===Hl&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=oo,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function wb(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>Vl&&a.state<Hl,a.state=oo,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function kb(e){return this.each(function(){wb(this,e)})}function jb(e,t){var n,a;return function(){var s=$r(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,c=a.length;i<c;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Nb(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=$r(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var c={name:t,value:n},l=0,d=s.length;l<d;++l)if(s[l].name===t){s[l]=c;break}l===d&&s.push(c)}o.tween=s}}function _b(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=jr(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?jb:Nb)(n,e,t))}function Gc(e,t,n){var a=e._id;return e.each(function(){var s=$r(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return jr(s,a).value[t]}}function C0(e,t){var n;return(typeof t=="number"?Zr:t instanceof ms?ku:(n=ms(t))?(t=n,ku):cb)(e,t)}function Sb(e){return function(){this.removeAttribute(e)}}function Cb(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Mb(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function zb(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function Eb(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttribute(e):(i=this.getAttribute(e),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function $b(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function Tb(e,t){var n=ai(e),a=n==="transform"?mb:C0;return this.attrTween(e,typeof t=="function"?(n.local?$b:Eb)(n,a,Gc(this,"attr."+e,t)):t==null?(n.local?Cb:Sb)(n):(n.local?zb:Mb)(n,a,t))}function Pb(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Rb(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Ib(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&Rb(e,o)),n}return s._value=t,s}function Lb(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&Pb(e,o)),n}return s._value=t,s}function Ab(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=ai(e);return this.tween(n,(a.local?Ib:Lb)(a,t))}function Ob(e,t){return function(){Yc(this,e).delay=+t.apply(this,arguments)}}function Fb(e,t){return t=+t,function(){Yc(this,e).delay=t}}function Db(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Ob:Fb)(t,e)):jr(this.node(),t).delay}function Bb(e,t){return function(){$r(this,e).duration=+t.apply(this,arguments)}}function Wb(e,t){return t=+t,function(){$r(this,e).duration=t}}function Ub(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Bb:Wb)(t,e)):jr(this.node(),t).duration}function Vb(e,t){if(typeof t!="function")throw new Error;return function(){$r(this,e).ease=t}}function Hb(e){var t=this._id;return arguments.length?this.each(Vb(t,e)):jr(this.node(),t).ease}function Yb(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;$r(this,e).ease=n}}function Gb(e){if(typeof e!="function")throw new Error;return this.each(Yb(this._id,e))}function Xb(e){typeof e!="function"&&(e=l0(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new Hr(a,this._parents,this._name,this._id)}function Kb(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),c=0;c<o;++c)for(var l=t[c],d=n[c],m=l.length,f=i[c]=new Array(m),p,v=0;v<m;++v)(p=l[v]||d[v])&&(f[v]=p);for(;c<a;++c)i[c]=t[c];return new Hr(i,this._parents,this._name,this._id)}function qb(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Qb(e,t,n){var a,s,o=qb(t)?Yc:$r;return function(){var i=o(this,e),c=i.on;c!==a&&(s=(a=c).copy()).on(t,n),i.on=s}}function Jb(e,t){var n=this._id;return arguments.length<2?jr(this.node(),n).on.on(e):this.each(Qb(n,e,t))}function Zb(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function ey(){return this.on("end.remove",Zb(this._id))}function ty(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Wc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var c=a[i],l=c.length,d=o[i]=new Array(l),m,f,p=0;p<l;++p)(m=c[p])&&(f=e.call(m,m.__data__,p,c))&&("__data__"in m&&(f.__data__=m.__data__),d[p]=f,oi(d[p],t,n,p,d,jr(m,n)));return new Hr(o,this._parents,t,n)}function ry(e){var t=this._name,n=this._id;typeof e!="function"&&(e=i0(e));for(var a=this._groups,s=a.length,o=[],i=[],c=0;c<s;++c)for(var l=a[c],d=l.length,m,f=0;f<d;++f)if(m=l[f]){for(var p=e.call(m,m.__data__,f,l),v,b=jr(m,n),w=0,C=p.length;w<C;++w)(v=p[w])&&oi(v,t,n,w,p,b);o.push(p),i.push(m)}return new Hr(o,i,t,n)}var ny=ws.prototype.constructor;function ay(){return new ny(this._groups,this._parents)}function sy(e,t){var n,a,s;return function(){var o=ga(this,e),i=(this.style.removeProperty(e),ga(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function M0(e){return function(){this.style.removeProperty(e)}}function oy(e,t,n){var a,s=n+"",o;return function(){var i=ga(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function iy(e,t,n){var a,s,o;return function(){var i=ga(this,e),c=n(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(e),ga(this,e))),i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c))}}function ly(e,t){var n,a,s,o="style."+t,i="end."+o,c;return function(){var l=$r(this,e),d=l.on,m=l.value[o]==null?c||(c=M0(t)):void 0;(d!==n||s!==m)&&(a=(n=d).copy()).on(i,s=m),l.on=a}}function cy(e,t,n){var a=(e+="")=="transform"?pb:C0;return t==null?this.styleTween(e,sy(e,a)).on("end.style."+e,M0(e)):typeof t=="function"?this.styleTween(e,iy(e,a,Gc(this,"style."+e,t))).each(ly(this._id,e)):this.styleTween(e,oy(e,a,t),n).on("end.style."+e,null)}function dy(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function uy(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&dy(e,i,n)),a}return o._value=t,o}function py(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,uy(e,t,n??""))}function my(e){return function(){this.textContent=e}}function fy(e){return function(){var t=e(this);this.textContent=t??""}}function gy(e){return this.tween("text",typeof e=="function"?fy(Gc(this,"text",e)):my(e==null?"":e+""))}function hy(e){return function(t){this.textContent=e.call(this,t)}}function xy(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&hy(s)),t}return a._value=e,a}function vy(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,xy(e))}function by(){for(var e=this._name,t=this._id,n=z0(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)if(l=i[d]){var m=jr(l,t);oi(l,e,n,d,i,{time:m.time+m.delay+m.duration,delay:0,duration:m.duration,ease:m.ease})}return new Hr(a,this._parents,e,n)}function yy(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var c={value:i},l={value:function(){--s===0&&o()}};n.each(function(){var d=$r(this,a),m=d.on;m!==e&&(t=(e=m).copy(),t._.cancel.push(c),t._.interrupt.push(c),t._.end.push(l)),d.on=t}),s===0&&o()})}var wy=0;function Hr(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function z0(){return++wy}var Ir=ws.prototype;Hr.prototype={constructor:Hr,select:ty,selectAll:ry,selectChild:Ir.selectChild,selectChildren:Ir.selectChildren,filter:Xb,merge:Kb,selection:ay,transition:by,call:Ir.call,nodes:Ir.nodes,node:Ir.node,size:Ir.size,empty:Ir.empty,each:Ir.each,on:Jb,attr:Tb,attrTween:Ab,style:cy,styleTween:py,text:gy,textTween:vy,remove:ey,tween:_b,delay:Db,duration:Ub,ease:Hb,easeVarying:Gb,end:yy,[Symbol.iterator]:Ir[Symbol.iterator]};function ky(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var jy={time:null,delay:0,duration:250,ease:ky};function Ny(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function _y(e){var t,n;e instanceof Hr?(t=e._id,e=e._name):(t=z0(),(n=jy).time=Hc(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&oi(l,e,t,d,i,n||Ny(l,t));return new Hr(a,this._parents,e,t)}ws.prototype.interrupt=kb;ws.prototype.transition=_y;function Sy(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function Cy(){return this.eachAfter(Sy)}function My(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function zy(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function Ey(e,t){for(var n=this,a=[n],s=[],o,i,c,l=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,c=o.length;i<c;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++l,this);return this}function $y(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function Ty(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function Py(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function Ry(e){for(var t=this,n=Iy(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function Iy(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function Ly(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Ay(){return Array.from(this)}function Oy(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function Fy(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*Dy(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function Xc(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=Uy)):t===void 0&&(t=Wy);for(var n=new Fo(e),a,s=[n],o,i,c,l;a=s.pop();)if((i=t(a.data))&&(l=(i=Array.from(i)).length))for(a.children=i,c=l-1;c>=0;--c)s.push(o=i[c]=new Fo(i[c])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(Hy)}function By(){return Xc(this).eachBefore(Vy)}function Wy(e){return e.children}function Uy(e){return Array.isArray(e)?e[1]:null}function Vy(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Hy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function Fo(e){this.data=e,this.depth=this.height=0,this.parent=null}Fo.prototype=Xc.prototype={constructor:Fo,count:Cy,each:My,eachAfter:Ey,eachBefore:zy,find:$y,sum:Ty,sort:Py,path:Ry,ancestors:Ly,descendants:Ay,leaves:Oy,links:Fy,copy:By,[Symbol.iterator]:Dy};function Yy(e){if(typeof e!="function")throw new Error;return e}function za(){return 0}function Ea(e){return function(){return e}}function Gy(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function Xy(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(a-t)/e.value;++c<l;)i=o[c],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function Ky(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(s-n)/e.value;++c<l;)i=o[c],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var qy=(1+Math.sqrt(5))/2;function Qy(e,t,n,a,s,o){for(var i=[],c=t.children,l,d,m=0,f=0,p=c.length,v,b,w=t.value,C,x,g,h,N,S,$;m<p;){v=s-n,b=o-a;do C=c[f++].value;while(!C&&f<p);for(x=g=C,S=Math.max(b/v,v/b)/(w*e),$=C*C*S,N=Math.max(g/$,$/x);f<p;++f){if(C+=d=c[f].value,d<x&&(x=d),d>g&&(g=d),$=C*C*S,h=Math.max(g/$,$/x),h>N){C-=d;break}N=h}i.push(l={value:C,dice:v<b,children:c.slice(m,f)}),l.dice?Xy(l,n,a,s,w?a+=b*C/w:o):Ky(l,n,a,w?n+=v*C/w:s,o),w-=C,m=f}return i}const E0=function e(t){function n(a,s,o,i,c){Qy(t,a,s,o,i,c)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(qy);function Jy(){var e=E0,t=!1,n=1,a=1,s=[0],o=za,i=za,c=za,l=za,d=za;function m(p){return p.x0=p.y0=0,p.x1=n,p.y1=a,p.eachBefore(f),s=[0],t&&p.eachBefore(Gy),p}function f(p){var v=s[p.depth],b=p.x0+v,w=p.y0+v,C=p.x1-v,x=p.y1-v;C<b&&(b=C=(b+C)/2),x<w&&(w=x=(w+x)/2),p.x0=b,p.y0=w,p.x1=C,p.y1=x,p.children&&(v=s[p.depth+1]=o(p)/2,b+=d(p)-v,w+=i(p)-v,C-=c(p)-v,x-=l(p)-v,C<b&&(b=C=(b+C)/2),x<w&&(w=x=(w+x)/2),e(p,b,w,C,x))}return m.round=function(p){return arguments.length?(t=!!p,m):t},m.size=function(p){return arguments.length?(n=+p[0],a=+p[1],m):[n,a]},m.tile=function(p){return arguments.length?(e=Yy(p),m):e},m.padding=function(p){return arguments.length?m.paddingInner(p).paddingOuter(p):m.paddingInner()},m.paddingInner=function(p){return arguments.length?(o=typeof p=="function"?p:Ea(+p),m):o},m.paddingOuter=function(p){return arguments.length?m.paddingTop(p).paddingRight(p).paddingBottom(p).paddingLeft(p):m.paddingTop()},m.paddingTop=function(p){return arguments.length?(i=typeof p=="function"?p:Ea(+p),m):i},m.paddingRight=function(p){return arguments.length?(c=typeof p=="function"?p:Ea(+p),m):c},m.paddingBottom=function(p){return arguments.length?(l=typeof p=="function"?p:Ea(+p),m):l},m.paddingLeft=function(p){return arguments.length?(d=typeof p=="function"?p:Ea(+p),m):d},m}function Oa(e,t,n){this.k=e,this.x=t,this.y=n}Oa.prototype={constructor:Oa,scale:function(e){return e===1?this:new Oa(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Oa(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Oa.prototype;const Mu={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Zy(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Mu[n]||Mu.default}function zu(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function Eu({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:c=!1,width:l=120,height:d=180,animationDelay:m=0,onClick:f,onHover:p}){const v=u.useRef(null),b=u.useRef(0),w=u.useRef([]),C=u.useRef(0),[x,g]=u.useState(!1),h=n>0?t/n*100:0,[N,S]=u.useState(0),[$,E]=u.useState(!1),[z,U]=u.useState(!0),V=u.useRef(null),A=u.useRef(0),F=1200,ee=500;u.useEffect(()=>{const ne=setTimeout(()=>{E(!0)},m);return()=>clearTimeout(ne)},[m]),u.useEffect(()=>{if(!$)return;A.current=N,V.current=null;const ne=A.current,k=h;if(Math.abs(ne-k)<.1){S(k);return}const je=z?F:ee,Y=Me=>{V.current===null&&(V.current=Me);const ae=Me-V.current,xe=Math.min(ae/je,1),te=(R=>1-Math.pow(1-R,3))(xe),de=ne+(k-ne)*te;S(de),xe<1?requestAnimationFrame(Y):z&&U(!1)};requestAnimationFrame(Y)},[h,$]);const B=N,P=h>=85,q=h>=95,T=Zy(h,a),D=u.useCallback(ne=>{const k=[];for(let je=0;je<ne;je++)k.push({x:Math.random()*l*.6+l*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return k},[l,d]);u.useEffect(()=>{const ne=v.current;if(!ne)return;const k=ne.getContext("2d");if(!k)return;const je=window.devicePixelRatio||1;ne.width=l*je,ne.height=d*je,k.scale(je,je);const Y=P?15:5;w.current=D(Y);const Me=ae=>{ae-C.current,C.current=ae;const xe=ae*.001;k.clearRect(0,0,l,d);const ke=8,te=ke,de=ke+20,R=l-ke*2,j=d-ke*2-40,Q=8,ie=c?.05:B/100,be=j*ie,O=de+j-be,le=k.createLinearGradient(te,de,te,de+j);le.addColorStop(0,"#0a0a12"),le.addColorStop(.5,"#050510"),le.addColorStop(1,"#0a0a12"),k.fillStyle=le,k.beginPath(),k.roundRect(te,de,R,j,Q),k.fill(),k.save(),k.beginPath(),k.roundRect(te,de,R,j,Q),k.clip();const he=12,ue=he*Math.sqrt(3);k.strokeStyle="rgba(0, 240, 255, 0.06)",k.lineWidth=.5;for(let se=0;se<j/ue+1;se++)for(let Z=0;Z<R/(he*1.5)+1;Z++){const we=se%2*he*.75,_e=te+Z*he*1.5+we,Pe=de+se*ue*.5;k.beginPath();for(let xt=0;xt<6;xt++){const $t=Math.PI/3*xt+Math.PI/6,pe=_e+he*.4*Math.cos($t),He=Pe+he*.4*Math.sin($t);xt===0?k.moveTo(pe,He):k.lineTo(pe,He)}k.closePath(),k.stroke()}k.restore();const ye=de+xe*30%j;k.save(),k.beginPath(),k.roundRect(te,de,R,j,Q),k.clip();const Oe=k.createLinearGradient(te,ye-15,te,ye+5);Oe.addColorStop(0,"transparent"),Oe.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Oe.addColorStop(1,"transparent"),k.fillStyle=Oe,k.fillRect(te,ye-15,R,20),k.restore(),k.strokeStyle="rgba(0, 240, 255, 0.2)",k.lineWidth=1;for(let se=0;se<=10;se++){const Z=de+j-j*se/10,we=se%5===0?12:6,_e=se%5===0?.4:.2;k.strokeStyle=`rgba(0, 240, 255, ${_e})`,k.beginPath(),k.moveTo(te+2,Z),k.lineTo(te+2+we,Z),k.stroke(),k.beginPath(),k.moveTo(te+R-2,Z),k.lineTo(te+R-2-we,Z),k.stroke()}const Ne=xe*50%j;for(let se=0;se<3;se++){const Z=de+(Ne+se*j/3)%j,we=.3+Math.sin(xe*3+se)*.2;k.beginPath(),k.strokeStyle=`rgba(0, 240, 255, ${we})`,k.lineWidth=2,k.moveTo(te,Z),k.lineTo(te+4,Z),k.stroke(),k.beginPath(),k.moveTo(te+R,Z),k.lineTo(te+R-4,Z),k.stroke()}if(!c&&ie>0){const se=k.createLinearGradient(0,O,0,de+j);se.addColorStop(0,T.gradient[0]),se.addColorStop(1,T.gradient[1]);const Z=P?6:3,we=.05,_e=P?.1:.05,Pe=Math.PI/3;k.save(),k.beginPath(),k.rect(te,de,R,j),k.clip(),k.fillStyle=se,k.beginPath(),k.moveTo(te,de+j);for(let pe=0;pe<=R;pe+=2){const He=Math.sin(pe*we+xe*_e*60)*Z,Se=Math.sin(pe*we*1.5+xe*_e*40+Pe)*(Z*.5),Xe=O+He+Se;pe===0?k.moveTo(te+pe,Xe):k.lineTo(te+pe,Xe)}k.lineTo(te+R,de+j),k.lineTo(te,de+j),k.closePath(),k.fill(),k.strokeStyle=T.glow,k.lineWidth=2,k.shadowColor=T.main,k.shadowBlur=10,k.beginPath();for(let pe=0;pe<=R;pe+=2){const He=Math.sin(pe*we+xe*_e*60)*Z,Se=Math.sin(pe*we*1.5+xe*_e*40+Pe)*(Z*.5),Xe=O+He+Se;pe===0?k.moveTo(te+pe,Xe):k.lineTo(te+pe,Xe)}k.stroke(),k.shadowBlur=0,w.current.forEach((pe,He)=>{if(pe.y>O&&pe.y<de+j){const Se=Math.sin(xe*pe.wobbleSpeed*60+pe.wobbleOffset)*3;k.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,k.beginPath(),k.arc(pe.x+Se,pe.y,pe.radius,0,Math.PI*2),k.fill(),k.fillStyle="rgba(255, 255, 255, 0.5)",k.beginPath(),k.arc(pe.x+Se-pe.radius*.3,pe.y-pe.radius*.3,pe.radius*.3,0,Math.PI*2),k.fill()}pe.y-=pe.speed*(P?2:1),pe.y<O-10&&(pe.y=de+j+Math.random()*20,pe.x=te+Math.random()*R*.6+R*.2)}),k.restore();const xt=3;for(let pe=0;pe<xt;pe++){const He=te+R*(pe+.5)/xt,Se=xe*2+pe*Math.PI*.7,Xe=(Math.sin(Se)*.5+.5)*.3;if(Xe>.1){const ot=k.createLinearGradient(He-8,O,He+8,de+j);ot.addColorStop(0,"rgba(255, 255, 255, 0)"),ot.addColorStop(.3,`rgba(255, 255, 255, ${Xe})`),ot.addColorStop(.7,`rgba(255, 255, 255, ${Xe*.5})`),ot.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=ot,k.fillRect(He-8,O,16,be)}}const $t=Math.floor(ie*8);for(let pe=0;pe<$t;pe++){const He=pe*137.5,Se=te+10+He*7%(R-20),ot=O+10+He*13%(be-20)+Math.sin(xe*2+He)*5,qt=.4+Math.sin(xe*3+He)*.3;if(k.fillStyle=`rgba(255, 255, 255, ${qt})`,k.beginPath(),k.arc(Se,ot,1.5,0,Math.PI*2),k.fill(),pe>0&&pe%3===0){const Tt=(pe-1)*137.5,Wt=te+10+Tt*7%(R-20),bt=O+10+Tt*13%(be-20)+Math.sin(xe*2+Tt)*5,pr=Math.sqrt((Se-Wt)**2+(ot-bt)**2);pr<30&&(k.strokeStyle=`rgba(255, 255, 255, ${.1*(1-pr/30)})`,k.lineWidth=.5,k.beginPath(),k.moveTo(Se,ot),k.lineTo(Wt,bt),k.stroke())}}if(P){for(let pe=0;pe<8;pe++){const He=te+R*.15+Math.random()*R*.7,Se=O-Math.random()*25,Xe=Math.random()*4+1;k.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,k.beginPath(),k.arc(He,Se,Xe,0,Math.PI*2),k.fill()}Math.sin(xe*10)>.7&&(k.fillStyle="rgba(255, 100, 0, 0.05)",k.fillRect(te,de,R,j))}}const Ve=c||q?"#ff0040":T.main,Ee=q?Math.sin(xe*5)*.3+.7:1;k.strokeStyle=Ve,k.lineWidth=3,k.shadowColor=Ve,k.shadowBlur=x?20:12*Ee,k.beginPath(),k.roundRect(te,de,R,j,Q),k.stroke(),k.shadowBlur=0,k.strokeStyle=`${Ve}60`,k.lineWidth=1,k.beginPath(),k.roundRect(te+3,de+3,R-6,j-6,Q-2),k.stroke();const me=16,$e=3;k.strokeStyle=Ve,k.lineWidth=$e,k.shadowColor=Ve,k.shadowBlur=8,k.beginPath(),k.moveTo(te-2,de+me),k.lineTo(te-2,de-2),k.lineTo(te+me,de-2),k.stroke(),k.beginPath(),k.moveTo(te+R-me,de-2),k.lineTo(te+R+2,de-2),k.lineTo(te+R+2,de+me),k.stroke(),k.beginPath(),k.moveTo(te-2,de+j-me),k.lineTo(te-2,de+j+2),k.lineTo(te+me,de+j+2),k.stroke(),k.beginPath(),k.moveTo(te+R-me,de+j+2),k.lineTo(te+R+2,de+j+2),k.lineTo(te+R+2,de+j-me),k.stroke(),k.shadowBlur=0;const H=2+(Math.sin(xe*4)*.5+.5);if(k.fillStyle=Ve,k.shadowColor=Ve,k.shadowBlur=6,[[te-2,de-2],[te+R+2,de-2],[te-2,de+j+2],[te+R+2,de+j+2]].forEach(([se,Z])=>{k.beginPath(),k.arc(se,Z,H,0,Math.PI*2),k.fill()}),k.shadowBlur=0,!c){const Z=te+R+6,we=j,_e=we*(B/100);k.fillStyle="rgba(0, 20, 40, 0.8)",k.fillRect(Z,de,4,we);const Pe=k.createLinearGradient(0,de+we-_e,0,de+we);Pe.addColorStop(0,T.main),Pe.addColorStop(1,T.gradient[1]),k.fillStyle=Pe,k.fillRect(Z,de+we-_e,4,_e),k.strokeStyle=`${Ve}40`,k.lineWidth=1,k.strokeRect(Z,de,4,we)}if(c){k.strokeStyle="#ff0040",k.lineWidth=2,k.beginPath();const se=te+R*.3,Z=de+j*.3;k.moveTo(se,Z),k.lineTo(se+10,Z+15),k.lineTo(se+5,Z+25),k.lineTo(se+15,Z+40),k.stroke(),k.beginPath(),k.moveTo(se+10,Z+15),k.lineTo(se+20,Z+20),k.stroke()}b.current=requestAnimationFrame(Me)};return b.current=requestAnimationFrame(Me),()=>{cancelAnimationFrame(b.current)}},[l,d,B,P,q,c,T,x,D]);const W=()=>{g(!0),p==null||p(!0)},G=()=>{g(!1),p==null||p(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${q?"critical":""} ${c?"offline":""}`,onClick:f,onMouseEnter:W,onMouseLeave:G,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:T.main,background:`${T.main}15`,borderColor:`${T.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:v,style:{width:l,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${q?"critical":P?"warning":""}`,style:{color:c?"#FF4081":T.main,textShadow:c?"none":`0 0 10px ${T.glow}`},children:c?"OFFLINE":`${h.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[zu(t)," / ",zu(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((ne,k)=>r.jsx("span",{className:"node-tag",children:ne},k))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
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

      `})]})}function e1({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=u.useState(0),i=u.useRef(0),c=u.useRef(null),l=u.useRef(0);u.useEffect(()=>{l.current=s,c.current=null;const v=b=>{c.current===null&&(c.current=b);const w=b-c.current,C=Math.min(w/a,1),x=C===1?1:1-Math.pow(2,-10*C),g=l.current+(e-l.current)*x;o(g),C<1&&(i.current=requestAnimationFrame(v))};return i.current=requestAnimationFrame(v),()=>cancelAnimationFrame(i.current)},[e,a]);const m=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,p=[];for(let v=0;v<f;v++){const b=v/f*100,w=b<s,C=v%4===0;p.push({index:v,isActive:w,isMajor:C,percent:b})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:m},children:Ie(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Ie(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:p.map(v=>r.jsx("div",{className:`segment ${v.isActive?"active":""} ${v.isMajor?"major":""}`,style:{"--segment-color":v.isActive?m:"rgba(60, 80, 100, 0.3)",animationDelay:v.isActive?`${v.index*20}ms`:"0ms"}},v.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${m}40)`,boxShadow:`0 0 20px ${m}60, 0 0 40px ${m}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${m} transparent`,filter:`drop-shadow(0 0 4px ${m})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:m}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:m},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const t1=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function r1({vm:e,position:t,onClose:n}){var x,g,h,N,S;const{t:a,language:s}=Be(),o=u.useRef(null),[i,c]=u.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",m=e.type==="lxc",f=e.disks||[],p=s==="zh-TW",v=((x=e.disk)==null?void 0:x.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,b=v>=90?"#ff0040":v>=70?"#ff6b00":"#00f0ff",w=p?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();u.useEffect(()=>{if(!o.current)return;const E=o.current.getBoundingClientRect(),z=E.width,U=E.height,V=window.innerWidth,A=window.innerHeight,F=15,{cellX:ee,cellY:B,cellTop:P,cellBottom:q,cellLeft:T,cellRight:D}=t;let W=0,G=0,ne=ee,k=B;D+F+z<V?(W=D+F,G=Math.max(F,Math.min(A-U-F,B-U/2)),ne=D,k=B):T-F-z>0?(W=T-F-z,G=Math.max(F,Math.min(A-U-F,B-U/2)),ne=T,k=B):P-F-U>0?(W=Math.max(F,Math.min(V-z-F,ee-z/2)),G=P-F-U,ne=ee,k=P):(W=Math.max(F,Math.min(V-z-F,ee-z/2)),G=q+F,ne=ee,k=q);let je=W,Y=G+U/2;W>D?(je=W,Y=Math.max(G,Math.min(G+U,k))):W+z<T?(je=W+z,Y=Math.max(G,Math.min(G+U,k))):G+U<P?(je=Math.max(W,Math.min(W+z,ne)),Y=G+U):(je=Math.max(W,Math.min(W+z,ne)),Y=G),c({x:W,y:G,lineStart:{x:ne,y:k},lineEnd:{x:je,y:Y}})},[t]);const C=i?(()=>{const $=i.lineEnd.x-i.lineStart.x,E=i.lineEnd.y-i.lineStart.y,z=Math.sqrt($*$+E*E),U=Math.atan2(E,$)*(180/Math.PI);return{width:`${z}px`,transform:`rotate(${U}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&C&&r.jsx("div",{className:"popup-connector-line",style:C}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:$=>$.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:w}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[p?"磁碟":"DISK",f.length>1?p?"":"S":""," (",f.length||1,")"]}),f.length>0?r.jsx("div",{className:"disk-list",children:f.map(($,E)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:$.device}),r.jsx("span",{className:"device-format",children:$.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:$.storage}),r.jsx("span",{className:"disk-size",children:Ie($.size)})]})]},E))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Ie(((g=e.disk)==null?void 0:g.total_bytes)||0)})]})}),m&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Ie(((h=e.disk)==null?void 0:h.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:b},children:[v.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${v}%`,background:b}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((N=e.cpu)==null?void 0:N.cores)||0," ",p?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:p?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Ie(((S=e.memory)==null?void 0:S.total_bytes)||0)})]})]})]})]})}function n1({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=u.useState(null),c=u.useRef(null),l=u.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(v=>({name:v.vm.name,value:v.value,vm:v.vm}))},m=Xc(d).sum(v=>v.value||0).sort((v,b)=>(b.value||0)-(v.value||0));return Jy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(E0.ratio(1))(m).leaves().map(v=>({x:v.x0,y:v.y0,width:v.x1-v.x0,height:v.y1-v.y0,vm:v.data.vm,value:v.value||0}))},[e,t,n]);return l.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:c,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),l.map((d,m)=>{var U;const f=((U=d.vm.disk)==null?void 0:U.total_bytes)||1,p=d.vm.status==="running",v=o===`${d.vm.node}-${d.vm.vmid}`,b=d.width>15&&d.height>12,w=d.width>40&&d.height>25,C=d.width>50&&d.height>40,x=d.width>60&&d.height>55,g=Math.max(...l.map(V=>V.value)),h=d.value/g,N=()=>p?h>.7?"rgba(0, 255, 200, 0.15)":h>.4?"rgba(0, 200, 255, 0.12)":h>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",S=()=>p?h>.7?"rgba(0, 255, 200, 0.9)":h>.4?"rgba(0, 200, 255, 0.85)":h>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",$=()=>p?h>.7?"rgba(0, 255, 200, 0.4)":h>.4?"rgba(0, 200, 255, 0.35)":h>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",E=()=>p?h>.7?"rgba(0, 255, 220, 1)":h>.4?"rgba(100, 220, 255, 1)":h>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",z=a?m*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:V=>{if(V.stopPropagation(),s){const A=V.clientX,F=V.clientY,ee=d.width/2,B=d.height/2;s(d.vm,{cellX:A,cellY:F,cellWidth:d.width,cellHeight:d.height,cellTop:F-B,cellBottom:F+B,cellLeft:A-ee,cellRight:A+ee})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${z}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Ie(f)}`}),p&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:$(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:v?1:.6}}),p&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:S(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:N(),stroke:S(),strokeWidth:v?2:1,rx:4,ry:4,style:{filter:v?`drop-shadow(0 0 12px ${$()}) drop-shadow(0 0 4px ${S()})`:`drop-shadow(0 0 3px ${$()})`,transition:"all 0.2s ease"}}),p&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:S(),strokeWidth:1,opacity:.6}),p&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:S(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:S(),opacity:.8,className:"energy-dot"})]}),p&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),b&&!w&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:p?`0 0 6px ${$()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),w&&(()=>{const V=d.width,A=d.height,F=Math.min(16,Math.max(9,Math.min(V/8,A/5))),ee=Math.min(12,Math.max(8,Math.min(V/10,A/7))),B=Math.min(10,Math.max(7,Math.min(V/12,A/8))),P=Math.floor((V-8)/(F*.6)),q=d.vm.name.length>P?d.vm.name.slice(0,Math.max(1,P-1))+"…":d.vm.name,T=F+(C?ee+2:0)+(x?B+2:0),D=(A-T)/2+F/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:V/2,y:D,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:F,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:p?`0 0 8px ${$()}`:"none",filter:p?`drop-shadow(0 0 2px ${$()})`:"none"},children:q}),C&&r.jsx("text",{x:V/2,y:D+F*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:p?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:ee,fontFamily:"var(--font-mono)",children:Ie(f)}),x&&r.jsxs("text",{x:V/2,y:D+F*.8+(C?ee*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:B,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:p?`drop-shadow(0 0 3px ${$()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function a1({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=Be(),o=u.useRef(null),[i,c]=u.useState({width:0,height:0}),[l,d]=u.useState(!0),[m,f]=u.useState(null);u.useEffect(()=>{const v=()=>{if(o.current){const w=o.current.getBoundingClientRect();c({width:w.width,height:w.height})}};v();const b=new ResizeObserver(v);return o.current&&b.observe(o.current),()=>b.disconnect()},[]),u.useEffect(()=>{if(l&&e.length>0){const v=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(v)}},[l,e.length]);const p=u.useMemo(()=>e.map(v=>{var b;return{vm:v,value:((b=v.disk)==null?void 0:b.total_bytes)||0}}).filter(v=>v.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Ie(e.reduce((v,b)=>{var w;return v+(((w=b.disk)==null?void 0:w.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>f(null),children:i.width>0&&i.height>0&&r.jsx(n1,{data:p,width:i.width,height:i.height,isInitialLoad:l,onVMClick:(v,b)=>f({vm:v,position:b})})}),m&&r.jsx(r1,{vm:m.vm,position:m.position,onClose:()=>f(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function s1({storage:e,position:t,sourcePos:n,onClose:a,onManage:s}){const{t:o}=Be();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,c=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:c.x,y1:c.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((d,m)=>r.jsx("span",{className:"tooltip-label",children:d},m))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.used"),":"]}),r.jsx("span",{children:Ie(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.total"),":"]}),r.jsx("span",{children:Ie(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.usage"),":"]}),r.jsx("span",{className:`text-${Ce(i)}`,children:st(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((d,m)=>r.jsx("span",{className:"tooltip-label node",children:d},m))})]})]}),s&&r.jsx("div",{className:"tooltip-actions",children:r.jsxs("button",{className:"tooltip-action-btn",onClick:d=>{d.stopPropagation(),s(e)},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),r.jsx("span",{children:o("storage.manage")})]})})]})]})}function o1({cluster:e,clusters:t}){const{t:n,language:a}=Be(),[s,o]=u.useState(()=>{if(typeof window>"u")return"tanks";const P=window.location.pathname.split("/").filter(Boolean)[1];return P==="treemap"||P==="tanks"?P:"tanks"});u.useEffect(()=>{if(typeof window>"u")return;const P=window.location.pathname.split("/").filter(Boolean);if(P[0]!=="storage"||P.length>=4)return;const q=`/storage/${s}`;window.location.pathname!==q&&window.history.replaceState(null,"",q)},[s]),u.useEffect(()=>{const P=()=>{const q=window.location.pathname.split("/").filter(Boolean);if(q[0]!=="storage"||q.length>=4)return;const T=q[1];(T==="tanks"||T==="treemap")&&o(T)};return window.addEventListener("popstate",P),()=>window.removeEventListener("popstate",P)},[]);const[i,c]=u.useState("all"),[l,d]=u.useState(""),[m,f]=u.useState(null),[p,v]=u.useState(null),[b,w]=u.useState(null),[C,x]=u.useState(null),[g,h]=u.useState(null),N=u.useCallback(P=>{let q=(e==null?void 0:e.id)||"",T="";if(P.isShared)T=P.connectedNodes[0]||"";else{const W=P.nodeInstances.find(G=>G.active)||P.nodeInstances[0];T=(W==null?void 0:W.node)||""}if(!q&&t){for(const[W,G]of Object.entries(t))if(G.nodes&&G.nodes[T]){q=W;break}}if(!q||!T)return;const D=`/storage/${encodeURIComponent(q)}/${encodeURIComponent(T)}/${encodeURIComponent(P.name)}`;window.history.pushState(null,"",D),window.dispatchEvent(new PopStateEvent("popstate")),v(null),w(null),x(null),h(null)},[e,t]),S=u.useCallback((P,q)=>{P.preventDefault(),P.stopPropagation();const T=Math.min(P.clientX,window.innerWidth-180),D=Math.min(P.clientY,window.innerHeight-80);h({x:T,y:D,storage:q})},[]),$=!e&&t&&Object.keys(t).length>0,E=u.useMemo(()=>{const P=[],q=(T,D)=>{Object.values(T.vms).forEach(W=>{var G;(G=W.disk)!=null&&G.total_bytes&&W.disk.total_bytes>0&&!W.template&&P.push({...W,clusterName:D})})};return $?Object.entries(t).forEach(([T,D])=>{q(D,D.name||T)}):e&&q(e,e.name||""),P.sort((T,D)=>{var W,G;return(((W=D.disk)==null?void 0:W.total_bytes)||0)-(((G=T.disk)==null?void 0:G.total_bytes)||0)})},[e,t,$]),{sharedStorages:z,localStoragesByNode:U,allNodes:V,totals:A,warnings:F}=u.useMemo(()=>{const P=new Map;let q=0,T=0,D=0;const W=new Set,G=ae=>{Object.values(ae.storages).forEach(xe=>{W.add(xe.node);const ke=xe.storage;P.has(ke)||P.set(ke,{name:xe.storage,type:xe.type,content:xe.content,allowedNodes:xe.allowed_nodes||[],nodes:[]}),P.get(ke).nodes.push({node:xe.node,totalBytes:xe.disk.total_bytes,usedBytes:xe.disk.used_bytes,active:xe.enabled!==!1})})};$?Object.values(t).forEach(ae=>G(ae)):e&&G(e);const ne=[],k={};W.forEach(ae=>{k[ae]=[]}),P.forEach(ae=>{const xe=t1.includes(ae.type),ke=ae.nodes[0].totalBytes,te=ae.nodes.length>1&&ke>0&&ae.nodes.every(de=>Math.abs(de.totalBytes-ke)/ke<.01);if(xe||te){const de=ae.nodes[0],R=ae.allowedNodes.length>0?ae.allowedNodes:ae.nodes.map(j=>j.node);ne.push({name:ae.name,type:ae.type,content:ae.content,isShared:!0,totalBytes:de.totalBytes,usedBytes:de.usedBytes,connectedNodes:R,nodeInstances:ae.nodes})}else ae.nodes.forEach(de=>{k[de.node]||(k[de.node]=[]),k[de.node].push({name:ae.name,type:ae.type,content:ae.content,isShared:!1,totalBytes:de.totalBytes,usedBytes:de.usedBytes,connectedNodes:[],nodeInstances:[de]})})});const je=ae=>{if(i==="local"&&ae.isShared||i==="shared"&&!ae.isShared)return!1;if(l){const xe=l.toLowerCase();if(!ae.name.toLowerCase().includes(xe)&&!ae.type.toLowerCase().includes(xe))return!1}return!0},Y=ne.filter(je).sort((ae,xe)=>ae.name.localeCompare(xe.name)),Me={};return Object.entries(k).forEach(([ae,xe])=>{const ke=xe.filter(je).sort((te,de)=>te.name.localeCompare(de.name));ke.length>0&&(Me[ae]=ke)}),Y.forEach(ae=>{(ae.totalBytes>0?ae.usedBytes/ae.totalBytes*100:0)>=85&&D++,q+=ae.usedBytes,T+=ae.totalBytes}),Object.values(Me).flat().forEach(ae=>{(ae.totalBytes>0?ae.usedBytes/ae.totalBytes*100:0)>=85&&D++,q+=ae.usedBytes,T+=ae.totalBytes}),{sharedStorages:Y,localStoragesByNode:Me,allNodes:Array.from(W).sort(),totals:{totalUsed:q,totalCapacity:T},warnings:D}},[e,t,$,i,l]),ee=(P,q)=>{if(p&&p.name===P.name&&p.isShared===P.isShared){v(null),w(null),x(null);return}const T=q.getBoundingClientRect(),D=240,W=200,G=T.top+T.height/2;let ne=T.right+30,k=!1;ne+D>window.innerWidth&&(ne=T.left-D-30,k=!0);let je=T.top;je+W>window.innerHeight&&(je=window.innerHeight-W-10),je<10&&(je=10),v(P),w({x:ne,y:je}),x({x:k?T.left:T.right,y:G})};if(!e&&!$)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const B=A.totalCapacity>0?A.totalUsed/A.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:z.length+Object.values(U).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:z.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(U).flat().length})}),F>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",F," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:l,onChange:P=>d(P.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>c("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>c("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>c("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(e1,{percent:B,usedBytes:A.totalUsed,totalBytes:A.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx(a1,{vmDiskData:E,totals:A,storages:[...z.map(P=>P.name),...Object.values(U).flat().map(P=>P.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&z.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n(z.length>1?"storage.storages_plural":"storage.storages_count",{n:z.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:z.map((P,q)=>r.jsx("div",{onClick:T=>ee(P,T.currentTarget),onContextMenu:T=>S(T,P),style:{cursor:"pointer"},children:r.jsx(Eu,{name:P.name,usedBytes:P.usedBytes,totalBytes:P.totalBytes,type:P.type,isShared:!0,connectedNodes:P.connectedNodes,width:140,height:220,animationDelay:q*80})},P.name))})]}),(i==="all"||i==="local")&&Object.keys(U).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(U).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(U).flat().length})," ",n(Object.keys(U).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(U).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let P=z.length;return Object.entries(U).sort(([q],[T])=>q.localeCompare(T)).flatMap(([q,T])=>T.map(D=>{const W=D.nodeInstances[0],G=P++;return r.jsx("div",{onClick:ne=>ee(D,ne.currentTarget),onContextMenu:ne=>S(ne,D),style:{cursor:"pointer"},children:r.jsx(Eu,{name:D.name,usedBytes:W.usedBytes,totalBytes:W.totalBytes,type:D.type,isShared:!1,nodeName:q,isOffline:!W.active,width:120,height:200,animationDelay:G*80})},`${q}-${D.name}`)}))})()})]}),z.length===0&&Object.keys(U).length===0&&r.jsx("div",{className:"no-storage",children:l?r.jsxs("span",{children:[n("error.no_data"),': "',l,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(s1,{storage:p,position:b,sourcePos:C,onClose:()=>{v(null),w(null),x(null)},onManage:N}),g&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"storage-ctx-shield",onClick:()=>h(null),onContextMenu:P=>{P.preventDefault(),h(null)}}),r.jsx("div",{className:"storage-ctx-menu",style:{left:g.x,top:g.y},onClick:P=>P.stopPropagation(),children:r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{N(g.storage),h(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]}),r.jsx("span",{children:n("storage.content")})]})})]}),r.jsx("style",{children:`
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
      `})]})}const i1=["backup","iso","vztmpl","snippets","import","images","rootdir"],l1=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function c1({clusterId:e,node:t,storageName:n,clusters:a}){var $e,Ae;const{t:s,language:o}=Be(),i=Gr(),c=ys(),l=u.useMemo(()=>{var we,_e;const H=a==null?void 0:a[e];if(!H)return null;const se=H.storages||{};let Z=se[`${t}/${n}`]||se[n];if(!Z){for(const Pe of Object.values(se))if(Pe&&Pe.storage===n){Z=Pe;break}}return Z?{clusterName:H.name||e,type:Z.type||"",content:Z.content||[],total:((we=Z.disk)==null?void 0:we.total_bytes)||0,used:((_e=Z.disk)==null?void 0:_e.used_bytes)||0,shared:!!Z.shared}:null},[a,e,n,t]),d=l?l1.has(l.type):!1,m=(($e=c.user)==null?void 0:$e.role_global)==="operator"||((Ae=c.user)==null?void 0:Ae.role_global)==="admin"||!c.authEnforced,f=u.useMemo(()=>{if(!l)return[];const H=new Set(l.content);return i1.filter(se=>H.has(se))},[l]),[p,v]=u.useState(null);u.useEffect(()=>{p&&f.includes(p)||f.length>0&&v(f[0])},[f,p]);const[b,w]=u.useState([]),[C,x]=u.useState(!1),[g,h]=u.useState(null),[N,S]=u.useState(0),[$,E]=u.useState(!1),[z,U]=u.useState(null),[V,A]=u.useState(0),[F,ee]=u.useState(!1),[B,P]=u.useState(null),[q,T]=u.useState(!1),[D,W]=u.useState(""),[G,ne]=u.useState(""),[k,je]=u.useState(""),[Y,Me]=u.useState(""),[ae,xe]=u.useState(!0),[ke,te]=u.useState(!1),[de,R]=u.useState(null),[j,Q]=u.useState(""),[ie,be]=u.useState("ctime"),[O,le]=u.useState("desc"),he=H=>{ie===H?le(se=>se==="asc"?"desc":"asc"):(be(H),le(H==="name"||H==="format"||H==="notes"?"asc":"desc")),ye(!0),setTimeout(()=>ye(!1),600)},[ue,ye]=u.useState(!1);u.useEffect(()=>{if(!p)return;let H=!1;x(!0),h(null);const se=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content?type=${p}`;return fetch(se,{credentials:"same-origin"}).then(async Z=>{if(!Z.ok){const _e=await Z.text().catch(()=>"");throw new Error(`HTTP ${Z.status}: ${_e.slice(0,200)}`)}const we=await Z.json();H||w(Array.isArray(we.items)?we.items:[])}).catch(Z=>{H||h(String((Z==null?void 0:Z.message)||Z))}).finally(()=>{H||x(!1)}),()=>{H=!0}},[p,N,e,t,n]);const Oe=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},Ne=async H=>{if(!(!m||d||!await i.confirm(o==="zh-TW"?`確定要刪除「${Wn(H.volid)}」？此操作無法復原。`:`Delete "${Wn(H.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const Z=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content/`+encodeURIComponent(H.volid),we=await fetch(Z,{method:"DELETE",credentials:"same-origin"});if(!we.ok){const _e=await we.text().catch(()=>"");throw new Error(`HTTP ${we.status}: ${_e.slice(0,200)}`)}w(_e=>_e.filter(Pe=>Pe.volid!==H.volid)),S(_e=>_e+1)}catch(Z){await i.alert(o==="zh-TW"?`刪除失敗：${Z}`:`Delete failed: ${Z}`,{title:o==="zh-TW"?"錯誤":"Error"})}},Ve=u.useMemo(()=>{let H=b;const se=j.trim().toLowerCase();return se&&(H=b.filter(we=>Wn(we.volid).toLowerCase().includes(se)||(we.format||"").toLowerCase().includes(se)||(we.notes||"").toLowerCase().includes(se))),H.slice().sort((we,_e)=>{let Pe=0;switch(ie){case"name":Pe=Wn(we.volid).localeCompare(Wn(_e.volid));break;case"ctime":Pe=(we.ctime||0)-(_e.ctime||0);break;case"format":Pe=(we.format||"").localeCompare(_e.format||"");break;case"size":Pe=(we.size||0)-(_e.size||0);break;case"vmid":Pe=(we.vmid??-1)-(_e.vmid??-1);break;case"notes":Pe=(we.notes||"").localeCompare(_e.notes||"");break}return O==="asc"?Pe:-Pe})},[b,j,ie,O]),Ee=H=>ie===H?O==="asc"?"▲":"▼":"";if(!l)return r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const me=l.total>0?l.used/l.total*100:0;return r.jsxs("div",{className:"storage-detail",children:[r.jsxs("div",{className:"storage-detail-header",children:[r.jsxs("button",{className:"back-btn",onClick:Oe,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M15 18l-6-6 6-6"})}),r.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),r.jsxs("div",{className:"storage-detail-title",children:[r.jsx("span",{className:"breadcrumb",children:l.clusterName}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb",children:t}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("h1",{className:"storage-name font-display",children:n}),r.jsx("span",{className:`storage-type-badge ${d?"block":"file"}`,children:l.type.toUpperCase()}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),r.jsxs("div",{className:"storage-detail-stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.used")}),r.jsxs("span",{className:`stat-val text-${Ce(me)}`,children:[Ie(l.used)," / ",Ie(l.total)]})]}),r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.usage")}),r.jsx("span",{className:`stat-val text-${Ce(me)}`,children:st(me,1)})]})]})]}),r.jsx("div",{className:"storage-detail-tabs",children:f.length===0?r.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):f.map(H=>r.jsxs("button",{className:`storage-tab tab-${H} ${p===H?"active":""}`,onClick:()=>v(H),children:[r.jsx("span",{className:"tab-icon","aria-hidden":!0,children:d1(H)}),r.jsx("span",{children:Wi(H,o)})]},H))}),r.jsxs("div",{className:"storage-detail-toolbar",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:j,onChange:H=>Q(H.target.value)})]}),!d&&m&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"action-btn",onClick:()=>E(!0),title:o==="zh-TW"?"從本機上傳檔案到此儲存":"Upload a local file to this storage",children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),r.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),r.jsxs("button",{className:"action-btn",onClick:()=>T(!0),title:o==="zh-TW"?"伺服器端從 URL 下載到此儲存（PVE download-url）":"Server-side download to this storage (PVE download-url)",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"})]}),r.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),d&&r.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),r.jsxs("button",{className:"action-btn ghost",onClick:()=>S(H=>H+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),r.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),r.jsxs("div",{className:"storage-detail-list",children:[r.jsx("div",{className:"tab-scan-line"}),C&&b.length===0&&r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),g&&r.jsx("div",{className:"storage-detail-error",children:r.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",g]})}),!C&&!g&&Ve.length===0&&r.jsx("div",{className:"storage-detail-empty",children:r.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),Ve.length>0&&r.jsxs("table",{className:"storage-content-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:`sortable ${ie==="name"?"sorted":""}`,onClick:()=>he("name"),children:r.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",Ee("name")&&r.jsx("span",{className:"sort-indicator",children:Ee("name")})]})}),r.jsx("th",{className:`sortable ${ie==="ctime"?"sorted":""}`,onClick:()=>he("ctime"),children:r.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",Ee("ctime")&&r.jsx("span",{className:"sort-indicator",children:Ee("ctime")})]})}),r.jsx("th",{className:`sortable ${ie==="format"?"sorted":""}`,onClick:()=>he("format"),children:r.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",Ee("format")&&r.jsx("span",{className:"sort-indicator",children:Ee("format")})]})}),r.jsx("th",{className:`num sortable ${ie==="size"?"sorted":""}`,onClick:()=>he("size"),children:r.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",Ee("size")&&r.jsx("span",{className:"sort-indicator",children:Ee("size")})]})}),p==="backup"&&r.jsx("th",{className:`num sortable ${ie==="vmid"?"sorted":""}`,onClick:()=>he("vmid"),children:r.jsxs("span",{children:["VMID",Ee("vmid")&&r.jsx("span",{className:"sort-indicator",children:Ee("vmid")})]})}),p==="backup"&&r.jsx("th",{className:`sortable ${ie==="notes"?"sorted":""}`,onClick:()=>he("notes"),children:r.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",Ee("notes")&&r.jsx("span",{className:"sort-indicator",children:Ee("notes")})]})}),!d&&m&&r.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:Ve.map(H=>{const se=$0(H.format),Z=u1(H.size);return r.jsxs("tr",{className:ue?"sort-animating":"",children:[r.jsxs("td",{className:"name-cell",title:H.volid,children:[r.jsx("span",{className:"file-icon","aria-hidden":!0,children:p1(H.format)}),r.jsx("span",{className:"file-name",children:Wn(H.volid)})]}),r.jsx("td",{className:"date-cell",children:H.ctime?m1(H.ctime):"—"}),r.jsx("td",{children:H.format?r.jsx("span",{className:`format-badge ${se}`,children:H.format}):r.jsx("span",{className:"muted",children:"—"})}),r.jsx("td",{className:`num size-${Z}`,children:H.size?Ie(H.size):"—"}),p==="backup"&&r.jsx("td",{className:"num",children:H.vmid!=null?r.jsxs("span",{className:"vmid-badge",children:["#",H.vmid]}):r.jsx("span",{className:"muted",children:"—"})}),p==="backup"&&r.jsx("td",{className:"notes-cell",title:H.notes||"",children:H.notes||r.jsx("span",{className:"muted",children:"—"})}),!d&&r.jsxs("td",{className:"actions",children:[r.jsx("a",{className:"action-btn-row",href:`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download/`+encodeURIComponent(H.volid),download:!0,title:o==="zh-TW"?"下載到本機（SSH 串流）":"Download to local (SSH stream)",onClick:we=>we.stopPropagation(),children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),m&&r.jsx("button",{className:"action-btn-row danger",onClick:()=>Ne(H),title:o==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"}),r.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]})})]})]},H.volid)})})]})]},p||"none"),$&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!F&&E(!1),onDragOver:H=>H.preventDefault(),onDrop:H=>{var Z;if(H.preventDefault(),F)return;const se=(Z=H.dataTransfer.files)==null?void 0:Z[0];se&&U(se)},children:r.jsxs("div",{className:"url-dl-frame",onClick:H=>H.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsxs("span",{children:[o==="zh-TW"?"上傳到 ":"Upload to ",n]}),r.jsx("button",{className:"url-dl-close",onClick:()=>!F&&E(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`將檔案上傳到此儲存區的 ${Wi(p||"iso",o)} 分類。可拖曳檔案到此視窗。`:`Upload a file to this storage's ${Wi(p||"iso",o)} category. You can also drag-drop into this window.`}),r.jsx("label",{children:o==="zh-TW"?"檔案":"File"}),r.jsx("input",{type:"file",disabled:F,onChange:H=>{var se;return U(((se=H.target.files)==null?void 0:se[0])||null)},style:{width:"100%",padding:"8px",background:"#02050b",border:"1px solid var(--border)",borderRadius:4,color:"var(--text-primary)",fontFamily:"var(--font-mono)",fontSize:13}}),z&&r.jsxs("div",{className:"url-dl-lead",style:{marginTop:8},children:[r.jsx("code",{children:z.name})," · ",r.jsxs("span",{children:[(z.size/(1024*1024)).toFixed(1)," MB"]})]}),F&&r.jsxs("div",{style:{marginTop:12},children:[r.jsx("div",{style:{height:6,background:"#02050b",borderRadius:3,border:"1px solid var(--border)",overflow:"hidden"},children:r.jsx("div",{style:{width:`${V}%`,height:"100%",background:"linear-gradient(90deg, var(--primary), #00b4ff)",transition:"width 0.2s ease",boxShadow:"0 0 8px rgba(0,240,255,0.5)"}})}),r.jsxs("div",{style:{marginTop:6,fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)"},children:[V.toFixed(1),"%"," ",o==="zh-TW"?"上傳中…":"Uploading…"]})]}),B&&r.jsx("div",{className:"url-dl-err",children:B})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!F&&E(!1),disabled:F,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:F||!z||!p,onClick:()=>{if(!z||!p)return;ee(!0),P(null),A(0);const H=new FormData;H.append("content",p),H.append("filename",z,z.name);const se=new XMLHttpRequest;se.upload.onprogress=Z=>{Z.lengthComputable&&A(Z.loaded/Z.total*100)},se.onload=()=>{ee(!1),se.status>=200&&se.status<300?(E(!1),U(null),A(0),S(Z=>Z+1),i.alert(o==="zh-TW"?"上傳完成。檔案已派送到 PVE。":"Upload complete. File dispatched to PVE.",{title:o==="zh-TW"?"完成":"Done"})):P(`HTTP ${se.status}: ${se.responseText.slice(0,200)}`)},se.onerror=()=>{ee(!1),P(o==="zh-TW"?"網路錯誤":"Network error")},se.open("POST",`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/upload`),se.withCredentials=!0,se.send(H)},children:F?o==="zh-TW"?"上傳中…":"Uploading…":o==="zh-TW"?"開始上傳":"Upload"})]})]})}),q&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!ke&&T(!1),children:r.jsxs("div",{className:"url-dl-frame",onClick:H=>H.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsx("span",{children:o==="zh-TW"?"從網址下載":"Download from URL"}),r.jsx("button",{className:"url-dl-close",onClick:()=>!ke&&T(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`PVE 端伺服器會直接從這個網址抓檔到 ${n}，你的網路頻寬不會經手。`:`The PVE host will pull the file directly into ${n}; your bandwidth never carries it.`}),r.jsx("label",{children:o==="zh-TW"?"網址 (URL)":"URL"}),r.jsx("input",{type:"text",value:D,onChange:H=>W(H.target.value),placeholder:"https://example.com/debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"檔名（儲存後）":"Filename (as stored)"}),r.jsx("input",{type:"text",value:G,onChange:H=>ne(H.target.value),placeholder:"debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"校驗 (選填)":"Checksum (optional)"}),r.jsxs("div",{className:"url-dl-row",children:[r.jsxs("select",{value:Y,onChange:H=>Me(H.target.value),className:"url-dl-algo",children:[r.jsx("option",{value:"",children:o==="zh-TW"?"— 演算法 —":"— algorithm —"}),r.jsx("option",{value:"sha256",children:"sha256"}),r.jsx("option",{value:"sha512",children:"sha512"}),r.jsx("option",{value:"md5",children:"md5"})]}),r.jsx("input",{type:"text",value:k,onChange:H=>je(H.target.value),placeholder:o==="zh-TW"?"十六進位摘要":"hex digest",spellCheck:!1,autoComplete:"off"})]}),r.jsxs("label",{className:"url-dl-check",children:[r.jsx("input",{type:"checkbox",checked:ae,onChange:H=>xe(H.target.checked)}),r.jsx("span",{children:o==="zh-TW"?"驗證來源 TLS 憑證（建議開啟）":"Verify source TLS certificate (recommended)"})]}),de&&r.jsx("div",{className:"url-dl-err",children:de})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!ke&&T(!1),disabled:ke,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:ke||!D||!G||!p,onClick:async()=>{if(p){te(!0),R(null);try{const H=await fetch(`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download-url`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:D,filename:G,content:p,checksum:k||void 0,checksum_algorithm:Y||void 0,verify_certificates:ae})});if(!H.ok){const se=await H.text().catch(()=>"");throw new Error(`HTTP ${H.status}: ${se.slice(0,200)}`)}T(!1),W(""),ne(""),je(""),Me(""),setTimeout(()=>S(se=>se+1),1e3),await i.alert(o==="zh-TW"?"下載任務已派送。完成後檔案會出現在清單。":"Download task dispatched. The file will appear in the list when finished.",{title:o==="zh-TW"?"已派送":"Dispatched"})}catch(H){R(String(H instanceof Error?H.message:H))}finally{te(!1)}}},children:ke?o==="zh-TW"?"派送中…":"Dispatching…":o==="zh-TW"?"開始下載":"Start download"})]})]})}),r.jsx("style",{children:`
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
      `})]})}function Wn(e){const t=e.indexOf("/");if(t>=0)return e.slice(t+1);const n=e.indexOf(":");return n>=0?e.slice(n+1):e}function d1(e){switch(e){case"backup":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function Wi(e,t){return t==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[e]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[e]}function $0(e){if(!e)return"fmt-other";const t=e.toLowerCase();return t==="iso"||t==="img"?"fmt-iso":t.startsWith("vma")||t==="pbs-vm"||t==="pbs-ct"?"fmt-backup":t.startsWith("tar")?"fmt-tmpl":t==="qcow2"||t==="raw"||t==="vmdk"||t==="subvol"?"fmt-disk":t==="snippet"||t==="yaml"||t==="yml"||t==="sh"?"fmt-snippet":t==="ovf"||t==="ova"||t==="vmx"?"fmt-import":"fmt-other"}function u1(e){if(!e)return"tiny";const t=e/(1024*1024);return t<50?"tiny":t<1024?"small":t<5120?"medium":t<20480?"large":"huge"}function p1(e,t){const n=$0(e),a=n==="fmt-iso"?"#00b4ff":n==="fmt-backup"?"#ffa500":n==="fmt-tmpl"?"#b464ff":n==="fmt-disk"?"#00f0c8":n==="fmt-snippet"?"#a0c864":n==="fmt-import"?"#ff64b4":"var(--text-muted)";return n==="fmt-iso"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):n==="fmt-backup"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):n==="fmt-tmpl"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]}):n==="fmt-disk"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):n==="fmt-snippet"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]}):n==="fmt-import"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function m1(e,t){const n=new Date(e*1e3),a=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${a(n.getMonth()+1)}-${a(n.getDate())} ${a(n.getHours())}:${a(n.getMinutes())}`}function $u(){if(typeof window>"u")return null;const e=window.location.pathname.split("/").filter(Boolean);return e.length<4||e[0]!=="storage"?null:{clusterId:decodeURIComponent(e[1]),node:decodeURIComponent(e[2]),storage:decodeURIComponent(e[3])}}function f1({cluster:e,clusters:t}){const[n,a]=u.useState(()=>$u());if(u.useEffect(()=>{const s=()=>a($u());return window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)},[]),n){const s=t||(e?{[e.id]:e}:null);return r.jsx(c1,{clusterId:n.clusterId,node:n.node,storageName:n.storage,clusters:s})}return r.jsx(o1,{cluster:e,clusters:t})}function g1(){var V;const{language:e}=Be(),t=Gr(),n=ys(),[a,s]=u.useState([]),[o,i]=u.useState(!0),[c,l]=u.useState(null),[d,m]=u.useState(null),[f,p]=u.useState(""),[v,b]=u.useState(""),[w,C]=u.useState(!1),x=u.useCallback(async()=>{i(!0),l(null);try{const A=await fetch("/api/admin/users",{credentials:"same-origin"});if(!A.ok)throw new Error(`HTTP ${A.status}`);const F=await A.json();s(F.users||[])}catch(A){l(String(A instanceof Error?A.message:A))}finally{i(!1)}},[]);u.useEffect(()=>{x()},[x]);const g=((V=n.user)==null?void 0:V.role_global)==="admin"||!n.authEnforced,h=async()=>{if(!f.trim()||v.length<8){await t.alert(e==="zh-TW"?"使用者名稱必填，密碼至少 8 字元":"Username required, password ≥ 8 chars");return}C(!0);try{const A=await fetch("/api/admin/users",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:f,password:v})});if(!A.ok)throw new Error(`HTTP ${A.status}: ${await A.text()}`);p(""),b(""),await x()}catch(A){await t.alert(`${A}`)}finally{C(!1)}},N=async A=>{const F=await t.prompt(e==="zh-TW"?`為 ${A.username} 設定新密碼（至少 8 字元）：`:`New password for ${A.username} (≥8 chars):`,{inputType:"password"});if(!F||F.length<8)return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(A.username)}/password`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:F,must_change_pw:!0})});ee.ok?await t.alert(e==="zh-TW"?"已重設並要求下次登入時變更":"Reset; user must change on next login"):await t.alert(`HTTP ${ee.status}: ${await ee.text()}`),x()},S=async A=>{if(!A.totp_enabled||!await t.confirm(e==="zh-TW"?`清除 ${A.username} 的 2FA 註冊？`:`Clear 2FA enrolment for ${A.username}?`,{destructive:!0}))return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(A.username)}/totp/disable`,{method:"POST",credentials:"same-origin"});ee.ok||await t.alert(`HTTP ${ee.status}`),x()},$=async A=>{const F=await fetch(`/api/admin/users/${encodeURIComponent(A.username)}/enabled`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!A.enabled})});F.ok||await t.alert(`HTTP ${F.status}`),x()},E=async A=>{if(!await t.confirm(e==="zh-TW"?`永久刪除使用者 ${A.username}？`:`Permanently delete user ${A.username}?`,{destructive:!0}))return;const ee=await fetch(`/api/admin/users/${encodeURIComponent(A.username)}`,{method:"DELETE",credentials:"same-origin"});ee.ok||await t.alert(`HTTP ${ee.status}`),x()},z=A=>{if(!A)return"—";const F=new Date(A),ee=B=>String(B).padStart(2,"0");return`${F.getFullYear()}-${ee(F.getMonth()+1)}-${ee(F.getDate())} ${ee(F.getHours())}:${ee(F.getMinutes())}`};if(!g)return r.jsxs("div",{className:"user-admin-noauth",children:[r.jsx("h2",{children:e==="zh-TW"?"需要管理員權限":"Admin role required"}),r.jsx("p",{children:e==="zh-TW"?"此頁僅限 admin 角色檢視。":"Only users with the admin role can access this page."})]});const U=u.useMemo(()=>[...a].sort((A,F)=>A.username.localeCompare(F.username)),[a]);return r.jsxs("div",{className:"user-admin",children:[r.jsxs("div",{className:"ua-header",children:[r.jsxs("h1",{className:"ua-title font-display",children:[r.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),r.jsx("circle",{cx:"9",cy:"7",r:"4"}),r.jsx("path",{d:"M23 21v-2a4 4 0 00-3-3.87"}),r.jsx("path",{d:"M16 3.13a4 4 0 010 7.75"})]}),e==="zh-TW"?"使用者管理":"User management"]}),r.jsxs("span",{className:"ua-count",children:[a.length," ",e==="zh-TW"?"位使用者":"users"]})]}),r.jsxs("div",{className:"ua-newrow",children:[r.jsx("span",{className:"ua-newlabel",children:e==="zh-TW"?"新增本機帳號":"Create local user"}),r.jsx("input",{type:"text",value:f,onChange:A=>p(A.target.value),placeholder:e==="zh-TW"?"使用者名稱":"username",spellCheck:!1,autoComplete:"off"}),r.jsx("input",{type:"password",value:v,onChange:A=>b(A.target.value),placeholder:e==="zh-TW"?"密碼（≥8 字元）":"password (≥8 chars)",autoComplete:"new-password"}),r.jsx("button",{className:"ua-btn primary",disabled:w||!f||v.length<8,onClick:h,children:w?e==="zh-TW"?"建立中…":"Creating…":e==="zh-TW"?"建立":"Create"})]}),o&&r.jsx("div",{className:"ua-loading",children:e==="zh-TW"?"載入中…":"Loading…"}),c&&r.jsx("div",{className:"ua-err",children:c}),!o&&!c&&r.jsx("div",{className:"ua-table-wrap",children:r.jsxs("table",{className:"ua-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:e==="zh-TW"?"帳號":"Username"}),r.jsx("th",{children:e==="zh-TW"?"狀態":"Status"}),r.jsx("th",{children:"2FA"}),r.jsx("th",{children:e==="zh-TW"?"角色":"Roles"}),r.jsx("th",{children:e==="zh-TW"?"上次登入":"Last login"}),r.jsx("th",{className:"actions",children:e==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:U.map(A=>r.jsxs("tr",{className:A.enabled?"":"is-disabled",children:[r.jsxs("td",{children:[r.jsx("code",{className:"ua-username",children:A.username}),A.must_change_pw&&r.jsx("span",{className:"ua-badge warn",title:e==="zh-TW"?"下次登入需變更密碼":"Must change password",children:"!"})]}),r.jsx("td",{children:r.jsx("span",{className:`ua-state-pill ${A.enabled?"on":"off"}`,children:A.enabled?e==="zh-TW"?"啟用":"Enabled":e==="zh-TW"?"停用":"Disabled"})}),r.jsx("td",{children:A.totp_enabled?r.jsx("span",{className:"ua-totp on",title:"2FA enrolled",children:"●"}):r.jsx("span",{className:"ua-totp off",title:"No 2FA",children:"○"})}),r.jsx("td",{children:r.jsx("div",{className:"ua-roles",children:A.roles.length===0?r.jsx("span",{className:"muted",children:"—"}):A.roles.map((F,ee)=>r.jsxs("span",{className:`ua-role role-${F.role}`,children:[F.role,r.jsxs("span",{className:"ua-role-scope",children:["@",F.cluster_id==="*"?"all":F.cluster_id,F.vm_pattern!=="*"&&` :${F.vm_pattern}`]})]},ee))})}),r.jsx("td",{className:"muted",children:z(A.last_login_at)}),r.jsxs("td",{className:"actions",children:[r.jsx("button",{className:"ua-icon-btn",onClick:()=>m(A),title:e==="zh-TW"?"管理角色":"Manage roles",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 20h9"}),r.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>N(A),title:e==="zh-TW"?"重設密碼":"Reset password",children:r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})})}),r.jsx("button",{className:`ua-icon-btn ${A.totp_enabled?"":"is-faded"}`,onClick:()=>S(A),disabled:!A.totp_enabled,title:e==="zh-TW"?"清除 2FA":"Clear 2FA",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"}),r.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>$(A),title:A.enabled?e==="zh-TW"?"停用":"Disable":e==="zh-TW"?"啟用":"Enable",children:A.enabled?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("polyline",{points:"9 12 11 14 15 10"})]})}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>E(A),title:e==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"})]})})]})]},A.id))})]})}),d&&r.jsx(h1,{user:d,onClose:()=>{m(null),x()}}),r.jsx("style",{children:`
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
      `})]})}function h1({user:e,onClose:t}){const{language:n}=Be(),a=Gr(),[s,o]=u.useState(!1),[i,c]=u.useState("*"),[l,d]=u.useState("viewer"),[m,f]=u.useState("*"),p=async()=>{o(!0);try{const b=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:i,role:l,vm_pattern:m})});if(!b.ok)throw new Error(`HTTP ${b.status}: ${await b.text()}`);t()}catch(b){await a.alert(`${b}`)}finally{o(!1)}},v=async b=>{o(!0);try{const w=new URLSearchParams({cluster_id:b.cluster_id,vm_pattern:b.vm_pattern}).toString(),C=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles?${w}`,{method:"DELETE",credentials:"same-origin"});if(!C.ok)throw new Error(`HTTP ${C.status}`);t()}catch(w){await a.alert(`${w}`)}finally{o(!1)}};return r.jsxs("div",{className:"ua-drawer-overlay",onClick:()=>!s&&t(),children:[r.jsxs("div",{className:"ua-drawer",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"ua-drawer-head",children:[r.jsxs("span",{children:[n==="zh-TW"?"管理角色":"Manage roles",": "]}),r.jsx("code",{children:e.username}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>!s&&t(),children:"×"})]}),r.jsxs("div",{className:"ua-drawer-body",children:[r.jsxs("div",{className:"ua-existing",children:[r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"現有授權":"Current grants"}),e.roles.length===0?r.jsx("div",{className:"muted",children:n==="zh-TW"?"無":"None"}):e.roles.map((b,w)=>r.jsxs("div",{className:"ua-grant-row",children:[r.jsx("span",{className:`ua-role role-${b.role}`,children:b.role}),r.jsxs("code",{className:"ua-grant-scope",children:["@",b.cluster_id,b.vm_pattern!=="*"&&` :${b.vm_pattern}`]}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>v(b),disabled:s,title:"Revoke",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"})]})})]},w))]}),r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"新增授權":"Add grant"}),r.jsxs("div",{className:"ua-grant-form",children:[r.jsx("label",{children:n==="zh-TW"?"叢集 ID（* = 全部）":"Cluster ID (* = all)"}),r.jsx("input",{type:"text",value:i,onChange:b=>c(b.target.value)}),r.jsx("label",{children:n==="zh-TW"?"角色":"Role"}),r.jsxs("select",{value:l,onChange:b=>d(b.target.value),children:[r.jsx("option",{value:"viewer",children:"viewer"}),r.jsx("option",{value:"operator",children:"operator"}),r.jsx("option",{value:"admin",children:"admin"})]}),r.jsx("label",{children:n==="zh-TW"?"VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）":"VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)"}),r.jsx("input",{type:"text",value:m,onChange:b=>f(b.target.value)}),r.jsx("button",{className:"ua-btn primary",disabled:s,onClick:p,children:s?"…":n==="zh-TW"?"授權":"Grant"})]})]})]}),r.jsx("style",{children:`
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
      `})]})}const x1={running:"tasks.filter.running",ok:"tasks.filter.ok",error:"tasks.filter.error"},T0=(e,t)=>{if(!e)return"—";const a=(t??Math.floor(Date.now()/1e3))-e;if(a<0)return"—";if(a<60)return`${a}s`;if(a<3600)return`${Math.floor(a/60)}m ${a%60}s`;const s=Math.floor(a/3600),o=Math.floor(a%3600/60);return`${s}h ${o}m`},P0=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`},v1=()=>{if(typeof window>"u")return{vmid:"",cluster:null};const e=new URLSearchParams(window.location.search);return{vmid:e.get("vmid")||"",cluster:e.get("cluster")}};function b1({clusters:e,selectedCluster:t}){const{t:n,language:a}=Be(),s=Gr(),o=u.useRef(v1()),i=u.useMemo(()=>Object.keys(e),[e]),[c,l]=u.useState(()=>o.current.cluster&&e[o.current.cluster]?o.current.cluster:t&&t!=="__all__"&&e[t]?t:i[0]||"");u.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==c&&l(t)},[t]);const[d,m]=u.useState(""),[f,p]=u.useState("all"),[v,b]=u.useState(o.current.vmid),[w,C]=u.useState(""),[x,g]=u.useState([]),[h,N]=u.useState([]),[S,$]=u.useState([]),[E,z]=u.useState(!1),[U,V]=u.useState(null),[A,F]=u.useState(!0),[ee,B]=u.useState(null),P=u.useRef(new Set),q=u.useRef(new Map),T=u.useRef(!0),[D,W]=u.useState(new Set),[G,ne]=u.useState(new Set),k=u.useCallback(async(Y=!1)=>{if(!c)return;z(!0),V(null);const Me=new URLSearchParams;d&&Me.set("type",d),f!=="all"&&Me.set("status",f),v&&Me.set("vmid",v),w&&Me.set("user",w),Me.set("limit","300"),Y&&Me.set("force","1");try{const ae=await fetch(`/api/clusters/${encodeURIComponent(c)}/tasks?`+Me.toString(),{credentials:"same-origin"});if(!ae.ok){const R=await ae.json().catch(()=>({}));throw new Error(R.error||`HTTP ${ae.status}`)}const xe=await ae.json(),ke=xe.tasks||[],te=new Set,de=new Set;if(!T.current)for(const R of ke)if(!P.current.has(R.upid))te.add(R.upid);else{const j=q.current.get(R.upid);j&&j!==R._status&&de.add(R.upid)}for(const R of ke)P.current.add(R.upid),q.current.set(R.upid,R._status);P.current.size>5e3&&(P.current=new Set(ke.map(R=>R.upid)),q.current=new Map(ke.map(R=>[R.upid,R._status]))),T.current=!1,g(ke),N(xe.types||[]),$(xe.users||[]),te.size>0&&(W(te),setTimeout(()=>W(new Set),900)),de.size>0&&(ne(de),setTimeout(()=>ne(new Set),900))}catch(ae){V(ae.message||String(ae))}finally{z(!1)}},[c,d,f,v,w]);u.useEffect(()=>{k(!1)},[k]),u.useEffect(()=>{if(!A)return;const Y=setInterval(()=>k(!0),5e3);return()=>clearInterval(Y)},[A,k]);const je=u.useMemo(()=>x.filter(Y=>Y._status==="running").length,[x]);return r.jsxs("div",{className:"pt-page",children:[r.jsxs("div",{className:"pt-header",children:[r.jsxs("div",{className:"pt-title-section",children:[r.jsxs("h1",{className:"pt-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),n("tasks.title")]}),r.jsx("div",{className:"pt-sub",children:n("tasks.subtitle")})]}),r.jsxs("div",{className:"pt-actions",children:[r.jsxs("label",{className:"pt-auto",children:[r.jsx("input",{type:"checkbox",checked:A,onChange:Y=>F(Y.target.checked)}),n("tasks.auto_refresh")]}),r.jsxs("button",{className:"pt-btn",onClick:()=>k(!0),disabled:E,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})]})]}),r.jsxs("div",{className:"pt-filters",children:[r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:c,onChange:Y=>l(Y.target.value),children:i.map(Y=>{var Me;return r.jsx("option",{value:Y,children:((Me=e[Y])==null?void 0:Me.name)||Y},Y)})})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.type")}),r.jsxs("select",{value:d,onChange:Y=>m(Y.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),h.map(Y=>r.jsx("option",{value:Y,children:Y},Y))]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.status")}),r.jsxs("select",{value:f,onChange:Y=>p(Y.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"running",children:n("tasks.filter.running")}),r.jsx("option",{value:"ok",children:n("tasks.filter.ok")}),r.jsx("option",{value:"error",children:n("tasks.filter.error")})]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.vmid")}),r.jsx("input",{type:"text",inputMode:"numeric",value:v,onChange:Y=>b(Y.target.value.replace(/[^\d]/g,"")),placeholder:"e.g. 102"})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.user")}),r.jsxs("select",{value:w,onChange:Y=>C(Y.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),S.map(Y=>r.jsx("option",{value:Y,children:Y},Y))]})]}),r.jsxs("span",{className:"pt-count",children:[x.length," / ",je?`${je} ${n("tasks.filter.running").toLowerCase()}`:""]})]}),U&&r.jsx("div",{className:"pt-error",children:U}),r.jsx("div",{className:"pt-tablewrap",children:r.jsxs("table",{className:"vm-table pt-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("tasks.col.starttime")}),r.jsx("th",{children:n("tasks.col.duration")}),r.jsx("th",{children:n("tasks.col.type")}),r.jsx("th",{children:n("tasks.col.target")}),r.jsx("th",{children:n("tasks.col.node")}),r.jsx("th",{children:n("tasks.col.user")}),r.jsx("th",{children:n("tasks.col.status")})]})}),r.jsxs("tbody",{children:[x.length===0&&!E&&r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"pt-empty",children:n("tasks.empty")})}),x.map(Y=>{const Me=[Y===ee?"pt-active":"",D.has(Y.upid)?"pt-new":""].filter(Boolean).join(" "),ae=["pt-st",`pt-st-${Y._status}`,G.has(Y.upid)?"pt-st-pulse":""].join(" ");return r.jsxs("tr",{className:Me,onClick:()=>B(Y),children:[r.jsx("td",{className:"pt-mono",children:P0(Y.starttime)}),r.jsx("td",{className:"pt-mono",children:T0(Y.starttime,Y.endtime)}),r.jsx("td",{children:r.jsx("span",{className:`pt-type pt-type-${Y.type}`,children:Y.type})}),r.jsx("td",{className:"pt-mono",children:Y.id||"—"}),r.jsx("td",{className:"pt-mono",children:Y.node}),r.jsx("td",{className:"pt-mono",children:Y.user||"—"}),r.jsx("td",{children:r.jsx("span",{className:ae,children:n(x1[Y._status]||"tasks.filter.all")})})]},Y.upid)})]})]})}),ee&&r.jsx(y1,{clusterId:c,task:ee,onClose:()=>B(null),onCopyUpid:async()=>{try{await navigator.clipboard.writeText(ee.upid),s.alert(a==="zh-TW"?"UPID 已複製":"UPID copied")}catch{}}}),r.jsx("style",{children:`
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
      `})]})}function y1({clusterId:e,task:t,onClose:n,onCopyUpid:a}){const{t:s,language:o}=Be(),[i,c]=u.useState([]),[l,d]=u.useState(!0),[m,f]=u.useState(null),[p,v]=u.useState(null),b=t._status==="running";return u.useEffect(()=>{let w=!0;const C=async()=>{try{d(!0);const g=encodeURIComponent(t.upid),h=encodeURIComponent(t.node),N=encodeURIComponent(e),[S,$]=await Promise.all([fetch(`/api/clusters/${N}/nodes/${h}/tasks/${g}/log?limit=2000`,{credentials:"same-origin"}),fetch(`/api/clusters/${N}/nodes/${h}/tasks/${g}/status`,{credentials:"same-origin"})]);if(!w)return;if(S.ok){const z=((await S.json()).lines||[]).map(U=>U.t||"").filter(Boolean);c(z)}else{const E=await S.json().catch(()=>({}));throw new Error(E.error||`HTTP ${S.status}`)}$.ok&&v(await $.json())}catch(g){w&&f(g.message||String(g))}finally{w&&d(!1)}};C();const x=b?setInterval(C,2500):null;return()=>{w=!1,x&&clearInterval(x)}},[t.upid,t.node,e,b]),r.jsxs("div",{className:"pt-drawer-back",onClick:n,children:[r.jsxs("div",{className:"pt-drawer",onClick:w=>w.stopPropagation(),children:[r.jsxs("div",{className:"pt-drawer-head",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"pt-drawer-title",children:[r.jsx("span",{className:`pt-type pt-type-${t.type}`,children:t.type}),r.jsx("span",{className:"pt-mono",children:t.id||""}),r.jsx("span",{className:`pt-st pt-st-${t._status}`,children:t._status})]}),r.jsxs("div",{className:"pt-drawer-sub",children:[r.jsx("code",{className:"pt-upid",children:t.upid}),r.jsx("button",{className:"pt-btn",onClick:a,children:r.jsx("span",{children:s("tasks.copy_upid")})})]})]}),r.jsx("button",{className:"pt-drawer-close",onClick:n,"aria-label":"close",children:"×"})]}),r.jsxs("div",{className:"pt-drawer-meta",children:[r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.node")})," ",t.node]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.user")})," ",t.user||"—"]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.starttime")})," ",P0(t.starttime)]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.duration")})," ",T0(t.starttime,t.endtime)]})]}),r.jsxs("div",{className:"pt-drawer-log",children:[l&&i.length===0&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_loading")}),m&&r.jsx("div",{className:"pt-error",children:m}),i.length===0&&!l&&!m&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_empty")}),i.length>0&&r.jsx("pre",{children:i.join(`
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
      `})]})}function w1({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:c}){const{t:l}=Be(),[d,m]=u.useState(""),[f,p]=u.useState(!1),[v,b]=u.useState(""),w=u.useRef(null);if(u.useEffect(()=>{e&&(m(""),b(""),p(!1),setTimeout(()=>{var x;return(x=w.current)==null?void 0:x.focus()},50))},[e]),u.useEffect(()=>{if(!e)return;const x=g=>{g.key==="Escape"&&!f&&i()};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[e,f,i]),!e)return null;const C=async()=>{if(d){p(!0),b("");try{await De.setClusterSecret(t,n,d),c()}catch(x){b(x instanceof Error?x.message:String(x)),p(!1)}}};return r.jsxs("div",{onClick:()=>!f&&i(),style:k1,children:[r.jsx("style",{children:j1}),r.jsxs("div",{className:"ssm-modal",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:w,type:"password",value:d,onChange:x=>m(x.target.value),onKeyDown:x=>{x.key==="Enter"&&C()},autoComplete:"new-password",spellCheck:!1}),v&&r.jsx("div",{className:"ssm-err",children:v}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:f,children:l("action.cancel")}),r.jsx("button",{className:"primary",onClick:C,disabled:f||!d,children:f?"…":l("action.save")})]})]})]})}const k1={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},j1=`
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
`;function N1({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=Be(),o=Gr(),[i,c]=u.useState(null),[l,d]=u.useState(!0),[m,f]=u.useState(!1),[p,v]=u.useState(null),[b,w]=u.useState(!1),[C,x]=u.useState("ui"),[g,h]=u.useState(!0),[N,S]=u.useState("cyberpunk"),[$,E]=u.useState("command-center"),[z,U]=u.useState(100),[V,A]=u.useState("all"),[F,ee]=u.useState(85),[B,P]=u.useState("vmid"),[q,T]=u.useState("node"),[D,W]=u.useState("node"),[G,ne]=u.useState("asc"),[k,je]=u.useState({}),[Y,Me]=u.useState(!0),[ae,xe]=u.useState(80),[ke,te]=u.useState(95),[de,R]=u.useState(85),[j,Q]=u.useState(95),[ie,be]=u.useState(80),[O,le]=u.useState(95),[he,ue]=u.useState(50),[ye,Oe]=u.useState(100),[Ne,Ve]=u.useState(5),[Ee,me]=u.useState(10),[$e,Ae]=u.useState("0.0.0.0"),[H,se]=u.useState(8098),[Z,we]=u.useState(!1),[_e,Pe]=u.useState(8086),[xt,$t]=u.useState("disabled"),[pe,He]=u.useState(null),[Se,Xe]=u.useState({}),ot=()=>{w(!0),setTimeout(()=>e(),400)};u.useEffect(()=>{qt()},[]);const qt=async()=>{var X,Qe,rt,mt,yt,it,ft,Qt,Xr,Tr,mr,vn,bn,yn,wn,kn,ut,nt,Pt,Pr,ze,Te,qe,Ze,gt,Ct,Ye,wt,kt,ar,Rr,jn,Kr,y,L;try{d(!0);const _=await De.getConfig();c(_),h(((X=_.ui)==null?void 0:X.animations_enabled)??!0),S(((Qe=_.ui)==null?void 0:Qe.theme)??"cyberpunk"),E(((rt=_.ui)==null?void 0:rt.default_view)??"command-center"),U(((mt=_.ui)==null?void 0:mt.particle_count)??100),A(((yt=_.ui)==null?void 0:yt.vm_matrix_default_filter)??"all"),ee(((it=_.ui)==null?void 0:it.matrix_card_width)??85),P(((ft=_.ui)==null?void 0:ft.matrix_sort_by)??"vmid"),T(((Qt=_.ui)==null?void 0:Qt.matrix_group_by)??"node"),W(((Xr=_.ui)==null?void 0:Xr.matrix_group_sort_by)??"node"),ne(((Tr=_.ui)==null?void 0:Tr.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((mr=_.ui)==null?void 0:mr.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((vn=_.ui)==null?void 0:vn.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((bn=_.ui)==null?void 0:bn.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((yn=_.ui)==null?void 0:yn.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((wn=_.ui)==null?void 0:wn.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((kn=_.ui)==null?void 0:kn.matrix_group_sort_order)??"asc");const M={};(ut=_.clusters)==null||ut.forEach(J=>{M[J.id]={enabled:J.enabled!==!1,poll_interval:J.poll_interval||5,static_refresh_interval:J.static_refresh_interval||60}}),je(M),Me(((nt=_.alerts)==null?void 0:nt.enabled)??!0),xe(((Pt=_.alerts)==null?void 0:Pt.cpu_warning)??80),te(((Pr=_.alerts)==null?void 0:Pr.cpu_critical)??95),R(((ze=_.alerts)==null?void 0:ze.memory_warning)??85),Q(((Te=_.alerts)==null?void 0:Te.memory_critical)??95),be(((qe=_.alerts)==null?void 0:qe.disk_warning)??80),le(((Ze=_.alerts)==null?void 0:Ze.disk_critical)??95),ue(((gt=_.alerts)==null?void 0:gt.diskio_warning)??50),Oe(((Ct=_.alerts)==null?void 0:Ct.diskio_critical)??100),Ve(((Ye=_.alerts)==null?void 0:Ye.iowait_warning)??5),me(((wt=_.alerts)==null?void 0:wt.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((kt=_.alerts)==null?void 0:kt.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((ar=_.alerts)==null?void 0:ar.iowait_critical)??10)),Ae(((Rr=_.server)==null?void 0:Rr.host)??"0.0.0.0"),se(((jn=_.server)==null?void 0:jn.http_port)??8098),we(((Kr=_.server)==null?void 0:Kr.influx_enabled)??!1),Pe(((y=_.server)==null?void 0:y.influx_port)??8086),$t(((L=_.console)==null?void 0:L.mode)||"disabled");const I={};(_.clusters||[]).forEach(J=>{I[J.id]=!!(J.auth&&J.auth.password&&J.auth.password.length>0)}),Xe(I)}catch(_){v(String(_))}finally{d(!1)}},Tt=async()=>{var X;try{f(!0),localStorage.setItem("matrix_card_width",String(F)),localStorage.setItem("matrix_sort_by",B),localStorage.setItem("matrix_group_by",q),localStorage.setItem("vm_matrix_default_filter",V),localStorage.setItem("matrix_group_sort_by",D),localStorage.setItem("matrix_group_sort_order",G),localStorage.setItem("iowait_warning",String(Ne)),localStorage.setItem("iowait_critical",String(Ee));const Qe=(X=i==null?void 0:i.clusters)==null?void 0:X.map(rt=>{var mt,yt,it;return{...rt,enabled:((mt=k[rt.id])==null?void 0:mt.enabled)!==!1,poll_interval:((yt=k[rt.id])==null?void 0:yt.poll_interval)||rt.poll_interval,static_refresh_interval:((it=k[rt.id])==null?void 0:it.static_refresh_interval)||rt.static_refresh_interval}});await De.updateConfig({server:{host:$e,http_port:H,influx_enabled:Z,influx_port:_e},console:{mode:xt},ui:{default_view:$,theme:N,language:a,animations_enabled:g,particle_count:z,vm_matrix_default_filter:V,matrix_card_width:F,matrix_sort_by:B,matrix_group_by:q,matrix_group_sort_by:D,matrix_group_sort_order:G},alerts:{enabled:Y,cpu_warning:ae,cpu_critical:ke,memory_warning:de,memory_critical:j,disk_warning:ie,disk_critical:O,diskio_warning:he,diskio_critical:ye,iowait_warning:Ne,iowait_critical:Ee},clusters:Qe}),e()}catch(Qe){v(String(Qe))}finally{f(!1)}},Wt=X=>{je(Qe=>{var rt;return{...Qe,[X]:{...Qe[X],enabled:!((rt=Qe[X])!=null&&rt.enabled)}}})},bt=(X,Qe,rt)=>{je(mt=>({...mt,[X]:{...mt[X],[Qe]:rt}}))};u.useEffect(()=>{const X=Qe=>{Qe.key==="Escape"&&!b&&ot()};return window.addEventListener("keydown",X),()=>window.removeEventListener("keydown",X)},[b]);const pr=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${b?"exiting":""}`,onClick:X=>X.target===X.currentTarget&&!b&&ot(),children:[r.jsxs("div",{className:`settings-panel panel ${b?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:ot,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:pr.map(X=>r.jsxs("button",{className:`settings-tab ${C===X.id?"active":""}`,onClick:()=>x(X.id),children:[X.icon,r.jsx("span",{children:n(X.labelKey)})]},X.id))}),r.jsx("div",{className:"settings-content",children:l?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):p?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:p})}):r.jsxs(r.Fragment,{children:[C==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(X=>r.jsxs("label",{className:`radio-option ${$===X.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:X.id,checked:$===X.id,onChange:()=>E(X.id)}),r.jsx("span",{className:"radio-label",children:n(X.labelKey)})]},X.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(X=>r.jsxs("label",{className:`radio-option ${V===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:X,checked:V===X,onChange:()=>A(X)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:F,onChange:X=>ee(Number(X.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(X=>r.jsxs("label",{className:`radio-option ${B===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:X,checked:B===X,onChange:()=>P(X)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(X=>r.jsxs("label",{className:`radio-option ${q===X?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:X,checked:q===X,onChange:()=>T(X)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${X}`)})]},X))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${D==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:D==="node",onChange:()=>W("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${D==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:D==="cluster",onChange:()=>W("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${G==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:G==="asc",onChange:()=>ne("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${G==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:G==="desc",onChange:()=>ne("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),C==="clusters"&&i&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:i.clusters.map(X=>{var yt,it;const Qe=t==null?void 0:t[X.id],rt=(Qe==null?void 0:Qe.name)||X.name||X.id,mt=k[X.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${mt.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:ft=>ft.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:mt.enabled,onChange:()=>Wt(X.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${mt.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:rt}),r.jsxs("span",{className:"cluster-id",children:["(",X.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:mt.poll_interval,onChange:ft=>bt(X.id,"poll_interval",Number(ft.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:mt.static_refresh_interval,onChange:ft=>bt(X.id,"static_refresh_interval",Number(ft.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((yt=X.nodes)==null?void 0:yt.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((it=X.auth)==null?void 0:it.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Se[X.id]?"set":"unset"}`,children:Se[X.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>He(X.id),children:Se[X.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Se[X.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(n("settings.secret_confirm_clear",{id:X.id}),{destructive:!0}))try{await De.deleteClusterSecret(X.id,"pve_password"),Xe(ft=>({...ft,[X.id]:!1}))}catch(ft){await o.alert(String(ft))}},children:n("settings.secret_clear")})]})]},X.id)})})]})}),C==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ae,onChange:X=>xe(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ke,onChange:X=>te(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:de,onChange:X=>R(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:j,onChange:X=>Q(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ie,onChange:X=>be(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:O,onChange:X=>le(Number(X.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:he,onChange:X=>ue(Number(X.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:ye,onChange:X=>Oe(Number(X.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ne,onChange:X=>Ve(Number(X.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ee,onChange:X=>me(Number(X.target.value)),min:0,max:100})]})]})]})]}),C==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:$e,onChange:X=>Ae(X.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:H,onChange:X=>se(Number(X.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:Z,onChange:X=>we(X.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(Z?"settings.enabled":"settings.disabled")})]}),Z&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:_e,onChange:X=>Pe(Number(X.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(Ia,{className:"full",value:xt,onChange:$t,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.3.6"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:ot,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:Tt,disabled:m||b,children:n(m?"action.saving":"action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(w1,{open:pe!==null,cluster_id:pe||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:pe||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>He(null),onSaved:()=>{pe&&Xe(X=>({...X,[pe]:!0})),He(null)}}),r.jsx("style",{children:`
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
      `})]})}const Tu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function _1({particleCount:e=18,enabled:t=!0,isPaused:n=!1}){const a=u.useRef(null),s=u.useRef([]),o=u.useRef(),i=u.useRef({x:0,y:0}),c=u.useRef(0),[l,d]=u.useState(()=>typeof document>"u"||document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()));u.useEffect(()=>{const p=()=>{d(document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()))};return document.addEventListener("visibilitychange",p),window.addEventListener("focus",p),window.addEventListener("blur",p),()=>{document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",p),window.removeEventListener("blur",p)}},[]);const m=u.useCallback((p,v)=>{s.current=Array.from({length:e},()=>({x:Math.random()*p,y:Math.random()*v,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:Tu[Math.floor(Math.random()*Tu.length)]}))},[e]),f=u.useCallback(p=>{const v=a.current;if(!v)return;const b=p??performance.now();if(b-c.current<50){o.current=requestAnimationFrame(f);return}c.current=b;const w=v.getContext("2d");if(!w)return;const{width:C,height:x}=v;w.clearRect(0,0,C,x),s.current.forEach(g=>{const h=g.x-i.current.x,N=g.y-i.current.y,S=Math.sqrt(h*h+N*N);if(S<100){const $=(100-S)/100;g.vx+=h/S*$*.05,g.vy+=N/S*$*.05}g.x+=g.vx,g.y+=g.vy,g.vx*=.99,g.vy*=.99,g.x<0&&(g.x=C),g.x>C&&(g.x=0),g.y<0&&(g.y=x),g.y>x&&(g.y=0),g.alpha+=(Math.random()-.5)*.02,g.alpha=Math.max(.1,Math.min(.7,g.alpha)),w.beginPath(),w.arc(g.x,g.y,g.size,0,Math.PI*2),w.fillStyle=g.color,w.globalAlpha=g.alpha,w.fill()}),w.globalAlpha=1,o.current=requestAnimationFrame(f)},[]);return u.useEffect(()=>{if(!t)return;const p=a.current;if(!p)return;const v=()=>{p.width=window.innerWidth,p.height=window.innerHeight,m(p.width,p.height)},b=w=>{i.current={x:w.clientX,y:w.clientY}};return v(),window.addEventListener("resize",v),window.addEventListener("mousemove",b),()=>{window.removeEventListener("resize",v),window.removeEventListener("mousemove",b)}},[t,m]),u.useEffect(()=>{if(!t||n||!l){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return f(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,l,f]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const Pu={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function Ui({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=Pu[e]||Pu[" "],i=t,c=t*1.8,l=t*.15,d=t*.05,m=s?t*.4:t*.15,f=[`M ${d+l} ${d} L ${i-d-l} ${d} L ${i-d-l*.3} ${l*.7+d} L ${d+l*.3} ${l*.7+d} Z`,`M ${i-d} ${d+l} L ${i-d} ${c/2-d} L ${i-d-l*.7} ${c/2-d-l*.3} L ${i-d-l*.7} ${d+l+l*.3} Z`,`M ${i-d} ${c/2+d} L ${i-d} ${c-d-l} L ${i-d-l*.7} ${c-d-l-l*.3} L ${i-d-l*.7} ${c/2+d+l*.3} Z`,`M ${d+l} ${c-d} L ${i-d-l} ${c-d} L ${i-d-l*.3} ${c-l*.7-d} L ${d+l*.3} ${c-l*.7-d} Z`,`M ${d} ${c/2+d} L ${d} ${c-d-l} L ${d+l*.7} ${c-d-l-l*.3} L ${d+l*.7} ${c/2+d+l*.3} Z`,`M ${d} ${d+l} L ${d} ${c/2-d} L ${d+l*.7} ${c/2-d-l*.3} L ${d+l*.7} ${d+l+l*.3} Z`,`M ${d+l*.5} ${c/2} L ${d+l} ${c/2-l*.4} L ${i-d-l} ${c/2-l*.4} L ${i-d-l*.5} ${c/2} L ${i-d-l} ${c/2+l*.4} L ${d+l} ${c/2+l*.4} Z`];return r.jsx("svg",{width:i,height:c,style:{display:"inline-block"},children:f.map((p,v)=>r.jsx("path",{d:p,fill:o[v]?n:a,style:{filter:o[v]?`drop-shadow(0 0 ${m}px ${n})`:"none",transition:"fill 0.03s ease-out"}},v))})}function Ru({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function Iu(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function S1(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function C1({timestamp:e,connected:t=!0}){const[n,a]=u.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=u.useState(!1),[i,c]=u.useState(!1),l=u.useRef(!1),d=u.useRef(null),m=u.useRef(null),f=t?"#00f0ff":"#ff4444",p=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",v=n.hours==="  ",b=u.useCallback(g=>{const h=Iu(g);a(h),m.current=g},[]),w=u.useCallback(g=>{d.current&&clearInterval(d.current),c(!0),o(!0);let h=0;const N=20,S=50,$={current:g};return d.current=setInterval(()=>{if(h++,h<N)a(S1());else{d.current&&(clearInterval(d.current),d.current=null);const E=Iu($.current);a(E),m.current=$.current,c(!1),o(!1)}},S),E=>{$.current=E}},[]),C=u.useRef(null);u.useEffect(()=>{if(e===null){l.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!l.current){l.current=!0,C.current=w(e);return}if(d.current&&C.current){C.current(e);return}m.current!==e&&b(e)},[e,w,b]),u.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const x=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:f},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((g,h)=>r.jsx(Ui,{digit:g||" ",size:x,color:f,dimColor:p,glow:i},`h${h}`)),r.jsx(Ru,{size:x,color:f,dim:v}),(n.minutes||"  ").split("").map((g,h)=>r.jsx(Ui,{digit:g||" ",size:x,color:f,dimColor:p,glow:i},`m${h}`)),r.jsx(Ru,{size:x,color:f,dim:v}),(n.seconds||"  ").split("").map((g,h)=>r.jsx(Ui,{digit:g||" ",size:x,color:f,dimColor:p,glow:i},`s${h}`))]})]})}function M1({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=u.useState(!1),i=u.useRef(null);u.useEffect(()=>{const d=m=>{i.current&&!i.current.contains(m.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),u.useEffect(()=>{const d=m=>{m.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const c=d=>{n(d),o(!1)},l=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:l(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:l()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>c("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,m])=>{var w,C;const f=(w=m.summary)==null?void 0:w.is_standalone,p=m.name||d,v=((C=m.summary)==null?void 0:C.nodes_online)??0,b=Object.keys(m.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>c(d),children:[r.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:p}),r.jsxs("span",{className:"option-meta",children:[v," nodes · ",b," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const Lu={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function z1({user:e,onLogout:t}){const{t:n}=Be(),[a,s]=u.useState(!1),o=u.useRef(null);if(u.useEffect(()=>{if(!a)return;const d=f=>{o.current&&!o.current.contains(f.target)&&s(!1)},m=f=>{f.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",m),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",m)}},[a]),!e)return null;const i=e.role_global||"guest",c=Lu[i]||Lu.guest,l=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:c,boxShadow:`0 0 6px ${c}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:c,borderColor:c},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),l&&r.jsxs("a",{href:"/users",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚇"}),r.jsx("span",{className:"option-label",children:n("user.user_admin")})]}),l&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),l&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const sr={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Tasks:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},Au=[{view:"command-center",icon:sr.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:sr.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:sr.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:sr.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:sr.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:sr.Ceph,labelKey:"nav.ceph",shortcut:"C"},{view:"tasks",icon:sr.Tasks,labelKey:"nav.tasks",shortcut:"T"}],E1={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation",t:"tasks"},$1={"command-center":"/","cluster-core":"/nodes","holo-matrix":"/matrix","radar-scan":"/radar","ceph-constellation":"/ceph",storage:"/storage",tasks:"/tasks",settings:"/settings",users:"/users"},Vi={"/":"command-center","/overview":"command-center","/nodes":"cluster-core","/matrix":"holo-matrix","/radar":"radar-scan","/ceph":"ceph-constellation","/storage":"storage","/tasks":"tasks","/settings":"settings","/users":"users"};function Ou(){const e=(typeof window<"u"?window.location.pathname:"/")||"/",t=e!=="/"&&e.endsWith("/")?e.slice(0,-1):e;if(Vi[t])return Vi[t];const n="/"+(t.split("/").filter(Boolean)[0]||"");return Vi[n]||"command-center"}function T1(){var ee;const{t:e,language:t,setLanguage:n}=Be(),[a,s]=u.useState(()=>Ou());u.useEffect(()=>{const B=$1[a];if(!B)return;const P=window.location.pathname||"/",q="/"+(P.split("/").filter(Boolean)[0]||""),T="/"+(B.split("/").filter(Boolean)[0]||"");P==="/"&&B==="/"||P!=="/"&&B!=="/"&&q===T||window.history.pushState(null,"",B)},[a]),u.useEffect(()=>{const B=()=>s(Ou());return window.addEventListener("popstate",B),()=>window.removeEventListener("popstate",B)},[]);const[o,i]=u.useState({}),[c,l]=u.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,m]=u.useState(!1),f=ys(),[p,v]=u.useState(0),[b,w]=u.useState(!1),[C,x]=u.useState(null),[g,h]=u.useState(!1),[N,S]=u.useState(!1),{connected:$,connecting:E,send:z}=uh({onMessage:u.useCallback(B=>{b||(i(B),v(Date.now()/1e3))},[b])});u.useEffect(()=>{let B=!0;const P=()=>document.visibilityState!=="hidden"&&document.hasFocus(),q=()=>{const T=P();if(T!==B){B=T,document.body.setAttribute("data-app-visible",T?"true":"false");try{T?(z({type:"resume"}),z({type:"refresh"})):z({type:"pause"})}catch{}}};return document.body.setAttribute("data-app-visible",P()?"true":"false"),document.addEventListener("visibilitychange",q),window.addEventListener("focus",q),window.addEventListener("blur",q),()=>{document.removeEventListener("visibilitychange",q),window.removeEventListener("focus",q),window.removeEventListener("blur",q)}},[z]);const U=u.useCallback(()=>{x(b?"resuming":"pausing"),setTimeout(()=>{w(B=>!B),setTimeout(()=>x(null),500)},300)},[b]),V=c==="__all__"?null:o[c]||null,A=u.useMemo(()=>{const B=Object.values(o);return{total_clusters:B.length,total_nodes:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.node_count)||0)},0),total_nodes_online:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.nodes_online)||0)},0),total_vms:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.vm_count)||0)},0),total_vms_running:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.vms_running)||0)},0),total_cts:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.ct_count)||0)},0),total_cts_running:B.reduce((P,q)=>{var T;return P+(((T=q.summary)==null?void 0:T.cts_running)||0)},0),clusters:B.map(P=>P.summary).filter(Boolean)}},[o]);u.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",c)}catch{}},[c]),u.useEffect(()=>{Object.keys(o).length>0&&c!=="__all__"&&(o[c]||l("__all__"))},[o,c]),u.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),u.useEffect(()=>{De.getConfig().then(B=>{B!=null&&B.ui&&(B.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",B.ui.vm_matrix_default_filter),B.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(B.ui.matrix_card_width)),B.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",B.ui.matrix_sort_by))}).catch(()=>{})},[]),u.useEffect(()=>{if(!g)return;const B=()=>h(!1);return document.addEventListener("click",B),()=>document.removeEventListener("click",B)},[g]),u.useEffect(()=>{if(!N)return;const B=()=>S(!1);return document.addEventListener("click",B),()=>document.removeEventListener("click",B)},[N]),u.useEffect(()=>{const B=P=>{if(P.target instanceof HTMLInputElement||P.target instanceof HTMLTextAreaElement)return;const q=P.key.toLowerCase();if(q===" "||P.code==="Space"){P.preventDefault(),U();return}if(!P.ctrlKey&&!P.metaKey&&!P.altKey){const T=E1[q];if(T){P.preventDefault(),s(T);return}}(P.ctrlKey||P.metaKey)&&q==="s"&&(P.preventDefault(),m(T=>!T))};return window.addEventListener("keydown",B),()=>window.removeEventListener("keydown",B)},[U]);const F=()=>{const B=c==="__all__";switch(a){case"command-center":return r.jsx(ou,{clusters:o,globalSummary:A,isPaused:b,onSelectCluster:P=>{l(P),s("cluster-core")}});case"cluster-core":return r.jsx(jh,{cluster:V,clusters:B?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:P=>{l(P),s("holo-matrix")},isPaused:b});case"holo-matrix":return r.jsx(Uh,{cluster:V,clusters:B?o:void 0});case"radar-scan":return r.jsx(Xh,{cluster:V,clusters:B?o:void 0,isPaused:b});case"storage":return r.jsx(f1,{cluster:V,clusters:B?o:void 0});case"ceph-constellation":return r.jsx(cx,{cluster:V,clusters:B?o:void 0,isPaused:b});case"users":return r.jsx(g1,{});case"tasks":return r.jsx(b1,{clusters:o,selectedCluster:c});default:return r.jsx(ou,{clusters:o,globalSummary:A,isPaused:b,onSelectCluster:P=>{l(P),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${b?"animations-paused":""}`,children:[r.jsx(_1,{isPaused:b}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${$?"connected":E?"connecting":"disconnected"}`,title:e($?"status.connected":E?"status.connecting":"status.disconnected")}),r.jsx(C1,{timestamp:p,connected:$})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[Au.map(({view:B,icon:P,labelKey:q,shortcut:T},D)=>r.jsxs("button",{className:`nav-tab nav-tab-${D} ${a===B?"active":""}`,onClick:()=>s(B),title:`${e(q)} [${T}]`,children:[r.jsx(P,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:T})]},B)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:B=>{B.stopPropagation(),S(!N)},title:e("nav.more"),children:r.jsx(sr.MoreHorizontal,{})}),N&&r.jsx("div",{className:"nav-more-dropdown",onClick:B=>B.stopPropagation(),children:Au.map(({view:B,icon:P,labelKey:q,shortcut:T},D)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${D} ${a===B?"active":""}`,onClick:()=>{s(B),S(!1)},children:[r.jsx(P,{}),r.jsx("span",{children:e(q)}),r.jsx("span",{className:"nav-shortcut",children:T})]},B))})]})]}),Object.keys(o).length>0&&r.jsx(M1,{clusters:o,value:c,onChange:l,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${b?"paused":""} ${C||""}`,onClick:U,title:`${e(b?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:b?r.jsx(sr.Play,{}):r.jsx(sr.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:B=>{B.stopPropagation(),h(!g)},title:e("settings.language"),children:r.jsx(sr.Language,{})}),g&&r.jsxs("div",{className:"lang-dropdown",onClick:B=>B.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),h(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),h(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(z1,{user:f.user,onLogout:f.logout}),(!f.authEnforced||((ee=f.user)==null?void 0:ee.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>m(!0),title:e("settings.title"),children:r.jsx(sr.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:F()},a)}),d&&r.jsx(N1,{onClose:()=>m(!1),clusters:o}),C&&r.jsxs("div",{className:`pause-overlay ${C}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((B,P)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${P*.05}s`}},P))}),r.jsx("div",{className:"pause-status-text",children:C==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function P1(){return r.jsx(ih,{children:r.jsx(lh,{children:r.jsx(T1,{})})})}Hi.createRoot(document.getElementById("root")).render(r.jsx(Bo.StrictMode,{children:r.jsx(P1,{})}));
