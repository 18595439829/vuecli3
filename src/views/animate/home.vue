<template>
  <div>
    <div class="nav">
      <router-link class="margin" :to="{ name: 'cssAnimate' }">cssAnimate</router-link>
      <router-link class="margin" :to="{ name: 'cube' }">cube</router-link>
      <router-link class="margin" :to="{ name: 'ceshi' }">ceshi</router-link>
      <router-link class="margin" :to="{ name: '3D' }">3D</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>

<style lang="less">
.nav {
  .margin {
    border: 1px solid #cccccc;
    margin: 0 10px;
  }
}
</style>