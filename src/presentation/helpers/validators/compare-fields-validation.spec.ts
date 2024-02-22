import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('any_field', 'field_to_compare')

describe('CompareFields Validation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', field_to_compare: 'invalid_value' })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })

  test('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', field_to_compare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
