import { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validations: Validation[]
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validationStub1 = makeValidationStub()
  const validationStub2 = makeValidationStub()
  const validations = [validationStub1, validationStub2]
  const sut = new ValidationComposite(validations)
  return { validations, sut }
}

describe('Validation Composite', () => {
  test('should return an error if any of its validations returns an error', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(new Error('any_message'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error('any_message'))
  })

  test('should return the first validation error it finds', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(new Error('any_message_1'))
    jest.spyOn(validations[1], 'validate').mockReturnValueOnce(new Error('any_message_2'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error('any_message_1'))
  })

  test('should not return if any of its validations do not return', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
