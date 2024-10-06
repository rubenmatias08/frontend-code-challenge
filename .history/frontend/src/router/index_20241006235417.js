import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Database from '../views/Database.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/database',
      name: 'Database',
      component: Database
    }
  ]
})
