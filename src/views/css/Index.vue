<template>
  <div>
    <div class="nav" v-for="item in menu" :key="item.name">
      <router-link class="margin" :to="{ name: item.name }">{{item.title}}</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
      return {
          menu: [
              {
                  title: '1.交错动画',
                  name: 'staggetAnimate'
              },
              {
                  title: 'css-module@keyframes',
                  name: 'keyframes'
              }
          ]
      }
  }
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