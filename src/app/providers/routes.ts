import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root-layout',
      component: () => import('@/app/layouts/GuestLayout.vue'),
      children: [
        {
          path: '',
          name: 'root-page',
          component: () => import('@/pages/root-page'),
        },
        {
          path: '/course/:id',
          name: 'course-self-page',
          component: () => import('@/pages/course'),
          props: true,
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: () => import('@/app/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login-page',
          component: () => import('@/pages/login'),
        },
        {
          path: 'register',
          name: 'register-page',
          component: () => import('@/pages/register'),
        },
      ],
    },
  ],
});

export default router;
