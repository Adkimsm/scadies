import config from './config'

const dbName = config.get('db')

export default import(`../../libs/db/${dbName}`)