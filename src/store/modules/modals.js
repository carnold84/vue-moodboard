import Vue from 'vue';

const state = {
  open: [],
  props: {},
};

const getters = {
  active: state => {
    return state.open.length > 0 ? state.open[0] : null;
  },
	allOpen: state => {
    return state.open;
  },
	props: state => {
    return name => {
      return state.props[name];
    };
  },
};

const actions = {
  open: ({ commit }, payload) => {
    commit('open', payload);
  },
  close: ({ commit }, payload) => {
    commit('close', payload);
  },
};

const mutations = {
  open: (state, payload) => {
    state.open.unshift(payload.name);
    Vue.set(state.props, payload.name, payload.props);
  },
  close: (state, name) => {
    const idx = state.open.indexOf(name);

    Vue.delete(state.open, idx);
    Vue.delete(state.props, name);
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
