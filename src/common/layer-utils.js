import { cloneDeep } from "lodash-es";
import KAOLA from "@/assets/img/Koala.jpg";
import FISH from "@/assets/img/Jellyfish.jpg";
import IMG from '@/assets/img/size5.jpg'
/**
 * 获取字幕dom的边界属性
 * @returns 返回字幕dom的边界属性
 */
const getLayerCaptionBounding = () => {
    return document.getElementById('layer-captions') ? document.getElementById('layer-captions').getBoundingClientRect() : undefined
}

/**
 * 根据获取text图层的位置
 * @param {*} id 图层id
 * @returns 返回图层bounding
 */
const getLayerTextBounding = (id) => {
    let result
    let elements = document.getElementsByName('layer-texts')
    if (!elements) {
        return undefined
    }
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
        // {
        //     id: "123",
        //     isBlur: false,
        //     color: "#f1f1f1",
        //     zIndex: 0,
        //     inner: {
        //         width: 1920,
        //         height: 1080,
        //         left: 0,
        //         top: 0,
        //     }
        // },
        {
            id: "142314",
            isBlur: false,
            url: IMG,
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
            id: "1223563",
            url: IMG,
            zIndex: 1,
            inner: {
                width: 1920,
                height: 1080,
                left: 0,
                top: 0,
            },
            outer: {
                width: 1920,
                height: 1080,
                left: 0,
                top: 0,
            }
        },
        // {
        //     id: "media-1",
        //     url: KAOLA,
        //     zIndex: 2,
        //     inner: {
        //         width: 960,
        //         height: 1080,
        //         left: 960,
        //         top: 0,
        //     },
        //     outer: {
        //         width: 1440,
        //         height: 1080,
        //         left: 0,
        //         top: 0,
        //     },
        // },
        // {
        //     id: "media-2",
        //     url: FISH,
        //     zIndex: 3,
        //     inner: {
        //         width: 960,
        //         height: 540,
        //         left: 0,
        //         top: 0,
        //     },
        //     outer: {
        //         width: 960,
        //         height: 540,
        //         left: 0,
        //         top: 0,
        //     },
        // },
    ],
    texts: [
        // {
        //     id: "213445234",
        //     content: ["我是一个文本", '第二行文本规范归根到底'],
        //     color: "#333",
        //     fontSize: 30,
        //     zIndex: 1,
        //     background: '#ffffff3c',
        //     inner: {
        //         left: 960,
        //         top: 540,
        //     }
        // },
    ],
    captions: [
        {
            id: "13313443411",
            isCurrent: true,
            fontSize: 106,
            content: [
                "使用ass为视频合成嵌入字幕",
                "使用ass为视频合成嵌入字幕使用ass为视频合成嵌入字幕",
            ],
        }
    ]
}

const subList = [
    {
        "subId": "25998",
        "subSort": 0,
        "subType": 2,
        "keyWord": "猿啸 白鸟",
        "audioModuleId": 46,
        "audioModuleName": "艾祥",
        "moduleType": "磁性男声",
        "audioIconUrl": "https://nos-creative-video.nos-jd.163yun.com/20210607182846318673deab75464ea0d1a2ad40c22854?download=%E6%AD%A3%E5%B8%B8%E7%94%B7%E7%94%9F%E5%A4%B4%E5%83%8F.png&Signature=6%2FRsU9fW2DEp%2BLzJwvQIR3qDGEvtumD2l7OIExbqpig%3D&Expires=4105160889&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
        "audioVolume": 50,
        "speechRate": 0,
        "textFont": "1",
        "textSize": 3,
        "textColor": "#ffffff",
        "outlineSize": 6,
        "outlineColor": "#000000",
        "bgColor": "",
        "position": 1,
        "bold": 0,
        "underline": 0,
        "texts": [],
        "captions": [
            {
                "captionId": "21693",
                "sortNum": 0,
                "content": [
                    "风急天高猿啸哀，渚清沙白鸟飞回。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "风",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "急",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "天",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "高",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "猿",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "啸",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "哀",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "渚",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "清",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "沙",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "白",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "鸟",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "飞",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "回",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "风",
                        "map": {
                            "fēng": "feng1",
                            "fěng": "feng3"
                        },
                        "selected": "",
                        "index": 0
                    },
                    {
                        "character": "沙",
                        "map": {
                            "shà": "sha4",
                            "shā": "sha1"
                        },
                        "selected": "",
                        "index": 10
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 3973,
                "width": null
            },
            {
                "captionId": "21709",
                "sortNum": 1,
                "content": [
                    "风急天高猿猴啼叫显得十分悲哀，水清沙白的河洲上有鸟儿在盘旋。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "风",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "急",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "天",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "高",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "猿",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "猴",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "啼",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "叫",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "显",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "得",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "十",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "分",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "悲",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "哀",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "水",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "清",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "沙",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "白",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "的",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "河",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "洲",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "上",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "有",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "鸟",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "儿",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "在",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "盘",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "旋",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "风",
                        "map": {
                            "fēng": "feng1",
                            "fěng": "feng3"
                        },
                        "selected": "",
                        "index": 0
                    },
                    {
                        "character": "得",
                        "map": {
                            "de": "de5",
                            "děi": "dei3",
                            "dé": "de2"
                        },
                        "selected": "",
                        "index": 9
                    },
                    {
                        "character": "分",
                        "map": {
                            "fēn": "fen1",
                            "fèn": "fen4"
                        },
                        "selected": "",
                        "index": 11
                    },
                    {
                        "character": "沙",
                        "map": {
                            "shà": "sha4",
                            "shā": "sha1"
                        },
                        "selected": "",
                        "index": 17
                    },
                    {
                        "character": "的",
                        "map": {
                            "de": "de5",
                            "dì": "di4",
                            "dí": "di2"
                        },
                        "selected": "",
                        "index": 19
                    },
                    {
                        "character": "上",
                        "map": {
                            "shàng": "shang4",
                            "shǎng": "shang3"
                        },
                        "selected": "",
                        "index": 22
                    },
                    {
                        "character": "有",
                        "map": {
                            "yǒu": "you3",
                            "yòu": "you4"
                        },
                        "selected": "",
                        "index": 23
                    },
                    {
                        "character": "旋",
                        "map": {
                            "xuán": "xuan2",
                            "xuàn": "xuan4"
                        },
                        "selected": "",
                        "index": 28
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 7277,
                "width": null
            }
        ],
        "colorBlocks": [],
        "medias": [
            {
                "positionX": 0,
                "positionY": -100,
                "windowX": 0,
                "windowY": 0,
                "width": 1918,
                "height": 1280,
                "originWidth": 1080,
                "originHeight": 720,
                "windowWidth": 1918,
                "windowHeight": 1080,
                "layer": 1,
                "mediaId": "21694",
                "matchImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501498f9ea4416f3499da24ce35ae954da3d?download=1645692614364.jpeg&Signature=jTs50HZOzPpDBSqJ8%2FrKB9oyDuoooDRikN2MOZuM1QQ%3D&Expires=4105155014&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "originImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501498f9ea4416f3499da24ce35ae954da3d?download=1645692614364.jpeg&Signature=jTs50HZOzPpDBSqJ8%2FrKB9oyDuoooDRikN2MOZuM1QQ%3D&Expires=4105155014&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "cutoutWidth": null,
                "cutoutHeight": null,
                "cutoutX": null,
                "cutoutY": null,
                "animationEffect": "I001",
                "startTime": null,
                "endTime": null,
                "subStartTime": null,
                "subEndTime": null,
                "videoFileUrl": null,
                "videoVolume": null,
                "hoverImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501498f9ea4416f3499da24ce35ae954da3d?download=1645692614364.jpeg&Signature=jTs50HZOzPpDBSqJ8%2FrKB9oyDuoooDRikN2MOZuM1QQ%3D&Expires=4105155014&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9&imageView&thumbnail=294x0"
            }
        ],
        "background": {
            "color": "#666666",
            "imgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501498f9ea4416f3499da24ce35ae954da3d?download=1645692614364.jpeg&Signature=jTs50HZOzPpDBSqJ8%2FrKB9oyDuoooDRikN2MOZuM1QQ%3D&Expires=4105155014&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
            "hasBlur": 1,
            "backgroundId": "21705"
        },
        "hasMatch": 0,
        "hasEmpty": 0,
        "hasIncomplete": 0,
        "hasAudio": 1,
        "audioModuleEnglish": false,
        "subDuration": 11250,
        "matchStatus": 0
    },
    {
        "subId": "25999",
        "subSort": 1,
        "subType": 2,
        "keyWord": "落木 萧萧 长江",
        "audioModuleId": 46,
        "audioModuleName": "艾祥",
        "moduleType": "磁性男声",
        "audioIconUrl": "https://nos-creative-video.nos-jd.163yun.com/20210607182846318673deab75464ea0d1a2ad40c22854?download=%E6%AD%A3%E5%B8%B8%E7%94%B7%E7%94%9F%E5%A4%B4%E5%83%8F.png&Signature=6%2FRsU9fW2DEp%2BLzJwvQIR3qDGEvtumD2l7OIExbqpig%3D&Expires=4105160889&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
        "audioVolume": 50,
        "speechRate": 0,
        "textFont": "1",
        "textSize": 3,
        "textColor": "#ffffff",
        "outlineSize": 6,
        "outlineColor": "#000000",
        "bgColor": "",
        "position": 1,
        "bold": 0,
        "underline": 0,
        "texts": [],
        "captions": [
            {
                "captionId": "21696",
                "sortNum": 0,
                "content": [
                    "无边落木萧萧下，不尽长江滚滚来。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "无",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "边",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "落",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "木",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "萧",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "萧",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "下",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "不",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "尽",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "长",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "江",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "滚",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "滚",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "来",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "落",
                        "map": {
                            "là": "la4",
                            "luò": "luo4",
                            "lào": "lao4"
                        },
                        "selected": "",
                        "index": 2
                    },
                    {
                        "character": "不",
                        "map": {
                            "bù": "bu4",
                            "fǒu": "fou3"
                        },
                        "selected": "",
                        "index": 8
                    },
                    {
                        "character": "尽",
                        "map": {
                            "jǐn": "jin3",
                            "jìn": "jin4"
                        },
                        "selected": "",
                        "index": 9
                    },
                    {
                        "character": "长",
                        "map": {
                            "cháng": "chang2",
                            "zhǎng": "zhang3"
                        },
                        "selected": "",
                        "index": 10
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 3973,
                "width": null
            },
            {
                "captionId": "21710",
                "sortNum": 1,
                "content": [
                    "无边无际的树木萧萧地飘下落叶，望不到头的长江水滚滚奔腾而来。 "
                ],
                "customerContent": [
                    [
                        {
                            "text": "无",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "边",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "无",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "际",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "的",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "树",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "木",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "萧",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "萧",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "地",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "飘",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "下",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "落",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "叶",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "望",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "不",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "到",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "头",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "的",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "长",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "江",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "水",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "滚",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "滚",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "奔",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "腾",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "而",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "来",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": " ",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "的",
                        "map": {
                            "de": "de5",
                            "dì": "di4",
                            "dí": "di2"
                        },
                        "selected": "",
                        "index": 4
                    },
                    {
                        "character": "地",
                        "map": {
                            "de": "de5",
                            "dì": "di4"
                        },
                        "selected": "",
                        "index": 9
                    },
                    {
                        "character": "落",
                        "map": {
                            "là": "la4",
                            "luò": "luo4",
                            "lào": "lao4"
                        },
                        "selected": "",
                        "index": 12
                    },
                    {
                        "character": "叶",
                        "map": {
                            "xié": "xie2",
                            "yè": "ye4"
                        },
                        "selected": "",
                        "index": 13
                    },
                    {
                        "character": "不",
                        "map": {
                            "bù": "bu4",
                            "fǒu": "fou3"
                        },
                        "selected": "",
                        "index": 16
                    },
                    {
                        "character": "头",
                        "map": {
                            "tóu": "tou2",
                            "tou": "tou5"
                        },
                        "selected": "",
                        "index": 18
                    },
                    {
                        "character": "的",
                        "map": {
                            "de": "de5",
                            "dì": "di4",
                            "dí": "di2"
                        },
                        "selected": "",
                        "index": 19
                    },
                    {
                        "character": "长",
                        "map": {
                            "cháng": "chang2",
                            "zhǎng": "zhang3"
                        },
                        "selected": "",
                        "index": 20
                    },
                    {
                        "character": "奔",
                        "map": {
                            "bèn": "ben4",
                            "bēn": "ben1"
                        },
                        "selected": "",
                        "index": 25
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 7513,
                "width": null
            }
        ],
        "colorBlocks": [],
        "medias": [
            {
                "positionX": 0,
                "positionY": -99,
                "windowX": 0,
                "windowY": 0,
                "width": 1918,
                "height": 1278,
                "originWidth": 1200,
                "originHeight": 799,
                "windowWidth": 1918,
                "windowHeight": 1080,
                "layer": 1,
                "mediaId": "21697",
                "matchImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501953a0b891b02a4fb096c204211395737e?download=1645692619041.jpeg&Signature=ESmi1t8wjk0G51trAZT2FKyenkNIid30k%2FZRxfZ7Tl4%3D&Expires=4105155019&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "originImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501953a0b891b02a4fb096c204211395737e?download=1645692619041.jpeg&Signature=ESmi1t8wjk0G51trAZT2FKyenkNIid30k%2FZRxfZ7Tl4%3D&Expires=4105155019&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "cutoutWidth": null,
                "cutoutHeight": null,
                "cutoutX": null,
                "cutoutY": null,
                "animationEffect": "I001",
                "startTime": null,
                "endTime": null,
                "subStartTime": null,
                "subEndTime": null,
                "videoFileUrl": null,
                "videoVolume": null,
                "hoverImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501953a0b891b02a4fb096c204211395737e?download=1645692619041.jpeg&Signature=ESmi1t8wjk0G51trAZT2FKyenkNIid30k%2FZRxfZ7Tl4%3D&Expires=4105155019&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9&imageView&thumbnail=294x0"
            }
        ],
        "background": {
            "color": "#666666",
            "imgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/2022022416501953a0b891b02a4fb096c204211395737e?download=1645692619041.jpeg&Signature=ESmi1t8wjk0G51trAZT2FKyenkNIid30k%2FZRxfZ7Tl4%3D&Expires=4105155019&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
            "hasBlur": 1,
            "backgroundId": "21706"
        },
        "hasMatch": 0,
        "hasEmpty": 0,
        "hasIncomplete": 0,
        "hasAudio": 1,
        "audioModuleEnglish": false,
        "subDuration": 11486,
        "matchStatus": 0
    },
    {
        "subId": "26000",
        "subSort": 2,
        "subType": 2,
        "keyWord": "悲秋 作客",
        "audioModuleId": 46,
        "audioModuleName": "艾祥",
        "moduleType": "磁性男声",
        "audioIconUrl": "https://nos-creative-video.nos-jd.163yun.com/20210607182846318673deab75464ea0d1a2ad40c22854?download=%E6%AD%A3%E5%B8%B8%E7%94%B7%E7%94%9F%E5%A4%B4%E5%83%8F.png&Signature=6%2FRsU9fW2DEp%2BLzJwvQIR3qDGEvtumD2l7OIExbqpig%3D&Expires=4105160889&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
        "audioVolume": 50,
        "speechRate": 0,
        "textFont": "1",
        "textSize": 3,
        "textColor": "#ffffff",
        "outlineSize": 6,
        "outlineColor": "#000000",
        "bgColor": "",
        "position": 1,
        "bold": 0,
        "underline": 0,
        "texts": [],
        "captions": [
            {
                "captionId": "21699",
                "sortNum": 0,
                "content": [
                    "万里悲秋常作客，百年多病独登台。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "万",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "里",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "悲",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "秋",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "常",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "作",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "客",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "百",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "年",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "多",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "病",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "独",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "登",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "台",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "万",
                        "map": {
                            "wàn": "wan4",
                            "mò": "mo4"
                        },
                        "selected": "",
                        "index": 0
                    },
                    {
                        "character": "台",
                        "map": {
                            "tái": "tai2",
                            "tāi": "tai1"
                        },
                        "selected": "",
                        "index": 14
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 3973,
                "width": null
            },
            {
                "captionId": "21711",
                "sortNum": 1,
                "content": [
                    "悲对秋景感慨万里漂泊常年为客，一生当中疾病缠身今日独上高台。 "
                ],
                "customerContent": [
                    [
                        {
                            "text": "悲",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "对",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "秋",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "景",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "感",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "慨",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "万",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "里",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "漂",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "泊",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "常",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "年",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "为",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "客",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "一",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "生",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "当",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "中",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "疾",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "病",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "缠",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "身",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "今",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "日",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "独",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "上",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "高",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "台",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": " ",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "景",
                        "map": {
                            "jǐng": "jing3",
                            "yǐng": "ying3"
                        },
                        "selected": "",
                        "index": 3
                    },
                    {
                        "character": "万",
                        "map": {
                            "wàn": "wan4",
                            "mò": "mo4"
                        },
                        "selected": "",
                        "index": 6
                    },
                    {
                        "character": "漂",
                        "map": {
                            "piāo": "piao1",
                            "piào": "piao4",
                            "piǎo": "piao3"
                        },
                        "selected": "",
                        "index": 8
                    },
                    {
                        "character": "泊",
                        "map": {
                            "bó": "bo2",
                            "pō": "po1"
                        },
                        "selected": "",
                        "index": 9
                    },
                    {
                        "character": "为",
                        "map": {
                            "wéi": "wei2",
                            "wèi": "wei4"
                        },
                        "selected": "",
                        "index": 12
                    },
                    {
                        "character": "当",
                        "map": {
                            "dàng": "dang4",
                            "dāng": "dang1"
                        },
                        "selected": "",
                        "index": 17
                    },
                    {
                        "character": "中",
                        "map": {
                            "zhōng": "zhong1",
                            "zhòng": "zhong4"
                        },
                        "selected": "",
                        "index": 18
                    },
                    {
                        "character": "上",
                        "map": {
                            "shàng": "shang4",
                            "shǎng": "shang3"
                        },
                        "selected": "",
                        "index": 26
                    },
                    {
                        "character": "台",
                        "map": {
                            "tái": "tai2",
                            "tāi": "tai1"
                        },
                        "selected": "",
                        "index": 28
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 7513,
                "width": null
            }
        ],
        "colorBlocks": [],
        "medias": [
            {
                "positionX": 0,
                "positionY": -181,
                "windowX": 0,
                "windowY": 0,
                "width": 1918,
                "height": 1441,
                "originWidth": 1280,
                "originHeight": 961,
                "windowWidth": 1918,
                "windowHeight": 1080,
                "layer": 1,
                "mediaId": "21700",
                "matchImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/20220224165021021dd19d274d4a5ea993c33757141872?download=1645692621287.jpeg&Signature=pkp2fS3ibNdPEnsQMudxDDrXpigtbJhIivqllflKv0I%3D&Expires=4105155021&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "originImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/20220224165021021dd19d274d4a5ea993c33757141872?download=1645692621287.jpeg&Signature=pkp2fS3ibNdPEnsQMudxDDrXpigtbJhIivqllflKv0I%3D&Expires=4105155021&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "cutoutWidth": null,
                "cutoutHeight": null,
                "cutoutX": null,
                "cutoutY": null,
                "animationEffect": "I001",
                "startTime": null,
                "endTime": null,
                "subStartTime": null,
                "subEndTime": null,
                "videoFileUrl": null,
                "videoVolume": null,
                "hoverImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/20220224165021021dd19d274d4a5ea993c33757141872?download=1645692621287.jpeg&Signature=pkp2fS3ibNdPEnsQMudxDDrXpigtbJhIivqllflKv0I%3D&Expires=4105155021&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9&imageView&thumbnail=294x0"
            }
        ],
        "background": {
            "color": "#666666",
            "imgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/20220224165021021dd19d274d4a5ea993c33757141872?download=1645692621287.jpeg&Signature=pkp2fS3ibNdPEnsQMudxDDrXpigtbJhIivqllflKv0I%3D&Expires=4105155021&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
            "hasBlur": 1,
            "backgroundId": "21707"
        },
        "hasMatch": 0,
        "hasEmpty": 0,
        "hasIncomplete": 0,
        "hasAudio": 1,
        "audioModuleEnglish": false,
        "subDuration": 11486,
        "matchStatus": 0
    },
    {
        "subId": "26001",
        "subSort": 3,
        "subType": 2,
        "keyWord": "霜鬓 酒杯",
        "audioModuleId": 46,
        "audioModuleName": "艾祥",
        "moduleType": "磁性男声",
        "audioIconUrl": "https://nos-creative-video.nos-jd.163yun.com/20210607182846318673deab75464ea0d1a2ad40c22854?download=%E6%AD%A3%E5%B8%B8%E7%94%B7%E7%94%9F%E5%A4%B4%E5%83%8F.png&Signature=6%2FRsU9fW2DEp%2BLzJwvQIR3qDGEvtumD2l7OIExbqpig%3D&Expires=4105160889&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
        "audioVolume": 50,
        "speechRate": 0,
        "textFont": "1",
        "textSize": 3,
        "textColor": "#ffffff",
        "outlineSize": 6,
        "outlineColor": "#000000",
        "bgColor": "",
        "position": 1,
        "bold": 0,
        "underline": 0,
        "texts": [],
        "captions": [
            {
                "captionId": "21702",
                "sortNum": 0,
                "content": [
                    "艰难苦恨繁霜鬓，潦倒新停浊酒杯。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "艰",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "难",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "苦",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "恨",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "繁",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "霜",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "鬓",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "潦",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "倒",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "新",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "停",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "浊",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "酒",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "杯",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "难",
                        "map": {
                            "nán": "nan2",
                            "nàn": "nan4",
                            "nuó": "nuo2"
                        },
                        "selected": "",
                        "index": 1
                    },
                    {
                        "character": "繁",
                        "map": {
                            "fán": "fan2",
                            "pó": "po2"
                        },
                        "selected": "",
                        "index": 4
                    },
                    {
                        "character": "潦",
                        "map": {
                            "liáo": "liao2",
                            "lào": "lao4",
                            "lǎo": "lao3"
                        },
                        "selected": "",
                        "index": 8
                    },
                    {
                        "character": "倒",
                        "map": {
                            "dào": "dao4",
                            "dǎo": "dao3"
                        },
                        "selected": "",
                        "index": 9
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 3973,
                "width": null
            },
            {
                "captionId": "21712",
                "sortNum": 1,
                "content": [
                    "历尽了艰难苦恨白发长满了双鬓，衰颓满心偏又暂停了消愁的酒杯。"
                ],
                "customerContent": [
                    [
                        {
                            "text": "历",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "尽",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "了",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "艰",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "难",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "苦",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "恨",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "白",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "发",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "长",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "满",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "了",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "双",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "鬓",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "，",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "衰",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "颓",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "满",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "心",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "偏",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "又",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "暂",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "停",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "了",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "消",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "愁",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "的",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "酒",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "杯",
                            "isPause": false,
                            "duration": null
                        },
                        {
                            "text": "。",
                            "isPause": false,
                            "duration": null
                        }
                    ]
                ],
                "polyphony": [
                    {
                        "character": "尽",
                        "map": {
                            "jǐn": "jin3",
                            "jìn": "jin4"
                        },
                        "selected": "",
                        "index": 1
                    },
                    {
                        "character": "了",
                        "map": {
                            "le": "le5",
                            "liǎo": "liao3"
                        },
                        "selected": "",
                        "index": 2
                    },
                    {
                        "character": "难",
                        "map": {
                            "nán": "nan2",
                            "nàn": "nan4",
                            "nuó": "nuo2"
                        },
                        "selected": "",
                        "index": 4
                    },
                    {
                        "character": "发",
                        "map": {
                            "fà": "fa4",
                            "fā": "fa1"
                        },
                        "selected": "",
                        "index": 8
                    },
                    {
                        "character": "长",
                        "map": {
                            "cháng": "chang2",
                            "zhǎng": "zhang3"
                        },
                        "selected": "",
                        "index": 9
                    },
                    {
                        "character": "了",
                        "map": {
                            "le": "le5",
                            "liǎo": "liao3"
                        },
                        "selected": "",
                        "index": 11
                    },
                    {
                        "character": "衰",
                        "map": {
                            "cuī": "cui1",
                            "shuāi": "shuai1"
                        },
                        "selected": "",
                        "index": 15
                    },
                    {
                        "character": "了",
                        "map": {
                            "le": "le5",
                            "liǎo": "liao3"
                        },
                        "selected": "",
                        "index": 23
                    },
                    {
                        "character": "的",
                        "map": {
                            "de": "de5",
                            "dì": "di4",
                            "dí": "di2"
                        },
                        "selected": "",
                        "index": 26
                    }
                ],
                "hasPolyphony": 1,
                "hasCaption": 1,
                "matchAudioUrl": "",
                "audioDuration": 7277,
                "width": null
            }
        ],
        "colorBlocks": [],
        "medias": [
            {
                "positionX": 0,
                "positionY": -179,
                "windowX": 0,
                "windowY": 0,
                "width": 1918,
                "height": 1438,
                "originWidth": 2048,
                "originHeight": 1536,
                "windowWidth": 1918,
                "windowHeight": 1080,
                "layer": 1,
                "mediaId": "21703",
                "matchImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/202202241650241ccac4bfba1349ef9e8a1be7ef509ff1?download=16456926245595.jpg&Signature=l71ja4loTHrbU3OztRnr87aFa%2BX4NY%2BnSYmRP15Od3M%3D&Expires=4105155024&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "originImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/202202241650241ccac4bfba1349ef9e8a1be7ef509ff1?download=16456926245595.jpg&Signature=l71ja4loTHrbU3OztRnr87aFa%2BX4NY%2BnSYmRP15Od3M%3D&Expires=4105155024&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
                "cutoutWidth": null,
                "cutoutHeight": null,
                "cutoutX": null,
                "cutoutY": null,
                "animationEffect": "I001",
                "startTime": null,
                "endTime": null,
                "subStartTime": null,
                "subEndTime": null,
                "videoFileUrl": null,
                "videoVolume": null,
                "hoverImgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/202202241650241ccac4bfba1349ef9e8a1be7ef509ff1?download=16456926245595.jpg&Signature=l71ja4loTHrbU3OztRnr87aFa%2BX4NY%2BnSYmRP15Od3M%3D&Expires=4105155024&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9&imageView&thumbnail=294x0"
            }
        ],
        "background": {
            "color": "#666666",
            "imgUrl": "https://nos-creative-video-test.nos-jd.163yun.com/202202241650241ccac4bfba1349ef9e8a1be7ef509ff1?download=16456926245595.jpg&Signature=l71ja4loTHrbU3OztRnr87aFa%2BX4NY%2BnSYmRP15Od3M%3D&Expires=4105155024&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9",
            "hasBlur": 1,
            "backgroundId": "21708"
        },
        "hasMatch": 0,
        "hasEmpty": 0,
        "hasIncomplete": 0,
        "hasAudio": 1,
        "audioModuleEnglish": false,
        "subDuration": 11250,
        "matchStatus": 0
    }
]

const fontSize = [
    {
        id: 1,
        name: '特小',
        size: 40,
        egSize: 30
    },
    {
        id: 2,
        name: '小',
        size: 46,
        egSize: 35
    },
    {
        id: 3,
        name: '常规',
        size: 52,
        egSize: 40
    },
    {
        id: 4,
        name: '大',
        size: 78,
        egSize: 50
    },
    {
        id: 5,
        name: '特大',
        size: 106,
        egSize: 64
    }
]

export {
    getLayerCaptionBounding,
    getLayerTextBounding,
    searchLayerByPx,
    layerData,
    fontSize,
    subList
}