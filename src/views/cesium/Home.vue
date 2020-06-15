<template>
  <div :class="$style['container']">
    <Menu :theme="'light'" active-name="1" :width="'150px'" @on-select="menuSelect">
      <MenuItem v-for="item in menu" :key="item.name" :name="item.name">
        <Icon type="md-chatbubbles" />
        {{item.label}}
      </MenuItem>
    </Menu>
    <router-view :class="$style['content']"></router-view>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
      return {
          menu: [
              {
                  name: 'InitCesium',
                  label: 'init',
              }
          ]
      }
  },
  methods: {
      menuSelect(name) {
          this.$router.push({name: name})
      }
  }
};
</script>
<style lang="less" module>
.container{
    display: flex;
    .menu {
        width: 150px;
    }
    .content {
        flex: 1;
        width: 100%;
    }
}
</style>
