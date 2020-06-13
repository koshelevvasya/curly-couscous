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
          <h5>Edit user</h5>
        </div>
      </div>
    </div>

    <div class="col-12" v-if="user !== null">
        <div class="mb-3">
          <label>User ID</label>
          <input type="text" class="form-control" disabled :value="user.id" />
        </div>
        <div class="mb-3">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="Username" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label>Created at</label>
          <input type="text" class="form-control" disabled :value="momentToDatetime(user.createdAt)" />
        </div>
        <div class="mb-3">
          <label>Updated at</label>
          <input type="text" class="form-control" disabled :value="momentToDatetime(user.updatedAt)" />
        </div>
    </div>

    <div class="col-12 text-right">
      <router-link to="/users">
        <button type="button" class="btn btn-outline-secondary">Cancel</button>
      </router-link>
      <button type="button" class="btn btn-primary ml-1" @click="update">Update</button>
    </div>

    <div class="col-12 pt-2">
      <div class="alert alert-success" role="alert" v-if="showSuccessAlert">
        Success edit user!
      </div>
      <div class="alert alert-danger" role="alert" v-if="showErrorAlert">
        Error while user edit!
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Moment from 'moment'
import UserModel from 'src/application/models/UserModel'

@Component({})
export default class EditUser extends Vue {
  protected showSuccessAlert = false
  protected showErrorAlert = false
  protected user: UserModel | null = null

  get userId (): string {
    return this.$route.params.user_id
  }

  public mounted () {
    this.getUser()
  }

  private getUser () {
    this.$store.dispatch('Users/getById', this.userId)
      .then((user: UserModel) => {
        this.user = user
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  private update () {
    this.$store.dispatch('Users/update', this.user)
      .then(() => {
        this.showSuccess()
      })
      .catch((error: any) => {
        console.log(error)
        this.showError()
      })
  }

  private momentToDatetime (date: Moment.Moment): string {
    return date.format('YYYY-MM-DD HH:mm:ss')
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
