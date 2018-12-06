<template>
  <div class="wrapCube">
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
</template>
<script>
export default {
  name: 'cube'
}
</script>

<style>
.wrapCube {
  width: 200px;
  height: 200px;
  /*border: 1px solid blue;*/
  position: relative;
  margin: 300px auto;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
}
.wrapCube > .box {
  position: absolute;
  top: 0;
  left: 0;
  /* text-align: center; */
  /* line-height: 200px; */
  width: 100%;
  height: 100%;
  /* color: white; */
  background: red;
  /* opacity: 0.5; */
  /* font-size: 50px; */
  transition: 1s;
  /* box-shadow: 0px 0px 100px #ffff66; */
  /* border-radius: 20px; */
}
.wrapCube .box:nth-child(1) {
  background: green;
  transform: rotateX(90deg) translateZ(100px);
}
.wrapCube .box:nth-child(2) {
  background: yellow;
  transform: rotateX(90deg) translateZ(-100px);
}
.wrapCube .box:nth-child(3) {
  background: blue;
  transform: rotateY(90deg) translateZ(-100px);
}
.wrapCube .box:nth-child(4) {
  background: pink;
  transform: rotateY(90deg) translateZ(100px);
}
.wrapCube .box:nth-child(5) {
  background: pink;
  transform: translateZ(100px);
}
.wrapCube .box:nth-child(6) {
  background: pink;
  transform: translateZ(-100px);
}

</style>
