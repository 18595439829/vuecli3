<template>
  <div class="action">
    <div class="iconOne">
      <Icon :type="iconType"
            size="20"
            @click="actionClick" />
    </div>
    <div :class="{iconThree: true, iconAnimate: isIcon}">
      <Icon type="ios-add-circle"
            size="20"
            @click="iconClick('add')" />
      <Icon type="ios-alarm"
            size="20"
            @click="iconClick('alarm')" />
      <Icon type="ios-american-football"
            size="20"
            @click="iconClick('football')" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'action',
  data() {
    return {
      iconType: 'ios-add-circle',
      isIcon: false
    }
  },
  methods: {
    actionClick() {
      console.log(111)
      this.isIcon = true
    },
    iconClick(type) {
      switch (type) {
        case 'add':
          this.iconType = 'ios-add-circle'
          this.isIcon = false
          break
        case 'alarm':
          this.iconType = 'ios-alarm'
          this.isIcon = false
          break
        case 'football':
          this.iconType = 'ios-american-football'
          this.isIcon = false
          break
      }
    }
  }
}
</script>
<style lang="less">
@width: 20px;
.action {
  position: relative;
  width: 200px;
  height: 25px;
  overflow: hidden;
  .iconOne {
    position: absolute;
    width: @width;
    height: @width;
    background: #ffffff;
    z-index: 10;
  }

  .iconThree {
    position: absolute;
    width: @width*3;
    left: -@width*3;
    transition: 1s all;
    z-index: 1;
  }
  .iconAnimate {
    left: @width;
  }
}
.action:hover {
  background: #ebf7ff;
}
</style>
