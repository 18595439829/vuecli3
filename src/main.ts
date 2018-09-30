import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api'
import axios from 'axios'
import '@/plugins/iview'
import $ from 'jquery'
import eCharts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$ = $
Vue.prototype.$eCharts = eCharts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
