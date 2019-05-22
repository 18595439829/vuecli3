<template>
  <div>
    <div class="router">
      <router-link :to="{name: 'chinese'}">汉语拼音</router-link> | 
      <router-link :to="{name: 'fileUpload'}">文件上传</router-link>
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