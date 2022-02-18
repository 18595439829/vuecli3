<template>
  <div :class="$style['container']">
    <div ref="content" :class="$style['content']">
      <div ref="drag" data-moveable="true" :class="$style['example']">
        <div ref="example">draggable</div>
        <input type="text" />
        <button @click="dragClick">dragClick</button>
      </div>
      <div ref="resize" data-moveable="true" :class="$style['example']">
        所谓特殊字符，就是一些有特殊含义的字符，如上面说的 runoo*b 中的
        *，简单的说就是表示任何字符串的意思。如果要查找字符串中的 *
        符号，则需要对 * 进行转义，即在其前加一个 \，runo\*ob 匹配字符串
        runo*ob。
        许多元字符要求在试图匹配它们时特别对待。若要匹配这些特殊字符，必须首先使字符"转义"，即，将反斜杠字符\
        放在它们前面。下表列出了正则表达式中的特殊字符：
      </div>
    </div>
    <div>
      <button @click="dragRequest">dragRequest</button>
      <button @click="resizeRequest">resizeRequest</button>
    </div>
  </div>
</template>

<script>
import Moveable from "moveable";
import EventEmitter from "@scena/event-emitter";

export default {
  name: "TheMoveable",
  data() {
    return {
      moveable: undefined,
      content: {},
    };
  },
  created() {
    const emitter = new EventEmitter();
    emitter.on("a", (e) => {
      console.log(e)
    });
    // emit
    let result1 = emitter.trigger("a", {
      a: 1,
    });
    console.log(result1);
    let result2 = emitter.trigger("a", { a: 3 });
    console.log(result2); // true
    let result3 = emitter.trigger("b", { b: 3 });
    console.log(result3); // true
    emitter.off("a");
    let result4 = emitter.trigger("a", { a: 3 });
    console.log(result4); // true
  },
  mounted() {
    this.init();
    document.addEventListener("click", this.setMoveableVisiable);
    document.addEventListener("resize", (e) => {
      // this.moveable.updateRect();
      this.moveable.updateTarget;
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.setMoveableVisiable);
    document.removeEventListener("resize", (e) => {
      // this.moveable.updateRect();
      this.moveable.updateTarget;
    });
    this.moveable.destroy();
  },
  methods: {
    init() {
      this.content = this.$refs.content.getBoundingClientRect();
      this.moveable = new Moveable(
        this.$refs.content, // moveable元素的父元素
        {
          className: "moveable", // 可交互组件的class名称
          // target: this.$refs.example, // movable元素
          // dragTarget: this.$refs.example,
          origin: false, // movable元素的中心点是否可见,default: true
          /**拖拽属性 */
          draggable: true, // 是否支持可拖拽,default: false
          edgeDraggable: true, // 是否支持拖拽边框移动, default: false
          // startDragRotate: 45, // 拖拽起始位置的角度(deg): default: 0
          // throttleDragRotate: 90, // 拖拽角度的分割单位(deg): 拖拽角度角度可固定,default: 0,则为可以360deg拖动, 90则是以元素中心点固定为四个可拖拽方向 90deg 180deg 270deg 360deg
          throttleDrag: 0, // 拖拽时节流的单位(px),即每次拖拽的最小变动为100px, 默认不节流
          /**更改大小属性 */
          resizable: true, // 是否支持更改大小
          keepRatio: false, // 是否等比例更改大小, default: false
          renderDirections: ["nw", "ne", "sw", "se"], // resize的句柄显示, default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
          // throttleResize: 100, // resize时节流的单位(px),即每次resize的最小变动为100px, 默认不节流
          // scalable: true, // 是否支持缩放
          //   rotatable: true, // 是否支持旋转
          //   warpable: true,  // 是否支持折叠,3d效果,增加Z轴
          snappable: true,
          // snapContainer: document.body,
          bounds: [{ left: 100, right: 300, top: 0, bottom: 200 }],
        }
      );
      this.moveable
        .on("drag", this.drag)
        .on("resize", this.resize)
        .on("scale", this.scale)
        .on("beforeRenderEnd", (e) => {
          console.log("beforeRenderEnd", e);
        });
      this.moveable.on('click', (e) => {
        console.log(e)
      })
    },
    setMoveableTarget(target) {
      this.moveable.target = target;
    },
    drag({ target, beforeTranslate, width, height, transform }) {
      // let reg = /scale([\s\S]*)/g
      // let scale = transform.indexOf('scale') !== -1 ? transform.match(reg)[0] : ''
      // console.log(transform,scale);
      // let scaleX = 1, scaleY = 1
      // if (scale) {
      //   scaleX = scale.match(/\([\S]*,/g)[0].match(/[0-9]+(.[0-9]+)?/g)[0]
      //   scaleY = scale.match(/,[\s\S]*\)/g)[0].match(/[0-9]+(.[0-9]+)?/g)[0]
      //   console.log(scaleX, scaleY)
      // }
      let translateX = beforeTranslate[0];
      let translateY = beforeTranslate[1];
      let translate = this.dragBorderCheck({
        translateX,
        translateY,
        width,
        height,
      });
      target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    },
    dragBorderCheck({ translateX, translateY, width, height }) {
      if (translateX <= 0) {
        translateX = 0;
      }
      if (translateX >= this.content.width - width) {
        translateX = this.content.width - width;
      }
      if (translateY <= 0) {
        translateY = 0;
      }
      if (translateY >= this.content.height - height) {
        translateY = this.content.height - height;
      }
      return { translateX, translateY };
    },
    dragClick() {
      alert("dragClick");
    },
    dragRequest() {
      const requester = this.moveable.request("draggable");
      requester.request({ deltaX: 10, deltaY: 10 });
      // requester.request({ x: 300, y: 300 });
      requester.requestEnd();
    },
    resize({
      currentTarget, // moveable实例,即this.moveable
      moveable, // moveable的manager对象, const manager = this.moveable.getManager();
      target, // DOM 初始化moveable的target元素
      clientX, // number 鼠标所在屏幕的横坐标
      clientY, // number 鼠标实例所在屏幕的纵坐标
      datas,
      inputEvent, // Event 鼠标事件mousemove
      direction, // [numberX, numberY] resize的方向 [1,1]表示resize操作xy轴是正向,例如往右下更改大小,[-1,-1]表示resize操作xy轴是反向,例如往左上更改大小
      width, // number 元素(target)的css宽度
      height, // number 元素(target)的css高度
      offsetWidth, // number 元素(target)的offsetWidth(padding + width + border)
      offsetHeight, // number 元素(target)的offsetHeight(padding + height + border)
      dist, // number[] 元素的[width,height]相对于原始数据的变化数据[x,y]
      delta, // number[] 元素的[width,height]的相对上一次数据的数据[deltaX,deltaY]
      isPinch, // 元素是否被压缩,不包括resize,scale所引起的形变[**暂未证实具体作用**]
      drag, // 元素的拖拽事件,同onDrag的参数
    }) {
      let widthHeight = this.resizeBorderCheck({
        width,
        height,
        clientX,
        clientY,
        target,
      });
      target.style.width = `${widthHeight.width}px`;
      target.style.height = `${widthHeight.height}px`;
      let translateX = drag.beforeTranslate[0];
      let translateY = drag.beforeTranslate[1];
      console.log("beforeTranslate", translateX, translateY);
      let translate = this.dragBorderCheck({
        translateX,
        translateY,
        width: widthHeight.width,
        height: widthHeight.height,
      });
      target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    },
    resizeBorderCheck({ width, height, clientX, clientY, target }) {
      let { left, top, bottom, right } = target.getBoundingClientRect();
      let minWidth = 100,
        minHeight = 100;
      if (width <= minWidth) {
        width = minWidth;
      }
      // if (width > this.content.width) {
      //   width = this.content.width;
      // }
      // if (clientX <= this.content.left) {
      //   console.log(clientX, clientY, right);
      //   width = right - this.content.left;
      // }
      // if (clientX >= this.content.right) {
      //   console.log(clientX, clientY, left);
      //   width = this.content.right - left;
      // }
      if (height <= minHeight) {
        height = minHeight;
      }
      // if (height > this.content.height) {
      //   height = this.content.height;
      // }
      // if (clientY <= this.content.top) {
      //   console.log(clientX, clientY, bottom);
      //   height = bottom - this.content.top;
      // }
      // if (clientY >= this.content.bottom) {
      //   console.log(clientX, clientY, top);
      //   height = this.content.bottom - top;
      // }
      console.log("resizeBorderCheck", width, height);
      return { width, height };
    },
    resizeRequest() {
      const requester = this.moveable.request("resizable");
      // requester.request({
      //   direction: [1, 1],
      //   deltaWidth: 100,
      //   deltaHeight: 50,
      // });
      requester.request({ offsetWidth: 300, offsetHeight: 300 });
      requester.requestEnd();
    },
    scale({ target, scale, drag, width, height }) {
      target.style.transform =
        `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)` +
        `scale(${scale[0]}, ${scale[1]})`;
    },
    setMoveableVisiable(e) {
      console.log(this.moveable.hitTest(e.target));
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
    overflow: hidden;
  }
}
</style>
