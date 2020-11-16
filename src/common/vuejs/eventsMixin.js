import { cssNumber } from "jquery";

export function eventsMixin (Vue) {
    Vue.prototype.$on = function(event, fn) {
        const vm = this;
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                const element = array[i];
                this.$on(event[i], fn);
            }
        } else {
            (vm._events[event] || (vm,_events[event] = [])).push(fn)
        }
        return vm;
    }
    Vue.prototype.$once = function(event, fn) {
        const vm = this;
        function on() {
            vm.$off(event, on);
            /** 
             * 改变this指向
             * call(),参数依次罗列,函数会直接调用一次,fn.call(this, argu1<Any>, argu2...);
             * apply(),参数为数组,函数会直接调用一次, fn.apply(this, arguments<Array>);
             * bind(),用法与call一样,返回的是一个函数,但函数不会调用, fn.call(this, argu1<Any>, argu2...)();
             */
            fn.apply(vm, arguments)
        };
        on.fn = on;
        vm.$on(event, on);
        return vm;
    }
    Vue.prototype.$off = function(event, fn) {
        const vm = this;

        // 移除所有事件监听
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }

        // 当event是数组时
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.$off(event[i], fn);
            }
            return vm;
        }

        // 当只提供事件名event,未提供callback fn时
        const cbs = vm._events[event]
        if (!cbs) {
            return vm;
        }
        if (arguments.length === 1) {
            vm._events[event] = null;
            return vm;
        }

        // 只移除与fn相同的监听器
        if (fn) {
            const cbs = vm._events[event];
            let cb;
            let i = cbs.length;
            while(i --) {
                cb = cbs[i];
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1);
                    break;
                }
            }
        }
        return vm;
    }
    Vue.prototype.$emit = function(event) {
        const vm = this;
        let cbs = vm._events[event];
        if (cbs) {
            const args = toArray(arguments, 1);
            for (let i = 0; i < cbs.length; i++) {
                try {
                    cbs[i].apply(vm, args)
                } catch (e) {
                    handleError(e,vm,`event handler for '${event}'`)
                }
            }
        }
        return vm;
    }
}