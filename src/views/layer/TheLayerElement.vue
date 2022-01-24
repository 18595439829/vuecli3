<template>
  <div :class="$style['container']">
    <template v-if="info.background && info.background.length">
      <div
        v-for="item in info.background"
        :key="item.id"
        :class="$style['background-item']"
        :data-id="item.id"
        :blur="item.isBlur"
        :style="{
          backgroundColor: item.color,
          backgroundImage: `url(${item.url})`,
          zIndex: item.zIndex,
          width: `${item.width}px`,
          height: `${item.height}px`,
          left: `${item.left}px`,
          top: `${item.top}px`,
        }"
        @click="backgroundClick"
      ></div>
    </template>
    <template v-if="info.medias && info.medias.length">
      <div
        v-for="item in info.medias"
        :key="item.id"
        :data-id="item.id"
        :class="$style['layer-img']"
        :style="{
          zIndex: item.zIndex,
          width: `${item.inner.width}px`,
          height: `${item.inner.height}px`,
          left: `${item.inner.left}px`,
          top: `${item.inner.top}px`,
        }"
        @click="mediaClick"
      >
        <img
          :src="item.url"
          alt=""
          :style="{
            zIndex: item.zIndex,
            width: `${item.outer.width}px`,
            height: `${item.outer.height}px`,
            left: `${item.outer.left}px`,
            top: `${item.outer.top}px`,
          }"
        />
      </div>
    </template>
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
          },
          {
            id: "142314",
            isBlur: true,
            url: KAOLA,
            zIndex: 1,
            width: 1920,
            height: 1080,
            left: 0,
            top: 0,
          },
        ],
        medias: [
          {
            id: "media-1",
            url: KAOLA,
            zIndex: 1,
            inner: {
              width: 960,
              height: 1080,
              left: 960,
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
            id: "media-2",
            url: FISH,
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
      this.emit({
        type: "background",
        data: layer,
      });
    },
    mediaClick(e) {
      let layer = this.info.medias.find(
        (item) => item.id === e.target.dataset.id
      );
      this.emit({
        type: "media",
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
  .background-item {
    width: 100%;
    height: 100%;
    background-size: 100%;
    position: absolute;
    &[blur="true"] {
      background-size: 110%;
      background-origin: center;
      filter: blur(20px);
    }
  }
  .layer-img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    img {
      position: absolute;
      pointer-events: none;
      user-select: none;
    }
  }
}
</style>
