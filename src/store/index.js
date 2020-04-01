import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import images from '@/store/modules/images';
import links from '@/store/modules/links';
import projects from '@/store/modules/projects';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const actions = {
  async init() {
    await this.dispatch('auth/getUser');
    //await this.dispatch('projects/load');
    await this.dispatch('images/getAllImages');
    await this.dispatch('links/getAllLinks');
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    auth,
    images,
    links,
    projects,
  },
  strict: debug,
});
