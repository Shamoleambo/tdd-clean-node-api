import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string): Promise<string> {
    return 'hashed_value'
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('should return a hesh on success', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)
    const hashedValue = await sut.encrypt('any_value')

    expect(hashedValue).toBe('hashed_value')
  })
})
