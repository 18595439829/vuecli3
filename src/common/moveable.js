import Moveable from "moveable";

export default class Move {
  constructor(dom, options) {
    this.options = {
      className: "draggable",
      origin: false,
      edge: true,
      draggable: true,
      resizable: true,
    };
    Object.assign(this.options, options);
    this.moveable = new Moveable(
      dom, // moveable元素的父元素
      {
        className: "draggable", // 可交互组件的class名称
        target: this.options.target, // 响应moveable操作结果的元素,如包裹一个可拖拽图钉的方块
        origin: this.options.origin, // moveable元素的中心点是否可见,default: true
        edge: this.options.edge, // resize,scale是否支持通过边框操作
        padding: { left: 0, top: 0, right: 0, bottom: 0 }, // target元素周围增加padding,不会改变target样式,只是将moveable选框撑开, default: null
        passDragArea: this.options.passDragArea, // default: false, [**没有发现实际作用**]
        zoom: this.options.zoom, // moeable组件的元素缩放比例,default: 1,即边框或者四角和边框的句柄等
        draggable: this.options.draggable, // 是否支持可拖拽
        dragTarget: this.options.dragTarget, // 执行moveable操作的元素,如可拖拽的图钉
        resizable: this.options.resizable, // 是否支持更改大小
      }
    );
    this.moveable
      .on(
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
      )
      .on(
        "drag",
        ({
          target, // DOM 初始化moveable的target元素
          beforeTranslate, // [left, top] 元素相较于起始位置的平移数据
        }) => {
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }
      );
  }
  getMoveable() {
    return this.moveable
  }
  destroy() {
    this.moveable.destroy()
  }
}
