import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import images from '@/store/modules/images';
import projects from '@/store/modules/projects';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const actions = {
  async init() {
    await this.dispatch('auth/getUser');
    await this.dispatch('projects/getAllProjects');
    await this.dispatch('images/getAllImages');
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    auth,
    images,
    projects,
  },
  strict: debug,
});
