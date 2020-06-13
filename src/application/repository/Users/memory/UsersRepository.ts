import UserModel from './../../../models/UserModel'
import IUsersRepository from '../IUsersRepository'

export default class UsersMemoryRepository implements IUsersRepository {
  protected users: UserModel[] = []

  get (id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user: UserModel) => user.id === id)
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Error: User by id = ' + id + ' not found'))
      }
    })
  }

  gets (): Promise<UserModel[]> {
    return new Promise((resolve) => {
      resolve(this.users)
    })
  }

  create (user: UserModel): Promise<UserModel> {
    return new Promise((resolve) => {
      this.users.push(user)
      resolve(user)
    })
  }

  update (user: UserModel): Promise<UserModel> {
    return new Promise((resolve) => {
      this.users = this.users.map((u: UserModel) => {
        if (u.id === user.id) {
          return user
        }

        return u
      })
      resolve(user)
    })
  }

  delete (id: string): Promise<any> {
    return new Promise((resolve) => {
      this.users = this.users.filter((user: UserModel) => user.id !== id)
      resolve()
    })
  }
}
