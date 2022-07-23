import crypto from 'crypto'
import config from './config'

const key = crypto.randomBytes(192 / 8)
const iv = crypto.randomBytes(128 / 8)
const algorithm = config.get('algorithm')
const encoding = config.get('encoding')

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    cipher.update(text)
    return cipher.final(encoding)
}

export const decrypt = (encrypted: string) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.update(encrypted, encoding)
    return decipher.final('utf8')
}