import imagesService from '@/services/images';

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
      let response = await imagesService.create(image);
      commit('setImage', response.image);

      if (image.projectId) {
        commit('setImageProject', {
          imageId: response.image.id,
          projectId: image.projectId,
        });
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
      let response = await imagesService.delete(image.id);
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
      let images = await imagesService.getAllImages();
      commit('setImages', images);
    } catch (error) {
      commit('setImages', null);
    }
  },
  async getImage({ commit }, id) {
    try {
      let image = await imagesService.getImage(id);
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
  setImage(state, payload, rootState) {
    if (state.images) {
      state.images.push(payload);
    } else {
      state.images = [payload];
    }
  },
  setImageProject(state, { imageId, projectId },) {
    const project = state.projects.filter(project => {
      return project.id === projectId;
    });
    project.imageIds.push(imageId);
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
