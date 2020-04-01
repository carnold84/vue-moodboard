import api from '@/api';

const state = {
  links: undefined,
};

const getters = {
  link: state => id => {
    if (!state.links) {
      return undefined;
    }

    return state.links.filter(link => {
      return link.id.toString() === id.toString();
    })[0];
  },
  links: state => {
    return state.links;
  },
  linksById: state => ids => {
    if (!ids) {
      return [];
    }

    if (state.links) {
      return state.links.filter(link => {
        return ids.includes(link.id);
      });
    }
    return state.links;
  },
};

const actions = {
  async create({ commit }, link) {
    try {
      let response = await api.links.create(link);
      commit('setLink', response.link);

      if (link.projectId) {
        commit('projects/linkLinkToProject', {
          linkId: response.link.id,
          projectId: link.projectId,
        }, { root: true });
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

      if (link.projectId) {
        commit('projects/unlinkLinkFromProject', {
          linkId: response.link.id,
          projectId: link.projectId,
        }, { root: true });
      }

      commit('deleteLink', response.linkId);
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
  async getAllLinks({ commit }) {
    try {
      let links = await api.links.getAllLinks();
      commit('setLinks', links);
    } catch (error) {
      commit('setLinks', null);
    }
  },
  async getLink({ commit }, id) {
    try {
      let link = await api.links.getLink(id);
      commit('setLink', link);
    } catch (error) {
      commit('setLink', null);
    }
  },
  async remove({ commit }, {link, project}) {
    if (project) {
      commit('projects/unlinkLinkToProject', {
        linkId: link.id,
        projectId: project.id,
      }, { root: true });

      return {
        message: `${link.name} was removed from ${project.name}.`,
        success: true,
      };
    } else {
      return {
        message: `${link.name} was not found in ${project.name}.`,
        success: false,
      };
    }
  },
};

const mutations = {
  deleteLink(state, payload) {
    state.links = state.links.filter(link => {
      return link.id.toString() !== payload;
    });
  },
  setLink(state, payload) {
    if (state.links) {
      state.links.push(payload);
    } else {
      state.links = [payload];
    }
  },
  setLinks(state, payload) {
    state.links = payload;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
