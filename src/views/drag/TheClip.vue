<template>
  <div :class="$style['container']">
    <div ref="content" :class="$style['content']" >
      <div ref="clip" data-moveable="true" :class="$style['example']" :style="{backgroundImage: `url(${KAOLA})`}">
        <img :src="KAOLA" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import KAOLA from "@/assets/img/Koala.jpg";
import Moveable from "moveable";

export default {
  name: "TheMoveable",
  data() {
    return {
      KAOLA,
      moveable: undefined,
      content: {},
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.moveable.destroy();
  },
  methods: {
    init() {
      this.content = this.$refs.content.getBoundingClientRect();
      this.moveable = new Moveable(
        this.$refs.content, // moveable元素的父元素
        {
          target: this.$refs.clip,
          className: "moveable", // 可交互组件的class名称
          clippable: true,
          defaultClipPath: "inset",
          customClipPath: "",
          clipRelative: false,
          clipArea: true,
          dragWithClip: true,
        }
      );
      this.moveable
        .on("clipStart", (e) => {
          console.log(e);
        })
        .on("clip", (e) => {
          console.log(e)
          // if (e.clipType === "rect") {
          //   e.target.style.clip = e.clipStyle;
          // } else {
          //   e.target.style.clipPath = e.clipStyle;
          // }
        })
        .on("clipEnd", (e) => {
          console.log(e);
        });
    },
    setMoveableTarget(target) {
      this.moveable.target = target;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .moveable-line {
  height: 5px !important;
}
</style>
<style lang="less" module>
.content {
  width: 50%;
  height: 50vh;
  border: 1px solid #ccc;
  position: relative;
  .example {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    background: #dddddd;
    position: absolute;
    overflow: hidden;
    background-position: 100%;
  }
}
</style>
