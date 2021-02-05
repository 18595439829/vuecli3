export function initInjections(vm) {
    const result = resolveInject(vm.$options.inject, vm);
    if (result) {
        observerState.shouldConvert = false;
        Object.keys(result).forEach(key => {
            defineReactive(vm, key, result[key]);
        })
        observerState,shouldConvert = true;
    }
}

function resolveInject(inject, vm) {
    if (inject) {
        const result = Object.create(null);
        const keys = hasSymbol ? Reflect.ownKeys(inject).filter(key => {
            return Object.getOwnPropertyDescriptor(inject, key).enumerable
        }) : Object.keys(inject);
        keys.forEach(key => {
            const provideKey = inject[key].from;
            let source = vm;
            while(source) {
                if (source._provide && provideKey in source._provide) {
                    result[key] = source._provide[provideKey];
                    break
                }
                source = source.$parent
            }
            if (!source) {
                if ('default' in inject[key]) {
                    const provideDefault = inject[key].default;
                    result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
                } else if (process.env.NODE_ENV !== 'production') {
                    warn (`${key}是无效的属性`)
                }
            }
        })
        return result;
    }
}