export function initEvents(vm) {
    vm._events = Object.create(null);
    // 初始化父组件附加的事件
    const listeners = vm.$options._parentListeners
    if (listeners) {
        updateComponentListeners(vm, listeners)
    }
}

let target;
 function add(event, fn, once) {
    if (once) {
        target.$once(event, fn)
    } else {
        target.$on(event, fn)
    }
 }

 function remove (event, fn) {
     target.$off(event, fn);
 }

 function updateComponentListeners (vm, listeners, oldListeners) {
     target = vm;
     updateListeners(listeners, oldListeners || {}, add, remove, vm)
 }

 function updateListeners (on, oldOn, add, remove, vm) {
     let name, cur, old, event;
     for (name in on) {
         cur = on[name];
         old = oldOn[name];
         event = normalizeEvent(name);
         // isUndef 校验传入的参数是否是undefined或者null
         if (isUndef(cur)) {
            process.env.NODE_ENV !== 'production' && warn(`${event.name}没注册`, vm)
         } else if (isUndef(old)) {
             if (isUndef(cur.fns)) {
                 cur= on[name] = createFnInvoker(cur);
             }
             add(event.name, cur, event.once, event.capture, event.passive)
         } else if (cur !== old) {
             old.fns = cur;
             on[name] = old
         }
     }
     for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture)
        }
     }
 }
 // 解析事件修饰符
 function normalizeEvent (name) {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;
    const capture =  name.slice(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name,once,capture, passive
    }
 }