import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cropperData: {},
    hoverData: {}
  },
  mutations: {
    updateCropperData (state, data) {
      state.cropperData = data
    },
    updateHoverData (state, data) {
      state.hoverData = data
    }
  }
})
export default store