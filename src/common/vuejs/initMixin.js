export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 初始化
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.contructor),
            options || {},
            vm,
        )
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        initInjections(vm); // 在data/props前初始化inject
        initState(vm); // 初始化data,computed,props,methods,watch
        initProvide(vm); // 在data/props后初始化provide
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
}