import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex);

const initialState = {
  loggedIn: false,
  dividers: {
    vertical: [
      '30%',
      '70%'
    ],
    horizontal1: [
      '30%',
      '70%'
    ],
    horizontal2: [
      '50%',
      '50%'
    ]
  }
};

const mutations = {
  setSize(state, payload) {
    const dividers = _.mapValues(payload, (value, key) => {
      return [getComputedStyle(
        document.querySelector(`#${key}:nth-child(1)`)
      )[value], ''];
    });
    console.log('payload:', payload);
    console.log('dividers:', dividers);

    state.dividers = {
      ...state.dividers,
      ...dividers
    };
  },
  resize(state, payload) {
    console.table(payload);
    const dividers = _.mapValues(payload, (value, key) => {
      console.log('value: %s; key: %s', value, key);
      const startValue = parseValue(state.dividers[key][0]);
      return [`${startValue - value}px`, ''];
    });
    console.table(dividers);

    state.dividers = {
      ...state.dividers,
      ...dividers
    }
  },
  logIn(state) {
    state.loggedIn = true;
  }
};

function parseValue(string) {
  const valueRegex = /^[\d.]+/
    , valueMatch = string.match(valueRegex)
    , valueString = valueMatch && valueMatch[0];

  return parseInt(valueString, 10) || '';
}

export default new Vuex.Store({
  state: initialState,
  mutations
});
