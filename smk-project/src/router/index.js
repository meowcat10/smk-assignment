import { createRouter, createWebHistory } from 'vue-router'

import Frontpage from '@/components/Frontpage.vue'
import Navigation from '@/components/Navigation.vue'
import Udstillinger from '@/components/Udstillinger.vue'
import Kunstvaerk from '@/components/Kunstvaerk.vue'
import KunstvaerkerAdmin from '@/components/KunstvaerkerAdmin.vue'

const routes = [
    { path: '/', component: Frontpage },
    { path: '/navigation', component:  Navigation}, 
    { path: '/listeafvaerker', component: Udstillinger},
    { path: '/kunstvaerk', component: Kunstvaerk},
    { path: '/kunstvaerk/:id', component: Kunstvaerk},
    { path: '/kunstvaerker', component: KunstvaerkerAdmin},
]



export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router