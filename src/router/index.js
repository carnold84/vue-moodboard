import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthenticatedApp from '@/views/AuthenticatedApp.vue';
import Home from '@/views/Home.vue';
import store from '@/store';

const Login = () => import('@/views/Login.vue');
const ProjectEdit = () => import('@/views/projects/ProjectEdit.vue');
const Project = () => import('@/views/projects/Project.vue');
const ProjectAddImage = () => import('@/views/projects/ProjectAddImage.vue');
const ProjectImage = () => import('@/views/projects/ProjectImage.vue');
const Projects = () => import('@/views/projects/Projects.vue');
const ProjectsList = () => import('@/views/projects/ProjectsList.vue');

Vue.use(VueRouter);

const routes = [
  {
    component: Login,
    meta: {
      requiresAuth: false,
    },
    name: 'login',
    path: '/login',
  },
  {
    children: [
      {
        component: Home,
        name: 'home',
        path: '/',
      },
      {
        children: [
          {
            component: ProjectsList,
            name: 'projects-list',
            path: '/',
          },
          {
            component: ProjectEdit,
            name: 'project-create',
            path: 'create',
          },
          {
            component: Project,
            name: 'project',
            path: ':id',
          },
          {
            component: ProjectImage,
            name: 'project-image',
            path: ':id/image/:imageId',
          },
          {
            component: ProjectAddImage,
            name: 'project-add-image',
            path: ':id/add-image',
          },
        ],
        component: Projects,
        path: 'projects',
      },
    ],
    component: AuthenticatedApp,
    meta: {
      requiresAuth: true,
    },
    path: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    // logged in so redirect to authed app
    if (to.path === '/login' && isLoggedIn) {
      next('/');
      return;
    } else {
      next();
    }
    next();
  }
});

export default router;
