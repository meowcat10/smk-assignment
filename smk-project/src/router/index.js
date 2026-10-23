import { createRouter, createWebHistory } from 'vue-router'

import Banner from '@/components/Banner.vue'

const routes = [
  { path: '/', component:  Banner}
//   { path: '/about', component:  },
]



export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router