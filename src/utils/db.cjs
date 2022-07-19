const config = require('./config.cjs')

module.exports = require(`../../libs/db/${config.get('db')}.cjs`)