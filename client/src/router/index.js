import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vuex from '../views/Vuex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Vuex',
    name: 'Vuex',
    component: Vuex
  }
]

const router = new VueRouter({
  routes
})

export default router
