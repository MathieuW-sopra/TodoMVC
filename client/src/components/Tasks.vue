<template>
  <div>
    <h1>
      todos
    </h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form v-if="$store.state.isUserLoggedIn" @submit="addFormBack">
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
                placeholder="What needs to be done?"
                required
                v-on:keyup.enter="submit"
              ></b-form-input>
              <br>
            </b-form-group>
          </b-form>

          <b-table :items="getTasks" :fields="fields" striped responsive="sm">
            <template v-slot:cell(completed)="row">
              <b-form-group>
                  <input :disabled="!$store.state.isUserLoggedIn" type="checkbox" v-model="row.item.completed" v-on:change="replaceTaskBack(row.item)" />
              </b-form-group>
            </template>
            <template v-slot:cell(remove)="row">
              <b-button :disabled="!$store.state.isUserLoggedIn" variant="danger" v-on:click="removeTaskBack(row.item._id)">Remove</b-button>
            </template>
          </b-table>
          <b-col sm="1">
            <span>Page </span>
            <b-form-input id="input-page"
             v-model="pageNumber" 
             :state="pageState" 
             v-on:keyup.enter="getPage()" 
             placeholder="Page n°">
            </b-form-input>
            <b-form-invalid-feedback id="input-page-feedback">
              Enter a correct number
            </b-form-invalid-feedback>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import { store } from '@/store/store.js'
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'


export default {
  name: 'addTask',
  store: store,
  data() {
    return{
      fields: ['title', 'completed', 'remove'],
      form: {
        title: '',
        completed: false
      },
      pageNumber:1,
    }
  },
  computed:{
    ...mapGetters([
      'getTasks', 'completedTasks', 'uncompletedTasks', 'completedTasksCount', 'replaceTasks',
       'removeTasks'
    ]),
    pageState() {
      return this.pageNumber > 0 ? true : false
    },
  },

  mounted () {
    this.getPageTaskBack(this.pageNumber)
  },

  methods: {
    ...mapActions([
      'getTaskBack', 'addTaskBack', 'replaceTaskBack', 'removeTaskBack', 'getPageTaskBack'
    ]),

    addFormBack () {
      if (this.form.title) {
        let formCopy = JSON.parse(JSON.stringify(this.form))//deep copy
        this.form.title='';
        this.form.completed=false;
        this.addTaskBack(formCopy);
      }
    },

    getPage(){
      if(this.pageState){
        this.getPageTaskBack(this.pageNumber)
      }
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
