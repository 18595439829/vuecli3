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
  }
}
