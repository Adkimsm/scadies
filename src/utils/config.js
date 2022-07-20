import configs from '../../core.config.js'

let config = {
    get(key) {
        return Reflect.get(configs, key)
    },
}

export default config
