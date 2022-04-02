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
    return {
      list: [
        {
          id: 1,
          name: '定时揽收1',
          formList: [
            {
              key: '1-1',
              value: '京东1',
              isChecked: true,
              isDisabled: false,
            },
            {
              key: '1-2',
              value: '淘宝1',
              isChecked: false,
              isDisabled: false,
            },
          ] 
        },
        {
          id: 2,
          name: '定时揽收2',
          isDisabled: false,
          formList: [
            {
              key: '2-1',
              value: '京东',
              isChecked: false,
              isDisabled: true,
            },
            {
              key: '2-2',
              value: '淘宝2',
              isChecked: false,
              isDisabled: false,
            },
          ] 
        }
      ]
    }
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
