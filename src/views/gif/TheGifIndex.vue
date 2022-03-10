<template>
  <div :class="$style['container']">
    TheGifIndex
    <img ref="gif" :src="GIF" alt="" />
    <div :class="$style['buttons']">
      <Button @click="action('reload')">重播</Button>
      <Button @click="action('pause')">暂停</Button>
      <Button @click="action('play')">播放</Button>
    </div>
    <div :class="$style['file']">
      <input type="file" @change="fileChange" />
    </div>
  </div>
</template>

<script>
import GIF from "@/static/img/example.gif";
import MP4Box from "mp4box";
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
    async fileChange(e) {
      console.log(e);
      let result;
      await this.checkVideoCode(e.target.files[0]).then((res) => {
        result = res;
        console.log(result);
      });
      if (result.mime.indexOf("hvc") !== -1) {
        console.log("格式不支持");
      }
    },
    checkVideoCode(file) {
      return new Promise((resolve, reject) => {
        const mp4boxFile = MP4Box.createFile();
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
          const arrayBuffer = e.target.result;
          arrayBuffer.fileStart = 0;
          mp4boxFile.appendBuffer(arrayBuffer);
        };
        mp4boxFile.onReady = function (info) {
          resolve(info);
        };
        mp4boxFile.onError = function (info) {
          reject(info);
        };
      });
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
  .file {
    input {
      width: 150px;
      height: 32px;
    }
  }
}
</style>
