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
    if (ids) {
      return ids.map(id => {
        return getters.find(id);
      });
    }
    return getters.list;
  },
  list: (state, getters) => {
    return state.allIds.map(id => {
      return getters.find(id);
    });
  },
};

const actions = {
  async create({ commit }, link) {
    try {
      let response = await api.links.create(link);
      commit('add', response.link);

      if (link.projectId) {
        const payload = {
          linkId: response.link.id,
          projectId: link.projectId,
        };
        commit('projects/linkLinkToProject', payload, { root: true });
      }

      return {
        message: `${link.name} was created.`,
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        message: `${link.name} couldn't be created.`,
        success: false,
      };
    }
  },
  async delete({ commit }, link) {
    try {
      let response = await api.links.delete(link.id);
      commit('remove', link);

      if (link.projectId) {
        const payload = {
          linkId: link.id,
          projectId: link.projectId,
        };
        commit('projects/unlinkLinkFromProject', payload, { root: true });
      }

      return {
        message: `${link.name} was deleted.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${link.name} couldn't be deleted.`,
        success: false,
      };
    }
  },
  async link({ commit }, {link, project}) {
    if (project) {
      const response = await api.links.link({linkId: link.id, projectId: project.id});
      const {linkId, projectId} = response.ids;

      commit('projects/linkLinkToProject', {
        linkId,
        projectId,
      }, { root: true });

      return {
        message: `${link.name} was added to ${project.name}.`,
        success: true,
      };
    } else {
      return {
        message: `${link.name} could not be added to ${project.name}.`,
        success: false,
      };
    }
  },
  async unlink({ commit }, {link, project}) {
    if (project) {
      const response = await api.links.unlink({linkId: link.id, projectId: project.id});
      const {linkId, projectId} = response.ids;

      commit('projects/unlinkLinkFromProject', {
        linkId,
        projectId,
      }, { root: true });

      return {
        message: `${link.name} was removed from ${project.name}.`,
        success: true,
      };
    } else {
      return {
        message: `${link.name} could not be remove from ${project.name}.`,
        success: false,
      };
    }
  },
  async load({ commit, state }, ids) {
    try {
      let exclude;

      if (ids) {
        ids = ids.filter(element => {
          return !state.allIds.includes(element);
        });
      } else {
        exclude = state.allIds;
      }

      if (!ids || ids.length > 0) {
        let links = await api.links.list({exclude, ids});
        
        links.forEach(element => {
          commit('add', element);
        });
      }
    } catch (error) {
      return {
        error,
        message: 'Could not load links.',
        success: false,
      };
    }
  },
  async update({ commit }, link) {
    try {
      let response = await api.links.update(link);
      commit('add', response.link);

      return {
        message: `${link.name} was updated.`,
        success: true,
      };
    } catch (error) {
      return {
        error,
        message: `${link.name} couldn't be updated.`,
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
