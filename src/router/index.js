/* eslint-disable prettier/prettier */
import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { authenticationService } from '../service/authentication.service'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    mode: 'history',
    path: '/',
    redirect: '/login',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },

      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    mode: 'history',
    path: '/dashboard',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        mode: 'history',
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        mode: 'history',
        path: '/bidang',
        name: 'Bidang',
        component: () => import('@/views/bidang/Bidang.vue'),
      },
      {
        path: '/add-bidang',
        name: 'Add Bidang',
        component: () => import('@/views/bidang/Add-Bidang.vue'),
      },
      {
        path: '/kegiatan',
        name: 'Kegiatan',
        component: () => import('@/views/kegiatan/Kegiatan.vue'),
      },
      {
        path: '/add-kegiatan',
        name: 'Add Kegiatan',
        component: () => import('@/views/kegiatan/Add-Kegiatan.vue'),
      },
      {
        path: '/anggaran',
        name: 'Anggaran',
        component: () => import('@/views/anggaran/Anggaran.vue'),
      },
      {
        path: '/add-anggaran',
        name: 'Add Anggaran',
        component: () => import('@/views/anggaran/Add-Anggaran.vue'),
      },
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta
  // const currentUser = authenticationService.currentUserValue;
  const currentUser = authenticationService.currentUserValue

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } })
    }
    // // check if route is restricted by role
    // if (authorize.length && !authorize.includes(currentUser.role)) {
    //     // role not authorised so redirect to home page
    //     return next({ path: '/' });
    // }
  }

  next()
})

export default router
