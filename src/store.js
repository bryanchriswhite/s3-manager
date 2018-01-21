import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = {
  loggedIn: false,
  dividers: {
    vertical: [
      '40%',
      '60%'
    ],
    horizontal1: [
      '30%',
      '70%'
    ],
    horizontal2: [
      '40%',
      '60%'
    ]
  }
};

const mutations = {
  resize(state, payload) {
    state.dividers = {
      ...state.dividers,
      ...payload
    }
  }
};

export default new Vuex.Store({
  state: initialState,
  mutations
});
