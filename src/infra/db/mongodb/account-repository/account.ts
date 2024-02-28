import type { AddAccountRepository } from '../../../../data/protocols'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const insertedId = (await accountCollection.insertOne(accountData)).insertedId
    const mongoAccount = await accountCollection.findOne(insertedId)

    return MongoHelper.map(mongoAccount)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountId = (await accountCollection.findOne({ email }))._id
    const mongoAccount = await accountCollection.findOne(accountId)

    return MongoHelper.map(mongoAccount)
  }
}
