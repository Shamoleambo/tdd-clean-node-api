import bcrypt from 'bcrypt'
import type { Encrypter } from '../../data/protocols'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return await new Promise(resolve => { resolve(null) })
  }
}
