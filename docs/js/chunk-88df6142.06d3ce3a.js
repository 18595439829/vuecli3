(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-88df6142"],{"089b":function(t,e,i){"use strict";i.d(e,"c",(function(){return l})),i.d(e,"d",(function(){return u})),i.d(e,"a",(function(){return g})),i.d(e,"b",(function(){return _}));var r=i("0414"),o=i("345d"),n=i("0af5"),s=i("3820"),a=i("256f"),c=i("fced"),h=i("78db");function l(t){var e=t.getDefaultTileGrid();return e||(e=f(t),t.setDefaultTileGrid(e)),e}function u(t,e,i){var r=e[0],o=t.getTileCoordCenter(e),s=_(i);if(Object(n["f"])(s,o))return e;var a=Object(n["E"])(s),c=Math.ceil((s[0]-o[0])/a);return o[0]+=a*c,t.getTileCoordForCoordAndZ(o,r)}function p(t,e,i,r){var o=void 0!==r?r:s["a"].TOP_LEFT,a=d(t,e,i);return new h["a"]({extent:t,origin:Object(n["y"])(t,o),resolutions:a,tileSize:i})}function g(t){var e=t||{},i=e.extent||Object(a["e"])("EPSG:3857").getExtent(),r={extent:i,minZoom:e.minZoom,tileSize:e.tileSize,resolutions:d(i,e.maxZoom,e.tileSize)};return new h["a"](r)}function d(t,e,i){for(var s=void 0!==e?e:r["a"],a=Object(n["A"])(t),c=Object(n["E"])(t),h=Object(o["c"])(void 0!==i?i:r["b"]),l=Math.max(c/h[0],a/h[1]),u=s+1,p=new Array(u),g=0;g<u;++g)p[g]=l/Math.pow(2,g);return p}function f(t,e,i,r){var o=_(t);return p(o,e,i,r)}function _(t){t=Object(a["e"])(t);var e=t.getExtent();if(!e){var i=180*a["a"][c["b"].DEGREES]/t.getMetersPerUnit();e=Object(n["k"])(-i,-i,i,i)}return e}},"2c30":function(t,e,i){"use strict";function r(t,e,i,r){return void 0!==r?(r[0]=t,r[1]=e,r[2]=i,r):[t,e,i]}function o(t,e,i){return t+"/"+e+"/"+i}function n(t){return o(t[0],t[1],t[2])}function s(t){return t.split("/").map(Number)}function a(t){return(t[1]<<t[0])+t[2]}function c(t,e){var i=t[0],r=t[1],o=t[2];if(e.getMinZoom()>i||i>e.getMaxZoom())return!1;var n,s=e.getExtent();return n=s?e.getTileRangeForExtentAndZ(s,i):e.getFullTileRange(i),!n||n.containsXY(r,o)}i.d(e,"a",(function(){return r})),i.d(e,"d",(function(){return o})),i.d(e,"c",(function(){return n})),i.d(e,"b",(function(){return s})),i.d(e,"e",(function(){return a})),i.d(e,"f",(function(){return c}))},"2ef1":function(t,e,i){"use strict";var r=i("a504"),o=i("1300"),n=i("acc1"),s=i("ca42"),a=i("0ec0"),c=i("01d4"),h=function(t){function e(e,i,r){t.call(this);var o=r||{};this.tileCoord=e,this.state=i,this.interimTile=null,this.key="",this.transition_=void 0===o.transition?250:o.transition,this.transitionStarts_={}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.changed=function(){this.dispatchEvent(c["a"].CHANGE)},e.prototype.getKey=function(){return this.key+"/"+this.tileCoord},e.prototype.getInterimTile=function(){if(!this.interimTile)return this;var t=this.interimTile;do{if(t.getState()==n["a"].LOADED)return t;t=t.interimTile}while(t);return this},e.prototype.refreshInterimChain=function(){if(this.interimTile){var t=this.interimTile,e=this;do{if(t.getState()==n["a"].LOADED){t.interimTile=null;break}t.getState()==n["a"].LOADING?e=t:t.getState()==n["a"].IDLE?e.interimTile=t.interimTile:e=t,t=e.interimTile}while(t)}},e.prototype.getTileCoord=function(){return this.tileCoord},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t){this.state=t,this.changed()},e.prototype.load=function(){},e.prototype.getAlpha=function(t,e){if(!this.transition_)return 1;var i=this.transitionStarts_[t];if(i){if(-1===i)return 1}else i=e,this.transitionStarts_[t]=i;var r=e-i+1e3/60;return r>=this.transition_?1:Object(s["a"])(r/this.transition_)},e.prototype.inTransition=function(t){return!!this.transition_&&-1!==this.transitionStarts_[t]},e.prototype.endTransition=function(t){this.transition_&&(this.transitionStarts_[t]=-1)},e}(a["a"]),l=h,u=i("0999"),p=i("1e8d"),g=function(t){function e(e,i,r,o,n,s){t.call(this,e,i,s),this.crossOrigin_=o,this.src_=r,this.image_=new Image,null!==o&&(this.image_.crossOrigin=o),this.imageListenerKeys_=null,this.tileLoadFunction_=n}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.disposeInternal=function(){this.state==n["a"].LOADING&&(this.unlistenImage_(),this.image_=d()),this.interimTile&&this.interimTile.dispose(),this.state=n["a"].ABORT,this.changed(),t.prototype.disposeInternal.call(this)},e.prototype.getImage=function(){return this.image_},e.prototype.getKey=function(){return this.src_},e.prototype.handleImageError_=function(){this.state=n["a"].ERROR,this.unlistenImage_(),this.image_=d(),this.changed()},e.prototype.handleImageLoad_=function(){var t=this.image_;t.naturalWidth&&t.naturalHeight?this.state=n["a"].LOADED:this.state=n["a"].EMPTY,this.unlistenImage_(),this.changed()},e.prototype.load=function(){this.state==n["a"].ERROR&&(this.state=n["a"].IDLE,this.image_=new Image,null!==this.crossOrigin_&&(this.image_.crossOrigin=this.crossOrigin_)),this.state==n["a"].IDLE&&(this.state=n["a"].LOADING,this.changed(),this.imageListenerKeys_=[Object(p["b"])(this.image_,c["a"].ERROR,this.handleImageError_,this),Object(p["b"])(this.image_,c["a"].LOAD,this.handleImageLoad_,this)],this.tileLoadFunction_(this,this.src_))},e.prototype.unlistenImage_=function(){this.imageListenerKeys_.forEach(p["e"]),this.imageListenerKeys_=null},e}(l);function d(){var t=Object(u["a"])(1,1);return t.fillStyle="rgba(0,0,0,0)",t.fillRect(0,0,1,1),t.canvas}var f=g,_=i("5116"),b=i("2c30"),j=function(t){function e(e){t.call(this,e)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.expireCache=function(t){while(this.canExpireCache()){var e=this.peekLast(),i=e.tileCoord[0].toString();if(i in t&&t[i].contains(e.tileCoord))break;this.pop().dispose()}},e.prototype.pruneExceptNewestZ=function(){if(0!==this.getCount()){var t=this.peekFirstKey(),e=Object(b["b"])(t),i=e[0];this.forEach((function(t){t.tileCoord[0]!==i&&(this.remove(Object(b["c"])(t.tileCoord)),t.dispose())}),this)}},e}(_["a"]),v=j,y=i("256f"),T=i("0af5"),O=i("7fc9");function m(t,e,i,r){var o=Object(y["i"])(i,e,t),n=Object(y["f"])(e,r,i),s=e.getMetersPerUnit();void 0!==s&&(n*=s);var a=t.getMetersPerUnit();void 0!==a&&(n/=a);var c=t.getExtent();if(!c||Object(T["f"])(c,o)){var h=Object(y["f"])(t,n,o)/n;isFinite(h)&&h>0&&(n/=h)}return n}function E(t,e,i,r){var o=i-t,n=r-e,s=Math.sqrt(o*o+n*n);return[Math.round(i+o/s),Math.round(r+n/s)]}function C(t,e,i,r,o,n,s,a,c,h,l){var p=Object(u["a"])(Math.round(i*t),Math.round(i*e));if(0===c.length)return p.canvas;p.scale(i,i);var g=Object(T["j"])();c.forEach((function(t,e,i){Object(T["q"])(g,t.extent)}));var d=Object(T["E"])(g),f=Object(T["A"])(g),_=Object(u["a"])(Math.round(i*d/r),Math.round(i*f/r)),b=i/r;c.forEach((function(t,e,i){var r=t.extent[0]-g[0],o=-(t.extent[3]-g[3]),n=Object(T["E"])(t.extent),s=Object(T["A"])(t.extent);_.drawImage(t.image,h,h,t.image.width-2*h,t.image.height-2*h,r*b,o*b,n*b,s*b)}));var j=Object(T["C"])(s);return a.getTriangles().forEach((function(t,e,o){var s=t.source,a=t.target,c=s[0][0],h=s[0][1],l=s[1][0],u=s[1][1],d=s[2][0],f=s[2][1],b=(a[0][0]-j[0])/n,v=-(a[0][1]-j[1])/n,y=(a[1][0]-j[0])/n,T=-(a[1][1]-j[1])/n,m=(a[2][0]-j[0])/n,C=-(a[2][1]-j[1])/n,F=c,x=h;c=0,h=0,l-=F,u-=x,d-=F,f-=x;var S=[[l,u,0,0,y-b],[d,f,0,0,m-b],[0,0,l,u,T-v],[0,0,d,f,C-v]],R=Object(O["e"])(S);if(R){p.save(),p.beginPath();var P=(b+y+m)/3,L=(v+T+C)/3,I=E(P,L,b,v),G=E(P,L,y,T),A=E(P,L,m,C);p.moveTo(G[0],G[1]),p.lineTo(I[0],I[1]),p.lineTo(A[0],A[1]),p.clip(),p.transform(R[0],R[2],R[1],R[3],b,v),p.translate(g[0]-F,g[3]-x),p.scale(r/i,-r/i),p.drawImage(_.canvas,0,0),p.restore()}})),l&&(p.save(),p.strokeStyle="black",p.lineWidth=1,a.getTriangles().forEach((function(t,e,i){var r=t.target,o=(r[0][0]-j[0])/n,s=-(r[0][1]-j[1])/n,a=(r[1][0]-j[0])/n,c=-(r[1][1]-j[1])/n,h=(r[2][0]-j[0])/n,l=-(r[2][1]-j[1])/n;p.beginPath(),p.moveTo(a,c),p.lineTo(o,s),p.lineTo(h,l),p.closePath(),p.stroke()})),p.restore()),p.canvas}var F=10,x=.25,S=function(t,e,i,r,o){this.sourceProj_=t,this.targetProj_=e;var n={},s=Object(y["g"])(this.targetProj_,this.sourceProj_);this.transformInv_=function(t){var e=t[0]+"/"+t[1];return n[e]||(n[e]=s(t)),n[e]},this.maxSourceExtent_=r,this.errorThresholdSquared_=o*o,this.triangles_=[],this.wrapsXInSource_=!1,this.canWrapXInSource_=this.sourceProj_.canWrapX()&&!!r&&!!this.sourceProj_.getExtent()&&Object(T["E"])(r)==Object(T["E"])(this.sourceProj_.getExtent()),this.sourceWorldWidth_=this.sourceProj_.getExtent()?Object(T["E"])(this.sourceProj_.getExtent()):null,this.targetWorldWidth_=this.targetProj_.getExtent()?Object(T["E"])(this.targetProj_.getExtent()):null;var a=Object(T["C"])(i),c=Object(T["D"])(i),h=Object(T["w"])(i),l=Object(T["v"])(i),u=this.transformInv_(a),p=this.transformInv_(c),g=this.transformInv_(h),d=this.transformInv_(l);if(this.addQuad_(a,c,h,l,u,p,g,d,F),this.wrapsXInSource_){var f=1/0;this.triangles_.forEach((function(t,e,i){f=Math.min(f,t.source[0][0],t.source[1][0],t.source[2][0])})),this.triangles_.forEach(function(t){if(Math.max(t.source[0][0],t.source[1][0],t.source[2][0])-f>this.sourceWorldWidth_/2){var e=[[t.source[0][0],t.source[0][1]],[t.source[1][0],t.source[1][1]],[t.source[2][0],t.source[2][1]]];e[0][0]-f>this.sourceWorldWidth_/2&&(e[0][0]-=this.sourceWorldWidth_),e[1][0]-f>this.sourceWorldWidth_/2&&(e[1][0]-=this.sourceWorldWidth_),e[2][0]-f>this.sourceWorldWidth_/2&&(e[2][0]-=this.sourceWorldWidth_);var i=Math.min(e[0][0],e[1][0],e[2][0]),r=Math.max(e[0][0],e[1][0],e[2][0]);r-i<this.sourceWorldWidth_/2&&(t.source=e)}}.bind(this))}n={}};S.prototype.addTriangle_=function(t,e,i,r,o,n){this.triangles_.push({source:[r,o,n],target:[t,e,i]})},S.prototype.addQuad_=function(t,e,i,r,o,n,s,a,c){var h=Object(T["b"])([o,n,s,a]),l=this.sourceWorldWidth_?Object(T["E"])(h)/this.sourceWorldWidth_:null,u=this.sourceWorldWidth_,p=this.sourceProj_.canWrapX()&&l>.5&&l<1,g=!1;if(c>0){if(this.targetProj_.isGlobal()&&this.targetWorldWidth_){var d=Object(T["b"])([t,e,i,r]),f=Object(T["E"])(d)/this.targetWorldWidth_;g=f>x||g}!p&&this.sourceProj_.isGlobal()&&l&&(g=l>x||g)}if(g||!this.maxSourceExtent_||Object(T["F"])(h,this.maxSourceExtent_)){if(!g&&(!isFinite(o[0])||!isFinite(o[1])||!isFinite(n[0])||!isFinite(n[1])||!isFinite(s[0])||!isFinite(s[1])||!isFinite(a[0])||!isFinite(a[1]))){if(!(c>0))return;g=!0}if(c>0){if(!g){var _,b=[(t[0]+i[0])/2,(t[1]+i[1])/2],j=this.transformInv_(b);if(p){var v=(Object(O["d"])(o[0],u)+Object(O["d"])(s[0],u))/2;_=v-Object(O["d"])(j[0],u)}else _=(o[0]+s[0])/2-j[0];var y=(o[1]+s[1])/2-j[1],m=_*_+y*y;g=m>this.errorThresholdSquared_}if(g){if(Math.abs(t[0]-i[0])<=Math.abs(t[1]-i[1])){var E=[(e[0]+i[0])/2,(e[1]+i[1])/2],C=this.transformInv_(E),F=[(r[0]+t[0])/2,(r[1]+t[1])/2],S=this.transformInv_(F);this.addQuad_(t,e,E,F,o,n,C,S,c-1),this.addQuad_(F,E,i,r,S,C,s,a,c-1)}else{var R=[(t[0]+e[0])/2,(t[1]+e[1])/2],P=this.transformInv_(R),L=[(i[0]+r[0])/2,(i[1]+r[1])/2],I=this.transformInv_(L);this.addQuad_(t,R,L,r,o,P,I,a,c-1),this.addQuad_(R,e,i,L,P,n,s,I,c-1)}return}}if(p){if(!this.canWrapXInSource_)return;this.wrapsXInSource_=!0}this.addTriangle_(t,i,r,o,s,a),this.addTriangle_(t,e,i,o,n,s)}},S.prototype.calculateSourceExtent=function(){var t=Object(T["j"])();return this.triangles_.forEach((function(e,i,r){var o=e.source;Object(T["r"])(t,o[0]),Object(T["r"])(t,o[1]),Object(T["r"])(t,o[2])})),t},S.prototype.getTriangles=function(){return this.triangles_};var R=S,P=function(t){function e(e,i,o,s,a,c,h,l,u,p,g){t.call(this,a,n["a"].IDLE),this.renderEdges_=void 0!==g&&g,this.pixelRatio_=h,this.gutter_=l,this.canvas_=null,this.sourceTileGrid_=i,this.targetTileGrid_=s,this.wrappedTileCoord_=c||a,this.sourceTiles_=[],this.sourcesListenerKeys_=null,this.sourceZ_=0;var d=s.getTileCoordExtent(this.wrappedTileCoord_),f=this.targetTileGrid_.getExtent(),_=this.sourceTileGrid_.getExtent(),b=f?Object(T["B"])(d,f):d;if(0!==Object(T["u"])(b)){var j=e.getExtent();j&&(_=_?Object(T["B"])(_,j):j);var v=s.getResolution(this.wrappedTileCoord_[0]),y=Object(T["x"])(b),E=m(e,o,y,v);if(!isFinite(E)||E<=0)this.state=n["a"].EMPTY;else{var C=void 0!==p?p:r["b"];if(this.triangulation_=new R(e,o,b,_,E*C),0!==this.triangulation_.getTriangles().length){this.sourceZ_=i.getZForResolution(E);var F=this.triangulation_.calculateSourceExtent();if(_&&(e.canWrapX()?(F[1]=Object(O["a"])(F[1],_[1],_[3]),F[3]=Object(O["a"])(F[3],_[1],_[3])):F=Object(T["B"])(F,_)),Object(T["u"])(F)){for(var x=i.getTileRangeForExtentAndZ(F,this.sourceZ_),S=x.minX;S<=x.maxX;S++)for(var P=x.minY;P<=x.maxY;P++){var L=u(this.sourceZ_,S,P,h);L&&this.sourceTiles_.push(L)}0===this.sourceTiles_.length&&(this.state=n["a"].EMPTY)}else this.state=n["a"].EMPTY}else this.state=n["a"].EMPTY}}else this.state=n["a"].EMPTY}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.disposeInternal=function(){this.state==n["a"].LOADING&&this.unlistenSources_(),t.prototype.disposeInternal.call(this)},e.prototype.getImage=function(){return this.canvas_},e.prototype.reproject_=function(){var t=[];if(this.sourceTiles_.forEach(function(e,i,r){e&&e.getState()==n["a"].LOADED&&t.push({extent:this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),image:e.getImage()})}.bind(this)),this.sourceTiles_.length=0,0===t.length)this.state=n["a"].ERROR;else{var e=this.wrappedTileCoord_[0],i=this.targetTileGrid_.getTileSize(e),r="number"===typeof i?i:i[0],o="number"===typeof i?i:i[1],s=this.targetTileGrid_.getResolution(e),a=this.sourceTileGrid_.getResolution(this.sourceZ_),c=this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);this.canvas_=C(r,o,this.pixelRatio_,a,this.sourceTileGrid_.getExtent(),s,c,this.triangulation_,t,this.gutter_,this.renderEdges_),this.state=n["a"].LOADED}this.changed()},e.prototype.load=function(){if(this.state==n["a"].IDLE){this.state=n["a"].LOADING,this.changed();var t=0;this.sourcesListenerKeys_=[],this.sourceTiles_.forEach(function(e,i,r){var o=e.getState();if(o==n["a"].IDLE||o==n["a"].LOADING){t++;var s=Object(p["a"])(e,c["a"].CHANGE,(function(i){var r=e.getState();r!=n["a"].LOADED&&r!=n["a"].ERROR&&r!=n["a"].EMPTY||(Object(p["e"])(s),t--,0===t&&(this.unlistenSources_(),this.reproject_()))}),this);this.sourcesListenerKeys_.push(s)}}.bind(this)),this.sourceTiles_.forEach((function(t,e,i){var r=t.getState();r==n["a"].IDLE&&t.load()})),0===t&&setTimeout(this.reproject_.bind(this),0)}},e.prototype.unlistenSources_=function(){this.sourcesListenerKeys_.forEach(p["e"]),this.sourcesListenerKeys_=null},e}(l),L=P,I=i("92fa");function G(t,e){var i=/\{z\}/g,r=/\{x\}/g,o=/\{y\}/g,n=/\{-y\}/g;return function(s,a,c){return s?t.replace(i,s[0].toString()).replace(r,s[1].toString()).replace(o,(function(){var t=-s[2]-1;return t.toString()})).replace(n,(function(){var t=s[0],i=e.getFullTileRange(t);Object(I["a"])(i,55);var r=i.getHeight()+s[2];return r.toString()})):void 0}}function A(t,e){for(var i=t.length,r=new Array(i),o=0;o<i;++o)r[o]=G(t[o],e);return z(r)}function z(t){return 1===t.length?t[0]:function(e,i,r){if(e){var o=Object(b["e"])(e),n=Object(O["d"])(o,t.length);return t[n](e,i,r)}}}function w(t,e,i){}function M(t){var e=[],i=/\{([a-z])-([a-z])\}/.exec(t);if(i){var r,o=i[1].charCodeAt(0),n=i[2].charCodeAt(0);for(r=o;r<=n;++r)e.push(t.replace(i[0],String.fromCharCode(r)));return e}if(i=i=/\{(\d+)-(\d+)\}/.exec(t),i){for(var s=parseInt(i[2],10),a=parseInt(i[1],10);a<=s;a++)e.push(t.replace(i[0],a.toString()));return e}return e.push(t),e}var Z=i("cef7"),D=i("345d"),W=i("ff80"),X=i("089b"),k=function(t){function e(e){t.call(this,{attributions:e.attributions,attributionsCollapsible:e.attributionsCollapsible,projection:e.projection,state:e.state,wrapX:e.wrapX}),this.opaque_=void 0!==e.opaque&&e.opaque,this.tilePixelRatio_=void 0!==e.tilePixelRatio?e.tilePixelRatio:1,this.tileGrid=void 0!==e.tileGrid?e.tileGrid:null,this.tileCache=new v(e.cacheSize),this.tmpSize=[0,0],this.key_=e.key||"",this.tileOptions={transition:e.transition}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.canExpireCache=function(){return this.tileCache.canExpireCache()},e.prototype.expireCache=function(t,e){var i=this.getTileCacheForProjection(t);i&&i.expireCache(e)},e.prototype.forEachLoadedTile=function(t,e,i,r){var o=this.getTileCacheForProjection(t);if(!o)return!1;for(var s,a,c,h=!0,l=i.minX;l<=i.maxX;++l)for(var u=i.minY;u<=i.maxY;++u)a=Object(b["d"])(e,l,u),c=!1,o.containsKey(a)&&(s=o.get(a),c=s.getState()===n["a"].LOADED,c&&(c=!1!==r(s))),c||(h=!1);return h},e.prototype.getGutterForProjection=function(t){return 0},e.prototype.getKey=function(){return this.key_},e.prototype.setKey=function(t){this.key_!==t&&(this.key_=t,this.changed())},e.prototype.getOpaque=function(t){return this.opaque_},e.prototype.getResolutions=function(){return this.tileGrid.getResolutions()},e.prototype.getTile=function(t,e,i,r,n){return Object(o["b"])()},e.prototype.getTileGrid=function(){return this.tileGrid},e.prototype.getTileGridForProjection=function(t){return this.tileGrid?this.tileGrid:Object(X["c"])(t)},e.prototype.getTileCacheForProjection=function(t){var e=this.getProjection();return e&&!Object(y["c"])(e,t)?null:this.tileCache},e.prototype.getTilePixelRatio=function(t){return this.tilePixelRatio_},e.prototype.getTilePixelSize=function(t,e,i){var r=this.getTileGridForProjection(i),o=this.getTilePixelRatio(e),n=Object(D["c"])(r.getTileSize(t),this.tmpSize);return 1==o?n:Object(D["b"])(n,o,this.tmpSize)},e.prototype.getTileCoordForTileUrlFunction=function(t,e){var i=void 0!==e?e:this.getProjection(),r=this.getTileGridForProjection(i);return this.getWrapX()&&i.isGlobal()&&(t=Object(X["d"])(r,t,i)),Object(b["f"])(t,r)?t:null},e.prototype.refresh=function(){this.tileCache.clear(),this.changed()},e.prototype.useTile=function(t,e,i,r){},e}(W["a"]),U=function(t){function e(e,i){t.call(this,e),this.tile=i}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Z["a"]),K=k,Y={TILELOADSTART:"tileloadstart",TILELOADEND:"tileloadend",TILELOADERROR:"tileloaderror"},q=function(t){function e(e){t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,opaque:e.opaque,projection:e.projection,state:e.state,tileGrid:e.tileGrid,tilePixelRatio:e.tilePixelRatio,wrapX:e.wrapX,transition:e.transition,key:e.key,attributionsCollapsible:e.attributionsCollapsible}),this.generateTileUrlFunction_=!e.tileUrlFunction,this.tileLoadFunction=e.tileLoadFunction,this.tileUrlFunction=e.tileUrlFunction?e.tileUrlFunction.bind(this):w,this.urls=null,e.urls?this.setUrls(e.urls):e.url&&this.setUrl(e.url),e.tileUrlFunction&&this.setTileUrlFunction(e.tileUrlFunction,this.key_),this.tileLoadingKeys_={}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getTileLoadFunction=function(){return this.tileLoadFunction},e.prototype.getTileUrlFunction=function(){return this.tileUrlFunction},e.prototype.getUrls=function(){return this.urls},e.prototype.handleTileChange=function(t){var e,i=t.target,r=Object(o["c"])(i),s=i.getState();s==n["a"].LOADING?(this.tileLoadingKeys_[r]=!0,e=Y.TILELOADSTART):r in this.tileLoadingKeys_&&(delete this.tileLoadingKeys_[r],e=s==n["a"].ERROR?Y.TILELOADERROR:s==n["a"].LOADED||s==n["a"].ABORT?Y.TILELOADEND:void 0),void 0!=e&&this.dispatchEvent(new U(e,i))},e.prototype.setTileLoadFunction=function(t){this.tileCache.clear(),this.tileLoadFunction=t,this.changed()},e.prototype.setTileUrlFunction=function(t,e){this.tileUrlFunction=t,this.tileCache.pruneExceptNewestZ(),"undefined"!==typeof e?this.setKey(e):this.changed()},e.prototype.setUrl=function(t){var e=this.urls=M(t);this.setUrls(e)},e.prototype.setUrls=function(t){this.urls=t;var e=t.join("\n");this.generateTileUrlFunction_?this.setTileUrlFunction(A(t,this.tileGrid),e):this.setKey(e)},e.prototype.useTile=function(t,e,i){var r=Object(b["d"])(t,e,i);this.tileCache.containsKey(r)&&this.tileCache.get(r)},e}(K),N=q,Q=function(t){function e(e){t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,opaque:e.opaque,projection:e.projection,state:e.state,tileGrid:e.tileGrid,tileLoadFunction:e.tileLoadFunction?e.tileLoadFunction:B,tilePixelRatio:e.tilePixelRatio,tileUrlFunction:e.tileUrlFunction,url:e.url,urls:e.urls,wrapX:e.wrapX,transition:e.transition,key:e.key,attributionsCollapsible:e.attributionsCollapsible}),this.crossOrigin=void 0!==e.crossOrigin?e.crossOrigin:null,this.tileClass=void 0!==e.tileClass?e.tileClass:f,this.tileCacheForProjection={},this.tileGridForProjection={},this.reprojectionErrorThreshold_=e.reprojectionErrorThreshold,this.renderReprojectionEdges_=!1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.canExpireCache=function(){if(!r["a"])return t.prototype.canExpireCache.call(this);if(this.tileCache.canExpireCache())return!0;for(var e in this.tileCacheForProjection)if(this.tileCacheForProjection[e].canExpireCache())return!0;return!1},e.prototype.expireCache=function(e,i){if(r["a"]){var o=this.getTileCacheForProjection(e);for(var n in this.tileCache.expireCache(this.tileCache==o?i:{}),this.tileCacheForProjection){var s=this.tileCacheForProjection[n];s.expireCache(s==o?i:{})}}else t.prototype.expireCache.call(this,e,i)},e.prototype.getGutterForProjection=function(t){return r["a"]&&this.getProjection()&&t&&!Object(y["c"])(this.getProjection(),t)?0:this.getGutter()},e.prototype.getGutter=function(){return 0},e.prototype.getOpaque=function(e){return!(r["a"]&&this.getProjection()&&e&&!Object(y["c"])(this.getProjection(),e))&&t.prototype.getOpaque.call(this,e)},e.prototype.getTileGridForProjection=function(e){if(!r["a"])return t.prototype.getTileGridForProjection.call(this,e);var i=this.getProjection();if(!this.tileGrid||i&&!Object(y["c"])(i,e)){var n=Object(o["c"])(e);return n in this.tileGridForProjection||(this.tileGridForProjection[n]=Object(X["c"])(e)),this.tileGridForProjection[n]}return this.tileGrid},e.prototype.getTileCacheForProjection=function(e){if(!r["a"])return t.prototype.getTileCacheForProjection.call(this,e);var i=this.getProjection();if(!i||Object(y["c"])(i,e))return this.tileCache;var n=Object(o["c"])(e);return n in this.tileCacheForProjection||(this.tileCacheForProjection[n]=new v(this.tileCache.highWaterMark)),this.tileCacheForProjection[n]},e.prototype.createTile_=function(t,e,i,r,o,s){var a=[t,e,i],h=this.getTileCoordForTileUrlFunction(a,o),l=h?this.tileUrlFunction(h,r,o):void 0,u=new this.tileClass(a,void 0!==l?n["a"].IDLE:n["a"].EMPTY,void 0!==l?l:"",this.crossOrigin,this.tileLoadFunction,this.tileOptions);return u.key=s,Object(p["a"])(u,c["a"].CHANGE,this.handleTileChange,this),u},e.prototype.getTile=function(t,e,i,o,n){var s=this.getProjection();if(r["a"]&&s&&n&&!Object(y["c"])(s,n)){var a,c=this.getTileCacheForProjection(n),h=[t,e,i],l=Object(b["c"])(h);c.containsKey(l)&&(a=c.get(l));var u=this.getKey();if(a&&a.key==u)return a;var p=this.getTileGridForProjection(s),g=this.getTileGridForProjection(n),d=this.getTileCoordForTileUrlFunction(h,n),f=new L(s,p,n,g,h,d,this.getTilePixelRatio(o),this.getGutter(),function(t,e,i,r){return this.getTileInternal(t,e,i,r,s)}.bind(this),this.reprojectionErrorThreshold_,this.renderReprojectionEdges_);return f.key=u,a?(f.interimTile=a,f.refreshInterimChain(),c.replace(l,f)):c.set(l,f),f}return this.getTileInternal(t,e,i,o,s||n)},e.prototype.getTileInternal=function(t,e,i,r,o){var s=null,a=Object(b["d"])(t,e,i),c=this.getKey();if(this.tileCache.containsKey(a)){if(s=this.tileCache.get(a),s.key!=c){var h=s;s=this.createTile_(t,e,i,r,o,c),h.getState()==n["a"].IDLE?s.interimTile=h.interimTile:s.interimTile=h,s.refreshInterimChain(),this.tileCache.replace(a,s)}}else s=this.createTile_(t,e,i,r,o,c),this.tileCache.set(a,s);return s},e.prototype.setRenderReprojectionEdges=function(t){if(r["a"]&&this.renderReprojectionEdges_!=t){for(var e in this.renderReprojectionEdges_=t,this.tileCacheForProjection)this.tileCacheForProjection[e].clear();this.changed()}},e.prototype.setTileGridForProjection=function(t,e){if(r["a"]){var i=Object(y["e"])(t);if(i){var n=Object(o["c"])(i);n in this.tileGridForProjection||(this.tileGridForProjection[n]=e)}}},e}(N);function B(t,e){t.getImage().src=e}var H=Q,J=function(t){function e(e){var i=e||{},r=void 0!==i.projection?i.projection:"EPSG:3857",o=void 0!==i.tileGrid?i.tileGrid:Object(X["a"])({extent:Object(X["b"])(r),maxZoom:i.maxZoom,minZoom:i.minZoom,tileSize:i.tileSize});t.call(this,{attributions:i.attributions,cacheSize:i.cacheSize,crossOrigin:i.crossOrigin,opaque:i.opaque,projection:r,reprojectionErrorThreshold:i.reprojectionErrorThreshold,tileGrid:o,tileLoadFunction:i.tileLoadFunction,tilePixelRatio:i.tilePixelRatio,tileUrlFunction:i.tileUrlFunction,url:i.url,urls:i.urls,wrapX:void 0===i.wrapX||i.wrapX,transition:i.transition,attributionsCollapsible:i.attributionsCollapsible})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(H);e["a"]=J},"78db":function(t,e,i){"use strict";var r=i("0414"),o=i("92fa"),n=i("dc07"),s=i("9f5e"),a=i("0af5"),c=i("7fc9"),h=i("345d"),l=i("2c30"),u=[0,0,0],p=function(t){var e;if(this.minZoom=void 0!==t.minZoom?t.minZoom:0,this.resolutions_=t.resolutions,Object(o["a"])(Object(s["e"])(this.resolutions_,(function(t,e){return e-t}),!0),17),!t.origins)for(var i=0,c=this.resolutions_.length-1;i<c;++i)if(e){if(this.resolutions_[i]/this.resolutions_[i+1]!==e){e=void 0;break}}else e=this.resolutions_[i]/this.resolutions_[i+1];this.zoomFactor_=e,this.maxZoom=this.resolutions_.length-1,this.origin_=void 0!==t.origin?t.origin:null,this.origins_=null,void 0!==t.origins&&(this.origins_=t.origins,Object(o["a"])(this.origins_.length==this.resolutions_.length,20));var h=t.extent;void 0===h||this.origin_||this.origins_||(this.origin_=Object(a["C"])(h)),Object(o["a"])(!this.origin_&&this.origins_||this.origin_&&!this.origins_,18),this.tileSizes_=null,void 0!==t.tileSizes&&(this.tileSizes_=t.tileSizes,Object(o["a"])(this.tileSizes_.length==this.resolutions_.length,19)),this.tileSize_=void 0!==t.tileSize?t.tileSize:this.tileSizes_?null:r["b"],Object(o["a"])(!this.tileSize_&&this.tileSizes_||this.tileSize_&&!this.tileSizes_,22),this.extent_=void 0!==h?h:null,this.fullTileRanges_=null,this.tmpSize_=[0,0],void 0!==t.sizes?this.fullTileRanges_=t.sizes.map((function(t,e){var i=new n["b"](Math.min(0,t[0]),Math.max(t[0]-1,-1),Math.min(0,t[1]),Math.max(t[1]-1,-1));return i}),this):h&&this.calculateTileRanges_(h)};p.prototype.forEachTileCoord=function(t,e,i){for(var r=this.getTileRangeForExtentAndZ(t,e),o=r.minX,n=r.maxX;o<=n;++o)for(var s=r.minY,a=r.maxY;s<=a;++s)i([e,o,s])},p.prototype.forEachTileCoordParentTileRange=function(t,e,i,r,o){var s,a,c,h=null,l=t[0]-1;2===this.zoomFactor_?(a=t[1],c=t[2]):h=this.getTileCoordExtent(t,o);while(l>=this.minZoom){if(2===this.zoomFactor_?(a=Math.floor(a/2),c=Math.floor(c/2),s=Object(n["a"])(a,a,c,c,r)):s=this.getTileRangeForExtentAndZ(h,l,r),e.call(i,l,s))return!0;--l}return!1},p.prototype.getExtent=function(){return this.extent_},p.prototype.getMaxZoom=function(){return this.maxZoom},p.prototype.getMinZoom=function(){return this.minZoom},p.prototype.getOrigin=function(t){return this.origin_?this.origin_:this.origins_[t]},p.prototype.getResolution=function(t){return this.resolutions_[t]},p.prototype.getResolutions=function(){return this.resolutions_},p.prototype.getTileCoordChildTileRange=function(t,e,i){if(t[0]<this.maxZoom){if(2===this.zoomFactor_){var r=2*t[1],o=2*t[2];return Object(n["a"])(r,r+1,o,o+1,e)}var s=this.getTileCoordExtent(t,i);return this.getTileRangeForExtentAndZ(s,t[0]+1,e)}return null},p.prototype.getTileRangeExtent=function(t,e,i){var r=this.getOrigin(t),o=this.getResolution(t),n=Object(h["c"])(this.getTileSize(t),this.tmpSize_),s=r[0]+e.minX*n[0]*o,c=r[0]+(e.maxX+1)*n[0]*o,l=r[1]+e.minY*n[1]*o,u=r[1]+(e.maxY+1)*n[1]*o;return Object(a["k"])(s,l,c,u,i)},p.prototype.getTileRangeForExtentAndZ=function(t,e,i){var r=u;this.getTileCoordForXYAndZ_(t[0],t[1],e,!1,r);var o=r[1],s=r[2];return this.getTileCoordForXYAndZ_(t[2],t[3],e,!0,r),Object(n["a"])(o,r[1],s,r[2],i)},p.prototype.getTileCoordCenter=function(t){var e=this.getOrigin(t[0]),i=this.getResolution(t[0]),r=Object(h["c"])(this.getTileSize(t[0]),this.tmpSize_);return[e[0]+(t[1]+.5)*r[0]*i,e[1]+(t[2]+.5)*r[1]*i]},p.prototype.getTileCoordExtent=function(t,e){var i=this.getOrigin(t[0]),r=this.getResolution(t[0]),o=Object(h["c"])(this.getTileSize(t[0]),this.tmpSize_),n=i[0]+t[1]*o[0]*r,s=i[1]+t[2]*o[1]*r,c=n+o[0]*r,l=s+o[1]*r;return Object(a["k"])(n,s,c,l,e)},p.prototype.getTileCoordForCoordAndResolution=function(t,e,i){return this.getTileCoordForXYAndResolution_(t[0],t[1],e,!1,i)},p.prototype.getTileCoordForXYAndResolution_=function(t,e,i,r,o){var n=this.getZForResolution(i),s=i/this.getResolution(n),a=this.getOrigin(n),c=Object(h["c"])(this.getTileSize(n),this.tmpSize_),u=r?.5:0,p=r?0:.5,g=Math.floor((t-a[0])/i+u),d=Math.floor((e-a[1])/i+p),f=s*g/c[0],_=s*d/c[1];return r?(f=Math.ceil(f)-1,_=Math.ceil(_)-1):(f=Math.floor(f),_=Math.floor(_)),Object(l["a"])(n,f,_,o)},p.prototype.getTileCoordForXYAndZ_=function(t,e,i,r,o){var n=this.getOrigin(i),s=this.getResolution(i),a=Object(h["c"])(this.getTileSize(i),this.tmpSize_),c=r?.5:0,u=r?0:.5,p=Math.floor((t-n[0])/s+c),g=Math.floor((e-n[1])/s+u),d=p/a[0],f=g/a[1];return r?(d=Math.ceil(d)-1,f=Math.ceil(f)-1):(d=Math.floor(d),f=Math.floor(f)),Object(l["a"])(i,d,f,o)},p.prototype.getTileCoordForCoordAndZ=function(t,e,i){return this.getTileCoordForXYAndZ_(t[0],t[1],e,!1,i)},p.prototype.getTileCoordResolution=function(t){return this.resolutions_[t[0]]},p.prototype.getTileSize=function(t){return this.tileSize_?this.tileSize_:this.tileSizes_[t]},p.prototype.getFullTileRange=function(t){return this.fullTileRanges_?this.fullTileRanges_[t]:null},p.prototype.getZForResolution=function(t,e){var i=Object(s["f"])(this.resolutions_,t,e||0);return Object(c["a"])(i,this.minZoom,this.maxZoom)},p.prototype.calculateTileRanges_=function(t){for(var e=this.resolutions_.length,i=new Array(e),r=this.minZoom;r<e;++r)i[r]=this.getTileRangeForExtentAndZ(t,r);this.fullTileRanges_=i},e["a"]=p},d0e9:function(t,e,i){"use strict";var r=i("2ef1"),o='&#169; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',n=function(t){function e(e){var i,r=e||{};i=void 0!==r.attributions?r.attributions:[o];var n=void 0!==r.crossOrigin?r.crossOrigin:"anonymous",s=void 0!==r.url?r.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";t.call(this,{attributions:i,cacheSize:r.cacheSize,crossOrigin:n,opaque:void 0===r.opaque||r.opaque,maxZoom:void 0!==r.maxZoom?r.maxZoom:19,reprojectionErrorThreshold:r.reprojectionErrorThreshold,tileLoadFunction:r.tileLoadFunction,url:s,wrapX:r.wrapX,attributionsCollapsible:!1})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(r["a"]);e["a"]=n},ff80:function(t,e,i){"use strict";var r=i("1300"),o=i("e269"),n=i("256f"),s=i("6d83"),a=function(t){function e(e){t.call(this),this.projection_=Object(n["e"])(e.projection),this.attributions_=c(e.attributions),this.attributionsCollapsible_=void 0===e.attributionsCollapsible||e.attributionsCollapsible,this.loading=!1,this.state_=void 0!==e.state?e.state:s["a"].READY,this.wrapX_=void 0!==e.wrapX&&e.wrapX}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getAttributions=function(){return this.attributions_},e.prototype.getAttributionsCollapsible=function(){return this.attributionsCollapsible_},e.prototype.getProjection=function(){return this.projection_},e.prototype.getResolutions=function(){return Object(r["b"])()},e.prototype.getState=function(){return this.state_},e.prototype.getWrapX=function(){return this.wrapX_},e.prototype.refresh=function(){this.changed()},e.prototype.setAttributions=function(t){this.attributions_=c(t),this.changed()},e.prototype.setState=function(t){this.state_=t,this.changed()},e}(o["a"]);function c(t){return t?Array.isArray(t)?function(e){return t}:"function"===typeof t?t:function(e){return[t]}:null}e["a"]=a}}]);
//# sourceMappingURL=chunk-88df6142.06d3ce3a.js.map