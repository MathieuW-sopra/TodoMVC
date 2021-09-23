<template>
  <div>
    <h1>
      todos
    </h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form @submit="addFormBack">
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
                  <input type="checkbox" v-model="row.item.completed" v-on:change="replaceTaskBack(row.item)" />
              </b-form-group>
            </template>
            <template v-slot:cell(remove)="row">
              <b-button variant="danger" v-on:click="removeTaskBack(row.item._id)">Remove</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import { store } from '@/store/index.js'
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'


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
      'getTasks', 'completedTasks', 'uncompletedTasks', 'completedTasksCount', 'replaceTasks',
       'removeTasks'
    ]),

  mounted () {
    this.getTaskBack()
  },
  methods: {
    ...mapActions([
      'getTaskBack', 'addTaskBack', 'replaceTaskBack', 'removeTaskBack'
    ]),

    addFormBack () {
      if (this.form.title) {
        let formCopy = JSON.parse(JSON.stringify(this.form))//deep copy
        this.form.title='';
        this.form.completed=false;
        this.addTaskBack(formCopy);
      }
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
