import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/hello',
    name: 'Helloworld',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/article:id',
    name: 'Article',
    component: () => import('@/views/Article.vue'),
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
        component: () => import('@/views/Admin/Add.vue'),
      },
      {
        path: 'add',
        name: 'Admin-Add',
        component: () => import('@/views/Admin/Add.vue'),
      }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});