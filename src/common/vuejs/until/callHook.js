export function callHook(vm, hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        handlers.forEach((item, index) => {
            try {
                item.call(vm)
            } catch (e) {
                handlerError(e, vm, `${hook} hook`)
            }
        })
    }
}