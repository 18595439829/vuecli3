<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <Button @click="addPoint">添加点</Button>
    <Button @click="removePoint">移除点</Button>
    <Button @click="addLine">添加线</Button>
    <Button @click="removeLine">移除线</Button>
    <Button @click="addPolygon">添加面</Button>
    <Button @click="removePolygon">移除面</Button>
    <Button @click="addOverlay">添加Overlay</Button>
    <Button @click="removeOverlay">移除Overlay</Button>
  </div>
</template>
<script>
import Map from "./js/add-feature.js";

export default {
  name: "TileLayer",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map();
    },
    addPoint() {
      let point = [120, 30];
      this.map.addPoint(point);
    },
    removePoint() {
      this.map.clearPoint();
    },
    addLine() {
      let line = [
        [120, 30],
        [121, 31],
      ];
      this.map.addLine(line);
    },
    removeLine() {
      this.map.clearLine();
    },
    addPolygon() {
      let polygon = [
        [
          [120, 30],
          [120, 31],
          [121, 31],
          [121, 30],
          [120, 30],
        ],
      ];
      this.map.addPolygon(polygon);
    },
    removePolygon() {
      this.map.clearPolygon();
    },
    addOverlay() {
      let coord = [120,30];
      this.map.addOverlay(coord)
    },
    removeOverlay() {
      this.map.clearOverlay()
    }
  },
};
</script>

<style lang="less" module>
.map {
  width: 100%;
  height: 500px;
}
</style>
