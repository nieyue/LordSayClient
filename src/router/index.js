import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/main/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: "/index"
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
