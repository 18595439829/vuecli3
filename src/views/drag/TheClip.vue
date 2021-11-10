<template>
    <div :class="$style['container']">
        <div ref="content" :class="$style['content']">
            <div ref="clip" data-moveable="true" :class="$style['example']">
                所谓特殊字符，就是一些有特殊含义的字符，如上面说的 runoo*b 中的 *，简单的说就是表示任何字符串的意思。如果要查找字符串中的 * 符号，则需要对 * 进行转义，即在其前加一个 \，runo\*ob 匹配字符串 runo*ob。 许多元字符要求在试图匹配它们时特别对待。若要匹配这些特殊字符，必须首先使字符"转义"，即，将反斜杠字符\ 放在它们前面。下表列出了正则表达式中的特殊字符：
            </div>
        </div>
    </div>
</template>

<script>
import Moveable from "moveable";

export default {
  name: "TheMoveable",
  data() {
    return {
      moveable: undefined,
      content: {}
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
          clipArea: false,
          dragWithClip: true
        }
      );
      this.moveable;
      on("clipStart", e => {
        console.log(e);
      })
        .on("clip", e => {
          if (e.clipType === "rect") {
            e.target.style.clip = e.clipStyle;
          } else {
            e.target.style.clipPath = e.clipStyle;
          }
        })
        .on("clipEnd", e => {
          console.log(e);
        });
    },
    setMoveableTarget(target) {
      this.moveable.target = target;
    }
  }
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
  }
}
</style>
