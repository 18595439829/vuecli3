import Vue from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature.js";
import Overlay from "ol/Overlay.js";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { fromLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { LineString, Point, Polygon } from "ol/geom";

export default class MAP {
  constructor() {
    // 底图图层
    const raster = new TileLayer({
      source: new OSM(),
    });
    this.feature = null;
    this.source = new VectorSource({ wrapX: true });
    // 放置feature的图层
    const layer = new VectorLayer({
      source: this.source,
    });
    this.map = new Map({
      layers: [raster, layer],
      target: "map",
      view: new View({
        center: fromLonLat([120.32714457090765, 30.30569628128095]),
        zoom: 11,
      }),
    });
  }

  addPoint(item) {
    // item = [120,30]
    this.clearPoint();
    this.point = new Feature({
      geometry: new Point(fromLonLat(item)),
      type: "point",
    });
    let style = [
      new Style({
        image: new Circle({
          // 填充
          fill: new Fill({
            color: "blue",
          }),
          // 描边
          stroke: new Stroke({
            color: "red",
            width: 1,
          }),
          radius: 5,
        }),
        zIndex: 10,
      }),
    ];
    this.point.setStyle(style);
    this.source.addFeature(this.point);
    this.panTo(this.point);
  }
  clearPoint() {
    if (this.point) {
      this.source.removeFeature(this.point);
      this.point = null;
    }
  }
  addLine(item) {
    //item = [[120,30],[121,31]]
    this.clearLine();
    this.line = new Feature({
      geometry: new LineString(
        item.map((cood) => {
          return fromLonLat(cood);
        })
      ),
      type: "line",
    });
    let style = [
      new Style({
        fill: new Fill({
          color: "blue",
        }),
        // 描边
        stroke: new Stroke({
          color: "red",
          width: 5,
        }),
        zIndex: 10,
      }),
    ];
    this.line.setStyle(style);
    this.source.addFeature(this.line);
    this.panTo(this.line);
  }
  clearLine() {
    if (this.line) {
      this.source.removeFeature(this.line);
      this.line = null;
    }
  }
  addPolygon(item) {
    // item = [
    //   [[120,30],[120,31],[121,31],[120,31],[120,30]]
    // ]
    this.clearPolygon();
    let coords = item.map((cood) => {
      return cood.map((coord) => {
        return fromLonLat(coord);
      });
    });
    this.polygon = new Feature({
      geometry: new Polygon(coords),
      type: "polygon",
    });
    let style = [
      new Style({
        fill: new Fill({
          color: "blue",
        }),
        // 描边
        stroke: new Stroke({
          color: "red",
          width: 1,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: "red",
          }),
        }),
        zIndex: 10,
      }),
    ];
    this.polygon.setStyle(style);
    this.source.addFeature(this.polygon);
    this.panTo(this.polygon);
  }
  clearPolygon() {
    if (this.polygon) {
      this.source.removeFeature(this.polygon);
      this.polygon = null;
    }
  }
  addOverlay(coord) {
    // coord = [120,30]
    this.clearOverlay();
    let MyComponent = Vue.component("my-component", {
      template: `<div>
        <img style="width: 100px;height: 100px;" src='https://upload.jianshu.io/users/upload_avatars/13491706/5f94e7d8-78bd-4410-9ecc-21363fbb6148?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120' />
      </div>`,
    });
    const ComponentCtor = Vue.extend(MyComponent);
    this.instance = new ComponentCtor();
    this.instance.$mount();
    this.overlay = new Overlay({
      positioning: "bottom-center",
      element: this.instance.$el,
      insertFirst: true,
      autoPan: false,
      offset: [0, -10],
    });
    this.map.addOverlay(this.overlay);
    this.overlay.setPosition(fromLonLat(coord));
    this.zoomtoCenter(fromLonLat(coord));
  }
  clearOverlay() {
    if (this.instance) {
      this.instance.$destroy();
    }
    if (this.overlay) {
      this.map.removeOverlay(this.overlay);
      this.overlay = null;
    }
  }
  panTo(feature, maxZoom = 17) {
    const view = this.map.getView();
    view.fit(feature.getGeometry(), {
      padding: [0, 0, 0, 0],
      maxZoom,
    });
  }
  zoomtoCenter(coord, zoom = 18) {
    const view = this.map.getView();
    view.setZoom(zoom);
    view.setCenter(coord);
  }
}
