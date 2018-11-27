<template>
  <div ref="bgDiv">
    有默认值
    <ColorPicker v-model="color1"
                 @on-change="colorChange" />
    <Button @click="bgClick('purple')">紫色</Button>
    <Button @click="bgClick('white')">白色</Button>
    <Button @click="bgClick('red')">红色</Button>
    <div :class="{widthHeight: true,bgColorP: isPurple,bgColorW: isWhite,bgColorR: isRed}">
      <div class="lessStyle">
        <div class="lessColor"></div>
        <div class="banner">啦啦啦啦啦</div>
      </div>
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
  width: 400px;
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

@base: #f04615;
@width: 0.5;
@my-selector: banner;

.text3d(@color) {
  color: @color;
  text-shadow: 1px 1px 0px darken(@color, 5%), 2px 2px 0px darken(@color, 10%),
    3px 3px 0px darken(@color, 15%), 4px 4px 0px darken(@color, 20%),
    4px 4px 2px #000;
}

.lessStyle {
  text-align: center;
  .lessColor {
    width: percentage(@width); // returns `50%`
    height: 100px;
    color: saturate(@base, 5%);
    background-color: spin(lighten(@base, 25%), 8);
  }
  .@{my-selector} {
    font-size: 32pt;
    .text3d(#0982c1);
  }
}
</style>
