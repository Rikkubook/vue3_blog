import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import AdminHome from '@/views/Admin/AdminHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/',
        name: 'Admin-Home',
        component: AdminHome
      }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
