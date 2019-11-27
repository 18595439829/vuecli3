<template>
  <div>
    <Button @click="addTileLayer">添加TileLayer</Button>
    <div id="map" :class="$style['map']"></div>
  </div>
</template>
<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import Overlay from "ol/Overlay.js";
import TileLayer from "ol/layer/Tile";
import { OSM, TileArcGISRest } from "ol/source";

export default {
  name: "TileLayer",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        target: "map",
        view: new View({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });
    },
    addTileLayer() {
      let url =
        "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/" +
        "Specialty/ESRI_StateCityHighway_USA/MapServer";
      let layer = [
        new TileLayer({
          source: new OSM()
        }),
        new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileArcGISRest({
            url: url
          })
        })
      ];
      this.map.addLayer(layer);
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
