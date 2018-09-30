<template>
  <div class="about">
    <h1>About</h1>
    <h2>啊实打实</h2>
    <div class="music">
      <audio controls="controls"
             style="width: 100%"
             ref="music">
        <!-- <source src="@/assets/song.ogg" type="audio/ogg" /> -->
        <source src="@/assets/music.mp3" type="audio/mpeg" />
        您的浏览器不支持 audio 标签。
      </audio>
        <Button @click="pause">暂停</Button>
        <Button @click="play">播放</Button>
        <Button @click="progress">下载</Button>
        <video style="width:100%;" controls="controls">                         
          <source src="@/assets/movie.ogg"
                                                                    type="video/ogg"    autostart="false">
          您的浏览器不支持 vodeo 标签。
      </video>  

    </div>
    <a href="www/baidu.com">fsafds</a>
  </div>
</template>
<script>
export default {
  methods: {
    pause() {
      this.$refs.music.pause()
    },
    play() {
      this.$refs.music.play()
      console.log('播放', this.$refs.music.currentSrc)
    },
    progress() {
      window.open(this.$refs.music.currentSrc)
    }
  },
  created() {}
}
</script>
<style>
.music {
  width: 500px;
  background: url('../assets/logo.png');
  background-size: cover;
}
</style>

