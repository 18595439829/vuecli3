(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e111787"],{"20d6":function(e,t,a){"use strict";var n=a("5ca1"),r=a("0a49")(6),o="findIndex",i=!0;o in[]&&Array(1)[o]((function(){i=!1})),n(n.P+n.F*i,"Array",{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(o)},"2ab5":function(e,t,a){e.exports={container:"TheLayerIndex_container_3IFda",canvas:"TheLayerIndex_canvas_2LIiI",element:"TheLayerIndex_element_2owki",toolbar:"TheLayerIndex_toolbar_1tbpL","moveable-layer":"TheLayerIndex_moveable-layer_wEJGJ","hover-layer":"TheLayerIndex_hover-layer_golzf"}},7207:function(e,t,a){"use strict";var n=a("2ab5"),r=a.n(n);a.d(t,"default",(function(){return r.a}))},9141:function(e,t,a){e.exports=a.p+"img/Jellyfish.5a44c7ba.jpg"},b62d:function(e,t,a){e.exports={container:"TheLayerElement_container_NGFvO","background-item":"TheLayerElement_background-item_3dCvk","layer-img":"TheLayerElement_layer-img_1MaD6","layer-captions":"TheLayerElement_layer-captions_3gzZi"}},dc06:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"container",class:e.$style["container"],on:{click:e.closeMoveable}},[a("div",{class:e.$style["canvas"],style:{transform:"scale("+e.canvasStyle.scale+")",left:e.canvasStyle.left+"px",top:e.canvasStyle.top+"px"}},[a("TheLayerElement",{ref:"canvas-container",class:e.$style["element"]})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isToolbar,expression:"isToolbar"}],ref:"toolbar",class:e.$style["toolbar"],style:Object.assign({},e.toolbarStyle)},[e._v("\n    工具栏\n  ")]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isMoveable,expression:"isMoveable"}],ref:"moveable-container",class:e.$style["moveable-layer"],style:Object.assign({},e.selectLayerStyle),attrs:{ishover:e.isHover}},[a("img",{attrs:{src:"",alt:""}})]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isHover,expression:"isHover"}],class:e.$style["hover-layer"],style:Object.assign({},e.hoverLayerStyle)},[a("img",{attrs:{src:"",alt:""}})])])},r=[],o=(a("8e6e"),a("ac6a"),a("456d"),a("28a5"),a("c5f6"),a("ade3")),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.$style["container"]},[e.info.backgrounds&&e.info.backgrounds.length?e._l(e.info.backgrounds,(function(t){return a("div",{key:t.id,class:e.$style["background-item"],style:{backgroundColor:t.color,backgroundImage:"url("+t.url+")",zIndex:t.zIndex,width:t.width+"px",height:t.height+"px",left:t.left+"px",top:t.top+"px"},attrs:{"data-id":t.id,blur:t.isBlur},on:{click:e.backgroundClick,mouseenter:function(t){return e.backgroundHover(t,!0)},mouseleave:function(t){return e.backgroundHover(t,!1)}}})})):e._e(),e.info.medias&&e.info.medias.length?e._l(e.info.medias,(function(t){return a("div",{key:t.id,class:e.$style["layer-img"],style:{zIndex:t.zIndex,width:t.inner.width+"px",height:t.inner.height+"px",left:t.inner.left+"px",top:t.inner.top+"px"},attrs:{"data-id":t.id},on:{click:e.mediaClick,mouseenter:function(t){return e.mediaHover(t,!0)},mouseleave:function(t){return e.mediaHover(t,!1)}}},[a("img",{style:{zIndex:t.zIndex,width:t.outer.width+"px",height:t.outer.height+"px",left:t.outer.left+"px",top:t.outer.top+"px"},attrs:{src:t.url,alt:""}})])})):e._e(),e.info.captions&&e.info.captions.length?[a("div",{ref:"layer-caption",class:e.$style["layer-captions"]},e._l(e.info.captions[e.captionIndex].content,(function(t,n){return a("div",{key:t+n,attrs:{"data-id":e.info.captions[e.captionIndex].id},on:{click:e.captionsClick,mouseenter:function(t){return e.captionsHover(t,!0)},mouseleave:function(t){return e.captionsHover(t,!1)}}},[e._v("\n        "+e._s(t)+"\n      ")])})),0)]:e._e()],2)},s=[],c=(a("7514"),a("20d6"),a("2f62")),l=a("8c05"),d=a.n(l),p=a("9141"),h=a.n(p);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var y={name:"TheLayerElement",data:function(){return{info:{backgrounds:[{id:"123",isBlur:!1,color:"#f1f1f1",zIndex:0,width:1920,height:1080,left:0,top:0},{id:"142314",isBlur:!0,url:d.a,zIndex:1,width:1920,height:1080,left:0,top:0}],medias:[{id:"media-1",url:d.a,zIndex:1,inner:{width:960,height:1080,left:960,top:0},outer:{width:960,height:1080,left:0,top:0}},{id:"media-2",url:h.a,inner:{width:960,height:540,left:0,top:0},outer:{width:960,height:540,left:0,top:0}}],texts:[{id:"213445234",content:"我是一个文本",color:"#333",fontSize:30}],captions:[{id:"13313443411",content:["第一行字幕居中","第二行字幕惆怅长岑长错错错错错错错错错"]}]},captionIndex:0}},computed:f({},Object(c["c"])(["cropperData","deleteData"])),watch:{cropperData:{handler:function(e){switch(e.type){case"backgrounds":var t=this.info.backgrounds.findIndex((function(t){return t.id===e.data.id}));this.$set(this.info.backgrounds,t,e.data);break;case"medias":var a=this.info.medias.findIndex((function(t){return t.id===e.data.id}));this.$set(this.info.medias,a,e.data);break}},deep:!0},deleteData:{handler:function(e){var t=this.info[e.type].findIndex((function(t){return t.id===e.data.id}));this.info[e.type].splice(t,1),this.updateCropperData({type:"",data:void 0})},deep:!0}},methods:f(f({},Object(c["b"])(["updateCropperData","updateHoverData"])),{},{backgroundClick:function(e){var t=this.info.backgrounds.find((function(t){return t.id===e.target.dataset.id}));this.emit({type:"backgrounds",data:t})},backgroundHover:function(e,t){var a;t&&(a=this.info.backgrounds.find((function(t){return t.id===e.target.dataset.id}))),this.hover({type:"backgrounds",data:a})},mediaClick:function(e){var t=this.info.medias.find((function(t){return t.id===e.target.dataset.id}));this.emit({type:"medias",data:t})},mediaHover:function(e,t){var a;t&&(a=this.info.medias.find((function(t){return t.id===e.target.dataset.id}))),this.hover({type:"medias",data:a})},captionsClick:function(e){var t=this.info.captions.find((function(t){return t.id===e.target.dataset.id}));this.emit({type:"captions",data:f(f({},t),{},{ref:this.$refs["layer-caption"]})})},captionsHover:function(e,t){var a;t&&(a=this.info.captions.find((function(t){return t.id===e.target.dataset.id}))),this.hover({type:"captions",data:t?f(f({},a),{},{ref:this.$refs["layer-caption"]}):void 0})},emit:function(e){this.updateCropperData(e),this.hover({type:"",data:void 0})},hover:function(e){this.updateHoverData(e)}})},v=y,b=a("df3ae"),g=a("2877");function m(e){this["$style"]=b["default"].locals||b["default"]}var w=Object(g["a"])(v,i,s,!1,m,null,null),k=w.exports,x=a("d4ec"),D=a("bee2"),S=a("533b");function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var T=function(){function e(t,a){Object(x["a"])(this,e),this.options={className:"draggable",target:null,origin:!1,edge:!1,zoom:1,draggable:!0,edgeDraggable:!1,resizable:!0,keepRatio:!0,renderDirections:["nw","ne","se","sw"],snappable:!0,elementSnapDirections:!0},Object.assign(this.options,a),this.moveable=new S["a"](t,j({},this.options)),this.moveable.on("drag",(function(e){var t=e.target,a=e.beforeTranslate;t.style.transform="translate(".concat(a[0],"px, ").concat(a[1],"px)")})),this.moveable.on("resize",(function(e){var t=e.target,a=e.width,n=e.height,r=e.drag;t.style.width="".concat(a,"px"),t.style.height="".concat(n,"px"),t.style.transform="translate(".concat(r.beforeTranslate[0],"px, ").concat(r.beforeTranslate[1],"px)")}))}return Object(D["a"])(e,[{key:"getMoveable",value:function(){return this.moveable}},{key:"destroy",value:function(){this.moveable.destroy()}}]),e}();function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var $={name:"TheLayerIndex",components:{TheLayerElement:k},data:function(){return{moveable:null,canvasStyle:{scale:.5,left:100,top:100},ctrlDown:!1,toolbarStyle:{},selectLayerStyle:{},hoverLayerStyle:{},isToolbar:!1,isMoveable:!1,isHover:!1}},computed:M({},Object(c["c"])(["cropperData","hoverData"])),watch:{cropperData:function(e){this.destroyMoveable(),this.isMoveable=!1,this.layerSelect(e)},hoverData:function(e){this.layerHover(e)}},created:function(){this.setElementScale()},mounted:function(){this.initDelete()},destroy:function(){this.destroyDelete(),this.destroyMoveable()},methods:M(M({},Object(c["b"])(["updateCropperData","updateDeleteData"])),{},{setElementScale:function(){var e=this,t=.1;document.body.addEventListener("keydown",(function(a){e.ctrlDown=a.ctrlKey||a.metaKey,e.ctrlDown&&(107!==a.keyCode&&187!==a.keyCode||(a.preventDefault(),e.canvasStyle.scale+=t),109!==a.keyCode&&189!==a.keyCode||(a.preventDefault(),e.canvasStyle.scale-=t),e.canvasStyle.scale<=.1&&(e.canvasStyle.scale=.1),e.setMoveableRequest())}),!1),document.body.addEventListener("keyup",(function(t){e.ctrlDown=t.ctrlKey||t.metaKey})),document.body.addEventListener("mousewheel",(function(a){e.ctrlDown&&(a.preventDefault(),a.wheelDeltaY>0?e.canvasStyle.scale+=t:e.canvasStyle.scale-=t,e.canvasStyle.scale<=.1&&(e.canvasStyle.scale=.1)),e.setMoveableRequest()}),{passive:!1,capture:!1})},setMoveableRequest:function(){var e=this;this.moveable?(this.destroyMoveable(),this.isMoveable=!1,this.$nextTick((function(){e.layerSelect(e.cropperData)}))):"caption"===this.cropperData.type&&(this.isToolbar=!1,this.$nextTick((function(){e.layerSelect(e.cropperData)})))},initMoveable:function(){var e=this;this.moveable=new T(this.$refs.container,{target:this.$refs["moveable-container"]}).getMoveable(),this.moveable.on("drag",(function(t){var a=t.target,n=t.beforeTranslate;e.cropperData.data.inner.left=Math.floor((Number(a.style.left.split("px")[0])+n[0]-e.canvasStyle.left)/e.canvasStyle.scale),e.cropperData.data.inner.top=Math.floor((Number(a.style.top.split("px")[0])+n[1]-e.canvasStyle.top)/e.canvasStyle.scale),e.setToolbarStyle(),e.updateCropperData(e.cropperData)})).on("resize",(function(t){var a=t.target,n=t.width,r=t.height,o=t.drag,i=o.beforeTranslate,s=n/e.canvasStyle.scale/e.cropperData.data.inner.width;e.cropperData.data.inner.width=Math.round(n/e.canvasStyle.scale),e.cropperData.data.inner.height=Math.round(r/e.canvasStyle.scale),e.cropperData.data.inner.left=Math.round((Number(a.style.left.split("px")[0])+i[0]-e.canvasStyle.left)/e.canvasStyle.scale),e.cropperData.data.inner.top=Math.round((Number(a.style.top.split("px")[0])+i[1]-e.canvasStyle.top)/e.canvasStyle.scale),e.cropperData.data.outer.width=Math.round(e.cropperData.data.outer.width*s),e.cropperData.data.outer.height=Math.round(e.cropperData.data.outer.height*s),e.cropperData.data.outer.left=Math.round(e.cropperData.data.outer.left*s),e.cropperData.data.outer.top=Math.round(e.cropperData.data.outer.top*s),e.setToolbarStyle(),e.updateCropperData(e.cropperData)}))},initDelete:function(){document.body.addEventListener("keydown",this.keydown)},layerSelect:function(e){var t=this,a=e.type,n=e.data;switch(this.isMoveable=!0,this.selectLayerStyle=M({},this.getLayerStyle({type:a,data:n})),a){case"backgrounds":this.$nextTick((function(){t.initMoveable()}));break;case"medias":this.$nextTick((function(){t.initMoveable(),t.isToolbar=!0,t.setToolbarStyle()}));break;case"captions":this.$nextTick((function(){t.isToolbar=!0,t.toolbarStyle={left:"".concat(192*t.canvasStyle.scale+t.canvasStyle.left,"px"),top:"".concat(top,"px")}}));break;default:this.isToolbar=!1,this.isMoveable=!1}},layerHover:function(e){var t=e.type,a=e.data;a?(this.hoverLayerStyle=M({},this.getLayerStyle({type:t,data:a})),this.isHover=!0):this.isHover=!1},getLayerStyle:function(e){var t,a=e.type,n=e.data;switch(a){case"backgrounds":t={width:"".concat(1920*this.canvasStyle.scale,"px"),height:"".concat(1080*this.canvasStyle.scale,"px"),left:"".concat(this.canvasStyle.left,"px"),top:"".concat(this.canvasStyle.top,"px"),transform:""};break;case"medias":t={width:"".concat(n.inner.width*this.canvasStyle.scale,"px"),height:"".concat(n.inner.height*this.canvasStyle.scale,"px"),left:"".concat(n.inner.left*this.canvasStyle.scale+this.canvasStyle.left,"px"),top:"".concat(n.inner.top*this.canvasStyle.scale+this.canvasStyle.left,"px"),transform:""};break;case"captions":var r=n.ref.getBoundingClientRect(),o=r.height,i=r.top;t={width:"".concat(1536*this.canvasStyle.scale,"px"),height:"".concat(o,"px"),left:"".concat(192*this.canvasStyle.scale+this.canvasStyle.left,"px"),top:"".concat(i,"px"),outline:"1px solid #3360ff",transform:""};break}return t},setToolbarStyle:function(){this.isToolbar&&(this.toolbarStyle={left:"".concat(this.cropperData.data.inner.left*this.canvasStyle.scale+this.canvasStyle.left,"px"),top:"".concat(this.cropperData.data.inner.top*this.canvasStyle.scale+this.canvasStyle.left,"px")})},closeMoveable:function(e){e.target===this.$refs["canvas-container"].$el||this.$refs["canvas-container"].$el.contains(e.target)||e.target===this.$refs["toolbar"]||this.$refs["toolbar"].contains(e.target)||e.target===this.$refs["moveable-container"]||this.$refs["moveable-container"].contains(e.target)||(this.destroyMoveable(),this.isMoveable=!1,this.isToolbar=!1)},destroyMoveable:function(){this.moveable&&(this.moveable.target.style.transform="",this.moveable.target=null,this.moveable.destroy(),this.moveable=null)},destroyDelete:function(){document.body.removeEventListener("keydown",this.keydown)},keydown:function(e){if(this.cropperData&&this.cropperData.data)if("Backspace"===e.key||"Delete"===e.key)this.updateDeleteData(M({},this.cropperData));else if("ArrowRight"===e.key||"ArrowLeft"===e.key||"ArrowUp"===e.key||"ArrowDown"===e.key){var t=1,a="deltaX",n=1;switch(e.key){case"ArrowRight":a="deltaX",n=1;break;case"ArrowLeft":a="deltaX",n=-1;break;case"ArrowUp":a="deltaY",n=-1;break;case"ArrowDown":a="deltaY",n=1;break}e.shiftKey&&(t=10),this.setLayerPosition({type:a,distance:t*n})}},setLayerPosition:function(e){var t=e.type,a=e.distance,n=this.moveable.request("draggable");n.request(Object(o["a"])({},t,a)),n.requestEnd()}})},_=$,I=a("7207");function P(e){this["$style"]=I["default"].locals||I["default"]}var E=Object(g["a"])(_,n,r,!1,P,null,null);t["default"]=E.exports},df3ae:function(e,t,a){"use strict";var n=a("b62d"),r=a.n(n);a.d(t,"default",(function(){return r.a}))}}]);
//# sourceMappingURL=chunk-1e111787.fbbb83df.js.map