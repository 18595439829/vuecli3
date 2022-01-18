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
        v-for="item in info.background"
        :key="item.id"
        :blur="item.isBlur"
        :style="{
          backgroundColor: item.color,
          backgroundImage: `url(${item.url})`,
          zIndex: item.zIndex,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
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
          },
          {
            id: "142314",
            isBlur: true,
            url: KAOLA,
            zIndex: 1,
          },
        ],
        medias: [
          {
            url: KAOLA,
            inner: {
              width: 960,
              height: 1080,
              x: 0,
              y: 0,
            },
            outer: {
              width: 960,
              height: 1080,
              x: 0,
              y: 0,
            },
          },
          {
            url: FISH,
            inner: {
              width: 960,
              height: 540,
              x: 0,
              y: 0,
            },
            outer: {
              width: 960,
              height: 540,
              x: 0,
              y: 0,
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
  methods: {
    backgroundClick(e) {
      console.log(e.target.dataset.id);
      let layer = this.info.background.find(
        (item) => item.id === e.target.dataset.id
      );
      this.emit({
        type: "background",
        data: layer,
      });
    },
    emit(e) {
      this.$emit("layer-select", e);
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
      &[blur="true"] {
        background-size: 110%;
        background-origin: center;
        filter: blur(20px);
      }
    }
  }
}
</style>
