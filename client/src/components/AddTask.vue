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

          <b-table :items="tasks" :fields="fields" striped responsive="sm">
            <template v-slot:cell(completed)="row">
              <b-form-group>
                  <input type="checkbox" v-model="row.item.completed" v-on:change="replaceTask(row.item)" />
              </b-form-group>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import TaskService from '@/services/TaskService'
export default {
  name: 'addTask',
  data() {
    return{
      tasks: [
        // {title: 'test1',completed: false},
        // {title: 'test2',completed: true}
        ],
      fields: ['completed','title'],
      form: {
        title: '',
        completed: false
      }
    }
  },
  mounted () {
    this.getTask()
  },
  methods: {
    onSubmit(event) {
      console.log("form "+this.form.title)
      this.addForm ()
    },
    async getTask () {
      const response = await TaskService.get()
      this.tasks = response.data
    },
    async addForm () {
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
          this.tasks.push(formCopy);
        }
      }
    },
    async replaceTask (item) {
      const response = await TaskService.replace(item)
      item = response.data;
    }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
