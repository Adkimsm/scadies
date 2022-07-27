import chalk from 'chalk'

export default {
    info(msg: string, origin = 'main') {
        console.log(
            chalk.blue(
                `[INFO] FROM ${origin.toUpperCase()}: ${msg.toUpperCase()}`
            )
        )
    },
    warn(msg: string, origin = 'main') {
        console.log(
            chalk.yellow(
                `[WARNING] FROM ${origin.toUpperCase()}: ${msg.toUpperCase()}`
            )
        )
    },
    err(msg: string, origin = 'main') {
        console.log(
            chalk.red(
                `[ERROR] FROM ${origin.toUpperCase()}: ${msg.toUpperCase()}`
            )
        )
    },
}
