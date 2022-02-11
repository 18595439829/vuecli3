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
      ref="toolbar"
      v-show="isToolbar"
      :class="$style['toolbar']"
      :style="{ ...toolbarStyle }"
    >
      工具栏
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
      moveable: null,
      canvasStyle: {
        scale: 0.5,
        left: 100,
        top: 100,
      },
      ctrlDown: false,
      toolbarStyle: {},
      selectLayerStyle: {},
      isToolbar: false,
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
            this.setMoveableRequest();
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
          this.setMoveableRequest();
        },
        { passive: false, capture: false }
      );
    },
    setMoveableRequest() {
      if (this.moveable) {
        this.moveableDestroy();
        this.isMoveable = false;
        this.$nextTick(() => {
          this.layerSelect(this.cropperData);
        });
      } else if (this.cropperData.type === 'caption') {
        this.isToolbar = false
        this.$nextTick(() => {
          this.layerSelect(this.cropperData);
        });
      }
    },
    init() {
      this.moveable = new Moveable(this.$refs.container, {
        target: this.$refs["moveable-container"],
      }).getMoveable();
      this.moveable
        .on("drag", ({ target, beforeTranslate }) => {
          this.cropperData.data.inner.left = Math.floor(
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
              this.canvasStyle.scale
          );
          this.cropperData.data.inner.top = Math.floor(
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
              this.canvasStyle.scale
          );
          this.setToolbarStyle();
          this.updateCropperData(this.cropperData);
        })
        .on("resize", ({ target, width, height, drag }) => {
          let { beforeTranslate } = drag;
          this.cropperData.data.inner.width = Math.floor(
            width / this.canvasStyle.scale
          );
          this.cropperData.data.inner.height = Math.floor(
            height / this.canvasStyle.scale
          );
          this.cropperData.data.inner.left = Math.floor(
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
              this.canvasStyle.scale
          );
          this.cropperData.data.inner.top = Math.floor(
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
              this.canvasStyle.scale
          );
          this.setToolbarStyle();
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
            this.isToolbar = true;
            this.setToolbarStyle();
          });
          break;
        case "caption":
          let { height, top } =
          data.ref.getBoundingClientRect();
          this.selectLayerStyle = {
            width: `${1920 * 0.8 * this.canvasStyle.scale}px`,
            height: `${height}px`,
            left: `${
              1920 * 0.1 * this.canvasStyle.scale + this.canvasStyle.left
            }px`,
            top: `${top}px`,
            outline: "1px solid #3360ff",
            transform: "",
          };
          this.$nextTick(() => {
            this.isToolbar = true;
            this.toolbarStyle = {
              left: `${
                1920 * 0.1 * this.canvasStyle.scale + this.canvasStyle.left
              }px`,
              top: `${top}px`,
            };
          });
          break;
      }
    },
    setToolbarStyle() {
      if (this.isToolbar) {
        this.toolbarStyle = {
          left: `${
            this.cropperData.data.inner.left * this.canvasStyle.scale +
            this.canvasStyle.left
          }px`,
          top: `${
            this.cropperData.data.inner.top * this.canvasStyle.scale +
            this.canvasStyle.left
          }px`,
        };
      }
    },
    closeMoveable(e) {
      if (
        e.target !== this.$refs["canvas-container"].$el &&
        !this.$refs["canvas-container"].$el.contains(e.target) &&
        e.target !== this.$refs["toolbar"] &&
        !this.$refs["toolbar"].contains(e.target) &&
        e.target !== this.$refs["moveable-container"] &&
        !this.$refs["moveable-container"].contains(e.target)
      ) {
        this.moveableDestroy();
        this.isMoveable = false;
        this.isToolbar = false;
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
  .toolbar {
    position: absolute;
    z-index: 1;
    transform: translateY(-100%);
    padding: 5px 10px;
    outline: 1px solid #3360ff;
    background: #f3f3f3;
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
