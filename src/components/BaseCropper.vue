<template>
  <div :class="$style['container']">
    <img src="@/assets/img/Koala.jpg" ref="cropper" alt="" />
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "BaseCropper",
  data() {
    return {
        cropper: null
    };
  },
  mounted() {
    this.cropper = new Cropper(this.$refs.cropper, {
    //   aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
  },
  methods: {},
};
</script>

<style lang="less" module>
.container {
    img {
        width: 400px;
        height: 300px;
    }
}
</style>
