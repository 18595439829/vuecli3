<template>
  <div class="home">
    <Button @click="btnClick">点击测试外部js</Button>
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
export default {
  methods: {
    btnClick() {
      homeJS.btnClick()
    }
  }
}
</script>
<style>
@import '../assets/css/home.css';
.home {
  position: relative;
}
.home .iptsDiv {
  position: absolute;
}
</style>

