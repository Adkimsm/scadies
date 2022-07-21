import config from './config.js'

let dbName = config.get('db') 

export default import(`../../libs/db/${dbName}.js`)
