import config from './config'

let dbName = config.get('db')

export default import(`../../libs/db/${dbName}`)
