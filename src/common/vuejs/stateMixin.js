import {set, del} from '../observer/index';

export function stateMixin (Vue) {
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
    Vue.prototype.$watch = function (expOrFn, cb, options) {}
}