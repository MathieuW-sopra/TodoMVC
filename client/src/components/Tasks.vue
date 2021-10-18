<template>
  <div>
    <h1>
      todos
    </h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form v-if="$store.state.isUserLoggedIn">
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
                placeholder="What needs to be done?"
                required
                v-on:keyup.enter="addFormBack"
              ></b-form-input>
              <br>
            </b-form-group>
          </b-form>
          <b-row>
            <b-col sm="5">
              <b-form-group>
                <b-form-checkbox v-model="showCompleted" value=true unchecked-value=false >
                  Completed
                </b-form-checkbox>
                <b-form-checkbox v-model="showUncompleted" value=true unchecked-value=false >
                  Uncompleted
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              number of element per page:
            </b-col>
            <b-col sm="3">
              <b-form-input id="validationPage" class="form-control" v-model="elemLimit"></b-form-input>
              <label class="form-label"></label>
              <div class="invalid-feedback">Please choose a correct number</div>
            </b-col>
          </b-row>
          <br>
          <b-table :items="getTasks" :fields="fields" striped responsive="sm">
            <template v-slot:cell(completed)="row">
              <b-form-group>
                <input :disabled="!getIsUserLoggedIn" type="checkbox" v-model="row.item.completed" v-on:change="replaceTaskBack(row.item)" />
              </b-form-group>
            </template>
            <template v-slot:cell(remove)="row">
              <b-button :disabled="!getIsUserLoggedIn" variant="danger" v-on:click="removeTaskBack(row.item._id)">Remove</b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="getInfoPages.totalDocs"
            :per-page="getInfoPages.limit"
            aria-controls="my-table"
          ></b-pagination>
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
      currentPage:1,
      showCompleted:true,
      showUncompleted:true,
      elemLimit:5,
    }
  },
  computed:{
    ...mapGetters([
      'getTasks','getIsUserLoggedIn','getInfoPages', 'completedTasks', 'uncompletedTasks', 'completedTasksCount', 'replaceTasks',
       'removeTasks'
    ]),

  },

  watch: {
    currentPage: function(){
      this.getRequest()
    },
    showCompleted: function(){
      this.getRequest()
    },
    showUncompleted: function(){
      this.getRequest()
    },
    elemLimit: function(){
      this.getRequest()
    }

  },

  mounted () {
    this.getRequest()
  },

  methods: {
    ...mapActions([
      'getTaskBack', 'addTaskBack', 'replaceTaskBack', 'removeTaskBack', 'getPageTaskBack'
    ]),

    addFormBack() {
      if (this.form.title) {
        let formCopy = JSON.parse(JSON.stringify(this.form))//deep copy
        this.form.title='';
        this.form.completed=false;
        this.addTaskBack(formCopy);
      }
    },

    getRequest() {
      const params = {page: this.currentPage, limit: undefined, completed: undefined}
      params.limit= this.elemLimit
      const request = {
        params: params
      };
      if(this.elemLimit<1 || isNaN(this.elemLimit)){
        document.getElementById('validationPage').classList.remove('is-valid');
        document.getElementById('validationPage').classList.add('is-invalid');
        return
      }
      if(this.showCompleted === 'false' && this.showUncompleted === "false"){
        return
      }
      else if(this.showCompleted === 'true' && this.showUncompleted === "true"){
      }
      else{
        if(this.showCompleted === 'false'){
          params.completed = false;
        }
        if(this.showUncompleted === "false"){
          params.completed = true;
        }
      }
      document.getElementById('validationPage').classList.remove('is-invalid');
      document.getElementById('validationPage').classList.add('is-valid');
      this.getPageTaskBack(request)
      return
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
