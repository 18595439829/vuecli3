<template>
  <div :class="$style['container']">
    <div
      v-if="info.background"
      :class="$style['background']"
      @click="backgroundClick"
    >
      <div
        :class="$style['background-item']"
        :data-id="item.id"
        :show="item.isShow"
        v-for="item in info.background"
        :key="item.id"
        :blur="item.isBlur"
        :style="{
          backgroundColor: item.color,
          backgroundImage: `url(${item.url})`,
          zIndex: item.zIndex,
          width: `${item.width}px`,
          height: `${item.height}px`,
          left: `${item.left}px`,
          top: `${item.top}px`
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import KAOLA from "@/assets/img/Koala.jpg";
import FISH from "@/assets/img/Jellyfish.jpg";
export default {
  name: "TheLayerElement",
  data() {
    return {
      info: {
        background: [
          {
            id: "123",
            isBlur: false,
            color: "#f1f1f1",
            zIndex: 0,
            width: 1920,
            height: 1080,
            left: 0,
            top: 0,
            isShow: true,
          },
          {
            id: "142314",
            isBlur: false,
            url: KAOLA,
            zIndex: 1,
            width: 1920,
            height: 1080,
            left: 0,
            top: 0,
            isShow: true,
          },
        ],
        medias: [
          {
            url: KAOLA,
            isShow: true,
            inner: {
              width: 960,
              height: 1080,
              left: 0,
              top: 0,
            },
            outer: {
              width: 960,
              height: 1080,
              left: 0,
              top: 0,
            },
          },
          {
            url: FISH,
            isShow: true,
            inner: {
              width: 960,
              height: 540,
              left: 0,
              top: 0,
            },
            outer: {
              width: 960,
              height: 540,
              left: 0,
              top: 0,
            },
          },
        ],
        texts: [
          {
            content: "我是一个文本",
            color: "#333",
            fontSize: 30,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["cropperData"]),
  },
  methods: {
    ...mapMutations(["updateCropperData"]),
    backgroundClick(e) {
      let layer = this.info.background.find(
        (item) => item.id === e.target.dataset.id
      );
      layer.isShow = false;
      this.emit({
        type: "background",
        data: layer,
      });
    },
    emit(e) {
      this.updateCropperData(e);
    },
  },
};
</script>

<style lang="less" module>
.container {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    .background-item {
      width: 100%;
      height: 100%;
      background-size: 100%;
      position: absolute;
      display: none;
      &[blur="true"] {
        background-size: 110%;
        background-origin: center;
        filter: blur(20px);
      }
      &[show="true"] {
        display: block;
      }
    }
  }
}
</style>
