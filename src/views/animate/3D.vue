<template>
  <div :class="$style['container']">
    <NoLine :class="$style['noline']"/>
    <Line3d />
    <div :class="$style['test']">
      <Button @click="click">点击</Button>
      <div :class="$style['line']" v-for="(item, index) in rotate" :key="index" :style="{transform: item.transform}"></div>
    </div>
  </div>
</template>

<script>
import NoLine from '@/views/animate/3dNoLine.vue';
import Line3d from '@/views/animate/3dLine.vue';
export default {
  name: "Index3d",
  components: {
    NoLine,
    Line3d,
  },
  data() {
    return {
      rotate: [
        {
          transform: 'translate3d(500 * 0.5, 0, 0) rotateZ(10deg)',
        }
      ],
      deg: 0,
    };
  },
  methods: {
    click() {
      this.deg += 30;
      this.rotate[0].transform = `translate3d(500 * 0.5, 0, 0) rotateZ(${this.deg}deg)`
    }
  },
}
</script>

<style lang="less" module>
.container{
  display: flex;
  .line {
    width: 100px;
    border: 1px solid #1708ec;
    transform-origin:  0 0;
    transition: 1s all ease;
  }
}
</style>
