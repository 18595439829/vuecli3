import Progress from "@/components/progress/Progress.vue";
class Pro {
  instense: any;
  constructor(Vue: any, options = {}) {
    const Pro = Vue.extend(Progress);
    this.instense = new Pro({
      propsData: options,
    });
    let progress = document.createElement("div");
    document.body.appendChild(progress);
    this.instense.$mount(progress);
  }
  start() {
    this.instense.start();
  }
  finish() {
    this.instense.finish();
  }
  fail() {
    this.instense.fail();
  }
}
const install = function(Vue: any, options: {}) {
  const progress = new Pro(Vue, options);
  //  通过原型对象去拓展对应的插件，可以使得所有的vue实例直接访问
  Vue.prototype.$progress = progress;
};
export default install;
