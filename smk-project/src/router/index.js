import { createRouter, createWebHistory } from 'vue-router'

import Frontpage from '@/components/Frontpage.vue'

const routes = [
    { path: '/', component: Frontpage}
//   { path: '/about', component:  },
]



export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router