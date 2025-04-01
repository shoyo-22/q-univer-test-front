import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root-layout',
      component: () => import('@/layouts/GuestLayout.vue'),
      children: [
        {
          path: '',
          name: 'root-page',
          component: () => import('@/pages/RootPage.vue'),
        },
      ],
    },
  ],
});

export default router;
