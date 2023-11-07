import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/About.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/about', component: About
    },
  ]
});

export default router;