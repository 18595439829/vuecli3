(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a287a7e"],{"0710":function(t,e,i){"use strict";var n=i("592d"),o=i("e269"),s={BOTTOM_LEFT:"bottom-left",BOTTOM_CENTER:"bottom-center",BOTTOM_RIGHT:"bottom-right",CENTER_LEFT:"center-left",CENTER_CENTER:"center-center",CENTER_RIGHT:"center-right",TOP_LEFT:"top-left",TOP_CENTER:"top-center",TOP_RIGHT:"top-right"},r=i("cd7e"),a=i("0999"),l=i("1e8d"),h=i("0af5"),d={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"},c=function(t){function e(e){t.call(this),this.options=e,this.id=e.id,this.insertFirst=void 0===e.insertFirst||e.insertFirst,this.stopEvent=void 0===e.stopEvent||e.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==e.className?e.className:"ol-overlay-container "+r["d"],this.element.style.position="absolute",this.autoPan=void 0!==e.autoPan&&e.autoPan,this.autoPanAnimation=e.autoPanAnimation||{},this.autoPanMargin=void 0!==e.autoPanMargin?e.autoPanMargin:20,this.rendered={bottom_:"",left_:"",right_:"",top_:"",visible:!0},this.mapPostrenderListenerKey=null,Object(l["a"])(this,Object(o["b"])(d.ELEMENT),this.handleElementChanged,this),Object(l["a"])(this,Object(o["b"])(d.MAP),this.handleMapChanged,this),Object(l["a"])(this,Object(o["b"])(d.OFFSET),this.handleOffsetChanged,this),Object(l["a"])(this,Object(o["b"])(d.POSITION),this.handlePositionChanged,this),Object(l["a"])(this,Object(o["b"])(d.POSITIONING),this.handlePositioningChanged,this),void 0!==e.element&&this.setElement(e.element),this.setOffset(void 0!==e.offset?e.offset:[0,0]),this.setPositioning(void 0!==e.positioning?e.positioning:s.TOP_LEFT),void 0!==e.position&&this.setPosition(e.position)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getElement=function(){return this.get(d.ELEMENT)},e.prototype.getId=function(){return this.id},e.prototype.getMap=function(){return this.get(d.MAP)},e.prototype.getOffset=function(){return this.get(d.OFFSET)},e.prototype.getPosition=function(){return this.get(d.POSITION)},e.prototype.getPositioning=function(){return this.get(d.POSITIONING)},e.prototype.handleElementChanged=function(){Object(a["d"])(this.element);var t=this.getElement();t&&this.element.appendChild(t)},e.prototype.handleMapChanged=function(){this.mapPostrenderListenerKey&&(Object(a["e"])(this.element),Object(l["e"])(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);var t=this.getMap();if(t){this.mapPostrenderListenerKey=Object(l["a"])(t,n["a"].POSTRENDER,this.render,this),this.updatePixelPosition();var e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element)}},e.prototype.render=function(){this.updatePixelPosition()},e.prototype.handleOffsetChanged=function(){this.updatePixelPosition()},e.prototype.handlePositionChanged=function(){this.updatePixelPosition(),this.get(d.POSITION)&&this.autoPan&&this.panIntoView()},e.prototype.handlePositioningChanged=function(){this.updatePixelPosition()},e.prototype.setElement=function(t){this.set(d.ELEMENT,t)},e.prototype.setMap=function(t){this.set(d.MAP,t)},e.prototype.setOffset=function(t){this.set(d.OFFSET,t)},e.prototype.setPosition=function(t){this.set(d.POSITION,t)},e.prototype.panIntoView=function(){var t=this.getMap();if(t&&t.getTargetElement()){var e=this.getRect(t.getTargetElement(),t.getSize()),i=this.getElement(),n=this.getRect(i,[Object(a["c"])(i),Object(a["b"])(i)]),o=this.autoPanMargin;if(!Object(h["g"])(e,n)){var s=n[0]-e[0],r=e[2]-n[2],l=n[1]-e[1],d=e[3]-n[3],c=[0,0];if(s<0?c[0]=s-o:r<0&&(c[0]=Math.abs(r)+o),l<0?c[1]=l-o:d<0&&(c[1]=Math.abs(d)+o),0!==c[0]||0!==c[1]){var u=t.getView().getCenter(),p=t.getPixelFromCoordinate(u),f=[p[0]+c[0],p[1]+c[1]];t.getView().animate({center:t.getCoordinateFromPixel(f),duration:this.autoPanAnimation.duration,easing:this.autoPanAnimation.easing})}}}},e.prototype.getRect=function(t,e){var i=t.getBoundingClientRect(),n=i.left+window.pageXOffset,o=i.top+window.pageYOffset;return[n,o,n+e[0],o+e[1]]},e.prototype.setPositioning=function(t){this.set(d.POSITIONING,t)},e.prototype.setVisible=function(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)},e.prototype.updatePixelPosition=function(){var t=this.getMap(),e=this.getPosition();if(t&&t.isRendered()&&e){var i=t.getPixelFromCoordinate(e),n=t.getSize();this.updateRenderedPosition(i,n)}else this.setVisible(!1)},e.prototype.updateRenderedPosition=function(t,e){var i=this.element.style,n=this.getOffset(),o=this.getPositioning();this.setVisible(!0);var r=n[0],a=n[1];if(o==s.BOTTOM_RIGHT||o==s.CENTER_RIGHT||o==s.TOP_RIGHT){""!==this.rendered.left_&&(this.rendered.left_=i.left="");var l=Math.round(e[0]-t[0]-r)+"px";this.rendered.right_!=l&&(this.rendered.right_=i.right=l)}else{""!==this.rendered.right_&&(this.rendered.right_=i.right=""),o!=s.BOTTOM_CENTER&&o!=s.CENTER_CENTER&&o!=s.TOP_CENTER||(r-=this.element.offsetWidth/2);var h=Math.round(t[0]+r)+"px";this.rendered.left_!=h&&(this.rendered.left_=i.left=h)}if(o==s.BOTTOM_LEFT||o==s.BOTTOM_CENTER||o==s.BOTTOM_RIGHT){""!==this.rendered.top_&&(this.rendered.top_=i.top="");var d=Math.round(e[1]-t[1]-a)+"px";this.rendered.bottom_!=d&&(this.rendered.bottom_=i.bottom=d)}else{""!==this.rendered.bottom_&&(this.rendered.bottom_=i.bottom=""),o!=s.CENTER_LEFT&&o!=s.CENTER_CENTER&&o!=s.CENTER_RIGHT||(a-=this.element.offsetHeight/2);var c=Math.round(t[1]+a)+"px";this.rendered.top_!=c&&(this.rendered.top_=i.top=c)}},e.prototype.getOptions=function(){return this.options},e}(o["a"]);e["a"]=c},"37dd":function(t,e,i){"use strict";var n=i("cac7"),o=i.n(n);i.d(e,"default",(function(){return o.a}))},"5bc0":function(t,e,i){},"7a09":function(t,e,i){"use strict";var n=i("9f5e"),o=i("0af5"),s=i("521b"),r=i("f623"),a=i("9abc"),l=i("9769"),h=i("abb7"),d=i("bb6c"),c=i("b1a2"),u=i("c560"),p=i("5938"),f=i("fd4d"),g=i("1c48"),v=function(t){function e(e,i){t.call(this),this.flatMidpoint_=null,this.flatMidpointRevision_=-1,this.maxDelta_=-1,this.maxDeltaRevision_=-1,void 0===i||Array.isArray(e[0])?this.setCoordinates(e,i):this.setFlatCoordinates(i,e)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.appendCoordinate=function(t){this.flatCoordinates?Object(n["c"])(this.flatCoordinates,t):this.flatCoordinates=t.slice(),this.changed()},e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout)},e.prototype.closestPointXY=function(t,e,i,n){return n<Object(o["e"])(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(Object(l["e"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),Object(l["d"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,t,e,i,n))},e.prototype.forEachSegment=function(t){return Object(f["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)},e.prototype.getCoordinateAtM=function(t,e){if(this.layout!=s["a"].XYM&&this.layout!=s["a"].XYZM)return null;var i=void 0!==e&&e;return Object(c["b"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,i)},e.prototype.getCoordinates=function(){return Object(d["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getCoordinateAt=function(t,e){return Object(c["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e)},e.prototype.getLength=function(){return Object(p["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getFlatMidpoint=function(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_},e.prototype.getSimplifiedGeometryInternal=function(t){var i=[];return i.length=Object(g["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,i,0),new e(i,s["a"].XY)},e.prototype.getType=function(){return r["a"].LINE_STRING},e.prototype.intersectsExtent=function(t){return Object(u["a"])(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=Object(h["b"])(this.flatCoordinates,0,t,this.stride),this.changed()},e}(a["a"]);e["a"]=v},b1a2:function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a}));var n=i("9f5e"),o=i("7fc9");function s(t,e,i,s,r,a){var l=NaN,h=NaN,d=(i-e)/s;if(1===d)l=t[e],h=t[e+1];else if(2==d)l=(1-r)*t[e]+r*t[e+s],h=(1-r)*t[e+1]+r*t[e+s+1];else if(0!==d){for(var c=t[e],u=t[e+1],p=0,f=[0],g=e+s;g<i;g+=s){var v=t[g],y=t[g+1];p+=Math.sqrt((v-c)*(v-c)+(y-u)*(y-u)),f.push(p),c=v,u=y}var m=r*p,O=Object(n["a"])(f,m);if(O<0){var b=(m-f[-O-2])/(f[-O-1]-f[-O-2]),P=e+(-O-2)*s;l=Object(o["c"])(t[P],t[P+s],b),h=Object(o["c"])(t[P+1],t[P+s+1],b)}else l=t[e+O*s],h=t[e+O*s+1]}return a?(a[0]=l,a[1]=h,a):[l,h]}function r(t,e,i,n,s,r){if(i==e)return null;var a;if(s<t[e+n-1])return r?(a=t.slice(e,e+n),a[n-1]=s,a):null;if(t[i-1]<s)return r?(a=t.slice(i-n,i),a[n-1]=s,a):null;if(s==t[e+n-1])return t.slice(e,e+n);var l=e/n,h=i/n;while(l<h){var d=l+h>>1;s<t[(d+1)*n-1]?h=d:l=d+1}var c=t[l*n-1];if(s==c)return t.slice((l-1)*n,(l-1)*n+n);var u=t[(l+1)*n-1],p=(s-c)/(u-c);a=[];for(var f=0;f<n-1;++f)a.push(Object(o["c"])(t[(l-1)*n+f],t[l*n+f],p));return a.push(s),a}function a(t,e,i,n,o,s,a){if(a)return r(t,e,i[i.length-1],n,o,s);var l;if(o<t[n-1])return s?(l=t.slice(0,n),l[n-1]=o,l):null;if(t[t.length-1]<o)return s?(l=t.slice(t.length-n),l[n-1]=o,l):null;for(var h=0,d=i.length;h<d;++h){var c=i[h];if(e!=c){if(o<t[e+n-1])return null;if(o<=t[c-1])return r(t,e,c,n,o,!1);e=c}}return null}},cac7:function(t,e,i){t.exports={map:"TileLayer_map_3o5nI"}},e510:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{class:t.$style["map"],attrs:{id:"map"}}),i("Button",{on:{click:t.addPoint}},[t._v("添加点")]),i("Button",{on:{click:t.removePoint}},[t._v("移除点")]),i("Button",{on:{click:t.addLine}},[t._v("添加线")]),i("Button",{on:{click:t.removeLine}},[t._v("移除线")]),i("Button",{on:{click:t.addPolygon}},[t._v("添加面")]),i("Button",{on:{click:t.removePolygon}},[t._v("移除面")]),i("Button",{on:{click:t.addOverlay}},[t._v("添加Overlay")]),i("Button",{on:{click:t.removeOverlay}},[t._v("移除Overlay")])],1)},o=[],s=i("d4ec"),r=i("bee2"),a=i("a026"),l=(i("5bc0"),i("5eee")),h=i("a2c7"),d=i("4cdf"),c=i("0710"),u=i("6c77"),p=i("ce2c"),f=i("83a6"),g=i("8682"),v=i("256f"),y=i("480c"),m=i("3e6b"),O=i("d0e9"),b=i("5831"),P=i("f403"),T=i("7a09"),_=i("5bc3"),E=function(){function t(){Object(s["a"])(this,t);var e=new y["a"]({source:new O["a"]});this.feature=null,this.source=new b["a"]({wrapX:!0});var i=new m["a"]({source:this.source});this.map=new l["a"]({layers:[e,i],target:"map",view:new h["a"]({center:Object(v["d"])([120.32714457090765,30.30569628128095]),zoom:11})})}return Object(r["a"])(t,[{key:"addPoint",value:function(t){this.clearPoint(),this.point=new d["a"]({geometry:new P["a"](Object(v["d"])(t)),type:"point"});var e=[new u["c"]({image:new p["a"]({fill:new f["a"]({color:"blue"}),stroke:new g["a"]({color:"red",width:1}),radius:5}),zIndex:10})];this.point.setStyle(e),this.source.addFeature(this.point),this.panTo(this.point)}},{key:"clearPoint",value:function(){this.point&&(this.source.removeFeature(this.point),this.point=null)}},{key:"addLine",value:function(t){this.clearLine(),this.line=new d["a"]({geometry:new T["a"](t.map((function(t){return Object(v["d"])(t)}))),type:"line"});var e=[new u["c"]({fill:new f["a"]({color:"blue"}),stroke:new g["a"]({color:"red",width:5}),zIndex:10})];this.line.setStyle(e),this.source.addFeature(this.line),this.panTo(this.line)}},{key:"clearLine",value:function(){this.line&&(this.source.removeFeature(this.line),this.line=null)}},{key:"addPolygon",value:function(t){this.clearPolygon();var e=t.map((function(t){return t.map((function(t){return Object(v["d"])(t)}))}));this.polygon=new d["a"]({geometry:new _["a"](e),type:"polygon"});var i=[new u["c"]({fill:new f["a"]({color:"blue"}),stroke:new g["a"]({color:"red",width:1}),image:new p["a"]({radius:7,fill:new f["a"]({color:"red"})}),zIndex:10})];this.polygon.setStyle(i),this.source.addFeature(this.polygon),this.panTo(this.polygon)}},{key:"clearPolygon",value:function(){this.polygon&&(this.source.removeFeature(this.polygon),this.polygon=null)}},{key:"addOverlay",value:function(t){this.clearOverlay();var e=a["default"].component("my-component",{template:"<div>\n        <img style=\"width: 100px;height: 100px;\" src='https://upload.jianshu.io/users/upload_avatars/13491706/5f94e7d8-78bd-4410-9ecc-21363fbb6148?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120' />\n      </div>"}),i=a["default"].extend(e);this.instance=new i,this.instance.$mount(),this.overlay=new c["a"]({positioning:"bottom-center",element:this.instance.$el,insertFirst:!0,autoPan:!1,offset:[0,-10]}),this.map.addOverlay(this.overlay),this.overlay.setPosition(Object(v["d"])(t)),this.zoomtoCenter(Object(v["d"])(t))}},{key:"clearOverlay",value:function(){this.instance&&this.instance.$destroy(),this.overlay&&(this.map.removeOverlay(this.overlay),this.overlay=null)}},{key:"panTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:17,i=this.map.getView();i.fit(t.getGeometry(),{padding:[0,0,0,0],maxZoom:e})}},{key:"zoomtoCenter",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:18,i=this.map.getView();i.setZoom(e),i.setCenter(t)}}]),t}(),C={name:"TileLayer",data:function(){return{map:null}},mounted:function(){this.initMap()},methods:{initMap:function(){this.map=new E},addPoint:function(){var t=[120,30];this.map.addPoint(t)},removePoint:function(){this.map.clearPoint()},addLine:function(){var t=[[120,30],[121,31]];this.map.addLine(t)},removeLine:function(){this.map.clearLine()},addPolygon:function(){var t=[[[120,30],[120,31],[121,31],[121,30],[120,30]]];this.map.addPolygon(t)},removePolygon:function(){this.map.clearPolygon()},addOverlay:function(){var t=[120,30];this.map.addOverlay(t)},removeOverlay:function(){this.map.clearOverlay()}}},w=C,M=i("37dd"),j=i("2877");function N(t){this["$style"]=M["default"].locals||M["default"]}var R=Object(j["a"])(w,n,o,!1,N,null,null);e["default"]=R.exports}}]);
//# sourceMappingURL=chunk-4a287a7e.deb89666.js.map