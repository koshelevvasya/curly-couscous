<template>
  <div class="row">

    <div class="col-12 pb-3">
      <div class="row">
        <div class="col-6">
          <router-link to="/users">
            <button type="button" class="btn btn-outline-warning">Back</button>
          </router-link>
        </div>
        <div class="col-6 text-right pt-1">
          <h5>Create user</h5>
        </div>
      </div>
    </div>

    <div class="col-12">
        <div class="mb-3">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="Username" @keyup.enter="emptyCheckAndCreate" v-model="username">
        </div>
    </div>

    <div class="col-12 text-right">
      <router-link to="/users">
        <button type="button" class="btn btn-outline-secondary">Cancel</button>
      </router-link>
      <button type="button" class="btn btn-success ml-1" :disabled="!username" @click="create">Create</button>
    </div>

    <div class="col-12 pt-2">
      <div class="alert alert-success" role="alert" v-if="showSuccessAlert">
        Success create user!
      </div>
      <div class="alert alert-danger" role="alert" v-if="showErrorAlert">
        Error while user create!
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Moment from 'moment'

import UserModel from '../../../models/UserModel'

@Component({})
export default class CreateUser extends Vue {
  protected showSuccessAlert = false
  protected showErrorAlert = false

  protected username = ''

  protected emptyCheckAndCreate () {
    if (!this.username) {
      this.showError()
      return
    }

    this.create()
  }

  private create () {
    try {
      const user = new UserModel({
        id: this.genarateId(),
        name: this.username,
        createdAt: Moment().unix(),
        updatedAt: Moment().unix()
      })

      this.$store.dispatch('Users/create', user)
        .then(() => {
          this.username = ''
          this.showSuccess()
        })
        .catch((error: any) => {
          console.log(error)
          this.showError()
        })
    } catch (e) {
      this.showError()
    }
  }

  private genarateId (): string {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  private showSuccess (): void {
    this.showErrorAlert = false
    this.showSuccessAlert = true
    setTimeout(() => {
      this.showSuccessAlert = false
    }, 2000)
  }

  private showError (): void {
    this.showSuccessAlert = false
    this.showErrorAlert = true
    setTimeout(() => {
      this.showErrorAlert = false
    }, 2000)
  }
}
</script>
