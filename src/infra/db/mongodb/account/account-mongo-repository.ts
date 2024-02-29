import { ObjectId } from 'mongodb'
import type { AddAccountRepository } from '../../../../data/protocols'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const insertedId = (await accountCollection.insertOne(accountData)).insertedId
    const mongoAccount = await accountCollection.findOne(insertedId)

    return MongoHelper.map(mongoAccount)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = (await accountCollection.findOne({ email }))

    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userId = new ObjectId(id)
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          accessToken: token
        }
      })

    return account && MongoHelper.map(account)
  }
}
