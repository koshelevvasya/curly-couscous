import Moment from 'moment'

class UserModel {
  public name: string

  constructor (params: {[key: string]: any}) {
    try {
      this.name = params.name
    } catch (e) {
      throw new Error('Error while create UserModel')
    }
  }
}

/**
 * Model from repository
 */
export default class FullUserModel extends UserModel {
  public readonly id: string
  public readonly createdAt: Moment.Moment
  public updatedAt: Moment.Moment

  constructor (params: {[key: string]: any}) {
    try {
      super(params)

      this.id = params.id

      this.createdAt = Moment(params.created_at)
      this.updatedAt = Moment(params.updated_at)
    } catch (e) {
      throw new Error('Error while create UserFullModel')
    }
  }
}

export { FullUserModel, UserModel }
