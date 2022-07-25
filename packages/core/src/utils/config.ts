import configs from '../../core.config'

export default {
    get(key: string) {
        return Reflect.get(configs, key)
    },
}
