import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = {
  loggedIn: false,
  dividers: {
    vertical: [
      'calc(40% - var(--divider-thickness)',
      '60%'
    ],
    horizontal1: [
      'calc(30% - var(--divider-thickness)',
      '70%'
    ],
    horizontal2: [
      'calc(40% - var(--divider-thickness)',
      '60%'
    ]
  }
};

const mutations = {
  resize(state, payload) {
    console.table(payload);
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
