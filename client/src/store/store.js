import Vue from 'vue'
import Vuex from 'vuex'
import TaskService from '@/services/TaskService'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    tasks: [],
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    getTasks: state => {
      return state.tasks
    },
    completedTasks: state => {
        return state.tasks.filter(Task => Task.completed);
    },
    uncompletedTasks: state => {
      return state.tasks.filter(Task => !Task.completed);
    },
    completedTasksCount: (state, getters) => {
      return getters.completedTasks.length
    },
  },
  mutations: {
    setTasks(state, task){
      state.tasks = task;
    },
    addTasks(state, task){
      state.tasks.push(task);
    },
    replaceTasks(state, task){
      let index = state.tasks.findIndex(item => item._id == task._id);
      task[index] = task;
    },
    removeTasks(state, id){
      state.tasks = state.tasks.filter(item => item._id !== id);
    },
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    // async getTaskBack ({ commit }) {
    //   const response = await TaskService.get()
    //   commit('setTasks', response.data)
    // },
    async getPageTaskBack ({ commit }, page) {
      const response = await TaskService.getPage(page)
      commit('setTasks', response.data)
    },
    async addTaskBack ({ commit }, task) {
      const response = await TaskService.add({
        title: task.title,
        completed: task.completed,
      })
      if(response.data){
        commit('addTasks', response.data)
      }
    },
    async replaceTaskBack ({ commit }, task) {
      const response = await TaskService.replace(task);
      if(response.data){
        commit('replaceTasks', response.data)
      }
    },
    async removeTaskBack ({ commit }, id) {
      const response = await TaskService.remove(id)
      if (response.data) {
        commit('removeTasks', id)
      }
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})