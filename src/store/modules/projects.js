import projectsService from '@/services/projects';

const state = {
  projects: undefined,
};

const getters = {
  project: state => id => {
    if (!state.projects) {
      return undefined;
    }

    return state.projects.filter(project => {
      return project.id.toString() === id.toString();
    })[0];
  },
  projects: state => {
    return state.projects;
  },
};

const actions = {
  async create({ commit, }, project) {
    try {
      let response = await projectsService.create(project);
      commit('setProject', response.project);
      return {
        message: `${project.name} was created.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${project.name} couldn't be created.`,
        success: false,
      };
    }
  },
  async delete({ commit, }, project) {
    try {
      let response = await projectsService.delete(project.id);
      commit('deleteProject', response.id);
      return {
        message: `${project.name} was deleted.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${project.name} couldn't be deleted.`,
        success: false,
      };
    }
  },
  async getAllProjects({ commit, }) {
    try {
      let projects = await projectsService.getAllProjects();
      commit('setProjects', projects);
    } catch (error) {
      commit('setProjects', null);
    }
  },
  async getProject({ commit, }, id) {
    try {
      let project = await projectsService.getProject(id);
      commit('setProject', project);
    } catch (error) {
      commit('setProject', null);
    }
  },
};

const mutations = {
  deleteProject(state, payload) {
    state.projects = state.projects.filter(project => {
      return project.id.toString() === payload;
    });
  },
  setProject(state, payload) {
    if (state.projects && state.projects.length > 0) {
      state.projects.push(payload);
    } else {
      state.projects = [payload,];
    }
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
