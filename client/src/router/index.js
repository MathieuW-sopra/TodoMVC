import Vue from 'vue'
import Router from 'vue-router'
import AddTask from '@/components/AddTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/addTask',
      component: AddTask
    }
  ]
})
