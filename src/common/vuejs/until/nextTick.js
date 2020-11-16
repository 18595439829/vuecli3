const callbakcs = [];
let pending = false;
function flushCallbacks() {
    pending = false;
    const copies = callbakcs.slice(0);
    callbakcs.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

let microTimeFunc;
const p = Promise.resolve();
microTimeFunc = () => {
    p.then(flushCallbacks);
}

let useMacroTask = false;

export function withMacroTask (fn) {
    return fn._withTask || (fn._withTask = function() {
        useMacroTask = true;
        const res = fn.apply(null, arguments);
        useMacroTask = false;
        return res;
    })
}

function nextTick(cb, ctx) {
    let _resolve;
    callbakcs.push(() => {
        if (cb) {
            cb.call(ctx);
        } else if (_resolve) {
            _resolve(ctx);
        }
    })
    if(!pending) {
        pending = true;
        if (useMacroTask) {
            mactoTimerFunc();
        } else {
            microTimeFunc()
        }
    }
    if(!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve=> {
            _resolve = resolve;
        })
    }
}

// // 测试一下
// nextTick(function() {
//     console.log(this.name);
// }, {name: '张三'});
export { nextTick }