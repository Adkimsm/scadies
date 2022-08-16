import express, { NextFunction, Request, Response } from 'express'
import terminalLink from 'terminal-link'
import cors from 'cors'
import config from './utils/config'
import log from './utils/log'
import { performance } from 'perf_hooks'
import { endHTTP, startHTTP } from './middlewares/http'
import routers from './routes'

const port = config.get('port')

const app = express()

app.use(startHTTP)
app.use(endHTTP)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(routers)

app.use((_r, res) => {
    res.status(404).end()
})

if (config.get('buildForVercel') === false) {
    app.listen(port, () => {
        const link = terminalLink(
            port.toString(),
            `http://localhost:${port.toString()}`
        )
        log.info(
            `Scadies Core Listenned at ${link} => ${performance.now() | 0} ms`
        )
    })
}

if (config.get('buildForVercel') === true) {
    module.exports = app
}
