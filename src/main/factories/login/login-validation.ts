import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const validation of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(validation))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}