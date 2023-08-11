<template>
  <div :class="$style['container']">
    <div :class="$style['content']" :style="getContentStyle()">
      <div
        :class="$style['layer-img']"
        :style="{
          width: `${testData.windowWidth}px`,
          height: `${testData.windowHeight}px`,
          left: `${testData.windowX}px`,
          top: `${testData.windowY}px`,
        }"
        @dblclick="cropperMedia"
      >
        <img :src="testData.url" alt="" :style="getImgStyle(testData)" />
      </div>
    </div>
    <BaseCropper
      v-if="isCropper"
      :data="cropperData"
      @close="isCropper = false"
    />
  </div>
</template>

<script>
import KAOLA from "@/assets/img/Koala.jpg";
import BaseCropper from "@/components/cropper/BaseCropper.vue";
import { mapState, mapMutations } from "vuex";
import { normalizeChangeMedia } from "@/common/detail-media-normalize.js";

export default {
  name: "TheCropper",
  components: {
    BaseCropper,
  },
  data() {
    return {
      isCropper: false,
      contentData: {
        width: 400,
        height: 300,
        left: 100,
        top: 50,
      },
      testData: {
        url: KAOLA,
        windowWidth: 150,
        windowHeight: 200,
        windowX: 100,
        windowY: 100,
        width: 0,
        height: 0,
        positionX: 0,
        positionY: 0,
        originWidth: 1024,
        originHeight: 768,
      },
    };
  },
  computed: {
    ...mapState(["cropperData"]),
  },
  created() {
    this.normalizeMedia();
    this.cropperMedia();
  },
  methods: {
    ...mapMutations(["updateCropperData"]),
    cropperMedia(e) {
      this.isCropper = true;
      this.updateCropperData({
          view: this.testData,
          container: this.contentData
      })
      // let { width, height, left, top } = e.target.getBoundingClientRect();
      // this.updateCropperData({
      //   url: KAOLA,
      //   img: "",
      //   targetbox: { width, height, left, top },
      //   innerbox: {
      //     left: this.testData.windowX,
      //     top: this.testData.windowY,
      //     width: this.testData.windowWidth,
      //     height: this.testData.windowHeight,
      //   },
      //   outterbox: {
      //     left: this.testData.positionX,
      //     top: this.testData.positionY,
      //     width: this.testData.width,
      //     height: this.testData.height,
      //   },
      // });
    },
    getContentStyle() {
      return {
        width: `${this.contentData.width}px`,
        height: `${this.contentData.height}px`,
        left: `${this.contentData.left}px`,
        top: `${this.contentData.top}px`,
      };
    },
    getImgStyle(media) {
      return {
        width: `${media.width}px`,
        height: `${media.height}px`,
        left: `${media.positionX}px`,
        top: `${media.positionY}px`,
      };
    },
    normalizeMedia() {
      let { width, height, positionX, positionY } = normalizeChangeMedia(
        this.testData,
        this.testData,
        "img"
      );
      Object.assign(this.testData, { width, height, positionX, positionY });
    },
  },
};
</script>

<style lang="less" module>
.container {
  position: relative;
  .content {
    outline: 1px solid #dddddd;
    position: absolute;
    .layer-img {
      position: absolute;
      overflow: hidden;
      img {
        position: absolute;
      }
    }
  }
}
</style>
