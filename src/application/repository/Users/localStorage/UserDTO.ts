/* eslint-disable @typescript-eslint/camelcase */
import UserModel from 'src/application/models/UserModel'

export default class UserDTO {
  public id: string
  public name: string
  public created_at: number
  public updated_at: number

  constructor (user: UserModel) {
    this.id = user.id
    this.name = user.name
    this.created_at = user.createdAt.unix() * 1000
    this.updated_at = user.updatedAt.unix() * 1000
  }
}
