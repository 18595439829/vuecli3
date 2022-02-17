import { cloneDeep } from "lodash-es";
import KAOLA from "@/assets/img/Koala.jpg";
import FISH from "@/assets/img/Jellyfish.jpg";

/**
 * 获取字幕dom的边界属性
 * @returns 返回字幕dom的边界属性
 */
const getLayerCaptionBounding = () => {
    return document.getElementById('layer-captions').getBoundingClientRect()
}

/**
 * 根据获取text图层的位置
 * @param {*} id 图层id
 * @returns 返回图层bounding
 */
const getLayerTextBounding = (id) => {
    let result
    let elements = document.getElementsByName('layer-texts')
    for (let index = 0; index < elements.length; index++) {
        const text = elements[index];
        if (text.dataset.id === id) {
            result = text.getBoundingClientRect()
            break
        }
    }
    return result
}

let originLayerData, resultLayerData;
// 查询图层之前,先行比较图层数据是否变化
const diffLayerData = (oldLayer, newLayer) => {
    return JSON.stringify(oldLayer) === JSON.stringify(newLayer)
}
// 初始化图层数据,处理图层元素的位置
const initLayerDataToBounding = (data) => {
    if (diffLayerData(originLayerData, data)) {
        return resultLayerData
    }
    console.log('图层数据变更')
    originLayerData = cloneDeep(data)
    resultLayerData = cloneDeep(data)
    // 字幕图层
    if (resultLayerData.captions && resultLayerData.captions.length) {
        let caption = resultLayerData.captions.find(item => item.isCurrent)
        caption.bounding = getLayerCaptionBounding()
    }
    // texts层级
    if (resultLayerData.texts && resultLayerData.texts.length) {
        // 图层数据按照zIndex排序
        resultLayerData.texts.sort((a, b) => b.zIndex - a.zIndex)
        let elements = Array.from(document.getElementsByName('layer-texts'))
        // dom按照zIndex排序后检索
        elements.sort((a, b) => b.style.zIndex - a.style.zIndex)
        for (let index = 0; index < elements.length; index++) {
            const text = elements[index];
            let result = resultLayerData.texts.find(item => item.id === text.dataset.id)
            result.bounding = text.getBoundingClientRect()
        }
    }
    // medias层级
    if (resultLayerData.medias && resultLayerData.medias.length) {
        resultLayerData.medias.sort((a, b) => b.zIndex - a.zIndex)
        let elements = Array.from(document.getElementsByName('layer-medias'))
        elements.sort((a, b) => b.style.zIndex - a.style.zIndex)
        for (let index = 0; index < elements.length; index++) {
            const media = elements[index];
            let result = resultLayerData.medias.find(item => item.id === media.dataset.id)
            result.bounding = media.getBoundingClientRect()
        }
    }
    return resultLayerData
}
/**
 * 根据鼠标位置查询当前坐标点是否有图层
 * @param {positon<{x, y}>, data<layerData>} // position:当前鼠标坐标相对于画布左上角的位置; data: layerData
 * @returns 返回当前鼠标点位的图层数据,没有则为空
 */
const searchLayerByPx = ({ position, data }) => {
    let result = {
        type: '',
        data: undefined
    }
    let { x, y } = position
    // captions层级最高
    let resultData = initLayerDataToBounding(data)
    if (resultData.captions && resultData.captions.length) {
        let caption = resultData.captions.find(item => item.isCurrent)
        let { left, top, right, bottom } = caption.bounding
        if (caption && (x >= left && x <= right && y >= top && y <= bottom)) {
            result = {
                type: 'captions',
                data: caption
            }
        }
    }
    // texts层级次之
    if (!result.data && resultData.texts && resultData.texts.length) {
        for (let index = 0; index < resultData.texts.length; index++) {
            const text = resultData.texts[index];
            let { left, top, right, bottom } = text.bounding
            if (x >= left && x <= right && y >= top && y <= bottom) {
                result = {
                    type: 'texts',
                    // data: data.texts.find(item => item.id === text.id)
                    data: text
                }
                break
            }
        }
    }
    // medias层级次之
    if (!result.data && resultData.medias && resultData.medias.length) {
        for (let index = 0; index < resultData.medias.length; index++) {
            const media = resultData.medias[index];
            let { left, top, right, bottom } = media.bounding
            if (x >= left && x <= right && y >= top && y <= bottom) {
                result = {
                    type: 'medias',
                    // data: data.medias.find(item => item.id === media.id)
                    data: media
                }
                break
            }
        }
    }
    return result
}
const layerData = {
    backgrounds: [
        {
            id: "123",
            isBlur: false,
            color: "#f1f1f1",
            zIndex: 0,
            inner: {
                width: 1920,
                height: 1080,
                left: 0,
                top: 0,
            }
        },
        {
            id: "142314",
            isBlur: true,
            url: KAOLA,
            zIndex: 1,
            inner: {
                width: 1920,
                height: 1080,
                left: 0,
                top: 0,
            }
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
            content: ["我是一个文本", '第二行文本规范归根到底'],
            color: "#333",
            fontSize: 30,
            zIndex: 1,
            inner: {
                left: 960,
                top: 540,
            }
        },
    ],
    captions: [
        {
            id: "13313443411",
            isCurrent: true,
            content: [
                "第一行字幕居中",
                "第二行字幕惆怅长岑长错错错错错错错错错",
            ],
        },
    ],
}

export {
    getLayerCaptionBounding,
    getLayerTextBounding,
    layerData,
    searchLayerByPx
}