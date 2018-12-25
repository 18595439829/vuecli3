<template>
  <div class="es6">
    <div class="es6Menu">
      <router-link class="flex"
                   :to="{name: 'es6-10'}">对象新增方法</router-link>
      <router-link class="flex"
                   :to="{name: 'async'}">async</router-link>
      <router-link class="flex"
                   to="es6-12">es6-12</router-link>
      <router-link class="flex"
                   to="es6-13">es6-13</router-link>
      <router-link class="flex"
                   to="es6-14">es6-14</router-link>
      <router-link class="flex"
                   to="es6-15">es6-15</router-link>
    </div>
    <div class="es6Content">
      <transition name="slide-right">
        <router-view></router-view>
      </transition>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
export default {}
</script>
<style>
.es6 {
}
.es6 .es6Menu {
  /* position: fixed;
  left: 20px; */
  float: left;
  padding-right: 5px;
  border-right: 1px solid gray;
}
.es6 .es6Menu .flex {
  display: block;
}
.es6 .es6Content {
  float: left;
  margin-left: 10px;
}
</style>
