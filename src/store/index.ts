import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cropperData: {},
    deleteData: {}
  },
  mutations: {
    updateCropperData (state, data) {
      state.cropperData = data
    },
    updateDeleteData(state, data) {
      state.deleteData = data
    }
  }
})
export default store