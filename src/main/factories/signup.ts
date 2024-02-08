import { Controller } from '../../presentation/protocols'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const SALT = 12
  const accountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(SALT)
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signupController = new SignUpController(emailValidatorAdapter, addAccount)
  return new LogControllerDecorator(signupController)
}
