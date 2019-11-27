import Progress from '@/components/progress/Progress.vue';

const install = function(Vue){
    const Bus = new Vue({
        methods : {
            start() {
                Progress.start();
            }
        }
    });
    //  通过原型对象去拓展对应的插件，可以使得所有的vue实例直接访问
    Vue.prototype.$bus = Bus ;
} ;
export default install ;
