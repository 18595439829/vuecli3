export function lifecycleMixin(Vue) {
    Vue.prototype.$forceUpdate = function() {
        const vm = this;
        if (vm._watcher) {
            vm._watcher.update();
        }
    }
    Vue.prototype.$destory = function() {
        const vm = this;
        if (vm._isBeingDestoryed) {
            return;
        }
        callHook(vm, 'deforeDestory');
        vm._isBeingDestoryed = true;

        // 删除自己与父级之间的连接
        const parent = vm.$parent;
        if (parent && !parent._isBeingDestoryed && !vm.$options.abstract) {
            remove(parent.$children, vm);
        }

        // 从watcher监听的所有状态的依赖列表中移除watcher
        if (vm._watcher) {
            vm._watcher.teardown();
        }
        let i = vm._watcher.length;
        while(i --) {
            vm._watcher[i].teardown();
        }
        vm._isDestoryed = true;
        // 在vnode树上触发destory钩子函数 解绑指令
        vm.__patch__(vm._node, null);
        // 触发detoryed钩子函数
        callHook(vm, 'destoryed');
        // 移除所有事件监听
        vm.$off();
    }
}