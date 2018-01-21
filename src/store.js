import Vue from 'vue'
import Vuex from 'vuex'
import aws from './aws.js'

Vue.use(Vuex);

const initialState = {
  aws: {
    config: aws.loadConfig(),
    buckets: [],
    selectedBucket: null,
    files: [],
    selectedFile: null
  },
  dividers: {
    vertical: [
      '40%',
      'calc(60% - var(--divider-thickness)'
    ],
    horizontal1: [
      '30%',
      'calc(70% - var(--divider-thickness)'
    ],
    horizontal2: [
      '40%',
      'calc(60% - var(--divider-thickness)'
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
  state: Object.assign({}, initialState),
  mutations
});

export {
  initialState
}
