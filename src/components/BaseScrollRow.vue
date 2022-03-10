<template>
  <div ref="container" :class="$style['card-container']">
    <div ref="content" :class="$style['card-list']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  mounted() {
    document.body.addEventListener("mousewheel", this.containerScroll);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousewheel", this.containerScroll);
  },
  methods: {
    containerScroll(e) {
      console.log(e);
      if (
        e.target === this.$refs.container ||
        this.$refs.container.contains(e.target)
      ) {
        this.scrollFunction(e.deltaY);
      }
    },
    scrollFunction(scroll) {
      this.$refs.content.scrollLeft += scroll ;
    },
  },
};
</script>

<style lang="less" module>
.card-container {
  width: 100%;
  overflow: hidden;
  .card-list {
    display: flex;
    overflow-x: auto;
    & > div {
      flex-shrink: 0;
    }
  }
}
</style>
