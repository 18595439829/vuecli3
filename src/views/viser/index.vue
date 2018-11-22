<template>
  <div class="viser">
    <div class="Menu">
      <router-link class="flex" :to="{name: 'line'}">线形图</router-link>
      <router-link class="flex" :to="{name: 'bar'}">柱状图</router-link>
    </div>
    <div class="Content">
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
    </div>
    <!-- <div style="clear:both"></div> -->
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.viser .Menu .flex {
  margin: 10px;
}

</style>
