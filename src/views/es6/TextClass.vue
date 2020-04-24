<template>
  <div :class="$style['container']">
    <span>{{content}}</span>
    <div v-if="show">
      是否展示掩藏
    </div>
  </div>
</template>

<script>
export default {
  name: "TextClass",
  props: {
    text: {
      type: Object,
      required: true,
    },
    isShow: {
        type: Object,
        required: false,
        default: true,
    }
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    content() {
      return this.text.info;
    },
    // show() {
    //   return this.isShow.info;
    // }
  },
  watch: {
    isShow: {
      handler(v) {
        console.log(v);
      this.show = v.info;
      },
      deep:true,
    }
  },
  methods: {
    setShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang='less' module>
.container {
    width: 200px;
    height: 200px;
    background-color: yellowgreen;
}
</style>
