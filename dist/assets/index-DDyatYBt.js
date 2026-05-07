(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function sf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var xu={exports:{}},po={},vu={exports:{}},_e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ba=Symbol.for("react.element"),of=Symbol.for("react.portal"),lf=Symbol.for("react.fragment"),cf=Symbol.for("react.strict_mode"),df=Symbol.for("react.profiler"),uf=Symbol.for("react.provider"),pf=Symbol.for("react.context"),mf=Symbol.for("react.forward_ref"),ff=Symbol.for("react.suspense"),gf=Symbol.for("react.memo"),hf=Symbol.for("react.lazy"),zc=Symbol.iterator;function xf(e){return e===null||typeof e!="object"?null:(e=zc&&e[zc]||e["@@iterator"],typeof e=="function"?e:null)}var yu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},bu=Object.assign,wu={};function Ur(e,t,n){this.props=e,this.context=t,this.refs=wu,this.updater=n||yu}Ur.prototype.isReactComponent={};Ur.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ur.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ku(){}ku.prototype=Ur.prototype;function gl(e,t,n){this.props=e,this.context=t,this.refs=wu,this.updater=n||yu}var hl=gl.prototype=new ku;hl.constructor=gl;bu(hl,Ur.prototype);hl.isPureReactComponent=!0;var $c=Array.isArray,ju=Object.prototype.hasOwnProperty,xl={current:null},_u={key:!0,ref:!0,__self:!0,__source:!0};function Nu(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)ju.call(t,a)&&!_u.hasOwnProperty(a)&&(s[a]=t[a]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)s[a]===void 0&&(s[a]=l[a]);return{$$typeof:Ba,type:e,key:o,ref:i,props:s,_owner:xl.current}}function vf(e,t){return{$$typeof:Ba,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function vl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ba}function yf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Pc=/\/+/g;function Ro(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yf(""+e.key):t.toString(36)}function vs(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Ba:case of:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+Ro(i,0):a,$c(s)?(n="",e!=null&&(n=e.replace(Pc,"$&/")+"/"),vs(s,t,n,"",function(d){return d})):s!=null&&(vl(s)&&(s=vf(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(Pc,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",$c(e))for(var l=0;l<e.length;l++){o=e[l];var c=a+Ro(o,l);i+=vs(o,t,n,c,s)}else if(c=xf(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=a+Ro(o,l++),i+=vs(o,t,n,c,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Xa(e,t,n){if(e==null)return e;var a=[],s=0;return vs(e,a,"","",function(o){return t.call(n,o,s++)}),a}function bf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Nt={current:null},ys={transition:null},wf={ReactCurrentDispatcher:Nt,ReactCurrentBatchConfig:ys,ReactCurrentOwner:xl};function Su(){throw Error("act(...) is not supported in production builds of React.")}_e.Children={map:Xa,forEach:function(e,t,n){Xa(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Xa(e,function(){t++}),t},toArray:function(e){return Xa(e,function(t){return t})||[]},only:function(e){if(!vl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};_e.Component=Ur;_e.Fragment=lf;_e.Profiler=df;_e.PureComponent=gl;_e.StrictMode=cf;_e.Suspense=ff;_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wf;_e.act=Su;_e.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=bu({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=xl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)ju.call(t,c)&&!_u.hasOwnProperty(c)&&(a[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)a.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];a.children=l}return{$$typeof:Ba,type:e.type,key:s,ref:o,props:a,_owner:i}};_e.createContext=function(e){return e={$$typeof:pf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:uf,_context:e},e.Consumer=e};_e.createElement=Nu;_e.createFactory=function(e){var t=Nu.bind(null,e);return t.type=e,t};_e.createRef=function(){return{current:null}};_e.forwardRef=function(e){return{$$typeof:mf,render:e}};_e.isValidElement=vl;_e.lazy=function(e){return{$$typeof:hf,_payload:{_status:-1,_result:e},_init:bf}};_e.memo=function(e,t){return{$$typeof:gf,type:e,compare:t===void 0?null:t}};_e.startTransition=function(e){var t=ys.transition;ys.transition={};try{e()}finally{ys.transition=t}};_e.unstable_act=Su;_e.useCallback=function(e,t){return Nt.current.useCallback(e,t)};_e.useContext=function(e){return Nt.current.useContext(e)};_e.useDebugValue=function(){};_e.useDeferredValue=function(e){return Nt.current.useDeferredValue(e)};_e.useEffect=function(e,t){return Nt.current.useEffect(e,t)};_e.useId=function(){return Nt.current.useId()};_e.useImperativeHandle=function(e,t,n){return Nt.current.useImperativeHandle(e,t,n)};_e.useInsertionEffect=function(e,t){return Nt.current.useInsertionEffect(e,t)};_e.useLayoutEffect=function(e,t){return Nt.current.useLayoutEffect(e,t)};_e.useMemo=function(e,t){return Nt.current.useMemo(e,t)};_e.useReducer=function(e,t,n){return Nt.current.useReducer(e,t,n)};_e.useRef=function(e){return Nt.current.useRef(e)};_e.useState=function(e){return Nt.current.useState(e)};_e.useSyncExternalStore=function(e,t,n){return Nt.current.useSyncExternalStore(e,t,n)};_e.useTransition=function(){return Nt.current.useTransition()};_e.version="18.3.1";vu.exports=_e;var m=vu.exports;const mo=sf(m);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kf=m,jf=Symbol.for("react.element"),_f=Symbol.for("react.fragment"),Nf=Object.prototype.hasOwnProperty,Sf=kf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cf={key:!0,ref:!0,__self:!0,__source:!0};function Cu(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)Nf.call(t,a)&&!Cf.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:jf,type:e,key:o,ref:i,props:s,_owner:Sf.current}}po.Fragment=_f;po.jsx=Cu;po.jsxs=Cu;xu.exports=po;var r=xu.exports,fi={},Mu={exports:{}},Ot={},Eu={exports:{}},zu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,O){var U=E.length;E.push(O);e:for(;0<U;){var K=U-1>>>1,b=E[K];if(0<s(b,O))E[K]=O,E[U]=b,U=K;else break e}}function n(E){return E.length===0?null:E[0]}function a(E){if(E.length===0)return null;var O=E[0],U=E.pop();if(U!==O){E[0]=U;e:for(var K=0,b=E.length,Y=b>>>1;K<Y;){var ee=2*(K+1)-1,ue=E[ee],te=ee+1,le=E[te];if(0>s(ue,U))te<b&&0>s(le,ue)?(E[K]=le,E[te]=U,K=te):(E[K]=ue,E[ee]=U,K=ee);else if(te<b&&0>s(le,U))E[K]=le,E[te]=U,K=te;else break e}}return O}function s(E,O){var U=E.sortIndex-O.sortIndex;return U!==0?U:E.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var c=[],d=[],p=1,f=null,u=3,h=!1,y=!1,k=!1,j=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(E){for(var O=n(d);O!==null;){if(O.callback===null)a(d);else if(O.startTime<=E)a(d),O.sortIndex=O.expirationTime,t(c,O);else break;O=n(d)}}function S(E){if(k=!1,g(E),!y)if(n(c)!==null)y=!0,X(N);else{var O=n(d);O!==null&&L(S,O.startTime-E)}}function N(E,O){y=!1,k&&(k=!1,v(B),B=-1),h=!0;var U=u;try{for(g(O),f=n(c);f!==null&&(!(f.expirationTime>O)||E&&!R());){var K=f.callback;if(typeof K=="function"){f.callback=null,u=f.priorityLevel;var b=K(f.expirationTime<=O);O=e.unstable_now(),typeof b=="function"?f.callback=b:f===n(c)&&a(c),g(O)}else a(c);f=n(c)}if(f!==null)var Y=!0;else{var ee=n(d);ee!==null&&L(S,ee.startTime-O),Y=!1}return Y}finally{f=null,u=U,h=!1}}var T=!1,C=null,B=-1,$=5,w=-1;function R(){return!(e.unstable_now()-w<$)}function z(){if(C!==null){var E=e.unstable_now();w=E;var O=!0;try{O=C(!0,E)}finally{O?W():(T=!1,C=null)}}else T=!1}var W;if(typeof x=="function")W=function(){x(z)};else if(typeof MessageChannel<"u"){var M=new MessageChannel,F=M.port2;M.port1.onmessage=z,W=function(){F.postMessage(null)}}else W=function(){j(z,0)};function X(E){C=E,T||(T=!0,W())}function L(E,O){B=j(function(){E(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){y||h||(y=!0,X(N))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(E){switch(u){case 1:case 2:case 3:var O=3;break;default:O=u}var U=u;u=O;try{return E()}finally{u=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,O){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var U=u;u=E;try{return O()}finally{u=U}},e.unstable_scheduleCallback=function(E,O,U){var K=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?K+U:K):U=K,E){case 1:var b=-1;break;case 2:b=250;break;case 5:b=1073741823;break;case 4:b=1e4;break;default:b=5e3}return b=U+b,E={id:p++,callback:O,priorityLevel:E,startTime:U,expirationTime:b,sortIndex:-1},U>K?(E.sortIndex=U,t(d,E),n(c)===null&&E===n(d)&&(k?(v(B),B=-1):k=!0,L(S,U-K))):(E.sortIndex=b,t(c,E),y||h||(y=!0,X(N))),E},e.unstable_shouldYield=R,e.unstable_wrapCallback=function(E){var O=u;return function(){var U=u;u=O;try{return E.apply(this,arguments)}finally{u=U}}}})(zu);Eu.exports=zu;var Mf=Eu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ef=m,At=Mf;function G(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var $u=new Set,ba={};function mr(e,t){Ir(e,t),Ir(e+"Capture",t)}function Ir(e,t){for(ba[e]=t,e=0;e<t.length;e++)$u.add(t[e])}var Nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gi=Object.prototype.hasOwnProperty,zf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Rc={},Tc={};function $f(e){return gi.call(Tc,e)?!0:gi.call(Rc,e)?!1:zf.test(e)?Tc[e]=!0:(Rc[e]=!0,!1)}function Pf(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rf(e,t,n,a){if(t===null||typeof t>"u"||Pf(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function St(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var gt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){gt[e]=new St(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];gt[t]=new St(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){gt[e]=new St(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){gt[e]=new St(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){gt[e]=new St(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){gt[e]=new St(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){gt[e]=new St(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){gt[e]=new St(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){gt[e]=new St(e,5,!1,e.toLowerCase(),null,!1,!1)});var yl=/[\-:]([a-z])/g;function bl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(yl,bl);gt[t]=new St(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(yl,bl);gt[t]=new St(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(yl,bl);gt[t]=new St(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){gt[e]=new St(e,1,!1,e.toLowerCase(),null,!1,!1)});gt.xlinkHref=new St("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){gt[e]=new St(e,1,!1,e.toLowerCase(),null,!0,!0)});function wl(e,t,n,a){var s=gt.hasOwnProperty(t)?gt[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rf(t,n,s,a)&&(n=null),a||s===null?$f(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var zn=Ef.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ka=Symbol.for("react.element"),hr=Symbol.for("react.portal"),xr=Symbol.for("react.fragment"),kl=Symbol.for("react.strict_mode"),hi=Symbol.for("react.profiler"),Pu=Symbol.for("react.provider"),Ru=Symbol.for("react.context"),jl=Symbol.for("react.forward_ref"),xi=Symbol.for("react.suspense"),vi=Symbol.for("react.suspense_list"),_l=Symbol.for("react.memo"),Pn=Symbol.for("react.lazy"),Tu=Symbol.for("react.offscreen"),Ic=Symbol.iterator;function Gr(e){return e===null||typeof e!="object"?null:(e=Ic&&e[Ic]||e["@@iterator"],typeof e=="function"?e:null)}var Ke=Object.assign,To;function aa(e){if(To===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);To=t&&t[1]||""}return`
`+To+e}var Io=!1;function Lo(e,t){if(!e||Io)return"";Io=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,l=o.length-1;1<=i&&0<=l&&s[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(s[i]!==o[l]){if(i!==1||l!==1)do if(i--,l--,0>l||s[i]!==o[l]){var c=`
`+s[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=l);break}}}finally{Io=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?aa(e):""}function Tf(e){switch(e.tag){case 5:return aa(e.type);case 16:return aa("Lazy");case 13:return aa("Suspense");case 19:return aa("SuspenseList");case 0:case 2:case 15:return e=Lo(e.type,!1),e;case 11:return e=Lo(e.type.render,!1),e;case 1:return e=Lo(e.type,!0),e;default:return""}}function yi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xr:return"Fragment";case hr:return"Portal";case hi:return"Profiler";case kl:return"StrictMode";case xi:return"Suspense";case vi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ru:return(e.displayName||"Context")+".Consumer";case Pu:return(e._context.displayName||"Context")+".Provider";case jl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _l:return t=e.displayName||null,t!==null?t:yi(e.type)||"Memo";case Pn:t=e._payload,e=e._init;try{return yi(e(t))}catch{}}return null}function If(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yi(t);case 8:return t===kl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Gn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Iu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Lf(e){var t=Iu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function qa(e){e._valueTracker||(e._valueTracker=Lf(e))}function Lu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Iu(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Rs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function bi(e,t){var n=t.checked;return Ke({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Lc(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=Gn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Au(e,t){t=t.checked,t!=null&&wl(e,"checked",t,!1)}function wi(e,t){Au(e,t);var n=Gn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ki(e,t.type,n):t.hasOwnProperty("defaultValue")&&ki(e,t.type,Gn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ac(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ki(e,t,n){(t!=="number"||Rs(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var sa=Array.isArray;function Mr(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+Gn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function ji(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(G(91));return Ke({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Oc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(G(92));if(sa(n)){if(1<n.length)throw Error(G(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Gn(n)}}function Ou(e,t){var n=Gn(t.value),a=Gn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function Fc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Fu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _i(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Fu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Qa,Du=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Qa=Qa||document.createElement("div"),Qa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Qa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function wa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ua={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Af=["Webkit","ms","Moz","O"];Object.keys(ua).forEach(function(e){Af.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ua[t]=ua[e]})});function Bu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ua.hasOwnProperty(e)&&ua[e]?(""+t).trim():t+"px"}function Wu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=Bu(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var Of=Ke({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ni(e,t){if(t){if(Of[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(G(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(G(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(G(61))}if(t.style!=null&&typeof t.style!="object")throw Error(G(62))}}function Si(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ci=null;function Nl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mi=null,Er=null,zr=null;function Dc(e){if(e=Ua(e)){if(typeof Mi!="function")throw Error(G(280));var t=e.stateNode;t&&(t=vo(t),Mi(e.stateNode,e.type,t))}}function Vu(e){Er?zr?zr.push(e):zr=[e]:Er=e}function Uu(){if(Er){var e=Er,t=zr;if(zr=Er=null,Dc(e),t)for(e=0;e<t.length;e++)Dc(t[e])}}function Hu(e,t){return e(t)}function Yu(){}var Ao=!1;function Gu(e,t,n){if(Ao)return e(t,n);Ao=!0;try{return Hu(e,t,n)}finally{Ao=!1,(Er!==null||zr!==null)&&(Yu(),Uu())}}function ka(e,t){var n=e.stateNode;if(n===null)return null;var a=vo(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(G(231,t,typeof n));return n}var Ei=!1;if(Nn)try{var Xr={};Object.defineProperty(Xr,"passive",{get:function(){Ei=!0}}),window.addEventListener("test",Xr,Xr),window.removeEventListener("test",Xr,Xr)}catch{Ei=!1}function Ff(e,t,n,a,s,o,i,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(p){this.onError(p)}}var pa=!1,Ts=null,Is=!1,zi=null,Df={onError:function(e){pa=!0,Ts=e}};function Bf(e,t,n,a,s,o,i,l,c){pa=!1,Ts=null,Ff.apply(Df,arguments)}function Wf(e,t,n,a,s,o,i,l,c){if(Bf.apply(this,arguments),pa){if(pa){var d=Ts;pa=!1,Ts=null}else throw Error(G(198));Is||(Is=!0,zi=d)}}function fr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Xu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Bc(e){if(fr(e)!==e)throw Error(G(188))}function Vf(e){var t=e.alternate;if(!t){if(t=fr(e),t===null)throw Error(G(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return Bc(s),e;if(o===a)return Bc(s),t;o=o.sibling}throw Error(G(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,l=s.child;l;){if(l===n){i=!0,n=s,a=o;break}if(l===a){i=!0,a=s,n=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===n){i=!0,n=o,a=s;break}if(l===a){i=!0,a=o,n=s;break}l=l.sibling}if(!i)throw Error(G(189))}}if(n.alternate!==a)throw Error(G(190))}if(n.tag!==3)throw Error(G(188));return n.stateNode.current===n?e:t}function Ku(e){return e=Vf(e),e!==null?qu(e):null}function qu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=qu(e);if(t!==null)return t;e=e.sibling}return null}var Qu=At.unstable_scheduleCallback,Wc=At.unstable_cancelCallback,Uf=At.unstable_shouldYield,Hf=At.unstable_requestPaint,Qe=At.unstable_now,Yf=At.unstable_getCurrentPriorityLevel,Sl=At.unstable_ImmediatePriority,Zu=At.unstable_UserBlockingPriority,Ls=At.unstable_NormalPriority,Gf=At.unstable_LowPriority,Ju=At.unstable_IdlePriority,fo=null,fn=null;function Xf(e){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(fo,e,void 0,(e.current.flags&128)===128)}catch{}}var nn=Math.clz32?Math.clz32:Qf,Kf=Math.log,qf=Math.LN2;function Qf(e){return e>>>=0,e===0?32:31-(Kf(e)/qf|0)|0}var Za=64,Ja=4194304;function oa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function As(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var l=i&~s;l!==0?a=oa(l):(o&=i,o!==0&&(a=oa(o)))}else i=n&~s,i!==0?a=oa(i):o!==0&&(a=oa(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-nn(t),s=1<<n,a|=e[n],t&=~s;return a}function Zf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-nn(o),l=1<<i,c=s[i];c===-1?(!(l&n)||l&a)&&(s[i]=Zf(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function $i(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ep(){var e=Za;return Za<<=1,!(Za&4194240)&&(Za=64),e}function Oo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Wa(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-nn(t),e[t]=n}function e0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-nn(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function Cl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-nn(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var Te=0;function tp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var np,Ml,rp,ap,sp,Pi=!1,es=[],Fn=null,Dn=null,Bn=null,ja=new Map,_a=new Map,In=[],t0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Vc(e,t){switch(e){case"focusin":case"focusout":Fn=null;break;case"dragenter":case"dragleave":Dn=null;break;case"mouseover":case"mouseout":Bn=null;break;case"pointerover":case"pointerout":ja.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":_a.delete(t.pointerId)}}function Kr(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=Ua(t),t!==null&&Ml(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function n0(e,t,n,a,s){switch(t){case"focusin":return Fn=Kr(Fn,e,t,n,a,s),!0;case"dragenter":return Dn=Kr(Dn,e,t,n,a,s),!0;case"mouseover":return Bn=Kr(Bn,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return ja.set(o,Kr(ja.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,_a.set(o,Kr(_a.get(o)||null,e,t,n,a,s)),!0}return!1}function op(e){var t=er(e.target);if(t!==null){var n=fr(t);if(n!==null){if(t=n.tag,t===13){if(t=Xu(n),t!==null){e.blockedOn=t,sp(e.priority,function(){rp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function bs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ri(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Ci=a,n.target.dispatchEvent(a),Ci=null}else return t=Ua(n),t!==null&&Ml(t),e.blockedOn=n,!1;t.shift()}return!0}function Uc(e,t,n){bs(e)&&n.delete(t)}function r0(){Pi=!1,Fn!==null&&bs(Fn)&&(Fn=null),Dn!==null&&bs(Dn)&&(Dn=null),Bn!==null&&bs(Bn)&&(Bn=null),ja.forEach(Uc),_a.forEach(Uc)}function qr(e,t){e.blockedOn===t&&(e.blockedOn=null,Pi||(Pi=!0,At.unstable_scheduleCallback(At.unstable_NormalPriority,r0)))}function Na(e){function t(s){return qr(s,e)}if(0<es.length){qr(es[0],e);for(var n=1;n<es.length;n++){var a=es[n];a.blockedOn===e&&(a.blockedOn=null)}}for(Fn!==null&&qr(Fn,e),Dn!==null&&qr(Dn,e),Bn!==null&&qr(Bn,e),ja.forEach(t),_a.forEach(t),n=0;n<In.length;n++)a=In[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<In.length&&(n=In[0],n.blockedOn===null);)op(n),n.blockedOn===null&&In.shift()}var $r=zn.ReactCurrentBatchConfig,Os=!0;function a0(e,t,n,a){var s=Te,o=$r.transition;$r.transition=null;try{Te=1,El(e,t,n,a)}finally{Te=s,$r.transition=o}}function s0(e,t,n,a){var s=Te,o=$r.transition;$r.transition=null;try{Te=4,El(e,t,n,a)}finally{Te=s,$r.transition=o}}function El(e,t,n,a){if(Os){var s=Ri(e,t,n,a);if(s===null)Xo(e,t,a,Fs,n),Vc(e,a);else if(n0(s,e,t,n,a))a.stopPropagation();else if(Vc(e,a),t&4&&-1<t0.indexOf(e)){for(;s!==null;){var o=Ua(s);if(o!==null&&np(o),o=Ri(e,t,n,a),o===null&&Xo(e,t,a,Fs,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else Xo(e,t,a,null,n)}}var Fs=null;function Ri(e,t,n,a){if(Fs=null,e=Nl(a),e=er(e),e!==null)if(t=fr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Xu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fs=e,null}function ip(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Yf()){case Sl:return 1;case Zu:return 4;case Ls:case Gf:return 16;case Ju:return 536870912;default:return 16}default:return 16}}var An=null,zl=null,ws=null;function lp(){if(ws)return ws;var e,t=zl,n=t.length,a,s="value"in An?An.value:An.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return ws=s.slice(e,1<a?1-a:void 0)}function ks(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ts(){return!0}function Hc(){return!1}function Ft(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?ts:Hc,this.isPropagationStopped=Hc,this}return Ke(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ts)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ts)},persist:function(){},isPersistent:ts}),t}var Hr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$l=Ft(Hr),Va=Ke({},Hr,{view:0,detail:0}),o0=Ft(Va),Fo,Do,Qr,go=Ke({},Va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Qr&&(Qr&&e.type==="mousemove"?(Fo=e.screenX-Qr.screenX,Do=e.screenY-Qr.screenY):Do=Fo=0,Qr=e),Fo)},movementY:function(e){return"movementY"in e?e.movementY:Do}}),Yc=Ft(go),i0=Ke({},go,{dataTransfer:0}),l0=Ft(i0),c0=Ke({},Va,{relatedTarget:0}),Bo=Ft(c0),d0=Ke({},Hr,{animationName:0,elapsedTime:0,pseudoElement:0}),u0=Ft(d0),p0=Ke({},Hr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),m0=Ft(p0),f0=Ke({},Hr,{data:0}),Gc=Ft(f0),g0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},h0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},x0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function v0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=x0[e])?!!t[e]:!1}function Pl(){return v0}var y0=Ke({},Va,{key:function(e){if(e.key){var t=g0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ks(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?h0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pl,charCode:function(e){return e.type==="keypress"?ks(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ks(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),b0=Ft(y0),w0=Ke({},go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xc=Ft(w0),k0=Ke({},Va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pl}),j0=Ft(k0),_0=Ke({},Hr,{propertyName:0,elapsedTime:0,pseudoElement:0}),N0=Ft(_0),S0=Ke({},go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),C0=Ft(S0),M0=[9,13,27,32],Rl=Nn&&"CompositionEvent"in window,ma=null;Nn&&"documentMode"in document&&(ma=document.documentMode);var E0=Nn&&"TextEvent"in window&&!ma,cp=Nn&&(!Rl||ma&&8<ma&&11>=ma),Kc=" ",qc=!1;function dp(e,t){switch(e){case"keyup":return M0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function up(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vr=!1;function z0(e,t){switch(e){case"compositionend":return up(t);case"keypress":return t.which!==32?null:(qc=!0,Kc);case"textInput":return e=t.data,e===Kc&&qc?null:e;default:return null}}function $0(e,t){if(vr)return e==="compositionend"||!Rl&&dp(e,t)?(e=lp(),ws=zl=An=null,vr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return cp&&t.locale!=="ko"?null:t.data;default:return null}}var P0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!P0[e.type]:t==="textarea"}function pp(e,t,n,a){Vu(a),t=Ds(t,"onChange"),0<t.length&&(n=new $l("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var fa=null,Sa=null;function R0(e){jp(e,0)}function ho(e){var t=wr(e);if(Lu(t))return e}function T0(e,t){if(e==="change")return t}var mp=!1;if(Nn){var Wo;if(Nn){var Vo="oninput"in document;if(!Vo){var Zc=document.createElement("div");Zc.setAttribute("oninput","return;"),Vo=typeof Zc.oninput=="function"}Wo=Vo}else Wo=!1;mp=Wo&&(!document.documentMode||9<document.documentMode)}function Jc(){fa&&(fa.detachEvent("onpropertychange",fp),Sa=fa=null)}function fp(e){if(e.propertyName==="value"&&ho(Sa)){var t=[];pp(t,Sa,e,Nl(e)),Gu(R0,t)}}function I0(e,t,n){e==="focusin"?(Jc(),fa=t,Sa=n,fa.attachEvent("onpropertychange",fp)):e==="focusout"&&Jc()}function L0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ho(Sa)}function A0(e,t){if(e==="click")return ho(t)}function O0(e,t){if(e==="input"||e==="change")return ho(t)}function F0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var an=typeof Object.is=="function"?Object.is:F0;function Ca(e,t){if(an(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!gi.call(t,s)||!an(e[s],t[s]))return!1}return!0}function ed(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function td(e,t){var n=ed(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ed(n)}}function gp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function hp(){for(var e=window,t=Rs();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Rs(e.document)}return t}function Tl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function D0(e){var t=hp(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&gp(n.ownerDocument.documentElement,n)){if(a!==null&&Tl(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=td(n,o);var i=td(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var B0=Nn&&"documentMode"in document&&11>=document.documentMode,yr=null,Ti=null,ga=null,Ii=!1;function nd(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ii||yr==null||yr!==Rs(a)||(a=yr,"selectionStart"in a&&Tl(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ga&&Ca(ga,a)||(ga=a,a=Ds(Ti,"onSelect"),0<a.length&&(t=new $l("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=yr)))}function ns(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var br={animationend:ns("Animation","AnimationEnd"),animationiteration:ns("Animation","AnimationIteration"),animationstart:ns("Animation","AnimationStart"),transitionend:ns("Transition","TransitionEnd")},Uo={},xp={};Nn&&(xp=document.createElement("div").style,"AnimationEvent"in window||(delete br.animationend.animation,delete br.animationiteration.animation,delete br.animationstart.animation),"TransitionEvent"in window||delete br.transitionend.transition);function xo(e){if(Uo[e])return Uo[e];if(!br[e])return e;var t=br[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in xp)return Uo[e]=t[n];return e}var vp=xo("animationend"),yp=xo("animationiteration"),bp=xo("animationstart"),wp=xo("transitionend"),kp=new Map,rd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Kn(e,t){kp.set(e,t),mr(t,[e])}for(var Ho=0;Ho<rd.length;Ho++){var Yo=rd[Ho],W0=Yo.toLowerCase(),V0=Yo[0].toUpperCase()+Yo.slice(1);Kn(W0,"on"+V0)}Kn(vp,"onAnimationEnd");Kn(yp,"onAnimationIteration");Kn(bp,"onAnimationStart");Kn("dblclick","onDoubleClick");Kn("focusin","onFocus");Kn("focusout","onBlur");Kn(wp,"onTransitionEnd");Ir("onMouseEnter",["mouseout","mouseover"]);Ir("onMouseLeave",["mouseout","mouseover"]);Ir("onPointerEnter",["pointerout","pointerover"]);Ir("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ia="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),U0=new Set("cancel close invalid load scroll toggle".split(" ").concat(ia));function ad(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,Wf(a,t,void 0,e),e.currentTarget=null}function jp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var l=a[i],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&s.isPropagationStopped())break e;ad(s,l,d),o=c}else for(i=0;i<a.length;i++){if(l=a[i],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&s.isPropagationStopped())break e;ad(s,l,d),o=c}}}if(Is)throw e=zi,Is=!1,zi=null,e}function We(e,t){var n=t[Di];n===void 0&&(n=t[Di]=new Set);var a=e+"__bubble";n.has(a)||(_p(t,e,2,!1),n.add(a))}function Go(e,t,n){var a=0;t&&(a|=4),_p(n,e,a,t)}var rs="_reactListening"+Math.random().toString(36).slice(2);function Ma(e){if(!e[rs]){e[rs]=!0,$u.forEach(function(n){n!=="selectionchange"&&(U0.has(n)||Go(n,!1,e),Go(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[rs]||(t[rs]=!0,Go("selectionchange",!1,t))}}function _p(e,t,n,a){switch(ip(t)){case 1:var s=a0;break;case 4:s=s0;break;default:s=El}n=s.bind(null,t,n,e),s=void 0,!Ei||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Xo(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var l=a.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;i=i.return}for(;l!==null;){if(i=er(l),i===null)return;if(c=i.tag,c===5||c===6){a=o=i;continue e}l=l.parentNode}}a=a.return}Gu(function(){var d=o,p=Nl(n),f=[];e:{var u=kp.get(e);if(u!==void 0){var h=$l,y=e;switch(e){case"keypress":if(ks(n)===0)break e;case"keydown":case"keyup":h=b0;break;case"focusin":y="focus",h=Bo;break;case"focusout":y="blur",h=Bo;break;case"beforeblur":case"afterblur":h=Bo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Yc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=l0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=j0;break;case vp:case yp:case bp:h=u0;break;case wp:h=N0;break;case"scroll":h=o0;break;case"wheel":h=C0;break;case"copy":case"cut":case"paste":h=m0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Xc}var k=(t&4)!==0,j=!k&&e==="scroll",v=k?u!==null?u+"Capture":null:u;k=[];for(var x=d,g;x!==null;){g=x;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,v!==null&&(S=ka(x,v),S!=null&&k.push(Ea(x,S,g)))),j)break;x=x.return}0<k.length&&(u=new h(u,y,null,n,p),f.push({event:u,listeners:k}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",u&&n!==Ci&&(y=n.relatedTarget||n.fromElement)&&(er(y)||y[Sn]))break e;if((h||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,h?(y=n.relatedTarget||n.toElement,h=d,y=y?er(y):null,y!==null&&(j=fr(y),y!==j||y.tag!==5&&y.tag!==6)&&(y=null)):(h=null,y=d),h!==y)){if(k=Yc,S="onMouseLeave",v="onMouseEnter",x="mouse",(e==="pointerout"||e==="pointerover")&&(k=Xc,S="onPointerLeave",v="onPointerEnter",x="pointer"),j=h==null?u:wr(h),g=y==null?u:wr(y),u=new k(S,x+"leave",h,n,p),u.target=j,u.relatedTarget=g,S=null,er(p)===d&&(k=new k(v,x+"enter",y,n,p),k.target=g,k.relatedTarget=j,S=k),j=S,h&&y)t:{for(k=h,v=y,x=0,g=k;g;g=gr(g))x++;for(g=0,S=v;S;S=gr(S))g++;for(;0<x-g;)k=gr(k),x--;for(;0<g-x;)v=gr(v),g--;for(;x--;){if(k===v||v!==null&&k===v.alternate)break t;k=gr(k),v=gr(v)}k=null}else k=null;h!==null&&sd(f,u,h,k,!1),y!==null&&j!==null&&sd(f,j,y,k,!0)}}e:{if(u=d?wr(d):window,h=u.nodeName&&u.nodeName.toLowerCase(),h==="select"||h==="input"&&u.type==="file")var N=T0;else if(Qc(u))if(mp)N=O0;else{N=L0;var T=I0}else(h=u.nodeName)&&h.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(N=A0);if(N&&(N=N(e,d))){pp(f,N,n,p);break e}T&&T(e,u,d),e==="focusout"&&(T=u._wrapperState)&&T.controlled&&u.type==="number"&&ki(u,"number",u.value)}switch(T=d?wr(d):window,e){case"focusin":(Qc(T)||T.contentEditable==="true")&&(yr=T,Ti=d,ga=null);break;case"focusout":ga=Ti=yr=null;break;case"mousedown":Ii=!0;break;case"contextmenu":case"mouseup":case"dragend":Ii=!1,nd(f,n,p);break;case"selectionchange":if(B0)break;case"keydown":case"keyup":nd(f,n,p)}var C;if(Rl)e:{switch(e){case"compositionstart":var B="onCompositionStart";break e;case"compositionend":B="onCompositionEnd";break e;case"compositionupdate":B="onCompositionUpdate";break e}B=void 0}else vr?dp(e,n)&&(B="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(B="onCompositionStart");B&&(cp&&n.locale!=="ko"&&(vr||B!=="onCompositionStart"?B==="onCompositionEnd"&&vr&&(C=lp()):(An=p,zl="value"in An?An.value:An.textContent,vr=!0)),T=Ds(d,B),0<T.length&&(B=new Gc(B,e,null,n,p),f.push({event:B,listeners:T}),C?B.data=C:(C=up(n),C!==null&&(B.data=C)))),(C=E0?z0(e,n):$0(e,n))&&(d=Ds(d,"onBeforeInput"),0<d.length&&(p=new Gc("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=C))}jp(f,t)})}function Ea(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ds(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=ka(e,n),o!=null&&a.unshift(Ea(e,o,s)),o=ka(e,t),o!=null&&a.push(Ea(e,o,s))),e=e.return}return a}function gr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function sd(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===a)break;l.tag===5&&d!==null&&(l=d,s?(c=ka(n,o),c!=null&&i.unshift(Ea(n,c,l))):s||(c=ka(n,o),c!=null&&i.push(Ea(n,c,l)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var H0=/\r\n?/g,Y0=/\u0000|\uFFFD/g;function od(e){return(typeof e=="string"?e:""+e).replace(H0,`
`).replace(Y0,"")}function as(e,t,n){if(t=od(t),od(e)!==t&&n)throw Error(G(425))}function Bs(){}var Li=null,Ai=null;function Oi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Fi=typeof setTimeout=="function"?setTimeout:void 0,G0=typeof clearTimeout=="function"?clearTimeout:void 0,id=typeof Promise=="function"?Promise:void 0,X0=typeof queueMicrotask=="function"?queueMicrotask:typeof id<"u"?function(e){return id.resolve(null).then(e).catch(K0)}:Fi;function K0(e){setTimeout(function(){throw e})}function Ko(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),Na(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);Na(t)}function Wn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ld(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Yr=Math.random().toString(36).slice(2),mn="__reactFiber$"+Yr,za="__reactProps$"+Yr,Sn="__reactContainer$"+Yr,Di="__reactEvents$"+Yr,q0="__reactListeners$"+Yr,Q0="__reactHandles$"+Yr;function er(e){var t=e[mn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Sn]||n[mn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ld(e);e!==null;){if(n=e[mn])return n;e=ld(e)}return t}e=n,n=e.parentNode}return null}function Ua(e){return e=e[mn]||e[Sn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function wr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(G(33))}function vo(e){return e[za]||null}var Bi=[],kr=-1;function qn(e){return{current:e}}function Ve(e){0>kr||(e.current=Bi[kr],Bi[kr]=null,kr--)}function De(e,t){kr++,Bi[kr]=e.current,e.current=t}var Xn={},wt=qn(Xn),$t=qn(!1),ir=Xn;function Lr(e,t){var n=e.type.contextTypes;if(!n)return Xn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Pt(e){return e=e.childContextTypes,e!=null}function Ws(){Ve($t),Ve(wt)}function cd(e,t,n){if(wt.current!==Xn)throw Error(G(168));De(wt,t),De($t,n)}function Np(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(G(108,If(e)||"Unknown",s));return Ke({},n,a)}function Vs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Xn,ir=wt.current,De(wt,e),De($t,$t.current),!0}function dd(e,t,n){var a=e.stateNode;if(!a)throw Error(G(169));n?(e=Np(e,t,ir),a.__reactInternalMemoizedMergedChildContext=e,Ve($t),Ve(wt),De(wt,e)):Ve($t),De($t,n)}var wn=null,yo=!1,qo=!1;function Sp(e){wn===null?wn=[e]:wn.push(e)}function Z0(e){yo=!0,Sp(e)}function Qn(){if(!qo&&wn!==null){qo=!0;var e=0,t=Te;try{var n=wn;for(Te=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}wn=null,yo=!1}catch(s){throw wn!==null&&(wn=wn.slice(e+1)),Qu(Sl,Qn),s}finally{Te=t,qo=!1}}return null}var jr=[],_r=0,Us=null,Hs=0,Wt=[],Vt=0,lr=null,kn=1,jn="";function Zn(e,t){jr[_r++]=Hs,jr[_r++]=Us,Us=e,Hs=t}function Cp(e,t,n){Wt[Vt++]=kn,Wt[Vt++]=jn,Wt[Vt++]=lr,lr=e;var a=kn;e=jn;var s=32-nn(a)-1;a&=~(1<<s),n+=1;var o=32-nn(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,kn=1<<32-nn(t)+s|n<<s|a,jn=o+e}else kn=1<<o|n<<s|a,jn=e}function Il(e){e.return!==null&&(Zn(e,1),Cp(e,1,0))}function Ll(e){for(;e===Us;)Us=jr[--_r],jr[_r]=null,Hs=jr[--_r],jr[_r]=null;for(;e===lr;)lr=Wt[--Vt],Wt[Vt]=null,jn=Wt[--Vt],Wt[Vt]=null,kn=Wt[--Vt],Wt[Vt]=null}var Lt=null,It=null,Ue=!1,Jt=null;function Mp(e,t){var n=Ut(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ud(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Lt=e,It=Wn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Lt=e,It=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=lr!==null?{id:kn,overflow:jn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ut(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Lt=e,It=null,!0):!1;default:return!1}}function Wi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Vi(e){if(Ue){var t=It;if(t){var n=t;if(!ud(e,t)){if(Wi(e))throw Error(G(418));t=Wn(n.nextSibling);var a=Lt;t&&ud(e,t)?Mp(a,n):(e.flags=e.flags&-4097|2,Ue=!1,Lt=e)}}else{if(Wi(e))throw Error(G(418));e.flags=e.flags&-4097|2,Ue=!1,Lt=e}}}function pd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Lt=e}function ss(e){if(e!==Lt)return!1;if(!Ue)return pd(e),Ue=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Oi(e.type,e.memoizedProps)),t&&(t=It)){if(Wi(e))throw Ep(),Error(G(418));for(;t;)Mp(e,t),t=Wn(t.nextSibling)}if(pd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(G(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){It=Wn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}It=null}}else It=Lt?Wn(e.stateNode.nextSibling):null;return!0}function Ep(){for(var e=It;e;)e=Wn(e.nextSibling)}function Ar(){It=Lt=null,Ue=!1}function Al(e){Jt===null?Jt=[e]:Jt.push(e)}var J0=zn.ReactCurrentBatchConfig;function Zr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(G(309));var a=n.stateNode}if(!a)throw Error(G(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var l=s.refs;i===null?delete l[o]:l[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(G(284));if(!n._owner)throw Error(G(290,e))}return e}function os(e,t){throw e=Object.prototype.toString.call(t),Error(G(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function md(e){var t=e._init;return t(e._payload)}function zp(e){function t(v,x){if(e){var g=v.deletions;g===null?(v.deletions=[x],v.flags|=16):g.push(x)}}function n(v,x){if(!e)return null;for(;x!==null;)t(v,x),x=x.sibling;return null}function a(v,x){for(v=new Map;x!==null;)x.key!==null?v.set(x.key,x):v.set(x.index,x),x=x.sibling;return v}function s(v,x){return v=Yn(v,x),v.index=0,v.sibling=null,v}function o(v,x,g){return v.index=g,e?(g=v.alternate,g!==null?(g=g.index,g<x?(v.flags|=2,x):g):(v.flags|=2,x)):(v.flags|=1048576,x)}function i(v){return e&&v.alternate===null&&(v.flags|=2),v}function l(v,x,g,S){return x===null||x.tag!==6?(x=ri(g,v.mode,S),x.return=v,x):(x=s(x,g),x.return=v,x)}function c(v,x,g,S){var N=g.type;return N===xr?p(v,x,g.props.children,S,g.key):x!==null&&(x.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Pn&&md(N)===x.type)?(S=s(x,g.props),S.ref=Zr(v,x,g),S.return=v,S):(S=Es(g.type,g.key,g.props,null,v.mode,S),S.ref=Zr(v,x,g),S.return=v,S)}function d(v,x,g,S){return x===null||x.tag!==4||x.stateNode.containerInfo!==g.containerInfo||x.stateNode.implementation!==g.implementation?(x=ai(g,v.mode,S),x.return=v,x):(x=s(x,g.children||[]),x.return=v,x)}function p(v,x,g,S,N){return x===null||x.tag!==7?(x=sr(g,v.mode,S,N),x.return=v,x):(x=s(x,g),x.return=v,x)}function f(v,x,g){if(typeof x=="string"&&x!==""||typeof x=="number")return x=ri(""+x,v.mode,g),x.return=v,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ka:return g=Es(x.type,x.key,x.props,null,v.mode,g),g.ref=Zr(v,null,x),g.return=v,g;case hr:return x=ai(x,v.mode,g),x.return=v,x;case Pn:var S=x._init;return f(v,S(x._payload),g)}if(sa(x)||Gr(x))return x=sr(x,v.mode,g,null),x.return=v,x;os(v,x)}return null}function u(v,x,g,S){var N=x!==null?x.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return N!==null?null:l(v,x,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ka:return g.key===N?c(v,x,g,S):null;case hr:return g.key===N?d(v,x,g,S):null;case Pn:return N=g._init,u(v,x,N(g._payload),S)}if(sa(g)||Gr(g))return N!==null?null:p(v,x,g,S,null);os(v,g)}return null}function h(v,x,g,S,N){if(typeof S=="string"&&S!==""||typeof S=="number")return v=v.get(g)||null,l(x,v,""+S,N);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ka:return v=v.get(S.key===null?g:S.key)||null,c(x,v,S,N);case hr:return v=v.get(S.key===null?g:S.key)||null,d(x,v,S,N);case Pn:var T=S._init;return h(v,x,g,T(S._payload),N)}if(sa(S)||Gr(S))return v=v.get(g)||null,p(x,v,S,N,null);os(x,S)}return null}function y(v,x,g,S){for(var N=null,T=null,C=x,B=x=0,$=null;C!==null&&B<g.length;B++){C.index>B?($=C,C=null):$=C.sibling;var w=u(v,C,g[B],S);if(w===null){C===null&&(C=$);break}e&&C&&w.alternate===null&&t(v,C),x=o(w,x,B),T===null?N=w:T.sibling=w,T=w,C=$}if(B===g.length)return n(v,C),Ue&&Zn(v,B),N;if(C===null){for(;B<g.length;B++)C=f(v,g[B],S),C!==null&&(x=o(C,x,B),T===null?N=C:T.sibling=C,T=C);return Ue&&Zn(v,B),N}for(C=a(v,C);B<g.length;B++)$=h(C,v,B,g[B],S),$!==null&&(e&&$.alternate!==null&&C.delete($.key===null?B:$.key),x=o($,x,B),T===null?N=$:T.sibling=$,T=$);return e&&C.forEach(function(R){return t(v,R)}),Ue&&Zn(v,B),N}function k(v,x,g,S){var N=Gr(g);if(typeof N!="function")throw Error(G(150));if(g=N.call(g),g==null)throw Error(G(151));for(var T=N=null,C=x,B=x=0,$=null,w=g.next();C!==null&&!w.done;B++,w=g.next()){C.index>B?($=C,C=null):$=C.sibling;var R=u(v,C,w.value,S);if(R===null){C===null&&(C=$);break}e&&C&&R.alternate===null&&t(v,C),x=o(R,x,B),T===null?N=R:T.sibling=R,T=R,C=$}if(w.done)return n(v,C),Ue&&Zn(v,B),N;if(C===null){for(;!w.done;B++,w=g.next())w=f(v,w.value,S),w!==null&&(x=o(w,x,B),T===null?N=w:T.sibling=w,T=w);return Ue&&Zn(v,B),N}for(C=a(v,C);!w.done;B++,w=g.next())w=h(C,v,B,w.value,S),w!==null&&(e&&w.alternate!==null&&C.delete(w.key===null?B:w.key),x=o(w,x,B),T===null?N=w:T.sibling=w,T=w);return e&&C.forEach(function(z){return t(v,z)}),Ue&&Zn(v,B),N}function j(v,x,g,S){if(typeof g=="object"&&g!==null&&g.type===xr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Ka:e:{for(var N=g.key,T=x;T!==null;){if(T.key===N){if(N=g.type,N===xr){if(T.tag===7){n(v,T.sibling),x=s(T,g.props.children),x.return=v,v=x;break e}}else if(T.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Pn&&md(N)===T.type){n(v,T.sibling),x=s(T,g.props),x.ref=Zr(v,T,g),x.return=v,v=x;break e}n(v,T);break}else t(v,T);T=T.sibling}g.type===xr?(x=sr(g.props.children,v.mode,S,g.key),x.return=v,v=x):(S=Es(g.type,g.key,g.props,null,v.mode,S),S.ref=Zr(v,x,g),S.return=v,v=S)}return i(v);case hr:e:{for(T=g.key;x!==null;){if(x.key===T)if(x.tag===4&&x.stateNode.containerInfo===g.containerInfo&&x.stateNode.implementation===g.implementation){n(v,x.sibling),x=s(x,g.children||[]),x.return=v,v=x;break e}else{n(v,x);break}else t(v,x);x=x.sibling}x=ai(g,v.mode,S),x.return=v,v=x}return i(v);case Pn:return T=g._init,j(v,x,T(g._payload),S)}if(sa(g))return y(v,x,g,S);if(Gr(g))return k(v,x,g,S);os(v,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,x!==null&&x.tag===6?(n(v,x.sibling),x=s(x,g),x.return=v,v=x):(n(v,x),x=ri(g,v.mode,S),x.return=v,v=x),i(v)):n(v,x)}return j}var Or=zp(!0),$p=zp(!1),Ys=qn(null),Gs=null,Nr=null,Ol=null;function Fl(){Ol=Nr=Gs=null}function Dl(e){var t=Ys.current;Ve(Ys),e._currentValue=t}function Ui(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Pr(e,t){Gs=e,Ol=Nr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Et=!0),e.firstContext=null)}function Yt(e){var t=e._currentValue;if(Ol!==e)if(e={context:e,memoizedValue:t,next:null},Nr===null){if(Gs===null)throw Error(G(308));Nr=e,Gs.dependencies={lanes:0,firstContext:e}}else Nr=Nr.next=e;return t}var tr=null;function Bl(e){tr===null?tr=[e]:tr.push(e)}function Pp(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,Bl(t)):(n.next=s.next,s.next=n),t.interleaved=n,Cn(e,a)}function Cn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Rn=!1;function Wl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Rp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function _n(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Vn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,Ee&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Cn(e,n)}return s=a.interleaved,s===null?(t.next=t,Bl(a)):(t.next=s.next,s.next=t),a.interleaved=t,Cn(e,n)}function js(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Cl(e,n)}}function fd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Xs(e,t,n,a){var s=e.updateQueue;Rn=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,i===null?o=d:i.next=d,i=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==i&&(l===null?p.firstBaseUpdate=d:l.next=d,p.lastBaseUpdate=c))}if(o!==null){var f=s.baseState;i=0,p=d=c=null,l=o;do{var u=l.lane,h=l.eventTime;if((a&u)===u){p!==null&&(p=p.next={eventTime:h,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,k=l;switch(u=t,h=n,k.tag){case 1:if(y=k.payload,typeof y=="function"){f=y.call(h,f,u);break e}f=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=k.payload,u=typeof y=="function"?y.call(h,f,u):y,u==null)break e;f=Ke({},f,u);break e;case 2:Rn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else h={eventTime:h,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(d=p=h,c=f):p=p.next=h,i|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(p===null&&(c=f),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);dr|=i,e.lanes=i,e.memoizedState=f}}function gd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(G(191,s));s.call(a)}}}var Ha={},gn=qn(Ha),$a=qn(Ha),Pa=qn(Ha);function nr(e){if(e===Ha)throw Error(G(174));return e}function Vl(e,t){switch(De(Pa,t),De($a,e),De(gn,Ha),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_i(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_i(t,e)}Ve(gn),De(gn,t)}function Fr(){Ve(gn),Ve($a),Ve(Pa)}function Tp(e){nr(Pa.current);var t=nr(gn.current),n=_i(t,e.type);t!==n&&(De($a,e),De(gn,n))}function Ul(e){$a.current===e&&(Ve(gn),Ve($a))}var Ge=qn(0);function Ks(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Qo=[];function Hl(){for(var e=0;e<Qo.length;e++)Qo[e]._workInProgressVersionPrimary=null;Qo.length=0}var _s=zn.ReactCurrentDispatcher,Zo=zn.ReactCurrentBatchConfig,cr=0,Xe=null,rt=null,it=null,qs=!1,ha=!1,Ra=0,eg=0;function vt(){throw Error(G(321))}function Yl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!an(e[n],t[n]))return!1;return!0}function Gl(e,t,n,a,s,o){if(cr=o,Xe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,_s.current=e===null||e.memoizedState===null?ag:sg,e=n(a,s),ha){o=0;do{if(ha=!1,Ra=0,25<=o)throw Error(G(301));o+=1,it=rt=null,t.updateQueue=null,_s.current=og,e=n(a,s)}while(ha)}if(_s.current=Qs,t=rt!==null&&rt.next!==null,cr=0,it=rt=Xe=null,qs=!1,t)throw Error(G(300));return e}function Xl(){var e=Ra!==0;return Ra=0,e}function pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return it===null?Xe.memoizedState=it=e:it=it.next=e,it}function Gt(){if(rt===null){var e=Xe.alternate;e=e!==null?e.memoizedState:null}else e=rt.next;var t=it===null?Xe.memoizedState:it.next;if(t!==null)it=t,rt=e;else{if(e===null)throw Error(G(310));rt=e,e={memoizedState:rt.memoizedState,baseState:rt.baseState,baseQueue:rt.baseQueue,queue:rt.queue,next:null},it===null?Xe.memoizedState=it=e:it=it.next=e}return it}function Ta(e,t){return typeof t=="function"?t(e):t}function Jo(e){var t=Gt(),n=t.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=e;var a=rt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var l=i=null,c=null,d=o;do{var p=d.lane;if((cr&p)===p)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=f,i=a):c=c.next=f,Xe.lanes|=p,dr|=p}d=d.next}while(d!==null&&d!==o);c===null?i=a:c.next=l,an(a,t.memoizedState)||(Et=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=c,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,Xe.lanes|=o,dr|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ei(e){var t=Gt(),n=t.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);an(o,t.memoizedState)||(Et=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function Ip(){}function Lp(e,t){var n=Xe,a=Gt(),s=t(),o=!an(a.memoizedState,s);if(o&&(a.memoizedState=s,Et=!0),a=a.queue,Kl(Fp.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||it!==null&&it.memoizedState.tag&1){if(n.flags|=2048,Ia(9,Op.bind(null,n,a,s,t),void 0,null),lt===null)throw Error(G(349));cr&30||Ap(n,t,s)}return s}function Ap(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Xe.updateQueue,t===null?(t={lastEffect:null,stores:null},Xe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Op(e,t,n,a){t.value=n,t.getSnapshot=a,Dp(t)&&Bp(e)}function Fp(e,t,n){return n(function(){Dp(t)&&Bp(e)})}function Dp(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!an(e,n)}catch{return!0}}function Bp(e){var t=Cn(e,1);t!==null&&rn(t,e,1,-1)}function hd(e){var t=pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ta,lastRenderedState:e},t.queue=e,e=e.dispatch=rg.bind(null,Xe,e),[t.memoizedState,e]}function Ia(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=Xe.updateQueue,t===null?(t={lastEffect:null,stores:null},Xe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Wp(){return Gt().memoizedState}function Ns(e,t,n,a){var s=pn();Xe.flags|=e,s.memoizedState=Ia(1|t,n,void 0,a===void 0?null:a)}function bo(e,t,n,a){var s=Gt();a=a===void 0?null:a;var o=void 0;if(rt!==null){var i=rt.memoizedState;if(o=i.destroy,a!==null&&Yl(a,i.deps)){s.memoizedState=Ia(t,n,o,a);return}}Xe.flags|=e,s.memoizedState=Ia(1|t,n,o,a)}function xd(e,t){return Ns(8390656,8,e,t)}function Kl(e,t){return bo(2048,8,e,t)}function Vp(e,t){return bo(4,2,e,t)}function Up(e,t){return bo(4,4,e,t)}function Hp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Yp(e,t,n){return n=n!=null?n.concat([e]):null,bo(4,4,Hp.bind(null,t,e),n)}function ql(){}function Gp(e,t){var n=Gt();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Yl(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Xp(e,t){var n=Gt();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Yl(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Kp(e,t,n){return cr&21?(an(n,t)||(n=ep(),Xe.lanes|=n,dr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Et=!0),e.memoizedState=n)}function tg(e,t){var n=Te;Te=n!==0&&4>n?n:4,e(!0);var a=Zo.transition;Zo.transition={};try{e(!1),t()}finally{Te=n,Zo.transition=a}}function qp(){return Gt().memoizedState}function ng(e,t,n){var a=Hn(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Qp(e))Zp(t,n);else if(n=Pp(e,t,n,a),n!==null){var s=_t();rn(n,e,a,s),Jp(n,t,a)}}function rg(e,t,n){var a=Hn(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qp(e))Zp(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,l=o(i,n);if(s.hasEagerState=!0,s.eagerState=l,an(l,i)){var c=t.interleaved;c===null?(s.next=s,Bl(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=Pp(e,t,s,a),n!==null&&(s=_t(),rn(n,e,a,s),Jp(n,t,a))}}function Qp(e){var t=e.alternate;return e===Xe||t!==null&&t===Xe}function Zp(e,t){ha=qs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Jp(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Cl(e,n)}}var Qs={readContext:Yt,useCallback:vt,useContext:vt,useEffect:vt,useImperativeHandle:vt,useInsertionEffect:vt,useLayoutEffect:vt,useMemo:vt,useReducer:vt,useRef:vt,useState:vt,useDebugValue:vt,useDeferredValue:vt,useTransition:vt,useMutableSource:vt,useSyncExternalStore:vt,useId:vt,unstable_isNewReconciler:!1},ag={readContext:Yt,useCallback:function(e,t){return pn().memoizedState=[e,t===void 0?null:t],e},useContext:Yt,useEffect:xd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ns(4194308,4,Hp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ns(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ns(4,2,e,t)},useMemo:function(e,t){var n=pn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=pn();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=ng.bind(null,Xe,e),[a.memoizedState,e]},useRef:function(e){var t=pn();return e={current:e},t.memoizedState=e},useState:hd,useDebugValue:ql,useDeferredValue:function(e){return pn().memoizedState=e},useTransition:function(){var e=hd(!1),t=e[0];return e=tg.bind(null,e[1]),pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=Xe,s=pn();if(Ue){if(n===void 0)throw Error(G(407));n=n()}else{if(n=t(),lt===null)throw Error(G(349));cr&30||Ap(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,xd(Fp.bind(null,a,o,e),[e]),a.flags|=2048,Ia(9,Op.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=pn(),t=lt.identifierPrefix;if(Ue){var n=jn,a=kn;n=(a&~(1<<32-nn(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ra++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=eg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},sg={readContext:Yt,useCallback:Gp,useContext:Yt,useEffect:Kl,useImperativeHandle:Yp,useInsertionEffect:Vp,useLayoutEffect:Up,useMemo:Xp,useReducer:Jo,useRef:Wp,useState:function(){return Jo(Ta)},useDebugValue:ql,useDeferredValue:function(e){var t=Gt();return Kp(t,rt.memoizedState,e)},useTransition:function(){var e=Jo(Ta)[0],t=Gt().memoizedState;return[e,t]},useMutableSource:Ip,useSyncExternalStore:Lp,useId:qp,unstable_isNewReconciler:!1},og={readContext:Yt,useCallback:Gp,useContext:Yt,useEffect:Kl,useImperativeHandle:Yp,useInsertionEffect:Vp,useLayoutEffect:Up,useMemo:Xp,useReducer:ei,useRef:Wp,useState:function(){return ei(Ta)},useDebugValue:ql,useDeferredValue:function(e){var t=Gt();return rt===null?t.memoizedState=e:Kp(t,rt.memoizedState,e)},useTransition:function(){var e=ei(Ta)[0],t=Gt().memoizedState;return[e,t]},useMutableSource:Ip,useSyncExternalStore:Lp,useId:qp,unstable_isNewReconciler:!1};function Qt(e,t){if(e&&e.defaultProps){t=Ke({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Hi(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:Ke({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wo={isMounted:function(e){return(e=e._reactInternals)?fr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=_t(),s=Hn(e),o=_n(a,s);o.payload=t,n!=null&&(o.callback=n),t=Vn(e,o,s),t!==null&&(rn(t,e,s,a),js(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=_t(),s=Hn(e),o=_n(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Vn(e,o,s),t!==null&&(rn(t,e,s,a),js(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_t(),a=Hn(e),s=_n(n,a);s.tag=2,t!=null&&(s.callback=t),t=Vn(e,s,a),t!==null&&(rn(t,e,a,n),js(t,e,a))}};function vd(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!Ca(n,a)||!Ca(s,o):!0}function em(e,t,n){var a=!1,s=Xn,o=t.contextType;return typeof o=="object"&&o!==null?o=Yt(o):(s=Pt(t)?ir:wt.current,a=t.contextTypes,o=(a=a!=null)?Lr(e,s):Xn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=wo,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function yd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&wo.enqueueReplaceState(t,t.state,null)}function Yi(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Wl(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=Yt(o):(o=Pt(t)?ir:wt.current,s.context=Lr(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Hi(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&wo.enqueueReplaceState(s,s.state,null),Xs(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Dr(e,t){try{var n="",a=t;do n+=Tf(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function ti(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Gi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ig=typeof WeakMap=="function"?WeakMap:Map;function tm(e,t,n){n=_n(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Js||(Js=!0,rl=a),Gi(e,t)},n}function nm(e,t,n){n=_n(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){Gi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Gi(e,t),typeof a!="function"&&(Un===null?Un=new Set([this]):Un.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function bd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new ig;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=wg.bind(null,e,t,n),t.then(e,e))}function wd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function kd(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=_n(-1,1),t.tag=2,Vn(n,t,1))),n.lanes|=1),e)}var lg=zn.ReactCurrentOwner,Et=!1;function jt(e,t,n,a){t.child=e===null?$p(t,null,n,a):Or(t,e.child,n,a)}function jd(e,t,n,a,s){n=n.render;var o=t.ref;return Pr(t,s),a=Gl(e,t,n,a,o,s),n=Xl(),e!==null&&!Et?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Mn(e,t,s)):(Ue&&n&&Il(t),t.flags|=1,jt(e,t,a,s),t.child)}function _d(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!ac(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,rm(e,t,o,a,s)):(e=Es(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Ca,n(i,a)&&e.ref===t.ref)return Mn(e,t,s)}return t.flags|=1,e=Yn(o,a),e.ref=t.ref,e.return=t,t.child=e}function rm(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(Ca(o,a)&&e.ref===t.ref)if(Et=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Et=!0);else return t.lanes=e.lanes,Mn(e,t,s)}return Xi(e,t,n,a,s)}function am(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},De(Cr,Tt),Tt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,De(Cr,Tt),Tt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,De(Cr,Tt),Tt|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,De(Cr,Tt),Tt|=a;return jt(e,t,s,n),t.child}function sm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Xi(e,t,n,a,s){var o=Pt(n)?ir:wt.current;return o=Lr(t,o),Pr(t,s),n=Gl(e,t,n,a,o,s),a=Xl(),e!==null&&!Et?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Mn(e,t,s)):(Ue&&a&&Il(t),t.flags|=1,jt(e,t,n,s),t.child)}function Nd(e,t,n,a,s){if(Pt(n)){var o=!0;Vs(t)}else o=!1;if(Pr(t,s),t.stateNode===null)Ss(e,t),em(t,n,a),Yi(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var c=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=Yt(d):(d=Pt(n)?ir:wt.current,d=Lr(t,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==a||c!==d)&&yd(t,i,a,d),Rn=!1;var u=t.memoizedState;i.state=u,Xs(t,a,i,s),c=t.memoizedState,l!==a||u!==c||$t.current||Rn?(typeof p=="function"&&(Hi(t,n,p,a),c=t.memoizedState),(l=Rn||vd(t,n,l,a,u,c,d))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),i.props=a,i.state=c,i.context=d,a=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,Rp(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Qt(t.type,l),i.props=d,f=t.pendingProps,u=i.context,c=n.contextType,typeof c=="object"&&c!==null?c=Yt(c):(c=Pt(n)?ir:wt.current,c=Lr(t,c));var h=n.getDerivedStateFromProps;(p=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==f||u!==c)&&yd(t,i,a,c),Rn=!1,u=t.memoizedState,i.state=u,Xs(t,a,i,s);var y=t.memoizedState;l!==f||u!==y||$t.current||Rn?(typeof h=="function"&&(Hi(t,n,h,a),y=t.memoizedState),(d=Rn||vd(t,n,d,a,u,y,c)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=c,a=d):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),a=!1)}return Ki(e,t,n,a,o,s)}function Ki(e,t,n,a,s,o){sm(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&dd(t,n,!1),Mn(e,t,o);a=t.stateNode,lg.current=t;var l=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=Or(t,e.child,null,o),t.child=Or(t,null,l,o)):jt(e,t,l,o),t.memoizedState=a.state,s&&dd(t,n,!0),t.child}function om(e){var t=e.stateNode;t.pendingContext?cd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&cd(e,t.context,!1),Vl(e,t.containerInfo)}function Sd(e,t,n,a,s){return Ar(),Al(s),t.flags|=256,jt(e,t,n,a),t.child}var qi={dehydrated:null,treeContext:null,retryLane:0};function Qi(e){return{baseLanes:e,cachePool:null,transitions:null}}function im(e,t,n){var a=t.pendingProps,s=Ge.current,o=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),De(Ge,s&1),e===null)return Vi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=_o(i,a,0,null),e=sr(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Qi(n),t.memoizedState=qi,e):Ql(t,i));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return cg(e,t,i,a,l,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=c,t.deletions=null):(a=Yn(s,c),a.subtreeFlags=s.subtreeFlags&14680064),l!==null?o=Yn(l,o):(o=sr(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?Qi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=qi,a}return o=e.child,e=o.sibling,a=Yn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Ql(e,t){return t=_o({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function is(e,t,n,a){return a!==null&&Al(a),Or(t,e.child,null,n),e=Ql(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cg(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=ti(Error(G(422))),is(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=_o({mode:"visible",children:a.children},s,0,null),o=sr(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&Or(t,e.child,null,i),t.child.memoizedState=Qi(i),t.memoizedState=qi,o);if(!(t.mode&1))return is(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var l=a.dgst;return a=l,o=Error(G(419)),a=ti(o,a,void 0),is(e,t,i,a)}if(l=(i&e.childLanes)!==0,Et||l){if(a=lt,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Cn(e,s),rn(a,e,s,-1))}return rc(),a=ti(Error(G(421))),is(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=kg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,It=Wn(s.nextSibling),Lt=t,Ue=!0,Jt=null,e!==null&&(Wt[Vt++]=kn,Wt[Vt++]=jn,Wt[Vt++]=lr,kn=e.id,jn=e.overflow,lr=t),t=Ql(t,a.children),t.flags|=4096,t)}function Cd(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Ui(e.return,t,n)}function ni(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function lm(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(jt(e,t,a.children,n),a=Ge.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Cd(e,n,t);else if(e.tag===19)Cd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(De(Ge,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Ks(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),ni(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Ks(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}ni(t,!0,n,null,o);break;case"together":ni(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ss(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Mn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(G(153));if(t.child!==null){for(e=t.child,n=Yn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Yn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function dg(e,t,n){switch(t.tag){case 3:om(t),Ar();break;case 5:Tp(t);break;case 1:Pt(t.type)&&Vs(t);break;case 4:Vl(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;De(Ys,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(De(Ge,Ge.current&1),t.flags|=128,null):n&t.child.childLanes?im(e,t,n):(De(Ge,Ge.current&1),e=Mn(e,t,n),e!==null?e.sibling:null);De(Ge,Ge.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return lm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),De(Ge,Ge.current),a)break;return null;case 22:case 23:return t.lanes=0,am(e,t,n)}return Mn(e,t,n)}var cm,Zi,dm,um;cm=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Zi=function(){};dm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,nr(gn.current);var o=null;switch(n){case"input":s=bi(e,s),a=bi(e,a),o=[];break;case"select":s=Ke({},s,{value:void 0}),a=Ke({},a,{value:void 0}),o=[];break;case"textarea":s=ji(e,s),a=ji(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=Bs)}Ni(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ba.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var c=a[d];if(l=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(i in l)!l.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&l[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ba.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&We("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};um=function(e,t,n,a){n!==a&&(t.flags|=4)};function Jr(e,t){if(!Ue)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function yt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function ug(e,t,n){var a=t.pendingProps;switch(Ll(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yt(t),null;case 1:return Pt(t.type)&&Ws(),yt(t),null;case 3:return a=t.stateNode,Fr(),Ve($t),Ve(wt),Hl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ss(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Jt!==null&&(ol(Jt),Jt=null))),Zi(e,t),yt(t),null;case 5:Ul(t);var s=nr(Pa.current);if(n=t.type,e!==null&&t.stateNode!=null)dm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(G(166));return yt(t),null}if(e=nr(gn.current),ss(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[mn]=t,a[za]=o,e=(t.mode&1)!==0,n){case"dialog":We("cancel",a),We("close",a);break;case"iframe":case"object":case"embed":We("load",a);break;case"video":case"audio":for(s=0;s<ia.length;s++)We(ia[s],a);break;case"source":We("error",a);break;case"img":case"image":case"link":We("error",a),We("load",a);break;case"details":We("toggle",a);break;case"input":Lc(a,o),We("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},We("invalid",a);break;case"textarea":Oc(a,o),We("invalid",a)}Ni(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="children"?typeof l=="string"?a.textContent!==l&&(o.suppressHydrationWarning!==!0&&as(a.textContent,l,e),s=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&as(a.textContent,l,e),s=["children",""+l]):ba.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&We("scroll",a)}switch(n){case"input":qa(a),Ac(a,o,!0);break;case"textarea":qa(a),Fc(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=Bs)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[mn]=t,e[za]=a,cm(e,t,!1,!1),t.stateNode=e;e:{switch(i=Si(n,a),n){case"dialog":We("cancel",e),We("close",e),s=a;break;case"iframe":case"object":case"embed":We("load",e),s=a;break;case"video":case"audio":for(s=0;s<ia.length;s++)We(ia[s],e);s=a;break;case"source":We("error",e),s=a;break;case"img":case"image":case"link":We("error",e),We("load",e),s=a;break;case"details":We("toggle",e),s=a;break;case"input":Lc(e,a),s=bi(e,a),We("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=Ke({},a,{value:void 0}),We("invalid",e);break;case"textarea":Oc(e,a),s=ji(e,a),We("invalid",e);break;default:s=a}Ni(n,s),l=s;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?Wu(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Du(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&wa(e,c):typeof c=="number"&&wa(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ba.hasOwnProperty(o)?c!=null&&o==="onScroll"&&We("scroll",e):c!=null&&wl(e,o,c,i))}switch(n){case"input":qa(e),Ac(e,a,!1);break;case"textarea":qa(e),Fc(e);break;case"option":a.value!=null&&e.setAttribute("value",""+Gn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?Mr(e,!!a.multiple,o,!1):a.defaultValue!=null&&Mr(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Bs)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return yt(t),null;case 6:if(e&&t.stateNode!=null)um(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(G(166));if(n=nr(Pa.current),nr(gn.current),ss(t)){if(a=t.stateNode,n=t.memoizedProps,a[mn]=t,(o=a.nodeValue!==n)&&(e=Lt,e!==null))switch(e.tag){case 3:as(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&as(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[mn]=t,t.stateNode=a}return yt(t),null;case 13:if(Ve(Ge),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ue&&It!==null&&t.mode&1&&!(t.flags&128))Ep(),Ar(),t.flags|=98560,o=!1;else if(o=ss(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(G(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(G(317));o[mn]=t}else Ar(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;yt(t),o=!1}else Jt!==null&&(ol(Jt),Jt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||Ge.current&1?at===0&&(at=3):rc())),t.updateQueue!==null&&(t.flags|=4),yt(t),null);case 4:return Fr(),Zi(e,t),e===null&&Ma(t.stateNode.containerInfo),yt(t),null;case 10:return Dl(t.type._context),yt(t),null;case 17:return Pt(t.type)&&Ws(),yt(t),null;case 19:if(Ve(Ge),o=t.memoizedState,o===null)return yt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)Jr(o,!1);else{if(at!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Ks(e),i!==null){for(t.flags|=128,Jr(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return De(Ge,Ge.current&1|2),t.child}e=e.sibling}o.tail!==null&&Qe()>Br&&(t.flags|=128,a=!0,Jr(o,!1),t.lanes=4194304)}else{if(!a)if(e=Ks(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Jr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!Ue)return yt(t),null}else 2*Qe()-o.renderingStartTime>Br&&n!==1073741824&&(t.flags|=128,a=!0,Jr(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Qe(),t.sibling=null,n=Ge.current,De(Ge,a?n&1|2:n&1),t):(yt(t),null);case 22:case 23:return nc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Tt&1073741824&&(yt(t),t.subtreeFlags&6&&(t.flags|=8192)):yt(t),null;case 24:return null;case 25:return null}throw Error(G(156,t.tag))}function pg(e,t){switch(Ll(t),t.tag){case 1:return Pt(t.type)&&Ws(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Fr(),Ve($t),Ve(wt),Hl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ul(t),null;case 13:if(Ve(Ge),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(G(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ve(Ge),null;case 4:return Fr(),null;case 10:return Dl(t.type._context),null;case 22:case 23:return nc(),null;case 24:return null;default:return null}}var ls=!1,bt=!1,mg=typeof WeakSet=="function"?WeakSet:Set,ne=null;function Sr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){qe(e,t,a)}else n.current=null}function Ji(e,t,n){try{n()}catch(a){qe(e,t,a)}}var Md=!1;function fg(e,t){if(Li=Os,e=hp(),Tl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,l=-1,c=-1,d=0,p=0,f=e,u=null;t:for(;;){for(var h;f!==n||s!==0&&f.nodeType!==3||(l=i+s),f!==o||a!==0&&f.nodeType!==3||(c=i+a),f.nodeType===3&&(i+=f.nodeValue.length),(h=f.firstChild)!==null;)u=f,f=h;for(;;){if(f===e)break t;if(u===n&&++d===s&&(l=i),u===o&&++p===a&&(c=i),(h=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=h}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ai={focusedElem:e,selectionRange:n},Os=!1,ne=t;ne!==null;)if(t=ne,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ne=e;else for(;ne!==null;){t=ne;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var k=y.memoizedProps,j=y.memoizedState,v=t.stateNode,x=v.getSnapshotBeforeUpdate(t.elementType===t.type?k:Qt(t.type,k),j);v.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(G(163))}}catch(S){qe(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,ne=e;break}ne=t.return}return y=Md,Md=!1,y}function xa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Ji(t,n,o)}s=s.next}while(s!==a)}}function ko(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function el(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function pm(e){var t=e.alternate;t!==null&&(e.alternate=null,pm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[mn],delete t[za],delete t[Di],delete t[q0],delete t[Q0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function mm(e){return e.tag===5||e.tag===3||e.tag===4}function Ed(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||mm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function tl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Bs));else if(a!==4&&(e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(nl(e,t,n),e=e.sibling;e!==null;)nl(e,t,n),e=e.sibling}var mt=null,Zt=!1;function $n(e,t,n){for(n=n.child;n!==null;)fm(e,t,n),n=n.sibling}function fm(e,t,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(fo,n)}catch{}switch(n.tag){case 5:bt||Sr(n,t);case 6:var a=mt,s=Zt;mt=null,$n(e,t,n),mt=a,Zt=s,mt!==null&&(Zt?(e=mt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):mt.removeChild(n.stateNode));break;case 18:mt!==null&&(Zt?(e=mt,n=n.stateNode,e.nodeType===8?Ko(e.parentNode,n):e.nodeType===1&&Ko(e,n),Na(e)):Ko(mt,n.stateNode));break;case 4:a=mt,s=Zt,mt=n.stateNode.containerInfo,Zt=!0,$n(e,t,n),mt=a,Zt=s;break;case 0:case 11:case 14:case 15:if(!bt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Ji(n,t,i),s=s.next}while(s!==a)}$n(e,t,n);break;case 1:if(!bt&&(Sr(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){qe(n,t,l)}$n(e,t,n);break;case 21:$n(e,t,n);break;case 22:n.mode&1?(bt=(a=bt)||n.memoizedState!==null,$n(e,t,n),bt=a):$n(e,t,n);break;default:$n(e,t,n)}}function zd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new mg),t.forEach(function(a){var s=jg.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function qt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:mt=l.stateNode,Zt=!1;break e;case 3:mt=l.stateNode.containerInfo,Zt=!0;break e;case 4:mt=l.stateNode.containerInfo,Zt=!0;break e}l=l.return}if(mt===null)throw Error(G(160));fm(o,i,s),mt=null,Zt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){qe(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)gm(t,e),t=t.sibling}function gm(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(qt(t,e),un(e),a&4){try{xa(3,e,e.return),ko(3,e)}catch(k){qe(e,e.return,k)}try{xa(5,e,e.return)}catch(k){qe(e,e.return,k)}}break;case 1:qt(t,e),un(e),a&512&&n!==null&&Sr(n,n.return);break;case 5:if(qt(t,e),un(e),a&512&&n!==null&&Sr(n,n.return),e.flags&32){var s=e.stateNode;try{wa(s,"")}catch(k){qe(e,e.return,k)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Au(s,o),Si(l,i);var d=Si(l,o);for(i=0;i<c.length;i+=2){var p=c[i],f=c[i+1];p==="style"?Wu(s,f):p==="dangerouslySetInnerHTML"?Du(s,f):p==="children"?wa(s,f):wl(s,p,f,d)}switch(l){case"input":wi(s,o);break;case"textarea":Ou(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var h=o.value;h!=null?Mr(s,!!o.multiple,h,!1):u!==!!o.multiple&&(o.defaultValue!=null?Mr(s,!!o.multiple,o.defaultValue,!0):Mr(s,!!o.multiple,o.multiple?[]:"",!1))}s[za]=o}catch(k){qe(e,e.return,k)}}break;case 6:if(qt(t,e),un(e),a&4){if(e.stateNode===null)throw Error(G(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(k){qe(e,e.return,k)}}break;case 3:if(qt(t,e),un(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Na(t.containerInfo)}catch(k){qe(e,e.return,k)}break;case 4:qt(t,e),un(e);break;case 13:qt(t,e),un(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(ec=Qe())),a&4&&zd(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(bt=(d=bt)||p,qt(t,e),bt=d):qt(t,e),un(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!p&&e.mode&1)for(ne=e,p=e.child;p!==null;){for(f=ne=p;ne!==null;){switch(u=ne,h=u.child,u.tag){case 0:case 11:case 14:case 15:xa(4,u,u.return);break;case 1:Sr(u,u.return);var y=u.stateNode;if(typeof y.componentWillUnmount=="function"){a=u,n=u.return;try{t=a,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(k){qe(a,n,k)}}break;case 5:Sr(u,u.return);break;case 22:if(u.memoizedState!==null){Pd(f);continue}}h!==null?(h.return=u,ne=h):Pd(f)}p=p.sibling}e:for(p=null,f=e;;){if(f.tag===5){if(p===null){p=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=f.stateNode,c=f.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Bu("display",i))}catch(k){qe(e,e.return,k)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(k){qe(e,e.return,k)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:qt(t,e),un(e),a&4&&zd(e);break;case 21:break;default:qt(t,e),un(e)}}function un(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(mm(n)){var a=n;break e}n=n.return}throw Error(G(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(wa(s,""),a.flags&=-33);var o=Ed(e);nl(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,l=Ed(e);tl(e,l,i);break;default:throw Error(G(161))}}catch(c){qe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gg(e,t,n){ne=e,hm(e)}function hm(e,t,n){for(var a=(e.mode&1)!==0;ne!==null;){var s=ne,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||ls;if(!i){var l=s.alternate,c=l!==null&&l.memoizedState!==null||bt;l=ls;var d=bt;if(ls=i,(bt=c)&&!d)for(ne=s;ne!==null;)i=ne,c=i.child,i.tag===22&&i.memoizedState!==null?Rd(s):c!==null?(c.return=i,ne=c):Rd(s);for(;o!==null;)ne=o,hm(o),o=o.sibling;ne=s,ls=l,bt=d}$d(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,ne=o):$d(e)}}function $d(e){for(;ne!==null;){var t=ne;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:bt||ko(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!bt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Qt(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&gd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}gd(t,i,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&Na(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(G(163))}bt||t.flags&512&&el(t)}catch(u){qe(t,t.return,u)}}if(t===e){ne=null;break}if(n=t.sibling,n!==null){n.return=t.return,ne=n;break}ne=t.return}}function Pd(e){for(;ne!==null;){var t=ne;if(t===e){ne=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ne=n;break}ne=t.return}}function Rd(e){for(;ne!==null;){var t=ne;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ko(4,t)}catch(c){qe(t,n,c)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(c){qe(t,s,c)}}var o=t.return;try{el(t)}catch(c){qe(t,o,c)}break;case 5:var i=t.return;try{el(t)}catch(c){qe(t,i,c)}}}catch(c){qe(t,t.return,c)}if(t===e){ne=null;break}var l=t.sibling;if(l!==null){l.return=t.return,ne=l;break}ne=t.return}}var hg=Math.ceil,Zs=zn.ReactCurrentDispatcher,Zl=zn.ReactCurrentOwner,Ht=zn.ReactCurrentBatchConfig,Ee=0,lt=null,tt=null,ft=0,Tt=0,Cr=qn(0),at=0,La=null,dr=0,jo=0,Jl=0,va=null,Mt=null,ec=0,Br=1/0,bn=null,Js=!1,rl=null,Un=null,cs=!1,On=null,eo=0,ya=0,al=null,Cs=-1,Ms=0;function _t(){return Ee&6?Qe():Cs!==-1?Cs:Cs=Qe()}function Hn(e){return e.mode&1?Ee&2&&ft!==0?ft&-ft:J0.transition!==null?(Ms===0&&(Ms=ep()),Ms):(e=Te,e!==0||(e=window.event,e=e===void 0?16:ip(e.type)),e):1}function rn(e,t,n,a){if(50<ya)throw ya=0,al=null,Error(G(185));Wa(e,n,a),(!(Ee&2)||e!==lt)&&(e===lt&&(!(Ee&2)&&(jo|=n),at===4&&Ln(e,ft)),Rt(e,a),n===1&&Ee===0&&!(t.mode&1)&&(Br=Qe()+500,yo&&Qn()))}function Rt(e,t){var n=e.callbackNode;Jf(e,t);var a=As(e,e===lt?ft:0);if(a===0)n!==null&&Wc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&Wc(n),t===1)e.tag===0?Z0(Td.bind(null,e)):Sp(Td.bind(null,e)),X0(function(){!(Ee&6)&&Qn()}),n=null;else{switch(tp(a)){case 1:n=Sl;break;case 4:n=Zu;break;case 16:n=Ls;break;case 536870912:n=Ju;break;default:n=Ls}n=_m(n,xm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function xm(e,t){if(Cs=-1,Ms=0,Ee&6)throw Error(G(327));var n=e.callbackNode;if(Rr()&&e.callbackNode!==n)return null;var a=As(e,e===lt?ft:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=to(e,a);else{t=a;var s=Ee;Ee|=2;var o=ym();(lt!==e||ft!==t)&&(bn=null,Br=Qe()+500,ar(e,t));do try{yg();break}catch(l){vm(e,l)}while(!0);Fl(),Zs.current=o,Ee=s,tt!==null?t=0:(lt=null,ft=0,t=at)}if(t!==0){if(t===2&&(s=$i(e),s!==0&&(a=s,t=sl(e,s))),t===1)throw n=La,ar(e,0),Ln(e,a),Rt(e,Qe()),n;if(t===6)Ln(e,a);else{if(s=e.current.alternate,!(a&30)&&!xg(s)&&(t=to(e,a),t===2&&(o=$i(e),o!==0&&(a=o,t=sl(e,o))),t===1))throw n=La,ar(e,0),Ln(e,a),Rt(e,Qe()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(G(345));case 2:Jn(e,Mt,bn);break;case 3:if(Ln(e,a),(a&130023424)===a&&(t=ec+500-Qe(),10<t)){if(As(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){_t(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Fi(Jn.bind(null,e,Mt,bn),t);break}Jn(e,Mt,bn);break;case 4:if(Ln(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-nn(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=Qe()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*hg(a/1960))-a,10<a){e.timeoutHandle=Fi(Jn.bind(null,e,Mt,bn),a);break}Jn(e,Mt,bn);break;case 5:Jn(e,Mt,bn);break;default:throw Error(G(329))}}}return Rt(e,Qe()),e.callbackNode===n?xm.bind(null,e):null}function sl(e,t){var n=va;return e.current.memoizedState.isDehydrated&&(ar(e,t).flags|=256),e=to(e,t),e!==2&&(t=Mt,Mt=n,t!==null&&ol(t)),e}function ol(e){Mt===null?Mt=e:Mt.push.apply(Mt,e)}function xg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!an(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ln(e,t){for(t&=~Jl,t&=~jo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-nn(t),a=1<<n;e[n]=-1,t&=~a}}function Td(e){if(Ee&6)throw Error(G(327));Rr();var t=As(e,0);if(!(t&1))return Rt(e,Qe()),null;var n=to(e,t);if(e.tag!==0&&n===2){var a=$i(e);a!==0&&(t=a,n=sl(e,a))}if(n===1)throw n=La,ar(e,0),Ln(e,t),Rt(e,Qe()),n;if(n===6)throw Error(G(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Jn(e,Mt,bn),Rt(e,Qe()),null}function tc(e,t){var n=Ee;Ee|=1;try{return e(t)}finally{Ee=n,Ee===0&&(Br=Qe()+500,yo&&Qn())}}function ur(e){On!==null&&On.tag===0&&!(Ee&6)&&Rr();var t=Ee;Ee|=1;var n=Ht.transition,a=Te;try{if(Ht.transition=null,Te=1,e)return e()}finally{Te=a,Ht.transition=n,Ee=t,!(Ee&6)&&Qn()}}function nc(){Tt=Cr.current,Ve(Cr)}function ar(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,G0(n)),tt!==null)for(n=tt.return;n!==null;){var a=n;switch(Ll(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Ws();break;case 3:Fr(),Ve($t),Ve(wt),Hl();break;case 5:Ul(a);break;case 4:Fr();break;case 13:Ve(Ge);break;case 19:Ve(Ge);break;case 10:Dl(a.type._context);break;case 22:case 23:nc()}n=n.return}if(lt=e,tt=e=Yn(e.current,null),ft=Tt=t,at=0,La=null,Jl=jo=dr=0,Mt=va=null,tr!==null){for(t=0;t<tr.length;t++)if(n=tr[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}tr=null}return e}function vm(e,t){do{var n=tt;try{if(Fl(),_s.current=Qs,qs){for(var a=Xe.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}qs=!1}if(cr=0,it=rt=Xe=null,ha=!1,Ra=0,Zl.current=null,n===null||n.return===null){at=1,La=t,tt=null;break}e:{var o=e,i=n.return,l=n,c=t;if(t=ft,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var h=wd(i);if(h!==null){h.flags&=-257,kd(h,i,l,o,t),h.mode&1&&bd(o,d,t),t=h,c=d;var y=t.updateQueue;if(y===null){var k=new Set;k.add(c),t.updateQueue=k}else y.add(c);break e}else{if(!(t&1)){bd(o,d,t),rc();break e}c=Error(G(426))}}else if(Ue&&l.mode&1){var j=wd(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),kd(j,i,l,o,t),Al(Dr(c,l));break e}}o=c=Dr(c,l),at!==4&&(at=2),va===null?va=[o]:va.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=tm(o,c,t);fd(o,v);break e;case 1:l=c;var x=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof x.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Un===null||!Un.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=nm(o,l,t);fd(o,S);break e}}o=o.return}while(o!==null)}wm(n)}catch(N){t=N,tt===n&&n!==null&&(tt=n=n.return);continue}break}while(!0)}function ym(){var e=Zs.current;return Zs.current=Qs,e===null?Qs:e}function rc(){(at===0||at===3||at===2)&&(at=4),lt===null||!(dr&268435455)&&!(jo&268435455)||Ln(lt,ft)}function to(e,t){var n=Ee;Ee|=2;var a=ym();(lt!==e||ft!==t)&&(bn=null,ar(e,t));do try{vg();break}catch(s){vm(e,s)}while(!0);if(Fl(),Ee=n,Zs.current=a,tt!==null)throw Error(G(261));return lt=null,ft=0,at}function vg(){for(;tt!==null;)bm(tt)}function yg(){for(;tt!==null&&!Uf();)bm(tt)}function bm(e){var t=jm(e.alternate,e,Tt);e.memoizedProps=e.pendingProps,t===null?wm(e):tt=t,Zl.current=null}function wm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=pg(n,t),n!==null){n.flags&=32767,tt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{at=6,tt=null;return}}else if(n=ug(n,t,Tt),n!==null){tt=n;return}if(t=t.sibling,t!==null){tt=t;return}tt=t=e}while(t!==null);at===0&&(at=5)}function Jn(e,t,n){var a=Te,s=Ht.transition;try{Ht.transition=null,Te=1,bg(e,t,n,a)}finally{Ht.transition=s,Te=a}return null}function bg(e,t,n,a){do Rr();while(On!==null);if(Ee&6)throw Error(G(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(G(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(e0(e,o),e===lt&&(tt=lt=null,ft=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||cs||(cs=!0,_m(Ls,function(){return Rr(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ht.transition,Ht.transition=null;var i=Te;Te=1;var l=Ee;Ee|=4,Zl.current=null,fg(e,n),gm(n,e),D0(Ai),Os=!!Li,Ai=Li=null,e.current=n,gg(n),Hf(),Ee=l,Te=i,Ht.transition=o}else e.current=n;if(cs&&(cs=!1,On=e,eo=s),o=e.pendingLanes,o===0&&(Un=null),Xf(n.stateNode),Rt(e,Qe()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(Js)throw Js=!1,e=rl,rl=null,e;return eo&1&&e.tag!==0&&Rr(),o=e.pendingLanes,o&1?e===al?ya++:(ya=0,al=e):ya=0,Qn(),null}function Rr(){if(On!==null){var e=tp(eo),t=Ht.transition,n=Te;try{if(Ht.transition=null,Te=16>e?16:e,On===null)var a=!1;else{if(e=On,On=null,eo=0,Ee&6)throw Error(G(331));var s=Ee;for(Ee|=4,ne=e.current;ne!==null;){var o=ne,i=o.child;if(ne.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(ne=d;ne!==null;){var p=ne;switch(p.tag){case 0:case 11:case 15:xa(8,p,o)}var f=p.child;if(f!==null)f.return=p,ne=f;else for(;ne!==null;){p=ne;var u=p.sibling,h=p.return;if(pm(p),p===d){ne=null;break}if(u!==null){u.return=h,ne=u;break}ne=h}}}var y=o.alternate;if(y!==null){var k=y.child;if(k!==null){y.child=null;do{var j=k.sibling;k.sibling=null,k=j}while(k!==null)}}ne=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,ne=i;else e:for(;ne!==null;){if(o=ne,o.flags&2048)switch(o.tag){case 0:case 11:case 15:xa(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,ne=v;break e}ne=o.return}}var x=e.current;for(ne=x;ne!==null;){i=ne;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,ne=g;else e:for(i=x;ne!==null;){if(l=ne,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ko(9,l)}}catch(N){qe(l,l.return,N)}if(l===i){ne=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,ne=S;break e}ne=l.return}}if(Ee=s,Qn(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(fo,e)}catch{}a=!0}return a}finally{Te=n,Ht.transition=t}}return!1}function Id(e,t,n){t=Dr(n,t),t=tm(e,t,1),e=Vn(e,t,1),t=_t(),e!==null&&(Wa(e,1,t),Rt(e,t))}function qe(e,t,n){if(e.tag===3)Id(e,e,n);else for(;t!==null;){if(t.tag===3){Id(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Un===null||!Un.has(a))){e=Dr(n,e),e=nm(t,e,1),t=Vn(t,e,1),e=_t(),t!==null&&(Wa(t,1,e),Rt(t,e));break}}t=t.return}}function wg(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=_t(),e.pingedLanes|=e.suspendedLanes&n,lt===e&&(ft&n)===n&&(at===4||at===3&&(ft&130023424)===ft&&500>Qe()-ec?ar(e,0):Jl|=n),Rt(e,t)}function km(e,t){t===0&&(e.mode&1?(t=Ja,Ja<<=1,!(Ja&130023424)&&(Ja=4194304)):t=1);var n=_t();e=Cn(e,t),e!==null&&(Wa(e,t,n),Rt(e,n))}function kg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),km(e,n)}function jg(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(G(314))}a!==null&&a.delete(t),km(e,n)}var jm;jm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||$t.current)Et=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Et=!1,dg(e,t,n);Et=!!(e.flags&131072)}else Et=!1,Ue&&t.flags&1048576&&Cp(t,Hs,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;Ss(e,t),e=t.pendingProps;var s=Lr(t,wt.current);Pr(t,n),s=Gl(null,t,a,e,s,n);var o=Xl();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Pt(a)?(o=!0,Vs(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Wl(t),s.updater=wo,t.stateNode=s,s._reactInternals=t,Yi(t,a,e,n),t=Ki(null,t,a,!0,o,n)):(t.tag=0,Ue&&o&&Il(t),jt(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch(Ss(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=Ng(a),e=Qt(a,e),s){case 0:t=Xi(null,t,a,e,n);break e;case 1:t=Nd(null,t,a,e,n);break e;case 11:t=jd(null,t,a,e,n);break e;case 14:t=_d(null,t,a,Qt(a.type,e),n);break e}throw Error(G(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Qt(a,s),Xi(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Qt(a,s),Nd(e,t,a,s,n);case 3:e:{if(om(t),e===null)throw Error(G(387));a=t.pendingProps,o=t.memoizedState,s=o.element,Rp(e,t),Xs(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=Dr(Error(G(423)),t),t=Sd(e,t,a,n,s);break e}else if(a!==s){s=Dr(Error(G(424)),t),t=Sd(e,t,a,n,s);break e}else for(It=Wn(t.stateNode.containerInfo.firstChild),Lt=t,Ue=!0,Jt=null,n=$p(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ar(),a===s){t=Mn(e,t,n);break e}jt(e,t,a,n)}t=t.child}return t;case 5:return Tp(t),e===null&&Vi(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,Oi(a,s)?i=null:o!==null&&Oi(a,o)&&(t.flags|=32),sm(e,t),jt(e,t,i,n),t.child;case 6:return e===null&&Vi(t),null;case 13:return im(e,t,n);case 4:return Vl(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Or(t,null,a,n):jt(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Qt(a,s),jd(e,t,a,s,n);case 7:return jt(e,t,t.pendingProps,n),t.child;case 8:return jt(e,t,t.pendingProps.children,n),t.child;case 12:return jt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,De(Ys,a._currentValue),a._currentValue=i,o!==null)if(an(o.value,i)){if(o.children===s.children&&!$t.current){t=Mn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){i=o.child;for(var c=l.firstContext;c!==null;){if(c.context===a){if(o.tag===1){c=_n(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?c.next=c:(c.next=p.next,p.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ui(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(G(341));i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),Ui(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}jt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,Pr(t,n),s=Yt(s),a=a(s),t.flags|=1,jt(e,t,a,n),t.child;case 14:return a=t.type,s=Qt(a,t.pendingProps),s=Qt(a.type,s),_d(e,t,a,s,n);case 15:return rm(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Qt(a,s),Ss(e,t),t.tag=1,Pt(a)?(e=!0,Vs(t)):e=!1,Pr(t,n),em(t,a,s),Yi(t,a,s,n),Ki(null,t,a,!0,e,n);case 19:return lm(e,t,n);case 22:return am(e,t,n)}throw Error(G(156,t.tag))};function _m(e,t){return Qu(e,t)}function _g(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ut(e,t,n,a){return new _g(e,t,n,a)}function ac(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ng(e){if(typeof e=="function")return ac(e)?1:0;if(e!=null){if(e=e.$$typeof,e===jl)return 11;if(e===_l)return 14}return 2}function Yn(e,t){var n=e.alternate;return n===null?(n=Ut(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Es(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")ac(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case xr:return sr(n.children,s,o,t);case kl:i=8,s|=8;break;case hi:return e=Ut(12,n,t,s|2),e.elementType=hi,e.lanes=o,e;case xi:return e=Ut(13,n,t,s),e.elementType=xi,e.lanes=o,e;case vi:return e=Ut(19,n,t,s),e.elementType=vi,e.lanes=o,e;case Tu:return _o(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Pu:i=10;break e;case Ru:i=9;break e;case jl:i=11;break e;case _l:i=14;break e;case Pn:i=16,a=null;break e}throw Error(G(130,e==null?e:typeof e,""))}return t=Ut(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function sr(e,t,n,a){return e=Ut(7,e,a,t),e.lanes=n,e}function _o(e,t,n,a){return e=Ut(22,e,a,t),e.elementType=Tu,e.lanes=n,e.stateNode={isHidden:!1},e}function ri(e,t,n){return e=Ut(6,e,null,t),e.lanes=n,e}function ai(e,t,n){return t=Ut(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Sg(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oo(0),this.expirationTimes=Oo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function sc(e,t,n,a,s,o,i,l,c){return e=new Sg(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ut(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wl(o),e}function Cg(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:hr,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function Nm(e){if(!e)return Xn;e=e._reactInternals;e:{if(fr(e)!==e||e.tag!==1)throw Error(G(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Pt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(G(171))}if(e.tag===1){var n=e.type;if(Pt(n))return Np(e,n,t)}return t}function Sm(e,t,n,a,s,o,i,l,c){return e=sc(n,a,!0,e,s,o,i,l,c),e.context=Nm(null),n=e.current,a=_t(),s=Hn(n),o=_n(a,s),o.callback=t??null,Vn(n,o,s),e.current.lanes=s,Wa(e,s,a),Rt(e,a),e}function No(e,t,n,a){var s=t.current,o=_t(),i=Hn(s);return n=Nm(n),t.context===null?t.context=n:t.pendingContext=n,t=_n(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=Vn(s,t,i),e!==null&&(rn(e,s,i,o),js(e,s,i)),i}function no(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ld(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function oc(e,t){Ld(e,t),(e=e.alternate)&&Ld(e,t)}function Mg(){return null}var Cm=typeof reportError=="function"?reportError:function(e){console.error(e)};function ic(e){this._internalRoot=e}So.prototype.render=ic.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(G(409));No(e,t,null,null)};So.prototype.unmount=ic.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ur(function(){No(null,e,null,null)}),t[Sn]=null}};function So(e){this._internalRoot=e}So.prototype.unstable_scheduleHydration=function(e){if(e){var t=ap();e={blockedOn:null,target:e,priority:t};for(var n=0;n<In.length&&t!==0&&t<In[n].priority;n++);In.splice(n,0,e),n===0&&op(e)}};function lc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Co(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ad(){}function Eg(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=no(i);o.call(d)}}var i=Sm(t,a,e,0,null,!1,!1,"",Ad);return e._reactRootContainer=i,e[Sn]=i.current,Ma(e.nodeType===8?e.parentNode:e),ur(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var l=a;a=function(){var d=no(c);l.call(d)}}var c=sc(e,0,!1,null,null,!1,!1,"",Ad);return e._reactRootContainer=c,e[Sn]=c.current,Ma(e.nodeType===8?e.parentNode:e),ur(function(){No(t,c,n,a)}),c}function Mo(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var l=s;s=function(){var c=no(i);l.call(c)}}No(t,i,e,s)}else i=Eg(n,t,e,s,a);return no(i)}np=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=oa(t.pendingLanes);n!==0&&(Cl(t,n|1),Rt(t,Qe()),!(Ee&6)&&(Br=Qe()+500,Qn()))}break;case 13:ur(function(){var a=Cn(e,1);if(a!==null){var s=_t();rn(a,e,1,s)}}),oc(e,1)}};Ml=function(e){if(e.tag===13){var t=Cn(e,134217728);if(t!==null){var n=_t();rn(t,e,134217728,n)}oc(e,134217728)}};rp=function(e){if(e.tag===13){var t=Hn(e),n=Cn(e,t);if(n!==null){var a=_t();rn(n,e,t,a)}oc(e,t)}};ap=function(){return Te};sp=function(e,t){var n=Te;try{return Te=e,t()}finally{Te=n}};Mi=function(e,t,n){switch(t){case"input":if(wi(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=vo(a);if(!s)throw Error(G(90));Lu(a),wi(a,s)}}}break;case"textarea":Ou(e,n);break;case"select":t=n.value,t!=null&&Mr(e,!!n.multiple,t,!1)}};Hu=tc;Yu=ur;var zg={usingClientEntryPoint:!1,Events:[Ua,wr,vo,Vu,Uu,tc]},ea={findFiberByHostInstance:er,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$g={bundleType:ea.bundleType,version:ea.version,rendererPackageName:ea.rendererPackageName,rendererConfig:ea.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ku(e),e===null?null:e.stateNode},findFiberByHostInstance:ea.findFiberByHostInstance||Mg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ds=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ds.isDisabled&&ds.supportsFiber)try{fo=ds.inject($g),fn=ds}catch{}}Ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zg;Ot.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!lc(t))throw Error(G(200));return Cg(e,t,null,n)};Ot.createRoot=function(e,t){if(!lc(e))throw Error(G(299));var n=!1,a="",s=Cm;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=sc(e,1,!1,null,null,n,!1,a,s),e[Sn]=t.current,Ma(e.nodeType===8?e.parentNode:e),new ic(t)};Ot.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(G(188)):(e=Object.keys(e).join(","),Error(G(268,e)));return e=Ku(t),e=e===null?null:e.stateNode,e};Ot.flushSync=function(e){return ur(e)};Ot.hydrate=function(e,t,n){if(!Co(t))throw Error(G(200));return Mo(null,e,t,!0,n)};Ot.hydrateRoot=function(e,t,n){if(!lc(e))throw Error(G(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=Cm;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Sm(t,null,e,1,n??null,s,!1,o,i),e[Sn]=t.current,Ma(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new So(t)};Ot.render=function(e,t,n){if(!Co(t))throw Error(G(200));return Mo(null,e,t,!1,n)};Ot.unmountComponentAtNode=function(e){if(!Co(e))throw Error(G(40));return e._reactRootContainer?(ur(function(){Mo(null,null,e,!1,function(){e._reactRootContainer=null,e[Sn]=null})}),!0):!1};Ot.unstable_batchedUpdates=tc;Ot.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!Co(n))throw Error(G(200));if(e==null||e._reactInternals===void 0)throw Error(G(38));return Mo(e,t,n,!1,a)};Ot.version="18.3.1-next-f1338f8080-20240426";function Mm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mm)}catch(e){console.error(e)}}Mm(),Mu.exports=Ot;var Em=Mu.exports,Od=Em;fi.createRoot=Od.createRoot,fi.hydrateRoot=Od.hydrateRoot;const si={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.settings":"Settings","nav.more":"More","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console (noVNC)","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.start":"Start","vm.shutdown_acpi":"Shutdown (ACPI)","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console (noVNC)","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.settings":"設定","nav.more":"更多","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台 (noVNC)","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.start":"啟動","vm.shutdown_acpi":"關機 (ACPI)","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台 (noVNC)","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},zm=m.createContext(null);function Pg({children:e}){const[t,n]=m.useState(()=>{const o=localStorage.getItem("language");return o&&si[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=m.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=m.useCallback((o,i)=>{let l=si[t][o]||si.en[o]||o;return i&&Object.entries(i).forEach(([c,d])=>{l=l.replace(`{${c}}`,String(d))}),l},[t]);return r.jsx(zm.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Ie(){const e=m.useContext(zm);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const Rg=m.createContext(null);function Tg({children:e}){const{t}=Ie(),[n,a]=m.useState(null),[s,o]=m.useState(""),i=m.useRef(null),l=m.useCallback(f=>{n&&(n.resolve(f),a(null),o(""))},[n]),c=m.useCallback((f,u={})=>new Promise(h=>{a({kind:"alert",title:u.title||t("dialog.notice"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:()=>h()})}),[t]),d=m.useCallback((f,u={})=>new Promise(h=>{a({kind:"confirm",title:u.title||t("dialog.confirm"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:y=>h(!!y)})}),[t]),p=m.useCallback((f,u={})=>new Promise(h=>{o(u.defaultValue||""),a({kind:"prompt",title:u.title||t("dialog.input"),body:f,destructive:!!u.destructive,inputType:u.inputType||"text",placeholder:u.placeholder||"",resolve:y=>h(y===null?null:String(y))})}),[t]);return m.useEffect(()=>{if(!n)return;const f=u=>{u.key==="Escape"?l(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):u.key==="Enter"&&n.kind!=="alert"?(u.preventDefault(),l(n.kind==="prompt"?s:!0)):u.key==="Enter"&&n.kind==="alert"&&l(void 0)};return document.addEventListener("keydown",f),n.kind==="prompt"&&setTimeout(()=>{var u;return(u=i.current)==null?void 0:u.focus()},50),()=>document.removeEventListener("keydown",f)},[n,s,l]),r.jsxs(Rg.Provider,{value:{alert:c,confirm:d,prompt:p},children:[e,n&&r.jsxs("div",{onClick:()=>l(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:Ig,children:[r.jsx("style",{children:Lg}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:f=>o(f.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>l(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>l(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const Ig={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},Lg=`
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
`;function Ag(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,l=m.useRef(null),c=m.useRef(null),d=m.useRef(null),p=m.useRef(t),[f,u]=m.useState({connected:!1,connecting:!1,lastMessageTime:0});p.current=t;const h=m.useCallback(()=>{const v=window.location.protocol==="https:"?"wss:":"ws:",x=window.location.host;return`${v}//${x}/ws`},[]),y=m.useCallback(()=>{var x;if(((x=l.current)==null?void 0:x.readyState)===WebSocket.OPEN)return;u(g=>({...g,connecting:!0}));const v=new WebSocket(h());l.current=v,v.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{v.readyState===WebSocket.OPEN&&v.send(JSON.stringify({type:"ping"}))},i)},v.onmessage=g=>{var S;try{const N=JSON.parse(g.data);u(T=>({...T,lastMessageTime:Date.now()})),(N.type==="initial"||N.type==="update")&&(S=N.data)!=null&&S.clusters&&p.current&&p.current(N.data.clusters)}catch(N){console.error("[WS] Failed to parse message:",N)}},v.onerror=g=>{console.error("[WS] Error:",g),s==null||s(g)},v.onclose=()=>{u(g=>({...g,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),c.current&&clearTimeout(c.current),c.current=window.setTimeout(()=>{y()},o)}},[h,n,a,s,o,i]),k=m.useCallback(()=>{c.current&&(clearTimeout(c.current),c.current=null),d.current&&(clearInterval(d.current),d.current=null),l.current&&(l.current.close(),l.current=null)},[]),j=m.useCallback(v=>{var x;((x=l.current)==null?void 0:x.readyState)===WebSocket.OPEN&&l.current.send(JSON.stringify(v))},[]);return m.useEffect(()=>(y(),()=>{k()}),[y,k]),m.useEffect(()=>{const v=setInterval(()=>{const g=Date.now()-f.lastMessageTime;f.connected&&g>15e3&&(k(),y())},5e3);return()=>clearInterval(v)},[f.connected,f.lastMessageTime,y,k]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:j,reconnect:y,disconnect:k}}const Og="/api";async function ke(e,t){const n=await fetch(`${Og}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const Ae={authMe:()=>ke("/auth/me"),authLogin:(e,t)=>ke("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>ke("/auth/logout",{method:"POST"}),totpEnrollInit:()=>ke("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>ke("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>ke("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>ke("/config"),updateConfig:e=>ke("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>ke("/clusters"),getCluster:e=>ke(`/clusters/${e}`),getSummary:()=>ke("/summary"),getNodes:e=>ke(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>ke(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>ke(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>ke(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>ke("/health"),vmAction:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?Ae.ctAction(e,t,n,s):Ae.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>ke(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>ke(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>ke(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>ke(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>ke("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Me(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function Ze(e,t=1){return`${e.toFixed(t)}%`}function Eo(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function ye(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function il(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function Fg({value:e,suffix:t="",className:n=""}){const a=h=>{if(typeof h=="number")return{left:h,isRatio:!1};const y=String(h).match(/^(\d+)\/(\d+)$/);if(y)return{left:parseInt(y[1]),right:parseInt(y[2]),isRatio:!0};const k=parseFloat(String(h));return isNaN(k)?{left:0,isRatio:!1}:{left:k,isRatio:!1}},s=a(e),[o,i]=m.useState(0),[l,c]=m.useState(s.right||0),d=m.useRef(null),p=m.useRef(0),f=m.useRef(!0);m.useEffect(()=>{const h=a(e);if(!f.current){i(h.left),h.right!==void 0&&c(h.right);return}const y=800,k=0,j=0;f.current=!1,d.current=null;const v=x=>{d.current||(d.current=x);const g=x-d.current,S=Math.min(g/y,1),N=1-Math.pow(1-S,3),T=k+(h.left-k)*N;if(i(Math.round(T)),h.isRatio&&h.right!==void 0){const C=j+(h.right-j)*N;c(Math.round(C))}S<1?p.current=requestAnimationFrame(v):(i(h.left),h.right!==void 0&&c(h.right))};return p.current=requestAnimationFrame(v),()=>{p.current&&cancelAnimationFrame(p.current)}},[e]);const u=s.isRatio?`${o}/${l}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function Fd({value:e,decimals:t=0,className:n=""}){const[a,s]=m.useState(0),o=m.useRef(null),i=m.useRef(0),l=m.useRef(!0);return m.useEffect(()=>{if(!l.current){s(e);return}const c=800,d=0;l.current=!1,o.current=null;const p=f=>{o.current||(o.current=f);const u=f-o.current,h=Math.min(u/c,1),y=1-Math.pow(1-h,3),k=d+(e-d)*y;s(k),h<1?i.current=requestAnimationFrame(p):s(e)};return i.current=requestAnimationFrame(p),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function oi({left:e,right:t,className:n=""}){const[a,s]=m.useState(0),[o,i]=m.useState(0),l=m.useRef(null),c=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{if(!d.current){s(e),i(t);return}const p=800,f=0,u=0;d.current=!1,l.current=null;const h=y=>{l.current||(l.current=y);const k=y-l.current,j=Math.min(k/p,1),v=1-Math.pow(1-j,3);s(Math.round(f+(e-f)*v)),i(Math.round(u+(t-u)*v)),j<1?c.current=requestAnimationFrame(h):(s(e),i(t))};return c.current=requestAnimationFrame(h),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function us({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(Fg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function ii({value:e,label:t,color:n,size:a=100}){const[s,o]=m.useState(0),i=m.useRef(null),l=m.useRef(0),c=m.useRef(!0);m.useEffect(()=>{if(!c.current){o(e);return}const j=1e3,v=0;c.current=!1,i.current=null;const x=g=>{i.current||(i.current=g);const S=g-i.current,N=Math.min(S/j,1),T=1-Math.pow(1-N,3),C=v+(e-v)*T;o(C),N<1?l.current=requestAnimationFrame(x):o(e)};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e]);const d=5,p=(a-d*4)/2-8,f=(a-d)/2,u=p+(f-p)/2,h=2*Math.PI*u,y=h-s/100*h,k=Array.from({length:36},(j,v)=>{const x=(v*10-90)*(Math.PI/180),g=v%3===0,S=g?6:3,N=f-2,T=N-S;return{x1:a/2+Math.cos(x)*N,y1:a/2+Math.sin(x)*N,x2:a/2+Math.cos(x)*T,y2:a/2+Math.sin(x)*T,isMajor:g}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:f,strokeWidth:1}),k.map((j,v)=>r.jsx("line",{x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,className:`ring-tick ${j.isMajor?"major":""}`},v)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:u,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:p,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:u,strokeWidth:d,strokeDasharray:h,strokeDashoffset:y,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-u-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function Dg({cluster:e,onClick:t}){var c,d;const{t:n}=Ie(),a=e.summary;if(!a)return null;const s=ye(a.total_cpu_usage),o=ye(a.total_memory_usage),i=a.alerts_warning>0,l=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${l?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(Fd,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(Fd,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(oi,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(oi,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(oi,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((c=a.ceph_health)==null?void 0:c.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Dd({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=Ie(),o=m.useMemo(()=>Object.entries(e),[e]),i=m.useMemo(()=>{let l=0,c=0,d=0,p=0;return Object.values(e).forEach(f=>{f.summary&&(l+=f.summary.total_cpu_usage||0,c+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,p++)}),{avgCpu:p>0?l/p:0,avgMem:p>0?c/p:0,avgStorage:p>0?d/p:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(ii,{value:i.avgCpu,label:s("metric.cpu"),color:ye(i.avgCpu),size:110}),r.jsx(ii,{value:i.avgMem,label:s("metric.memory"),color:ye(i.avgMem),size:110}),r.jsx(ii,{value:i.avgStorage,label:s("metric.disk"),color:ye(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(us,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(us,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(us,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(us,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([l,c])=>r.jsx(Dg,{cluster:c,onClick:()=>n(l)},l))})})]})]}),r.jsx("style",{children:`
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
      `})]})}function Bg(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const l=(o-.08)/.14;i+=s*.2*Math.sin(l*Math.PI)}if(o>.24&&o<.4){const l=(o-.24)/.16;if(l<.2)i-=s*.15*Math.sin(l*5*Math.PI);else if(l<.5){const c=(l-.2)/.3;i+=s*(1+a*.5)*Math.sin(c*Math.PI)}else if(l<.7){const c=(l-.5)/.2;i-=s*.25*Math.sin(c*Math.PI)}}if(o>.48&&o<.72){const l=(o-.48)/.24;i+=s*.35*Math.sin(l*Math.PI)}return i*n}function li({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const l=m.useRef(null),c=m.useRef(null),d=m.useRef([]),p=m.useRef(0),f=m.useRef(0),u=m.useRef(0),h=m.useRef(0),y=m.useRef(!i),k=m.useRef(!1),v=6e4/(50+e/100*50),x=12;m.useEffect(()=>{y.current=!i},[i]);const g=m.useCallback(()=>{const N=c.current;if(!N)return;N.fillStyle="rgba(5, 8, 15, 0.95)",N.fillRect(0,0,s,o),N.strokeStyle="rgba(0, 240, 255, 0.08)",N.lineWidth=.5;for(let z=0;z<o;z+=10)N.beginPath(),N.moveTo(0,z),N.lineTo(s,z),N.stroke();for(let z=0;z<s;z+=10)N.beginPath(),N.moveTo(z,0),N.lineTo(z,o),N.stroke();const T=o/2,C=o*.45,$=!a||e>90?"#ff0040":e>70?"#ff6b00":n;N.shadowColor=$,N.shadowBlur=6,N.strokeStyle=$,N.lineWidth=1.5,N.lineCap="round",N.lineJoin="round",N.beginPath();let w=!1;for(let z=0;z<s;z++){const W=(z-p.current+s)%s;if(W<8&&W>0)continue;const M=T-d.current[z]*C;w?N.lineTo(z,M):(N.moveTo(z,M),w=!0)}N.stroke(),N.shadowBlur=0,N.strokeStyle=`${$}60`,N.lineWidth=2,N.beginPath(),N.moveTo(p.current,0),N.lineTo(p.current,o),N.stroke();const R=N.createLinearGradient(p.current-15,0,p.current,0);R.addColorStop(0,"transparent"),R.addColorStop(1,`${$}30`),N.fillStyle=R,N.fillRect(p.current-15,0,15,o)},[s,o,e,a,n]);m.useEffect(()=>{const N=l.current;if(!N)return;const T=N.getContext("2d");if(!T)return;const C=window.devicePixelRatio||1;N.width=s*C,N.height=o*C,T.scale(C,C),c.current=T,d.current.length!==s&&(d.current=new Array(s).fill(0)),k.current=!0,g()},[s,o,g]),m.useEffect(()=>{if(!k.current||!c.current)return;const T=C=>{h.current||(h.current=C);const B=C-h.current;h.current=C;const $=B/1e3*x;f.current+=B/v,f.current>=1&&(f.current-=1);const w=Math.ceil($);for(let R=0;R<w;R++){const W=(f.current+R/w*(B/v))%1;let M;a?M=Bg(e,W,1):M=(Math.random()-.5)*.01,p.current=(p.current+1)%s,d.current[p.current]=M;const F=(p.current+1)%s;for(let X=0;X<8;X++){const L=(F+X)%s;d.current[L]=0}}g(),y.current&&(u.current=requestAnimationFrame(T))};return i||(h.current=0,u.current=requestAnimationFrame(T)),()=>{cancelAnimationFrame(u.current)}},[s,o,e,a,v,x,i,g]);const S=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:S()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:S()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:l,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function Wg({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=m.useRef(null),[i,l]=m.useState(180);return m.useEffect(()=>{const c=o.current;if(!c)return;const d=()=>{const f=c.clientWidth-6;f>0&&l(f)};d();const p=new ResizeObserver(d);return p.observe(c),()=>p.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(li,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(li,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(li,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}function Bd(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function Wd({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=m.useState(0),l=m.useRef(null),c=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{const p=d.current?0:o;d.current=!1,l.current=null;const f=u=>{l.current||(l.current=u);const h=u-l.current,y=Math.min(h/a,1),k=1-Math.pow(1-y,3),j=p+(e-p)*k;i(j),y<1?c.current=requestAnimationFrame(f):i(e)};return c.current=requestAnimationFrame(f),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function Vd({left:e,right:t,className:n=""}){const[a,s]=m.useState(0),[o,i]=m.useState(0),l=m.useRef(null),c=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{const f=d.current?0:a,u=d.current?0:o;d.current=!1,l.current=null;const h=y=>{l.current||(l.current=y);const k=y-l.current,j=Math.min(k/800,1),v=1-Math.pow(1-j,3);s(Math.round(f+(e-f)*v)),i(Math.round(u+(t-u)*v)),j<1?c.current=requestAnimationFrame(h):(s(e),i(t))};return c.current=requestAnimationFrame(h),()=>{c.current&&cancelAnimationFrame(c.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Vg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Ug(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Hg({state:e,onClose:t,onShowDetails:n,getNodeHealth:a}){const{t:s}=Ie();if(m.useEffect(()=>{const f=()=>t(),u=()=>t(),h=y=>{y.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",u,!0),document.addEventListener("keydown",h)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",u,!0),document.removeEventListener("keydown",h)}},[e.visible,t]),!e.visible||!e.node)return null;const o=e.node,i=o.status==="online",l=a(e.clusterId,o.node),c=l?`https://${l.host}:${l.port}/#v1:0:=node/${o.node}`:null,d=f=>{f.stopPropagation(),c&&window.open(c,"_blank","noopener,noreferrer"),t()},p=f=>{f.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${i?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:o.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:p,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:s("vm.details")})]}),c&&r.jsxs("button",{className:"context-menu-item",onClick:d,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:s("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("node.status"),":"]}),r.jsx("span",{className:i?"text-success":"text-danger",children:i?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.cpu"),":"]}),r.jsxs("span",{children:[o.cpu.cores," ",s("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.memory"),":"]}),r.jsx("span",{children:Me(o.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.vms_short"),":"]}),r.jsx("span",{children:o.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.cts_short"),":"]}),r.jsx("span",{children:o.ct_count})]})]})]})}function Yg({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=ye(s),i=.3+s/100*.7,[l,c]=m.useState(0),d=m.useRef(null),p=m.useRef(0),f=m.useRef(!0);return m.useEffect(()=>{const h=f.current?0:l;f.current=!1,d.current=null;const y=k=>{d.current||(d.current=k);const j=k-d.current,v=Math.min(j/1e3,1),x=1-Math.pow(1-v,3),g=h+(s-h)*x;c(g),v<1?p.current=requestAnimationFrame(y):c(s)};return p.current=requestAnimationFrame(y),()=>{p.current&&cancelAnimationFrame(p.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[l.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function Gg({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){ye(e.cpu.usage_percent),ye(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx(Wg,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:Eo(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Xg({node:e,storages:t,onClose:n}){const{t:a}=Ie(),s=e.status==="online",o=e.cpu.usage_percent,i=e.memory.used_bytes/e.memory.total_bytes*100,l=e.disk.used_bytes/e.disk.total_bytes*100;return r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:c=>c.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:s?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:Ug(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:Vg(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:Eo(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${ye(o)}`,children:Ze(o,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ye(o)}`,style:{width:`${o}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${Bd(e.cpu.iowait)}`,children:Ze(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Bd(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${ye(i)}`,children:Ze(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ye(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Me(e.memory.used_bytes)," / ",Me(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${ye(l)}`,children:Ze(l,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ye(l)}`,style:{width:`${l}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Me(e.disk.used_bytes)," / ",Me(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Me(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Me(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(c=>{const d=c.disk.used_bytes/c.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${c.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:c.storage}),r.jsx("span",{className:"storage-type",children:c.type}),c.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${ye(d)}`,style:{width:`${d}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Me(c.disk.used_bytes)," / ",Me(c.disk.total_bytes)]}),r.jsx("span",{className:`text-${ye(d)}`,children:Ze(d,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...c.content].sort().map(p=>r.jsx("span",{className:"content-label",children:p},p))})]},c.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Kg({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Ie(),[i,l]=m.useState(null),[c,d]=m.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),p=!e&&t&&Object.keys(t).length>0,f=m.useCallback((g,S)=>{var N;return e&&e.client_health?e.client_health[S]||null:t&&((N=t[g])!=null&&N.client_health)&&t[g].client_health[S]||null},[e,t]),u=m.useCallback((g,S,N)=>{g.preventDefault(),g.stopPropagation();const T=Math.min(g.clientX,window.innerWidth-250),C=Math.min(g.clientY,window.innerHeight-280);d({visible:!0,x:T,y:C,node:S,clusterId:N})},[]),h=m.useCallback(()=>{d(g=>({...g,visible:!1}))},[]),y=m.useMemo(()=>{var S,N,T,C,B;const g=[];if(p)Object.entries(t).forEach(([$,w])=>{var z,W,M,F,X;const R=Object.values(w.nodes);if(R.length>0){const L=R.reduce((O,U)=>O+U.cpu.usage_percent,0)/R.length,E=R.reduce((O,U)=>U.memory.total_bytes===0?O:O+U.memory.used_bytes/U.memory.total_bytes*100,0)/R.length;g.push({clusterId:$,clusterName:w.name||$,clusterNodes:R,isStandalone:((z=w.summary)==null?void 0:z.is_standalone)||!1,avgCpu:L,avgMem:E,vmsRunning:((W=w.summary)==null?void 0:W.vms_running)||0,ctsRunning:((M=w.summary)==null?void 0:M.cts_running)||0,vmCount:((F=w.summary)==null?void 0:F.vm_count)||0,ctCount:((X=w.summary)==null?void 0:X.ct_count)||0})}});else if(e){const $=Object.values(e.nodes),w=$.length>0?$.reduce((z,W)=>z+W.cpu.usage_percent,0)/$.length:0,R=$.length>0?$.reduce((z,W)=>W.memory.total_bytes===0?z:z+W.memory.used_bytes/W.memory.total_bytes*100,0)/$.length:0;g.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:$,isStandalone:((S=e.summary)==null?void 0:S.is_standalone)||!1,avgCpu:w,avgMem:R,vmsRunning:((N=e.summary)==null?void 0:N.vms_running)||0,ctsRunning:((T=e.summary)==null?void 0:T.cts_running)||0,vmCount:((C=e.summary)==null?void 0:C.vm_count)||0,ctCount:((B=e.summary)==null?void 0:B.ct_count)||0})}return g},[e,t,p]),k=y.flatMap(g=>g.clusterNodes);m.useMemo(()=>k.length===0?0:k.reduce((g,S)=>g+S.cpu.usage_percent,0)/k.length,[k]),m.useMemo(()=>k.length===0?0:k.reduce((g,S)=>S.memory.total_bytes===0?g:g+S.memory.used_bytes/S.memory.total_bytes*100,0)/k.length,[k]);let j=null,v=[];if(i){const[g,S]=i.split("/");if(p&&t){const N=t[g];N&&(j=N.nodes[S]||null,v=Object.values(N.storages).filter(T=>T.node===S))}else e&&(j=e.nodes[S]||null,v=Object.values(e.storages).filter(N=>N.node===S))}if(!e&&!p)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const x=p?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),x]})}),r.jsx("div",{className:"cluster-sections",children:y.map(g=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(g.clusterId),title:a?o("cluster.view_vms_in",{name:g.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:g.clusterName}),g.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[g.clusterNodes.filter(S=>S.status==="online").length,"/",g.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(Yg,{cpuUsage:g.avgCpu,memUsage:g.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:g.clusterNodes.map(S=>r.jsx(Gg,{node:S,onClick:()=>l(`${g.clusterId}/${S.node}`),onContextMenu:N=>u(N,S,g.clusterId),isPaused:s},`${g.clusterId}-${S.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${ye(g.avgCpu)}`,style:{width:`${g.avgCpu}%`}})}),r.jsx(Wd,{value:g.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${ye(g.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${ye(g.avgMem)}`,style:{width:`${g.avgMem}%`}})}),r.jsx(Wd,{value:g.avgMem,decimals:0,suffix:"%",className:`mini-value text-${ye(g.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(Vd,{left:g.vmsRunning,right:g.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(Vd,{left:g.ctsRunning,right:g.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},g.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),j&&r.jsx(Xg,{node:j,storages:v,onClose:()=>l(null)}),r.jsx(Hg,{state:c,onClose:h,onShowDetails:()=>{c.node&&l(`${c.clusterId}/${c.node.node}`)},getNodeHealth:f}),r.jsx("style",{children:`
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
      `})]})}const qg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Qg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Zg({task:e}){const t=qg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Qg(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:Jg})]})}const Jg=`
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
`;function eh({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:l,onCancel:c}){const[d,p]=mo.useState(""),f=m.useRef(null),u=m.useRef(null);if(m.useEffect(()=>{e&&(p(""),setTimeout(()=>{var y,k;a?(y=u.current)==null||y.focus():(k=f.current)==null||k.focus()},50))},[e,a]),m.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&(k.preventDefault(),c()),k.key==="Enter"&&(!a||d===a)&&(k.preventDefault(),l())};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,d,a,l,c]),!e)return null;const h=!a||d===a;return r.jsxs("div",{onClick:c,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:y=>y.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:y=>p(y.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:c,children:i}),r.jsx("button",{ref:f,className:`cm-btn confirm ${s?"danger":""}`,disabled:!h,onClick:l,children:o})]})]})]})}const th=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function nh({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=Ie(),[i,l]=m.useState("endpoint"),[c,d]=m.useState([]),[p,f]=m.useState(""),[u,h]=m.useState(""),[y,k]=m.useState(!1),[j,v]=m.useState(null),[x,g]=m.useState(null),[S,N]=m.useState(!1),[T,C]=m.useState({}),[B,$]=m.useState({}),[w,R]=m.useState(""),[z,W]=m.useState(""),[M,F]=m.useState(!0),[X,L]=m.useState(!1),[E,O]=m.useState(""),[U,K]=m.useState(""),[b,Y]=m.useState(""),[ee,ue]=m.useState(null),[te,le]=m.useState(!1),Oe=async()=>{if(!(!n||!q)){le(!0),ue(null),K("");try{const H=await Ae.migrationPrecheck(t,n.vmid,q.cluster_id,q.node_name||q.node_host);ue({ok:H.ok,blockers:H.blockers,warnings:H.warnings})}catch(H){const re=H instanceof Error?H.message:String(H);K(`pre-flight check failed: ${re}`)}finally{le(!1)}}},J=m.useRef(null);m.useEffect(()=>{e&&(l("endpoint"),d([]),f(""),h(""),v(null),g(null),C({}),$({}),R(""),W(n?String(n.vmid):""),O(""),K(""),Y(""),ue(null),Ae.listRemoteEndpoints(t).then(H=>d(H.endpoints)).catch(H=>K(`could not list target clusters: ${H.message||H}`)),n&&Ae.getMigrationSource(t,n.vmid).then(v).catch(H=>K(`could not introspect source VM: ${H.message||H}`)))},[e,t,n]),m.useEffect(()=>{if(!e)return;const H=re=>{re.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[e,i,a]);const q=c.find(H=>ps(H)===p),de=async H=>{var be;f(H);const re=c.find(se=>ps(se)===H);if(re){k(!0),N(!0),K(""),g(null),R("");try{const se=await Ae.fetchRemoteFingerprint(re.node_host,re.node_port);h(se.fingerprint)}catch(se){const ze=se instanceof Error?se.message:String(se);K(`could not auto-fetch fingerprint (${ze}); paste manually`),h("")}finally{k(!1)}try{const se=re.node_name||re.node_host,ze=await Ae.getMigrationTargets(re.cluster_id,se);g(ze);const nt=ze.ips.find(et=>et.address===re.node_host);R(nt?nt.address:((be=ze.ips[0])==null?void 0:be.address)||re.node_host)}catch(se){const ze=se instanceof Error?se.message:String(se);K(`could not enumerate target node resources: ${ze}`)}finally{N(!1)}}};m.useEffect(()=>{!j||!x||(C(H=>{const re={...H};return j.disks.forEach(be=>{var se;if(!re[be.key]){const ze=x.storages.find(nt=>nt.storage===be.storage);re[be.key]=((se=ze||x.storages[0])==null?void 0:se.storage)||""}}),re}),$(H=>{const re={...H};return j.nics.forEach(be=>{var se;if(!re[be.key]){const ze=x.bridges.find(nt=>nt.iface===be.bridge);re[be.key]=((se=ze||x.bridges[0])==null?void 0:se.iface)||""}}),re}))},[j,x]);const ce=m.useMemo(()=>{if(!j)return"";const H=new Set,re=new Map;return j.disks.forEach(be=>{const se=T[be.key];be.storage&&se&&(re.set(be.storage,se),H.add(se))}),H.size===1?Array.from(H)[0]:Array.from(re.entries()).map(([be,se])=>`${be}=${se}`).join(",")},[j,T]),Je=m.useMemo(()=>{if(!j)return"";const H=new Set,re=new Map;return j.nics.forEach(be=>{const se=B[be.key];be.bridge&&se&&(re.set(be.bridge,se),H.add(se))}),H.size===1?Array.from(H)[0]:Array.from(re.entries()).map(([be,se])=>`${be}=${se}`).join(",")},[j,B]),Se=async()=>{if(!(!n||!q)){l("submitting"),K("");try{const H=await Ae.remoteMigrate(t,n.vmid,{target_cluster_id:q.cluster_id,target_endpoint_host:w||q.node_host,target_endpoint_port:q.node_port,target_endpoint_fingerprint:u||void 0,target_vmid:parseInt(z,10),target_bridge_map:Je,target_storage_map:ce,online:M,delete_source:X,bwlimit:E?parseInt(E,10):void 0});Y(H.upid),l("done"),s==null||s(H.upid)}catch(H){const re=H instanceof Error?H.message:String(H);K(re),l("error")}}};if(!e||!n)return null;const st=!!z&&/^\d+$/.test(z)&&!!j&&!!x&&j.disks.every(H=>!!T[H.key])&&j.nics.every(H=>!!B[H.key]),$e=i==="endpoint"?!!q&&!!x&&!!w:i==="mappings"?st:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:ah,children:[r.jsx("style",{children:sh}),r.jsxs("div",{className:"rmm",onClick:H=>H.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsxs("select",{ref:J,value:p,onChange:H=>de(H.target.value),children:[r.jsx("option",{value:"",children:o("rmm.endpoint.select")}),c.map(H=>r.jsxs("option",{value:ps(H),children:[H.cluster_name," @ ",H.node_host,":",H.node_port]},ps(H)))]}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:u,onChange:H=>h(H.target.value),placeholder:y?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),q&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsxs("select",{value:w,onChange:H=>R(H.target.value),disabled:S||!x,children:[S&&r.jsx("option",{value:"",children:o("rmm.endpoint.datapath_loading")}),!S&&x&&x.ips.length===0&&r.jsxs("option",{value:q.node_host,children:[q.node_host," (mgmt)"]}),x&&x.ips.map(H=>r.jsxs("option",{value:H.address,children:[H.address," · ",H.iface," (",H.type,")"]},`${H.iface}-${H.address}`))]}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),U&&r.jsx("div",{className:"rmm-err",children:U}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!$e,onClick:()=>l("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&q&&j&&x&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:z,onChange:H=>W(H.target.value)}),j.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),j.disks.map(H=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:H.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[H.storage," ",r.jsx("em",{children:H.size})]}),r.jsx("select",{value:T[H.key]||"",onChange:re=>C({...T,[H.key]:re.target.value}),children:x.storages.map(re=>r.jsxs("option",{value:re.storage,children:[re.storage," (",re.type,", ",th(re.avail)," free)"]},re.storage))})]},H.key))]})]}),j.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),j.nics.map(H=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:H.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[H.bridge," ",r.jsx("em",{children:H.model})]}),r.jsx("select",{value:B[H.key]||"",onChange:re=>$({...B,[H.key]:re.target.value}),children:x.bridges.map(re=>r.jsxs("option",{value:re.iface,children:[re.iface,re.address?` (${re.address})`:""]},re.iface))})]},H.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:M,onChange:H=>F(H.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:X,onChange:H=>L(H.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:E,onChange:H=>O(H.target.value),placeholder:"0"}),U&&r.jsx("div",{className:"rmm-err",children:U}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!$e,onClick:()=>l("review"),children:o("rmm.action.review")})]})]}),i==="review"&&q&&r.jsxs(r.Fragment,{children:[r.jsx(rh,{vm:n,selected:q,clusterId:t,precheck:ee,precheckLoading:te,onRun:Oe,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[q.cluster_id,"/",q.node_host,":",q.node_port," → vmid ",z]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:w})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:u||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:ce||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:Je||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(M?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(X?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:E?`${E} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:te||ee!==null&&!ee.ok,onClick:Se,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:b})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:U}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>l("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function ps(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function rh({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(mo.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const l=a.blockers.length>0,c=a.warnings.length>0,d=l?"blockers":c?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((p,f)=>r.jsx("li",{children:p},f))})]}),c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((p,f)=>r.jsx("li",{children:p},f))})]}),!l&&!c&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const ah={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},sh=`
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
`;function oh(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function ih({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Ie(),[o,i]=m.useState([]),[l,c]=m.useState(!1),[d,p]=m.useState(!1),[f,u]=m.useState(""),[h,y]=m.useState(""),[k,j]=m.useState(!1),[v,x]=m.useState(""),g=async()=>{if(n){c(!0),x("");try{const C=await Ae.listSnapshots(t,n.vmid);i((C.snapshots||[]).filter(B=>B.name!=="current"))}catch(C){x(C instanceof Error?C.message:String(C))}finally{c(!1)}}};if(m.useEffect(()=>{e&&(u(""),y(""),j(!1),x(""),g())},[e,t,n==null?void 0:n.vmid]),m.useEffect(()=>{if(!e)return;const C=B=>{B.key==="Escape"&&a()};return document.addEventListener("keydown",C),()=>document.removeEventListener("keydown",C)},[e,a]),!e||!n)return null;const S=async()=>{if(f){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(f)){x("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}p(!0),x("");try{await Ae.createSnapshot(t,n.vmid,{snapname:f,description:h,vmstate:k}),u(""),y(""),j(!1),await g()}catch(C){x(C instanceof Error?C.message:String(C))}finally{p(!1)}}},N=async C=>{if(window.confirm(s("snap.confirm_delete",{name:C.name}))){x("");try{await Ae.deleteSnapshot(t,n.vmid,C.name),await g()}catch(B){x(B instanceof Error?B.message:String(B))}}},T=async C=>{if(window.confirm(s("snap.confirm_rollback",{name:C.name}))){x("");try{await Ae.rollbackSnapshot(t,n.vmid,C.name),await g()}catch(B){x(B instanceof Error?B.message:String(B))}}};return r.jsxs("div",{onClick:a,style:lh,children:[r.jsx("style",{children:ch}),r.jsxs("div",{className:"sm-modal",onClick:C=>C.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:f,onChange:C=>u(C.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:h,onChange:C=>y(C.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:k,onChange:C=>j(C.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:d||!f,onClick:S,children:d?"…":s("snap.create")})]})]}),v&&r.jsx("div",{className:"sm-err",children:v}),r.jsxs("div",{className:"sm-list",children:[l&&r.jsx("div",{className:"sm-empty",children:"…"}),!l&&o.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&o.map(C=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:C.name}),C.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:C.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",oh(C.snaptime)]}),C.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),C.description&&r.jsx("div",{className:"sm-desc",children:C.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>T(C),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>N(C),children:s("snap.delete")})]})]},C.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const lh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},ch=`
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
`;function dh({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Ie(),[o,i]=m.useState([]),[l,c]=m.useState(!1),[d,p]=m.useState(""),[f,u]=m.useState("snapshot"),[h,y]=m.useState("zstd"),[k,j]=m.useState(""),[v,x]=m.useState(""),[g,S]=m.useState(!1);if(m.useEffect(()=>{!e||!n||(j(""),x(""),p(""),c(!0),Ae.getCluster(t).then(C=>{const $=Object.values(C.storages||{}).filter(w=>{var z;if(!((z=w.content)!=null&&z.includes("backup")))return!1;const R=w.allowed_nodes||[];return R.length>0&&!R.includes(n.node)||!w.shared&&w.node!==n.node?!1:w.enabled!==!1});i($),$.length>0&&p($[0].storage)}).catch(C=>j(C.message||String(C))).finally(()=>c(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),m.useEffect(()=>{if(!e)return;const C=B=>{B.key==="Escape"&&!g&&a()};return document.addEventListener("keydown",C),()=>document.removeEventListener("keydown",C)},[e,g,a]),!e||!n)return null;const N=o.length>0,T=async()=>{if(d){S(!0),j("");try{const C=await Ae.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:f,compress:h});x(C.upid)}catch(C){j(C instanceof Error?C.message:String(C))}finally{S(!1)}}};return r.jsxs("div",{onClick:()=>!g&&a(),style:uh,children:[r.jsx("style",{children:ph}),r.jsxs("div",{className:"bm-modal",onClick:C=>C.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!v&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),l?r.jsx("div",{className:"bm-empty",children:"…"}):N?r.jsx("select",{value:d,onChange:C=>p(C.target.value),children:o.map(C=>r.jsxs("option",{value:C.storage,children:[C.storage," (",C.type,C.shared?", shared":"",")"]},C.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:f,onChange:C=>u(C.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:h,onChange:C=>y(C.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),k&&r.jsx("div",{className:"bm-err",children:k}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:g,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:g||!d,onClick:T,children:g?"…":s("backup.start")})]})]}),v&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:v})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const uh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},ph=`
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
`;function mh({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=Ie(),[i,l]=m.useState(""),[c,d]=m.useState(!1),[p,f]=m.useState(""),u=m.useRef(null);if(m.useEffect(()=>{e&&(l(""),f(""),d(!1),setTimeout(()=>{var y;return(y=u.current)==null?void 0:y.focus()},50))},[e]),m.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&!c&&a()};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,c,a]),!e)return null;const h=async()=>{if(i){d(!0),f("");try{await s(i)}catch(y){const k=y instanceof Error?y.message:String(y);f(o("console.prepare_failed",{err:k})),d(!1)}}};return r.jsxs("div",{onClick:()=>!c&&a(),style:fh,children:[r.jsx("style",{children:gh}),r.jsxs("div",{className:"cpw-modal",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:u,type:"password",value:i,onChange:y=>l(y.target.value),onKeyDown:y=>{y.key==="Enter"&&h()},autoComplete:"current-password",spellCheck:!1}),p&&r.jsx("div",{className:"cpw-err",children:p}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:c,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:h,disabled:c||!i,children:c?"…":o("console.prompt_open")})]})]})]})}const fh={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},gh=`
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
`;function $m(){const[e,t]=m.useState(!0),[n,a]=m.useState(null),[s,o]=m.useState(!1),i=async()=>{try{const c=await Ae.authMe();c.authenticated&&c.user?(a(c.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},l=async()=>{try{await Ae.authLogout()}catch{}window.location.replace("/login")};return m.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:l}}function ci(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function hh(e){return e==="stop"||e==="shutdown"||e==="reboot"}function ms(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const l of Object.values(i.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function xh({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:l,getNodeHealth:c,userRole:d,consoleMode:p,consolePasswordSet:f}){const{t:u}=Ie();if(m.useEffect(()=>{const g=()=>t(),S=()=>t(),N=T=>{T.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",g),document.addEventListener("scroll",S,!0),document.addEventListener("keydown",N)),()=>{document.removeEventListener("click",g),document.removeEventListener("scroll",S,!0),document.removeEventListener("keydown",N)}},[e.visible,t]),!e.visible||!e.vm)return null;const h=e.vm,y=c(e.clusterId,h.node),k=y?`https://${y.host}:${y.port}/#v1:0:=${h.type}/${h.vmid}`:null,j=g=>{g.stopPropagation(),k&&window.open(k,"_blank","noopener,noreferrer"),t()},v=g=>{g.stopPropagation(),n(),t()},x=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:g=>g.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:h.name}),r.jsxs("span",{className:"context-menu-id",children:["#",h.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:v,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:u("vm.details")})]}),k&&r.jsxs("button",{className:"context-menu-item",onClick:j,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:u("vm.open_pve")})]}),(d==="operator"||d==="admin")&&(()=>{const g=p==="disabled"?"console.disabled":h.status!=="running"?"console.vm_not_running":p==="stored"&&!f?"console.stored_no_pw":null,S=!!g;return r.jsxs("button",{className:`context-menu-item ${S?"is-disabled":""}`,title:S?u(g):void 0,onClick:N=>{if(N.stopPropagation(),S){alert(u(g)),t();return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:u("vm.console")})]})})(),(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:u("vm.snapshots")})]}),(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:u("vm.backup_now")})]}),(d==="operator"||d==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),h.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:u("vm.start")})]}),h.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:u("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:u("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:g=>{g.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:u("vm.stop_hard")})]})]})]}),d==="admin"&&h.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:g=>{g.stopPropagation(),l(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:u("vm.migrate_remote")})]})]})]});return Em.createPortal(x,document.body)}const Ud=mo.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:l=!1,isCompleting:c=!1},d){var T,C,B;const p=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,h=Math.max(t.cpu.usage_percent,f,u),y=p?ye(h):"muted",k=!!i,j=(T=i==null?void 0:i.task_type)==null?void 0:T.includes("migrate"),v=((C=i==null?void 0:i.task_type)==null?void 0:C.includes("backup"))||((B=i==null?void 0:i.task_type)==null?void 0:B.includes("vzdump")),x=t.name.length>12?t.name.substring(0,11)+"…":t.name,S=i?($=>{const w=$.toLowerCase();return w.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:w.includes("backup")||w.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:w.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:w.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:w.includes("clone")?{label:"CLONE",color:"#10b981"}:w.includes("start")||w.includes("qmstart")?{label:"START",color:"#00ff88"}:w.includes("stop")||w.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:w.includes("reboot")||w.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,N=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${k?"has-task":""} ${j?"migrating":""} ${v?"backup":""} ${l?"ghost":""} ${c?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${y}`,children:[r.jsx("span",{className:"vm-name",children:x}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!j&&!v&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),v&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),j&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),S&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:S.color,color:S.color},children:[S.label,j&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),k&&!j&&!v&&r.jsx("div",{className:"vm-task-ring"}),v&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),j&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(N==null?void 0:N.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",N.target]})]}),l&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function vh({vm:e,onClose:t}){const{t:n}=Ie(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${il(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${il(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:Eo(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${ye(e.cpu.usage_percent)}`,children:Ze(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${ye(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Me(e.memory.used_bytes)," / ",Me(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${ye(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Me(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Me(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function yh({cluster:e,clusters:t}){var Pe;const{t:n,language:a}=Ie(),[s,o]=m.useState(null),i=$m(),[l,c]=m.useState(null),[d,p]=m.useState(null),[f,u]=m.useState(null),[h,y]=m.useState(null),[k,j]=m.useState("disabled"),[v,x]=m.useState({});m.useEffect(()=>{Ae.getConfig().then(_=>{var A;j(((A=_.console)==null?void 0:A.mode)||"disabled");const V={};(_.clusters||[]).forEach(P=>{V[P.id]=!!(P.auth&&P.auth.password&&P.auth.password.length>0)}),x(V)}).catch(()=>j("disabled"))},[]);const[g,S]=m.useState(null),N=m.useCallback((_,V,A,P)=>{const D=typeof localStorage<"u"&&localStorage.getItem("language")||"",Z=V.type==="lxc",ie=`${Z?"/console-term":"/console"}/${encodeURIComponent(_)}/${encodeURIComponent(V.node)}/${V.vmid}?ct=${encodeURIComponent(A)}`+(V.name?`&name=${encodeURIComponent(V.name)}`:"")+(D?`&lang=${encodeURIComponent(D)}`:"")+(!Z&&P?`#vp=${encodeURIComponent(P)}`:"");window.open(ie,"_blank","noopener,noreferrer")},[]),[T,C]=m.useState([]),B=m.useRef(new Map),$=m.useCallback(_=>{_.action==="start"||_.action==="resume"?w(_):c(_)},[]),w=m.useCallback(async _=>{c(null);try{const V=_.vm.type==="lxc",A=V?await Ae.ctAction(_.clusterId,_.vm.node,_.vm.vmid,_.action):await Ae.vmAction(_.clusterId,_.vm.node,_.vm.vmid,_.action);console.info(`[vm_control] ${_.action} ${V?"ct":"vm"}/${_.vm.vmid} → upid=${A.upid}`)}catch(V){const A=V instanceof Error?V.message:String(V);A.includes("vm_control_disabled")?alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):alert(`${_.action} failed: ${A.slice(0,200)}`)}},[]),R=m.useCallback(()=>{l&&w(l)},[l,w]),[z,W]=m.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[M,F]=m.useState(""),[X,L]=m.useState("grid"),[E,O]=m.useState("vmid"),[U,K]=m.useState("asc"),[b,Y]=m.useState(!1),[ee,ue]=m.useState(()=>{const _=localStorage.getItem("matrix_card_width");return _?parseInt(_,10):85}),[te,le]=m.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[Oe,J]=m.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[q,de]=m.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[ce,Je]=m.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[Se,st]=m.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[$e,H]=m.useState([]),[re,be]=m.useState([]),[se,ze]=m.useState(new Map),nt=m.useRef(new Set),[et,ln]=m.useState(!1),[ot,Xt]=m.useState(0),[Dt,ht]=m.useState(!0);m.useEffect(()=>{ln(!1),Xt(A=>A+1),ht(!0);const _=setTimeout(()=>{ln(!0)},100),V=setTimeout(()=>{ht(!1)},8e3);return()=>{clearTimeout(_),clearTimeout(V)}},[Oe]);const oe=m.useRef(new Map),pe=m.useRef(new Map),Fe=m.useRef(null),He=m.useRef(!1),ct=m.useMemo(()=>{if(te!=="load")return"";const _=[],V=A=>{Object.values(A.vms).forEach(P=>{if(P.template||z==="running"&&P.status!=="running"||z==="stopped"&&P.status!=="stopped")return;const D=P.memory.total_bytes>0?P.memory.used_bytes/P.memory.total_bytes*100:0,Z=P.disk.total_bytes>0?P.disk.used_bytes/P.disk.total_bytes*100:0,Q=Math.max(P.cpu.usage_percent,D,Z);_.push({key:`${P.node}/${P.vmid}`,load:Math.round(Q)})})};return t?Object.values(t).forEach(V):e&&V(e),_.sort((A,P)=>P.load-A.load),_.map(A=>`${A.key}:${A.load}`).join("|")},[e,t,te,z]);m.useLayoutEffect(()=>{if(te!=="load"||He.current)return;const _=new Map;oe.current.forEach((V,A)=>{V&&_.set(A,V.getBoundingClientRect())}),pe.current=_},[ct,te]),m.useEffect(()=>{te==="load"&&pe.current.size!==0&&requestAnimationFrame(()=>{const _=[];oe.current.forEach((V,A)=>{if(!V)return;const P=pe.current.get(A);if(!P)return;const D=V.getBoundingClientRect(),Z=P.left-D.left,Q=P.top-D.top;if(Math.abs(Z)>2||Math.abs(Q)>2){He.current=!0;const ie=V.animate([{transform:`translate(${Z}px, ${Q}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});_.push(ie)}}),_.length>0?Promise.all(_.map(V=>V.finished)).then(()=>{He.current=!1}).catch(()=>{He.current=!1}):He.current=!1})},[ct,te]);const[xt,kt]=m.useState(!1);m.useEffect(()=>{xt||Ae.getConfig().then(_=>{var A;const V=(A=_==null?void 0:_.ui)==null?void 0:A.vm_matrix_default_filter;V&&(W(V),localStorage.setItem("vm_matrix_default_filter",V)),kt(!0)}).catch(()=>{const _=localStorage.getItem("vm_matrix_default_filter");_&&W(_),kt(!0)})},[xt]),m.useEffect(()=>{const _=()=>{const A=localStorage.getItem("matrix_card_width");A&&ue(parseInt(A,10));const P=localStorage.getItem("matrix_sort_by");P&&P!==te&&le(P);const D=localStorage.getItem("matrix_group_sort_by");D&&D!==q&&de(D);const Z=localStorage.getItem("matrix_group_sort_order");Z&&Z!==ce&&Je(Z)};window.addEventListener("storage",_);const V=setInterval(_,1e3);return()=>{window.removeEventListener("storage",_),clearInterval(V)}},[te,q,ce]);const ae=m.useCallback((_,V)=>{var A;return e&&e.client_health?e.client_health[V]||null:t&&((A=t[_])!=null&&A.client_health)&&t[_].client_health[V]||null},[e,t]),Le=m.useCallback((_,V,A)=>{_.preventDefault(),_.stopPropagation();const P=Math.min(_.clientX,window.innerWidth-250),D=Math.min(_.clientY,window.innerHeight-300);st({visible:!0,x:P,y:D,vm:V,clusterId:A})},[]),Ye=m.useCallback(()=>{st(_=>({..._,visible:!1}))},[]),Ce=!e&&t&&Object.keys(t).length>0,xe=m.useMemo(()=>{const _=[],V=(A,P,D)=>{if(!A.tasks)return;Object.values(A.tasks).forEach(Q=>{var pt;const ie=((pt=Q.task_type)==null?void 0:pt.toLowerCase())||"",he=ie.includes("migrate"),je=Q.status==="running",we=!!Q.target_node,ut=ie.startsWith("ha");if(ie.startsWith("qm")||ie.startsWith("vz"),je&&he&&we&&!ut){const Be=Object.keys(A.vms).find(Ct=>{const dn=A.vms[Ct];return dn.vmid===Q.vmid&&dn.node===Q.node});Be&&_.push({vm:A.vms[Be],task:Q,targetNode:Q.target_node||"",clusterId:P,clusterLabel:D})}})};return Ce&&t?Object.entries(t).forEach(([A,P])=>{V(P,A,P.name||A)}):e&&V(e,e.id,e.name||e.id),_},[e,t,Ce]);m.useEffect(()=>{const _=new Set(xe.map(P=>`${P.clusterId}:${P.vm.vmid}`)),V=nt.current,A=B.current;V.forEach(P=>{if(!_.has(P)&&!se.has(P)){const D=A.get(P);D&&D.upid&&(async()=>{var Z,Q,ie;try{const he=await Ae.taskStatus(D.clusterId,D.node,D.upid),je=(he==null?void 0:he.exitstatus)||"";if((he==null?void 0:he.status)==="running")return;if(je&&je!=="OK"){const ut=((Z=e==null?void 0:e.vms)==null?void 0:Z[`${D.node}/${D.vmid}`])||((ie=(Q=t==null?void 0:t[D.clusterId])==null?void 0:Q.vms)==null?void 0:ie[`${D.node}/${D.vmid}`]),pt=ut&&ut.lock||"migrate";C(Be=>Be.some(Ct=>Ct.id===P)?Be:[...Be,{id:P,vmid:D.vmid,sourceNode:D.node,targetNode:D.targetNode,clusterLabel:D.clusterLabel,lock:pt,copied:!1}])}}catch{}})(),A.delete(P)}}),xe.forEach(({vm:P,task:D,clusterId:Z,clusterLabel:Q,targetNode:ie})=>{const he=`${Z}:${P.vmid}`;A.set(he,{upid:D.upid,node:D.node,vmid:P.vmid,clusterId:Z,clusterLabel:Q,targetNode:ie})}),nt.current=_},[xe,se,e,t]);const cn=m.useRef(new Map);m.useEffect(()=>{xe.forEach(({vm:_,targetNode:V,clusterId:A})=>{const P=`${A}:${_.vmid}`;cn.current.set(P,{targetNode:V,sourceNode:_.node,clusterId:A,vmid:_.vmid})})},[xe]);const Bt=m.useRef(new Map);m.useEffect(()=>{$e.forEach(_=>{const V=`${_.clusterId}:${_.vmid}`;Bt.current.set(V,{x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2})})},[$e]),m.useEffect(()=>{const _=new Set(xe.map(V=>`${V.clusterId}:${V.vm.vmid}`));cn.current.forEach((V,A)=>{if(!_.has(A)&&!se.has(A)){const P=Bt.current.get(A);if(P){const D=Date.now(),Z=800,Q=()=>{const ie=Date.now()-D,he=Math.min(ie/Z,1),je=P.x1+(P.x2-P.x1)*he,we=P.y1+(P.y2-P.y1)*he;be([{x1:je,y1:we,x2:P.x2,y2:P.y2,vmid:V.vmid,progress:he}]),he<1?requestAnimationFrame(Q):be([])};requestAnimationFrame(Q)}ze(D=>{const Z=new Map(D);return Z.set(A,{...V,startTime:Date.now()}),Z}),cn.current.delete(A),Bt.current.delete(A),setTimeout(()=>{ze(D=>{const Z=new Map(D);return Z.delete(A),Z})},1e4)}})},[xe,se]),m.useEffect(()=>{if(se.size===0)return;const _=(V,A)=>{const P=D=>{for(const Z of Object.values(D.vms))if(Z.vmid===V)return Z.node;return null};if(t&&A){const D=t[A];if(D)return P(D)}else if(e)return P(e);return null};se.forEach((V,A)=>{const P=_(V.vmid,V.clusterId);P&&P===V.targetNode&&P!==V.sourceNode&&ze(D=>{const Z=new Map(D);return Z.delete(A),Z})})},[e,t,se]);const Kt=m.useCallback((_,V)=>{const A=Ce?`${V} / `:"";switch(Oe){case"none":return Ce?V:"all";case"type":return`${A}${_.type==="qemu"?"VM":"CT"}`;case"tag":return _.tags&&_.tags.length>0?`${A}${_.tags[0]}`:`${A}(no tag)`;case"node":default:return`${A}${_.node}`}},[Oe,Ce]),fe=m.useMemo(()=>{const _={},V=(A,P,D)=>{Object.entries(A.vms).forEach(([Z,Q])=>{if(z==="running"&&Q.status!=="running"||z==="stopped"&&Q.status!=="stopped"||M&&!Q.name.toLowerCase().includes(M.toLowerCase())&&!String(Q.vmid).includes(M)||Q.template)return;const ie=Kt(Q,P);_[ie]||(_[ie]={vms:[],clusterId:D}),_[ie].vms.push(Q)})};return Ce?Object.entries(t).forEach(([A,P])=>{const D=P.name||A;V(P,D,A)}):e&&V(e,"",e.id),Object.values(_).forEach(A=>{A.vms.sort((P,D)=>{switch(te){case"name":return P.name.localeCompare(D.name);case"load":{const Z=P.memory.total_bytes>0?P.memory.used_bytes/P.memory.total_bytes*100:0,Q=D.memory.total_bytes>0?D.memory.used_bytes/D.memory.total_bytes*100:0,ie=P.disk.total_bytes>0?P.disk.used_bytes/P.disk.total_bytes*100:0,he=D.disk.total_bytes>0?D.disk.used_bytes/D.disk.total_bytes*100:0,je=Math.max(P.cpu.usage_percent,Z,ie),we=Math.max(D.cpu.usage_percent,Q,he);if(P.status!=="running"&&D.status==="running")return 1;if(P.status==="running"&&D.status!=="running")return-1;if(P.status!=="running"&&D.status!=="running")return P.vmid-D.vmid;const ut=Ct=>Ct>=95?0:Ct>=80?1:2,pt=ut(je),Be=ut(we);return pt!==Be?pt-Be:we-je}case"vmid":default:return P.vmid-D.vmid}})}),_},[e,t,Ce,z,M,te,Kt]),I=m.useMemo(()=>{const _=[],V=new Map;return Ce&&t&&Object.entries(t).forEach(([A,P])=>{const D=P.name||A;Object.values(P.nodes||{}).forEach(Z=>{Z&&Z.node&&V.set(Z.node,{id:A,label:D})})}),xe.forEach(({vm:A,targetNode:P,clusterId:D,clusterLabel:Z})=>{const Q=V.get(P),ie=Q&&Q.id!==D?Q:{id:D,label:Z},he=Ce?`${ie.label} / ${P}`:P,je=Ce?`${Z} / ${A.node}`:A.node;_.push({vm:A,targetGroupKey:he,sourceGroupKey:je,clusterId:D,targetClusterId:ie.id})}),_},[xe,Ce,t]);m.useEffect(()=>{if(X!=="grid"||I.length===0){H([]);return}const _=()=>{const D=Fe.current;if(!D)return;const Z=D.getBoundingClientRect(),Q=D.scrollLeft,ie=D.scrollTop,he=[];I.forEach(({vm:je})=>{const we=`${je.cluster_id}/${je.node}/${je.vmid}`,ut=`ghost-${je.cluster_id}-${je.vmid}`,pt=oe.current.get(we),Be=oe.current.get(ut);if(pt&&Be){const Ct=pt.getBoundingClientRect(),dn=Be.getBoundingClientRect();he.push({x1:Ct.left+Ct.width/2-Z.left+Q,y1:Ct.top+Ct.height/2-Z.top+ie,x2:dn.left+dn.width/2-Z.left+Q,y2:dn.top+dn.height/2-Z.top+ie,vmid:je.vmid,clusterId:je.cluster_id})}}),H(he)},V=setTimeout(_,100),A=setInterval(_,500),P=Fe.current;return P&&P.addEventListener("scroll",_),()=>{clearTimeout(V),clearInterval(A),P&&P.removeEventListener("scroll",_)}},[I,X]);const ge=m.useMemo(()=>{const _=[],V=(A,P,D)=>{Object.values(A.vms).forEach(Z=>{z==="running"&&Z.status!=="running"||z==="stopped"&&Z.status!=="stopped"||M&&!Z.name.toLowerCase().includes(M.toLowerCase())&&!String(Z.vmid).includes(M)||Z.template||_.push({...Z,clusterName:P,clusterId:D})})};return Ce?Object.entries(t).forEach(([A,P])=>{const D=P.name||A;V(P,D,A)}):e&&V(e,e.name||"Cluster",e.id),_.sort((A,P)=>{var Z,Q,ie,he;let D=0;switch(E){case"name":D=A.name.localeCompare(P.name);break;case"vmid":D=A.vmid-P.vmid;break;case"type":D=A.type.localeCompare(P.type);break;case"node":D=A.node.localeCompare(P.node);break;case"status":D=A.status.localeCompare(P.status);break;case"cpu":D=A.cpu.usage_percent-P.cpu.usage_percent;break;case"memory":D=A.memory.used_bytes/A.memory.total_bytes-P.memory.used_bytes/P.memory.total_bytes;break;case"uptime":D=A.uptime-P.uptime;break;case"rx":D=(((Z=A.network)==null?void 0:Z.rx_bytes_sec)||0)-(((Q=P.network)==null?void 0:Q.rx_bytes_sec)||0);break;case"tx":D=(((ie=A.network)==null?void 0:ie.tx_bytes_sec)||0)-(((he=P.network)==null?void 0:he.tx_bytes_sec)||0);break;case"task":{const je=ms(A.vmid,A.node,A.cluster_id,e,t),we=ms(P.vmid,P.node,P.cluster_id,e,t);je&&!we?D=-1:!je&&we?D=1:je&&we?D=je.task_type.localeCompare(we.task_type):D=0;break}}return U==="asc"?D:-D}),_},[e,t,Ce,z,M,E,U]),me=_=>{Y(!0),setTimeout(()=>Y(!1),300),E===_?K(U==="asc"?"desc":"asc"):(O(_),K("asc"))},Ne=m.useMemo(()=>{if(!s)return null;if(e)return e.vms[s]||null;if(t){for(const _ of Object.values(t))if(_.vms[s])return _.vms[s]}return null},[s,e,t]);if(!e&&!Ce)return r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const{totalVMs:dt,runningVMs:Re}=m.useMemo(()=>{let _=0,V=0;const A=P=>{Object.values(P.vms).forEach(D=>{D.template||(_++,D.status==="running"&&V++)})};return Ce?Object.values(t).forEach(A):e&&A(e),{totalVMs:_,runningVMs:V}},[e,t,Ce]);return r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[Re," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[dt," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:M,onChange:_=>F(_.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${z==="all"?"active":""}`,onClick:()=>W("all"),children:n("matrix.filter_all")}),r.jsx("button",{className:`filter-tab ${z==="running"?"active":""}`,onClick:()=>W("running"),children:n("matrix.filter_running")}),r.jsx("button",{className:`filter-tab ${z==="stopped"?"active":""}`,onClick:()=>W("stopped"),children:n("matrix.filter_stopped")})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[n("settings.sort_by"),":"]}),r.jsx("button",{className:`sort-btn ${te==="vmid"?"active":""}`,onClick:()=>{le("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:"ID"}),r.jsx("button",{className:`sort-btn ${te==="name"?"active":""}`,onClick:()=>{le("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:n("settings.sort_name")}),r.jsx("button",{className:`sort-btn ${te==="load"?"active":""}`,onClick:()=>{le("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:n("settings.sort_load")})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[n("matrix.group_by"),":"]}),r.jsx("button",{className:`sort-btn ${Oe==="none"?"active":""}`,onClick:()=>{J("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:n("matrix.group_none")}),r.jsx("button",{className:`sort-btn ${Oe==="node"?"active":""}`,onClick:()=>{J("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:n("matrix.group_node")}),r.jsx("button",{className:`sort-btn ${Oe==="type"?"active":""}`,onClick:()=>{J("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:n("matrix.group_type")}),r.jsx("button",{className:`sort-btn ${Oe==="tag"?"active":""}`,onClick:()=>{J("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:n("matrix.group_tag")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${X==="grid"?"active":""}`,onClick:()=>L("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${X==="table"?"active":""}`,onClick:()=>L("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})})]})]})]}),r.jsxs("div",{className:"matrix-content",children:[X==="grid"?r.jsxs("div",{className:"matrix-grid",ref:Fe,children:[$e.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),$e.map((_,V)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${_.x1},${_.y1} L${_.x2},${_.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${_.x1},${_.y1} L${_.x2},${_.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${_.x1},${_.y1} L${_.x2},${_.y2}`})})]},`line-${_.vmid}-${V}`))]}),re.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),re.map((_,V)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-_.progress)+1,filter:"url(#completingGlow)",opacity:1-_.progress*.5}),_.progress>.8&&r.jsx("circle",{cx:_.x2,cy:_.y2,r:20*(_.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(_.progress-.8)*5})]},`completing-${_.vmid}-${V}`))]}),(()=>{const _=new Map;Object.entries(fe).forEach(([P,D])=>{_.set(P,D)}),I.forEach(P=>{_.has(P.targetGroupKey)||_.set(P.targetGroupKey,{vms:[],clusterId:P.clusterId})});const V=Array.from(_.entries()).sort((P,D)=>{const[Z]=P,[Q]=D,ie=ut=>{if(ut.includes(" / ")){const[pt,Be]=ut.split(" / ");return{cluster:pt,node:Be}}return{cluster:"",node:ut}},he=ie(Z),je=ie(Q);let we=0;return q==="cluster"?(we=he.cluster.localeCompare(je.cluster),we===0&&(we=he.node.localeCompare(je.node))):(we=he.node.localeCompare(je.node),we===0&&(we=he.cluster.localeCompare(je.cluster))),ce==="desc"?-we:we});let A=0;return V.map(([P,D])=>{const Z=I.filter(Q=>Q.targetGroupKey===P);return r.jsxs("div",{className:`node-section ${D.vms.length===0&&Z.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:P}),r.jsxs("span",{className:"node-section-count",children:[D.vms.length,Z.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",Z.length]})]})]}),r.jsxs("div",{className:`vm-grid ${te==="load"&&!Dt?"sort-by-load":""} ${Dt?"initial-load":""}`,children:[et&&D.vms.map(Q=>{const ie=`${Q.cluster_id}/${Q.node}/${Q.vmid}`,he=ms(Q.vmid,Q.node,Q.cluster_id,e,t),je=`${Q.cluster_id}:${Q.vmid}`,we=se.get(je);if(we&&we.sourceNode===Q.node||I.find(Be=>Be.targetClusterId===Q.cluster_id&&Be.vm.vmid===Q.vmid))return null;const pt=A++;return r.jsx(Ud,{ref:Be=>{Be?oe.current.set(ie,Be):oe.current.delete(ie)},vm:Q,isSelected:s===ie,onClick:()=>o(s===ie?null:ie),onContextMenu:Be=>Le(Be,Q,D.clusterId),animationDelay:Dt?pt*50:0,task:he,isCompleting:!!we},ie)}).filter(Boolean),et&&Z.map(Q=>{var je;const ie=`ghost-${Q.vm.cluster_id}-${Q.vm.vmid}`,he=(je=xe.find(we=>we.vm.vmid===Q.vm.vmid&&we.clusterId===Q.vm.cluster_id))==null?void 0:je.task;return r.jsx(Ud,{ref:we=>{we?oe.current.set(ie,we):oe.current.delete(ie)},vm:Q.vm,isSelected:!1,onClick:()=>{},onContextMenu:we=>we.preventDefault(),animationDelay:0,task:he,isGhost:!0},ie)})]},`grid-${z}-${M}-${te}-${ot}`)]},P)})})(),Object.keys(fe).length===0&&I.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):r.jsxs("div",{className:"matrix-table-container",children:[r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsxs("th",{className:`sortable ${E==="status"?"sorted":""}`,onClick:()=>me("status"),children:[r.jsx("span",{children:n("node.status")}),E==="status"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="vmid"?"sorted":""}`,onClick:()=>me("vmid"),children:[r.jsx("span",{children:"VMID"}),E==="vmid"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="type"?"sorted":""}`,onClick:()=>me("type"),children:[r.jsx("span",{children:n("table.type")}),E==="type"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="name"?"sorted":""}`,onClick:()=>me("name"),children:[r.jsx("span",{children:n("table.name")}),E==="name"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${E==="node"?"sorted":""}`,onClick:()=>me("node"),children:[r.jsx("span",{children:n("table.node")}),E==="node"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="cpu"?"sorted":""}`,onClick:()=>me("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),E==="cpu"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="memory"?"sorted":""}`,onClick:()=>me("memory"),children:[r.jsx("span",{children:n("metric.memory")}),E==="memory"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${E==="rx"?"sorted":""}`,onClick:()=>me("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),E==="rx"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${E==="tx"?"sorted":""}`,onClick:()=>me("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),E==="tx"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${E==="uptime"?"sorted":""}`,onClick:()=>me("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),E==="uptime"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${E==="task"?"sorted":""}`,onClick:()=>me("task"),children:[r.jsx("span",{children:n("table.task")}),E==="task"&&r.jsx("span",{className:"sort-indicator",children:U==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:ge.map(_=>{const V=`${_.cluster_id}/${_.node}/${_.vmid}`,A=_.status==="running",P=_.cpu.usage_percent,D=_.memory.used_bytes/_.memory.total_bytes*100,Z=ms(_.vmid,_.node,_.cluster_id,e,t);return r.jsxs("tr",{className:`${s===V?"selected":""} ${_.status} ${b?"sort-animating":""}`,onClick:()=>o(s===V?null:V),onContextMenu:Q=>Le(Q,_,_.clusterId),children:[r.jsx("td",{children:r.jsx("span",{className:`status-badge ${il(_.status)}`,children:_.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:_.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${_.type}`,children:_.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:_.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const Q=(_.tags||[]).map(ie=>(ie||"").trim()).filter(Boolean);return Q.length>0?r.jsx("div",{className:"vm-tags",children:Q.map((ie,he)=>r.jsx("span",{className:"vm-tag",children:ie},he))}):null})()}),r.jsx("td",{className:"node-cell",children:_.node}),r.jsx("td",{children:A?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ye(P)}`,style:{width:`${P}%`}})}),r.jsx("span",{className:`text-${ye(P)}`,children:Ze(P,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:A?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ye(D)}`,style:{width:`${D}%`}})}),r.jsx("span",{children:Ze(D,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:A?r.jsxs("span",{className:"net-rx",children:[Me(_.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:A?r.jsxs("span",{className:"net-tx",children:[Me(_.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:A?r.jsx("span",{className:"uptime-cell",children:Eo(_.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:Z&&r.jsx(Zg,{task:Z})})]},V)})})]}),ge.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),Ne&&r.jsx(vh,{vm:Ne,onClose:()=>o(null)},`${Ne.node}/${Ne.vmid}`)]}),r.jsx(xh,{state:Se,onClose:Ye,onShowDetails:()=>{Se.vm&&o(`${Se.vm.node}/${Se.vm.vmid}`)},onPowerAction:$,onOpenConsole:async()=>{if(!Se.vm)return;const _=Se.vm,V=Se.clusterId;if(k==="disabled"){alert(n("console.disabled"));return}if(k==="prompt"){S({vm:_,clusterId:V});return}try{const A=await Ae.consolePrepare({cluster_id:V,node:_.node,vmid:_.vmid});N(V,_,A.console_token,A.vnc_password)}catch(A){const P=A instanceof Error?A.message:String(A);alert(n("console.prepare_failed",{err:P}))}},onRemoteMigrate:()=>{Se.vm&&p({vm:Se.vm,clusterId:Se.clusterId})},onOpenSnapshots:()=>{Se.vm&&u({vm:Se.vm,clusterId:Se.clusterId})},onBackupNow:()=>{Se.vm&&y({vm:Se.vm,clusterId:Se.clusterId})},getNodeHealth:ae,userRole:((Pe=i.user)==null?void 0:Pe.role_global)??null,consoleMode:k,consolePasswordSet:!!v[Se.clusterId]}),r.jsx(eh,{open:l!==null,title:l?ci(l.action,n):"",destructive:l?hh(l.action):!1,details:l?r.jsxs(r.Fragment,{children:[n(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:ci(l.action,n),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?ci(l.action,n):n("action.cancel"),onConfirm:R,onCancel:()=>c(null)}),r.jsx(nh,{open:d!==null,cluster_id:(d==null?void 0:d.clusterId)||"",vm:d?{vmid:d.vm.vmid,name:d.vm.name,node:d.vm.node,type:d.vm.type}:null,onClose:()=>p(null)}),r.jsx(ih,{open:f!==null,cluster_id:(f==null?void 0:f.clusterId)||"",vm:f?{vmid:f.vm.vmid,name:f.vm.name,node:f.vm.node,type:f.vm.type}:null,onClose:()=>u(null)}),r.jsx(dh,{open:h!==null,cluster_id:(h==null?void 0:h.clusterId)||"",vm:h?{vmid:h.vm.vmid,name:h.vm.name,node:h.vm.node,type:h.vm.type}:null,onClose:()=>y(null)}),r.jsx(mh,{open:g!==null,cluster_id:(g==null?void 0:g.clusterId)||"",pveUser:(()=>{const _=g==null?void 0:g.clusterId;if(!_)return"root@pam";const V=t&&t[_]||((e==null?void 0:e.id)===_?e:null);return"root@pam"})(),onCancel:()=>S(null),onSubmit:async _=>{if(!g)return;const{vm:V,clusterId:A}=g,P=await Ae.consolePrepare({cluster_id:A,node:V.node,vmid:V.vmid,password:_});N(A,V,P.console_token,P.vnc_password),S(null)}}),T.length>0&&r.jsx("div",{className:"mig-fail-stack",children:T.map(_=>{const V=`qm unlock ${_.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:_.vmid,target:_.targetNode||"?",lock:_.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:_.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:V}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var A;(A=navigator.clipboard)==null||A.writeText(V).then(()=>{C(P=>P.map(D=>D.id===_.id?{...D,copied:!0}:D))})},children:_.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>C(A=>A.filter(P=>P.id!==_.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},_.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"})]}),r.jsx("style",{children:`
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
      `})]})}function fs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const l of Object.values(i.tasks))if(l.vmid===e&&l.node===t&&l.status==="running")return l;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function Pm(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function bh({vm:e,index:t,previousIndex:n,onClick:a,isSelected:s,task:o}){var x;const i=e.memory.used_bytes/e.memory.total_bytes*100,l=((x=e.disk)==null?void 0:x.usage_percent)||0,c=ye(e.cpu.usage_percent),d=ye(i),p=ye(l),f=m.useRef(null),[u,h]=m.useState(n===void 0),y=Pm(o||null);m.useEffect(()=>{if(u){const g=setTimeout(()=>h(!1),50);return()=>clearTimeout(g)}},[u]);const k=e.name.length>10?e.name.substring(0,9)+"…":e.name,v=Math.max(e.cpu.usage_percent,i,l)>95?"critical":"warning";return r.jsxs("div",{ref:f,className:`anomaly-item ${v} ${u?"entering":""} ${s?"selected":""} ${o?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${Ze(e.cpu.usage_percent,1)}
MEM: ${Ze(i,1)}
DISK: ${Ze(l,1)}${o?`
Task: ${o.task_type}`:""}`,onClick:a,children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${c}`}),r.jsx("span",{className:"anomaly-name",children:k}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),y&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${y.color}30`,borderColor:y.color,color:y.color},children:y.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${c}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(i,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(i,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(i)})]}),r.jsxs("div",{className:`metric-gauge ${p}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function wh({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Ie(),s=m.useRef(null),o=m.useRef(null),[i,l]=m.useState(0),[c,d]=m.useState(null),[p,f]=m.useState(new Map),[u,h]=m.useState(new Map),[y,k]=m.useState("grid"),[j,v]=m.useState(0);m.useEffect(()=>{const $=setTimeout(()=>k("line"),600),w=setTimeout(()=>k("flip"),1100),R=setTimeout(()=>k("done"),3300);return()=>{clearTimeout($),clearTimeout(w),clearTimeout(R)}},[]),m.useEffect(()=>{if(y!=="flip"&&y!=="done"){v(0);return}const $=y==="flip"?300:0,w=1800;let R,z=null;const W=M=>{z===null&&(z=M);const F=M-z-$;if(F<0){R=requestAnimationFrame(W);return}const X=Math.min(F/w,1),L=1-Math.pow(1-X,3);v(L),X<1&&(R=requestAnimationFrame(W))};return R=requestAnimationFrame(W),()=>cancelAnimationFrame(R)},[y]);const x=!e&&t&&Object.keys(t).length>0,g=m.useMemo(()=>{if(!e&&!x)return[];const $=[];return x?Object.values(t).forEach(w=>{Object.values(w.vms).forEach(R=>{R.status==="running"&&!R.template&&$.push(R)})}):e&&Object.values(e.vms).forEach(w=>{w.status==="running"&&!w.template&&$.push(w)}),$},[e,t,x]),S=m.useMemo(()=>g.map(($,w)=>{var O;const R=w/g.length*Math.PI*2,z=$.cpu.usage_percent,W=$.memory.total_bytes>0?$.memory.used_bytes/$.memory.total_bytes*100:0,M=((O=$.disk)==null?void 0:O.usage_percent)||0,F=Math.max(z,W,M),X=.2+F/100*.6,L=ye(F),E=fs($.vmid,$.node,$.cluster_id,e,t);return{vm:$,angle:R,distance:X,color:L,task:E}}),[g,e,t]),N=m.useMemo(()=>{if(!e&&!x)return[];const $=[];return x?Object.values(t).forEach(R=>{Object.values(R.vms).forEach(z=>$.push(z))}):e&&Object.values(e.vms).forEach(R=>$.push(R)),$.filter(R=>{if(R.status!=="running"||R.template)return!1;const z=R.memory.used_bytes/R.memory.total_bytes*100,W=R.disk.total_bytes>0?R.disk.used_bytes/R.disk.total_bytes*100:0;return R.cpu.usage_percent>80||z>85||W>85}).sort((R,z)=>{const W=R.memory.used_bytes/R.memory.total_bytes*100,M=z.memory.used_bytes/z.memory.total_bytes*100,F=R.disk.total_bytes>0?R.disk.used_bytes/R.disk.total_bytes*100:0,X=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0,L=Math.max(R.cpu.usage_percent,W,F);return Math.max(z.cpu.usage_percent,M,X)-L})},[e,t,x]);m.useEffect(()=>{const $=new Map;N.forEach((w,R)=>{$.set(`${w.cluster_id}/${w.node}/${w.vmid}`,R)}),f($)},[N]);const T=m.useCallback($=>{const w=s.current;if(!w)return;const R=w.getBoundingClientRect(),z=w.width/R.width,W=w.height/R.height,M=($.clientX-R.left)*z,F=($.clientY-R.top)*W,X=Math.min(w.width,w.height),L=w.width/2,E=w.height/2,O=X*.4;let U=null;for(const K of S){const b=L+Math.cos(K.angle)*O*K.distance,Y=E+Math.sin(K.angle)*O*K.distance,ee=Math.sqrt((M-b)**2+(F-Y)**2),ue=15*Math.max(z,W);if(ee<ue){U={vm:K.vm,x:$.clientX,y:$.clientY,pointX:b,pointY:Y};break}}d(U)},[S]),C=m.useCallback(()=>{d(null)},[]),B=m.useCallback($=>{const w=s.current;if(!w)return;const R=S.find(E=>E.vm.node===$.node&&E.vm.vmid===$.vmid);if(!R)return;const z=Math.min(w.width,w.height),W=w.width/2,M=w.height/2,F=z*.4,X=W+Math.cos(R.angle)*F*R.distance,L=M+Math.sin(R.angle)*F*R.distance;d({vm:R.vm,x:X,y:L,pointX:X,pointY:L})},[S]);return m.useEffect(()=>{if(n||y!=="done")return;const $=setInterval(()=>{l(w=>(w+2)%360)},50);return()=>clearInterval($)},[n,y]),m.useEffect(()=>{const $=s.current;if(!$)return;const w=$.getContext("2d");if(!w)return;const R=Math.min($.width,$.height),z=$.width/2,W=$.height/2,M=R*.4;w.clearRect(0,0,$.width,$.height),w.strokeStyle="rgba(0, 240, 255, 0.12)",w.lineWidth=.8;const F=20;for(let Y=z%F;Y<$.width;Y+=F)w.beginPath(),w.moveTo(Y,0),w.lineTo(Y,$.height),w.stroke();for(let Y=W%F;Y<$.height;Y+=F)w.beginPath(),w.moveTo(0,Y),w.lineTo($.width,Y),w.stroke();if(y!=="flip"&&y!=="done")return;w.globalAlpha=j,w.strokeStyle="rgba(0, 240, 255, 0.25)",w.lineWidth=1.5,w.font='13px "Share Tech Mono", monospace',w.fillStyle="rgba(0, 240, 255, 0.6)",w.textAlign="left";const X=["25%","50%","75%","100%"];for(let Y=1;Y<=4;Y++){const ee=M*(Y/4);w.beginPath(),w.arc(z,W,ee,0,Math.PI*2),w.stroke();const ue=z+ee+4,te=W+4;w.fillText(X[Y-1],ue,te)}w.fillStyle="rgba(0, 255, 136, 0.8)",w.textAlign="center",w.font='14px "Share Tech Mono", monospace',w.fillText("0%",z,W-8),w.font='11px "Share Tech Mono", monospace',w.fillText("LOW",z,W+8),w.fillStyle="rgba(0, 240, 255, 0.5)",w.textAlign="left",w.font='10px "Share Tech Mono", monospace',w.beginPath(),w.moveTo(z-M,W),w.lineTo(z+M,W),w.moveTo(z,W-M),w.lineTo(z,W+M),w.stroke();const L=i*Math.PI/180;for(let Y=0;Y<8;Y++){const ee=.12*(Y+1),ue=.15-Y*.015;w.fillStyle=`rgba(0, 240, 255, ${ue})`,w.beginPath(),w.moveTo(z,W),w.arc(z,W,M,L-ee,L-ee+.12),w.closePath(),w.fill()}w.save(),w.shadowBlur=20,w.shadowColor="#00f0ff";const E=w.createLinearGradient(z,W,z+Math.cos(L)*M,W+Math.sin(L)*M);E.addColorStop(0,"rgba(0, 255, 200, 1)"),E.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),E.addColorStop(1,"rgba(0, 240, 255, 0)"),w.strokeStyle=E,w.lineWidth=3,w.beginPath(),w.moveTo(z,W),w.lineTo(z+Math.cos(L)*M,W+Math.sin(L)*M),w.stroke(),w.lineWidth=1.5,E.addColorStop(0,"rgba(255, 255, 255, 1)"),w.stroke(),w.restore();const O=z+Math.cos(L)*M*.95,U=W+Math.sin(L)*M*.95,K=w.createRadialGradient(O,U,0,O,U,15);K.addColorStop(0,"rgba(0, 255, 200, 0.8)"),K.addColorStop(1,"rgba(0, 240, 255, 0)"),w.fillStyle=K,w.beginPath(),w.arc(O,U,15,0,Math.PI*2),w.fill();const b=[];S.forEach(Y=>{const ee=`${Y.vm.cluster_id}/${Y.vm.node}/${Y.vm.vmid}`,ue=(Y.angle*180/Math.PI+360)%360;(i-ue+360)%360<=5&&b.push({key:ee,point:{vm:Y.vm,angle:Y.angle,distance:Y.distance,color:Y.color,lastScanAngle:i}})}),b.length>0&&h(Y=>{const ee=new Map(Y);b.forEach(({key:te,point:le})=>{ee.set(te,le)});const ue=new Set(S.map(te=>`${te.vm.cluster_id}/${te.vm.node}/${te.vm.vmid}`));for(const te of ee.keys())ue.has(te)||ee.delete(te);return ee}),S.forEach(Y=>{var ce,Je;const ee=z+Math.cos(Y.angle)*M*Y.distance,ue=W+Math.sin(Y.angle)*M*Y.distance,te=(Y.angle*180/Math.PI+360)%360,le=(i-te+360)%360;let Oe;le<20?Oe=1:le<60?Oe=1-(le-20)/40*.4:Oe=.6-(le-60)/300*.45;let J="#00ff88";Y.color==="warning"&&(J="#ff6b00"),Y.color==="danger"&&(J="#ff0040");const q=!!Y.task,de=(Je=(ce=Y.task)==null?void 0:ce.task_type)==null?void 0:Je.includes("migrate");if(q){const Se=de?"#00f0ff":"#a855f7",st=Date.now()/500%1;if(w.beginPath(),w.arc(ee,ue,12+st*8,0,Math.PI*2),w.strokeStyle=Se,w.lineWidth=1.5,w.globalAlpha=(1-st)*.6*j,w.stroke(),w.beginPath(),w.arc(ee,ue,10,0,Math.PI*2),w.strokeStyle=Se,w.lineWidth=1,w.globalAlpha=.8*j,w.stroke(),de){const $e=Date.now()/200%(Math.PI*2);w.beginPath(),w.arc(ee,ue,15,$e,$e+Math.PI/2),w.strokeStyle=Se,w.lineWidth=2,w.globalAlpha=.9*j,w.stroke();for(let H=0;H<3;H++){const re=$e+H*Math.PI*2/3,be=8+(Date.now()/100+H*50)%100/100*10,se=ee+Math.cos(re)*be,ze=ue+Math.sin(re)*be;w.beginPath(),w.arc(se,ze,1.5,0,Math.PI*2),w.fillStyle=Se,w.globalAlpha=(.8-(Date.now()/100+H*50)%100/100*.6)*j,w.fill()}}w.globalAlpha=j}w.beginPath(),w.arc(ee,ue,4+Y.vm.cpu.usage_percent/100*4,0,Math.PI*2),w.fillStyle=J,w.globalAlpha=Oe*j,w.fill(),w.shadowBlur=10,w.shadowColor=J,w.fill(),w.shadowBlur=0,w.globalAlpha=j}),w.beginPath(),w.arc(z,W,6,0,Math.PI*2),w.fillStyle="#00f0ff",w.fill()},[i,S,y,j]),m.useEffect(()=>{const $=s.current;if(!$)return;const w=()=>{const R=$.parentElement;R&&($.width=R.clientWidth,$.height=R.clientHeight)};return w(),window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)},[]),!e&&!x?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${y!=="done"?"entering":""} ${y==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(y==="line"||y==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${y}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:T,onMouseLeave:C,style:{position:"absolute",top:0,left:0,cursor:c?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:j},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),c&&(()=>{var cn,Bt,Kt;const $=s.current;if(!$)return null;const w=$.width,R=$.height,z=$.getBoundingClientRect(),W=z.width,M=z.height,F=W/w,X=M/R,L=c.pointX*F,E=c.pointY*X,O=W,U=M,K=180,Y=fs(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t)?175:145,ee=K/2,ue=Y/2,te=50,le=120,Oe=O/2,J=U/2,q=L-Oe,de=E-J,ce=Math.sqrt(q*q+de*de)||1,Je=q/ce,Se=de/ce,st=(fe,I)=>{const ge=fe-ee,me=fe+ee,Ne=I-ue,dt=I+ue;if(L>=ge&&L<=me&&E>=Ne&&E<=dt)return-1;const Re=Math.max(ge,Math.min(me,L)),Pe=Math.max(Ne,Math.min(dt,E));return Math.sqrt((L-Re)**2+(E-Pe)**2)},$e=20,H=(fe,I)=>({x:Math.max(ee+$e,Math.min(O-ee-$e,fe)),y:Math.max(ue+$e,Math.min(U-ue-$e,I))}),be=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((fe,I)=>{const ge=fe.dx*Je+fe.dy*Se;return I.dx*Je+I.dy*Se-ge});let se={x:L+Je*le,y:E+Se*le},ze=!1;for(const fe of be){const I={x:L+fe.dx*le,y:E+fe.dy*le},ge=H(I.x,I.y),me=ge.x-L,Ne=ge.y-E,Re=Math.sqrt(me*me+Ne*Ne)>30&&Math.abs(Math.abs(me)-Math.abs(Ne))<20,Pe=st(ge.x,ge.y);if(Re&&Pe>=te){se=ge,ze=!0;break}}if(!ze)for(const fe of be){const I={x:L+fe.dx*(le+60),y:E+fe.dy*(le+60)},ge=H(I.x,I.y),me=ge.x-L,Ne=ge.y-E,Re=Math.sqrt(me*me+Ne*Ne)>30&&Math.abs(Math.abs(me)-Math.abs(Ne))<20,Pe=st(ge.x,ge.y);if(Re&&Pe>=te){se=ge,ze=!0;break}}if(!ze){const fe=be[0],I=fe.dx>0?(O-ee-10-L)/fe.dx:(ee+10-L)/fe.dx,ge=fe.dy>0?(U-ue-10-E)/fe.dy:(ue+10-E)/fe.dy,me=Math.min(Math.abs(I),Math.abs(ge),le),Ne=Math.max(te+20,me);se={x:L+fe.dx*Ne,y:E+fe.dy*Ne}}const nt=20,et=Math.max(ee+nt,Math.min(O-ee-nt,se.x)),ln=Math.max(ue+nt,Math.min(U-ue-nt,se.y)),ot=L,Xt=E,Dt=20,ht=28,oe=5,pe=-Math.PI/2,Fe=et-ee,He=ln-ue,ct=et,xt=ln,kt=c.vm.memory.total_bytes>0?c.vm.memory.used_bytes/c.vm.memory.total_bytes*100:0,ae=((cn=c.vm.disk)==null?void 0:cn.usage_percent)||0,Le=Math.max(c.vm.cpu.usage_percent,kt,ae),Ye=ye(Le),xe={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[Ye]||"#00f0ff";return O<=0||U<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const fe=Math.sqrt((ct-ot)**2+(xt-Xt)**2),I=Math.atan2(xt-Xt,ct-ot)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:ot,top:Xt,width:fe,height:2,background:`linear-gradient(90deg, ${xe}, ${xe}80)`,transformOrigin:"0 50%",transform:`rotate(${I}deg)`,boxShadow:`0 0 8px ${xe}, 0 0 16px ${xe}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:ot-ht-5,top:Xt-ht-5,width:(ht+5)*2,height:(ht+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const fe=ht+5,I=ht+5,ge=[];for(let Re=0;Re<oe;Re++){const Pe=pe+Re*2*Math.PI/oe;ge.push(`${fe+Dt*Math.cos(Pe)},${I+Dt*Math.sin(Pe)}`)}const me=ge.join(" "),Ne=[];for(let Re=0;Re<oe;Re++){const Pe=pe+Re*2*Math.PI/oe;Ne.push(`${fe+ht*Math.cos(Pe)},${I+ht*Math.sin(Pe)}`)}const dt=Ne.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:dt,fill:"none",stroke:xe,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${fe}px ${I}px`}}),r.jsx("polygon",{points:me,fill:"none",stroke:xe,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(Re=>{const Pe=pe+Re*2*Math.PI/oe,_=fe+Dt*Math.cos(Pe),V=I+Dt*Math.sin(Pe),A=6,P=pe+(Re-1+oe)%oe*2*Math.PI/oe,D=pe+(Re+1)%oe*2*Math.PI/oe,Z=_+A*Math.cos(P+Math.PI),Q=V+A*Math.sin(P+Math.PI),ie=_+A*Math.cos(D+Math.PI),he=V+A*Math.sin(D+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:_,y1:V,x2:Z,y2:Q,stroke:xe,strokeWidth:"2"}),r.jsx("line",{x1:_,y1:V,x2:ie,y2:he,stroke:xe,strokeWidth:"2"})]},Re)}),r.jsx("line",{x1:fe-5,y1:I,x2:fe+5,y2:I,stroke:xe,strokeWidth:"1"}),r.jsx("line",{x1:fe,y1:I-5,x2:fe,y2:I+5,stroke:xe,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${Ye}`,style:{position:"absolute",left:Fe,top:He,width:K,height:Y,borderColor:xe,boxShadow:`0 0 15px ${xe}40, 0 0 30px ${xe}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:xe}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:xe}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:xe}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:xe}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:c.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",c.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:c.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${ye(c.vm.cpu.usage_percent)}`,children:Ze(c.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${ye(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100)}`,children:Ze(c.vm.memory.used_bytes/c.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${ye(((Bt=c.vm.disk)==null?void 0:Bt.usage_percent)||0)}`,children:Ze(((Kt=c.vm.disk)==null?void 0:Kt.usage_percent)||0,1)})]}),(()=>{const fe=fs(c.vm.vmid,c.vm.node,c.vm.cluster_id,e,t),I=Pm(fe);return I?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${I.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:I.color},children:I.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:j},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:N.length})]}),r.jsx("div",{className:"anomaly-list",children:N.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):N.map(($,w)=>{const R=`${$.cluster_id}/${$.node}/${$.vmid}`,z=p.get(R),W=(c==null?void 0:c.vm.node)===$.node&&(c==null?void 0:c.vm.vmid)===$.vmid&&(c==null?void 0:c.vm.cluster_id)===$.cluster_id,M=fs($.vmid,$.node,$.cluster_id,e,t);return r.jsx(bh,{vm:$,index:w,previousIndex:z,onClick:()=>B($),isSelected:W,task:M},R)})})]})]}),r.jsx("style",{children:`
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

      `})]})}function kh({value:e,duration:t=800,suffix:n=""}){const[a,s]=m.useState(0),o=m.useRef(0),i=m.useRef(0);return m.useEffect(()=>{o.current=a;const l=performance.now(),c=d=>{const p=d-l,f=Math.min(p/t,1),u=1-Math.pow(1-f,3);s(o.current+(e-o.current)*u),f<1&&(i.current=requestAnimationFrame(c))};return i.current=requestAnimationFrame(c),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function ro({value:e,duration:t=800}){const[n,a]=m.useState(0),s=m.useRef(0),o=m.useRef(0);return m.useEffect(()=>{s.current=n;const i=performance.now(),l=c=>{const d=c-i,p=Math.min(d/t,1),f=1-Math.pow(1-p,3);a(s.current+(e-s.current)*f),p<1&&(o.current=requestAnimationFrame(l))};return o.current=requestAnimationFrame(l),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Me(n)})}function jh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(kh,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function _h({mons:e,mgrs:t,mds:n}){const{t:a}=Ie();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function Nh({osds:e,onSelect:t}){const{t:n}=Ie(),a=m.useMemo(()=>{const o={};return e.forEach(i=>{const l=i.host||"unknown";o[l]||(o[l]=[]),o[l].push(i)}),Object.entries(o).sort(([i],[l])=>i.localeCompare(l,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,l])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:l.sort((c,d)=>c.id-d.id).map(c=>{const d=c.total_bytes>0?c.used_bytes/c.total_bytes*100:0,p=c.status!=="up"||ye(d)==="danger"?"#ff0040":ye(d)==="warning"?"#ff6b00":"#00ff88",f=o*30;return o++,r.jsx("div",{className:`osd-hex ${c.status==="up"?"up":"down"}`,style:{"--osd-color":p,animationDelay:`${f}ms`},onClick:()=>t(c),title:`OSD.${c.id} - ${Ze(d,0)}`,children:r.jsx("span",{className:"osd-id",children:c.id})},c.id)})})]},i))})()})]})}function Sh({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=m.useRef(null),i=m.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),l=m.useRef(0),c=m.useRef(0),d=100,p=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return m.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),m.useEffect(()=>{const f=o.current;if(!f)return;const u=f.getContext("2d");if(!u)return;const h=window.devicePixelRatio||1,y=()=>{const C=f.getBoundingClientRect();return f.width=C.width*h,f.height=C.height*h,u.setTransform(h,0,0,h,0,0),{width:C.width,height:C.height}};let{width:k,height:j}=y();const v=42,x=k-v;let g=0;const S=50;let N=0;const T=C=>{const B=C-g;g=C,N+=B;const $=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*$,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*$,N>=S&&(N=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),c.current=(c.current+.5)%20,u.clearRect(0,0,k,j);const w=Math.max(...i.current.read,...i.current.write,1),R=8,z=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let M=0;M<=z;M++){const F=R+M/z*(j-R*2),X=w*(1-M/z);u.fillText(p(X),v-4,F)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let M=0;M<=z;M++){const F=R+M/z*(j-R*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-c.current,u.moveTo(v,F),u.lineTo(k,F),u.stroke()}u.setLineDash([]);const W=(M,F,X)=>{if(M.length<2)return;const L=M.map((O,U)=>({x:v+U/(d-1)*x,y:j-R-O/w*(j-R*2)}));u.strokeStyle=X,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(L[0].x,L[0].y);for(let O=1;O<L.length-1;O++){const U=(L[O].x+L[O+1].x)/2,K=(L[O].y+L[O+1].y)/2;u.quadraticCurveTo(L[O].x,L[O].y,U,K)}u.lineTo(L[L.length-1].x,L[L.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=F,u.lineWidth=2,u.shadowColor=F,u.shadowBlur=8,u.beginPath(),u.moveTo(L[0].x,L[0].y);for(let O=1;O<L.length-1;O++){const U=(L[O].x+L[O+1].x)/2,K=(L[O].y+L[O+1].y)/2;u.quadraticCurveTo(L[O].x,L[O].y,U,K)}u.lineTo(L[L.length-1].x,L[L.length-1].y),u.stroke(),u.shadowBlur=0;const E=3;for(let O=0;O<E;O++){const U=(c.current/20+O/E)%1,K=Math.floor(U*(L.length-1));K<L.length&&(u.fillStyle=F,u.globalAlpha=.8,u.beginPath(),u.arc(L[K].x,L[K].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};W(i.current.write,"#ff6b00","#ff6b00"),W(i.current.read,"#00ff88","#00ff88"),s||(l.current=requestAnimationFrame(T))};return l.current=requestAnimationFrame(T),()=>cancelAnimationFrame(l.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Me(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Me(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function Hd({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Me(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function Ch({osd:e,onClose:t}){const{t:n}=Ie(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=ye(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Me(e.used_bytes)," / ",Me(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:Ze(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function Mh({ceph:e}){const{t}=Ie(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Me(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Me(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",Ze(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",Ze(a,1)]})]})]})}function Eh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:Ze(n,0)})]})})}function zh({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function $h({ceph:e}){const{t}=Ie(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(ro,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(ro,{value:e.total_bytes})})]})]})}function Ph({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function Rh({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(ro,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(ro,{value:t,duration:500}),"/s"]})]})]})}function Th({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:Ze(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function Ih({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=Ie();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx(Eh,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(zh,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx($h,{ceph:e}),r.jsx(Rh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx(Ph,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(Th,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),l=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),c=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(jh,{ceph:e}),r.jsx(Mh,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(_h,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,p)=>r.jsx(Hd,{pool:d,totalBytes:e.total_bytes},d.name))})]}),l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,p)=>r.jsx(Hd,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(Sh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(Nh,{osds:e.osds,onSelect:n})]})]})})}function Lh({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Ie(),[s,o]=m.useState(null),i=!e&&t&&Object.keys(t).length>0,l=m.useMemo(()=>i?Object.entries(t).filter(([c,d])=>d.ceph).map(([c,d])=>({id:c,name:d.name||c,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:di})]}):l.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:di})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:l.map((c,d)=>{const p=c.ceph.health==="HEALTH_OK"?"success":c.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[l.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${p}`}),r.jsx("span",{className:"section-name",children:c.name}),r.jsxs("span",{className:"section-osd",children:[c.ceph.osd_up,"/",c.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(Ih,{ceph:c.ceph,clusterName:l.length===1?c.name:void 0,onOSDSelect:o,compact:l.length>1,isPaused:n})]},c.id)})}),s&&r.jsx(Ch,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:di})]})}const di=`
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
`;var Ah={value:()=>{}};function Rm(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new zs(n)}function zs(e){this._=e}function Oh(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}zs.prototype=Rm.prototype={constructor:zs,on:function(e,t){var n=this._,a=Oh(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=Fh(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=Yd(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Yd(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new zs(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function Fh(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function Yd(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=Ah,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var ll="http://www.w3.org/1999/xhtml";const Gd={svg:"http://www.w3.org/2000/svg",xhtml:ll,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function zo(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Gd.hasOwnProperty(t)?{space:Gd[t],local:e}:e}function Dh(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===ll&&t.documentElement.namespaceURI===ll?t.createElement(e):t.createElementNS(n,e)}}function Bh(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Tm(e){var t=zo(e);return(t.local?Bh:Dh)(t)}function Wh(){}function cc(e){return e==null?Wh:function(){return this.querySelector(e)}}function Vh(e){typeof e!="function"&&(e=cc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=new Array(i),c,d,p=0;p<i;++p)(c=o[p])&&(d=e.call(c,c.__data__,p,o))&&("__data__"in c&&(d.__data__=c.__data__),l[p]=d);return new sn(a,this._parents)}function Uh(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Hh(){return[]}function Im(e){return e==null?Hh:function(){return this.querySelectorAll(e)}}function Yh(e){return function(){return Uh(e.apply(this,arguments))}}function Gh(e){typeof e=="function"?e=Yh(e):e=Im(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],l=i.length,c,d=0;d<l;++d)(c=i[d])&&(a.push(e.call(c,c.__data__,d,i)),s.push(c));return new sn(a,s)}function Lm(e){return function(){return this.matches(e)}}function Am(e){return function(t){return t.matches(e)}}var Xh=Array.prototype.find;function Kh(e){return function(){return Xh.call(this.children,e)}}function qh(){return this.firstElementChild}function Qh(e){return this.select(e==null?qh:Kh(typeof e=="function"?e:Am(e)))}var Zh=Array.prototype.filter;function Jh(){return Array.from(this.children)}function ex(e){return function(){return Zh.call(this.children,e)}}function tx(e){return this.selectAll(e==null?Jh:ex(typeof e=="function"?e:Am(e)))}function nx(e){typeof e!="function"&&(e=Lm(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=[],c,d=0;d<i;++d)(c=o[d])&&e.call(c,c.__data__,d,o)&&l.push(c);return new sn(a,this._parents)}function Om(e){return new Array(e.length)}function rx(){return new sn(this._enter||this._groups.map(Om),this._parents)}function ao(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ao.prototype={constructor:ao,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ax(e){return function(){return e}}function sx(e,t,n,a,s,o){for(var i=0,l,c=t.length,d=o.length;i<d;++i)(l=t[i])?(l.__data__=o[i],a[i]=l):n[i]=new ao(e,o[i]);for(;i<c;++i)(l=t[i])&&(s[i]=l)}function ox(e,t,n,a,s,o,i){var l,c,d=new Map,p=t.length,f=o.length,u=new Array(p),h;for(l=0;l<p;++l)(c=t[l])&&(u[l]=h=i.call(c,c.__data__,l,t)+"",d.has(h)?s[l]=c:d.set(h,c));for(l=0;l<f;++l)h=i.call(e,o[l],l,o)+"",(c=d.get(h))?(a[l]=c,c.__data__=o[l],d.delete(h)):n[l]=new ao(e,o[l]);for(l=0;l<p;++l)(c=t[l])&&d.get(u[l])===c&&(s[l]=c)}function ix(e){return e.__data__}function lx(e,t){if(!arguments.length)return Array.from(this,ix);var n=t?ox:sx,a=this._parents,s=this._groups;typeof e!="function"&&(e=ax(e));for(var o=s.length,i=new Array(o),l=new Array(o),c=new Array(o),d=0;d<o;++d){var p=a[d],f=s[d],u=f.length,h=cx(e.call(p,p&&p.__data__,d,a)),y=h.length,k=l[d]=new Array(y),j=i[d]=new Array(y),v=c[d]=new Array(u);n(p,f,k,j,v,h,t);for(var x=0,g=0,S,N;x<y;++x)if(S=k[x]){for(x>=g&&(g=x+1);!(N=j[g])&&++g<y;);S._next=N||null}}return i=new sn(i,a),i._enter=l,i._exit=c,i}function cx(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function dx(){return new sn(this._exit||this._groups.map(Om),this._parents)}function ux(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function px(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),l=new Array(s),c=0;c<i;++c)for(var d=n[c],p=a[c],f=d.length,u=l[c]=new Array(f),h,y=0;y<f;++y)(h=d[y]||p[y])&&(u[y]=h);for(;c<s;++c)l[c]=n[c];return new sn(l,this._parents)}function mx(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function fx(e){e||(e=gx);function t(f,u){return f&&u?e(f.__data__,u.__data__):!f-!u}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],l=i.length,c=s[o]=new Array(l),d,p=0;p<l;++p)(d=i[p])&&(c[p]=d);c.sort(t)}return new sn(s,this._parents).order()}function gx(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function hx(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function xx(){return Array.from(this)}function vx(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function yx(){let e=0;for(const t of this)++e;return e}function bx(){return!this.node()}function wx(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,l;o<i;++o)(l=s[o])&&e.call(l,l.__data__,o,s);return this}function kx(e){return function(){this.removeAttribute(e)}}function jx(e){return function(){this.removeAttributeNS(e.space,e.local)}}function _x(e,t){return function(){this.setAttribute(e,t)}}function Nx(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Sx(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Cx(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Mx(e,t){var n=zo(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?jx:kx:typeof t=="function"?n.local?Cx:Sx:n.local?Nx:_x)(n,t))}function Fm(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Ex(e){return function(){this.style.removeProperty(e)}}function zx(e,t,n){return function(){this.style.setProperty(e,t,n)}}function $x(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function Px(e,t,n){return arguments.length>1?this.each((t==null?Ex:typeof t=="function"?$x:zx)(e,t,n??"")):Wr(this.node(),e)}function Wr(e,t){return e.style.getPropertyValue(t)||Fm(e).getComputedStyle(e,null).getPropertyValue(t)}function Rx(e){return function(){delete this[e]}}function Tx(e,t){return function(){this[e]=t}}function Ix(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Lx(e,t){return arguments.length>1?this.each((t==null?Rx:typeof t=="function"?Ix:Tx)(e,t)):this.node()[e]}function Dm(e){return e.trim().split(/^|\s+/)}function dc(e){return e.classList||new Bm(e)}function Bm(e){this._node=e,this._names=Dm(e.getAttribute("class")||"")}Bm.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Wm(e,t){for(var n=dc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function Vm(e,t){for(var n=dc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function Ax(e){return function(){Wm(this,e)}}function Ox(e){return function(){Vm(this,e)}}function Fx(e,t){return function(){(t.apply(this,arguments)?Wm:Vm)(this,e)}}function Dx(e,t){var n=Dm(e+"");if(arguments.length<2){for(var a=dc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Fx:t?Ax:Ox)(n,t))}function Bx(){this.textContent=""}function Wx(e){return function(){this.textContent=e}}function Vx(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Ux(e){return arguments.length?this.each(e==null?Bx:(typeof e=="function"?Vx:Wx)(e)):this.node().textContent}function Hx(){this.innerHTML=""}function Yx(e){return function(){this.innerHTML=e}}function Gx(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Xx(e){return arguments.length?this.each(e==null?Hx:(typeof e=="function"?Gx:Yx)(e)):this.node().innerHTML}function Kx(){this.nextSibling&&this.parentNode.appendChild(this)}function qx(){return this.each(Kx)}function Qx(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Zx(){return this.each(Qx)}function Jx(e){var t=typeof e=="function"?e:Tm(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function ev(){return null}function tv(e,t){var n=typeof e=="function"?e:Tm(e),a=t==null?ev:typeof t=="function"?t:cc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function nv(){var e=this.parentNode;e&&e.removeChild(this)}function rv(){return this.each(nv)}function av(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function sv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ov(e){return this.select(e?sv:av)}function iv(e){return arguments.length?this.property("__data__",e):this.node().__data__}function lv(e){return function(t){e.call(this,t,this.__data__)}}function cv(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function dv(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function uv(e,t,n){return function(){var a=this.__on,s,o=lv(t);if(a){for(var i=0,l=a.length;i<l;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function pv(e,t,n){var a=cv(e+""),s,o=a.length,i;if(arguments.length<2){var l=this.node().__on;if(l){for(var c=0,d=l.length,p;c<d;++c)for(s=0,p=l[c];s<o;++s)if((i=a[s]).type===p.type&&i.name===p.name)return p.value}return}for(l=t?uv:dv,s=0;s<o;++s)this.each(l(a[s],t,n));return this}function Um(e,t,n){var a=Fm(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function mv(e,t){return function(){return Um(this,e,t)}}function fv(e,t){return function(){return Um(this,e,t.apply(this,arguments))}}function gv(e,t){return this.each((typeof t=="function"?fv:mv)(e,t))}function*hv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var xv=[null];function sn(e,t){this._groups=e,this._parents=t}function Ya(){return new sn([[document.documentElement]],xv)}function vv(){return this}sn.prototype=Ya.prototype={constructor:sn,select:Vh,selectAll:Gh,selectChild:Qh,selectChildren:tx,filter:nx,data:lx,enter:rx,exit:dx,join:ux,merge:px,selection:vv,order:mx,sort:fx,call:hx,nodes:xx,node:vx,size:yx,empty:bx,each:wx,attr:Mx,style:Px,property:Lx,classed:Dx,text:Ux,html:Xx,raise:qx,lower:Zx,append:Jx,insert:tv,remove:rv,clone:ov,datum:iv,on:pv,dispatch:gv,[Symbol.iterator]:hv};function uc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Hm(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function Ga(){}var Aa=.7,so=1/Aa,Tr="\\s*([+-]?\\d+)\\s*",Oa="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",hn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",yv=/^#([0-9a-f]{3,8})$/,bv=new RegExp(`^rgb\\(${Tr},${Tr},${Tr}\\)$`),wv=new RegExp(`^rgb\\(${hn},${hn},${hn}\\)$`),kv=new RegExp(`^rgba\\(${Tr},${Tr},${Tr},${Oa}\\)$`),jv=new RegExp(`^rgba\\(${hn},${hn},${hn},${Oa}\\)$`),_v=new RegExp(`^hsl\\(${Oa},${hn},${hn}\\)$`),Nv=new RegExp(`^hsla\\(${Oa},${hn},${hn},${Oa}\\)$`),Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};uc(Ga,Fa,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Kd,formatHex:Kd,formatHex8:Sv,formatHsl:Cv,formatRgb:qd,toString:qd});function Kd(){return this.rgb().formatHex()}function Sv(){return this.rgb().formatHex8()}function Cv(){return Ym(this).formatHsl()}function qd(){return this.rgb().formatRgb()}function Fa(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=yv.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Qd(t):n===3?new zt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?gs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?gs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=bv.exec(e))?new zt(t[1],t[2],t[3],1):(t=wv.exec(e))?new zt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=kv.exec(e))?gs(t[1],t[2],t[3],t[4]):(t=jv.exec(e))?gs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=_v.exec(e))?eu(t[1],t[2]/100,t[3]/100,1):(t=Nv.exec(e))?eu(t[1],t[2]/100,t[3]/100,t[4]):Xd.hasOwnProperty(e)?Qd(Xd[e]):e==="transparent"?new zt(NaN,NaN,NaN,0):null}function Qd(e){return new zt(e>>16&255,e>>8&255,e&255,1)}function gs(e,t,n,a){return a<=0&&(e=t=n=NaN),new zt(e,t,n,a)}function Mv(e){return e instanceof Ga||(e=Fa(e)),e?(e=e.rgb(),new zt(e.r,e.g,e.b,e.opacity)):new zt}function cl(e,t,n,a){return arguments.length===1?Mv(e):new zt(e,t,n,a??1)}function zt(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}uc(zt,cl,Hm(Ga,{brighter(e){return e=e==null?so:Math.pow(so,e),new zt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Aa:Math.pow(Aa,e),new zt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new zt(or(this.r),or(this.g),or(this.b),oo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Zd,formatHex:Zd,formatHex8:Ev,formatRgb:Jd,toString:Jd}));function Zd(){return`#${rr(this.r)}${rr(this.g)}${rr(this.b)}`}function Ev(){return`#${rr(this.r)}${rr(this.g)}${rr(this.b)}${rr((isNaN(this.opacity)?1:this.opacity)*255)}`}function Jd(){const e=oo(this.opacity);return`${e===1?"rgb(":"rgba("}${or(this.r)}, ${or(this.g)}, ${or(this.b)}${e===1?")":`, ${e})`}`}function oo(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function or(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function rr(e){return e=or(e),(e<16?"0":"")+e.toString(16)}function eu(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new tn(e,t,n,a)}function Ym(e){if(e instanceof tn)return new tn(e.h,e.s,e.l,e.opacity);if(e instanceof Ga||(e=Fa(e)),!e)return new tn;if(e instanceof tn)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,l=o-s,c=(o+s)/2;return l?(t===o?i=(n-a)/l+(n<a)*6:n===o?i=(a-t)/l+2:i=(t-n)/l+4,l/=c<.5?o+s:2-o-s,i*=60):l=c>0&&c<1?0:i,new tn(i,l,c,e.opacity)}function zv(e,t,n,a){return arguments.length===1?Ym(e):new tn(e,t,n,a??1)}function tn(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}uc(tn,zv,Hm(Ga,{brighter(e){return e=e==null?so:Math.pow(so,e),new tn(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Aa:Math.pow(Aa,e),new tn(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new zt(ui(e>=240?e-240:e+120,s,a),ui(e,s,a),ui(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new tn(tu(this.h),hs(this.s),hs(this.l),oo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=oo(this.opacity);return`${e===1?"hsl(":"hsla("}${tu(this.h)}, ${hs(this.s)*100}%, ${hs(this.l)*100}%${e===1?")":`, ${e})`}`}}));function tu(e){return e=(e||0)%360,e<0?e+360:e}function hs(e){return Math.max(0,Math.min(1,e||0))}function ui(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Gm=e=>()=>e;function $v(e,t){return function(n){return e+n*t}}function Pv(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function Rv(e){return(e=+e)==1?Xm:function(t,n){return n-t?Pv(t,n,e):Gm(isNaN(t)?n:t)}}function Xm(e,t){var n=t-e;return n?$v(e,n):Gm(isNaN(e)?t:e)}const nu=function e(t){var n=Rv(t);function a(s,o){var i=n((s=cl(s)).r,(o=cl(o)).r),l=n(s.g,o.g),c=n(s.b,o.b),d=Xm(s.opacity,o.opacity);return function(p){return s.r=i(p),s.g=l(p),s.b=c(p),s.opacity=d(p),s+""}}return a.gamma=e,a}(1);function Tn(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var dl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pi=new RegExp(dl.source,"g");function Tv(e){return function(){return e}}function Iv(e){return function(t){return e(t)+""}}function Lv(e,t){var n=dl.lastIndex=pi.lastIndex=0,a,s,o,i=-1,l=[],c=[];for(e=e+"",t=t+"";(a=dl.exec(e))&&(s=pi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),l[i]?l[i]+=o:l[++i]=o),(a=a[0])===(s=s[0])?l[i]?l[i]+=s:l[++i]=s:(l[++i]=null,c.push({i,x:Tn(a,s)})),n=pi.lastIndex;return n<t.length&&(o=t.slice(n),l[i]?l[i]+=o:l[++i]=o),l.length<2?c[0]?Iv(c[0].x):Tv(t):(t=c.length,function(d){for(var p=0,f;p<t;++p)l[(f=c[p]).i]=f.x(d);return l.join("")})}var ru=180/Math.PI,ul={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Km(e,t,n,a,s,o){var i,l,c;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(c=e*n+t*a)&&(n-=e*c,a-=t*c),(l=Math.sqrt(n*n+a*a))&&(n/=l,a/=l,c/=l),e*a<t*n&&(e=-e,t=-t,c=-c,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*ru,skewX:Math.atan(c)*ru,scaleX:i,scaleY:l}}var xs;function Av(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?ul:Km(t.a,t.b,t.c,t.d,t.e,t.f)}function Ov(e){return e==null||(xs||(xs=document.createElementNS("http://www.w3.org/2000/svg","g")),xs.setAttribute("transform",e),!(e=xs.transform.baseVal.consolidate()))?ul:(e=e.matrix,Km(e.a,e.b,e.c,e.d,e.e,e.f))}function qm(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,p,f,u,h,y){if(d!==f||p!==u){var k=h.push("translate(",null,t,null,n);y.push({i:k-4,x:Tn(d,f)},{i:k-2,x:Tn(p,u)})}else(f||u)&&h.push("translate("+f+t+u+n)}function i(d,p,f,u){d!==p?(d-p>180?p+=360:p-d>180&&(d+=360),u.push({i:f.push(s(f)+"rotate(",null,a)-2,x:Tn(d,p)})):p&&f.push(s(f)+"rotate("+p+a)}function l(d,p,f,u){d!==p?u.push({i:f.push(s(f)+"skewX(",null,a)-2,x:Tn(d,p)}):p&&f.push(s(f)+"skewX("+p+a)}function c(d,p,f,u,h,y){if(d!==f||p!==u){var k=h.push(s(h)+"scale(",null,",",null,")");y.push({i:k-4,x:Tn(d,f)},{i:k-2,x:Tn(p,u)})}else(f!==1||u!==1)&&h.push(s(h)+"scale("+f+","+u+")")}return function(d,p){var f=[],u=[];return d=e(d),p=e(p),o(d.translateX,d.translateY,p.translateX,p.translateY,f,u),i(d.rotate,p.rotate,f,u),l(d.skewX,p.skewX,f,u),c(d.scaleX,d.scaleY,p.scaleX,p.scaleY,f,u),d=p=null,function(h){for(var y=-1,k=u.length,j;++y<k;)f[(j=u[y]).i]=j.x(h);return f.join("")}}}var Fv=qm(Av,"px, ","px)","deg)"),Dv=qm(Ov,", ",")",")"),Vr=0,la=0,ta=0,Qm=1e3,io,ca,lo=0,pr=0,$o=0,Da=typeof performance=="object"&&performance.now?performance:Date,Zm=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function pc(){return pr||(Zm(Bv),pr=Da.now()+$o)}function Bv(){pr=0}function co(){this._call=this._time=this._next=null}co.prototype=Jm.prototype={constructor:co,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?pc():+n)+(t==null?0:+t),!this._next&&ca!==this&&(ca?ca._next=this:io=this,ca=this),this._call=e,this._time=n,pl()},stop:function(){this._call&&(this._call=null,this._time=1/0,pl())}};function Jm(e,t,n){var a=new co;return a.restart(e,t,n),a}function Wv(){pc(),++Vr;for(var e=io,t;e;)(t=pr-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Vr}function au(){pr=(lo=Da.now())+$o,Vr=la=0;try{Wv()}finally{Vr=0,Uv(),pr=0}}function Vv(){var e=Da.now(),t=e-lo;t>Qm&&($o-=t,lo=e)}function Uv(){for(var e,t=io,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:io=n);ca=e,pl(a)}function pl(e){if(!Vr){la&&(la=clearTimeout(la));var t=e-pr;t>24?(e<1/0&&(la=setTimeout(au,e-Da.now()-$o)),ta&&(ta=clearInterval(ta))):(ta||(lo=Da.now(),ta=setInterval(Vv,Qm)),Vr=1,Zm(au))}}function su(e,t,n){var a=new co;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var Hv=Rm("start","end","cancel","interrupt"),Yv=[],ef=0,ou=1,ml=2,$s=3,iu=4,fl=5,Ps=6;function Po(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;Gv(e,n,{name:t,index:a,group:s,on:Hv,tween:Yv,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:ef})}function mc(e,t){var n=on(e,t);if(n.state>ef)throw new Error("too late; already scheduled");return n}function xn(e,t){var n=on(e,t);if(n.state>$s)throw new Error("too late; already running");return n}function on(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Gv(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=Jm(o,0,n.time);function o(d){n.state=ou,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var p,f,u,h;if(n.state!==ou)return c();for(p in a)if(h=a[p],h.name===n.name){if(h.state===$s)return su(i);h.state===iu?(h.state=Ps,h.timer.stop(),h.on.call("interrupt",e,e.__data__,h.index,h.group),delete a[p]):+p<t&&(h.state=Ps,h.timer.stop(),h.on.call("cancel",e,e.__data__,h.index,h.group),delete a[p])}if(su(function(){n.state===$s&&(n.state=iu,n.timer.restart(l,n.delay,n.time),l(d))}),n.state=ml,n.on.call("start",e,e.__data__,n.index,n.group),n.state===ml){for(n.state=$s,s=new Array(u=n.tween.length),p=0,f=-1;p<u;++p)(h=n.tween[p].value.call(e,e.__data__,n.index,n.group))&&(s[++f]=h);s.length=f+1}}function l(d){for(var p=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(c),n.state=fl,1),f=-1,u=s.length;++f<u;)s[f].call(e,p);n.state===fl&&(n.on.call("end",e,e.__data__,n.index,n.group),c())}function c(){n.state=Ps,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function Xv(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>ml&&a.state<fl,a.state=Ps,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function Kv(e){return this.each(function(){Xv(this,e)})}function qv(e,t){var n,a;return function(){var s=xn(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,l=a.length;i<l;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Qv(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=xn(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var l={name:t,value:n},c=0,d=s.length;c<d;++c)if(s[c].name===t){s[c]=l;break}c===d&&s.push(l)}o.tween=s}}function Zv(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=on(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?qv:Qv)(n,e,t))}function fc(e,t,n){var a=e._id;return e.each(function(){var s=xn(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return on(s,a).value[t]}}function tf(e,t){var n;return(typeof t=="number"?Tn:t instanceof Fa?nu:(n=Fa(t))?(t=n,nu):Lv)(e,t)}function Jv(e){return function(){this.removeAttribute(e)}}function ey(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ty(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function ny(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function ry(e,t,n){var a,s,o;return function(){var i,l=n(this),c;return l==null?void this.removeAttribute(e):(i=this.getAttribute(e),c=l+"",i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l)))}}function ay(e,t,n){var a,s,o;return function(){var i,l=n(this),c;return l==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),c=l+"",i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l)))}}function sy(e,t){var n=zo(e),a=n==="transform"?Dv:tf;return this.attrTween(e,typeof t=="function"?(n.local?ay:ry)(n,a,fc(this,"attr."+e,t)):t==null?(n.local?ey:Jv)(n):(n.local?ny:ty)(n,a,t))}function oy(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function iy(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function ly(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&iy(e,o)),n}return s._value=t,s}function cy(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&oy(e,o)),n}return s._value=t,s}function dy(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=zo(e);return this.tween(n,(a.local?ly:cy)(a,t))}function uy(e,t){return function(){mc(this,e).delay=+t.apply(this,arguments)}}function py(e,t){return t=+t,function(){mc(this,e).delay=t}}function my(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?uy:py)(t,e)):on(this.node(),t).delay}function fy(e,t){return function(){xn(this,e).duration=+t.apply(this,arguments)}}function gy(e,t){return t=+t,function(){xn(this,e).duration=t}}function hy(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?fy:gy)(t,e)):on(this.node(),t).duration}function xy(e,t){if(typeof t!="function")throw new Error;return function(){xn(this,e).ease=t}}function vy(e){var t=this._id;return arguments.length?this.each(xy(t,e)):on(this.node(),t).ease}function yy(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;xn(this,e).ease=n}}function by(e){if(typeof e!="function")throw new Error;return this.each(yy(this._id,e))}function wy(e){typeof e!="function"&&(e=Lm(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,l=a[s]=[],c,d=0;d<i;++d)(c=o[d])&&e.call(c,c.__data__,d,o)&&l.push(c);return new En(a,this._parents,this._name,this._id)}function ky(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),l=0;l<o;++l)for(var c=t[l],d=n[l],p=c.length,f=i[l]=new Array(p),u,h=0;h<p;++h)(u=c[h]||d[h])&&(f[h]=u);for(;l<a;++l)i[l]=t[l];return new En(i,this._parents,this._name,this._id)}function jy(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function _y(e,t,n){var a,s,o=jy(t)?mc:xn;return function(){var i=o(this,e),l=i.on;l!==a&&(s=(a=l).copy()).on(t,n),i.on=s}}function Ny(e,t){var n=this._id;return arguments.length<2?on(this.node(),n).on.on(e):this.each(_y(n,e,t))}function Sy(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Cy(){return this.on("end.remove",Sy(this._id))}function My(e){var t=this._name,n=this._id;typeof e!="function"&&(e=cc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var l=a[i],c=l.length,d=o[i]=new Array(c),p,f,u=0;u<c;++u)(p=l[u])&&(f=e.call(p,p.__data__,u,l))&&("__data__"in p&&(f.__data__=p.__data__),d[u]=f,Po(d[u],t,n,u,d,on(p,n)));return new En(o,this._parents,t,n)}function Ey(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Im(e));for(var a=this._groups,s=a.length,o=[],i=[],l=0;l<s;++l)for(var c=a[l],d=c.length,p,f=0;f<d;++f)if(p=c[f]){for(var u=e.call(p,p.__data__,f,c),h,y=on(p,n),k=0,j=u.length;k<j;++k)(h=u[k])&&Po(h,t,n,k,u,y);o.push(u),i.push(p)}return new En(o,i,t,n)}var zy=Ya.prototype.constructor;function $y(){return new zy(this._groups,this._parents)}function Py(e,t){var n,a,s;return function(){var o=Wr(this,e),i=(this.style.removeProperty(e),Wr(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function nf(e){return function(){this.style.removeProperty(e)}}function Ry(e,t,n){var a,s=n+"",o;return function(){var i=Wr(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function Ty(e,t,n){var a,s,o;return function(){var i=Wr(this,e),l=n(this),c=l+"";return l==null&&(c=l=(this.style.removeProperty(e),Wr(this,e))),i===c?null:i===a&&c===s?o:(s=c,o=t(a=i,l))}}function Iy(e,t){var n,a,s,o="style."+t,i="end."+o,l;return function(){var c=xn(this,e),d=c.on,p=c.value[o]==null?l||(l=nf(t)):void 0;(d!==n||s!==p)&&(a=(n=d).copy()).on(i,s=p),c.on=a}}function Ly(e,t,n){var a=(e+="")=="transform"?Fv:tf;return t==null?this.styleTween(e,Py(e,a)).on("end.style."+e,nf(e)):typeof t=="function"?this.styleTween(e,Ty(e,a,fc(this,"style."+e,t))).each(Iy(this._id,e)):this.styleTween(e,Ry(e,a,t),n).on("end.style."+e,null)}function Ay(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function Oy(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&Ay(e,i,n)),a}return o._value=t,o}function Fy(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,Oy(e,t,n??""))}function Dy(e){return function(){this.textContent=e}}function By(e){return function(){var t=e(this);this.textContent=t??""}}function Wy(e){return this.tween("text",typeof e=="function"?By(fc(this,"text",e)):Dy(e==null?"":e+""))}function Vy(e){return function(t){this.textContent=e.call(this,t)}}function Uy(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&Vy(s)),t}return a._value=e,a}function Hy(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Uy(e))}function Yy(){for(var e=this._name,t=this._id,n=rf(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],l=i.length,c,d=0;d<l;++d)if(c=i[d]){var p=on(c,t);Po(c,e,n,d,i,{time:p.time+p.delay+p.duration,delay:0,duration:p.duration,ease:p.ease})}return new En(a,this._parents,e,n)}function Gy(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var l={value:i},c={value:function(){--s===0&&o()}};n.each(function(){var d=xn(this,a),p=d.on;p!==e&&(t=(e=p).copy(),t._.cancel.push(l),t._.interrupt.push(l),t._.end.push(c)),d.on=t}),s===0&&o()})}var Xy=0;function En(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function rf(){return++Xy}var yn=Ya.prototype;En.prototype={constructor:En,select:My,selectAll:Ey,selectChild:yn.selectChild,selectChildren:yn.selectChildren,filter:wy,merge:ky,selection:$y,transition:Yy,call:yn.call,nodes:yn.nodes,node:yn.node,size:yn.size,empty:yn.empty,each:yn.each,on:Ny,attr:sy,attrTween:dy,style:Ly,styleTween:Fy,text:Wy,textTween:Hy,remove:Cy,tween:Zv,delay:my,duration:hy,ease:vy,easeVarying:by,end:Gy,[Symbol.iterator]:yn[Symbol.iterator]};function Ky(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var qy={time:null,delay:0,duration:250,ease:Ky};function Qy(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function Zy(e){var t,n;e instanceof En?(t=e._id,e=e._name):(t=rf(),(n=qy).time=pc(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],l=i.length,c,d=0;d<l;++d)(c=i[d])&&Po(c,e,t,d,i,n||Qy(c,t));return new En(a,this._parents,e,t)}Ya.prototype.interrupt=Kv;Ya.prototype.transition=Zy;function Jy(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function e1(){return this.eachAfter(Jy)}function t1(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function n1(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function r1(e,t){for(var n=this,a=[n],s=[],o,i,l,c=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,l=o.length;i<l;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++c,this);return this}function a1(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function s1(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function o1(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function i1(e){for(var t=this,n=l1(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function l1(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function c1(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function d1(){return Array.from(this)}function u1(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function p1(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*m1(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function gc(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=h1)):t===void 0&&(t=g1);for(var n=new uo(e),a,s=[n],o,i,l,c;a=s.pop();)if((i=t(a.data))&&(c=(i=Array.from(i)).length))for(a.children=i,l=c-1;l>=0;--l)s.push(o=i[l]=new uo(i[l])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(v1)}function f1(){return gc(this).eachBefore(x1)}function g1(e){return e.children}function h1(e){return Array.isArray(e)?e[1]:null}function x1(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function v1(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function uo(e){this.data=e,this.depth=this.height=0,this.parent=null}uo.prototype=gc.prototype={constructor:uo,count:e1,each:t1,eachAfter:r1,eachBefore:n1,find:a1,sum:s1,sort:o1,path:i1,ancestors:c1,descendants:d1,leaves:u1,links:p1,copy:f1,[Symbol.iterator]:m1};function y1(e){if(typeof e!="function")throw new Error;return e}function na(){return 0}function ra(e){return function(){return e}}function b1(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function w1(e,t,n,a,s){for(var o=e.children,i,l=-1,c=o.length,d=e.value&&(a-t)/e.value;++l<c;)i=o[l],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function k1(e,t,n,a,s){for(var o=e.children,i,l=-1,c=o.length,d=e.value&&(s-n)/e.value;++l<c;)i=o[l],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var j1=(1+Math.sqrt(5))/2;function _1(e,t,n,a,s,o){for(var i=[],l=t.children,c,d,p=0,f=0,u=l.length,h,y,k=t.value,j,v,x,g,S,N,T;p<u;){h=s-n,y=o-a;do j=l[f++].value;while(!j&&f<u);for(v=x=j,N=Math.max(y/h,h/y)/(k*e),T=j*j*N,S=Math.max(x/T,T/v);f<u;++f){if(j+=d=l[f].value,d<v&&(v=d),d>x&&(x=d),T=j*j*N,g=Math.max(x/T,T/v),g>S){j-=d;break}S=g}i.push(c={value:j,dice:h<y,children:l.slice(p,f)}),c.dice?w1(c,n,a,s,k?a+=y*j/k:o):k1(c,n,a,k?n+=h*j/k:s,o),k-=j,p=f}return i}const af=function e(t){function n(a,s,o,i,l){_1(t,a,s,o,i,l)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(j1);function N1(){var e=af,t=!1,n=1,a=1,s=[0],o=na,i=na,l=na,c=na,d=na;function p(u){return u.x0=u.y0=0,u.x1=n,u.y1=a,u.eachBefore(f),s=[0],t&&u.eachBefore(b1),u}function f(u){var h=s[u.depth],y=u.x0+h,k=u.y0+h,j=u.x1-h,v=u.y1-h;j<y&&(y=j=(y+j)/2),v<k&&(k=v=(k+v)/2),u.x0=y,u.y0=k,u.x1=j,u.y1=v,u.children&&(h=s[u.depth+1]=o(u)/2,y+=d(u)-h,k+=i(u)-h,j-=l(u)-h,v-=c(u)-h,j<y&&(y=j=(y+j)/2),v<k&&(k=v=(k+v)/2),e(u,y,k,j,v))}return p.round=function(u){return arguments.length?(t=!!u,p):t},p.size=function(u){return arguments.length?(n=+u[0],a=+u[1],p):[n,a]},p.tile=function(u){return arguments.length?(e=y1(u),p):e},p.padding=function(u){return arguments.length?p.paddingInner(u).paddingOuter(u):p.paddingInner()},p.paddingInner=function(u){return arguments.length?(o=typeof u=="function"?u:ra(+u),p):o},p.paddingOuter=function(u){return arguments.length?p.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):p.paddingTop()},p.paddingTop=function(u){return arguments.length?(i=typeof u=="function"?u:ra(+u),p):i},p.paddingRight=function(u){return arguments.length?(l=typeof u=="function"?u:ra(+u),p):l},p.paddingBottom=function(u){return arguments.length?(c=typeof u=="function"?u:ra(+u),p):c},p.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:ra(+u),p):d},p}function da(e,t,n){this.k=e,this.x=t,this.y=n}da.prototype={constructor:da,scale:function(e){return e===1?this:new da(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new da(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};da.prototype;const lu={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function S1(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return lu[n]||lu.default}function cu(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function du({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:l=!1,width:c=120,height:d=180,animationDelay:p=0,onClick:f,onHover:u}){const h=m.useRef(null),y=m.useRef(0),k=m.useRef([]),j=m.useRef(0),[v,x]=m.useState(!1),g=n>0?t/n*100:0,[S,N]=m.useState(0),[T,C]=m.useState(!1),[B,$]=m.useState(!0),w=m.useRef(null),R=m.useRef(0),z=1200,W=500;m.useEffect(()=>{const K=setTimeout(()=>{C(!0)},p);return()=>clearTimeout(K)},[p]),m.useEffect(()=>{if(!T)return;R.current=S,w.current=null;const K=R.current,b=g;if(Math.abs(K-b)<.1){N(b);return}const Y=B?z:W,ee=ue=>{w.current===null&&(w.current=ue);const te=ue-w.current,le=Math.min(te/Y,1),J=(de=>1-Math.pow(1-de,3))(le),q=K+(b-K)*J;N(q),le<1?requestAnimationFrame(ee):B&&$(!1)};requestAnimationFrame(ee)},[g,T]);const M=S,F=g>=85,X=g>=95,L=S1(g,a),E=m.useCallback(K=>{const b=[];for(let Y=0;Y<K;Y++)b.push({x:Math.random()*c*.6+c*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return b},[c,d]);m.useEffect(()=>{const K=h.current;if(!K)return;const b=K.getContext("2d");if(!b)return;const Y=window.devicePixelRatio||1;K.width=c*Y,K.height=d*Y,b.scale(Y,Y);const ee=F?15:5;k.current=E(ee);const ue=te=>{te-j.current,j.current=te;const le=te*.001;b.clearRect(0,0,c,d);const Oe=8,J=Oe,q=Oe+20,de=c-Oe*2,ce=d-Oe*2-40,Je=8,Se=l?.05:M/100,st=ce*Se,$e=q+ce-st,H=b.createLinearGradient(J,q,J,q+ce);H.addColorStop(0,"#0a0a12"),H.addColorStop(.5,"#050510"),H.addColorStop(1,"#0a0a12"),b.fillStyle=H,b.beginPath(),b.roundRect(J,q,de,ce,Je),b.fill(),b.save(),b.beginPath(),b.roundRect(J,q,de,ce,Je),b.clip();const re=12,be=re*Math.sqrt(3);b.strokeStyle="rgba(0, 240, 255, 0.06)",b.lineWidth=.5;for(let oe=0;oe<ce/be+1;oe++)for(let pe=0;pe<de/(re*1.5)+1;pe++){const Fe=oe%2*re*.75,He=J+pe*re*1.5+Fe,ct=q+oe*be*.5;b.beginPath();for(let xt=0;xt<6;xt++){const kt=Math.PI/3*xt+Math.PI/6,ae=He+re*.4*Math.cos(kt),Le=ct+re*.4*Math.sin(kt);xt===0?b.moveTo(ae,Le):b.lineTo(ae,Le)}b.closePath(),b.stroke()}b.restore();const se=q+le*30%ce;b.save(),b.beginPath(),b.roundRect(J,q,de,ce,Je),b.clip();const ze=b.createLinearGradient(J,se-15,J,se+5);ze.addColorStop(0,"transparent"),ze.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),ze.addColorStop(1,"transparent"),b.fillStyle=ze,b.fillRect(J,se-15,de,20),b.restore(),b.strokeStyle="rgba(0, 240, 255, 0.2)",b.lineWidth=1;for(let oe=0;oe<=10;oe++){const pe=q+ce-ce*oe/10,Fe=oe%5===0?12:6,He=oe%5===0?.4:.2;b.strokeStyle=`rgba(0, 240, 255, ${He})`,b.beginPath(),b.moveTo(J+2,pe),b.lineTo(J+2+Fe,pe),b.stroke(),b.beginPath(),b.moveTo(J+de-2,pe),b.lineTo(J+de-2-Fe,pe),b.stroke()}const nt=le*50%ce;for(let oe=0;oe<3;oe++){const pe=q+(nt+oe*ce/3)%ce,Fe=.3+Math.sin(le*3+oe)*.2;b.beginPath(),b.strokeStyle=`rgba(0, 240, 255, ${Fe})`,b.lineWidth=2,b.moveTo(J,pe),b.lineTo(J+4,pe),b.stroke(),b.beginPath(),b.moveTo(J+de,pe),b.lineTo(J+de-4,pe),b.stroke()}if(!l&&Se>0){const oe=b.createLinearGradient(0,$e,0,q+ce);oe.addColorStop(0,L.gradient[0]),oe.addColorStop(1,L.gradient[1]);const pe=F?6:3,Fe=.05,He=F?.1:.05,ct=Math.PI/3;b.save(),b.beginPath(),b.rect(J,q,de,ce),b.clip(),b.fillStyle=oe,b.beginPath(),b.moveTo(J,q+ce);for(let ae=0;ae<=de;ae+=2){const Le=Math.sin(ae*Fe+le*He*60)*pe,Ye=Math.sin(ae*Fe*1.5+le*He*40+ct)*(pe*.5),Ce=$e+Le+Ye;ae===0?b.moveTo(J+ae,Ce):b.lineTo(J+ae,Ce)}b.lineTo(J+de,q+ce),b.lineTo(J,q+ce),b.closePath(),b.fill(),b.strokeStyle=L.glow,b.lineWidth=2,b.shadowColor=L.main,b.shadowBlur=10,b.beginPath();for(let ae=0;ae<=de;ae+=2){const Le=Math.sin(ae*Fe+le*He*60)*pe,Ye=Math.sin(ae*Fe*1.5+le*He*40+ct)*(pe*.5),Ce=$e+Le+Ye;ae===0?b.moveTo(J+ae,Ce):b.lineTo(J+ae,Ce)}b.stroke(),b.shadowBlur=0,k.current.forEach((ae,Le)=>{if(ae.y>$e&&ae.y<q+ce){const Ye=Math.sin(le*ae.wobbleSpeed*60+ae.wobbleOffset)*3;b.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,b.beginPath(),b.arc(ae.x+Ye,ae.y,ae.radius,0,Math.PI*2),b.fill(),b.fillStyle="rgba(255, 255, 255, 0.5)",b.beginPath(),b.arc(ae.x+Ye-ae.radius*.3,ae.y-ae.radius*.3,ae.radius*.3,0,Math.PI*2),b.fill()}ae.y-=ae.speed*(F?2:1),ae.y<$e-10&&(ae.y=q+ce+Math.random()*20,ae.x=J+Math.random()*de*.6+de*.2)}),b.restore();const xt=3;for(let ae=0;ae<xt;ae++){const Le=J+de*(ae+.5)/xt,Ye=le*2+ae*Math.PI*.7,Ce=(Math.sin(Ye)*.5+.5)*.3;if(Ce>.1){const xe=b.createLinearGradient(Le-8,$e,Le+8,q+ce);xe.addColorStop(0,"rgba(255, 255, 255, 0)"),xe.addColorStop(.3,`rgba(255, 255, 255, ${Ce})`),xe.addColorStop(.7,`rgba(255, 255, 255, ${Ce*.5})`),xe.addColorStop(1,"rgba(255, 255, 255, 0)"),b.fillStyle=xe,b.fillRect(Le-8,$e,16,st)}}const kt=Math.floor(Se*8);for(let ae=0;ae<kt;ae++){const Le=ae*137.5,Ye=J+10+Le*7%(de-20),xe=$e+10+Le*13%(st-20)+Math.sin(le*2+Le)*5,cn=.4+Math.sin(le*3+Le)*.3;if(b.fillStyle=`rgba(255, 255, 255, ${cn})`,b.beginPath(),b.arc(Ye,xe,1.5,0,Math.PI*2),b.fill(),ae>0&&ae%3===0){const Bt=(ae-1)*137.5,Kt=J+10+Bt*7%(de-20),fe=$e+10+Bt*13%(st-20)+Math.sin(le*2+Bt)*5,I=Math.sqrt((Ye-Kt)**2+(xe-fe)**2);I<30&&(b.strokeStyle=`rgba(255, 255, 255, ${.1*(1-I/30)})`,b.lineWidth=.5,b.beginPath(),b.moveTo(Ye,xe),b.lineTo(Kt,fe),b.stroke())}}if(F){for(let ae=0;ae<8;ae++){const Le=J+de*.15+Math.random()*de*.7,Ye=$e-Math.random()*25,Ce=Math.random()*4+1;b.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,b.beginPath(),b.arc(Le,Ye,Ce,0,Math.PI*2),b.fill()}Math.sin(le*10)>.7&&(b.fillStyle="rgba(255, 100, 0, 0.05)",b.fillRect(J,q,de,ce))}}const et=l||X?"#ff0040":L.main,ln=X?Math.sin(le*5)*.3+.7:1;b.strokeStyle=et,b.lineWidth=3,b.shadowColor=et,b.shadowBlur=v?20:12*ln,b.beginPath(),b.roundRect(J,q,de,ce,Je),b.stroke(),b.shadowBlur=0,b.strokeStyle=`${et}60`,b.lineWidth=1,b.beginPath(),b.roundRect(J+3,q+3,de-6,ce-6,Je-2),b.stroke();const ot=16,Xt=3;b.strokeStyle=et,b.lineWidth=Xt,b.shadowColor=et,b.shadowBlur=8,b.beginPath(),b.moveTo(J-2,q+ot),b.lineTo(J-2,q-2),b.lineTo(J+ot,q-2),b.stroke(),b.beginPath(),b.moveTo(J+de-ot,q-2),b.lineTo(J+de+2,q-2),b.lineTo(J+de+2,q+ot),b.stroke(),b.beginPath(),b.moveTo(J-2,q+ce-ot),b.lineTo(J-2,q+ce+2),b.lineTo(J+ot,q+ce+2),b.stroke(),b.beginPath(),b.moveTo(J+de-ot,q+ce+2),b.lineTo(J+de+2,q+ce+2),b.lineTo(J+de+2,q+ce-ot),b.stroke(),b.shadowBlur=0;const ht=2+(Math.sin(le*4)*.5+.5);if(b.fillStyle=et,b.shadowColor=et,b.shadowBlur=6,[[J-2,q-2],[J+de+2,q-2],[J-2,q+ce+2],[J+de+2,q+ce+2]].forEach(([oe,pe])=>{b.beginPath(),b.arc(oe,pe,ht,0,Math.PI*2),b.fill()}),b.shadowBlur=0,!l){const pe=J+de+6,Fe=ce,He=Fe*(M/100);b.fillStyle="rgba(0, 20, 40, 0.8)",b.fillRect(pe,q,4,Fe);const ct=b.createLinearGradient(0,q+Fe-He,0,q+Fe);ct.addColorStop(0,L.main),ct.addColorStop(1,L.gradient[1]),b.fillStyle=ct,b.fillRect(pe,q+Fe-He,4,He),b.strokeStyle=`${et}40`,b.lineWidth=1,b.strokeRect(pe,q,4,Fe)}if(l){b.strokeStyle="#ff0040",b.lineWidth=2,b.beginPath();const oe=J+de*.3,pe=q+ce*.3;b.moveTo(oe,pe),b.lineTo(oe+10,pe+15),b.lineTo(oe+5,pe+25),b.lineTo(oe+15,pe+40),b.stroke(),b.beginPath(),b.moveTo(oe+10,pe+15),b.lineTo(oe+20,pe+20),b.stroke()}y.current=requestAnimationFrame(ue)};return y.current=requestAnimationFrame(ue),()=>{cancelAnimationFrame(y.current)}},[c,d,M,F,X,l,L,v,E]);const O=()=>{x(!0),u==null||u(!0)},U=()=>{x(!1),u==null||u(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${X?"critical":""} ${l?"offline":""}`,onClick:f,onMouseEnter:O,onMouseLeave:U,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${l?"offline":""}`,style:l?void 0:{color:L.main,background:`${L.main}15`,borderColor:`${L.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:h,style:{width:c,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${X?"critical":F?"warning":""}`,style:{color:l?"#FF4081":L.main,textShadow:l?"none":`0 0 10px ${L.glow}`},children:l?"OFFLINE":`${g.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[cu(t)," / ",cu(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((K,b)=>r.jsx("span",{className:"node-tag",children:K},b))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
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

      `})]})}function C1({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=m.useState(0),i=m.useRef(0),l=m.useRef(null),c=m.useRef(0);m.useEffect(()=>{c.current=s,l.current=null;const h=y=>{l.current===null&&(l.current=y);const k=y-l.current,j=Math.min(k/a,1),v=j===1?1:1-Math.pow(2,-10*j),x=c.current+(e-c.current)*v;o(x),j<1&&(i.current=requestAnimationFrame(h))};return i.current=requestAnimationFrame(h),()=>cancelAnimationFrame(i.current)},[e,a]);const p=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,u=[];for(let h=0;h<f;h++){const y=h/f*100,k=y<s,j=h%4===0;u.push({index:h,isActive:k,isMajor:j,percent:y})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:p},children:Me(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Me(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:u.map(h=>r.jsx("div",{className:`segment ${h.isActive?"active":""} ${h.isMajor?"major":""}`,style:{"--segment-color":h.isActive?p:"rgba(60, 80, 100, 0.3)",animationDelay:h.isActive?`${h.index*20}ms`:"0ms"}},h.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${p}40)`,boxShadow:`0 0 20px ${p}60, 0 0 40px ${p}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${p} transparent`,filter:`drop-shadow(0 0 4px ${p})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:p}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:p},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const M1=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function E1({vm:e,position:t,onClose:n}){var v,x,g,S,N;const{t:a,language:s}=Ie(),o=m.useRef(null),[i,l]=m.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",p=e.type==="lxc",f=e.disks||[],u=s==="zh-TW",h=((v=e.disk)==null?void 0:v.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,y=h>=90?"#ff0040":h>=70?"#ff6b00":"#00f0ff",k=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();m.useEffect(()=>{if(!o.current)return;const C=o.current.getBoundingClientRect(),B=C.width,$=C.height,w=window.innerWidth,R=window.innerHeight,z=15,{cellX:W,cellY:M,cellTop:F,cellBottom:X,cellLeft:L,cellRight:E}=t;let O=0,U=0,K=W,b=M;E+z+B<w?(O=E+z,U=Math.max(z,Math.min(R-$-z,M-$/2)),K=E,b=M):L-z-B>0?(O=L-z-B,U=Math.max(z,Math.min(R-$-z,M-$/2)),K=L,b=M):F-z-$>0?(O=Math.max(z,Math.min(w-B-z,W-B/2)),U=F-z-$,K=W,b=F):(O=Math.max(z,Math.min(w-B-z,W-B/2)),U=X+z,K=W,b=X);let Y=O,ee=U+$/2;O>E?(Y=O,ee=Math.max(U,Math.min(U+$,b))):O+B<L?(Y=O+B,ee=Math.max(U,Math.min(U+$,b))):U+$<F?(Y=Math.max(O,Math.min(O+B,K)),ee=U+$):(Y=Math.max(O,Math.min(O+B,K)),ee=U),l({x:O,y:U,lineStart:{x:K,y:b},lineEnd:{x:Y,y:ee}})},[t]);const j=i?(()=>{const T=i.lineEnd.x-i.lineStart.x,C=i.lineEnd.y-i.lineStart.y,B=Math.sqrt(T*T+C*C),$=Math.atan2(C,T)*(180/Math.PI);return{width:`${B}px`,transform:`rotate(${$}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&j&&r.jsx("div",{className:"popup-connector-line",style:j}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:T=>T.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:k}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",f.length>1?u?"":"S":""," (",f.length||1,")"]}),f.length>0?r.jsx("div",{className:"disk-list",children:f.map((T,C)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:T.device}),r.jsx("span",{className:"device-format",children:T.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:T.storage}),r.jsx("span",{className:"disk-size",children:Me(T.size)})]})]},C))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Me(((x=e.disk)==null?void 0:x.total_bytes)||0)})]})}),p&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Me(((g=e.disk)==null?void 0:g.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:y},children:[h.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${h}%`,background:y}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((S=e.cpu)==null?void 0:S.cores)||0," ",u?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Me(((N=e.memory)==null?void 0:N.total_bytes)||0)})]})]})]})]})}function z1({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=m.useState(null),l=m.useRef(null),c=m.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(h=>({name:h.vm.name,value:h.value,vm:h.vm}))},p=gc(d).sum(h=>h.value||0).sort((h,y)=>(y.value||0)-(h.value||0));return N1().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(af.ratio(1))(p).leaves().map(h=>({x:h.x0,y:h.y0,width:h.x1-h.x0,height:h.y1-h.y0,vm:h.data.vm,value:h.value||0}))},[e,t,n]);return c.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:l,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),c.map((d,p)=>{var $;const f=(($=d.vm.disk)==null?void 0:$.total_bytes)||1,u=d.vm.status==="running",h=o===`${d.vm.node}-${d.vm.vmid}`,y=d.width>15&&d.height>12,k=d.width>40&&d.height>25,j=d.width>50&&d.height>40,v=d.width>60&&d.height>55,x=Math.max(...c.map(w=>w.value)),g=d.value/x,S=()=>u?g>.7?"rgba(0, 255, 200, 0.15)":g>.4?"rgba(0, 200, 255, 0.12)":g>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",N=()=>u?g>.7?"rgba(0, 255, 200, 0.9)":g>.4?"rgba(0, 200, 255, 0.85)":g>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",T=()=>u?g>.7?"rgba(0, 255, 200, 0.4)":g>.4?"rgba(0, 200, 255, 0.35)":g>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",C=()=>u?g>.7?"rgba(0, 255, 220, 1)":g>.4?"rgba(100, 220, 255, 1)":g>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",B=a?p*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:w=>{if(w.stopPropagation(),s){const R=w.clientX,z=w.clientY,W=d.width/2,M=d.height/2;s(d.vm,{cellX:R,cellY:z,cellWidth:d.width,cellHeight:d.height,cellTop:z-M,cellBottom:z+M,cellLeft:R-W,cellRight:R+W})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${B}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Me(f)}`}),u&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:T(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:h?1:.6}}),u&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:N(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:S(),stroke:N(),strokeWidth:h?2:1,rx:4,ry:4,style:{filter:h?`drop-shadow(0 0 12px ${T()}) drop-shadow(0 0 4px ${N()})`:`drop-shadow(0 0 3px ${T()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:N(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:N(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:N(),opacity:.8,className:"energy-dot"})]}),u&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),y&&!k&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:C(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${T()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),k&&(()=>{const w=d.width,R=d.height,z=Math.min(16,Math.max(9,Math.min(w/8,R/5))),W=Math.min(12,Math.max(8,Math.min(w/10,R/7))),M=Math.min(10,Math.max(7,Math.min(w/12,R/8))),F=Math.floor((w-8)/(z*.6)),X=d.vm.name.length>F?d.vm.name.slice(0,Math.max(1,F-1))+"…":d.vm.name,L=z+(j?W+2:0)+(v?M+2:0),E=(R-L)/2+z/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:w/2,y:E,textAnchor:"middle",dominantBaseline:"middle",fill:C(),fontSize:z,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${T()}`:"none",filter:u?`drop-shadow(0 0 2px ${T()})`:"none"},children:X}),j&&r.jsx("text",{x:w/2,y:E+z*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:W,fontFamily:"var(--font-mono)",children:Me(f)}),v&&r.jsxs("text",{x:w/2,y:E+z*.8+(j?W*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:C(),fontSize:M,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${T()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function $1({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=Ie(),o=m.useRef(null),[i,l]=m.useState({width:0,height:0}),[c,d]=m.useState(!0),[p,f]=m.useState(null);m.useEffect(()=>{const h=()=>{if(o.current){const k=o.current.getBoundingClientRect();l({width:k.width,height:k.height})}};h();const y=new ResizeObserver(h);return o.current&&y.observe(o.current),()=>y.disconnect()},[]),m.useEffect(()=>{if(c&&e.length>0){const h=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(h)}},[c,e.length]);const u=m.useMemo(()=>e.map(h=>{var y;return{vm:h,value:((y=h.disk)==null?void 0:y.total_bytes)||0}}).filter(h=>h.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Me(e.reduce((h,y)=>{var k;return h+(((k=y.disk)==null?void 0:k.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>f(null),children:i.width>0&&i.height>0&&r.jsx(z1,{data:u,width:i.width,height:i.height,isInitialLoad:c,onVMClick:(h,y)=>f({vm:h,position:y})})}),p&&r.jsx(E1,{vm:p.vm,position:p.position,onClose:()=>f(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function P1({storage:e,position:t,sourcePos:n,onClose:a}){const{t:s}=Ie();if(!e||!t)return null;const o=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,i=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:i.x,y1:i.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?s("storage.filter_shared"):s("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((c,d)=>r.jsx("span",{className:"tooltip-label",children:c},d))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.used"),":"]}),r.jsx("span",{children:Me(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.total"),":"]}),r.jsx("span",{children:Me(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.usage"),":"]}),r.jsx("span",{className:`text-${ye(o)}`,children:Ze(o,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((c,d)=>r.jsx("span",{className:"tooltip-label node",children:c},d))})]})]})]})]})}function R1({cluster:e,clusters:t}){const{t:n,language:a}=Ie(),[s,o]=m.useState("tanks"),[i,l]=m.useState("all"),[c,d]=m.useState(""),[p,f]=m.useState(null),[u,h]=m.useState(null),[y,k]=m.useState(null),[j,v]=m.useState(null),x=!e&&t&&Object.keys(t).length>0,g=m.useMemo(()=>{const R=[],z=(W,M)=>{Object.values(W.vms).forEach(F=>{var X;(X=F.disk)!=null&&X.total_bytes&&F.disk.total_bytes>0&&!F.template&&R.push({...F,clusterName:M})})};return x?Object.entries(t).forEach(([W,M])=>{z(M,M.name||W)}):e&&z(e,e.name||""),R.sort((W,M)=>{var F,X;return(((F=M.disk)==null?void 0:F.total_bytes)||0)-(((X=W.disk)==null?void 0:X.total_bytes)||0)})},[e,t,x]),{sharedStorages:S,localStoragesByNode:N,allNodes:T,totals:C,warnings:B}=m.useMemo(()=>{const R=new Map;let z=0,W=0,M=0;const F=new Set,X=b=>{Object.values(b.storages).forEach(Y=>{F.add(Y.node);const ee=Y.storage;R.has(ee)||R.set(ee,{name:Y.storage,type:Y.type,content:Y.content,allowedNodes:Y.allowed_nodes||[],nodes:[]}),R.get(ee).nodes.push({node:Y.node,totalBytes:Y.disk.total_bytes,usedBytes:Y.disk.used_bytes,active:Y.enabled!==!1})})};x?Object.values(t).forEach(b=>X(b)):e&&X(e);const L=[],E={};F.forEach(b=>{E[b]=[]}),R.forEach(b=>{const Y=M1.includes(b.type),ee=b.nodes[0].totalBytes,ue=b.nodes.length>1&&ee>0&&b.nodes.every(te=>Math.abs(te.totalBytes-ee)/ee<.01);if(Y||ue){const te=b.nodes[0],le=b.allowedNodes.length>0?b.allowedNodes:b.nodes.map(Oe=>Oe.node);L.push({name:b.name,type:b.type,content:b.content,isShared:!0,totalBytes:te.totalBytes,usedBytes:te.usedBytes,connectedNodes:le,nodeInstances:b.nodes})}else b.nodes.forEach(te=>{E[te.node]||(E[te.node]=[]),E[te.node].push({name:b.name,type:b.type,content:b.content,isShared:!1,totalBytes:te.totalBytes,usedBytes:te.usedBytes,connectedNodes:[],nodeInstances:[te]})})});const O=b=>{if(i==="local"&&b.isShared||i==="shared"&&!b.isShared)return!1;if(c){const Y=c.toLowerCase();if(!b.name.toLowerCase().includes(Y)&&!b.type.toLowerCase().includes(Y))return!1}return!0},U=L.filter(O).sort((b,Y)=>b.name.localeCompare(Y.name)),K={};return Object.entries(E).forEach(([b,Y])=>{const ee=Y.filter(O).sort((ue,te)=>ue.name.localeCompare(te.name));ee.length>0&&(K[b]=ee)}),U.forEach(b=>{(b.totalBytes>0?b.usedBytes/b.totalBytes*100:0)>=85&&M++,z+=b.usedBytes,W+=b.totalBytes}),Object.values(K).flat().forEach(b=>{(b.totalBytes>0?b.usedBytes/b.totalBytes*100:0)>=85&&M++,z+=b.usedBytes,W+=b.totalBytes}),{sharedStorages:U,localStoragesByNode:K,allNodes:Array.from(F).sort(),totals:{totalUsed:z,totalCapacity:W},warnings:M}},[e,t,x,i,c]),$=(R,z)=>{if(u&&u.name===R.name&&u.isShared===R.isShared){h(null),k(null),v(null);return}const W=z.getBoundingClientRect(),M=240,F=200,X=W.top+W.height/2;let L=W.right+30,E=!1;L+M>window.innerWidth&&(L=W.left-M-30,E=!0);let O=W.top;O+F>window.innerHeight&&(O=window.innerHeight-F-10),O<10&&(O=10),h(R),k({x:L,y:O}),v({x:E?W.left:W.right,y:X})};if(!e&&!x)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const w=C.totalCapacity>0?C.totalUsed/C.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:S.length+Object.values(N).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:S.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(N).flat().length})}),B>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",B," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:c,onChange:R=>d(R.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>l("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>l("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>l("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(C1,{percent:w,usedBytes:C.totalUsed,totalBytes:C.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx($1,{vmDiskData:g,totals:C,storages:[...S.map(R=>R.name),...Object.values(N).flat().map(R=>R.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&S.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n(S.length>1?"storage.storages_plural":"storage.storages_count",{n:S.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:S.map((R,z)=>r.jsx("div",{onClick:W=>$(R,W.currentTarget),style:{cursor:"pointer"},children:r.jsx(du,{name:R.name,usedBytes:R.usedBytes,totalBytes:R.totalBytes,type:R.type,isShared:!0,connectedNodes:R.connectedNodes,width:140,height:220,animationDelay:z*80})},R.name))})]}),(i==="all"||i==="local")&&Object.keys(N).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(N).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(N).flat().length})," ",n(Object.keys(N).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(N).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let R=S.length;return Object.entries(N).sort(([z],[W])=>z.localeCompare(W)).flatMap(([z,W])=>W.map(M=>{const F=M.nodeInstances[0],X=R++;return r.jsx("div",{onClick:L=>$(M,L.currentTarget),style:{cursor:"pointer"},children:r.jsx(du,{name:M.name,usedBytes:F.usedBytes,totalBytes:F.totalBytes,type:M.type,isShared:!1,nodeName:z,isOffline:!F.active,width:120,height:200,animationDelay:X*80})},`${z}-${M.name}`)}))})()})]}),S.length===0&&Object.keys(N).length===0&&r.jsx("div",{className:"no-storage",children:c?r.jsxs("span",{children:[n("error.no_data"),': "',c,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(P1,{storage:u,position:y,sourcePos:j,onClose:()=>{h(null),k(null),v(null)}}),r.jsx("style",{children:`
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
      `})]})}function T1({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,l]=m.useState(!1),[c,d]=m.useState(-1),p=m.useRef(null),f=m.useRef(null),u=m.useId(),h=t.find(k=>k.value===e);m.useEffect(()=>{if(!i)return;const k=v=>{p.current&&!p.current.contains(v.target)&&l(!1)},j=v=>{if(v.key==="Escape"){l(!1);return}if(v.key==="ArrowDown")v.preventDefault(),d(x=>Math.min(t.length-1,x<0?0:x+1));else if(v.key==="ArrowUp")v.preventDefault(),d(x=>Math.max(0,x-1));else if(v.key==="Enter"){v.preventDefault();const x=t[c];x&&!x.disabled&&(n(x.value),l(!1))}};return document.addEventListener("mousedown",k),document.addEventListener("keydown",j),()=>{document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j)}},[i,c,t,n]);const y=()=>{o||(l(k=>!k),d(t.findIndex(k=>k.value===e)))};return r.jsxs("div",{ref:p,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:I1}),r.jsxs("button",{type:"button",id:u,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:y,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:h?h.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&r.jsx("div",{ref:f,className:"cyber-select-list",role:"listbox",children:t.map((k,j)=>r.jsxs("div",{role:"option","aria-selected":k.value===e,"aria-disabled":k.disabled||void 0,className:`cyber-select-opt ${k.value===e?"selected":""} ${j===c?"hover":""} ${k.disabled?"disabled":""}`,onMouseEnter:()=>d(j),onClick:()=>{k.disabled||(n(k.value),l(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:k.label}),k.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:k.hint}),k.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},k.value))})]})}const I1=`
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
`;function L1({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:l}){const{t:c}=Ie(),[d,p]=m.useState(""),[f,u]=m.useState(!1),[h,y]=m.useState(""),k=m.useRef(null);if(m.useEffect(()=>{e&&(p(""),y(""),u(!1),setTimeout(()=>{var v;return(v=k.current)==null?void 0:v.focus()},50))},[e]),m.useEffect(()=>{if(!e)return;const v=x=>{x.key==="Escape"&&!f&&i()};return document.addEventListener("keydown",v),()=>document.removeEventListener("keydown",v)},[e,f,i]),!e)return null;const j=async()=>{if(d){u(!0),y("");try{await Ae.setClusterSecret(t,n,d),l()}catch(v){y(v instanceof Error?v.message:String(v)),u(!1)}}};return r.jsxs("div",{onClick:()=>!f&&i(),style:A1,children:[r.jsx("style",{children:O1}),r.jsxs("div",{className:"ssm-modal",onClick:v=>v.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:k,type:"password",value:d,onChange:v=>p(v.target.value),onKeyDown:v=>{v.key==="Enter"&&j()},autoComplete:"new-password",spellCheck:!1}),h&&r.jsx("div",{className:"ssm-err",children:h}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:f,children:c("action.cancel")}),r.jsx("button",{className:"primary",onClick:j,disabled:f||!d,children:f?"…":c("action.save")})]})]})]})}const A1={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},O1=`
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
`;function F1({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=Ie(),[o,i]=m.useState(null),[l,c]=m.useState(!0),[d,p]=m.useState(!1),[f,u]=m.useState(null),[h,y]=m.useState(!1),[k,j]=m.useState("ui"),[v,x]=m.useState(!0),[g,S]=m.useState("cyberpunk"),[N,T]=m.useState("command-center"),[C,B]=m.useState(100),[$,w]=m.useState("all"),[R,z]=m.useState(85),[W,M]=m.useState("vmid"),[F,X]=m.useState("node"),[L,E]=m.useState("node"),[O,U]=m.useState("asc"),[K,b]=m.useState({}),[Y,ee]=m.useState(!0),[ue,te]=m.useState(80),[le,Oe]=m.useState(95),[J,q]=m.useState(85),[de,ce]=m.useState(95),[Je,Se]=m.useState(80),[st,$e]=m.useState(95),[H,re]=m.useState(50),[be,se]=m.useState(100),[ze,nt]=m.useState(5),[et,ln]=m.useState(10),[ot,Xt]=m.useState("0.0.0.0"),[Dt,ht]=m.useState(8098),[oe,pe]=m.useState(!1),[Fe,He]=m.useState(8086),[ct,xt]=m.useState("disabled"),[kt,ae]=m.useState(null),[Le,Ye]=m.useState({}),Ce=()=>{y(!0),setTimeout(()=>e(),400)};m.useEffect(()=>{xe()},[]);const xe=async()=>{var I,ge,me,Ne,dt,Re,Pe,_,V,A,P,D,Z,Q,ie,he,je,we,ut,pt,Be,Ct,dn,hc,xc,vc,yc,bc,wc,kc,jc,_c,Nc,Sc,Cc;try{c(!0);const ve=await Ae.getConfig();i(ve),x(((I=ve.ui)==null?void 0:I.animations_enabled)??!0),S(((ge=ve.ui)==null?void 0:ge.theme)??"cyberpunk"),T(((me=ve.ui)==null?void 0:me.default_view)??"command-center"),B(((Ne=ve.ui)==null?void 0:Ne.particle_count)??100),w(((dt=ve.ui)==null?void 0:dt.vm_matrix_default_filter)??"all"),z(((Re=ve.ui)==null?void 0:Re.matrix_card_width)??85),M(((Pe=ve.ui)==null?void 0:Pe.matrix_sort_by)??"vmid"),X(((_=ve.ui)==null?void 0:_.matrix_group_by)??"node"),E(((V=ve.ui)==null?void 0:V.matrix_group_sort_by)??"node"),U(((A=ve.ui)==null?void 0:A.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((P=ve.ui)==null?void 0:P.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((D=ve.ui)==null?void 0:D.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((Z=ve.ui)==null?void 0:Z.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((Q=ve.ui)==null?void 0:Q.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((ie=ve.ui)==null?void 0:ie.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((he=ve.ui)==null?void 0:he.matrix_group_sort_order)??"asc");const Mc={};(je=ve.clusters)==null||je.forEach(vn=>{Mc[vn.id]={enabled:vn.enabled!==!1,poll_interval:vn.poll_interval||5,static_refresh_interval:vn.static_refresh_interval||60}}),b(Mc),ee(((we=ve.alerts)==null?void 0:we.enabled)??!0),te(((ut=ve.alerts)==null?void 0:ut.cpu_warning)??80),Oe(((pt=ve.alerts)==null?void 0:pt.cpu_critical)??95),q(((Be=ve.alerts)==null?void 0:Be.memory_warning)??85),ce(((Ct=ve.alerts)==null?void 0:Ct.memory_critical)??95),Se(((dn=ve.alerts)==null?void 0:dn.disk_warning)??80),$e(((hc=ve.alerts)==null?void 0:hc.disk_critical)??95),re(((xc=ve.alerts)==null?void 0:xc.diskio_warning)??50),se(((vc=ve.alerts)==null?void 0:vc.diskio_critical)??100),nt(((yc=ve.alerts)==null?void 0:yc.iowait_warning)??5),ln(((bc=ve.alerts)==null?void 0:bc.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((wc=ve.alerts)==null?void 0:wc.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((kc=ve.alerts)==null?void 0:kc.iowait_critical)??10)),Xt(((jc=ve.server)==null?void 0:jc.host)??"0.0.0.0"),ht(((_c=ve.server)==null?void 0:_c.http_port)??8098),pe(((Nc=ve.server)==null?void 0:Nc.influx_enabled)??!1),He(((Sc=ve.server)==null?void 0:Sc.influx_port)??8086),xt(((Cc=ve.console)==null?void 0:Cc.mode)||"disabled");const Ec={};(ve.clusters||[]).forEach(vn=>{Ec[vn.id]=!!(vn.auth&&vn.auth.password&&vn.auth.password.length>0)}),Ye(Ec)}catch(ve){u(String(ve))}finally{c(!1)}},cn=async()=>{var I;try{p(!0),localStorage.setItem("matrix_card_width",String(R)),localStorage.setItem("matrix_sort_by",W),localStorage.setItem("matrix_group_by",F),localStorage.setItem("vm_matrix_default_filter",$),localStorage.setItem("matrix_group_sort_by",L),localStorage.setItem("matrix_group_sort_order",O),localStorage.setItem("iowait_warning",String(ze)),localStorage.setItem("iowait_critical",String(et));const ge=(I=o==null?void 0:o.clusters)==null?void 0:I.map(me=>{var Ne,dt,Re;return{...me,enabled:((Ne=K[me.id])==null?void 0:Ne.enabled)!==!1,poll_interval:((dt=K[me.id])==null?void 0:dt.poll_interval)||me.poll_interval,static_refresh_interval:((Re=K[me.id])==null?void 0:Re.static_refresh_interval)||me.static_refresh_interval}});await Ae.updateConfig({server:{host:ot,http_port:Dt,influx_enabled:oe,influx_port:Fe},console:{mode:ct},ui:{default_view:N,theme:g,language:a,animations_enabled:v,particle_count:C,vm_matrix_default_filter:$,matrix_card_width:R,matrix_sort_by:W,matrix_group_by:F,matrix_group_sort_by:L,matrix_group_sort_order:O},alerts:{enabled:Y,cpu_warning:ue,cpu_critical:le,memory_warning:J,memory_critical:de,disk_warning:Je,disk_critical:st,diskio_warning:H,diskio_critical:be,iowait_warning:ze,iowait_critical:et},clusters:ge}),e()}catch(ge){u(String(ge))}finally{p(!1)}},Bt=I=>{b(ge=>{var me;return{...ge,[I]:{...ge[I],enabled:!((me=ge[I])!=null&&me.enabled)}}})},Kt=(I,ge,me)=>{b(Ne=>({...Ne,[I]:{...Ne[I],[ge]:me}}))};m.useEffect(()=>{const I=ge=>{ge.key==="Escape"&&!h&&Ce()};return window.addEventListener("keydown",I),()=>window.removeEventListener("keydown",I)},[h]);const fe=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${h?"exiting":""}`,onClick:I=>I.target===I.currentTarget&&!h&&Ce(),children:[r.jsxs("div",{className:`settings-panel panel ${h?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:Ce,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:fe.map(I=>r.jsxs("button",{className:`settings-tab ${k===I.id?"active":""}`,onClick:()=>j(I.id),children:[I.icon,r.jsx("span",{children:n(I.labelKey)})]},I.id))}),r.jsx("div",{className:"settings-content",children:l?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):f?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:f})}):r.jsxs(r.Fragment,{children:[k==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(I=>r.jsxs("label",{className:`radio-option ${N===I.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:I.id,checked:N===I.id,onChange:()=>T(I.id)}),r.jsx("span",{className:"radio-label",children:n(I.labelKey)})]},I.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(I=>r.jsxs("label",{className:`radio-option ${$===I?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:I,checked:$===I,onChange:()=>w(I)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${I}`)})]},I))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:R,onChange:I=>z(Number(I.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(I=>r.jsxs("label",{className:`radio-option ${W===I?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:I,checked:W===I,onChange:()=>M(I)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${I}`)})]},I))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(I=>r.jsxs("label",{className:`radio-option ${F===I?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:I,checked:F===I,onChange:()=>X(I)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${I}`)})]},I))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${L==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:L==="node",onChange:()=>E("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${L==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:L==="cluster",onChange:()=>E("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${O==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:O==="asc",onChange:()=>U("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${O==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:O==="desc",onChange:()=>U("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),k==="clusters"&&o&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:o.clusters.map(I=>{var dt,Re;const ge=t==null?void 0:t[I.id],me=(ge==null?void 0:ge.name)||I.name||I.id,Ne=K[I.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${Ne.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:Pe=>Pe.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:Ne.enabled,onChange:()=>Bt(I.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${Ne.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:me}),r.jsxs("span",{className:"cluster-id",children:["(",I.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ne.poll_interval,onChange:Pe=>Kt(I.id,"poll_interval",Number(Pe.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ne.static_refresh_interval,onChange:Pe=>Kt(I.id,"static_refresh_interval",Number(Pe.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((dt=I.nodes)==null?void 0:dt.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((Re=I.auth)==null?void 0:Re.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Le[I.id]?"set":"unset"}`,children:Le[I.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>ae(I.id),children:Le[I.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Le[I.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(window.confirm(n("settings.secret_confirm_clear",{id:I.id})))try{await Ae.deleteClusterSecret(I.id,"pve_password"),Ye(Pe=>({...Pe,[I.id]:!1}))}catch(Pe){alert(String(Pe))}},children:n("settings.secret_clear")})]})]},I.id)})})]})}),k==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ue,onChange:I=>te(Number(I.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:le,onChange:I=>Oe(Number(I.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:J,onChange:I=>q(Number(I.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:de,onChange:I=>ce(Number(I.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Je,onChange:I=>Se(Number(I.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:st,onChange:I=>$e(Number(I.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:H,onChange:I=>re(Number(I.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:be,onChange:I=>se(Number(I.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ze,onChange:I=>nt(Number(I.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:et,onChange:I=>ln(Number(I.target.value)),min:0,max:100})]})]})]})]}),k==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:ot,onChange:I=>Xt(I.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:Dt,onChange:I=>ht(Number(I.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:oe,onChange:I=>pe(I.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(oe?"settings.enabled":"settings.disabled")})]}),oe&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:Fe,onChange:I=>He(Number(I.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(T1,{className:"full",value:ct,onChange:xt,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.1.0"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:Ce,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:cn,disabled:d||h,children:d?"Saving...":n("action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(L1,{open:kt!==null,cluster_id:kt||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:kt||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>ae(null),onSaved:()=>{kt&&Ye(I=>({...I,[kt]:!0})),ae(null)}}),r.jsx("style",{children:`
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
      `})]})}const uu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function D1({particleCount:e=40,enabled:t=!0,isPaused:n=!1}){const a=m.useRef(null),s=m.useRef([]),o=m.useRef(),i=m.useRef({x:0,y:0}),l=m.useRef(0),c=m.useCallback((p,f)=>{s.current=Array.from({length:e},()=>({x:Math.random()*p,y:Math.random()*f,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:uu[Math.floor(Math.random()*uu.length)]}))},[e]),d=m.useCallback(p=>{const f=a.current;if(!f)return;const u=p??performance.now();if(u-l.current<32){o.current=requestAnimationFrame(d);return}l.current=u;const h=f.getContext("2d");if(!h)return;const{width:y,height:k}=f;h.clearRect(0,0,y,k),s.current.forEach(j=>{const v=j.x-i.current.x,x=j.y-i.current.y,g=Math.sqrt(v*v+x*x);if(g<100){const S=(100-g)/100;j.vx+=v/g*S*.05,j.vy+=x/g*S*.05}j.x+=j.vx,j.y+=j.vy,j.vx*=.99,j.vy*=.99,j.x<0&&(j.x=y),j.x>y&&(j.x=0),j.y<0&&(j.y=k),j.y>k&&(j.y=0),j.alpha+=(Math.random()-.5)*.02,j.alpha=Math.max(.1,Math.min(.7,j.alpha)),h.beginPath(),h.arc(j.x,j.y,j.size,0,Math.PI*2),h.fillStyle=j.color,h.globalAlpha=j.alpha,h.fill()}),h.globalAlpha=1,o.current=requestAnimationFrame(d)},[]);return m.useEffect(()=>{if(!t)return;const p=a.current;if(!p)return;const f=()=>{p.width=window.innerWidth,p.height=window.innerHeight,c(p.width,p.height)},u=h=>{i.current={x:h.clientX,y:h.clientY}};return f(),window.addEventListener("resize",f),window.addEventListener("mousemove",u),()=>{window.removeEventListener("resize",f),window.removeEventListener("mousemove",u)}},[t,c]),m.useEffect(()=>{if(!t||n){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return d(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,d]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const pu={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function mi({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=pu[e]||pu[" "],i=t,l=t*1.8,c=t*.15,d=t*.05,p=s?t*.4:t*.15,f=[`M ${d+c} ${d} L ${i-d-c} ${d} L ${i-d-c*.3} ${c*.7+d} L ${d+c*.3} ${c*.7+d} Z`,`M ${i-d} ${d+c} L ${i-d} ${l/2-d} L ${i-d-c*.7} ${l/2-d-c*.3} L ${i-d-c*.7} ${d+c+c*.3} Z`,`M ${i-d} ${l/2+d} L ${i-d} ${l-d-c} L ${i-d-c*.7} ${l-d-c-c*.3} L ${i-d-c*.7} ${l/2+d+c*.3} Z`,`M ${d+c} ${l-d} L ${i-d-c} ${l-d} L ${i-d-c*.3} ${l-c*.7-d} L ${d+c*.3} ${l-c*.7-d} Z`,`M ${d} ${l/2+d} L ${d} ${l-d-c} L ${d+c*.7} ${l-d-c-c*.3} L ${d+c*.7} ${l/2+d+c*.3} Z`,`M ${d} ${d+c} L ${d} ${l/2-d} L ${d+c*.7} ${l/2-d-c*.3} L ${d+c*.7} ${d+c+c*.3} Z`,`M ${d+c*.5} ${l/2} L ${d+c} ${l/2-c*.4} L ${i-d-c} ${l/2-c*.4} L ${i-d-c*.5} ${l/2} L ${i-d-c} ${l/2+c*.4} L ${d+c} ${l/2+c*.4} Z`];return r.jsx("svg",{width:i,height:l,style:{display:"inline-block"},children:f.map((u,h)=>r.jsx("path",{d:u,fill:o[h]?n:a,style:{filter:o[h]?`drop-shadow(0 0 ${p}px ${n})`:"none",transition:"fill 0.03s ease-out"}},h))})}function mu({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function fu(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function B1(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function W1({timestamp:e,connected:t=!0}){const[n,a]=m.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=m.useState(!1),[i,l]=m.useState(!1),c=m.useRef(!1),d=m.useRef(null),p=m.useRef(null),f=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",h=n.hours==="  ",y=m.useCallback(x=>{const g=fu(x);a(g),p.current=x},[]),k=m.useCallback(x=>{d.current&&clearInterval(d.current),l(!0),o(!0);let g=0;const S=20,N=50,T={current:x};return d.current=setInterval(()=>{if(g++,g<S)a(B1());else{d.current&&(clearInterval(d.current),d.current=null);const C=fu(T.current);a(C),p.current=T.current,l(!1),o(!1)}},N),C=>{T.current=C}},[]),j=m.useRef(null);m.useEffect(()=>{if(e===null){c.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!c.current){c.current=!0,j.current=k(e);return}if(d.current&&j.current){j.current(e);return}p.current!==e&&y(e)},[e,k,y]),m.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const v=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:f},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((x,g)=>r.jsx(mi,{digit:x||" ",size:v,color:f,dimColor:u,glow:i},`h${g}`)),r.jsx(mu,{size:v,color:f,dim:h}),(n.minutes||"  ").split("").map((x,g)=>r.jsx(mi,{digit:x||" ",size:v,color:f,dimColor:u,glow:i},`m${g}`)),r.jsx(mu,{size:v,color:f,dim:h}),(n.seconds||"  ").split("").map((x,g)=>r.jsx(mi,{digit:x||" ",size:v,color:f,dimColor:u,glow:i},`s${g}`))]})]})}function V1({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=m.useState(!1),i=m.useRef(null);m.useEffect(()=>{const d=p=>{i.current&&!i.current.contains(p.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),m.useEffect(()=>{const d=p=>{p.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const l=d=>{n(d),o(!1)},c=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:c(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:c()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>l("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,p])=>{var k,j;const f=(k=p.summary)==null?void 0:k.is_standalone,u=p.name||d,h=((j=p.summary)==null?void 0:j.nodes_online)??0,y=Object.keys(p.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>l(d),children:[r.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:u}),r.jsxs("span",{className:"option-meta",children:[h," nodes · ",y," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const gu={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function U1({user:e,onLogout:t}){const{t:n}=Ie(),[a,s]=m.useState(!1),o=m.useRef(null);if(m.useEffect(()=>{if(!a)return;const d=f=>{o.current&&!o.current.contains(f.target)&&s(!1)},p=f=>{f.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",p),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",p)}},[a]),!e)return null;const i=e.role_global||"guest",l=gu[i]||gu.guest,c=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:l,boxShadow:`0 0 6px ${l}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:l,borderColor:l},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:l,boxShadow:`0 0 6px ${l}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),c&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),c&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
      `})]})}const en={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},hu=[{view:"command-center",icon:en.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:en.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:en.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:en.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:en.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:en.Ceph,labelKey:"nav.ceph",shortcut:"C"}],H1={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation"};function Y1(){var W;const{t:e,language:t,setLanguage:n}=Ie(),[a,s]=m.useState("command-center"),[o,i]=m.useState({}),[l,c]=m.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,p]=m.useState(!1),f=$m(),[u,h]=m.useState(0),[y,k]=m.useState(!1),[j,v]=m.useState(null),[x,g]=m.useState(!1),[S,N]=m.useState(!1),{connected:T,connecting:C,send:B}=Ag({onMessage:m.useCallback(M=>{y||(i(M),h(Date.now()/1e3))},[y])});m.useEffect(()=>{const M=()=>{const F=document.visibilityState!=="hidden";document.body.setAttribute("data-app-visible",F?"true":"false");try{F?(B({type:"resume"}),B({type:"refresh"})):B({type:"pause"})}catch{}};return M(),document.addEventListener("visibilitychange",M),()=>document.removeEventListener("visibilitychange",M)},[B]);const $=m.useCallback(()=>{v(y?"resuming":"pausing"),setTimeout(()=>{k(M=>!M),setTimeout(()=>v(null),500)},300)},[y]),w=l==="__all__"?null:o[l]||null,R=m.useMemo(()=>{const M=Object.values(o);return{total_clusters:M.length,total_nodes:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.node_count)||0)},0),total_nodes_online:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.nodes_online)||0)},0),total_vms:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.vm_count)||0)},0),total_vms_running:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.vms_running)||0)},0),total_cts:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.ct_count)||0)},0),total_cts_running:M.reduce((F,X)=>{var L;return F+(((L=X.summary)==null?void 0:L.cts_running)||0)},0),clusters:M.map(F=>F.summary).filter(Boolean)}},[o]);m.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",l)}catch{}},[l]),m.useEffect(()=>{Object.keys(o).length>0&&l!=="__all__"&&(o[l]||c("__all__"))},[o,l]),m.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),m.useEffect(()=>{Ae.getConfig().then(M=>{M!=null&&M.ui&&(M.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",M.ui.vm_matrix_default_filter),M.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(M.ui.matrix_card_width)),M.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",M.ui.matrix_sort_by))}).catch(()=>{})},[]),m.useEffect(()=>{if(!x)return;const M=()=>g(!1);return document.addEventListener("click",M),()=>document.removeEventListener("click",M)},[x]),m.useEffect(()=>{if(!S)return;const M=()=>N(!1);return document.addEventListener("click",M),()=>document.removeEventListener("click",M)},[S]),m.useEffect(()=>{const M=F=>{if(F.target instanceof HTMLInputElement||F.target instanceof HTMLTextAreaElement)return;const X=F.key.toLowerCase();if(X===" "||F.code==="Space"){F.preventDefault(),$();return}if(!F.ctrlKey&&!F.metaKey&&!F.altKey){const L=H1[X];if(L){F.preventDefault(),s(L);return}}(F.ctrlKey||F.metaKey)&&X==="s"&&(F.preventDefault(),p(L=>!L))};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[$]);const z=()=>{const M=l==="__all__";switch(a){case"command-center":return r.jsx(Dd,{clusters:o,globalSummary:R,isPaused:y,onSelectCluster:F=>{c(F),s("cluster-core")}});case"cluster-core":return r.jsx(Kg,{cluster:w,clusters:M?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:F=>{c(F),s("holo-matrix")},isPaused:y});case"holo-matrix":return r.jsx(yh,{cluster:w,clusters:M?o:void 0});case"radar-scan":return r.jsx(wh,{cluster:w,clusters:M?o:void 0,isPaused:y});case"storage":return r.jsx(R1,{cluster:w,clusters:M?o:void 0});case"ceph-constellation":return r.jsx(Lh,{cluster:w,clusters:M?o:void 0,isPaused:y});default:return r.jsx(Dd,{clusters:o,globalSummary:R,isPaused:y,onSelectCluster:F=>{c(F),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${y?"animations-paused":""}`,children:[r.jsx(D1,{isPaused:y}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${T?"connected":C?"connecting":"disconnected"}`,title:e(T?"status.connected":C?"status.connecting":"status.disconnected")}),r.jsx(W1,{timestamp:u,connected:T})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[hu.map(({view:M,icon:F,labelKey:X,shortcut:L},E)=>r.jsxs("button",{className:`nav-tab nav-tab-${E} ${a===M?"active":""}`,onClick:()=>s(M),title:`${e(X)} [${L}]`,children:[r.jsx(F,{}),r.jsx("span",{children:e(X)}),r.jsx("span",{className:"nav-shortcut",children:L})]},M)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:M=>{M.stopPropagation(),N(!S)},title:e("nav.more"),children:r.jsx(en.MoreHorizontal,{})}),S&&r.jsx("div",{className:"nav-more-dropdown",onClick:M=>M.stopPropagation(),children:hu.map(({view:M,icon:F,labelKey:X,shortcut:L},E)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${E} ${a===M?"active":""}`,onClick:()=>{s(M),N(!1)},children:[r.jsx(F,{}),r.jsx("span",{children:e(X)}),r.jsx("span",{className:"nav-shortcut",children:L})]},M))})]})]}),Object.keys(o).length>0&&r.jsx(V1,{clusters:o,value:l,onChange:c,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${y?"paused":""} ${j||""}`,onClick:$,title:`${e(y?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:y?r.jsx(en.Play,{}):r.jsx(en.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:M=>{M.stopPropagation(),g(!x)},title:e("settings.language"),children:r.jsx(en.Language,{})}),x&&r.jsxs("div",{className:"lang-dropdown",onClick:M=>M.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),g(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),g(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(U1,{user:f.user,onLogout:f.logout}),(!f.authEnforced||((W=f.user)==null?void 0:W.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>p(!0),title:e("settings.title"),children:r.jsx(en.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:z()},a)}),d&&r.jsx(F1,{onClose:()=>p(!1),clusters:o}),j&&r.jsxs("div",{className:`pause-overlay ${j}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((M,F)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${F*.05}s`}},F))}),r.jsx("div",{className:"pause-status-text",children:j==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function G1(){return r.jsx(Pg,{children:r.jsx(Tg,{children:r.jsx(Y1,{})})})}fi.createRoot(document.getElementById("root")).render(r.jsx(mo.StrictMode,{children:r.jsx(G1,{})}));
