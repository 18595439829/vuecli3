<template>
  <div ref="modal" :class="$style['modal']">
    <div
      ref="container"
      :class="$style['container']"
      :style="getContentStyle()"
    >
      <div ref="view" :class="$style['view']" :style="getViewStyle()">
        <img :src="cropperData.view.url" alt="" draggable="false" :style="getViewImgStyle()" />
      </div>
      <div
        ref="background"
        :class="$style['background']"
        :style="getBackgroundStyle()"
      >
        <img :src="cropperData.view.url" alt="" draggable="false"/>
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
      required: true,
    },
  },
  data() {
    return {
        moveableView: null,
        moveableBackground: null
    };
  },
  computed: {
    cropperData() {
      return this.data;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    getContentStyle() {
      return {
        width: `${this.cropperData.container.width}px`,
        height: `${this.cropperData.container.height}px`,
        left: `${this.cropperData.container.left}px`,
        top: `${this.cropperData.container.top}px`,
      };
    },
    getViewStyle() {
      return {
        width: `${this.cropperData.view.windowWidth}px`,
        height: `${this.cropperData.view.windowHeight}px`,
        left: `${this.cropperData.view.windowX}px`,
        top: `${this.cropperData.view.windowY}px`,
      };
    },
    getViewImgStyle() {
      return {
        width: `${this.cropperData.view.width}px`,
        height: `${this.cropperData.view.height}px`,
        left: `${this.cropperData.view.positionX}px`,
        top: `${this.cropperData.view.positionY}px`,
      };
    },
    getBackgroundStyle() {
      return {
        width: `${this.cropperData.view.width}px`,
        height: `${this.cropperData.view.height}px`,
        left: `${
          this.cropperData.view.positionX + this.cropperData.view.windowX
        }px`,
        top: `${
          this.cropperData.view.positionY + this.cropperData.view.windowY
        }px`,
      };
    },
    init() {
      let containerStyle = this.$refs.container.getBoundingClientRect();
      let moveable = new Moveable(this.$refs.modal, {
        containerStyle,
        target: this.$refs.view,
        renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
        resizable: true,
      });
      this.moveableView = moveable.getInstance()
      moveable.on('drag',(e) => {
        console.log(e)
      })
      moveable.on('resize',(e) => {
        console.log(e)
      })
      this.moveableBackground = new Moveable(this.$refs.modal, {
        target: this.$refs.background,
        draggable: true,
        resizable: true,
        keepRatio: true,
      }).getInstance();
    },
  },
};
</script>

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
