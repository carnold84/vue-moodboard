import api from '@/api';

const state = {
  images: undefined,
};

const getters = {
  image: state => id => {
    if (!state.images) {
      return undefined;
    }

    return state.images.filter(image => {
      return image.id.toString() === id.toString();
    })[0];
  },
  images: state => {
    return state.images;
  },
  imagesById: state => ids => {
    if (!ids) {
      return [];
    }

    if (state.images) {
      return state.images.filter(image => {
        return ids.includes(image.id);
      });
    }
    return state.images;
  },
};

const actions = {
  async create({ commit }, image) {
    try {
      let response = await api.images.create(image);
      commit('setImage', response.image);

      if (image.projectId) {
        commit('projects/linkImageToProject', {
          imageId: response.image.id,
          projectId: image.projectId,
        }, { root: true });
      }

      return {
        message: `${image.name} was created.`,
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        message: `${image.name} couldn't be created.`,
        success: false,
      };
    }
  },
  async delete({ commit }, image) {
    try {
      let response = await api.images.delete(image.id);
      commit('deleteImage', response.imageId);
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
  async getAllImages({ commit }) {
    try {
      let images = await api.images.getAllImages();
      commit('setImages', images);
    } catch (error) {
      commit('setImages', null);
    }
  },
  async getImage({ commit }, id) {
    try {
      let image = await api.images.getImage(id);
      commit('setImage', image);
    } catch (error) {
      commit('setImage', null);
    }
  },
};

const mutations = {
  deleteImage(state, payload) {
    state.images = state.images.filter(image => {
      return image.id.toString() !== payload;
    });
  },
  setImage(state, payload) {
    if (state.images) {
      state.images.push(payload);
    } else {
      state.images = [payload];
    }
  },
  setImages(state, payload) {
    state.images = payload;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
