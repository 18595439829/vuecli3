<template>
  <div class="home">
    <svg class="icon"
         aria-hidden="true">
      <use xlink:href="#icon-kongxian"></use>
    </svg>
    <Button @click="btnClick">点击测试外部js</Button>
    <Button @click="serverClick">请求node.js_http</Button>
    <Button @click="expressClickGET">请求node.js_express_GET</Button>
    <Button @click="expressClickPOST">请求node.js_express_POST</Button>
    <div class="iptsDiv">
      <input type="text"
             class="iptText">
      <input type="text"
             class="iptText1">
      <input type="text"
             class="iptText">
    </div>

  </div>
</template>

<script>
import homeJS from '../assets/js/home'
import '../assets/css/iconfont/iconfont'
export default {
  methods: {
    btnClick() {
      homeJS.btnClick()
    },
    serverClick() {
      let params = {
        name: 'admin',
        password: '123456'
      }
      this.$axios.get('/node', {params: params}).then( (res) => {
        console.log(res)
      })
    },
    expressClickGET() {
      let params = {
        name: 'admin',
        password: '123456'
      }
      this.$axios.get('/Express', {params: params}).then( (res) => {
        console.log(res)
      })
    },
    expressClickPOST() {
      let params = {
        name: 'admin',
        password: '123456'
      }
      this.$axios.post('/Express', {params: params}).then( (res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style>
@import '../assets/css/home.css';
@import '../assets/css/iconfont/iconfont.css';
.home {
  position: relative;
}
.home .iptsDiv {
  position: absolute;
}
</style>

