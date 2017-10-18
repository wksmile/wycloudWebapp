import Vue from 'vue'
import Router from 'vue-router'
import APP from '../App'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }
  ]
})

