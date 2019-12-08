import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    login({ commit }, user) {
      return new Promise(resolve => {
        commit("auth_request");
        setTimeout(() => {
          const token = "aura_login";
          localStorage.setItem("aura_token", token);
          commit("auth_success", token, user);
          resolve();
        }, 2000);
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("aura_token");
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => {
      return !!state.token;
    },
    authStatus: state => {
      return state.status;
    }
  },
  modules: {},
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  state: {
    status: "",
    token: localStorage.getItem("aura_token") || null,
    user: {}
  }
});
