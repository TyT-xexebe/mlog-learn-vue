import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/About.vue';
import Main from './../../App.vue';

const router = createRouter({
  history: createWebHistory('/mlog-learn-vue/'),
  routes: [
    {
      path: '/about', component: About
    },
    {
      path: '/', component: Main
    }
  ]
});

export default router;