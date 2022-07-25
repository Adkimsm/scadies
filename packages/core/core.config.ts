import fs from 'fs'
import path from 'path'

export default {
    db: 'mongodb',
    port: 3000,
    dbUri: 'mongodb+srv://adk:3xz5GphHwA3TvcqU@cluster0.3ngqiix.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'Scadies',
    algorithm: 'aes192',
    cryptoEncoding: 'hex',
    cryptoSecret: fs.readFileSync(path.resolve(__dirname, './public/jwt/jwt.pem'))
}