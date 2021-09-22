<template>
  <div>
    <h1>
      todos
      
    </h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form @submit="onSubmit">
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
                placeholder="What needs to be done?"
                required
                v-on:keyup.enter="submit"
              ></b-form-input>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form-group>
          </b-form>

          <b-table :items="getTasks" :fields="fields" striped responsive="sm">
            <template v-slot:cell(completed)="row">
              <b-form-group>
                  <input type="checkbox" v-model="row.item.completed" v-on:change="replaceTaskBack(row)" />
              </b-form-group>
            </template>
            <template v-slot:cell(remove)="row">
              <b-button variant="danger" v-on:click="removeTaskBack(row)">Remove</b-button>
            </template>
          </b-table>
          <br>
          <br>
          <b-button variant="danger" v-on:click="increment()">Increment</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import TaskService from '@/services/TaskService'
import { store } from '@/store/index.js'
import { mapGetters } from 'vuex';

export default {
  name: 'addTask',
  store: store,
  data() {
    return{
      fields: ['completed','title', 'remove'],
      form: {
        title: '',
        completed: false
      }
    }
  },
  computed: mapGetters([
      'getTasks', 'completedTasks', 'uncompletedTasks', 'completedTasksCount', 'replaceTasksByIndex',
       'removeTasksByIndex'
    ]),

  mounted () {
    this.getTaskBack()
  },
  methods: {
    onSubmit(event) {
      this.addFormBack ()
    },
    async getTaskBack () {
      const response = await TaskService.get()
      store.commit('setTasks', response.data)
    },
    async addFormBack () {
      if (this.form.title) {
        let formCopy = JSON.parse(JSON.stringify(this.form))//deep copy
        this.form.title='';
        this.form.completed=false;
        const response = await TaskService.add({
          title: formCopy.title,
          completed: formCopy.completed
        })
        if(response.data.acknowledged){
          formCopy._id = response.data.insertedId;
          store.commit('addTasks', formCopy)
        }
      }
    },
    async replaceTaskBack (row) {
      const response = await TaskService.replace(row.item);
      store.commit('replaceTasksByIndex', response, row.index)
    },
    async removeTaskBack (row) {
      const response = await TaskService.remove(row.item._id)
      if (response.data) {
        store.commit('removeTasksByIndex', row.index)
      }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
