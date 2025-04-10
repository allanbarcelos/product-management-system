import { createRouter, createWebHistory } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: AuthLayout,
      redirect: {name: 'Login'},
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('./../views/auth/Login.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('./../views/auth/Register.vue')
        }
      ]
    },
    {
      path: '/',
      component: PrivateLayout,
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('./../views/home/Home.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('./../views/products/List.vue')
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('./../views/orders/List.vue')
        },
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next({name: 'Auth'});
  }else {
  next();}
})

export default router
