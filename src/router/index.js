/* eslint-disable prettier/prettier */
import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [{
        path: '/',
        redirect: '/login',
        name: 'Pages',
        component: {
            render() {
                return h(resolveComponent('router-view'))
            },
        },
        children: [{
                path: 'login',
                name: 'Login',
                component: () =>
                    import ('@/views/pages/Login'),
            },
            {
                path: '404',
                name: 'Page404',
                component: () =>
                    import ('@/views/pages/Page404'),
            },
            {
                path: '500',
                name: 'Page500',
                component: () =>
                    import ('@/views/pages/Page500'),
            },

            {
                path: 'register',
                name: 'Register',
                component: () =>
                    import ('@/views/pages/Register'),
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Home',
        component: DefaultLayout,
        redirect: '/dashboard',
        children: [{
                path: '/dashboard',
                name: 'Dashboard',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
            },
            {
                path: '/bidang',
                name: 'Bidang',
                component: () =>
                    import ('@/views/bidang/Bidang.vue'),
            },
            {
                path: '/add-bidang',
                name: 'Add Bidang',
                component: () =>
                    import ('@/views/bidang/Add-Bidang.vue'),
            },
            {
                path: '/kegiatan',
                name: 'Kegiatan',
                component: () =>
                    import ('@/views/kegiatan/Kegiatan.vue'),
            },
            {
                path: '/add-kegiatan',
                name: 'Add Kegiatan',
                component: () =>
                    import ('@/views/kegiatan/Add-Kegiatan.vue'),
            },
            {
                path: '/anggaran',
                name: 'Anggaran',
                component: () =>
                    import ('@/views/anggaran/Anggaran.vue'),
            },
            {
                path: '/add-anggaran',
                name: 'Add Anggaran',
                component: () =>
                    import ('@/views/anggaran/Add-Anggaran.vue'),
            }
        ],
    },

]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
