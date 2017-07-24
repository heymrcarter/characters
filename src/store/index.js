import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    results: []
  },
  getters: {
    results: state => state.results
  },
  actions: {
    addResult ({ commit }, result) {
      commit('ADD_RESULT', result)
    }
  },
  mutations: {
    ADD_RESULT (state, result) {
      state.results.push(result)
    }
  }
})

export default store
