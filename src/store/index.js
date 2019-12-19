import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import images from "@/store/modules/images";
import projects from "@/store/modules/projects";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    images,
    projects
  },
  strict: debug
});
