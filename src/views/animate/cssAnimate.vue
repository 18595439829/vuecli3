<template>
  <div class="wrap">
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
  name: 'css2D'
}
</script>

<style type="text/css">
.wrap {
  width: 200px;
  height: 200px;
  /*border: 1px solid blue;*/
  position: relative;
  margin: 300px auto;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
}
.wrap > .box {
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 200px;
  width: 100%;
  height: 100%;
  color: white;
  background: red;
  opacity: 0.5;
  font-size: 50px;
  transition: 1s;
  box-shadow: 0px 0px 100px #ffff66;
  border-radius: 20px;
}

.wrap > .box:nth-child(1) {
  background: green;
  /*transform: rotateX(90deg) translateZ(100px);*/
  transition-delay: 0s;
}
.wrap > .box:nth-child(2) {
  background: yellow;
  /*transform: rotateX(90deg) translateZ(-100px);*/
  transition-delay: 1s;
}
.wrap > .box:nth-child(3) {
  background: blue;
  /*transform: rotateY(90deg) translateZ(-100px);*/
  transition-delay: 2s;
}
.wrap > .box:nth-child(4) {
  background: pink;
  /*transform: rotateY(90deg) translateZ(100px);*/
  transition-delay: 3s;
}
.wrap > .box:nth-child(5) {
  background: pink;
  /*transform: translateZ(100px);*/
  transition-delay: 4s;
}
.wrap > .box:nth-child(6) {
  background: pink;
  /*transform: translateZ(-100px);*/
  transition-delay: 5s;
}

.wrap:hover .box:nth-child(1) {
  background: green;
  transform: rotateX(90deg) translateZ(100px);
}

.wrap:hover .box:nth-child(2) {
  background: yellow;
  transform: rotateX(90deg) translateZ(-100px);
}
.wrap:hover .box:nth-child(3) {
  background: blue;
  transform: rotateY(90deg) translateZ(-100px);
}
.wrap:hover .box:nth-child(4) {
  background: pink;
  transform: rotateY(90deg) translateZ(100px);
}
.wrap:hover .box:nth-child(5) {
  background: pink;
  transform: translateZ(100px);
}
.wrap:hover .box:nth-child(6) {
  background: pink;
  transform: translateZ(-100px);
}
.wrap:hover {
  transform: rotateX(3600deg) rotateY(3600deg);
  transition: 100s 6s;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>