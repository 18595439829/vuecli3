<template>
<div :class="$style['container']">
  <div :class="$style['header']">
    position: absolute;
    top: 0;
    width: 100%;
    height: 54px;
    background: blue;
    z-index: 2;
    color: #fff;
  </div>
<div :class="$style['content']">
  position: absolute;
  top: 0;
  padding-top: 54px;
  width: 100%;
  height: 200px;
  background: yellow;
  <div :class="$style['modal']">
    position: fixed;
    top: 0;
    left: 50%;
    background: red;
    z-index: 999;
    color: #fff;
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'TheLucky',
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
 .container {
   .header {
     position: absolute;
     top: 0;
     width: 100%;
     height: 54px;
     background: blue;
     z-index: 2;
     color: #fff;
   }
   .content {
    //  position: absolute;
    //  top: 0;
     padding-top: 54px;
     width: 100%;
     height: 200px;
     background: yellow;
    //  z-index: 1;
    transform: translateY(54px);
     .modal {
       position: fixed;
       top: 0;
       left: 50%;
       background: red;
       z-index: 999;
       color: #fff;
     }
   }
 }
</style>
