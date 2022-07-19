const path = require('path')
const configs = require(path.join(path.resolve('./'), 'core.config.cjs'))

let config = {
    get(key) {
        return Reflect.get(configs, key)
    }
}

module.exports = config