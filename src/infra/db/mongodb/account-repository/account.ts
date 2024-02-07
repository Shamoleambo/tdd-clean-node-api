import type { AddAccountRepository } from '../../../../data/protocols'
import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const insertedId = (await accountCollection.insertOne(accountData)).insertedId
    const mongoAccount = await accountCollection.findOne(insertedId)

    return MongoHelper.map(mongoAccount)
  }
}
