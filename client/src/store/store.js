import Vue from 'vue'
import Vuex from 'vuex'
import TaskService from '@/services/TaskService'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    tasks: [],
    token: null,
    user: null,
    isUserLoggedIn: false,
    infoPages: {}
  },
  getters: {
    getTasks: state => {
      return state.tasks
    },
    getInfoPages: state => {
      return state.infoPages
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
    getIsUserLoggedIn: state => {
      return state.isUserLoggedIn
    }
  },
  mutations: {
    setTasks(state, task){
      state.tasks = task;
    },
    setInfoPages(state, infoPages){
      state.infoPages = infoPages;
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
    async getPageTaskBack ({ commit }, request) {
      if(request){
        const response = await TaskService.getPage(request)
        const responseData = response.data;
        const { docs, ...infoPages } = responseData;
        commit('setTasks', docs)
        commit('setInfoPages', infoPages)
        return new Promise(resolve => {
            resolve(responseData.limit);
        });
      }
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