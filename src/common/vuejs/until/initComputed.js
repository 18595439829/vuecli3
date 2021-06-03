import { get, noop } from "jquery";

const computedWatcherOptions = {lazy: true};

function initComputed(vm, computed) {
    const watchers = vm._computedWatchers = Object.create(null);
    // 计算属性在SSR(服务端渲染)环境中,只是一个普通的getter函数
    const isSSR = isServerRendering()
    for(const key in computed) {
        const userDef = computed[key];
        const getter = typeof userDef === 'function' ? userDef : userDef.get;
        if (process.env.NODE_ENV !== 'production' && getter == null) {
            warn(`计算属性${key}上没有Getter`, vm)
        }
        // 在非SSR环境中,为计算属性创建内部观察器
        if (!isSSR) {
            watchers[key] = new watchers(vm, getter || noop, noop, computedWatcherOptions)
        }
        if (!(key in vm)) {
            definedComputed(vm, key, userDef)
        } else if (process.env.NODE_ENV !== 'production') {
            if (key in vm.$data) {
                warn(`${key}已经在data中定义了`, vm)
            } else if (vm.$options.props && key in vm.$options.props) {
                warn(`${key}已经在prop上定义了`,vm)
            }
        }
    }
}