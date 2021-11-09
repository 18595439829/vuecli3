// 图片/视频图层更换图片,重新计算位置
// let newMedia = {
//     originWidth: 200,
//     originHeight: 200,
//     url: ''
// }
// let oldMedia = {
//     windowWidth: 1000,
//     windowHeight: 800,
//     windowX: 500,
//     windowY: 100
// }

const normalizeChangeMedia = (newMedia, oldMedia, type='img') => {
  if (type === 'img') {
    return normalizeChangeImg(newMedia, oldMedia)
  } else {
    return normalizeChangeVideo(newMedia, oldMedia)
  }
}
const normalizeChangeImg = (newMedia, oldMedia) => {
  // 图片的宽,高,left,top
  let width,height,positionX,positionY;
  // 坑位的宽,高,left,top
  let {windowWidth, windowHeight, windowX, windowY} = oldMedia
  if (
    newMedia.originWidth / newMedia.originHeight >=
    oldMedia.windowWidth / oldMedia.windowHeight
  ) {
    // 新图比原图宽度宽,新图高为短边, 使用原图高度作为新图高度
    height = oldMedia.windowHeight;
    positionY = 0;
    let diff = oldMedia.windowHeight / newMedia.originHeight;
    width = newMedia.originWidth * diff;
    positionX = (oldMedia.windowWidth - width) / 2;
  } else {
    width = oldMedia.windowWidth;
    positionX = 0;
    let diff = oldMedia.windowWidth / newMedia.originWidth;
    height = newMedia.originHeight * diff;
    positionY = (oldMedia.windowHeight - height) / 2;
  }
  return { windowWidth, windowHeight, windowX, windowY, width, height, positionX, positionY};
};
const normalizeChangeVideo = (newMedia, oldMedia) => {
  let windowWidth, windowHeight, windowX, windowY;
  if (
    newMedia.originWidth / newMedia.originHeight >=
    oldMedia.windowWidth / oldMedia.windowHeight
  ) {
    // 新图比原图宽度宽
    windowWidth = oldMedia.windowWidth;
    windowX = oldMedia.windowX;
    let diff = oldMedia.windowWidth / newMedia.originWidth;
    windowHeight = newMedia.originHeight * diff;
    windowY = (oldMedia.windowHeight - windowHeight) / 2 + oldMedia.windowY;
  } else {
    windowHeight = oldMedia.windowHeight;
    windowY = oldMedia.windowY;
    let diff = oldMedia.windowHeight / newMedia.originHeight;
    windowWidth = newMedia.originWidth * diff;
    windowX = (oldMedia.windowWidth - windowWidth) / 2 + oldMedia.windowX;
  }
  return { windowWidth, windowHeight, windowX, windowY, width: windowWidth, height: windowHeight, positionX: 0, positionY: 0 };
};

export { normalizeChangeMedia };
