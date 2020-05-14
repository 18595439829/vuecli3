<template>
  <div :class="$style['container']">
    <Menu :theme="'light'" active-name="1" :width="'150px'" @on-select="menuSelect">
      <MenuItem name="test">
        test
      </MenuItem>
      <MenuItem name="ShiLiangTuCeng">
        <Icon type="md-chatbubbles" />
        矢量图层
      </MenuItem>
      <MenuItem name="TileLayer">
        <Icon type="md-heart" />
        TileLayer
      </MenuItem>
      <MenuItem name="HeatMap">
        <Icon type="md-leaf" />
        热力图
      </MenuItem>
      <MenuItem name="DrawMap">
        <Icon type="md-leaf" />
        画图
      </MenuItem>
    </Menu>
    <router-view :class="$style['content']"></router-view>
  </div>
</template>
<script>
export default {
  name: "Home",
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
