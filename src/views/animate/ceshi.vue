<template>
  <div>
    <div class="wrapCeshi">
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
    <div class="box"><img src="../../assets/logo.png"
           alt="" /></div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'ceshi'
}
</script>
<style lang="less">
.wrapCeshi{
  position: relative;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateX(10deg) rotateY(10deg);
  margin: 300px auto;
  .box {
    width: 100px;
    height: 100px;
    opacity: 0.5;
    img{
      width: 100%;
    }
    position: absolute;
    left: 0;
    top: 0;
    &:nth-child(1){
      background: green;
      transform: translateZ(50px);
    }
    &:nth-child(2){
      background: yellow;
      transform:  translatez(-50px);
    }
    &:nth-child(3){
      background: blue;
      transform: rotateY(90deg) translateZ(50px);
    }
     &:nth-child(4){
       background: pink;
      transform: rotateY(90deg) translateZ(-50px);
    }
     &:nth-child(5){
       background: gray;
      transform: rotatex(90deg) translateZ(50px);
    }
     &:nth-child(6){
       background: black;
      transform: rotateX(90deg) translateZ(-50px);
    }
  }
}
</style>
