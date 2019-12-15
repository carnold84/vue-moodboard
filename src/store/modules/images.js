import _unionBy from "lodash/unionBy";

import imagesService from "@/services/images";

const state = {
  images: undefined,
  imagesProjects: {}
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
  imagesByProject: state => id => {
    return state.imagesProjects[id];
  }
};

const actions = {
  async create({ commit }, image) {
    try {
      let response = await imagesService.create(image);
      commit("setImages", response.image);
      return {
        message: `${image.name} was created.`,
        success: true
      };
    } catch (error) {
      return {
        error,
        message: `${image.name} couldn't be created.`,
        success: false
      };
    }
  },
  async delete({ commit }, image) {
    try {
      let response = await imagesService.delete(image.id);
      commit("deleteImage", response.id);
      return {
        message: `${image.name} was deleted.`,
        success: true
      };
    } catch (error) {
      return {
        error,
        message: `${image.name} couldn't be deleted.`,
        success: false
      };
    }
  },
  async getAllImages({ commit }) {
    try {
      let images = await imagesService.getAllImages();
      commit("setImages", images);
    } catch (error) {
      commit("setImages", null);
    }
  },
  async getImagesByProject({ commit }, projectId) {
    try {
      let images = await imagesService.getImagesByProject(projectId);
      commit("setImagesByProject", { images, projectId });
    } catch (error) {
      console.error(error);
    }
  },
  async getProject({ commit }, id) {
    try {
      let image = await imagesService.getImage(id);
      commit("setImage", image);
    } catch (error) {
      commit("setImage", null);
    }
  }
};

const mutations = {
  deleteImage(state, payload) {
    state.images = state.images.filter(image => {
      return image.id.toString() === payload;
    });
  },
  setImage(state, payload) {
    if (state.images && state.images.length > 0) {
      state.images.push(payload);
    } else {
      state.images = [payload];
    }
  },
  setImages(state, payload) {
    state.images = payload;
  },
  setImagesByProject(state, { images, projectId }) {
    console.log(state, images, projectId);
    state.imagesProjects = {
      ...state.imagesProjects,
      [projectId]: images
    };
    const allImages = _unionBy(state.images, images, "id");
    state.images = allImages;
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
};
