<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <hr />
    <div id="mapOSM" :class="$style['map']"></div>
  </div>
</template>
<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj.js";
export default {
  name: "Test",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
    this.initOSM();
  },
  methods: {
    initMap() {
      new Map({
        target: "map",
        controls: [],
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            })
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
    },
    initOSM() {
     new Map({
        target: "mapOSM",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([120.15, 30.28]),
          zoom: 10
        }),
        controls: []
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
