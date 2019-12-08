import Vue from "vue";
import VueRouter from "vue-router";
import AuthenticatedApp from "../views/AuthenticatedApp.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ProjectEdit from "../views/ProjectEdit.vue";
import Projects from "../views/Projects.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    component: Login,
    meta: {
      requiresAuth: false
    },
    name: "login",
    path: "/login"
  },
  {
    children: [
      {
        component: Home,
        name: "home",
        path: "/"
      },
      {
        children: [
          {
            component: ProjectEdit,
            name: "create-project",
            path: "create"
          }
        ],
        component: Projects,
        name: "projects",
        path: "projects"
      }
    ],
    component: AuthenticatedApp,
    meta: {
      requiresAuth: true
    },
    path: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    // logged in so redirect to authed app
    if (to.path === "/login" && store.getters.isLoggedIn) {
      next("/");
      return;
    } else {
      next();
    }
    next();
  }
});

export default router;
