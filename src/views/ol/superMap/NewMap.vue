<template>
  <div id="map"></div>
</template>

<script>
import SuperMap from "./map.js";
export default {
  name: "superMap",
  mounted() {
    new SuperMap();
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
