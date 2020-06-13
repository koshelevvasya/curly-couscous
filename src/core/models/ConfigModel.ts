export default class ConfigModel {
  public repositoryType = 'memory'

  constructor (params: any) {
    try {
      this.repositoryType = params.repositoryType
    } catch (e) {
      throw new Error('Error while parse config')
    }
  }
}
