<template>
  <div :class="$style['container']">
    <div>
      <router-link
        v-for="item in menu"
        :to="{ name: item.path }"
        :key="item.path"
      >
        {{ item.label }}</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      menu: [
        {
          label: "Object的变化侦测",
          path: "Chapter2"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" module>
.container {
}
</style>
