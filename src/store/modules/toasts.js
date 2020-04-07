import Vue from 'vue';
import uid from 'uid';

const state = {
  allIds: [],
  byId: {},
};

const getters = {
  find: state => id => {
    return state.byId[id];
  },
  list: (state, getters) => {
    return state.allIds.map(id => {
      return getters.find(id);
    });
  },
};

const actions = {
  add({ commit }, toast) {
    commit('add', {
      ...toast,
      id: uid(),
    });
  },
  remove({ commit }, id) {
    commit('remove', id);
  },
};

const mutations = {
  add(state, item) {
    Vue.set(state.byId, item.id, item);
    if (state.allIds.includes(item.id)) {
      return;
    }
    state.allIds.push(item.id);
  },
  remove(state, id) {
    const idx = state.allIds.indexOf(id);

    Vue.delete(state.byId, id);
    Vue.delete(state.allIds, idx);
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
