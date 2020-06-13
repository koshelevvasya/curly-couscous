import ConfigModel from '../models/ConfigModel'

declare const getAppConfig: () => any

class Config {
  protected config: ConfigModel

  constructor () {
    this.config = new ConfigModel(getAppConfig())
  }

  public getRepositoryType (): string {
    return this.config.repositoryType
  }
}

const config = new Config()
export default config
