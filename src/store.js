import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = {
  loggedIn: false
};

const mutations = {
  logIn(state) {
    state.loggedIn = true;
  }
};

export default new Vuex.Store({
  state: initialState,
  mutations
});
