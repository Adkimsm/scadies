import crypto from 'crypto'
import config from './config'

const algorithm = config.get('algorithm')
const SECRET = config.get('cryptoSecret')
const encoding = config.get('cryptoEncoding')

export const encrypt = (content: string) => {
    const cipher = crypto.createCipher(algorithm, SECRET)
    cipher.update(content)
    return cipher.final(encoding)
}

export const decrypt = (encrypted: string) => {
    const decipher = crypto.createDecipher(algorithm, SECRET)
    decipher.update(encrypted, encoding)
    const input = decipher.final(encoding)
    return input
}
