import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cropperData: {},
    moveableData: {},
    deleteData: {}
  },
  mutations: {
    updateCropperData (state, data) {
      state.cropperData = data
    },
    updateMoveableData (state, data) {
      state.moveableData = data
    },
    updateDeleteData(state, data) {
      state.deleteData = data
    }
  }
})
export default store