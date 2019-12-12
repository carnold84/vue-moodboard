import projectsService from "@/services/projects";

const state = {
  projects: undefined
};

const getters = {
  projects: state => {
    return state.projects;
  }
};

const actions = {
  async getAllProjects({ commit }) {
    try {
      let projects = await projectsService.getAllProjects();
      commit("setProjects", projects);
    } catch (error) {
      commit("setProjects", null);
    }
  }
};

const mutations = {
  setProjects(state, payload) {
    state.projects = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
