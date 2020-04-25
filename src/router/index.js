import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthenticatedApp from '@/views/AuthenticatedApp.vue';
import Home from '@/views/Home.vue';
import store from '@/store';

const Image = () => import('@/views/images/Image.vue');
const Images = () => import('@/views/images');
const ImagesList = () => import('@/views/images/ImagesList.vue');
const Links = () => import('@/views/links');
const LinksList = () => import('@/views/links/LinksList.vue');
const Login = () => import('@/views/Login.vue');
const NotFound = () => import('@/views/NotFound.vue');
const Project = () => import('@/views/projects/Project.vue');
const ProjectImage = () => import('@/views/projects/ProjectImage.vue');
const Projects = () => import('@/views/projects');

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
            component: ImagesList,
            name: 'images-list',
            path: '/',
          },
          {
            component: Image,
            name: 'image',
            path: ':id',
          },
        ],
        component: Images,
        path: 'images',
      },
      {
        children: [
          {
            component: LinksList,
            name: 'links-list',
            path: '/',
          },
        ],
        component: Links,
        path: 'links',
      },
      {
        children: [
          {
            component: NotFound,
            path: '/',
          },
          {
            component: ProjectImage,
            name: 'project-image',
            path: ':id/image/:imageId',
          },
          {
            component: Project,
            name: 'project',
            path: ':id',
          },
        ],
        component: Projects,
        path: 'projects',
      },
      {
        component: NotFound,
        path: '*',
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
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
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
