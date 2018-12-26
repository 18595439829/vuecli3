<template>
  <div>
    <div class="router">
      <router-link :to="{name: 'chinese'}">汉语拼音</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'index'
}
</script>
<style lang="less">
  
</style>