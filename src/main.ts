import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api'
import axios from 'axios'
import '@/plugins/iview'
import $ from 'jquery';
import eCharts from 'echarts';
import Viser from 'viser-vue'
import VueI18n from 'vue-i18n'
import Progress from '@/components/progress/index.ts';


Vue.use(VueI18n)
Vue.use(Progress);

Vue.use(Viser)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$ = $
Vue.prototype.$eCharts = eCharts
Vue.prototype.$store = store
const i18n = new VueI18n({
  locale: 'ja', // 设置语言环境
});
new Vue({
  router,
  store,
  i18n,
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