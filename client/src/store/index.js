import Vue from 'vue'
import Vuex from 'vuex'

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
    setTasks(state,data){
      state.tasks = data;
    },
    addTasks(state,data){
      state.tasks.push(data);
    },
    replaceTasksByIndex(state,data,index){
      state.tasks[index] = data;
    },
    removeTasksByIndex(state,index){
      state.tasks.splice(index,1);
    }
  },
  actions: {
  },
  modules: {
  }
})