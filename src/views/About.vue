<template>
  <div class="about">
    <h1>About</h1>
    <h2>啊实打实</h2>
    <div class="music">
      <audio controls="controls" style="width: 100%" ref="music">
        <!-- <source src="@/assets/song.ogg" type="audio/ogg" /> -->
        <source src="@/assets/music.mp3" type="audio/mpeg" />
        您的浏览器不支持 audio 标签。
      </audio>
      <Button @click="pause">暂停</Button>
      <Button @click="play">播放</Button>
      <Button @click="progress">下载</Button>
      <video ref="video" style="width: 100%" controls="controls">
                                 
        <source src="@/assets/movie.ogg" type="video/ogg" autostart="false" />
        您的浏览器不支持 vodeo 标签。</video
      >  
    </div>
    <Button @click="getVideoWidthHeight">获取视频宽高</Button>
    <a href="www/baidu.com">fsafds</a>
    <input v-focus type="text" />
    <TestUpload @on-add="add" />
    <TestUpload @on-add="getAge" />
    <base-fragment-preview :data="fragmentList"/> 
    <TheFirstComp />
  </div>
</template>
<script>
import mixins from "@/common/mixin.js";
import TestUpload from "@/components/TestUpload.vue";
import BaseFragmentPreview from '@/components/BaseFragmentPreview.vue';
import TheFirstComp from '@/components/slot/TheFirstComp.vue'
export default {
  components: {
    TestUpload,
    BaseFragmentPreview,
    TheFirstComp
  },
  mixins: [mixins],
  data() {
    return {
      fragmentList: [
        {
          id: '1',
          content: '两只老虎爱跳舞，小兔子乖乖拔萝卜'
        },
        {
          id: '2',
          content: '我和小鸭子学走路，童年时最美的礼物'
        },
        {
          id: '3',
          content: '小螺号呀嘀嘀地吹，我学海鸥展翅飞'
        },
        {
          id: '4',
          content: '不怕风雨不怕累，快快把本领都学会'
        }
      ]
    }
  },
  methods: {
    add() {
      console.log("add");
    },
    pause() {
      this.$refs.music.pause();
    },
    play() {
      this.$refs.music.play();
      console.log("播放", this.$refs.music.currentSrc);
    },
    getVideoWidthHeight() {
      console.log(this.$refs.video.offsetWidth,this.$refs.video.offsetHeight)
    },
    progress() {
      window.open(this.$refs.music.currentSrc);
    },
    getSearchString(key, Url) {
      // 获取URL中?之后的字符
      var str = Url;
      str = str.substring(0, str.length);
      console.log(1, str);
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arrStr = str.split("?");
      console.log("arrStr", arrStr);
      str = arrStr[1];
      var arr = str.split("&");
      console.log(2, arr);
      var obj = new Object();

      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      console.log(3, obj);
      return obj[key];
    },
  },
  created() {
    console.log(
      this.getSearchString("name", "lala/lili?name=haha&password=123")
    );
  },
};
</script>
<style>
.music {
  width: 500px;
  background: url("../assets/logo.png");
  background-size: cover;
}
</style>

