import Move from "moveable";

export default class Moveable {
  constructor(dom, options) {
    this.dom = dom;
    this.options = {
      className: "moveable", // 可交互组件的class名称
      origin: false, // movable元素的中心点是否可见,default: true
      /**拖拽属性 */
      draggable: false, // 是否支持可拖拽,default: false
      edgeDraggable: false, // 是否支持拖拽边框移动, default: false
      // throttleDrag: 0, // 拖拽时节流的单位(px),即每次拖拽的最小变动为100px, 默认不节流
      /**更改大小属性 */
      resizable: false, // 是否支持更改大小
      keepRatio: false, // 是否等比例更改大小, default: false
      renderDirections: ["nw", "ne", "sw", "se"], // resize的句柄显示, default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
    };
    Object.assign(this.options, options);
    this.options.className = `moveable ${this.options.className}`
    this.containerStyle = options.containerStyle
    this.moveable = new Move(this.dom, this.options);
    this.events = {};
    const _this = this;
    this.moveable
      .on("drag", (e) => this.drag({
        ...e,
        _this
      }))
      .on("dragEnd", (e) => this.emit('dragEnd', e))
      .on("resize", e => this.resize({
        ...e,
        _this
      }))
      .on("resizeEnd", (e) => this.emit('resizeEnd', e));
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
  drag({
    target,
    beforeTranslate,
    width,
    height,
    _this
  }) {
    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];
    let translate = _this.dragBorderCheck({
      translateX,
      translateY,
      width,
      height,
      _this
    });
    // target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    _this.emit("drag", translate);
  }
  resize({
    target, // DOM 初始化moveable的target元素
    clientX, // number 鼠标所在屏幕的横坐标
    clientY, // number 鼠标实例所在屏幕的纵坐标
    inputEvent, // Event 鼠标事件mousemove
    width, // number 元素(target)的css宽度
    height, // number 元素(target)的css高度
    drag, // 元素的拖拽事件,同onDrag的参数
    _this
  }) {
    console.log(inputEvent,drag.beforeTranslate)
    let widthHeight = _this.resizeBorderCheck({
      width,
      height,
      clientX,
      clientY,
      target,
      _this
    });
    target.style.width = `${widthHeight.width}px`;
    target.style.height = `${widthHeight.height}px`;
    let translateX = drag.beforeTranslate[0];
    let translateY = drag.beforeTranslate[1];
    let translate = _this.dragBorderCheck({
      translateX,
      translateY,
      width: widthHeight.width,
      height: widthHeight.height,
      _this
    });
    // target.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px)`;
    _this.emit("resize", {
      ...widthHeight,
      ...translate
    });
  }
  dragBorderCheck({
    translateX,
    translateY,
    width,
    height,
    _this
  }) {
    if (_this.containerStyle) {
      if (translateX <= 0) {
        translateX = 0;
      }
      if (translateY <= 0) {
        translateY = 0;
      }
      if (translateX >= _this.containerStyle.width - width) {
        translateX = _this.containerStyle.width - width;
      }
      if (translateY >= _this.containerStyle.height - height) {
        translateY = _this.containerStyle.height - height;
      }
    }
    return {
      translateX,
      translateY
    };
  }
  resizeBorderCheck({
    width,
    height,
    clientX,
    clientY,
    target,
    _this
  }) {
    let {
      left,
      top,
      bottom,
      right
    } = target.getBoundingClientRect();
    let minWidth = 10,
      minHeight = 10;
    if (width <= minWidth) {
      width = minWidth;
    }
    if (height <= minHeight) {
      height = minHeight;
    }
    if (_this.containerStyle) {
      if (width > _this.containerStyle.width) {
        width = _this.containerStyle.width;
      }
      if (clientX < _this.containerStyle.left) {
        console.log(clientX, clientY, right);
        // width = right - _this.containerStyle.left;
      }
      if (clientX > _this.containerStyle.right) {
        console.log(clientX, clientY, left);
        // width = _this.containerStyle.right - left;
      }
      if (height > _this.containerStyle.height) {
        height = _this.containerStyle.height;
      }
      if (clientY <= _this.containerStyle.top) {
        console.log(clientX, clientY, bottom);
        height = bottom - _this.containerStyle.top;
      }
      if (clientY >= _this.containerStyle.bottom) {
        console.log(clientX, clientY, top);
        height = _this.containerStyle.bottom - top;
      }
    }
    // console.log("resizeBorderCheck", width, height);
    return {
      width,
      height
    };
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