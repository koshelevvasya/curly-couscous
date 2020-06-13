import { ActionContext } from 'vuex'
import { usersRepository } from './../../../index'
import UserModel from '../../../models/UserModel'
import { RootState, UsersState } from './types'
import Moment from 'moment'

const state: UsersState = {
}

const getters = {
}

const actions = {
  getById (context: ActionContext<UsersState, RootState>, id: string) {
    return usersRepository.get(id)
  },
  gets () {
    return usersRepository.gets()
  },
  create (context: ActionContext<UsersState, RootState>, user: UserModel) {
    return usersRepository.create(user)
  },
  update (context: ActionContext<UsersState, RootState>, user: UserModel) {
    user.updatedAt = Moment()
    return usersRepository.update(user)
  },
  delete (context: ActionContext<UsersState, RootState>, id: string) {
    return usersRepository.delete(id)
  }
}

const mutations = {
}

const usersModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default usersModule
