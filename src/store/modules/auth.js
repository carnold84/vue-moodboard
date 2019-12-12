import authService from "@/services/auth";

const tokenName = "aura_token";
const authToken = localStorage.getItem(tokenName);

if (authToken) {
  authService.setToken(authToken);
}

const state = {
  status: "",
  token: authToken || null,
  user: {}
};

const getters = {
  isLoggedIn: state => {
    return !!state.token;
  },
  status: state => {
    return state.status;
  }
};

const actions = {
  async login({ commit }, user) {
    commit("request");
    try {
      const { email, password } = user;
      let token = await authService.login({ email, password });
      localStorage.setItem(tokenName, token);

      commit("success", token, user);
    } catch (error) {
      commit("error");
    }
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem(tokenName);
      resolve();
    });
  }
};

const mutations = {
  request(state) {
    state.status = "loading";
  },
  success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
