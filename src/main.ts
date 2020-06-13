import Vue from 'vue'
import App from './core/components/App.vue'
import router from './core/router'
import store from './core/store'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
