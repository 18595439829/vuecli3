<template>
  <div :class="$style['container']">
    TheThirdComp
    <slot name="third" :data="{name: '第三级组件'}" />
  </div>
</template>

<script>
export default {
  name: 'TheThirdComp',
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
 .container {
 }
</style>
