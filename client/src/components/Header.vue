<template>
  <v-card
    color="grey lighten-4"
    flat
    height="20vh"
    tile
  >
  <v-toolbar class="cyan" dark style="height:10vh;">
    <v-toolbar-items>
      <v-btn text dark :to="{name: 'tasks'}">
        Home
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn text dark :to="{name: 'tasks'}">
        Tasks
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{name: 'login'}">
        Login
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{name: 'register'}">
        Sign Up
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </v-card>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}

</style>