import Vue from 'vue'
import Vuex from 'vuex'
import TaskService from '@/services/TaskService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: []
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
    }
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
    }
  },
  actions: {
    async getTaskBack ({ commit }) {
      const response = await TaskService.get()
      commit('setTasks', response.data)
    },
    async addTaskBack ({ commit }, task) {
      const response = await TaskService.add({
        title: task.title,
        completed: task.completed
      })
      if(response.data.acknowledged){
        task._id = response.data.insertedId;
        commit('addTasks', task)
      }
    },
    async replaceTaskBack ({ commit }, task) {
      const response = await TaskService.replace(task);
      commit('replaceTasks', response)
    },
    async removeTaskBack ({ commit }, id) {
      const response = await TaskService.remove(id)
      if (response.data) {
        commit('removeTasks', id)
      }
    },
  },
  modules: {
  }
})