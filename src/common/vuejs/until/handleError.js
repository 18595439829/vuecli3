import { config } from "vue/types/umd";

export function handleError(err, vm, info) {
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