<template>
  <div class="row">

    <div class="col-12 pb-3">
      <div class="row justify-content-between">
        <div class="col-4">
          <router-link to="/users/create">
            <button type="button" class="btn btn-outline-primary">Add</button>
          </router-link>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" v-model="search" placeholder="Search..."/>
        </div>
      </div>
    </div>

    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th class="text-gray-500">#</th>
            <th>Name</th>
            <th class="datetime">Created at</th>
            <th class="datetime">Updated at</th>
            <th class="action"></th>
            <th class="action"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredUsers.length">
            <tr v-for="(user, index) of filteredUsers" :key="index">
              <td class="action text-gray-500">{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td class="datetime">{{ momentToDatetime(user.createdAt) }}</td>
              <td class="datetime">{{ momentToDatetime(user.updatedAt) }}</td>
              <td class="action"><i class="fa fa-trash-o cursor-pointer" @click="removeUser(user.id)"></i></td>
              <td class="action">
                <i class="fa fa-pencil-square-o cursor-pointer" @click="$router.push('users/edit/' + user.id)"></i>
              </td>
            </tr>
          </template>
          <template v-else-if="search.length">
            <tr>
              <td class="text-center" colspan="6">No matches found</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="text-center" colspan="6">Empty</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UserModel from 'src/application/models/UserModel'
import Moment from 'moment'

@Component({})
export default class Users extends Vue {
  protected search = ''
  protected users: UserModel[] = []

  get filteredUsers (): UserModel[] {
    return this.search.length ? this.acceptFilter(this.users) : this.users
  }

  public mounted () {
    this.setUsers()
  }

  private setUsers () {
    this.$store.dispatch('Users/gets')
      .then((users: UserModel[]) => {
        this.users = users
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  private removeUser (id: string) {
    this.$store.dispatch('Users/delete', id)
      .then(() => {
        this.setUsers()
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  private acceptFilter (users: UserModel[]): UserModel[] {
    return users.filter((user: UserModel) => {
      return user.name.indexOf(this.search) > -1
    })
  }

  private momentToDatetime (date: Moment.Moment): string {
    return date.format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.action {
  width: 1%;
  vertical-align: middle;
}
td.datetime, th.datetime {
  text-align: center;
  white-space: nowrap;
  width: 1%;
}
.text-gray-500 {
  color: #678898;
}
</style>
