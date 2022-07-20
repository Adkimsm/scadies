import config from './config.js'

let dbName = config.get('db'),
    db = await import(`../../libs/db/${dbName}.js`)

export default await db
