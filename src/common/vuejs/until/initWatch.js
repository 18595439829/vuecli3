function initWatch(vm, watch) {
    for (const key in watch) {
        const handler = watch[key]
        if (Array.isArray(handler)){
            for (let index = 0; index < handler.length; index++) {
                createWatcher(vm, key, handler[index])
            }
        } else {
            createWatcher(vm, key, handler)
        }
    }
}

function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler
    } 
    if (typeof handler === 'string') {
        handler = vm[handler]
    }
    return vm.$watch(expOrFn, handler, options)
}
