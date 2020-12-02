import {initMixin} from './init';
import {stateMixin} from './state';
import {renderMixin} from './render';
import {eventsMixin} from './events';
import {lifecycleMixin} from './lifecycle';
import {warn} from './util/index';
import {extend} from './util/extend';
import 
function Vue (options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called width the `new` keyword')
    }
    this._init(options);
}
Vue.extend = extend;
initMixin(Vue);
stateMixin(Vue);
renderMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);

export default Vue;