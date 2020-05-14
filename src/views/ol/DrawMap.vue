<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <Button @click="addDraw">添加画图功能</Button>
    <Button @click="removeDraw">移除画图功能</Button>
    <Button @click="getDrawPx">获取选中画图范围</Button>
    <Button @click="clearDraw">删除画图feature</Button>
    {{obj.arr.constructor === Array}}
  </div>
</template>
<script>
import Draw from '@/views/ol/js/draw.js';

export default {
  name: "DrawMap",
  data() {
    return {
      draw: null,
      obj: {
        arr: [
          {
            name: '1',
          }
        ]
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.draw = new Draw();
    },
    addDraw() {
      this.draw.add();
    },
    removeDraw() {
      this.draw.remove();
    },
    clearDraw() {
      this.draw.clear();
    },
    getDrawPx() {
      let px = this.draw.get();
      console.log('px', px)
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
