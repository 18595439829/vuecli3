import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api'
import axios from 'axios'
import '@/assets/css/main.less';
import '@/plugins/iview'
import Progress from '@/components/progress/index';
import '@/common/directives.js';
import confirm from '@/components/confirm/confirm'

console.log(App,document.getElementById('app1'));
Vue.use(Progress);

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$confirm = confirm
// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next()
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
let params = {
  name: "admin",
  password: "123456"
};

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})