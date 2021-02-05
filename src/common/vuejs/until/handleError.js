export function handleError(err, vm, info) {
    if (vm) {
        let cur = vm;
        while((cur = cur.$parent)) {
            const hooks = cur.$options.errorCaptured;
            hooks.forEach(item => {
                try {
                   const capture =  item.call(cur, err, vm, info) === false;
                   if (capture) {
                       return; 
                   }
                } catch (e) {
                    globalHandleError(e, cur, 'errorCaptured hook')
                }
            })
        }
    }
    globalHandleError(err, vm, info)
}

function globalHandleError(err, vm, info) {
    if(config.errorHandler) {
        try {
            return config.errorHandler.call(null, err, vm, info);
        } catch (e) {
            logError(e)
        }
    }   
    logError(err)
}

function logError(err) {
    console.error(err);
}