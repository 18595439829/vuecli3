<template>
  <div ref="container" :class="$style['container']">
    <div ref="content" :class="$style['content']">
      <div ref="resize" data-moveable="true" :class="$style['example']">
        所谓特殊字符，就是一些有特殊含义的字符，如上面说的 runoo*b 中的
        *，简单的说就是表示任何字符串的意思。如果要查找字符串中的 *
        符号，则需要对 * 进行转义，即在其前加一个 \，runo\*ob 匹配字符串
        runo*ob。
        许多元字符要求在试图匹配它们时特别对待。若要匹配这些特殊字符，必须首先使字符"转义"，即，将反斜杠字符\
        放在它们前面。下表列出了正则表达式中的特殊字符：
      </div>
      <div ref="inner" :class="$style['inner']">内边界</div>
    </div>
  </div>
</template>

<script>
import Moveable from "moveable";

export default {
  name: "TheSnappable",
  data() {
    return {
      moveable: undefined,
    };
  },
  mounted() {
    this.init();
    document.addEventListener("click", this.setMoveableVisiable);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.setMoveableVisiable);
    this.moveable.destroy();
  },
  methods: {
    init() {
      this.moveable = new Moveable(
        this.$refs.content, // moveable元素的父元素
        {
          className: "moveable", // 可交互组件的class名称
          // target: this.$refs.example, // movable元素
          // dragTarget: this.$refs.example,
          origin: false, // movable元素的中心点是否可见,default: true
          /**拖拽属性 */
          draggable: true, // 是否支持可拖拽,default: false
          /**更改大小属性 */
          resizable: true, // 是否支持更改大小
          keepRatio: false, // 是否等比例更改大小, default: false
          renderDirections: ["nw", "ne", "sw", "se"], // resize的句柄显示, default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
          snappable: true, // 是否初始化磁吸功能
          snapContainer: this.$refs.container, // 磁吸功能(辅助线)的容器
          snapThreshold: 10, // 磁吸效果触发的临界值,即元素与辅助线间距小于x,则自动贴边
          bounds: this.$refs.content.getBoundingClientRect(), // moveable操作元素的外边界值(即包裹moveable元素的dom内边界){left, top, right, bottom}
          innerBounds: this.$refs.inner.getBoundingClientRect(), // moveable操作元素的内边界值(即moveable元素包裹的dom的外边界){left, top, right, bottom}
          // elementGuidelines: [this.$refs.content], // 磁吸效果辅助线的dom列表
          elementSnapDirections: {
            left: true,
            top: true,
            right: true,
            bottom: true,
            center: true,
            middle: true,
          }, // 每个dom的磁吸辅助线的方位,默认四边 default: { left: true, top: true, right: true, bottom: true }
          horizontalGuidelines: [100, 200, 300, 400], // 水平方向自定义的辅助线列表,[注意:此属性是相对于整个snapContainer元素的坐标]
          verticalGuidelines: [100, 200, 300, 400], // 垂直方向自定义的辅助线列表,[注意:此属性是相对于整个snapContainer元素的坐标]
          isDisplaySnapDigit: true, // 是否展示与磁吸辅助线的距离,当moveable元素在磁吸参照元素之外时,moveable元素距离磁吸元素辅助线的虚线长度
          isDisplayInnerSnapDigit: true, // 是否展示与磁吸辅助线的距离,当moveable元素内部存在磁吸参照元素时,moveable元素距离磁吸元素辅助线的虚线长度
          snapDirections: {
            left: true,
            top: true,
            right: true,
            bottom: true,
            center: true,
            middle: true,
          }, // moveable的target所需要触发磁吸效果的方位,默认上下左右四条边default: { left: true, top: true, right: true, bottom: true }
          snapDistFormat: (v) => `${v}px`, // 元素与辅助线之间距离的展示文本
          // snapGap: true, // 暂未发现实际作用 当moveable元素拖动时,元素与辅助线之间是否有空隙default: true(实际测试时,值更改为true或false,未发现实际效果,可能是我的应用场景不对)
          // snapGridHeight: 50, // 暂未发现实际作用
          // snapGridWidth: 50, // 暂未发现实际作用
          // snapDigit: 10, // 暂未发现实际作用
        }
      );
      this.moveable
        .on("drag", this.drag)
        .on("resize", this.resize)
        .on("snap", this.snap);
    },
    setMoveableTarget(target) {
      this.moveable.target = target;
    },
    drag({ target, beforeTranslate }) {
      let translateX = beforeTranslate[0];
      let translateY = beforeTranslate[1];
      target.style.transform = `translate(${translateX}px, ${translateY}px)`;
    },
    resize({
      target, // DOM 初始化moveable的target元素
      width, // number 元素(target)的css宽度
      height, // number 元素(target)的css高度
      drag,
    }) {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      let { beforeTranslate } = drag;
      let translateX = beforeTranslate[0];
      let translateY = beforeTranslate[1];
      target.style.transform = `translate(${translateX}px, ${translateY}px)`;
    },
    snap(e) {
      const { 
      currentTarget, // 当前操作的moveable实例
      elements, // [element] 与moveable发生磁吸交互的dom元素: 即elementGuidelines中的元素
      eventType, // 事件类型:"snap"
      gaps, // 元素之间的间隙[暂未发现实际作用,该数组一直是空数组]
      guidelines, // horizontalGuideline和verticalGuidelines(包括bounds和innerBounds)中与moveable发生交互的辅助线数组
      stop // function类型[暂未发现实际作用]
       } = e
      console.log(e);
    },
    setMoveableVisiable(e) {
      if (this.moveable.target) {
        this.moveable.target.style.zIndex = 0;
        this.moveable.target.style.cursor = "move";
      }
      if (e.target.dataset.moveable === "true") {
        e.target.style.zIndex = 1;
        e.target.style.cursor = "move";
        this.setMoveableTarget(e.target);
      } else if (this.moveable) {
        // this.moveable.target = null;
      }
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
.container {
  width: 100%;
  height: 100vh;
}
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
    left: 10px;
    top: 10px;
  }
  .inner {
    width: 100px;
    height: 100px;
    background: rgb(154, 245, 218);
    position: absolute;
    left: 200px;
    top: 100px;
  }
}
</style>
