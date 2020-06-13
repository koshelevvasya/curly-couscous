import UserModel from './../../../models/UserModel'
import IUsersRepository from '../IUsersRepository'
import UserDTO from './UserDTO'

export default class UsersLocalStorageRepository implements IUsersRepository {
  protected storage = window.localStorage
  protected storageItemName = 'users'

  get (id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const users = this.getFromStorage()
      const user = users.find((user: UserModel) => user.id === id)
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Error: User by id = ' + id + ' not found'))
      }
    })
  }

  gets (): Promise<UserModel[]> {
    return new Promise((resolve) => {
      resolve(this.getFromStorage())
    })
  }

  create (user: UserModel): Promise<UserModel> {
    return new Promise((resolve) => {
      const users = this.getFromStorage()
      users.push(user)

      this.setToStorage(users)

      resolve(user)
    })
  }

  update (user: UserModel): Promise<UserModel> {
    return new Promise((resolve) => {
      let users = this.getFromStorage()
      users = users.map((u: UserModel) => {
        if (u.id === user.id) {
          return user
        }

        return u
      })

      this.setToStorage(users)

      resolve(user)
    })
  }

  delete (id: string): Promise<any> {
    return new Promise((resolve) => {
      let users = this.getFromStorage()
      users = users.filter((user: UserModel) => user.id !== id)

      this.setToStorage(users)

      resolve()
    })
  }

  private getFromStorage (): UserModel[] {
    const data: string | null = this.storage.getItem(this.storageItemName)

    try {
      if (data) {
        const parsedData = JSON.parse(data)

        if (Array.isArray(parsedData)) {
          const users: UserModel[] = []

          for (const item of parsedData) {
            const user = this.parseToModel(item)
            users.push(user)
          }

          return users
        }
      }
    } catch (e) {
      return []
    }

    return []
  }

  private setToStorage (users: UserModel[]) {
    const usersDTO = this.parseToDTO(users)
    const stringifiedUsers = JSON.stringify(usersDTO)

    this.storage.setItem(this.storageItemName, stringifiedUsers)
  }

  private parseToModel (user: any): UserModel {
    try {
      return new UserModel(user)
    } catch (e) {
      throw new Error('Error parse User')
    }
  }

  private parseToDTO (users: UserModel[]): UserDTO[] {
    return users.map((user: UserModel) => new UserDTO(user))
  }
}
