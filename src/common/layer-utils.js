import KAOLA from "@/assets/img/Koala.jpg";
import FISH from "@/assets/img/Jellyfish.jpg";

const searchLayerByPx = ({position, data}) => {
    // captions层级最高
    if (data.captions && data.captions.length) {

    }
    // texts层级次之
    if (data.texts && data.texts.length) {

    }
    // medias层级次之
    if (data.medias && data.medias.length) {

    }
}

const layerData = {
    backgrounds: [
      {
        id: "123",
        isBlur: false,
        color: "#f1f1f1",
        zIndex: 0,
        width: 1920,
        height: 1080,
        left: 0,
        top: 0,
      },
      {
        id: "142314",
        isBlur: true,
        url: KAOLA,
        zIndex: 1,
        width: 1920,
        height: 1080,
        left: 0,
        top: 0,
      },
    ],
    medias: [
      {
        id: "media-1",
        url: KAOLA,
        zIndex: 1,
        inner: {
          width: 960,
          height: 1080,
          left: 960,
          top: 0,
        },
        outer: {
          width: 1440,
          height: 1080,
          left: 0,
          top: 0,
        },
      },
      {
        id: "media-2",
        url: FISH,
        zIndex: 2,
        inner: {
          width: 960,
          height: 540,
          left: 0,
          top: 0,
        },
        outer: {
          width: 960,
          height: 540,
          left: 0,
          top: 0,
        },
      },
    ],
    texts: [
      {
        id: "213445234",
        content: "我是一个文本",
        color: "#333",
        fontSize: 30,
      },
    ],
    captions: [
      {
        id: "13313443411",
        content: [
          "第一行字幕居中",
          "第二行字幕惆怅长岑长错错错错错错错错错",
        ],
      },
    ],
  }

  export {
    layerData,
    searchLayerByPx
  }