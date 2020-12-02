export function initMixin(Vue) {
    Vue.mixin = function (mixin) {
        // 初始化
        this.options = mergeOptions(this.options, mixin);
        return this;
    }
}