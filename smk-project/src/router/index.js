import { createRouter, createWebHistory } from 'vue-router'

import Banner from '@/components/Banner.vue'
import Udstillinger from '@/views/Udstillinger.vue'

const routes = [
    { path: '/', component: Banner},
    { path: '/udstillinger', component: Udstillinger},
//   { path: '/about', component:  },
]



export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router