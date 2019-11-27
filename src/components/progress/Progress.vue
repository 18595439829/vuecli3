<template>
  <div
    v-show="isShow"
    :class="$style['container']"
    :style="{ width: `${theWidth}%`, height: `${height}px`, background: theBackground }"
  >
    <!-- <div v-show="isShow" :class="$style['progress']" /> -->
  </div>
</template>
<script>
import { setTimeout } from 'timers';

export default {
  name: 'Progress',
  props: {
    height: {
      type: Number,
      required: false,
      default: 5,
    },
    background: {
      type: String,
      required: false,
      default: '#00b35c',
    },
    hideTime: {
      type: Number,
      required: false,
      default: 300,
    },
  },
  data() {
    return {
      theWidth: 0,
      theBackground: this.background,
      isShow: false,
    };
  },
  watch: {
    theWidth(v) {
      if (v >= 0 && v < 50) {
        this.setWidth(5);
      } else if (v >= 50 && v < 80) {
        this.setWidth(10);
      } else if (v >= 80 && v < 95) {
        this.setWidth(50);
      } else if (v >= 95 && v < 99) {
        this.setWidth(100);
      }
    },
  },
  methods: {
    setWidth(time) {
      setTimeout(() => {
        this.theWidth += 0.1;
      }, time);
    },
    start() {
      this.theWidth = 0;
      this.isShow = true;
      this.theBackground = '#00b35c';
      this.setWidth(50);
    },
    finish() {
      this.theWidth = 100;
      this.theBackground = '#00b35c';
      setTimeout(() => {
        this.isShow = false;
      }, this.hideTime);
    },
    fail() {
      this.theWidth = 100;
      this.theBackground = '#ff4a46';
      setTimeout(() => {
        this.isShow = false;
      }, this.hideTime);
    },
  },
};
</script>
<style lang="less" module>
.container {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
