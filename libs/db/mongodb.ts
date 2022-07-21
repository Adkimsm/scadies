import { MongoClient } from 'mongodb'

export default async function (config: { endpoint: string }) {
    const endpoint = String(config.endpoint)

    const client = await MongoClient.connect(endpoint);
    const db = await client.db('Scadies');

    return async (namespace: string) => {
        return {
            read: async (key: string) => {
                const data = await db.collection(namespace).findOne({ key: key })
                return data ? data.value : null
            },
            write: async <T>(key: string, value: T) => {
                await db.collection(namespace).updateOne({ key: key }, { $set: { value: value } }, { upsert: true })
                return true
            },
            delete: async (key: string) => {
                await db.collection(namespace).deleteOne({ key: key })
                return true
            },
            set: async (data: object) => {
                await db.collection(namespace).deleteMany({})
                await db.collection(namespace).insertMany([data])
                return true
            },
            list: async <T>() => {
                const res = await db.collection(namespace).find().toArray()
                const data: {
                    [key: string]: T
                } = {}
                for (const i in res) {
                    data[res[i].key] = res[i].value
                }
                return data
            },
            keys: async () => {
                return await db.collection(namespace).find().toArray().then(data => data.map(d => d.key))
            },
            values: async () => {
                return await db.collection(namespace).find().toArray().then(data => data.map(d => d.value))
            },
            close: async () => {
                await client.close()
            }
        }
    }
}