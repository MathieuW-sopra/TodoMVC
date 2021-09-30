import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.css";
import Panel from '@/components/globals/Panel'
import { sync } from 'vuex-router-sync'
import { store } from '@/store/store.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(vuetify)

Vue.component('panel', Panel)

Vue.config.productionTip = false

sync(store, router)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
