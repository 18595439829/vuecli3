import { nextTick } from './until/index.js'

export function renderMixin(Vue) {
    Vue.prototype.$nextTick = function(fn) {
        return nextTick(fn, this);
    }
}