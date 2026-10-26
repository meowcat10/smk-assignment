import { createRouter, createWebHistory } from 'vue-router'

import Frontpage from '@/components/Frontpage.vue'
import Navigation from '@/components/Navigation.vue'
import Udstillinger from '@/components/Udstillinger.vue'
import Kunstvaerk from '@/components/Kunstvaerk.vue'

const routes = [
    { path: '/', component: Frontpage },
    { path: '/navigation', component:  Navigation}, 
    { path: '/listeafvaerker', component: Udstillinger},
    { path: '/kunstvaerk', component: Kunstvaerk},
]



export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router