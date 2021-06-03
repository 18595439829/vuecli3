import { Observable } from "ol"

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
    if(!isPlainObject(data)) {
        data = {}
        process.env.NODE_ENV !== 'producion' && warn('data方法必须返回一个对象', vm)
    }
    // 将data 代理到Vue.js实例上
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    while(i --) {
        const key = keys[i]
        if (process.env.NODE_ENV !== 'production') {
            if (methods && hasOwn(methods, key)) {
                warn(`方法${key}已经作为一个data定义了`, vm)
            }
        }
        if (props && hasOwn(props, key)) {
            process.env.NODE_ENV !== 'production' && warn(`data中的属性${key}已经在props中定义了,请在prop中使用default代替`)
        } else if (!isReserved(key)) {
            proxy(vm, `_data`, key)
        }
    }
    // 观察数据
    Observable(data, true)
}