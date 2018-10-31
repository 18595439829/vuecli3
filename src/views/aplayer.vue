<template>
    <div>
        <div style="padding:10px 0;">
            <aplayer autoplay :music="musicList">
            </aplayer>
        </div>
 
    </div>
</template>  
  
<script>
import aplayer from "vue-aplayer";
 
export default {
  name: "Aplayer",
  components: {
    //别忘了引入组件
    aplayer
  },
  data() {
    return {
      musicList: {
        title: "youkao100",
        src: 'http://172.18.238.202:7788/voice/failed11.mp3',
        artist: ' ',
        pic: ""
        // lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
      }
    };
  },
  computed: {
    url() {
      return this.pdfurl;
    }
  },
  mounted() {
  }
};
</script>  
  
<style>
</style>  
