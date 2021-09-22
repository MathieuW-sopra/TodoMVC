<template>
  <div class="Vuex">
    <img alt="Vue logo" src="../assets/logo.png">
    <Count msg="Welcome to Count"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Count from '@/components/Count.vue'

export default {
  name: 'Vuex',
  components: {
    Count
  }
}
</script>
