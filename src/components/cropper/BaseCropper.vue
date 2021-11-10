<template>
  <div ref="modal" :class="[$style['modal'], 'modal']">
    <div ref="container" :class="$style['container']" :style="getContainerStyle()">
      <div ref="background" :class="['moveable-background', $style['background']]" :style="getBackgroundStyle()">
        <img :src="cropperData.view.url" alt="" draggable="false" />
      </div>
      <div ref="view" :class="['moveable-view',$style['view']]" :style="getViewStyle()">
        <img :src="cropperData.view.url" alt="" draggable="false" :style="getViewImgStyle()" />
      </div>
      <div :class="$style['close']" @click="$emit('close')">X</div>
    </div>
  </div>
</template>

<script>
import Moveable from "./init-moveable.js";

export default {
  name: "BaseCropper",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      moveableView: null,
      moveableBackground: null,
      cropperData: {},
      originData: {}
    };
  },
  watch: {
    data: {
      handler(v) {
        this.cropperData = this.cloneDeep(v);
        this.originData = this.cloneDeep(v);
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    getContainerStyle() {
      return {
        width: `${this.cropperData.container.width}px`,
        height: `${this.cropperData.container.height}px`,
        left: `${this.cropperData.container.left}px`,
        top: `${this.cropperData.container.top}px`
      };
    },
    getViewStyle() {
      return {
        width: `${this.cropperData.view.windowWidth}px`,
        height: `${this.cropperData.view.windowHeight}px`,
        left: `${this.cropperData.view.windowX}px`,
        top: `${this.cropperData.view.windowY}px`
      };
    },
    getViewImgStyle() {
      return {
        width: `${this.cropperData.view.width}px`,
        height: `${this.cropperData.view.height}px`,
        left: `${this.cropperData.view.positionX}px`,
        top: `${this.cropperData.view.positionY}px`
      };
    },
    getBackgroundStyle() {
      return {
        width: `${this.cropperData.view.width}px`,
        height: `${this.cropperData.view.height}px`,
        left: `${this.cropperData.view.positionX +
          this.cropperData.view.windowX}px`,
        top: `${this.cropperData.view.positionY +
          this.cropperData.view.windowY}px`
      };
    },
    init() {
      let containerStyle = this.$refs.container.getBoundingClientRect();
      this.moveableBackground = new Moveable(this.$refs.modal, {
        target: this.$refs.background,
        className: "moveable-background",
        draggable: true,
        resizable: true,
        keepRatio: true
      });
      this.moveableBackground.on("drag", e => {
        let { translateX, translateY } = e;
        this.cropperData.view.positionX =
          this.originData.view.positionX + translateX;
        this.cropperData.view.positionY =
          this.originData.view.positionY + translateY;
      });
      this.moveableBackground.on("dragEnd", e => {
        this.originData = this.cloneDeep(this.cropperData);
      });
      this.moveableBackground.on("resize", e => {
        console.log(e)
        let { width, height, translateX, translateY } = e;
        this.cropperData.view.width = width;
        this.cropperData.view.height = height;
        this.cropperData.view.positionX =
          this.originData.view.positionX + translateX;
        this.cropperData.view.positionY =
          this.originData.view.positionY + translateY;
      });
      this.moveableBackground.on("resizeEnd", e => {
        this.originData = this.cloneDeep(this.cropperData);
      });
      this.moveableView = new Moveable(this.$refs.modal, {
        containerStyle,
        target: this.$refs.view,
        className: "moveable-view",
        renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
        resizable: true
      });
      this.moveableView.on("resize", e => {
        console.log(e);
        let { width, height, translateX, translateY } = e;
        this.cropperData.view.windowWidth = width;
        this.cropperData.view.windowHeight = height;
        // this.cropperData.view.windowX =
        //   this.originData.view.windowY + translateX;
        // this.cropperData.view.windowX =
        //   this.originData.view.windowY + translateY;
      });
      this.moveableView.on("resizeEnd", e => {
        this.originData = this.cloneDeep(this.cropperData);
      });
    },
    cloneDeep(data) {
      return JSON.parse(JSON.stringify(data));
    }
  }
};
</script>
<style lang="less" scoped>
@import "./less/reset.less";
</style>

<style lang="less" module>
.modal {
  position: relative;
  background: #000000aa;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    .view {
      position: absolute;
      overflow: hidden;
      z-index: 1;
      img {
        position: absolute;
        user-select: none;
      }
    }
    .background {
      position: absolute;
      img {
        user-select: none;
        position: absolute;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .close {
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(100%, -100%);
      cursor: pointer;
    }
  }
}
</style>
