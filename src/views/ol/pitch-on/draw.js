import 'ol/ol.css';
import { toLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Draw, { createBox } from 'ol/interaction/Draw';

export default class DrawLayer {
  static getInstance(map) {
    if (!this.instance) {
      this.instance = new DrawLayer(map);
    }
    return this.instance;
  }

  constructor(map) {
    this.feature = null;
    this.source = new VectorSource({ wrapX: true });
    // 画图图层
    this.drawLayer = new VectorLayer({
      source: this.source,
    });
    this.map = map;
    this.map.addLayer(this.drawLayer);
    this.draw = new Draw({
      id: Math.random(),
      source: this.source,
      type: 'Point', // Point: 画点 Circle: 所画图形为圆形 Polygon: 所画图形多边形
      freehand: true, // true: 拖拽画图; false:点击画图
      // geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
  }

  add(type) {
    // this.clear();
    this.remove();
    switch (type) {
      case 0:
        this.addPoint();
        break;
      case 1:
        this.addSquair();
        break;
      case 2:
        this.addPolygon();
        break;
      default:
        break;
    }
  }

  addPoint() {
    this.draw = new Draw({
      id: Math.random(),
      source: this.source,
      type: 'Point', // Point: 画点 Circle: 所画图形为圆形 Polygon: 所画图形多边形
      freehand: true, // true: 拖拽画图; false:点击画图
      // geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
    this.map.addInteraction(this.draw);
    this.draw.on('drawend', (e) => {
      console.log('画完了', e);
      this.clear();
      this.feature = e.feature;
      // this.remove();
    });
  }

  addSquair() {
    this.draw = new Draw({
      id: Math.random(),
      source: this.source,
      type: 'Circle', // Point: 画点 Circle: 所画图形为圆形 Polygon: 所画图形多边形
      freehand: true, // true: 拖拽画图; false:点击画图
      geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
    this.map.addInteraction(this.draw);
    this.draw.on('drawend', (e) => {
      console.log('画完了', e);
      this.clear();
      this.feature = e.feature;
      // this.remove();
    });
  }

  addPolygon() {
    this.draw = new Draw({
      id: Math.random(),
      source: this.source,
      type: 'Polygon', // Point: 画点 Circle: 所画图形为圆形 Polygon: 所画图形多边形
      freehand: true, // true: 拖拽画图; false:点击画图
      // geometryFunction: createBox(), // 当type为"Circle"时,不添加该参数为画圆,添加该参数为画方
    });
    this.map.addInteraction(this.draw);
    this.draw.on('drawend', (e) => {
      console.log('画完了', e);
      this.clear();
      this.feature = e.feature;
      // this.remove();
    });
  }

  clear() {
    if (!this.draw || !this.feature) {
      return;
    }
    this.drawLayer.getSource().removeFeature(this.feature);
    this.feature = null;
  }

  remove() {
    this.map.removeInteraction(this.draw);
  }

  // 获取选中区域元素
  get() {
    if (!this.feature) {
      return null;
    }
    const polygon = this.feature.getGeometry();
    console.log('polygon', polygon);
    const extent = polygon.getExtent();
    const [left, bottom] = toLonLat([extent[0], extent[1]]);
    const [right, top] = toLonLat([extent[2], extent[3]]);
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
