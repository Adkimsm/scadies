import configs from '../../core.config.js'

let config = {
    get(key: string) {
        return Reflect.get(configs, key)
    },
}

export default config
