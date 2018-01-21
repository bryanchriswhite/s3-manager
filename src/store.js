import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import {s3Regions, loadConfig} from './aws.js'

Vue.use(Vuex);

const initialState = {
  aws: {
    config: loadConfig(),
    s3Regions,
    selectedRegion: 'us-east-2',
    buckets: _.range(25).map(i => `Bucket ${i}`),
    selectedBucket: null,
    files: _.range(25).map(i => `File ${i}`),
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
  },
  contextMenu: {
    x: null,
    y: null,
    visible: false,
    context: null,
    item: null
  }
};

const mutations = {
  resize(state, payload) {
    state.dividers = {
      ...state.dividers,
      ...payload
    }
  },
  selectRegion(state, region) {
    state.aws.selectedRegion = region;
  },
  openContextMenu(state, payload) {
    state.contextMenu = {
      ...state.contextMenu,
      ...payload,
      visible: true
    }
  },
  closeContextMenu(state) {
    state.contextMenu.visible = false;
  }
};

export default new Vuex.Store({
  state: Object.assign({}, initialState),
  mutations
});

export {
  initialState
}
