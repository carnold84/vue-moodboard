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
  findAll: (state, getters) => ids => {
    return ids.map(id => {
      return getters.find(id);
    });
  },
  list: (state, getters) => {
    return state.allIds.map(id => {
      return getters.find(id);
    });
  },
};

const actions = {
  async create({ commit }, image) {
    try {
      let response = await api.images.create(image);
      commit('add', response.image);

      if (image.projectId) {
        const payload = {
          imageId: response.image.id,
          projectId: image.projectId,
        };
        commit('projects/linkImageToProject', payload, { root: true });
      }

      return {
        message: `${image.name} was created.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${image.name} couldn't be created.`,
        success: false,
      };
    }
  },
  async delete({ commit }, image) {
    try {
      await api.images.delete(image.id);
      commit('remove', image);

      if (image.projectId) {
        const payload = {
          imageId: image.id,
          projectId: image.projectId,
        };
        commit('projects/unlinkImageFromProject', payload, { root: true });
      }

      return {
        message: `${image.name} was deleted.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${image.name} couldn't be deleted.`,
        success: false,
      };
    }
  },
  async link({ commit }, {image, project}) {
    if (project) {
      const response = await api.images.link({imageId: image.id, projectId: project.id});
      const {imageId, projectId} = response.ids;

      commit('projects/linkImageToProject', {
        imageId,
        projectId,
      }, { root: true });

      return {
        message: `${image.name} was added to ${project.name}.`,
        success: true,
      };
    } else {
      return {
        message: `${image.name} could not be added to ${project.name}.`,
        success: false,
      };
    }
  },
  async unlink({ commit }, {image, project}) {
    if (project) {
      const response = await api.images.unlink({imageId: image.id, projectId: project.id});
      const {imageId, projectId} = response.ids;

      commit('projects/unlinkImageFromProject', {
        imageId,
        projectId,
      }, { root: true });

      return {
        message: `${image.name} was removed from ${project.name}.`,
        success: true,
      };
    } else {
      return {
        message: `${image.name} could not be remove from ${project.name}.`,
        success: false,
      };
    }
  },
  async load({ commit, state }) {
    try {
      let images = await api.images.list({exclude: state.allIds});
      images.forEach(element => {
        commit('add', element);
      });
    } catch (error) {
      return {
        error,
        message: 'Could not load images.',
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
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
