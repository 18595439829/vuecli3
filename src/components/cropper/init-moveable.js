import Move from "moveable";

let _this;
export default class Moveable {
  constructor(dom, options) {
    this.dom = dom;
    this.options = {
      className: "moveable", // 可交互组件的class名称
      // target: this.$refs.example, // movable元素
      // dragTarget: this.$refs.example,
      origin: false, // movable元素的中心点是否可见,default: true
      /**拖拽属性 */
      draggable: false, // 是否支持可拖拽,default: false
      edgeDraggable: false, // 是否支持拖拽边框移动, default: false
      // startDragRotate: 45, // 拖拽起始位置的角度(deg): default: 0
      // throttleDragRotate: 90, // 拖拽角度的分割单位(deg): 拖拽角度角度可固定,default: 0,则为可以360deg拖动, 90则是以元素中心点固定为四个可拖拽方向 90deg 180deg 270deg 360deg
      throttleDrag: 0, // 拖拽时节流的单位(px),即每次拖拽的最小变动为100px, 默认不节流
      /**更改大小属性 */
      resizable: false, // 是否支持更改大小
      keepRatio: false, // 是否等比例更改大小, default: false
      renderDirections: ["nw", "ne", "sw", "se"], // resize的句柄显示, default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
      // throttleResize: 100, // resize时节流的单位(px),即每次resize的最小变动为100px, 默认不节流
      // scalable: true, // 是否支持缩放
      //   rotatable: true, // 是否支持旋转
      //   warpable: true,  // 是否支持折叠,3d效果,增加Z轴
    };
    Object.assign(this.options, options);
    this.containerStyle = options.containerStyle || null;
    this.moveable = new Move(this.dom, this.options);
    _this = this;
    this.events = {};
    this.moveable.on("drag", this.drag).on("resize", this.resize);
  }
  getInstance() {
    return this.moveable;
  }
  destroy() {
    this.moveable.destroy();
    this.moveable = null;
  }
  setMoveableTarget(target) {
    this.moveable.target = target;
  }
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
    let translate = _this.dragBorderCheck({
      translateX,
      translateY,
      width,
      height,
    });
    target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    _this.emit("drag", translate);
  }
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
    let widthHeight = _this.resizeBorderCheck({
      width,
      height,
      clientX,
      clientY,
      target,
    });
    if (widthHeight) {
      target.style.width = `${widthHeight.width}px`;
      target.style.height = `${widthHeight.height}px`;
    }
    let translateX = drag.beforeTranslate[0];
    let translateY = drag.beforeTranslate[1];
    // console.log("beforeTranslate", translateX, translateY);
    let translate = _this.dragBorderCheck({
      translateX,
      translateY,
      width: widthHeight.width,
      height: widthHeight.height,
    });
    target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    _this.emit("resize", translate);
  }
  dragBorderCheck({ translateX, translateY, width, height }) {
    if (this.containerStyle) {
      if (translateX <= 0) {
        translateX = 0;
      }
      if (translateY <= 0) {
        translateY = 0;
      }
      if (translateX >= this.containerStyle.width - width) {
        translateX = this.containerStyle.width - width;
      }
      if (translateY >= this.containerStyle.height - height) {
        translateY = this.containerStyle.height - height;
      }
    }
    return { translateX, translateY };
  }
  resizeBorderCheck({ width, height, clientX, clientY, target }) {
    let { left, top, bottom, right } = target.getBoundingClientRect();
    let minWidth = 10,
      minHeight = 10;
    if (width <= minWidth) {
      width = minWidth;
    }
    if (height <= minHeight) {
      height = minHeight;
    }
    if (this.containerStyle) {
      if (width > this.containerStyle.width) {
        width = this.containerStyle.width;
      }
      if (clientX < this.containerStyle.left) {
        console.log(clientX, clientY, right);
        // width = right - this.containerStyle.left;
        return;
      }
      if (clientX > this.containerStyle.right) {
        console.log(clientX, clientY, left);
        // width = this.containerStyle.right - left;
        return;
      }
      if (height > this.containerStyle.height) {
        height = this.containerStyle.height;
      }
      if (clientY <= this.containerStyle.top) {
        console.log(clientX, clientY, bottom);
        height = bottom - this.containerStyle.top;
      }
      if (clientY >= this.containerStyle.bottom) {
        console.log(clientX, clientY, top);
        height = this.containerStyle.bottom - top;
      }
    }

    // console.log("resizeBorderCheck", width, height);
    return { width, height };
  }
  /**
   * 注册事件和处理函数
   * @param event
   * @param fn
   */
  on(event, fn) {
    if (Array.isArray(this.events[event])) {
      for (let i = 0, l = this.events[event].length; i < l; i++) {
        this.on(this.events[event][i], fn);
      }
    } else {
      // 存在直接push, 不存在创建为空数组再push
      (this.events[event] || (this.events[event] = [])).push(fn);
    }
  }
  /**
   * 触发某事件所有回调并带参数
   * @param event
   */
  emit(event) {
    if (this.events[event]) {
      let cbs = [...this.events[event]];
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(null, [...arguments].slice(1));
        } catch (e) {
          new Error(e, `event handler for "${event}"`);
        }
      }
    }
  }
}
