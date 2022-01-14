<template>
  <div :class="$style['container']">
    <div :class="[$style['content'], 'content']">
      <img :src="IMG" alt="" />
    </div>
  </div>
</template>

<script>
import IMG from "@/assets/img/Koala.jpg";
export default {
  name: "TheCssModule",
  data() {
    return {
      IMG,
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 50%;
    height: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content :local {
    animation: reverse 5s ease;
  }
}
:local {
  @keyframes reverse {
    0% {
      transform: rotateY(0);
    }
    50% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
}
</style>
<style lang="less" scoped>
// .content {
//     animation: reverse 5s ease;
// }
//  @keyframes reverse {
//      0% {
//          transform: rotateY(0)
//      }
//      50% {
//          transform: rotateY(180deg)
//      }
//      100% {
//           transform: rotateY(0deg)
//      }
//  }
</style>