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
    <div>
      <canvas class="canvas"></canvas>
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
      this.$axios.get('/node', { params: params }).then(res => {
        console.log(res)
      })
    },
    expressClickGET() {
      let params = {
        name: 'admin',
        password: '123456'
      }
      this.$axios.get('/Express', { params: params }).then(res => {
        console.log(res)
      })
    },
    expressClickPOST() {
      let params = {
        name: 'admin',
        password: '123456'
      }
      this.$axios.post('/Express', { params: params }).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    //通过FormData构造函数创建一个空对象
    var formdata = new FormData()
    //通过append()方法在末尾追加key为name值为laoliu的数据
    formdata.append('name', 'laoliu')
    console.log(formdata.getAll('name'))
    //通过append()方法在末尾追加key为name值为laoliu2的数据
    formdata.append('name', 'laoliu2')
    //通过get方法读取key为name的第一个值
    console.log(formdata.get('name')) //laoliu
    //通过getAll方法读取key为name的所有值
    console.log(formdata.getAll('name')) //["laoliu", "laoliu2"]

    //将存在的key为name的值修改为laoli
    formdata.set('name', 'laoli')
    //通过get方法读取key为name的第一个值
    console.log(formdata.get('name')) //laoli
    //通过getAll方法读取key为name的所有值
    console.log(formdata.getAll('name')) //["laoli"]
  }
}
</script>
<style lang="less">
@import '../assets/css/home.css';
@import '../assets/css/iconfont/iconfont.css';
.home {
  position: relative;
  .canvas {
    width: 400px;
    height: 300px;
  }
}
.home .iptsDiv {
  position: absolute;
}
</style>

