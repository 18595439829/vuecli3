import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Style, Circle, Fill } from "ol/style";
import { fromLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import uuid from "uuid";
import Polygon from "ol/geom/Polygon";
import Draw, { createBox } from "ol/interaction/Draw";

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
      freehand: true,  // true: 拖拽画图; false:点击画图
      // geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
    this.draw.on("drawend", (e) => {
      console.log("画完了", e);
      this.feature = e.feature;
      this.remove();
    });
    this.map.addInteraction(this.draw);
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
    return extent;
  }
}
