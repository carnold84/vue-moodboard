import authService from '@/services/auth';

const tokenName = 'aura_token';
const authToken = localStorage.getItem(tokenName);

if (authToken) {
  authService.setToken(authToken);
}

const state = {
  token: authToken || null,
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
      let user = await authService.getUser();

      commit('user_success', user);

      return {
        message: 'User details fetched.',
        success: false,
      };
    } catch (error) {
      commit('user_error');

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
      let token = await authService.login({ email, password });
      localStorage.setItem(tokenName, token);

      commit('login_success', token);

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
      localStorage.removeItem(tokenName);
      commit('logout_success');

      return {
        message: 'Logout successful.',
        success: false,
      };
    } catch (error) {
      commit('logout_error');

      return {
        error,
        message: 'Logout failed.',
        success: false,
      };
    }
  },
};

const mutations = {
  login_success(state, token) {
    state.token = token;
  },
  logout_error(state) {
    state.token = '';
  },
  logout_success(state) {
    state.token = '';
  },
  user_error(state) {
    state.user = null;
  },
  user_success(state, user) {
    state.user = user;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
