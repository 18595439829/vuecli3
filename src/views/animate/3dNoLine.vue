<template>
  <div :class="$style['container']">
    <div :class="$style['parent']">
      <div :class="$style['content']">
        <div
          :class="[$style['item'], $style[`animation${item.id}`]]"
          :style="{ transform: item.translate, opacity: item.opticy }"
          v-for="(item, index) in content"
          :key="index"
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
        >
          {{ item.name }}
        </div>
      </div>
      <div :class="$style['img']">0</div>
    </div>
  </div>
</template>

<script>
import KaoLa from "@/assets/img/Koala.jpg";
export default {
  name: "NoLine3d",
  components: {},
  data() {
    return {
      KaoLa,
      deg: 0,
      contentWidth: 500,
      contentHeight: 400,
      content: [
        {
          id: 1,
          name: "第一个",
          translate: "",
          opacity: 1
        },
        {
          id: 2,
          name: "第二个",
          translate: "",
          opacity: 1
        },
        {
          id: 3,
          name: "第三个",
          translate: "",
          opacity: 0.8
        },
        {
          id: 4,
          name: "第四个",
          translate: "",
          opacity: 0.6
        },
        {
          id: 5,
          name: "第五个",
          translate: "",
          opacity: 0.8
        }
      ],
      second: 2,
      count: 0,
      isPlay: true
    };
  },
  mounted() {
    this.setAnimation();
  },
  methods: {
    setAnimation() {
      let i = 0;
      const timer = () => {
        if (!this.isPlay) {
          return;
        }
        i += 1;
        if (i >= 60 * this.second) {
          i = 0;
          this.deg -= 360 / 5;
          if (this.deg <= -360) {
            this.deg = 0;
          }
          this.count += 1;
          if (this.count > 4) {
            this.count = 0;
          }
          this.setData(this.count);
        }
        window.requestAnimationFrame(timer);
      };
      window.requestAnimationFrame(timer);
    },
    setData(count) {
      const trs = [
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.1}px,${this
              .contentHeight * 0.7}px,0)`,
            opacity: 1
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.6}px,${this
              .contentHeight * 0.7}px,0)`,
            opacity: 1
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.75}px,${this
              .contentHeight * 0.3}px,-100px)`,
            opacity: 0.8
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.35}px,0,-200px)`,
            opacity: 0.6
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * -0.05}px,${this
              .contentHeight * 0.3}px,-100px)`,
            opacity: 0.8
          }
        }
      ];
      for (var i = 0; i < this.content.length; i++) {
        let index = (i + count) % trs.length;
        this.$set(this.content[i], "translate", trs[index].content.translate);
        this.$set(this.content[i], "opacity", trs[index].content.opacity);
      }
    },
    mouseEnter() {
      this.isPlay = false;
    },
    mouseLeave() {
      this.isPlay = true;
      this.count += 1;
      if (this.count > 4) {
        this.count = 0;
      }
      this.setData(this.count);
      this.setAnimation();
    }
  }
};
</script>

<style lang="less" module>
@content-width: 500px;
@content-height: 400px;
@item-width: 150px;
@item-height: 48px;
.container {
  .parent {
    width: @content-width;
    height: @content-height;
    border: 1px solid #cccccc;
    @width: 100px;
    position: relative;
    .content {
      width: @content-width;
      height: @content-height;
      position: absolute;
      border: 1px solid red;
      perspective: @content-width;
      left: 0;
      top: 0;
      .item {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: @item-width;
        height: @item-height;
        line-height: @item-height;
        border-radius: 3px;
        box-shadow: 0px 0px 5px #fff;
        font-size: 24px;
        text-align: center;
        transition: all 1s ease;
      }
      .animation1 {
        background-color: red;
        transform: translate3d(@content-width * 0.1, @content-height * 0.7, 0);
      }
      .animation2 {
        background-color: green;
        transform: translate3d(@content-width * 0.6, @content-height * 0.7, 0);
      }
      .animation3 {
        background-color: yellow;
        transform: translate3d(
          @content-width * 0.75,
          @content-height * 0.3,
          -100px
        );
      }
      .animation4 {
        background-color: peru;
        transform: translate3d(@content-width * 0.35, 0, -200px);
      }
      .animation5 {
        background-color: purple;
        transform: translate3d(
          @content-width * -0.05,
          @content-height * 0.3,
          -100px
        );
      }
    }
    .img {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border: 1px solid #ccc;
      border-radius: 50%;
      transform-style: preserve-3d;
      transition: all 1s ease;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate3d(-50%, -50%, 0) rotateX(30deg) scaleZ(0.5);
    }
  }
}
</style>
