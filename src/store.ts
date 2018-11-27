import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bgColor: 'purple'
  },
  mutations: {
    changeBGColor (state, data) {
      state.bgColor = data
    }
  },
  actions: {}
});
