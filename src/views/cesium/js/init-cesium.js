const init = (dom) => {
    const viewer = new Cesium.Viewer(dom, {
        timeline: false,
        animation: false,
        infoBox: false, // 不展示详细弹窗
      });
}
export default {
    init,
}