import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'loginPage',
      component: () => import('./views/login')
    },
    {
      path: '/entrances',
      name: 'entrancesPage',
      component: () => import('./views/entrances')
    },
    {
      path: '/main',
      name: 'mainPage',
      meta: {
        requireAuth: true
      },
      component: () => import('./views/home.vue'),
      children: [
        {
          path: '/imgshow',
          name: 'imgshow',
          meta: {
            requireAuth: true
          },
          component: () => import('./views/pages/imgshow.vue')
        }
      ]
    }
  ]
})
