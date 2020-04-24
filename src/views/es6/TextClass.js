import Vue from 'vue';
import TextClass from './TextClass.vue';

export default class Text {
    constructor(text, dom) {
        this.text = {
            info: text
        };
        this.isShow = {
            info: true
        };
        const TextE = Vue.extend(TextClass);
        this.instense = new TextE({
            propsData: {
                text: this.text,
                isShow: this.isShow,
            }
        })
        this.instense.$mount(dom);
    }
    add(v) {
        this.text.info = v;
    }
    show() {
        this.isShow.info = true;
    }
    hide() {
        this.isShow.info = false;
    }
    cbClass() {
        this.instense.setShow();
    }
}