import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cropperData: {},
    hoverData: {},
    deleteData: {}
  },
  mutations: {
    updateCropperData (state, data) {
      state.cropperData = data
    },
    updateHoverData (state, data) {
      state.hoverData = data
    },
    updateDeleteData(state, data) {
      state.deleteData = data
    }
  }
})
export default store