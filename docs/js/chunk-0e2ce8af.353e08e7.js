(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e2ce8af"],{"1bb3":function(t,n,e){},"5f3f":function(t,n,e){t.exports={container:"TheTestPosition_container_2Bcme",content:"TheTestPosition_content_2al_k"}},"75f7":function(t,n,e){"use strict";var o=e("5f3f"),i=e.n(o);e.d(n,"default",(function(){return i.a}))},"8b76":function(t,n,e){"use strict";e("1bb3")},fd14:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{class:t.$style["container"]},[e("div",{ref:"content",class:t.$style["content"],style:t.contentStyle},[e("textarea",{ref:"textarea",attrs:{name:"",id:"",cols:"30",rows:"10"},on:{input:t.mousemove}})])])},i=[],r=e("2332"),c=e("26ee"),a=function(){return c["a"].Date.now()},u=a,f=/\s/;function s(t){var n=t.length;while(n--&&f.test(t.charAt(n)));return n}var l=s,v=/^\s+/;function d(t){return t?t.slice(0,l(t)+1).replace(v,""):t}var h=d,m=e("f0ce"),p=e("1147"),b="[object Symbol]";function y(t){return"symbol"==typeof t||Object(p["a"])(t)&&Object(m["a"])(t)==b}var w=y,g=NaN,x=/^[-+]0x[0-9a-f]+$/i,T=/^0b[01]+$/i,O=/^0o[0-7]+$/i,j=parseInt;function $(t){if("number"==typeof t)return t;if(w(t))return g;if(Object(r["a"])(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=Object(r["a"])(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=h(t);var e=T.test(t);return e||O.test(t)?j(t.slice(2),e?2:8):x.test(t)?g:+t}var _=$,S="Expected a function",k=Math.max,E=Math.min;function W(t,n,e){var o,i,c,a,f,s,l=0,v=!1,d=!1,h=!0;if("function"!=typeof t)throw new TypeError(S);function m(n){var e=o,r=i;return o=i=void 0,l=n,a=t.apply(r,e),a}function p(t){return l=t,f=setTimeout(w,n),v?m(t):a}function b(t){var e=t-s,o=t-l,i=n-e;return d?E(i,c-o):i}function y(t){var e=t-s,o=t-l;return void 0===s||e>=n||e<0||d&&o>=c}function w(){var t=u();if(y(t))return g(t);f=setTimeout(w,b(t))}function g(t){return f=void 0,h&&o?m(t):(o=i=void 0,a)}function x(){void 0!==f&&clearTimeout(f),l=0,o=s=i=f=void 0}function T(){return void 0===f?a:g(u())}function O(){var t=u(),e=y(t);if(o=arguments,i=this,s=t,e){if(void 0===f)return p(s);if(d)return clearTimeout(f),f=setTimeout(w,n),m(s)}return void 0===f&&(f=setTimeout(w,n)),a}return n=_(n)||0,Object(r["a"])(e)&&(v=!!e.leading,d="maxWait"in e,c=d?k(_(e.maxWait)||0,n):c,h="trailing"in e?!!e.trailing:h),O.cancel=x,O.flush=T,O}var I=W,J={name:"Index",data:function(){return{debounce:I,contentStyle:{}}},mounted:function(){var t=this;window.addEventListener("resize",(function(n){var e=(n.target.innerWidth-200)/(16/9);e>=n.target.innerHeight?(console.log("高度小"),t.contentStyle={width:"calc((100vh - 100px) * (16 / 9))",height:"calc(100vh - 100px)"}):(console.log("宽度小"),t.contentStyle={width:"calc(100vw - 400px)",height:"calc((100vw - 400px) / (16 / 9))"}),console.log(t.contentStyle)}))},methods:{mousemove:function(){console.log(11111),I((function(){console.log(22222)}),200)}}},M=J,N=e("75f7"),P=(e("8b76"),e("2877"));function z(t){this["$style"]=N["default"].locals||N["default"]}var A=Object(P["a"])(M,o,i,!1,z,null,null);n["default"]=A.exports}}]);
//# sourceMappingURL=chunk-0e2ce8af.353e08e7.js.map