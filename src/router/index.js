import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
let routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order.vue')
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: () => import('@/views/wallet.vue')
    },
    {
        path: '/swap',
        name: 'swap',
        component: () => import('@/views/swap.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'notfound', redirect: '/promotion' }
]
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    next()
})
export default router
