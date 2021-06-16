import Vue from 'vue';
import BaseConfirm from '@/components/confirm/BaseConfirm.vue'
class Confirm {
    constructor(options: {}) {
        let Confirm = Vue.extend(BaseConfirm)
        let instance = new Confirm({
            propsData: options
        })
        let div = document.createElement('div')
        document.body.appendChild(div)
        instance.$mount(div)
    }
}
const confirm = function(options: {}) {
    return new Confirm(options)
};
  export default confirm;