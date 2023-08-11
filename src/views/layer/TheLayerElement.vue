<template>
  <div :class="$style['container']">
    <template v-if="info.backgrounds && info.backgrounds.length">
      <div
        v-for="item in info.backgrounds"
        :key="item.id"
        name="layer-backgrounds"
        :class="$style['background-item']"
        :data-id="item.id"
        :blur="item.isBlur"
        :style="{
          backgroundColor: item.color,
          backgroundImage: `url(${item.url})`,
          zIndex: item.zIndex,
          width: `${item.inner.width}px`,
          height: `${item.inner.height}px`,
          left: `${item.inner.left}px`,
          top: `${item.inner.top}px`,
        }"
      ></div>
    </template>
    <template v-if="info.medias && info.medias.length">
      <div
        v-for="item in info.medias"
        :key="item.id"
        name="layer-medias"
        :data-id="item.id"
        :class="$style['layer-img']"
        :style="{
          zIndex: item.zIndex + zIndex.medias,
          width: `${item.inner.width}px`,
          height: `${item.inner.height}px`,
          left: `${item.inner.left}px`,
          top: `${item.inner.top}px`,
        }"
      >
        <img
          :src="item.url"
          alt=""
          :style="{
            width: `${item.outer.width}px`,
            height: `${item.outer.height}px`,
            left: `${item.outer.left}px`,
            top: `${item.outer.top}px`,
          }"
        />
      </div>
    </template>
    <template v-if="info.texts && info.texts.length">
      <div
        v-for="item in info.texts"
        :key="item.id"
        name="layer-texts"
        :data-id="item.id"
        :class="$style['layer-img']"
        :style="{
          zIndex: item.zIndex + zIndex.texts,
          left: `${item.inner.left}px`,
          top: `${item.inner.top}px`,
          fontSize: `${item.fontSize}px`,
          background: item.background,
        }"
      >
        <div v-for="text in item.content" :key="text">
          {{ text }}
        </div>
      </div>
    </template>
    <!-- <template v-if="info.captions && info.captions.length">
      <div
        id="layer-captions"
        ref="layer-caption"
        :class="$style['layer-captions']"
        :style="{ zIndex: zIndex.captions }"
      >
        <div
          v-for="(text, index) in info.captions[captionIndex].content"
          :key="text + index"
          :data-id="info.captions[captionIndex].id"
          :style="{ height: `${fontSize * 1.2}px`, marginBottom: `12px`, fontSize: `${fontSize}px` }"
        >
          <svg width="1536" :height="svgHeight" :viewBox="`0 0 1536 ${svgHeight}`">
            <text x="350" :y="fontSize">
              <tspan x="350">
                {{ text }}
              </tspan>
            </text>
          </svg>
        </div>
      </div>
    </template> -->
    <template v-if="info.captions && info.captions.length">
      <div
        id="layer-captions"
        ref="layer-caption"
        :class="$style['layer-captions']"
        :style="{ zIndex: zIndex.captions, fontSize: `${info.captions[captionIndex].fontSize}px` }"
      >
        <div :class="[$style['caption-item'], $style['stroke']]">
          <div
            v-for="(text, index) in info.captions[captionIndex].content"
            :key="text + index"
            :data-id="info.captions[captionIndex].id"
          >
            {{ text }}
          </div>
        </div>
        <div :class="$style['caption-item']">
          <div
            v-for="(text, index) in info.captions[captionIndex].content"
            :key="text + index"
            :data-id="info.captions[captionIndex].id"
          >
            {{ text }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TheLayerElement",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      zIndex: {
        medias: 100,
        texts: 200,
        captions: 300,
      },
      captionIndex: 0,
      fontSize: 48,
      svgHeight: 48 * 1.2, // 54
    };
  },
  computed: {
    ...mapState(["moveableData"]),
    info() {
      return this.data;
    },
  },
  watch: {
    moveableData: {
      handler(v) {
        switch (v.type) {
          case "backgrounds":
            let backgroundIndex = this.info.backgrounds.findIndex(
              (item) => item.id === v.data.id
            );
            this.$set(this.info.backgrounds, backgroundIndex, v.data);
            break;
          case "medias":
            let mediaIndex = this.info.medias.findIndex(
              (item) => item.id === v.data.id
            );
            this.$set(this.info.medias, mediaIndex, v.data);
            break;
        }
      },
      deep: true,
    },
    deleteData: {
      handler(v) {
        let index = this.info[v.type].findIndex(
          (item) => item.id === v.data.id
        );
        this.info[v.type].splice(index, 1);
        this.updateMoveableData({ type: "", data: undefined });
      },
      deep: true,
    },
    captionIndex(v) {
      this.info.forEach((item, index) => {
        if (index === v) {
          item.isCurrent = true;
        } else {
          item.isCurrent = false;
        }
      });
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
input {
  position: absolute;
  z-index: 999;
  top: -20px;
  left: 0;
}
</style>
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
    position: absolute;
    z-index: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      pointer-events: none;
      user-select: none;
    }
  }
  .layer-captions {
    position: absolute;
    z-index: 2;
    color: #fff;
    bottom: 80px;
    text-align: center;
    left: 50%;
    width: 1920px * 0.8;
    transform: translateX(-50%);
    letter-spacing: 1.1px;
    font-weight: 500;
    text-anchor: middle;
    font-family: "SourceHanSansCN-Medium";
    .caption-item {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 1920px * 0.8;
      transform: translateX(-50%);
      white-space: nowrap;
      text-align: center;
    }
    .stroke {
      color: #000;
      -webkit-text-stroke: 5px #000;
    }

    svg {
      text-align: center;
    }
    text {
      stroke-linejoin: round;
      text-anchor: middle;
      fill: #fff;
      paint-order: stroke fill;
      stroke: #000;
      stroke-width: 6px;
      font-size: 54px;
      font-family: "SourceHanSansCN-Medium.otf";
      letter-spacing: 1.2px;
    }
  }
}
</style>
