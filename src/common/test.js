/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
(function() {
  window.HOST_TYPE = "2";
  window.BMap_loadScriptTime = new Date().getTime();
  document.write(
    '<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=2.0&ak=xfhhaTThl11qYVrqLZii6w8qE5ggnhrY&services=&t=20200327103013"></script>'
  );
})();
!(function(t, e) {
  typeof exports === "object" && typeof module !== "undefined"
    ? e(exports, require("echarts"))
    : typeof define === "function" && define.amd
    ? define(["exports", "echarts"], e)
    : e((t.bmap = {}), t.echarts);
})(this, (t, o) => {
  function l(t, e) {
    (this._bmap = t),
      (this.dimensions = ["lng", "lat"]),
      (this._mapOffset = [0, 0]),
      (this._api = e),
      (this._projection = new BMap.MercatorProjection());
  }
  function n(i, a) {
    return (
      (a = a || [0, 0]),
      o.util.map(
        [0, 1],
        function(t) {
          const e = a[t];
          const o = i[t] / 2;
          const n = [];
          const r = [];
          return (
            (n[t] = e - o),
            (r[t] = e + o),
            (n[1 - t] = r[1 - t] = a[1 - t]),
            Math.abs(this.dataToPoint(n)[t] - this.dataToPoint(r)[t])
          );
        },
        this
      )
    );
  }
  let d;
  (l.prototype.dimensions = ["lng", "lat"]),
    (l.prototype.setZoom = function(t) {
      this._zoom = t;
    }),
    (l.prototype.setCenter = function(t) {
      this._center = this._projection.lngLatToPoint(new BMap.Point(t[0], t[1]));
    }),
    (l.prototype.setMapOffset = function(t) {
      this._mapOffset = t;
    }),
    (l.prototype.getBMap = function() {
      return this._bmap;
    }),
    (l.prototype.dataToPoint = function(t) {
      const e = new BMap.Point(t[0], t[1]);
      const o = this._bmap.pointToOverlayPixel(e);
      const n = this._mapOffset;
      return [o.x - n[0], o.y - n[1]];
    }),
    (l.prototype.pointToData = function(t) {
      const e = this._mapOffset;
      return [
        (t = this._bmap.overlayPixelToPoint({ x: t[0] + e[0], y: t[1] + e[1] }))
          .lng,
        t.lat,
      ];
    }),
    (l.prototype.getViewRect = function() {
      const t = this._api;
      return new o.graphic.BoundingRect(0, 0, t.getWidth(), t.getHeight());
    }),
    (l.prototype.getRoamTransform = function() {
      return o.matrix.create();
    }),
    (l.prototype.prepareCustoms = function(t) {
      const e = this.getViewRect();
      return {
        coordSys: {
          type: "bmap",
          x: e.x,
          y: e.y,
          width: e.width,
          height: e.height,
        },
        api: {
          coord: o.util.bind(this.dataToPoint, this),
          size: o.util.bind(n, this),
        },
      };
    }),
    (l.dimensions = l.prototype.dimensions),
    (l.create = function(t, c) {
      let m;
      const f = c.getDom();
      t.eachComponent("bmap", (t) => {
        const e = c.getZr().painter;
        const o = e.getViewportRoot();
        if (typeof BMap === "undefined")
          throw new Error("BMap api is not loaded");
        if (
          ((d =
            d ||
            (function() {
              function t(t) {
                this._root = t;
              }
              return (
                ((t.prototype = new BMap.Overlay()).initialize = function(t) {
                  return (
                    t.getPanes().labelPane.appendChild(this._root), this._root
                  );
                }),
                (t.prototype.draw = function() {}),
                t
              );
            })()),
          m)
        )
          throw new Error("Only one bmap component can exist");
        if (!t.__bmap) {
          let n = f.querySelector(".ec-extension-bmap");
          n &&
            ((o.style.left = "0px"), (o.style.top = "0px"), f.removeChild(n)),
            ((n = document.createElement("div")).style.cssText =
              "width:100%;height:100%"),
            n.classList.add("ec-extension-bmap"),
            f.appendChild(n);
          var r = (t.__bmap = new BMap.Map(n));
          const i = new d(o);
          r.addOverlay(i),
            (e.getViewportRootOffset = function() {
              return { offsetLeft: 0, offsetTop: 0 };
            });
        }
        r = t.__bmap;
        const a = t.get("center");
        const p = t.get("zoom");
        if (a && p) {
          const s = new BMap.Point(a[0], a[1]);
          r.centerAndZoom(s, p);
        }
        (m = new l(r, c)).setMapOffset(t.__mapOffset || [0, 0]),
          m.setZoom(p),
          m.setCenter(a),
          (t.coordinateSystem = m);
      }),
        t.eachSeries((t) => {
          t.get("coordinateSystem") === "bmap" && (t.coordinateSystem = m);
        });
    }),
    o.extendComponentModel({
      type: "bmap",
      getBMap() {
        return this.__bmap;
      },
      setCenterAndZoom(t, e) {
        (this.option.center = t), (this.option.zoom = e);
      },
      centerOrZoomChanged(t, e) {
        const o = this.option;
        return !(
          (function(t, e) {
            return t && e && t[0] === e[0] && t[1] === e[1];
          })(t, o.center) && e === o.zoom
        );
      },
      defaultOption: {
        center: [104.114129, 37.550339],
        zoom: 5,
        mapStyle: {},
        mapStyleV2: {},
        roam: !1,
      },
    });
  const p = {
    "[object Function]": 1,
    "[object RegExp]": 1,
    "[object Date]": 1,
    "[object Error]": 1,
    "[object CanvasGradient]": 1,
    "[object CanvasPattern]": 1,
    "[object Image]": 1,
    "[object Canvas]": 1,
  };
  const s = {
    "[object Int8Array]": 1,
    "[object Uint8Array]": 1,
    "[object Uint8ClampedArray]": 1,
    "[object Int16Array]": 1,
    "[object Uint16Array]": 1,
    "[object Int32Array]": 1,
    "[object Uint32Array]": 1,
    "[object Float32Array]": 1,
    "[object Float64Array]": 1,
  };
  const c = Object.prototype.toString;
  function h(t) {
    if (t == null || typeof t !== "object") return t;
    let e = t;
    const o = c.call(t);
    if (o === "[object Array]") {
      if (!m(t)) {
        e = [];
        for (var n = 0, r = t.length; n < r; n++) e[n] = h(t[n]);
      }
    } else if (s[o]) {
      if (!m(t)) {
        const i = t.constructor;
        if (t.constructor.from) e = i.from(t);
        else {
          e = new i(t.length);
          for (n = 0, r = t.length; n < r; n++) e[n] = h(t[n]);
        }
      }
    } else if (
      !p[o] &&
      !m(t) &&
      !(function(t) {
        return (
          typeof t === "object" &&
          typeof t.nodeType === "number" &&
          typeof t.ownerDocument === "object"
        );
      })(t)
    )
      for (const a in ((e = {}), t)) t.hasOwnProperty(a) && (e[a] = h(t[a]));
    return e;
  }
  const e = "__ec_primitive__";
  function m(t) {
    return t[e];
  }
  o.extendComponentView({
    type: "bmap",
    render(r, t, i) {
      function e(t, e) {
        if (!a) {
          const o = p.parentNode.parentNode.parentNode;
          const n = [
            -parseInt(o.style.left, 10) || 0,
            -parseInt(o.style.top, 10) || 0,
          ];
          (p.style.left = `${n[0]}px`),
            (p.style.top = `${n[1]}px`),
            s.setMapOffset(n),
            (r.__mapOffset = n),
            i.dispatchAction({ type: "bmapRoam" });
        }
      }
      var a = !0;
      const o = r.getBMap();
      var p = i.getZr().painter.getViewportRoot();
      var s = r.coordinateSystem;
      function n() {
        a || i.dispatchAction({ type: "bmapRoam" });
      }
      o.removeEventListener("moving", this._oldMoveHandler),
        o.removeEventListener("zoomend", this._oldZoomEndHandler),
        o.addEventListener("moving", e),
        o.addEventListener("zoomend", n),
        (this._oldMoveHandler = e),
        (this._oldZoomEndHandler = n);
      const c = r.get("roam");
      c && c !== "scale" ? o.enableDragging() : o.disableDragging(),
        c && c !== "move"
          ? (o.enableScrollWheelZoom(),
            o.enableDoubleClickZoom(),
            o.enablePinchToZoom())
          : (o.disableScrollWheelZoom(),
            o.disableDoubleClickZoom(),
            o.disablePinchToZoom());
      const m = r.__mapStyle;
      const f = r.get("mapStyle") || {};
      const l = JSON.stringify(f);
      JSON.stringify(m) !== l &&
        (Object.keys(f).length && o.setMapStyle(h(f)),
        (r.__mapStyle = JSON.parse(l)));
      const d = r.__mapStyle2;
      const y = r.get("mapStyleV2") || {};
      const u = JSON.stringify(y);
      JSON.stringify(d) !== u &&
        (Object.keys(y).length && o.setMapStyleV2(h(y)),
        (r.__mapStyle2 = JSON.parse(u))),
        (a = !1);
    },
  }),
    o.registerCoordinateSystem("bmap", l),
    o.registerAction(
      { type: "bmapRoam", event: "bmapRoam", update: "updateLayout" },
      (t, e) => {
        e.eachComponent("bmap", (t) => {
          const e = t.getBMap();
          const o = e.getCenter();
          t.setCenterAndZoom([o.lng, o.lat], e.getZoom());
        });
      }
    );
  t.version = "1.0.0";
});
