import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import images from '@/store/modules/images';
import links from '@/store/modules/links';
import modals from '@/store/modules/modals';
import projects from '@/store/modules/projects';
import toasts from '@/store/modules/toasts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const actions = {
  async init() {
    await this.dispatch('auth/getUser');
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    auth,
    images,
    links,
    modals,
    projects,
    toasts,
  },
  strict: debug,
});
