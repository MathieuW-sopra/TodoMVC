<template>
 <div>
   <h1>
     todos
   </h1>
   <input v-model="title" type="text" name="title" placeholder="What needs to be done?">
   <button @click="addTask">add task</button>
 </div>
</template>

<script>
import TaskService from '@/services/TaskService'
export default {
  name: 'AddTask',
  data () {
    return {
      title: '',
      completed: false
    }
  },
  methods: {
    async addTask (value) {
      const response = await TaskService.addTask({
        title: this.title,
        completed: this.completed
      })
      console.log(response.data)
    }
  }
  // watch: {
  //   title (value) {
  //     console.log('email has changed', value)
  //   },
  //   completed (value) {
  //     console.log('completed has changed', value)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
