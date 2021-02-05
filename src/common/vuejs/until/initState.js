import { isPlainObject } from "jquery";
import { observable } from "vue/types/umd";

export function initState(vm) {
    vm._watchers = [];
    const opts = vm.$options;
    if (opts.props) initProps(vm, opts.props);
    if (opts.methods) initProps(vm, opts.methods);
    if (opts.props) {
        initProps(vm, opts.props)
    } else {
        observable(vm._data = {}, true)
    };
    if (opts.computed) initProps(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
        initProps(vm, opts.watch)
    };
}

function normaloizeProps(options, vm) {
    const props = options.props;
    if (!props) {
        return;
    }
    const res = {};
    let i, val, name;
    if (Array.isArray(props)) {
        i = props.length;
        while(i --) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);
                res[name] = {type: null};
            } else if (process.env.NODE_ENV !== 'production') {
                warn('props值为数组时,数组元素必须为字符串类型')
            }
        }
    } else if (isPlainObject(props)) {
        for( const key in props) {
            val = porps[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : {type: val};
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn('props属性无效,请使用字符串或者数组或者对象')
    }
    options.props = res;
}