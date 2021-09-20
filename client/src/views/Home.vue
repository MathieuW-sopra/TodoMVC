<template>
  <div class="home">
    <AddTask msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddTask from '@/components/AddTask.vue'

export default {
  name: 'Home',
  components: {
    AddTask
  }
}
</script>
