<template>
  <div>
    <div id="map" :class="$style['map']"></div>
  </div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import KML from "ol/format/KML";
import GeoJSON from 'ol/format/GeoJSON.js';
import { Heatmap as HeatmapLayer, Tile as TileLayer } from "ol/layer";
import Stamen from "ol/source/Stamen";
import VectorSource from "ol/source/Vector";

export default {
  name: "TileLayer",
  data() {
    return {
      map: null,
      // 热力图假数据
      heatData: {
        type: 'FeatureCollection',
        features: [
          { type: 'Point', coordinates: [120.10878812064284, 30.214101248758016], count: 100 },
          { type: 'Point', coordinates: [120.06299060438137, 30.223642397979155], count: 19 },
          { type: 'Point', coordinates: [120.01623897319779, 30.354356142308763], count: 419 },
          { type: 'Point', coordinates: [20.32714457090765, 30.30569628128095], count: 319 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 719 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 519 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 319 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 139 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 129 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 190 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 189 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 1 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 119 },
          { type: 'Point', coordinates: [120.32714457090765, 30.30569628128095], count: 200 },
          { type: 'Point', coordinates: [120.11642104001974, 30.204560099536877], count: 300 },
        ],
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const vector = new HeatmapLayer({
        // 矢量数据源
        source: new VectorSource({
          features: new GeoJSON().readFeatures(this.heatData),
        }),
        blur: 1, // 模糊尺寸
        radius: 10, // 热点半径
      });
      const raster = new TileLayer({
        source: new Stamen({
          layer: "toner"
        })
      });
      this.map = new Map({
        layers: [raster, vector],
        target: "map",
        view: new View({
          center: [0, 0],
          zoom: 11
        })
      });
    }
  }
};
</script>

<style lang="less" module>
.map {
  width: 100%;
  height: 500px;
}
</style>
