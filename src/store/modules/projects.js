import api from '@/api';

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
  async create({ commit }, project) {
    try {
      let response = await api.projects.create(project);
      commit('setProject', response.project);
      return {
        message: `${project.name} was created.`,
        project: response.project,
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
  async delete({ commit }, project) {
    try {
      await api.projects.delete(project.id);
      commit('deleteProject', project.id);
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
  async getAllProjects({ commit }) {
    try {
      let projects = await api.projects.getAllProjects();
      commit('setProjects', projects);
    } catch (error) {
      commit('setProjects', null);
    }
  },
  async getProject({ commit }, id) {
    try {
      let project = await api.projects.getProject(id);
      commit('setProject', project);
    } catch (error) {
      commit('setProject', null);
    }
  },
};

const mutations = {
  deleteProject(state, payload) {
    state.projects = state.projects.filter(project => {
      return project.id.toString() !== payload.toString();
    });
  },
  linkImageToProject(state, { imageId, projectId }) {
    const project = state.projects.filter(project => {
      return project.id === projectId;
    })[0];

    if (project) {
      project.imageIds.push(imageId);
    }
  },
  setProject(state, payload) {
    if (state.projects && state.projects.length > 0) {
      state.projects.push(payload);
    } else {
      state.projects = [payload];
    }
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  unlinkImageToProject(state, { imageId, projectId }) {
    const project = state.projects.filter(project => {
      return project.id === projectId;
    })[0];
    if (project) {
      project.imageIds = project.imageIds.filter(element => {
        return element !== imageId;
      });
    }
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
