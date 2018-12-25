<template>
  <div>
    <div style="padding:10px 0;">
      <aplayer autoplay
               :music="musicList">
      </aplayer>
    </div>
    {{number | capitalize}}
    <img :src="imgUrl()" alt="">
    <audio :src="audioUrl()" controls="controls"></audio>
    <div>
      <Button @click="arrClick">点击</Button>
      <div v-if="arrList.length == 0">
        数组为空
      </div>
       <div v-else-if="arrList.length > 0">
          数组有值
      </div>
    </div>
  </div>
</template>  
  
<script>
import aplayer from 'vue-aplayer'

export default {
  name: 'Aplayer',
  components: {
    //别忘了引入组件
    aplayer
  },
  data() {
    return {
      arrList: [],
      musicList: {
        title: 'youkao100',
        src: '../assets/music.mp3',
        artist: ' ',
        pic: ''
        // lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
      },
      number: 1000000000.1001
    }
  },
  filters: {
    capitalize: num => {
      num = num.toString().split('.') // 分隔小数点
      var arr = num[0].split('').reverse() // 转换成字符数组并且倒序排列
      var res = []
      for (var i = 0, len = arr.length; i < len; i++) {
        if (i % 3 === 0 && i !== 0) {
          res.push(',') // 添加分隔符
        }
        res.push(arr[i])
      }
      res.reverse() // 再次倒序成为正确的顺序
      if (num[1]) {
        // 如果有小数的话添加小数部分
        res = res.join('').concat('.' + num[1])
      } else {
        res = res.join('')
      }
      return res
    }
  },
  methods: {
    arrClick() {
      if (this.arrList.length <= 0) {
        this.arrList = [1,2,3]
      } else if (this.arrList.length > 0) {
        this.arrList = []
      }
    },
    imgUrl() {
      let url = null
      url =  require('../assets/logo.png')
      console.log(url)
      return url
    },
    audioUrl () {
      let url = null
       url =  require('../assets/music.mp3')
       console.log(url)
      return url
      // console.log(require('../assets/music.mp3'))
      // this.musicList.src = window.URL.createObjectURL('../assets/music.mp3')
    }
  },
  computed: {
    url() {
      return this.pdfurl
    }
  },
  mounted() {
    this.audioUrl()
  }
}
</script>  
  
<style>
</style>  
