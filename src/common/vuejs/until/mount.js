import { compileToFunctions } from "vue-template-compiler";
import { compile } from "vue/types/umd";

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
                {...}, 
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
    
}

export { mount }