<template>
  <div ref="cesium" :class="$style['container']"></div>
</template>

<script>
// import {init} from '@/views/cesium/js/init-cesium.js';
export default {
  mounted() {
    // init(this.$refs.cesium);
    this.init();
  },
  methods: {
    init() {
      const viewer = new Cesium.Viewer(this.$refs.cesium, {
        timeline: false,
        animation: false,
        infoBox: false, // 不展示详细弹窗
      });
      viewer.imageryLayers.addImageryProvider(
        new Cesium.BingMapsImageryProvider({
          url: "https://dev.virtualearth.net",
          mapStyle: Cesium.BingMapsStyle.AERIAL,
          key:
            "AqYgyS1gIIDGsxmOlncqrgA83cHnhClLwZmIJXbYXX36pfxKYtUGk12Q3splaf4Y",
        })
      );
      viewer.scene.camera.flyTo({
        duration: 1, // 飞的过渡动画时间
        destination: Cesium.Cartesian3.fromDegrees(
          120.083767, // 地图经度
          30.235533, // 地图维度
          7000 // 地图高度
        ),
        orientation: {
          // heading: Cesium.Math.toRadians(1000),
          pitch: Cesium.Math.toRadians(-45), // 视角
        },
      });
    },
  },
};
</script>
<style lang="less" module>
.container {
  width: 100%;
  height: 100%;
}
</style>

<style></style>
