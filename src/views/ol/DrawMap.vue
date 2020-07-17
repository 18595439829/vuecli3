<template>
  <div>
    <div id="map" :class="$style['map']"></div>
    <div>
      <Button @click="addDraw">添加画图功能</Button>
      <Button @click="removeDraw">移除画图功能</Button>
      <Button @click="getDrawPx">获取选中画图范围</Button>
      <Button @click="clearDraw">删除画图feature</Button>
      {{ obj.arr.constructor === Array }}
    </div>
    <div>
      <Button @click="addPoint">添加点</Button>
      <Button @click="removePoint">删除点</Button>
      <Button @click="addLine">添加线</Button>
      <Button @click="removeLine">删除线</Button>
    </div>
  </div>
</template>
<script>
import Draw from "@/views/ol/js/draw.js";

export default {
  name: "DrawMap",
  data() {
    return {
      draw: null,
      obj: {
        arr: [
          {
            name: "1",
          },
        ],
      },
      point: [
        [120.32714457090765, 30.30569628128095],
        [120.32714457090765, 30.30669628128095],
        [120.32814457090765, 30.30569628128095],
        [120.32814457090765, 30.30669628128095],
      ],
      line: [
        [
          [120.32714457090765, 30.30569628128095],
          [120.32714457090765, 30.30669628128095],
        ],
        [
          [120.32814457090765, 30.30569628128095],
          [120.32814457090765, 30.30669628128095],
        ],
      ],
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
      console.log("px", px);
    },
    addPoint() {
      this.draw.addPoint(this.point);
    },
    removePoint() {
      this.draw.clearPoint();
    },
    addLine() {
      this.draw.addLine(this.line);
    },
    removeLine() {
      this.draw.clearLine();
    },
  },
};
</script>

<style lang="less" module>
.map {
  width: 100%;
  height: 500px;
}
</style>
