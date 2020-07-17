import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature.js";
import { Style, Circle, Icon, Fill, Stroke } from "ol/style";
import { fromLonLat, toLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import uuid from "uuid";
import Draw, { createBox } from "ol/interaction/Draw";

import { LineString, Point, Polygon } from "ol/geom";

import Arrow from '@/assets/logo.png';

export default class DrawLayer {
  constructor() {
    // 底图图层
    const raster = new TileLayer({
      source: new OSM(),
    });
    this.feature = null;
    this.source = new VectorSource({ wrapX: true });
    // 画图图层
    this.drawLayer = new VectorLayer({
      source: this.source,
      //   style: [
      //     new Style({
      //       image: new Circle({
      //         radius: 10,
      //         fill: new Fill({
      //           color: "#003ade",
      //         }),
      //       }),
      //     }),
      //   ],
    });
    this.map = new Map({
      layers: [raster, this.drawLayer],
      target: "map",
      view: new View({
        center: fromLonLat([120.32714457090765, 30.30569628128095]),
        zoom: 11,
      }),
    });
    this.map.on("dblclick", (e) => {
      console.log("双击666", e);
      if (this.draw.getActive()) {
        this.remove();
      }
    });
  }
  add() {
    this.clear();
    this.draw = new Draw({
      id: uuid(),
      source: this.source,
      type: "Polygon", // Circle: 所画图形为圆形 Polygon: 所画图形多边形
      //   style: [
      //     new Style({
      //       image: new Circle({
      //         radius: 10,
      //         fill: new Fill({
      //           color: "#003ade",
      //         }),
      //       }),
      //     }),
      //   ],
      freehand: true, // true: 拖拽画图; false:点击画图
      // geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
    this.draw.on("drawend", (e) => {
      console.log("画完了", e);
      this.feature = e.feature;
      this.remove();
    });
    this.map.addInteraction(this.draw);
  }
  addPoint(arr) {
    this.clearPoint();
    let Features = [];
    let style = [new Style({
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
    })
  ];
    arr.forEach((item) => {
      let point = new Feature({
        geometry: new Point(fromLonLat(item)),
        type: "point",
      });
      point.setStyle(style);
      Features.push(point);
    });
    this.panTo(Features[0]);
    this.source.addFeatures(Features);
  }
  clearPoint() {
    let feats = this.source.getFeatures();
    feats.forEach((item) => {
      if (item.get("type") === "point") {
        this.source.removeFeature(item);
      }
    });
  }
  setStyle([start, end]) {
    console.log(start, end)
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    var rotation = Math.atan2(dy, dx);
    let style = [
      new Style({
        // 描边
        stroke: new Stroke({
          color: "#ffcc33",
          width: 5,
        }),
      }),
      new Style({
        geometry: new Point(fromLonLat([end[0] - dx / 2, end[1] - dy / 2])),
        image: new Icon({
          src: Arrow,
          // size: [50, 50],
          scale: 0.1,
          // anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        }),
        zIndex: 1000,
      })
    ]
    return style;
  }
  addLine(arr) {
    this.clearLine();
    let Features = [];
    arr.forEach((item) => {
      let line = new Feature({
        geometry: new LineString(item.map(cood => {
          return fromLonLat(cood)
        })),
        type: "line",
      });
      line.setStyle(this.setStyle(item));
      Features.push(line);
    });
    this.source.addFeatures(Features);
  }
  clearLine() {
    let feats = this.source.getFeatures();
    feats.forEach((item) => {
      if (item.get("type") === "line") {
        this.source.removeFeature(item);
      }
    });
  }
  remove() {
    this.map.removeInteraction(this.draw);
  }
  clear() {
    if (!this.draw || !this.feature) {
      return;
    }
    this.drawLayer.getSource().removeFeature(this.feature);
    this.feature = null;
  }

  // 获取选中区域元素
  get() {
    if (!this.feature) {
      return null;
    }
    const polygon = this.feature.getGeometry();
    console.log("polygon", polygon);
    const extent = polygon.getExtent();
    const [left, bottom] = toLonLat([extent[0], extent[1]]);
    const [right, top] = toLonLat([extent[2], extent[3]])
    return [left, bottom, right, top];
  }

  panTo(feature, maxZoom = 17) {
    const view = this.map.getView();
    view.fit(feature.getGeometry(), {
      padding: [0, 0, 0, 0],
      maxZoom,
    });
  }
}
