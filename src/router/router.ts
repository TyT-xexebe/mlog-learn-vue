import { createRouter, createWebHashHistory } from 'vue-router'
import About from '@/views/About.vue';
import Basic from '@/views/Basic.vue';
import Debugger from '@/views/Debugger.vue';

const routes = [
  {
    path: '/about', name: 'About', component: About
  },
  {
    path: '/basic', name: 'Basic', component: Basic
  },
  {
    path: '/debugger', name: 'Debugger', component: Debugger
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router;