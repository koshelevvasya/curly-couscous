import Vue from 'vue'
import Vuex from 'vuex'

import AppModules from '@/application/ui/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: AppModules
})
