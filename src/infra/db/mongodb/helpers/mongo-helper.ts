import { MongoClient } from 'mongodb'
import type { Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...props } = collection
    return { id: _id.toString(), ...props }
  }
}
