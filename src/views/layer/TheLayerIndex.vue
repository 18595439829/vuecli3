<template>
  <div ref="container" :class="$style['container']" @click="closeMoveable">
    <div ref="canvas-container" :class="$style['canvas']">
      <TheLayerElement
        :class="$style['element']"
        :style="{ transform: `scale(${scale})` }"
      />
    </div>
    <div
      ref="moveable-container"
      v-show="isMoveable"
      :class="$style['moveable']"
    >
      <div ref="moveable" :style="{ ...selectLayerStyle }"></div>
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
      scale: 0.5,
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
              this.scale += speed;
            }
            if (e.keyCode === 109 || e.keyCode === 189) {
              // 缩小
              e.preventDefault();
              this.scale -= speed;
            }
            if (this.scale <= 0.1) {
              this.scale = 0.1;
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
              this.scale += speed;
            } else {
              // 缩小
              this.scale -= speed;
            }
            if (this.scale <= 0.1) {
              this.scale = 0.1;
            }
          }
        },
        { passive: false, capture: false }
      );
    },
    init() {
      this.moveable = new Moveable(this.$refs.container, {
        target: this.$refs.moveable,
      }).getMoveable();
      this.moveable.on("drag", ({ beforeTranslate }) => {
        this.cropperData.data.left = beforeTranslate[0] / this.scale;
        this.cropperData.data.top = beforeTranslate[1] / this.scale;
        console.log(beforeTranslate);
      });
      this.moveable.on("resize", ({ width, height, drag }) => {
        let { beforeTranslate } = drag;
        this.cropperData.data.width = width / this.scale;
        this.cropperData.data.height = height / this.scale;
        this.cropperData.data.left = beforeTranslate[0] / this.scale;
        this.cropperData.data.top = beforeTranslate[1] / this.scale;
        console.log(beforeTranslate);
      });
    },
    layerSelect({ type, data }) {
      this.isMoveable = true;
      let scale = this.scale;
      switch (type) {
        case "background":
          this.selectLayerStyle = {
            width: `${1920 * scale}px`,
            height: `${1080 * scale}px`,
            backgroundColor: data.color,
            backgroundImage: `url(${data.url})`,
            backgroundSize: data.isBlur ? "110%" : "100%",
            backgroundOrigin: "center",
            filter: data.isBlur ? `${20 * scale}px` : "",
          };
          this.$nextTick(() => {
            this.init();
          });
      }
    },
    closeMoveable(e) {
      if (
        e.target !== this.$refs["canvas-container"] &&
        !this.$refs["canvas-container"].contains(e.target) &&
        e.target !== this.$refs["moveable-container"] &&
        !this.$refs["moveable-container"].contains(e.target)
      ) {
        this.isMoveable = false;
        this.moveable.destroy();
        this.cropperData.data.isShow = true;
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
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 0;
    .element {
      width: 1920px;
      height: 1080px;
      transform: scale(0.5);
      transform-origin: left top;
    }
  }
  .moveable {
    .canvas;
    z-index: 1;
  }
}
</style>
