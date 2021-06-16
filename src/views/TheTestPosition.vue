<template>
  <div :class="$style['container']">
    <div ref="content" :class="$style['content']" :style="contentStyle">
        <textarea ref="textarea" name="" id="" cols="30" rows="10" @input="mousemove"></textarea>
    </div>
  </div>
</template>

<script>
import {debounce} from 'lodash-es'
export default {
  name: "Index",
  data() {
    return {debounce,
        contentStyle: {}
    };
  },
  mounted() {
    //   this.$refs.textarea.addEventListener('input', debounce(this.mousemove, 200))
    window.addEventListener("resize", (e) => {
    //   console.log(e);
      let height = (e.target.innerWidth - 200) / (16 / 9)
      if (height >= e.target.innerHeight) {
          console.log('高度小')
          // 高度小
          this.contentStyle = {
              width: `calc((100vh - 100px) * (16 / 9))`,
              height: `calc(100vh - 100px)`
          }
      } else {
          console.log('宽度小')
          // 宽度小
          this.contentStyle = {
              width: `calc(100vw - 400px)`,
              height: `calc((100vw - 400px) / (16 / 9))`
          }
      }
      console.log(this.contentStyle)
    });
  },
  methods: {
      
      mousemove() {
          console.log(11111)
          debounce(() => {
              console.log(22222)
          }, 200)
      }
  },
};
</script>

<style lang="less" module>
.container {
  .content {
    margin: 50px 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 200px - 200px);
    height: calc(100vh - 100px);
    background: yellowgreen;
  }
}
</style>
<style lang="less">
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
