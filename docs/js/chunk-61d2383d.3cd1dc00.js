(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61d2383d"],{"0ef8":function(e,n,t){},"456d":function(e,n,t){var o=t("4bf8"),c=t("0d58");t("5eda")("keys",(function(){return function(e){return c(o(e))}}))},"460c":function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:e.$style["container"]},[t("div",[e._v("\n    第二章:Object的变化侦测\n  ")]),t("div",[t("Button",{on:{click:e.doDefineProperty}},[e._v("doDefineProperty")]),t("Button",{on:{click:e.toNewObj}},[e._v("defineObjPro")])],1)])},c=[],r=(t("7f7f"),t("ac6a"),t("456d"),{name:"Chapter2",components:{},data:function(){return{}},created:function(){},methods:{doDefineProperty:function(){var e={name:"张三",age:"25"},n=void 0;Object.defineProperty(e,"isMan",{configurable:!0,enumerable:!0,get:function(){return console.log("get"),n},set:function(e){console.log("set"),n=e}});var t=Object.keys(e);e.isMan=!1,console.log(e,t)},toNewObj:function(){var e={name:"李四",age:"30"},n=this.defineObjPro(e);n.age="18",console.log(n.name,n.age)},defineObjPro:function(e){return Object.keys(e).forEach((function(n){var t=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!0,get:function(){return console.log("get",n),t},set:function(e){console.log("set",n),t=e}})})),e}}}),i=r,u=t("c9cd"),a=t("2877");function f(e){this["$style"]=u["default"].locals||u["default"]}var s=Object(a["a"])(i,o,c,!1,f,null,null);n["default"]=s.exports},"5eda":function(e,n,t){var o=t("5ca1"),c=t("8378"),r=t("79e5");e.exports=function(e,n){var t=(c.Object||{})[e]||Object[e],i={};i[e]=n(t),o(o.S+o.F*r((function(){t(1)})),"Object",i)}},"7f7f":function(e,n,t){var o=t("86cc").f,c=Function.prototype,r=/^\s*function ([^ (]*)/,i="name";i in c||t("9e1e")&&o(c,i,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(e){return""}}})},c9cd:function(e,n,t){"use strict";var o=t("0ef8"),c=t.n(o);t.d(n,"default",(function(){return c.a}))}}]);
//# sourceMappingURL=chunk-61d2383d.3cd1dc00.js.map