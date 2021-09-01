import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/article:id',
    name: 'Article',
    component: () => import('@/views/Article.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Admin-Home',
        component: () => import('@/views/Admin/AdminHome.vue'),
      },
      {
        path: 'edit/:id',
        name: 'Admin-Edit',
        component: () => import('@/views/Admin/add.vue'),
      },
      {
        path: 'add',
        name: 'Admin-Add',
        component: () => import('@/views/Admin/add.vue'),
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound404',
    component: () => import('@/views/NotFound404.vue'),
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});