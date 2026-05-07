(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();function _0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $u={exports:{}},To={},Tu={exports:{}},Te={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ls=Symbol.for("react.element"),N0=Symbol.for("react.portal"),S0=Symbol.for("react.fragment"),C0=Symbol.for("react.strict_mode"),M0=Symbol.for("react.profiler"),z0=Symbol.for("react.provider"),E0=Symbol.for("react.context"),$0=Symbol.for("react.forward_ref"),T0=Symbol.for("react.suspense"),P0=Symbol.for("react.memo"),R0=Symbol.for("react.lazy"),Wc=Symbol.iterator;function I0(e){return e===null||typeof e!="object"?null:(e=Wc&&e[Wc]||e["@@iterator"],typeof e=="function"?e:null)}var Pu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ru=Object.assign,Iu={};function ca(e,t,r){this.props=e,this.context=t,this.refs=Iu,this.updater=r||Pu}ca.prototype.isReactComponent={};ca.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ca.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Lu(){}Lu.prototype=ca.prototype;function Ol(e,t,r){this.props=e,this.context=t,this.refs=Iu,this.updater=r||Pu}var Fl=Ol.prototype=new Lu;Fl.constructor=Ol;Ru(Fl,ca.prototype);Fl.isPureReactComponent=!0;var Vc=Array.isArray,Au=Object.prototype.hasOwnProperty,Dl={current:null},Ou={key:!0,ref:!0,__self:!0,__source:!0};function Fu(e,t,r){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Au.call(t,a)&&!Ou.hasOwnProperty(a)&&(s[a]=t[a]);var c=arguments.length-2;if(c===1)s.children=r;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)s[a]===void 0&&(s[a]=c[a]);return{$$typeof:ls,type:e,key:o,ref:i,props:s,_owner:Dl.current}}function L0(e,t){return{$$typeof:ls,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Bl(e){return typeof e=="object"&&e!==null&&e.$$typeof===ls}function A0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Uc=/\/+/g;function ei(e,t){return typeof e=="object"&&e!==null&&e.key!=null?A0(""+e.key):t.toString(36)}function Os(e,t,r,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case ls:case N0:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+ei(i,0):a,Vc(s)?(r="",e!=null&&(r=e.replace(Uc,"$&/")+"/"),Os(s,t,r,"",function(d){return d})):s!=null&&(Bl(s)&&(s=L0(s,r+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(Uc,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",Vc(e))for(var c=0;c<e.length;c++){o=e[c];var l=a+ei(o,c);i+=Os(o,t,r,l,s)}else if(l=I0(e),typeof l=="function")for(e=l.call(e),c=0;!(o=e.next()).done;)o=o.value,l=a+ei(o,c++),i+=Os(o,t,r,l,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function gs(e,t,r){if(e==null)return e;var a=[],s=0;return Os(e,a,"","",function(o){return t.call(r,o,s++)}),a}function O0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var It={current:null},Fs={transition:null},F0={ReactCurrentDispatcher:It,ReactCurrentBatchConfig:Fs,ReactCurrentOwner:Dl};function Du(){throw Error("act(...) is not supported in production builds of React.")}Te.Children={map:gs,forEach:function(e,t,r){gs(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return gs(e,function(){t++}),t},toArray:function(e){return gs(e,function(t){return t})||[]},only:function(e){if(!Bl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Te.Component=ca;Te.Fragment=S0;Te.Profiler=M0;Te.PureComponent=Ol;Te.StrictMode=C0;Te.Suspense=T0;Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F0;Te.act=Du;Te.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Ru({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Dl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)Au.call(t,l)&&!Ou.hasOwnProperty(l)&&(a[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)a.children=r;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}return{$$typeof:ls,type:e.type,key:s,ref:o,props:a,_owner:i}};Te.createContext=function(e){return e={$$typeof:E0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:z0,_context:e},e.Consumer=e};Te.createElement=Fu;Te.createFactory=function(e){var t=Fu.bind(null,e);return t.type=e,t};Te.createRef=function(){return{current:null}};Te.forwardRef=function(e){return{$$typeof:$0,render:e}};Te.isValidElement=Bl;Te.lazy=function(e){return{$$typeof:R0,_payload:{_status:-1,_result:e},_init:O0}};Te.memo=function(e,t){return{$$typeof:P0,type:e,compare:t===void 0?null:t}};Te.startTransition=function(e){var t=Fs.transition;Fs.transition={};try{e()}finally{Fs.transition=t}};Te.unstable_act=Du;Te.useCallback=function(e,t){return It.current.useCallback(e,t)};Te.useContext=function(e){return It.current.useContext(e)};Te.useDebugValue=function(){};Te.useDeferredValue=function(e){return It.current.useDeferredValue(e)};Te.useEffect=function(e,t){return It.current.useEffect(e,t)};Te.useId=function(){return It.current.useId()};Te.useImperativeHandle=function(e,t,r){return It.current.useImperativeHandle(e,t,r)};Te.useInsertionEffect=function(e,t){return It.current.useInsertionEffect(e,t)};Te.useLayoutEffect=function(e,t){return It.current.useLayoutEffect(e,t)};Te.useMemo=function(e,t){return It.current.useMemo(e,t)};Te.useReducer=function(e,t,r){return It.current.useReducer(e,t,r)};Te.useRef=function(e){return It.current.useRef(e)};Te.useState=function(e){return It.current.useState(e)};Te.useSyncExternalStore=function(e,t,r){return It.current.useSyncExternalStore(e,t,r)};Te.useTransition=function(){return It.current.useTransition()};Te.version="18.3.1";Tu.exports=Te;var p=Tu.exports;const Po=_0(p);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D0=p,B0=Symbol.for("react.element"),W0=Symbol.for("react.fragment"),V0=Object.prototype.hasOwnProperty,U0=D0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,H0={key:!0,ref:!0,__self:!0,__source:!0};function Bu(e,t,r){var a,s={},o=null,i=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)V0.call(t,a)&&!H0.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:B0,type:e,key:o,ref:i,props:s,_owner:U0.current}}To.Fragment=W0;To.jsx=Bu;To.jsxs=Bu;$u.exports=To;var n=$u.exports,Ai={},Wu={exports:{}},Zt={},Vu={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,F){var H=I.length;I.push(F);e:for(;0<H;){var G=H-1>>>1,b=I[G];if(0<s(b,F))I[G]=F,I[H]=b,H=G;else break e}}function r(I){return I.length===0?null:I[0]}function a(I){if(I.length===0)return null;var F=I[0],H=I.pop();if(H!==F){I[0]=H;e:for(var G=0,b=I.length,he=b>>>1;G<he;){var fe=2*(G+1)-1,ve=I[fe],J=fe+1,se=I[J];if(0>s(ve,H))J<b&&0>s(se,ve)?(I[G]=se,I[J]=H,G=J):(I[G]=ve,I[fe]=H,G=fe);else if(J<b&&0>s(se,H))I[G]=se,I[J]=H,G=J;else break e}}return F}function s(I,F){var H=I.sortIndex-F.sortIndex;return H!==0?H:I.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var l=[],d=[],m=1,f=null,u=3,v=!1,y=!1,k=!1,j=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(I){for(var F=r(d);F!==null;){if(F.callback===null)a(d);else if(F.startTime<=I)a(d),F.sortIndex=F.expirationTime,t(l,F);else break;F=r(d)}}function _(I){if(k=!1,g(I),!y)if(r(l)!==null)y=!0,ee(C);else{var F=r(d);F!==null&&T(_,F.startTime-I)}}function C(I,F){y=!1,k&&(k=!1,x(M),M=-1),v=!0;var H=u;try{for(g(F),f=r(l);f!==null&&(!(f.expirationTime>F)||I&&!re());){var G=f.callback;if(typeof G=="function"){f.callback=null,u=f.priorityLevel;var b=G(f.expirationTime<=F);F=e.unstable_now(),typeof b=="function"?f.callback=b:f===r(l)&&a(l),g(F)}else a(l);f=r(l)}if(f!==null)var he=!0;else{var fe=r(d);fe!==null&&T(_,fe.startTime-F),he=!1}return he}finally{f=null,u=H,v=!1}}var $=!1,E=null,M=-1,W=5,B=-1;function re(){return!(e.unstable_now()-B<W)}function U(){if(E!==null){var I=e.unstable_now();B=I;var F=!0;try{F=E(!0,I)}finally{F?le():($=!1,E=null)}}else $=!1}var le;if(typeof h=="function")le=function(){h(U)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,R=D.port2;D.port1.onmessage=U,le=function(){R.postMessage(null)}}else le=function(){j(U,0)};function ee(I){E=I,$||($=!0,le())}function T(I,F){M=j(function(){I(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){y||v||(y=!0,ee(C))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return r(l)},e.unstable_next=function(I){switch(u){case 1:case 2:case 3:var F=3;break;default:F=u}var H=u;u=F;try{return I()}finally{u=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,F){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var H=u;u=I;try{return F()}finally{u=H}},e.unstable_scheduleCallback=function(I,F,H){var G=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?G+H:G):H=G,I){case 1:var b=-1;break;case 2:b=250;break;case 5:b=1073741823;break;case 4:b=1e4;break;default:b=5e3}return b=H+b,I={id:m++,callback:F,priorityLevel:I,startTime:H,expirationTime:b,sortIndex:-1},H>G?(I.sortIndex=H,t(d,I),r(l)===null&&I===r(d)&&(k?(x(M),M=-1):k=!0,T(_,H-G))):(I.sortIndex=b,t(l,I),y||v||(y=!0,ee(C))),I},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(I){var F=u;return function(){var H=u;u=F;try{return I.apply(this,arguments)}finally{u=H}}}})(Uu);Vu.exports=Uu;var Y0=Vu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G0=p,Qt=Y0;function q(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Hu=new Set,Ba={};function zn(e,t){ea(e,t),ea(e+"Capture",t)}function ea(e,t){for(Ba[e]=t,e=0;e<t.length;e++)Hu.add(t[e])}var Rr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Oi=Object.prototype.hasOwnProperty,K0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hc={},Yc={};function X0(e){return Oi.call(Yc,e)?!0:Oi.call(Hc,e)?!1:K0.test(e)?Yc[e]=!0:(Hc[e]=!0,!1)}function q0(e,t,r,a){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Q0(e,t,r,a){if(t===null||typeof t>"u"||q0(e,t,r,a))return!0;if(a)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Lt(e,t,r,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var St={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){St[e]=new Lt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];St[t]=new Lt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){St[e]=new Lt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){St[e]=new Lt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){St[e]=new Lt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){St[e]=new Lt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){St[e]=new Lt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){St[e]=new Lt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){St[e]=new Lt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Wl=/[\-:]([a-z])/g;function Vl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Wl,Vl);St[t]=new Lt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Wl,Vl);St[t]=new Lt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Wl,Vl);St[t]=new Lt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){St[e]=new Lt(e,1,!1,e.toLowerCase(),null,!1,!1)});St.xlinkHref=new Lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){St[e]=new Lt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ul(e,t,r,a){var s=St.hasOwnProperty(t)?St[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Q0(t,r,s,a)&&(r=null),a||s===null?X0(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):s.mustUseProperty?e[s.propertyName]=r===null?s.type===3?!1:"":r:(t=s.attributeName,a=s.attributeNamespace,r===null?e.removeAttribute(t):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,a?e.setAttributeNS(a,t,r):e.setAttribute(t,r))))}var Fr=G0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,hs=Symbol.for("react.element"),In=Symbol.for("react.portal"),Ln=Symbol.for("react.fragment"),Hl=Symbol.for("react.strict_mode"),Fi=Symbol.for("react.profiler"),Yu=Symbol.for("react.provider"),Gu=Symbol.for("react.context"),Yl=Symbol.for("react.forward_ref"),Di=Symbol.for("react.suspense"),Bi=Symbol.for("react.suspense_list"),Gl=Symbol.for("react.memo"),Hr=Symbol.for("react.lazy"),Ku=Symbol.for("react.offscreen"),Gc=Symbol.iterator;function ma(e){return e===null||typeof e!="object"?null:(e=Gc&&e[Gc]||e["@@iterator"],typeof e=="function"?e:null)}var ot=Object.assign,ti;function _a(e){if(ti===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);ti=t&&t[1]||""}return`
`+ti+e}var ri=!1;function ni(e,t){if(!e||ri)return"";ri=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,c=o.length-1;1<=i&&0<=c&&s[i]!==o[c];)c--;for(;1<=i&&0<=c;i--,c--)if(s[i]!==o[c]){if(i!==1||c!==1)do if(i--,c--,0>c||s[i]!==o[c]){var l=`
`+s[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=c);break}}}finally{ri=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?_a(e):""}function Z0(e){switch(e.tag){case 5:return _a(e.type);case 16:return _a("Lazy");case 13:return _a("Suspense");case 19:return _a("SuspenseList");case 0:case 2:case 15:return e=ni(e.type,!1),e;case 11:return e=ni(e.type.render,!1),e;case 1:return e=ni(e.type,!0),e;default:return""}}function Wi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ln:return"Fragment";case In:return"Portal";case Fi:return"Profiler";case Hl:return"StrictMode";case Di:return"Suspense";case Bi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Gu:return(e.displayName||"Context")+".Consumer";case Yu:return(e._context.displayName||"Context")+".Provider";case Yl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Gl:return t=e.displayName||null,t!==null?t:Wi(e.type)||"Memo";case Hr:t=e._payload,e=e._init;try{return Wi(e(t))}catch{}}return null}function J0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Wi(t);case 8:return t===Hl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function on(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ef(e){var t=Xu(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,o=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function xs(e){e._valueTracker||(e._valueTracker=ef(e))}function qu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),a="";return e&&(a=Xu(e)?e.checked?"true":"false":e.value),e=a,e!==r?(t.setValue(e),!0):!1}function Js(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Vi(e,t){var r=t.checked;return ot({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Kc(e,t){var r=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;r=on(t.value!=null?t.value:r),e._wrapperState={initialChecked:a,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Qu(e,t){t=t.checked,t!=null&&Ul(e,"checked",t,!1)}function Ui(e,t){Qu(e,t);var r=on(t.value),a=t.type;if(r!=null)a==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Hi(e,t.type,r):t.hasOwnProperty("defaultValue")&&Hi(e,t.type,on(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Xc(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Hi(e,t,r){(t!=="number"||Js(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Na=Array.isArray;function Gn(e,t,r,a){if(e=e.options,t){t={};for(var s=0;s<r.length;s++)t["$"+r[s]]=!0;for(r=0;r<e.length;r++)s=t.hasOwnProperty("$"+e[r].value),e[r].selected!==s&&(e[r].selected=s),s&&a&&(e[r].defaultSelected=!0)}else{for(r=""+on(r),t=null,s=0;s<e.length;s++){if(e[s].value===r){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Yi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(q(91));return ot({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function qc(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(q(92));if(Na(r)){if(1<r.length)throw Error(q(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:on(r)}}function Zu(e,t){var r=on(t.value),a=on(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),a!=null&&(e.defaultValue=""+a)}function Qc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ju(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Gi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ju(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var vs,ep=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,r,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(vs=vs||document.createElement("div"),vs.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=vs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Wa(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Ta={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},tf=["Webkit","ms","Moz","O"];Object.keys(Ta).forEach(function(e){tf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ta[t]=Ta[e]})});function tp(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Ta.hasOwnProperty(e)&&Ta[e]?(""+t).trim():t+"px"}function rp(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var a=r.indexOf("--")===0,s=tp(r,t[r],a);r==="float"&&(r="cssFloat"),a?e.setProperty(r,s):e[r]=s}}var rf=ot({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ki(e,t){if(t){if(rf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(q(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(q(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(q(61))}if(t.style!=null&&typeof t.style!="object")throw Error(q(62))}}function Xi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qi=null;function Kl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qi=null,Kn=null,Xn=null;function Zc(e){if(e=us(e)){if(typeof Qi!="function")throw Error(q(280));var t=e.stateNode;t&&(t=Oo(t),Qi(e.stateNode,e.type,t))}}function np(e){Kn?Xn?Xn.push(e):Xn=[e]:Kn=e}function ap(){if(Kn){var e=Kn,t=Xn;if(Xn=Kn=null,Zc(e),t)for(e=0;e<t.length;e++)Zc(t[e])}}function sp(e,t){return e(t)}function op(){}var ai=!1;function ip(e,t,r){if(ai)return e(t,r);ai=!0;try{return sp(e,t,r)}finally{ai=!1,(Kn!==null||Xn!==null)&&(op(),ap())}}function Va(e,t){var r=e.stateNode;if(r===null)return null;var a=Oo(r);if(a===null)return null;r=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(q(231,t,typeof r));return r}var Zi=!1;if(Rr)try{var fa={};Object.defineProperty(fa,"passive",{get:function(){Zi=!0}}),window.addEventListener("test",fa,fa),window.removeEventListener("test",fa,fa)}catch{Zi=!1}function nf(e,t,r,a,s,o,i,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(m){this.onError(m)}}var Pa=!1,eo=null,to=!1,Ji=null,af={onError:function(e){Pa=!0,eo=e}};function sf(e,t,r,a,s,o,i,c,l){Pa=!1,eo=null,nf.apply(af,arguments)}function of(e,t,r,a,s,o,i,c,l){if(sf.apply(this,arguments),Pa){if(Pa){var d=eo;Pa=!1,eo=null}else throw Error(q(198));to||(to=!0,Ji=d)}}function En(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function lp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Jc(e){if(En(e)!==e)throw Error(q(188))}function lf(e){var t=e.alternate;if(!t){if(t=En(e),t===null)throw Error(q(188));return t!==e?null:e}for(var r=e,a=t;;){var s=r.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){r=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===r)return Jc(s),e;if(o===a)return Jc(s),t;o=o.sibling}throw Error(q(188))}if(r.return!==a.return)r=s,a=o;else{for(var i=!1,c=s.child;c;){if(c===r){i=!0,r=s,a=o;break}if(c===a){i=!0,a=s,r=o;break}c=c.sibling}if(!i){for(c=o.child;c;){if(c===r){i=!0,r=o,a=s;break}if(c===a){i=!0,a=o,r=s;break}c=c.sibling}if(!i)throw Error(q(189))}}if(r.alternate!==a)throw Error(q(190))}if(r.tag!==3)throw Error(q(188));return r.stateNode.current===r?e:t}function cp(e){return e=lf(e),e!==null?dp(e):null}function dp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=dp(e);if(t!==null)return t;e=e.sibling}return null}var up=Qt.unstable_scheduleCallback,ed=Qt.unstable_cancelCallback,cf=Qt.unstable_shouldYield,df=Qt.unstable_requestPaint,mt=Qt.unstable_now,uf=Qt.unstable_getCurrentPriorityLevel,Xl=Qt.unstable_ImmediatePriority,pp=Qt.unstable_UserBlockingPriority,ro=Qt.unstable_NormalPriority,pf=Qt.unstable_LowPriority,mp=Qt.unstable_IdlePriority,Ro=null,_r=null;function mf(e){if(_r&&typeof _r.onCommitFiberRoot=="function")try{_r.onCommitFiberRoot(Ro,e,void 0,(e.current.flags&128)===128)}catch{}}var mr=Math.clz32?Math.clz32:hf,ff=Math.log,gf=Math.LN2;function hf(e){return e>>>=0,e===0?32:31-(ff(e)/gf|0)|0}var ys=64,bs=4194304;function Sa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function no(e,t){var r=e.pendingLanes;if(r===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=r&268435455;if(i!==0){var c=i&~s;c!==0?a=Sa(c):(o&=i,o!==0&&(a=Sa(o)))}else i=r&~s,i!==0?a=Sa(i):o!==0&&(a=Sa(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)r=31-mr(t),s=1<<r,a|=e[r],t&=~s;return a}function xf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vf(e,t){for(var r=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-mr(o),c=1<<i,l=s[i];l===-1?(!(c&r)||c&a)&&(s[i]=xf(c,t)):l<=t&&(e.expiredLanes|=c),o&=~c}}function el(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function fp(){var e=ys;return ys<<=1,!(ys&4194240)&&(ys=64),e}function si(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function cs(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-mr(t),e[t]=r}function yf(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<r;){var s=31-mr(r),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,r&=~o}}function ql(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var a=31-mr(r),s=1<<a;s&t|e[a]&t&&(e[a]|=t),r&=~s}}var Be=0;function gp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var hp,Ql,xp,vp,yp,tl=!1,ws=[],Zr=null,Jr=null,en=null,Ua=new Map,Ha=new Map,Kr=[],bf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function td(e,t){switch(e){case"focusin":case"focusout":Zr=null;break;case"dragenter":case"dragleave":Jr=null;break;case"mouseover":case"mouseout":en=null;break;case"pointerover":case"pointerout":Ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ha.delete(t.pointerId)}}function ga(e,t,r,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:r,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=us(t),t!==null&&Ql(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function wf(e,t,r,a,s){switch(t){case"focusin":return Zr=ga(Zr,e,t,r,a,s),!0;case"dragenter":return Jr=ga(Jr,e,t,r,a,s),!0;case"mouseover":return en=ga(en,e,t,r,a,s),!0;case"pointerover":var o=s.pointerId;return Ua.set(o,ga(Ua.get(o)||null,e,t,r,a,s)),!0;case"gotpointercapture":return o=s.pointerId,Ha.set(o,ga(Ha.get(o)||null,e,t,r,a,s)),!0}return!1}function bp(e){var t=hn(e.target);if(t!==null){var r=En(t);if(r!==null){if(t=r.tag,t===13){if(t=lp(r),t!==null){e.blockedOn=t,yp(e.priority,function(){xp(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ds(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=rl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var a=new r.constructor(r.type,r);qi=a,r.target.dispatchEvent(a),qi=null}else return t=us(r),t!==null&&Ql(t),e.blockedOn=r,!1;t.shift()}return!0}function rd(e,t,r){Ds(e)&&r.delete(t)}function kf(){tl=!1,Zr!==null&&Ds(Zr)&&(Zr=null),Jr!==null&&Ds(Jr)&&(Jr=null),en!==null&&Ds(en)&&(en=null),Ua.forEach(rd),Ha.forEach(rd)}function ha(e,t){e.blockedOn===t&&(e.blockedOn=null,tl||(tl=!0,Qt.unstable_scheduleCallback(Qt.unstable_NormalPriority,kf)))}function Ya(e){function t(s){return ha(s,e)}if(0<ws.length){ha(ws[0],e);for(var r=1;r<ws.length;r++){var a=ws[r];a.blockedOn===e&&(a.blockedOn=null)}}for(Zr!==null&&ha(Zr,e),Jr!==null&&ha(Jr,e),en!==null&&ha(en,e),Ua.forEach(t),Ha.forEach(t),r=0;r<Kr.length;r++)a=Kr[r],a.blockedOn===e&&(a.blockedOn=null);for(;0<Kr.length&&(r=Kr[0],r.blockedOn===null);)bp(r),r.blockedOn===null&&Kr.shift()}var qn=Fr.ReactCurrentBatchConfig,ao=!0;function jf(e,t,r,a){var s=Be,o=qn.transition;qn.transition=null;try{Be=1,Zl(e,t,r,a)}finally{Be=s,qn.transition=o}}function _f(e,t,r,a){var s=Be,o=qn.transition;qn.transition=null;try{Be=4,Zl(e,t,r,a)}finally{Be=s,qn.transition=o}}function Zl(e,t,r,a){if(ao){var s=rl(e,t,r,a);if(s===null)gi(e,t,a,so,r),td(e,a);else if(wf(s,e,t,r,a))a.stopPropagation();else if(td(e,a),t&4&&-1<bf.indexOf(e)){for(;s!==null;){var o=us(s);if(o!==null&&hp(o),o=rl(e,t,r,a),o===null&&gi(e,t,a,so,r),o===s)break;s=o}s!==null&&a.stopPropagation()}else gi(e,t,a,null,r)}}var so=null;function rl(e,t,r,a){if(so=null,e=Kl(a),e=hn(e),e!==null)if(t=En(e),t===null)e=null;else if(r=t.tag,r===13){if(e=lp(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return so=e,null}function wp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(uf()){case Xl:return 1;case pp:return 4;case ro:case pf:return 16;case mp:return 536870912;default:return 16}default:return 16}}var qr=null,Jl=null,Bs=null;function kp(){if(Bs)return Bs;var e,t=Jl,r=t.length,a,s="value"in qr?qr.value:qr.textContent,o=s.length;for(e=0;e<r&&t[e]===s[e];e++);var i=r-e;for(a=1;a<=i&&t[r-a]===s[o-a];a++);return Bs=s.slice(e,1<a?1-a:void 0)}function Ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ks(){return!0}function nd(){return!1}function Jt(e){function t(r,a,s,o,i){this._reactName=r,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?ks:nd,this.isPropagationStopped=nd,this}return ot(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ks)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ks)},persist:function(){},isPersistent:ks}),t}var da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ec=Jt(da),ds=ot({},da,{view:0,detail:0}),Nf=Jt(ds),oi,ii,xa,Io=ot({},ds,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xa&&(xa&&e.type==="mousemove"?(oi=e.screenX-xa.screenX,ii=e.screenY-xa.screenY):ii=oi=0,xa=e),oi)},movementY:function(e){return"movementY"in e?e.movementY:ii}}),ad=Jt(Io),Sf=ot({},Io,{dataTransfer:0}),Cf=Jt(Sf),Mf=ot({},ds,{relatedTarget:0}),li=Jt(Mf),zf=ot({},da,{animationName:0,elapsedTime:0,pseudoElement:0}),Ef=Jt(zf),$f=ot({},da,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tf=Jt($f),Pf=ot({},da,{data:0}),sd=Jt(Pf),Rf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},If={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Lf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Af(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Lf[e])?!!t[e]:!1}function tc(){return Af}var Of=ot({},ds,{key:function(e){if(e.key){var t=Rf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?If[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tc,charCode:function(e){return e.type==="keypress"?Ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ff=Jt(Of),Df=ot({},Io,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),od=Jt(Df),Bf=ot({},ds,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tc}),Wf=Jt(Bf),Vf=ot({},da,{propertyName:0,elapsedTime:0,pseudoElement:0}),Uf=Jt(Vf),Hf=ot({},Io,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Yf=Jt(Hf),Gf=[9,13,27,32],rc=Rr&&"CompositionEvent"in window,Ra=null;Rr&&"documentMode"in document&&(Ra=document.documentMode);var Kf=Rr&&"TextEvent"in window&&!Ra,jp=Rr&&(!rc||Ra&&8<Ra&&11>=Ra),id=" ",ld=!1;function _p(e,t){switch(e){case"keyup":return Gf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Np(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function Xf(e,t){switch(e){case"compositionend":return Np(t);case"keypress":return t.which!==32?null:(ld=!0,id);case"textInput":return e=t.data,e===id&&ld?null:e;default:return null}}function qf(e,t){if(An)return e==="compositionend"||!rc&&_p(e,t)?(e=kp(),Bs=Jl=qr=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return jp&&t.locale!=="ko"?null:t.data;default:return null}}var Qf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Qf[e.type]:t==="textarea"}function Sp(e,t,r,a){np(a),t=oo(t,"onChange"),0<t.length&&(r=new ec("onChange","change",null,r,a),e.push({event:r,listeners:t}))}var Ia=null,Ga=null;function Zf(e){Ap(e,0)}function Lo(e){var t=Dn(e);if(qu(t))return e}function Jf(e,t){if(e==="change")return t}var Cp=!1;if(Rr){var ci;if(Rr){var di="oninput"in document;if(!di){var dd=document.createElement("div");dd.setAttribute("oninput","return;"),di=typeof dd.oninput=="function"}ci=di}else ci=!1;Cp=ci&&(!document.documentMode||9<document.documentMode)}function ud(){Ia&&(Ia.detachEvent("onpropertychange",Mp),Ga=Ia=null)}function Mp(e){if(e.propertyName==="value"&&Lo(Ga)){var t=[];Sp(t,Ga,e,Kl(e)),ip(Zf,t)}}function eg(e,t,r){e==="focusin"?(ud(),Ia=t,Ga=r,Ia.attachEvent("onpropertychange",Mp)):e==="focusout"&&ud()}function tg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Lo(Ga)}function rg(e,t){if(e==="click")return Lo(t)}function ng(e,t){if(e==="input"||e==="change")return Lo(t)}function ag(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var gr=typeof Object.is=="function"?Object.is:ag;function Ka(e,t){if(gr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(a=0;a<r.length;a++){var s=r[a];if(!Oi.call(t,s)||!gr(e[s],t[s]))return!1}return!0}function pd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function md(e,t){var r=pd(e);e=0;for(var a;r;){if(r.nodeType===3){if(a=e+r.textContent.length,e<=t&&a>=t)return{node:r,offset:t-e};e=a}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=pd(r)}}function zp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ep(){for(var e=window,t=Js();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Js(e.document)}return t}function nc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function sg(e){var t=Ep(),r=e.focusedElem,a=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&zp(r.ownerDocument.documentElement,r)){if(a!==null&&nc(r)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=r.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=md(r,o);var i=md(r,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var og=Rr&&"documentMode"in document&&11>=document.documentMode,On=null,nl=null,La=null,al=!1;function fd(e,t,r){var a=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;al||On==null||On!==Js(a)||(a=On,"selectionStart"in a&&nc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),La&&Ka(La,a)||(La=a,a=oo(nl,"onSelect"),0<a.length&&(t=new ec("onSelect","select",null,t,r),e.push({event:t,listeners:a}),t.target=On)))}function js(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Fn={animationend:js("Animation","AnimationEnd"),animationiteration:js("Animation","AnimationIteration"),animationstart:js("Animation","AnimationStart"),transitionend:js("Transition","TransitionEnd")},ui={},$p={};Rr&&($p=document.createElement("div").style,"AnimationEvent"in window||(delete Fn.animationend.animation,delete Fn.animationiteration.animation,delete Fn.animationstart.animation),"TransitionEvent"in window||delete Fn.transitionend.transition);function Ao(e){if(ui[e])return ui[e];if(!Fn[e])return e;var t=Fn[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in $p)return ui[e]=t[r];return e}var Tp=Ao("animationend"),Pp=Ao("animationiteration"),Rp=Ao("animationstart"),Ip=Ao("transitionend"),Lp=new Map,gd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cn(e,t){Lp.set(e,t),zn(t,[e])}for(var pi=0;pi<gd.length;pi++){var mi=gd[pi],ig=mi.toLowerCase(),lg=mi[0].toUpperCase()+mi.slice(1);cn(ig,"on"+lg)}cn(Tp,"onAnimationEnd");cn(Pp,"onAnimationIteration");cn(Rp,"onAnimationStart");cn("dblclick","onDoubleClick");cn("focusin","onFocus");cn("focusout","onBlur");cn(Ip,"onTransitionEnd");ea("onMouseEnter",["mouseout","mouseover"]);ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));zn("onBeforeInput",["compositionend","keypress","textInput","paste"]);zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ca="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ca));function hd(e,t,r){var a=e.type||"unknown-event";e.currentTarget=r,of(a,t,void 0,e),e.currentTarget=null}function Ap(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var a=e[r],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var c=a[i],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==o&&s.isPropagationStopped())break e;hd(s,c,d),o=l}else for(i=0;i<a.length;i++){if(c=a[i],l=c.instance,d=c.currentTarget,c=c.listener,l!==o&&s.isPropagationStopped())break e;hd(s,c,d),o=l}}}if(to)throw e=Ji,to=!1,Ji=null,e}function qe(e,t){var r=t[cl];r===void 0&&(r=t[cl]=new Set);var a=e+"__bubble";r.has(a)||(Op(t,e,2,!1),r.add(a))}function fi(e,t,r){var a=0;t&&(a|=4),Op(r,e,a,t)}var _s="_reactListening"+Math.random().toString(36).slice(2);function Xa(e){if(!e[_s]){e[_s]=!0,Hu.forEach(function(r){r!=="selectionchange"&&(cg.has(r)||fi(r,!1,e),fi(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_s]||(t[_s]=!0,fi("selectionchange",!1,t))}}function Op(e,t,r,a){switch(wp(t)){case 1:var s=jf;break;case 4:s=_f;break;default:s=Zl}r=s.bind(null,t,r,e),s=void 0,!Zi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,r,{capture:!0,passive:s}):e.addEventListener(t,r,!0):s!==void 0?e.addEventListener(t,r,{passive:s}):e.addEventListener(t,r,!1)}function gi(e,t,r,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var c=a.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;i=i.return}for(;c!==null;){if(i=hn(c),i===null)return;if(l=i.tag,l===5||l===6){a=o=i;continue e}c=c.parentNode}}a=a.return}ip(function(){var d=o,m=Kl(r),f=[];e:{var u=Lp.get(e);if(u!==void 0){var v=ec,y=e;switch(e){case"keypress":if(Ws(r)===0)break e;case"keydown":case"keyup":v=Ff;break;case"focusin":y="focus",v=li;break;case"focusout":y="blur",v=li;break;case"beforeblur":case"afterblur":v=li;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=ad;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Cf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Wf;break;case Tp:case Pp:case Rp:v=Ef;break;case Ip:v=Uf;break;case"scroll":v=Nf;break;case"wheel":v=Yf;break;case"copy":case"cut":case"paste":v=Tf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=od}var k=(t&4)!==0,j=!k&&e==="scroll",x=k?u!==null?u+"Capture":null:u;k=[];for(var h=d,g;h!==null;){g=h;var _=g.stateNode;if(g.tag===5&&_!==null&&(g=_,x!==null&&(_=Va(h,x),_!=null&&k.push(qa(h,_,g)))),j)break;h=h.return}0<k.length&&(u=new v(u,y,null,r,m),f.push({event:u,listeners:k}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",u&&r!==qi&&(y=r.relatedTarget||r.fromElement)&&(hn(y)||y[Ir]))break e;if((v||u)&&(u=m.window===m?m:(u=m.ownerDocument)?u.defaultView||u.parentWindow:window,v?(y=r.relatedTarget||r.toElement,v=d,y=y?hn(y):null,y!==null&&(j=En(y),y!==j||y.tag!==5&&y.tag!==6)&&(y=null)):(v=null,y=d),v!==y)){if(k=ad,_="onMouseLeave",x="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(k=od,_="onPointerLeave",x="onPointerEnter",h="pointer"),j=v==null?u:Dn(v),g=y==null?u:Dn(y),u=new k(_,h+"leave",v,r,m),u.target=j,u.relatedTarget=g,_=null,hn(m)===d&&(k=new k(x,h+"enter",y,r,m),k.target=g,k.relatedTarget=j,_=k),j=_,v&&y)t:{for(k=v,x=y,h=0,g=k;g;g=Pn(g))h++;for(g=0,_=x;_;_=Pn(_))g++;for(;0<h-g;)k=Pn(k),h--;for(;0<g-h;)x=Pn(x),g--;for(;h--;){if(k===x||x!==null&&k===x.alternate)break t;k=Pn(k),x=Pn(x)}k=null}else k=null;v!==null&&xd(f,u,v,k,!1),y!==null&&j!==null&&xd(f,j,y,k,!0)}}e:{if(u=d?Dn(d):window,v=u.nodeName&&u.nodeName.toLowerCase(),v==="select"||v==="input"&&u.type==="file")var C=Jf;else if(cd(u))if(Cp)C=ng;else{C=tg;var $=eg}else(v=u.nodeName)&&v.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(C=rg);if(C&&(C=C(e,d))){Sp(f,C,r,m);break e}$&&$(e,u,d),e==="focusout"&&($=u._wrapperState)&&$.controlled&&u.type==="number"&&Hi(u,"number",u.value)}switch($=d?Dn(d):window,e){case"focusin":(cd($)||$.contentEditable==="true")&&(On=$,nl=d,La=null);break;case"focusout":La=nl=On=null;break;case"mousedown":al=!0;break;case"contextmenu":case"mouseup":case"dragend":al=!1,fd(f,r,m);break;case"selectionchange":if(og)break;case"keydown":case"keyup":fd(f,r,m)}var E;if(rc)e:{switch(e){case"compositionstart":var M="onCompositionStart";break e;case"compositionend":M="onCompositionEnd";break e;case"compositionupdate":M="onCompositionUpdate";break e}M=void 0}else An?_p(e,r)&&(M="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(M="onCompositionStart");M&&(jp&&r.locale!=="ko"&&(An||M!=="onCompositionStart"?M==="onCompositionEnd"&&An&&(E=kp()):(qr=m,Jl="value"in qr?qr.value:qr.textContent,An=!0)),$=oo(d,M),0<$.length&&(M=new sd(M,e,null,r,m),f.push({event:M,listeners:$}),E?M.data=E:(E=Np(r),E!==null&&(M.data=E)))),(E=Kf?Xf(e,r):qf(e,r))&&(d=oo(d,"onBeforeInput"),0<d.length&&(m=new sd("onBeforeInput","beforeinput",null,r,m),f.push({event:m,listeners:d}),m.data=E))}Ap(f,t)})}function qa(e,t,r){return{instance:e,listener:t,currentTarget:r}}function oo(e,t){for(var r=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=Va(e,r),o!=null&&a.unshift(qa(e,o,s)),o=Va(e,t),o!=null&&a.push(qa(e,o,s))),e=e.return}return a}function Pn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function xd(e,t,r,a,s){for(var o=t._reactName,i=[];r!==null&&r!==a;){var c=r,l=c.alternate,d=c.stateNode;if(l!==null&&l===a)break;c.tag===5&&d!==null&&(c=d,s?(l=Va(r,o),l!=null&&i.unshift(qa(r,l,c))):s||(l=Va(r,o),l!=null&&i.push(qa(r,l,c)))),r=r.return}i.length!==0&&e.push({event:t,listeners:i})}var dg=/\r\n?/g,ug=/\u0000|\uFFFD/g;function vd(e){return(typeof e=="string"?e:""+e).replace(dg,`
`).replace(ug,"")}function Ns(e,t,r){if(t=vd(t),vd(e)!==t&&r)throw Error(q(425))}function io(){}var sl=null,ol=null;function il(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ll=typeof setTimeout=="function"?setTimeout:void 0,pg=typeof clearTimeout=="function"?clearTimeout:void 0,yd=typeof Promise=="function"?Promise:void 0,mg=typeof queueMicrotask=="function"?queueMicrotask:typeof yd<"u"?function(e){return yd.resolve(null).then(e).catch(fg)}:ll;function fg(e){setTimeout(function(){throw e})}function hi(e,t){var r=t,a=0;do{var s=r.nextSibling;if(e.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(a===0){e.removeChild(s),Ya(t);return}a--}else r!=="$"&&r!=="$?"&&r!=="$!"||a++;r=s}while(r);Ya(t)}function tn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function bd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var ua=Math.random().toString(36).slice(2),jr="__reactFiber$"+ua,Qa="__reactProps$"+ua,Ir="__reactContainer$"+ua,cl="__reactEvents$"+ua,gg="__reactListeners$"+ua,hg="__reactHandles$"+ua;function hn(e){var t=e[jr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ir]||r[jr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=bd(e);e!==null;){if(r=e[jr])return r;e=bd(e)}return t}e=r,r=e.parentNode}return null}function us(e){return e=e[jr]||e[Ir],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Dn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(q(33))}function Oo(e){return e[Qa]||null}var dl=[],Bn=-1;function dn(e){return{current:e}}function Qe(e){0>Bn||(e.current=dl[Bn],dl[Bn]=null,Bn--)}function Ge(e,t){Bn++,dl[Bn]=e.current,e.current=t}var ln={},Et=dn(ln),Wt=dn(!1),jn=ln;function ta(e,t){var r=e.type.contextTypes;if(!r)return ln;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in r)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Vt(e){return e=e.childContextTypes,e!=null}function lo(){Qe(Wt),Qe(Et)}function wd(e,t,r){if(Et.current!==ln)throw Error(q(168));Ge(Et,t),Ge(Wt,r)}function Fp(e,t,r){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return r;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(q(108,J0(e)||"Unknown",s));return ot({},r,a)}function co(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ln,jn=Et.current,Ge(Et,e),Ge(Wt,Wt.current),!0}function kd(e,t,r){var a=e.stateNode;if(!a)throw Error(q(169));r?(e=Fp(e,t,jn),a.__reactInternalMemoizedMergedChildContext=e,Qe(Wt),Qe(Et),Ge(Et,e)):Qe(Wt),Ge(Wt,r)}var Er=null,Fo=!1,xi=!1;function Dp(e){Er===null?Er=[e]:Er.push(e)}function xg(e){Fo=!0,Dp(e)}function un(){if(!xi&&Er!==null){xi=!0;var e=0,t=Be;try{var r=Er;for(Be=1;e<r.length;e++){var a=r[e];do a=a(!0);while(a!==null)}Er=null,Fo=!1}catch(s){throw Er!==null&&(Er=Er.slice(e+1)),up(Xl,un),s}finally{Be=t,xi=!1}}return null}var Wn=[],Vn=0,uo=null,po=0,tr=[],rr=0,_n=null,$r=1,Tr="";function fn(e,t){Wn[Vn++]=po,Wn[Vn++]=uo,uo=e,po=t}function Bp(e,t,r){tr[rr++]=$r,tr[rr++]=Tr,tr[rr++]=_n,_n=e;var a=$r;e=Tr;var s=32-mr(a)-1;a&=~(1<<s),r+=1;var o=32-mr(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,$r=1<<32-mr(t)+s|r<<s|a,Tr=o+e}else $r=1<<o|r<<s|a,Tr=e}function ac(e){e.return!==null&&(fn(e,1),Bp(e,1,0))}function sc(e){for(;e===uo;)uo=Wn[--Vn],Wn[Vn]=null,po=Wn[--Vn],Wn[Vn]=null;for(;e===_n;)_n=tr[--rr],tr[rr]=null,Tr=tr[--rr],tr[rr]=null,$r=tr[--rr],tr[rr]=null}var qt=null,Xt=null,tt=!1,dr=null;function Wp(e,t){var r=nr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function jd(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,qt=e,Xt=tn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,qt=e,Xt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=_n!==null?{id:$r,overflow:Tr}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=nr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,qt=e,Xt=null,!0):!1;default:return!1}}function ul(e){return(e.mode&1)!==0&&(e.flags&128)===0}function pl(e){if(tt){var t=Xt;if(t){var r=t;if(!jd(e,t)){if(ul(e))throw Error(q(418));t=tn(r.nextSibling);var a=qt;t&&jd(e,t)?Wp(a,r):(e.flags=e.flags&-4097|2,tt=!1,qt=e)}}else{if(ul(e))throw Error(q(418));e.flags=e.flags&-4097|2,tt=!1,qt=e}}}function _d(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;qt=e}function Ss(e){if(e!==qt)return!1;if(!tt)return _d(e),tt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!il(e.type,e.memoizedProps)),t&&(t=Xt)){if(ul(e))throw Vp(),Error(q(418));for(;t;)Wp(e,t),t=tn(t.nextSibling)}if(_d(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(q(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Xt=tn(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Xt=null}}else Xt=qt?tn(e.stateNode.nextSibling):null;return!0}function Vp(){for(var e=Xt;e;)e=tn(e.nextSibling)}function ra(){Xt=qt=null,tt=!1}function oc(e){dr===null?dr=[e]:dr.push(e)}var vg=Fr.ReactCurrentBatchConfig;function va(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(q(309));var a=r.stateNode}if(!a)throw Error(q(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var c=s.refs;i===null?delete c[o]:c[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(q(284));if(!r._owner)throw Error(q(290,e))}return e}function Cs(e,t){throw e=Object.prototype.toString.call(t),Error(q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Nd(e){var t=e._init;return t(e._payload)}function Up(e){function t(x,h){if(e){var g=x.deletions;g===null?(x.deletions=[h],x.flags|=16):g.push(h)}}function r(x,h){if(!e)return null;for(;h!==null;)t(x,h),h=h.sibling;return null}function a(x,h){for(x=new Map;h!==null;)h.key!==null?x.set(h.key,h):x.set(h.index,h),h=h.sibling;return x}function s(x,h){return x=sn(x,h),x.index=0,x.sibling=null,x}function o(x,h,g){return x.index=g,e?(g=x.alternate,g!==null?(g=g.index,g<h?(x.flags|=2,h):g):(x.flags|=2,h)):(x.flags|=1048576,h)}function i(x){return e&&x.alternate===null&&(x.flags|=2),x}function c(x,h,g,_){return h===null||h.tag!==6?(h=_i(g,x.mode,_),h.return=x,h):(h=s(h,g),h.return=x,h)}function l(x,h,g,_){var C=g.type;return C===Ln?m(x,h,g.props.children,_,g.key):h!==null&&(h.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Hr&&Nd(C)===h.type)?(_=s(h,g.props),_.ref=va(x,h,g),_.return=x,_):(_=Xs(g.type,g.key,g.props,null,x.mode,_),_.ref=va(x,h,g),_.return=x,_)}function d(x,h,g,_){return h===null||h.tag!==4||h.stateNode.containerInfo!==g.containerInfo||h.stateNode.implementation!==g.implementation?(h=Ni(g,x.mode,_),h.return=x,h):(h=s(h,g.children||[]),h.return=x,h)}function m(x,h,g,_,C){return h===null||h.tag!==7?(h=wn(g,x.mode,_,C),h.return=x,h):(h=s(h,g),h.return=x,h)}function f(x,h,g){if(typeof h=="string"&&h!==""||typeof h=="number")return h=_i(""+h,x.mode,g),h.return=x,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case hs:return g=Xs(h.type,h.key,h.props,null,x.mode,g),g.ref=va(x,null,h),g.return=x,g;case In:return h=Ni(h,x.mode,g),h.return=x,h;case Hr:var _=h._init;return f(x,_(h._payload),g)}if(Na(h)||ma(h))return h=wn(h,x.mode,g,null),h.return=x,h;Cs(x,h)}return null}function u(x,h,g,_){var C=h!==null?h.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return C!==null?null:c(x,h,""+g,_);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case hs:return g.key===C?l(x,h,g,_):null;case In:return g.key===C?d(x,h,g,_):null;case Hr:return C=g._init,u(x,h,C(g._payload),_)}if(Na(g)||ma(g))return C!==null?null:m(x,h,g,_,null);Cs(x,g)}return null}function v(x,h,g,_,C){if(typeof _=="string"&&_!==""||typeof _=="number")return x=x.get(g)||null,c(h,x,""+_,C);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case hs:return x=x.get(_.key===null?g:_.key)||null,l(h,x,_,C);case In:return x=x.get(_.key===null?g:_.key)||null,d(h,x,_,C);case Hr:var $=_._init;return v(x,h,g,$(_._payload),C)}if(Na(_)||ma(_))return x=x.get(g)||null,m(h,x,_,C,null);Cs(h,_)}return null}function y(x,h,g,_){for(var C=null,$=null,E=h,M=h=0,W=null;E!==null&&M<g.length;M++){E.index>M?(W=E,E=null):W=E.sibling;var B=u(x,E,g[M],_);if(B===null){E===null&&(E=W);break}e&&E&&B.alternate===null&&t(x,E),h=o(B,h,M),$===null?C=B:$.sibling=B,$=B,E=W}if(M===g.length)return r(x,E),tt&&fn(x,M),C;if(E===null){for(;M<g.length;M++)E=f(x,g[M],_),E!==null&&(h=o(E,h,M),$===null?C=E:$.sibling=E,$=E);return tt&&fn(x,M),C}for(E=a(x,E);M<g.length;M++)W=v(E,x,M,g[M],_),W!==null&&(e&&W.alternate!==null&&E.delete(W.key===null?M:W.key),h=o(W,h,M),$===null?C=W:$.sibling=W,$=W);return e&&E.forEach(function(re){return t(x,re)}),tt&&fn(x,M),C}function k(x,h,g,_){var C=ma(g);if(typeof C!="function")throw Error(q(150));if(g=C.call(g),g==null)throw Error(q(151));for(var $=C=null,E=h,M=h=0,W=null,B=g.next();E!==null&&!B.done;M++,B=g.next()){E.index>M?(W=E,E=null):W=E.sibling;var re=u(x,E,B.value,_);if(re===null){E===null&&(E=W);break}e&&E&&re.alternate===null&&t(x,E),h=o(re,h,M),$===null?C=re:$.sibling=re,$=re,E=W}if(B.done)return r(x,E),tt&&fn(x,M),C;if(E===null){for(;!B.done;M++,B=g.next())B=f(x,B.value,_),B!==null&&(h=o(B,h,M),$===null?C=B:$.sibling=B,$=B);return tt&&fn(x,M),C}for(E=a(x,E);!B.done;M++,B=g.next())B=v(E,x,M,B.value,_),B!==null&&(e&&B.alternate!==null&&E.delete(B.key===null?M:B.key),h=o(B,h,M),$===null?C=B:$.sibling=B,$=B);return e&&E.forEach(function(U){return t(x,U)}),tt&&fn(x,M),C}function j(x,h,g,_){if(typeof g=="object"&&g!==null&&g.type===Ln&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case hs:e:{for(var C=g.key,$=h;$!==null;){if($.key===C){if(C=g.type,C===Ln){if($.tag===7){r(x,$.sibling),h=s($,g.props.children),h.return=x,x=h;break e}}else if($.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Hr&&Nd(C)===$.type){r(x,$.sibling),h=s($,g.props),h.ref=va(x,$,g),h.return=x,x=h;break e}r(x,$);break}else t(x,$);$=$.sibling}g.type===Ln?(h=wn(g.props.children,x.mode,_,g.key),h.return=x,x=h):(_=Xs(g.type,g.key,g.props,null,x.mode,_),_.ref=va(x,h,g),_.return=x,x=_)}return i(x);case In:e:{for($=g.key;h!==null;){if(h.key===$)if(h.tag===4&&h.stateNode.containerInfo===g.containerInfo&&h.stateNode.implementation===g.implementation){r(x,h.sibling),h=s(h,g.children||[]),h.return=x,x=h;break e}else{r(x,h);break}else t(x,h);h=h.sibling}h=Ni(g,x.mode,_),h.return=x,x=h}return i(x);case Hr:return $=g._init,j(x,h,$(g._payload),_)}if(Na(g))return y(x,h,g,_);if(ma(g))return k(x,h,g,_);Cs(x,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,h!==null&&h.tag===6?(r(x,h.sibling),h=s(h,g),h.return=x,x=h):(r(x,h),h=_i(g,x.mode,_),h.return=x,x=h),i(x)):r(x,h)}return j}var na=Up(!0),Hp=Up(!1),mo=dn(null),fo=null,Un=null,ic=null;function lc(){ic=Un=fo=null}function cc(e){var t=mo.current;Qe(mo),e._currentValue=t}function ml(e,t,r){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===r)break;e=e.return}}function Qn(e,t){fo=e,ic=Un=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Dt=!0),e.firstContext=null)}function sr(e){var t=e._currentValue;if(ic!==e)if(e={context:e,memoizedValue:t,next:null},Un===null){if(fo===null)throw Error(q(308));Un=e,fo.dependencies={lanes:0,firstContext:e}}else Un=Un.next=e;return t}var xn=null;function dc(e){xn===null?xn=[e]:xn.push(e)}function Yp(e,t,r,a){var s=t.interleaved;return s===null?(r.next=r,dc(t)):(r.next=s.next,s.next=r),t.interleaved=r,Lr(e,a)}function Lr(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Yr=!1;function uc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Gp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function rn(e,t,r){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,Le&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Lr(e,r)}return s=a.interleaved,s===null?(t.next=t,dc(a)):(t.next=s.next,s.next=t),a.interleaved=t,Lr(e,r)}function Vs(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,r|=a,t.lanes=r,ql(e,r)}}function Sd(e,t){var r=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,r===a)){var s=null,o=null;if(r=r.firstBaseUpdate,r!==null){do{var i={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};o===null?s=o=i:o=o.next=i,r=r.next}while(r!==null);o===null?s=o=t:o=o.next=t}else s=o=t;r={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function go(e,t,r,a){var s=e.updateQueue;Yr=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var l=c,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var m=e.alternate;m!==null&&(m=m.updateQueue,c=m.lastBaseUpdate,c!==i&&(c===null?m.firstBaseUpdate=d:c.next=d,m.lastBaseUpdate=l))}if(o!==null){var f=s.baseState;i=0,m=d=l=null,c=o;do{var u=c.lane,v=c.eventTime;if((a&u)===u){m!==null&&(m=m.next={eventTime:v,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var y=e,k=c;switch(u=t,v=r,k.tag){case 1:if(y=k.payload,typeof y=="function"){f=y.call(v,f,u);break e}f=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=k.payload,u=typeof y=="function"?y.call(v,f,u):y,u==null)break e;f=ot({},f,u);break e;case 2:Yr=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[c]:u.push(c))}else v={eventTime:v,lane:u,tag:c.tag,payload:c.payload,callback:c.callback,next:null},m===null?(d=m=v,l=f):m=m.next=v,i|=u;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;u=c,c=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(m===null&&(l=f),s.baseState=l,s.firstBaseUpdate=d,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Sn|=i,e.lanes=i,e.memoizedState=f}}function Cd(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=r,typeof s!="function")throw Error(q(191,s));s.call(a)}}}var ps={},Nr=dn(ps),Za=dn(ps),Ja=dn(ps);function vn(e){if(e===ps)throw Error(q(174));return e}function pc(e,t){switch(Ge(Ja,t),Ge(Za,e),Ge(Nr,ps),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Gi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Gi(t,e)}Qe(Nr),Ge(Nr,t)}function aa(){Qe(Nr),Qe(Za),Qe(Ja)}function Kp(e){vn(Ja.current);var t=vn(Nr.current),r=Gi(t,e.type);t!==r&&(Ge(Za,e),Ge(Nr,r))}function mc(e){Za.current===e&&(Qe(Nr),Qe(Za))}var at=dn(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var vi=[];function fc(){for(var e=0;e<vi.length;e++)vi[e]._workInProgressVersionPrimary=null;vi.length=0}var Us=Fr.ReactCurrentDispatcher,yi=Fr.ReactCurrentBatchConfig,Nn=0,st=null,vt=null,wt=null,xo=!1,Aa=!1,es=0,yg=0;function Ct(){throw Error(q(321))}function gc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!gr(e[r],t[r]))return!1;return!0}function hc(e,t,r,a,s,o){if(Nn=o,st=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Us.current=e===null||e.memoizedState===null?jg:_g,e=r(a,s),Aa){o=0;do{if(Aa=!1,es=0,25<=o)throw Error(q(301));o+=1,wt=vt=null,t.updateQueue=null,Us.current=Ng,e=r(a,s)}while(Aa)}if(Us.current=vo,t=vt!==null&&vt.next!==null,Nn=0,wt=vt=st=null,xo=!1,t)throw Error(q(300));return e}function xc(){var e=es!==0;return es=0,e}function kr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wt===null?st.memoizedState=wt=e:wt=wt.next=e,wt}function or(){if(vt===null){var e=st.alternate;e=e!==null?e.memoizedState:null}else e=vt.next;var t=wt===null?st.memoizedState:wt.next;if(t!==null)wt=t,vt=e;else{if(e===null)throw Error(q(310));vt=e,e={memoizedState:vt.memoizedState,baseState:vt.baseState,baseQueue:vt.baseQueue,queue:vt.queue,next:null},wt===null?st.memoizedState=wt=e:wt=wt.next=e}return wt}function ts(e,t){return typeof t=="function"?t(e):t}function bi(e){var t=or(),r=t.queue;if(r===null)throw Error(q(311));r.lastRenderedReducer=e;var a=vt,s=a.baseQueue,o=r.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,r.pending=null}if(s!==null){o=s.next,a=a.baseState;var c=i=null,l=null,d=o;do{var m=d.lane;if((Nn&m)===m)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var f={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=f,i=a):l=l.next=f,st.lanes|=m,Sn|=m}d=d.next}while(d!==null&&d!==o);l===null?i=a:l.next=c,gr(a,t.memoizedState)||(Dt=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=l,r.lastRenderedState=a}if(e=r.interleaved,e!==null){s=e;do o=s.lane,st.lanes|=o,Sn|=o,s=s.next;while(s!==e)}else s===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function wi(e){var t=or(),r=t.queue;if(r===null)throw Error(q(311));r.lastRenderedReducer=e;var a=r.dispatch,s=r.pending,o=t.memoizedState;if(s!==null){r.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);gr(o,t.memoizedState)||(Dt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),r.lastRenderedState=o}return[o,a]}function Xp(){}function qp(e,t){var r=st,a=or(),s=t(),o=!gr(a.memoizedState,s);if(o&&(a.memoizedState=s,Dt=!0),a=a.queue,vc(Jp.bind(null,r,a,e),[e]),a.getSnapshot!==t||o||wt!==null&&wt.memoizedState.tag&1){if(r.flags|=2048,rs(9,Zp.bind(null,r,a,s,t),void 0,null),kt===null)throw Error(q(349));Nn&30||Qp(r,t,s)}return s}function Qp(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=st.updateQueue,t===null?(t={lastEffect:null,stores:null},st.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Zp(e,t,r,a){t.value=r,t.getSnapshot=a,em(t)&&tm(e)}function Jp(e,t,r){return r(function(){em(t)&&tm(e)})}function em(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!gr(e,r)}catch{return!0}}function tm(e){var t=Lr(e,1);t!==null&&fr(t,e,1,-1)}function Md(e){var t=kr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:e},t.queue=e,e=e.dispatch=kg.bind(null,st,e),[t.memoizedState,e]}function rs(e,t,r,a){return e={tag:e,create:t,destroy:r,deps:a,next:null},t=st.updateQueue,t===null?(t={lastEffect:null,stores:null},st.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(a=r.next,r.next=e,e.next=a,t.lastEffect=e)),e}function rm(){return or().memoizedState}function Hs(e,t,r,a){var s=kr();st.flags|=e,s.memoizedState=rs(1|t,r,void 0,a===void 0?null:a)}function Do(e,t,r,a){var s=or();a=a===void 0?null:a;var o=void 0;if(vt!==null){var i=vt.memoizedState;if(o=i.destroy,a!==null&&gc(a,i.deps)){s.memoizedState=rs(t,r,o,a);return}}st.flags|=e,s.memoizedState=rs(1|t,r,o,a)}function zd(e,t){return Hs(8390656,8,e,t)}function vc(e,t){return Do(2048,8,e,t)}function nm(e,t){return Do(4,2,e,t)}function am(e,t){return Do(4,4,e,t)}function sm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function om(e,t,r){return r=r!=null?r.concat([e]):null,Do(4,4,sm.bind(null,t,e),r)}function yc(){}function im(e,t){var r=or();t=t===void 0?null:t;var a=r.memoizedState;return a!==null&&t!==null&&gc(t,a[1])?a[0]:(r.memoizedState=[e,t],e)}function lm(e,t){var r=or();t=t===void 0?null:t;var a=r.memoizedState;return a!==null&&t!==null&&gc(t,a[1])?a[0]:(e=e(),r.memoizedState=[e,t],e)}function cm(e,t,r){return Nn&21?(gr(r,t)||(r=fp(),st.lanes|=r,Sn|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Dt=!0),e.memoizedState=r)}function bg(e,t){var r=Be;Be=r!==0&&4>r?r:4,e(!0);var a=yi.transition;yi.transition={};try{e(!1),t()}finally{Be=r,yi.transition=a}}function dm(){return or().memoizedState}function wg(e,t,r){var a=an(e);if(r={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null},um(e))pm(t,r);else if(r=Yp(e,t,r,a),r!==null){var s=Rt();fr(r,e,a,s),mm(r,t,a)}}function kg(e,t,r){var a=an(e),s={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null};if(um(e))pm(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,c=o(i,r);if(s.hasEagerState=!0,s.eagerState=c,gr(c,i)){var l=t.interleaved;l===null?(s.next=s,dc(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}r=Yp(e,t,s,a),r!==null&&(s=Rt(),fr(r,e,a,s),mm(r,t,a))}}function um(e){var t=e.alternate;return e===st||t!==null&&t===st}function pm(e,t){Aa=xo=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function mm(e,t,r){if(r&4194240){var a=t.lanes;a&=e.pendingLanes,r|=a,t.lanes=r,ql(e,r)}}var vo={readContext:sr,useCallback:Ct,useContext:Ct,useEffect:Ct,useImperativeHandle:Ct,useInsertionEffect:Ct,useLayoutEffect:Ct,useMemo:Ct,useReducer:Ct,useRef:Ct,useState:Ct,useDebugValue:Ct,useDeferredValue:Ct,useTransition:Ct,useMutableSource:Ct,useSyncExternalStore:Ct,useId:Ct,unstable_isNewReconciler:!1},jg={readContext:sr,useCallback:function(e,t){return kr().memoizedState=[e,t===void 0?null:t],e},useContext:sr,useEffect:zd,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Hs(4194308,4,sm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Hs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Hs(4,2,e,t)},useMemo:function(e,t){var r=kr();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var a=kr();return t=r!==void 0?r(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=wg.bind(null,st,e),[a.memoizedState,e]},useRef:function(e){var t=kr();return e={current:e},t.memoizedState=e},useState:Md,useDebugValue:yc,useDeferredValue:function(e){return kr().memoizedState=e},useTransition:function(){var e=Md(!1),t=e[0];return e=bg.bind(null,e[1]),kr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var a=st,s=kr();if(tt){if(r===void 0)throw Error(q(407));r=r()}else{if(r=t(),kt===null)throw Error(q(349));Nn&30||Qp(a,t,r)}s.memoizedState=r;var o={value:r,getSnapshot:t};return s.queue=o,zd(Jp.bind(null,a,o,e),[e]),a.flags|=2048,rs(9,Zp.bind(null,a,o,r,t),void 0,null),r},useId:function(){var e=kr(),t=kt.identifierPrefix;if(tt){var r=Tr,a=$r;r=(a&~(1<<32-mr(a)-1)).toString(32)+r,t=":"+t+"R"+r,r=es++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=yg++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_g={readContext:sr,useCallback:im,useContext:sr,useEffect:vc,useImperativeHandle:om,useInsertionEffect:nm,useLayoutEffect:am,useMemo:lm,useReducer:bi,useRef:rm,useState:function(){return bi(ts)},useDebugValue:yc,useDeferredValue:function(e){var t=or();return cm(t,vt.memoizedState,e)},useTransition:function(){var e=bi(ts)[0],t=or().memoizedState;return[e,t]},useMutableSource:Xp,useSyncExternalStore:qp,useId:dm,unstable_isNewReconciler:!1},Ng={readContext:sr,useCallback:im,useContext:sr,useEffect:vc,useImperativeHandle:om,useInsertionEffect:nm,useLayoutEffect:am,useMemo:lm,useReducer:wi,useRef:rm,useState:function(){return wi(ts)},useDebugValue:yc,useDeferredValue:function(e){var t=or();return vt===null?t.memoizedState=e:cm(t,vt.memoizedState,e)},useTransition:function(){var e=wi(ts)[0],t=or().memoizedState;return[e,t]},useMutableSource:Xp,useSyncExternalStore:qp,useId:dm,unstable_isNewReconciler:!1};function lr(e,t){if(e&&e.defaultProps){t=ot({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function fl(e,t,r,a){t=e.memoizedState,r=r(a,t),r=r==null?t:ot({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Bo={isMounted:function(e){return(e=e._reactInternals)?En(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var a=Rt(),s=an(e),o=Pr(a,s);o.payload=t,r!=null&&(o.callback=r),t=rn(e,o,s),t!==null&&(fr(t,e,s,a),Vs(t,e,s))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var a=Rt(),s=an(e),o=Pr(a,s);o.tag=1,o.payload=t,r!=null&&(o.callback=r),t=rn(e,o,s),t!==null&&(fr(t,e,s,a),Vs(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Rt(),a=an(e),s=Pr(r,a);s.tag=2,t!=null&&(s.callback=t),t=rn(e,s,a),t!==null&&(fr(t,e,a,r),Vs(t,e,a))}};function Ed(e,t,r,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!Ka(r,a)||!Ka(s,o):!0}function fm(e,t,r){var a=!1,s=ln,o=t.contextType;return typeof o=="object"&&o!==null?o=sr(o):(s=Vt(t)?jn:Et.current,a=t.contextTypes,o=(a=a!=null)?ta(e,s):ln),t=new t(r,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Bo,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function $d(e,t,r,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,a),t.state!==e&&Bo.enqueueReplaceState(t,t.state,null)}function gl(e,t,r,a){var s=e.stateNode;s.props=r,s.state=e.memoizedState,s.refs={},uc(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=sr(o):(o=Vt(t)?jn:Et.current,s.context=ta(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(fl(e,t,o,r),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Bo.enqueueReplaceState(s,s.state,null),go(e,r,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function sa(e,t){try{var r="",a=t;do r+=Z0(a),a=a.return;while(a);var s=r}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function ki(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function hl(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var Sg=typeof WeakMap=="function"?WeakMap:Map;function gm(e,t,r){r=Pr(-1,r),r.tag=3,r.payload={element:null};var a=t.value;return r.callback=function(){bo||(bo=!0,Sl=a),hl(e,t)},r}function hm(e,t,r){r=Pr(-1,r),r.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;r.payload=function(){return a(s)},r.callback=function(){hl(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(r.callback=function(){hl(e,t),typeof a!="function"&&(nn===null?nn=new Set([this]):nn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),r}function Td(e,t,r){var a=e.pingCache;if(a===null){a=e.pingCache=new Sg;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(r)||(s.add(r),e=Dg.bind(null,e,t,r),t.then(e,e))}function Pd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Rd(e,t,r,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Pr(-1,1),t.tag=2,rn(r,t,1))),r.lanes|=1),e)}var Cg=Fr.ReactCurrentOwner,Dt=!1;function Pt(e,t,r,a){t.child=e===null?Hp(t,null,r,a):na(t,e.child,r,a)}function Id(e,t,r,a,s){r=r.render;var o=t.ref;return Qn(t,s),a=hc(e,t,r,a,o,s),r=xc(),e!==null&&!Dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Ar(e,t,s)):(tt&&r&&ac(t),t.flags|=1,Pt(e,t,a,s),t.child)}function Ld(e,t,r,a,s){if(e===null){var o=r.type;return typeof o=="function"&&!Cc(o)&&o.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=o,xm(e,t,o,a,s)):(e=Xs(r.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(r=r.compare,r=r!==null?r:Ka,r(i,a)&&e.ref===t.ref)return Ar(e,t,s)}return t.flags|=1,e=sn(o,a),e.ref=t.ref,e.return=t,t.child=e}function xm(e,t,r,a,s){if(e!==null){var o=e.memoizedProps;if(Ka(o,a)&&e.ref===t.ref)if(Dt=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Dt=!0);else return t.lanes=e.lanes,Ar(e,t,s)}return xl(e,t,r,a,s)}function vm(e,t,r){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ge(Yn,Kt),Kt|=r;else{if(!(r&1073741824))return e=o!==null?o.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ge(Yn,Kt),Kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:r,Ge(Yn,Kt),Kt|=a}else o!==null?(a=o.baseLanes|r,t.memoizedState=null):a=r,Ge(Yn,Kt),Kt|=a;return Pt(e,t,s,r),t.child}function ym(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function xl(e,t,r,a,s){var o=Vt(r)?jn:Et.current;return o=ta(t,o),Qn(t,s),r=hc(e,t,r,a,o,s),a=xc(),e!==null&&!Dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Ar(e,t,s)):(tt&&a&&ac(t),t.flags|=1,Pt(e,t,r,s),t.child)}function Ad(e,t,r,a,s){if(Vt(r)){var o=!0;co(t)}else o=!1;if(Qn(t,s),t.stateNode===null)Ys(e,t),fm(t,r,a),gl(t,r,a,s),a=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var l=i.context,d=r.contextType;typeof d=="object"&&d!==null?d=sr(d):(d=Vt(r)?jn:Et.current,d=ta(t,d));var m=r.getDerivedStateFromProps,f=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==a||l!==d)&&$d(t,i,a,d),Yr=!1;var u=t.memoizedState;i.state=u,go(t,a,i,s),l=t.memoizedState,c!==a||u!==l||Wt.current||Yr?(typeof m=="function"&&(fl(t,r,m,a),l=t.memoizedState),(c=Yr||Ed(t,r,c,a,u,l,d))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=l),i.props=a,i.state=l,i.context=d,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,Gp(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:lr(t.type,c),i.props=d,f=t.pendingProps,u=i.context,l=r.contextType,typeof l=="object"&&l!==null?l=sr(l):(l=Vt(r)?jn:Et.current,l=ta(t,l));var v=r.getDerivedStateFromProps;(m=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==f||u!==l)&&$d(t,i,a,l),Yr=!1,u=t.memoizedState,i.state=u,go(t,a,i,s);var y=t.memoizedState;c!==f||u!==y||Wt.current||Yr?(typeof v=="function"&&(fl(t,r,v,a),y=t.memoizedState),(d=Yr||Ed(t,r,d,a,u,y,l)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=l,a=d):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),a=!1)}return vl(e,t,r,a,o,s)}function vl(e,t,r,a,s,o){ym(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&kd(t,r,!1),Ar(e,t,o);a=t.stateNode,Cg.current=t;var c=i&&typeof r.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=na(t,e.child,null,o),t.child=na(t,null,c,o)):Pt(e,t,c,o),t.memoizedState=a.state,s&&kd(t,r,!0),t.child}function bm(e){var t=e.stateNode;t.pendingContext?wd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&wd(e,t.context,!1),pc(e,t.containerInfo)}function Od(e,t,r,a,s){return ra(),oc(s),t.flags|=256,Pt(e,t,r,a),t.child}var yl={dehydrated:null,treeContext:null,retryLane:0};function bl(e){return{baseLanes:e,cachePool:null,transitions:null}}function wm(e,t,r){var a=t.pendingProps,s=at.current,o=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Ge(at,s&1),e===null)return pl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Uo(i,a,0,null),e=wn(e,a,r,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=bl(r),t.memoizedState=yl,e):bc(t,i));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Mg(e,t,i,a,c,s,r);if(o){o=a.fallback,i=t.mode,s=e.child,c=s.sibling;var l={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=l,t.deletions=null):(a=sn(s,l),a.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=sn(c,o):(o=wn(o,i,r,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?bl(r):{baseLanes:i.baseLanes|r,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~r,t.memoizedState=yl,a}return o=e.child,e=o.sibling,a=sn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=r),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a}function bc(e,t){return t=Uo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ms(e,t,r,a){return a!==null&&oc(a),na(t,e.child,null,r),e=bc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Mg(e,t,r,a,s,o,i){if(r)return t.flags&256?(t.flags&=-257,a=ki(Error(q(422))),Ms(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=Uo({mode:"visible",children:a.children},s,0,null),o=wn(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&na(t,e.child,null,i),t.child.memoizedState=bl(i),t.memoizedState=yl,o);if(!(t.mode&1))return Ms(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var c=a.dgst;return a=c,o=Error(q(419)),a=ki(o,a,void 0),Ms(e,t,i,a)}if(c=(i&e.childLanes)!==0,Dt||c){if(a=kt,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Lr(e,s),fr(a,e,s,-1))}return Sc(),a=ki(Error(q(421))),Ms(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Bg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,Xt=tn(s.nextSibling),qt=t,tt=!0,dr=null,e!==null&&(tr[rr++]=$r,tr[rr++]=Tr,tr[rr++]=_n,$r=e.id,Tr=e.overflow,_n=t),t=bc(t,a.children),t.flags|=4096,t)}function Fd(e,t,r){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),ml(e.return,t,r)}function ji(e,t,r,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:r,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=r,o.tailMode=s)}function km(e,t,r){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(Pt(e,t,a.children,r),a=at.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Fd(e,r,t);else if(e.tag===19)Fd(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(Ge(at,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(r=t.child,s=null;r!==null;)e=r.alternate,e!==null&&ho(e)===null&&(s=r),r=r.sibling;r=s,r===null?(s=t.child,t.child=null):(s=r.sibling,r.sibling=null),ji(t,!1,s,r,o);break;case"backwards":for(r=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ho(e)===null){t.child=s;break}e=s.sibling,s.sibling=r,r=s,s=e}ji(t,!0,r,null,o);break;case"together":ji(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ys(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ar(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Sn|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(q(153));if(t.child!==null){for(e=t.child,r=sn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=sn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function zg(e,t,r){switch(t.tag){case 3:bm(t),ra();break;case 5:Kp(t);break;case 1:Vt(t.type)&&co(t);break;case 4:pc(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;Ge(mo,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(Ge(at,at.current&1),t.flags|=128,null):r&t.child.childLanes?wm(e,t,r):(Ge(at,at.current&1),e=Ar(e,t,r),e!==null?e.sibling:null);Ge(at,at.current&1);break;case 19:if(a=(r&t.childLanes)!==0,e.flags&128){if(a)return km(e,t,r);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Ge(at,at.current),a)break;return null;case 22:case 23:return t.lanes=0,vm(e,t,r)}return Ar(e,t,r)}var jm,wl,_m,Nm;jm=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};wl=function(){};_m=function(e,t,r,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,vn(Nr.current);var o=null;switch(r){case"input":s=Vi(e,s),a=Vi(e,a),o=[];break;case"select":s=ot({},s,{value:void 0}),a=ot({},a,{value:void 0}),o=[];break;case"textarea":s=Yi(e,s),a=Yi(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=io)}Ki(r,a);var i;r=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var c=s[d];for(i in c)c.hasOwnProperty(i)&&(r||(r={}),r[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Ba.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var l=a[d];if(c=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(i in c)!c.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(r||(r={}),r[i]="");for(i in l)l.hasOwnProperty(i)&&c[i]!==l[i]&&(r||(r={}),r[i]=l[i])}else r||(o||(o=[]),o.push(d,r)),r=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Ba.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&qe("scroll",e),o||c===l||(o=[])):(o=o||[]).push(d,l))}r&&(o=o||[]).push("style",r);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};Nm=function(e,t,r,a){r!==a&&(t.flags|=4)};function ya(e,t){if(!tt)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Mt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,a=0;if(t)for(var s=e.child;s!==null;)r|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)r|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=r,t}function Eg(e,t,r){var a=t.pendingProps;switch(sc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mt(t),null;case 1:return Vt(t.type)&&lo(),Mt(t),null;case 3:return a=t.stateNode,aa(),Qe(Wt),Qe(Et),fc(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Ss(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,dr!==null&&(zl(dr),dr=null))),wl(e,t),Mt(t),null;case 5:mc(t);var s=vn(Ja.current);if(r=t.type,e!==null&&t.stateNode!=null)_m(e,t,r,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(q(166));return Mt(t),null}if(e=vn(Nr.current),Ss(t)){a=t.stateNode,r=t.type;var o=t.memoizedProps;switch(a[jr]=t,a[Qa]=o,e=(t.mode&1)!==0,r){case"dialog":qe("cancel",a),qe("close",a);break;case"iframe":case"object":case"embed":qe("load",a);break;case"video":case"audio":for(s=0;s<Ca.length;s++)qe(Ca[s],a);break;case"source":qe("error",a);break;case"img":case"image":case"link":qe("error",a),qe("load",a);break;case"details":qe("toggle",a);break;case"input":Kc(a,o),qe("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},qe("invalid",a);break;case"textarea":qc(a,o),qe("invalid",a)}Ki(r,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="children"?typeof c=="string"?a.textContent!==c&&(o.suppressHydrationWarning!==!0&&Ns(a.textContent,c,e),s=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Ns(a.textContent,c,e),s=["children",""+c]):Ba.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&qe("scroll",a)}switch(r){case"input":xs(a),Xc(a,o,!0);break;case"textarea":xs(a),Qc(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=io)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ju(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(r,{is:a.is}):(e=i.createElement(r),r==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,r),e[jr]=t,e[Qa]=a,jm(e,t,!1,!1),t.stateNode=e;e:{switch(i=Xi(r,a),r){case"dialog":qe("cancel",e),qe("close",e),s=a;break;case"iframe":case"object":case"embed":qe("load",e),s=a;break;case"video":case"audio":for(s=0;s<Ca.length;s++)qe(Ca[s],e);s=a;break;case"source":qe("error",e),s=a;break;case"img":case"image":case"link":qe("error",e),qe("load",e),s=a;break;case"details":qe("toggle",e),s=a;break;case"input":Kc(e,a),s=Vi(e,a),qe("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=ot({},a,{value:void 0}),qe("invalid",e);break;case"textarea":qc(e,a),s=Yi(e,a),qe("invalid",e);break;default:s=a}Ki(r,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var l=c[o];o==="style"?rp(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&ep(e,l)):o==="children"?typeof l=="string"?(r!=="textarea"||l!=="")&&Wa(e,l):typeof l=="number"&&Wa(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ba.hasOwnProperty(o)?l!=null&&o==="onScroll"&&qe("scroll",e):l!=null&&Ul(e,o,l,i))}switch(r){case"input":xs(e),Xc(e,a,!1);break;case"textarea":xs(e),Qc(e);break;case"option":a.value!=null&&e.setAttribute("value",""+on(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?Gn(e,!!a.multiple,o,!1):a.defaultValue!=null&&Gn(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=io)}switch(r){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Mt(t),null;case 6:if(e&&t.stateNode!=null)Nm(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(q(166));if(r=vn(Ja.current),vn(Nr.current),Ss(t)){if(a=t.stateNode,r=t.memoizedProps,a[jr]=t,(o=a.nodeValue!==r)&&(e=qt,e!==null))switch(e.tag){case 3:Ns(a.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ns(a.nodeValue,r,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(r.nodeType===9?r:r.ownerDocument).createTextNode(a),a[jr]=t,t.stateNode=a}return Mt(t),null;case 13:if(Qe(at),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(tt&&Xt!==null&&t.mode&1&&!(t.flags&128))Vp(),ra(),t.flags|=98560,o=!1;else if(o=Ss(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(q(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(q(317));o[jr]=t}else ra(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mt(t),o=!1}else dr!==null&&(zl(dr),dr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||at.current&1?yt===0&&(yt=3):Sc())),t.updateQueue!==null&&(t.flags|=4),Mt(t),null);case 4:return aa(),wl(e,t),e===null&&Xa(t.stateNode.containerInfo),Mt(t),null;case 10:return cc(t.type._context),Mt(t),null;case 17:return Vt(t.type)&&lo(),Mt(t),null;case 19:if(Qe(at),o=t.memoizedState,o===null)return Mt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)ya(o,!1);else{if(yt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ho(e),i!==null){for(t.flags|=128,ya(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=r,r=t.child;r!==null;)o=r,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Ge(at,at.current&1|2),t.child}e=e.sibling}o.tail!==null&&mt()>oa&&(t.flags|=128,a=!0,ya(o,!1),t.lanes=4194304)}else{if(!a)if(e=ho(i),e!==null){if(t.flags|=128,a=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),ya(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!tt)return Mt(t),null}else 2*mt()-o.renderingStartTime>oa&&r!==1073741824&&(t.flags|=128,a=!0,ya(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(r=o.last,r!==null?r.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=mt(),t.sibling=null,r=at.current,Ge(at,a?r&1|2:r&1),t):(Mt(t),null);case 22:case 23:return Nc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Kt&1073741824&&(Mt(t),t.subtreeFlags&6&&(t.flags|=8192)):Mt(t),null;case 24:return null;case 25:return null}throw Error(q(156,t.tag))}function $g(e,t){switch(sc(t),t.tag){case 1:return Vt(t.type)&&lo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return aa(),Qe(Wt),Qe(Et),fc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return mc(t),null;case 13:if(Qe(at),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(q(340));ra()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Qe(at),null;case 4:return aa(),null;case 10:return cc(t.type._context),null;case 22:case 23:return Nc(),null;case 24:return null;default:return null}}var zs=!1,zt=!1,Tg=typeof WeakSet=="function"?WeakSet:Set,me=null;function Hn(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(a){ct(e,t,a)}else r.current=null}function kl(e,t,r){try{r()}catch(a){ct(e,t,a)}}var Dd=!1;function Pg(e,t){if(sl=ao,e=Ep(),nc(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var a=r.getSelection&&r.getSelection();if(a&&a.rangeCount!==0){r=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break e}var i=0,c=-1,l=-1,d=0,m=0,f=e,u=null;t:for(;;){for(var v;f!==r||s!==0&&f.nodeType!==3||(c=i+s),f!==o||a!==0&&f.nodeType!==3||(l=i+a),f.nodeType===3&&(i+=f.nodeValue.length),(v=f.firstChild)!==null;)u=f,f=v;for(;;){if(f===e)break t;if(u===r&&++d===s&&(c=i),u===o&&++m===a&&(l=i),(v=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=v}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(ol={focusedElem:e,selectionRange:r},ao=!1,me=t;me!==null;)if(t=me,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,me=e;else for(;me!==null;){t=me;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var k=y.memoizedProps,j=y.memoizedState,x=t.stateNode,h=x.getSnapshotBeforeUpdate(t.elementType===t.type?k:lr(t.type,k),j);x.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(q(163))}}catch(_){ct(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,me=e;break}me=t.return}return y=Dd,Dd=!1,y}function Oa(e,t,r){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&kl(t,r,o)}s=s.next}while(s!==a)}}function Wo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var a=r.create;r.destroy=a()}r=r.next}while(r!==t)}}function jl(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Sm(e){var t=e.alternate;t!==null&&(e.alternate=null,Sm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[jr],delete t[Qa],delete t[cl],delete t[gg],delete t[hg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Cm(e){return e.tag===5||e.tag===3||e.tag===4}function Bd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _l(e,t,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=io));else if(a!==4&&(e=e.child,e!==null))for(_l(e,t,r),e=e.sibling;e!==null;)_l(e,t,r),e=e.sibling}function Nl(e,t,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Nl(e,t,r),e=e.sibling;e!==null;)Nl(e,t,r),e=e.sibling}var _t=null,cr=!1;function Ur(e,t,r){for(r=r.child;r!==null;)Mm(e,t,r),r=r.sibling}function Mm(e,t,r){if(_r&&typeof _r.onCommitFiberUnmount=="function")try{_r.onCommitFiberUnmount(Ro,r)}catch{}switch(r.tag){case 5:zt||Hn(r,t);case 6:var a=_t,s=cr;_t=null,Ur(e,t,r),_t=a,cr=s,_t!==null&&(cr?(e=_t,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):_t.removeChild(r.stateNode));break;case 18:_t!==null&&(cr?(e=_t,r=r.stateNode,e.nodeType===8?hi(e.parentNode,r):e.nodeType===1&&hi(e,r),Ya(e)):hi(_t,r.stateNode));break;case 4:a=_t,s=cr,_t=r.stateNode.containerInfo,cr=!0,Ur(e,t,r),_t=a,cr=s;break;case 0:case 11:case 14:case 15:if(!zt&&(a=r.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&kl(r,t,i),s=s.next}while(s!==a)}Ur(e,t,r);break;case 1:if(!zt&&(Hn(r,t),a=r.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=r.memoizedProps,a.state=r.memoizedState,a.componentWillUnmount()}catch(c){ct(r,t,c)}Ur(e,t,r);break;case 21:Ur(e,t,r);break;case 22:r.mode&1?(zt=(a=zt)||r.memoizedState!==null,Ur(e,t,r),zt=a):Ur(e,t,r);break;default:Ur(e,t,r)}}function Wd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Tg),t.forEach(function(a){var s=Wg.bind(null,e,a);r.has(a)||(r.add(a),a.then(s,s))})}}function ir(e,t){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var s=r[a];try{var o=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:_t=c.stateNode,cr=!1;break e;case 3:_t=c.stateNode.containerInfo,cr=!0;break e;case 4:_t=c.stateNode.containerInfo,cr=!0;break e}c=c.return}if(_t===null)throw Error(q(160));Mm(o,i,s),_t=null,cr=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(d){ct(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)zm(t,e),t=t.sibling}function zm(e,t){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ir(t,e),wr(e),a&4){try{Oa(3,e,e.return),Wo(3,e)}catch(k){ct(e,e.return,k)}try{Oa(5,e,e.return)}catch(k){ct(e,e.return,k)}}break;case 1:ir(t,e),wr(e),a&512&&r!==null&&Hn(r,r.return);break;case 5:if(ir(t,e),wr(e),a&512&&r!==null&&Hn(r,r.return),e.flags&32){var s=e.stateNode;try{Wa(s,"")}catch(k){ct(e,e.return,k)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=r!==null?r.memoizedProps:o,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&Qu(s,o),Xi(c,i);var d=Xi(c,o);for(i=0;i<l.length;i+=2){var m=l[i],f=l[i+1];m==="style"?rp(s,f):m==="dangerouslySetInnerHTML"?ep(s,f):m==="children"?Wa(s,f):Ul(s,m,f,d)}switch(c){case"input":Ui(s,o);break;case"textarea":Zu(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?Gn(s,!!o.multiple,v,!1):u!==!!o.multiple&&(o.defaultValue!=null?Gn(s,!!o.multiple,o.defaultValue,!0):Gn(s,!!o.multiple,o.multiple?[]:"",!1))}s[Qa]=o}catch(k){ct(e,e.return,k)}}break;case 6:if(ir(t,e),wr(e),a&4){if(e.stateNode===null)throw Error(q(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(k){ct(e,e.return,k)}}break;case 3:if(ir(t,e),wr(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Ya(t.containerInfo)}catch(k){ct(e,e.return,k)}break;case 4:ir(t,e),wr(e);break;case 13:ir(t,e),wr(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(jc=mt())),a&4&&Wd(e);break;case 22:if(m=r!==null&&r.memoizedState!==null,e.mode&1?(zt=(d=zt)||m,ir(t,e),zt=d):ir(t,e),wr(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(me=e,m=e.child;m!==null;){for(f=me=m;me!==null;){switch(u=me,v=u.child,u.tag){case 0:case 11:case 14:case 15:Oa(4,u,u.return);break;case 1:Hn(u,u.return);var y=u.stateNode;if(typeof y.componentWillUnmount=="function"){a=u,r=u.return;try{t=a,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(k){ct(a,r,k)}}break;case 5:Hn(u,u.return);break;case 22:if(u.memoizedState!==null){Ud(f);continue}}v!==null?(v.return=u,me=v):Ud(f)}m=m.sibling}e:for(m=null,f=e;;){if(f.tag===5){if(m===null){m=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=f.stateNode,l=f.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=tp("display",i))}catch(k){ct(e,e.return,k)}}}else if(f.tag===6){if(m===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(k){ct(e,e.return,k)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;m===f&&(m=null),f=f.return}m===f&&(m=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ir(t,e),wr(e),a&4&&Wd(e);break;case 21:break;default:ir(t,e),wr(e)}}function wr(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Cm(r)){var a=r;break e}r=r.return}throw Error(q(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(Wa(s,""),a.flags&=-33);var o=Bd(e);Nl(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,c=Bd(e);_l(e,c,i);break;default:throw Error(q(161))}}catch(l){ct(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Rg(e,t,r){me=e,Em(e)}function Em(e,t,r){for(var a=(e.mode&1)!==0;me!==null;){var s=me,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||zs;if(!i){var c=s.alternate,l=c!==null&&c.memoizedState!==null||zt;c=zs;var d=zt;if(zs=i,(zt=l)&&!d)for(me=s;me!==null;)i=me,l=i.child,i.tag===22&&i.memoizedState!==null?Hd(s):l!==null?(l.return=i,me=l):Hd(s);for(;o!==null;)me=o,Em(o),o=o.sibling;me=s,zs=c,zt=d}Vd(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,me=o):Vd(e)}}function Vd(e){for(;me!==null;){var t=me;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:zt||Wo(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!zt)if(r===null)a.componentDidMount();else{var s=t.elementType===t.type?r.memoizedProps:lr(t.type,r.memoizedProps);a.componentDidUpdate(s,r.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Cd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Cd(t,i,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break;case"img":l.src&&(r.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var f=m.dehydrated;f!==null&&Ya(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(q(163))}zt||t.flags&512&&jl(t)}catch(u){ct(t,t.return,u)}}if(t===e){me=null;break}if(r=t.sibling,r!==null){r.return=t.return,me=r;break}me=t.return}}function Ud(e){for(;me!==null;){var t=me;if(t===e){me=null;break}var r=t.sibling;if(r!==null){r.return=t.return,me=r;break}me=t.return}}function Hd(e){for(;me!==null;){var t=me;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Wo(4,t)}catch(l){ct(t,r,l)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(l){ct(t,s,l)}}var o=t.return;try{jl(t)}catch(l){ct(t,o,l)}break;case 5:var i=t.return;try{jl(t)}catch(l){ct(t,i,l)}}}catch(l){ct(t,t.return,l)}if(t===e){me=null;break}var c=t.sibling;if(c!==null){c.return=t.return,me=c;break}me=t.return}}var Ig=Math.ceil,yo=Fr.ReactCurrentDispatcher,wc=Fr.ReactCurrentOwner,ar=Fr.ReactCurrentBatchConfig,Le=0,kt=null,ht=null,Nt=0,Kt=0,Yn=dn(0),yt=0,ns=null,Sn=0,Vo=0,kc=0,Fa=null,Ft=null,jc=0,oa=1/0,zr=null,bo=!1,Sl=null,nn=null,Es=!1,Qr=null,wo=0,Da=0,Cl=null,Gs=-1,Ks=0;function Rt(){return Le&6?mt():Gs!==-1?Gs:Gs=mt()}function an(e){return e.mode&1?Le&2&&Nt!==0?Nt&-Nt:vg.transition!==null?(Ks===0&&(Ks=fp()),Ks):(e=Be,e!==0||(e=window.event,e=e===void 0?16:wp(e.type)),e):1}function fr(e,t,r,a){if(50<Da)throw Da=0,Cl=null,Error(q(185));cs(e,r,a),(!(Le&2)||e!==kt)&&(e===kt&&(!(Le&2)&&(Vo|=r),yt===4&&Xr(e,Nt)),Ut(e,a),r===1&&Le===0&&!(t.mode&1)&&(oa=mt()+500,Fo&&un()))}function Ut(e,t){var r=e.callbackNode;vf(e,t);var a=no(e,e===kt?Nt:0);if(a===0)r!==null&&ed(r),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(r!=null&&ed(r),t===1)e.tag===0?xg(Yd.bind(null,e)):Dp(Yd.bind(null,e)),mg(function(){!(Le&6)&&un()}),r=null;else{switch(gp(a)){case 1:r=Xl;break;case 4:r=pp;break;case 16:r=ro;break;case 536870912:r=mp;break;default:r=ro}r=Om(r,$m.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function $m(e,t){if(Gs=-1,Ks=0,Le&6)throw Error(q(327));var r=e.callbackNode;if(Zn()&&e.callbackNode!==r)return null;var a=no(e,e===kt?Nt:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=ko(e,a);else{t=a;var s=Le;Le|=2;var o=Pm();(kt!==e||Nt!==t)&&(zr=null,oa=mt()+500,bn(e,t));do try{Og();break}catch(c){Tm(e,c)}while(!0);lc(),yo.current=o,Le=s,ht!==null?t=0:(kt=null,Nt=0,t=yt)}if(t!==0){if(t===2&&(s=el(e),s!==0&&(a=s,t=Ml(e,s))),t===1)throw r=ns,bn(e,0),Xr(e,a),Ut(e,mt()),r;if(t===6)Xr(e,a);else{if(s=e.current.alternate,!(a&30)&&!Lg(s)&&(t=ko(e,a),t===2&&(o=el(e),o!==0&&(a=o,t=Ml(e,o))),t===1))throw r=ns,bn(e,0),Xr(e,a),Ut(e,mt()),r;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(q(345));case 2:gn(e,Ft,zr);break;case 3:if(Xr(e,a),(a&130023424)===a&&(t=jc+500-mt(),10<t)){if(no(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){Rt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=ll(gn.bind(null,e,Ft,zr),t);break}gn(e,Ft,zr);break;case 4:if(Xr(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-mr(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=mt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Ig(a/1960))-a,10<a){e.timeoutHandle=ll(gn.bind(null,e,Ft,zr),a);break}gn(e,Ft,zr);break;case 5:gn(e,Ft,zr);break;default:throw Error(q(329))}}}return Ut(e,mt()),e.callbackNode===r?$m.bind(null,e):null}function Ml(e,t){var r=Fa;return e.current.memoizedState.isDehydrated&&(bn(e,t).flags|=256),e=ko(e,t),e!==2&&(t=Ft,Ft=r,t!==null&&zl(t)),e}function zl(e){Ft===null?Ft=e:Ft.push.apply(Ft,e)}function Lg(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var a=0;a<r.length;a++){var s=r[a],o=s.getSnapshot;s=s.value;try{if(!gr(o(),s))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Xr(e,t){for(t&=~kc,t&=~Vo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-mr(t),a=1<<r;e[r]=-1,t&=~a}}function Yd(e){if(Le&6)throw Error(q(327));Zn();var t=no(e,0);if(!(t&1))return Ut(e,mt()),null;var r=ko(e,t);if(e.tag!==0&&r===2){var a=el(e);a!==0&&(t=a,r=Ml(e,a))}if(r===1)throw r=ns,bn(e,0),Xr(e,t),Ut(e,mt()),r;if(r===6)throw Error(q(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,gn(e,Ft,zr),Ut(e,mt()),null}function _c(e,t){var r=Le;Le|=1;try{return e(t)}finally{Le=r,Le===0&&(oa=mt()+500,Fo&&un())}}function Cn(e){Qr!==null&&Qr.tag===0&&!(Le&6)&&Zn();var t=Le;Le|=1;var r=ar.transition,a=Be;try{if(ar.transition=null,Be=1,e)return e()}finally{Be=a,ar.transition=r,Le=t,!(Le&6)&&un()}}function Nc(){Kt=Yn.current,Qe(Yn)}function bn(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,pg(r)),ht!==null)for(r=ht.return;r!==null;){var a=r;switch(sc(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&lo();break;case 3:aa(),Qe(Wt),Qe(Et),fc();break;case 5:mc(a);break;case 4:aa();break;case 13:Qe(at);break;case 19:Qe(at);break;case 10:cc(a.type._context);break;case 22:case 23:Nc()}r=r.return}if(kt=e,ht=e=sn(e.current,null),Nt=Kt=t,yt=0,ns=null,kc=Vo=Sn=0,Ft=Fa=null,xn!==null){for(t=0;t<xn.length;t++)if(r=xn[t],a=r.interleaved,a!==null){r.interleaved=null;var s=a.next,o=r.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}r.pending=a}xn=null}return e}function Tm(e,t){do{var r=ht;try{if(lc(),Us.current=vo,xo){for(var a=st.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}xo=!1}if(Nn=0,wt=vt=st=null,Aa=!1,es=0,wc.current=null,r===null||r.return===null){yt=1,ns=t,ht=null;break}e:{var o=e,i=r.return,c=r,l=t;if(t=Nt,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,m=c,f=m.tag;if(!(m.mode&1)&&(f===0||f===11||f===15)){var u=m.alternate;u?(m.updateQueue=u.updateQueue,m.memoizedState=u.memoizedState,m.lanes=u.lanes):(m.updateQueue=null,m.memoizedState=null)}var v=Pd(i);if(v!==null){v.flags&=-257,Rd(v,i,c,o,t),v.mode&1&&Td(o,d,t),t=v,l=d;var y=t.updateQueue;if(y===null){var k=new Set;k.add(l),t.updateQueue=k}else y.add(l);break e}else{if(!(t&1)){Td(o,d,t),Sc();break e}l=Error(q(426))}}else if(tt&&c.mode&1){var j=Pd(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Rd(j,i,c,o,t),oc(sa(l,c));break e}}o=l=sa(l,c),yt!==4&&(yt=2),Fa===null?Fa=[o]:Fa.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var x=gm(o,l,t);Sd(o,x);break e;case 1:c=l;var h=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(nn===null||!nn.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var _=hm(o,c,t);Sd(o,_);break e}}o=o.return}while(o!==null)}Im(r)}catch(C){t=C,ht===r&&r!==null&&(ht=r=r.return);continue}break}while(!0)}function Pm(){var e=yo.current;return yo.current=vo,e===null?vo:e}function Sc(){(yt===0||yt===3||yt===2)&&(yt=4),kt===null||!(Sn&268435455)&&!(Vo&268435455)||Xr(kt,Nt)}function ko(e,t){var r=Le;Le|=2;var a=Pm();(kt!==e||Nt!==t)&&(zr=null,bn(e,t));do try{Ag();break}catch(s){Tm(e,s)}while(!0);if(lc(),Le=r,yo.current=a,ht!==null)throw Error(q(261));return kt=null,Nt=0,yt}function Ag(){for(;ht!==null;)Rm(ht)}function Og(){for(;ht!==null&&!cf();)Rm(ht)}function Rm(e){var t=Am(e.alternate,e,Kt);e.memoizedProps=e.pendingProps,t===null?Im(e):ht=t,wc.current=null}function Im(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=$g(r,t),r!==null){r.flags&=32767,ht=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{yt=6,ht=null;return}}else if(r=Eg(r,t,Kt),r!==null){ht=r;return}if(t=t.sibling,t!==null){ht=t;return}ht=t=e}while(t!==null);yt===0&&(yt=5)}function gn(e,t,r){var a=Be,s=ar.transition;try{ar.transition=null,Be=1,Fg(e,t,r,a)}finally{ar.transition=s,Be=a}return null}function Fg(e,t,r,a){do Zn();while(Qr!==null);if(Le&6)throw Error(q(327));r=e.finishedWork;var s=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(q(177));e.callbackNode=null,e.callbackPriority=0;var o=r.lanes|r.childLanes;if(yf(e,o),e===kt&&(ht=kt=null,Nt=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Es||(Es=!0,Om(ro,function(){return Zn(),null})),o=(r.flags&15990)!==0,r.subtreeFlags&15990||o){o=ar.transition,ar.transition=null;var i=Be;Be=1;var c=Le;Le|=4,wc.current=null,Pg(e,r),zm(r,e),sg(ol),ao=!!sl,ol=sl=null,e.current=r,Rg(r),df(),Le=c,Be=i,ar.transition=o}else e.current=r;if(Es&&(Es=!1,Qr=e,wo=s),o=e.pendingLanes,o===0&&(nn=null),mf(r.stateNode),Ut(e,mt()),t!==null)for(a=e.onRecoverableError,r=0;r<t.length;r++)s=t[r],a(s.value,{componentStack:s.stack,digest:s.digest});if(bo)throw bo=!1,e=Sl,Sl=null,e;return wo&1&&e.tag!==0&&Zn(),o=e.pendingLanes,o&1?e===Cl?Da++:(Da=0,Cl=e):Da=0,un(),null}function Zn(){if(Qr!==null){var e=gp(wo),t=ar.transition,r=Be;try{if(ar.transition=null,Be=16>e?16:e,Qr===null)var a=!1;else{if(e=Qr,Qr=null,wo=0,Le&6)throw Error(q(331));var s=Le;for(Le|=4,me=e.current;me!==null;){var o=me,i=o.child;if(me.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(me=d;me!==null;){var m=me;switch(m.tag){case 0:case 11:case 15:Oa(8,m,o)}var f=m.child;if(f!==null)f.return=m,me=f;else for(;me!==null;){m=me;var u=m.sibling,v=m.return;if(Sm(m),m===d){me=null;break}if(u!==null){u.return=v,me=u;break}me=v}}}var y=o.alternate;if(y!==null){var k=y.child;if(k!==null){y.child=null;do{var j=k.sibling;k.sibling=null,k=j}while(k!==null)}}me=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,me=i;else e:for(;me!==null;){if(o=me,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Oa(9,o,o.return)}var x=o.sibling;if(x!==null){x.return=o.return,me=x;break e}me=o.return}}var h=e.current;for(me=h;me!==null;){i=me;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,me=g;else e:for(i=h;me!==null;){if(c=me,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Wo(9,c)}}catch(C){ct(c,c.return,C)}if(c===i){me=null;break e}var _=c.sibling;if(_!==null){_.return=c.return,me=_;break e}me=c.return}}if(Le=s,un(),_r&&typeof _r.onPostCommitFiberRoot=="function")try{_r.onPostCommitFiberRoot(Ro,e)}catch{}a=!0}return a}finally{Be=r,ar.transition=t}}return!1}function Gd(e,t,r){t=sa(r,t),t=gm(e,t,1),e=rn(e,t,1),t=Rt(),e!==null&&(cs(e,1,t),Ut(e,t))}function ct(e,t,r){if(e.tag===3)Gd(e,e,r);else for(;t!==null;){if(t.tag===3){Gd(t,e,r);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(nn===null||!nn.has(a))){e=sa(r,e),e=hm(t,e,1),t=rn(t,e,1),e=Rt(),t!==null&&(cs(t,1,e),Ut(t,e));break}}t=t.return}}function Dg(e,t,r){var a=e.pingCache;a!==null&&a.delete(t),t=Rt(),e.pingedLanes|=e.suspendedLanes&r,kt===e&&(Nt&r)===r&&(yt===4||yt===3&&(Nt&130023424)===Nt&&500>mt()-jc?bn(e,0):kc|=r),Ut(e,t)}function Lm(e,t){t===0&&(e.mode&1?(t=bs,bs<<=1,!(bs&130023424)&&(bs=4194304)):t=1);var r=Rt();e=Lr(e,t),e!==null&&(cs(e,t,r),Ut(e,r))}function Bg(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Lm(e,r)}function Wg(e,t){var r=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(r=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(q(314))}a!==null&&a.delete(t),Lm(e,r)}var Am;Am=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Wt.current)Dt=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Dt=!1,zg(e,t,r);Dt=!!(e.flags&131072)}else Dt=!1,tt&&t.flags&1048576&&Bp(t,po,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;Ys(e,t),e=t.pendingProps;var s=ta(t,Et.current);Qn(t,r),s=hc(null,t,a,e,s,r);var o=xc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Vt(a)?(o=!0,co(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,uc(t),s.updater=Bo,t.stateNode=s,s._reactInternals=t,gl(t,a,e,r),t=vl(null,t,a,!0,o,r)):(t.tag=0,tt&&o&&ac(t),Pt(null,t,s,r),t=t.child),t;case 16:a=t.elementType;e:{switch(Ys(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=Ug(a),e=lr(a,e),s){case 0:t=xl(null,t,a,e,r);break e;case 1:t=Ad(null,t,a,e,r);break e;case 11:t=Id(null,t,a,e,r);break e;case 14:t=Ld(null,t,a,lr(a.type,e),r);break e}throw Error(q(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:lr(a,s),xl(e,t,a,s,r);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:lr(a,s),Ad(e,t,a,s,r);case 3:e:{if(bm(t),e===null)throw Error(q(387));a=t.pendingProps,o=t.memoizedState,s=o.element,Gp(e,t),go(t,a,null,r);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=sa(Error(q(423)),t),t=Od(e,t,a,r,s);break e}else if(a!==s){s=sa(Error(q(424)),t),t=Od(e,t,a,r,s);break e}else for(Xt=tn(t.stateNode.containerInfo.firstChild),qt=t,tt=!0,dr=null,r=Hp(t,null,a,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(ra(),a===s){t=Ar(e,t,r);break e}Pt(e,t,a,r)}t=t.child}return t;case 5:return Kp(t),e===null&&pl(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,il(a,s)?i=null:o!==null&&il(a,o)&&(t.flags|=32),ym(e,t),Pt(e,t,i,r),t.child;case 6:return e===null&&pl(t),null;case 13:return wm(e,t,r);case 4:return pc(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=na(t,null,a,r):Pt(e,t,a,r),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:lr(a,s),Id(e,t,a,s,r);case 7:return Pt(e,t,t.pendingProps,r),t.child;case 8:return Pt(e,t,t.pendingProps.children,r),t.child;case 12:return Pt(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,Ge(mo,a._currentValue),a._currentValue=i,o!==null)if(gr(o.value,i)){if(o.children===s.children&&!Wt.current){t=Ar(e,t,r);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){i=o.child;for(var l=c.firstContext;l!==null;){if(l.context===a){if(o.tag===1){l=Pr(-1,r&-r),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?l.next=l:(l.next=m.next,m.next=l),d.pending=l}}o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),ml(o.return,r,t),c.lanes|=r;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(q(341));i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),ml(i,r,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}Pt(e,t,s.children,r),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,Qn(t,r),s=sr(s),a=a(s),t.flags|=1,Pt(e,t,a,r),t.child;case 14:return a=t.type,s=lr(a,t.pendingProps),s=lr(a.type,s),Ld(e,t,a,s,r);case 15:return xm(e,t,t.type,t.pendingProps,r);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:lr(a,s),Ys(e,t),t.tag=1,Vt(a)?(e=!0,co(t)):e=!1,Qn(t,r),fm(t,a,s),gl(t,a,s,r),vl(null,t,a,!0,e,r);case 19:return km(e,t,r);case 22:return vm(e,t,r)}throw Error(q(156,t.tag))};function Om(e,t){return up(e,t)}function Vg(e,t,r,a){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nr(e,t,r,a){return new Vg(e,t,r,a)}function Cc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ug(e){if(typeof e=="function")return Cc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Yl)return 11;if(e===Gl)return 14}return 2}function sn(e,t){var r=e.alternate;return r===null?(r=nr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Xs(e,t,r,a,s,o){var i=2;if(a=e,typeof e=="function")Cc(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ln:return wn(r.children,s,o,t);case Hl:i=8,s|=8;break;case Fi:return e=nr(12,r,t,s|2),e.elementType=Fi,e.lanes=o,e;case Di:return e=nr(13,r,t,s),e.elementType=Di,e.lanes=o,e;case Bi:return e=nr(19,r,t,s),e.elementType=Bi,e.lanes=o,e;case Ku:return Uo(r,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Yu:i=10;break e;case Gu:i=9;break e;case Yl:i=11;break e;case Gl:i=14;break e;case Hr:i=16,a=null;break e}throw Error(q(130,e==null?e:typeof e,""))}return t=nr(i,r,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function wn(e,t,r,a){return e=nr(7,e,a,t),e.lanes=r,e}function Uo(e,t,r,a){return e=nr(22,e,a,t),e.elementType=Ku,e.lanes=r,e.stateNode={isHidden:!1},e}function _i(e,t,r){return e=nr(6,e,null,t),e.lanes=r,e}function Ni(e,t,r){return t=nr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Hg(e,t,r,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=si(0),this.expirationTimes=si(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=si(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Mc(e,t,r,a,s,o,i,c,l){return e=new Hg(e,t,r,c,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=nr(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},uc(o),e}function Yg(e,t,r){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:In,key:a==null?null:""+a,children:e,containerInfo:t,implementation:r}}function Fm(e){if(!e)return ln;e=e._reactInternals;e:{if(En(e)!==e||e.tag!==1)throw Error(q(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Vt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(q(171))}if(e.tag===1){var r=e.type;if(Vt(r))return Fp(e,r,t)}return t}function Dm(e,t,r,a,s,o,i,c,l){return e=Mc(r,a,!0,e,s,o,i,c,l),e.context=Fm(null),r=e.current,a=Rt(),s=an(r),o=Pr(a,s),o.callback=t??null,rn(r,o,s),e.current.lanes=s,cs(e,s,a),Ut(e,a),e}function Ho(e,t,r,a){var s=t.current,o=Rt(),i=an(s);return r=Fm(r),t.context===null?t.context=r:t.pendingContext=r,t=Pr(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=rn(s,t,i),e!==null&&(fr(e,s,i,o),Vs(e,s,i)),i}function jo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Kd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function zc(e,t){Kd(e,t),(e=e.alternate)&&Kd(e,t)}function Gg(){return null}var Bm=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ec(e){this._internalRoot=e}Yo.prototype.render=Ec.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(q(409));Ho(e,t,null,null)};Yo.prototype.unmount=Ec.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cn(function(){Ho(null,e,null,null)}),t[Ir]=null}};function Yo(e){this._internalRoot=e}Yo.prototype.unstable_scheduleHydration=function(e){if(e){var t=vp();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Kr.length&&t!==0&&t<Kr[r].priority;r++);Kr.splice(r,0,e),r===0&&bp(e)}};function $c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Go(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xd(){}function Kg(e,t,r,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=jo(i);o.call(d)}}var i=Dm(t,a,e,0,null,!1,!1,"",Xd);return e._reactRootContainer=i,e[Ir]=i.current,Xa(e.nodeType===8?e.parentNode:e),Cn(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var c=a;a=function(){var d=jo(l);c.call(d)}}var l=Mc(e,0,!1,null,null,!1,!1,"",Xd);return e._reactRootContainer=l,e[Ir]=l.current,Xa(e.nodeType===8?e.parentNode:e),Cn(function(){Ho(t,l,r,a)}),l}function Ko(e,t,r,a,s){var o=r._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var c=s;s=function(){var l=jo(i);c.call(l)}}Ho(t,i,e,s)}else i=Kg(r,t,e,s,a);return jo(i)}hp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Sa(t.pendingLanes);r!==0&&(ql(t,r|1),Ut(t,mt()),!(Le&6)&&(oa=mt()+500,un()))}break;case 13:Cn(function(){var a=Lr(e,1);if(a!==null){var s=Rt();fr(a,e,1,s)}}),zc(e,1)}};Ql=function(e){if(e.tag===13){var t=Lr(e,134217728);if(t!==null){var r=Rt();fr(t,e,134217728,r)}zc(e,134217728)}};xp=function(e){if(e.tag===13){var t=an(e),r=Lr(e,t);if(r!==null){var a=Rt();fr(r,e,t,a)}zc(e,t)}};vp=function(){return Be};yp=function(e,t){var r=Be;try{return Be=e,t()}finally{Be=r}};Qi=function(e,t,r){switch(t){case"input":if(Ui(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var a=r[t];if(a!==e&&a.form===e.form){var s=Oo(a);if(!s)throw Error(q(90));qu(a),Ui(a,s)}}}break;case"textarea":Zu(e,r);break;case"select":t=r.value,t!=null&&Gn(e,!!r.multiple,t,!1)}};sp=_c;op=Cn;var Xg={usingClientEntryPoint:!1,Events:[us,Dn,Oo,np,ap,_c]},ba={findFiberByHostInstance:hn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qg={bundleType:ba.bundleType,version:ba.version,rendererPackageName:ba.rendererPackageName,rendererConfig:ba.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=cp(e),e===null?null:e.stateNode},findFiberByHostInstance:ba.findFiberByHostInstance||Gg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $s=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$s.isDisabled&&$s.supportsFiber)try{Ro=$s.inject(qg),_r=$s}catch{}}Zt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xg;Zt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!$c(t))throw Error(q(200));return Yg(e,t,null,r)};Zt.createRoot=function(e,t){if(!$c(e))throw Error(q(299));var r=!1,a="",s=Bm;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Mc(e,1,!1,null,null,r,!1,a,s),e[Ir]=t.current,Xa(e.nodeType===8?e.parentNode:e),new Ec(t)};Zt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(q(188)):(e=Object.keys(e).join(","),Error(q(268,e)));return e=cp(t),e=e===null?null:e.stateNode,e};Zt.flushSync=function(e){return Cn(e)};Zt.hydrate=function(e,t,r){if(!Go(t))throw Error(q(200));return Ko(null,e,t,!0,r)};Zt.hydrateRoot=function(e,t,r){if(!$c(e))throw Error(q(405));var a=r!=null&&r.hydratedSources||null,s=!1,o="",i=Bm;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(i=r.onRecoverableError)),t=Dm(t,null,e,1,r??null,s,!1,o,i),e[Ir]=t.current,Xa(e),a)for(e=0;e<a.length;e++)r=a[e],s=r._getVersion,s=s(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,s]:t.mutableSourceEagerHydrationData.push(r,s);return new Yo(t)};Zt.render=function(e,t,r){if(!Go(t))throw Error(q(200));return Ko(null,e,t,!1,r)};Zt.unmountComponentAtNode=function(e){if(!Go(e))throw Error(q(40));return e._reactRootContainer?(Cn(function(){Ko(null,null,e,!1,function(){e._reactRootContainer=null,e[Ir]=null})}),!0):!1};Zt.unstable_batchedUpdates=_c;Zt.unstable_renderSubtreeIntoContainer=function(e,t,r,a){if(!Go(r))throw Error(q(200));if(e==null||e._reactInternals===void 0)throw Error(q(38));return Ko(e,t,r,!1,a)};Zt.version="18.3.1-next-f1338f8080-20240426";function Wm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wm)}catch(e){console.error(e)}}Wm(),Wu.exports=Zt;var Tc=Wu.exports,qd=Tc;Ai.createRoot=qd.createRoot,Ai.hydrateRoot=qd.hydrateRoot;const Si={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.settings":"Settings","nav.more":"More","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.start":"Start","vm.shutdown_acpi":"Shutdown","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.manage":"Manage","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.saving":"Saving…","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.settings":"設定","nav.more":"更多","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.start":"啟動","vm.shutdown_acpi":"關機","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.manage":"管理","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.saving":"儲存中…","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},Vm=p.createContext(null);function Qg({children:e}){const[t,r]=p.useState(()=>{const o=localStorage.getItem("language");return o&&Si[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=p.useCallback(o=>{r(o),localStorage.setItem("language",o)},[]),s=p.useCallback((o,i)=>{let c=Si[t][o]||Si.en[o]||o;return i&&Object.entries(i).forEach(([l,d])=>{c=c.replace(`{${l}}`,String(d))}),c},[t]);return n.jsx(Vm.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Fe(){const e=p.useContext(Vm);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const Um=p.createContext(null);function pa(){const e=p.useContext(Um);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,r)=>Promise.resolve(window.prompt(t,(r==null?void 0:r.defaultValue)??""))})}function Zg({children:e}){const{t}=Fe(),[r,a]=p.useState(null),[s,o]=p.useState(""),i=p.useRef(null),c=p.useCallback(f=>{r&&(r.resolve(f),a(null),o(""))},[r]),l=p.useCallback((f,u={})=>new Promise(v=>{a({kind:"alert",title:u.title||t("dialog.notice"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:()=>v()})}),[t]),d=p.useCallback((f,u={})=>new Promise(v=>{a({kind:"confirm",title:u.title||t("dialog.confirm"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:y=>v(!!y)})}),[t]),m=p.useCallback((f,u={})=>new Promise(v=>{o(u.defaultValue||""),a({kind:"prompt",title:u.title||t("dialog.input"),body:f,destructive:!!u.destructive,inputType:u.inputType||"text",placeholder:u.placeholder||"",resolve:y=>v(y===null?null:String(y))})}),[t]);return p.useEffect(()=>{if(!r)return;const f=u=>{u.key==="Escape"?c(r.kind==="prompt"?null:r.kind==="confirm"?!1:void 0):u.key==="Enter"&&r.kind!=="alert"?(u.preventDefault(),c(r.kind==="prompt"?s:!0)):u.key==="Enter"&&r.kind==="alert"&&c(void 0)};return document.addEventListener("keydown",f),r.kind==="prompt"&&setTimeout(()=>{var u;return(u=i.current)==null?void 0:u.focus()},50),()=>document.removeEventListener("keydown",f)},[r,s,c]),n.jsxs(Um.Provider,{value:{alert:l,confirm:d,prompt:m},children:[e,r&&n.jsxs("div",{onClick:()=>c(r.kind==="prompt"?null:r.kind==="confirm"?!1:void 0),style:Jg,children:[n.jsx("style",{children:eh}),n.jsxs("div",{className:`jtd-modal ${r.destructive?"destructive":""}`,onClick:f=>f.stopPropagation(),children:[n.jsxs("div",{className:"jtd-eyebrow",children:["// ",r.kind]}),n.jsx("h3",{className:"jtd-title",children:r.title}),n.jsx("p",{className:"jtd-body",children:r.body}),r.kind==="prompt"&&n.jsx("input",{ref:i,type:r.inputType,value:s,placeholder:r.placeholder,onChange:f=>o(f.target.value),spellCheck:!1,autoComplete:"off"}),n.jsxs("div",{className:"jtd-actions",children:[r.kind!=="alert"&&n.jsx("button",{className:"ghost",onClick:()=>c(r.kind==="prompt"?null:!1),children:t("action.cancel")}),n.jsx("button",{className:`primary ${r.destructive?"destructive":""}`,onClick:()=>c(r.kind==="prompt"?s:!0),children:r.kind==="alert"?t("dialog.ok"):r.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const Jg={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},eh=`
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
`;function th(e={}){const{onMessage:t,onConnect:r,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,c=p.useRef(null),l=p.useRef(null),d=p.useRef(null),m=p.useRef(t),[f,u]=p.useState({connected:!1,connecting:!1,lastMessageTime:0});m.current=t;const v=p.useCallback(()=>{const x=window.location.protocol==="https:"?"wss:":"ws:",h=window.location.host;return`${x}//${h}/ws`},[]),y=p.useCallback(()=>{var h;if(((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN)return;u(g=>({...g,connecting:!0}));const x=new WebSocket(v());c.current=x,x.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),r==null||r(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{x.readyState===WebSocket.OPEN&&x.send(JSON.stringify({type:"ping"}))},i)},x.onmessage=g=>{var _;try{const C=JSON.parse(g.data);u($=>({...$,lastMessageTime:Date.now()})),(C.type==="initial"||C.type==="update")&&(_=C.data)!=null&&_.clusters&&m.current&&m.current(C.data.clusters)}catch(C){console.error("[WS] Failed to parse message:",C)}},x.onerror=g=>{console.error("[WS] Error:",g),s==null||s(g)},x.onclose=()=>{u(g=>({...g,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{y()},o)}},[v,r,a,s,o,i]),k=p.useCallback(()=>{l.current&&(clearTimeout(l.current),l.current=null),d.current&&(clearInterval(d.current),d.current=null),c.current&&(c.current.close(),c.current=null)},[]),j=p.useCallback(x=>{var h;((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN&&c.current.send(JSON.stringify(x))},[]);return p.useEffect(()=>(y(),()=>{k()}),[y,k]),p.useEffect(()=>{const x=setInterval(()=>{const g=Date.now()-f.lastMessageTime;f.connected&&g>15e3&&(k(),y())},5e3);return()=>clearInterval(x)},[f.connected,f.lastMessageTime,y,k]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:j,reconnect:y,disconnect:k}}const rh="/api";async function Me(e,t){const r=await fetch(`${rh}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(r.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!r.ok){const a=await r.text();throw new Error(a||`HTTP ${r.status}`)}return r.json()}const Ie={authMe:()=>Me("/auth/me"),authLogin:(e,t)=>Me("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Me("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Me("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Me("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Me("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Me("/config"),updateConfig:e=>Me("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Me("/clusters"),getCluster:e=>Me(`/clusters/${e}`),getSummary:()=>Me("/summary"),getNodes:e=>Me(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Me(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Me(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Me(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Me("/health"),vmAction:(e,t,r,a)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${r}/${a}`,{method:"POST"}),ctAction:(e,t,r,a)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${r}/${a}`,{method:"POST"}),guestAction:(e,t,r,a,s)=>a==="lxc"?Ie.ctAction(e,t,r,s):Ie.vmAction(e,t,r,s),vmMigrate:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(r)}),ctMigrate:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(r)}),bulkAction:(e,t)=>Me(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(r)}`),listSnapshots:(e,t)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(r)}),deleteSnapshot:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(r)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(r)}/rollback`,{method:"POST"}),vmReset:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${r}/reset`,{method:"POST"}),cloneVm:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(r)}),listRemoteEndpoints:e=>Me(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>Me(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(r)}),setClusterSecret:(e,t,r)=>Me(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:r})}),deleteClusterSecret:(e,t)=>Me(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>Me("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,r,a)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(r)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>Me(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,r)=>Me(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(r)})};function $e(e,t=1){if(e===0)return"0 B";const r=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(r));return`${parseFloat((e/Math.pow(r,s)).toFixed(t))} ${a[s]}`}function rt(e,t=1){return`${e.toFixed(t)}%`}function Xo(e){const t=Math.floor(e/86400),r=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),r>0&&s.push(`${r}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function _e(e,t=80,r=95){return e>=r?"danger":e>=t?"warning":"success"}function El(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function nh({value:e,suffix:t="",className:r=""}){const a=v=>{if(typeof v=="number")return{left:v,isRatio:!1};const y=String(v).match(/^(\d+)\/(\d+)$/);if(y)return{left:parseInt(y[1]),right:parseInt(y[2]),isRatio:!0};const k=parseFloat(String(v));return isNaN(k)?{left:0,isRatio:!1}:{left:k,isRatio:!1}},s=a(e),[o,i]=p.useState(0),[c,l]=p.useState(s.right||0),d=p.useRef(null),m=p.useRef(0),f=p.useRef(!0);p.useEffect(()=>{const v=a(e);if(!f.current){i(v.left),v.right!==void 0&&l(v.right);return}const y=800,k=0,j=0;f.current=!1,d.current=null;const x=h=>{d.current||(d.current=h);const g=h-d.current,_=Math.min(g/y,1),C=1-Math.pow(1-_,3),$=k+(v.left-k)*C;if(i(Math.round($)),v.isRatio&&v.right!==void 0){const E=j+(v.right-j)*C;l(Math.round(E))}_<1?m.current=requestAnimationFrame(x):(i(v.left),v.right!==void 0&&l(v.right))};return m.current=requestAnimationFrame(x),()=>{m.current&&cancelAnimationFrame(m.current)}},[e]);const u=s.isRatio?`${o}/${c}`:o;return n.jsxs("span",{className:`metric-value ${r}`,children:[u,t&&n.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function Qd({value:e,decimals:t=0,className:r=""}){const[a,s]=p.useState(0),o=p.useRef(null),i=p.useRef(0),c=p.useRef(!0);return p.useEffect(()=>{if(!c.current){s(e);return}const l=800,d=0;c.current=!1,o.current=null;const m=f=>{o.current||(o.current=f);const u=f-o.current,v=Math.min(u/l,1),y=1-Math.pow(1-v,3),k=d+(e-d)*y;s(k),v<1?i.current=requestAnimationFrame(m):s(e)};return i.current=requestAnimationFrame(m),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),n.jsxs("span",{className:r,children:[a.toFixed(t),"%"]})}function Ci({left:e,right:t,className:r=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{if(!d.current){s(e),i(t);return}const m=800,f=0,u=0;d.current=!1,c.current=null;const v=y=>{c.current||(c.current=y);const k=y-c.current,j=Math.min(k/m,1),x=1-Math.pow(1-j,3);s(Math.round(f+(e-f)*x)),i(Math.round(u+(t-u)*x)),j<1?l.current=requestAnimationFrame(v):(s(e),i(t))};return l.current=requestAnimationFrame(v),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),n.jsxs("span",{className:r,children:[a,"/",o]})}function Ts({label:e,value:t,suffix:r,subValue:a,color:s="primary",icon:o}){return n.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&n.jsx("div",{className:"stat-icon",children:o}),n.jsxs("div",{className:"stat-content",children:[n.jsx("div",{className:"stat-label",children:e}),n.jsx(nh,{value:t,suffix:r,className:s!=="primary"?`text-${s}`:""}),a&&n.jsx("div",{className:"stat-sub",children:a})]})]})}function Mi({value:e,label:t,color:r,size:a=100}){const[s,o]=p.useState(0),i=p.useRef(null),c=p.useRef(0),l=p.useRef(!0);p.useEffect(()=>{if(!l.current){o(e);return}const j=1e3,x=0;l.current=!1,i.current=null;const h=g=>{i.current||(i.current=g);const _=g-i.current,C=Math.min(_/j,1),$=1-Math.pow(1-C,3),E=x+(e-x)*$;o(E),C<1?c.current=requestAnimationFrame(h):o(e)};return c.current=requestAnimationFrame(h),()=>{c.current&&cancelAnimationFrame(c.current)}},[e]);const d=5,m=(a-d*4)/2-8,f=(a-d)/2,u=m+(f-m)/2,v=2*Math.PI*u,y=v-s/100*v,k=Array.from({length:36},(j,x)=>{const h=(x*10-90)*(Math.PI/180),g=x%3===0,_=g?6:3,C=f-2,$=C-_;return{x1:a/2+Math.cos(h)*C,y1:a/2+Math.sin(h)*C,x2:a/2+Math.cos(h)*$,y2:a/2+Math.sin(h)*$,isMajor:g}});return n.jsxs("div",{className:"ring-gauge",children:[n.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[n.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:f,strokeWidth:1}),k.map((j,x)=>n.jsx("line",{x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,className:`ring-tick ${j.isMajor?"major":""}`},x)),n.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:u,strokeWidth:d}),n.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:m,strokeWidth:1}),n.jsx("circle",{className:`ring-fill ${r}`,cx:a/2,cy:a/2,r:u,strokeWidth:d,strokeDasharray:v,strokeDashoffset:y,transform:`rotate(-90 ${a/2} ${a/2})`}),n.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-u-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),n.jsxs("div",{className:"ring-content",children:[n.jsxs("span",{className:`ring-value text-${r}`,children:[s.toFixed(0),n.jsx("span",{className:"ring-percent",children:"%"})]}),n.jsx("span",{className:"ring-label",children:t})]})]})}function ah({cluster:e,onClick:t}){var l,d;const{t:r}=Fe(),a=e.summary;if(!a)return null;const s=_e(a.total_cpu_usage),o=_e(a.total_memory_usage),i=a.alerts_warning>0,c=a.alerts_critical>0;return n.jsxs("div",{className:`cluster-hex-card ${c?"critical":i?"warning":""}`,onClick:t,children:[n.jsxs("div",{className:"cluster-hex-inner",children:[n.jsxs("div",{className:"cluster-hex-header",children:[n.jsxs("div",{className:"cluster-hex-title",children:[n.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&n.jsx("span",{className:"standalone-badge",children:r("dashboard.standalone")})]}),n.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),n.jsxs("div",{className:"cluster-hex-metrics",children:[n.jsxs("div",{className:"cluster-hex-metric",children:[n.jsx("span",{className:"metric-label",children:"CPU"}),n.jsx("div",{className:"metric-bar",children:n.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),n.jsx(Qd,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),n.jsxs("div",{className:"cluster-hex-metric",children:[n.jsx("span",{className:"metric-label",children:"MEM"}),n.jsx("div",{className:"metric-bar",children:n.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),n.jsx(Qd,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),n.jsxs("div",{className:"cluster-hex-stats",children:[n.jsxs("div",{className:"hex-stat",children:[n.jsx(Ci,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),n.jsx("span",{className:"hex-stat-label",children:r("cluster.nodes")})]}),n.jsxs("div",{className:"hex-stat",children:[n.jsx(Ci,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),n.jsx("span",{className:"hex-stat-label",children:r("cluster.vms_short")})]}),n.jsxs("div",{className:"hex-stat",children:[n.jsx(Ci,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),n.jsx("span",{className:"hex-stat-label",children:r("cluster.cts_short")})]})]}),a.has_ceph&&n.jsx("div",{className:"cluster-hex-ceph",children:n.jsxs("span",{className:`ceph-badge ${((l=a.ceph_health)==null?void 0:l.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),n.jsx("div",{className:"corner-decoration top-left"}),n.jsx("div",{className:"corner-decoration top-right"}),n.jsx("div",{className:"corner-decoration bottom-left"}),n.jsx("div",{className:"corner-decoration bottom-right"})]})}function Zd({clusters:e,globalSummary:t,onSelectCluster:r,isPaused:a=!1}){const{t:s}=Fe(),o=p.useMemo(()=>Object.entries(e),[e]),i=p.useMemo(()=>{let c=0,l=0,d=0,m=0;return Object.values(e).forEach(f=>{f.summary&&(c+=f.summary.total_cpu_usage||0,l+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,m++)}),{avgCpu:m>0?c/m:0,avgMem:m>0?l/m:0,avgStorage:m>0?d/m:0}},[e]);return n.jsxs("div",{className:"command-center",children:[n.jsx("div",{className:"grid-floor"}),n.jsxs("div",{className:"cc-header",children:[n.jsx("h1",{className:"cc-title font-display",children:n.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),n.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),n.jsxs("div",{className:"cc-content",children:[n.jsxs("div",{className:"cc-top-row",children:[n.jsxs("div",{className:"cc-gauges panel panel-scan",children:[n.jsx("div",{className:"panel-header",children:n.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),n.jsxs("div",{className:"gauges-container",children:[n.jsx(Mi,{value:i.avgCpu,label:s("metric.cpu"),color:_e(i.avgCpu),size:110}),n.jsx(Mi,{value:i.avgMem,label:s("metric.memory"),color:_e(i.avgMem),size:110}),n.jsx(Mi,{value:i.avgStorage,label:s("metric.disk"),color:_e(i.avgStorage),size:110})]})]}),n.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[n.jsx("div",{className:"panel-header",children:n.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),n.jsxs("div",{className:"stats-grid",children:[n.jsx(Ts,{label:s("cluster.total"),value:t.total_clusters,icon:n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),n.jsx(Ts,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),n.jsx("path",{d:"M8 21h8M12 17v4"})]})}),n.jsx(Ts,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),n.jsx("path",{d:"M3 9h18M9 3v18"})]})}),n.jsx(Ts,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:n.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),n.jsxs("div",{className:"cc-galaxy",children:[n.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),n.jsx("div",{className:"galaxy-container",children:o.length===0?n.jsxs("div",{className:"no-clusters",children:[n.jsx("div",{className:"no-clusters-icon",children:n.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 6v6l4 2"})]})}),n.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),n.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):n.jsx("div",{className:"cluster-grid",children:o.map(([c,l])=>n.jsx(ah,{cluster:l,onClick:()=>r(c)},c))})})]})]}),n.jsx("style",{children:`
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
      `})]})}function sh(e,t,r){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const c=(o-.08)/.14;i+=s*.2*Math.sin(c*Math.PI)}if(o>.24&&o<.4){const c=(o-.24)/.16;if(c<.2)i-=s*.15*Math.sin(c*5*Math.PI);else if(c<.5){const l=(c-.2)/.3;i+=s*(1+a*.5)*Math.sin(l*Math.PI)}else if(c<.7){const l=(c-.5)/.2;i-=s*.25*Math.sin(l*Math.PI)}}if(o>.48&&o<.72){const c=(o-.48)/.24;i+=s*.35*Math.sin(c*Math.PI)}return i*r}function zi({value:e,label:t,color:r,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const c=p.useRef(null),l=p.useRef(null),d=p.useRef([]),m=p.useRef(0),f=p.useRef(0),u=p.useRef(0),v=p.useRef(0),y=p.useRef(!i),k=p.useRef(!1),x=6e4/(50+e/100*50),h=12;p.useEffect(()=>{y.current=!i},[i]);const g=p.useCallback(()=>{const C=l.current;if(!C)return;C.fillStyle="rgba(5, 8, 15, 0.95)",C.fillRect(0,0,s,o),C.strokeStyle="rgba(0, 240, 255, 0.08)",C.lineWidth=.5;for(let U=0;U<o;U+=10)C.beginPath(),C.moveTo(0,U),C.lineTo(s,U),C.stroke();for(let U=0;U<s;U+=10)C.beginPath(),C.moveTo(U,0),C.lineTo(U,o),C.stroke();const $=o/2,E=o*.45,W=!a||e>90?"#ff0040":e>70?"#ff6b00":r;C.shadowColor=W,C.shadowBlur=6,C.strokeStyle=W,C.lineWidth=1.5,C.lineCap="round",C.lineJoin="round",C.beginPath();let B=!1;for(let U=0;U<s;U++){const le=(U-m.current+s)%s;if(le<8&&le>0)continue;const D=$-d.current[U]*E;B?C.lineTo(U,D):(C.moveTo(U,D),B=!0)}C.stroke(),C.shadowBlur=0,C.strokeStyle=`${W}60`,C.lineWidth=2,C.beginPath(),C.moveTo(m.current,0),C.lineTo(m.current,o),C.stroke();const re=C.createLinearGradient(m.current-15,0,m.current,0);re.addColorStop(0,"transparent"),re.addColorStop(1,`${W}30`),C.fillStyle=re,C.fillRect(m.current-15,0,15,o)},[s,o,e,a,r]);p.useEffect(()=>{const C=c.current;if(!C)return;const $=C.getContext("2d");if(!$)return;const E=window.devicePixelRatio||1;C.width=s*E,C.height=o*E,$.scale(E,E),l.current=$,d.current.length!==s&&(d.current=new Array(s).fill(0)),k.current=!0,g()},[s,o,g]),p.useEffect(()=>{if(!k.current||!l.current)return;const $=E=>{v.current||(v.current=E);const M=E-v.current;v.current=E;const W=M/1e3*h;f.current+=M/x,f.current>=1&&(f.current-=1);const B=Math.ceil(W);for(let re=0;re<B;re++){const le=(f.current+re/B*(M/x))%1;let D;a?D=sh(e,le,1):D=(Math.random()-.5)*.01,m.current=(m.current+1)%s,d.current[m.current]=D;const R=(m.current+1)%s;for(let ee=0;ee<8;ee++){const T=(R+ee)%s;d.current[T]=0}}g(),y.current&&(u.current=requestAnimationFrame($))};return i||(v.current=0,u.current=requestAnimationFrame($)),()=>{cancelAnimationFrame(u.current)}},[s,o,e,a,x,h,i,g]);const _=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":r;return n.jsxs("div",{className:"ecg-trace",children:[n.jsxs("div",{className:"ecg-trace-header",children:[n.jsx("span",{className:"ecg-trace-label",style:{color:_()},children:t}),n.jsx("span",{className:"ecg-trace-value",style:{color:_()},children:a?`${Math.round(e)}%`:"--"})]}),n.jsx("canvas",{ref:c,style:{width:s,height:o,display:"block"}}),n.jsx("style",{children:`
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
      `})]})}function oh({cpu:e,memory:t,diskIO:r,isOnline:a,isPaused:s=!1}){const o=p.useRef(null),[i,c]=p.useState(180);return p.useEffect(()=>{const l=o.current;if(!l)return;const d=()=>{const f=l.clientWidth-6;f>0&&c(f)};d();const m=new ResizeObserver(d);return m.observe(l),()=>m.disconnect()},[]),n.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[n.jsx(zi,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),n.jsx(zi,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),n.jsx(zi,{value:r,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),n.jsx("style",{children:`
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
      `})]})}function Jd(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),r=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=r?"danger":e>=t?"warning":"success"}function eu({value:e,decimals:t=0,suffix:r="",duration:a=800,className:s=""}){const[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const m=d.current?0:o;d.current=!1,c.current=null;const f=u=>{c.current||(c.current=u);const v=u-c.current,y=Math.min(v/a,1),k=1-Math.pow(1-y,3),j=m+(e-m)*k;i(j),y<1?l.current=requestAnimationFrame(f):i(e)};return l.current=requestAnimationFrame(f),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,a]),n.jsxs("span",{className:s,children:[o.toFixed(t),r]})}function tu({left:e,right:t,className:r=""}){const[a,s]=p.useState(0),[o,i]=p.useState(0),c=p.useRef(null),l=p.useRef(0),d=p.useRef(!0);return p.useEffect(()=>{const f=d.current?0:a,u=d.current?0:o;d.current=!1,c.current=null;const v=y=>{c.current||(c.current=y);const k=y-c.current,j=Math.min(k/800,1),x=1-Math.pow(1-j,3);s(Math.round(f+(e-f)*x)),i(Math.round(u+(t-u)*x)),j<1?l.current=requestAnimationFrame(v):(s(e),i(t))};return l.current=requestAnimationFrame(v),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),n.jsxs("span",{className:r,children:[a,"/",o]})}function ih(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function lh(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function ch({state:e,onClose:t,onShowDetails:r,getNodeHealth:a}){const{t:s}=Fe();if(p.useEffect(()=>{const f=()=>t(),u=()=>t(),v=y=>{y.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",u,!0),document.addEventListener("keydown",v)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",u,!0),document.removeEventListener("keydown",v)}},[e.visible,t]),!e.visible||!e.node)return null;const o=e.node,i=o.status==="online",c=a(e.clusterId,o.node),l=c?`https://${c.host}:${c.port}/#v1:0:=node/${o.node}`:null,d=f=>{f.stopPropagation(),l&&window.open(l,"_blank","noopener,noreferrer"),t()},m=f=>{f.stopPropagation(),r(),t()};return n.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[n.jsxs("div",{className:"context-menu-header",children:[n.jsx("span",{className:`context-status ${i?"online":"offline"}`}),n.jsx("span",{className:"context-menu-name",children:o.node})]}),n.jsx("div",{className:"context-menu-divider"}),n.jsxs("button",{className:"context-menu-item",onClick:m,children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),n.jsx("span",{children:s("vm.details")})]}),l&&n.jsxs("button",{className:"context-menu-item",onClick:d,children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),n.jsx("polyline",{points:"15,3 21,3 21,9"}),n.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),n.jsx("span",{children:s("node.open_pve")})]}),n.jsx("div",{className:"context-menu-divider"}),n.jsxs("div",{className:"context-menu-info",children:[n.jsxs("div",{className:"info-row",children:[n.jsxs("span",{children:[s("node.status"),":"]}),n.jsx("span",{className:i?"text-success":"text-danger",children:i?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),n.jsxs("div",{className:"info-row",children:[n.jsxs("span",{children:[s("metric.cpu"),":"]}),n.jsxs("span",{children:[o.cpu.cores," ",s("node.cores")]})]}),n.jsxs("div",{className:"info-row",children:[n.jsxs("span",{children:[s("metric.memory"),":"]}),n.jsx("span",{children:$e(o.memory.total_bytes)})]}),n.jsxs("div",{className:"info-row",children:[n.jsxs("span",{children:[s("cluster.vms_short"),":"]}),n.jsx("span",{children:o.vm_count})]}),n.jsxs("div",{className:"info-row",children:[n.jsxs("span",{children:[s("cluster.cts_short"),":"]}),n.jsx("span",{children:o.ct_count})]})]})]})}function dh({cpuUsage:e,memUsage:t,compact:r,label:a="AVG LOAD"}){const s=(e+t)/2,o=_e(s),i=.3+s/100*.7,[c,l]=p.useState(0),d=p.useRef(null),m=p.useRef(0),f=p.useRef(!0);return p.useEffect(()=>{const v=f.current?0:c;f.current=!1,d.current=null;const y=k=>{d.current||(d.current=k);const j=k-d.current,x=Math.min(j/1e3,1),h=1-Math.pow(1-x,3),g=v+(s-v)*h;l(g),x<1?m.current=requestAnimationFrame(y):l(s)};return m.current=requestAnimationFrame(y),()=>{m.current&&cancelAnimationFrame(m.current)}},[s]),n.jsxs("div",{className:`reactor-core ${r?"compact":""}`,children:[n.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[n.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),n.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),n.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),n.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),n.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[c.toFixed(0),"%"]}),n.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),n.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function uh({node:e,onClick:t,onContextMenu:r,clusterName:a,isPaused:s=!1}){_e(e.cpu.usage_percent),_e(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return n.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:r,children:[n.jsxs("div",{className:"node-header",children:[n.jsx("span",{className:`node-status ${o?"online":"offline"}`}),n.jsx("span",{className:"node-name",children:e.node}),a&&n.jsx("span",{className:"node-cluster-tag",children:a})]}),n.jsx("div",{className:"node-ecg-container",children:n.jsx(oh,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),n.jsxs("div",{className:"node-info",children:[n.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),n.jsx("span",{className:"node-info-item",children:Xo(e.uptime)})]}),n.jsx("div",{className:"corner-decoration top-left"}),n.jsx("div",{className:"corner-decoration top-right"}),n.jsx("div",{className:"corner-decoration bottom-left"}),n.jsx("div",{className:"corner-decoration bottom-right"})]})}function ph({node:e,storages:t,onClose:r}){const{t:a}=Fe(),s=e.status==="online",o=e.cpu.usage_percent,i=e.memory.used_bytes/e.memory.total_bytes*100,c=e.disk.used_bytes/e.disk.total_bytes*100;return n.jsx("div",{className:"node-detail-overlay",onClick:r,children:n.jsxs("div",{className:"node-detail-panel",onClick:l=>l.stopPropagation(),children:[n.jsxs("div",{className:"detail-header",children:[n.jsxs("div",{className:"detail-title",children:[n.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),n.jsx("h2",{children:e.node}),n.jsx("span",{className:"detail-tag",children:s?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),n.jsx("button",{className:"detail-close",onClick:r,children:"×"})]}),n.jsxs("div",{className:"detail-body",children:[n.jsxs("div",{className:"detail-section",children:[n.jsx("h3",{className:"section-title",children:a("node.system_info")}),n.jsxs("div",{className:"info-grid",children:[n.jsxs("div",{className:"info-item",children:[n.jsx("span",{className:"info-label",children:a("node.kernel")}),n.jsx("span",{className:"info-value",children:lh(e.kernel_version)})]}),n.jsxs("div",{className:"info-item",children:[n.jsx("span",{className:"info-label",children:a("node.pve_version")}),n.jsx("span",{className:"info-value",children:ih(e.pve_version)})]}),n.jsxs("div",{className:"info-item",children:[n.jsx("span",{className:"info-label",children:a("node.uptime")}),n.jsx("span",{className:"info-value",children:Xo(e.uptime)})]}),n.jsxs("div",{className:"info-item",children:[n.jsx("span",{className:"info-label",children:a("node.workloads")}),n.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),n.jsxs("div",{className:"detail-section",children:[n.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),n.jsxs("div",{className:"resource-bars",children:[n.jsxs("div",{className:"resource-bar-item",children:[n.jsxs("div",{className:"resource-header",children:[n.jsx("span",{className:"resource-label",children:a("metric.cpu")}),n.jsx("span",{className:`resource-value text-${_e(o)}`,children:rt(o,1)})]}),n.jsx("div",{className:"resource-track",children:n.jsx("div",{className:`resource-fill ${_e(o)}`,style:{width:`${o}%`}})}),n.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&n.jsxs("div",{className:"resource-bar-item",children:[n.jsxs("div",{className:"resource-header",children:[n.jsx("span",{className:"resource-label",children:a("node.io_wait")}),n.jsx("span",{className:`resource-value text-${Jd(e.cpu.iowait)}`,children:rt(e.cpu.iowait,1)})]}),n.jsx("div",{className:"resource-track",children:n.jsx("div",{className:`resource-fill ${Jd(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),n.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),n.jsxs("div",{className:"resource-bar-item",children:[n.jsxs("div",{className:"resource-header",children:[n.jsx("span",{className:"resource-label",children:a("metric.memory")}),n.jsx("span",{className:`resource-value text-${_e(i)}`,children:rt(i,1)})]}),n.jsx("div",{className:"resource-track",children:n.jsx("div",{className:`resource-fill ${_e(i)}`,style:{width:`${i}%`}})}),n.jsxs("span",{className:"resource-detail",children:[$e(e.memory.used_bytes)," / ",$e(e.memory.total_bytes)]})]}),n.jsxs("div",{className:"resource-bar-item",children:[n.jsxs("div",{className:"resource-header",children:[n.jsx("span",{className:"resource-label",children:a("node.root_disk")}),n.jsx("span",{className:`resource-value text-${_e(c)}`,children:rt(c,1)})]}),n.jsx("div",{className:"resource-track",children:n.jsx("div",{className:`resource-fill ${_e(c)}`,style:{width:`${c}%`}})}),n.jsxs("span",{className:"resource-detail",children:[$e(e.disk.used_bytes)," / ",$e(e.disk.total_bytes)]})]})]})]}),n.jsxs("div",{className:"detail-section",children:[n.jsx("h3",{className:"section-title",children:a("node.network_io")}),n.jsxs("div",{className:"network-stats",children:[n.jsxs("div",{className:"net-stat",children:[n.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),n.jsxs("span",{className:"net-value",children:[$e(e.network.rx_bytes_sec),"/s"]})]}),n.jsxs("div",{className:"net-stat",children:[n.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),n.jsxs("span",{className:"net-value",children:[$e(e.network.tx_bytes_sec),"/s"]})]})]})]}),n.jsxs("div",{className:"detail-section",children:[n.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?n.jsx("div",{className:"storage-list",children:t.map(l=>{const d=l.disk.used_bytes/l.disk.total_bytes*100;return n.jsxs("div",{className:`storage-item ${l.shared?"shared":"local"}`,children:[n.jsxs("div",{className:"storage-header",children:[n.jsx("span",{className:"storage-name",children:l.storage}),n.jsx("span",{className:"storage-type",children:l.type}),l.shared&&n.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),n.jsx("div",{className:"storage-bar",children:n.jsx("div",{className:`storage-fill ${_e(d)}`,style:{width:`${d}%`}})}),n.jsxs("div",{className:"storage-info",children:[n.jsxs("span",{children:[$e(l.disk.used_bytes)," / ",$e(l.disk.total_bytes)]}),n.jsx("span",{className:`text-${_e(d)}`,children:rt(d,1)})]}),n.jsx("div",{className:"storage-content-labels",children:[...l.content].sort().map(m=>n.jsx("span",{className:"content-label",children:m},m))})]},l.storage)})}):n.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),n.jsx("div",{className:"corner-decoration top-left"}),n.jsx("div",{className:"corner-decoration top-right"}),n.jsx("div",{className:"corner-decoration bottom-left"}),n.jsx("div",{className:"corner-decoration bottom-right"})]})})}function mh({cluster:e,clusters:t,onSelectVM:r,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Fe(),[i,c]=p.useState(null),[l,d]=p.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),m=!e&&t&&Object.keys(t).length>0,f=p.useCallback((g,_)=>{var C;return e&&e.client_health?e.client_health[_]||null:t&&((C=t[g])!=null&&C.client_health)&&t[g].client_health[_]||null},[e,t]),u=p.useCallback((g,_,C)=>{g.preventDefault(),g.stopPropagation();const $=Math.min(g.clientX,window.innerWidth-250),E=Math.min(g.clientY,window.innerHeight-280);d({visible:!0,x:$,y:E,node:_,clusterId:C})},[]),v=p.useCallback(()=>{d(g=>({...g,visible:!1}))},[]),y=p.useMemo(()=>{var _,C,$,E,M;const g=[];if(m)Object.entries(t).forEach(([W,B])=>{var U,le,D,R,ee;const re=Object.values(B.nodes);if(re.length>0){const T=re.reduce((F,H)=>F+H.cpu.usage_percent,0)/re.length,I=re.reduce((F,H)=>H.memory.total_bytes===0?F:F+H.memory.used_bytes/H.memory.total_bytes*100,0)/re.length;g.push({clusterId:W,clusterName:B.name||W,clusterNodes:re,isStandalone:((U=B.summary)==null?void 0:U.is_standalone)||!1,avgCpu:T,avgMem:I,vmsRunning:((le=B.summary)==null?void 0:le.vms_running)||0,ctsRunning:((D=B.summary)==null?void 0:D.cts_running)||0,vmCount:((R=B.summary)==null?void 0:R.vm_count)||0,ctCount:((ee=B.summary)==null?void 0:ee.ct_count)||0})}});else if(e){const W=Object.values(e.nodes),B=W.length>0?W.reduce((U,le)=>U+le.cpu.usage_percent,0)/W.length:0,re=W.length>0?W.reduce((U,le)=>le.memory.total_bytes===0?U:U+le.memory.used_bytes/le.memory.total_bytes*100,0)/W.length:0;g.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:W,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:B,avgMem:re,vmsRunning:((C=e.summary)==null?void 0:C.vms_running)||0,ctsRunning:(($=e.summary)==null?void 0:$.cts_running)||0,vmCount:((E=e.summary)==null?void 0:E.vm_count)||0,ctCount:((M=e.summary)==null?void 0:M.ct_count)||0})}return g},[e,t,m]),k=y.flatMap(g=>g.clusterNodes);p.useMemo(()=>k.length===0?0:k.reduce((g,_)=>g+_.cpu.usage_percent,0)/k.length,[k]),p.useMemo(()=>k.length===0?0:k.reduce((g,_)=>_.memory.total_bytes===0?g:g+_.memory.used_bytes/_.memory.total_bytes*100,0)/k.length,[k]);let j=null,x=[];if(i){const[g,_]=i.split("/");if(m&&t){const C=t[g];C&&(j=C.nodes[_]||null,x=Object.values(C.storages).filter($=>$.node===_))}else e&&(j=e.nodes[_]||null,x=Object.values(e.storages).filter(C=>C.node===_))}if(!e&&!m)return n.jsx("div",{className:"cluster-core empty",children:n.jsxs("div",{className:"empty-message",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:o("cluster.select")})]})});const h=m?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return n.jsxs("div",{className:"cluster-core",children:[n.jsx("div",{className:"grid-floor"}),n.jsx("div",{className:"core-header",children:n.jsxs("h1",{className:"core-title font-display",children:[n.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),n.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),n.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),n.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),n.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),h]})}),n.jsx("div",{className:"cluster-sections",children:y.map(g=>n.jsxs("div",{className:"cluster-section",children:[n.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(g.clusterId),title:a?o("cluster.view_vms_in",{name:g.clusterName}):void 0,children:[n.jsxs("div",{className:"section-title-group",children:[n.jsx("span",{className:"cluster-section-name",children:g.clusterName}),g.isStandalone&&n.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&n.jsx("span",{className:"nav-arrow",children:"→"})]}),n.jsxs("span",{className:"cluster-section-count",children:[g.clusterNodes.filter(_=>_.status==="online").length,"/",g.clusterNodes.length," ",o("cluster.nodes")]})]}),n.jsxs("div",{className:"cluster-section-content",children:[n.jsx("div",{className:"section-reactor",children:n.jsx(dh,{cpuUsage:g.avgCpu,memUsage:g.avgMem,compact:!0,label:o("node.avg_load")})}),n.jsxs("div",{className:"section-nodes",children:[n.jsx("div",{className:"nodes-grid",children:g.clusterNodes.map(_=>n.jsx(uh,{node:_,onClick:()=>c(`${g.clusterId}/${_.node}`),onContextMenu:C=>u(C,_,g.clusterId),isPaused:s},`${g.clusterId}-${_.node}`))}),n.jsxs("div",{className:"ecg-legend",children:[n.jsxs("span",{className:"ecg-legend-item",children:[n.jsx("span",{className:"ecg-legend-line cpu"}),n.jsx("span",{children:o("metric.cpu")})]}),n.jsxs("span",{className:"ecg-legend-item",children:[n.jsx("span",{className:"ecg-legend-line mem"}),n.jsx("span",{children:o("metric.memory")})]}),n.jsxs("span",{className:"ecg-legend-item",children:[n.jsx("span",{className:"ecg-legend-line io"}),n.jsx("span",{children:o("node.io_wait")})]})]})]}),n.jsxs("div",{className:"section-telemetry",children:[n.jsxs("div",{className:"mini-telemetry",children:[n.jsxs("div",{className:"mini-chart",children:[n.jsx("span",{className:"mini-label",children:"CPU"}),n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-fill ${_e(g.avgCpu)}`,style:{width:`${g.avgCpu}%`}})}),n.jsx(eu,{value:g.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${_e(g.avgCpu)}`})]}),n.jsxs("div",{className:"mini-chart",children:[n.jsx("span",{className:"mini-label",children:"MEM"}),n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-fill ${_e(g.avgMem)}`,style:{width:`${g.avgMem}%`}})}),n.jsx(eu,{value:g.avgMem,decimals:0,suffix:"%",className:`mini-value text-${_e(g.avgMem)}`})]})]}),n.jsxs("div",{className:"mini-stats",children:[n.jsxs("div",{className:"mini-stat",children:[n.jsx(tu,{left:g.vmsRunning,right:g.vmCount,className:"mini-stat-value"}),n.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),n.jsxs("div",{className:"mini-stat",children:[n.jsx(tu,{left:g.ctsRunning,right:g.ctCount,className:"mini-stat-value"}),n.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},g.clusterId))}),n.jsx("div",{className:"core-footer",children:n.jsxs("button",{className:"btn-view-vms",onClick:r,children:[o("cluster.view_all_vms")," →"]})}),j&&n.jsx(ph,{node:j,storages:x,onClose:()=>c(null)}),n.jsx(ch,{state:l,onClose:v,onShowDetails:()=>{l.node&&c(`${l.clusterId}/${l.node.node}`)},getNodeHealth:f}),n.jsx("style",{children:`
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
      `})]})}function Hm({state:e,onClose:t,onShowDetails:r,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:c,getNodeHealth:l,userRole:d,consoleMode:m,consolePasswordSet:f,hideSnapshots:u,hideBackup:v,hideRemoteMigrate:y,hideConsole:k}){const{t:j}=Fe(),x=pa();if(p.useEffect(()=>{const M=()=>t(),W=()=>t(),B=re=>{re.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",M),document.addEventListener("scroll",W,!0),document.addEventListener("keydown",B)),()=>{document.removeEventListener("click",M),document.removeEventListener("scroll",W,!0),document.removeEventListener("keydown",B)}},[e.visible,t]),!e.visible||!e.vm)return null;const h=e.vm,g=l(e.clusterId,h.node),_=g?`https://${g.host}:${g.port}/#v1:0:=${h.type}/${h.vmid}`:null,C=M=>{M.stopPropagation(),_&&window.open(_,"_blank","noopener,noreferrer"),t()},$=M=>{M.stopPropagation(),r(),t()},E=n.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:M=>M.stopPropagation(),children:[n.jsxs("div",{className:"context-menu-header",children:[n.jsx("span",{className:"context-menu-name",children:h.name}),n.jsxs("span",{className:"context-menu-id",children:["#",h.vmid]})]}),n.jsx("div",{className:"context-menu-divider"}),n.jsxs("button",{className:"context-menu-item",onClick:$,children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),n.jsx("span",{children:j("vm.details")})]}),_&&n.jsxs("button",{className:"context-menu-item",onClick:C,children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),n.jsx("polyline",{points:"15,3 21,3 21,9"}),n.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),n.jsx("span",{children:j("vm.open_pve")})]}),!k&&(d==="operator"||d==="admin")&&(()=>{const M=m==="disabled"?"console.disabled":h.status!=="running"?"console.vm_not_running":null,W=!!M;return n.jsxs("button",{className:`context-menu-item ${W?"is-disabled":""}`,title:W?j(M):void 0,onClick:B=>{if(B.stopPropagation(),W){t(),x.alert(j(M));return}s(),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),n.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),n.jsx("polyline",{points:"6 8 9 11 6 14"}),n.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),n.jsx("span",{children:j("vm.console")})]})})(),!u&&(d==="operator"||d==="admin")&&n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),o(),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("path",{d:"M12 7v5l3 2"})]}),n.jsx("span",{children:j("vm.snapshots")})]}),!v&&(d==="operator"||d==="admin")&&n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),i(),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),n.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),n.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),n.jsx("span",{children:j("vm.backup_now")})]}),(d==="operator"||d==="admin")&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"context-menu-divider"}),h.status!=="running"&&n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"start"}),t()},children:[n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:n.jsx("polygon",{points:"6,4 20,12 6,20"})}),n.jsx("span",{children:j("vm.start")})]}),h.status==="running"&&n.jsxs(n.Fragment,{children:[n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"shutdown"}),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),n.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),n.jsx("span",{children:j("vm.shutdown_acpi")})]}),n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"reboot"}),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("polyline",{points:"23,4 23,10 17,10"}),n.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),n.jsx("span",{children:j("vm.reboot")})]}),n.jsxs("button",{className:"context-menu-item danger",onClick:M=>{M.stopPropagation(),a({vm:h,clusterId:e.clusterId,action:"stop"}),t()},children:[n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:n.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),n.jsx("span",{children:j("vm.stop_hard")})]})]})]}),!y&&d==="admin"&&h.type!=="lxc"&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"context-menu-divider"}),n.jsxs("button",{className:"context-menu-item",onClick:M=>{M.stopPropagation(),c(),t()},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M3 12h12"}),n.jsx("polyline",{points:"13 6 19 12 13 18"}),n.jsx("circle",{cx:"20",cy:"6",r:"2"}),n.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),n.jsx("span",{children:j("vm.migrate_remote")})]})]}),n.jsx("style",{children:`
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
      `})]});return Tc.createPortal(E,document.body)}const fh={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function gh(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function hh({task:e}){const t=fh[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},r=gh(e.task_type);return n.jsxs("span",{className:`task-badge ${r}`,style:{"--task-color":t.color},title:t.label,children:[n.jsx("span",{className:"task-badge-icon",children:t.icon}),n.jsx("span",{className:"task-badge-text",children:t.label}),n.jsx("style",{children:xh})]})}const xh=`
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
`;function vh({open:e,title:t,details:r,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:c,onCancel:l}){const[d,m]=Po.useState(""),f=p.useRef(null),u=p.useRef(null);if(p.useEffect(()=>{e&&(m(""),setTimeout(()=>{var y,k;a?(y=u.current)==null||y.focus():(k=f.current)==null||k.focus()},50))},[e,a]),p.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&(k.preventDefault(),l()),k.key==="Enter"&&(!a||d===a)&&(k.preventDefault(),c())};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,d,a,c,l]),!e)return null;const v=!a||d===a;return n.jsxs("div",{onClick:l,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[n.jsx("style",{children:`
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
      `}),n.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:y=>y.stopPropagation(),children:[n.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),n.jsx("h3",{className:"cm-title",children:t}),r&&n.jsx("div",{className:"cm-details",children:r}),a&&n.jsxs(n.Fragment,{children:[n.jsxs("label",{className:"cm-input-label",children:["Type ",n.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),n.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:y=>m(y.target.value),autoComplete:"off",spellCheck:!1})]}),n.jsxs("div",{className:"cm-actions",children:[n.jsx("button",{className:"cm-btn cancel",onClick:l,children:i}),n.jsx("button",{ref:f,className:`cm-btn confirm ${s?"danger":""}`,disabled:!v,onClick:c,children:o})]})]})]})}function Ma({value:e,options:t,onChange:r,placeholder:a,className:s,disabled:o}){const[i,c]=p.useState(!1),[l,d]=p.useState(-1),m=p.useRef(null),f=p.useRef(null),u=p.useId(),v=t.find(x=>x.value===e);p.useEffect(()=>{if(!i)return;const x=g=>{var E,M;const _=g.target,C=(E=m.current)==null?void 0:E.contains(_),$=(M=f.current)==null?void 0:M.contains(_);!C&&!$&&c(!1)},h=g=>{if(g.key==="Escape"){c(!1);return}if(g.key==="ArrowDown")g.preventDefault(),d(_=>Math.min(t.length-1,_<0?0:_+1));else if(g.key==="ArrowUp")g.preventDefault(),d(_=>Math.max(0,_-1));else if(g.key==="Enter"){g.preventDefault();const _=t[l];_&&!_.disabled&&(r(_.value),c(!1))}};return document.addEventListener("mousedown",x),document.addEventListener("keydown",h),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("keydown",h)}},[i,l,t,r]);const y=()=>{o||(c(x=>!x),d(t.findIndex(x=>x.value===e)))},[k,j]=p.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return p.useLayoutEffect(()=>{if(!i)return;const x=()=>{var W;const h=(W=m.current)==null?void 0:W.getBoundingClientRect();if(!h)return;const g=6,_=320,C=window.innerHeight-h.bottom-g-8,$=h.top-g-8,E=C<160&&$>C+40,M=Math.max(120,Math.min(_,E?$:C));j({left:h.left,top:E?h.top-g:h.bottom+g,width:h.width,flipUp:E,maxH:M})};return x(),window.addEventListener("resize",x),window.addEventListener("scroll",x,!0),()=>{window.removeEventListener("resize",x),window.removeEventListener("scroll",x,!0)}},[i]),n.jsxs("div",{ref:m,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[n.jsx("style",{children:yh}),n.jsxs("button",{type:"button",id:u,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:y,disabled:o,children:[n.jsx("span",{className:"cyber-select-value",children:v?v.label:a||"—"}),n.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:n.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&Tc.createPortal(n.jsx("div",{ref:f,className:"cyber-select-list",role:"listbox",style:{left:k.left,width:k.width,...k.flipUp?{bottom:window.innerHeight-k.top,top:"auto"}:{top:k.top},maxHeight:k.maxH},children:t.map((x,h)=>n.jsxs("div",{role:"option","aria-selected":x.value===e,"aria-disabled":x.disabled||void 0,className:`cyber-select-opt ${x.value===e?"selected":""} ${h===l?"hover":""} ${x.disabled?"disabled":""}`,onMouseEnter:()=>d(h),onClick:()=>{x.disabled||(r(x.value),c(!1))},children:[n.jsx("div",{className:"cyber-select-opt-main",children:x.label}),x.hint&&n.jsx("div",{className:"cyber-select-opt-hint",children:x.hint}),x.value===e&&n.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:n.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},x.value))}),document.body)]})}const yh=`
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
`,bh=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function Ym({open:e,cluster_id:t,vm:r,onClose:a,onMigrationStarted:s}){const{t:o}=Fe(),[i,c]=p.useState("endpoint"),[l,d]=p.useState([]),[m,f]=p.useState(""),[u,v]=p.useState(""),[y,k]=p.useState(!1),[j,x]=p.useState(null),[h,g]=p.useState(null),[_,C]=p.useState(!1),[$,E]=p.useState({}),[M,W]=p.useState({}),[B,re]=p.useState(""),[U,le]=p.useState(""),[D,R]=p.useState(!0),[ee,T]=p.useState(!1),[I,F]=p.useState(""),[H,G]=p.useState(""),[b,he]=p.useState(""),[fe,ve]=p.useState(null),[J,se]=p.useState(!1),Ue=async()=>{if(!(!r||!te)){se(!0),ve(null),G("");try{const A=await Ie.migrationPrecheck(t,r.vmid,te.cluster_id,te.node_name||te.node_host);ve({ok:A.ok,blockers:A.blockers,warnings:A.warnings})}catch(A){const Q=A instanceof Error?A.message:String(A);G(`pre-flight check failed: ${Q}`)}finally{se(!1)}}};p.useEffect(()=>{e&&(c("endpoint"),d([]),f(""),v(""),x(null),g(null),E({}),W({}),re(""),le(r?String(r.vmid):""),F(""),G(""),he(""),ve(null),Ie.listRemoteEndpoints(t).then(A=>d(A.endpoints)).catch(A=>G(`could not list target clusters: ${A.message||A}`)),r&&Ie.getMigrationSource(t,r.vmid).then(x).catch(A=>G(`could not introspect source VM: ${A.message||A}`)))},[e,t,r]),p.useEffect(()=>{if(!e)return;const A=Q=>{Q.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",A),()=>document.removeEventListener("keydown",A)},[e,i,a]);const te=l.find(A=>Ei(A)===m),ce=async A=>{var xe;f(A);const Q=l.find(oe=>Ei(oe)===A);if(Q){k(!0),C(!0),G(""),g(null),re("");try{const oe=await Ie.fetchRemoteFingerprint(Q.node_host,Q.node_port);v(oe.fingerprint)}catch(oe){const be=oe instanceof Error?oe.message:String(oe);G(`could not auto-fetch fingerprint (${be}); paste manually`),v("")}finally{k(!1)}try{const oe=Q.node_name||Q.node_host,be=await Ie.getMigrationTargets(Q.cluster_id,oe);g(be);const Ae=be.ips.find(it=>it.address===Q.node_host);re(Ae?Ae.address:((xe=be.ips[0])==null?void 0:xe.address)||Q.node_host)}catch(oe){const be=oe instanceof Error?oe.message:String(oe);G(`could not enumerate target node resources: ${be}`)}finally{C(!1)}}};p.useEffect(()=>{!j||!h||(E(A=>{const Q={...A};return j.disks.forEach(xe=>{var oe;if(!Q[xe.key]){const be=h.storages.find(Ae=>Ae.storage===xe.storage);Q[xe.key]=((oe=be||h.storages[0])==null?void 0:oe.storage)||""}}),Q}),W(A=>{const Q={...A};return j.nics.forEach(xe=>{var oe;if(!Q[xe.key]){const be=h.bridges.find(Ae=>Ae.iface===xe.bridge);Q[xe.key]=((oe=be||h.bridges[0])==null?void 0:oe.iface)||""}}),Q}))},[j,h]);const L=p.useMemo(()=>{if(!j)return"";const A=new Set,Q=new Map;return j.disks.forEach(xe=>{const oe=$[xe.key];xe.storage&&oe&&(Q.set(xe.storage,oe),A.add(oe))}),A.size===1?Array.from(A)[0]:Array.from(Q.entries()).map(([xe,oe])=>`${xe}=${oe}`).join(",")},[j,$]),N=p.useMemo(()=>{if(!j)return"";const A=new Set,Q=new Map;return j.nics.forEach(xe=>{const oe=M[xe.key];xe.bridge&&oe&&(Q.set(xe.bridge,oe),A.add(oe))}),A.size===1?Array.from(A)[0]:Array.from(Q.entries()).map(([xe,oe])=>`${xe}=${oe}`).join(",")},[j,M]),Y=async()=>{if(!(!r||!te)){c("submitting"),G("");try{const A=await Ie.remoteMigrate(t,r.vmid,{target_cluster_id:te.cluster_id,target_endpoint_host:B||te.node_host,target_endpoint_port:te.node_port,target_endpoint_fingerprint:u||void 0,target_vmid:parseInt(U,10),target_bridge_map:N,target_storage_map:L,online:D,delete_source:ee,bwlimit:I?parseInt(I,10):void 0});he(A.upid),c("done"),s==null||s(A.upid)}catch(A){const Q=A instanceof Error?A.message:String(A);G(Q),c("error")}}};if(!e||!r)return null;const de=!!U&&/^\d+$/.test(U)&&!!j&&!!h&&j.disks.every(A=>!!$[A.key])&&j.nics.every(A=>!!M[A.key]),ne=i==="endpoint"?!!te&&!!h&&!!B:i==="mappings"?de:!0;return n.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:kh,children:[n.jsx("style",{children:jh}),n.jsxs("div",{className:"rmm",onClick:A=>A.stopPropagation(),children:[n.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),n.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:r.vmid,name:r.name})}),i==="endpoint"&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),n.jsx("label",{children:o("rmm.endpoint.target")}),n.jsx(Ma,{value:m,placeholder:o("rmm.endpoint.select"),options:l.map(A=>({value:Ei(A),label:`${A.cluster_name} @ ${A.node_host}:${A.node_port}`})),onChange:A=>ce(A)}),n.jsx("label",{children:o("rmm.endpoint.fp_label")}),n.jsx("input",{type:"text",value:u,onChange:A=>v(A.target.value),placeholder:y?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),te&&n.jsxs(n.Fragment,{children:[n.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",n.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),n.jsx(Ma,{value:B,disabled:_||!h,placeholder:_?o("rmm.endpoint.datapath_loading"):"",options:_?[]:!h||h.ips.length===0?[{value:te.node_host,label:`${te.node_host} (mgmt)`}]:h.ips.map(A=>({value:A.address,label:`${A.address} · ${A.iface} (${A.type})`})),onChange:A=>re(A)}),n.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),H&&n.jsx("div",{className:"rmm-err",children:H}),n.jsxs("div",{className:"rmm-actions",children:[n.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),n.jsx("button",{className:"primary",disabled:!ne,onClick:()=>c("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&te&&j&&h&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),n.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",n.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),n.jsx("input",{type:"text",inputMode:"numeric",value:U,onChange:A=>le(A.target.value)}),j.disks.length>0&&n.jsxs(n.Fragment,{children:[n.jsx("label",{children:o("rmm.mappings.disks")}),n.jsxs("div",{className:"rmm-maptable",children:[n.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[n.jsx("span",{children:o("rmm.mappings.col_source")}),n.jsx("span",{children:o("rmm.mappings.col_size")}),n.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),j.disks.map(A=>n.jsxs("div",{className:"rmm-maprow",children:[n.jsx("code",{className:"rmm-mapkey",children:A.key}),n.jsxs("code",{className:"rmm-mapsrc",children:[A.storage," ",n.jsx("em",{children:A.size})]}),n.jsx(Ma,{value:$[A.key]||"",options:h.storages.map(Q=>({value:Q.storage,label:`${Q.storage} (${Q.type}, ${bh(Q.avail)} free)`})),onChange:Q=>E({...$,[A.key]:Q})})]},A.key))]})]}),j.nics.length>0&&n.jsxs(n.Fragment,{children:[n.jsx("label",{children:o("rmm.mappings.nics")}),n.jsxs("div",{className:"rmm-maptable",children:[n.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[n.jsx("span",{children:o("rmm.mappings.col_source")}),n.jsx("span",{children:o("rmm.mappings.col_bridge")}),n.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),j.nics.map(A=>n.jsxs("div",{className:"rmm-maprow",children:[n.jsx("code",{className:"rmm-mapkey",children:A.key}),n.jsxs("code",{className:"rmm-mapsrc",children:[A.bridge," ",n.jsx("em",{children:A.model})]}),n.jsx(Ma,{value:M[A.key]||"",options:h.bridges.map(Q=>({value:Q.iface,label:`${Q.iface}${Q.address?` (${Q.address})`:""}`})),onChange:Q=>W({...M,[A.key]:Q})})]},A.key))]})]}),n.jsxs("div",{className:"rmm-row",children:[n.jsxs("label",{className:"rmm-check",children:[n.jsx("input",{type:"checkbox",checked:D,onChange:A=>R(A.target.checked)}),n.jsx("span",{children:o("rmm.mappings.online")})]}),n.jsxs("label",{className:"rmm-check",children:[n.jsx("input",{type:"checkbox",checked:ee,onChange:A=>T(A.target.checked)}),n.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),n.jsx("label",{children:o("rmm.mappings.bwlimit")}),n.jsx("input",{type:"text",inputMode:"numeric",value:I,onChange:A=>F(A.target.value),placeholder:"0"}),H&&n.jsx("div",{className:"rmm-err",children:H}),n.jsxs("div",{className:"rmm-actions",children:[n.jsx("button",{className:"ghost",onClick:()=>c("endpoint"),children:o("rmm.action.back")}),n.jsx("button",{className:"primary danger",disabled:!ne,onClick:()=>c("review"),children:o("rmm.action.review")})]})]}),i==="review"&&te&&n.jsxs(n.Fragment,{children:[n.jsx(wh,{vm:r,selected:te,clusterId:t,precheck:fe,precheckLoading:J,onRun:Ue,t:o}),n.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),n.jsxs("div",{className:"rmm-review",children:[n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.from")}),n.jsxs("code",{children:[t,"/",r.node,"/vm/",r.vmid," (",r.name,")"]})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.to")}),n.jsxs("code",{children:[te.cluster_id,"/",te.node_host,":",te.node_port," → vmid ",U]})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.data_path")}),n.jsx("code",{children:B})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.fingerprint")}),n.jsx("code",{className:"trunc",children:u||n.jsx("em",{children:o("rmm.review.fp_none")})})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.storage_map")}),n.jsx("code",{children:L||"<empty>"})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.bridge_map")}),n.jsx("code",{children:N||"<empty>"})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.online")}),n.jsx("code",{children:o(D?"rmm.review.online_yes":"rmm.review.online_no")})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.delete_source")}),n.jsx("code",{children:o(ee?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.review.bandwidth")}),n.jsx("code",{children:I?`${I} KB/s`:o("rmm.review.unlimited")})]})]}),n.jsxs("div",{className:"rmm-actions",children:[n.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),n.jsx("button",{className:"primary danger",disabled:J||fe!==null&&!fe.ok,onClick:Y,children:o("rmm.action.start")})]})]}),i==="submitting"&&n.jsxs("div",{className:"rmm-spin",children:[n.jsx("div",{className:"rmm-spin-ring"}),n.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),n.jsxs("div",{className:"rmm-review",children:[n.jsxs("div",{children:[n.jsx("span",{children:o("rmm.done.upid")}),n.jsx("code",{className:"trunc",style:{userSelect:"all"},children:b})]}),n.jsxs("div",{children:[n.jsx("span",{}),n.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),n.jsx("div",{className:"rmm-actions",children:n.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"rmm-err",style:{marginTop:16},children:H}),n.jsxs("div",{className:"rmm-actions",children:[n.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),n.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function Ei(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function wh({vm:e,selected:t,clusterId:r,precheck:a,precheckLoading:s,onRun:o,t:i}){if(Po.useEffect(()=>{a===null&&!s&&o()},[]),s)return n.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const c=a.blockers.length>0,l=a.warnings.length>0,d=c?"blockers":l?"warnings":"ok";return n.jsxs("div",{className:`rmm-precheck ${d}`,children:[c&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),n.jsx("ul",{children:a.blockers.map((m,f)=>n.jsx("li",{children:m},f))})]}),l&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),n.jsx("ul",{children:a.warnings.map((m,f)=>n.jsx("li",{children:m},f))})]}),!c&&!l&&n.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),n.jsx("div",{className:"rmm-precheck-actions",children:n.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const kh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},jh=`
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
`;function _h(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function Gm({open:e,cluster_id:t,vm:r,onClose:a}){const{t:s}=Fe(),o=pa(),[i,c]=p.useState([]),[l,d]=p.useState(!1),[m,f]=p.useState(!1),[u,v]=p.useState(""),[y,k]=p.useState(""),[j,x]=p.useState(!1),[h,g]=p.useState(""),_=async()=>{if(r){d(!0),g("");try{const M=await Ie.listSnapshots(t,r.vmid);c((M.snapshots||[]).filter(W=>W.name!=="current"))}catch(M){g(M instanceof Error?M.message:String(M))}finally{d(!1)}}};if(p.useEffect(()=>{e&&(v(""),k(""),x(!1),g(""),_())},[e,t,r==null?void 0:r.vmid]),p.useEffect(()=>{if(!e)return;const M=W=>{W.key==="Escape"&&a()};return document.addEventListener("keydown",M),()=>document.removeEventListener("keydown",M)},[e,a]),!e||!r)return null;const C=async()=>{if(u){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(u)){g("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}f(!0),g("");try{await Ie.createSnapshot(t,r.vmid,{snapname:u,description:y,vmstate:j}),v(""),k(""),x(!1),await _()}catch(M){g(M instanceof Error?M.message:String(M))}finally{f(!1)}}},$=async M=>{if(await o.confirm(s("snap.confirm_delete",{name:M.name}),{destructive:!0})){g("");try{await Ie.deleteSnapshot(t,r.vmid,M.name),await _()}catch(W){g(W instanceof Error?W.message:String(W))}}},E=async M=>{if(await o.confirm(s("snap.confirm_rollback",{name:M.name}),{destructive:!0})){g("");try{await Ie.rollbackSnapshot(t,r.vmid,M.name),await _()}catch(W){g(W instanceof Error?W.message:String(W))}}};return n.jsxs("div",{onClick:a,style:Nh,children:[n.jsx("style",{children:Sh}),n.jsxs("div",{className:"sm-modal",onClick:M=>M.stopPropagation(),children:[n.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),n.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:r.vmid,name:r.name})}),n.jsxs("div",{className:"sm-create",children:[n.jsxs("div",{className:"sm-row",children:[n.jsx("label",{children:s("snap.name")}),n.jsx("input",{type:"text",value:u,onChange:M=>v(M.target.value),placeholder:"my-snap",spellCheck:!1})]}),n.jsxs("div",{className:"sm-row",children:[n.jsx("label",{children:s("snap.description")}),n.jsx("input",{type:"text",value:y,onChange:M=>k(M.target.value)})]}),n.jsxs("div",{className:"sm-row sm-check-row",children:[n.jsxs("label",{className:"sm-check",children:[n.jsx("input",{type:"checkbox",checked:j,onChange:M=>x(M.target.checked)}),n.jsx("span",{children:s("snap.include_state")})]}),n.jsx("button",{className:"sm-btn primary",disabled:m||!u,onClick:C,children:m?"…":s("snap.create")})]})]}),h&&n.jsx("div",{className:"sm-err",children:h}),n.jsxs("div",{className:"sm-list",children:[l&&n.jsx("div",{className:"sm-empty",children:"…"}),!l&&i.length===0&&n.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&i.map(M=>n.jsxs("div",{className:"sm-item",children:[n.jsxs("div",{className:"sm-item-head",children:[n.jsx("code",{className:"sm-name",children:M.name}),M.parent&&n.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",n.jsx("code",{children:M.parent})]}),n.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",_h(M.snaptime)]}),M.vmstate?n.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),M.description&&n.jsx("div",{className:"sm-desc",children:M.description}),n.jsxs("div",{className:"sm-item-actions",children:[n.jsx("button",{className:"sm-btn ghost",onClick:()=>E(M),children:s("snap.rollback")}),n.jsx("button",{className:"sm-btn danger",onClick:()=>$(M),children:s("snap.delete")})]})]},M.name))]}),n.jsx("div",{className:"sm-actions",children:n.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const Nh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},Sh=`
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
`;function Km({open:e,cluster_id:t,vm:r,onClose:a}){const{t:s}=Fe(),[o,i]=p.useState([]),[c,l]=p.useState(!1),[d,m]=p.useState(""),[f,u]=p.useState("snapshot"),[v,y]=p.useState("zstd"),[k,j]=p.useState(""),[x,h]=p.useState(""),[g,_]=p.useState(!1);if(p.useEffect(()=>{!e||!r||(j(""),h(""),m(""),l(!0),Ie.getCluster(t).then(E=>{const W=Object.values(E.storages||{}).filter(B=>{var U;if(!((U=B.content)!=null&&U.includes("backup")))return!1;const re=B.allowed_nodes||[];return re.length>0&&!re.includes(r.node)||!B.shared&&B.node!==r.node?!1:B.enabled!==!1});i(W),W.length>0&&m(W[0].storage)}).catch(E=>j(E.message||String(E))).finally(()=>l(!1)))},[e,t,r==null?void 0:r.vmid,r==null?void 0:r.node]),p.useEffect(()=>{if(!e)return;const E=M=>{M.key==="Escape"&&!g&&a()};return document.addEventListener("keydown",E),()=>document.removeEventListener("keydown",E)},[e,g,a]),!e||!r)return null;const C=o.length>0,$=async()=>{if(d){_(!0),j("");try{const E=await Ie.triggerBackup(t,r.node,{vmid:r.vmid,storage:d,mode:f,compress:v});h(E.upid)}catch(E){j(E instanceof Error?E.message:String(E))}finally{_(!1)}}};return n.jsxs("div",{onClick:()=>!g&&a(),style:Ch,children:[n.jsx("style",{children:Mh}),n.jsxs("div",{className:"bm-modal",onClick:E=>E.stopPropagation(),children:[n.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",r.node]}),n.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:r.vmid,name:r.name})}),!x&&n.jsxs(n.Fragment,{children:[n.jsx("label",{children:s("backup.storage")}),c?n.jsx("div",{className:"bm-empty",children:"…"}):C?n.jsx("select",{value:d,onChange:E=>m(E.target.value),children:o.map(E=>n.jsxs("option",{value:E.storage,children:[E.storage," (",E.type,E.shared?", shared":"",")"]},E.storage))}):n.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),n.jsx("label",{children:s("backup.mode")}),n.jsxs("select",{value:f,onChange:E=>u(E.target.value),children:[n.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),n.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),n.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),n.jsx("label",{children:s("backup.compress")}),n.jsxs("select",{value:v,onChange:E=>y(E.target.value),children:[n.jsx("option",{value:"zstd",children:"zstd"}),n.jsx("option",{value:"lzo",children:"lzo"}),n.jsx("option",{value:"gzip",children:"gzip"}),n.jsx("option",{value:"0",children:"none"})]}),k&&n.jsx("div",{className:"bm-err",children:k}),n.jsxs("div",{className:"bm-actions",children:[n.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:g,children:s("action.cancel")}),n.jsx("button",{className:"bm-btn primary",disabled:g||!d,onClick:$,children:g?"…":s("backup.start")})]})]}),x&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"bm-ok",children:s("backup.started")}),n.jsx("div",{className:"bm-review",children:n.jsxs("div",{children:[n.jsx("span",{children:s("rmm.done.upid")}),n.jsx("code",{style:{userSelect:"all"},children:x})]})}),n.jsx("div",{className:"bm-actions",children:n.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const Ch={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},Mh=`
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
`;function Xm({open:e,cluster_id:t,pveUser:r,onCancel:a,onSubmit:s}){const{t:o}=Fe(),[i,c]=p.useState(""),[l,d]=p.useState(!1),[m,f]=p.useState(""),u=p.useRef(null);if(p.useEffect(()=>{e&&(c(""),f(""),d(!1),setTimeout(()=>{var y;return(y=u.current)==null?void 0:y.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const y=k=>{k.key==="Escape"&&!l&&a()};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,l,a]),!e)return null;const v=async()=>{if(i){d(!0),f("");try{await s(i)}catch(y){const k=y instanceof Error?y.message:String(y);f(o("console.prepare_failed",{err:k})),d(!1)}}};return n.jsxs("div",{onClick:()=>!l&&a(),style:zh,children:[n.jsx("style",{children:Eh}),n.jsxs("div",{className:"cpw-modal",onClick:y=>y.stopPropagation(),children:[n.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),n.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),n.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:r,cluster:t})}),n.jsx("label",{children:o("console.prompt_label")}),n.jsx("input",{ref:u,type:"password",value:i,onChange:y=>c(y.target.value),onKeyDown:y=>{y.key==="Enter"&&v()},autoComplete:"current-password",spellCheck:!1}),m&&n.jsx("div",{className:"cpw-err",children:m}),n.jsxs("div",{className:"cpw-actions",children:[n.jsx("button",{className:"ghost",onClick:a,disabled:l,children:o("action.cancel")}),n.jsx("button",{className:"primary",onClick:v,disabled:l||!i,children:l?"…":o("console.prompt_open")})]})]})]})}const zh={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},Eh=`
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
`;function qo(){const[e,t]=p.useState(!0),[r,a]=p.useState(null),[s,o]=p.useState(!1),i=async()=>{try{const l=await Ie.authMe();l.authenticated&&l.user?(a(l.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},c=async()=>{try{await Ie.authLogout()}catch{}window.location.replace("/login")};return p.useEffect(()=>{i()},[]),{loading:e,user:r,authEnforced:s,refresh:i,logout:c}}function $i(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function $h(e){return e==="stop"||e==="shutdown"||e==="reboot"}function Ps(e,t,r,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&r){const i=s[r];if(i)return o(i)}else if(a)return o(a);return null}const ru=Po.forwardRef(function({vm:t,isSelected:r,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:c=!1,isCompleting:l=!1},d){var $,E,M;const m=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,v=Math.max(t.cpu.usage_percent,f,u),y=m?_e(v):"muted",k=!!i,j=($=i==null?void 0:i.task_type)==null?void 0:$.includes("migrate"),x=((E=i==null?void 0:i.task_type)==null?void 0:E.includes("backup"))||((M=i==null?void 0:i.task_type)==null?void 0:M.includes("vzdump")),h=t.name.length>12?t.name.substring(0,11)+"…":t.name,_=i?(W=>{const B=W.toLowerCase();return B.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:B.includes("backup")||B.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:B.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:B.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:B.includes("clone")?{label:"CLONE",color:"#10b981"}:B.includes("start")||B.includes("qmstart")?{label:"START",color:"#00ff88"}:B.includes("stop")||B.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:B.includes("reboot")||B.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,C=i?{type:i.task_type,target:i.target_node}:null;return n.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${r?"selected":""} ${k?"has-task":""} ${j?"migrating":""} ${x?"backup":""} ${c?"ghost":""} ${l?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[n.jsxs("div",{className:`vm-cell-inner ${y}`,children:[n.jsx("span",{className:"vm-name",children:h}),n.jsx("span",{className:"vm-id",children:t.vmid}),i&&!j&&!x&&n.jsx("span",{className:"vm-task-icon",children:"⚙"}),x&&n.jsx("span",{className:"vm-backup-icon",children:"◉"}),j&&n.jsx("span",{className:"vm-migrate-icon",children:n.jsx("span",{className:"migrate-arrow",children:"→"})})]}),_&&n.jsxs("div",{className:"vm-task-label",style:{borderColor:_.color,color:_.color},children:[_.label,j&&i&&i.progress>0&&n.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),k&&!j&&!x&&n.jsx("div",{className:"vm-task-ring"}),x&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"backup-ring"}),n.jsx("div",{className:"backup-scanner"}),n.jsxs("div",{className:"backup-particles",children:[n.jsx("span",{className:"bp bp1"}),n.jsx("span",{className:"bp bp2"}),n.jsx("span",{className:"bp bp3"}),n.jsx("span",{className:"bp bp4"})]})]}),j&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"migrate-ring"}),n.jsxs("div",{className:"migrate-particles",children:[n.jsx("span",{className:"particle p1"}),n.jsx("span",{className:"particle p2"}),n.jsx("span",{className:"particle p3"})]}),(C==null?void 0:C.target)&&n.jsxs("div",{className:"migrate-target-label",children:["→ ",C.target]})]}),c&&n.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&n.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function Th({vm:e,onClose:t}){const{t:r}=Fe(),a=e.status==="running";return n.jsxs("div",{className:"vm-detail-panel panel",children:[n.jsxs("div",{className:"detail-scroll-area",children:[n.jsxs("div",{className:"detail-header",children:[n.jsxs("div",{className:"detail-title",children:[n.jsx("span",{className:`detail-status ${El(e.status)}`}),n.jsx("span",{className:"detail-name",children:e.name}),n.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),n.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),n.jsxs("div",{className:"detail-content",children:[n.jsxs("div",{className:"detail-info",children:[n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:r("table.node")}),n.jsx("span",{className:"info-value",children:e.node})]}),n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:r("table.type")}),n.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:r("node.status")}),n.jsx("span",{className:`info-value text-${El(e.status)}`,children:e.status.toUpperCase()})]}),a&&n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:r("table.uptime")}),n.jsx("span",{className:"info-value",children:Xo(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?n.jsxs("div",{className:"info-row tags-row",children:[n.jsx("span",{className:"info-label",children:r("table.tags")}),n.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>n.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&n.jsxs("div",{className:"detail-metrics",children:[n.jsxs("div",{className:"metric-row metric-row-stacked",children:[n.jsxs("div",{className:"metric-row-header",children:[n.jsx("span",{className:"metric-label",children:r("metric.cpu")}),n.jsx("span",{className:`metric-value text-${_e(e.cpu.usage_percent)}`,children:rt(e.cpu.usage_percent,1)})]}),n.jsx("div",{className:"metric-bar",children:n.jsx("div",{className:`metric-fill ${_e(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),n.jsxs("div",{className:"metric-row metric-row-stacked",children:[n.jsxs("div",{className:"metric-row-header",children:[n.jsx("span",{className:"metric-label",children:r("metric.memory")}),n.jsxs("span",{className:"metric-value",children:[$e(e.memory.used_bytes)," / ",$e(e.memory.total_bytes)]})]}),n.jsx("div",{className:"metric-bar",children:n.jsx("div",{className:`metric-fill ${_e(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),n.jsxs("div",{className:"metric-row metric-row-network",children:[n.jsx("span",{className:"metric-label",children:r("metric.network")}),n.jsxs("div",{className:"network-stats",children:[n.jsxs("span",{className:"net-rx",children:["↓ ",$e(e.network.rx_bytes_sec),"/s"]}),n.jsxs("span",{className:"net-tx",children:["↑ ",$e(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),n.jsx("div",{className:"corner-decoration top-left"}),n.jsx("div",{className:"corner-decoration top-right"}),n.jsx("div",{className:"corner-decoration bottom-left"}),n.jsx("div",{className:"corner-decoration bottom-right"})]})}function Ph({cluster:e,clusters:t}){var er;const{t:r,language:a}=Fe(),s=pa(),[o,i]=p.useState(null),c=qo(),[l,d]=p.useState(null),[m,f]=p.useState(null),[u,v]=p.useState(null),[y,k]=p.useState(null),[j,x]=p.useState("disabled"),[h,g]=p.useState({});p.useEffect(()=>{Ie.getConfig().then(w=>{var z;x(((z=w.console)==null?void 0:z.mode)||"disabled");const O={};(w.clusters||[]).forEach(S=>{O[S.id]=!!(S.auth&&S.auth.password&&S.auth.password.length>0)}),g(O)}).catch(()=>x("disabled"))},[]);const[_,C]=p.useState(null),$=p.useCallback((w,O,z,S)=>{const P=typeof localStorage<"u"&&localStorage.getItem("language")||"",Z=O.type==="lxc",ae=`${Z?"/console-term":"/console"}/${encodeURIComponent(w)}/${encodeURIComponent(O.node)}/${O.vmid}?ct=${encodeURIComponent(z)}`+(O.name?`&name=${encodeURIComponent(O.name)}`:"")+(P?`&lang=${encodeURIComponent(P)}`:"")+(!Z&&S?`#vp=${encodeURIComponent(S)}`:"");window.open(ae,"_blank","noopener,noreferrer")},[]),[E,M]=p.useState([]),W=p.useRef(new Map),B=p.useCallback(w=>{w.action==="start"||w.action==="resume"?re(w):d(w)},[]),re=p.useCallback(async w=>{d(null);try{const O=w.vm.type==="lxc",z=O?await Ie.ctAction(w.clusterId,w.vm.node,w.vm.vmid,w.action):await Ie.vmAction(w.clusterId,w.vm.node,w.vm.vmid,w.action);console.info(`[vm_control] ${w.action} ${O?"ct":"vm"}/${w.vm.vmid} → upid=${z.upid}`)}catch(O){const z=O instanceof Error?O.message:String(O);z.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${w.action} failed: ${z.slice(0,200)}`)}},[]),U=p.useCallback(()=>{l&&re(l)},[l,re]),[le,D]=p.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[R,ee]=p.useState(""),[T,I]=p.useState(()=>{const w=localStorage.getItem("vm_matrix_view_mode");return w==="table"||w==="thumb"||w==="grid"?w:"grid"}),[F,H]=p.useState(()=>{const w=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(w)?Math.max(160,Math.min(640,w)):320}),[G,b]=p.useState(null);p.useEffect(()=>{if(!G)return;const w=O=>{O.key==="Escape"&&b(null)};return document.addEventListener("keydown",w),()=>document.removeEventListener("keydown",w)},[G]);const[he,fe]=p.useState(()=>Math.floor(Date.now()/3e4));p.useEffect(()=>{if(T!=="thumb")return;const w=window.setInterval(()=>fe(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(w)},[T]);const[ve,J]=p.useState(()=>{const w=localStorage.getItem("vm_matrix_thumb_type");return w==="qemu"||w==="lxc"?w:"all"});p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",ve)},[ve]);const[se,Ue]=p.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",se?"1":"0")},[se]);const[te,ce]=p.useState({}),L=p.useRef({});L.current=te,p.useEffect(()=>()=>{Object.values(L.current).forEach(w=>{try{URL.revokeObjectURL(w.url)}catch{}})},[]);const N=p.useRef(new Map),Y=p.useRef(!1);p.useEffect(()=>{T==="thumb"&&(Y.current=!1)},[T]),p.useLayoutEffect(()=>{if(T!=="thumb"){N.current.clear();return}const w=S=>{let P=0,Z=0,X=S;for(;X;)P+=X.offsetLeft,Z+=X.offsetTop,X=X.offsetParent;return{left:P,top:Z}},O=document.querySelectorAll(".vm-thumb-card[data-card-key]"),z=new Map;O.forEach(S=>{const P=S.dataset.cardKey;P&&z.set(P,w(S))}),Y.current&&O.forEach(S=>{const P=S.dataset.cardKey;if(!P)return;const Z=N.current.get(P),X=z.get(P);if(!Z||!X)return;const ae=Z.left-X.left,ie=Z.top-X.top;Math.abs(ae)<1&&Math.abs(ie)<1||(S.style.transition="none",S.style.transform=`translate(${ae}px, ${ie}px)`,requestAnimationFrame(()=>{S.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",S.style.transform=""}))}),N.current=z}),p.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",T)},[T]),p.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(F))},[F]);const de=p.useRef(null),[ne,A]=p.useState("vmid"),[Q,xe]=p.useState("asc"),[oe,be]=p.useState(!1),[Ae,it]=p.useState(()=>{const w=localStorage.getItem("matrix_card_width");return w?parseInt(w,10):85}),[Ne,bt]=p.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[pe,Se]=p.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[Pe,Ze]=p.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[ye,je]=p.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[we,Je]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[nt,xt]=p.useState([]),[jt,ue]=p.useState([]),[ze,Oe]=p.useState(new Map),We=p.useRef(new Set),[dt,Ht]=p.useState(!1),[$t,Yt]=p.useState(0),[At,vr]=p.useState(!0);p.useEffect(()=>{Ht(!1),Yt(z=>z+1),vr(!0);const w=setTimeout(()=>{Ht(!0)},100),O=setTimeout(()=>{vr(!1)},8e3);return()=>{clearTimeout(w),clearTimeout(O)}},[pe]);const V=p.useRef(new Map),He=p.useRef(new Map),Ke=p.useRef(null),Xe=p.useRef(!1),ft=p.useMemo(()=>{if(Ne!=="load")return"";const w=[],O=z=>{Object.values(z.vms).forEach(S=>{if(S.template||le==="running"&&S.status!=="running"||le==="stopped"&&S.status!=="stopped")return;const P=S.memory.total_bytes>0?S.memory.used_bytes/S.memory.total_bytes*100:0,Z=S.disk.total_bytes>0?S.disk.used_bytes/S.disk.total_bytes*100:0,X=Math.max(S.cpu.usage_percent,P,Z);w.push({key:`${S.node}/${S.vmid}`,load:Math.round(X)})})};return t?Object.values(t).forEach(O):e&&O(e),w.sort((z,S)=>S.load-z.load),w.map(z=>`${z.key}:${z.load}`).join("|")},[e,t,Ne,le]);p.useLayoutEffect(()=>{if(Ne!=="load"||Xe.current)return;const w=new Map;V.current.forEach((O,z)=>{O&&w.set(z,O.getBoundingClientRect())}),He.current=w},[ft,Ne]),p.useEffect(()=>{Ne==="load"&&He.current.size!==0&&requestAnimationFrame(()=>{const w=[];V.current.forEach((O,z)=>{if(!O)return;const S=He.current.get(z);if(!S)return;const P=O.getBoundingClientRect(),Z=S.left-P.left,X=S.top-P.top;if(Math.abs(Z)>2||Math.abs(X)>2){Xe.current=!0;const ae=O.animate([{transform:`translate(${Z}px, ${X}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});w.push(ae)}}),w.length>0?Promise.all(w.map(O=>O.finished)).then(()=>{Xe.current=!1}).catch(()=>{Xe.current=!1}):Xe.current=!1})},[ft,Ne]);const[lt,ut]=p.useState(!1);p.useEffect(()=>{lt||Ie.getConfig().then(w=>{var z;const O=(z=w==null?void 0:w.ui)==null?void 0:z.vm_matrix_default_filter;O&&(D(O),localStorage.setItem("vm_matrix_default_filter",O)),ut(!0)}).catch(()=>{const w=localStorage.getItem("vm_matrix_default_filter");w&&D(w),ut(!0)})},[lt]),p.useEffect(()=>{const w=()=>{const z=localStorage.getItem("matrix_card_width");z&&it(parseInt(z,10));const S=localStorage.getItem("matrix_sort_by");S&&S!==Ne&&bt(S);const P=localStorage.getItem("matrix_group_sort_by");P&&P!==Pe&&Ze(P);const Z=localStorage.getItem("matrix_group_sort_order");Z&&Z!==ye&&je(Z)};window.addEventListener("storage",w);const O=setInterval(w,1e3);return()=>{window.removeEventListener("storage",w),clearInterval(O)}},[Ne,Pe,ye]);const $n=p.useCallback((w,O)=>{var z;return e&&e.client_health?e.client_health[O]||null:t&&((z=t[w])!=null&&z.client_health)&&t[w].client_health[O]||null},[e,t]),Dr=p.useCallback((w,O,z)=>{w.preventDefault(),w.stopPropagation();const S=Math.min(w.clientX,window.innerWidth-250),P=Math.min(w.clientY,window.innerHeight-300);Je({visible:!0,x:S,y:P,vm:O,clusterId:z})},[]),pn=p.useCallback(()=>{Je(w=>({...w,visible:!1}))},[]),et=!e&&t&&Object.keys(t).length>0,Tt=p.useMemo(()=>{const w=[],O=(z,S,P)=>{if(!z.tasks)return;Object.values(z.tasks).forEach(X=>{var Ee;const ae=((Ee=X.task_type)==null?void 0:Ee.toLowerCase())||"",ie=ae.includes("migrate"),K=X.status==="running",ge=!!X.target_node,Re=ae.startsWith("ha");if(ae.startsWith("qm")||ae.startsWith("vz"),K&&ie&&ge&&!Re){const Ve=Object.keys(z.vms).find(Ot=>{const br=z.vms[Ot];return br.vmid===X.vmid&&br.node===X.node});Ve&&w.push({vm:z.vms[Ve],task:X,targetNode:X.target_node||"",clusterId:S,clusterLabel:P})}})};return et&&t?Object.entries(t).forEach(([z,S])=>{O(S,z,S.name||z)}):e&&O(e,e.id,e.name||e.id),w},[e,t,et]);p.useEffect(()=>{const w=new Set(Tt.map(S=>`${S.clusterId}:${S.vm.vmid}`)),O=We.current,z=W.current;O.forEach(S=>{if(!w.has(S)&&!ze.has(S)){const P=z.get(S);P&&P.upid&&(async()=>{var Z,X,ae;try{const ie=await Ie.taskStatus(P.clusterId,P.node,P.upid),K=(ie==null?void 0:ie.exitstatus)||"";if((ie==null?void 0:ie.status)==="running")return;if(K&&K!=="OK"){const Re=((Z=e==null?void 0:e.vms)==null?void 0:Z[`${P.node}/${P.vmid}`])||((ae=(X=t==null?void 0:t[P.clusterId])==null?void 0:X.vms)==null?void 0:ae[`${P.node}/${P.vmid}`]),Ee=Re&&Re.lock||"migrate";M(Ve=>Ve.some(Ot=>Ot.id===S)?Ve:[...Ve,{id:S,vmid:P.vmid,sourceNode:P.node,targetNode:P.targetNode,clusterLabel:P.clusterLabel,lock:Ee,copied:!1}])}}catch{}})(),z.delete(S)}}),Tt.forEach(({vm:S,task:P,clusterId:Z,clusterLabel:X,targetNode:ae})=>{const ie=`${Z}:${S.vmid}`;z.set(ie,{upid:P.upid,node:P.node,vmid:S.vmid,clusterId:Z,clusterLabel:X,targetNode:ae})}),We.current=w},[Tt,ze,e,t]);const Br=p.useRef(new Map);p.useEffect(()=>{Tt.forEach(({vm:w,targetNode:O,clusterId:z})=>{const S=`${z}:${w.vmid}`;Br.current.set(S,{targetNode:O,sourceNode:w.node,clusterId:z,vmid:w.vmid})})},[Tt]);const Wr=p.useRef(new Map);p.useEffect(()=>{nt.forEach(w=>{const O=`${w.clusterId}:${w.vmid}`;Wr.current.set(O,{x1:w.x1,y1:w.y1,x2:w.x2,y2:w.y2})})},[nt]),p.useEffect(()=>{const w=new Set(Tt.map(O=>`${O.clusterId}:${O.vm.vmid}`));Br.current.forEach((O,z)=>{if(!w.has(z)&&!ze.has(z)){const S=Wr.current.get(z);if(S){const P=Date.now(),Z=800,X=()=>{const ae=Date.now()-P,ie=Math.min(ae/Z,1),K=S.x1+(S.x2-S.x1)*ie,ge=S.y1+(S.y2-S.y1)*ie;ue([{x1:K,y1:ge,x2:S.x2,y2:S.y2,vmid:O.vmid,progress:ie}]),ie<1?requestAnimationFrame(X):ue([])};requestAnimationFrame(X)}Oe(P=>{const Z=new Map(P);return Z.set(z,{...O,startTime:Date.now()}),Z}),Br.current.delete(z),Wr.current.delete(z),setTimeout(()=>{Oe(P=>{const Z=new Map(P);return Z.delete(z),Z})},1e4)}})},[Tt,ze]),p.useEffect(()=>{if(ze.size===0)return;const w=(O,z)=>{const S=P=>{for(const Z of Object.values(P.vms))if(Z.vmid===O)return Z.node;return null};if(t&&z){const P=t[z];if(P)return S(P)}else if(e)return S(e);return null};ze.forEach((O,z)=>{const S=w(O.vmid,O.clusterId);S&&S===O.targetNode&&S!==O.sourceNode&&Oe(P=>{const Z=new Map(P);return Z.delete(z),Z})})},[e,t,ze]);const yr=p.useCallback((w,O)=>{const z=et?`${O} / `:"";switch(pe){case"none":return et?O:"all";case"type":return`${z}${w.type==="qemu"?"VM":"CT"}`;case"tag":return w.tags&&w.tags.length>0?`${z}${w.tags[0]}`:`${z}(no tag)`;case"node":default:return`${z}${w.node}`}},[pe,et]),Tn=p.useMemo(()=>{const w={},O=(z,S,P)=>{Object.entries(z.vms).forEach(([Z,X])=>{if(le==="running"&&X.status!=="running"||le==="stopped"&&X.status!=="stopped"||R&&!X.name.toLowerCase().includes(R.toLowerCase())&&!String(X.vmid).includes(R)||X.template)return;const ae=yr(X,S);w[ae]||(w[ae]={vms:[],clusterId:P}),w[ae].vms.push(X)})};return et?Object.entries(t).forEach(([z,S])=>{const P=S.name||z;O(S,P,z)}):e&&O(e,"",e.id),Object.values(w).forEach(z=>{z.vms.sort((S,P)=>{switch(Ne){case"name":return S.name.localeCompare(P.name);case"load":{const Z=S.memory.total_bytes>0?S.memory.used_bytes/S.memory.total_bytes*100:0,X=P.memory.total_bytes>0?P.memory.used_bytes/P.memory.total_bytes*100:0,ae=S.disk.total_bytes>0?S.disk.used_bytes/S.disk.total_bytes*100:0,ie=P.disk.total_bytes>0?P.disk.used_bytes/P.disk.total_bytes*100:0,K=Math.max(S.cpu.usage_percent,Z,ae),ge=Math.max(P.cpu.usage_percent,X,ie);if(S.status!=="running"&&P.status==="running")return 1;if(S.status==="running"&&P.status!=="running")return-1;if(S.status!=="running"&&P.status!=="running")return S.vmid-P.vmid;const Re=Ot=>Ot>=95?0:Ot>=80?1:2,Ee=Re(K),Ve=Re(ge);return Ee!==Ve?Ee-Ve:ge-K}case"vmid":default:return S.vmid-P.vmid}})}),w},[e,t,et,le,R,Ne,yr]),Ye=p.useMemo(()=>{const w=[],O=(z,S)=>{Object.values(z.vms).forEach(P=>{P.template||P.status==="running"&&le!=="stopped"&&(ve==="qemu"&&P.type!=="qemu"||ve==="lxc"&&P.type!=="lxc"||R&&!P.name.toLowerCase().includes(R.toLowerCase())&&!String(P.vmid).includes(R)||w.push({...P,clusterId:S}))})};return et&&t?Object.entries(t).forEach(([z,S])=>O(S,z)):e&&O(e,e.id),w.sort((z,S)=>{switch(Ne){case"name":return z.name.localeCompare(S.name);case"load":{const P=z.memory.total_bytes>0?z.memory.used_bytes/z.memory.total_bytes*100:0,Z=S.memory.total_bytes>0?S.memory.used_bytes/S.memory.total_bytes*100:0,X=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0,ae=S.disk.total_bytes>0?S.disk.used_bytes/S.disk.total_bytes*100:0,ie=Math.max(z.cpu.usage_percent,P,X),K=Math.max(S.cpu.usage_percent,Z,ae),ge=ie>=95?0:ie>=80?1:2,Re=K>=95?0:K>=80?1:2;return ge!==Re?ge-Re:K-ie}case"vmid":default:return z.vmid-S.vmid}}),w},[e,t,et,le,R,Ne,ve]),mn=p.useMemo(()=>{const w=new Map,O=z=>t&&t[z]?t[z].name||z:e&&e.id===z&&e.name||z;return Ye.forEach(z=>{const S=O(z.clusterId),P=yr(z,S),Z=w.get(P)||[];Z.push(z),w.set(P,Z)}),Array.from(w.entries()).sort(([z],[S])=>{const P=z.localeCompare(S);return ye==="desc"?-P:P})},[Ye,yr,t,e,ye]);p.useEffect(()=>{if(T!=="thumb")return;let w=!1;const O=640,z=Y.current,S={},P=async ae=>{const ie=ae.clusterId||(e==null?void 0:e.id)||"",K=`${ie}/${ae.node}/${ae.vmid}`,ge=`/api/console/screenshot/${encodeURIComponent(ie)}/${encodeURIComponent(ae.node)}/${ae.vmid}?max=${O}&t=${he}`;try{const Re=await fetch(ge,{credentials:"same-origin"});if(!Re.ok||w)return;const Ee=await Re.blob();if(w)return;const Ve=URL.createObjectURL(Ee),Ot=Re.headers.get("X-Thumb-Empty")==="1";z?S[K]={url:Ve,isBlank:Ot}:ce(br=>{const Bc=br[K];if(Bc)try{URL.revokeObjectURL(Bc.url)}catch{}return{...br,[K]:{url:Ve,isBlank:Ot}}})}catch{}},Z=6;return(async ae=>{const ie=new Set;for(const K of ae){const ge=P(K).finally(()=>{ie.delete(ge)});ie.add(ge),ie.size>=Z&&await Promise.race(ie)}await Promise.all(ie)})(Ye).finally(()=>{if(w){Object.values(S).forEach(ie=>{try{URL.revokeObjectURL(ie.url)}catch{}});return}const ae=new Set(Ye.map(ie=>`${ie.clusterId||(e==null?void 0:e.id)||""}/${ie.node}/${ie.vmid}`));ce(ie=>{let K=!1;const ge={};return Object.entries(ie).forEach(([Re,Ee])=>{if(ae.has(Re))ge[Re]=Ee;else{try{URL.revokeObjectURL(Ee.url)}catch{}K=!0}}),z&&Object.entries(S).forEach(([Re,Ee])=>{const Ve=ge[Re];if(Ve)try{URL.revokeObjectURL(Ve.url)}catch{}ge[Re]=Ee,K=!0}),K?ge:ie}),Y.current||setTimeout(()=>{w||(Y.current=!0)},300)}),()=>{w=!0}},[T,Ye,he,e==null?void 0:e.id]);const Gt=p.useMemo(()=>{const w=[],O=new Map;return et&&t&&Object.entries(t).forEach(([z,S])=>{const P=S.name||z;Object.values(S.nodes||{}).forEach(Z=>{Z&&Z.node&&O.set(Z.node,{id:z,label:P})})}),Tt.forEach(({vm:z,targetNode:S,clusterId:P,clusterLabel:Z})=>{const X=O.get(S),ae=X&&X.id!==P?X:{id:P,label:Z},ie=et?`${ae.label} / ${S}`:S,K=et?`${Z} / ${z.node}`:z.node;w.push({vm:z,targetGroupKey:ie,sourceGroupKey:K,clusterId:P,targetClusterId:ae.id})}),w},[Tt,et,t]);p.useEffect(()=>{if(T!=="grid"||Gt.length===0){xt([]);return}const w=()=>{const P=Ke.current;if(!P)return;const Z=P.getBoundingClientRect(),X=P.scrollLeft,ae=P.scrollTop,ie=[];Gt.forEach(({vm:K})=>{const ge=`${K.cluster_id}/${K.node}/${K.vmid}`,Re=`ghost-${K.cluster_id}-${K.vmid}`,Ee=V.current.get(ge),Ve=V.current.get(Re);if(Ee&&Ve){const Ot=Ee.getBoundingClientRect(),br=Ve.getBoundingClientRect();ie.push({x1:Ot.left+Ot.width/2-Z.left+X,y1:Ot.top+Ot.height/2-Z.top+ae,x2:br.left+br.width/2-Z.left+X,y2:br.top+br.height/2-Z.top+ae,vmid:K.vmid,clusterId:K.cluster_id})}}),xt(ie)},O=setTimeout(w,100),z=setInterval(w,500),S=Ke.current;return S&&S.addEventListener("scroll",w),()=>{clearTimeout(O),clearInterval(z),S&&S.removeEventListener("scroll",w)}},[Gt,T]);const Vr=p.useMemo(()=>{const w=[],O=(z,S,P)=>{Object.values(z.vms).forEach(Z=>{le==="running"&&Z.status!=="running"||le==="stopped"&&Z.status!=="stopped"||R&&!Z.name.toLowerCase().includes(R.toLowerCase())&&!String(Z.vmid).includes(R)||Z.template||w.push({...Z,clusterName:S,clusterId:P})})};return et?Object.entries(t).forEach(([z,S])=>{const P=S.name||z;O(S,P,z)}):e&&O(e,e.name||"Cluster",e.id),w.sort((z,S)=>{var Z,X,ae,ie;let P=0;switch(ne){case"name":P=z.name.localeCompare(S.name);break;case"vmid":P=z.vmid-S.vmid;break;case"type":P=z.type.localeCompare(S.type);break;case"node":P=z.node.localeCompare(S.node);break;case"status":P=z.status.localeCompare(S.status);break;case"cpu":P=z.cpu.usage_percent-S.cpu.usage_percent;break;case"memory":P=z.memory.used_bytes/z.memory.total_bytes-S.memory.used_bytes/S.memory.total_bytes;break;case"uptime":P=z.uptime-S.uptime;break;case"rx":P=(((Z=z.network)==null?void 0:Z.rx_bytes_sec)||0)-(((X=S.network)==null?void 0:X.rx_bytes_sec)||0);break;case"tx":P=(((ae=z.network)==null?void 0:ae.tx_bytes_sec)||0)-(((ie=S.network)==null?void 0:ie.tx_bytes_sec)||0);break;case"task":{const K=Ps(z.vmid,z.node,z.cluster_id,e,t),ge=Ps(S.vmid,S.node,S.cluster_id,e,t);K&&!ge?P=-1:!K&&ge?P=1:K&&ge?P=K.task_type.localeCompare(ge.task_type):P=0;break}}return Q==="asc"?P:-P}),w},[e,t,et,le,R,ne,Q]),Ce=Math.round(F*9/16),ke=w=>{be(!0),setTimeout(()=>be(!1),300),ne===w?xe(Q==="asc"?"desc":"asc"):(A(w),xe("asc"))},De=p.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const w of Object.values(t))if(w.vms[o])return w.vms[o]}return null},[o,e,t]),{totalVMs:gt,runningVMs:pt}=p.useMemo(()=>{let w=0,O=0;const z=S=>{Object.values(S.vms).forEach(P=>{P.template||(w++,P.status==="running"&&O++)})};return et?t&&Object.values(t).forEach(z):e&&z(e),{totalVMs:w,runningVMs:O}},[e,t,et]);return!e&&!et?n.jsx("div",{className:"holo-matrix empty",children:n.jsxs("div",{className:"empty-message",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:r("cluster.select")})]})}):n.jsxs("div",{className:"holo-matrix",children:[n.jsx("div",{className:"grid-floor"}),n.jsxs("div",{className:"matrix-header",children:[n.jsxs("div",{className:"matrix-title-section",children:[n.jsxs("h1",{className:"matrix-title font-display",children:[n.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),n.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),r("nav.holo_matrix").toUpperCase()]}),n.jsxs("div",{className:"matrix-stats",children:[n.jsxs("span",{className:"stat-running",children:[pt," ",r("matrix.running")]}),n.jsx("span",{className:"stat-divider",children:"/"}),n.jsxs("span",{className:"stat-total",children:[gt," ",r("matrix.total")]})]})]}),n.jsxs("div",{className:"matrix-controls",children:[n.jsxs("div",{className:"search-box",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"11",cy:"11",r:"8"}),n.jsx("path",{d:"M21 21l-4.35-4.35"})]}),n.jsx("input",{type:"text",placeholder:r("matrix.search"),value:R,onChange:w=>ee(w.target.value)})]}),n.jsxs("div",{className:`filter-tabs ${T==="thumb"?"is-disabled":""}`,children:[n.jsxs("button",{className:`filter-tab ${le==="all"?"active":""}`,onClick:()=>D("all"),disabled:T==="thumb",title:T==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),n.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),n.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),r("matrix.filter_all")]}),n.jsxs("button",{className:`filter-tab ${le==="running"?"active":""}`,onClick:()=>D("running"),disabled:T==="thumb",title:T==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:n.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),r("matrix.filter_running")]}),n.jsxs("button",{className:`filter-tab ${le==="stopped"?"active":""}`,onClick:()=>D("stopped"),disabled:T==="thumb",title:T==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:n.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),r("matrix.filter_stopped")]})]}),n.jsxs("div",{className:"sort-selector",children:[n.jsxs("span",{className:"sort-label",children:[n.jsx("span",{className:"label-icon","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),n.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),r("settings.sort_by"),":"]}),n.jsxs("button",{className:`sort-btn ${Ne==="vmid"?"active":""}`,onClick:()=>{bt("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:r("settings.sort_vmid"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),"ID"]}),n.jsxs("button",{className:`sort-btn ${Ne==="name"?"active":""}`,onClick:()=>{bt("name"),localStorage.setItem("matrix_sort_by","name")},title:r("settings.sort_name"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),r("settings.sort_name")]}),n.jsxs("button",{className:`sort-btn ${Ne==="load"?"active":""}`,onClick:()=>{bt("load"),localStorage.setItem("matrix_sort_by","load")},title:r("settings.sort_load"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),n.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),r("settings.sort_load")]})]}),n.jsxs("div",{className:"sort-selector",children:[n.jsxs("span",{className:"sort-label",children:[n.jsx("span",{className:"label-icon","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r("matrix.group_by"),":"]}),n.jsxs("button",{className:`sort-btn ${pe==="none"?"active":""}`,onClick:()=>{Se("none"),localStorage.setItem("matrix_group_by","none")},title:r("matrix.group_none"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),r("matrix.group_none")]}),n.jsxs("button",{className:`sort-btn ${pe==="node"?"active":""}`,onClick:()=>{Se("node"),localStorage.setItem("matrix_group_by","node")},title:r("matrix.group_node"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),n.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),n.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),n.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),r("matrix.group_node")]}),n.jsxs("button",{className:`sort-btn ${pe==="type"?"active":""}`,onClick:()=>{Se("type"),localStorage.setItem("matrix_group_by","type")},title:r("matrix.group_type"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),n.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),n.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),n.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),r("matrix.group_type")]}),n.jsxs("button",{className:`sort-btn ${pe==="tag"?"active":""}`,onClick:()=>{Se("tag"),localStorage.setItem("matrix_group_by","tag")},title:r("matrix.group_tag"),children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),n.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),r("matrix.group_tag")]})]}),n.jsxs("div",{className:"view-toggle",children:[n.jsx("button",{className:`view-btn ${T==="grid"?"active":""}`,onClick:()=>I("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),n.jsx("button",{className:`view-btn ${T==="table"?"active":""}`,onClick:()=>I("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:n.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),n.jsx("button",{className:`view-btn ${T==="thumb"?"active":""}`,onClick:()=>I("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),n.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),n.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]})]})]}),T==="thumb"&&n.jsxs("div",{className:"thumb-size-row",children:[n.jsxs("div",{className:"thumb-size",children:[n.jsxs("span",{className:"thumb-size-label",children:[n.jsx("span",{className:"label-icon","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("polyline",{points:"15 3 21 3 21 9"}),n.jsx("polyline",{points:"9 21 3 21 3 15"}),n.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),n.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),a==="zh-TW"?"尺寸":"Size"]}),n.jsx("input",{type:"range",min:160,max:640,step:20,value:F,onChange:w=>H(parseInt(w.target.value,10)),className:"thumb-size-slider"}),n.jsxs("span",{className:"thumb-size-val",children:[F,"px"]}),n.jsx("span",{className:"thumb-build-stamp",title:"build 2026-05-07T15:28:08.560Z",children:(()=>{try{return`b${new Date("2026-05-07T15:28:08.560Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),n.jsxs("div",{className:"thumb-type-filter",role:"group",children:[n.jsxs("button",{className:`thumb-type-btn ${ve==="all"?"active":""}`,onClick:()=>J("all"),title:a==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a==="zh-TW"?"全部":"ALL"]}),n.jsxs("button",{className:`thumb-type-btn ${ve==="qemu"?"active":""}`,onClick:()=>J("qemu"),title:a==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),n.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),n.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),"VM"]}),n.jsxs("button",{className:`thumb-type-btn ${ve==="lxc"?"active":""}`,onClick:()=>J("lxc"),title:a==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[n.jsx("span",{className:"tb-ico","aria-hidden":!0,children:n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),n.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),n.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),"CT"]})]}),n.jsxs("button",{className:`thumb-prefer-btn ${se?"active":""}`,onClick:()=>Ue(w=>!w),title:a==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),n.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),a==="zh-TW"?"優先有內容":"Prefer content"]})]}),n.jsxs("div",{className:"matrix-content",children:[T==="grid"?n.jsxs("div",{className:"matrix-grid",ref:Ke,children:[nt.length>0&&n.jsxs("svg",{className:"migration-lines-overlay",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),n.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),n.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),n.jsxs("filter",{id:"migrationGlow",children:[n.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),nt.map((w,O)=>n.jsxs("g",{children:[n.jsx("line",{className:"migration-line",x1:w.x1,y1:w.y1,x2:w.x2,y2:w.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),n.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:n.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${w.x1},${w.y1} L${w.x2},${w.y2}`})}),n.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:n.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${w.x1},${w.y1} L${w.x2},${w.y2}`})}),n.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:n.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${w.x1},${w.y1} L${w.x2},${w.y2}`})})]},`line-${w.vmid}-${O}`))]}),jt.length>0&&n.jsxs("svg",{className:"migration-lines-overlay completing",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),n.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),n.jsxs("filter",{id:"completingGlow",children:[n.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),jt.map((w,O)=>n.jsxs("g",{children:[n.jsx("line",{className:"completing-line",x1:w.x1,y1:w.y1,x2:w.x2,y2:w.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-w.progress)+1,filter:"url(#completingGlow)",opacity:1-w.progress*.5}),w.progress>.8&&n.jsx("circle",{cx:w.x2,cy:w.y2,r:20*(w.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(w.progress-.8)*5})]},`completing-${w.vmid}-${O}`))]}),(()=>{const w=new Map;Object.entries(Tn).forEach(([S,P])=>{w.set(S,P)}),Gt.forEach(S=>{w.has(S.targetGroupKey)||w.set(S.targetGroupKey,{vms:[],clusterId:S.clusterId})});const O=Array.from(w.entries()).sort((S,P)=>{const[Z]=S,[X]=P,ae=Re=>{if(Re.includes(" / ")){const[Ee,Ve]=Re.split(" / ");return{cluster:Ee,node:Ve}}return{cluster:"",node:Re}},ie=ae(Z),K=ae(X);let ge=0;return Pe==="cluster"?(ge=ie.cluster.localeCompare(K.cluster),ge===0&&(ge=ie.node.localeCompare(K.node))):(ge=ie.node.localeCompare(K.node),ge===0&&(ge=ie.cluster.localeCompare(K.cluster))),ye==="desc"?-ge:ge});let z=0;return O.map(([S,P])=>{const Z=Gt.filter(X=>X.targetGroupKey===S);return n.jsxs("div",{className:`node-section ${P.vms.length===0&&Z.length>0?"ghost-only":""}`,children:[n.jsxs("div",{className:"node-section-header",children:[n.jsx("span",{className:"node-section-name",children:S}),n.jsxs("span",{className:"node-section-count",children:[P.vms.length,Z.length>0&&n.jsxs("span",{className:"incoming-count",children:[" +",Z.length]})]})]}),n.jsxs("div",{className:`vm-grid ${Ne==="load"&&!At?"sort-by-load":""} ${At?"initial-load":""}`,children:[dt&&P.vms.map(X=>{const ae=`${X.cluster_id}/${X.node}/${X.vmid}`,ie=Ps(X.vmid,X.node,X.cluster_id,e,t),K=`${X.cluster_id}:${X.vmid}`,ge=ze.get(K);if(ge&&ge.sourceNode===X.node||Gt.find(Ve=>Ve.targetClusterId===X.cluster_id&&Ve.vm.vmid===X.vmid))return null;const Ee=z++;return n.jsx(ru,{ref:Ve=>{Ve?V.current.set(ae,Ve):V.current.delete(ae)},vm:X,isSelected:o===ae,onClick:()=>i(o===ae?null:ae),onContextMenu:Ve=>Dr(Ve,X,P.clusterId),animationDelay:At?Ee*50:0,task:ie,isCompleting:!!ge},ae)}).filter(Boolean),dt&&Z.map(X=>{var K;const ae=`ghost-${X.vm.cluster_id}-${X.vm.vmid}`,ie=(K=Tt.find(ge=>ge.vm.vmid===X.vm.vmid&&ge.clusterId===X.vm.cluster_id))==null?void 0:K.task;return n.jsx(ru,{ref:ge=>{ge?V.current.set(ae,ge):V.current.delete(ae)},vm:X.vm,isSelected:!1,onClick:()=>{},onContextMenu:ge=>ge.preventDefault(),animationDelay:0,task:ie,isGhost:!0},ae)})]},`grid-${le}-${R}-${Ne}-${$t}`)]},S)})})(),Object.keys(Tn).length===0&&Gt.length===0&&n.jsx("div",{className:"no-vms",children:n.jsx("span",{children:r("error.no_data")})})]}):T==="thumb"?n.jsxs("div",{ref:de,className:"matrix-thumb-grid",children:[n.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:n.jsx("defs",{children:n.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[n.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:n.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),n.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),Ye.length===0?n.jsx("div",{className:"no-vms",children:n.jsx("span",{children:r("error.no_data")})}):mn.map(([w,O])=>{const z=se?[...O].sort((S,P)=>{var K,ge;const Z=`${S.clusterId||(e==null?void 0:e.id)||""}/${S.node}/${S.vmid}`,X=`${P.clusterId||(e==null?void 0:e.id)||""}/${P.node}/${P.vmid}`,ae=(K=te[Z])!=null&&K.isBlank?1:0,ie=(ge=te[X])!=null&&ge.isBlank?1:0;return ae-ie}):O;return n.jsxs("div",{className:"thumb-group",children:[pe!=="none"&&n.jsxs("div",{className:"thumb-group-header",children:[n.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),n.jsx("span",{className:"thumb-group-name",children:w}),n.jsx("span",{className:"thumb-group-count",children:z.length}),n.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),n.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),n.jsx("div",{className:"thumb-group-cards",children:z.map(S=>{var Re;const P=S.type==="lxc",Z=S.status==="running",X=((Re=S.cpu)==null?void 0:Re.usage_percent)??0,ae=S.memory&&S.memory.total_bytes>0?S.memory.used_bytes/S.memory.total_bytes*100:0,ie=S.clusterId||(e==null?void 0:e.id)||"",K=`${ie}/${S.node}/${S.vmid}`,ge=te[K];return n.jsxs("div",{"data-card-key":K,className:`vm-thumb-card status-${S.status}${ge!=null&&ge.isBlank?" is-blank":""}`,style:{width:`${F}px`,flex:"0 0 auto"},onClick:()=>b({vm:S,clusterId:ie}),onContextMenu:Ee=>Dr(Ee,S,ie),children:[n.jsxs("div",{className:"vm-thumb-image",style:{height:`${Ce}px`},children:[n.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[n.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[n.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),n.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),n.jsx("div",{className:"vtl-scanlines"}),n.jsx("div",{className:"vtl-vignette"}),n.jsx("span",{className:"vtl-text",children:a==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),ge&&n.jsx("img",{src:ge.url,alt:`VM ${S.vmid} screenshot`,loading:"lazy",onLoad:Ee=>{Ee.currentTarget.parentElement.dataset.loaded="1"},onError:Ee=>{Ee.currentTarget.parentElement.dataset.error="1"}})]}),n.jsxs("div",{className:"vm-thumb-meta",children:[n.jsxs("div",{className:"vm-thumb-title",children:[n.jsx("span",{className:`type-badge ${S.type}`,children:P?"CT":"VM"}),n.jsxs("code",{className:"vm-thumb-id",children:["#",S.vmid]}),n.jsx("span",{className:"vm-thumb-name",children:S.name})]}),Z&&n.jsxs("div",{className:"vm-thumb-bars",children:[n.jsxs("div",{className:"vm-thumb-bar",children:[n.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-bar-fill ${_e(X)}`,style:{width:`${Math.min(X,100)}%`}})}),n.jsx("span",{className:`vm-thumb-bar-val text-${_e(X)}`,children:rt(X,1)})]}),n.jsxs("div",{className:"vm-thumb-bar",children:[n.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-bar-fill ${_e(ae)}`,style:{width:`${Math.min(ae,100)}%`}})}),n.jsx("span",{className:`vm-thumb-bar-val text-${_e(ae)}`,children:rt(ae,0)})]})]})]})]},K)})})]},w)})]}):n.jsxs("div",{className:"matrix-table-container",children:[n.jsxs("table",{className:"vm-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsxs("th",{className:`sortable ${ne==="status"?"sorted":""}`,onClick:()=>ke("status"),children:[n.jsx("span",{children:r("node.status")}),ne==="status"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="vmid"?"sorted":""}`,onClick:()=>ke("vmid"),children:[n.jsx("span",{children:"VMID"}),ne==="vmid"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="type"?"sorted":""}`,onClick:()=>ke("type"),children:[n.jsx("span",{children:r("table.type")}),ne==="type"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="name"?"sorted":""}`,onClick:()=>ke("name"),children:[n.jsx("span",{children:r("table.name")}),ne==="name"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsx("th",{className:"tags-header",children:r("table.tags")}),n.jsxs("th",{className:`sortable ${ne==="node"?"sorted":""}`,onClick:()=>ke("node"),children:[n.jsx("span",{children:r("table.node")}),ne==="node"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="cpu"?"sorted":""}`,onClick:()=>ke("cpu"),children:[n.jsx("span",{children:r("metric.cpu")}),ne==="cpu"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="memory"?"sorted":""}`,onClick:()=>ke("memory"),children:[n.jsx("span",{children:r("metric.memory")}),ne==="memory"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable net-header ${ne==="rx"?"sorted":""}`,onClick:()=>ke("rx"),children:[n.jsxs("span",{children:["↓ ",r("metric.rx")]}),ne==="rx"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable net-header ${ne==="tx"?"sorted":""}`,onClick:()=>ke("tx"),children:[n.jsxs("span",{children:["↑ ",r("metric.tx")]}),ne==="tx"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable ${ne==="uptime"?"sorted":""}`,onClick:()=>ke("uptime"),children:[n.jsx("span",{children:r("table.uptime")}),ne==="uptime"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]}),n.jsxs("th",{className:`sortable task-header ${ne==="task"?"sorted":""}`,onClick:()=>ke("task"),children:[n.jsx("span",{children:r("table.task")}),ne==="task"&&n.jsx("span",{className:"sort-indicator",children:Q==="asc"?"▲":"▼"})]})]})}),n.jsx("tbody",{children:Vr.map(w=>{const O=`${w.cluster_id}/${w.node}/${w.vmid}`,z=w.status==="running",S=w.cpu.usage_percent,P=w.memory.used_bytes/w.memory.total_bytes*100,Z=Ps(w.vmid,w.node,w.cluster_id,e,t);return n.jsxs("tr",{className:`${o===O?"selected":""} ${w.status} ${oe?"sort-animating":""}`,onClick:()=>i(o===O?null:O),onContextMenu:X=>Dr(X,w,w.clusterId),children:[n.jsx("td",{children:n.jsx("span",{className:`status-badge ${El(w.status)}`,children:w.status.toUpperCase()})}),n.jsx("td",{className:"vmid-cell",children:w.vmid}),n.jsx("td",{className:"type-cell",children:n.jsx("span",{className:`type-badge ${w.type}`,children:w.type==="qemu"?"VM":"CT"})}),n.jsx("td",{className:"name-cell",children:w.name}),n.jsx("td",{className:"tags-cell",children:(()=>{const X=(w.tags||[]).map(ae=>(ae||"").trim()).filter(Boolean);return X.length>0?n.jsx("div",{className:"vm-tags",children:X.map((ae,ie)=>n.jsx("span",{className:"vm-tag",children:ae},ie))}):null})()}),n.jsx("td",{className:"node-cell",children:w.node}),n.jsx("td",{children:z?n.jsxs("div",{className:"cpu-cell",children:[n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-bar-fill ${_e(S)}`,style:{width:`${S}%`}})}),n.jsx("span",{className:`text-${_e(S)}`,children:rt(S,1)})]}):n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{children:z?n.jsxs("div",{className:"mem-cell",children:[n.jsx("div",{className:"mini-bar",children:n.jsx("div",{className:`mini-bar-fill ${_e(P)}`,style:{width:`${P}%`}})}),n.jsx("span",{children:rt(P,1)})]}):n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{className:"net-rx-cell",children:z?n.jsxs("span",{className:"net-rx",children:[$e(w.network.rx_bytes_sec),"/s"]}):n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{className:"net-tx-cell",children:z?n.jsxs("span",{className:"net-tx",children:[$e(w.network.tx_bytes_sec),"/s"]}):n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{children:z?n.jsx("span",{className:"uptime-cell",children:Xo(w.uptime)}):n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{className:"task-cell",children:Z&&n.jsx(hh,{task:Z})})]},O)})})]}),Vr.length===0&&n.jsx("div",{className:"no-vms",children:n.jsx("span",{children:r("error.no_data")})})]}),De&&n.jsx(Th,{vm:De,onClose:()=>i(null)},`${De.node}/${De.vmid}`)]}),G&&n.jsx("div",{className:"thumb-preview-overlay",onClick:()=>b(null),children:n.jsxs("div",{className:"thumb-preview-frame",onClick:w=>w.stopPropagation(),children:[n.jsxs("div",{className:"thumb-preview-titlebar",children:[n.jsxs("span",{className:"thumb-preview-name",children:[n.jsx("span",{className:`type-badge ${G.vm.type}`,children:G.vm.type==="lxc"?"CT":"VM"}),n.jsxs("code",{className:"thumb-preview-id",children:["#",G.vm.vmid]}),n.jsx("span",{children:G.vm.name}),n.jsx("span",{className:"thumb-preview-node",children:G.vm.node})]}),n.jsx("button",{className:"thumb-preview-close",onClick:()=>b(null),children:"×"})]}),n.jsxs("div",{className:"thumb-preview-body",children:[n.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[n.jsx("div",{className:"tpl-grid"}),n.jsx("div",{className:"tpl-scan"}),n.jsx("div",{className:"tpl-ring"}),n.jsx("div",{className:"tpl-corner tl"}),n.jsx("div",{className:"tpl-corner tr"}),n.jsx("div",{className:"tpl-corner bl"}),n.jsx("div",{className:"tpl-corner br"}),n.jsxs("div",{className:"tpl-status",children:[n.jsxs("span",{className:"tpl-dots",children:[n.jsx("i",{}),n.jsx("i",{}),n.jsx("i",{})]}),n.jsx("span",{className:"tpl-text",children:a==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),n.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(G.clusterId)}/${encodeURIComponent(G.vm.node)}/${G.vm.vmid}?max=1600&t=${he}`,alt:`VM ${G.vm.vmid} full screenshot`,onLoad:w=>{w.currentTarget.parentElement.dataset.loaded="1"},onError:w=>{w.currentTarget.parentElement.dataset.error="1"}})]})]})}),n.jsx(Hm,{state:we,onClose:pn,onShowDetails:()=>{we.vm&&i(`${we.vm.node}/${we.vm.vmid}`)},onPowerAction:B,onOpenConsole:async()=>{if(!we.vm)return;const w=we.vm,O=we.clusterId;if(j==="disabled"){await s.alert(r("console.disabled"));return}if(j==="prompt"){C({vm:w,clusterId:O});return}try{const z=await Ie.consolePrepare({cluster_id:O,node:w.node,vmid:w.vmid});$(O,w,z.console_token,z.vnc_password)}catch(z){const S=z instanceof Error?z.message:String(z);await s.alert(r("console.prepare_failed",{err:S}))}},onRemoteMigrate:()=>{we.vm&&f({vm:we.vm,clusterId:we.clusterId})},onOpenSnapshots:()=>{we.vm&&v({vm:we.vm,clusterId:we.clusterId})},onBackupNow:()=>{we.vm&&k({vm:we.vm,clusterId:we.clusterId})},getNodeHealth:$n,userRole:((er=c.user)==null?void 0:er.role_global)??null,consoleMode:j,consolePasswordSet:!!h[we.clusterId]}),n.jsx(vh,{open:l!==null,title:l?$i(l.action,r):"",destructive:l?$h(l.action):!1,details:l?n.jsxs(n.Fragment,{children:[r(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:$i(l.action,r),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&n.jsxs(n.Fragment,{children:[n.jsx("br",{}),n.jsx("br",{}),n.jsx("strong",{style:{color:"#ff8a3c"},children:r("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?$i(l.action,r):r("action.cancel"),onConfirm:U,onCancel:()=>d(null)}),n.jsx(Ym,{open:m!==null,cluster_id:(m==null?void 0:m.clusterId)||"",vm:m?{vmid:m.vm.vmid,name:m.vm.name,node:m.vm.node,type:m.vm.type}:null,onClose:()=>f(null)}),n.jsx(Gm,{open:u!==null,cluster_id:(u==null?void 0:u.clusterId)||"",vm:u?{vmid:u.vm.vmid,name:u.vm.name,node:u.vm.node,type:u.vm.type}:null,onClose:()=>v(null)}),n.jsx(Km,{open:y!==null,cluster_id:(y==null?void 0:y.clusterId)||"",vm:y?{vmid:y.vm.vmid,name:y.vm.name,node:y.vm.node,type:y.vm.type}:null,onClose:()=>k(null)}),n.jsx(Xm,{open:_!==null,cluster_id:(_==null?void 0:_.clusterId)||"",pveUser:(()=>{const w=_==null?void 0:_.clusterId;if(!w)return"root@pam";const O=t&&t[w]||((e==null?void 0:e.id)===w?e:null);return"root@pam"})(),onCancel:()=>C(null),onSubmit:async w=>{if(!_)return;const{vm:O,clusterId:z}=_,S=await Ie.consolePrepare({cluster_id:z,node:O.node,vmid:O.vmid,password:w});$(z,O,S.console_token,S.vnc_password),C(null)}}),E.length>0&&n.jsx("div",{className:"mig-fail-stack",children:E.map(w=>{const O=`qm unlock ${w.vmid}`;return n.jsxs("div",{className:"mig-fail-toast",children:[n.jsxs("div",{className:"mig-fail-head",children:["⚠ ",r("mig.failed.title")]}),n.jsx("div",{className:"mig-fail-body",children:r("mig.failed.body",{vmid:w.vmid,target:w.targetNode||"?",lock:w.lock})}),n.jsx("div",{className:"mig-fail-cmd-line",children:n.jsxs("span",{className:"mig-fail-cmd-hint",children:[r("mig.failed.cmd_hint")," ",n.jsx("code",{children:w.sourceNode})]})}),n.jsxs("div",{className:"mig-fail-cmd-row",children:[n.jsx("code",{className:"mig-fail-cmd",children:O}),n.jsx("button",{className:"mig-fail-btn",onClick:()=>{var z;(z=navigator.clipboard)==null||z.writeText(O).then(()=>{M(S=>S.map(P=>P.id===w.id?{...P,copied:!0}:P))})},children:w.copied?r("mig.failed.copied"):r("mig.failed.copy")})]}),n.jsx("button",{className:"mig-fail-dismiss",onClick:()=>M(z=>z.filter(S=>S.id!==w.id)),"aria-label":r("mig.failed.dismiss"),children:"×"})]},w.id)})}),n.jsxs("div",{className:"matrix-legend",children:[n.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color success"}),n.jsx("span",{className:"legend-label",children:"<80%"})]}),n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color warning"}),n.jsx("span",{className:"legend-label",children:"80-95%"})]}),n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color danger"}),n.jsx("span",{className:"legend-label",children:">95%"})]}),n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color muted"}),n.jsx("span",{className:"legend-label",children:"Stopped"})]}),n.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),T==="thumb"&&n.jsxs("span",{className:"legend-thumb-refresh",title:a==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M23 4v6h-6"}),n.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),a==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),n.jsx("style",{children:`
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
          grid-template-columns: repeat(auto-fill, minmax(${Ae}px, 1fr));
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
      `})]})}function Rs(e,t,r,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&r){const i=s[r];if(i)return o(i)}else if(a)return o(a);return null}function qm(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Rh({vm:e,index:t,previousIndex:r,onClick:a,onContextMenu:s,isSelected:o,task:i}){var g;const c=e.memory.used_bytes/e.memory.total_bytes*100,l=((g=e.disk)==null?void 0:g.usage_percent)||0,d=_e(e.cpu.usage_percent),m=_e(c),f=_e(l),u=p.useRef(null),[v,y]=p.useState(r===void 0),k=qm(i||null);p.useEffect(()=>{if(v){const _=setTimeout(()=>y(!1),50);return()=>clearTimeout(_)}},[v]);const j=e.name.length>10?e.name.substring(0,9)+"…":e.name,h=Math.max(e.cpu.usage_percent,c,l)>95?"critical":"warning";return n.jsxs("div",{ref:u,className:`anomaly-item ${h} ${v?"entering":""} ${o?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${rt(e.cpu.usage_percent,1)}
MEM: ${rt(c,1)}
DISK: ${rt(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:a,onContextMenu:_=>s==null?void 0:s(_,e),children:[n.jsx("div",{className:"corner-bracket tl"}),n.jsx("div",{className:"corner-bracket tr"}),n.jsx("div",{className:"corner-bracket bl"}),n.jsx("div",{className:"corner-bracket br"}),n.jsxs("div",{className:"anomaly-header",children:[n.jsx("span",{className:`anomaly-indicator ${d}`}),n.jsx("span",{className:"anomaly-name",children:j}),n.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),k&&n.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${k.color}30`,borderColor:k.color,color:k.color},children:k.label})]}),n.jsxs("div",{className:"anomaly-bars-row",children:[n.jsxs("div",{className:`metric-gauge ${d}`,children:[n.jsx("span",{className:"gauge-label",children:"C"}),n.jsxs("div",{className:"gauge-track",children:[n.jsx("div",{className:"gauge-segments"}),n.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),n.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),n.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),n.jsxs("div",{className:`metric-gauge ${m}`,children:[n.jsx("span",{className:"gauge-label",children:"M"}),n.jsxs("div",{className:"gauge-track",children:[n.jsx("div",{className:"gauge-segments"}),n.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),n.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),n.jsx("span",{className:"gauge-value",children:Math.round(c)})]}),n.jsxs("div",{className:`metric-gauge ${f}`,children:[n.jsx("span",{className:"gauge-label",children:"D"}),n.jsxs("div",{className:"gauge-track",children:[n.jsx("div",{className:"gauge-segments"}),n.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),n.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),n.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Pc(e){return e?{vmid:e.vm.vmid,name:e.vm.name,node:e.vm.node,type:e.vm.type}:null}function Ih({sel:e,onClose:t}){const r=p.useMemo(()=>Pc(e),[e]);return n.jsx(Gm,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:r,onClose:t})}function Lh({sel:e,onClose:t}){const r=p.useMemo(()=>Pc(e),[e]);return n.jsx(Km,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:r,onClose:t})}function Ah({sel:e,onClose:t}){const r=p.useMemo(()=>Pc(e),[e]);return n.jsx(Ym,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:r,onClose:t})}function Oh({cluster:e,clusters:t,isPaused:r=!1}){var ce;const{t:a}=Fe(),s=p.useRef(null),o=p.useRef(null),[i,c]=p.useState(0),[l,d]=p.useState(null),[m,f]=p.useState(new Map),[u,v]=p.useState(new Map),[y,k]=p.useState("grid"),[j,x]=p.useState(0);p.useEffect(()=>{const L=setTimeout(()=>k("line"),600),N=setTimeout(()=>k("flip"),1100),Y=setTimeout(()=>k("done"),3300);return()=>{clearTimeout(L),clearTimeout(N),clearTimeout(Y)}},[]),p.useEffect(()=>{if(y==="grid"){x(0);return}const L=y==="line"?1500:1200;let N,Y=null;const de=j,ne=A=>{Y===null&&(Y=A);const Q=A-Y,xe=Math.min(Q/L,1),oe=1-Math.pow(1-xe,3),be=de+(1-de)*oe;x(be),xe<1&&(N=requestAnimationFrame(ne))};return N=requestAnimationFrame(ne),()=>cancelAnimationFrame(N)},[y]);const h=!e&&t&&Object.keys(t).length>0,g=p.useMemo(()=>{if(!e&&!h)return[];const L=[];return h?Object.values(t).forEach(N=>{Object.values(N.vms).forEach(Y=>{Y.status==="running"&&!Y.template&&L.push(Y)})}):e&&Object.values(e.vms).forEach(N=>{N.status==="running"&&!N.template&&L.push(N)}),L},[e,t,h]),_=p.useMemo(()=>g.map((L,N)=>{var Ae;const Y=N/g.length*Math.PI*2,de=L.cpu.usage_percent,ne=L.memory.total_bytes>0?L.memory.used_bytes/L.memory.total_bytes*100:0,A=((Ae=L.disk)==null?void 0:Ae.usage_percent)||0,Q=Math.max(de,ne,A),xe=.2+Q/100*.6,oe=_e(Q),be=Rs(L.vmid,L.node,L.cluster_id,e,t);return{vm:L,angle:Y,distance:xe,color:oe,task:be}}),[g,e,t]),C=p.useMemo(()=>{if(!e&&!h)return[];const L=[];return h?Object.values(t).forEach(Y=>{Object.values(Y.vms).forEach(de=>L.push(de))}):e&&Object.values(e.vms).forEach(Y=>L.push(Y)),L.filter(Y=>{if(Y.status!=="running"||Y.template)return!1;const de=Y.memory.used_bytes/Y.memory.total_bytes*100,ne=Y.disk.total_bytes>0?Y.disk.used_bytes/Y.disk.total_bytes*100:0;return Y.cpu.usage_percent>80||de>85||ne>85}).sort((Y,de)=>{const ne=Y.memory.used_bytes/Y.memory.total_bytes*100,A=de.memory.used_bytes/de.memory.total_bytes*100,Q=Y.disk.total_bytes>0?Y.disk.used_bytes/Y.disk.total_bytes*100:0,xe=de.disk.total_bytes>0?de.disk.used_bytes/de.disk.total_bytes*100:0,oe=Math.max(Y.cpu.usage_percent,ne,Q);return Math.max(de.cpu.usage_percent,A,xe)-oe})},[e,t,h]);p.useEffect(()=>{const L=new Map;C.forEach((N,Y)=>{L.set(`${N.cluster_id}/${N.node}/${N.vmid}`,Y)}),f(L)},[C]);const $=p.useCallback(L=>{const N=s.current;if(!N)return;const Y=N.getBoundingClientRect(),de=N.width/Y.width,ne=N.height/Y.height,A=(L.clientX-Y.left)*de,Q=(L.clientY-Y.top)*ne,xe=Math.min(N.width,N.height),oe=N.width/2,be=N.height/2,Ae=xe*.4;let it=null;for(const Ne of _){const bt=oe+Math.cos(Ne.angle)*Ae*Ne.distance,pe=be+Math.sin(Ne.angle)*Ae*Ne.distance,Se=Math.sqrt((A-bt)**2+(Q-pe)**2),Pe=15*Math.max(de,ne);if(Se<Pe){it={vm:Ne.vm,x:L.clientX,y:L.clientY,pointX:bt,pointY:pe};break}}d(it)},[_]),E=p.useCallback(()=>{d(null)},[]),M=p.useCallback(L=>{const N=s.current;if(!N)return;const Y=_.find(be=>be.vm.node===L.node&&be.vm.vmid===L.vmid);if(!Y)return;const de=Math.min(N.width,N.height),ne=N.width/2,A=N.height/2,Q=de*.4,xe=ne+Math.cos(Y.angle)*Q*Y.distance,oe=A+Math.sin(Y.angle)*Q*Y.distance;d({vm:Y.vm,x:xe,y:oe,pointX:xe,pointY:oe})},[_]),W=pa(),re=((ce=qo().user)==null?void 0:ce.role_global)??null,[U,le]=p.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),D=p.useCallback(()=>le(L=>({...L,visible:!1})),[]),R=p.useCallback((L,N)=>{L.preventDefault(),L.stopPropagation();const Y=N.cluster_id||(e==null?void 0:e.id)||"";le({visible:!0,x:L.clientX,y:L.clientY,vm:N,clusterId:Y})},[e]),ee=p.useCallback((L,N)=>{var de;const Y=(t==null?void 0:t[L])||((e==null?void 0:e.id)===L?e:null);return((de=Y==null?void 0:Y.client_health)==null?void 0:de[N])||null},[e,t]),T=p.useCallback(async L=>{const{vm:N,action:Y,clusterId:de}=L,ne=N.type==="lxc";if(!((Y==="stop"||Y==="shutdown"||Y==="reboot")&&!await W.confirm(`${Y.toUpperCase()} ${N.name} (#${N.vmid})?`,{title:"Confirm",destructive:!0})))try{const Q=ne?await Ie.ctAction(de,N.node,N.vmid,Y):await Ie.vmAction(de,N.node,N.vmid,Y);console.info(`[radar] ${Y} ${ne?"ct":"vm"}/${N.vmid} → upid=${Q.upid}`)}catch(Q){const xe=Q instanceof Error?Q.message:String(Q);xe.includes("vm_control_disabled")?await W.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await W.alert(`${Y} failed: ${xe.slice(0,200)}`)}},[W]),[I,F]=p.useState(null),[H,G]=p.useState(null),[b,he]=p.useState(null),[fe,ve]=p.useState(null),[J,se]=p.useState("disabled");p.useEffect(()=>{Ie.getConfig().then(L=>{var N;return se(((N=L.console)==null?void 0:N.mode)||"disabled")}).catch(()=>se("disabled"))},[]);const Ue=p.useCallback((L,N,Y,de)=>{const ne=typeof localStorage<"u"&&localStorage.getItem("language")||"",A=N.type==="lxc",xe=`${A?"/console-term":"/console"}/${encodeURIComponent(L)}/${encodeURIComponent(N.node)}/${N.vmid}?ct=${encodeURIComponent(Y)}`+(N.name?`&name=${encodeURIComponent(N.name)}`:"")+(ne?`&lang=${encodeURIComponent(ne)}`:"")+(!A&&de?`#vp=${encodeURIComponent(de)}`:"");window.open(xe,"_blank","noopener,noreferrer")},[]),te=p.useCallback(async()=>{if(!U.vm)return;const L=U.vm,N=U.clusterId;if(J==="disabled"){await W.alert(a("console.disabled"));return}if(J==="prompt"){ve({vm:L,clusterId:N});return}try{const Y=await Ie.consolePrepare({cluster_id:N,node:L.node,vmid:L.vmid});Ue(N,L,Y.console_token,Y.vnc_password)}catch(Y){const de=Y instanceof Error?Y.message:String(Y);await W.alert(a("console.prepare_failed",{err:de}))}},[U,J,W,a,Ue]);return p.useEffect(()=>{if(r||y!=="done")return;const L=setInterval(()=>{c(N=>(N+2)%360)},50);return()=>clearInterval(L)},[r,y]),p.useEffect(()=>{const L=s.current;if(!L)return;const N=L.getContext("2d");if(!N)return;const Y=Math.min(L.width,L.height),de=L.width/2,ne=L.height/2,A=Y*.4;N.clearRect(0,0,L.width,L.height),N.strokeStyle="rgba(0, 240, 255, 0.12)",N.lineWidth=.8;const Q=20;for(let pe=de%Q;pe<L.width;pe+=Q)N.beginPath(),N.moveTo(pe,0),N.lineTo(pe,L.height),N.stroke();for(let pe=ne%Q;pe<L.height;pe+=Q)N.beginPath(),N.moveTo(0,pe),N.lineTo(L.width,pe),N.stroke();if(y!=="flip"&&y!=="done")return;N.globalAlpha=j,N.strokeStyle="rgba(0, 240, 255, 0.25)",N.lineWidth=1.5,N.font='13px "Share Tech Mono", monospace',N.fillStyle="rgba(0, 240, 255, 0.6)",N.textAlign="left";const xe=["25%","50%","75%","100%"];for(let pe=1;pe<=4;pe++){const Se=A*(pe/4);N.beginPath(),N.arc(de,ne,Se,0,Math.PI*2),N.stroke();const Pe=de+Se+4,Ze=ne+4;N.fillText(xe[pe-1],Pe,Ze)}N.fillStyle="rgba(0, 255, 136, 0.8)",N.textAlign="center",N.font='14px "Share Tech Mono", monospace',N.fillText("0%",de,ne-8),N.font='11px "Share Tech Mono", monospace',N.fillText("LOW",de,ne+8),N.fillStyle="rgba(0, 240, 255, 0.5)",N.textAlign="left",N.font='10px "Share Tech Mono", monospace',N.beginPath(),N.moveTo(de-A,ne),N.lineTo(de+A,ne),N.moveTo(de,ne-A),N.lineTo(de,ne+A),N.stroke();const oe=i*Math.PI/180;for(let pe=0;pe<8;pe++){const Se=.12*(pe+1),Pe=.15-pe*.015;N.fillStyle=`rgba(0, 240, 255, ${Pe})`,N.beginPath(),N.moveTo(de,ne),N.arc(de,ne,A,oe-Se,oe-Se+.12),N.closePath(),N.fill()}N.save(),N.shadowBlur=20,N.shadowColor="#00f0ff";const be=N.createLinearGradient(de,ne,de+Math.cos(oe)*A,ne+Math.sin(oe)*A);be.addColorStop(0,"rgba(0, 255, 200, 1)"),be.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),be.addColorStop(1,"rgba(0, 240, 255, 0)"),N.strokeStyle=be,N.lineWidth=3,N.beginPath(),N.moveTo(de,ne),N.lineTo(de+Math.cos(oe)*A,ne+Math.sin(oe)*A),N.stroke(),N.lineWidth=1.5,be.addColorStop(0,"rgba(255, 255, 255, 1)"),N.stroke(),N.restore();const Ae=de+Math.cos(oe)*A*.95,it=ne+Math.sin(oe)*A*.95,Ne=N.createRadialGradient(Ae,it,0,Ae,it,15);Ne.addColorStop(0,"rgba(0, 255, 200, 0.8)"),Ne.addColorStop(1,"rgba(0, 240, 255, 0)"),N.fillStyle=Ne,N.beginPath(),N.arc(Ae,it,15,0,Math.PI*2),N.fill();const bt=[];_.forEach(pe=>{const Se=`${pe.vm.cluster_id}/${pe.vm.node}/${pe.vm.vmid}`,Pe=(pe.angle*180/Math.PI+360)%360;(i-Pe+360)%360<=5&&bt.push({key:Se,point:{vm:pe.vm,angle:pe.angle,distance:pe.distance,color:pe.color,lastScanAngle:i}})}),bt.length>0&&v(pe=>{const Se=new Map(pe);bt.forEach(({key:Ze,point:ye})=>{Se.set(Ze,ye)});const Pe=new Set(_.map(Ze=>`${Ze.vm.cluster_id}/${Ze.vm.node}/${Ze.vm.vmid}`));for(const Ze of Se.keys())Pe.has(Ze)||Se.delete(Ze);return Se}),_.forEach(pe=>{var xt,jt;const Se=de+Math.cos(pe.angle)*A*pe.distance,Pe=ne+Math.sin(pe.angle)*A*pe.distance,Ze=(pe.angle*180/Math.PI+360)%360,ye=(i-Ze+360)%360;let je;ye<20?je=1:ye<60?je=1-(ye-20)/40*.4:je=.6-(ye-60)/300*.45;let we="#00ff88";pe.color==="warning"&&(we="#ff6b00"),pe.color==="danger"&&(we="#ff0040");const Je=!!pe.task,nt=(jt=(xt=pe.task)==null?void 0:xt.task_type)==null?void 0:jt.includes("migrate");if(Je){const ue=nt?"#00f0ff":"#a855f7",ze=Date.now()/500%1;if(N.beginPath(),N.arc(Se,Pe,12+ze*8,0,Math.PI*2),N.strokeStyle=ue,N.lineWidth=1.5,N.globalAlpha=(1-ze)*.6*j,N.stroke(),N.beginPath(),N.arc(Se,Pe,10,0,Math.PI*2),N.strokeStyle=ue,N.lineWidth=1,N.globalAlpha=.8*j,N.stroke(),nt){const Oe=Date.now()/200%(Math.PI*2);N.beginPath(),N.arc(Se,Pe,15,Oe,Oe+Math.PI/2),N.strokeStyle=ue,N.lineWidth=2,N.globalAlpha=.9*j,N.stroke();for(let We=0;We<3;We++){const dt=Oe+We*Math.PI*2/3,Ht=8+(Date.now()/100+We*50)%100/100*10,$t=Se+Math.cos(dt)*Ht,Yt=Pe+Math.sin(dt)*Ht;N.beginPath(),N.arc($t,Yt,1.5,0,Math.PI*2),N.fillStyle=ue,N.globalAlpha=(.8-(Date.now()/100+We*50)%100/100*.6)*j,N.fill()}}N.globalAlpha=j}N.beginPath(),N.arc(Se,Pe,4+pe.vm.cpu.usage_percent/100*4,0,Math.PI*2),N.fillStyle=we,N.globalAlpha=je*j,N.fill(),N.shadowBlur=10,N.shadowColor=we,N.fill(),N.shadowBlur=0,N.globalAlpha=j}),N.beginPath(),N.arc(de,ne,6,0,Math.PI*2),N.fillStyle="#00f0ff",N.fill()},[i,_,y,j]),p.useEffect(()=>{const L=s.current;if(!L)return;const N=()=>{const Y=L.parentElement;Y&&(L.width=Y.clientWidth,L.height=Y.clientHeight)};return N(),window.addEventListener("resize",N),()=>window.removeEventListener("resize",N)},[]),!e&&!h?n.jsx("div",{className:"radar-scan empty",children:n.jsxs("div",{className:"empty-message",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:a("cluster.select")})]})}):n.jsxs("div",{className:"radar-scan",children:[n.jsx("div",{className:"grid-floor"}),n.jsx("div",{className:"radar-header",children:n.jsxs("h1",{className:"radar-title font-display",children:[n.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("circle",{cx:"12",cy:"12",r:"6"}),n.jsx("circle",{cx:"12",cy:"12",r:"2"}),n.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),n.jsxs("div",{className:"radar-layout",children:[n.jsxs("div",{className:`radar-container ${y!=="done"?"entering":""} ${y==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(y==="line"||y==="flip")&&n.jsxs("div",{className:`radar-entry-overlay ${y}`,children:[n.jsx("div",{className:"entry-line"}),n.jsx("div",{className:"entry-circle"}),n.jsx("div",{className:"entry-glow"})]}),n.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:$,onMouseLeave:E,style:{position:"absolute",top:0,left:0,cursor:l?"pointer":"default"}}),n.jsx("div",{className:"radar-overlay",style:{opacity:j},children:n.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),l&&(()=>{var mn,Gt,Vr;const L=s.current;if(!L)return null;const N=L.width,Y=L.height,de=L.getBoundingClientRect(),ne=de.width,A=de.height,Q=ne/N,xe=A/Y,oe=l.pointX*Q,be=l.pointY*xe,Ae=ne,it=A,Ne=180,pe=Rs(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t)?175:145,Se=Ne/2,Pe=pe/2,Ze=50,ye=120,je=Ae/2,we=it/2,Je=oe-je,nt=be-we,xt=Math.sqrt(Je*Je+nt*nt)||1,jt=Je/xt,ue=nt/xt,ze=(Ce,ke)=>{const De=Ce-Se,gt=Ce+Se,pt=ke-Pe,er=ke+Pe;if(oe>=De&&oe<=gt&&be>=pt&&be<=er)return-1;const w=Math.max(De,Math.min(gt,oe)),O=Math.max(pt,Math.min(er,be));return Math.sqrt((oe-w)**2+(be-O)**2)},Oe=20,We=(Ce,ke)=>({x:Math.max(Se+Oe,Math.min(Ae-Se-Oe,Ce)),y:Math.max(Pe+Oe,Math.min(it-Pe-Oe,ke))}),Ht=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((Ce,ke)=>{const De=Ce.dx*jt+Ce.dy*ue;return ke.dx*jt+ke.dy*ue-De});let $t={x:oe+jt*ye,y:be+ue*ye},Yt=!1;for(const Ce of Ht){const ke={x:oe+Ce.dx*ye,y:be+Ce.dy*ye},De=We(ke.x,ke.y),gt=De.x-oe,pt=De.y-be,w=Math.sqrt(gt*gt+pt*pt)>30&&Math.abs(Math.abs(gt)-Math.abs(pt))<20,O=ze(De.x,De.y);if(w&&O>=Ze){$t=De,Yt=!0;break}}if(!Yt)for(const Ce of Ht){const ke={x:oe+Ce.dx*(ye+60),y:be+Ce.dy*(ye+60)},De=We(ke.x,ke.y),gt=De.x-oe,pt=De.y-be,w=Math.sqrt(gt*gt+pt*pt)>30&&Math.abs(Math.abs(gt)-Math.abs(pt))<20,O=ze(De.x,De.y);if(w&&O>=Ze){$t=De,Yt=!0;break}}if(!Yt){const Ce=Ht[0],ke=Ce.dx>0?(Ae-Se-10-oe)/Ce.dx:(Se+10-oe)/Ce.dx,De=Ce.dy>0?(it-Pe-10-be)/Ce.dy:(Pe+10-be)/Ce.dy,gt=Math.min(Math.abs(ke),Math.abs(De),ye),pt=Math.max(Ze+20,gt);$t={x:oe+Ce.dx*pt,y:be+Ce.dy*pt}}const At=20,vr=Math.max(Se+At,Math.min(Ae-Se-At,$t.x)),V=Math.max(Pe+At,Math.min(it-Pe-At,$t.y)),He=oe,Ke=be,Xe=20,ft=28,lt=5,ut=-Math.PI/2,$n=vr-Se,Dr=V-Pe,pn=vr,et=V,Tt=l.vm.memory.total_bytes>0?l.vm.memory.used_bytes/l.vm.memory.total_bytes*100:0,Br=((mn=l.vm.disk)==null?void 0:mn.usage_percent)||0,Wr=Math.max(l.vm.cpu.usage_percent,Tt,Br),yr=_e(Wr),Ye={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[yr]||"#00f0ff";return Ae<=0||it<=0?null:n.jsxs(n.Fragment,{children:[(()=>{const Ce=Math.sqrt((pn-He)**2+(et-Ke)**2),ke=Math.atan2(et-Ke,pn-He)*180/Math.PI;return n.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:He,top:Ke,width:Ce,height:2,background:`linear-gradient(90deg, ${Ye}, ${Ye}80)`,transformOrigin:"0 50%",transform:`rotate(${ke}deg)`,boxShadow:`0 0 8px ${Ye}, 0 0 16px ${Ye}60`,pointerEvents:"none",zIndex:99}})})(),n.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:He-ft-5,top:Ke-ft-5,width:(ft+5)*2,height:(ft+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[n.jsx("defs",{children:n.jsxs("filter",{id:"frameGlow",children:[n.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const Ce=ft+5,ke=ft+5,De=[];for(let w=0;w<lt;w++){const O=ut+w*2*Math.PI/lt;De.push(`${Ce+Xe*Math.cos(O)},${ke+Xe*Math.sin(O)}`)}const gt=De.join(" "),pt=[];for(let w=0;w<lt;w++){const O=ut+w*2*Math.PI/lt;pt.push(`${Ce+ft*Math.cos(O)},${ke+ft*Math.sin(O)}`)}const er=pt.join(" ");return n.jsxs(n.Fragment,{children:[n.jsx("polygon",{points:er,fill:"none",stroke:Ye,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${Ce}px ${ke}px`}}),n.jsx("polygon",{points:gt,fill:"none",stroke:Ye,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(w=>{const O=ut+w*2*Math.PI/lt,z=Ce+Xe*Math.cos(O),S=ke+Xe*Math.sin(O),P=6,Z=ut+(w-1+lt)%lt*2*Math.PI/lt,X=ut+(w+1)%lt*2*Math.PI/lt,ae=z+P*Math.cos(Z+Math.PI),ie=S+P*Math.sin(Z+Math.PI),K=z+P*Math.cos(X+Math.PI),ge=S+P*Math.sin(X+Math.PI);return n.jsxs("g",{children:[n.jsx("line",{x1:z,y1:S,x2:ae,y2:ie,stroke:Ye,strokeWidth:"2"}),n.jsx("line",{x1:z,y1:S,x2:K,y2:ge,stroke:Ye,strokeWidth:"2"})]},w)}),n.jsx("line",{x1:Ce-5,y1:ke,x2:Ce+5,y2:ke,stroke:Ye,strokeWidth:"1"}),n.jsx("line",{x1:Ce,y1:ke-5,x2:Ce,y2:ke+5,stroke:Ye,strokeWidth:"1"})]})})()]}),n.jsxs("div",{className:`radar-tooltip tooltip-${yr}`,style:{position:"absolute",left:$n,top:Dr,width:Ne,height:pe,borderColor:Ye,boxShadow:`0 0 15px ${Ye}40, 0 0 30px ${Ye}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[n.jsx("div",{className:"tooltip-corner tl",style:{borderColor:Ye}}),n.jsx("div",{className:"tooltip-corner tr",style:{borderColor:Ye}}),n.jsx("div",{className:"tooltip-corner bl",style:{borderColor:Ye}}),n.jsx("div",{className:"tooltip-corner br",style:{borderColor:Ye}}),n.jsxs("div",{className:"tooltip-header",children:[n.jsx("span",{className:"tooltip-name",children:l.vm.name}),n.jsxs("span",{className:"tooltip-id",children:["#",l.vm.vmid]})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsx("span",{className:"tooltip-label",children:"NODE"}),n.jsx("span",{className:"tooltip-value",children:l.vm.node})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsx("span",{className:"tooltip-label",children:"CPU"}),n.jsx("span",{className:`tooltip-value text-${_e(l.vm.cpu.usage_percent)}`,children:rt(l.vm.cpu.usage_percent,1)})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsx("span",{className:"tooltip-label",children:"MEMORY"}),n.jsx("span",{className:`tooltip-value text-${_e(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100)}`,children:rt(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100,1)})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsx("span",{className:"tooltip-label",children:"DISKIO"}),n.jsx("span",{className:`tooltip-value text-${_e(((Gt=l.vm.disk)==null?void 0:Gt.usage_percent)||0)}`,children:rt(((Vr=l.vm.disk)==null?void 0:Vr.usage_percent)||0,1)})]}),(()=>{const Ce=Rs(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t),ke=qm(Ce);return ke?n.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${ke.color}40`,marginTop:4,paddingTop:4},children:[n.jsx("span",{className:"tooltip-label",children:"TASK"}),n.jsx("span",{className:"tooltip-value",style:{color:ke.color},children:ke.label})]}):null})(),n.jsx("div",{className:"tooltip-scanline"})]})]})})(),n.jsxs("div",{className:"radar-legend",style:{opacity:j},children:[n.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),n.jsx("span",{children:"<80%"}),n.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),n.jsx("span",{children:"80-95%"}),n.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),n.jsx("span",{children:">95%"}),n.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),n.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[n.jsxs("div",{className:"panel-header",children:[n.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),n.jsx("span",{className:"anomaly-count",children:C.length})]}),n.jsx("div",{className:"anomaly-list",children:C.length===0?n.jsxs("div",{className:"no-anomalies",children:[n.jsx("span",{className:"status-indicator"}),n.jsx("span",{children:a("radar.all_normal")})]}):C.map((L,N)=>{const Y=`${L.cluster_id}/${L.node}/${L.vmid}`,de=m.get(Y),ne=(l==null?void 0:l.vm.node)===L.node&&(l==null?void 0:l.vm.vmid)===L.vmid&&(l==null?void 0:l.vm.cluster_id)===L.cluster_id,A=Rs(L.vmid,L.node,L.cluster_id,e,t);return n.jsx(Rh,{vm:L,index:N,previousIndex:de,onClick:()=>M(L),onContextMenu:R,isSelected:ne,task:A},Y)})})]})]}),n.jsx(Hm,{state:U,onClose:D,onShowDetails:()=>{window.history.pushState(null,"","/matrix"),window.dispatchEvent(new PopStateEvent("popstate"))},onPowerAction:T,onOpenConsole:te,onOpenSnapshots:()=>{U.vm&&F({vm:U.vm,clusterId:U.clusterId})},onBackupNow:()=>{U.vm&&G({vm:U.vm,clusterId:U.clusterId})},onRemoteMigrate:()=>{U.vm&&he({vm:U.vm,clusterId:U.clusterId})},getNodeHealth:ee,userRole:re,consoleMode:J,consolePasswordSet:!1}),n.jsx(Ih,{sel:I,onClose:()=>F(null)}),n.jsx(Lh,{sel:H,onClose:()=>G(null)}),n.jsx(Ah,{sel:b,onClose:()=>he(null)}),n.jsx(Xm,{open:fe!==null,cluster_id:(fe==null?void 0:fe.clusterId)||"",pveUser:"root@pam",onCancel:()=>ve(null),onSubmit:async L=>{if(!fe)return;const{vm:N,clusterId:Y}=fe,de=await Ie.consolePrepare({cluster_id:Y,node:N.node,vmid:N.vmid,password:L});Ue(Y,N,de.console_token,de.vnc_password),ve(null)}}),n.jsx("style",{children:`
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

      `})]})}function Fh({value:e,duration:t=800,suffix:r=""}){const[a,s]=p.useState(0),o=p.useRef(0),i=p.useRef(0);return p.useEffect(()=>{o.current=a;const c=performance.now(),l=d=>{const m=d-c,f=Math.min(m/t,1),u=1-Math.pow(1-f,3);s(o.current+(e-o.current)*u),f<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),n.jsxs(n.Fragment,{children:[a.toFixed(0),r]})}function _o({value:e,duration:t=800}){const[r,a]=p.useState(0),s=p.useRef(0),o=p.useRef(0);return p.useEffect(()=>{s.current=r;const i=performance.now(),c=l=>{const d=l-i,m=Math.min(d/t,1),f=1-Math.pow(1-m,3);a(s.current+(e-s.current)*f),m<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),n.jsx(n.Fragment,{children:$e(r)})}function Dh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=r>=95?"#ff0040":r>=80?"#ff6b00":"#00ff88";return n.jsxs("div",{className:"ceph-core visible",children:[n.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[n.jsx("defs",{children:n.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),n.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),n.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),n.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),n.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),n.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),n.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),n.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${r*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),n.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),n.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),n.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:n.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),n.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:n.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),n.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:n.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),n.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),n.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:n.jsx(Fh,{value:r,duration:1500,suffix:"%"})})]}),n.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),n.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),n.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function Bh({mons:e,mgrs:t,mds:r}){const{t:a}=Fe();return n.jsxs("div",{className:"daemon-orbital",children:[n.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),n.jsxs("div",{className:"daemon-row",children:[n.jsxs("div",{className:"daemon-label",children:[n.jsx("span",{className:"daemon-type mon",children:"MON"}),n.jsx("span",{className:"daemon-count",children:e.length})]}),n.jsx("div",{className:"daemon-nodes",children:e.map(s=>n.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[n.jsx("span",{className:"node-name",children:s.name}),n.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&n.jsx("div",{className:"leader-glow"})]},s.name))})]}),n.jsxs("div",{className:"daemon-row",children:[n.jsxs("div",{className:"daemon-label",children:[n.jsx("span",{className:"daemon-type mgr",children:"MGR"}),n.jsx("span",{className:"daemon-count",children:t.length})]}),n.jsx("div",{className:"daemon-nodes",children:t.map(s=>n.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[n.jsx("span",{className:"node-name",children:s.name}),n.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&n.jsx("div",{className:"active-glow"})]},s.name))})]}),r.length>0&&n.jsxs("div",{className:"daemon-row",children:[n.jsxs("div",{className:"daemon-label",children:[n.jsx("span",{className:"daemon-type mds",children:"MDS"}),n.jsx("span",{className:"daemon-count",children:r.length})]}),n.jsx("div",{className:"daemon-nodes",children:r.map(s=>n.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[n.jsx("span",{className:"node-name",children:s.name}),n.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&n.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function Wh({osds:e,onSelect:t}){const{t:r}=Fe(),a=p.useMemo(()=>{const o={};return e.forEach(i=>{const c=i.host||"unknown";o[c]||(o[c]=[]),o[c].push(i)}),Object.entries(o).sort(([i],[c])=>i.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return n.jsxs("div",{className:"osd-grid-panel",children:[n.jsxs("div",{className:"panel-header",children:[n.jsx("span",{className:"panel-title",children:r("ceph.osd_array")}),n.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),n.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,c])=>n.jsxs("div",{className:"osd-host-group",children:[n.jsx("div",{className:"host-label",children:i}),n.jsx("div",{className:"osd-hexgrid",children:c.sort((l,d)=>l.id-d.id).map(l=>{const d=l.total_bytes>0?l.used_bytes/l.total_bytes*100:0,m=l.status!=="up"||_e(d)==="danger"?"#ff0040":_e(d)==="warning"?"#ff6b00":"#00ff88",f=o*30;return o++,n.jsx("div",{className:`osd-hex ${l.status==="up"?"up":"down"}`,style:{"--osd-color":m,animationDelay:`${f}ms`},onClick:()=>t(l),title:`OSD.${l.id} - ${rt(d,0)}`,children:n.jsx("span",{className:"osd-id",children:l.id})},l.id)})})]},i))})()})]})}function Vh({readBps:e,writeBps:t,readOps:r,writeOps:a,isPaused:s=!1}){const o=p.useRef(null),i=p.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),c=p.useRef(0),l=p.useRef(0),d=100,m=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return p.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),p.useEffect(()=>{const f=o.current;if(!f)return;const u=f.getContext("2d");if(!u)return;const v=window.devicePixelRatio||1,y=()=>{const E=f.getBoundingClientRect();return f.width=E.width*v,f.height=E.height*v,u.setTransform(v,0,0,v,0,0),{width:E.width,height:E.height}};let{width:k,height:j}=y();const x=42,h=k-x;let g=0;const _=50;let C=0;const $=E=>{const M=E-g;g=E,C+=M;const W=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*W,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*W,C>=_&&(C=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),l.current=(l.current+.5)%20,u.clearRect(0,0,k,j);const B=Math.max(...i.current.read,...i.current.write,1),re=8,U=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let D=0;D<=U;D++){const R=re+D/U*(j-re*2),ee=B*(1-D/U);u.fillText(m(ee),x-4,R)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let D=0;D<=U;D++){const R=re+D/U*(j-re*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-l.current,u.moveTo(x,R),u.lineTo(k,R),u.stroke()}u.setLineDash([]);const le=(D,R,ee)=>{if(D.length<2)return;const T=D.map((F,H)=>({x:x+H/(d-1)*h,y:j-re-F/B*(j-re*2)}));u.strokeStyle=ee,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(T[0].x,T[0].y);for(let F=1;F<T.length-1;F++){const H=(T[F].x+T[F+1].x)/2,G=(T[F].y+T[F+1].y)/2;u.quadraticCurveTo(T[F].x,T[F].y,H,G)}u.lineTo(T[T.length-1].x,T[T.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=R,u.lineWidth=2,u.shadowColor=R,u.shadowBlur=8,u.beginPath(),u.moveTo(T[0].x,T[0].y);for(let F=1;F<T.length-1;F++){const H=(T[F].x+T[F+1].x)/2,G=(T[F].y+T[F+1].y)/2;u.quadraticCurveTo(T[F].x,T[F].y,H,G)}u.lineTo(T[T.length-1].x,T[T.length-1].y),u.stroke(),u.shadowBlur=0;const I=3;for(let F=0;F<I;F++){const H=(l.current/20+F/I)%1,G=Math.floor(H*(T.length-1));G<T.length&&(u.fillStyle=R,u.globalAlpha=.8,u.beginPath(),u.arc(T[G].x,T[G].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};le(i.current.write,"#ff6b00","#ff6b00"),le(i.current.read,"#00ff88","#00ff88"),s||(c.current=requestAnimationFrame($))};return c.current=requestAnimationFrame($),()=>cancelAnimationFrame(c.current)},[s]),n.jsxs("div",{className:"io-wave-panel",children:[n.jsx("div",{className:"panel-header",children:n.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),n.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),n.jsxs("div",{className:"io-stats",children:[n.jsxs("div",{className:"io-stat read",children:[n.jsx("span",{className:"io-icon",children:"▼"}),n.jsx("span",{className:"io-label",children:"READ"}),n.jsxs("span",{className:"io-value",children:[$e(e),"/s"]}),n.jsxs("span",{className:"io-ops",children:[r.toFixed(0)," IOPS"]})]}),n.jsxs("div",{className:"io-stat write",children:[n.jsx("span",{className:"io-icon",children:"▲"}),n.jsx("span",{className:"io-label",children:"WRITE"}),n.jsxs("span",{className:"io-value",children:[$e(t),"/s"]}),n.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function nu({pool:e,totalBytes:t}){const r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=r>=95?"#ff0040":r>=80?"#ff6b00":"#00ff88";return n.jsxs("div",{className:"pool-energy-bar visible",children:[n.jsxs("div",{className:"pool-info",children:[n.jsx("span",{className:"pool-name",children:e.name}),n.jsx("span",{className:"pool-size",children:$e(e.used_bytes)})]}),n.jsxs("div",{className:"energy-track",children:[n.jsx("div",{className:"energy-fill",style:{width:`${r}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),n.jsx("div",{className:"energy-glow",style:{width:`${r}%`,background:a}})]}),n.jsxs("span",{className:"pool-percent",style:{color:a},children:[r.toFixed(1),"%"]})]})}function Uh({osd:e,onClose:t}){const{t:r}=Fe(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=_e(a);return n.jsx("div",{className:"osd-popup-overlay",onClick:t,children:n.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[n.jsxs("div",{className:"popup-header",children:[n.jsxs("div",{className:"popup-title",children:[n.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),n.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),n.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),n.jsxs("div",{className:"popup-content",children:[n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:"Host"}),n.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:r("ceph.in_cluster")}),n.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?r("ceph.yes"):r("ceph.no")})]}),n.jsxs("div",{className:"storage-section",children:[n.jsx("div",{className:"storage-bar",children:n.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),n.jsxs("div",{className:"storage-stats",children:[n.jsxs("span",{children:[$e(e.used_bytes)," / ",$e(e.total_bytes)]}),n.jsx("span",{className:`text-${s}`,children:rt(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&n.jsxs("div",{className:"latency-section",children:[n.jsx("div",{className:"latency-title",children:r("ceph.latency")}),n.jsxs("div",{className:"latency-grid",children:[n.jsxs("div",{className:"latency-item",children:[n.jsx("span",{className:"latency-label",children:r("ceph.apply")}),n.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),n.jsxs("div",{className:"latency-item",children:[n.jsx("span",{className:"latency-label",children:r("ceph.commit")}),n.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function Hh({ceph:e}){const{t}=Fe(),r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-r;return n.jsxs("div",{className:"storage-summary",children:[n.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),n.jsxs("div",{className:"summary-stats",children:[n.jsxs("div",{className:"stat-block used",children:[n.jsx("span",{className:"stat-value",children:$e(e.used_bytes)}),n.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),n.jsx("div",{className:"stat-divider",children:"/"}),n.jsxs("div",{className:"stat-block total",children:[n.jsx("span",{className:"stat-value",children:$e(e.total_bytes)}),n.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),n.jsxs("div",{className:"summary-bar",children:[n.jsx("div",{className:"bar-used",style:{width:`${r}%`}}),n.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),n.jsxs("div",{className:"summary-legend",children:[n.jsxs("span",{className:"legend-item used",children:[n.jsx("span",{className:"legend-dot"})," Used ",rt(r,1)]}),n.jsxs("span",{className:"legend-item available",children:[n.jsx("span",{className:"legend-dot"})," Available ",rt(a,1)]})]})]})}function Yh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=r>=95?"#ff0040":r>=80?"#ff6b00":"#00ff88";return n.jsx("div",{className:"compact-core",children:n.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[n.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),n.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),n.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),n.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${r*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),n.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),n.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),n.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:rt(r,0)})]})})}function Gh({mons:e,mgrs:t,mds:r}){return n.jsxs("div",{className:"compact-daemons",children:[n.jsxs("div",{className:"daemon-row",children:[n.jsx("span",{className:"daemon-badge mon",children:"MON"}),n.jsx("div",{className:"daemon-dots",children:e.map(a=>n.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),n.jsx("span",{className:"daemon-count-small",children:e.length})]}),n.jsxs("div",{className:"daemon-row",children:[n.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),n.jsx("div",{className:"daemon-dots",children:t.map(a=>n.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),n.jsx("span",{className:"daemon-count-small",children:t.length})]}),r.length>0&&n.jsxs("div",{className:"daemon-row",children:[n.jsx("span",{className:"daemon-badge mds",children:"MDS"}),n.jsx("div",{className:"daemon-dots",children:r.map(a=>n.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),n.jsx("span",{className:"daemon-count-small",children:r.length})]})]})}function Kh({ceph:e}){const{t}=Fe(),r=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return n.jsxs("div",{className:"compact-storage",children:[n.jsxs("div",{className:"storage-row",children:[n.jsx("span",{className:"storage-label",children:t("ceph.used")}),n.jsx("span",{className:"storage-value",children:n.jsx(_o,{value:e.used_bytes})})]}),n.jsx("div",{className:"compact-bar",children:n.jsx("div",{className:"compact-bar-fill",style:{width:`${r}%`,transition:"width 0.8s ease-out"}})}),n.jsxs("div",{className:"storage-row",children:[n.jsx("span",{className:"storage-label",children:t("ceph.total")}),n.jsx("span",{className:"storage-value",children:n.jsx(_o,{value:e.total_bytes})})]})]})}function Xh({osds:e,onSelect:t}){const r=e.filter(a=>a.status==="up").length;return n.jsxs("div",{className:"compact-osd-panel",children:[n.jsxs("div",{className:"compact-osd-header",children:[n.jsx("span",{className:"compact-osd-title",children:"OSD"}),n.jsxs("span",{className:`compact-osd-status ${r===e.length?"all-up":""}`,children:[r,"/",e.length]})]}),n.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return n.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function qh({readBps:e,writeBps:t}){return n.jsxs("div",{className:"compact-io",children:[n.jsxs("div",{className:"io-row read",children:[n.jsx("span",{className:"io-arrow",children:"▼"}),n.jsx("span",{className:"io-label",children:"R"}),n.jsxs("span",{className:"io-val",children:[n.jsx(_o,{value:e,duration:500}),"/s"]})]}),n.jsxs("div",{className:"io-row write",children:[n.jsx("span",{className:"io-arrow",children:"▲"}),n.jsx("span",{className:"io-label",children:"W"}),n.jsxs("span",{className:"io-val",children:[n.jsx(_o,{value:t,duration:500}),"/s"]})]})]})}function Qh({pools:e,totalBytes:t}){const r=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return r.length===0?null:n.jsxs("div",{className:"compact-pools",children:[r.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return n.jsxs("div",{className:"compact-pool",children:[n.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),n.jsx("div",{className:"pool-mini-bar",children:n.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),n.jsx("span",{className:"pool-pct",style:{color:o},children:rt(s,0)})]},a.name)}),r.length>6&&n.jsxs("span",{className:"pool-more",children:["+",r.length-6," more"]})]})}function Zh({ceph:e,clusterName:t,onOSDSelect:r,compact:a=!1,isPaused:s=!1}){const{t:o}=Fe();if(a)return n.jsxs("div",{className:"ceph-cluster-compact",children:[n.jsx("div",{className:"compact-left",children:n.jsx(Yh,{ceph:e})}),n.jsxs("div",{className:"compact-middle",children:[n.jsx(Gh,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),n.jsx(Kh,{ceph:e}),n.jsx(qh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),n.jsx("div",{className:"compact-right",children:n.jsx(Xh,{osds:e.osds,onSelect:r})}),n.jsx("div",{className:"compact-pools-section",children:n.jsx(Qh,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),c=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),l=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return n.jsx(n.Fragment,{children:n.jsxs("div",{className:"ceph-content-full",children:[n.jsxs("div",{className:"col-core",children:[n.jsx(Dh,{ceph:e}),n.jsx(Hh,{ceph:e})]}),n.jsxs("div",{className:"col-daemons",children:[n.jsx(Bh,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),n.jsxs("div",{className:"pools-inline",children:[l.length>0&&n.jsxs("div",{className:"pool-group-inline",children:[n.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),n.jsx("div",{className:"pools-list",children:l.map((d,m)=>n.jsx(nu,{pool:d,totalBytes:e.total_bytes},d.name))})]}),c.length>0&&n.jsxs("div",{className:"pool-group-inline",children:[n.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),n.jsx("div",{className:"pools-list",children:c.map((d,m)=>n.jsx(nu,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),n.jsxs("div",{className:"col-osd",children:[n.jsx(Vh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),n.jsx(Wh,{osds:e.osds,onSelect:r})]})]})})}function Jh({cluster:e,clusters:t,isPaused:r=!1}){const{t:a}=Fe(),[s,o]=p.useState(null),i=!e&&t&&Object.keys(t).length>0,c=p.useMemo(()=>i?Object.entries(t).filter(([l,d])=>d.ceph).map(([l,d])=>({id:l,name:d.name||l,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?n.jsxs("div",{className:"ceph-constellation empty",children:[n.jsxs("div",{className:"empty-message",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:a("cluster.select")})]}),n.jsx("style",{children:Ti})]}):c.length===0?n.jsxs("div",{className:"ceph-constellation empty",children:[n.jsxs("div",{className:"empty-message",children:[n.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 8v4M12 16h.01"})]}),n.jsx("span",{children:a("ceph.no_cluster")})]}),n.jsx("style",{children:Ti})]}):n.jsxs("div",{className:"ceph-constellation",children:[n.jsx("div",{className:"grid-floor"}),n.jsx("div",{className:"ceph-header",children:n.jsxs("h1",{className:"ceph-title font-display",children:[n.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"3"}),n.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),n.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),n.jsx("div",{className:"ceph-clusters-stack",children:c.map((l,d)=>{const m=l.ceph.health==="HEALTH_OK"?"success":l.ceph.health==="HEALTH_WARN"?"warning":"danger";return n.jsxs("div",{className:"ceph-cluster-section",children:[c.length>1&&n.jsxs("div",{className:"cluster-section-header",children:[n.jsx("span",{className:`section-health ${m}`}),n.jsx("span",{className:"section-name",children:l.name}),n.jsxs("span",{className:"section-osd",children:[l.ceph.osd_up,"/",l.ceph.osd_count," OSD"]}),n.jsx("div",{className:"section-line"})]}),n.jsx(Zh,{ceph:l.ceph,clusterName:c.length===1?l.name:void 0,onOSDSelect:o,compact:c.length>1,isPaused:r})]},l.id)})}),s&&n.jsx(Uh,{osd:s,onClose:()=>o(null)}),n.jsx("style",{children:Ti})]})}const Ti=`
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
`;var ex={value:()=>{}};function Qm(){for(var e=0,t=arguments.length,r={},a;e<t;++e){if(!(a=arguments[e]+"")||a in r||/[\s.]/.test(a))throw new Error("illegal type: "+a);r[a]=[]}return new qs(r)}function qs(e){this._=e}function tx(e,t){return e.trim().split(/^|\s+/).map(function(r){var a="",s=r.indexOf(".");if(s>=0&&(a=r.slice(s+1),r=r.slice(0,s)),r&&!t.hasOwnProperty(r))throw new Error("unknown type: "+r);return{type:r,name:a}})}qs.prototype=Qm.prototype={constructor:qs,on:function(e,t){var r=this._,a=tx(e+"",r),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=rx(r[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)r[s]=au(r[s],e.name,t);else if(t==null)for(s in r)r[s]=au(r[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var r in t)e[r]=t[r].slice();return new qs(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var r=new Array(s),a=0,s,o;a<s;++a)r[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,r)},apply:function(e,t,r){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,r)}};function rx(e,t){for(var r=0,a=e.length,s;r<a;++r)if((s=e[r]).name===t)return s.value}function au(e,t,r){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=ex,e=e.slice(0,a).concat(e.slice(a+1));break}return r!=null&&e.push({name:t,value:r}),e}var $l="http://www.w3.org/1999/xhtml";const su={svg:"http://www.w3.org/2000/svg",xhtml:$l,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Qo(e){var t=e+="",r=t.indexOf(":");return r>=0&&(t=e.slice(0,r))!=="xmlns"&&(e=e.slice(r+1)),su.hasOwnProperty(t)?{space:su[t],local:e}:e}function nx(e){return function(){var t=this.ownerDocument,r=this.namespaceURI;return r===$l&&t.documentElement.namespaceURI===$l?t.createElement(e):t.createElementNS(r,e)}}function ax(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Zm(e){var t=Qo(e);return(t.local?ax:nx)(t)}function sx(){}function Rc(e){return e==null?sx:function(){return this.querySelector(e)}}function ox(e){typeof e!="function"&&(e=Rc(e));for(var t=this._groups,r=t.length,a=new Array(r),s=0;s<r;++s)for(var o=t[s],i=o.length,c=a[s]=new Array(i),l,d,m=0;m<i;++m)(l=o[m])&&(d=e.call(l,l.__data__,m,o))&&("__data__"in l&&(d.__data__=l.__data__),c[m]=d);return new hr(a,this._parents)}function ix(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function lx(){return[]}function Jm(e){return e==null?lx:function(){return this.querySelectorAll(e)}}function cx(e){return function(){return ix(e.apply(this,arguments))}}function dx(e){typeof e=="function"?e=cx(e):e=Jm(e);for(var t=this._groups,r=t.length,a=[],s=[],o=0;o<r;++o)for(var i=t[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&(a.push(e.call(l,l.__data__,d,i)),s.push(l));return new hr(a,s)}function e0(e){return function(){return this.matches(e)}}function t0(e){return function(t){return t.matches(e)}}var ux=Array.prototype.find;function px(e){return function(){return ux.call(this.children,e)}}function mx(){return this.firstElementChild}function fx(e){return this.select(e==null?mx:px(typeof e=="function"?e:t0(e)))}var gx=Array.prototype.filter;function hx(){return Array.from(this.children)}function xx(e){return function(){return gx.call(this.children,e)}}function vx(e){return this.selectAll(e==null?hx:xx(typeof e=="function"?e:t0(e)))}function yx(e){typeof e!="function"&&(e=e0(e));for(var t=this._groups,r=t.length,a=new Array(r),s=0;s<r;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new hr(a,this._parents)}function r0(e){return new Array(e.length)}function bx(){return new hr(this._enter||this._groups.map(r0),this._parents)}function No(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}No.prototype={constructor:No,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function wx(e){return function(){return e}}function kx(e,t,r,a,s,o){for(var i=0,c,l=t.length,d=o.length;i<d;++i)(c=t[i])?(c.__data__=o[i],a[i]=c):r[i]=new No(e,o[i]);for(;i<l;++i)(c=t[i])&&(s[i]=c)}function jx(e,t,r,a,s,o,i){var c,l,d=new Map,m=t.length,f=o.length,u=new Array(m),v;for(c=0;c<m;++c)(l=t[c])&&(u[c]=v=i.call(l,l.__data__,c,t)+"",d.has(v)?s[c]=l:d.set(v,l));for(c=0;c<f;++c)v=i.call(e,o[c],c,o)+"",(l=d.get(v))?(a[c]=l,l.__data__=o[c],d.delete(v)):r[c]=new No(e,o[c]);for(c=0;c<m;++c)(l=t[c])&&d.get(u[c])===l&&(s[c]=l)}function _x(e){return e.__data__}function Nx(e,t){if(!arguments.length)return Array.from(this,_x);var r=t?jx:kx,a=this._parents,s=this._groups;typeof e!="function"&&(e=wx(e));for(var o=s.length,i=new Array(o),c=new Array(o),l=new Array(o),d=0;d<o;++d){var m=a[d],f=s[d],u=f.length,v=Sx(e.call(m,m&&m.__data__,d,a)),y=v.length,k=c[d]=new Array(y),j=i[d]=new Array(y),x=l[d]=new Array(u);r(m,f,k,j,x,v,t);for(var h=0,g=0,_,C;h<y;++h)if(_=k[h]){for(h>=g&&(g=h+1);!(C=j[g])&&++g<y;);_._next=C||null}}return i=new hr(i,a),i._enter=c,i._exit=l,i}function Sx(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Cx(){return new hr(this._exit||this._groups.map(r0),this._parents)}function Mx(e,t,r){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),r==null?o.remove():r(o),a&&s?a.merge(s).order():s}function zx(e){for(var t=e.selection?e.selection():e,r=this._groups,a=t._groups,s=r.length,o=a.length,i=Math.min(s,o),c=new Array(s),l=0;l<i;++l)for(var d=r[l],m=a[l],f=d.length,u=c[l]=new Array(f),v,y=0;y<f;++y)(v=d[y]||m[y])&&(u[y]=v);for(;l<s;++l)c[l]=r[l];return new hr(c,this._parents)}function Ex(){for(var e=this._groups,t=-1,r=e.length;++t<r;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function $x(e){e||(e=Tx);function t(f,u){return f&&u?e(f.__data__,u.__data__):!f-!u}for(var r=this._groups,a=r.length,s=new Array(a),o=0;o<a;++o){for(var i=r[o],c=i.length,l=s[o]=new Array(c),d,m=0;m<c;++m)(d=i[m])&&(l[m]=d);l.sort(t)}return new hr(s,this._parents).order()}function Tx(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Px(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Rx(){return Array.from(this)}function Ix(){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function Lx(){let e=0;for(const t of this)++e;return e}function Ax(){return!this.node()}function Ox(e){for(var t=this._groups,r=0,a=t.length;r<a;++r)for(var s=t[r],o=0,i=s.length,c;o<i;++o)(c=s[o])&&e.call(c,c.__data__,o,s);return this}function Fx(e){return function(){this.removeAttribute(e)}}function Dx(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Bx(e,t){return function(){this.setAttribute(e,t)}}function Wx(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Vx(e,t){return function(){var r=t.apply(this,arguments);r==null?this.removeAttribute(e):this.setAttribute(e,r)}}function Ux(e,t){return function(){var r=t.apply(this,arguments);r==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,r)}}function Hx(e,t){var r=Qo(e);if(arguments.length<2){var a=this.node();return r.local?a.getAttributeNS(r.space,r.local):a.getAttribute(r)}return this.each((t==null?r.local?Dx:Fx:typeof t=="function"?r.local?Ux:Vx:r.local?Wx:Bx)(r,t))}function n0(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Yx(e){return function(){this.style.removeProperty(e)}}function Gx(e,t,r){return function(){this.style.setProperty(e,t,r)}}function Kx(e,t,r){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,r)}}function Xx(e,t,r){return arguments.length>1?this.each((t==null?Yx:typeof t=="function"?Kx:Gx)(e,t,r??"")):ia(this.node(),e)}function ia(e,t){return e.style.getPropertyValue(t)||n0(e).getComputedStyle(e,null).getPropertyValue(t)}function qx(e){return function(){delete this[e]}}function Qx(e,t){return function(){this[e]=t}}function Zx(e,t){return function(){var r=t.apply(this,arguments);r==null?delete this[e]:this[e]=r}}function Jx(e,t){return arguments.length>1?this.each((t==null?qx:typeof t=="function"?Zx:Qx)(e,t)):this.node()[e]}function a0(e){return e.trim().split(/^|\s+/)}function Ic(e){return e.classList||new s0(e)}function s0(e){this._node=e,this._names=a0(e.getAttribute("class")||"")}s0.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function o0(e,t){for(var r=Ic(e),a=-1,s=t.length;++a<s;)r.add(t[a])}function i0(e,t){for(var r=Ic(e),a=-1,s=t.length;++a<s;)r.remove(t[a])}function ev(e){return function(){o0(this,e)}}function tv(e){return function(){i0(this,e)}}function rv(e,t){return function(){(t.apply(this,arguments)?o0:i0)(this,e)}}function nv(e,t){var r=a0(e+"");if(arguments.length<2){for(var a=Ic(this.node()),s=-1,o=r.length;++s<o;)if(!a.contains(r[s]))return!1;return!0}return this.each((typeof t=="function"?rv:t?ev:tv)(r,t))}function av(){this.textContent=""}function sv(e){return function(){this.textContent=e}}function ov(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function iv(e){return arguments.length?this.each(e==null?av:(typeof e=="function"?ov:sv)(e)):this.node().textContent}function lv(){this.innerHTML=""}function cv(e){return function(){this.innerHTML=e}}function dv(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function uv(e){return arguments.length?this.each(e==null?lv:(typeof e=="function"?dv:cv)(e)):this.node().innerHTML}function pv(){this.nextSibling&&this.parentNode.appendChild(this)}function mv(){return this.each(pv)}function fv(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function gv(){return this.each(fv)}function hv(e){var t=typeof e=="function"?e:Zm(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function xv(){return null}function vv(e,t){var r=typeof e=="function"?e:Zm(e),a=t==null?xv:typeof t=="function"?t:Rc(t);return this.select(function(){return this.insertBefore(r.apply(this,arguments),a.apply(this,arguments)||null)})}function yv(){var e=this.parentNode;e&&e.removeChild(this)}function bv(){return this.each(yv)}function wv(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function kv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function jv(e){return this.select(e?kv:wv)}function _v(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Nv(e){return function(t){e.call(this,t,this.__data__)}}function Sv(e){return e.trim().split(/^|\s+/).map(function(t){var r="",a=t.indexOf(".");return a>=0&&(r=t.slice(a+1),t=t.slice(0,a)),{type:t,name:r}})}function Cv(e){return function(){var t=this.__on;if(t){for(var r=0,a=-1,s=t.length,o;r<s;++r)o=t[r],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function Mv(e,t,r){return function(){var a=this.__on,s,o=Nv(t);if(a){for(var i=0,c=a.length;i<c;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=r),s.value=t;return}}this.addEventListener(e.type,o,r),s={type:e.type,name:e.name,value:t,listener:o,options:r},a?a.push(s):this.__on=[s]}}function zv(e,t,r){var a=Sv(e+""),s,o=a.length,i;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,d=c.length,m;l<d;++l)for(s=0,m=c[l];s<o;++s)if((i=a[s]).type===m.type&&i.name===m.name)return m.value}return}for(c=t?Mv:Cv,s=0;s<o;++s)this.each(c(a[s],t,r));return this}function l0(e,t,r){var a=n0(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,r):(s=a.document.createEvent("Event"),r?(s.initEvent(t,r.bubbles,r.cancelable),s.detail=r.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function Ev(e,t){return function(){return l0(this,e,t)}}function $v(e,t){return function(){return l0(this,e,t.apply(this,arguments))}}function Tv(e,t){return this.each((typeof t=="function"?$v:Ev)(e,t))}function*Pv(){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var Rv=[null];function hr(e,t){this._groups=e,this._parents=t}function ms(){return new hr([[document.documentElement]],Rv)}function Iv(){return this}hr.prototype=ms.prototype={constructor:hr,select:ox,selectAll:dx,selectChild:fx,selectChildren:vx,filter:yx,data:Nx,enter:bx,exit:Cx,join:Mx,merge:zx,selection:Iv,order:Ex,sort:$x,call:Px,nodes:Rx,node:Ix,size:Lx,empty:Ax,each:Ox,attr:Hx,style:Xx,property:Jx,classed:nv,text:iv,html:uv,raise:mv,lower:gv,append:hv,insert:vv,remove:bv,clone:jv,datum:_v,on:zv,dispatch:Tv,[Symbol.iterator]:Pv};function Lc(e,t,r){e.prototype=t.prototype=r,r.constructor=e}function c0(e,t){var r=Object.create(e.prototype);for(var a in t)r[a]=t[a];return r}function fs(){}var as=.7,So=1/as,Jn="\\s*([+-]?\\d+)\\s*",ss="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Sr="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Lv=/^#([0-9a-f]{3,8})$/,Av=new RegExp(`^rgb\\(${Jn},${Jn},${Jn}\\)$`),Ov=new RegExp(`^rgb\\(${Sr},${Sr},${Sr}\\)$`),Fv=new RegExp(`^rgba\\(${Jn},${Jn},${Jn},${ss}\\)$`),Dv=new RegExp(`^rgba\\(${Sr},${Sr},${Sr},${ss}\\)$`),Bv=new RegExp(`^hsl\\(${ss},${Sr},${Sr}\\)$`),Wv=new RegExp(`^hsla\\(${ss},${Sr},${Sr},${ss}\\)$`),ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Lc(fs,os,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:iu,formatHex:iu,formatHex8:Vv,formatHsl:Uv,formatRgb:lu,toString:lu});function iu(){return this.rgb().formatHex()}function Vv(){return this.rgb().formatHex8()}function Uv(){return d0(this).formatHsl()}function lu(){return this.rgb().formatRgb()}function os(e){var t,r;return e=(e+"").trim().toLowerCase(),(t=Lv.exec(e))?(r=t[1].length,t=parseInt(t[1],16),r===6?cu(t):r===3?new Bt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):r===8?Is(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):r===4?Is(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Av.exec(e))?new Bt(t[1],t[2],t[3],1):(t=Ov.exec(e))?new Bt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Fv.exec(e))?Is(t[1],t[2],t[3],t[4]):(t=Dv.exec(e))?Is(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Bv.exec(e))?pu(t[1],t[2]/100,t[3]/100,1):(t=Wv.exec(e))?pu(t[1],t[2]/100,t[3]/100,t[4]):ou.hasOwnProperty(e)?cu(ou[e]):e==="transparent"?new Bt(NaN,NaN,NaN,0):null}function cu(e){return new Bt(e>>16&255,e>>8&255,e&255,1)}function Is(e,t,r,a){return a<=0&&(e=t=r=NaN),new Bt(e,t,r,a)}function Hv(e){return e instanceof fs||(e=os(e)),e?(e=e.rgb(),new Bt(e.r,e.g,e.b,e.opacity)):new Bt}function Tl(e,t,r,a){return arguments.length===1?Hv(e):new Bt(e,t,r,a??1)}function Bt(e,t,r,a){this.r=+e,this.g=+t,this.b=+r,this.opacity=+a}Lc(Bt,Tl,c0(fs,{brighter(e){return e=e==null?So:Math.pow(So,e),new Bt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?as:Math.pow(as,e),new Bt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Bt(kn(this.r),kn(this.g),kn(this.b),Co(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:du,formatHex:du,formatHex8:Yv,formatRgb:uu,toString:uu}));function du(){return`#${yn(this.r)}${yn(this.g)}${yn(this.b)}`}function Yv(){return`#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn((isNaN(this.opacity)?1:this.opacity)*255)}`}function uu(){const e=Co(this.opacity);return`${e===1?"rgb(":"rgba("}${kn(this.r)}, ${kn(this.g)}, ${kn(this.b)}${e===1?")":`, ${e})`}`}function Co(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function kn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function yn(e){return e=kn(e),(e<16?"0":"")+e.toString(16)}function pu(e,t,r,a){return a<=0?e=t=r=NaN:r<=0||r>=1?e=t=NaN:t<=0&&(e=NaN),new pr(e,t,r,a)}function d0(e){if(e instanceof pr)return new pr(e.h,e.s,e.l,e.opacity);if(e instanceof fs||(e=os(e)),!e)return new pr;if(e instanceof pr)return e;e=e.rgb();var t=e.r/255,r=e.g/255,a=e.b/255,s=Math.min(t,r,a),o=Math.max(t,r,a),i=NaN,c=o-s,l=(o+s)/2;return c?(t===o?i=(r-a)/c+(r<a)*6:r===o?i=(a-t)/c+2:i=(t-r)/c+4,c/=l<.5?o+s:2-o-s,i*=60):c=l>0&&l<1?0:i,new pr(i,c,l,e.opacity)}function Gv(e,t,r,a){return arguments.length===1?d0(e):new pr(e,t,r,a??1)}function pr(e,t,r,a){this.h=+e,this.s=+t,this.l=+r,this.opacity=+a}Lc(pr,Gv,c0(fs,{brighter(e){return e=e==null?So:Math.pow(So,e),new pr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?as:Math.pow(as,e),new pr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,r=this.l,a=r+(r<.5?r:1-r)*t,s=2*r-a;return new Bt(Pi(e>=240?e-240:e+120,s,a),Pi(e,s,a),Pi(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new pr(mu(this.h),Ls(this.s),Ls(this.l),Co(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Co(this.opacity);return`${e===1?"hsl(":"hsla("}${mu(this.h)}, ${Ls(this.s)*100}%, ${Ls(this.l)*100}%${e===1?")":`, ${e})`}`}}));function mu(e){return e=(e||0)%360,e<0?e+360:e}function Ls(e){return Math.max(0,Math.min(1,e||0))}function Pi(e,t,r){return(e<60?t+(r-t)*e/60:e<180?r:e<240?t+(r-t)*(240-e)/60:t)*255}const u0=e=>()=>e;function Kv(e,t){return function(r){return e+r*t}}function Xv(e,t,r){return e=Math.pow(e,r),t=Math.pow(t,r)-e,r=1/r,function(a){return Math.pow(e+a*t,r)}}function qv(e){return(e=+e)==1?p0:function(t,r){return r-t?Xv(t,r,e):u0(isNaN(t)?r:t)}}function p0(e,t){var r=t-e;return r?Kv(e,r):u0(isNaN(e)?t:e)}const fu=function e(t){var r=qv(t);function a(s,o){var i=r((s=Tl(s)).r,(o=Tl(o)).r),c=r(s.g,o.g),l=r(s.b,o.b),d=p0(s.opacity,o.opacity);return function(m){return s.r=i(m),s.g=c(m),s.b=l(m),s.opacity=d(m),s+""}}return a.gamma=e,a}(1);function Gr(e,t){return e=+e,t=+t,function(r){return e*(1-r)+t*r}}var Pl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ri=new RegExp(Pl.source,"g");function Qv(e){return function(){return e}}function Zv(e){return function(t){return e(t)+""}}function Jv(e,t){var r=Pl.lastIndex=Ri.lastIndex=0,a,s,o,i=-1,c=[],l=[];for(e=e+"",t=t+"";(a=Pl.exec(e))&&(s=Ri.exec(t));)(o=s.index)>r&&(o=t.slice(r,o),c[i]?c[i]+=o:c[++i]=o),(a=a[0])===(s=s[0])?c[i]?c[i]+=s:c[++i]=s:(c[++i]=null,l.push({i,x:Gr(a,s)})),r=Ri.lastIndex;return r<t.length&&(o=t.slice(r),c[i]?c[i]+=o:c[++i]=o),c.length<2?l[0]?Zv(l[0].x):Qv(t):(t=l.length,function(d){for(var m=0,f;m<t;++m)c[(f=l[m]).i]=f.x(d);return c.join("")})}var gu=180/Math.PI,Rl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function m0(e,t,r,a,s,o){var i,c,l;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(l=e*r+t*a)&&(r-=e*l,a-=t*l),(c=Math.sqrt(r*r+a*a))&&(r/=c,a/=c,l/=c),e*a<t*r&&(e=-e,t=-t,l=-l,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*gu,skewX:Math.atan(l)*gu,scaleX:i,scaleY:c}}var As;function e1(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Rl:m0(t.a,t.b,t.c,t.d,t.e,t.f)}function t1(e){return e==null||(As||(As=document.createElementNS("http://www.w3.org/2000/svg","g")),As.setAttribute("transform",e),!(e=As.transform.baseVal.consolidate()))?Rl:(e=e.matrix,m0(e.a,e.b,e.c,e.d,e.e,e.f))}function f0(e,t,r,a){function s(d){return d.length?d.pop()+" ":""}function o(d,m,f,u,v,y){if(d!==f||m!==u){var k=v.push("translate(",null,t,null,r);y.push({i:k-4,x:Gr(d,f)},{i:k-2,x:Gr(m,u)})}else(f||u)&&v.push("translate("+f+t+u+r)}function i(d,m,f,u){d!==m?(d-m>180?m+=360:m-d>180&&(d+=360),u.push({i:f.push(s(f)+"rotate(",null,a)-2,x:Gr(d,m)})):m&&f.push(s(f)+"rotate("+m+a)}function c(d,m,f,u){d!==m?u.push({i:f.push(s(f)+"skewX(",null,a)-2,x:Gr(d,m)}):m&&f.push(s(f)+"skewX("+m+a)}function l(d,m,f,u,v,y){if(d!==f||m!==u){var k=v.push(s(v)+"scale(",null,",",null,")");y.push({i:k-4,x:Gr(d,f)},{i:k-2,x:Gr(m,u)})}else(f!==1||u!==1)&&v.push(s(v)+"scale("+f+","+u+")")}return function(d,m){var f=[],u=[];return d=e(d),m=e(m),o(d.translateX,d.translateY,m.translateX,m.translateY,f,u),i(d.rotate,m.rotate,f,u),c(d.skewX,m.skewX,f,u),l(d.scaleX,d.scaleY,m.scaleX,m.scaleY,f,u),d=m=null,function(v){for(var y=-1,k=u.length,j;++y<k;)f[(j=u[y]).i]=j.x(v);return f.join("")}}}var r1=f0(e1,"px, ","px)","deg)"),n1=f0(t1,", ",")",")"),la=0,za=0,wa=0,g0=1e3,Mo,Ea,zo=0,Mn=0,Zo=0,is=typeof performance=="object"&&performance.now?performance:Date,h0=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ac(){return Mn||(h0(a1),Mn=is.now()+Zo)}function a1(){Mn=0}function Eo(){this._call=this._time=this._next=null}Eo.prototype=x0.prototype={constructor:Eo,restart:function(e,t,r){if(typeof e!="function")throw new TypeError("callback is not a function");r=(r==null?Ac():+r)+(t==null?0:+t),!this._next&&Ea!==this&&(Ea?Ea._next=this:Mo=this,Ea=this),this._call=e,this._time=r,Il()},stop:function(){this._call&&(this._call=null,this._time=1/0,Il())}};function x0(e,t,r){var a=new Eo;return a.restart(e,t,r),a}function s1(){Ac(),++la;for(var e=Mo,t;e;)(t=Mn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--la}function hu(){Mn=(zo=is.now())+Zo,la=za=0;try{s1()}finally{la=0,i1(),Mn=0}}function o1(){var e=is.now(),t=e-zo;t>g0&&(Zo-=t,zo=e)}function i1(){for(var e,t=Mo,r,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(r=t._next,t._next=null,t=e?e._next=r:Mo=r);Ea=e,Il(a)}function Il(e){if(!la){za&&(za=clearTimeout(za));var t=e-Mn;t>24?(e<1/0&&(za=setTimeout(hu,e-is.now()-Zo)),wa&&(wa=clearInterval(wa))):(wa||(zo=is.now(),wa=setInterval(o1,g0)),la=1,h0(hu))}}function xu(e,t,r){var a=new Eo;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,r),a}var l1=Qm("start","end","cancel","interrupt"),c1=[],v0=0,vu=1,Ll=2,Qs=3,yu=4,Al=5,Zs=6;function Jo(e,t,r,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(r in i)return;d1(e,r,{name:t,index:a,group:s,on:l1,tween:c1,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:v0})}function Oc(e,t){var r=xr(e,t);if(r.state>v0)throw new Error("too late; already scheduled");return r}function Cr(e,t){var r=xr(e,t);if(r.state>Qs)throw new Error("too late; already running");return r}function xr(e,t){var r=e.__transition;if(!r||!(r=r[t]))throw new Error("transition not found");return r}function d1(e,t,r){var a=e.__transition,s;a[t]=r,r.timer=x0(o,0,r.time);function o(d){r.state=vu,r.timer.restart(i,r.delay,r.time),r.delay<=d&&i(d-r.delay)}function i(d){var m,f,u,v;if(r.state!==vu)return l();for(m in a)if(v=a[m],v.name===r.name){if(v.state===Qs)return xu(i);v.state===yu?(v.state=Zs,v.timer.stop(),v.on.call("interrupt",e,e.__data__,v.index,v.group),delete a[m]):+m<t&&(v.state=Zs,v.timer.stop(),v.on.call("cancel",e,e.__data__,v.index,v.group),delete a[m])}if(xu(function(){r.state===Qs&&(r.state=yu,r.timer.restart(c,r.delay,r.time),c(d))}),r.state=Ll,r.on.call("start",e,e.__data__,r.index,r.group),r.state===Ll){for(r.state=Qs,s=new Array(u=r.tween.length),m=0,f=-1;m<u;++m)(v=r.tween[m].value.call(e,e.__data__,r.index,r.group))&&(s[++f]=v);s.length=f+1}}function c(d){for(var m=d<r.duration?r.ease.call(null,d/r.duration):(r.timer.restart(l),r.state=Al,1),f=-1,u=s.length;++f<u;)s[f].call(e,m);r.state===Al&&(r.on.call("end",e,e.__data__,r.index,r.group),l())}function l(){r.state=Zs,r.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function u1(e,t){var r=e.__transition,a,s,o=!0,i;if(r){t=t==null?null:t+"";for(i in r){if((a=r[i]).name!==t){o=!1;continue}s=a.state>Ll&&a.state<Al,a.state=Zs,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete r[i]}o&&delete e.__transition}}function p1(e){return this.each(function(){u1(this,e)})}function m1(e,t){var r,a;return function(){var s=Cr(this,e),o=s.tween;if(o!==r){a=r=o;for(var i=0,c=a.length;i<c;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function f1(e,t,r){var a,s;if(typeof r!="function")throw new Error;return function(){var o=Cr(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var c={name:t,value:r},l=0,d=s.length;l<d;++l)if(s[l].name===t){s[l]=c;break}l===d&&s.push(c)}o.tween=s}}function g1(e,t){var r=this._id;if(e+="",arguments.length<2){for(var a=xr(this.node(),r).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?m1:f1)(r,e,t))}function Fc(e,t,r){var a=e._id;return e.each(function(){var s=Cr(this,a);(s.value||(s.value={}))[t]=r.apply(this,arguments)}),function(s){return xr(s,a).value[t]}}function y0(e,t){var r;return(typeof t=="number"?Gr:t instanceof os?fu:(r=os(t))?(t=r,fu):Jv)(e,t)}function h1(e){return function(){this.removeAttribute(e)}}function x1(e){return function(){this.removeAttributeNS(e.space,e.local)}}function v1(e,t,r){var a,s=r+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,r)}}function y1(e,t,r){var a,s=r+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,r)}}function b1(e,t,r){var a,s,o;return function(){var i,c=r(this),l;return c==null?void this.removeAttribute(e):(i=this.getAttribute(e),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function w1(e,t,r){var a,s,o;return function(){var i,c=r(this),l;return c==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function k1(e,t){var r=Qo(e),a=r==="transform"?n1:y0;return this.attrTween(e,typeof t=="function"?(r.local?w1:b1)(r,a,Fc(this,"attr."+e,t)):t==null?(r.local?x1:h1)(r):(r.local?y1:v1)(r,a,t))}function j1(e,t){return function(r){this.setAttribute(e,t.call(this,r))}}function _1(e,t){return function(r){this.setAttributeNS(e.space,e.local,t.call(this,r))}}function N1(e,t){var r,a;function s(){var o=t.apply(this,arguments);return o!==a&&(r=(a=o)&&_1(e,o)),r}return s._value=t,s}function S1(e,t){var r,a;function s(){var o=t.apply(this,arguments);return o!==a&&(r=(a=o)&&j1(e,o)),r}return s._value=t,s}function C1(e,t){var r="attr."+e;if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;var a=Qo(e);return this.tween(r,(a.local?N1:S1)(a,t))}function M1(e,t){return function(){Oc(this,e).delay=+t.apply(this,arguments)}}function z1(e,t){return t=+t,function(){Oc(this,e).delay=t}}function E1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?M1:z1)(t,e)):xr(this.node(),t).delay}function $1(e,t){return function(){Cr(this,e).duration=+t.apply(this,arguments)}}function T1(e,t){return t=+t,function(){Cr(this,e).duration=t}}function P1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?$1:T1)(t,e)):xr(this.node(),t).duration}function R1(e,t){if(typeof t!="function")throw new Error;return function(){Cr(this,e).ease=t}}function I1(e){var t=this._id;return arguments.length?this.each(R1(t,e)):xr(this.node(),t).ease}function L1(e,t){return function(){var r=t.apply(this,arguments);if(typeof r!="function")throw new Error;Cr(this,e).ease=r}}function A1(e){if(typeof e!="function")throw new Error;return this.each(L1(this._id,e))}function O1(e){typeof e!="function"&&(e=e0(e));for(var t=this._groups,r=t.length,a=new Array(r),s=0;s<r;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new Or(a,this._parents,this._name,this._id)}function F1(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,r=e._groups,a=t.length,s=r.length,o=Math.min(a,s),i=new Array(a),c=0;c<o;++c)for(var l=t[c],d=r[c],m=l.length,f=i[c]=new Array(m),u,v=0;v<m;++v)(u=l[v]||d[v])&&(f[v]=u);for(;c<a;++c)i[c]=t[c];return new Or(i,this._parents,this._name,this._id)}function D1(e){return(e+"").trim().split(/^|\s+/).every(function(t){var r=t.indexOf(".");return r>=0&&(t=t.slice(0,r)),!t||t==="start"})}function B1(e,t,r){var a,s,o=D1(t)?Oc:Cr;return function(){var i=o(this,e),c=i.on;c!==a&&(s=(a=c).copy()).on(t,r),i.on=s}}function W1(e,t){var r=this._id;return arguments.length<2?xr(this.node(),r).on.on(e):this.each(B1(r,e,t))}function V1(e){return function(){var t=this.parentNode;for(var r in this.__transition)if(+r!==e)return;t&&t.removeChild(this)}}function U1(){return this.on("end.remove",V1(this._id))}function H1(e){var t=this._name,r=this._id;typeof e!="function"&&(e=Rc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var c=a[i],l=c.length,d=o[i]=new Array(l),m,f,u=0;u<l;++u)(m=c[u])&&(f=e.call(m,m.__data__,u,c))&&("__data__"in m&&(f.__data__=m.__data__),d[u]=f,Jo(d[u],t,r,u,d,xr(m,r)));return new Or(o,this._parents,t,r)}function Y1(e){var t=this._name,r=this._id;typeof e!="function"&&(e=Jm(e));for(var a=this._groups,s=a.length,o=[],i=[],c=0;c<s;++c)for(var l=a[c],d=l.length,m,f=0;f<d;++f)if(m=l[f]){for(var u=e.call(m,m.__data__,f,l),v,y=xr(m,r),k=0,j=u.length;k<j;++k)(v=u[k])&&Jo(v,t,r,k,u,y);o.push(u),i.push(m)}return new Or(o,i,t,r)}var G1=ms.prototype.constructor;function K1(){return new G1(this._groups,this._parents)}function X1(e,t){var r,a,s;return function(){var o=ia(this,e),i=(this.style.removeProperty(e),ia(this,e));return o===i?null:o===r&&i===a?s:s=t(r=o,a=i)}}function b0(e){return function(){this.style.removeProperty(e)}}function q1(e,t,r){var a,s=r+"",o;return function(){var i=ia(this,e);return i===s?null:i===a?o:o=t(a=i,r)}}function Q1(e,t,r){var a,s,o;return function(){var i=ia(this,e),c=r(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(e),ia(this,e))),i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c))}}function Z1(e,t){var r,a,s,o="style."+t,i="end."+o,c;return function(){var l=Cr(this,e),d=l.on,m=l.value[o]==null?c||(c=b0(t)):void 0;(d!==r||s!==m)&&(a=(r=d).copy()).on(i,s=m),l.on=a}}function J1(e,t,r){var a=(e+="")=="transform"?r1:y0;return t==null?this.styleTween(e,X1(e,a)).on("end.style."+e,b0(e)):typeof t=="function"?this.styleTween(e,Q1(e,a,Fc(this,"style."+e,t))).each(Z1(this._id,e)):this.styleTween(e,q1(e,a,t),r).on("end.style."+e,null)}function ey(e,t,r){return function(a){this.style.setProperty(e,t.call(this,a),r)}}function ty(e,t,r){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&ey(e,i,r)),a}return o._value=t,o}function ry(e,t,r){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,ty(e,t,r??""))}function ny(e){return function(){this.textContent=e}}function ay(e){return function(){var t=e(this);this.textContent=t??""}}function sy(e){return this.tween("text",typeof e=="function"?ay(Fc(this,"text",e)):ny(e==null?"":e+""))}function oy(e){return function(t){this.textContent=e.call(this,t)}}function iy(e){var t,r;function a(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&oy(s)),t}return a._value=e,a}function ly(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,iy(e))}function cy(){for(var e=this._name,t=this._id,r=w0(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)if(l=i[d]){var m=xr(l,t);Jo(l,e,r,d,i,{time:m.time+m.delay+m.duration,delay:0,duration:m.duration,ease:m.ease})}return new Or(a,this._parents,e,r)}function dy(){var e,t,r=this,a=r._id,s=r.size();return new Promise(function(o,i){var c={value:i},l={value:function(){--s===0&&o()}};r.each(function(){var d=Cr(this,a),m=d.on;m!==e&&(t=(e=m).copy(),t._.cancel.push(c),t._.interrupt.push(c),t._.end.push(l)),d.on=t}),s===0&&o()})}var uy=0;function Or(e,t,r,a){this._groups=e,this._parents=t,this._name=r,this._id=a}function w0(){return++uy}var Mr=ms.prototype;Or.prototype={constructor:Or,select:H1,selectAll:Y1,selectChild:Mr.selectChild,selectChildren:Mr.selectChildren,filter:O1,merge:F1,selection:K1,transition:cy,call:Mr.call,nodes:Mr.nodes,node:Mr.node,size:Mr.size,empty:Mr.empty,each:Mr.each,on:W1,attr:k1,attrTween:C1,style:J1,styleTween:ry,text:sy,textTween:ly,remove:U1,tween:g1,delay:E1,duration:P1,ease:I1,easeVarying:A1,end:dy,[Symbol.iterator]:Mr[Symbol.iterator]};function py(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var my={time:null,delay:0,duration:250,ease:py};function fy(e,t){for(var r;!(r=e.__transition)||!(r=r[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return r}function gy(e){var t,r;e instanceof Or?(t=e._id,e=e._name):(t=w0(),(r=my).time=Ac(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&Jo(l,e,t,d,i,r||fy(l,t));return new Or(a,this._parents,e,t)}ms.prototype.interrupt=p1;ms.prototype.transition=gy;function hy(e){var t=0,r=e.children,a=r&&r.length;if(!a)t=1;else for(;--a>=0;)t+=r[a].value;e.value=t}function xy(){return this.eachAfter(hy)}function vy(e,t){let r=-1;for(const a of this)e.call(t,a,++r,this);return this}function yy(e,t){for(var r=this,a=[r],s,o,i=-1;r=a.pop();)if(e.call(t,r,++i,this),s=r.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function by(e,t){for(var r=this,a=[r],s=[],o,i,c,l=-1;r=a.pop();)if(s.push(r),o=r.children)for(i=0,c=o.length;i<c;++i)a.push(o[i]);for(;r=s.pop();)e.call(t,r,++l,this);return this}function wy(e,t){let r=-1;for(const a of this)if(e.call(t,a,++r,this))return a}function ky(e){return this.eachAfter(function(t){for(var r=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)r+=a[s].value;t.value=r})}function jy(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function _y(e){for(var t=this,r=Ny(t,e),a=[t];t!==r;)t=t.parent,a.push(t);for(var s=a.length;e!==r;)a.splice(s,0,e),e=e.parent;return a}function Ny(e,t){if(e===t)return e;var r=e.ancestors(),a=t.ancestors(),s=null;for(e=r.pop(),t=a.pop();e===t;)s=e,e=r.pop(),t=a.pop();return s}function Sy(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Cy(){return Array.from(this)}function My(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function zy(){var e=this,t=[];return e.each(function(r){r!==e&&t.push({source:r.parent,target:r})}),t}function*Ey(){var e=this,t,r=[e],a,s,o;do for(t=r.reverse(),r=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)r.push(a[s]);while(r.length)}function Dc(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=Py)):t===void 0&&(t=Ty);for(var r=new $o(e),a,s=[r],o,i,c,l;a=s.pop();)if((i=t(a.data))&&(l=(i=Array.from(i)).length))for(a.children=i,c=l-1;c>=0;--c)s.push(o=i[c]=new $o(i[c])),o.parent=a,o.depth=a.depth+1;return r.eachBefore(Iy)}function $y(){return Dc(this).eachBefore(Ry)}function Ty(e){return e.children}function Py(e){return Array.isArray(e)?e[1]:null}function Ry(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Iy(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function $o(e){this.data=e,this.depth=this.height=0,this.parent=null}$o.prototype=Dc.prototype={constructor:$o,count:xy,each:vy,eachAfter:by,eachBefore:yy,find:wy,sum:ky,sort:jy,path:_y,ancestors:Sy,descendants:Cy,leaves:My,links:zy,copy:$y,[Symbol.iterator]:Ey};function Ly(e){if(typeof e!="function")throw new Error;return e}function ka(){return 0}function ja(e){return function(){return e}}function Ay(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function Oy(e,t,r,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(a-t)/e.value;++c<l;)i=o[c],i.y0=r,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function Fy(e,t,r,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(s-r)/e.value;++c<l;)i=o[c],i.x0=t,i.x1=a,i.y0=r,i.y1=r+=i.value*d}var Dy=(1+Math.sqrt(5))/2;function By(e,t,r,a,s,o){for(var i=[],c=t.children,l,d,m=0,f=0,u=c.length,v,y,k=t.value,j,x,h,g,_,C,$;m<u;){v=s-r,y=o-a;do j=c[f++].value;while(!j&&f<u);for(x=h=j,C=Math.max(y/v,v/y)/(k*e),$=j*j*C,_=Math.max(h/$,$/x);f<u;++f){if(j+=d=c[f].value,d<x&&(x=d),d>h&&(h=d),$=j*j*C,g=Math.max(h/$,$/x),g>_){j-=d;break}_=g}i.push(l={value:j,dice:v<y,children:c.slice(m,f)}),l.dice?Oy(l,r,a,s,k?a+=y*j/k:o):Fy(l,r,a,k?r+=v*j/k:s,o),k-=j,m=f}return i}const k0=function e(t){function r(a,s,o,i,c){By(t,a,s,o,i,c)}return r.ratio=function(a){return e((a=+a)>1?a:1)},r}(Dy);function Wy(){var e=k0,t=!1,r=1,a=1,s=[0],o=ka,i=ka,c=ka,l=ka,d=ka;function m(u){return u.x0=u.y0=0,u.x1=r,u.y1=a,u.eachBefore(f),s=[0],t&&u.eachBefore(Ay),u}function f(u){var v=s[u.depth],y=u.x0+v,k=u.y0+v,j=u.x1-v,x=u.y1-v;j<y&&(y=j=(y+j)/2),x<k&&(k=x=(k+x)/2),u.x0=y,u.y0=k,u.x1=j,u.y1=x,u.children&&(v=s[u.depth+1]=o(u)/2,y+=d(u)-v,k+=i(u)-v,j-=c(u)-v,x-=l(u)-v,j<y&&(y=j=(y+j)/2),x<k&&(k=x=(k+x)/2),e(u,y,k,j,x))}return m.round=function(u){return arguments.length?(t=!!u,m):t},m.size=function(u){return arguments.length?(r=+u[0],a=+u[1],m):[r,a]},m.tile=function(u){return arguments.length?(e=Ly(u),m):e},m.padding=function(u){return arguments.length?m.paddingInner(u).paddingOuter(u):m.paddingInner()},m.paddingInner=function(u){return arguments.length?(o=typeof u=="function"?u:ja(+u),m):o},m.paddingOuter=function(u){return arguments.length?m.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):m.paddingTop()},m.paddingTop=function(u){return arguments.length?(i=typeof u=="function"?u:ja(+u),m):i},m.paddingRight=function(u){return arguments.length?(c=typeof u=="function"?u:ja(+u),m):c},m.paddingBottom=function(u){return arguments.length?(l=typeof u=="function"?u:ja(+u),m):l},m.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:ja(+u),m):d},m}function $a(e,t,r){this.k=e,this.x=t,this.y=r}$a.prototype={constructor:$a,scale:function(e){return e===1?this:new $a(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new $a(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};$a.prototype;const bu={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Vy(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const r=(t==null?void 0:t.toLowerCase())||"default";return bu[r]||bu.default}function wu(e){if(e===0)return"0 B";const t=1024,r=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+r[a]}function ku({name:e,usedBytes:t,totalBytes:r,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:c=!1,width:l=120,height:d=180,animationDelay:m=0,onClick:f,onHover:u}){const v=p.useRef(null),y=p.useRef(0),k=p.useRef([]),j=p.useRef(0),[x,h]=p.useState(!1),g=r>0?t/r*100:0,[_,C]=p.useState(0),[$,E]=p.useState(!1),[M,W]=p.useState(!0),B=p.useRef(null),re=p.useRef(0),U=1200,le=500;p.useEffect(()=>{const G=setTimeout(()=>{E(!0)},m);return()=>clearTimeout(G)},[m]),p.useEffect(()=>{if(!$)return;re.current=_,B.current=null;const G=re.current,b=g;if(Math.abs(G-b)<.1){C(b);return}const he=M?U:le,fe=ve=>{B.current===null&&(B.current=ve);const J=ve-B.current,se=Math.min(J/he,1),te=(L=>1-Math.pow(1-L,3))(se),ce=G+(b-G)*te;C(ce),se<1?requestAnimationFrame(fe):M&&W(!1)};requestAnimationFrame(fe)},[g,$]);const D=_,R=g>=85,ee=g>=95,T=Vy(g,a),I=p.useCallback(G=>{const b=[];for(let he=0;he<G;he++)b.push({x:Math.random()*l*.6+l*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return b},[l,d]);p.useEffect(()=>{const G=v.current;if(!G)return;const b=G.getContext("2d");if(!b)return;const he=window.devicePixelRatio||1;G.width=l*he,G.height=d*he,b.scale(he,he);const fe=R?15:5;k.current=I(fe);const ve=J=>{J-j.current,j.current=J;const se=J*.001;b.clearRect(0,0,l,d);const Ue=8,te=Ue,ce=Ue+20,L=l-Ue*2,N=d-Ue*2-40,Y=8,de=c?.05:D/100,ne=N*de,A=ce+N-ne,Q=b.createLinearGradient(te,ce,te,ce+N);Q.addColorStop(0,"#0a0a12"),Q.addColorStop(.5,"#050510"),Q.addColorStop(1,"#0a0a12"),b.fillStyle=Q,b.beginPath(),b.roundRect(te,ce,L,N,Y),b.fill(),b.save(),b.beginPath(),b.roundRect(te,ce,L,N,Y),b.clip();const xe=12,oe=xe*Math.sqrt(3);b.strokeStyle="rgba(0, 240, 255, 0.06)",b.lineWidth=.5;for(let ye=0;ye<N/oe+1;ye++)for(let je=0;je<L/(xe*1.5)+1;je++){const we=ye%2*xe*.75,Je=te+je*xe*1.5+we,nt=ce+ye*oe*.5;b.beginPath();for(let xt=0;xt<6;xt++){const jt=Math.PI/3*xt+Math.PI/6,ue=Je+xe*.4*Math.cos(jt),ze=nt+xe*.4*Math.sin(jt);xt===0?b.moveTo(ue,ze):b.lineTo(ue,ze)}b.closePath(),b.stroke()}b.restore();const be=ce+se*30%N;b.save(),b.beginPath(),b.roundRect(te,ce,L,N,Y),b.clip();const Ae=b.createLinearGradient(te,be-15,te,be+5);Ae.addColorStop(0,"transparent"),Ae.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ae.addColorStop(1,"transparent"),b.fillStyle=Ae,b.fillRect(te,be-15,L,20),b.restore(),b.strokeStyle="rgba(0, 240, 255, 0.2)",b.lineWidth=1;for(let ye=0;ye<=10;ye++){const je=ce+N-N*ye/10,we=ye%5===0?12:6,Je=ye%5===0?.4:.2;b.strokeStyle=`rgba(0, 240, 255, ${Je})`,b.beginPath(),b.moveTo(te+2,je),b.lineTo(te+2+we,je),b.stroke(),b.beginPath(),b.moveTo(te+L-2,je),b.lineTo(te+L-2-we,je),b.stroke()}const it=se*50%N;for(let ye=0;ye<3;ye++){const je=ce+(it+ye*N/3)%N,we=.3+Math.sin(se*3+ye)*.2;b.beginPath(),b.strokeStyle=`rgba(0, 240, 255, ${we})`,b.lineWidth=2,b.moveTo(te,je),b.lineTo(te+4,je),b.stroke(),b.beginPath(),b.moveTo(te+L,je),b.lineTo(te+L-4,je),b.stroke()}if(!c&&de>0){const ye=b.createLinearGradient(0,A,0,ce+N);ye.addColorStop(0,T.gradient[0]),ye.addColorStop(1,T.gradient[1]);const je=R?6:3,we=.05,Je=R?.1:.05,nt=Math.PI/3;b.save(),b.beginPath(),b.rect(te,ce,L,N),b.clip(),b.fillStyle=ye,b.beginPath(),b.moveTo(te,ce+N);for(let ue=0;ue<=L;ue+=2){const ze=Math.sin(ue*we+se*Je*60)*je,Oe=Math.sin(ue*we*1.5+se*Je*40+nt)*(je*.5),We=A+ze+Oe;ue===0?b.moveTo(te+ue,We):b.lineTo(te+ue,We)}b.lineTo(te+L,ce+N),b.lineTo(te,ce+N),b.closePath(),b.fill(),b.strokeStyle=T.glow,b.lineWidth=2,b.shadowColor=T.main,b.shadowBlur=10,b.beginPath();for(let ue=0;ue<=L;ue+=2){const ze=Math.sin(ue*we+se*Je*60)*je,Oe=Math.sin(ue*we*1.5+se*Je*40+nt)*(je*.5),We=A+ze+Oe;ue===0?b.moveTo(te+ue,We):b.lineTo(te+ue,We)}b.stroke(),b.shadowBlur=0,k.current.forEach((ue,ze)=>{if(ue.y>A&&ue.y<ce+N){const Oe=Math.sin(se*ue.wobbleSpeed*60+ue.wobbleOffset)*3;b.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,b.beginPath(),b.arc(ue.x+Oe,ue.y,ue.radius,0,Math.PI*2),b.fill(),b.fillStyle="rgba(255, 255, 255, 0.5)",b.beginPath(),b.arc(ue.x+Oe-ue.radius*.3,ue.y-ue.radius*.3,ue.radius*.3,0,Math.PI*2),b.fill()}ue.y-=ue.speed*(R?2:1),ue.y<A-10&&(ue.y=ce+N+Math.random()*20,ue.x=te+Math.random()*L*.6+L*.2)}),b.restore();const xt=3;for(let ue=0;ue<xt;ue++){const ze=te+L*(ue+.5)/xt,Oe=se*2+ue*Math.PI*.7,We=(Math.sin(Oe)*.5+.5)*.3;if(We>.1){const dt=b.createLinearGradient(ze-8,A,ze+8,ce+N);dt.addColorStop(0,"rgba(255, 255, 255, 0)"),dt.addColorStop(.3,`rgba(255, 255, 255, ${We})`),dt.addColorStop(.7,`rgba(255, 255, 255, ${We*.5})`),dt.addColorStop(1,"rgba(255, 255, 255, 0)"),b.fillStyle=dt,b.fillRect(ze-8,A,16,ne)}}const jt=Math.floor(de*8);for(let ue=0;ue<jt;ue++){const ze=ue*137.5,Oe=te+10+ze*7%(L-20),dt=A+10+ze*13%(ne-20)+Math.sin(se*2+ze)*5,Ht=.4+Math.sin(se*3+ze)*.3;if(b.fillStyle=`rgba(255, 255, 255, ${Ht})`,b.beginPath(),b.arc(Oe,dt,1.5,0,Math.PI*2),b.fill(),ue>0&&ue%3===0){const $t=(ue-1)*137.5,Yt=te+10+$t*7%(L-20),At=A+10+$t*13%(ne-20)+Math.sin(se*2+$t)*5,vr=Math.sqrt((Oe-Yt)**2+(dt-At)**2);vr<30&&(b.strokeStyle=`rgba(255, 255, 255, ${.1*(1-vr/30)})`,b.lineWidth=.5,b.beginPath(),b.moveTo(Oe,dt),b.lineTo(Yt,At),b.stroke())}}if(R){for(let ue=0;ue<8;ue++){const ze=te+L*.15+Math.random()*L*.7,Oe=A-Math.random()*25,We=Math.random()*4+1;b.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,b.beginPath(),b.arc(ze,Oe,We,0,Math.PI*2),b.fill()}Math.sin(se*10)>.7&&(b.fillStyle="rgba(255, 100, 0, 0.05)",b.fillRect(te,ce,L,N))}}const Ne=c||ee?"#ff0040":T.main,bt=ee?Math.sin(se*5)*.3+.7:1;b.strokeStyle=Ne,b.lineWidth=3,b.shadowColor=Ne,b.shadowBlur=x?20:12*bt,b.beginPath(),b.roundRect(te,ce,L,N,Y),b.stroke(),b.shadowBlur=0,b.strokeStyle=`${Ne}60`,b.lineWidth=1,b.beginPath(),b.roundRect(te+3,ce+3,L-6,N-6,Y-2),b.stroke();const pe=16,Se=3;b.strokeStyle=Ne,b.lineWidth=Se,b.shadowColor=Ne,b.shadowBlur=8,b.beginPath(),b.moveTo(te-2,ce+pe),b.lineTo(te-2,ce-2),b.lineTo(te+pe,ce-2),b.stroke(),b.beginPath(),b.moveTo(te+L-pe,ce-2),b.lineTo(te+L+2,ce-2),b.lineTo(te+L+2,ce+pe),b.stroke(),b.beginPath(),b.moveTo(te-2,ce+N-pe),b.lineTo(te-2,ce+N+2),b.lineTo(te+pe,ce+N+2),b.stroke(),b.beginPath(),b.moveTo(te+L-pe,ce+N+2),b.lineTo(te+L+2,ce+N+2),b.lineTo(te+L+2,ce+N-pe),b.stroke(),b.shadowBlur=0;const Ze=2+(Math.sin(se*4)*.5+.5);if(b.fillStyle=Ne,b.shadowColor=Ne,b.shadowBlur=6,[[te-2,ce-2],[te+L+2,ce-2],[te-2,ce+N+2],[te+L+2,ce+N+2]].forEach(([ye,je])=>{b.beginPath(),b.arc(ye,je,Ze,0,Math.PI*2),b.fill()}),b.shadowBlur=0,!c){const je=te+L+6,we=N,Je=we*(D/100);b.fillStyle="rgba(0, 20, 40, 0.8)",b.fillRect(je,ce,4,we);const nt=b.createLinearGradient(0,ce+we-Je,0,ce+we);nt.addColorStop(0,T.main),nt.addColorStop(1,T.gradient[1]),b.fillStyle=nt,b.fillRect(je,ce+we-Je,4,Je),b.strokeStyle=`${Ne}40`,b.lineWidth=1,b.strokeRect(je,ce,4,we)}if(c){b.strokeStyle="#ff0040",b.lineWidth=2,b.beginPath();const ye=te+L*.3,je=ce+N*.3;b.moveTo(ye,je),b.lineTo(ye+10,je+15),b.lineTo(ye+5,je+25),b.lineTo(ye+15,je+40),b.stroke(),b.beginPath(),b.moveTo(ye+10,je+15),b.lineTo(ye+20,je+20),b.stroke()}y.current=requestAnimationFrame(ve)};return y.current=requestAnimationFrame(ve),()=>{cancelAnimationFrame(y.current)}},[l,d,D,R,ee,c,T,x,I]);const F=()=>{h(!0),u==null||u(!0)},H=()=>{h(!1),u==null||u(!1)};return n.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${ee?"critical":""} ${c?"offline":""}`,onClick:f,onMouseEnter:F,onMouseLeave:H,children:[n.jsxs("div",{className:"tank-header",children:[n.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:T.main,background:`${T.main}15`,borderColor:`${T.main}50`},children:e}),n.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),n.jsx("canvas",{ref:v,style:{width:l,height:d-50,display:"block"}}),n.jsxs("div",{className:"tank-stats",children:[n.jsx("div",{className:`tank-percent ${ee?"critical":R?"warning":""}`,style:{color:c?"#FF4081":T.main,textShadow:c?"none":`0 0 10px ${T.glow}`},children:c?"OFFLINE":`${g.toFixed(1)}%`}),n.jsxs("div",{className:"tank-capacity",children:[wu(t)," / ",wu(r)]})]}),s&&o.length>0&&n.jsx("div",{className:"tank-nodes",children:o.map((G,b)=>n.jsx("span",{className:"node-tag",children:G},b))}),!s&&i&&n.jsx("div",{className:"tank-node-label",children:i}),n.jsx("style",{children:`
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

      `})]})}function Uy({percent:e,usedBytes:t,totalBytes:r,duration:a=1200}){const[s,o]=p.useState(0),i=p.useRef(0),c=p.useRef(null),l=p.useRef(0);p.useEffect(()=>{l.current=s,c.current=null;const v=y=>{c.current===null&&(c.current=y);const k=y-c.current,j=Math.min(k/a,1),x=j===1?1:1-Math.pow(2,-10*j),h=l.current+(e-l.current)*x;o(h),j<1&&(i.current=requestAnimationFrame(v))};return i.current=requestAnimationFrame(v),()=>cancelAnimationFrame(i.current)},[e,a]);const m=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,u=[];for(let v=0;v<f;v++){const y=v/f*100,k=y<s,j=v%4===0;u.push({index:v,isActive:k,isMajor:j,percent:y})}return n.jsxs("div",{className:"scifi-indicator",children:[n.jsx("div",{className:"indicator-left",children:n.jsxs("div",{className:"indicator-bytes",children:[n.jsx("span",{className:"used",style:{color:m},children:$e(t)}),n.jsx("span",{className:"separator",children:"/"}),n.jsx("span",{className:"total",children:$e(r)})]})}),n.jsxs("div",{className:"indicator-bar-container",children:[n.jsxs("div",{className:"indicator-bar",children:[n.jsx("div",{className:"segments-container",children:u.map(v=>n.jsx("div",{className:`segment ${v.isActive?"active":""} ${v.isMajor?"major":""}`,style:{"--segment-color":v.isActive?m:"rgba(60, 80, 100, 0.3)",animationDelay:v.isActive?`${v.index*20}ms`:"0ms"}},v.index))}),n.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${m}40)`,boxShadow:`0 0 20px ${m}60, 0 0 40px ${m}30`}}),n.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${m} transparent`,filter:`drop-shadow(0 0 4px ${m})`}}),n.jsx("div",{className:"indicator-scanline"})]}),n.jsx("div",{className:"indicator-accent",style:{background:m}})]}),n.jsx("div",{className:"indicator-right",children:n.jsxs("div",{className:"indicator-percent",style:{color:m},children:[s.toFixed(1),n.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const Hy=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function Yy({vm:e,position:t,onClose:r}){var x,h,g,_,C;const{t:a,language:s}=Fe(),o=p.useRef(null),[i,c]=p.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",m=e.type==="lxc",f=e.disks||[],u=s==="zh-TW",v=((x=e.disk)==null?void 0:x.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,y=v>=90?"#ff0040":v>=70?"#ff6b00":"#00f0ff",k=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();p.useEffect(()=>{if(!o.current)return;const E=o.current.getBoundingClientRect(),M=E.width,W=E.height,B=window.innerWidth,re=window.innerHeight,U=15,{cellX:le,cellY:D,cellTop:R,cellBottom:ee,cellLeft:T,cellRight:I}=t;let F=0,H=0,G=le,b=D;I+U+M<B?(F=I+U,H=Math.max(U,Math.min(re-W-U,D-W/2)),G=I,b=D):T-U-M>0?(F=T-U-M,H=Math.max(U,Math.min(re-W-U,D-W/2)),G=T,b=D):R-U-W>0?(F=Math.max(U,Math.min(B-M-U,le-M/2)),H=R-U-W,G=le,b=R):(F=Math.max(U,Math.min(B-M-U,le-M/2)),H=ee+U,G=le,b=ee);let he=F,fe=H+W/2;F>I?(he=F,fe=Math.max(H,Math.min(H+W,b))):F+M<T?(he=F+M,fe=Math.max(H,Math.min(H+W,b))):H+W<R?(he=Math.max(F,Math.min(F+M,G)),fe=H+W):(he=Math.max(F,Math.min(F+M,G)),fe=H),c({x:F,y:H,lineStart:{x:G,y:b},lineEnd:{x:he,y:fe}})},[t]);const j=i?(()=>{const $=i.lineEnd.x-i.lineStart.x,E=i.lineEnd.y-i.lineStart.y,M=Math.sqrt($*$+E*E),W=Math.atan2(E,$)*(180/Math.PI);return{width:`${M}px`,transform:`rotate(${W}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return n.jsxs(n.Fragment,{children:[i&&j&&n.jsx("div",{className:"popup-connector-line",style:j}),n.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:$=>$.stopPropagation(),children:[n.jsxs("div",{className:"popup-header",children:[n.jsxs("div",{className:"popup-title",children:[n.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),n.jsx("span",{className:"vm-name",children:e.name}),n.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),n.jsx("button",{className:"popup-close",onClick:r,children:"×"})]}),n.jsxs("div",{className:"popup-status",children:[n.jsx("span",{className:"status-dot",style:{background:d}}),n.jsx("span",{className:"status-text",style:{color:d},children:k}),n.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),n.jsxs("div",{className:"popup-section",children:[n.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",f.length>1?u?"":"S":""," (",f.length||1,")"]}),f.length>0?n.jsx("div",{className:"disk-list",children:f.map(($,E)=>n.jsxs("div",{className:"disk-item",children:[n.jsxs("div",{className:"disk-device",children:[n.jsx("span",{className:"device-name",children:$.device}),n.jsx("span",{className:"device-format",children:$.format})]}),n.jsxs("div",{className:"disk-info",children:[n.jsx("span",{className:"disk-storage",children:$.storage}),n.jsx("span",{className:"disk-size",children:$e($.size)})]})]},E))}):n.jsx("div",{className:"disk-summary",children:n.jsxs("div",{className:"disk-summary-row",children:[n.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),n.jsx("span",{className:"disk-value",children:$e(((h=e.disk)==null?void 0:h.total_bytes)||0)})]})}),m&&n.jsxs("div",{className:"disk-usage-section",children:[n.jsxs("div",{className:"disk-summary-row",children:[n.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),n.jsx("span",{className:"disk-value",children:$e(((g=e.disk)==null?void 0:g.used_bytes)||0)})]}),n.jsxs("div",{className:"disk-summary-row",children:[n.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),n.jsxs("span",{className:"disk-value",style:{color:y},children:[v.toFixed(1),"%"]})]}),n.jsx("div",{className:"disk-bar",children:n.jsx("div",{className:"disk-bar-fill",style:{width:`${v}%`,background:y}})})]})]}),n.jsxs("div",{className:"popup-metrics",children:[n.jsxs("div",{className:"metric-item",children:[n.jsx("span",{className:"metric-label",children:"CPU"}),n.jsxs("span",{className:"metric-value",children:[((_=e.cpu)==null?void 0:_.cores)||0," ",u?"核心":"cores"]})]}),n.jsxs("div",{className:"metric-item",children:[n.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),n.jsx("span",{className:"metric-value",children:$e(((C=e.memory)==null?void 0:C.total_bytes)||0)})]})]})]})]})}function Gy({data:e,width:t,height:r,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=p.useState(null),c=p.useRef(null),l=p.useMemo(()=>{if(e.length===0||t===0||r===0)return[];const d={name:"root",children:e.map(v=>({name:v.vm.name,value:v.value,vm:v.vm}))},m=Dc(d).sum(v=>v.value||0).sort((v,y)=>(y.value||0)-(v.value||0));return Wy().size([t,r]).paddingInner(3).paddingOuter(2).round(!0).tile(k0.ratio(1))(m).leaves().map(v=>({x:v.x0,y:v.y0,width:v.x1-v.x0,height:v.y1-v.y0,vm:v.data.vm,value:v.value||0}))},[e,t,r]);return l.length===0?n.jsx("div",{className:"no-storage",children:"No VM disk data available"}):n.jsxs("svg",{ref:c,width:t,height:r,className:"d3-treemap",children:[n.jsxs("defs",{children:[n.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:n.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),n.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:n.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),n.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:n.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),n.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[n.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),n.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),l.map((d,m)=>{var W;const f=((W=d.vm.disk)==null?void 0:W.total_bytes)||1,u=d.vm.status==="running",v=o===`${d.vm.node}-${d.vm.vmid}`,y=d.width>15&&d.height>12,k=d.width>40&&d.height>25,j=d.width>50&&d.height>40,x=d.width>60&&d.height>55,h=Math.max(...l.map(B=>B.value)),g=d.value/h,_=()=>u?g>.7?"rgba(0, 255, 200, 0.15)":g>.4?"rgba(0, 200, 255, 0.12)":g>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",C=()=>u?g>.7?"rgba(0, 255, 200, 0.9)":g>.4?"rgba(0, 200, 255, 0.85)":g>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",$=()=>u?g>.7?"rgba(0, 255, 200, 0.4)":g>.4?"rgba(0, 200, 255, 0.35)":g>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",E=()=>u?g>.7?"rgba(0, 255, 220, 1)":g>.4?"rgba(100, 220, 255, 1)":g>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",M=a?m*30:0;return n.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:B=>{if(B.stopPropagation(),s){const re=B.clientX,U=B.clientY,le=d.width/2,D=d.height/2;s(d.vm,{cellX:re,cellY:U,cellWidth:d.width,cellHeight:d.height,cellTop:U-D,cellBottom:U+D,cellLeft:re-le,cellRight:re+le})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${M}ms`},children:[n.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${$e(f)}`}),u&&n.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:$(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:v?1:.6}}),u&&d.width>30&&d.height>25&&n.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:C(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),n.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:_(),stroke:C(),strokeWidth:v?2:1,rx:4,ry:4,style:{filter:v?`drop-shadow(0 0 12px ${$()}) drop-shadow(0 0 4px ${C()})`:`drop-shadow(0 0 3px ${$()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&n.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:C(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&n.jsxs(n.Fragment,{children:[n.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:C(),strokeWidth:1,opacity:.4,className:"circuit-line"}),n.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:C(),opacity:.8,className:"energy-dot"})]}),u&&n.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),y&&!k&&n.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${$()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),k&&(()=>{const B=d.width,re=d.height,U=Math.min(16,Math.max(9,Math.min(B/8,re/5))),le=Math.min(12,Math.max(8,Math.min(B/10,re/7))),D=Math.min(10,Math.max(7,Math.min(B/12,re/8))),R=Math.floor((B-8)/(U*.6)),ee=d.vm.name.length>R?d.vm.name.slice(0,Math.max(1,R-1))+"…":d.vm.name,T=U+(j?le+2:0)+(x?D+2:0),I=(re-T)/2+U/2;return n.jsxs(n.Fragment,{children:[n.jsx("text",{x:B/2,y:I,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:U,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${$()}`:"none",filter:u?`drop-shadow(0 0 2px ${$()})`:"none"},children:ee}),j&&n.jsx("text",{x:B/2,y:I+U*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:le,fontFamily:"var(--font-mono)",children:$e(f)}),x&&n.jsxs("text",{x:B/2,y:I+U*.8+(j?le*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:D,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${$()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function Ky({vmDiskData:e,totals:t,storages:r}){const{t:a,language:s}=Fe(),o=p.useRef(null),[i,c]=p.useState({width:0,height:0}),[l,d]=p.useState(!0),[m,f]=p.useState(null);p.useEffect(()=>{const v=()=>{if(o.current){const k=o.current.getBoundingClientRect();c({width:k.width,height:k.height})}};v();const y=new ResizeObserver(v);return o.current&&y.observe(o.current),()=>y.disconnect()},[]),p.useEffect(()=>{if(l&&e.length>0){const v=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(v)}},[l,e.length]);const u=p.useMemo(()=>e.map(v=>{var y;return{vm:v,value:((y=v.disk)==null?void 0:y.total_bytes)||0}}).filter(v=>v.value>0),[e]);return n.jsxs("div",{className:"treemap-container",children:[n.jsxs("div",{className:"treemap-header",children:[n.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),n.jsxs("div",{className:"treemap-stats",children:[n.jsxs("span",{children:[e.length," VMs"]}),n.jsx("span",{className:"stat-divider",children:"|"}),n.jsxs("span",{children:["Total Allocated: ",$e(e.reduce((v,y)=>{var k;return v+(((k=y.disk)==null?void 0:k.total_bytes)||0)},0))]})]})]}),n.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>f(null),children:i.width>0&&i.height>0&&n.jsx(Gy,{data:u,width:i.width,height:i.height,isInitialLoad:l,onVMClick:(v,y)=>f({vm:v,position:y})})}),m&&n.jsx(Yy,{vm:m.vm,position:m.position,onClose:()=>f(null)}),n.jsxs("div",{className:"treemap-legend",children:[n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color running"}),n.jsx("span",{children:a("vm.running")})]}),n.jsxs("div",{className:"legend-item",children:[n.jsx("span",{className:"legend-color stopped"}),n.jsx("span",{children:a("vm.stopped")})]}),n.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function Xy({storage:e,position:t,sourcePos:r,onClose:a,onManage:s}){const{t:o}=Fe();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,c=r||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return n.jsxs(n.Fragment,{children:[n.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[n.jsx("defs",{children:n.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),n.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),n.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),n.jsx("line",{x1:c.x,y1:c.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),n.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),n.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[n.jsx("div",{className:"tooltip-grid"}),n.jsx("div",{className:"tooltip-scan-line"}),n.jsx("div",{className:"tooltip-corner tl"}),n.jsx("div",{className:"tooltip-corner tr"}),n.jsx("div",{className:"tooltip-corner bl"}),n.jsx("div",{className:"tooltip-corner br"}),n.jsxs("div",{className:"tooltip-header",children:[n.jsx("span",{className:"tooltip-name",children:e.name}),n.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),n.jsx("div",{className:"tooltip-type-row",children:n.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),n.jsxs("div",{className:"tooltip-content",children:[n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("table.type"),":"]}),n.jsx("span",{children:e.type.toUpperCase()})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("storage.content"),":"]}),n.jsx("div",{className:"tooltip-labels",children:e.content.map((d,m)=>n.jsx("span",{className:"tooltip-label",children:d},m))})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("metric.used"),":"]}),n.jsx("span",{children:$e(e.usedBytes)})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("metric.total"),":"]}),n.jsx("span",{children:$e(e.totalBytes)})]}),n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("metric.usage"),":"]}),n.jsx("span",{className:`text-${_e(i)}`,children:rt(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&n.jsxs("div",{className:"tooltip-row",children:[n.jsxs("span",{children:[o("cluster.nodes"),":"]}),n.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((d,m)=>n.jsx("span",{className:"tooltip-label node",children:d},m))})]})]}),s&&n.jsx("div",{className:"tooltip-actions",children:n.jsxs("button",{className:"tooltip-action-btn",onClick:d=>{d.stopPropagation(),s(e)},children:[n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),n.jsx("span",{children:o("storage.manage")})]})})]})]})}function qy({cluster:e,clusters:t}){const{t:r,language:a}=Fe(),[s,o]=p.useState("tanks"),[i,c]=p.useState("all"),[l,d]=p.useState(""),[m,f]=p.useState(null),[u,v]=p.useState(null),[y,k]=p.useState(null),[j,x]=p.useState(null),[h,g]=p.useState(null),_=p.useCallback(R=>{let ee=(e==null?void 0:e.id)||"",T="";if(R.isShared)T=R.connectedNodes[0]||"";else{const F=R.nodeInstances.find(H=>H.active)||R.nodeInstances[0];T=(F==null?void 0:F.node)||""}if(!ee&&t){for(const[F,H]of Object.entries(t))if(H.nodes&&H.nodes[T]){ee=F;break}}if(!ee||!T)return;const I=`/storage/${encodeURIComponent(ee)}/${encodeURIComponent(T)}/${encodeURIComponent(R.name)}`;window.history.pushState(null,"",I),window.dispatchEvent(new PopStateEvent("popstate")),v(null),k(null),x(null),g(null)},[e,t]),C=p.useCallback((R,ee)=>{R.preventDefault(),R.stopPropagation();const T=Math.min(R.clientX,window.innerWidth-180),I=Math.min(R.clientY,window.innerHeight-80);g({x:T,y:I,storage:ee})},[]),$=!e&&t&&Object.keys(t).length>0,E=p.useMemo(()=>{const R=[],ee=(T,I)=>{Object.values(T.vms).forEach(F=>{var H;(H=F.disk)!=null&&H.total_bytes&&F.disk.total_bytes>0&&!F.template&&R.push({...F,clusterName:I})})};return $?Object.entries(t).forEach(([T,I])=>{ee(I,I.name||T)}):e&&ee(e,e.name||""),R.sort((T,I)=>{var F,H;return(((F=I.disk)==null?void 0:F.total_bytes)||0)-(((H=T.disk)==null?void 0:H.total_bytes)||0)})},[e,t,$]),{sharedStorages:M,localStoragesByNode:W,allNodes:B,totals:re,warnings:U}=p.useMemo(()=>{const R=new Map;let ee=0,T=0,I=0;const F=new Set,H=J=>{Object.values(J.storages).forEach(se=>{F.add(se.node);const Ue=se.storage;R.has(Ue)||R.set(Ue,{name:se.storage,type:se.type,content:se.content,allowedNodes:se.allowed_nodes||[],nodes:[]}),R.get(Ue).nodes.push({node:se.node,totalBytes:se.disk.total_bytes,usedBytes:se.disk.used_bytes,active:se.enabled!==!1})})};$?Object.values(t).forEach(J=>H(J)):e&&H(e);const G=[],b={};F.forEach(J=>{b[J]=[]}),R.forEach(J=>{const se=Hy.includes(J.type),Ue=J.nodes[0].totalBytes,te=J.nodes.length>1&&Ue>0&&J.nodes.every(ce=>Math.abs(ce.totalBytes-Ue)/Ue<.01);if(se||te){const ce=J.nodes[0],L=J.allowedNodes.length>0?J.allowedNodes:J.nodes.map(N=>N.node);G.push({name:J.name,type:J.type,content:J.content,isShared:!0,totalBytes:ce.totalBytes,usedBytes:ce.usedBytes,connectedNodes:L,nodeInstances:J.nodes})}else J.nodes.forEach(ce=>{b[ce.node]||(b[ce.node]=[]),b[ce.node].push({name:J.name,type:J.type,content:J.content,isShared:!1,totalBytes:ce.totalBytes,usedBytes:ce.usedBytes,connectedNodes:[],nodeInstances:[ce]})})});const he=J=>{if(i==="local"&&J.isShared||i==="shared"&&!J.isShared)return!1;if(l){const se=l.toLowerCase();if(!J.name.toLowerCase().includes(se)&&!J.type.toLowerCase().includes(se))return!1}return!0},fe=G.filter(he).sort((J,se)=>J.name.localeCompare(se.name)),ve={};return Object.entries(b).forEach(([J,se])=>{const Ue=se.filter(he).sort((te,ce)=>te.name.localeCompare(ce.name));Ue.length>0&&(ve[J]=Ue)}),fe.forEach(J=>{(J.totalBytes>0?J.usedBytes/J.totalBytes*100:0)>=85&&I++,ee+=J.usedBytes,T+=J.totalBytes}),Object.values(ve).flat().forEach(J=>{(J.totalBytes>0?J.usedBytes/J.totalBytes*100:0)>=85&&I++,ee+=J.usedBytes,T+=J.totalBytes}),{sharedStorages:fe,localStoragesByNode:ve,allNodes:Array.from(F).sort(),totals:{totalUsed:ee,totalCapacity:T},warnings:I}},[e,t,$,i,l]),le=(R,ee)=>{if(u&&u.name===R.name&&u.isShared===R.isShared){v(null),k(null),x(null);return}const T=ee.getBoundingClientRect(),I=240,F=200,H=T.top+T.height/2;let G=T.right+30,b=!1;G+I>window.innerWidth&&(G=T.left-I-30,b=!0);let he=T.top;he+F>window.innerHeight&&(he=window.innerHeight-F-10),he<10&&(he=10),v(R),k({x:G,y:he}),x({x:b?T.left:T.right,y:H})};if(!e&&!$)return n.jsx("div",{className:"storage-vault empty",children:n.jsxs("div",{className:"empty-message",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:r("cluster.select")})]})});const D=re.totalCapacity>0?re.totalUsed/re.totalCapacity*100:0;return n.jsxs("div",{className:"storage-vault",children:[n.jsx("div",{className:"grid-floor"}),n.jsxs("div",{className:"vault-header",children:[n.jsxs("div",{className:"header-title-section",children:[n.jsxs("h1",{className:"vault-title font-display",children:[n.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),n.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),n.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),n.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),r("storage.title")]}),n.jsxs("div",{className:"vault-stats",children:[n.jsx("span",{className:"stat-item",children:r("storage.count",{n:M.length+Object.values(W).flat().length})}),n.jsx("span",{className:"stat-divider",children:"|"}),n.jsx("span",{className:"stat-item",children:r("storage.shared_count",{n:M.length})}),n.jsx("span",{className:"stat-divider",children:"|"}),n.jsx("span",{className:"stat-item",children:r("storage.local_count",{n:Object.values(W).flat().length})}),U>0&&n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"stat-divider",children:"|"}),n.jsxs("span",{className:"stat-warning",children:["⚠️ ",U," ",r("settings.warning")]})]})]})]}),n.jsxs("div",{className:"header-controls",children:[n.jsxs("div",{className:"search-box",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"11",cy:"11",r:"8"}),n.jsx("path",{d:"M21 21l-4.35-4.35"})]}),n.jsx("input",{type:"text",placeholder:r("storage.search"),value:l,onChange:R=>d(R.target.value)})]}),n.jsxs("div",{className:"filter-tabs",children:[n.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>c("all"),children:r("storage.filter_all")}),n.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>c("shared"),children:r("storage.filter_shared")}),n.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>c("local"),children:r("storage.filter_local")})]}),n.jsxs("div",{className:"view-toggle",children:[n.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),n.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),n.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),n.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),n.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),n.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),n.jsxs("div",{className:"summary-indicator-container",children:[n.jsx("div",{className:"indicator-title",children:r("storage.total_capacity")}),n.jsx(Uy,{percent:D,usedBytes:re.totalUsed,totalBytes:re.totalCapacity,duration:1500})]}),n.jsx("div",{className:"vault-content",children:s==="treemap"?n.jsx(Ky,{vmDiskData:E,totals:re,storages:[...M.map(R=>R.name),...Object.values(W).flat().map(R=>R.name)]}):n.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&M.length>0&&n.jsxs("div",{className:"storage-section shared-section",children:[n.jsxs("div",{className:"section-header",children:[n.jsxs("div",{className:"section-title shared",children:[n.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),n.jsx("span",{children:r("storage.section_shared")})]}),n.jsx("span",{className:"section-count shared",children:r(M.length>1?"storage.storages_plural":"storage.storages_count",{n:M.length})})]}),n.jsx("div",{className:"tanks-grid shared-grid",children:M.map((R,ee)=>n.jsx("div",{onClick:T=>le(R,T.currentTarget),onContextMenu:T=>C(T,R),style:{cursor:"pointer"},children:n.jsx(ku,{name:R.name,usedBytes:R.usedBytes,totalBytes:R.totalBytes,type:R.type,isShared:!0,connectedNodes:R.connectedNodes,width:140,height:220,animationDelay:ee*80})},R.name))})]}),(i==="all"||i==="local")&&Object.keys(W).length>0&&n.jsxs("div",{className:"storage-section local-section",children:[n.jsxs("div",{className:"section-header",children:[n.jsxs("div",{className:"section-title local",children:[n.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),n.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),n.jsx("span",{children:r("storage.section_local")})]}),n.jsxs("span",{className:"section-count local",children:[r(Object.values(W).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(W).flat().length})," ",r(Object.keys(W).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(W).length})]})]}),n.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let R=M.length;return Object.entries(W).sort(([ee],[T])=>ee.localeCompare(T)).flatMap(([ee,T])=>T.map(I=>{const F=I.nodeInstances[0],H=R++;return n.jsx("div",{onClick:G=>le(I,G.currentTarget),onContextMenu:G=>C(G,I),style:{cursor:"pointer"},children:n.jsx(ku,{name:I.name,usedBytes:F.usedBytes,totalBytes:F.totalBytes,type:I.type,isShared:!1,nodeName:ee,isOffline:!F.active,width:120,height:200,animationDelay:H*80})},`${ee}-${I.name}`)}))})()})]}),M.length===0&&Object.keys(W).length===0&&n.jsx("div",{className:"no-storage",children:l?n.jsxs("span",{children:[r("error.no_data"),': "',l,'"']}):n.jsx("span",{children:r("error.no_data")})})]})}),n.jsx(Xy,{storage:u,position:y,sourcePos:j,onClose:()=>{v(null),k(null),x(null)},onManage:_}),h&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"storage-ctx-shield",onClick:()=>g(null),onContextMenu:R=>{R.preventDefault(),g(null)}}),n.jsx("div",{className:"storage-ctx-menu",style:{left:h.x,top:h.y},onClick:R=>R.stopPropagation(),children:n.jsxs("button",{className:"storage-ctx-item",onClick:()=>{_(h.storage),g(null)},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),n.jsx("polyline",{points:"14 2 14 8 20 8"})]}),n.jsx("span",{children:r("storage.content")})]})})]}),n.jsx("style",{children:`
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
      `})]})}const Qy=["backup","iso","vztmpl","snippets","import","images","rootdir"],Zy=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function Jy({clusterId:e,node:t,storageName:r,clusters:a}){var H,G;const{t:s,language:o}=Fe(),i=pa(),c=qo(),l=p.useMemo(()=>{var ve,J;const b=a==null?void 0:a[e];if(!b)return null;const he=b.storages||{};let fe=he[`${t}/${r}`]||he[r];if(!fe){for(const se of Object.values(he))if(se&&se.storage===r){fe=se;break}}return fe?{clusterName:b.name||e,type:fe.type||"",content:fe.content||[],total:((ve=fe.disk)==null?void 0:ve.total_bytes)||0,used:((J=fe.disk)==null?void 0:J.used_bytes)||0,shared:!!fe.shared}:null},[a,e,r,t]),d=l?Zy.has(l.type):!1,m=((H=c.user)==null?void 0:H.role_global)==="operator"||((G=c.user)==null?void 0:G.role_global)==="admin"||!c.authEnforced,f=p.useMemo(()=>{if(!l)return[];const b=new Set(l.content);return Qy.filter(he=>b.has(he))},[l]),[u,v]=p.useState(null);p.useEffect(()=>{u&&f.includes(u)||f.length>0&&v(f[0])},[f,u]);const[y,k]=p.useState([]),[j,x]=p.useState(!1),[h,g]=p.useState(null),[_,C]=p.useState(0),[$,E]=p.useState(""),[M,W]=p.useState("ctime"),[B,re]=p.useState("desc"),U=b=>{M===b?re(he=>he==="asc"?"desc":"asc"):(W(b),re(b==="name"||b==="format"||b==="notes"?"asc":"desc")),D(!0),setTimeout(()=>D(!1),600)},[le,D]=p.useState(!1);p.useEffect(()=>{if(!u)return;let b=!1;x(!0),g(null);const he=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(r)}/content?type=${u}`;return fetch(he,{credentials:"same-origin"}).then(async fe=>{if(!fe.ok){const J=await fe.text().catch(()=>"");throw new Error(`HTTP ${fe.status}: ${J.slice(0,200)}`)}const ve=await fe.json();b||k(Array.isArray(ve.items)?ve.items:[])}).catch(fe=>{b||g(String((fe==null?void 0:fe.message)||fe))}).finally(()=>{b||x(!1)}),()=>{b=!0}},[u,_,e,t,r]);const R=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},ee=async b=>{if(!(!m||d||!await i.confirm(o==="zh-TW"?`確定要刪除「${Rn(b.volid)}」？此操作無法復原。`:`Delete "${Rn(b.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const fe=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(r)}/content/`+encodeURIComponent(b.volid),ve=await fetch(fe,{method:"DELETE",credentials:"same-origin"});if(!ve.ok){const J=await ve.text().catch(()=>"");throw new Error(`HTTP ${ve.status}: ${J.slice(0,200)}`)}k(J=>J.filter(se=>se.volid!==b.volid)),C(J=>J+1)}catch(fe){await i.alert(o==="zh-TW"?`刪除失敗：${fe}`:`Delete failed: ${fe}`,{title:o==="zh-TW"?"錯誤":"Error"})}},T=p.useMemo(()=>{let b=y;const he=$.trim().toLowerCase();return he&&(b=y.filter(ve=>Rn(ve.volid).toLowerCase().includes(he)||(ve.format||"").toLowerCase().includes(he)||(ve.notes||"").toLowerCase().includes(he))),b.slice().sort((ve,J)=>{let se=0;switch(M){case"name":se=Rn(ve.volid).localeCompare(Rn(J.volid));break;case"ctime":se=(ve.ctime||0)-(J.ctime||0);break;case"format":se=(ve.format||"").localeCompare(J.format||"");break;case"size":se=(ve.size||0)-(J.size||0);break;case"vmid":se=(ve.vmid??-1)-(J.vmid??-1);break;case"notes":se=(ve.notes||"").localeCompare(J.notes||"");break}return B==="asc"?se:-se})},[y,$,M,B]),I=b=>M===b?B==="asc"?"▲":"▼":"";if(!l)return n.jsxs("div",{className:"storage-detail-loading",children:[n.jsx("div",{className:"vm-thumb-spinner"}),n.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const F=l.total>0?l.used/l.total*100:0;return n.jsxs("div",{className:"storage-detail",children:[n.jsxs("div",{className:"storage-detail-header",children:[n.jsxs("button",{className:"back-btn",onClick:R,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[n.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M15 18l-6-6 6-6"})}),n.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),n.jsxs("div",{className:"storage-detail-title",children:[n.jsx("span",{className:"breadcrumb",children:l.clusterName}),n.jsx("span",{className:"breadcrumb-sep",children:"/"}),n.jsx("span",{className:"breadcrumb",children:t}),n.jsx("span",{className:"breadcrumb-sep",children:"/"}),n.jsx("h1",{className:"storage-name font-display",children:r}),n.jsx("span",{className:`storage-type-badge ${d?"block":"file"}`,children:l.type.toUpperCase()}),l.shared&&n.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),n.jsxs("div",{className:"storage-detail-stats",children:[n.jsxs("div",{className:"stat",children:[n.jsx("span",{className:"stat-label",children:s("metric.used")}),n.jsxs("span",{className:`stat-val text-${_e(F)}`,children:[$e(l.used)," / ",$e(l.total)]})]}),n.jsxs("div",{className:"stat",children:[n.jsx("span",{className:"stat-label",children:s("metric.usage")}),n.jsx("span",{className:`stat-val text-${_e(F)}`,children:rt(F,1)})]})]})]}),n.jsx("div",{className:"storage-detail-tabs",children:f.length===0?n.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):f.map(b=>n.jsxs("button",{className:`storage-tab tab-${b} ${u===b?"active":""}`,onClick:()=>v(b),children:[n.jsx("span",{className:"tab-icon","aria-hidden":!0,children:eb(b)}),n.jsx("span",{children:tb(b,o)})]},b))}),n.jsxs("div",{className:"storage-detail-toolbar",children:[n.jsxs("div",{className:"search-box",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"11",cy:"11",r:"8"}),n.jsx("path",{d:"M21 21l-4.35-4.35"})]}),n.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:$,onChange:b=>E(b.target.value)})]}),!d&&m&&n.jsxs(n.Fragment,{children:[n.jsxs("button",{className:"action-btn disabled",disabled:!0,title:o==="zh-TW"?"上傳：將在 Phase 3 實作":"Upload: coming in phase 3",children:[n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),n.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),n.jsxs("button",{className:"action-btn disabled",disabled:!0,title:o==="zh-TW"?"從網址下載：將在 Phase 3 實作":"Download from URL: coming in phase 3",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),n.jsx("path",{d:"M21 3v6h-6"})]}),n.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),d&&n.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),n.jsxs("button",{className:"action-btn ghost",onClick:()=>C(b=>b+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M23 4v6h-6"}),n.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),n.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),n.jsxs("div",{className:"storage-detail-list",children:[n.jsx("div",{className:"tab-scan-line"}),j&&y.length===0&&n.jsxs("div",{className:"storage-detail-loading",children:[n.jsx("div",{className:"vm-thumb-spinner"}),n.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),h&&n.jsx("div",{className:"storage-detail-error",children:n.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",h]})}),!j&&!h&&T.length===0&&n.jsx("div",{className:"storage-detail-empty",children:n.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),T.length>0&&n.jsxs("table",{className:"storage-content-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{className:`sortable ${M==="name"?"sorted":""}`,onClick:()=>U("name"),children:n.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",I("name")&&n.jsx("span",{className:"sort-indicator",children:I("name")})]})}),n.jsx("th",{className:`sortable ${M==="ctime"?"sorted":""}`,onClick:()=>U("ctime"),children:n.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",I("ctime")&&n.jsx("span",{className:"sort-indicator",children:I("ctime")})]})}),n.jsx("th",{className:`sortable ${M==="format"?"sorted":""}`,onClick:()=>U("format"),children:n.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",I("format")&&n.jsx("span",{className:"sort-indicator",children:I("format")})]})}),n.jsx("th",{className:`num sortable ${M==="size"?"sorted":""}`,onClick:()=>U("size"),children:n.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",I("size")&&n.jsx("span",{className:"sort-indicator",children:I("size")})]})}),u==="backup"&&n.jsx("th",{className:`num sortable ${M==="vmid"?"sorted":""}`,onClick:()=>U("vmid"),children:n.jsxs("span",{children:["VMID",I("vmid")&&n.jsx("span",{className:"sort-indicator",children:I("vmid")})]})}),u==="backup"&&n.jsx("th",{className:`sortable ${M==="notes"?"sorted":""}`,onClick:()=>U("notes"),children:n.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",I("notes")&&n.jsx("span",{className:"sort-indicator",children:I("notes")})]})}),!d&&m&&n.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),n.jsx("tbody",{children:T.map(b=>{const he=j0(b.format),fe=rb(b.size);return n.jsxs("tr",{className:le?"sort-animating":"",children:[n.jsxs("td",{className:"name-cell",title:b.volid,children:[n.jsx("span",{className:"file-icon","aria-hidden":!0,children:nb(b.format)}),n.jsx("span",{className:"file-name",children:Rn(b.volid)})]}),n.jsx("td",{className:"date-cell",children:b.ctime?ab(b.ctime):"—"}),n.jsx("td",{children:b.format?n.jsx("span",{className:`format-badge ${he}`,children:b.format}):n.jsx("span",{className:"muted",children:"—"})}),n.jsx("td",{className:`num size-${fe}`,children:b.size?$e(b.size):"—"}),u==="backup"&&n.jsx("td",{className:"num",children:b.vmid!=null?n.jsxs("span",{className:"vmid-badge",children:["#",b.vmid]}):n.jsx("span",{className:"muted",children:"—"})}),u==="backup"&&n.jsx("td",{className:"notes-cell",title:b.notes||"",children:b.notes||n.jsx("span",{className:"muted",children:"—"})}),!d&&m&&n.jsx("td",{className:"actions",children:n.jsx("button",{className:"action-btn-row danger",onClick:()=>ee(b),title:o==="zh-TW"?"刪除":"Delete",children:n.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("polyline",{points:"3 6 5 6 21 6"}),n.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),n.jsx("path",{d:"M10 11v6M14 11v6"}),n.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]})})})]},b.volid)})})]})]},u||"none"),n.jsx("style",{children:`
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
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .storage-tab:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.04);
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
          color: var(--text-muted);
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
          width: 60px;
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
      `})]})}function Rn(e){const t=e.indexOf("/");if(t>=0)return e.slice(t+1);const r=e.indexOf(":");return r>=0?e.slice(r+1):e}function eb(e){switch(e){case"backup":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),n.jsx("path",{d:"M21 3v6h-6"}),n.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),n.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("polyline",{points:"16 18 22 12 16 6"}),n.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),n.jsx("polyline",{points:"7 10 12 15 17 10"}),n.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),n.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),n.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function tb(e,t){return t==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[e]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[e]}function j0(e){if(!e)return"fmt-other";const t=e.toLowerCase();return t==="iso"||t==="img"?"fmt-iso":t.startsWith("vma")||t==="pbs-vm"||t==="pbs-ct"?"fmt-backup":t.startsWith("tar")?"fmt-tmpl":t==="qcow2"||t==="raw"||t==="vmdk"||t==="subvol"?"fmt-disk":t==="snippet"||t==="yaml"||t==="yml"||t==="sh"?"fmt-snippet":t==="ovf"||t==="ova"||t==="vmx"?"fmt-import":"fmt-other"}function rb(e){if(!e)return"tiny";const t=e/(1024*1024);return t<50?"tiny":t<1024?"small":t<5120?"medium":t<20480?"large":"huge"}function nb(e,t){const r=j0(e),a=r==="fmt-iso"?"#00b4ff":r==="fmt-backup"?"#ffa500":r==="fmt-tmpl"?"#b464ff":r==="fmt-disk"?"#00f0c8":r==="fmt-snippet"?"#a0c864":r==="fmt-import"?"#ff64b4":"var(--text-muted)";return r==="fmt-iso"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):r==="fmt-backup"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),n.jsx("path",{d:"M21 3v6h-6"}),n.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):r==="fmt-tmpl"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),n.jsx("path",{d:"M3 9h18M9 21V9"})]}):r==="fmt-disk"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),n.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),n.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):r==="fmt-snippet"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("polyline",{points:"16 18 22 12 16 6"}),n.jsx("polyline",{points:"8 6 2 12 8 18"})]}):r==="fmt-import"?n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[n.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),n.jsx("polyline",{points:"7 10 12 15 17 10"}),n.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[n.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),n.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function ab(e,t){const r=new Date(e*1e3),a=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${a(r.getMonth()+1)}-${a(r.getDate())} ${a(r.getHours())}:${a(r.getMinutes())}`}function ju(){if(typeof window>"u")return null;const e=window.location.pathname.split("/").filter(Boolean);return e.length<4||e[0]!=="storage"?null:{clusterId:decodeURIComponent(e[1]),node:decodeURIComponent(e[2]),storage:decodeURIComponent(e[3])}}function sb({cluster:e,clusters:t}){const[r,a]=p.useState(()=>ju());if(p.useEffect(()=>{const s=()=>a(ju());return window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)},[]),r){const s=t||(e?{[e.id]:e}:null);return n.jsx(Jy,{clusterId:r.clusterId,node:r.node,storageName:r.storage,clusters:s})}return n.jsx(qy,{cluster:e,clusters:t})}function ob({open:e,cluster_id:t,kind:r,title:a,body:s,label:o,onClose:i,onSaved:c}){const{t:l}=Fe(),[d,m]=p.useState(""),[f,u]=p.useState(!1),[v,y]=p.useState(""),k=p.useRef(null);if(p.useEffect(()=>{e&&(m(""),y(""),u(!1),setTimeout(()=>{var x;return(x=k.current)==null?void 0:x.focus()},50))},[e]),p.useEffect(()=>{if(!e)return;const x=h=>{h.key==="Escape"&&!f&&i()};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[e,f,i]),!e)return null;const j=async()=>{if(d){u(!0),y("");try{await Ie.setClusterSecret(t,r,d),c()}catch(x){y(x instanceof Error?x.message:String(x)),u(!1)}}};return n.jsxs("div",{onClick:()=>!f&&i(),style:ib,children:[n.jsx("style",{children:lb}),n.jsxs("div",{className:"ssm-modal",onClick:x=>x.stopPropagation(),children:[n.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),n.jsx("h3",{className:"ssm-title",children:a}),n.jsx("p",{className:"ssm-body",children:s}),n.jsx("label",{children:o}),n.jsx("input",{ref:k,type:"password",value:d,onChange:x=>m(x.target.value),onKeyDown:x=>{x.key==="Enter"&&j()},autoComplete:"new-password",spellCheck:!1}),v&&n.jsx("div",{className:"ssm-err",children:v}),n.jsxs("div",{className:"ssm-actions",children:[n.jsx("button",{className:"ghost",onClick:i,disabled:f,children:l("action.cancel")}),n.jsx("button",{className:"primary",onClick:j,disabled:f||!d,children:f?"…":l("action.save")})]})]})]})}const ib={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},lb=`
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
`;function cb({onClose:e,clusters:t}){const{t:r,language:a,setLanguage:s}=Fe(),o=pa(),[i,c]=p.useState(null),[l,d]=p.useState(!0),[m,f]=p.useState(!1),[u,v]=p.useState(null),[y,k]=p.useState(!1),[j,x]=p.useState("ui"),[h,g]=p.useState(!0),[_,C]=p.useState("cyberpunk"),[$,E]=p.useState("command-center"),[M,W]=p.useState(100),[B,re]=p.useState("all"),[U,le]=p.useState(85),[D,R]=p.useState("vmid"),[ee,T]=p.useState("node"),[I,F]=p.useState("node"),[H,G]=p.useState("asc"),[b,he]=p.useState({}),[fe,ve]=p.useState(!0),[J,se]=p.useState(80),[Ue,te]=p.useState(95),[ce,L]=p.useState(85),[N,Y]=p.useState(95),[de,ne]=p.useState(80),[A,Q]=p.useState(95),[xe,oe]=p.useState(50),[be,Ae]=p.useState(100),[it,Ne]=p.useState(5),[bt,pe]=p.useState(10),[Se,Pe]=p.useState("0.0.0.0"),[Ze,ye]=p.useState(8098),[je,we]=p.useState(!1),[Je,nt]=p.useState(8086),[xt,jt]=p.useState("disabled"),[ue,ze]=p.useState(null),[Oe,We]=p.useState({}),dt=()=>{k(!0),setTimeout(()=>e(),400)};p.useEffect(()=>{Ht()},[]);const Ht=async()=>{var V,He,Ke,Xe,ft,lt,ut,$n,Dr,pn,et,Tt,Br,Wr,yr,Tn,Ye,mn,Gt,Vr,Ce,ke,De,gt,pt,er,w,O,z,S,P,Z,X,ae,ie;try{d(!0);const K=await Ie.getConfig();c(K),g(((V=K.ui)==null?void 0:V.animations_enabled)??!0),C(((He=K.ui)==null?void 0:He.theme)??"cyberpunk"),E(((Ke=K.ui)==null?void 0:Ke.default_view)??"command-center"),W(((Xe=K.ui)==null?void 0:Xe.particle_count)??100),re(((ft=K.ui)==null?void 0:ft.vm_matrix_default_filter)??"all"),le(((lt=K.ui)==null?void 0:lt.matrix_card_width)??85),R(((ut=K.ui)==null?void 0:ut.matrix_sort_by)??"vmid"),T((($n=K.ui)==null?void 0:$n.matrix_group_by)??"node"),F(((Dr=K.ui)==null?void 0:Dr.matrix_group_sort_by)??"node"),G(((pn=K.ui)==null?void 0:pn.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((et=K.ui)==null?void 0:et.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Tt=K.ui)==null?void 0:Tt.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((Br=K.ui)==null?void 0:Br.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((Wr=K.ui)==null?void 0:Wr.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((yr=K.ui)==null?void 0:yr.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((Tn=K.ui)==null?void 0:Tn.matrix_group_sort_order)??"asc");const ge={};(Ye=K.clusters)==null||Ye.forEach(Ee=>{ge[Ee.id]={enabled:Ee.enabled!==!1,poll_interval:Ee.poll_interval||5,static_refresh_interval:Ee.static_refresh_interval||60}}),he(ge),ve(((mn=K.alerts)==null?void 0:mn.enabled)??!0),se(((Gt=K.alerts)==null?void 0:Gt.cpu_warning)??80),te(((Vr=K.alerts)==null?void 0:Vr.cpu_critical)??95),L(((Ce=K.alerts)==null?void 0:Ce.memory_warning)??85),Y(((ke=K.alerts)==null?void 0:ke.memory_critical)??95),ne(((De=K.alerts)==null?void 0:De.disk_warning)??80),Q(((gt=K.alerts)==null?void 0:gt.disk_critical)??95),oe(((pt=K.alerts)==null?void 0:pt.diskio_warning)??50),Ae(((er=K.alerts)==null?void 0:er.diskio_critical)??100),Ne(((w=K.alerts)==null?void 0:w.iowait_warning)??5),pe(((O=K.alerts)==null?void 0:O.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((z=K.alerts)==null?void 0:z.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((S=K.alerts)==null?void 0:S.iowait_critical)??10)),Pe(((P=K.server)==null?void 0:P.host)??"0.0.0.0"),ye(((Z=K.server)==null?void 0:Z.http_port)??8098),we(((X=K.server)==null?void 0:X.influx_enabled)??!1),nt(((ae=K.server)==null?void 0:ae.influx_port)??8086),jt(((ie=K.console)==null?void 0:ie.mode)||"disabled");const Re={};(K.clusters||[]).forEach(Ee=>{Re[Ee.id]=!!(Ee.auth&&Ee.auth.password&&Ee.auth.password.length>0)}),We(Re)}catch(K){v(String(K))}finally{d(!1)}},$t=async()=>{var V;try{f(!0),localStorage.setItem("matrix_card_width",String(U)),localStorage.setItem("matrix_sort_by",D),localStorage.setItem("matrix_group_by",ee),localStorage.setItem("vm_matrix_default_filter",B),localStorage.setItem("matrix_group_sort_by",I),localStorage.setItem("matrix_group_sort_order",H),localStorage.setItem("iowait_warning",String(it)),localStorage.setItem("iowait_critical",String(bt));const He=(V=i==null?void 0:i.clusters)==null?void 0:V.map(Ke=>{var Xe,ft,lt;return{...Ke,enabled:((Xe=b[Ke.id])==null?void 0:Xe.enabled)!==!1,poll_interval:((ft=b[Ke.id])==null?void 0:ft.poll_interval)||Ke.poll_interval,static_refresh_interval:((lt=b[Ke.id])==null?void 0:lt.static_refresh_interval)||Ke.static_refresh_interval}});await Ie.updateConfig({server:{host:Se,http_port:Ze,influx_enabled:je,influx_port:Je},console:{mode:xt},ui:{default_view:$,theme:_,language:a,animations_enabled:h,particle_count:M,vm_matrix_default_filter:B,matrix_card_width:U,matrix_sort_by:D,matrix_group_by:ee,matrix_group_sort_by:I,matrix_group_sort_order:H},alerts:{enabled:fe,cpu_warning:J,cpu_critical:Ue,memory_warning:ce,memory_critical:N,disk_warning:de,disk_critical:A,diskio_warning:xe,diskio_critical:be,iowait_warning:it,iowait_critical:bt},clusters:He}),e()}catch(He){v(String(He))}finally{f(!1)}},Yt=V=>{he(He=>{var Ke;return{...He,[V]:{...He[V],enabled:!((Ke=He[V])!=null&&Ke.enabled)}}})},At=(V,He,Ke)=>{he(Xe=>({...Xe,[V]:{...Xe[V],[He]:Ke}}))};p.useEffect(()=>{const V=He=>{He.key==="Escape"&&!y&&dt()};return window.addEventListener("keydown",V),()=>window.removeEventListener("keydown",V)},[y]);const vr=[{id:"ui",labelKey:"settings.tab_ui",icon:n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),n.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),n.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),n.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),n.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),n.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),n.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),n.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),n.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return n.jsxs("div",{className:`settings-overlay ${y?"exiting":""}`,onClick:V=>V.target===V.currentTarget&&!y&&dt(),children:[n.jsxs("div",{className:`settings-panel panel ${y?"exiting":""}`,children:[n.jsx("div",{className:"settings-scanline"}),n.jsxs("div",{className:"settings-header",children:[n.jsx("h2",{className:"settings-title font-display",children:r("settings.title")}),n.jsx("button",{className:"settings-close",onClick:dt,children:"×"})]}),n.jsx("div",{className:"settings-tabs",children:vr.map(V=>n.jsxs("button",{className:`settings-tab ${j===V.id?"active":""}`,onClick:()=>x(V.id),children:[V.icon,n.jsx("span",{children:r(V.labelKey)})]},V.id))}),n.jsx("div",{className:"settings-content",children:l?n.jsxs("div",{className:"settings-loading",children:[n.jsx("span",{className:"loading-spinner"}),n.jsx("span",{children:r("loading.data")})]}):u?n.jsx("div",{className:"settings-error",children:n.jsx("span",{children:u})}):n.jsxs(n.Fragment,{children:[j==="ui"&&n.jsxs("div",{className:"tab-content",children:[n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.default_view")}),n.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(V=>n.jsxs("label",{className:`radio-option ${$===V.id?"active":""}`,children:[n.jsx("input",{type:"radio",name:"defaultView",value:V.id,checked:$===V.id,onChange:()=>E(V.id)}),n.jsx("span",{className:"radio-label",children:r(V.labelKey)})]},V.id))})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.vm_matrix_filter")}),n.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(V=>n.jsxs("label",{className:`radio-option ${B===V?"active":""}`,children:[n.jsx("input",{type:"radio",name:"vmFilter",value:V,checked:B===V,onChange:()=>re(V)}),n.jsx("span",{className:"radio-label",children:r(`settings.filter_${V}`)})]},V))})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.matrix_card_width")}),n.jsxs("div",{className:"input-row",children:[n.jsx("input",{type:"number",className:"input-field",value:U,onChange:V=>le(Number(V.target.value)),min:60,max:200}),n.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.matrix_sort_by")}),n.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(V=>n.jsxs("label",{className:`radio-option ${D===V?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixSortBy",value:V,checked:D===V,onChange:()=>R(V)}),n.jsx("span",{className:"radio-label",children:r(`settings.sort_${V}`)})]},V))})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.matrix_group_by")}),n.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(V=>n.jsxs("label",{className:`radio-option ${ee===V?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixGroupBy",value:V,checked:ee===V,onChange:()=>T(V)}),n.jsx("span",{className:"radio-label",children:r(`matrix.group_${V}`)})]},V))})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.matrix_group_sort")}),n.jsxs("div",{className:"settings-row",children:[n.jsxs("div",{className:"settings-item",children:[n.jsx("label",{children:r("settings.sort_by")}),n.jsxs("div",{className:"radio-group inline",children:[n.jsxs("label",{className:`radio-option ${I==="node"?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:I==="node",onChange:()=>F("node")}),n.jsx("span",{className:"radio-label",children:r("settings.sort_node")})]}),n.jsxs("label",{className:`radio-option ${I==="cluster"?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:I==="cluster",onChange:()=>F("cluster")}),n.jsx("span",{className:"radio-label",children:r("settings.sort_cluster")})]})]})]}),n.jsxs("div",{className:"settings-item",children:[n.jsx("label",{children:r("settings.sort_order")}),n.jsxs("div",{className:"radio-group inline",children:[n.jsxs("label",{className:`radio-option ${H==="asc"?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:H==="asc",onChange:()=>G("asc")}),n.jsx("span",{className:"radio-label",children:r("settings.sort_asc")})]}),n.jsxs("label",{className:`radio-option ${H==="desc"?"active":""}`,children:[n.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:H==="desc",onChange:()=>G("desc")}),n.jsx("span",{className:"radio-label",children:r("settings.sort_desc")})]})]})]})]})]})]}),j==="clusters"&&i&&n.jsx("div",{className:"tab-content",children:n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.cluster_management")}),n.jsx("p",{className:"section-hint",children:r("settings.cluster_hint")}),n.jsx("div",{className:"cluster-list-full",children:i.clusters.map(V=>{var ft,lt;const He=t==null?void 0:t[V.id],Ke=(He==null?void 0:He.name)||V.name||V.id,Xe=b[V.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return n.jsxs("div",{className:`cluster-card ${Xe.enabled?"":"disabled-cluster"}`,children:[n.jsxs("div",{className:"cluster-card-header",children:[n.jsxs("label",{className:"cluster-toggle",onClick:ut=>ut.stopPropagation(),children:[n.jsx("input",{type:"checkbox",checked:Xe.enabled,onChange:()=>Yt(V.id)}),n.jsx("span",{className:"cluster-toggle-switch"})]}),n.jsx("span",{className:`cluster-status ${Xe.enabled?"enabled":"disabled"}`}),n.jsx("span",{className:"cluster-name",children:Ke}),n.jsxs("span",{className:"cluster-id",children:["(",V.id,")"]})]}),n.jsxs("div",{className:"cluster-card-body",children:[n.jsxs("div",{className:"cluster-setting",children:[n.jsx("label",{children:r("settings.poll_interval")}),n.jsx("input",{type:"number",className:"input-field-sm",value:Xe.poll_interval,onChange:ut=>At(V.id,"poll_interval",Number(ut.target.value)),min:1,max:60})]}),n.jsxs("div",{className:"cluster-setting",children:[n.jsx("label",{children:r("settings.static_refresh")}),n.jsx("input",{type:"number",className:"input-field-sm",value:Xe.static_refresh_interval,onChange:ut=>At(V.id,"static_refresh_interval",Number(ut.target.value)),min:30,max:600})]})]}),n.jsxs("div",{className:"cluster-card-info",children:[n.jsx("span",{children:r("settings.nodes_count",{n:((ft=V.nodes)==null?void 0:ft.length)||0})}),n.jsxs("span",{children:[r("settings.auth"),": ",((lt=V.auth)==null?void 0:lt.user)||"N/A"]})]}),n.jsxs("div",{className:"cluster-secret-row",children:[n.jsx("span",{className:"secret-label",children:r("settings.cluster_pve_password")}),n.jsx("span",{className:`secret-status ${Oe[V.id]?"set":"unset"}`,children:Oe[V.id]?r("settings.secret_set"):r("settings.secret_unset")}),n.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>ze(V.id),children:Oe[V.id]?r("settings.secret_replace"):r("settings.secret_set_btn")}),Oe[V.id]&&n.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(r("settings.secret_confirm_clear",{id:V.id}),{destructive:!0}))try{await Ie.deleteClusterSecret(V.id,"pve_password"),We(ut=>({...ut,[V.id]:!1}))}catch(ut){await o.alert(String(ut))}},children:r("settings.secret_clear")})]})]},V.id)})})]})}),j==="alerts"&&n.jsxs("div",{className:"tab-content",children:[n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.cpu_threshold")}),n.jsxs("div",{className:"threshold-row",children:[n.jsxs("div",{className:"threshold-item warning",children:[n.jsxs("label",{children:[r("settings.warning")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:J,onChange:V=>se(Number(V.target.value)),min:0,max:100})]}),n.jsxs("div",{className:"threshold-item danger",children:[n.jsxs("label",{children:[r("settings.critical")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:Ue,onChange:V=>te(Number(V.target.value)),min:0,max:100})]})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.memory_threshold")}),n.jsxs("div",{className:"threshold-row",children:[n.jsxs("div",{className:"threshold-item warning",children:[n.jsxs("label",{children:[r("settings.warning")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:ce,onChange:V=>L(Number(V.target.value)),min:0,max:100})]}),n.jsxs("div",{className:"threshold-item danger",children:[n.jsxs("label",{children:[r("settings.critical")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:N,onChange:V=>Y(Number(V.target.value)),min:0,max:100})]})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.disk_threshold")}),n.jsxs("div",{className:"threshold-row",children:[n.jsxs("div",{className:"threshold-item warning",children:[n.jsxs("label",{children:[r("settings.warning")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:de,onChange:V=>ne(Number(V.target.value)),min:0,max:100})]}),n.jsxs("div",{className:"threshold-item danger",children:[n.jsxs("label",{children:[r("settings.critical")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:A,onChange:V=>Q(Number(V.target.value)),min:0,max:100})]})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.diskio_threshold")}),n.jsxs("div",{className:"threshold-row",children:[n.jsxs("div",{className:"threshold-item warning",children:[n.jsx("label",{children:r("settings.warning")}),n.jsx("input",{type:"number",className:"input-field-sm",value:xe,onChange:V=>oe(Number(V.target.value)),min:0,max:1e4})]}),n.jsxs("div",{className:"threshold-item danger",children:[n.jsx("label",{children:r("settings.critical")}),n.jsx("input",{type:"number",className:"input-field-sm",value:be,onChange:V=>Ae(Number(V.target.value)),min:0,max:1e4})]})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.iowait_threshold")}),n.jsxs("div",{className:"threshold-row",children:[n.jsxs("div",{className:"threshold-item warning",children:[n.jsxs("label",{children:[r("settings.warning")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:it,onChange:V=>Ne(Number(V.target.value)),min:0,max:100})]}),n.jsxs("div",{className:"threshold-item danger",children:[n.jsxs("label",{children:[r("settings.critical")," (%)"]}),n.jsx("input",{type:"number",className:"input-field-sm",value:bt,onChange:V=>pe(Number(V.target.value)),min:0,max:100})]})]})]})]}),j==="server"&&n.jsxs("div",{className:"tab-content",children:[n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.http_server")}),n.jsxs("div",{className:"input-group",children:[n.jsxs("div",{className:"input-row",children:[n.jsx("label",{children:r("settings.host")}),n.jsx("input",{type:"text",className:"input-field",value:Se,onChange:V=>Pe(V.target.value)})]}),n.jsxs("div",{className:"input-row",children:[n.jsx("label",{children:r("settings.port")}),n.jsx("input",{type:"number",className:"input-field",value:Ze,onChange:V=>ye(Number(V.target.value)),min:1,max:65535})]})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.influx_integration")}),n.jsxs("label",{className:"toggle-option",children:[n.jsx("input",{type:"checkbox",checked:je,onChange:V=>we(V.target.checked)}),n.jsx("span",{className:"toggle-switch"}),n.jsx("span",{className:"toggle-label",children:r(je?"settings.enabled":"settings.disabled")})]}),je&&n.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[n.jsx("label",{children:r("settings.influx_port")}),n.jsx("input",{type:"number",className:"input-field",value:Je,onChange:V=>nt(Number(V.target.value)),min:1,max:65535})]})]}),n.jsxs("div",{className:"settings-section",children:[n.jsx("h3",{className:"section-title",children:r("settings.console_section")}),n.jsxs("div",{className:"input-row",children:[n.jsx("label",{children:r("settings.console_mode")}),n.jsx(Ma,{className:"full",value:xt,onChange:jt,options:[{value:"disabled",label:r("settings.console_mode_disabled")},{value:"stored",label:r("settings.console_mode_stored")},{value:"prompt",label:r("settings.console_mode_prompt")}]})]}),n.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),n.jsx("span",{children:r("settings.console_mode_hint")})]})]}),n.jsx("div",{className:"settings-section",children:n.jsxs("div",{className:"server-note",children:[n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),n.jsx("span",{children:r("settings.server_restart_note")})]})})]})]})}),n.jsxs("div",{className:"settings-footer",children:[n.jsxs("div",{className:"settings-footer-left",children:[n.jsxs("div",{className:"settings-version",children:[n.jsx("span",{className:"version-label",children:r("settings.version")}),n.jsxs("span",{className:"version-number",children:["v","0.3.1"]})]}),n.jsxs("div",{className:"settings-author",children:[n.jsx("span",{className:"author-label",children:"by"}),n.jsx("span",{className:"author-name",children:"Jason Cheng"}),n.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),n.jsxs("div",{className:"settings-actions",children:[n.jsx("button",{className:"btn",onClick:dt,children:r("action.cancel")}),n.jsx("button",{className:"btn btn-primary",onClick:$t,disabled:m||y,children:r(m?"action.saving":"action.save")})]})]}),n.jsx("div",{className:"corner-decoration top-left"}),n.jsx("div",{className:"corner-decoration top-right"}),n.jsx("div",{className:"corner-decoration bottom-left"}),n.jsx("div",{className:"corner-decoration bottom-right"})]}),n.jsx(ob,{open:ue!==null,cluster_id:ue||"",kind:"pve_password",title:r("settings.secret_pw_title",{id:ue||""}),body:r("settings.secret_pw_body"),label:r("settings.secret_pw_label"),onClose:()=>ze(null),onSaved:()=>{ue&&We(V=>({...V,[ue]:!0})),ze(null)}}),n.jsx("style",{children:`
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
      `})]})}const _u=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function db({particleCount:e=40,enabled:t=!0,isPaused:r=!1}){const a=p.useRef(null),s=p.useRef([]),o=p.useRef(),i=p.useRef({x:0,y:0}),c=p.useRef(0),l=p.useCallback((m,f)=>{s.current=Array.from({length:e},()=>({x:Math.random()*m,y:Math.random()*f,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:_u[Math.floor(Math.random()*_u.length)]}))},[e]),d=p.useCallback(m=>{const f=a.current;if(!f)return;const u=m??performance.now();if(u-c.current<32){o.current=requestAnimationFrame(d);return}c.current=u;const v=f.getContext("2d");if(!v)return;const{width:y,height:k}=f;v.clearRect(0,0,y,k),s.current.forEach(j=>{const x=j.x-i.current.x,h=j.y-i.current.y,g=Math.sqrt(x*x+h*h);if(g<100){const _=(100-g)/100;j.vx+=x/g*_*.05,j.vy+=h/g*_*.05}j.x+=j.vx,j.y+=j.vy,j.vx*=.99,j.vy*=.99,j.x<0&&(j.x=y),j.x>y&&(j.x=0),j.y<0&&(j.y=k),j.y>k&&(j.y=0),j.alpha+=(Math.random()-.5)*.02,j.alpha=Math.max(.1,Math.min(.7,j.alpha)),v.beginPath(),v.arc(j.x,j.y,j.size,0,Math.PI*2),v.fillStyle=j.color,v.globalAlpha=j.alpha,v.fill()}),v.globalAlpha=1,o.current=requestAnimationFrame(d)},[]);return p.useEffect(()=>{if(!t)return;const m=a.current;if(!m)return;const f=()=>{m.width=window.innerWidth,m.height=window.innerHeight,l(m.width,m.height)},u=v=>{i.current={x:v.clientX,y:v.clientY}};return f(),window.addEventListener("resize",f),window.addEventListener("mousemove",u),()=>{window.removeEventListener("resize",f),window.removeEventListener("mousemove",u)}},[t,l]),p.useEffect(()=>{if(!t||r){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return d(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,r,d]),t?n.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const Nu={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function Ii({digit:e,size:t=16,color:r="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=Nu[e]||Nu[" "],i=t,c=t*1.8,l=t*.15,d=t*.05,m=s?t*.4:t*.15,f=[`M ${d+l} ${d} L ${i-d-l} ${d} L ${i-d-l*.3} ${l*.7+d} L ${d+l*.3} ${l*.7+d} Z`,`M ${i-d} ${d+l} L ${i-d} ${c/2-d} L ${i-d-l*.7} ${c/2-d-l*.3} L ${i-d-l*.7} ${d+l+l*.3} Z`,`M ${i-d} ${c/2+d} L ${i-d} ${c-d-l} L ${i-d-l*.7} ${c-d-l-l*.3} L ${i-d-l*.7} ${c/2+d+l*.3} Z`,`M ${d+l} ${c-d} L ${i-d-l} ${c-d} L ${i-d-l*.3} ${c-l*.7-d} L ${d+l*.3} ${c-l*.7-d} Z`,`M ${d} ${c/2+d} L ${d} ${c-d-l} L ${d+l*.7} ${c-d-l-l*.3} L ${d+l*.7} ${c/2+d+l*.3} Z`,`M ${d} ${d+l} L ${d} ${c/2-d} L ${d+l*.7} ${c/2-d-l*.3} L ${d+l*.7} ${d+l+l*.3} Z`,`M ${d+l*.5} ${c/2} L ${d+l} ${c/2-l*.4} L ${i-d-l} ${c/2-l*.4} L ${i-d-l*.5} ${c/2} L ${i-d-l} ${c/2+l*.4} L ${d+l} ${c/2+l*.4} Z`];return n.jsx("svg",{width:i,height:c,style:{display:"inline-block"},children:f.map((u,v)=>n.jsx("path",{d:u,fill:o[v]?r:a,style:{filter:o[v]?`drop-shadow(0 0 ${m}px ${r})`:"none",transition:"fill 0.03s ease-out"}},v))})}function Su({size:e=16,color:t="#00f0ff",dim:r=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=r?.15:1;return n.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[n.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:r?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),n.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:r?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function Cu(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function ub(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function pb({timestamp:e,connected:t=!0}){const[r,a]=p.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=p.useState(!1),[i,c]=p.useState(!1),l=p.useRef(!1),d=p.useRef(null),m=p.useRef(null),f=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",v=r.hours==="  ",y=p.useCallback(h=>{const g=Cu(h);a(g),m.current=h},[]),k=p.useCallback(h=>{d.current&&clearInterval(d.current),c(!0),o(!0);let g=0;const _=20,C=50,$={current:h};return d.current=setInterval(()=>{if(g++,g<_)a(ub());else{d.current&&(clearInterval(d.current),d.current=null);const E=Cu($.current);a(E),m.current=$.current,c(!1),o(!1)}},C),E=>{$.current=E}},[]),j=p.useRef(null);p.useEffect(()=>{if(e===null){l.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!l.current){l.current=!0,j.current=k(e);return}if(d.current&&j.current){j.current(e);return}m.current!==e&&y(e)},[e,k,y]),p.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const x=14;return n.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[n.jsxs("div",{className:"clock-label",children:[n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[n.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),n.jsx("polyline",{points:"7 10 12 15 17 10"}),n.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),n.jsx("span",{style:{color:f},children:"LAST"})]}),n.jsxs("div",{className:"clock-display",children:[(r.hours||"  ").split("").map((h,g)=>n.jsx(Ii,{digit:h||" ",size:x,color:f,dimColor:u,glow:i},`h${g}`)),n.jsx(Su,{size:x,color:f,dim:v}),(r.minutes||"  ").split("").map((h,g)=>n.jsx(Ii,{digit:h||" ",size:x,color:f,dimColor:u,glow:i},`m${g}`)),n.jsx(Su,{size:x,color:f,dim:v}),(r.seconds||"  ").split("").map((h,g)=>n.jsx(Ii,{digit:h||" ",size:x,color:f,dimColor:u,glow:i},`s${g}`))]})]})}function mb({clusters:e,value:t,onChange:r,disabled:a}){const[s,o]=p.useState(!1),i=p.useRef(null);p.useEffect(()=>{const d=m=>{i.current&&!i.current.contains(m.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),p.useEffect(()=>{const d=m=>{m.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const c=d=>{r(d),o(!1)},l=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return n.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[n.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:l(),children:[n.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"3"}),n.jsx("circle",{cx:"12",cy:"4",r:"2"}),n.jsx("circle",{cx:"12",cy:"20",r:"2"}),n.jsx("circle",{cx:"4",cy:"12",r:"2"}),n.jsx("circle",{cx:"20",cy:"12",r:"2"}),n.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),n.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),n.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),n.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),n.jsx("span",{className:"selector-label",children:l()}),n.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:n.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&n.jsxs("div",{className:"cluster-dropdown",children:[n.jsxs("div",{className:"dropdown-header",children:[n.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),n.jsx("div",{className:"dropdown-line"})]}),n.jsxs("div",{className:"dropdown-options",children:[n.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>c("__all__"),children:[n.jsx("span",{className:"option-icon",children:"⊕"}),n.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&n.jsx("span",{className:"option-check",children:"✓"})]}),n.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,m])=>{var k,j;const f=(k=m.summary)==null?void 0:k.is_standalone,u=m.name||d,v=((j=m.summary)==null?void 0:j.nodes_online)??0,y=Object.keys(m.vms||{}).length;return n.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>c(d),children:[n.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),n.jsxs("div",{className:"option-content",children:[n.jsx("span",{className:"option-label",children:u}),n.jsxs("span",{className:"option-meta",children:[v," nodes · ",y," VMs"]})]}),t===d&&n.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),n.jsx("div",{className:"dropdown-corner tl"}),n.jsx("div",{className:"dropdown-corner tr"}),n.jsx("div",{className:"dropdown-corner bl"}),n.jsx("div",{className:"dropdown-corner br"})]}),n.jsx("style",{children:`
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
      `})]})}const Mu={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function fb({user:e,onLogout:t}){const{t:r}=Fe(),[a,s]=p.useState(!1),o=p.useRef(null);if(p.useEffect(()=>{if(!a)return;const d=f=>{o.current&&!o.current.contains(f.target)&&s(!1)},m=f=>{f.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",m),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",m)}},[a]),!e)return null;const i=e.role_global||"guest",c=Mu[i]||Mu.guest,l=i==="admin";return n.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[n.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[n.jsx("circle",{cx:"12",cy:"8",r:"4"}),n.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),n.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:c,boxShadow:`0 0 6px ${c}`}})]}),a&&n.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[n.jsxs("div",{className:"dropdown-header",children:[n.jsxs("div",{className:"user-meta-line",children:[n.jsx("span",{className:"user-meta-name",children:e.username}),n.jsxs("span",{className:"user-meta-role",style:{color:c,borderColor:c},children:[n.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,marginRight:6}}),i]})]}),n.jsx("div",{className:"dropdown-line"})]}),n.jsxs("div",{className:"dropdown-options",children:[n.jsxs("a",{href:"/account",className:"dropdown-option",children:[n.jsx("span",{className:"option-icon",children:"⚙"}),n.jsx("span",{className:"option-label",children:r("user.account_password")})]}),n.jsxs("a",{href:"/totp",className:"dropdown-option",children:[n.jsx("span",{className:"option-icon",children:"⊞"}),n.jsx("span",{className:"option-label",children:r("user.totp")})]}),l&&n.jsxs("a",{href:"/audit",className:"dropdown-option",children:[n.jsx("span",{className:"option-icon",children:"▤"}),n.jsx("span",{className:"option-label",children:r("user.audit")})]}),l&&n.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[n.jsx("span",{className:"option-icon",children:"⚡"}),n.jsx("span",{className:"option-label",children:r("user.sessions")})]}),n.jsx("div",{className:"dropdown-divider"}),n.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[n.jsx("span",{className:"option-icon",children:"⏻"}),n.jsx("span",{className:"option-label",children:r("user.sign_out")})]})]}),n.jsx("div",{className:"dropdown-corner tl"}),n.jsx("div",{className:"dropdown-corner tr"}),n.jsx("div",{className:"dropdown-corner bl"}),n.jsx("div",{className:"dropdown-corner br"})]}),n.jsx("style",{children:`
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
      `})]})}const ur={Command:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),n.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),n.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),n.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),n.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("circle",{cx:"12",cy:"12",r:"6"}),n.jsx("circle",{cx:"12",cy:"12",r:"2"}),n.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),n.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),n.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[n.jsx("circle",{cx:"12",cy:"12",r:"3"}),n.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),n.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),n.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),n.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),n.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),n.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),n.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Settings:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),n.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),n.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>n.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:n.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10"}),n.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[n.jsx("circle",{cx:"5",cy:"12",r:"2"}),n.jsx("circle",{cx:"12",cy:"12",r:"2"}),n.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},zu=[{view:"command-center",icon:ur.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:ur.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:ur.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:ur.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:ur.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:ur.Ceph,labelKey:"nav.ceph",shortcut:"C"}],gb={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation"},hb={"command-center":"/","cluster-core":"/nodes","holo-matrix":"/matrix","radar-scan":"/radar","ceph-constellation":"/ceph",storage:"/storage",settings:"/settings"},Li={"/":"command-center","/overview":"command-center","/nodes":"cluster-core","/matrix":"holo-matrix","/radar":"radar-scan","/ceph":"ceph-constellation","/storage":"storage","/settings":"settings"};function Eu(){const e=(typeof window<"u"?window.location.pathname:"/")||"/",t=e!=="/"&&e.endsWith("/")?e.slice(0,-1):e;if(Li[t])return Li[t];const r="/"+(t.split("/").filter(Boolean)[0]||"");return Li[r]||"command-center"}function xb(){var le;const{t:e,language:t,setLanguage:r}=Fe(),[a,s]=p.useState(()=>Eu());p.useEffect(()=>{const D=hb[a];if(!D)return;const R=window.location.pathname||"/",ee="/"+(R.split("/").filter(Boolean)[0]||""),T="/"+(D.split("/").filter(Boolean)[0]||"");R==="/"&&D==="/"||R!=="/"&&D!=="/"&&ee===T||window.history.pushState(null,"",D)},[a]),p.useEffect(()=>{const D=()=>s(Eu());return window.addEventListener("popstate",D),()=>window.removeEventListener("popstate",D)},[]);const[o,i]=p.useState({}),[c,l]=p.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,m]=p.useState(!1),f=qo(),[u,v]=p.useState(0),[y,k]=p.useState(!1),[j,x]=p.useState(null),[h,g]=p.useState(!1),[_,C]=p.useState(!1),{connected:$,connecting:E,send:M}=th({onMessage:p.useCallback(D=>{y||(i(D),v(Date.now()/1e3))},[y])});p.useEffect(()=>{const D=()=>{const R=document.visibilityState!=="hidden";document.body.setAttribute("data-app-visible",R?"true":"false");try{R?(M({type:"resume"}),M({type:"refresh"})):M({type:"pause"})}catch{}};return D(),document.addEventListener("visibilitychange",D),()=>document.removeEventListener("visibilitychange",D)},[M]);const W=p.useCallback(()=>{x(y?"resuming":"pausing"),setTimeout(()=>{k(D=>!D),setTimeout(()=>x(null),500)},300)},[y]),B=c==="__all__"?null:o[c]||null,re=p.useMemo(()=>{const D=Object.values(o);return{total_clusters:D.length,total_nodes:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.node_count)||0)},0),total_nodes_online:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.nodes_online)||0)},0),total_vms:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.vm_count)||0)},0),total_vms_running:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.vms_running)||0)},0),total_cts:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.ct_count)||0)},0),total_cts_running:D.reduce((R,ee)=>{var T;return R+(((T=ee.summary)==null?void 0:T.cts_running)||0)},0),clusters:D.map(R=>R.summary).filter(Boolean)}},[o]);p.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",c)}catch{}},[c]),p.useEffect(()=>{Object.keys(o).length>0&&c!=="__all__"&&(o[c]||l("__all__"))},[o,c]),p.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),p.useEffect(()=>{Ie.getConfig().then(D=>{D!=null&&D.ui&&(D.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",D.ui.vm_matrix_default_filter),D.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(D.ui.matrix_card_width)),D.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",D.ui.matrix_sort_by))}).catch(()=>{})},[]),p.useEffect(()=>{if(!h)return;const D=()=>g(!1);return document.addEventListener("click",D),()=>document.removeEventListener("click",D)},[h]),p.useEffect(()=>{if(!_)return;const D=()=>C(!1);return document.addEventListener("click",D),()=>document.removeEventListener("click",D)},[_]),p.useEffect(()=>{const D=R=>{if(R.target instanceof HTMLInputElement||R.target instanceof HTMLTextAreaElement)return;const ee=R.key.toLowerCase();if(ee===" "||R.code==="Space"){R.preventDefault(),W();return}if(!R.ctrlKey&&!R.metaKey&&!R.altKey){const T=gb[ee];if(T){R.preventDefault(),s(T);return}}(R.ctrlKey||R.metaKey)&&ee==="s"&&(R.preventDefault(),m(T=>!T))};return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[W]);const U=()=>{const D=c==="__all__";switch(a){case"command-center":return n.jsx(Zd,{clusters:o,globalSummary:re,isPaused:y,onSelectCluster:R=>{l(R),s("cluster-core")}});case"cluster-core":return n.jsx(mh,{cluster:B,clusters:D?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:R=>{l(R),s("holo-matrix")},isPaused:y});case"holo-matrix":return n.jsx(Ph,{cluster:B,clusters:D?o:void 0});case"radar-scan":return n.jsx(Oh,{cluster:B,clusters:D?o:void 0,isPaused:y});case"storage":return n.jsx(sb,{cluster:B,clusters:D?o:void 0});case"ceph-constellation":return n.jsx(Jh,{cluster:B,clusters:D?o:void 0,isPaused:y});default:return n.jsx(Zd,{clusters:o,globalSummary:re,isPaused:y,onSelectCluster:R=>{l(R),s("cluster-core")}})}};return n.jsxs("div",{className:`app-container ${y?"animations-paused":""}`,children:[n.jsx(db,{isPaused:y}),n.jsxs("header",{className:"header-bar",children:[n.jsxs("div",{className:"header-logo",children:[n.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),n.jsx("span",{className:`status-dot ${$?"connected":E?"connecting":"disconnected"}`,title:e($?"status.connected":E?"status.connecting":"status.disconnected")}),n.jsx(pb,{timestamp:u,connected:$})]}),n.jsxs("nav",{className:"header-center",children:[n.jsxs("div",{className:"nav-tabs",children:[zu.map(({view:D,icon:R,labelKey:ee,shortcut:T},I)=>n.jsxs("button",{className:`nav-tab nav-tab-${I} ${a===D?"active":""}`,onClick:()=>s(D),title:`${e(ee)} [${T}]`,children:[n.jsx(R,{}),n.jsx("span",{children:e(ee)}),n.jsx("span",{className:"nav-shortcut",children:T})]},D)),n.jsxs("div",{className:"nav-more-wrapper",children:[n.jsx("button",{className:"nav-tab nav-more-btn",onClick:D=>{D.stopPropagation(),C(!_)},title:e("nav.more"),children:n.jsx(ur.MoreHorizontal,{})}),_&&n.jsx("div",{className:"nav-more-dropdown",onClick:D=>D.stopPropagation(),children:zu.map(({view:D,icon:R,labelKey:ee,shortcut:T},I)=>n.jsxs("button",{className:`nav-more-option nav-more-option-${I} ${a===D?"active":""}`,onClick:()=>{s(D),C(!1)},children:[n.jsx(R,{}),n.jsx("span",{children:e(ee)}),n.jsx("span",{className:"nav-shortcut",children:T})]},D))})]})]}),Object.keys(o).length>0&&n.jsx(mb,{clusters:o,value:c,onChange:l,disabled:a==="command-center"})]}),n.jsxs("div",{className:"header-right",children:[n.jsxs("button",{className:`btn btn-icon pause-btn ${y?"paused":""} ${j||""}`,onClick:W,title:`${e(y?"status.paused":"status.live")} [Space]`,children:[n.jsx("div",{className:"pause-btn-inner",children:y?n.jsx(ur.Play,{}):n.jsx(ur.Pause,{})}),n.jsx("div",{className:"pause-fx"})]}),n.jsxs("div",{className:"lang-menu-wrapper",children:[n.jsx("button",{className:"btn btn-icon",onClick:D=>{D.stopPropagation(),g(!h)},title:e("settings.language"),children:n.jsx(ur.Language,{})}),h&&n.jsxs("div",{className:"lang-dropdown",onClick:D=>D.stopPropagation(),children:[n.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{r("en"),g(!1)},children:[n.jsx("span",{className:"lang-flag",children:"EN"}),n.jsx("span",{children:"English"})]}),n.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{r("zh-TW"),g(!1)},children:[n.jsx("span",{className:"lang-flag",children:"繁"}),n.jsx("span",{children:"繁體中文"})]})]})]}),n.jsx(fb,{user:f.user,onLogout:f.logout}),(!f.authEnforced||((le=f.user)==null?void 0:le.role_global)==="admin")&&n.jsx("button",{className:"btn btn-icon",onClick:()=>m(!0),title:e("settings.title"),children:n.jsx(ur.Settings,{})})]})]}),n.jsx("main",{className:"main-content",children:n.jsx("div",{className:"view-container",children:U()},a)}),d&&n.jsx(cb,{onClose:()=>m(!1),clusters:o}),j&&n.jsxs("div",{className:`pause-overlay ${j}`,children:[n.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((D,R)=>n.jsx("div",{className:"glitch-line",style:{animationDelay:`${R*.05}s`}},R))}),n.jsx("div",{className:"pause-status-text",children:j==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),n.jsx("div",{className:"pause-scan-ring"})]})]})}function vb(){return n.jsx(Qg,{children:n.jsx(Zg,{children:n.jsx(xb,{})})})}Ai.createRoot(document.getElementById("root")).render(n.jsx(Po.StrictMode,{children:n.jsx(vb,{})}));
