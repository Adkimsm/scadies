import configs from '../../core.config.js' 

export default {
    get(key: string) {
        return Reflect.get(configs, key)
    }
}
