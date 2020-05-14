<template>
  <div :class="$style['container']">
    <div :class="$style['parent']">
      <div :class="$style['content']">
        <div
          :class="[$style['item'], $style[`animation${item.id}`]]"
          :style="{ transform: item.translate, opacity: item.opticy }"
          v-for="(item, index) in content"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <div :class="$style['line']">
        <div
          :class="$style[`line${item.id}`]"
          :style="{ transform: item.transform }"
          v-for="(item, index) in line"
          :key="index"
        ></div>
      </div>
      <div :class="$style['img']">0</div>
    </div>
  </div>
</template>

<script>
import KaoLa from "@/assets/img/Koala.jpg";
export default {
  name: "Line3d",
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
      line: [
        {
          id: 1,
          transform: ""
        },
        {
          id: 2,
          transform: ""
        },
        {
          id: 3,
          transform: ""
        },
        {
          id: 4,
          transform: ""
        },
        {
          id: 5,
          transform: ""
        }
      ]
    };
  },
  mounted() {
    this.setAnimation(2);
  },
  methods: {
    setAnimation(second) {
      let i = 0;
      let count = 0;
      const timer = () => {
        i += 1;
        if (i >= 60 * second) {
          this.deg -= 360 / 5;
          if (this.deg <= -360) {
            this.deg = 0;
          }
          i = 0;
          count += 1;
          if (count > 4) {
            count = 0;
          }
          this.setData(count);
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
          },
          line: {
            transform: `rotateX(0deg) rotateY(47deg) rotateZ(164deg);`
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.6}px,${this
              .contentHeight * 0.7}px,0)`,
            opacity: 1
          },
          line: {
            transform: `rotateX(45deg) rotateY(-68deg) rotateZ(60deg)`
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.75}px,${this
              .contentHeight * 0.3}px,-100px)`,
            opacity: 0.8
          },
          line: {
            transform: `rotateX(-3deg) rotateY(70deg) rotateZ(358deg)`
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * 0.35}px,${this
              .contentHeight * -0.1}px,-200px)`,
            opacity: 0.6
          },
          line: {
            transform: `rotateX(62deg) rotateY(-31deg) rotateZ(258deg)`
          }
        },
        {
          content: {
            translate: `translate3d(${this.contentWidth * -0.05}px,${this
              .contentHeight * 0.3}px,-100px)`,
            opacity: 0.8
          },
          line: {
            transform: `rotateX(0deg) rotateY(41deg) rotateZ(185deg);`
          }
        }
      ];
      for (var i = 0; i < this.content.length; i++) {
        let index = (i + count) % trs.length;
        // this.$set(this.content[i], "translate", trs[index].content.translate);
        // this.$set(this.content[i], "opacity", trs[index].content.opacity);
        // this.$set(this.line[i], "transform", trs[index].line.transform);
        this.line[i].transform = trs[index].line.transform;
      }
      console.log(this.line);
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
    .line {
      width: @content-width;
      height: @content-height;
      position: relative;
      transform: translate3d(
            @content-width * 0.5,
            @content-height * 0.5,
            100px
          );
      & > div {
        width: @content-width*0.6;
        border: 1px solid #cccccc;
        position: absolute;
        transition: all 1s ease;
        transform-origin: 0 0;
      }
      .line1 {
        border-color: red;
        transform: 
          rotateX(0deg) rotateY(47deg) rotateZ(164deg);
      }
      .line2 {
        border-color: green;
        transform: 
          rotateX(45deg) rotateY(-68deg) rotateZ(60deg);
      }
      .line3 {
        border-color: black;
        transform: rotateX(-3deg) rotateY(70deg) rotateZ(358deg);
      }
      .line4 {
        border-color: peru;
        transform: 
          rotateX(62deg) rotateY(-31deg) rotateZ(258deg);
      }
      .line5 {
        border-color: purple;
        transform: 
          rotateX(0deg) rotateY(41deg) rotateZ(185deg);
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
