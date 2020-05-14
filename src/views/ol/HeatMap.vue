<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <Button @click="add">添加热力图</Button>
    <Button @click="clear">清除热力图</Button>
  </div>
</template>
<script>
import HeatMap from "@/views/ol/js/heatMap.js";

export default {
  name: "HeatMap",
  data() {
    return {
      heatMap: null,
      // 热力图假数据
      heatData: {
        type: "FeatureCollection",
        features: [
          {
            type: "Point",
            coordinates: [120.10878812064284, 30.214101248758016],
            weight: 100,
          },
          {
            type: "Point",
            coordinates: [120.06299060438137, 30.223642397979155],
            weight: 19,
          },
          {
            type: "Point",
            coordinates: [120.01623897319779, 30.354356142308763],
            weight: 419,
          },
          {
            type: "Point",
            coordinates: [20.32714457090765, 30.30569628128095],
            weight: 319,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 719,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 519,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 319,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 139,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 129,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 190,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 189,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 1,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 119,
          },
          {
            type: "Point",
            coordinates: [120.32714457090765, 30.30569628128095],
            weight: 200,
          },
          {
            type: "Point",
            coordinates: [120.11642104001974, 30.204560099536877],
            weight: 300,
          },
        ],
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.heatMap = new HeatMap();
    },
    add() {
      this.heatMap.add(this.heatData);
    },
    clear() {
      this.heatMap.clear();
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
