import Vue from 'vue';

import api from '@/api';

const state = {
  token: api.auth.getToken() || null,
  user: undefined,
};

const getters = {
  isLoggedIn: state => {
    return !!state.token;
  },
  user: state => {
    return state.user;
  },
};

const actions = {
  async getUser({ commit }) {
    try {
      let user = await api.auth.getUser();

      commit('userSuccess', user);

      return {
        message: 'User details fetched.',
        success: false,
      };
    } catch (error) {
      commit('userError');

      return {
        error,
        message: 'User details failed.',
        success: false,
      };
    }
  },
  async login({ commit }, data) {
    try {
      const { email, password } = data;
      let token = await api.auth.login({ email, password });

      commit('loginSuccess', token);

      return {
        message: 'Login was successful.',
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: 'Email and password did not match.',
        success: false,
      };
    }
  },
  async logout({ commit }) {
    try {
      await api.auth.logout();
      commit('logoutSuccess');

      return {
        message: 'Logout successful.',
        success: false,
      };
    } catch (error) {
      commit('loginError');

      return {
        error,
        message: 'Logout failed.',
        success: false,
      };
    }
  },
};

const mutations = {
  loginSuccess(state, token) {
    Vue.set(state, 'token', token);
  },
  loginError(state) {
    Vue.set(state, 'token', null);
  },
  logoutSuccess(state) {
    Vue.set(state, 'token', null);
  },
  userError(state) {
    Vue.set(state, 'user', null);
  },
  userSuccess(state, user) {
    Vue.set(state, 'user', user);
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
