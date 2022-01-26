<template>
  <div ref="container" :class="$style['container']" @click="closeMoveable">
    <div
      :class="$style['canvas']"
      :style="{
        transform: `scale(${canvasStyle.scale})`,
        left: `${canvasStyle.left}px`,
        top: `${canvasStyle.top}px`,
      }"
    >
      <TheLayerElement ref="canvas-container" :class="$style['element']" />
    </div>
    <div
      v-show="isMoveable"
      ref="moveable-container"
      :class="$style['moveable-layer']"
      :style="{ ...selectLayerStyle }"
    >
      <img src="" alt="" />
    </div>
  </div>
</template>

<script>
import TheLayerElement from "@/views/layer/TheLayerElement.vue";
import Moveable from "@/common/moveable.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TheLayerIndex",
  components: {
    TheLayerElement,
  },
  data() {
    return {
      canvasStyle: {
        scale: 0.5,
        left: 100,
        top: 100,
      },
      ctrlDown: false,
      selectLayerStyle: {},
      isMoveable: false,
    };
  },
  computed: {
    ...mapState(["cropperData"]),
  },
  watch: {
    cropperData(v) {
      this.moveableDestroy();
      this.isMoveable = false;
      this.layerSelect(v);
    },
  },
  created() {
    this.setElementScale();
  },
  methods: {
    ...mapMutations(["updateCropperData"]),
    setElementScale() {
      let speed = 0.1;
      document.body.addEventListener(
        "keydown",
        (e) => {
          this.ctrlDown = e.ctrlKey || e.metaKey;
          if (this.ctrlDown) {
            if (e.keyCode === 107 || e.keyCode === 187) {
              // 放大
              e.preventDefault();
              this.canvasStyle.scale += speed;
            }
            if (e.keyCode === 109 || e.keyCode === 189) {
              // 缩小
              e.preventDefault();
              this.canvasStyle.scale -= speed;
            }
            if (this.canvasStyle.scale <= 0.1) {
              this.canvasStyle.scale = 0.1;
            }
            if (this.moveable) {
              const requester = this.moveable.request("resizeable");
              requester.request({
                width: this.selectLayerStyle.width * (1 + speed),
                height: this.selectLayerStyle.height * (1 + speed),
              });
              requester.requestEnd();
            }
          }
        },
        false
      );
      document.body.addEventListener("keyup", (e) => {
        this.ctrlDown = e.ctrlKey || e.metaKey;
      });
      document.body.addEventListener(
        "mousewheel",
        (e) => {
          if (this.ctrlDown) {
            e.preventDefault();
            if (e.wheelDeltaY > 0) {
              // 放大
              this.canvasStyle.scale += speed;
            } else {
              // 缩小
              this.canvasStyle.scale -= speed;
            }
            if (this.canvasStyle.scale <= 0.1) {
              this.canvasStyle.scale = 0.1;
            }
          }
        },
        { passive: false, capture: false }
      );
      if (this.moveable) {
        const requester = this.moveable.request("resizeable");
        requester.request({
          width: this.selectLayerStyle.width * (1 + speed),
          height: this.selectLayerStyle.height * (1 + speed),
        });
        requester.requestEnd();
      }
    },
    init() {
      this.moveable = new Moveable(this.$refs.container, {
        target: this.$refs["moveable-container"],
      }).getMoveable();
      this.moveable
        .on("drag", ({ target, beforeTranslate }) => {
          this.cropperData.data.inner.left =
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
            this.canvasStyle.scale;
          this.cropperData.data.inner.top =
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
            this.canvasStyle.scale;
          this.updateCropperData(this.cropperData);
        })
        .on("resize", ({ target, width, height, drag }) => {
          let { beforeTranslate } = drag;
          this.cropperData.data.inner.width = width / this.canvasStyle.scale;
          this.cropperData.data.inner.height = height / this.canvasStyle.scale;
          this.cropperData.data.inner.left =
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
            this.canvasStyle.scale;
          this.cropperData.data.inner.top =
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
            this.canvasStyle.scale;
          this.updateCropperData(this.cropperData);
        });
    },
    layerSelect({ type, data }) {
      this.isMoveable = true;
      switch (type) {
        case "background":
          this.selectLayerStyle = {
            width: `${1920 * this.canvasStyle.scale}px`,
            height: `${1080 * this.canvasStyle.scale}px`,
            left: `${this.canvasStyle.left}px`,
            top: `${this.canvasStyle.top}px`,
            transform: "",
          };
          this.$nextTick(() => {
            this.init();
          });
          break;
        case "media":
          this.selectLayerStyle = {
            width: `${data.inner.width * this.canvasStyle.scale}px`,
            height: `${data.inner.height * this.canvasStyle.scale}px`,
            left: `${
              data.inner.left * this.canvasStyle.scale + this.canvasStyle.left
            }px`,
            top: `${
              data.inner.top * this.canvasStyle.scale + this.canvasStyle.left
            }px`,
            transform: "",
          };
          this.$nextTick(() => {
            this.init();
          });
          break;
      }
    },
    closeMoveable(e) {
      if (
        e.target !== this.$refs["canvas-container"].$el &&
        !this.$refs["canvas-container"].$el.contains(e.target) &&
        e.target !== this.$refs["moveable-container"] &&
        !this.$refs["moveable-container"].contains(e.target)
      ) {
        this.moveableDestroy();
        this.isMoveable = false;
      }
    },
    moveableDestroy() {
      if (this.moveable) {
        this.moveable.target.style.transform = "";
        this.moveable.target = null;
        this.moveable.destroy();
        this.moveable = null;
      }
    },
  },
};
</script>

<style lang="less" module>
.container {
  position: relative;
  // width: 100%;
  height: 100vh;
  .canvas {
    // width: 100%;
    // height: 100%;
    position: absolute;
    transform-origin: left top;
    z-index: 0;
    .element {
      width: 1920px;
      height: 1080px;
    }
  }
  .moveable-layer {
    position: absolute;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
