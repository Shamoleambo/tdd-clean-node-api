import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('should return an MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('required_field')
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('required_field'))
  })

  test('should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('required_field')
    const error = sut.validate({ required_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
