import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM.js";
import Point from "ol/geom/Point.js";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature.js";
import { fromLonLat } from "ol/proj.js";
import { Heatmap as HeatmapLayer, Tile as TileLayer } from "ol/layer";

export default class Heat {
  constructor() {
    const raster = new TileLayer({
      source: new OSM(),
    });
    this.map = new Map({
      layers: [raster],
      target: "map",
      view: new View({
        center: fromLonLat([120.32714457090765, 30.30569628128095]),
        zoom: 11,
      }),
    });
  }
  add(heatData) {
    let source = new VectorSource();
    heatData.features.forEach((item) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(item.coordinates)),
        weight: item.weight,
      });
      source.addFeature(feature);
    });
    this.heatLayer = new HeatmapLayer({
      // 矢量数据源
      source,
      blur: 10, // 模糊尺寸
      radius: 10, // 热点半径
      weight(feature) {
        const weight = feature.get("weight");
        const magnitude = weight / 1;
        return magnitude;
      },
    });
    this.map.addLayer(this.heatLayer);
  }
  clear() {
    this.map.removeLayer(this.heatLayer);
  }
}
