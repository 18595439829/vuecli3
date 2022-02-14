import Moveable from "moveable";

export default class Move {
  constructor(dom, options) {
    this.options = {
      className: "draggable", // 可交互组件的class名称
      target: null, // 响应moveable操作结果的元素,如包裹一个可拖拽图钉的方块
      origin: false, // moveable元素的中心点是否可见,default: true
      edge: false, // resize,scale是否支持通过边框操作
      zoom: 1, // moeable组件的元素缩放比例,default: 1,即边框或者四角和边框的句柄等
      draggable: true, // 是否支持可拖拽
      edgeDraggable: false, // 是否支持拖拽边框移动, default: false
      resizable: true, // 是否支持更改大小
      keepRatio: true,
      // renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
      renderDirections: ["nw", "ne", "se", "sw"],
      snappable: true,
      elementSnapDirections: true,
    };
    Object.assign(this.options, options);
    this.moveable = new Moveable(
      dom, // moveable元素的父元素
      {
        ...this.options,
      }
    );
    this.moveable.on(
      "drag",
      ({
        target, // DOM 初始化moveable的target元素
        beforeTranslate, // [left, top] 元素相较于起始位置的平移数据
      }) => {
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
      }
    );
    this.moveable.on(
      "resize",
      ({
        target, // DOM 初始化moveable的target元素
        width, // number 元素(target)的css宽度
        height, // number 元素(target)的css高度
        drag, // 元素的拖拽事件,同onDrag的参数
      }) => {
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
      }
    );
  }
  getMoveable() {
    return this.moveable;
  }
  destroy() {
    this.moveable.destroy();
  }
}
