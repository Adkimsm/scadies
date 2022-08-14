/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'
import { expressjwt as expressJWT } from 'express-jwt'
import terminalLink from 'terminal-link'
import cors from 'cors'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import login from './routes/login'
import posts from './routes/posts'
import post from './routes/post'
import reg from './routes/reg'
import verifyToken from './routes/verifyToken'
import deletePost from './routes/deletePost'
import log from './utils/log'
import { performance } from 'perf_hooks'
import { endHTTP, startHTTP } from './middlewares/http'
//import version from './routes/version'

const port = config.get('port')

const app = express()

app.use(startHTTP)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api', home)

app.get('/api/siteinfos', siteInfos)

app.get('/api/posts', posts)

app.get('/api/posts/:id', post)

app.post('/api/session/login', login)

app.get('/api/session/verifytoken/:token', verifyToken)

app.post('/api/session/reg', reg)

//app.get('/api/ver', version)

app.get(
    '/api/posts/delete/:id',
    expressJWT({ secret: config.get('publicKey'), algorithms: ['RS512'] }),
    deletePost
)

app.all('/*', (_req: Request, response: Response, next: NextFunction) => {
    response.sendStatus(404)
    next()
})

app.use(endHTTP)

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
