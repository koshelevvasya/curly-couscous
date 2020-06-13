<template>
  <div id="app">
    <template>
      <app-header />
      <app-content>
        <router-view/>
      </app-content>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import AppHeader from './layout/Header.vue'
import AppContent from './layout/Content.vue'

@Component({
  components: {
    AppHeader,
    AppContent
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';
</style>
