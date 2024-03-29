import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const validation of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(validation))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
