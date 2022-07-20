import { MongoClient } from 'mongodb'

export default async function (config) {
    const endpoint = String(config.endpoint)

    const client = await MongoClient.connect(endpoint, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('Scadies');

    return async (namespace) => {
        return {
            read: async (key) => {
                const data = await db.collection(namespace).findOne({ key: key })
                return data ? data.value : null
            },
            write: async (key, value) => {
                await db.collection(namespace).updateOne({ key: key }, { $set: { value: value } }, { upsert: true })
                return true
            },
            delete: async (key) => {
                await db.collection(namespace).deleteOne({ key: key })
                return true
            },
            set: async (data) => {
                await db.collection(namespace).deleteMany({})
                await db.collection(namespace).insertMany([data])
                return true
            },
            list: async () => {
                const res = await db.collection(namespace).find().toArray()
                let data = {}
                for (let i in res) {
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