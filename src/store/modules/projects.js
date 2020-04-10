import Vue from 'vue';

import api from '@/api';

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
  async create({ commit }, project) {
    try {
      let response = await api.projects.create(project);
      commit('add', response.project);
      
      return {
        message: `${response.project.name} was created.`,
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
      commit('remove', project);
  
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
  load: async ({ commit }) => {
    try {
      let projects = await api.projects.list();
      projects.forEach(element => {
        commit('add', element);
      });

      return projects;
    } catch (error) {
      return {
        error,
        message: 'Could not load projects.',
        success: false,
      };
    }
  },
  async update({ commit }, project) {
    try {
      let response = await api.projects.update(project);
      commit('add', response.project);
      
      return {
        message: `${response.project.name} was updated.`,
        project: response.project,
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        message: `${project.name} couldn't be updated.`,
        success: false,
      };
    }
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
  remove(state, item) {
    const idx = state.allIds.indexOf(item.id);

    Vue.delete(state.byId, item.id);
    Vue.delete(state.allIds, idx);
  },
  linkImageToProject(state, { imageId, projectId }) {
    const project = state.byId[projectId];

    if (project) {
      project.imageIds.push(imageId);
    }
  },
  linkLinkToProject(state, { linkId, projectId }) {
    const project = state.byId[projectId];

    if (project) {
      project.linkIds.push(linkId);
    }
  },
  unlinkImageFromProject(state, { imageId, projectId }) {
    const project = state.byId[projectId];
    
    if (project) {
      project.imageIds = project.imageIds.filter(element => {
        return element !== imageId;
      });
    }
  },
  unlinkLinkFromProject(state, { linkId, projectId }) {
    const project = state.byId[projectId];

    if (project) {
      project.linkIds = project.linkIds.filter(element => {
        return element !== linkId;
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
