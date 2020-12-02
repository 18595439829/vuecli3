// 运行时版本
Vue.prototype.$mount = function(el) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el);
}
function mountComponent(vm, el) {
    if (!vm.#options.render) { 
        vm.$options.render = createEmptyVNode;
        if (process.env.NODE_ENV !== 'production') {
            // 开发环境发出警告
        }
    }
    // 触发生命周期钩子beforeMount
    callHook(vm, 'beforeMount');

    // 挂载
    vm._watcher = new Watcher(bm, () => {
        vm._update(vm._render())
    }, noop)

    // 触发生命周期钩子mouted
    callHook(vm, 'mounted');
    return vm;
}

// 完整版
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function(el) {
    el = el && query(el)
    const options = this.$options;
    if(!options.render) {
        let template = options.template;
        if(template) {
            // 模板解析
            if(typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                }
            } else if (template.nodeType) {
                template = template.innerHTML;
            } else {
                if(process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this);
                }
                return this;
            }
        } else if (el) {
            template = getOuterHTML(el)
        }
        if(template) {
            const {render} = compileToFunctions(
                template, 
                {...options}, 
                this
            )
            options.render = render;
        }
    }
    return mount.call(this, el)
}

function query(el) {
    if(typeof el === 'string') {
        const selected = document.querySelector(el); 
        if (!selected) {
            return document.createElement('div');
        }
        return selected
    } else {
        return el;
    }
}

function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

function idToTemplate(id) {
    const el = query(id);
    return el && el.innerHTML;
}

function compileToFunctions(template, options, vm) {
    options = extend({}, options);
    // 检查缓存
    const key = options.delimiters ? String(options.delimiters) + template : template;
    if (cache[key]) {
        return cache[key];
    }

    // 编译
    const compiled = compile(template, options);

    // 将代码字符串转化为函数
    const res = {};
    res.render = createFunction(compiled.render);
    return (cache[key] = res)
}
function createFunction(code) {
    return new Function(code)
}

export { mount }