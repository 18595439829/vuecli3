<template>
  <div ref="bgDiv">
    有默认值
    <ColorPicker v-model="color1"
                 @on-change="colorChange" />
    <Button @click="bgClick('purple')">紫色</Button>
    <Button @click="bgClick('white')">白色</Button>
    <Button @click="bgClick('red')">红色</Button>
    <div 
         :class="{widthHeight: true,bgColorP: isPurple,bgColorW: isWhite,bgColorR: isRed}">
      <h3>自定义主题更换</h3>
    </div>
  </div>
</template>
<script>
export default {
  // http://www.cnblogs.com/niubilityWly/p/8017176.html
  data() {
    return {
      color1: '#19be6b',
      isPurple: false,
      isWhite: false,
      isRed: false
    }
  },
  methods: {
    colorChange(v) {
      console.log(v, this.ColorReverse(v))
      this.$refs.bgDiv.style.background = v
      this.$refs.bgDiv.style.color = this.ColorReverse(v)
    },
    ColorReverse(OldColorValue) {
      var OldColorValue = '0x' + OldColorValue.replace(/#/g, '')
      var str = '000000' + (0xffffff - OldColorValue).toString(16)
      return '#' + str.substring(str.length - 6, str.length)
    },
    bgClick(v) {
      console.log(this.$store, v)
      // this.$store.commit('changeBGColor', v)
      if (v === 'purple') {
        this.isPurple = true
        this.isWhite = false
        this.isRed = false
      } else if (v === 'white') {
        this.isWhite = true
        this.isPurple = false
        this.isRed = false
      } else if (v === 'red') {
        this.isRed = true
        this.isPurple = false
        this.isWhite = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.widthHeight {
  margin: 10px 20px;
  width: 200px;
  height: 100px;
}
.bgColor (@bgColor: black, @fColor: white ) {
  background: @bgColor;
  color: @fColor;
}
.bgColorP {
  .bgColor(purple, white);
}
.bgColorW {
  .bgColor(white, black);
}
.bgColorR {
  .bgColor(red, black);
}
</style>
