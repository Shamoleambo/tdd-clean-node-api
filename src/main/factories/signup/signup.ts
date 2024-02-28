import { Controller } from '../../../presentation/protocols'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const SALT = 12
  const accountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(SALT)
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signupController = new SignUpController(addAccount, makeSignupValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
