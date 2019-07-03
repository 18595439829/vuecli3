<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <div id="info">&nbsp;</div>
  </div>
</template>
<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Stroke, Style, Text } from "ol/style.js";
export default {
  name: "ShiLiangTuCeng",
  data() {
    return {
      map: null,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.6)"
        }),
        stroke: new Stroke({
          color: "#319FD3",
          width: 1
        }),
        text: new Text({
          font: "12px Calibri,sans-serif",
          fill: new Fill({
            color: "#000"
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 3
          })
        })
      }),
      highlightStyle: new Style({
        stroke: new Stroke({
          color: "#f00",
          width: 1
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.1)"
        }),
        text: new Text({
          font: "12px Calibri,sans-serif",
          fill: new Fill({
            color: "#000"
          }),
          stroke: new Stroke({
            color: "#f00",
            width: 3
          })
        })
      }),
      vectorLayer: new VectorLayer({
        source: new VectorSource({
          url: "data/geojson/countries.geojson",
          format: new GeoJSON()
        }),
        style: feature => {
          this.style.getText().setText(feature.get("name"));
          return style;
        }
      }),
      featureOverlay: new VectorLayer({
        source: new VectorSource(),
        map: this.map,
        style: feature => {
          this.highlightStyle.getText().setText(feature.get("name"));
          return highlightStyle;
        }
      }),
      highlight: null,
      map: null
    };
  },
  mounted() {
    this.initMap();
    this.$nextTick(() => {
      this.map.on("pointermove", evt => {
        // console.log(evt);
        if (evt.dragging) {
          return;
        }
        // 获取鼠标的像素点位
        let pixel = this.map.getEventPixel(evt.originalEvent);
        this.displayFeatureInfo(pixel);
      });

      this.map.on("click", evt => {
          console.log(evt)
        this.displayFeatureInfo(evt.pixel);
      });
    });
  },
  methods: {
    initMap() {
      let map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([120.15, 30.28]),
          zoom: 5
        }),
        controls: []
      });
      this.map = map;
    },
    displayFeatureInfo(pixel) {
      let feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {  
        return feature;
      });
      let info = document.getElementById("info");
      if (feature) {
        info.innerHTML = feature.getId() + ": " + feature.get("name");
      } else {
        info.innerHTML = "&nbsp;";
      }

      if (feature !== this.highlight) {
        if (this.highlight) {
          this.featureOverlay.getSource().removeFeature(this.highlight);
        }
        if (feature) {
          this.featureOverlay.getSource().addFeature(feature);
        }
        this.highlight = feature;
      }
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
