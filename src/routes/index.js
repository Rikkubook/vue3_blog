import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/hello',
    name: 'Helloworld',
    component: () => import('../views/Login.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
