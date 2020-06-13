import Config from '@/core/config'

import UserLocalStorageRepository from './repository/Users/localStorage/UsersRepository'
import UserMemoryRepository from './repository/Users/memory/UsersRepository'

const usersRepositoryType = Config.getRepositoryType()
let usersRepository: UserLocalStorageRepository | UserMemoryRepository

switch (usersRepositoryType) {
  case 'localStorage':
    usersRepository = new UserLocalStorageRepository()
    break
  default:
    usersRepository = new UserMemoryRepository()
}

export {
  usersRepository
}
