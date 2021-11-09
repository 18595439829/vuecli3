import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cropperData: {}
  },
  mutations: {
    updateCropperData (state, data) {
      state.cropperData = data
    }
  }
})
export default store