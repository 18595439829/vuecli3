<template>
  <div :class="$style['container']">
      <div :class="$style['first']">111</div>
      <input
      type="file"
      accept="image/*;"
      class="abc"
    >
    <input
      type="file"
      accept="image/*"
      capture="camera"
      class="abc"
    >
    <input
      type="file"
      accept="image/*"
      class="abc"
    >
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {};
  },
  methods: {},
}
</script>

<style lang="less" module>
.container{

}
</style>
