<template>
  <div>
    <div class="nav">
      <router-link class="margin"
                   :to="{name: 'css2D'}">css2D</router-link>
      <router-link class="margin"
                   :to="{name: 'cube'}">cube</router-link>
      <router-link class="margin"
                   :to="{name: 'ceshi'}">ceshi</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>

<style lang="less">
.nav {
  .margin {
    margin: 0 10px;
  }
}
</style>