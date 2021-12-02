<template>
  <div :class="$style['container']">
    <div ref="content" :class="$style['content']">
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
          clippable: true, // 是否支持裁剪
          clipArea: true, // 裁剪选区是否支持drag, default: false
          clipHorizontalGuidelines: [ 100], // 裁剪选区的水平方向边界贴边磁吸辅助线坐标
          clipVerticalGuidelines: [ 100], // 裁剪选区的垂直方向边界贴边磁吸辅助线坐标
          clipRelative: false, // 监听事件内的裁剪数据返回值,是否用百分比代替像素单位px, default: false
          clipSnapThreshold: 5, // 边界磁吸辅助线的磁吸效果响应范围,default: 5
          clipTargetBounds: true, // 裁剪区域是否必须在边界内, default: false 
          defaultClipPath: "inset(0px 18px 16px 0px)", // 初始化时默认的裁剪路径, defaultClipPath < style < customClipPath < dragging clipPath
          // customClipPath: "inset(0px 18px 16px 0px)", // 指定clipPath选区框体和句柄以此裁剪路径的位置显示,即使后续通过clip操作后,选区框体和句柄还是会重新变为该样式
          dragWithClip: false, // 拖动target元素时,裁剪框是否同步移动,(实际测试效果:true和false好像没有区别)
        }
      );
      this.moveable
        .on("clipStart", ({
          currentTarget, // moveable实例,即this.moveable
          moveable, // moveable的manager对象, const manager = this.moveable.getManager();
          target, // DOM 初始化moveable的target元素
          clientX, // number 鼠标所在屏幕的横坐标
          clientY, // number 鼠标实例所在屏幕的纵坐标
          datas,
          inputEvent, // Event 鼠标事件mousemove
          clipType, // 裁剪的类型(形状),"polygon" | "circle" | "ellipse" | "inset" | "rect";同 css:clip-path(https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)属性
          poses, // 裁剪句柄的坐标[[x1,y1]...]
          clipStyle // 裁剪结果的css
        }) => {
          // console.log(e);
        })
        .on("clip", (
          {
            clipEventType, // 裁剪事件的类型: "added" | "changed" | "removed", 实际使用只发现changed,暂时不确定added和removed是怎么触发的
            distX, // 句柄相对于原始位置移动的水平距离,往右移动为正值
            distY, // 句柄相对于原始位置移动的垂直距离,往下移动为正值
            clipStyles, // 裁剪结果的数据,数组格式
            currentTarget, 
            moveable, 
            target,
            clientX,
            clientY, 
            datas,
            inputEvent, 
            clipType, 
            poses, 
            clipStyle
          }
        ) => {
          console.log(distX, distY, clipStyles)
          if (clipType === "rect") {
            target.style.clip = clipStyle;
          } else {
            target.style.clipPath = clipStyle;
          }
        })
        .on("clipEnd", ({
          lastEvent, // 最后一个clip的事件,如果moveable实例未被执行clip操作,则为undefined
          isDrag, // boolean moveable实例是否被拖动了
          isDouble, // boolean moveable实例是否被双击
          currentTarget, 
          moveable, 
          target,
          clientX,
          clientY, 
          datas,
          inputEvent, 
        }) => {
          console.log(lastEvent, isDrag,isDouble );
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
