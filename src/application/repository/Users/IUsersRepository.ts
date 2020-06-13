import UserModel from './../../models/UserModel'

export default interface UsersRepository {
  get (id: string): Promise<UserModel>
  gets (): Promise<UserModel[]>
  create (user: UserModel): Promise<UserModel>
  update (user: UserModel): Promise<UserModel>
  delete (id: string): Promise<any>
}
