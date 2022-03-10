<template>
  <div ref="container" :class="$style['container']">
    <div
      ref="canvas"
      :class="$style['canvas']"
      :style="{
        transform: `scale(${canvasStyle.scale})`,
        left: `${canvasStyle.left}px`,
        top: `${canvasStyle.top}px`,
      }"
    >
      <TheLayerElement
        ref="canvas-container"
        :class="$style['element']"
        :data="layerData"
      />
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
      :ishover="isHover"
      :style="{ ...selectLayerStyle }"
    >
      <img src alt="" />
    </div>
    <div
      v-show="isHover"
      :class="$style['hover-layer']"
      :style="{ ...hoverLayerStyle }"
    >
      <img src="" alt="" />
    </div>
    <BaseScrollRow>
      <div
        v-for="(item, index) in 20"
        :key="index"
        :class="$style['card-item']"
      >
        {{ index }}
      </div>
    </BaseScrollRow>
    <TheOpentype />
  </div>
</template>

<script>
import TheLayerElement from "@/views/layer/TheLayerElement.vue";
import TheOpentype from '@/views/layer/TheOpentype.vue'
import Moveable from "@/common/moveable.js";
import { mapState, mapMutations } from "vuex";
import {
  getLayerCaptionBounding,
  getLayerTextBounding,
  searchLayerByPx,
  layerData,
} from "@/common/layer-utils.js";
import BaseScrollRow from "@/components/BaseScrollRow.vue";

export default {
  name: "TheLayerIndex",
  components: {
    TheLayerElement,
    TheOpentype,
    BaseScrollRow,
  },
  data() {
    return {
      layerData,
      moveable: null,
      canvasStyle: {
        scale: 0.5,
        left: 100,
        top: 100,
      },
      ctrlDown: false,
      toolbarStyle: {},
      selectLayerStyle: {},
      hoverLayerStyle: {},
      isToolbar: false,
      isMoveable: false,
      isHover: false,
      hoverData: {},
      isMoveableAction: false,
    };
  },
  computed: {
    ...mapState(["moveableData"]),
  },
  watch: {
    moveableData(v) {
      this.destroyMoveable();
      this.layerSelect(v, true);
    },
  },
  created() {
    this.setElementScale();
  },
  mounted() {
    document.body.addEventListener("mousedown", this.init);
    this.initDelete();
    this.initHover();
  },
  destroy() {
    document.body.removeEventListener("mousedown", this.init);
    this.destroyDelete();
    this.destroyMoveable();
  },
  methods: {
    ...mapMutations(["updateMoveableData", "updateDeleteData"]),
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
        this.destroyMoveable();
        this.$nextTick(() => {
          this.layerSelect(this.moveableData, false);
        });
      } else if (this.moveableData.type === "caption") {
        this.isToolbar = false;
        this.$nextTick(() => {
          this.layerSelect(this.moveableData, false);
        });
      }
    },
    init(e) {
      // 判断是否点击图层外,是则关闭moveable选中态
      console.log(this.$refs, this.$refs["canvas-container"]);
      if (
        !this.isMoveableAction &&
        e.target !== this.$refs["canvas-container"].$el &&
        !this.$refs["canvas-container"].$el.contains(e.target) &&
        e.target !== this.$refs["toolbar"] &&
        !this.$refs["toolbar"].contains(e.target) &&
        e.target !== this.$refs["moveable-container"] &&
        !this.$refs["moveable-container"].contains(e.target)
      ) {
        this.destroyMoveable();
        this.isToolbar = false;
        this.updateMoveableData({
          type: "",
          data: undefined,
        });
      }
      if (this.isHover && this.hoverData.data) {
        let data = this.layerData[this.hoverData.type].find(
          (item) => item.id === this.hoverData.data.id
        );
        this.updateMoveableData({
          type: this.hoverData.type,
          data,
          event: e,
        });
        this.layerHover({ type: "", data: undefined });
      }
    },
    initMoveable({ event, isStrat, isResize }) {
      this.moveable = new Moveable(this.$refs.container, {
        target: this.$refs["moveable-container"],
        resizeable:
          isResize !== null || isResize !== undefined ? isResize : true,
      }).getMoveable();
      if (isStrat) {
        this.moveable.dragStart(event);
        this.isMoveableAction = true;
      }
      this.moveable.on("dragStart", () => {
        this.isMoveableAction = true;
      });
      this.moveable.on("dragEnd", () => {
        this.isMoveableAction = false;
      });
      this.moveable.on("resizeStart", () => {
        this.isMoveableAction = true;
      });
      this.moveable.on("resizeEnd", () => {
        this.isMoveableAction = false;
      });
      this.moveable
        .on("drag", ({ target, beforeTranslate }) => {
          this.moveableData.data.inner.left = Math.floor(
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
              this.canvasStyle.scale
          );
          this.moveableData.data.inner.top = Math.floor(
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
              this.canvasStyle.scale
          );
          this.setToolbarStyle();
          this.updateMoveableData(this.moveableData);
        })
        .on("resize", ({ target, width, height, drag }) => {
          let { beforeTranslate } = drag;
          let scale =
            width / this.canvasStyle.scale / this.moveableData.data.inner.width;
          this.moveableData.data.inner.width = Math.round(
            width / this.canvasStyle.scale
          );
          this.moveableData.data.inner.height = Math.round(
            height / this.canvasStyle.scale
          );
          this.moveableData.data.inner.left = Math.round(
            (Number(target.style.left.split("px")[0]) +
              beforeTranslate[0] -
              this.canvasStyle.left) /
              this.canvasStyle.scale
          );
          this.moveableData.data.inner.top = Math.round(
            (Number(target.style.top.split("px")[0]) +
              beforeTranslate[1] -
              this.canvasStyle.top) /
              this.canvasStyle.scale
          );
          this.moveableData.data.outer.width = Math.round(
            this.moveableData.data.outer.width * scale
          );
          this.moveableData.data.outer.height = Math.round(
            this.moveableData.data.outer.height * scale
          );
          this.moveableData.data.outer.left = Math.round(
            this.moveableData.data.outer.left * scale
          );
          this.moveableData.data.outer.top = Math.round(
            this.moveableData.data.outer.top * scale
          );
          this.setToolbarStyle();
          this.updateMoveableData(this.moveableData);
        });
    },
    initDelete() {
      document.body.addEventListener("keydown", this.keydown);
    },
    initHover() {
      document.body.addEventListener("mousemove", this.getHoverData);
    },
    layerSelect({ type, data, event }, isStrat) {
      this.isMoveable = true;
      this.selectLayerStyle = { ...this.getLayerStyle({ type, data }) };
      switch (type) {
        case "medias":
          this.$nextTick(() => {
            this.initMoveable({ event, isStrat });
            this.isToolbar = true;
            this.setToolbarStyle();
          });
          break;
        case "captions":
          this.$nextTick(() => {
            this.isToolbar = true;
            this.toolbarStyle = {
              left: `${
                1920 * 0.1 * this.canvasStyle.scale + this.canvasStyle.left
              }px`,
              top: this.selectLayerStyle.top,
            };
          });
          break;
        case "texts":
          this.$nextTick(() => {
            this.initMoveable({ event, isStrat, isResize: false });
            this.isToolbar = true;
            this.toolbarStyle = {
              left: this.selectLayerStyle.left,
              top: this.selectLayerStyle.top,
            };
          });
          break;
        default:
          this.isToolbar = false;
          this.isMoveable = false;
      }
    },
    layerHover({ type, data }) {
      // hoverData没值,moveable正在drag/resize等操作,hover值为已经执行moveable初始化的元素时,都不展示hover状态
      if (
        !data ||
        this.isMoveableAction ||
        data.id === (this.moveableData.data ? this.moveableData.data.id : "")
      ) {
        this.isHover = false;
        this.hoverData = {
          type: "",
          data: undefined,
        };
        return;
      }
      // 如果查找结果为同一元素,则直接返回
      if (this.hoverData.data && data.id === this.hoverData.data.id) {
        return;
      }
      this.hoverLayerStyle = { ...this.getLayerStyle({ type, data }) };
      this.hoverData = {
        type,
        data,
      };
      this.isHover = true;
    },
    getHoverData({ clientX, clientY }) {
      if (this.isMoveableAction) {
        return;
      }
      let scrollTop = this.$refs.container.scrollTop;
      let result = searchLayerByPx({
        position: { x: clientX, y: clientY + scrollTop },
        data: this.layerData,
      });
      this.layerHover(result);
    },
    getLayerStyle({ type, data }) {
      let style;
      switch (type) {
        case "backgrounds":
          style = {
            width: `${1920 * this.canvasStyle.scale}px`,
            height: `${1080 * this.canvasStyle.scale}px`,
            left: `${this.canvasStyle.left}px`,
            top: `${this.canvasStyle.top}px`,
            transform: "",
          };
          break;
        case "medias":
          style = {
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
          break;
        case "captions":
          {
            let { height, top } = getLayerCaptionBounding();
            style = {
              width: `${1920 * 0.8 * this.canvasStyle.scale}px`,
              height: `${height}px`,
              left: `${
                1920 * 0.1 * this.canvasStyle.scale + this.canvasStyle.left
              }px`,
              top: `${top}px`,
              outline: "1px solid #3360ff",
              transform: "",
            };
          }
          break;
        case "texts":
          {
            let result = getLayerTextBounding(data.id);
            let { width, height, top } = result;
            style = {
              width: `${width}px`,
              height: `${height}px`,
              left: `${
                data.inner.left * this.canvasStyle.scale + this.canvasStyle.left
              }px`,
              top: `${top}px`,
              outline: "1px solid #3360ff",
              transform: "",
            };
          }
          break;
      }
      return style;
    },
    setToolbarStyle() {
      if (this.isToolbar) {
        this.toolbarStyle = {
          left: `${
            this.moveableData.data.inner.left * this.canvasStyle.scale +
            this.canvasStyle.left
          }px`,
          top: `${
            this.moveableData.data.inner.top * this.canvasStyle.scale +
            this.canvasStyle.left
          }px`,
        };
      }
    },
    destroyMoveable() {
      if (this.moveable) {
        this.moveable.target.style.transform = "";
        this.moveable.target = null;
        this.moveable.destroy();
        this.moveable = null;
        this.isMoveable = false;
        this.isMoveableAction = false;
      }
    },
    destroyDelete() {
      document.body.removeEventListener("keydown", this.keydown);
    },
    destroyHover() {
      document.body.removeEventListener("mousemove", this.getHoverData);
    },
    keydown(e) {
      if (this.moveableData && this.moveableData.data) {
        if (e.key === "Backspace" || e.key === "Delete") {
          this.updateDeleteData({ ...this.moveableData });
        } else if (
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown"
        ) {
          let distance = 1,
            type = "deltaX",
            symbol = 1;
          switch (e.key) {
            case "ArrowRight":
              type = "deltaX";
              symbol = 1;
              break;
            case "ArrowLeft":
              type = "deltaX";
              symbol = -1;
              break;
            case "ArrowUp":
              type = "deltaY";
              symbol = -1;
              break;
            case "ArrowDown":
              type = "deltaY";
              symbol = 1;
              break;
          }
          if (e.shiftKey) {
            distance = 10;
          }
          this.setLayerPosition({ type, distance: distance * symbol });
        }
      }
    },
    setLayerPosition({ type, distance }) {
      let requester = this.moveable.request("draggable");
      requester.request({ [type]: distance });
      requester.requestEnd();
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
  .hover-layer {
    .moveable-layer;
    outline: 3px solid #3360ff;
    pointer-events: none;
  }
  .card-item {
    width: 200px;
    height: 50px;
    border: 1px #3360ff solid;
    margin-left: 10px;
  }
}
</style>
