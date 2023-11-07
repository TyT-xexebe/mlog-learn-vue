import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/About.vue';


const router = createRouter({
  history: createWebHistory('/mlog-learn-vue/'),
  routes: [
    {
      path: '/about', component: About
    }
  ]
});

export default router;