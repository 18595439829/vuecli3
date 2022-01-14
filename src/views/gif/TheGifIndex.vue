<template>
  <div :class="$style['container']">
    TheGifIndex
    <img ref="gif" :src="GIF" alt="" />
    <div :class="$style['buttons']">
      <Button @click="action('reload')">重播</Button>
      <Button @click="action('pause')">暂停</Button>
      <Button @click="action('play')">播放</Button>
    </div>
  </div>
</template>

<script>
import GIF from "@/static/img/example.gif";
// import LibGif from '@/common/libgif-js/libgif1.js'
export default {
  name: "TheGifIndex",
  data() {
    return {
      GIF,
      libgif: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.libgif = new SuperGif({
        gif: this.$refs.gif,
      });
      this.libgif.load();
    },
    action(type) {
      switch (type) {
        case "reload":
          this.libgif.move_to(0);
          this.libgif.play();
          break;
        case "pause":
          this.libgif.pause();
          break;
        case "play":
          this.libgif.play();
          break;
      }
    },
  },
};
</script>

<style lang="less" module>
.container {
    .buttons {
        button {
            margin-right: 12px;
        }
    }
}
</style>
