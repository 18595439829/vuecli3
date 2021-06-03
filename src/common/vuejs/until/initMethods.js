function initMethods(vm, methods) {
    const props = vm.$options.props;
    for(const key in methods) {
        if (process.env.NODE_ENV !== 'production') {
            if (methods[key] == null) {
                warn(`方法${key}使用了但是却没有定义`, vm)
            }
            if (props && hasOwn(props, key)) {
                warn(`方法${key}在props中定义了`, vm)
            }
            if ((key in vm) && isReserved(key)) {
                warn(`方法${key}与vm上的$方法或_方法重名了`, vm)
            }
        }
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    }
}