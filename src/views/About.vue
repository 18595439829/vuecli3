<template>
  <div class="about">
    <h1>About</h1>
    <h2>啊实打实</h2>
    <div class="music">
      <audio controls="controls"
             style="width: 100%"
             ref="music">
        <!-- <source src="@/assets/song.ogg" type="audio/ogg" /> -->
        <source src="@/assets/music.mp3"
                type="audio/mpeg" />
        您的浏览器不支持 audio 标签。
      </audio>
      <Button @click="pause">暂停</Button>
      <Button @click="play">播放</Button>
      <Button @click="progress">下载</Button>
      <video style="width:100%;" controls="controls">                         
        <source src="@/assets/movie.ogg" type="video/ogg"
                       autostart="false">
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
    },
    getSearchString(key, Url) {
      // 获取URL中?之后的字符
      var str = Url
      str = str.substring(0, str.length)
      console.log(1, str)
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arrStr = str.split('?')
      console.log('arrStr', arrStr)
      str = arrStr[1]
      var arr = str.split('&')
      console.log(2,arr)
      var obj = new Object()

      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split('=')
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1])
      }
      console.log(3,obj)
      return obj[key]
    }
  },
  created() {
    console.log(this.getSearchString('name', 'lala/lili?name=haha&password=123'))
  }
}
</script>
<style>
.music {
  width: 500px;
  background: url('../assets/logo.png');
  background-size: cover;
}
</style>

