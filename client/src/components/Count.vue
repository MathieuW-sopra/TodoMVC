<template>
  <div>
    <h1>
    count : {{countPlusLocalState}}
    </h1>
    <br>
    <br>
    <b-button variant="danger" v-on:click="this.$store.commit('increment')">Increment</b-button>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Count',
  data() {
    return {
        localCount: 4
    }
  },
  computed: mapState({
    count: 'count',
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

</script>

