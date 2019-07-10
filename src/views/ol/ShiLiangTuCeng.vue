<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <div id="info">&nbsp;</div>
    <div ref="kaola" :class="$style['kaola']">
      <img :src="imgurl" alt="">
    </div>
  </div>
</template>
<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import Overlay from 'ol/Overlay.js';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat, transform } from "ol/proj.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Stroke, Style, Text } from "ol/style.js";

import imgurl from '@/assets/img/Koala.jpg';

export default {
  name: "ShiLiangTuCeng",
  data() {
    return {
      map: null,
      imgurl,
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
      this.map.on("rendercomplete", evt => {
        console.log(evt);
        // if (evt.dragging) {
        //   return;
        // }
        // 获取鼠标的像素点位
        // let pixel = this.map.getEventPixel(evt.originalEvent);
        // this.displayFeatureInfo(pixel);
      });

      this.map.on("click", evt => {
        let xy = this.map.getCoordinateFromPixel(evt.pixel)
        console.log(evt, xy, fromLonLat(xy));
        // this.displayFeatureInfo(evt.pixel);
      });
    });
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          // center: fromLonLat([120.15, 30.28]),
          center: [13379936.9339429, 3528007.173944956],
          zoom: 18
        }),
        controls: []
      });
      let layerXYZ = new TileLayer({
        source: new XYZ()
      });
      this.map.addLayer(layerXYZ);
       let marker = new Overlay({
        position: [13379936.9339429, 3528007.173944956],
        positioning: 'center-center',
        element: this.$refs.kaola,
        stopEvent: false
      });
      this.map.addOverlay(marker)
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
.kaola {
  width: 100px;
  &  > img {
    width: 100%;
  } 
}
</style>
