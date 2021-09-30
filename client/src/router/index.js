import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Tasks from '@/components/Tasks'


Vue.use(VueRouter)

const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
